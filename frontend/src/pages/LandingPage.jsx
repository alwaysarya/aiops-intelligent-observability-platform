import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { ArrowRight, ArrowUp, Activity, Brain, Database, GitBranch, Zap, CheckCircle2, TrendingUp, ShieldCheck, BarChart3, Lock, Cpu, Server, Terminal, ShoppingCart, CreditCard, Cloud, Code2, Sparkles, Users, Star, Play, Radio, Clock, Building2, Plus } from 'lucide-react'

function Counter({ to, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = to / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= to) { setCount(to); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, to])
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

const terminalLines = [
  { t: '[INFO]', c: 'text-teal-400', m: 'Connected to Kafka at kafka:9092' },
  { t: '[INFO]', c: 'text-teal-400', m: 'Consuming from topic: aiops.logs' },
  { t: '[LOG]', c: 'text-[#1d1d1f]/60', m: 'payment-service | POST /api/pay | 200 OK | 45ms' },
  { t: '[WARN]', c: 'text-yellow-400', m: 'payment-service | Latency spike detected: 1250ms' },
  { t: '[ERROR]', c: 'text-red-400', m: 'AI Detector: Anomaly detected! Score: 0.92' },
  { t: '[ACTION]', c: 'text-teal-400', m: 'Alert sent to Slack #incidents' },
  { t: '[ACTION]', c: 'text-teal-400', m: 'Auto-remediation: Restarting pod...' },
  { t: '[INFO]', c: 'text-teal-400', m: 'Pod restarted. System healthy.' },
]

function LiveTerminal() {
  const [visible, setVisible] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(v => (v + 1) % (terminalLines.length + 1))
    }, 900)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="rounded-2xl overflow-hidden border border-black/10 bg-white shadow-[0_0_80px_-20px_rgba(163,230,53,0.4)]">
      <div className="flex items-center gap-2 px-4 py-3 bg-black/5 border-b border-black/5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-teal-500/20" />
        </div>
        <Terminal size={14} className="text-[#1d1d1f]/40 ml-2" />
        <span className="text-[11px] font-mono text-[#1d1d1f]/40">aiops-terminal — kafka-consumer</span>
      </div>
      <div className="p-6 pb-8 font-mono text-[13px] leading-relaxed h-[280px] overflow-hidden relative">
        {terminalLines.slice(0, visible).map((line, i) => (
          <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={line.c}>
            <span className="opacity-70">{line.t}</span> {line.m}
          </motion.p>
        ))}
        <span className="inline-block w-2 h-4 bg-teal-400 animate-pulse mt-1" />
      </div>
    </div>
  )
}

