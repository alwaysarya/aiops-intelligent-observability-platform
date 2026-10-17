import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, AlertTriangle, Bell, GitBranch, Activity, Zap, Network, ArrowRight } from 'lucide-react'
import StatCard from '../Premium/StatCard'

export default function LiveMetrics() {
  const [metrics, setMetrics] = useState({
    logs: 12450,
    anomalies: 3,
    alerts: 1,
    rootCauses: 2
  })

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        logs: prev.logs + Math.floor(Math.random() * 5),
        anomalies: Math.random() > 0.8 ? prev.anomalies + 1 : prev.anomalies,
        alerts: Math.random() > 0.9 ? prev.alerts + 1 : prev.alerts,
        rootCauses: Math.random() > 0.95 ? prev.rootCauses + 1 : prev.rootCauses
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
      <StatCard label="Total Logs" value={metrics.logs.toLocaleString()} icon={FileText} color="#0071E3" delay={0} />
      <StatCard label="Anomalies" value={metrics.anomalies} icon={AlertTriangle} color="#FF9F0A" delay={0.1} />
      <StatCard label="Alerts" value={metrics.alerts} icon={Bell} color="#FF453A" delay={0.2} />
      <StatCard label="Root Causes" value={metrics.rootCauses} icon={GitBranch} color="#30D158" delay={0.3} />
    </div>
  )
}
