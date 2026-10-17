import axios from 'axios'

// Base URLs (Proxy through Vite config)
const INGESTION_API = '/api/ingestion'
const ANOMALY_API = '/api/anomaly'
const ALERTS_API = '/api/alerts'
const RCA_API = '/api/rca'

// Create axios instances with timeouts
const http = axios.create({ timeout: 5000 })

export const ingestionApi = {
  health: () => http.get(`${INGESTION_API}/health`).then(r => r.data),
  ready: () => http.get(`${INGESTION_API}/ready`).then(r => r.data),
  metrics: () => http.get(`${INGESTION_API}/metrics`).then(r => r.data).catch(() => null),
}

export const anomalyApi = {
  health: () => http.get(`${ANOMALY_API}/health`).then(r => r.data),
  ready: () => http.get(`${ANOMALY_API}/ready`).then(r => r.data),
  predict: (features) => http.post(`${ANOMALY_API}/predict`, features).then(r => r.data),
  predictBatch: (samples) => http.post(`${ANOMALY_API}/predict/batch`, { samples }).then(r => r.data),
}

export const alertsApi = {
  health: () => http.get(`${ALERTS_API}/health`).then(r => r.data),
  ready: () => http.get(`${ALERTS_API}/ready`).then(r => r.data),
  channels: () => http.get(`${ALERTS_API}/channels`).then(r => r.data),
  trigger: (alert) => http.post(`${ALERTS_API}/trigger`, alert).then(r => r.data),
}

export const rcaApi = {
  health: () => http.get(`${RCA_API}/health`).then(r => r.data),
  graphStats: () => http.get(`${RCA_API}/graph/stats`).then(r => r.data),
  graph: () => http.get(`${RCA_API}/graph`).then(r => r.data),
  findPath: (source, target) => http.get(`${RCA_API}/graph/path/${source}/${target}`).then(r => r.data),
  analyze: (request) => http.post(`${RCA_API}/analyze`, request).then(r => r.data),
}

// Real health check with all services
export const checkAllServices = async () => {
  const results = { ingestion: false, anomaly: false, alerts: false, rca: false }
  try { await ingestionApi.health(); results.ingestion = true } catch {}
  try { await anomalyApi.health(); results.anomaly = true } catch {}
  try { await alertsApi.health(); results.alerts = true } catch {}
  try { await rcaApi.health(); results.rca = true } catch {}
  return results
}
