"""
Kafka consumer for log ingestion.
"""
import json
import threading
import time
from typing import Callable, Optional

from confluent_kafka import Consumer, KafkaError, KafkaException, Message

from src.utils.config import settings
from src.utils.logger import logger
from src.utils.metrics import KAFKA_CONSUMER_LAG, LOGS_FAILED, LOGS_RECEIVED


class KafkaLogConsumer:
    """Kafka consumer that reads logs and passes them to a handler."""

    def __init__(self, handler: Callable[[dict], None]):
        self.handler = handler
        self.running = False
        self.consumer: Optional[Consumer] = None
        self._thread: Optional[threading.Thread] = None
        self._setup_consumer()

    def _setup_consumer(self) -> None:
        config = {
            "bootstrap.servers": settings.kafka_bootstrap_servers,
            "group.id": settings.kafka_consumer_group,
            "auto.offset.reset": settings.kafka_auto_offset_reset,
            "enable.auto.commit": False,
            "max.poll.interval.ms": 300000,
            "session.timeout.ms": 45000,
        }
        self.consumer = Consumer(config)
        self.consumer.subscribe([settings.kafka_topic_logs])
        logger.info(
            f"Kafka consumer initialized | "
            f"brokers={settings.kafka_bootstrap_servers} | "
            f"topic={settings.kafka_topic_logs}"
        )

    def start(self) -> None:
        if self.running:
            logger.warning("Consumer already running")
            return
        self.running = True
        self._thread = threading.Thread(target=self._consume_loop, daemon=True)
        self._thread.start()
        logger.info("Kafka consumer started")

    def _consume_loop(self) -> None:
        try:
            while self.running:
                msg = self.consumer.poll(timeout=1.0)
                if msg is None:
                    continue
                if msg.error():
                    if msg.error().code() == KafkaError._PARTITION_EOF:
                        continue
                    logger.error(f"Kafka error: {msg.error()}")
                    LOGS_FAILED.labels(reason="kafka_error").inc()
                    continue
                self._process_message(msg)
        except KafkaException as e:
            logger.error(f"Kafka exception: {e}")
        except Exception as e:
            logger.exception(f"Unexpected error: {e}")
        finally:
            if self.consumer:
                self.consumer.close()
                logger.info("Kafka consumer closed")

    def _process_message(self, msg: Message) -> None:
        try:
            LOGS_RECEIVED.labels(topic=msg.topic()).inc()
            payload = json.loads(msg.value().decode("utf-8"))
            self.handler(payload)
            self.consumer.commit(asynchronous=False)
        except json.JSONDecodeError as e:
            logger.error(f"Invalid JSON: {e}")
            LOGS_FAILED.labels(reason="invalid_json").inc()
            self.consumer.commit(asynchronous=False)
        except Exception as e:
            logger.exception(f"Error processing message: {e}")
            LOGS_FAILED.labels(reason="processing_error").inc()

    def stop(self) -> None:
        logger.info("Stopping Kafka consumer...")
        self.running = False
        if self._thread and self._thread.is_alive():
            self._thread.join(timeout=10)
        logger.info("Kafka consumer stopped")
