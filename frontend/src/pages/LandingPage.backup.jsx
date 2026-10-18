import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { ArrowRight, Activity, Brain, Database, GitBranch, Zap, CheckCircle2, TrendingUp, ShieldCheck, BarChart3, Lock, Cpu, Server, Terminal, ShoppingCart, CreditCard, Cloud, Code2, AlertTriangle } from 'lucide-react'

function LandingPage() {
  const navigate = useNavigate()
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end start"] })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <div className="w-full bg-black min-h-screen text-white overflow-hidden font-sans">
      
      {/* ================= HERO SECTION ================= */}
      <section ref={targetRef} className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1300px] h-[1300px] rounded-full blur-[260px]" style={{ background: 'radial-gradient(circle, #0071E3, transparent 55%)' }} />
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }} className="absolute top-1/3 right-1/4 w-[1100px] h-[1100px] rounded-full blur-[240px]" style={{ background: 'radial-gradient(circle, #5E5CE6, transparent 55%)' }} />
        </div>

        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '80px 80px', maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)' }} />

        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full" style={{ left: `${(i * 37) % 100}%`, top: `${(i * 43) % 100}%`, background: ['#5AC8FA', '#AF52DE', '#0071E3'][i % 3], boxShadow: `0 0 10px ${['#5AC8FA', '#AF52DE', '#0071E3'][i % 3]}` }} animate={{ y: [0, -40, 0], opacity: [0.15, 0.9, 0.15] }} transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }} />
        ))}

        <motion.div style={{ y, opacity }} className="relative mx-auto max-w-[1200px] px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl mb-10">
              <motion.span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ boxShadow: '0 0 10px #30D158' }} />
              <span className="text-white/80 text-[11px] font-semibold tracking-[0.16em] uppercase">AI-Powered Observability v2.0</span>
            </div>

            <h1 className="max-w-[1100px] mx-auto text-[64px] md:text-[96px] font-bold leading-[1.1] tracking-[-0.04em] text-white">
              Intelligence<br />
              <motion.span animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="inline-block bg-gradient-to-r from-[#5AC8FA] via-[#0071E3] to-[#AF52DE] bg-clip-text text-transparent bg-[length:200%_100%] mt-2">in every log.</motion.span>
            </h1>

            <p className="mt-10 max-w-[620px] mx-auto text-[20px] leading-[1.6] tracking-[-0.015em] text-white/50">
              Real-time observability with AI-powered anomaly detection, intelligent root cause analysis, and automated alerting for cloud-native applications.
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <button onClick={() => navigate('/login')} className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-[16px] font-semibold tracking-[-0.01em] text-black transition-all hover:scale-[1.03]" style={{ boxShadow: '0 0 60px rgba(255,255,255,0.3)' }}>
                Enter Dashboard <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
              </button>
              <a href="#features" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 text-[16px] font-medium tracking-[-0.01em] text-white/90 backdrop-blur-xl transition-all hover:bg-white/[0.08]">
                Explore Features
              </a>
            </div>
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="mt-20 pt-10 border-t border-white/5">
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/30 mb-6">Trusted by engineering teams at</p>
              <div className="flex flex-wrap justify-center gap-10 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                <span className="text-xl font-bold text-white tracking-tighter">Acme Corp</span>
                <span className="text-xl font-bold text-white tracking-tighter">GlobalTech</span>
                <span className="text-xl font-bold text-white tracking-tighter">Nexus</span>
                <span className="text-xl font-bold text-white tracking-tighter">SysCorp</span>
                <span className="text-xl font-bold text-white tracking-tighter">Cloudify</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= ADD-ON 1: HOW IT WORKS ================= */}
      <section className="relative py-32 bg-black border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-[40px] md:text-[56px] font-semibold tracking-[-0.04em] text-white">How it works.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Ingest', desc: 'Logs streamed from Fluentd to Kafka.', icon: Server },
              { step: '02', title: 'Analyze', desc: 'AI models detect anomalies instantly.', icon: Brain },
              { step: '03', title: 'Alert', desc: 'Smart routing to Slack/PagerDuty.', icon: Activity },
              { step: '04', title: 'Remediate', desc: 'K8s auto-heals without human touch.', icon: Zap },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <div className="text-[48px] font-bold text-white/10 absolute top-4 right-4">{item.step}</div>
                <item.icon size={28} className="text-apple-blue mb-4" />
                <h3 className="text-[18px] font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-[14px] text-white/50">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ADD-ON 2: LIVE TERMINAL SHOWCASE ================= */}
      <section className="relative py-24 bg-black border-t border-white/5">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[40px] font-semibold text-white">Watch the pipeline in real-time.</h2>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0F] shadow-[0_0_80px_-20px_rgba(0,113,227,0.4)]">
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
              <Terminal size={14} className="text-white/40" />
              <span className="text-[11px] font-mono text-white/40">aiops-terminal — kafka-consumer</span>
            </div>
            <div className="p-6 font-mono text-[13px] leading-relaxed">
              <p className="text-green-400">[INFO] Connected to Kafka at kafka:9092</p>
              <p className="text-green-400">[INFO] Consuming from topic: aiops.logs</p>
              <p className="text-white/60">[LOG] payment-service | POST /api/pay | 200 OK | 45ms</p>
              <p className="text-yellow-400">[WARN] payment-service | Latency spike detected: 1250ms</p>
              <p className="text-red-400 animate-pulse">[ERROR] AI Detector: Anomaly detected! Score: 0.92</p>
              <p className="text-green-400">[ACTION] Alert sent to Slack #incidents</p>
              <p className="text-blue-400">[ACTION] Auto-remediation: Restarting pod...</p>
              <p className="text-green-400">[INFO] Pod restarted. System healthy.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= ADD-ON 3: USE CASES GRID ================= */}
      <section className="relative py-32 bg-black border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-[40px] md:text-[56px] font-semibold tracking-[-0.04em] text-white">Built for every industry.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'E-Commerce', icon: ShoppingCart, desc: 'Detect checkout failures instantly.' },
              { title: 'FinTech', icon: CreditCard, desc: 'Zero-downtime payment processing.' },
              { title: 'SaaS', icon: Cloud, desc: 'Multi-tenant observability.' },
              { title: 'DevTools', icon: Code2, desc: 'CI/CD pipeline monitoring.' },
            ].map((useCase, i) => (
              <motion.div key={useCase.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] transition-all cursor-default">
                <useCase.icon size={24} className="text-white/60 mb-4" />
                <h3 className="text-[16px] font-semibold text-white mb-1">{useCase.title}</h3>
                <p className="text-[13px] text-white/40">{useCase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ADD-ON 4: AI INSIGHTS PANEL ================= */}
      <section className="relative py-24 bg-black border-t border-white/5">
        <div className="max-w-[1000px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-[32px] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] p-8 md:p-12 overflow-hidden">
             <div className="absolute -top-20 -left-20 w-64 h-64 bg-apple-indigo rounded-full blur-[100px] opacity-20" />
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold uppercase tracking-wider mb-4">
                    <Brain size={12} /> AI Insights
                  </div>
                  <h2 className="text-[32px] md:text-[40px] font-semibold text-white mb-4">Predict issues before they happen.</h2>
                  <p className="text-[16px] text-white/50 mb-6">Our LSTM models analyze historical patterns to predict outages 15 minutes before they occur.</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[14px] text-white/70"><CheckCircle2 size={16} className="text-apple-green"/> Predicted DB timeout at 14:30</div>
                    <div className="flex items-center gap-3 text-[14px] text-white/70"><CheckCircle2 size={16} className="text-apple-green"/> Auto-scaled pod from 3 to 5</div>
                  </div>
                </div>
                <div className="w-full md:w-64 p-6 rounded-2xl bg-black border border-white/10 shadow-2xl">
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-[12px] text-white/50">Anomaly Score</span>
                      <span className="text-[12px] text-red-400 font-bold">Critical</span>
                   </div>
                   <div className="text-[48px] font-bold text-white leading-none">0.97</div>
                   <div className="h-2 w-full bg-white/10 rounded-full mt-4 overflow-hidden">
                      <motion.div initial={{width:0}} whileInView={{width:'97%'}} transition={{duration:1.5, delay:0.5}} className="h-full bg-red-500" />
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* ================= ADD-ON 5: SECURITY & COMPLIANCE ================= */}
      <section className="relative py-20 bg-[#0A0A0F] border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/30 mb-8">Enterprise-Grade Security</p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            <div className="flex items-center gap-2"><ShieldCheck size={20} className="text-white"/> SOC2 Type II</div>
            <div className="flex items-center gap-2"><Lock size={20} className="text-white"/> ISO 27001</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={20} className="text-white"/> GDPR Compliant</div>
            <div className="flex items-center gap-2"><Server size={20} className="text-white"/> Air-Gapped</div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative py-40 px-6 overflow-hidden bg-black border-t border-white/5">
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full blur-[280px] pointer-events-none" style={{ background: 'radial-gradient(circle, #0071E3, transparent 55%)' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative max-w-[900px] mx-auto text-center">
          <h2 className="text-[64px] md:text-[100px] font-semibold leading-[1] tracking-[-0.045em] text-white">
            Ready to<br />
            <motion.span animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 8, repeat: Infinity }} className="inline-block bg-gradient-to-r from-[#5AC8FA] via-[#0071E3] to-[#5E5CE6] bg-clip-text text-transparent bg-[length:200%_100%] mt-2">scale up?</motion.span>
          </h2>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => navigate('/login')} className="group relative inline-flex items-center gap-2 rounded-full bg-white text-black px-8 py-4 text-[16px] font-semibold overflow-hidden transition-all hover:scale-[1.03]" style={{ boxShadow: '0 20px 60px -12px rgba(255,255,255,0.4)' }}>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />
              <span className="relative">Launch Dashboard</span>
              <ArrowRight size={18} className="relative transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 py-10 text-center">
        <p className="text-white/30 text-[13px]">© 2026 AIOps Observability Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage
