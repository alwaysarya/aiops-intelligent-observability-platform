import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, LayoutDashboard, FileText, Bell, GitBranch, Settings, Network, Database, Box, BarChart3, X, ArrowRight, Server, Activity, AlertOctagon, Zap, FileCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const pages = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/', category: 'Pages', keywords: 'home overview' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics', category: 'Pages', keywords: 'charts trends' },
  { icon: FileText, label: 'Logs', path: '/logs', category: 'Pages', keywords: 'errors events' },
  { icon: Bell, label: 'Alerts', path: '/alerts', category: 'Pages', keywords: 'notifications routing' },
  { icon: Database, label: 'Datasets', path: '/datasets', category: 'Platform', keywords: 'data catalog' },
  { icon: Box, label: 'Models', path: '/models', category: 'Platform', keywords: 'ai registry ml' },
  { icon: FileCheck, label: 'Reports', path: '/reports', category: 'Platform', keywords: 'audit compliance' },
  { icon: GitBranch, label: 'Root Cause', path: '/root-cause', category: 'Platform', keywords: 'analysis ai' },
  { icon: Network, label: 'Service Map', path: '/service-map', category: 'Platform', keywords: 'topology graph' },
  { icon: Server, label: 'Kubernetes', path: '/kubernetes', category: 'Ops', keywords: 'pods cluster' },
  { icon: AlertOctagon, label: 'Incidents', path: '/incidents', category: 'Ops', keywords: 'issues incidents' },
  { icon: Activity, label: 'Distributed Traces', path: '/traces', category: 'Ops', keywords: 'waterfall jaeger' },
  { icon: Settings, label: 'Settings', path: '/settings', category: 'System', keywords: 'config api keys' },
]

const actions = [
  { icon: Activity, label: 'Check System Health', category: 'Actions', keywords: 'status health' },
  { icon: Zap, label: 'Trigger Test Alert', category: 'Actions', keywords: 'test alert send' },
]

function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const allItems = [...pages, ...actions]
  
  const filteredItems = query === '' ? allItems : allItems.filter(item => {
    const searchStr = query.toLowerCase()
    return item.label.toLowerCase().includes(searchStr) || 
           (item.keywords && item.keywords.includes(searchStr)) ||
           item.category.toLowerCase().includes(searchStr)
  })

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setIsOpen(prev => !prev) }
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen) { setTimeout(() => inputRef.current?.focus(), 100); setQuery(''); setSelectedIndex(0) }
  }, [isOpen])

  const handleSelect = (item) => {
    if (item.path) navigate(item.path)
    else if (item.category === 'Actions') {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: `Executing: ${item.label}`, type: 'success' } }))
    }
    setIsOpen(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(prev => (prev + 1) % filteredItems.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length) }
    else if (e.key === 'Enter' && filteredItems[selectedIndex]) handleSelect(filteredItems[selectedIndex])
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <motion.div initial={{ scale: 0.95, y: -20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: -20 }} transition={{ duration: 0.2 }} className="w-full max-w-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-black/[0.08]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 px-4 py-4 border-b border-black/[0.06]">
              <Search size={20} className="text-text-tertiary" />
              <input ref={inputRef} type="text" value={query} onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0) }} onKeyDown={handleKeyDown} placeholder="Search pages, actions, or commands..." className="flex-1 text-[16px] text-text-primary outline-none placeholder:text-text-tertiary bg-transparent" />
              <button onClick={() => setIsOpen(false)} className="p-1 rounded hover:bg-ink-grey"><X size={18} className="text-text-tertiary" /></button>
            </div>
            <div className="max-h-[400px] overflow-y-auto py-2">
              {filteredItems.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-text-tertiary">No results found for "{query}"</div>
              ) : (
                ['Pages', 'Platform', 'Ops', 'System', 'Actions'].map(category => {
                  const categoryItems = filteredItems.filter(i => i.category === category)
                  if (categoryItems.length === 0) return null
                  return (
                    <div key={category} className="mb-2">
                      <p className="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-text-tertiary">{category}</p>
                      {categoryItems.map((item, idx) => {
                        const globalIdx = filteredItems.indexOf(item)
                        const Icon = item.icon
                        return (
                          <button key={item.label} onClick={() => handleSelect(item)} onMouseEnter={() => setSelectedIndex(globalIdx)} className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${globalIdx === selectedIndex ? 'bg-blue-50' : ''}`}>
                            <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${globalIdx === selectedIndex ? 'bg-apple-blue text-white' : 'bg-ink-grey text-text-secondary'}`}><Icon size={16} /></div>
                            <span className={`flex-1 text-[14px] font-medium ${globalIdx === selectedIndex ? 'text-apple-blue' : 'text-text-primary'}`}>{item.label}</span>
                            {globalIdx === selectedIndex && <ArrowRight size={14} className="text-apple-blue" />}
                          </button>
                        )
                      })}
                    </div>
                  )
                })
              )}
            </div>
            <div className="px-4 py-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-text-tertiary bg-ink-grey/50">
              <div className="flex gap-3"><span><kbd className="px-1.5 py-0.5 bg-white border border-black/[0.08] rounded font-mono">↑↓</kbd> Navigate</span><span><kbd className="px-1.5 py-0.5 bg-white border border-black/[0.08] rounded font-mono">↵</kbd> Select</span></div>
              <span><kbd className="px-1.5 py-0.5 bg-white border border-black/[0.08] rounded font-mono">Esc</kbd> Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette
