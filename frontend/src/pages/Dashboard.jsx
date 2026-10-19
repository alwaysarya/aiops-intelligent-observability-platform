import { useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Activity, ArrowDown, ArrowRight, ArrowUpRight, CheckCircle2,
  ChevronRight, Cloud, Cpu, GitBranch, Layers3, Menu, RefreshCw,
  Server, ShieldCheck, Terminal, X, Zap
} from "lucide-react";
import { useRef } from "react";

const services = [
  { name: "API Gateway", detail: "Request routing and traffic", status: "Operational", uptime: "99.98%", icon: Cloud },
  { name: "Application Server", detail: "Core application services", status: "Operational", uptime: "99.95%", icon: Server },
  { name: "Build Pipeline", detail: "Continuous integration", status: "Operational", uptime: "99.91%", icon: GitBranch },
  { name: "Compute Engine", detail: "Processing resources", status: "Monitoring", uptime: "98.76%", icon: Cpu }
];

const deployments = [
  { version: "v2.8.4", branch: "main", environment: "Production", status: "Successful", time: "Today · 10:42 AM" },
  { version: "v2.8.3", branch: "release/stable", environment: "Staging", status: "Successful", time: "Today · 9:18 AM" },
  { version: "v2.8.2", branch: "main", environment: "Production", status: "Successful", time: "Yesterday · 6:32 PM" }
];

const activities = [
  { title: "Deployment completed", detail: "Production · main branch", time: "8 min ago", type: "success" },
  { title: "Build pipeline passed", detail: "Build #284 · 12 checks", time: "24 min ago", type: "success" },
  { title: "Resource usage increased", detail: "Compute Engine · 72% CPU", time: "41 min ago", type: "warning" },
  { title: "Configuration updated", detail: "Environment variables", time: "1 hr ago", type: "info" }
];

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.14 });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function Heading({ eyebrow, title, description }) {
  return (
    <div className="dash-heading">
      <p className="dash-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="dash-description">{description}</p>}
    </div>
  );
}

function Pill({ children, warning = false }) {
  return <span className={`dash-pill ${warning ? "warning" : ""}`}><i />{children}</span>;
}

function Metric({ label, value, note, icon: Icon, index }) {
  return (
    <Reveal delay={index * 0.08}>
      <motion.article className="dash-metric" whileHover={{ y: -5 }} transition={{ duration: 0.22 }}>
        <div className="dash-metric-top"><span>{label}</span><Icon size={19} strokeWidth={1.6} /></div>
        <div className="dash-metric-value">{value}</div>
        <div className="dash-metric-note"><span>↗</span> {note}</div>
      </motion.article>
    </Reveal>
  );
}

