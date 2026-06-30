'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Github, Linkedin, FileText, Sparkles } from 'lucide-react'
import Character, { type CharacterRef } from '@/components/Character'
import { socialLinks } from '@/config/data'
import { openResume } from '@/lib/resumeCheck'

const BOOT_SEQUENCE = [
  { text: '> Initializing KARTIKEYA OS v2.0...', delay: 0,    color: '#94A3B8' },
  { text: '> Loading FastAPI inference services...', delay: 700,  color: '#60A5FA' },
  { text: '> Mounting RAG pipeline... Precision@5=0.70 ✓', delay: 1400, color: '#4ADE80' },
  { text: '> Starting lead intelligence cron (Mon 06:00 IST)...', delay: 2000, color: '#60A5FA' },
  { text: '> Brewing chai... ☕', delay: 2600, color: '#FBBF24' },
  { text: '> Running 460 tests... all passed ✓', delay: 3000, color: '#4ADE80' },
  { text: '> All systems operational.', delay: 3600, color: '#4ADE80' },
  { text: '> Ready.', delay: 4000, color: '#22D3EE' },
]

const ROLES = ['AI/ML Engineer', 'LLM Systems Builder', 'RAG Pipeline Architect', 'MLOps Engineer', 'CS Data Science Student']

export default function Landing() {
  const [bootLines, setBootLines] = useState<typeof BOOT_SEQUENCE>([])
  const [bootDone, setBootDone] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const [charAnim, setCharAnim] = useState<'idle' | 'waving' | 'typing' | 'celebrating'>('idle')
  const [lightsOn, setLightsOn] = useState(false)
  const [monitorOn, setMonitorOn] = useState(false)
  const charRef = useRef<CharacterRef>(null)

  // Boot sequence
  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    // Lights on after a brief delay
    timers.push(setTimeout(() => setLightsOn(true), 300))
    timers.push(setTimeout(() => setMonitorOn(true), 800))
    timers.push(setTimeout(() => setCharAnim('waving'), 1200))
    timers.push(setTimeout(() => setCharAnim('typing'), 2500))

    BOOT_SEQUENCE.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setBootLines(prev => [...prev, line])
          if (i === BOOT_SEQUENCE.length - 1) {
            setTimeout(() => {
              setBootDone(true)
              setCharAnim('idle')
            }, 600)
          }
        }, line.delay + 400)
      )
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  // Role cycling
  useEffect(() => {
    if (!bootDone) return
    const interval = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % ROLES.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [bootDone])

  const scrollToNext = useCallback(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Room ambient light */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: lightsOn ? 1 : 0 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.4) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.5) 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.4) 0%, transparent 70%)' }} />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-6rem)]">

          {/* Left — content */}
          <div className="flex flex-col justify-center order-2 lg:order-1">

            {/* Monitor / Terminal boot */}
            <motion.div
              className="mb-8 rounded-xl overflow-hidden border border-slate-700/50 shadow-[0_0_40px_rgba(59,130,246,0.1)]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: monitorOn ? 1 : 0, scale: monitorOn ? 1 : 0.95 }}
              transition={{ duration: 0.4 }}
              style={{ background: 'rgba(8, 17, 31, 0.95)' }}
            >
              {/* Monitor top bar */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-700/50"
                style={{ background: 'rgba(18, 29, 47, 0.9)' }}>
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-500">kartikeya@portfolio ~ </span>
              </div>

              {/* Terminal content */}
              <div className="p-4 min-h-[160px] font-mono text-sm crt">
                <AnimatePresence>
                  {bootLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mb-1"
                      style={{ color: line.color }}
                    >
                      {line.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {!bootDone && (
                  <span className="terminal-cursor" aria-hidden="true" />
                )}
              </div>
            </motion.div>

            {/* Hero text */}
            <AnimatePresence>
              {bootDone && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  {/* Badge */}
                  <motion.div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium mb-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Available for internships & collaborations</span>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </motion.div>

                  {/* Name */}
                  <motion.h1
                    className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-3 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Kartikeya{' '}
                    <span className="gradient-text">Singh</span>
                  </motion.h1>

                  {/* Dynamic role */}
                  <div className="h-9 mb-4 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={roleIndex}
                        className="text-xl sm:text-2xl font-medium text-slate-300"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -30, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <span className="text-blue-400">{'>'}</span>{' '}
                        {ROLES[roleIndex]}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  {/* Tagline */}
                  <motion.p
                    className="text-slate-400 text-base sm:text-lg mb-8 max-w-lg leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Shipping ML systems to real users — not just demos.{' '}
                    <span className="text-purple-400 font-medium">LLM pipelines</span>,{' '}
                    <span className="text-cyan-400 font-medium">RAG architectures</span>, and{' '}
                    <span className="text-blue-400 font-medium">production ML serving</span>{' '}
                    — with 460+ tests to back it up.
                  </motion.p>

                  {/* CTAs */}
                  <motion.div
                    className="flex flex-wrap gap-3 mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.button
                      onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl text-sm shadow-neon-blue hover:shadow-neon-purple transition-all"
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      Explore Projects
                    </motion.button>
                    <motion.button
                      onClick={() => openResume()}
                      className="px-6 py-3 glass border border-white/10 text-white font-medium rounded-xl text-sm flex items-center gap-2 hover:border-blue-500/40 transition-all"
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <FileText className="w-4 h-4" />
                      View Resume
                    </motion.button>
                    <motion.a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 glass border border-white/10 text-slate-300 rounded-xl text-sm hover:border-blue-500/40 hover:text-white transition-all"
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      aria-label="GitHub profile"
                    >
                      <Github className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 glass border border-white/10 text-slate-300 rounded-xl text-sm hover:border-blue-500/40 hover:text-white transition-all"
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      aria-label="LinkedIn profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </motion.a>
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    className="flex gap-6 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    {[
                      { label: 'Projects Shipped', value: '5+' },
                      { label: 'Automated Tests', value: '460+' },
                      { label: 'Internships', value: '3' },
                    ].map(stat => (
                      <div key={stat.label}>
                        <div className="font-display font-bold text-xl text-white">{stat.value}</div>
                        <div className="text-slate-500 text-xs">{stat.label}</div>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right — Character */}
          <motion.div
            className="flex flex-col items-center justify-center order-1 lg:order-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: lightsOn ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative">
              {/* Monitor glow */}
              <div className="absolute inset-0 rounded-full blur-3xl opacity-20"
                style={{ background: 'radial-gradient(ellipse, #3B82F6, #7C3AED, transparent)' }} />

              {/* Desk setup */}
              <div className="relative">
                {/* Desk lamp */}
                <motion.div
                  className="absolute -top-16 -right-4 flex flex-col items-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: monitorOn ? 1 : 0 }}
                  transition={{ delay: 1 }}
                >
                  <div className="w-1 h-16 bg-slate-600 rounded" />
                  <div className="w-8 h-1 bg-slate-600 rounded absolute top-0 -left-7" />
                  <motion.div
                    className="absolute -top-3 -left-6 w-6 h-4 rounded-sm"
                    style={{ background: '#FDE68A' }}
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {/* Lamp glow */}
                  <motion.div
                    className="absolute -top-1 -left-8 w-16 h-16 rounded-full blur-xl"
                    style={{ background: 'rgba(253, 230, 138, 0.2)' }}
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Small plant */}
                <motion.div
                  className="absolute -bottom-2 -left-8"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: monitorOn ? 1 : 0, scale: monitorOn ? 1 : 0 }}
                  transition={{ delay: 1.5, type: 'spring' }}
                >
                  <div className="relative">
                    <div className="w-6 h-4 rounded-b-full bg-slate-700" />
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-1 h-6 bg-green-700" />
                    <div className="absolute -top-7 left-0 w-4 h-4 rounded-full bg-green-600 -rotate-12" />
                    <div className="absolute -top-7 right-0 w-4 h-4 rounded-full bg-green-500 rotate-12" />
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-green-400" />
                  </div>
                </motion.div>

                <Character
                  animation={charAnim}
                  size={280}
                  showDesk
                  className="relative z-10"
                />
              </div>

              {/* Floating skill tags */}
              {bootDone && (
                <>
                  {[
                    { label: 'Claude AI', color: '#7C3AED', x: -80, y: 20 },
                    { label: 'RAG', color: '#06B6D4', x: 90, y: 40 },
                    { label: 'FastAPI', color: '#059669', x: -70, y: 120 },
                  ].map((tag, i) => (
                    <motion.div
                      key={tag.label}
                      className="absolute text-xs font-mono px-2 py-1 rounded-md border"
                      style={{
                        left: `calc(50% + ${tag.x}px)`,
                        top: tag.y,
                        borderColor: `${tag.color}50`,
                        background: `${tag.color}15`,
                        color: tag.color,
                      }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -4, 0],
                      }}
                      transition={{
                        opacity: { delay: 1 + i * 0.2 },
                        scale: { delay: 1 + i * 0.2 },
                        y: { delay: i * 0.5, duration: 3, repeat: Infinity, ease: 'easeInOut' },
                      }}
                    >
                      {tag.label}
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors group"
          initial={{ opacity: 0 }}
          animate={{ opacity: bootDone ? 1 : 0 }}
          transition={{ delay: 1 }}
          aria-label="Scroll to next section"
        >
          <span className="text-xs font-mono">scroll down</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}
