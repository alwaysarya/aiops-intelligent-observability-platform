import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, ShieldAlert, Send, CheckCircle2, AlertTriangle, Zap, Server, Activity, ArrowUpRight } from 'lucide-react'
import { showToast } from '../components/Premium/Toast'

const ease = [0.25, 0.1, 0.25, 1]

export default function Alerts() {
  const [alerts, setAlerts] = useState([
    { id: 1, title: 'Model Drift Detected', desc: 'yolov8n.pt accuracy dropped by 4%', severity: 'CRITICAL', time: '2 mins ago', icon: AlertTriangle, color: '#FF453A' },
    { id: 2, title: 'Precision Drop', desc: 'custom_v2.pt precision dropped by 2%', severity: 'WARNING', time: '15 mins ago', icon: ShieldAlert, color: '#E9A23B' },
    { id: 3, title: 'High Latency', desc: 'Inference latency > 200ms on node-04', severity: 'WARNING', time: '1 hour ago', icon: Server, color: '#E9A23B' },
  ])

  const [isTesting, setIsTesting] = useState(false)

  const handleTestAlert = () => {
    setIsTesting(true)
    setTimeout(() => {
      setIsTesting(false)
      showToast('Test alert triggered successfully!', 'success')
    }, 1500)
  }

  const handleAcknowledgeAll = () => {
    setAlerts([])
    showToast('All alerts acknowledged', 'success')
  }

  return (
    <div className="w-full min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-[-apple-system,BlinkMacSystemFont,'Inter',sans-serif] antialiased selection:bg-[#0071E3]/20 relative overflow-hidden">
      
      {/* PREMIUM HERO SECTION (Light Theme Grid & Glows) */}
      <section className="relative w-full overflow-hidden border-b border-black/[0.06]">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        {/* Glow Orbs */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0071E3]/[0.08] blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] bg-[#E9A23B]/[0.06] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-[1240px] mx-auto px-8 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-black/[0.06] bg-white/80 backdrop-blur-xl mb-8 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF453A] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF453A]" />
                </span>
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#6E6E73]">Live Routing</span>
              </div>
              <h1 className="text-[clamp(52px,6.5vw,96px)] font-black tracking-[-0.055em] leading-[0.92] mb-6">
                Alert<br />
                <span className="bg-gradient-to-r from-[#FF453A] to-[#E9A23B] bg-clip-text text-transparent">Routing.</span>
              </h1>
              <p className="text-[19px] leading-[1.65] text-[#6E6E73] max-w-[480px] font-medium">
                Route <span className="text-[#FF453A] font-semibold">critical signals</span> to the right teams instantly.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease }}>
              <button 
                onClick={handleAcknowledgeAll}
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-black text-white text-[15px] font-semibold hover:bg-[#0071E3] transition-all shadow-[0_15px_35px_-10px_rgba(0,0,0,0.3)] hover:scale-105"
              >
                <CheckCircle2 size={18} /> Acknowledge All
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="relative w-full bg-[#FBFBFD] py-16">
        <div className="max-w-[1240px] mx-auto px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Side: Active Alerts List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.06] shadow-sm flex items-center justify-center">
                    <Bell size={18} className="text-[#1D1D1F]" />
                  </div>
                  <h2 className="text-[20px] font-bold tracking-tight text-[#1D1D1F]">Active Alerts</h2>
                </div>
                <span className="px-3 py-1 rounded-full bg-white border border-black/[0.06] shadow-sm text-[13px] font-bold text-[#6E6E73]">{alerts.length} Active</span>
              </div>

              <AnimatePresence>
                {alerts.length === 0 ? (
                  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center p-20 bg-white rounded-[24px] border border-black/[0.06] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)]">
                    <div className="w-16 h-16 rounded-full bg-[#30D158]/10 flex items-center justify-center mb-6">
                      <CheckCircle2 size={32} className="text-[#30D158]" />
                    </div>
                    <p className="text-[#1D1D1F] font-bold text-xl mb-2">You're all caught up!</p>
                    <p className="text-[#86868B] text-[15px]">No active alerts to route at the moment.</p>
                  </motion.div>
                ) : (
                  alerts.map((alert, i) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease }}
                      whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.08)" }}
                      className="relative bg-white rounded-[20px] p-6 border border-black/[0.06] transition-all group"
                    >
                      {/* Colored border indicator */}
                      <div className="absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full" style={{ background: alert.color }} />
                      
                      <div className="flex items-start gap-5 pl-3">
                        <div className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${alert.color}12`, border: `1px solid ${alert.color}25` }}>
                          <alert.icon size={22} style={{ color: alert.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-[17px] text-[#1D1D1F] tracking-tight">{alert.title}</h3>
                            <span className="text-[10px] font-black tracking-wider px-2.5 py-1 rounded-md uppercase" style={{ background: `${alert.color}15`, color: alert.color }}>
                              {alert.severity}
                            </span>
                          </div>
                          <p className="text-[14px] text-[#6E6E73] font-medium">{alert.desc}</p>
                          <p className="text-[12px] text-[#AEAEB2] mt-3 font-mono font-medium">{alert.time}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Right Side: Widgets */}
            <div className="space-y-6">
              
              {/* Test Delivery Widget */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6, ease }}
                className="bg-white rounded-[24px] p-7 border border-black/[0.06] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#0071E3]/10 blur-3xl rounded-full" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0071E3]/10 border border-[#0071E3]/20 flex items-center justify-center">
                      <Send size={18} className="text-[#0071E3]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[16px] text-[#1D1D1F]">Test Delivery</h3>
                      <p className="text-[12px] text-[#86868B] font-medium">Verify routing rules</p>
                    </div>
                  </div>
                  <p className="text-[14px] text-[#6E6E73] mb-6 leading-relaxed font-medium">
                    Send a test payload to verify your routing rules are working correctly.
                  </p>
                  <button 
                    onClick={handleTestAlert}
                    disabled={isTesting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-black text-white font-semibold text-[14px] hover:bg-[#0071E3] transition-colors disabled:opacity-50 shadow-lg"
                  >
                    {isTesting ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                        <Activity size={16} />
                      </motion.div>
                    ) : (
                      <><Zap size={16} /> Trigger Test Alert</>
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Routing Rules Widget */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6, ease }}
                className="bg-white rounded-[24px] p-7 border border-black/[0.06] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#E9A23B]/10 border border-[#E9A23B]/20 flex items-center justify-center">
                    <ShieldAlert size={18} className="text-[#E9A23B]" />
                  </div>
                  <h3 className="font-bold text-[16px] text-[#1D1D1F]">Routing Rules</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Critical → PagerDuty', color: '#FF453A' },
                    { label: 'Warning → Slack #alerts', color: '#E9A23B' },
                    { label: 'Info → Email Digest', color: '#0071E3' },
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-[#FAFBFF] border border-black/[0.04] hover:border-black/[0.08] transition-colors cursor-default group">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full" style={{ background: rule.color }} />
                        <span className="text-[13px] text-[#1D1D1F] font-semibold">{rule.label}</span>
                      </div>
                      <ArrowUpRight size={14} className="text-[#AEAEB2] group-hover:text-[#1D1D1F] transition-colors" />
                    </div>
                  ))}
                </div>
              </motion.div>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
