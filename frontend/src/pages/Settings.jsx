import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings as SettingsIcon, Server, ExternalLink, Key, Users, Bell, Copy, Check, User, Save } from 'lucide-react'
import DarkFooter from '../components/Premium/DarkFooter'
import { showToast } from '../components/Premium/Toast'

function Settings() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  
  // Profile State
  const [profile, setProfile] = useState({
    name: 'Aryan Thakur',
    email: 'aryan@aiops.local',
    role: 'Administrator',
    org: 'CV-INTEGRITY AI'
  })

  // Team State
  const [team, setTeam] = useState([
    { name: 'Aryan Thakur', email: 'aryan@aiops.local', role: 'Admin' },
    { name: 'Rahul Sharma', email: 'rahul@aiops.local', role: 'Viewer' },
    { name: 'Priya Mehta', email: 'priya@aiops.local', role: 'Viewer' }
  ])

  const services = [
    { name: 'Log Ingestion Service', url: 'http://localhost:8000', docs: 'http://localhost:8000/docs', color: '#0071E3' },
    { name: 'AI Anomaly Detector', url: 'http://localhost:8001', docs: 'http://localhost:8001/docs', color: '#FF9F0A' },
    { name: 'Alert Service', url: 'http://localhost:8002', docs: 'http://localhost:8002/docs', color: '#FF453A' },
    { name: 'Root Cause Analyzer', url: 'http://localhost:8003', docs: 'http://localhost:8003/docs', color: '#30D158' },
  ]

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: User },
    { id: 'endpoints', label: 'Service Endpoints', icon: Server },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'team', label: 'Team Access', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ]

  const copyApiKey = () => {
    navigator.clipboard.writeText('sk-aiops-84f9a2b3c4d5e6f7')
    setCopied(true)
    showToast('API Key copied!', 'success')
    setTimeout(() => setCopied(false), 2000)
  }

  const saveProfile = () => {
    showToast('Profile updated successfully!', 'success')
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-[52px] md:text-[72px] font-semibold tracking-[-0.04em] leading-[1.02] text-text-primary dark:text-white mb-4">
            Platform <span className="bg-gradient-to-r from-[#0071E3] to-[#5E5CE6] bg-clip-text text-transparent">Settings.</span>
          </h1>
          <p className="text-[18px] text-text-secondary dark:text-gray-400">Manage API keys, service URLs, and team access.</p>
        </motion.div>
      </div>

      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Settings Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-black/[0.06] dark:border-gray-700 p-2 shadow-sm space-y-1">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-all ${activeTab === tab.id ? 'bg-blue-50 text-apple-blue dark:bg-gray-700 dark:text-blue-400' : 'text-text-secondary dark:text-gray-400 hover:bg-ink-grey dark:hover:bg-gray-700'}`}>
                  <tab.icon size={18} /> {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white dark:bg-gray-800 rounded-[24px] border border-black/[0.04] dark:border-gray-700 shadow-sm p-8">
                  <div className="flex items-center gap-3 mb-6 border-b border-black/[0.04] dark:border-gray-700 pb-6">
                    <div className="p-2 rounded-lg bg-indigo-50 text-apple-indigo"><User size={20} /></div>
                    <div><h2 className="text-[20px] font-semibold text-text-primary dark:text-white">Profile Information</h2><p className="text-[13px] text-text-tertiary">Your account details</p></div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-apple-blue to-apple-indigo flex items-center justify-center text-white text-[20px] font-bold shadow-lg">AT</div>
                    <div>
                      <h3 className="text-[18px] font-semibold text-text-primary dark:text-white">{profile.name}</h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-apple-purple mt-1">{profile.role}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="text-[12px] font-bold text-text-tertiary uppercase tracking-wider mb-2 block">Full Name</label>
                      <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-ink-grey dark:bg-gray-900 border border-transparent dark:border-gray-700 focus:bg-white dark:focus:bg-gray-900 focus:border-apple-blue/40 outline-none text-[15px] dark:text-white" />
                    </div>
                    <div>
                      <label className="text-[12px] font-bold text-text-tertiary uppercase tracking-wider mb-2 block">Email</label>
                      <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-ink-grey dark:bg-gray-900 border border-transparent dark:border-gray-700 focus:bg-white dark:focus:bg-gray-900 focus:border-apple-blue/40 outline-none text-[15px] dark:text-white" />
                    </div>
                  </div>

                  <button onClick={saveProfile} className="px-6 py-3 rounded-xl bg-apple-blue text-white font-semibold hover:bg-apple-blueHover transition-all flex items-center gap-2">
                    <Save size={18} /> Save Changes
                  </button>
                </motion.div>
              )}

              {activeTab === 'endpoints' && (
                <motion.div key="endpoints" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white dark:bg-gray-800 rounded-[24px] border border-black/[0.04] dark:border-gray-700 shadow-sm p-8">
                  <div className="flex items-center gap-3 mb-6 border-b border-black/[0.04] dark:border-gray-700 pb-6">
                    <div className="p-2 rounded-lg bg-indigo-50 text-apple-indigo"><Server size={20} /></div>
                    <div><h2 className="text-[20px] font-semibold text-text-primary dark:text-white">Service Endpoints</h2><p className="text-[13px] text-text-tertiary">Backend API URLs configuration</p></div>
                  </div>
                  <div className="space-y-4">
                    {services.map(svc => (
                      <div key={svc.name} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-black/[0.04] dark:border-gray-700 bg-ink-grey dark:bg-gray-900 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full" style={{ background: svc.color }} />
                          <span className="font-semibold text-text-primary dark:text-white text-[15px]">{svc.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <code className="text-[13px] text-text-secondary bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-black/[0.04] dark:border-gray-700">{svc.url}</code>
                          <a href={svc.docs} target="_blank" rel="noreferrer" className="text-[13px] font-semibold text-apple-blue hover:underline flex items-center gap-1">Docs <ExternalLink size={12} /></a>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'api' && (
                <motion.div key="api" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white dark:bg-gray-800 rounded-[24px] border border-black/[0.04] dark:border-gray-700 shadow-sm p-8">
                  <div className="flex items-center gap-3 mb-6 border-b border-black/[0.04] dark:border-gray-700 pb-6">
                    <div className="p-2 rounded-lg bg-yellow-50 text-apple-orange"><Key size={20} /></div>
                    <div><h2 className="text-[20px] font-semibold text-text-primary dark:text-white">API Keys</h2><p className="text-[13px] text-text-tertiary">Manage programmatic access</p></div>
                  </div>
                  <div className="space-y-6">
                    <div className="p-5 rounded-2xl border border-black/[0.04] dark:border-gray-700 bg-ink-grey dark:bg-gray-900">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[14px] font-semibold text-text-primary dark:text-white">Production API Key</span>
                        <span className="px-2 py-0.5 rounded bg-green-100 text-apple-green text-[11px] font-bold uppercase">Active</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <code className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-black/[0.06] dark:border-gray-700 text-[14px] font-mono text-text-secondary dark:text-gray-300">sk-aiops-••••••••••••••••</code>
                        <button onClick={copyApiKey} className="px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-black/[0.08] dark:border-gray-700 hover:bg-gray-50 transition-colors">
                          {copied ? <Check size={18} className="text-apple-green" /> : <Copy size={18} className="text-text-secondary" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'team' && (
                <motion.div key="team" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white dark:bg-gray-800 rounded-[24px] border border-black/[0.04] dark:border-gray-700 shadow-sm p-8">
                  <div className="flex items-center gap-3 mb-6 border-b border-black/[0.04] dark:border-gray-700 pb-6">
                    <div className="p-2 rounded-lg bg-blue-50 text-apple-blue"><Users size={20} /></div>
                    <div><h2 className="text-[20px] font-semibold text-text-primary dark:text-white">Team Access</h2><p className="text-[13px] text-text-tertiary">Manage users and roles</p></div>
                  </div>
                  <div className="space-y-3">
                    {team.map((user, i) => (
                      <div key={user.email} className="flex items-center justify-between p-4 rounded-xl border border-black/[0.04] dark:border-gray-700 bg-ink-grey dark:bg-gray-900">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-apple-blue to-apple-indigo text-white flex items-center justify-center font-bold text-[14px]">{user.name.charAt(0)}</div>
                          <div>
                            <p className="text-[15px] font-semibold text-text-primary dark:text-white">{user.name}</p>
                            <p className="text-[12px] text-text-tertiary">{user.email}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${i === 0 ? 'bg-purple-100 text-apple-purple' : 'bg-blue-50 text-apple-blue'}`}>{user.role}</span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-6 px-5 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-black/[0.08] dark:border-gray-700 text-text-primary dark:text-white text-[14px] font-semibold hover:bg-ink-grey transition-all flex items-center gap-2"><Users size={16} /> Invite Member</button>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div key="notifications" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white dark:bg-gray-800 rounded-[24px] border border-black/[0.04] dark:border-gray-700 shadow-sm p-8">
                  <div className="flex items-center gap-3 mb-6 border-b border-black/[0.04] dark:border-gray-700 pb-6">
                    <div className="p-2 rounded-lg bg-orange-50 text-apple-orange"><Bell size={20} /></div>
                    <div><h2 className="text-[20px] font-semibold text-text-primary dark:text-white">Notifications</h2><p className="text-[13px] text-text-tertiary">Choose how you want to be alerted</p></div>
                  </div>
                  <div className="space-y-4">
                    {['Critical Anomalies', 'New Incidents', 'Model Drift Warnings', 'Deployment Failures'].map((item, i) => (
                      <div key={item} className="flex items-center justify-between p-4 rounded-xl border border-black/[0.04] dark:border-gray-700 bg-ink-grey dark:bg-gray-900">
                        <span className="text-[14px] font-semibold text-text-primary dark:text-white">{item}</span>
                        <div className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${i < 3 ? 'bg-apple-green' : 'bg-gray-300'}`}>
                          <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${i < 3 ? 'translate-x-6' : 'translate-x-0'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <DarkFooter badge="Security" title="Enterprise" highlight="ready." description="AIOps is built for scale, with built-in RBAC, audit logging, and SOC2 compliance readiness." primary="Read Security Docs" secondary="Contact Sales" />
    </div>
  )
}

export default Settings
