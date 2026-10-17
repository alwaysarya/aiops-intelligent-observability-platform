import { useCallback, useEffect, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Position,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { motion } from 'framer-motion'
import { rcaApi, checkAllServices } from '../../services/api'

const ServiceNode = ({ data }) => {
  const { label, status, port, icon } = data
  const colors = {
    healthy: { bg: 'rgba(48, 209, 88, 0.15)', border: '#30D158', text: '#4ADE80', glow: 'rgba(48, 209, 88, 0.5)' },
    down: { bg: 'rgba(255, 69, 58, 0.15)', border: '#FF453A', text: '#F87171', glow: 'rgba(255, 69, 58, 0.5)' },
    unknown: { bg: 'rgba(255, 255, 255, 0.04)', border: 'rgba(255, 255, 255, 0.15)', text: 'rgba(255, 255, 255, 0.5)', glow: 'rgba(255, 255, 255, 0.1)' },
  }
  const c = colors[status] || colors.unknown

  return (
    <div className="relative px-5 py-4 rounded-2xl backdrop-blur-xl transition-all cursor-pointer hover:scale-105"
      style={{ background: c.bg, border: `1.5px solid ${c.border}`, boxShadow: `0 0 30px ${c.glow}, 0 8px 32px rgba(0,0,0,0.4)`, minWidth: '180px' }}>
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl text-xl" style={{ background: `${c.border}30`, border: `1px solid ${c.border}50` }}>{icon}</div>
        <div>
          <div className="text-[13px] font-semibold text-white">{label}</div>
          <div className="text-[10px] font-mono" style={{ color: c.text }}>:{port}</div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-3">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.border, boxShadow: `0 0 8px ${c.border}` }} />
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: c.text }}>{status === 'healthy' ? 'Online' : status === 'down' ? 'Down' : 'Unknown'}</span>
      </div>
    </div>
  )
}

const nodeTypes = { service: ServiceNode }

function ServiceMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [loading, setLoading] = useState(true)

  const buildMap = useCallback(async () => {
    setLoading(true)
    try {
      const [graphData, health] = await Promise.all([rcaApi.graph().catch(() => ({ nodes: [], edges: [] })), checkAllServices()])
      const serviceHealth = { 'log-ingestion-service': health.ingestion ? 'healthy' : 'down', 'ai-anomaly-detector': health.anomaly ? 'healthy' : 'down', 'alert-service': health.alerts ? 'healthy' : 'down', 'root-cause-analyzer': health.rca ? 'healthy' : 'down' }
      const serviceInfo = { 'log-ingestion-service': { icon: '📥', port: 8000 }, 'ai-anomaly-detector': { icon: '🧠', port: 8001 }, 'alert-service': { icon: '🔔', port: 8002 }, 'root-cause-analyzer': { icon: '🔍', port: 8003 }, 'api-gateway': { icon: '🌐', port: 8000 }, 'user-service': { icon: '👤', port: 8001 }, 'payment-service': { icon: '💳', port: 8002 }, 'catalog-service': { icon: '📦', port: 8003 }, 'search-service': { icon: '🔎', port: 8004 }, 'database': { icon: '🗄️', port: 5432 }, 'elasticsearch': { icon: '🔍', port: 9200 }, 'kafka': { icon: '📨', port: 9092 } }
      const graphNodes = (graphData.nodes || []).map((nodeId, idx) => {
        const info = serviceInfo[nodeId] || { icon: '⚙️', port: '—' }
        return { id: nodeId, type: 'service', position: { x: (idx % 4) * 280, y: Math.floor(idx / 4) * 200 }, data: { label: nodeId, status: serviceHealth[nodeId] || 'healthy', port: info.port, icon: info.icon }, sourcePosition: Position.Right, targetPosition: Position.Left }
      })
      const graphEdges = (graphData.edges || []).map((edge, idx) => ({ id: `e${idx}`, source: edge.source, target: edge.target, animated: true, style: { stroke: 'rgba(94, 92, 230, 0.6)', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(94, 92, 230, 0.8)' } }))
      setNodes(graphNodes)
      setEdges(graphEdges)
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }, [setNodes, setEdges])

  useEffect(() => { buildMap(); const i = setInterval(buildMap, 30000); return () => clearInterval(i) }, [buildMap])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative w-full h-[600px] rounded-3xl overflow-hidden border border-white/[0.08]" style={{ background: 'radial-gradient(ellipse at top, #0f172a 0%, #050508 100%)' }}>
      {loading && <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10"><div className="text-center"><div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" /><div className="text-sm text-white/60">Building service map...</div></div></div>}
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} nodeTypes={nodeTypes} fitView proOptions={{ hideAttribution: true }}>
        <Background color="rgba(255,255,255,0.05)" gap={40} size={1} />
        <Controls className="bg-white/[0.04] border border-white/[0.08] rounded-xl backdrop-blur-xl" showInteractive={false} />
        <MiniMap nodeColor={(n) => ({ healthy: '#30D158', down: '#FF453A', unknown: '#6E6E73' })[n.data.status] || '#6E6E73'} maskColor="rgba(0,0,0,0.8)" className="bg-white/[0.04] border border-white/[0.08] rounded-xl backdrop-blur-xl" />
      </ReactFlow>
    </motion.div>
  )
}

export default ServiceMap
