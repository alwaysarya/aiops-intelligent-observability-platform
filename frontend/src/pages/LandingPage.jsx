import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { ArrowRight, Activity, Brain, Database, GitBranch, Zap, CheckCircle2, TrendingUp, ShieldCheck, BarChart3, Lock, Cpu, Server, Terminal, ShoppingCart, CreditCard, Cloud, Code2, Sparkles, Users, Star, Play, Radio, Clock, Building2, Plus, ArrowUp, Globe } from 'lucide-react'

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
  { t: '[INFO]', c: 'text-emerald-500', m: 'Connected to Kafka at kafka:9092' },
  { t: '[INFO]', c: 'text-emerald-500', m: 'Consuming from topic: aiops.logs' },
  { t: '[LOG]', c: 'text-gray-600', m: 'payment-service | POST /api/pay | 200 OK | 45ms' },
  { t: '[WARN]', c: 'text-amber-500', m: 'payment-service | Latency spike detected: 1250ms' },
  { t: '[ERROR]', c: 'text-red-500', m: 'AI Detector: Anomaly detected! Score: 0.92' },
  { t: '[ACTION]', c: 'text-emerald-500', m: 'Alert sent to Slack #incidents' },
  { t: '[ACTION]', c: 'text-teal-500', m: 'Auto-remediation: Restarting pod...' },
  { t: '[INFO]', c: 'text-emerald-500', m: 'Pod restarted. System healthy.' },
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
    <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#1C1C1E] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-2 px-6 py-4 bg-white/5 border-b border-white/10">
        <div className="flex gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-[#FF5F56]" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#27C93F]" />
        </div>
        <Terminal size={16} className="text-white/40 ml-3" />
        <span className="text-[12px] font-mono text-white/40">aiops-terminal — kafka-consumer</span>
      </div>
      <div className="p-8 font-mono text-[14px] leading-relaxed h-[320px] overflow-hidden relative">
        {terminalLines.slice(0, visible).map((line, i) => (
          <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={line.c}>
            <span className="opacity-70">{line.t}</span> {line.m}
          </motion.p>
        ))}
        <span className="inline-block w-2.5 h-5 bg-emerald-400 animate-pulse mt-2" />
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
    <div className="w-full bg-[#FBFBFD] min-h-screen text-[#1D1D1F] overflow-hidden font-sans selection:bg-teal-200 selection:text-teal-900">
      
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-emerald-500 to-teal-400 z-[100] origin-left"
        style={{ scaleX: globalScroll }}
      />

      {/* HERO SECTION */}
      <section ref={targetRef} className="relative overflow-hidden pt-40 pb-32">
        {/* Dynamic Background Mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], opacity: [0.3, 0.4, 0.3] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full blur-[120px]" style={{ background: 'radial-gradient(circle, #2dd4bf, transparent 60%)' }} />
          <motion.div animate={{ scale: [1, 1.3, 1], x: [0, -50, 0], opacity: [0.2, 0.3, 0.2] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }} className="absolute bottom-0 right-1/4 w-[800px] h-[800px] rounded-full blur-[120px]" style={{ background: 'radial-gradient(circle, #a78bfa, transparent 60%)' }} />
        </div>

        <motion.div style={{ y, opacity }} className="relative mx-auto max-w-[1200px] px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/5 bg-white/80 backdrop-blur-xl mb-10 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
              <motion.span className="w-2 h-2 rounded-full bg-emerald-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ boxShadow: '0 0 10px #10b981' }} />
              <span className="text-black/70 text-[12px] font-bold tracking-[0.16em] uppercase">AI-Powered Observability v2.0</span>
            </div>
            <h1 className="max-w-[1100px] mx-auto text-[72px] md:text-[110px] font-bold leading-[0.95] tracking-[-0.04em] text-[#1D1D1F]">
              Intelligence<br />
              <motion.span animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="inline-block bg-gradient-to-r from-teal-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent bg-[length:200%_100%] mt-2 drop-shadow-[0_0_20px_rgba(45,212,191,0.3)]">at scale.</motion.span>
            </h1>
            <p className="mt-10 max-w-[640px] mx-auto text-[22px] leading-[1.5] tracking-[-0.015em] text-gray-500 font-medium">
              Real-time observability with AI-powered anomaly detection, intelligent root cause analysis, and automated alerting for cloud-native applications.
            </p>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
              <button onClick={() => navigate('/login')} className="group inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] px-10 py-5 text-[17px] font-semibold tracking-[-0.01em] text-white transition-all hover:scale-[1.03] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)]">
                Enter AIOps World <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
              </button>
              <a href="#features" className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 backdrop-blur-md px-10 py-5 text-[17px] font-semibold tracking-[-0.01em] text-[#1D1D1F] shadow-sm transition-all hover:bg-white hover:shadow-md">
                <Play size={18} fill="currentColor" /> Explore Capabilities
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>


      {/* PREMIUM COMMAND CENTER MOCKUP (Hero ke theek niche) */}
      <section className="relative py-20 bg-[#FBFBFD] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative rounded-[32px] bg-white/60 backdrop-blur-2xl border border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden p-6 md:p-8">
            
            {/* Window Header */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-black/5">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="ml-4 px-3 py-1 bg-gray-100 rounded-lg text-[12px] font-mono text-gray-500 hidden md:block">aiops-cluster-main</div>
              </div>
              <div className="flex items-center gap-2 text-[12px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> All Systems Operational
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* Left Column: Stats & Nodes */}
              <div className="md:col-span-1 space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-black/5 shadow-sm">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Active Nodes</p>
                  <div className="text-[28px] font-black text-[#1D1D1F]">24<span className="text-[14px] text-gray-400 font-medium">/24</span></div>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-black/5 shadow-sm">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">CPU Usage</p>
                  <div className="text-[28px] font-black text-teal-600">34%</div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-teal-500 w-[34%] rounded-full" />
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-black/5 shadow-sm">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Memory</p>
                  <div className="text-[28px] font-black text-indigo-600">12GB</div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[55%] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Right Column: Big Chart */}
              <div className="md:col-span-3 p-6 rounded-2xl bg-white border border-black/5 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-[15px] font-bold text-[#1D1D1F]">Global Traffic</p>
                    <p className="text-[12px] text-gray-400">Requests per second across all regions</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-gray-100 text-[11px] font-bold text-gray-600 rounded-md">1H</button>
                    <button className="px-3 py-1 bg-[#1D1D1F] text-[11px] font-bold text-white rounded-md">24H</button>
                    <button className="px-3 py-1 bg-gray-100 text-[11px] font-bold text-gray-600 rounded-md">7D</button>
                  </div>
                </div>
                <div className="flex-grow relative h-[220px] w-full">
                  {/* SVG Chart Area */}
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Main Area */}
                    <path d="M0,70 Q10,60 20,65 T40,30 T60,40 T80,15 T100,25 L100,100 L0,100 Z" fill="url(#areaGrad)" />
                    <path d="M0,70 Q10,60 20,65 T40,30 T60,40 T80,15 T100,25" fill="none" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Secondary Line */}
                    <path d="M0,85 Q10,80 20,85 T40,60 T60,70 T80,50 T100,55" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
                  </svg>
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                    <div className="border-t border-black w-full"></div>
                    <div className="border-t border-black w-full"></div>
                    <div className="border-t border-black w-full"></div>
                    <div className="border-t border-black w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="relative py-16 border-y border-black/5 bg-white/50 backdrop-blur-md overflow-hidden">
        <p className="text-center text-[12px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-10">Trusted by engineering teams at</p>
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#FBFBFD] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#FBFBFD] to-transparent z-10 pointer-events-none" />
          <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="flex gap-20 whitespace-nowrap items-center">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex gap-20">
                {['Acme Corp', 'GlobalTech', 'Nexus', 'SysCorp', 'Cloudify', 'DataFlow', 'ByteScale', 'Quantum'].map(name => (
                  <span key={name} className="text-3xl font-bold text-gray-400/80 hover:text-black transition-colors tracking-tighter">{name}</span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-24">
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-teal-600 mb-5">The Workflow</p>
            <h2 className="text-[48px] md:text-[64px] font-bold tracking-[-0.04em] text-[#1D1D1F]">How it works.</h2>
            <p className="text-gray-500 mt-6 max-w-[600px] mx-auto text-[20px] font-medium">From ingestion to remediation — fully automated in under 90 seconds.</p>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
            {[
              { step: '01', title: 'Ingest', desc: 'Logs streamed from Fluentd to Kafka.', icon: Server },
              { step: '02', title: 'Analyze', desc: 'AI models detect anomalies instantly.', icon: Brain },
              { step: '03', title: 'Alert', desc: 'Smart routing to Slack/PagerDuty.', icon: Activity },
              { step: '04', title: 'Remediate', desc: 'K8s auto-heals without human touch.', icon: Zap },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }} className="relative flex flex-col justify-between h-[240px] p-8 rounded-3xl bg-[#FBFBFD] border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all">
                <div className="text-[84px] font-black text-gray-400/80 absolute top-4 right-6 leading-none select-none">{item.step}</div>
                <div className="w-14 h-14 rounded-2xl shrink-0 relative z-10 bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100 flex items-center justify-center mb-6 shadow-sm shrink-0">
                  <item.icon size={28} className="text-teal-600" />
                </div>
                <div className="relative z-10 w-full">
                  <h3 className="text-[22px] font-bold text-[#1D1D1F] mb-2">{item.title}</h3>
                  <p className="text-[15px] text-gray-500 leading-snug font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* DEPLOYMENT PIPELINE VISUAL */}
      <section className="relative py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex items-center justify-between p-6 rounded-3xl bg-[#FBFBFD] border border-black/5 shadow-sm overflow-hidden relative">
             <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-teal-400 to-emerald-500 w-full" />
             <div className="flex flex-col items-center gap-2 z-10 bg-white p-3 rounded-xl border border-black/5 shadow-sm"><Code2 size={20} className="text-[#1D1D1F]"/><span className="text-[11px] font-bold">GitHub</span></div>
             <div className="flex-grow h-px bg-gray-200 relative"><div className="absolute top-1/2 left-0 w-full h-px bg-teal-400 animate-[pulse_2s_ease-in-out_infinite]" /></div>
             <div className="flex flex-col items-center gap-2 z-10 bg-white p-3 rounded-xl border border-black/5 shadow-sm"><Server size={20} className="text-[#1D1D1F]"/><span className="text-[11px] font-bold">Build</span></div>
             <div className="flex-grow h-px bg-gray-200" />
             <div className="flex flex-col items-center gap-2 z-10 bg-white p-3 rounded-xl border border-black/5 shadow-sm"><ShieldCheck size={20} className="text-[#1D1D1F]"/><span className="text-[11px] font-bold">Test</span></div>
             <div className="flex-grow h-px bg-gray-200" />
             <div className="flex flex-col items-center gap-2 z-10 bg-[#1D1D1F] p-3 rounded-xl shadow-lg"><Cloud size={20} className="text-teal-400"/><span className="text-[11px] font-bold text-white">Deploy</span></div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative py-32 bg-[#FBFBFD] border-t border-black/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-24">
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-teal-600 mb-5">Capabilities</p>
            <h2 className="text-[48px] md:text-[64px] font-bold tracking-[-0.04em] text-[#1D1D1F]">Everything you need.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Database, title: 'Log Ingestion', desc: 'High-throughput ingestion from Fluentd, Kafka, and 40+ sources.', big: true, color: 'bg-teal-50 text-teal-600 border-teal-100' },
              { icon: Brain, title: 'AI Anomaly Detection', desc: 'LSTM models detect patterns humans miss.', color: 'bg-teal-50 text-teal-600 border-teal-100' },
              { icon: Activity, title: 'Real-time Alerts', desc: 'Smart routing to Slack, PagerDuty, email.', color: 'bg-teal-50 text-teal-600 border-teal-100' },
              { icon: GitBranch, title: 'Root Cause Analysis', desc: 'AI traces issues across microservices.', color: 'bg-teal-50 text-teal-600 border-teal-100' },
              { icon: TrendingUp, title: 'Predictive Scaling', desc: 'Auto-scale infrastructure based on AI traffic forecasting.', color: 'bg-teal-50 text-teal-600 border-teal-100' },
              { icon: BarChart3, title: 'Dashboards', desc: 'Beautiful, customizable, real-time charts.', big: true, color: 'bg-teal-50 text-teal-600 border-teal-100' },
              { icon: ShieldCheck, title: 'Compliance-Ready', desc: 'SOC2, ISO 27001, GDPR built-in.', color: 'bg-teal-50 text-teal-600 border-teal-100' },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -5 }} className={`group relative flex flex-col h-full p-10 rounded-[32px] bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all ${f.big ? 'md:col-span-2' : ''}`}>
                <div className="w-14 h-14 rounded-2xl shrink-0 relative z-10 bg-teal-50 border border-teal-100 shadow-sm flex items-center justify-center mb-8">
                  <f.icon size={32} className="text-teal-600" />
                </div>
                <h3 className="text-[26px] font-bold text-[#1D1D1F] mb-3">{f.title}</h3>
                <p className="text-[17px] text-gray-500 flex-grow leading-relaxed font-medium">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* PREMIUM ARCHITECTURE / INTEGRATION SHOWCASE */}
      <section className="relative py-32 bg-[#FBFBFD] border-t border-black/5 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-teal-600 mb-5">Architecture</p>
            <h2 className="text-[48px] md:text-[64px] font-bold tracking-[-0.04em] text-[#1D1D1F] mb-6">Connects your entire stack.</h2>
            <p className="text-[20px] text-gray-500 max-w-[600px] mx-auto font-medium">One central brain that ingests, processes, and analyzes data from all your cloud-native tools.</p>
          </div>

          <div className="relative w-full max-w-[900px] mx-auto aspect-[2/1] flex items-center justify-center">
            {/* Connecting Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 500">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              {/* Lines from left sources to center */}
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.2 }} d="M 150 100 C 300 100, 350 250, 500 250" fill="none" stroke="url(#lineGrad)" strokeWidth="2" />
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.4 }} d="M 150 250 C 300 250, 350 250, 500 250" fill="none" stroke="url(#lineGrad)" strokeWidth="2" />
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.6 }} d="M 150 400 C 300 400, 350 250, 500 250" fill="none" stroke="url(#lineGrad)" strokeWidth="2" />
              
              {/* Lines from right sources to center */}
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.3 }} d="M 850 100 C 700 100, 650 250, 500 250" fill="none" stroke="url(#lineGrad)" strokeWidth="2" />
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5 }} d="M 850 250 C 700 250, 650 250, 500 250" fill="none" stroke="url(#lineGrad)" strokeWidth="2" />
              <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.7 }} d="M 850 400 C 700 400, 650 250, 500 250" fill="none" stroke="url(#lineGrad)" strokeWidth="2" />
            </svg>

            {/* Left Source Nodes */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="absolute left-[5%] top-[15%] flex items-center gap-4 bg-white p-4 rounded-2xl shadow-lg border border-black/5">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center"><Database size={20} className="text-teal-600"/></div>
              <span className="font-bold text-[#1D1D1F]">Kafka</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="absolute left-[5%] top-[45%] flex items-center gap-4 bg-white p-4 rounded-2xl shadow-lg border border-black/5">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center"><Server size={20} className="text-teal-600"/></div>
              <span className="font-bold text-[#1D1D1F]">Kubernetes</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="absolute left-[5%] top-[75%] flex items-center gap-4 bg-white p-4 rounded-2xl shadow-lg border border-black/5">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center"><Terminal size={20} className="text-teal-600"/></div>
              <span className="font-bold text-[#1D1D1F]">Fluentd</span>
            </motion.div>

            {/* Right Destination Nodes */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="absolute right-[5%] top-[15%] flex items-center gap-4 bg-white p-4 rounded-2xl shadow-lg border border-black/5 flex-row-reverse">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center"><BarChart3 size={20} className="text-indigo-600"/></div>
              <span className="font-bold text-[#1D1D1F]">Grafana</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="absolute right-[5%] top-[45%] flex items-center gap-4 bg-white p-4 rounded-2xl shadow-lg border border-black/5 flex-row-reverse">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center"><Cloud size={20} className="text-indigo-600"/></div>
              <span className="font-bold text-[#1D1D1F]">AWS Cloud</span>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} className="absolute right-[5%] top-[75%] flex items-center gap-4 bg-white p-4 rounded-2xl shadow-lg border border-black/5 flex-row-reverse">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center"><Activity size={20} className="text-indigo-600"/></div>
              <span className="font-bold text-[#1D1D1F]">Slack</span>
            </motion.div>

            {/* Central AIOps Brain */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, type: 'spring' }} className="relative z-10 w-32 h-32 rounded-full bg-[#1D1D1F] flex flex-col items-center justify-center shadow-[0_20px_60px_rgba(20,184,166,0.4)] border-[6px] border-white">
              <Cpu size={40} className="text-teal-400 mb-1" />
              <span className="text-white font-bold text-[13px] tracking-widest uppercase">AIOps</span>
              <div className="absolute inset-0 rounded-full border border-teal-400/30 animate-ping opacity-20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* LIVE TERMINAL */}
      <section className="relative py-32 bg-white border-t border-black/5 overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-emerald-600 mb-5 flex items-center justify-center gap-2">
              <Radio size={14} className="animate-pulse" /> Live from production
            </p>
            <h2 className="text-[48px] font-bold text-[#1D1D1F]">Watch the pipeline in real-time.</h2>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-[40px] blur-3xl opacity-20" />
            <LiveTerminal />
          </motion.div>
        </div>
      </section>


      {/* PREMIUM DASHBOARD MOCKUP */}
      <section className="relative py-24 bg-white overflow-hidden border-t border-black/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[40px] md:text-[56px] font-bold tracking-[-0.04em] text-[#1D1D1F] mb-6">See the whole picture.</h2>
            <p className="text-[20px] text-gray-500 max-w-[600px] mx-auto font-medium">One unified dashboard for all your infrastructure metrics, logs, and traces.</p>
          </div>
          
          {/* Mockup Window */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative rounded-[32px] bg-[#FBFBFD] border border-black/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] overflow-hidden">
            {/* Window Top Bar */}
            <div className="h-12 bg-white border-b border-black/5 flex items-center px-6 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="ml-4 h-6 w-64 bg-gray-100 rounded-md flex items-center px-3">
                <span className="text-[10px] text-gray-400 font-mono">https://app.aiops.io/dashboard</span>
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sidebar / Metrics */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm">
                  <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-2">System Health</p>
                  <div className="flex items-end gap-2">
                    <span className="text-[36px] font-black text-emerald-500 leading-none">99.99%</span>
                    <span className="text-[12px] text-emerald-600 font-bold mb-1 bg-emerald-50 px-2 py-0.5 rounded-md">+0.02%</span>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm">
                  <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-2">Active Incidents</p>
                  <div className="flex items-end gap-2">
                    <span className="text-[36px] font-black text-[#1D1D1F] leading-none">0</span>
                    <span className="text-[12px] text-gray-500 font-bold mb-1 bg-gray-100 px-2 py-0.5 rounded-md">All clear</span>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm">
                  <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-2">Logs Processed</p>
                  <div className="flex items-end gap-2">
                    <span className="text-[36px] font-black text-[#1D1D1F] leading-none">4.2B</span>
                    <span className="text-[12px] text-teal-600 font-bold mb-1 bg-teal-50 px-2 py-0.5 rounded-md">+12%</span>
                  </div>
                </div>
              </div>
              
              {/* Main Chart Area */}
              <div className="md:col-span-2 p-6 rounded-2xl bg-white border border-black/5 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-[15px] font-bold text-[#1D1D1F]">Request Latency (ms)</p>
                  <div className="flex gap-2">
                    <span className="text-[11px] font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md border border-teal-100">Live</span>
                  </div>
                </div>
                {/* Fake Chart Lines using SVG */}
                <div className="flex-grow relative h-[200px] w-full">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,80 Q10,70 20,75 T40,40 T60,50 T80,20 T100,30 L100,100 L0,100 Z" fill="url(#chartGrad)" />
                    <path d="M0,80 Q10,70 20,75 T40,40 T60,50 T80,20 T100,30" fill="none" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                    <div className="border-t border-black w-full"></div>
                    <div className="border-t border-black w-full"></div>
                    <div className="border-t border-black w-full"></div>
                    <div className="border-t border-black w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* PREMIUM LOGS / INCIDENTS MOCKUP */}
      <section className="relative py-32 bg-[#1D1D1F] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-teal-400 mb-5">Centralized Logs</p>
              <h2 className="text-[48px] md:text-[56px] font-bold tracking-[-0.04em] text-white mb-6 leading-tight">Every error. <br/>One place.</h2>
              <p className="text-[20px] text-white/50 font-medium mb-8">Search through millions of logs in milliseconds. AI automatically groups related errors and pinpoints the exact stack trace.</p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-white/70 text-sm font-medium"><CheckCircle2 size={18} className="text-teal-400"/> Full-text search</div>
                <div className="flex items-center gap-2 text-white/70 text-sm font-medium"><CheckCircle2 size={18} className="text-teal-400"/> Trace correlation</div>
              </div>
            </div>
            <div className="flex-1 w-full relative">
              <div className="absolute -inset-4 bg-teal-500/20 rounded-[40px] blur-2xl" />
              <div className="relative rounded-3xl bg-[#0A0A0F] border border-white/10 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[12px] font-mono text-white/40">production-logs</span>
                </div>
                <div className="p-6 font-mono text-[12px] leading-relaxed text-white/80">
                  <div className="mb-4 flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <span className="text-red-400 font-bold shrink-0">ERROR</span>
                    <div>
                      <p className="text-white font-semibold">Database connection timeout</p>
                      <p className="text-white/40 mt-1">at pool.connect (db.js:42:15)</p>
                    </div>
                  </div>
                  <div className="mb-4 flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <span className="text-amber-400 font-bold shrink-0">WARN</span>
                    <div>
                      <p className="text-white font-semibold">High memory usage detected</p>
                      <p className="text-white/40 mt-1">Pod auth-service-5f8d9 (85%)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                    <span className="text-teal-400 font-bold shrink-0">INFO</span>
                    <div>
                      <p className="text-white font-semibold">Request completed successfully</p>
                      <p className="text-white/40 mt-1">GET /api/v1/users (200 OK)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* GLOBAL NETWORK MAP */}
      <section className="relative py-24 bg-white border-t border-black/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[36px] font-bold text-[#1D1D1F]">Global Observability.</h2>
          </div>
          <div className="relative h-[300px] w-full rounded-3xl bg-[#FBFBFD] border border-black/5 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            {/* Fake Map Dots */}
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-teal-500 rounded-full animate-ping" />
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-teal-500 rounded-full shadow-[0_0_20px_rgba(20,184,166,0.8)]" />
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-teal-500 rounded-full shadow-[0_0_20px_rgba(20,184,166,0.8)]" />
            <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-teal-500 rounded-full shadow-[0_0_20px_rgba(20,184,166,0.8)]" />
            {/* Connecting Lines (Fake) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" opacity="0.3">
              <path d="M 330 75 Q 500 150 500 150" stroke="#14b8a6" strokeWidth="2" fill="none" strokeDasharray="5 5" />
              <path d="M 500 150 Q 750 198 750 198" stroke="#14b8a6" strokeWidth="2" fill="none" strokeDasharray="5 5" />
            </svg>
            <div className="relative z-10 text-center">
              <p className="text-[60px] font-black text-[#1D1D1F]">50+</p>
              <p className="text-[14px] font-bold text-gray-500 uppercase tracking-widest">Global Regions</p>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="relative py-32 bg-[#FBFBFD] border-t border-black/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-24">
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-teal-600 mb-5">Industries</p>
            <h2 className="text-[48px] md:text-[64px] font-bold tracking-[-0.04em] text-[#1D1D1F]">Built for every industry.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'E-Commerce', icon: ShoppingCart, desc: 'Detect checkout failures instantly.' },
              { title: 'FinTech', icon: CreditCard, desc: 'Zero-downtime payment processing.' },
              { title: 'SaaS', icon: Cloud, desc: 'Multi-tenant observability.' },
              { title: 'DevTools', icon: Code2, desc: 'CI/CD pipeline monitoring.' },
            ].map((useCase, i) => (
              <motion.div key={useCase.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }} className="p-8 rounded-[32px] bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg transition-all cursor-default flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl shrink-0 relative z-10 bg-teal-50 flex items-center justify-center mb-6">
                  <useCase.icon size={26} className="text-teal-600" />
                </div>
                <h3 className="text-[20px] font-bold text-[#1D1D1F] mb-2">{useCase.title}</h3>
                <p className="text-[15px] text-gray-500 flex-grow font-medium leading-relaxed">{useCase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative py-24 bg-white border-t border-black/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Database, value: 4.2, suffix: 'B+', label: 'Logs processed daily' },
              { icon: Clock, value: 90, suffix: 's', label: 'Avg MTTR' },
              { icon: Users, value: 500, suffix: '+', label: 'Teams onboard' },
              { icon: TrendingUp, value: 99.99, suffix: '%', label: 'Uptime SLA' },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-8 rounded-3xl bg-[#FBFBFD] border border-black/5 shadow-sm">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                  <s.icon size={26} className="text-teal-600" />
                </div>
                <div className="text-[52px] font-black text-[#1D1D1F] leading-none">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <p className="text-[15px] font-bold text-gray-400 mt-3 uppercase tracking-wider">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI INSIGHTS */}
      <section className="relative py-32 bg-[#FBFBFD] border-t border-black/5">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-[48px] bg-white border border-black/5 p-10 md:p-20 overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)]">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 opacity-60" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100/50 text-teal-800 text-[12px] font-bold uppercase tracking-wider mb-8 border border-teal-200/50">
                  <Sparkles size={14} /> AI Insights
                </div>
                <h2 className="text-[40px] md:text-[52px] font-bold text-[#1D1D1F] mb-6 leading-[1.1] tracking-tight">Predict issues before they happen.</h2>
                <p className="text-[20px] text-gray-500 mb-10 leading-relaxed font-medium">Our LSTM models analyze historical patterns to predict outages 15 minutes before they occur.</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[17px] font-semibold text-gray-700 bg-[#FBFBFD] p-4 rounded-2xl border border-black/5 shadow-sm"><CheckCircle2 size={22} className="text-emerald-500 shrink-0" /> Predicted DB timeout at 14:30</div>
                  <div className="flex items-center gap-4 text-[17px] font-semibold text-gray-700 bg-[#FBFBFD] p-4 rounded-2xl border border-black/5 shadow-sm"><CheckCircle2 size={22} className="text-emerald-500 shrink-0" /> Auto-scaled pod from 3 to 5</div>
                </div>
              </div>
              <div className="w-full md:w-80 p-10 rounded-[40px] bg-[#1D1D1F] border border-white/10 shadow-2xl text-white">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[14px] font-bold text-white/60">Anomaly Score</span>
                  <span className="text-[12px] bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full font-bold">Critical</span>
                </div>
                <div className="text-[72px] font-black leading-none mb-8 tracking-tighter">0.97</div>
                <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '97%' }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-[0_0_20px_rgba(248,113,113,0.5)]" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* LIVE CODE EDITOR MOCKUP */}
      <section className="relative py-24 bg-[#FBFBFD] border-t border-black/5 overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="rounded-3xl bg-[#0A0A0F] border border-white/10 shadow-2xl overflow-hidden">
            <div className="flex items-center px-6 py-3 border-b border-white/10 bg-white/5">
              <span className="text-[12px] font-mono text-teal-400">aiops.config.js</span>
            </div>
            <div className="p-6 font-mono text-[13px] leading-relaxed">
              <p className="text-white/40">// Initialize AIOps SDK</p>
              <p className="text-blue-400">import <span className="text-white">{ "{ AIOps }" }</span> from <span className="text-teal-300">'@aiops/sdk'</span>;</p>
              <br/>
              <p className="text-blue-400">const <span className="text-white">observability</span> = <span className="text-blue-400">new</span> <span className="text-yellow-300">{ "AIOps" }</span>({'{'}</p>
              <p className="pl-4 text-white">apiKey: <span className="text-teal-300">'ai_ops_prod_xxx'</span>,</p>
              <p className="pl-4 text-white">environment: <span className="text-teal-300">'production'</span>,</p>
              <p className="pl-4 text-white">autoRemediate: <span className="text-orange-400">true</span></p>
              <p className="text-white">{'}'});</p>
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="relative py-32 bg-white border-t border-black/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-24">
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-teal-600 mb-5">Integrations</p>
            <h2 className="text-[48px] md:text-[64px] font-bold tracking-[-0.04em] text-[#1D1D1F]">Plays well with your stack.</h2>
          </div>
          <div className="relative w-full max-w-[700px] mx-auto aspect-square mt-10">
            <div className="absolute inset-0 rounded-full border border-black/5 bg-[#FBFBFD]/50" />
            <div className="absolute inset-16 rounded-full border border-black/5" />
            <div className="absolute inset-32 rounded-full border border-black/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#1D1D1F] flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.3)] z-10 border-[6px] border-white">
              <Cpu size={48} className="text-teal-400" />
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
                <motion.div key={integ.name} animate={{ y: [0, -12, 0] }} transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/2 left-1/2 w-20 h-20 rounded-3xl bg-white border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-center z-0" style={{ transform: `translate(calc(-50% + ${Math.cos(angle) * radius}px), calc(-50% + ${Math.sin(angle) * radius}px))` }} title={integ.name}>
                  <integ.icon size={32} className="text-gray-700" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>


      {/* PREMIUM AI CHAT MOCKUP */}
      <section className="relative py-32 bg-[#FBFBFD] border-t border-black/5 overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-teal-600 mb-5">Meet Copilot</p>
            <h2 className="text-[48px] md:text-[56px] font-bold tracking-[-0.04em] text-[#1D1D1F]">Ask your infrastructure.</h2>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-[800px] mx-auto bg-white rounded-[32px] border border-black/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="h-16 bg-gray-50 border-b border-black/5 flex items-center px-6 gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1D1D1F] flex items-center justify-center"><Sparkles size={16} className="text-teal-400" /></div>
              <span className="font-bold text-[#1D1D1F]">AIOps Copilot</span>
              <span className="text-[11px] bg-teal-100 text-teal-700 px-2 py-0.5 rounded-md font-bold ml-auto">Online</span>
            </div>
            <div className="p-8 space-y-6">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-[#1D1D1F] text-white p-4 rounded-2xl rounded-tr-sm max-w-[80%]">
                  <p className="text-[15px]">Why is the payment-service latency so high right now?</p>
                </div>
              </div>
              {/* AI Response */}
              <div className="flex justify-start">
                <div className="bg-gray-50 border border-black/5 p-5 rounded-2xl rounded-tl-sm max-w-[85%]">
                  <p className="text-[15px] text-gray-700 font-medium mb-4">I found the root cause. The latency is caused by a slow database query in the <code className="bg-red-50 text-red-600 px-1 py-0.5 rounded text-sm font-mono">orders</code> table.</p>
                  <div className="bg-white border border-black/5 rounded-xl p-3 shadow-sm mb-4">
                    <p className="text-[13px] font-mono text-gray-600">SELECT * FROM orders WHERE status = 'pending' <span className="text-red-500">-- Missing Index</span></p>
                  </div>
                  <p className="text-[15px] text-gray-700 font-medium">I recommend adding an index on <code className="bg-teal-50 text-teal-700 px-1 py-0.5 rounded text-sm font-mono">status</code>. This should reduce latency by 85%.</p>
                  <div className="flex gap-2 mt-5">
                    <button className="bg-[#1D1D1F] text-white text-[13px] font-bold px-4 py-2 rounded-lg">Apply Fix</button>
                    <button className="bg-white border border-black/10 text-gray-700 text-[13px] font-bold px-4 py-2 rounded-lg">View Query Plan</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-32 bg-[#FBFBFD] border-t border-black/5">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-teal-600 mb-5">Loved by engineers</p>
            <h2 className="text-[48px] md:text-[64px] font-bold tracking-[-0.04em] text-[#1D1D1F]">Don't take our word.</h2>
          </div>
          <div className="relative h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={testimonialIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="absolute w-full flex flex-col items-center text-center bg-white p-12 rounded-[40px] border border-black/5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
                <div className="flex gap-1.5 mb-8">
                  {[...Array(5)].map((_, i) => <Star key={i} size={24} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-[28px] md:text-[34px] font-bold leading-[1.3] text-[#1D1D1F] max-w-[850px] mb-10 tracking-tight">"{testimonials[testimonialIdx].quote}"</p>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">{testimonials[testimonialIdx].avatar}</div>
                  <div className="text-left">
                    <p className="text-[#1D1D1F] font-bold text-[18px]">{testimonials[testimonialIdx].name}</p>
                    <p className="text-gray-500 text-[15px] font-medium">{testimonials[testimonialIdx].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setTestimonialIdx(i)} className={`h-2.5 rounded-full transition-all ${i === testimonialIdx ? 'w-12 bg-[#1D1D1F]' : 'w-2.5 bg-gray-300'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="relative py-32 bg-white border-t border-black/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-teal-600 mb-5">Pricing</p>
            <h2 className="text-[48px] md:text-[64px] font-bold tracking-[-0.04em] text-[#1D1D1F]">Simple, transparent pricing.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: '$0', period: '/mo', desc: 'For side projects', features: ['100K logs/day', '3 team members', '7-day retention', 'Community support'], highlight: false },
              { name: 'Pro', price: '$49', period: '/mo', desc: 'For growing teams', features: ['10M logs/day', 'Unlimited members', '90-day retention', 'Priority support', 'AI anomaly detection'], highlight: true },
              { name: 'Enterprise', price: 'Custom', period: '', desc: 'For scale', features: ['Unlimited logs', 'SSO & SAML', 'Air-gapped deploy', 'Dedicated CSM', 'Custom SLAs'], highlight: false },
            ].map((plan) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`relative p-10 rounded-[40px] border ${plan.highlight ? 'bg-[#1D1D1F] border-[#1D1D1F] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] scale-105 z-10 text-white' : 'bg-[#FBFBFD] border-black/5 text-[#1D1D1F]'}`}>
                {plan.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 text-[12px] font-black text-white uppercase tracking-wider shadow-lg">Most Popular</div>}
                <h3 className="text-[26px] font-bold mb-2">{plan.name}</h3>
                <p className={`text-[16px] font-medium mb-8 ${plan.highlight ? 'text-white/60' : 'text-gray-500'}`}>{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-10">
                  <span className="text-[56px] font-black tracking-tighter">{plan.price}</span>
                  <span className={`text-[18px] font-medium ${plan.highlight ? 'text-white/60' : 'text-gray-500'}`}>{plan.period}</span>
                </div>
                <ul className="space-y-5 mb-12">
                  {plan.features.map(f => (
                    <li key={f} className={`flex items-center gap-3 text-[16px] font-semibold ${plan.highlight ? 'text-white/80' : 'text-gray-600'}`}>
                      <CheckCircle2 size={20} className={plan.highlight ? 'text-teal-400' : 'text-teal-500'} /> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate('/login')} className={`w-full py-4 rounded-2xl text-[16px] font-bold transition-all ${plan.highlight ? 'bg-white text-[#1D1D1F] hover:bg-gray-100 shadow-xl' : 'bg-[#1D1D1F] text-white hover:bg-black shadow-lg'}`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* SECURITY GRID MOCKUP */}
      <section className="relative py-24 bg-white border-t border-black/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'TLS 1.3 Encryption', icon: Lock },
              { title: 'AES-256 at Rest', icon: Database },
              { title: 'SSO / SAML', icon: ShieldCheck },
              { title: 'Data Residency', icon: Globe },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#FBFBFD] border border-black/5 hover:bg-white hover:shadow-md transition-all">
                <item.icon size={24} className="text-teal-600 mb-3" />
                <span className="text-[14px] font-bold text-[#1D1D1F] text-center">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="relative py-24 bg-[#FBFBFD] border-t border-black/5">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <p className="text-[12px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-10">Enterprise-Grade Security</p>
          <div className="flex flex-wrap justify-center gap-12 items-center opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-3 text-xl font-bold"><ShieldCheck size={28} /> SOC2 Type II</div>
            <div className="flex items-center gap-3 text-xl font-bold"><Lock size={28} /> ISO 27001</div>
            <div className="flex items-center gap-3 text-xl font-bold"><CheckCircle2 size={28} /> GDPR Compliant</div>
            <div className="flex items-center gap-3 text-xl font-bold"><Server size={28} /> Air-Gapped</div>
            <div className="flex items-center gap-3 text-xl font-bold"><Building2 size={28} /> HIPAA Ready</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-32 bg-white border-t border-black/5">
        <div className="max-w-[850px] mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-teal-600 mb-5">FAQ</p>
            <h2 className="text-[48px] md:text-[64px] font-bold tracking-[-0.04em] text-[#1D1D1F]">Questions?</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-[24px] bg-[#FBFBFD] border border-black/5 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full flex items-center justify-between p-8 text-left">
                  <span className="text-[19px] font-bold text-[#1D1D1F] pr-6">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                    <Plus size={24} className="text-gray-400 shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="px-8 pb-8 text-[17px] leading-relaxed text-gray-500 font-medium">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-48 px-6 overflow-hidden bg-[#1D1D1F]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full blur-[200px] pointer-events-none opacity-30" style={{ background: 'radial-gradient(circle, #2dd4bf, transparent 60%)' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative max-w-[900px] mx-auto text-center">
          <h2 className="text-[72px] md:text-[110px] font-bold leading-[0.95] tracking-[-0.045em] text-white">
            Ready to<br />
            <motion.span animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 8, repeat: Infinity }} className="inline-block bg-gradient-to-r from-teal-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent bg-[length:200%_100%] mt-2 drop-shadow-[0_0_30px_rgba(45,212,191,0.5)]">scale up?</motion.span>
          </h2>
          <p className="mt-10 text-[22px] font-medium text-white/60 max-w-[500px] mx-auto">Join 500+ engineering teams already shipping faster with AIOps.</p>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group relative inline-flex items-center gap-3 rounded-full bg-white text-[#1D1D1F] px-10 py-5 text-[18px] font-bold overflow-hidden transition-all hover:scale-[1.03] shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]">
              Back on Top <ArrowUp size={22} className="relative transition-transform group-hover:-translate-y-1" strokeWidth={2.5} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#FBFBFD] border-t border-black/5 py-20 w-full">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h4 className="text-[#1D1D1F] text-xl font-black mb-5 flex items-center gap-2 tracking-tight"><Sparkles size={22} className="text-teal-500" /> AIOps</h4>
              <p className="text-gray-500 text-[15px] leading-relaxed font-medium">AI-powered observability for cloud-native teams.</p>
            </div>
            <div>
              <h5 className="text-[#1D1D1F] text-[13px] font-bold uppercase tracking-wider mb-5">Product</h5>
              <ul className="space-y-4 text-[15px] font-semibold text-gray-500">
                <li><a href="#features" className="hover:text-black transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Docs</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[#1D1D1F] text-[13px] font-bold uppercase tracking-wider mb-5">Company</h5>
              <ul className="space-y-4 text-[15px] font-semibold text-gray-500">
                <li><a href="#" className="hover:text-black transition-colors">About</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[#1D1D1F] text-[13px] font-bold uppercase tracking-wider mb-5">Legal</h5>
              <ul className="space-y-4 text-[15px] font-semibold text-gray-500">
                <li><a href="#" className="hover:text-black transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-black/5 pt-10 text-center flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-[14px] font-medium">© 2026 AIOps Observability Platform. All rights reserved.</p>
            <div className="flex gap-6 text-gray-400">
              <Globe size={22} className="hover:text-black cursor-pointer transition-colors" />
              <Code2 size={22} className="hover:text-black cursor-pointer transition-colors" />
              <Lock size={22} className="hover:text-black cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
