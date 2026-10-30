import redis
import json
import logging

logger = logging.getLogger(__name__)

redis_client = None
try:
    redis_client = redis.Redis(host='redis', port=6379, decode_responses=True)
    redis_client.ping()
    logger.info("✅ Redis connected.")
except Exception as e:
    logger.warning(f"⚠️ Redis unavailable: {e}")
    redis_client = None

def get_cached_logs(cache_key):
    if redis_client:
        try:
            cached = redis_client.get(cache_key)
            if cached:
                return json.loads(cached)
        except:
            pass
    return None

def set_cached_logs(cache_key, data, ttl=60):
    if redis_client:
        try:
            redis_client.setex(cache_key, ttl, json.dumps(data))
        except:
            pass
