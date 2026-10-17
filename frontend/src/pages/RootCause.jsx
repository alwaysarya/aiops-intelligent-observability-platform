import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Target, TrendingUp, Search, GitBranch, Network } from 'lucide-react'
import ReactFlow, { Background, Controls, MarkerType, Position } from 'reactflow'
import 'reactflow/dist/style.css'
import { rcaApi } from '../services/api'
import DarkFooter from '../components/Premium/DarkFooter'

const initialNodes = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'api-gateway' }, style: { background: '#0071E3', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px' } },
  { id: '2', position: { x: 100, y: 100 }, data: { label: 'user-service' }, style: { background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '10px' } },
  { id: '3', position: { x: 400, y: 100 }, data: { label: 'payment-service' }, style: { background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', borderRadius: '8px', padding: '10px' } },
  { id: '4', position: { x: 400, y: 200 }, data: { label: 'database' }, style: { background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '10px' } },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#9CA3AF' } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#EF4444', strokeWidth: 2 } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#EF4444', strokeWidth: 2 } },
]

function RootCause() {
  const [service, setService] = useState('payment-service')
  const [severity, setSeverity] = useState('high')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyze = async () => {
    setLoading(true); setResult(null)
    try { const data = await rcaApi.analyze({ service, severity }); setResult(data) }
    catch (e) { setResult({ error: e.message }) }
    setLoading(false)
  }

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-[52px] md:text-[72px] font-semibold tracking-[-0.04em] leading-[1.02] text-text-primary mb-4">
            Root Cause <span className="bg-gradient-to-r from-[#0071E3] to-[#30D158] bg-clip-text text-transparent">Analyzer.</span>
          </h1>
          <p className="text-[18px] text-text-secondary">AI-powered inference to find the exact source of anomalies.</p>
        </motion.div>
      </div>

      <section className="max-w-[1200px] mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Input & Results */}
        <div className="space-y-6">
          <div className="bg-white rounded-[24px] border border-black/[0.04] shadow-sm p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                <input type="text" value={service} onChange={(e) => setService(e.target.value)} placeholder="Service name"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-ink-grey border border-transparent focus:bg-white focus:border-apple-blue/40 outline-none transition-all text-[15px]" />
              </div>
              <select value={severity} onChange={(e) => setSeverity(e.target.value)} className="w-full px-5 py-3 rounded-xl bg-ink-grey border border-transparent outline-none text-[15px] font-medium text-text-primary">
                <option value="low">Low Severity</option>
                <option value="medium">Medium Severity</option>
                <option value="high">High Severity</option>
                <option value="critical">Critical Severity</option>
              </select>
              <button onClick={analyze} disabled={loading} className="w-full py-3.5 rounded-xl bg-apple-blue text-white font-semibold hover:bg-apple-blueHover transition-all flex items-center justify-center gap-2">
                {loading ? 'Analyzing...' : <><Zap size={18} /> Run Analysis</>}
              </button>
            </div>
          </div>

          {result && !result.error && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="bg-white rounded-2xl border border-black/[0.04] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[12px] font-bold text-text-tertiary uppercase tracking-wider">Top Cause</p>
                  <span className="px-2 py-0.5 rounded bg-green-50 text-apple-green text-[11px] font-bold">{(result.confidence * 100).toFixed(0)}% Match</span>
                </div>
                <h3 className="text-[20px] font-semibold text-text-primary capitalize mb-2">{result.root_causes?.[0]?.cause_type.replace(/_/g, ' ')}</h3>
                <p className="text-[14px] text-text-secondary">{result.root_causes?.[0]?.description}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right: Interactive Topology Graph */}
        <div className="bg-white rounded-[24px] border border-black/[0.04] shadow-sm overflow-hidden h-[500px] relative">
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-black/[0.08] shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary flex items-center gap-1"><Network size={12}/> Live Topology</p>
          </div>
          <ReactFlow nodes={initialNodes} edges={initialEdges} fitView proOptions={{ hideAttribution: true }}>
            <Background color="#F3F4F6" gap={20} size={1} />
            <Controls className="bg-white border border-black/[0.08] rounded-lg shadow-sm" showInteractive={false} />
          </ReactFlow>
        </div>
      </section>

      <DarkFooter badge="AI Inference" title="Automated" highlight="diagnosis." description="Stop guessing. Let our ML models pinpoint the exact failure in your microservice architecture." primary="View Graph" secondary="Learn More" />
    </div>
  )
}

export default RootCause
