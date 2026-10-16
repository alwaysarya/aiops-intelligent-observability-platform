"""Kafka consumer for anomalies."""
import asyncio
import json
import threading
from typing import Callable

from confluent_kafka import Consumer, KafkaError

from src.utils.config import settings
from src.utils.logger import logger
from src.utils.metrics import ALERTS_FAILED


class KafkaAnomalyConsumer:
    """Consumes anomalies from Kafka and triggers alerts."""

    def __init__(self, handler: Callable):
        self.handler = handler
        self.running = False
        self.consumer = None
        self._thread = None
        self._loop = None

    def _setup(self):
        self.consumer = Consumer({
            "bootstrap.servers": settings.kafka_bootstrap_servers,
            "group.id": settings.kafka_consumer_group,
            "auto.offset.reset": "earliest",
            "enable.auto.commit": True,
        })
        self.consumer.subscribe([settings.kafka_topic_anomalies])
        logger.info(
            f"Kafka consumer initialized | "
            f"brokers={settings.kafka_bootstrap_servers} | "
            f"topic={settings.kafka_topic_anomalies}"
        )

    def start(self):
        if self.running:
            return
        self._setup()
        self.running = True
        self._thread = threading.Thread(target=self._consume_loop, daemon=True)
        self._thread.start()
        logger.info("Kafka consumer started")

    def _consume_loop(self):
        self._loop = asyncio.new_event_loop()
        asyncio.set_event_loop(self._loop)
        try:
            while self.running:
                msg = self.consumer.poll(timeout=1.0)
                if msg is None:
                    continue
                if msg.error():
                    if msg.error().code() == KafkaError._PARTITION_EOF:
                        continue
                    logger.error(f"Kafka error: {msg.error()}")
                    ALERTS_FAILED.labels(channel="kafka", reason="consume_error").inc()
                    continue
                try:
                    payload = json.loads(msg.value().decode("utf-8"))
                    self._loop.run_until_complete(self.handler(payload))
                except json.JSONDecodeError as e:
                    logger.error(f"Invalid JSON: {e}")
                except Exception as e:
                    logger.exception(f"Handler error: {e}")
        finally:
            if self.consumer:
                self.consumer.close()
            self._loop.close()
            logger.info("Kafka consumer closed")

    def stop(self):
        logger.info("Stopping Kafka consumer...")
        self.running = False
        if self._thread and self._thread.is_alive():
            self._thread.join(timeout=10)
        logger.info("Kafka consumer stopped")
