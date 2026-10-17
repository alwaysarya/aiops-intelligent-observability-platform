import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react'

const initialMessages = [
  { role: 'bot', text: 'Hi Aryan! I am your AIOps Assistant. How can I help you today?' },
]

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  useEffect(scrollToBottom, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg = input
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let botResponse = "I'm analyzing your infrastructure. Please wait..."
      
      if (userMsg.toLowerCase().includes('log') || userMsg.toLowerCase().includes('error')) {
        botResponse = "I've detected 3 high-latency errors in the payment-service over the last hour. The root cause appears to be a database connection timeout. Would you like me to auto-remediate it?"
      } else if (userMsg.toLowerCase().includes('model') || userMsg.toLowerCase().includes('anomaly')) {
        botResponse = "The AI Anomaly Detector is operating at 98.4% accuracy. Currently, there are no critical drift warnings. However, the 'payment-service' shows a slight latency anomaly."
      } else if (userMsg.toLowerCase().includes('health') || userMsg.toLowerCase().includes('status')) {
        botResponse = "All 4 core services (Log Ingestion, AI Detector, Alerts, RCA) are fully healthy and responding in under 50ms."
      } else {
        botResponse = "I can help you with log analysis, anomaly detection, and root cause diagnostics. Try asking: 'What is the system health?' or 'Show me recent errors.'"
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-black text-white shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles size={24} className="text-apple-cyan" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[90] w-[380px] h-[500px] bg-white rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border border-black/[0.08] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-black text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-apple-cyan/20 flex items-center justify-center">
                  <Sparkles size={16} className="text-apple-cyan" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold">AIOps Assistant</p>
                  <p className="text-[11px] text-white/60">Powered by AI</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"><X size={18} /></button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-ink-grey/30">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-apple-blue text-white' : 'bg-white border border-black/[0.08] text-apple-cyan'}`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-[13px] leading-relaxed max-w-[80%] ${msg.role === 'user' ? 'bg-apple-blue text-white rounded-tr-sm' : 'bg-white border border-black/[0.04] shadow-sm text-text-primary rounded-tl-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-black/[0.08] flex items-center justify-center text-apple-cyan"><Bot size={16} /></div>
                  <div className="p-4 rounded-2xl bg-white border border-black/[0.04] shadow-sm rounded-tl-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-black/[0.06] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-ink-grey border border-transparent focus:bg-white focus:border-apple-blue/40 outline-none text-[13px] transition-all"
              />
              <button type="submit" className="p-2.5 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors">
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
