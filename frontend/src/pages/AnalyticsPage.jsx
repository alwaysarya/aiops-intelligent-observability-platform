import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, BarChart3, Database, Server, Zap, 
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, 
  Clock, Globe, ArrowRight, Sparkles, Shield, Brain, 
  Radio, Cpu, Network, Layers, Target, Rocket, Award, Users
} from 'lucide-react'
import SectionHeader from '../components/Premium/SectionHeader'
import { LogTrafficChart, ServiceTrafficChart } from '../components/Premium/Charts'
import DarkFooter from '../components/Premium/DarkFooter'
import { checkAllServices, anomalyApi } from '../services/api'
import { showToast } from '../components/Premium/Toast'

const linearEase = [0.25, 0.1, 0.25, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.05, ease: linearEase } }),
}

function AnalyticsPage() {
  const [services, setServices] = useState({})
  const [testResult, setTestResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await checkAllServices()
        setServices(res)
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  const testAnomalyPrediction = async () => {
    setIsLoading(true)
    try {
      const result = await anomalyApi.predict([[1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0]])
      setTestResult(result)
      showToast('Anomaly prediction successful!', 'success')
    } catch (e) {
      setTestResult({ is_anomaly: false, score: 0.42, severity: 'low', model_scores: { isolation_forest: 0.2, autoencoder: 0.6 } })
      showToast('Using simulated prediction (Backend offline)', 'warning')
    }
    setIsLoading(false)
  }

  const kpiStats = [
    { label: 'Events / min', value: '124,800', trend: '+18%', isUp: true, icon: Activity, color: '#5E6AD2' },
    { label: 'Anomalies', value: '33', trend: '-5', isUp: false, icon: AlertTriangle, color: '#FF453A' },
    { label: 'Uptime', value: '99.99%', trend: '+0.02%', isUp: true, icon: Shield, color: '#30D158' },
    { label: 'Alert Response', value: '180ms', trend: '-24ms', isUp: true, icon: Clock, color: '#E5A00D' },
  ]

  return (
    <div className="w-full min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-[-apple-system,BlinkMacSystemFont,'Inter','Helvetica_Neue',sans-serif] antialiased selection:bg-[#5E6AD2]/30">
      
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden border-b border-black/[0.06]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#5E6AD2]/[0.12] blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-30%] right-[15%] w-[500px] h-[500px] bg-[#AF52DE]/[0.08] blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-[#30D158]/[0.06] blur-[120px] rounded-full pointer-events-none" />
        
        {/* Floating Particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div key={i} animate={{ y: [0, -200, 0], opacity: [0, 0.6, 0] }} transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, delay: Math.random() * 6 }}
            className="absolute w-1 h-1 bg-[#5E6AD2] rounded-full blur-[1px] shadow-[0_0_10px_#5E6AD2]" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
        ))}

        <div className="relative z-10 max-w-[1240px] mx-auto px-8 py-28 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left content */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: linearEase }}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-black/[0.06] bg-white/80 backdrop-blur-xl mb-8 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] shadow-[0_0_8px_#30D158] animate-pulse" />
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#6E6E73]">Live Analytics</span>
              </div>

              <h1 className="text-[clamp(52px,6.5vw,96px)] font-black tracking-[-0.055em] leading-[0.92] mb-7">
                Every metric,<br />
                <span className="bg-gradient-to-r from-[#0071E3] via-[#5E5CE6] to-[#AF52DE] bg-clip-text text-transparent">visualized.</span>
              </h1>

              <p className="text-[19px] leading-[1.65] text-[#6E6E73] max-w-[480px] mb-10 font-medium">
                Deep insights into your infrastructure. <span className="text-[#0071E3] font-semibold">Real-time analytics</span> for modern engineering teams.
              </p>

              <div className="flex flex-wrap gap-3">
                <a href="#charts" className="group inline-flex items-center gap-2 h-14 px-7 rounded-full bg-black text-white text-[15px] font-semibold hover:bg-[#0071E3] transition-all shadow-[0_15px_35px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_45px_-10px_rgba(0,113,227,0.4)]">
                  View charts <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#anomaly" className="inline-flex items-center gap-2 h-14 px-7 rounded-full bg-white text-[#1D1D1F] text-[15px] font-semibold border border-black/[0.08] hover:border-black/[0.15] transition-all shadow-sm">
                  Run anomaly test <Zap size={18} />
                </a>
              </div>
            </motion.div>

            {/* Right — animated chart preview */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.3, ease: linearEase }} className="relative">
              <div className="relative rounded-2xl bg-white border border-black/[0.08] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] overflow-hidden">
                <div className="h-10 bg-[#FAFBFC] border-b border-black/[0.06] flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF453A]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E9A23B]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#30D158]" />
                  <span className="ml-2 text-[10px] text-[#86868B] font-mono">analytics.live</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider">Requests / sec</p>
                      <p className="text-[28px] font-black text-[#1D1D1F] mt-1">124,800</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#E8F8EE] text-[#177245] text-[11px] font-bold border border-[#30D158]/30">+18%</span>
                  </div>
                  <svg viewBox="0 0 300 100" className="w-full h-32" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="analyticsHero" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0071E3" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#0071E3" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {[20, 40, 60, 80].map(y => (
                      <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#00000008" strokeWidth="0.5" />
                    ))}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                      d="M 0,70 Q 40,50 80,60 T 160,40 T 240,30 T 300,20 L 300,100 L 0,100 Z"
                      fill="url(#analyticsHero)"
                    />
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.5 }}
                      d="M 0,70 Q 40,50 80,60 T 160,40 T 240,30 T 300,20"
                      fill="none"
                      stroke="#0071E3"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{ filter: 'drop-shadow(0 0 6px #0071E3)' }}
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* KPI GRID */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="relative w-full bg-[#FBFBFD] py-24 border-b border-black/[0.06]">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {kpiStats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} 
                whileHover={{ y: -8, boxShadow: '0 40px 80px -20px rgba(0,0,0,0.12)' }} 
                className="relative bg-gradient-to-br from-white via-white to-[#FAFBFF] rounded-[28px] p-7 border border-black/[0.06] transition-all shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] overflow-hidden group">
                
                {/* Colored glow in corner */}
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" style={{ background: stat.color }} />
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}>
                      <stat.icon size={20} style={{ color: stat.color }} />
                    </div>
                    <span className={`text-[12px] font-bold px-2 py-1 rounded-md ${stat.isUp ? 'text-[#30D158] bg-[#30D158]/10' : 'text-[#FF453A] bg-[#FF453A]/10'}`}>
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-[36px] font-black tracking-[-0.04em] text-[#1D1D1F] mb-1.5 leading-none">{stat.value}</p>
                  <p className="text-[11px] font-bold text-[#86868B] uppercase tracking-[0.1em]">{stat.label}</p>
                  
                  {/* Bottom accent bar */}
                  <div className="mt-5 h-1 w-10 rounded-full group-hover:w-full transition-all duration-500" style={{ background: stat.color }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CHARTS SECTION */}
      <motion.section id="charts" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="relative w-full bg-[#F5F5F7] py-24 border-b border-black/[0.04]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0071E3]/[0.05] blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1240px] mx-auto px-8 relative z-10">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0071E3] mb-4">Real-Time Traffic</p>
            <h2 className="text-[clamp(40px,5vw,64px)] font-bold tracking-[-0.055em] leading-[1.02] mb-6 text-[#1D1D1F]">Watch it flow.</h2>
            <p className="text-[17px] text-[#6E6E73] max-w-[560px] mx-auto leading-[1.7]">Live logs and service traffic across your infrastructure, updated every second.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Log Traffic Card */}
            <motion.div variants={fadeUp} custom={0} 
              whileHover={{ y: -8, boxShadow: '0 40px 80px -20px rgba(0,113,227,0.15)' }}
              className="relative bg-white rounded-[32px] border border-black/[0.06] overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] transition-all group">
              
              {/* Corner glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#0071E3]/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Card header */}
              <div className="relative p-6 border-b border-black/[0.04] flex items-center justify-between">
                <div>
                  <h3 className="text-[18px] font-bold text-[#1D1D1F] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse shadow-[0_0_8px_#0071E3]" />
                    Log Traffic
                  </h3>
                  <p className="text-[12px] text-[#86868B] mt-1">Total logs vs anomalies · last 24h</p>
                </div>
                <div className="flex items-center gap-4 text-[11px]">
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#0071E3]" /><span className="text-[#86868B]">Logs</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#FF453A]" /><span className="text-[#86868B]">Anomalies</span></div>
                </div>
              </div>
              
              {/* Chart */}
              <div className="relative">
                <LogTrafficChart />
              </div>
            </motion.div>

            {/* Service Traffic Card */}
            <motion.div variants={fadeUp} custom={1} 
              whileHover={{ y: -8, boxShadow: '0 40px 80px -20px rgba(94,92,230,0.15)' }}
              className="relative bg-white rounded-[32px] border border-black/[0.06] overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] transition-all group">
              
              {/* Corner glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#5E5CE6]/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Card header */}
              <div className="relative p-6 border-b border-black/[0.04] flex items-center justify-between">
                <div>
                  <h3 className="text-[18px] font-bold text-[#1D1D1F] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#5E5CE6] animate-pulse shadow-[0_0_8px_#5E5CE6]" />
                    Service Traffic
                  </h3>
                  <p className="text-[12px] text-[#86868B] mt-1">Requests per service · top 5</p>
                </div>
                <div className="flex items-center gap-4 text-[11px]">
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#5E5CE6]" /><span className="text-[#86868B]">Load</span></div>
                </div>
              </div>
              
              {/* Chart */}
              <div className="relative">
                <ServiceTrafficChart />
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* SERVICE HEALTH HEATMAP */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="relative w-full bg-[#FBFBFD] py-24 border-b border-black/[0.06]">
        <div className="max-w-[1240px] mx-auto px-8 relative z-10">
          
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0071E3] mb-4">Service Health</p>
            <h2 className="text-[clamp(40px,5vw,64px)] font-bold tracking-[-0.055em] leading-[1.02] mb-6 text-[#1D1D1F]">All systems, always.</h2>
            <p className="text-[17px] text-[#6E6E73] max-w-[560px] mx-auto leading-[1.7]">Every service, every node, monitored in real-time.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Log Ingestion', port: '8000', status: services.logIngestion ? 'healthy' : 'down', icon: Database, color: '#0071E3' },
              { name: 'AI Detector', port: '8001', status: services.aiDetector ? 'healthy' : 'down', icon: Brain, color: '#5E5CE6' },
              { name: 'Alert Service', port: '8002', status: services.alertService ? 'healthy' : 'down', icon: AlertTriangle, color: '#E9A23B' },
              { name: 'Root Cause', port: '8003', status: services.rootCause ? 'healthy' : 'down', icon: Target, color: '#30D158' },
            ].map((svc, i) => {
              const Icon = svc.icon
              const isHealthy = svc.status === 'healthy'
              return (
                <motion.div key={i} variants={fadeUp} custom={i} 
                  whileHover={{ y: -8, boxShadow: '0 40px 80px -20px rgba(0,0,0,0.12)' }} 
                  className="relative bg-white rounded-[28px] p-7 border border-black/[0.06] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] transition-all overflow-hidden group">
                  
                  {/* Status glow corner */}
                  <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity ${isHealthy ? 'bg-[#30D158]' : 'bg-[#FF453A]'}`} />
                  
                  {/* Top accent line */}
                  <div className={`absolute top-0 left-0 w-full h-1 ${isHealthy ? 'bg-gradient-to-r from-[#30D158] to-[#0071E3]' : 'bg-gradient-to-r from-[#FF453A] to-[#E9A23B]'}`} />
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110" 
                        style={{ background: `${svc.color}15`, border: `1px solid ${svc.color}30` }}>
                        <Icon size={22} style={{ color: svc.color }} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-[#30D158] animate-pulse shadow-[0_0_8px_#30D158]' : 'bg-[#FF453A] shadow-[0_0_8px_#FF453A]'}`} />
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isHealthy ? 'text-[#177245]' : 'text-[#FF453A]'}`}>
                          {isHealthy ? 'Live' : 'Down'}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-[16px] font-bold text-[#1D1D1F] mb-1">{svc.name}</p>
                    <p className="text-[12px] font-mono text-[#86868B] mb-5">localhost:{svc.port}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-black/[0.04]">
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded ${isHealthy ? 'bg-[#E8F8EE] text-[#177245]' : 'bg-[#FFF0F0] text-[#FF453A]'}`}>
                        {isHealthy ? 'Operational' : 'Offline'}
                      </span>
                      <span className="text-[11px] font-mono text-[#86868B]">
                        {isHealthy ? '99.9%' : '—'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* ANOMALY TEST PANEL */}
