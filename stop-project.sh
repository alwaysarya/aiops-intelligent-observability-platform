#!/bin/bash
echo "🛑 Stopping AIOps Project..."

# Kill processes on ports 3000 and 8080
lsof -ti:8080 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null

echo "✅ All services stopped."
