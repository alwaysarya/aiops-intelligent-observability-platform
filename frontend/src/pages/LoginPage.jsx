import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, ArrowRight, Lock, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/auth'

function LoginPage() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    
    const result = await authService.login(username, password)
    
    if (result.success) {
      window.dispatchEvent(new Event('login-success'))
      navigate('/')
      window.location.reload()
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side Branding */}
      <div className="hidden lg:flex w-1/2 bg-black relative overflow-hidden flex-col justify-between p-12">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 12, repeat: Infinity }} className="absolute top-1/3 left-1/4 w-[800px] h-[800px] rounded-full blur-[200px]" style={{ background: 'radial-gradient(circle, #0071E3, transparent 60%)' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '60px 60px', maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)' }} />
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-apple-blue flex items-center justify-center shadow-lg shadow-blue-500/30"><Shield size={20} className="text-white" /></div>
          <span className="text-white font-semibold text-lg tracking-tight">AIOps Observability</span>
        </div>
        
        <div className="relative z-10 max-w-md">
          <h1 className="text-[56px] font-semibold leading-[1.05] tracking-[-0.04em] text-white mb-6">Vision integrity, <br /><span className="bg-gradient-to-r from-[#5AC8FA] via-[#0071E3] to-[#AF52DE] bg-clip-text text-transparent">assured.</span></h1>
          <p className="text-[17px] text-white/50 leading-relaxed">An offline assurance layer for AIOps. Verify contributors, data, models, and inference — before deployment.</p>
        </div>
        
        <div className="relative z-10 text-[12px] text-white/30">© {new Date().getFullYear()} AIOps Observability Platform</div>
      </div>

      {/* Right Side Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-[380px]">
          <div className="mb-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-6"><Lock size={16} className="text-text-tertiary" /><span className="text-[11px] font-bold tracking-[0.16em] uppercase text-text-tertiary">Secure Access</span></div>
            <h2 className="text-[32px] font-semibold text-text-primary mb-2">Welcome back</h2>
            <p className="text-[14px] text-text-secondary">Sign in to access your observability dashboard.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <div className="p-3 bg-red-50 text-apple-red text-[13px] font-medium rounded-lg border border-red-100">{error}</div>}
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-ink-grey border border-transparent focus:bg-white focus:border-apple-blue/40 outline-none transition-all text-[15px]" />
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-ink-grey border border-transparent focus:bg-white focus:border-apple-blue/40 outline-none transition-all text-[15px]" />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-xl bg-apple-blue text-white px-6 py-3.5 text-[15px] font-semibold hover:bg-apple-blueHover transition-all shadow-lg shadow-blue-500/30">Sign in <ArrowRight size={16} /></button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage
