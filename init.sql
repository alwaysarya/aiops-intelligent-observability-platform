-- 1. Logs Table
CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    level VARCHAR(10) NOT NULL,
    service VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    duration_ms INT DEFAULT 0
);

-- 2. Alerts Table
CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    title VARCHAR(100) NOT NULL,
    description TEXT,
    severity VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    assigned_to VARCHAR(50)
);

-- 3. Metrics Table
CREATE TABLE IF NOT EXISTS metrics (
    id SERIAL PRIMARY KEY,
    recorded_at TIMESTAMPTZ DEFAULT NOW(),
    service VARCHAR(50) NOT NULL,
    cpu_usage FLOAT,
    memory_usage FLOAT,
    request_count INT DEFAULT 0
);
