'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, ChevronRight } from 'lucide-react'
import { terminalResponses } from '@/config/data'

type RobotState = 'idle' | 'awake' | 'talking' | 'sleeping'

interface Message {
  role: 'user' | 'bot'
  content: string
}

const QUICK_COMMANDS = ['whoami', 'projects', 'skills', 'contact', 'help']

const GREETING_MESSAGES = [
  "Hey! I'm Kai, Kartikeya's AI assistant 👋",
  "Ask me anything about Kartikeya!",
  "Try: 'skills', 'projects', or 'whoami'",
]

function RobotSVG({ state }: { state: RobotState }) {
  const eyeOpen = state !== 'sleeping'
  const mouthSmile = state === 'talking' || state === 'awake'

  return (
    <svg viewBox="0 0 40 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full"
      style={{ imageRendering: 'pixelated' }} aria-hidden>
      {/* Antenna */}
      <rect x="18" y="0" width="4" height="4" fill="#60A5FA" />
      <rect x="16" y="4" width="8" height="2" fill="#3B82F6" />
      {/* Head */}
      <rect x="8" y="6" width="24" height="18" rx="3" fill="#1E3A5F" />
      <rect x="9" y="7" width="22" height="16" rx="2" fill="#1A2F4A" />
      {/* Eyes */}
      {eyeOpen ? (
        <>
          <rect x="12" y="11" width="6" height="6" rx="1" fill="#0EA5E9" />
          <rect x="22" y="11" width="6" height="6" rx="1" fill="#0EA5E9" />
          {/* Pupils */}
          <rect x="14" y="13" width="2" height="2" fill="white" />
          <rect x="24" y="13" width="2" height="2" fill="white" />
          {/* Highlight */}
          <rect x="13" y="12" width="1" height="1" fill="rgba(255,255,255,0.6)" />
          <rect x="23" y="12" width="1" height="1" fill="rgba(255,255,255,0.6)" />
        </>
      ) : (
        <>
          {/* Closed eyes (sleeping) */}
          <rect x="12" y="13" width="6" height="2" fill="#60A5FA" />
          <rect x="22" y="13" width="6" height="2" fill="#60A5FA" />
        </>
      )}
      {/* Mouth */}
      {mouthSmile ? (
        <>
          <rect x="15" y="20" width="2" height="2" fill="#60A5FA" />
          <rect x="17" y="21" width="6" height="2" fill="#60A5FA" />
          <rect x="23" y="20" width="2" height="2" fill="#60A5FA" />
        </>
      ) : (
        <rect x="15" y="20" width="10" height="2" fill="#60A5FA" />
      )}
      {/* Body */}
      <rect x="10" y="24" width="20" height="14" rx="2" fill="#162B44" />
      {/* Chest display */}
      <rect x="13" y="27" width="14" height="8" rx="1" fill="#0A1F35" />
      <rect x="14" y="28" width="12" height="1" fill="#22D3EE" opacity="0.6" />
      <rect x="14" y="30" width="8" height="1" fill="#60A5FA" opacity="0.5" />
      <rect x="14" y="32" width="10" height="1" fill="#22D3EE" opacity="0.4" />
      {/* Arms */}
      <rect x="4" y="24" width="6" height="10" rx="2" fill="#162B44" />
      <rect x="30" y="24" width="6" height="10" rx="2" fill="#162B44" />
      {/* Hands */}
      <rect x="4" y="34" width="6" height="4" rx="2" fill="#1E3A5F" />
      <rect x="30" y="34" width="6" height="4" rx="2" fill="#1E3A5F" />
      {/* Legs */}
      <rect x="12" y="38" width="7" height="8" rx="2" fill="#0F2035" />
      <rect x="21" y="38" width="7" height="8" rx="2" fill="#0F2035" />
      {/* Feet */}
      <rect x="11" y="44" width="9" height="4" rx="2" fill="#1E3A5F" />
      <rect x="20" y="44" width="9" height="4" rx="2" fill="#1E3A5F" />
    </svg>
  )
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [robotState, setRobotState] = useState<RobotState>('idle')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [showHint, setShowHint] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const sleepTimer = useRef<NodeJS.Timeout>()

  // Wake up periodically to show hint
  useEffect(() => {
    const hintTimer = setTimeout(() => setShowHint(true), 8000)
    return () => clearTimeout(hintTimer)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const resetSleepTimer = () => {
    clearTimeout(sleepTimer.current)
    sleepTimer.current = setTimeout(() => {
      if (isOpen) setRobotState('idle')
    }, 30000)
  }

  const openChat = () => {
    setIsOpen(true)
    setShowHint(false)
    setRobotState('awake')
    if (messages.length === 0) {
      setMessages([{ role: 'bot', content: GREETING_MESSAGES[0] }])
      setTimeout(() => addBotMessage(GREETING_MESSAGES[1]), 800)
      setTimeout(() => addBotMessage(GREETING_MESSAGES[2]), 1600)
    }
    resetSleepTimer()
  }

  const addBotMessage = (content: string) => {
    setRobotState('talking')
    setMessages(prev => [...prev, { role: 'bot', content }])
    setTimeout(() => setRobotState('awake'), 1000)
  }

  const sendMessage = (cmd?: string) => {
    const text = cmd ?? input.trim()
    if (!text) return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: text }])
    resetSleepTimer()

    setTimeout(() => {
      const key = text.toLowerCase().trim()
      const response = terminalResponses[key]
      if (response && response !== '__CLEAR__') {
        const lines = Array.isArray(response) ? response : [response]
        const cleanedLines = lines.filter(l => l.trim()).join('\n')
        addBotMessage(cleanedLines || "Here's what I found!")
      } else if (response === '__CLEAR__') {
        addBotMessage("Can't clear the chat here, but you can close and reopen me! 😄")
      } else {
        addBotMessage(`Hmm, I don't know "${text}" yet. Try: ${QUICK_COMMANDS.join(', ')}`)
      }
    }, 600)
  }

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Hint bubble */}
        <AnimatePresence>
          {showHint && !isOpen && (
            <motion.div
              className="bg-[#121D2F] border border-blue-500/30 rounded-xl px-3 py-2 text-xs text-slate-300 max-w-[180px] text-center shadow-neon-blue"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}>
              👋 Ask me anything about Kartikeya!
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#121D2F] border-b border-r border-blue-500/30 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Robot button */}
        <motion.button
          onClick={isOpen ? () => setIsOpen(false) : openChat}
          className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500/50 shadow-neon-blue"
          style={{ background: 'linear-gradient(135deg, #0A1F35, #162B44)' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={robotState === 'idle' ? { y: [0, -4, 0] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}>
          <RobotSVG state={isOpen ? 'awake' : robotState} />
          {/* Notification dot */}
          {!isOpen && (
            <motion.div className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-cyan-400 border border-[#08111F]"
              animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          )}
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 rounded-2xl border border-slate-700/60 overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.2)]"
            style={{ background: 'rgba(8, 15, 26, 0.97)' }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}>

            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-slate-800"
              style={{ background: 'rgba(14, 24, 42, 0.9)' }}>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-500/40 flex-shrink-0">
                <RobotSVG state={robotState} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">Kai</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-xs text-slate-500">Kartikeya&apos;s AI assistant</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close chat">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}>
                  <div
                    className="max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed whitespace-pre-wrap"
                    style={msg.role === 'user'
                      ? { background: 'rgba(59,130,246,0.2)', color: '#E2E8F0', borderRadius: '12px 12px 2px 12px' }
                      : { background: 'rgba(18, 29, 47, 0.9)', color: '#CBD5E1', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '2px 12px 12px 12px' }
                    }>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {robotState === 'talking' && (
                <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="px-3 py-2 rounded-xl" style={{ background: 'rgba(18,29,47,0.9)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick commands */}
            <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto">
              {QUICK_COMMANDS.map(cmd => (
                <button key={cmd}
                  onClick={() => sendMessage(cmd)}
                  className="flex-shrink-0 px-2.5 py-1 text-xs font-mono text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 rounded-md hover:bg-cyan-500/20 transition-colors">
                  {cmd}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 pt-1">
              <div className="flex gap-2 p-2 rounded-xl border border-slate-700/60"
                style={{ background: 'rgba(12, 22, 38, 0.8)' }}>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none"
                  aria-label="Chat input" />
                <motion.button
                  onClick={() => sendMessage()}
                  className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Send message">
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
