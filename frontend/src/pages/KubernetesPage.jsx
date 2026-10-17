import { motion } from 'framer-motion'
import { Server, Box, Activity, ShieldCheck, ChevronRight, Layers } from 'lucide-react'
import DarkFooter from '../components/Premium/DarkFooter'

function KubernetesPage() {
  const pods = [
    { name: 'aiops-log-ingestion-7d8f9', status: 'Running', restarts: 0, age: '2d', color: '#30D158' },
    { name: 'aiops-anomaly-detector-5c6b', status: 'Running', restarts: 1, age: '1d', color: '#30D158' },
    { name: 'aiops-alert-service-2a3b', status: 'Running', restarts: 0, age: '5h', color: '#30D158' },
    { name: 'aiops-rca-9f8e7d', status: 'CrashLoop', restarts: 12, age: '10m', color: '#FF453A' },
  ]

  return (
    <div className="w-full bg-white min-h-screen">
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-apple-blue mb-6">
            <Layers size={14} />
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase">Infrastructure</span>
          </div>
          <h1 className="text-[52px] md:text-[72px] font-semibold tracking-[-0.04em] leading-[1.02] text-text-primary mb-4">
            Cluster <span className="bg-gradient-to-r from-[#0071E3] to-[#30D158] bg-clip-text text-transparent">Health.</span>
          </h1>
          <p className="text-[18px] text-text-secondary">Monitor Kubernetes nodes, pods, and deployments in real-time.</p>
        </motion.div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Active Pods', value: '12', icon: Box, color: '#0071E3' },
            { label: 'Nodes Online', value: '3', icon: Server, color: '#30D158' },
            { label: 'Deployments', value: '5', icon: Activity, color: '#AF52DE' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[24px] border border-black/[0.04] p-6 shadow-sm flex items-center gap-5">
              <div className="p-4 rounded-2xl" style={{ background: `${stat.color}10`, color: stat.color }}><stat.icon size={24} /></div>
              <div>
                <p className="text-[12px] font-bold uppercase tracking-wider text-text-tertiary mb-1">{stat.label}</p>
                <p className="text-[32px] font-semibold text-text-primary leading-none">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-[32px] border border-black/[0.04] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-black/[0.04] flex items-center justify-between bg-ink-grey/30">
            <h3 className="text-[20px] font-semibold text-text-primary flex items-center gap-2"><Box size={20} className="text-apple-blue" /> Pods Overview</h3>
            <button className="text-[13px] font-semibold text-apple-blue hover:underline flex items-center gap-1">View All <ChevronRight size={14} /></button>
          </div>
          <div className="divide-y divide-black/[0.04]">
            {pods.map((pod, i) => (
              <motion.div key={pod.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="flex items-center justify-between p-5 hover:bg-ink-grey/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full" style={{ background: pod.color, boxShadow: `0 0 10px ${pod.color}` }} />
                  <div>
                    <p className="text-[15px] font-semibold text-text-primary font-mono">{pod.name}</p>
                    <p className="text-[12px] text-text-tertiary">Restarts: {pod.restarts} • Age: {pod.age}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[12px] font-bold" style={{ background: `${pod.color}15`, color: pod.color }}>{pod.status}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DarkFooter badge="Kubernetes" title="Scale with" highlight="confidence." description="Deploy, manage, and scale containerized applications seamlessly." primary="Cluster Settings" secondary="Docs" />
    </div>
  )
}

export default KubernetesPage