function LandingPage() {
  const navigate = useNavigate()
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  
  const { scrollYProgress: globalScroll } = useScroll()

  const [openFaq, setOpenFaq] = useState(0)
  const [testimonialIdx, setTestimonialIdx] = useState(0)

  const testimonials = [
    { quote: "AIOps cut our MTTR from 45 minutes to 90 seconds. Absolute game changer.", name: "Priya Sharma", role: "VP Engineering, FinScale", avatar: "PS" },
    { quote: "The AI predictions saved us from 3 major outages in the first month alone.", name: "Rahul Verma", role: "CTO, ShopNest", avatar: "RV" },
    { quote: "We migrated 200+ microservices and never looked back. Best observability tool.", name: "Ananya Iyer", role: "SRE Lead, Cloudify", avatar: "AI" },
  ]

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  const faqs = [
    { q: "How does AI anomaly detection work?", a: "Our LSTM models analyze historical log patterns and traffic to establish a baseline. Any deviation beyond 3-sigma triggers an anomaly with a confidence score. Models retrain every 6 hours." },
    { q: "Can I self-host AIOps?", a: "Yes, our Enterprise tier supports air-gapped deployments on Kubernetes. Helm charts and Terraform modules are provided for full self-hosting." },
    { q: "What integrations are supported?", a: "Kafka, Fluentd, Prometheus, Grafana, Datadog, Slack, PagerDuty, Jira, GitHub, and 40+ more via webhooks and native connectors." },
    { q: "Is there a free tier?", a: "Yes — up to 100K logs/day, 3 team members, and 7-day retention. No credit card required." },
    { q: "How is my data secured?", a: "TLS 1.3 in transit, AES-256 at rest, SOC2 Type II certified, ISO 27001, GDPR compliant. Data never leaves your region." },
  ]

  return (
    <div className="w-full bg-[#f5f5f7] min-h-screen text-[#1d1d1f] overflow-hidden font-sans">
      
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-300 via-emerald-400 to-teal-500 z-[100] origin-left"
        style={{ scaleX: globalScroll }}
      />

      {/* HERO */}
      <section ref={targetRef} className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1300px] h-[1300px] rounded-full blur-[260px]" style={{ background: 'radial-gradient(circle, #0d9488, transparent 55%)' }} />
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }} className="absolute top-1/3 right-1/4 w-[1100px] h-[1100px] rounded-full blur-[240px]" style={{ background: 'radial-gradient(circle, #10b981, transparent 55%)' }} />
        </div>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '80px 80px', maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)' }} />
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div key={i} className="absolute w-1 h-1 rounded-full" style={{ left: `${(i * 37) % 100}%`, top: `${(i * 43) % 100}%`, background: ['#5AC8FA', '#AF52DE', '#0d9488'][i % 3], boxShadow: `0 0 10px ${['#5AC8FA', '#AF52DE', '#0d9488'][i % 3]}` }} animate={{ y: [0, -40, 0], opacity: [0.15, 0.9, 0.15] }} transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }} />
        ))}
        <motion.div style={{ y, opacity }} className="relative mx-auto max-w-[1200px] px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-black/[0.04] backdrop-blur-xl mb-10">
              <motion.span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ boxShadow: '0 0 10px #30D158' }} />
              <span className="text-[#1d1d1f]/80 text-[11px] font-semibold tracking-[0.16em] uppercase">AI-Powered Observability v2.0</span>
            </div>
            <h1 className="max-w-[1100px] mx-auto text-[64px] md:text-[96px] font-bold leading-[1.1] tracking-[-0.04em] text-[#1d1d1f]">
              Intelligence<br />
              <motion.span animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="inline-block bg-gradient-to-r from-teal-300 via-emerald-400 to-teal-500 bg-clip-text text-transparent bg-[length:200%_100%] mt-2 drop-shadow-[0_0_30px_rgba(45,212,191,0.4)]">in every log.</motion.span>
            </h1>
            <p className="mt-10 max-w-[620px] mx-auto text-[20px] leading-[1.6] tracking-[-0.015em] text-[#1d1d1f]/50">
              Real-time observability with AI-powered anomaly detection, intelligent root cause analysis, and automated alerting for cloud-native applications.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <button onClick={() => navigate('/login')} className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-[16px] font-semibold tracking-[-0.01em] text-black transition-all hover:scale-[1.03]" style={{ boxShadow: '0 0 30px rgba(163,230,53,0.4)' }}>
                Enter AIOps World <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
              </button>
              <a href="#features" className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/[0.04] px-8 py-4 text-[16px] font-medium tracking-[-0.01em] text-[#1d1d1f]/90 backdrop-blur-xl transition-all hover:bg-black/[0.08]">
                <Play size={16} /> Watch Demo
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="relative py-12 border-y border-black/5 bg-[#f5f5f7] overflow-hidden">
        <p className="text-center text-[11px] font-bold tracking-[0.16em] uppercase text-[#1d1d1f]/30 mb-8">Trusted by engineering teams at</p>
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f5f5f7] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f5f5f7] to-transparent z-10 pointer-events-none" />
          <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="flex gap-16 whitespace-nowrap">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex gap-16">
                {['Acme Corp', 'GlobalTech', 'Nexus', 'SysCorp', 'Cloudify', 'DataFlow', 'ByteScale', 'Quantum'].map(name => (
                  <span key={name} className="text-2xl font-bold text-[#1d1d1f]/40 hover:text-[#1d1d1f] transition-colors tracking-tighter">{name}</span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-32 bg-[#f5f5f7]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-teal-400 mb-4">The Workflow</p>
            <h2 className="text-[40px] md:text-[56px] font-semibold tracking-[-0.04em] text-[#1d1d1f]">How it works.</h2>
            <p className="text-[#1d1d1f]/50 mt-4 max-w-[600px] mx-auto">From ingestion to remediation — fully automated in under 90 seconds.</p>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Ingest', desc: 'Logs streamed from Fluentd to Kafka.', icon: Server },
              { step: '02', title: 'Analyze', desc: 'AI models detect anomalies instantly.', icon: Brain },
              { step: '03', title: 'Alert', desc: 'Smart routing to Slack/PagerDuty.', icon: Activity },
              { step: '04', title: 'Remediate', desc: 'K8s auto-heals without human touch.', icon: Zap },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative p-6 rounded-2xl bg-black/[0.03] border border-black/[0.08] hover:bg-black/[0.05] transition-colors">
                <div className="text-[48px] font-bold text-[#1d1d1f]/10 absolute top-4 right-4">{item.step}</div>
                <item.icon size={28} className="text-teal-400 mb-4" />
                <h3 className="text-[18px] font-semibold text-[#1d1d1f] mb-2">{item.title}</h3>
                <p className="text-[14px] text-[#1d1d1f]/50">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative py-32 bg-[#f5f5f7] border-t border-black/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-teal-400 mb-4">Capabilities</p>
            <h2 className="text-[40px] md:text-[56px] font-semibold tracking-[-0.04em] text-[#1d1d1f]">Everything you need.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Database, title: 'Log Ingestion', desc: 'High-throughput ingestion from Fluentd, Kafka, and 40+ sources.', big: true },
              { icon: Brain, title: 'AI Anomaly Detection', desc: 'LSTM models detect patterns humans miss.' },
              { icon: Activity, title: 'Real-time Alerts', desc: 'Smart routing to Slack, PagerDuty, email.' },
              { icon: GitBranch, title: 'Root Cause Analysis', desc: 'AI traces issues across microservices.' },
              { icon: BarChart3, title: 'Dashboards', desc: 'Beautiful, customizable, real-time charts.', big: true },
              { icon: ShieldCheck, title: 'Compliance-Ready', desc: 'SOC2, ISO 27001, GDPR built-in.' },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }} className={`group relative flex flex-col h-full p-8 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-black/[0.08] hover:border-teal-400/40 transition-all ${f.big ? 'md:col-span-2' : ''}`}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(163,230,53,0.4), transparent 70%)' }} />
                <f.icon size={32} className="text-teal-400 mb-5 relative shrink-0" />
                <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-2 relative">{f.title}</h3>
                <p className="text-[14px] text-[#1d1d1f]/50 relative flex-grow">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TERMINAL */}
      <section className="relative py-24 bg-[#f5f5f7] border-t border-black/5">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-teal-400 mb-4 flex items-center justify-center gap-2">
              <Radio size={12} className="animate-pulse" /> Live from production
            </p>
            <h2 className="text-[40px] font-semibold text-[#1d1d1f]">Watch the pipeline in real-time.</h2>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <LiveTerminal />
          </motion.div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="relative py-32 bg-[#f5f5f7] border-t border-black/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-teal-400 mb-4">Industries</p>
            <h2 className="text-[40px] md:text-[56px] font-semibold tracking-[-0.04em] text-[#1d1d1f]">Built for every industry.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'E-Commerce', icon: ShoppingCart, desc: 'Detect checkout failures instantly.' },
              { title: 'FinTech', icon: CreditCard, desc: 'Zero-downtime payment processing.' },
              { title: 'SaaS', icon: Cloud, desc: 'Multi-tenant observability.' },
              { title: 'DevTools', icon: Code2, desc: 'CI/CD pipeline monitoring.' },
            ].map((useCase, i) => (
              <motion.div key={useCase.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-black/[0.03] border border-black/[0.08] hover:bg-black/[0.06] transition-all cursor-default flex flex-col h-full">
                <useCase.icon size={24} className="text-[#1d1d1f]/60 mb-4 shrink-0" />
                <h3 className="text-[16px] font-semibold text-[#1d1d1f] mb-1">{useCase.title}</h3>
                <p className="text-[13px] text-[#1d1d1f]/40 flex-grow">{useCase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-24 bg-[#f5f5f7] border-t border-black/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Database, value: 4.2, suffix: 'B+', label: 'Logs processed daily' },
              { icon: Clock, value: 90, suffix: 's', label: 'Avg MTTR' },
              { icon: Users, value: 500, suffix: '+', label: 'Teams onboard' },
              { icon: TrendingUp, value: 99.99, suffix: '%', label: 'Uptime SLA' },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-2xl bg-black/[0.02] border border-white/[0.06]">
                <s.icon size={24} className="text-teal-400 mx-auto mb-4" />
                <div className="text-[36px] font-bold text-[#1d1d1f]">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <p className="text-[13px] text-[#1d1d1f]/40 mt-2">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI INSIGHTS */}
      <section className="relative py-24 bg-[#f5f5f7] border-t border-black/5">
        <div className="max-w-[1000px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-[32px] bg-gradient-to-br from-white/[0.05] to-transparent border border-black/[0.08] p-8 md:p-12 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-teal-400 rounded-full blur-[100px] opacity-10" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-400 text-[10px] font-bold uppercase tracking-wider mb-4">
                  <Sparkles size={12} /> AI Insights
                </div>
                <h2 className="text-[32px] md:text-[40px] font-semibold text-[#1d1d1f] mb-4">Predict issues before they happen.</h2>
                <p className="text-[16px] text-[#1d1d1f]/50 mb-6">Our LSTM models analyze historical patterns to predict outages 15 minutes before they occur.</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[14px] text-[#1d1d1f]/70"><CheckCircle2 size={16} className="text-teal-400" /> Predicted DB timeout at 14:30</div>
                  <div className="flex items-center gap-3 text-[14px] text-[#1d1d1f]/70"><CheckCircle2 size={16} className="text-teal-400" /> Auto-scaled pod from 3 to 5</div>
                </div>
              </div>
              <div className="w-full md:w-64 p-6 rounded-2xl bg-[#f5f5f7] border border-black/10 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[12px] text-[#1d1d1f]/50">Anomaly Score</span>
                  <span className="text-[12px] text-teal-400 font-bold">Critical</span>
                </div>
                <div className="text-[48px] font-bold text-[#1d1d1f] leading-none">0.97</div>
                <div className="h-2 w-full bg-black/10 rounded-full mt-4 overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '97%' }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-red-500" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="relative py-32 bg-[#f5f5f7] border-t border-black/5 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-teal-400 mb-4">Integrations</p>
            <h2 className="text-[40px] md:text-[56px] font-semibold tracking-[-0.04em] text-[#1d1d1f]">Plays well with your stack.</h2>
          </div>
          <div className="relative w-full max-w-[700px] mx-auto aspect-square mt-10">
            <div className="absolute inset-0 rounded-full border border-black/5" />
            <div className="absolute inset-12 rounded-full border border-black/5" />
            <div className="absolute inset-24 rounded-full border border-black/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-lime-400 to-green-600 flex items-center justify-center shadow-[0_0_60px_rgba(163,230,53,0.4)] z-10">
              <Cpu size={40} className="text-black" />
            </div>
            {[
              { icon: Database, name: 'Kafka' },
              { icon: Server, name: 'K8s' },
              { icon: Cloud, name: 'AWS' },
              { icon: Code2, name: 'GitHub' },
              { icon: BarChart3, name: 'Grafana' },
              { icon: Activity, name: 'Prometheus' },
            ].map((integ, i) => {
              const angle = (i / 6) * Math.PI * 2
              const radius = 270
              return (
                <motion.div key={integ.name} animate={{ y: [0, -8, 0] }} transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/2 left-1/2 w-14 h-14 rounded-2xl bg-black/[0.05] border border-black/10 backdrop-blur flex items-center justify-center z-0" style={{ transform: `translate(calc(-50% + ${Math.cos(angle) * radius}px), calc(-50% + ${Math.sin(angle) * radius}px))` }} title={integ.name}>
                  <integ.icon size={22} className="text-[#1d1d1f]/70" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-32 bg-[#f5f5f7] border-t border-black/5">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-teal-400 mb-4">Loved by engineers</p>
            <h2 className="text-[40px] md:text-[56px] font-semibold tracking-[-0.04em] text-[#1d1d1f]">Don't take our word.</h2>
          </div>
          <div className="relative h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={testimonialIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="absolute w-full flex flex-col items-center text-center">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-yellow-400 text-teal-400" />)}
                </div>
                <p className="text-[22px] md:text-[28px] leading-[1.4] text-[#1d1d1f]/90 max-w-[700px] mb-8">"{testimonials[testimonialIdx].quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lime-400 to-green-600 flex items-center justify-center text-black font-bold">{testimonials[testimonialIdx].avatar}</div>
                  <div className="text-left">
                    <p className="text-[#1d1d1f] font-semibold">{testimonials[testimonialIdx].name}</p>
                    <p className="text-[#1d1d1f]/40 text-[13px]">{testimonials[testimonialIdx].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setTestimonialIdx(i)} className={`h-1.5 rounded-full transition-all ${i === testimonialIdx ? 'w-8 bg-white' : 'w-1.5 bg-white/20'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="relative py-32 bg-[#f5f5f7] border-t border-black/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-teal-400 mb-4">Pricing</p>
            <h2 className="text-[40px] md:text-[56px] font-semibold tracking-[-0.04em] text-[#1d1d1f]">Simple, transparent pricing.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Starter', price: '$0', period: '/mo', desc: 'For side projects', features: ['100K logs/day', '3 team members', '7-day retention', 'Community support'], highlight: false },
              { name: 'Pro', price: '$49', period: '/mo', desc: 'For growing teams', features: ['10M logs/day', 'Unlimited members', '90-day retention', 'Priority support', 'AI anomaly detection'], highlight: true },
              { name: 'Enterprise', price: 'Custom', period: '', desc: 'For scale', features: ['Unlimited logs', 'SSO & SAML', 'Air-gapped deploy', 'Dedicated CSM', 'Custom SLAs'], highlight: false },
            ].map((plan) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`relative p-8 rounded-2xl border ${plan.highlight ? 'bg-gradient-to-b from-lime-400/10 to-transparent border-teal-400/40 shadow-[0_0_60px_-20px_rgba(163,230,53,0.4)]' : 'bg-black/[0.02] border-black/[0.08]'}`}>
                {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-teal-400 text-[10px] font-bold text-black uppercase tracking-wider">Most Popular</div>}
                <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-1">{plan.name}</h3>
                <p className="text-[13px] text-[#1d1d1f]/40 mb-6">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-[40px] font-bold text-[#1d1d1f]">{plan.price}</span>
                  <span className="text-[#1d1d1f]/40 text-[14px]">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-[14px] text-[#1d1d1f]/70">
                      <CheckCircle2 size={16} className="text-teal-400 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate('/login')} className={`w-full py-3 rounded-full text-[14px] font-semibold transition-all ${plan.highlight ? 'bg-[#1d1d1f] text-white hover:bg-white/90' : 'bg-black/10 text-[#1d1d1f] hover:bg-white/15'}`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="relative py-20 bg-white border-t border-black/5">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#1d1d1f]/30 mb-8">Enterprise-Grade Security</p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            <div className="flex items-center gap-2"><ShieldCheck size={20} className="text-[#1d1d1f]" /> SOC2 Type II</div>
            <div className="flex items-center gap-2"><Lock size={20} className="text-[#1d1d1f]" /> ISO 27001</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={20} className="text-[#1d1d1f]" /> GDPR Compliant</div>
            <div className="flex items-center gap-2"><Server size={20} className="text-[#1d1d1f]" /> Air-Gapped</div>
            <div className="flex items-center gap-2"><Building2 size={20} className="text-[#1d1d1f]" /> HIPAA Ready</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-32 bg-[#f5f5f7] border-t border-black/5">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-teal-400 mb-4">FAQ</p>
            <h2 className="text-[40px] md:text-[56px] font-semibold tracking-[-0.04em] text-[#1d1d1f]">Questions?</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-2xl bg-black/[0.03] border border-black/[0.08] overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full flex items-center justify-between p-6 text-left hover:bg-black/[0.02] transition-colors">
                  <span className="text-[16px] font-semibold text-[#1d1d1f] pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                    <Plus size={20} className="text-[#1d1d1f]/60 shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="px-6 pb-6 text-[14px] leading-relaxed text-[#1d1d1f]/50">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-40 px-6 overflow-hidden bg-[#f5f5f7] border-t border-black/5">
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full blur-[280px] pointer-events-none" style={{ background: 'radial-gradient(circle, #0d9488, transparent 55%)' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative max-w-[900px] mx-auto text-center">
          <h2 className="text-[64px] md:text-[100px] font-semibold leading-[1] tracking-[-0.045em] text-[#1d1d1f]">
            Ready to<br />
            <motion.span animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 8, repeat: Infinity }} className="inline-block bg-gradient-to-r from-teal-300 via-emerald-400 to-teal-500 bg-clip-text text-transparent bg-[length:200%_100%] mt-2 drop-shadow-[0_0_30px_rgba(45,212,191,0.4)]">scale up?</motion.span>
          </h2>
          <p className="mt-8 text-[18px] text-[#1d1d1f]/50 max-w-[500px] mx-auto">Join 500+ engineering teams already shipping faster with AIOps.</p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group relative inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] text-white px-8 py-4 text-[16px] font-semibold overflow-hidden transition-all hover:scale-[1.03]" style={{ boxShadow: '0 20px 60px -12px rgba(163,230,53,0.4)' }}>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-black/[0.06] to-transparent" />
              <span className="relative">Back on Top</span>
              <ArrowUp size={18} className="relative transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#f5f5f7] border-t border-black/5 py-12 w-full">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <h4 className="text-[#1d1d1f] font-semibold mb-4 flex items-center gap-2"><Sparkles size={16} /> AIOps</h4>
              <p className="text-[#1d1d1f]/40 text-[13px]">AI-powered observability for cloud-native teams.</p>
            </div>
            <div>
              <h5 className="text-[#1d1d1f]/80 text-[13px] font-semibold uppercase tracking-wider mb-3">Product</h5>
              <ul className="space-y-2 text-[13px] text-[#1d1d1f]/40">
                <li><a href="#features" className="hover:text-[#1d1d1f] transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Docs</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[#1d1d1f]/80 text-[13px] font-semibold uppercase tracking-wider mb-3">Company</h5>
              <ul className="space-y-2 text-[13px] text-[#1d1d1f]/40">
                <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[#1d1d1f]/80 text-[13px] font-semibold uppercase tracking-wider mb-3">Legal</h5>
              <ul className="space-y-2 text-[13px] text-[#1d1d1f]/40">
                <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-black/5 pt-6 text-center">
            <p className="text-[#1d1d1f]/30 text-[13px]">© 2026 AIOps Observability Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
