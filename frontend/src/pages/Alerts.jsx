import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bell, Send, CheckCircle, AlertCircle, MessageSquare, 
  Mail, Webhook, Zap, ShieldAlert, CheckCheck, TrendingDown, 
  Radio, Activity, Layers, ArrowRight, Sparkles
} from 'lucide-react'
import { alertsApi } from '../services/api'
import DarkFooter from '../components/Premium/DarkFooter'
import { showToast } from '../components/Premium/Toast'

const linearEase = [0.25, 0.1, 0.25, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.05, ease: linearEase } }),
}

function Alerts() {
  const [channels, setChannels] = useState({ active: [], all: [] })
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)
  const [routes, setRoutes] = useState({ critical: 'pagerduty', high: 'slack', medium: 'email' })
  const [acknowledged, setAcknowledged] = useState(false)

  useEffect(() => { loadChannels() }, [])

  const loadChannels = async () => {
    try { const data = await alertsApi.channels(); setChannels(data) } catch (e) {}
  }

  const testAlert = async () => {
    setTesting(true); setTestResult(null)
    try {
      const result = await alertsApi.trigger({ title: 'Test Alert', message: 'Test message', severity: 'high', service: 'test-service', host: 'test-host' })
      setTestResult({ success: true, data: result })
      showToast('Test alert sent successfully!', 'success')
    } catch (e) { 
      setTestResult({ success: false, error: e.message }) 
      showToast('Failed to send alert.', 'error')
    }
    setTesting(false)
  }

  const handleAcknowledgeAll = () => {
    setAcknowledged(true)
    showToast('All active alerts acknowledged!', 'success')
  }

  const channelIcons = { slack: MessageSquare, email: Mail, webhook: Webhook }

  return (
    <div className="w-full min-h-screen bg-[#09090B] text-[#EDEDED] font-[-apple-system,BlinkMacSystemFont,'Inter','Helvetica_Neue',sans-serif] antialiased selection:bg-[#5E6AD2]/30">
      
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#FF453A]/[0.08] blur-[130px] rounded-full pointer-events-none" />
        
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div key={i} animate={{ y: [0, -150, 0], opacity: [0, 1, 0] }} transition={{ duration: Math.random() * 8 + 8, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute w-1 h-1 bg-[#5E6AD2] rounded-full blur-[1px] shadow-[0_0_8px_#5E6AD2]" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
        ))}

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-24 md:py-28">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: linearEase }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(255,69,58,0.1)]">
                  <Radio size={12} className="text-[#FF453A] animate-pulse" />
                  <span className="text-[12px] font-medium text-[#8A8F98]">Live Routing</span>
                </div>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: linearEase }} className="text-[56px] md:text-[72px] font-semibold tracking-[-0.04em] leading-[1.05] mb-4 text-[#EDEDED]">
                Alert <br />
                <span className="bg-gradient-to-r from-[#FF453A] via-[#E5A00D] to-[#FF453A] bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]">Routing.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: linearEase }} className="text-[17px] text-[#8A8F98] max-w-[400px] leading-[1.6]">
                Route critical signals to the right teams instantly.
              </motion.p>
            </div>

            <motion.button 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: linearEase }}
              onClick={handleAcknowledgeAll} 
              disabled={acknowledged} 
              className={`px-5 py-3 rounded-lg font-semibold text-[14px] transition-all flex items-center gap-2 ${
                acknowledged 
                  ? 'bg-[#30D158]/10 text-[#30D158] border border-[#30D158]/20' 
                  : 'bg-[#EDEDED] text-[#09090B] hover:bg-white shadow-[0_0_15px_rgba(255,255,255,0.1)]'
              }`}>
              <CheckCheck size={16} /> {acknowledged ? 'All Acknowledged' : 'Acknowledge All'}
            </motion.button>
          </div>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="max-w-[1100px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            
            {/* Model Drift Alerts */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="bg-[#0F1011] rounded-2xl border border-white/[0.06] p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#FF453A]/10 border border-[#FF453A]/20 flex items-center justify-center">
                  <TrendingDown size={18} className="text-[#FF453A]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#EDEDED]">Model Drift Alerts</h3>
                  <p className="text-[12px] text-[#5A5F66]">2 active alerts</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 rounded-lg bg-[#161718] border border-white/[0.04] hover:border-[#FF453A]/30 transition-colors">
                  <div>
                    <p className="text-[14px] font-semibold text-[#EDEDED] font-mono">yolov8n.pt</p>
                    <p className="text-[12px] text-[#8A8F98] mt-0.5">Accuracy dropped by 4% (was 19.3%)</p>
                  </div>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FF453A]/10 text-[#FF453A] border border-[#FF453A]/20 shadow-[0_0_8px_rgba(255,69,58,0.2)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF453A] animate-pulse" /> Critical
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-lg bg-[#161718] border border-white/[0.04] hover:border-[#E5A00D]/30 transition-colors">
                  <div>
                    <p className="text-[14px] font-semibold text-[#EDEDED] font-mono">custom_v2.pt</p>
                    <p className="text-[12px] text-[#8A8F98] mt-0.5">Precision dropped by 2% (was 53.6%)</p>
                  </div>
                  <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-[#E5A00D]/10 text-[#E5A00D] border border-[#E5A00D]/20">
                    Warning
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Connected Channels */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="bg-[#0F1011] rounded-2xl border border-white/[0.06] p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#5E6AD2]/10 border border-[#5E6AD2]/20 flex items-center justify-center">
                  <Bell size={18} className="text-[#5E6AD2]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#EDEDED]">Connected Channels</h3>
                  <p className="text-[12px] text-[#5A5F66]">Delivery endpoints</p>
                </div>
              </div>
              <div className="space-y-2">
                {channels.all?.map((ch) => {
                  const isActive = channels.active.includes(ch)
                  const Icon = channelIcons[ch] || Bell
                  return (
                    <div key={ch} className="flex items-center justify-between p-3.5 rounded-lg bg-[#161718] border border-white/[0.04] hover:border-white/[0.1] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-[#09090B] border border-white/[0.06] flex items-center justify-center">
                          <Icon size={16} className="text-[#8A8F98]" />
                        </div>
                        <span className="text-[14px] font-medium text-[#EDEDED] capitalize">{ch}</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                        isActive 
                          ? 'bg-[#30D158]/10 text-[#30D158] border-[#30D158]/20' 
                          : 'bg-white/[0.02] text-[#5A5F66] border-white/[0.06]'
                      }`}>
                        {isActive ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                  )
                })}
                {(!channels.all || channels.all.length === 0) && (
                  <p className="text-[13px] text-[#5A5F66] text-center py-4">No channels configured.</p>
                )}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            
            {/* Test Delivery */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="bg-[#0F1011] rounded-2xl border border-white/[0.06] p-6 relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#5E6AD2]/[0.05] blur-[60px] rounded-full pointer-events-none" />

              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-10 h-10 rounded-lg bg-[#5E6AD2]/10 border border-[#5E6AD2]/20 flex items-center justify-center">
                  <Send size={18} className="text-[#5E6AD2]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#EDEDED]">Test Delivery</h3>
                  <p className="text-[12px] text-[#5A5F66]">Verify routing rules</p>
                </div>
              </div>
              
              <p className="text-[13px] text-[#8A8F98] mb-5 relative z-10">Send a test payload to verify your routing rules are working correctly.</p>
              
              <button 
                onClick={testAlert} 
                disabled={testing} 
                className="w-full py-3 rounded-lg bg-[#EDEDED] text-[#09090B] font-semibold text-[14px] hover:bg-white transition-all flex items-center justify-center gap-2 relative z-10 disabled:opacity-50 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                {testing ? (
                  <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-[#09090B]/30 border-t-[#09090B] rounded-full" /> Sending...</>
                ) : (
                  <><Send size={16} /> Trigger Test Alert</>
                )}
              </button>
              
              {testResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-3.5 rounded-lg flex items-center gap-2 text-[13px] font-medium border ${
                    testResult.success 
                      ? 'bg-[#30D158]/10 text-[#30D158] border-[#30D158]/20' 
                      : 'bg-[#FF453A]/10 text-[#FF453A] border-[#FF453A]/20'
                  }`}
                >
                  {testResult.success ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  {testResult.success ? `Success! ID: ${testResult.data?.alert_id?.slice(0,8) || 'N/A'}` : `Error: ${testResult.error}`}
                </motion.div>
              )}
            </motion.div>

            {/* Routing Rules */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="bg-[#0F1011] rounded-2xl border border-white/[0.06] p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#E5A00D]/10 border border-[#E5A00D]/20 flex items-center justify-center">
                  <Zap size={18} className="text-[#E5A00D]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#EDEDED]">Routing Rules</h3>
                  <p className="text-[12px] text-[#5A5F66]">Severity-based routing</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {[
                  { level: 'Critical', color: 'text-[#FF453A]', bg: 'bg-[#FF453A]/10', border: 'border-[#FF453A]/20', icon: ShieldAlert, key: 'critical' },
                  { level: 'High', color: 'text-[#E5A00D]', bg: 'bg-[#E5A00D]/10', border: 'border-[#E5A00D]/20', icon: Zap, key: 'high' },
                  { level: 'Medium', color: 'text-[#5E6AD2]', bg: 'bg-[#5E6AD2]/10', border: 'border-[#5E6AD2]/20', icon: Bell, key: 'medium' },
                ].map(rule => (
                  <div key={rule.key} className="p-3.5 rounded-lg bg-[#161718] border border-white/[0.04] flex items-center justify-between hover:border-white/[0.1] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded flex items-center justify-center ${rule.bg} border ${rule.border}`}>
                        <rule.icon size={16} className={rule.color} />
                      </div>
                      <span className="text-[14px] font-semibold text-[#EDEDED]">{rule.level}</span>
                    </div>
                    <select 
                      value={routes[rule.key]} 
                      onChange={(e) => { setRoutes({...routes, [rule.key]: e.target.value}); showToast(`Routing updated`, 'success') }}
                      className="px-3 py-1.5 rounded-md bg-[#09090B] border border-white/[0.06] outline-none text-[12px] font-medium text-[#EDEDED] appearance-none cursor-pointer hover:border-white/[0.15] transition-colors"
                    >
                      <option value="slack">Slack</option>
                      <option value="email">Email</option>
                      <option value="pagerduty">PagerDuty</option>
                      <option value="webhook">Webhook</option>
                    </select>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <DarkFooter 
        badge="Alerting" 
        title="Never miss" 
        highlight="an anomaly." 
        description="Configure PagerDuty, Slack, and Email integrations for round-the-clock incident response." 
        primary="Setup Webhooks" 
        secondary="API Docs" 
      />

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  )
}

export default Alerts
