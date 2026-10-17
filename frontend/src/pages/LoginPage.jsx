import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, ArrowRight, Lock, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('password')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    if (e) e.preventDefault()
    
    // Save auth state
    localStorage.setItem('aiops_auth', 'true')
    
    // Dispatch event to notify App.jsx
    window.dispatchEvent(new Event('login-success'))
    
    // Navigate to dashboard
    navigate('/')
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Branding (Dark) */}
      <div className="hidden lg:flex w-1/2 bg-black relative overflow-hidden flex-col justify-between p-12">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 12, repeat: Infinity }} className="absolute top-1/3 left-1/4 w-[800px] h-[800px] rounded-full blur-[200px]" style={{ background: 'radial-gradient(circle, #0071E3, transparent 60%)' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)' }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-apple-blue flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Shield size={20} className="text-white" />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">AIOps Observability</span>
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-apple-green" style={{ boxShadow: '0 0 10px #30D158' }} />
            <span className="text-white/80 text-[11px] font-semibold tracking-[0.16em] uppercase">Trustworthy AI for Ops</span>
          </div>
          <h1 className="text-[56px] font-semibold leading-[1.05] tracking-[-0.04em] text-white mb-6">
            Vision integrity, <br />
            <span className="bg-gradient-to-r from-[#5AC8FA] via-[#0071E3] to-[#AF52DE] bg-clip-text text-transparent">assured.</span>
          </h1>
          <p className="text-[17px] text-white/50 leading-relaxed">
            An offline assurance layer for AIOps. Verify contributors, data, models, and inference — before deployment.
          </p>
          
          <div className="mt-10 flex items-center gap-4">
            {['Data', 'Model', 'Inference', 'Verified'].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className={`text-[12px] font-medium ${i === 3 ? 'text-apple-green' : 'text-white/40'}`}>{step}</span>
                {i < 3 && <ArrowRight size={12} className="text-white/20" />}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-[12px] text-white/30">
          © 2026 AIOps Observability Platform • Air-gapped
        </div>
      </div>

      {/* Right Side - Login Form (Light) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-[380px]">
          <div className="mb-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-6">
              <Lock size={16} className="text-text-tertiary" />
              <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-text-tertiary">Secure Access</span>
            </div>
            <h2 className="text-[32px] font-semibold text-text-primary mb-2">Welcome back</h2>
            <p className="text-[14px] text-text-secondary">Sign in to access your observability dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username" 
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-ink-grey border border-transparent focus:bg-white focus:border-apple-blue/40 focus:ring-4 focus:ring-apple-blue/10 outline-none transition-all text-[15px] text-text-primary" 
                />
              </div>
            </div>
            
            <div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" 
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-ink-grey border border-transparent focus:bg-white focus:border-apple-blue/40 focus:ring-4 focus:ring-apple-blue/10 outline-none transition-all text-[15px] text-text-primary" 
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 text-[13px] text-text-secondary cursor-pointer">
                <input type="checkbox" className="rounded text-apple-blue focus:ring-apple-blue" defaultChecked /> Remember me
              </label>
              <a href="#" className="text-[13px] text-apple-blue font-medium hover:underline">Forgot?</a>
            </div>

            <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-xl bg-apple-blue text-white px-6 py-3.5 text-[15px] font-semibold hover:bg-apple-blueHover transition-all shadow-lg shadow-blue-500/30">
              Sign in <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-black/[0.06] text-center">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-text-tertiary mb-4">Demo Access</p>
            <div className="flex gap-2">
              {['Analyst', 'Auditor', 'Admin'].map(role => (
                <button key={role} onClick={() => handleLogin()} className="flex-1 py-2 rounded-lg border border-black/[0.08] text-[12px] font-medium text-text-secondary hover:bg-ink-grey transition-colors">
                  {role}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage
