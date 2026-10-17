import axios from 'axios'

const INGESTION_API = '/api/ingestion'
const ANOMALY_API = '/api/anomaly'
const ALERTS_API = '/api/alerts'
const RCA_API = '/api/rca'

// Ingestion Service API
export const ingestionApi = {
  health: () => axios.get(`${INGESTION_API}/health`).then(r => r.data),
  ready: () => axios.get(`${INGESTION_API}/ready`).then(r => r.data),
  metrics: () => axios.get(`${INGESTION_API}/metrics`).then(r => r.data),
}

// Anomaly Detector API
export const anomalyApi = {
  health: () => axios.get(`${ANOMALY_API}/health`).then(r => r.data),
  ready: () => axios.get(`${ANOMALY_API}/ready`).then(r => r.data),
  predict: (features) =>
    axios.post(`${ANOMALY_API}/predict`, features).then(r => r.data),
  predictBatch: (samples) =>
    axios.post(`${ANOMALY_API}/predict/batch`, { samples }).then(r => r.data),
}

// Alert Service API
export const alertsApi = {
  health: () => axios.get(`${ALERTS_API}/health`).then(r => r.data),
  ready: () => axios.get(`${ALERTS_API}/ready`).then(r => r.data),
  channels: () => axios.get(`${ALERTS_API}/channels`).then(r => r.data),
  trigger: (alert) =>
    axios.post(`${ALERTS_API}/trigger`, alert).then(r => r.data),
}

// RCA Service API
export const rcaApi = {
  health: () => axios.get(`${RCA_API}/health`).then(r => r.data),
  ready: () => axios.get(`${RCA_API}/ready`).then(r => r.data),
  graphStats: () => axios.get(`${RCA_API}/graph/stats`).then(r => r.data),
  graph: () => axios.get(`${RCA_API}/graph`).then(r => r.data),
  findPath: (source, target) =>
    axios.get(`${RCA_API}/graph/path/${source}/${target}`).then(r => r.data),
  analyze: (request) =>
    axios.post(`${RCA_API}/analyze`, request).then(r => r.data),
}

// Health check all services
export const checkAllServices = async () => {
  const results = {
    ingestion: false,
    anomaly: false,
    alerts: false,
    rca: false,
  }

  try { await ingestionApi.health(); results.ingestion = true } catch {}
  try { await anomalyApi.health(); results.anomaly = true } catch {}
  try { await alertsApi.health(); results.alerts = true } catch {}
  try { await rcaApi.health(); results.rca = true } catch {}

  return results
}
