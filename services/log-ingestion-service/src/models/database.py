from sqlalchemy import create_engine, Column, Integer, String, DateTime, Float, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os

# Yahan port 5433 kar diya hai
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://aiops:aiops_password@127.0.0.1:5433/aiops")

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class LogRecord(Base):
    __tablename__ = "logs"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    level = Column(String, index=True)
    service = Column(String, index=True)
    message = Column(String)
    duration_ms = Column(Float, nullable=True)
    metadata_json = Column(JSON, nullable=True)

class AnomalyRecord(Base):
    __tablename__ = "anomalies"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    service = Column(String, index=True)
    score = Column(Float)
    severity = Column(String)
    detected_by = Column(String)

def init_db():
    try:
        Base.metadata.create_all(bind=engine)
        print("✅ Database tables created/verified successfully.")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        raise e

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
