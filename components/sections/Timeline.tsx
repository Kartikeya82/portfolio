'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Character from '@/components/Character'
import { timeline } from '@/config/data'

const TYPE_CONFIG = {
  education:   { bg: '#7C3AED', label: '🎓 Education' },
  project:     { bg: '#3B82F6', label: '🚀 Project' },
  achievement: { bg: '#F59E0B', label: '🏆 Achievement' },
  internship:  { bg: '#059669', label: '💼 Internship' },
  focus:       { bg: '#06B6D4', label: '🎯 Current' },
}

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeItem, setActiveItem] = useState<string | null>(null)

  return (
    <section id="timeline" ref={ref} className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Timeline section">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-mono text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 mb-4">
            🗺️ The Journey
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            My <span className="gradient-text">Story So Far</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Every milestone on the path. From writing first code to shipping AI in production.
          </p>
        </motion.div>

        {/* Timeline with character walking */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(59,130,246,0.4), rgba(124,58,237,0.4), transparent)' }} />

          {/* Character walking alongside */}
          <motion.div
            className="hidden lg:block absolute -left-20 top-0"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1, y: [0, -6, 0] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
            <Character animation="idle" size={100} />
          </motion.div>

          {/* Timeline items */}
          <div className="space-y-8">
            {timeline.map((item, i) => {
              const isRight = i % 2 === 0
              const config = TYPE_CONFIG[item.type]
              const isActive = activeItem === item.id

              return (
                <motion.div
                  key={item.id}
                  className={`relative flex items-start gap-8 ${isRight ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                  initial={{ opacity: 0, x: isRight ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.5 }}>

                  {/* Node */}
                  <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 z-10">
                    <motion.button
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 cursor-pointer"
                      style={{
                        background: `${config.bg}20`,
                        borderColor: config.bg,
                        boxShadow: isActive ? `0 0 20px ${config.bg}60` : `0 0 10px ${config.bg}30`,
                      }}
                      onClick={() => setActiveItem(isActive ? null : item.id)}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      animate={item.type === 'focus' ? {
                        boxShadow: [`0 0 10px ${config.bg}30`, `0 0 25px ${config.bg}60`, `0 0 10px ${config.bg}30`],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      aria-label={`Expand ${item.title}`}
                      aria-expanded={isActive}>
                      {item.icon}
                    </motion.button>
                  </div>

                  {/* Spacer for center alignment on desktop */}
                  <div className="hidden sm:block flex-1" />

                  {/* Card */}
                  <motion.div
                    className="flex-1 ml-20 sm:ml-0 sm:max-w-[calc(50%-3rem)] cursor-pointer"
                    onClick={() => setActiveItem(isActive ? null : item.id)}
                    whileHover={{ scale: 1.01 }}>
                    <div
                      className="rounded-xl p-5 border transition-all duration-200"
                      style={{
                        background: isActive ? `${config.bg}10` : 'rgba(18, 29, 47, 0.7)',
                        borderColor: isActive ? `${config.bg}50` : 'rgba(255,255,255,0.06)',
                        boxShadow: isActive ? `0 0 20px ${config.bg}15` : 'none',
                      }}>
                      {/* Year badge */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                          style={{ color: config.bg, background: `${config.bg}20` }}>
                          {item.year}
                        </span>
                        <span className="text-xs text-slate-600">{config.label}</span>
                      </div>

                      <h3 className="font-display font-bold text-white text-base mb-1">{item.title}</h3>
                      <p className="text-sm font-medium mb-2" style={{ color: config.bg }}>{item.subtitle}</p>

                      {/* Expandable description */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            className="text-slate-400 text-sm leading-relaxed"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}>
                            {item.description}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {!isActive && (
                        <p className="text-slate-500 text-xs mt-1">Click to expand →</p>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* End marker */}
          <motion.div
            className="absolute left-8 sm:left-1/2 bottom-0 -translate-x-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1 }}>
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-neon-cyan"
              style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.6)' }} />
          </motion.div>
        </div>

        {/* Current status banner */}
        <motion.div
          className="mt-20 p-6 rounded-2xl border text-center"
          style={{
            background: 'rgba(6, 182, 212, 0.05)',
            borderColor: 'rgba(6, 182, 212, 0.2)',
            boxShadow: '0 0 40px rgba(6, 182, 212, 0.08)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}>
          <motion.div
            className="w-3 h-3 rounded-full bg-green-400 mx-auto mb-3"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }} />
          <h3 className="font-display font-bold text-xl text-white mb-2">
            Currently: Chapter 7 in progress
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Building Orvica Dental AI in production, exploring agentic architectures,
            and open to exciting opportunities in AI/ML.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
