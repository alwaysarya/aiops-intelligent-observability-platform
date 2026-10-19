import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Target, TrendingUp, Search, GitBranch, Network, Sparkles, AlertCircle, ShieldAlert } from 'lucide-react'
import ReactFlow, { Background, Controls, MarkerType, Position } from 'reactflow'
import 'reactflow/dist/style.css'
import { rcaApi } from '../services/api'
import DarkFooter from '../components/Premium/DarkFooter'

const linearEase = [0.25, 0.1, 0.25, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.05, ease: linearEase } }),
}

const initialNodes = [
  { 
    id: '1', 
    position: { x: 250, y: 0 }, 
    data: { label: 'api-gateway' }, 
    style: { 
      background: 'linear-gradient(135deg, #5E6AD2, #8B5CF6)', 
      color: '#fff', 
      border: '1px solid rgba(139,92,246,0.5)', 
      borderRadius: '8px', 
      padding: '10px 14px', 
      fontSize: '12px', 
      fontWeight: 600,
      boxShadow: '0 0 20px rgba(94,106,210,0.4)'
    } 
  },
  { 
    id: '2', 
    position: { x: 100, y: 120 }, 
    data: { label: 'user-service' }, 
    style: { 
      background: '#161718', 
      border: '1px solid rgba(255,255,255,0.08)', 
      color: '#EDEDED', 
      borderRadius: '8px', 
      padding: '10px 14px', 
      fontSize: '12px', 
      fontWeight: 500 
    } 
  },
  { 
    id: '3', 
    position: { x: 400, y: 120 }, 
    data: { label: 'payment-service' }, 
    style: { 
      background: 'rgba(255,69,58,0.15)', 
      border: '1px solid rgba(255,69,58,0.4)', 
      color: '#FF453A', 
      borderRadius: '8px', 
      padding: '10px 14px', 
      fontSize: '12px', 
      fontWeight: 600,
      boxShadow: '0 0 20px rgba(255,69,58,0.3)'
    } 
  },
  { 
    id: '4', 
    position: { x: 400, y: 240 }, 
    data: { label: 'database' }, 
    style: { 
      background: '#161718', 
      border: '1px solid rgba(255,255,255,0.08)', 
      color: '#EDEDED', 
      borderRadius: '8px', 
      padding: '10px 14px', 
      fontSize: '12px', 
      fontWeight: 500 
    } 
  },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: 'rgba(255,255,255,0.15)', strokeWidth: 1.5 } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#FF453A', strokeWidth: 2, filter: 'drop-shadow(0 0 5px rgba(255,69,58,0.5))' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#FF453A', strokeWidth: 2, filter: 'drop-shadow(0 0 5px rgba(255,69,58,0.5))' } },
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
    <div className="w-full min-h-screen bg-[#09090B] text-[#EDEDED] font-[-apple-system,BlinkMacSystemFont,'Inter','Helvetica_Neue',sans-serif] antialiased selection:bg-[#5E6AD2]/30">
      
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#5E6AD2]/[0.12] blur-[130px] rounded-full pointer-events-none" />
        
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div key={i} animate={{ y: [0, -150, 0], opacity: [0, 1, 0] }} transition={{ duration: Math.random() * 8 + 8, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute w-1 h-1 bg-[#5E6AD2] rounded-full blur-[1px] shadow-[0_0_8px_#5E6AD2]" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
        ))}

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-24 md:py-28">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: linearEase }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(94,106,210,0.1)]">
                <GitBranch size={12} className="text-[#5E6AD2]" />
                <span className="text-[12px] font-medium text-[#8A8F98]">AI Inference</span>
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: linearEase }} className="text-[56px] md:text-[72px] font-semibold tracking-[-0.04em] leading-[1.05] mb-4 text-[#EDEDED]">
              Root Cause <br />
              <span className="bg-gradient-to-r from-[#5E6AD2] via-[#30D158] to-[#5E6AD2] bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]">Analyzer.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: linearEase }} className="text-[17px] text-[#8A8F98] max-w-[500px] leading-[1.6]">
              AI-powered inference to find the exact source of anomalies.
            </motion.p>
          </div>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="max-w-[1100px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT: Input & Results */}
          <div className="space-y-4">
            
            {/* Input Panel */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="bg-[#0F1011] rounded-xl border border-white/[0.06] p-6 relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#5E6AD2]/[0.05] blur-[60px] rounded-full pointer-events-none" />

              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-9 h-9 rounded-lg bg-[#5E6AD2]/10 border border-[#5E6AD2]/20 flex items-center justify-center">
                  <Sparkles size={16} className="text-[#5E6AD2]" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#EDEDED]">Analyze Failure</h3>
                  <p className="text-[11px] text-[#5A5F66]">Enter service name to begin</p>
                </div>
              </div>

              <div className="space-y-3 relative z-10">
                <div className="relative group">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A5F66] group-focus-within:text-[#5E6AD2] transition-colors" />
                  <input 
                    type="text" 
                    value={service} 
                    onChange={(e) => setService(e.target.value)} 
                    placeholder="Service name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#161718] border border-white/[0.06] focus:border-[#5E6AD2]/50 outline-none transition-all text-[13px] text-[#EDEDED] placeholder:text-[#5A5F66]" 
                  />
                </div>
                
                <select 
                  value={severity} 
                  onChange={(e) => setSeverity(e.target.value)} 
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#161718] border border-white/[0.06] focus:border-[#5E6AD2]/50 outline-none text-[13px] font-medium text-[#EDEDED] cursor-pointer"
                >
                  <option value="low">Low Severity</option>
                  <option value="medium">Medium Severity</option>
                  <option value="high">High Severity</option>
                  <option value="critical">Critical Severity</option>
                </select>
                
                <button 
                  onClick={analyze} 
                  disabled={loading} 
                  className="w-full py-2.5 rounded-lg bg-[#EDEDED] text-[#09090B] font-semibold text-[13px] hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  {loading ? (
                    <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-[#09090B]/30 border-t-[#09090B] rounded-full" /> Analyzing...</>
                  ) : (
                    <><Zap size={14} /> Run Analysis</>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Result Card */}
            {result && !result.error && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="bg-[#0F1011] rounded-xl border border-white/[0.06] p-6 relative overflow-hidden">
                
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#30D158]/[0.05] blur-[60px] rounded-full pointer-events-none" />
                
                <div className="flex items-center justify-between mb-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <Target size={14} className="text-[#30D158]" />
                    <p className="text-[11px] font-bold text-[#8A8F98] uppercase tracking-wider">Top Cause</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#30D158]/10 text-[#30D158] border border-[#30D158]/20">
                    {(result.confidence * 100).toFixed(0)}% Match
                  </span>
                </div>
                <h3 className="text-[18px] font-semibold text-[#EDEDED] capitalize mb-2 relative z-10">{result.root_causes?.[0]?.cause_type.replace(/_/g, ' ')}</h3>
                <p className="text-[13px] text-[#8A8F98] leading-relaxed relative z-10">{result.root_causes?.[0]?.description}</p>
              </motion.div>
            )}

            {/* Error State */}
            {result && result.error && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-[#FF453A]/10 border border-[#FF453A]/20 rounded-xl p-5 flex items-center gap-3">
                <AlertCircle size={18} className="text-[#FF453A]" />
                <p className="text-[13px] text-[#FF453A]">{result.error}</p>
              </motion.div>
            )}
          </div>

          {/* RIGHT: Interactive Topology Graph */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="bg-[#0F1011] rounded-xl border border-white/[0.06] overflow-hidden h-[500px] relative">
            
            <div className="absolute top-4 left-4 z-10 bg-[#09090B]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/[0.08] shadow-lg">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8F98] flex items-center gap-1.5">
                <Network size={11} className="text-[#5E6AD2]" /> Live Topology
              </p>
            </div>
            
            <div className="w-full h-full dark-reactflow">
              <ReactFlow 
                nodes={initialNodes} 
                edges={initialEdges} 
                fitView 
                proOptions={{ hideAttribution: true }}
              >
                <Background color="rgba(255,255,255,0.05)" gap={20} size={1} />
                <Controls 
                  className="bg-[#161718] border border-white/[0.06] rounded-lg shadow-lg" 
                  showInteractive={false} 
                  style={{ color: '#EDEDED' }}
                />
              </ReactFlow>
            </div>
          </motion.div>
        </div>
      </section>

      <DarkFooter 
        badge="AI Inference" 
        title="Automated" 
        highlight="diagnosis." 
        description="Stop guessing. Let our ML models pinpoint the exact failure in your microservice architecture." 
        primary="View Graph" 
        secondary="Learn More" 
      />

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .dark-reactflow .react-flow__controls button {
          background: #161718;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          color: #EDEDED;
          fill: #EDEDED;
        }
        .dark-reactflow .react-flow__controls button:hover {
          background: #1A1B1E;
        }
        .dark-reactflow .react-flow__controls button svg {
          fill: #EDEDED;
        }
      `}</style>
    </div>
  )
}

export default RootCause
