import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LogOut, Settings, Shield, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('aiops_auth')
    navigate('/login')
    window.location.reload() // Force state reset
  }

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-ink-grey transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-apple-blue to-apple-indigo text-white text-[12px] font-bold flex items-center justify-center shadow-md">
          AT
        </div>
        <ChevronDown size={14} className={`text-text-tertiary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 10, scale: 0.95 }} 
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-[240px] bg-white rounded-2xl border border-black/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden z-50"
          >
            {/* User Info */}
            <div className="p-4 border-b border-black/[0.06] bg-ink-grey/50">
              <p className="text-[14px] font-semibold text-text-primary">Aryan Thakur</p>
              <p className="text-[12px] text-text-tertiary">aryan@aiops.local</p>
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-100 text-apple-blue text-[10px] font-bold uppercase tracking-wider">
                <Shield size={10} /> Admin
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <button onClick={() => { navigate('/settings'); setIsOpen(false) }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-text-secondary hover:bg-ink-grey hover:text-text-primary transition-colors">
                <User size={16} /> Profile Settings
              </button>
              <button onClick={() => { navigate('/settings'); setIsOpen(false) }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-text-secondary hover:bg-ink-grey hover:text-text-primary transition-colors">
                <Settings size={16} /> Platform Config
              </button>
            </div>

            {/* Sign Out */}
            <div className="p-2 border-t border-black/[0.06]">
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold text-apple-red hover:bg-red-50 transition-colors">
                <LogOut size={16} /> Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserMenu
