import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Clock, Server, AlertTriangle, ChevronRight, Search, Zap } from 'lucide-react'
import DarkFooter from '../components/Premium/DarkFooter'

const mockTraces = [
  { id: 'tr-8f9a2b3c', service: 'api-gateway', duration: '124ms', status: '200 OK', time: '2 mins ago', spans: 5 },
  { id: 'tr-1a2b3c4d', service: 'payment-service', duration: '1250ms', status: '500 Error', time: '5 mins ago', spans: 8, error: true },
  { id: 'tr-5e6f7g8h', service: 'user-service', duration: '45ms', status: '200 OK', time: '10 mins ago', spans: 3 },
]

const mockWaterfall = [
  { service: 'api-gateway', duration: 124, start: 0, depth: 0, color: '#0071E3' },
  { service: 'auth-service', duration: 20, start: 10, depth: 1, color: '#30D158' },
  { service: 'payment-service', duration: 80, start: 30, depth: 1, color: '#FF9F0A' },
  { service: 'database', duration: 50, start: 40, depth: 2, color: '#AF52DE' },
  { service: 'notification', duration: 10, start: 110, depth: 1, color: '#5AC8FA' },
]

function TracesPage() {
  const [selectedTrace, setSelectedTrace] = useState(mockTraces[0])

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-apple-purple mb-6">
            <Activity size={14} />
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase">Distributed Tracing</span>
          </div>
          <h1 className="text-[52px] md:text-[72px] font-semibold tracking-[-0.04em] leading-[1.02] text-text-primary mb-4">
            Request <span className="bg-gradient-to-r from-[#AF52DE] to-[#0071E3] bg-clip-text text-transparent">Traces.</span>
          </h1>
          <p className="text-[18px] text-text-secondary">End-to-end visibility into every microservice call.</p>
        </motion.div>
      </div>

      <section className="max-w-[1200px] mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Trace List */}
        <div className="lg:col-span-1 bg-white rounded-[24px] border border-black/[0.04] shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-black/[0.04] bg-ink-grey/30 flex items-center gap-2">
            <Search size={16} className="text-text-tertiary" />
            <input type="text" placeholder="Search trace ID..." className="bg-transparent border-none outline-none text-[13px] w-full" />
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockTraces.map((trace) => (
              <div 
                key={trace.id} 
                onClick={() => setSelectedTrace(trace)}
                className={`p-4 border-b border-black/[0.04] cursor-pointer transition-colors ${selectedTrace.id === trace.id ? 'bg-blue-50/50 border-l-4 border-l-apple-blue' : 'hover:bg-ink-grey border-l-4 border-l-transparent'}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[12px] font-mono text-text-secondary">{trace.id}</span>
                  <span className={`text-[11px] font-bold ${trace.error ? 'text-apple-red' : 'text-apple-green'}`}>{trace.status}</span>
                </div>
                <p className="text-[14px] font-semibold text-text-primary">{trace.service}</p>
                <div className="flex items-center gap-3 mt-2 text-[12px] text-text-tertiary">
                  <span className="flex items-center gap-1"><Clock size={12}/> {trace.duration}</span>
                  <span className="flex items-center gap-1"><Zap size={12}/> {trace.spans} spans</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Waterfall View */}
        <div className="lg:col-span-2 bg-white rounded-[24px] border border-black/[0.04] shadow-sm p-6">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/[0.04]">
            <div>
              <h2 className="text-[20px] font-semibold text-text-primary flex items-center gap-2"><Activity size={20} className="text-apple-purple"/> Trace: {selectedTrace.id}</h2>
              <p className="text-[13px] text-text-secondary mt-1">Request flow for {selectedTrace.service}</p>
            </div>
            <div className="text-right">
              <p className="text-[24px] font-bold text-text-primary">{selectedTrace.duration}</p>
              <p className="text-[12px] text-text-tertiary uppercase tracking-wider">Total Time</p>
            </div>
          </div>

          <div className="space-y-4 relative">
            {mockWaterfall.map((span, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-[13px] font-semibold text-text-primary">{span.service}</span>
                  <span className="text-[11px] text-text-tertiary font-mono">{span.duration}ms</span>
                </div>
                <div className="h-8 bg-ink-grey rounded-md w-full relative overflow-hidden flex items-center">
                  <motion.div 
                    initial={{ width: 0 }} animate={{ width: `${span.duration}%` }} transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-full rounded-md absolute flex items-center px-2"
                    style={{ 
                      left: `${span.start}%`, 
                      background: span.color, 
                      minWidth: '20px',
                      boxShadow: `0 0 10px ${span.color}40`
                    }}
                  >
                    <span className="text-[10px] text-white font-bold opacity-0 hover:opacity-100 transition-opacity">{span.duration}ms</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-red-50 rounded-xl border border-red-100 flex items-start gap-3">
            <AlertTriangle className="text-apple-red shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-[14px] font-semibold text-apple-red">Latency Bottleneck Detected</p>
              <p className="text-[13px] text-red-600 mt-1">The database call inside payment-service is taking 50ms, which is 40% of the total request time.</p>
            </div>
          </div>
        </div>
      </section>

      <DarkFooter badge="Observability" title="Trace every" highlight="millisecond." description="Connect OpenTelemetry and Jaeger to see live production traces." primary="Configure Jaeger" secondary="Docs" />
    </div>
  )
}

export default TracesPage
