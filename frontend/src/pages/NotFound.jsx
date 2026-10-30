import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Ghost } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5E6AD2]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative z-10 text-center flex flex-col items-center">
        
        <div className="w-24 h-24 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-8 shadow-2xl">
          <Ghost size={48} className="text-[#8A8F98]" />
        </div>

        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 tracking-tighter mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-white mb-4">Page not found</h2>
        <p className="text-[15px] text-[#8A8F98] max-w-md mx-auto mb-10 font-medium">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex items-center gap-4">
          <Link to="/" className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white text-black text-[14px] font-bold hover:bg-gray-200 transition-all hover:scale-105 shadow-lg">
            <Home size={16} /> Go Home
          </Link>
          <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white/[0.05] text-white text-[14px] font-bold border border-white/[0.1] hover:bg-white/[0.1] transition-all hover:scale-105">
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
