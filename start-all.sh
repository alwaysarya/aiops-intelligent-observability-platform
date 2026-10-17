#!/bin/bash

set -e

DEVOPS_DIR="$HOME/Documents/COLLEGE/V SEM/DEVOPS"
LOG_DIR="$DEVOPS_DIR/logs"

mkdir -p "$LOG_DIR"

echo "🚀 Starting AIOps Platform..."
echo "=========================================="

echo "📦 [1/5] Starting Docker containers..."
cd "$DEVOPS_DIR/services/log-ingestion-service"
docker compose up -d > /dev/null 2>&1 || true
echo "   ✅ Docker started (Kafka + ES + Log Ingestion)"

echo "🧠 [2/5] Starting AI Anomaly Detector (port 8001)..."
cd "$DEVOPS_DIR/services/ai-anomaly-detector"
source venv/bin/activate
nohup python -m uvicorn src.main:app --host 0.0.0.0 --port 8001 > "$LOG_DIR/anomaly.log" 2>&1 &
echo "   ✅ AI Anomaly Detector started (PID: $!)"
deactivate

echo "🔔 [3/5] Starting Alert Service (port 8002)..."
cd "$DEVOPS_DIR/services/alert-service"
source venv/bin/activate
nohup python -m uvicorn src.main:app --host 0.0.0.0 --port 8002 > "$LOG_DIR/alerts.log" 2>&1 &
echo "   ✅ Alert Service started (PID: $!)"
deactivate

echo "🔍 [4/5] Starting Root Cause Analyzer (port 8003)..."
cd "$DEVOPS_DIR/services/root-cause-analyzer"
source venv/bin/activate
nohup python -m uvicorn src.main:app --host 0.0.0.0 --port 8003 > "$LOG_DIR/rca.log" 2>&1 &
echo "   ✅ Root Cause Analyzer started (PID: $!)"
deactivate

echo "🎨 [5/5] Starting Frontend (port 3000)..."
cd "$DEVOPS_DIR/frontend"
nohup npm run dev > "$LOG_DIR/frontend.log" 2>&1 &
echo "   ✅ Frontend started (PID: $!)"

echo ""
echo "⏳ Waiting 15 seconds for services to be ready..."
sleep 15

echo ""
echo "=========================================="
echo "🎯 Service Health Check"
echo "=========================================="

for port in 8000 8001 8002 8003; do
  echo -n "   Port $port: "
  curl -s "http://localhost:$port/health" 2>/dev/null || echo "❌ Not responding"
  echo ""
done

echo -n "   Port 3000 (Frontend): "
curl -s "http://localhost:3000" -o /dev/null -w "%{http_code}" 2>/dev/null && echo " ✅" || echo "❌"

echo ""
echo "=========================================="
echo "🎉 AIOps Platform is ready!"
echo "=========================================="
echo ""
echo "  🌐 Frontend:      http://localhost:3000"
echo "  📥 Log Ingestion: http://localhost:8000/docs"
echo "  🧠 AI Anomaly:    http://localhost:8001/docs"
echo "  🔔 Alerts:        http://localhost:8002/docs"
echo "  🔍 Root Cause:    http://localhost:8003/docs"
echo ""
echo "  Logs: $LOG_DIR"
echo "  Stop: ./stop-all.sh"
echo ""
