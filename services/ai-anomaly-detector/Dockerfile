FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY src/ ./src/
COPY models/ ./models/
ENV PORT=8001 MODEL_DIR=/app/models OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
EXPOSE 8001
CMD ["python", "-m", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8001"]
