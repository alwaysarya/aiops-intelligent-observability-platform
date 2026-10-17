import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, BarChart3, Database, Server, Zap } from 'lucide-react'
import SectionHeader from '../components/Premium/SectionHeader'
import { LogTrafficChart, ServiceTrafficChart } from '../components/Premium/Charts'
import DarkFooter from '../components/Premium/DarkFooter'
import { checkAllServices, anomalyApi } from '../services/api'
import { showToast } from '../components/Premium/Toast'

function AnalyticsPage() {
  const [services, setServices] = useState({})
  const [testResult, setTestResult] = useState(null)

  useEffect(() => {
    const load = async () => {
      const res = await checkAllServices()
      setServices(res)
    }
    load()
  }, [])

  const testAnomalyPrediction = async () => {
    try {
      const result = await anomalyApi.predict([[1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0]])
      setTestResult(result)
      showToast('Anomaly prediction successful!', 'success')
    } catch (e) {
      // Fallback if backend is down
      setTestResult({ is_anomaly: false, score: 0.42, severity: 'low', model_scores: { isolation_forest: 0.2, autoencoder: 0.6 } })
      showToast('Using simulated prediction (Backend offline)', 'warning')
    }
  }

  return (
    <div className="w-full bg-white min-h-screen">
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/[0.08] bg-white shadow-sm mb-6">
            <Activity size={14} className="text-apple-blue" />
            <span className="text-text-secondary text-[11px] font-semibold tracking-[0.16em] uppercase">Live Analytics</span>
          </div>
          <h1 className="text-[52px] md:text-[72px] font-semibold leading-[1.02] tracking-[-0.04em] text-text-primary">
            Every metric, <br />
            <span className="bg-gradient-to-r from-[#0071E3] to-[#AF52DE] bg-clip-text text-transparent">visualized.</span>
          </h1>
        </motion.div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <LogTrafficChart />
          <ServiceTrafficChart />
        </div>

        {/* Real API Test Card */}
        <div className="bg-white rounded-[28px] border border-black/[0.04] shadow-sm p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="p-4 rounded-2xl bg-orange-50 text-apple-orange">
              <Zap size={28} />
            </div>
            <div>
              <h3 className="text-[20px] font-semibold text-text-primary">Test Live Anomaly Prediction</h3>
              <p className="text-[14px] text-text-secondary mt-1">Send a request to the AI backend (localhost:8001).</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button onClick={testAnomalyPrediction} className="px-6 py-3 rounded-xl bg-apple-blue text-white font-semibold hover:bg-apple-blueHover transition-all">
              Run Test
            </button>
            {testResult && (
              <div className="text-[12px] font-mono text-text-secondary bg-ink-grey px-3 py-1 rounded-lg">
                Score: {testResult.score.toFixed(2)} | Severity: {testResult.severity}
              </div>
            )}
          </div>
        </div>
      </section>

      <DarkFooter 
        badge="Deep Dive"
        title="Charts that"
        highlight="tell the story."
        description="Dive deeper into your infrastructure metrics and identify trends before they become issues."
        primary="View Full Report"
        secondary="Export Data"
      />
    </div>
  )
}

export default AnalyticsPage
