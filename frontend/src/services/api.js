import axios from 'axios'
import { authService } from './auth'

const BASE_URL = 'http://localhost:8080/api'

const http = axios.create({ 
  timeout: 5000, 
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

// Add JWT Token to all requests
http.interceptors.request.use((config) => {
  const token = authService.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.logout()
    }
    return Promise.reject(error)
  }
)

export const ingestionApi = {
  health: () => http.get(`/ingestion/health`).then(r => r.data),
  ingestLog: (log) => http.post(`/ingestion/ingest`, log).then(r => r.data),
  getLogs: () => http.get(`/ingestion/logs`).then(r => r.data),
}

export const anomalyApi = {
  health: () => http.get(`/anomaly/health`).then(r => r.data),
  predict: (features) => http.post(`/anomaly/predict`, features).then(r => r.data),
}

export const alertsApi = {
  health: () => http.get(`/alerts/health`).then(r => r.data),
  channels: () => http.get(`/alerts/channels`).then(r => r.data),
  trigger: (alert) => http.post(`/alerts/trigger`, alert).then(r => r.data),
}

export const rcaApi = {
  health: () => http.get(`/rca/health`).then(r => r.data),
  graphStats: () => http.get(`/rca/graph/stats`).then(r => r.data),
  analyze: (request) => http.post(`/rca/analyze`, request).then(r => r.data),
}

export const checkAllServices = async () => {
  const results = { ingestion: false, anomaly: false, alerts: false, rca: false }
  try { await ingestionApi.health(); results.ingestion = true } catch {}
  try { await anomalyApi.health(); results.anomaly = true } catch {}
  try { await alertsApi.health(); results.alerts = true } catch {}
  try { await rcaApi.health(); results.rca = true } catch {}
  return results
}
