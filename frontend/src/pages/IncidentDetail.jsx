import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { AlertOctagon, Clock, User, CheckCircle2, MessageSquare, Terminal, Shield, ArrowLeft, Send, Loader2 } from 'lucide-react'
import { showToast } from '../components/Premium/Toast'

function IncidentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('Active')
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [actionLoading, setActionLoading] = useState(null)

  // Dummy Data for Real Look
  const incident = {
    id: id || 'INC-2026-084',
    title: 'Database Connection Timeout',
    service: 'user-service',
    severity: 'Critical',
    startedAt: '10:02:15 AM',
    assignee: 'Aryan T.',
    description: 'Primary database cluster is rejecting connections. Error rate at 45%.',
    timeline: [
      { time: '10:02 AM', title: 'Incident Triggered', desc: 'AI Anomaly Detector flagged a critical latency spike.', icon: AlertOctagon, color: '#FF453A' },
      { time: '10:03 AM', title: 'Alert Sent to PagerDuty', desc: 'On-call engineer Aryan T. was paged.', icon: Send, color: '#FF9F0A' },
      { time: '10:05 AM', title: 'Engineer Acknowledged', desc: 'Investigating connection pool limits and database logs.', icon: User, color: '#0071E3' },
    ]
  }

  const handleAddNote = (e) => {
    e.preventDefault()
    if (!newNote.trim()) return
    setNotes([...notes, { text: newNote, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    setNewNote('')
    showToast('Note added to incident timeline', 'success')
  }

  const handleResolve = () => {
    setStatus('Resolved')
    showToast('Incident marked as resolved!', 'success')
  }

  const executeAction = (actionName) => {
    setActionLoading(actionName)
    setTimeout(() => {
      setActionLoading(null)
      showToast(`${actionName} executed successfully!`, 'success')
      setNotes([...notes, { text: `[Automated] ${actionName} executed`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }])
    }, 2000)
  }

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-8">
        <button onClick={() => navigate('/incidents')} className="flex items-center gap-2 text-[13px] font-semibold text-text-tertiary hover:text-text-primary transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Incidents
        </button>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[13px] font-mono text-text-tertiary">{incident.id}</span>
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${status === 'Resolved' ? 'bg-green-50 text-apple-green border-green-200' : 'bg-red-50 text-apple-red border-red-200'}`}>{status}</span>
            </div>
            <h1 className="text-[32px] md:text-[42px] font-semibold tracking-[-0.03em] text-text-primary">{incident.title}</h1>
          </div>
          {status !== 'Resolved' && (
            <button onClick={handleResolve} className="px-6 py-3 rounded-xl bg-apple-green text-white font-semibold hover:bg-green-600 transition-all shadow-lg shadow-green-500/20 flex items-center gap-2">
              <CheckCircle2 size={18} /> Mark Resolved
            </button>
          )}
        </div>
      </div>

      <section className="max-w-[1200px] mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[28px] border border-black/[0.04] shadow-sm p-8">
            <h2 className="text-[20px] font-semibold text-text-primary mb-6 flex items-center gap-2"><Clock size={20} className="text-apple-blue" /> Incident Timeline</h2>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              {[...incident.timeline, ...notes.map(n => ({ time: n.time, title: 'Note Added', desc: n.text, icon: MessageSquare, color: '#AF52DE' }))].map((item, i) => (
                <div key={i} className="relative flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white border-2 z-10" style={{ borderColor: item.color, color: item.color }}>
                    <item.icon size={16} />
                  </div>
                  <div className="flex-1 bg-ink-grey rounded-2xl p-4 border border-black/[0.04]">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[14px] font-semibold text-text-primary">{item.title}</p>
                      <span className="text-[12px] text-text-tertiary font-medium">{item.time}</span>
                    </div>
                    <p className="text-[13px] text-text-secondary">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[24px] border border-black/[0.04] shadow-sm p-4">
            <form onSubmit={handleAddNote} className="flex gap-3">
              <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Add an investigation note..."
                className="flex-1 px-4 py-3 rounded-xl bg-ink-grey border border-transparent focus:bg-white focus:border-apple-blue/40 outline-none text-[14px] transition-all" />
              <button type="submit" className="px-5 py-3 rounded-xl bg-text-primary text-white font-semibold hover:bg-gray-800 transition-all flex items-center gap-2"><Send size={16} /> Post</button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[28px] border border-black/[0.04] shadow-sm p-6">
            <h3 className="text-[16px] font-semibold text-text-primary mb-4">Incident Details</h3>
            <div className="space-y-4 text-[14px]">
              <div className="flex justify-between border-b border-black/[0.04] pb-3">
                <span className="text-text-secondary">Severity</span>
                <span className="font-bold text-apple-red">{incident.severity}</span>
              </div>
              <div className="flex justify-between border-b border-black/[0.04] pb-3">
                <span className="text-text-secondary">Service</span>
                <span className="font-semibold text-text-primary">{incident.service}</span>
              </div>
              <div className="flex justify-between border-b border-black/[0.04] pb-3">
                <span className="text-text-secondary">Started</span>
                <span className="font-medium text-text-primary">{incident.startedAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Assignee</span>
                <span className="font-semibold text-text-primary">{incident.assignee}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[28px] border border-black/[0.04] shadow-sm p-6">
            <h3 className="text-[16px] font-semibold text-text-primary mb-4 flex items-center gap-2"><Terminal size={16} className="text-apple-purple"/> Automated Runbooks</h3>
            <div className="space-y-2">
              <button 
                onClick={() => executeAction('Restart Pod')} 
                disabled={actionLoading === 'Restart Pod'}
                className="w-full text-left px-4 py-3 rounded-xl border border-black/[0.04] bg-ink-grey hover:bg-white hover:shadow-sm transition-all flex items-center justify-between group disabled:opacity-50"
              >
                <span className="text-[13px] font-semibold text-text-primary">
                  {actionLoading === 'Restart Pod' ? 'Restarting...' : 'Restart Pod'}
                </span>
                {actionLoading === 'Restart Pod' ? <Loader2 size={14} className="animate-spin text-apple-purple" /> : <Shield size={14} className="text-text-tertiary group-hover:text-apple-purple" />}
              </button>
              
              <button 
                onClick={() => executeAction('Rollback Deploy')} 
                disabled={actionLoading === 'Rollback Deploy'}
                className="w-full text-left px-4 py-3 rounded-xl border border-black/[0.04] bg-ink-grey hover:bg-white hover:shadow-sm transition-all flex items-center justify-between group disabled:opacity-50"
              >
                <span className="text-[13px] font-semibold text-text-primary">
                  {actionLoading === 'Rollback Deploy' ? 'Rolling back...' : 'Rollback Deploy'}
                </span>
                {actionLoading === 'Rollback Deploy' ? <Loader2 size={14} className="animate-spin text-apple-purple" /> : <Shield size={14} className="text-text-tertiary group-hover:text-apple-purple" />}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default IncidentDetail
