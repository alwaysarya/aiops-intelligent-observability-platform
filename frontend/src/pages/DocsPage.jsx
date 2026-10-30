import { motion } from 'framer-motion'
import { BookOpen, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function DocsPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] p-12">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-[#6E6E73] hover:text-black font-medium mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#0071E3]/10 flex items-center justify-center">
              <BookOpen className="text-[#0071E3]" />
            </div>
            <h1 className="text-4xl font-black tracking-tight">Documentation</h1>
          </div>
          <p className="text-lg text-[#6E6E73] mb-12">Learn how to integrate and use the AIOps Observability Platform.</p>
          
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-black/[0.06] shadow-sm">
              <h2 className="text-xl font-bold mb-4">1. Quick Start</h2>
              <p className="text-[#6E6E73] leading-relaxed">To get started, install our SDK and initialize the client with your API key. The platform will automatically start ingesting logs and metrics.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-black/[0.06] shadow-sm">
              <h2 className="text-xl font-bold mb-4">2. API Reference</h2>
              <p className="text-[#6E6E73] leading-relaxed">Use our REST API endpoints to query logs, detect anomalies, and trigger alerts programmatically.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
