import { configureStore, createSlice } from '@reduxjs/toolkit'

// Alerts slice
const alertsSlice = createSlice({
  name: 'alerts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setAlerts: (state, action) => {
      state.items = action.payload
    },
    addAlert: (state, action) => {
      state.items.unshift(action.payload)
      if (state.items.length > 100) state.items.pop()
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

// Anomalies slice
const anomaliesSlice = createSlice({
  name: 'anomalies',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setAnomalies: (state, action) => {
      state.items = action.payload
    },
    addAnomaly: (state, action) => {
      state.items.unshift(action.payload)
      if (state.items.length > 100) state.items.pop()
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

// Metrics slice
const metricsSlice = createSlice({
  name: 'metrics',
  initialState: {
    totalLogs: 0,
    totalAnomalies: 0,
    totalAlerts: 0,
    totalRootCauses: 0,
    services: [],
    loading: false,
  },
  reducers: {
    setMetrics: (state, action) => {
      return { ...state, ...action.payload }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const { setAlerts, addAlert } = alertsSlice.actions
export const { setAnomalies, addAnomaly } = anomaliesSlice.actions
export const { setMetrics } = metricsSlice.actions

export const store = configureStore({
  reducer: {
    alerts: alertsSlice.reducer,
    anomalies: anomaliesSlice.reducer,
    metrics: metricsSlice.reducer,
  },
})
