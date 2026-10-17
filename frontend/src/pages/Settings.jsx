import { motion } from 'framer-motion'
import { Settings as SettingsIcon, Server, ExternalLink, Shield, Key, Users, Bell, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import DarkFooter from '../components/Premium/DarkFooter'
import { showToast } from '../components/Premium/Toast'

function Settings() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('endpoints')

  const services = [
    { name: 'Log Ingestion Service', url: 'http://localhost:8000', docs: 'http://localhost:8000/docs', color: '#0071E3' },
    { name: 'AI Anomaly Detector', url: 'http://localhost:8001', docs: 'http://localhost:8001/docs', color: '#FF9F0A' },
    { name: 'Alert Service', url: 'http://localhost:8002', docs: 'http://localhost:8002/docs', color: '#FF453A' },
    { name: 'Root Cause Analyzer', url: 'http://localhost:8003', docs: 'http://localhost:8003/docs', color: '#30D158' },
  ]

  const copyApiKey = () => {
    navigator.clipboard.writeText('sk-aiops-84f9a2b3c4d5e6f7')
    setCopied(true)
    showToast('API Key copied to clipboard!', 'success')
    setTimeout(() => setCopied(false), 2000)
  }

  const tabs = [
    { id: 'endpoints', label: 'Service Endpoints', icon: Server },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'team', label: 'Team Access', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ]

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-[52px] md:text-[72px] font-semibold tracking-[-0.04em] leading-[1.02] text-text-primary mb-4">
            Platform <span className="bg-gradient-to-r from-[#0071E3] to-[#5E5CE6] bg-clip-text text-transparent">Settings.</span>
          </h1>
          <p className="text-[18px] text-text-secondary">Manage API keys, service URLs, and team access.</p>
        </motion.div>
      </div>

      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Settings Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-black/[0.06] p-2 shadow-sm space-y-1">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-all ${activeTab === tab.id ? 'bg-blue-50 text-apple-blue' : 'text-text-secondary hover:bg-ink-grey'}`}>
                  <tab.icon size={18} /> {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            {activeTab === 'endpoints' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[24px] border border-black/[0.04] shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6 border-b border-black/[0.04] pb-6">
                  <div className="p-2 rounded-lg bg-indigo-50 text-apple-indigo"><Server size={20} /></div>
                  <div><h2 className="text-[20px] font-semibold text-text-primary">Service Endpoints</h2><p className="text-[13px] text-text-tertiary">Backend API URLs configuration</p></div>
                </div>
                <div className="space-y-4">
                  {services.map(svc => (
                    <div key={svc.name} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-black/[0.04] bg-ink-grey gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ background: svc.color }} />
                        <span className="font-semibold text-text-primary text-[15px]">{svc.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <code className="text-[13px] text-text-secondary bg-white px-3 py-1.5 rounded-lg border border-black/[0.04]">{svc.url}</code>
                        <a href={svc.docs} target="_blank" rel="noreferrer" className="text-[13px] font-semibold text-apple-blue hover:underline flex items-center gap-1">Docs <ExternalLink size={12} /></a>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'api' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[24px] border border-black/[0.04] shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6 border-b border-black/[0.04] pb-6">
                  <div className="p-2 rounded-lg bg-yellow-50 text-apple-orange"><Key size={20} /></div>
                  <div><h2 className="text-[20px] font-semibold text-text-primary">API Keys</h2><p className="text-[13px] text-text-tertiary">Manage programmatic access</p></div>
                </div>
                <div className="space-y-6">
                  <div className="p-5 rounded-2xl border border-black/[0.04] bg-ink-grey">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[14px] font-semibold text-text-primary">Production API Key</span>
                      <span className="px-2 py-0.5 rounded bg-green-100 text-apple-green text-[11px] font-bold uppercase">Active</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <code className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-black/[0.06] text-[14px] font-mono text-text-secondary">sk-aiops-••••••••••••••••</code>
                      <button onClick={copyApiKey} className="px-4 py-2.5 rounded-xl bg-white border border-black/[0.08] hover:bg-gray-50 transition-colors">
                        {copied ? <Check size={18} className="text-apple-green" /> : <Copy size={18} className="text-text-secondary" />}
                      </button>
                    </div>
                  </div>
                  <button className="px-5 py-2.5 rounded-xl bg-apple-blue text-white text-[14px] font-semibold hover:bg-apple-blueHover transition-all">Generate New Key</button>
                </div>
              </motion.div>
            )}

            {activeTab === 'team' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[24px] border border-black/[0.04] shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6 border-b border-black/[0.04] pb-6">
                  <div className="p-2 rounded-lg bg-blue-50 text-apple-blue"><Users size={20} /></div>
                  <div><h2 className="text-[20px] font-semibold text-text-primary">Team Access</h2><p className="text-[13px] text-text-tertiary">Manage users and roles</p></div>
                </div>
                <div className="space-y-3">
                  {['Aryan Thakur', 'Rahul Sharma', 'Priya Mehta'].map((user, i) => (
                    <div key={user} className="flex items-center justify-between p-4 rounded-xl border border-black/[0.04] bg-ink-grey">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-apple-blue to-apple-indigo text-white flex items-center justify-center font-bold text-[14px]">{user.charAt(0)}</div>
                        <div>
                          <p className="text-[15px] font-semibold text-text-primary">{user}</p>
                          <p className="text-[12px] text-text-tertiary">{user.toLowerCase().replace(' ', '.')}@aiops.local</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${i === 0 ? 'bg-purple-100 text-apple-purple' : 'bg-blue-50 text-apple-blue'}`}>{i === 0 ? 'Admin' : 'Viewer'}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-6 px-5 py-2.5 rounded-xl bg-white border border-black/[0.08] text-text-primary text-[14px] font-semibold hover:bg-ink-grey transition-all flex items-center gap-2"><Users size={16} /> Invite Member</button>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[24px] border border-black/[0.04] shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6 border-b border-black/[0.04] pb-6">
                  <div className="p-2 rounded-lg bg-orange-50 text-apple-orange"><Bell size={20} /></div>
                  <div><h2 className="text-[20px] font-semibold text-text-primary">Notifications</h2><p className="text-[13px] text-text-tertiary">Choose how you want to be alerted</p></div>
                </div>
                <div className="space-y-4">
                  {['Critical Anomalies', 'New Incidents', 'Model Drift Warnings', 'Deployment Failures'].map((item, i) => (
                    <div key={item} className="flex items-center justify-between p-4 rounded-xl border border-black/[0.04] bg-ink-grey">
                      <span className="text-[14px] font-semibold text-text-primary">{item}</span>
                      <div className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${i < 3 ? 'bg-apple-green' : 'bg-gray-300'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${i < 3 ? 'translate-x-6' : 'translate-x-0'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <DarkFooter badge="Security" title="Enterprise" highlight="ready." description="AIOps is built for scale, with built-in RBAC, audit logging, and SOC2 compliance readiness." primary="Read Security Docs" secondary="Contact Sales" />
    </div>
  )
}

export default Settings
