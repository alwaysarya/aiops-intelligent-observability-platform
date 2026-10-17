#!/bin/bash

DEVOPS_DIR="$HOME/Documents/COLLEGE/V SEM/DEVOPS"

echo "🛑 Stopping AIOps Platform..."
echo "=========================================="

pkill -f "uvicorn src.main:app" 2>/dev/null || true
echo "   ✅ Python services stopped"

pkill -f "vite" 2>/dev/null || true
echo "   ✅ Frontend stopped"

cd "$DEVOPS_DIR/services/log-ingestion-service"
docker compose down > /dev/null 2>&1 || true
echo "   ✅ Docker stopped"

echo ""
echo "🎉 All services stopped!"
echo ""
