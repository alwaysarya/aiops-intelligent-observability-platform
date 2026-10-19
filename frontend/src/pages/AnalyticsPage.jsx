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
    <div className="w-full min-h-screen bg-[#09090B] text-[#EDEDED] font-[-apple-system,BlinkMacSystemFont,'Inter','Helvetica_Neue',sans-serif] antialiased selection:bg-[#5E6AD2]/30">
      
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#5E6AD2]/[0.12] blur-[130px] rounded-full pointer-events-none" />
        
        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div key={i} animate={{ y: [0, -150, 0], opacity: [0, 1, 0] }} transition={{ duration: Math.random() * 8 + 8, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute w-1 h-1 bg-[#5E6AD2] rounded-full blur-[1px] shadow-[0_0_8px_#5E6AD2]" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
        ))}

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-24 md:py-32">
          <div className="flex flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: linearEase }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(94,106,210,0.1)]">
                <Radio size={12} className="text-[#5E6AD2] animate-pulse" />
                <span className="text-[12px] font-medium text-[#8A8F98]">Live Analytics</span>
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: linearEase }} className="text-[56px] md:text-[80px] font-semibold tracking-[-0.04em] leading-[1.05] mb-6 text-[#EDEDED]">
              Every metric, <br />
              <span className="bg-gradient-to-r from-[#5E6AD2] via-[#8B5CF6] to-[#5E6AD2] bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]">visualized.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: linearEase }} className="text-[19px] text-[#8A8F98] max-w-[500px] leading-[1.6]">
              Deep insights into your infrastructure. Real-time analytics for modern engineering teams.
            </motion.p>
          </div>
        </div>
      </section>

      {/* KPI GRID */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="relative w-full bg-[#09090B] py-20 border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {kpiStats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.15)' }} 
                className="bg-[#0F1011] rounded-xl p-6 border border-white/[0.06] transition-all">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon size={20} className="text-[#8A8F98]" style={{ color: stat.color }} />
                  <span className={`text-[11px] font-medium ${stat.isUp ? 'text-[#30D158]' : 'text-[#FF453A]'}`}>{stat.trend}</span>
                </div>
                <p className="text-[28px] font-semibold tracking-tighter text-[#EDEDED] mb-1">{stat.value}</p>
                <p className="text-[11px] font-medium text-[#5A5F66] uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CHARTS SECTION */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="relative w-full bg-[#09090B] py-20 border-b border-white/[0.06]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#5E6AD2]/[0.04] blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-[1100px] mx-auto px-6 relative z-10">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-[32px] md:text-[40px] font-semibold tracking-[-0.02em] mb-3 text-[#EDEDED]">Real-time traffic.</h2>
            <p className="text-[16px] text-[#8A8F98] max-w-lg mx-auto">Live logs and service traffic across your infrastructure.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div variants={fadeUp} custom={0} className="bg-[#0F1011] rounded-xl border border-white/[0.06] overflow-hidden">
              <LogTrafficChart />
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="bg-[#0F1011] rounded-xl border border-white/[0.06] overflow-hidden">
              <ServiceTrafficChart />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* SERVICE HEALTH HEATMAP */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="relative w-full bg-[#09090B] py-20 border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 relative z-10">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-[32px] md:text-[40px] font-semibold tracking-[-0.02em] mb-3 text-[#EDEDED]">Service health.</h2>
            <p className="text-[16px] text-[#8A8F98] max-w-lg mx-auto">Every service, every node, in real-time.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Log Ingestion', status: services.logIngestion ? 'healthy' : 'down', icon: Database },
              { name: 'AI Detector', status: services.aiDetector ? 'healthy' : 'down', icon: Brain },
              { name: 'Alert Service', status: services.alertService ? 'healthy' : 'down', icon: AlertTriangle },
              { name: 'Root Cause', status: services.rootCause ? 'healthy' : 'down', icon: Target },
            ].map((svc, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} whileHover={{ y: -4 }} 
                className="bg-[#0F1011] rounded-xl p-6 border border-white/[0.06] hover:border-white/[0.15] transition-all">
                <div className="flex items-center justify-between mb-4">
                  <svc.icon size={20} className={svc.status === 'healthy' ? 'text-[#30D158]' : 'text-[#FF453A]'} />
                  <div className={`w-2 h-2 rounded-full ${svc.status === 'healthy' ? 'bg-[#30D158] animate-pulse shadow-[0_0_8px_#30D158]' : 'bg-[#FF453A] shadow-[0_0_8px_#FF453A]'}`} />
                </div>
                <p className="text-[15px] font-semibold text-[#EDEDED] mb-1">{svc.name}</p>
                <p className={`text-[12px] font-medium capitalize ${svc.status === 'healthy' ? 'text-[#30D158]' : 'text-[#FF453A]'}`}>
                  {svc.status === 'healthy' ? 'Operational' : 'Down'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ANOMALY TEST PANEL */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="relative w-full bg-[#09090B] py-20 border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 relative z-10">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-[32px] md:text-[40px] font-semibold tracking-[-0.02em] mb-3 text-[#EDEDED]">Test live prediction.</h2>
            <p className="text-[16px] text-[#8A8F98] max-w-lg mx-auto">Send a request to the AI backend and see real-time results.</p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-[#0F1011] rounded-2xl p-8 md:p-10 border border-white/[0.06] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#5E6AD2]/[0.05] blur-[80px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#5E6AD2]/10 border border-[#5E6AD2]/20 flex items-center justify-center shadow-[0_0_20px_rgba(94,106,210,0.15)]">
                  <Zap size={26} className="text-[#5E6AD2]" />
                </div>
                <div>
                  <h3 className="text-[20px] font-semibold text-[#EDEDED]">Live Anomaly Prediction</h3>
                  <p className="text-[14px] text-[#8A8F98] mt-1">Send a request to the AI backend (localhost:8001).</p>
                </div>
              </div>
              
              <div className="flex flex-col items-start md:items-end gap-3">
                <button 
                  onClick={testAnomalyPrediction} 
                  disabled={isLoading}
                  className="px-6 py-3 rounded-lg bg-[#EDEDED] text-[#09090B] font-semibold text-[14px] hover:bg-white transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.1)] disabled:opacity-50"
                >
                  {isLoading ? (
                    <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-[#09090B]/30 border-t-[#09090B] rounded-full" /> Running...</>
                  ) : (
                    <><Zap size={16} /> Run Test</>
                  )}
                </button>
                {testResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className={`flex items-center gap-4 px-4 py-2 rounded-lg border ${
                      testResult.is_anomaly 
                        ? 'bg-[#FF453A]/10 border-[#FF453A]/20' 
                        : 'bg-[#30D158]/10 border-[#30D158]/20'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-[10px] font-medium text-[#8A8F98] uppercase">Score</span>
                      <span className={`text-[14px] font-semibold ${testResult.is_anomaly ? 'text-[#FF453A]' : 'text-[#30D158]'}`}>
                        {testResult.score.toFixed(2)}
                      </span>
                    </div>
                    <div className="w-[1px] h-6 bg-white/[0.1]" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-medium text-[#8A8F98] uppercase">Severity</span>
                      <span className="text-[14px] font-semibold text-[#EDEDED] capitalize">{testResult.severity}</span>
                    </div>
                    <div className="w-[1px] h-6 bg-white/[0.1]" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-medium text-[#8A8F98] uppercase">Status</span>
                      <span className={`text-[14px] font-semibold ${testResult.is_anomaly ? 'text-[#FF453A]' : 'text-[#30D158]'}`}>
                        {testResult.is_anomaly ? 'Anomaly' : 'Normal'}
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* DARK FOOTER */}
      <DarkFooter 
        badge="Deep Dive"
        title="Charts that"
        highlight="tell the story."
        description="Dive deeper into your infrastructure metrics and identify trends before they become issues."
        primary="View Full Report"
        secondary="Export Data"
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

export default AnalyticsPage