<motion.section id="anomaly" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="relative w-full bg-[#F5F5F7] py-24 border-b border-black/[0.06]">
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#5E5CE6]/[0.06] blur-[120px] rounded-full pointer-events-none" />
  <div className="max-w-[1240px] mx-auto px-8 relative z-10">
    <motion.div variants={fadeUp} className="text-center mb-16">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0071E3] mb-4">AI Playground</p>
      <h2 className="text-[clamp(40px,5vw,64px)] font-bold tracking-[-0.055em] leading-[1.02] mb-6 text-[#1D1D1F]">Test the AI live.</h2>
      <p className="text-[17px] text-[#6E6E73] max-w-[560px] mx-auto leading-[1.7]">Send a real request to our anomaly detection model and see it respond instantly.</p>
    </motion.div>
    <motion.div variants={fadeUp} className="relative bg-white rounded-[40px] p-10 md:p-14 border border-black/[0.06] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#5E5CE6]/15 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#0071E3]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center relative z-10">
        <div className="flex items-start gap-6">
          <motion.div animate={{ rotateY: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} className="flex-shrink-0 w-20 h-20 rounded-3xl bg-gradient-to-br from-[#5E5CE6] to-[#0071E3] flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(94,92,230,0.5)]">
            <Zap size={36} className="text-white" fill="white" />
          </motion.div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-[24px] font-bold text-[#1D1D1F]">Live Anomaly Prediction</h3>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#30D158]/10 border border-[#30D158]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] animate-pulse" />
                <span className="text-[10px] font-bold text-[#177245] uppercase tracking-wider">AI Ready</span>
              </span>
            </div>
            <p className="text-[15px] text-[#6E6E73] leading-[1.6] mb-4 max-w-lg">
              Send a 10-feature vector to <code className="px-1.5 py-0.5 rounded bg-black/[0.06] font-mono text-[13px] text-[#1D1D1F]">localhost:8001/predict</code> and see anomaly detection in action.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-[#FAFBFF] border border-black/[0.06]">
                <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider">Model</span>
                <p className="text-[13px] font-semibold text-[#1D1D1F] mt-0.5">LSTM + IsoForest</p>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-[#FAFBFF] border border-black/[0.06]">
                <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider">Latency</span>
                <p className="text-[13px] font-semibold text-[#1D1D1F] mt-0.5">~180ms</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-3 lg:min-w-[260px]">
          <button onClick={testAnomalyPrediction} disabled={isLoading} className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0071E3] to-[#5E5CE6] text-white font-bold text-[15px] hover:from-[#5E5CE6] hover:to-[#AF52DE] transition-all shadow-[0_20px_40px_-10px_rgba(0,113,227,0.5)] hover:shadow-[0_25px_50px_-10px_rgba(94,92,230,0.6)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {isLoading ? (
              <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full" /> Analyzing...</>
            ) : (
              <><Zap size={18} fill="white" /> Run Prediction</>
            )}
          </button>
          {testResult && (
            <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className={`rounded-2xl p-4 border ${testResult.is_anomaly ? 'bg-gradient-to-br from-[#FF453A]/10 to-[#FF453A]/5 border-[#FF453A]/30' : 'bg-gradient-to-br from-[#30D158]/10 to-[#30D158]/5 border-[#30D158]/30'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[11px] font-bold uppercase tracking-wider ${testResult.is_anomaly ? 'text-[#FF453A]' : 'text-[#177245]'}`}>
                  {testResult.is_anomaly ? '⚠ Anomaly Detected' : '✓ Normal'}
                </span>
                <span className="text-[10px] font-mono text-[#86868B]">just now</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] font-medium text-[#86868B] uppercase">Score</span>
                  <p className={`text-[20px] font-black ${testResult.is_anomaly ? 'text-[#FF453A]' : 'text-[#177245]'}`}>{testResult.score.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-[10px] font-medium text-[#86868B] uppercase">Severity</span>
                  <p className="text-[20px] font-black text-[#1D1D1F] capitalize">{testResult.severity}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  </div>
</motion.section>

      {/* DARK FOOTER */}
      <section className="relative w-full bg-gradient-to-br from-[#0F1011] via-[#1A1B1E] to-[#0F1011] py-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0071E3]/20 blur-[120px] rounded-full" />
        <div className="max-w-[800px] mx-auto px-8 text-center relative z-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#30D158] mb-6">Deep Dive</p>
          <h2 className="text-[clamp(40px,5.5vw,72px)] font-bold tracking-[-0.055em] leading-[1.02] text-white mb-6">
            Charts that<br />
            <span className="bg-gradient-to-r from-[#30D158] via-[#0071E3] to-[#AF52DE] bg-clip-text text-transparent">tell the story.</span>
          </h2>
          <p className="text-[18px] text-white/60 max-w-[500px] mx-auto mb-10">Dive deeper into your infrastructure metrics and identify trends before they become issues.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#" className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-white text-black text-[15px] font-bold hover:bg-[#0071E3] hover:text-white transition-all shadow-2xl">
              View Full Report <ArrowRight size={18} />
            </a>
            <a href="#" className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-white/10 text-white text-[15px] font-bold border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm">
              Export Data
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  )
}

export default AnalyticsPage
