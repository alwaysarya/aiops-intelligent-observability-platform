import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'

// Data for Area Chart
const areaData = [
  { name: '00:00', logs: 4000, anomalies: 240 },
  { name: '04:00', logs: 3000, anomalies: 139 },
  { name: '08:00', logs: 2000, anomalies: 980 },
  { name: '12:00', logs: 2780, anomalies: 390 },
  { name: '16:00', logs: 1890, anomalies: 480 },
  { name: '20:00', logs: 2390, anomalies: 380 },
  { name: '24:00', logs: 3490, anomalies: 430 },
]

// Data for Bar Chart
const barData = [
  { name: 'Payment', value: 400, color: '#0071E3' },
  { name: 'Auth', value: 300, color: '#30D158' },
  { name: 'Catalog', value: 200, color: '#AF52DE' },
  { name: 'Search', value: 278, color: '#FF9F0A' },
  { name: 'User', value: 189, color: '#FF453A' },
]

export function LogTrafficChart({ timeRange = "24h" }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="bg-white rounded-2xl border border-black/[0.04] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] w-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[18px] font-semibold text-text-primary">Log Traffic</h3>
          <p className="text-[13px] text-text-tertiary">Total logs vs anomalies (Last 24h)</p>
        </div>
        <div className="flex items-center gap-4 text-[12px] font-medium text-text-secondary">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-apple-blue" /> Logs</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-apple-orange" /> Anomalies</span>
        </div>
      </div>
      
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLogs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0071E3" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0071E3" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAnomalies" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF9F0A" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#FF9F0A" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#86868B' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#86868B' }} />
            <CartesianGrid vertical={false} stroke="#F0F0F2" />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontSize: '12px' }} 
              itemStyle={{ fontWeight: 600 }}
            />
            <Area type="monotone" dataKey="logs" stroke="#0071E3" strokeWidth={2.5} fillOpacity={1} fill="url(#colorLogs)" />
            <Area type="monotone" dataKey="anomalies" stroke="#FF9F0A" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAnomalies)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export function ServiceTrafficChart({ timeRange = "24h" }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl border border-black/[0.04] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] w-full"
    >
      <div className="mb-6">
        <h3 className="text-[18px] font-semibold text-text-primary">Service Traffic</h3>
        <p className="text-[13px] text-text-tertiary">Requests per service (Top 5)</p>
      </div>
      
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#F0F0F2" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#86868B' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#86868B' }} />
            <Tooltip cursor={{ fill: '#F5F5F7' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
