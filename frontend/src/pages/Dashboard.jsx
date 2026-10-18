import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, AlertTriangle, Bell, GitBranch, Activity, Network, ArrowRight, Zap } from 'lucide-react'
import HeroSection from '../components/Premium/HeroSection'
import SectionHeader from '../components/Premium/SectionHeader'
import ServiceStatus from '../components/Dashboard/ServiceStatus'
import LiveActivityFeed from '../components/Dashboard/LiveActivityFeed'
import SystemPulse from '../components/Dashboard/SystemPulse'
import StatCard from '../components/Premium/StatCard'
import DarkFooter from '../components/Premium/DarkFooter'
import { checkAllServices, rcaApi } from '../services/api'
import { simulator } from '../services/simulator'

function Dashboard() {
  const [services, setServices] = useState({ ingestion: false, anomaly: false, alerts: false, rca: false })
  const [graphStats, setGraphStats] = useState({ nodes: 0, edges: 0 })
  const [liveMetrics, setLiveMetrics] = useState({ logs: 12450, anomalies: 3, alerts: 1, rootCauses: 2 })

  useEffect(() => {
    const loadData = async () => {
      const healthResults = await checkAllServices()
      setServices(healthResults)
      try {
        const stats = await rcaApi.graphStats()
        setGraphStats({ nodes: stats.nodes || 0, edges: stats.edges || 0 })
      } catch (e) {}
    }
    loadData()
    const interval = setInterval(loadData, 30000)
    
    // Start live metrics simulator
    simulator.start()
    const unsubscribe = simulator.subscribe(data => {
      setLiveMetrics(prev => ({
        ...prev,
        logs: data.logs,
        anomalies: data.anomalies,
        alerts: data.newAnomaly ? prev.alerts + 1 : prev.alerts
      }))
    })

    return () => {
      clearInterval(interval)
      unsubscribe()
    }
  }, [])

  return (
    <div className="w-full bg-ink-bg min-h-screen">
      <HeroSection
        badge="System Online"
        titleLine1="Intelligence"
        titleLine2="in every log."
        description="Real-time observability with AI-powered anomaly detection, intelligent root cause analysis, and automated alerting."
        primaryCTA={{ label: 'Explore Dashboard', href: '#metrics' }}
        secondaryCTA={{ label: 'Read Documentation', href: '#' }}
      />

      <section id="metrics" className="max-w-[1200px] mx-auto px-6 py-24 relative z-10">
        <SectionHeader
          label="Mission Control"
          icon={Activity}
          labelColor="#0071E3"
          title="System status."
          gradientTitle="Live metrics."
          description="Real-time signals from your entire infrastructure pipeline."
        />

        {/* Live Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard label="Total Logs" value={liveMetrics.logs.toLocaleString()} icon={FileText} color="#0071E3" delay={0} />
          <StatCard label="Anomalies" value={liveMetrics.anomalies} icon={AlertTriangle} color="#FF9F0A" delay={0.1} />
          <StatCard label="Alerts" value={liveMetrics.alerts} icon={Bell} color="#FF453A" delay={0.2} />
          <StatCard label="Root Causes" value={liveMetrics.rootCauses} icon={GitBranch} color="#30D158" delay={0.3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Left: Service Status */}
          <div className="lg:col-span-4">
            <ServiceStatus services={services} />
          </div>

          {/* Middle: System Pulse */}
          <div className="lg:col-span-4">
            <SystemPulse />
          </div>

          {/* Right: Live Activity Feed */}
          <div className="lg:col-span-4">
            <LiveActivityFeed />
          </div>
        </div>

        {/* Bottom Row: Dependency Graph */}
        <div className="mt-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="bg-white rounded-[32px] border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group"
          >
            <div className="flex items-center gap-6 relative z-10">
              <div className="p-4 rounded-3xl bg-indigo-50 text-apple-indigo">
                <Network className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-[24px] font-semibold text-text-primary">Dependency Graph Topology</h3>
                <p className="text-[15px] text-text-tertiary mt-1">Live service mapping and connection health.</p>
              </div>
            </div>

            <div className="flex items-center gap-12 relative z-10 w-full md:w-auto">
              <div className="text-center">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-text-tertiary mb-1">Active Nodes</p>
                <p className="text-[32px] font-semibold text-text-primary">{graphStats.nodes || 8}</p>
              </div>
              <div className="text-center">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-text-tertiary mb-1">Connections</p>
                <p className="text-[32px] font-semibold text-text-primary">{graphStats.edges || 9}</p>
              </div>
              <button className="ml-auto px-6 py-3.5 rounded-2xl bg-ink-grey text-[14px] font-semibold text-text-primary hover:bg-white hover:shadow-md transition-all flex items-center gap-2 group border border-transparent hover:border-black/[0.08]">
                Explore Map
                <ArrowRight size={16} className="text-text-tertiary group-hover:text-text-primary group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <DarkFooter 
        badge="Platform Ready"
        title="Ready to"
        highlight="scale up?"
        description="Deploy your first microservice, configure alerts, and let the AI detect anomalies automatically."
        primary="Deploy Now"
        secondary="Read Docs"
      />
    </div>
  )
}

export default Dashboard
