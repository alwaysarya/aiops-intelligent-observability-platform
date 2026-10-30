#!/bin/bash

echo "🚀 Starting AIOps Project..."

# 1. Start Backend
echo "▶️ Starting Backend (Port 8080)..."
cd "/Users/aryanthakur/Documents/COLLEGE/V SEM/DEVOPS"
source venv/bin/activate
uvicorn src.main:app --reload --port 8080 > backend.log 2>&1 &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"

# 2. Start Frontend
echo "▶️ Starting Frontend (Port 3000)..."
cd "/Users/aryanthakur/Documents/COLLEGE/V SEM/DEVOPS/frontend"
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"

echo "🎉 Project is running!"
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:8080"
echo "Logs: backend.log and frontend/frontend.log"

# Keep script running to allow easy stop
wait $BACKEND_PID $FRONTEND_PID
