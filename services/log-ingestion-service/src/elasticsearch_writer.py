"""
Elasticsearch writer — bulk writes processed logs to ES.
"""
import threading
import time
from typing import List, Optional

from elasticsearch import Elasticsearch, helpers
from elasticsearch.exceptions import ConnectionError as ESConnectionError

from src.models.log_entry import ProcessedLog
from src.utils.config import settings
from src.utils.logger import logger
from src.utils.metrics import ES_BULK_SIZE, ES_WRITE_LATENCY, LOGS_FAILED, LOGS_PROCESSED


class ElasticsearchWriter:
    """Handles bulk writing of logs to Elasticsearch."""

    def __init__(self, bulk_size: int = 500, flush_interval: float = 5.0):
        self.bulk_size = bulk_size
        self.flush_interval = flush_interval
        self.buffer: List[ProcessedLog] = []
        self.lock = threading.Lock()
        self.running = False
        self._flush_thread: Optional[threading.Thread] = None
        self.client = self._create_client()
        self._ensure_index_template()

    def _create_client(self) -> Elasticsearch:
        es = Elasticsearch(
            hosts=settings.elasticsearch_hosts_list,
            request_timeout=30,
            max_retries=3,
            retry_on_timeout=True,
        )
        if not es.ping():
            logger.error("Cannot connect to Elasticsearch")
            raise ESConnectionError("Elasticsearch ping failed")
        logger.info(f"Connected to ES | hosts={settings.elasticsearch_hosts_list}")
        return es

    def _ensure_index_template(self) -> None:
        template_name = "aiops-logs-template"
        template_body = {
            "index_patterns": [f"{settings.elasticsearch_index_prefix}-*"],
            "template": {
                "settings": {
                    "number_of_shards": 1,
                    "number_of_replicas": 0,
                    "refresh_interval": "5s",
                },
                "mappings": {
                    "properties": {
                        "timestamp": {"type": "date"},
                        "level": {"type": "keyword"},
                        "service": {"type": "keyword"},
                        "host": {"type": "keyword"},
                        "message": {"type": "text"},
                        "trace_id": {"type": "keyword"},
                        "duration_ms": {"type": "float"},
                        "status_code": {"type": "integer"},
                        "method": {"type": "keyword"},
                        "path": {"type": "keyword"},
                        "error": {"type": "text"},
                        "stack_trace": {"type": "text"},
                        "metadata": {"type": "object", "enabled": True},
                        "enrichment": {"type": "object", "enabled": True},
                    }
                },
            },
        }
        try:
            self.client.indices.put_index_template(name=template_name, body=template_body)
            logger.info(f"Index template '{template_name}' ensured")
        except Exception as e:
            logger.warning(f"Could not create index template: {e}")

    def start(self) -> None:
        if self.running:
            return
        self.running = True
        self._flush_thread = threading.Thread(target=self._flush_loop, daemon=True)
        self._flush_thread.start()
        logger.info("Elasticsearch writer started")

    def _flush_loop(self) -> None:
        while self.running:
            time.sleep(self.flush_interval)
            self.flush()

    def write(self, processed_log: ProcessedLog) -> None:
        with self.lock:
            self.buffer.append(processed_log)
            ES_BULK_SIZE.set(len(self.buffer))
            if len(self.buffer) >= self.bulk_size:
                self._do_flush()

    def flush(self) -> None:
        with self.lock:
            self._do_flush()

    def _do_flush(self) -> None:
        if not self.buffer:
            return
        start_time = time.time()
        batch = self.buffer
        self.buffer = []
        try:
            actions = [
                {"_index": item.index_name, "_source": self._serialize(item)}
                for item in batch
            ]
            success, failed = helpers.bulk(
                self.client, actions, stats_only=False, raise_on_error=False
            )
            elapsed = time.time() - start_time
            ES_WRITE_LATENCY.observe(elapsed)
            LOGS_PROCESSED.labels(status="success").inc(success)
            if failed:
                LOGS_PROCESSED.labels(status="failed").inc(len(failed))
                LOGS_FAILED.labels(reason="es_bulk_partial").inc(len(failed))
            logger.info(f"Flushed {success} logs to ES | latency={elapsed:.3f}s")
        except Exception as e:
            logger.exception(f"ES bulk write failed: {e}")
            LOGS_FAILED.labels(reason="es_bulk_error").inc(len(batch))
        finally:
            ES_BULK_SIZE.set(len(self.buffer))

    def _serialize(self, item: ProcessedLog) -> dict:
        data = item.log.model_dump(mode="json")
        data["enrichment"] = item.enrichment
        return data

    def stop(self) -> None:
        logger.info("Stopping ES writer...")
        self.running = False
        if self._flush_thread and self._flush_thread.is_alive():
            self._flush_thread.join(timeout=10)
        self.flush()
        logger.info("ES writer stopped")
