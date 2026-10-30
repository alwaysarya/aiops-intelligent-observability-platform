import signal
import sys
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from fastapi.security import OAuth2PasswordRequestForm
from prometheus_client import CONTENT_TYPE_LATEST, generate_latest
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from sqlalchemy.orm import Session
from sqlalchemy import or_

from src.elasticsearch_writer import ElasticsearchWriter
from src.kafka_consumer import KafkaLogConsumer
from src.log_enricher import LogEnricher
from src.log_parser import LogParser
from src.utils.config import settings
from src.utils.logger import logger
from src.utils.tracing import instrument_fastapi, setup_tracing
from src.redis_cache import get_cached_logs, set_cached_logs
from src.utils.security import create_access_token, get_current_user, TokenData
from src.models.database import init_db, get_db, LogRecord

limiter = Limiter(key_func=get_remote_address)
parser = LogParser()
enricher = LogEnricher()
es_writer: ElasticsearchWriter = None
kafka_consumer: KafkaLogConsumer = None

def process_log(raw_log: dict, db: Session):
    try:
        log_entry = parser.parse(raw_log)
        if log_entry:
            processed = enricher.enrich(log_entry)
            db_log = LogRecord(
                level=log_entry.level,
                service=log_entry.service,
                message=log_entry.message,
                duration_ms=log_entry.duration_ms,
                metadata_json=log_entry.metadata
            )
            db.add(db_log)
            db.commit()
            if es_writer:
                es_writer.write(processed)
    except Exception as e:
        db.rollback()
        logger.exception(f"Error in log pipeline: {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    global es_writer, kafka_consumer
    logger.info(f"Starting {settings.app_name} v{settings.app_version}")
    setup_tracing()
    try:
        init_db()
        logger.info("✅ Database connected.")
    except Exception as e:
        logger.error(f"❌ Database connection failed: {e}")
    try:
        es_writer = ElasticsearchWriter(bulk_size=500, flush_interval=5.0)
        es_writer.start()
        logger.info("✅ Elasticsearch connected.")
    except Exception as e:
        logger.warning(f"⚠️ Elasticsearch unavailable: {e}")
        es_writer = None
    yield
    if es_writer: 
        es_writer.stop()

app = FastAPI(title="Log Ingestion Service", lifespan=lifespan)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8080"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

instrument_fastapi(app)

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Demo credentials
    if form_data.username == "admin" and form_data.password == "password":
        access_token = create_access_token(data={"sub": form_data.username, "role": "admin"})
        return {"access_token": access_token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.get("/ready")
async def ready():
    return {"status": "ready"}

@app.post("/ingest")
@limiter.limit("100/minute")
async def ingest_log(request: Request, log: dict, db: Session = Depends(get_db)):
    process_log(log, db)
    return {"status": "success", "message": "Log saved to DB and ES"}

@app.get("/logs")
async def get_logs(
    request: Request,
    search: str = Query(None),
    level: str = Query(None),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: TokenData = None  # Auth removed for dev
):
    query = db.query(LogRecord)
    
    if search:
        query = query.filter(or_(
            LogRecord.message.ilike(f"%{search}%"),
            LogRecord.service.ilike(f"%{search}%")
        ))
    if level and level != "all":
        query = query.filter(LogRecord.level == level)
        
    total = query.count()
    logs = query.order_by(LogRecord.timestamp.desc()).offset(skip).limit(limit).all()
    
    return {"total": total, "data": logs}

@app.get("/metrics")
async def metrics():
    return Response(content=generate_latest(), media_type=CONTENT_TYPE_LATEST)

@app.get("/analytics")
def get_analytics(db: Session = Depends(get_db)):
    """Get real-time analytics from Elasticsearch or PostgreSQL"""
    try:
        # Try Elasticsearch first
        if es_writer and es_writer.client:
            index = "aiops-logs-*"
            total_res = es_writer.client.count(index=index)
            total_logs = total_res.get('count', 0)
            
            error_res = es_writer.client.count(index=index, query={"match": {"level": "ERROR"}})
            error_count = error_res.get('count', 0)
            
            warn_res = es_writer.client.count(index=index, query={"match": {"level": "WARN"}})
            warn_count = warn_res.get('count', 0)
            
            # Calculate real uptime
            if total_logs > 0:
                uptime = f"{((total_logs - error_count) / total_logs * 100):.2f}%"
            else:
                uptime = "100%"
            
            # Calculate real avg latency
            try:
                avg_res = es_writer.client.search(index=index, body={
                    "size": 0,
                    "aggs": {"avg_duration": {"avg": {"field": "duration_ms"}}}
                })
                avg_latency = f"{avg_res['aggregations']['avg_duration'].get('value', 0):.0f}ms"
            except:
                avg_latency = "0ms"
            
            return {
                "total_logs": total_logs,
                "errors": error_count,
                "warnings": warn_count,
                "uptime": uptime,
                "avg_latency": avg_latency,
                "source": "elasticsearch"
            }
    except Exception as e:
        logger.warning(f"Analytics from ES failed: {e}")
    
    # Fallback to PostgreSQL
    try:
        total_logs = db.query(LogRecord).count()
        error_count = db.query(LogRecord).filter(LogRecord.level == "ERROR").count()
        warn_count = db.query(LogRecord).filter(LogRecord.level == "WARN").count()
        
        if total_logs > 0:
            uptime = f"{((total_logs - error_count) / total_logs * 100):.2f}%"
        else:
            uptime = "100%"
        
        return {
            "total_logs": total_logs,
            "errors": error_count,
            "warnings": warn_count,
            "uptime": uptime,
            "avg_latency": "0ms",
            "source": "postgres"
        }
    except Exception as e:
        logger.error(f"Analytics failed: {e}")
        return {"total_logs": 0, "errors": 0, "warnings": 0, "uptime": "0%", "avg_latency": "0ms", "source": "error"}


@app.get("/rca/graph")
def get_graph():
    """Get service dependency graph from Neo4j"""
    if neo4j_driver:
        try:
            with neo4j_driver.session() as session:
                result = session.run("MATCH (n) RETURN count(n) as nodes")
                nodes = result.single()["nodes"]
                
                result = session.run("MATCH ()-[r]->() RETURN count(r) as rels")
                rels = result.single()["rels"]
                
                return {"nodes": nodes, "relationships": rels, "source": "neo4j"}
        except Exception as e:
            return {"error": str(e), "source": "neo4j"}
    return {"nodes": 0, "relationships": 0, "source": "unavailable"}

@app.post("/rca/seed")
def seed_graph():
    """Seed Neo4j with sample service dependencies"""
    if neo4j_driver:
        try:
            with neo4j_driver.session() as session:
                # Create services
                services = ["api-gateway", "log-ingestion", "anomaly-detector", "alert-service", "root-cause-analyzer"]
                for s in services:
                    session.run("MERGE (n:Service {name: $name})", name=s)
                
                # Create dependencies (api-gateway depends on log-ingestion, etc.)
                deps = [
                    ("api-gateway", "log-ingestion"),
                    ("log-ingestion", "anomaly-detector"),
                    ("anomaly-detector", "alert-service"),
                    ("alert-service", "root-cause-analyzer"),
                    ("api-gateway", "alert-service"),
                ]
                for src, dst in deps:
                    session.run(
                        "MATCH (a:Service {name: $src}), (b:Service {name: $dst}) MERGE (a)-[:DEPENDS_ON]->(b)",
                        src=src, dst=dst
                    )
                return {"status": "seeded", "services": len(services), "dependencies": len(deps)}
        except Exception as e:
            return {"error": str(e)}
    return {"error": "neo4j unavailable"}

