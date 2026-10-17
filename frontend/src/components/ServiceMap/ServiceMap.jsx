import { useCallback, useEffect, useState } from 'react'
import ReactFlow, { Background, Controls, useNodesState, useEdgesState, MarkerType, Position } from 'reactflow'
import 'reactflow/dist/style.css'
import { motion } from 'framer-motion'
import { rcaApi, checkAllServices } from '../../services/api'

const ServiceNode = ({ data }) => {
  const { label, status, port, icon } = data
  const colors = {
    healthy: { bg: '#F0FDF4', border: '#22C55E', text: '#16A34A' },
    down: { bg: '#FEF2F2', border: '#EF4444', text: '#DC2626' },
    unknown: { bg: '#F9FAFB', border: '#D1D5DB', text: '#6B7280' },
  }
  const c = colors[status] || colors.unknown

  return (
    <div className="relative px-4 py-3 rounded-xl bg-white transition-all cursor-pointer hover:scale-105"
      style={{ border: `2px solid ${c.border}`, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', minWidth: '160px' }}>
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg text-lg" style={{ background: c.bg, border: `1px solid ${c.border}` }}>{icon}</div>
        <div>
          <div className="text-[12px] font-semibold text-gray-900">{label}</div>
          <div className="text-[10px] font-mono text-gray-500">:{port}</div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.border, boxShadow: `0 0 6px ${c.border}` }} />
        <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: c.text }}>
          {status === 'healthy' ? 'Online' : status === 'down' ? 'Down' : 'Unknown'}
        </span>
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
        return { id: nodeId, type: 'service', position: { x: (idx % 4) * 260, y: Math.floor(idx / 4) * 160 }, data: { label: nodeId, status: serviceHealth[nodeId] || 'healthy', port: info.port, icon: info.icon }, sourcePosition: Position.Right, targetPosition: Position.Left }
      })
      const graphEdges = (graphData.edges || []).map((edge, idx) => ({ id: `e${idx}`, source: edge.source, target: edge.target, animated: true, style: { stroke: '#9CA3AF', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#9CA3AF' } }))
      setNodes(graphNodes)
      setEdges(graphEdges)
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }, [setNodes, setEdges])

  useEffect(() => { buildMap(); const i = setInterval(buildMap, 30000); return () => clearInterval(i) }, [buildMap])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-black/[0.06] bg-white">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      {loading && <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10"><div className="text-center"><div className="w-8 h-8 border-2 border-apple-blue/30 border-t-apple-blue rounded-full animate-spin mx-auto mb-3" /><div className="text-sm text-text-tertiary">Loading graph...</div></div></div>}
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} nodeTypes={nodeTypes} fitView proOptions={{ hideAttribution: true }}>
        <Background color="#F3F4F6" gap={20} size={1} />
        <Controls className="bg-white border border-black/[0.08] rounded-lg shadow-sm" showInteractive={false} />
      </ReactFlow>
    </motion.div>
  )
}

export default ServiceMap
