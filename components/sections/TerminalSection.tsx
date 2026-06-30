'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { Terminal, X, Minimize2, Maximize2 } from 'lucide-react'
import { terminalResponses } from '@/config/data'

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system'
  content: string
  color?: string
}

const WELCOME_LINES: TerminalLine[] = [
  { type: 'system', content: '╔════════════════════════════════════════════╗', color: '#60A5FA' },
  { type: 'system', content: '║     KARTIKEYA OS v2.0 — AI Terminal        ║', color: '#60A5FA' },
  { type: 'system', content: '╚════════════════════════════════════════════╝', color: '#60A5FA' },
  { type: 'output', content: '', color: '' },
  { type: 'output', content: 'Welcome to my interactive terminal.', color: '#94A3B8' },
  { type: 'output', content: "Type 'help' to see available commands.", color: '#94A3B8' },
  { type: 'output', content: '', color: '' },
]

export default function TerminalSection() {
  const [lines, setLines] = useState<TerminalLine[]>(WELCOME_LINES)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [isMaximized, setIsMaximized] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    // Add to history
    setHistory(prev => [trimmed, ...prev.slice(0, 49)])
    setHistoryIdx(-1)

    // Add input line
    const inputLine: TerminalLine = { type: 'input', content: `$ ${cmd}`, color: '#22D3EE' }

    if (trimmed === 'clear') {
      setLines([...WELCOME_LINES])
      return
    }

    const response = terminalResponses[trimmed]

    if (!response) {
      // Unknown command
      setLines(prev => [
        ...prev,
        inputLine,
        { type: 'error', content: `command not found: ${trimmed}. Try 'help' for available commands.`, color: '#F87171' },
        { type: 'output', content: '', color: '' },
      ])
      return
    }

    const responseLines = Array.isArray(response) ? response : [response]
    const outputLines: TerminalLine[] = responseLines.map(line => ({
      type: 'output',
      content: line,
      color: '#CBD5E1',
    }))

    setLines(prev => [
      ...prev,
      inputLine,
      ...outputLines,
      { type: 'output', content: '', color: '' },
    ])
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const nextIdx = Math.min(historyIdx + 1, history.length - 1)
      setHistoryIdx(nextIdx)
      setInput(history[nextIdx] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIdx = Math.max(historyIdx - 1, -1)
      setHistoryIdx(nextIdx)
      setInput(nextIdx === -1 ? '' : history[nextIdx])
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const commands = Object.keys(terminalResponses)
      const match = commands.find(c => c.startsWith(input))
      if (match) setInput(match)
    }
  }

  const quickRun = (cmd: string) => {
    setInput('')
    runCommand(cmd)
    inputRef.current?.focus()
  }

  const getLineColor = (line: TerminalLine) => {
    if (line.color) return line.color
    switch (line.type) {
      case 'input':  return '#22D3EE'
      case 'error':  return '#F87171'
      case 'system': return '#60A5FA'
      default:       return '#CBD5E1'
    }
  }

  return (
    <section id="terminal" ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8"
      aria-label="Terminal section">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 mb-4">
            <Terminal className="w-3 h-3" />
            Interactive Terminal
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            Talk to <span className="gradient-text">My Terminal</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            A real terminal that knows everything about me. Type commands to explore.
          </p>
        </motion.div>

        {/* Quick commands */}
        <motion.div className="flex flex-wrap justify-center gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}>
          {['whoami', 'experience', 'achievements', 'projects', 'skills', 'contact', 'help'].map(cmd => (
            <motion.button key={cmd}
              onClick={() => quickRun(cmd)}
              className="px-3 py-1.5 rounded-md text-xs font-mono text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              {cmd}
            </motion.button>
          ))}
        </motion.div>

        {/* Terminal window */}
        <motion.div
          className={`rounded-2xl overflow-hidden border border-slate-700/50 shadow-[0_0_60px_rgba(6,182,212,0.1)] crt transition-all duration-300 ${
            isMaximized ? 'fixed inset-4 z-50' : 'relative'
          }`}
          style={{ background: 'rgba(4, 10, 20, 0.97)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}>

          {/* Window bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800"
            style={{ background: 'rgba(8, 17, 31, 0.9)' }}>
            <div className="flex gap-1.5">
              <button className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                onClick={() => setLines(WELCOME_LINES)} aria-label="Clear terminal" />
              <button className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" aria-label="Minimize" />
              <button className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"
                onClick={() => setIsMaximized(p => !p)} aria-label="Maximize" />
            </div>
            <div className="flex-1 text-center text-xs font-mono text-slate-500">
              kartikeya@portfolio — terminal
            </div>
            <Terminal className="w-3.5 h-3.5 text-slate-600" />
          </div>

          {/* Terminal body */}
          <div
            className="h-72 sm:h-96 overflow-y-auto p-4 font-mono text-sm scrollbar-thin"
            onClick={() => inputRef.current?.focus()}
            role="log"
            aria-live="polite"
            aria-label="Terminal output">

            {lines.map((line, i) => (
              <div key={i} className="mb-0.5 leading-6 whitespace-pre-wrap break-all"
                style={{ color: getLineColor(line) }}>
                {line.content || ' '}
              </div>
            ))}

            {/* Input line */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-cyan-400 flex-shrink-0">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-cyan-300 caret-cyan-400 font-mono text-sm"
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                aria-label="Terminal input"
              />
              <span className="terminal-cursor" aria-hidden="true" />
            </div>

            <div ref={bottomRef} />
          </div>

          {/* Bottom status bar */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-slate-800/50 text-xs font-mono text-slate-600"
            style={{ background: 'rgba(6, 12, 22, 0.8)' }}>
            <span>↑↓ history · Tab autocomplete</span>
            <span className="text-green-500">● connected</span>
          </div>
        </motion.div>

        {/* Maximized overlay backdrop */}
        {isMaximized && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsMaximized(false)} />
        )}
      </div>
    </section>
  )
}