export default function Dashboard() {
  const [period, setPeriod] = useState("Last 24 hours");
  const [filter, setFilter] = useState("All activity");
  const [refreshing, setRefreshing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.24], [1, 0.3]);

  const filtered = activities.filter(item =>
    filter === "All activity" ||
    (filter === "Alerts" && item.type === "warning") ||
    (filter === "Deployments" && item.type === "success")
  );

  const refresh = () => {
    setRefreshing(true);
    window.setTimeout(() => setRefreshing(false), 700);
  };

  return (
    <main className="apple-dash">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .apple-dash{--ink:#1d1d1f;--muted:#6e6e73;--line:#e8e8ed;--blue:#0071e3;background:#fff;color:var(--ink);font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;min-height:100vh;overflow:hidden}
        .apple-dash *{box-sizing:border-box}
        .apple-dash a{color:inherit;text-decoration:none}
        .dash-nav{height:54px;display:flex;align-items:center;justify-content:space-between;max-width:1240px;padding:0 28px;margin:auto}
        .dash-brand{font-size:17px;font-weight:700;letter-spacing:-.7px}
        .dash-navlinks{display:flex;align-items:center;gap:30px;font-size:12px;color:#424245}
        .dash-navlinks a:hover,.dash-footer a:hover{color:var(--blue)}
        .dash-navright{display:flex;gap:12px;align-items:center}
        .dash-iconbtn{display:none;border:0;background:none;padding:8px}
        .dash-navline{border-bottom:1px solid #f0f0f2}
        .dash-hero{position:relative;min-height:600px;display:flex;align-items:center;justify-content:center;text-align:center;padding:74px 24px 80px;background:linear-gradient(180deg,#fff 0%,#f5f8fc 100%)}
        .dash-hero-inner{max-width:940px;position:relative;z-index:2}
        .dash-kicker{display:inline-flex;align-items:center;gap:8px;border:1px solid #d9e7f8;border-radius:99px;padding:8px 13px;color:#245a91;font-size:11px;font-weight:600;background:#fff}
        .dash-kicker span{width:7px;height:7px;background:#30b566;border-radius:50%;box-shadow:0 0 0 4px #30b56618}
        .dash-hero h1{font-size:clamp(44px,7vw,82px);line-height:1.03;letter-spacing:-.075em;font-weight:700;margin:25px 0 18px}
        .dash-hero h1 em{font-style:normal;color:#777d87}
        .dash-hero-copy{max-width:620px;margin:0 auto;color:var(--muted);font-size:17px;line-height:1.75}
        .dash-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:28px}
        .dash-button{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:99px;padding:13px 21px;font-size:13px;font-weight:600;transition:transform .25s,box-shadow .25s}
        .dash-button:hover{transform:translateY(-2px)}
        .dash-button.primary{background:var(--blue);color:white;box-shadow:0 6px 18px #0071e326}
        .dash-button.primary:hover{box-shadow:0 9px 25px #0071e344}
        .dash-button.secondary{color:var(--blue);background:#fff;border:1px solid #d9d9df}
        .dash-hero-visual{position:relative;margin:54px auto 0;max-width:920px;border-radius:25px;overflow:hidden;box-shadow:0 30px 90px #22395720;border:1px solid #ffffff}
        .dash-hero-visual img{display:block;width:100%;height:clamp(190px,33vw,370px);object-fit:cover;object-position:center 48%}
        .dash-hero-visual:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#091d3555,transparent 65%),linear-gradient(0deg,#091d3544,transparent 50%);pointer-events:none}
        .dash-image-caption{position:absolute;z-index:1;left:24px;bottom:22px;color:white;text-align:left}
        .dash-image-caption strong{display:block;font-size:17px;letter-spacing:-.4px}
        .dash-image-caption span{font-size:11px;color:#ffffffc4;margin-top:5px;display:block}
        .dash-scrollhint{margin-top:28px;color:#929298;font-size:10px;letter-spacing:.14em;text-transform:uppercase}
        .dash-section{max-width:1180px;margin:0 auto;padding:100px 28px}
        .dash-eyebrow{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--blue);font-weight:700;margin:0 0 13px}
        .dash-heading{margin-bottom:35px}
        .dash-heading h2{font-size:clamp(30px,4vw,48px);line-height:1.12;letter-spacing:-.06em;font-weight:650;margin:0}
        .dash-description{color:var(--muted);font-size:14px;line-height:1.7;margin:12px 0 0;max-width:580px}
        .dash-metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
        .dash-metric{height:100%;min-height:170px;padding:23px;border:1px solid var(--line);border-radius:20px;background:linear-gradient(145deg,#fff,#fafbfe);box-shadow:0 4px 15px #10182804;transition:border-color .25s,box-shadow .25s}
        .dash-metric:hover{border-color:#cbdcf3;box-shadow:0 15px 35px #203e600d}
        .dash-metric-top{display:flex;align-items:center;justify-content:space-between;color:var(--muted);font-size:12px;gap:8px}
        .dash-metric-top svg{color:#64748b}
        .dash-metric-value{font-size:clamp(27px,3vw,36px);font-weight:650;letter-spacing:-.06em;margin:22px 0 9px}
        .dash-metric-note{font-size:11px;color:var(--muted)}.dash-metric-note span{color:#159957;font-weight:700}
        .dash-note{font-size:10px;color:#929298;margin-top:14px}
        .dash-band{background:#f5f5f7;border-top:1px solid #ededf0;border-bottom:1px solid #ededf0}
        .dash-band .dash-section{padding-top:90px;padding-bottom:90px}
        .dash-two-col{display:grid;grid-template-columns:1.15fr .85fr;gap:50px;align-items:start}
        .dash-service-list,.dash-activity-list,.dash-deployments{border:1px solid var(--line);border-radius:20px;background:#fff;overflow:hidden}
        .dash-service{display:flex;align-items:center;gap:13px;padding:19px 20px;border-bottom:1px solid #f0f0f2;transition:background .2s}
        .dash-service:last-child{border-bottom:0}.dash-service:hover{background:#fafcff}
        .dash-service-icon{width:42px;height:42px;display:grid;place-items:center;border-radius:13px;background:#f2f6fc;color:#376da8;flex-shrink:0}
        .dash-service-info{min-width:0;flex:1}.dash-service-info strong{display:block;font-size:13px;font-weight:600}.dash-service-info small{display:block;margin-top:5px;color:var(--muted);font-size:11px}
        .dash-uptime{text-align:right;margin-right:8px}.dash-uptime strong{font-size:12px;display:block}.dash-uptime small{font-size:10px;color:var(--muted)}
        .dash-pill{display:inline-flex;align-items:center;gap:6px;border-radius:99px;padding:7px 9px;font-size:10px;white-space:nowrap;background:#eaf8f0;color:#177245}
        .dash-pill i{height:6px;width:6px;background:#27a865;border-radius:50%}.dash-pill.warning{background:#fff4e5;color:#985c00}.dash-pill.warning i{background:#e9a23b}
        .dash-panel{border:1px solid var(--line);border-radius:20px;padding:22px;background:#fff}
        .dash-panel-title{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:19px}.dash-panel-title h3{font-size:15px;letter-spacing:-.4px;margin:0}.dash-panel-title span{font-size:11px;color:var(--muted)}
        .dash-filter{font:inherit;font-size:11px;border:1px solid var(--line);border-radius:9px;padding:9px 11px;background:white;color:var(--ink);outline:none}
        .dash-activity{display:flex;gap:12px;padding:14px 0;border-bottom:1px solid #f0f0f2}.dash-activity:last-child{border-bottom:0}
        .dash-activity-icon{width:32px;height:32px;display:grid;place-items:center;border-radius:10px;background:#eef8f1;color:#198754;flex-shrink:0}.dash-activity-icon.warning{background:#fff4e5;color:#a36500}.dash-activity-icon.info{background:#eef5ff;color:#2468b4}
        .dash-activity strong{display:block;font-size:12px;font-weight:600}.dash-activity p{font-size:11px;color:var(--muted);margin:5px 0}.dash-activity small{font-size:10px;color:#929298}
        .dash-deploy-head,.dash-deploy-row{display:grid;grid-template-columns:1fr .8fr .8fr 1fr;gap:12px;align-items:center;padding:16px 20px;font-size:11px}
        .dash-deploy-head{background:#fafafa;color:var(--muted);font-size:9px;text-transform:uppercase;letter-spacing:.08em}
        .dash-deploy-row{border-top:1px solid #f0f0f2}.dash-deploy-row strong{font-size:12px}.dash-deploy-row small{display:block;color:var(--muted);margin-top:4px}
        .dash-status-band{background:#101b2b;color:#fff;position:relative;overflow:hidden}
        .dash-status-band .dash-section{padding-top:88px;padding-bottom:88px}
        .dash-status-band .dash-eyebrow{color:#9dc5ff}.dash-status-band .dash-heading h2{color:#fff}.dash-status-band .dash-description{color:#a9b6c8}
        .dash-health-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        .dash-health-card{border:1px solid #ffffff20;border-radius:18px;background:#ffffff08;padding:23px;backdrop-filter:blur(12px)}
        .dash-health-card svg{color:#b3d2ff}.dash-health-card strong{display:block;font-size:24px;letter-spacing:-.04em;margin:22px 0 7px}.dash-health-card span{font-size:11px;color:#a9b6c8}
        .dash-health-line{height:3px;background:#ffffff18;border-radius:10px;margin-top:20px;overflow:hidden}.dash-health-line span{display:block;height:100%;background:#9dc5ff;border-radius:10px}
        .dash-footer{max-width:1180px;margin:auto;padding:26px 28px;display:flex;align-items:center;justify-content:space-between;gap:15px;color:var(--muted);font-size:10px}
        .dash-footer-links{display:flex;gap:20px}
        @media(max-width:850px){.dash-nav{padding:0 20px}.dash-navlinks{display:none;position:absolute;z-index:10;top:54px;left:0;right:0;background:#fff;padding:20px 25px;border-bottom:1px solid var(--line);flex-direction:column;align-items:flex-start;gap:20px}.dash-navlinks.open{display:flex}.dash-iconbtn{display:block}.dash-hero{min-height:auto;padding:65px 20px}.dash-hero-visual{margin-top:38px}.dash-section{padding:72px 20px}.dash-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.dash-two-col{grid-template-columns:1fr;gap:35px}.dash-health-grid{grid-template-columns:1fr}.dash-status-band .dash-section{padding:70px 20px}}
        @media(max-width:520px){.dash-hero h1{font-size:46px}.dash-hero-copy{font-size:14px}.dash-metrics{gap:9px}.dash-metric{padding:16px;min-height:150px}.dash-metric-value{font-size:27px}.dash-service{padding:15px 12px;gap:9px}.dash-service-icon{width:36px;height:36px}.dash-uptime{display:none}.dash-deploy-head,.dash-deploy-row{grid-template-columns:1fr .8fr .8fr;gap:8px;padding:13px 11px}.dash-deploy-head span:last-child,.dash-deploy-row>span:last-child{display:none}.dash-footer{align-items:flex-start;flex-direction:column}.dash-footer-links{flex-wrap:wrap}}
        @media(prefers-reduced-motion:reduce){.apple-dash *{scroll-behavior:auto!important;transition:none!important}}
      `}</style>

      <section className="dash-hero" id="home" ref={heroRef}>
        <motion.div className="dash-hero-inner" style={{ y: heroY, opacity: heroOpacity }}>
          <span className="dash-kicker"><span /> YOUR INFRASTRUCTURE, IN FOCUS</span>
          <h1>Everything running.<br/><em>One clear view.</em></h1>
          <p className="dash-hero-copy">Understand your systems at a glance. Track service health, follow deployments, and spot issues before they become problems.</p>
          <div className="dash-actions">
            <a className="dash-button primary" href="#overview">Explore dashboard <ArrowRight size={15}/></a>
            <a className="dash-button secondary" href="#services">View infrastructure <ChevronRight size={15}/></a>
          </div>
          <div className="dash-hero-visual">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=85" alt="Earth horizon and connected global infrastructure" />
            <div className="dash-image-caption"><strong>One connected platform.</strong><span>Clarity across your entire infrastructure.</span></div>
          </div>
          <p className="dash-scrollhint"><ArrowDown size={12} style={{display:"inline",verticalAlign:"middle",marginRight:7}}/> Scroll to explore</p>
        </motion.div>
      </section>

      <section className="dash-section" id="overview">
        <Reveal><Heading eyebrow="At a glance" title="The big picture, made simple." description="A focused view of the signals that matter most to your team."/></Reveal>
        <div className="dash-metrics">
          <Metric label="Service availability" value="99.98%" note="0.04% vs previous period" icon={Activity} index={0}/>
          <Metric label="Successful deployments" value="128" note="12.6% vs previous period" icon={GitBranch} index={1}/>
          <Metric label="Active services" value="12 / 13" note="1 needs attention" icon={Layers3} index={2}/>
          <Metric label="Average response" value="142 ms" note="8.2% faster than before" icon={Zap} index={3}/>
        </div>
        <p className="dash-note">Illustrative dashboard values. Connect live telemetry to display measured results.</p>
      </section>

      <section className="dash-band" id="services">
        <div className="dash-section">
          <Reveal><Heading eyebrow="Infrastructure" title="Built to keep things moving." description="See the state of core services without digging through logs and multiple tools."/></Reveal>
          <div className="dash-two-col">
            <Reveal>
              <div className="dash-panel-title"><h3>Service health</h3><span>Current overview</span></div>
              <div className="dash-service-list">
                {services.map((service, i) => {
                  const Icon = service.icon;
                  return <motion.div className="dash-service" key={service.name} initial={{opacity:0,x:-12}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.2}} transition={{delay:i*.07}}>
                    <div className="dash-service-icon"><Icon size={19}/></div>
                    <div className="dash-service-info"><strong>{service.name}</strong><small>{service.detail}</small></div>
                    <div className="dash-uptime"><strong>{service.uptime}</strong><small>Availability</small></div>
                    <Pill warning={service.status !== "Operational"}>{service.status}</Pill>
                  </motion.div>;
                })}
              </div>
            </Reveal>
            <Reveal delay={.12}>
              <div className="dash-panel" id="activity">
                <div className="dash-panel-title"><h3>Recent activity</h3>
                  <select className="dash-filter" value={filter} onChange={e=>setFilter(e.target.value)} aria-label="Filter activity">
                    <option>All activity</option><option>Deployments</option><option>Alerts</option>
                  </select>
                </div>
                {filtered.map(item=><div className="dash-activity" key={item.title}>
                  <div className={`dash-activity-icon ${item.type}`}><Activity size={15}/></div>
                  <div><strong>{item.title}</strong><p>{item.detail}</p><small>{item.time}</small></div>
                </div>)}
                {!filtered.length && <p style={{fontSize:12,color:"#6e6e73"}}>No matching activity.</p>}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="dash-section" id="deployments">
        <Reveal><Heading eyebrow="Delivery" title="Every release, accounted for." description="A clean history of recent changes across production and staging."/></Reveal>
        <Reveal delay={.1}>
          <div className="dash-deployments">
            <div className="dash-deploy-head"><span>Release</span><span>Environment</span><span>Status</span><span>Updated</span></div>
            {deployments.map(item=><div className="dash-deploy-row" key={item.version}>
              <span><strong>{item.version}</strong><small>{item.branch}</small></span>
              <span>{item.environment}</span>
              <span><Pill><CheckCircle2 size={11}/> {item.status}</Pill></span>
              <span style={{color:"#6e6e73"}}>{item.time}</span>
            </div>)}
          </div>
        </Reveal>
      </section>

      <section className="dash-status-band">
        <div className="dash-section">
          <Reveal><Heading eyebrow="System confidence" title="Know where you stand." description="A quick, readable snapshot of the indicators teams use to assess system readiness."/></Reveal>
          <div className="dash-health-grid">
            {[{name:"API availability",value:"99%",width:"99%"},{name:"Build success rate",value:"96%",width:"96%"},{name:"Resource capacity",value:"72%",width:"72%"}].map((item,i)=><Reveal key={item.name} delay={i*.1}>
              <motion.div className="dash-health-card" whileHover={{y:-4}}>
                <ShieldCheck size={20}/><strong>{item.value}</strong><span>{item.name}</span>
                <div className="dash-health-line"><motion.span initial={{width:0}} whileInView={{width:item.width}} viewport={{once:true}} transition={{duration:1,delay:.2}}/></div>
              </motion.div>
            </Reveal>)}
          </div>
          <p style={{fontSize:10,color:"#91a0b5",marginTop:18}}>Example monitoring values. Live system measurements are not connected to these cards yet.</p>
        </div>
      </section>

      <footer className="dash-footer">
        <span>© {new Date().getFullYear()} AIOps · Infrastructure overview</span>
        <div className="dash-footer-links"><a href="#home">Back to top ↑</a><a href="#services">Service health</a><a href="#deployments">Deployments</a></div>
      </footer>

      <div style={{position:"fixed",bottom:20,right:20,zIndex:20}}>
        <motion.button whileHover={{scale:1.06}} whileTap={{scale:.95}} onClick={refresh} aria-label="Refresh dashboard" style={{border:"1px solid #dedee5",background:"#fff",boxShadow:"0 6px 25px #11111114",borderRadius:99,width:45,height:45,display:"grid",placeItems:"center",cursor:"pointer",color:"#1d1d1f"}}>
          <RefreshCw size={17} style={{animation:refreshing?"dash-spin .7s linear infinite":"none"}}/>
        </motion.button>
      </div>
      <style>{`@keyframes dash-spin{to{transform:rotate(360deg)}}html{scroll-behavior:smooth;scroll-padding-top:20px}`}</style>
    </main>
  );
}
