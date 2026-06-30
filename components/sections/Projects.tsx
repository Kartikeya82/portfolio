'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  X, Github, ExternalLink, Cpu, Zap, Database, Brain,
  ChevronRight, Clock, CheckCircle, Archive, ArrowLeft
} from 'lucide-react'
import { projects } from '@/config/data'
import type { Project } from '@/types'
import { cn } from '@/lib/utils'

const STATUS_CONFIG = {
  live:        { label: 'Live',        color: '#4ADE80', icon: <Zap className="w-3 h-3" /> },
  development: { label: 'In Progress', color: '#FBBF24', icon: <Clock className="w-3 h-3" /> },
  archived:    { label: 'Archived',    color: '#94A3B8', icon: <Archive className="w-3 h-3" /> },
}

function MachineCard({ project, index }: { project: Project; index: number }) {
  const [isOn, setIsOn] = useState(false)
  const [selected, setSelected] = useState(false)
  const status = STATUS_CONFIG[project.status]

  // ESC key closes modal
  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selected])

  // Browser Back button closes modal
  useEffect(() => {
    if (!selected) return
    history.pushState({ portfolioModal: project.id }, '')
    const onPop = () => setSelected(false)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [selected, project.id])

  // Lock body scroll while modal is open
  useEffect(() => {
    if (selected) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [selected])

  return (
    <>
      <motion.div
        className="relative rounded-2xl overflow-hidden border cursor-pointer group"
        style={{
          background: 'rgba(12, 22, 38, 0.8)',
          borderColor: isOn ? `${project.color}60` : 'rgba(255,255,255,0.06)',
          boxShadow: isOn ? `0 0 30px ${project.color}20, 0 0 60px ${project.color}08` : 'none',
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        onHoverStart={() => setIsOn(true)}
        onHoverEnd={() => setIsOn(false)}
        onClick={() => setSelected(true)}
        whileHover={{ y: -6 }}
        role="article"
        aria-label={`${project.title} project card`}
      >
        {/* Machine top header */}
        <div className="relative h-32 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${project.color}15, ${project.accentColor}08)` }}>

          {/* Circuit pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-10" aria-hidden>
            <defs>
              <pattern id={`circuit-${project.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 0 20 L 15 20 L 20 10 L 25 10 M 25 10 L 30 10 L 30 20 L 40 20 M 20 10 L 20 0 M 20 30 L 20 40" stroke="currentColor" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#circuit-${project.id})`} color={project.color} />
          </svg>

          {/* Category badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-mono"
            style={{ background: `${project.color}25`, color: project.color, border: `1px solid ${project.color}40` }}>
            {project.category}
          </div>

          {/* Status */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium"
            style={{ background: `${status.color}15`, color: status.color, border: `1px solid ${status.color}30` }}>
            {status.icon}
            {status.label}
          </div>

          {/* Power lights */}
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            {[0, 1, 2].map(i => (
              <motion.div key={i} className="w-2 h-2 rounded-full"
                style={{ background: project.color }}
                animate={isOn ? {
                  opacity: [0.3, 1, 0.3],
                  boxShadow: [`0 0 4px ${project.color}80`, `0 0 8px ${project.color}`, `0 0 4px ${project.color}80`],
                } : { opacity: 0.2 }}
                transition={{ duration: 0.8 + i * 0.2, repeat: Infinity, delay: i * 0.1 }} />
            ))}
          </div>

          {/* Machine icon */}
          <motion.div
            className="absolute bottom-3 right-3 w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: `${project.color}20`, border: `1px solid ${project.color}40` }}
            animate={isOn ? { rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}>
            <Brain className="w-5 h-5" style={{ color: project.color }} />
          </motion.div>
        </div>

        {/* Card body */}
        <div className="p-5">
          <h3 className="font-display font-bold text-white text-lg mb-1">{project.title}</h3>
          <p className="text-sm font-medium mb-3" style={{ color: project.accentColor }}>{project.subtitle}</p>
          <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>

          {/* Tech stack preview */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map(t => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-md font-mono text-slate-400"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-xs px-2 py-0.5 rounded-md font-mono text-slate-500"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500">{project.timeline}</span>
            <motion.div className="flex items-center gap-1 text-xs font-medium"
              style={{ color: project.color }}
              animate={{ x: isOn ? 2 : 0 }}
              transition={{ duration: 0.2 }}>
              <span>Explore</span>
              <ChevronRight className="w-3 h-3" />
            </motion.div>
          </div>
        </div>

        {/* Scan line on hover */}
        <AnimatePresence>
          {isOn && (
            <motion.div
              className="absolute inset-x-0 h-0.5 pointer-events-none"
              style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`, opacity: 0.6 }}
              initial={{ top: 0, opacity: 0 }}
              animate={{ top: '100%', opacity: [0, 0.6, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(false)}
            />

            {/* Outer wrapper — click outside to close */}
            <div
              className="fixed inset-0 z-[70] flex items-center justify-center p-4"
              onClick={() => setSelected(false)}
            >
              <motion.div
                className="w-full max-w-2xl rounded-2xl border flex flex-col"
                style={{
                  background: 'rgba(8, 15, 26, 0.98)',
                  borderColor: `${project.color}50`,
                  boxShadow: `0 0 60px ${project.color}20`,
                  maxHeight: 'calc(100dvh - 2rem)',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                role="dialog"
                aria-modal="true"
                aria-label={`${project.title} details`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Sticky modal header */}
                <div
                  className="relative rounded-t-2xl overflow-hidden flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${project.color}20, ${project.accentColor}10)` }}
                >
                  {/* Top navigation bar */}
                  <div className="flex items-center justify-between px-4 pt-4 pb-2">
                    <button
                      onClick={() => setSelected(false)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white transition-colors"
                      style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }}
                      aria-label="Back to projects"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back to Projects
                    </button>
                    <button
                      onClick={() => setSelected(false)}
                      className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title row */}
                  <div className="flex items-center px-6 pb-5 gap-4">
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-xs font-mono mb-2 px-2 py-0.5 rounded inline-block"
                        style={{ color: project.color, background: `${project.color}20` }}
                      >
                        {project.category}
                      </div>
                      <h2 className="font-display font-bold text-2xl text-white leading-tight">{project.title}</h2>
                      <p style={{ color: project.accentColor }} className="text-sm mt-1 leading-snug">{project.subtitle}</p>
                    </div>
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${project.color}20`, border: `1px solid ${project.color}40` }}
                    >
                      <Brain className="w-7 h-7" style={{ color: project.color }} />
                    </div>
                  </div>
                </div>

                {/* Scrollable body */}
                <div className="overflow-y-auto p-6 space-y-5">
                  {/* Overview */}
                  <div>
                    <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Overview</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Key Features</h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {project.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: project.color }} />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div>
                    <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-lg font-mono"
                          style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}30` }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Challenges & Solutions */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Challenge</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{project.challenges}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Solution</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{project.solutions}</p>
                    </div>
                  </div>

                  {/* Lessons */}
                  <div className="p-4 rounded-xl border"
                    style={{ background: `${project.color}08`, borderColor: `${project.color}20` }}>
                    <h3 className="text-xs font-mono mb-2" style={{ color: project.color }}>💡 Key Lesson</h3>
                    <p className="text-slate-400 text-sm leading-relaxed italic">&ldquo;{project.lessons}&rdquo;</p>
                  </div>

                  {/* Timeline + Links */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      {project.timeline}
                    </div>
                    <div className="flex gap-2">
                      {project.github && (
                        <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 glass border border-white/10 hover:border-white/20 transition-all"
                          whileHover={{ scale: 1.05 }} aria-label="View on GitHub">
                          <Github className="w-3.5 h-3.5" /> GitHub
                        </motion.a>
                      )}
                      {project.demo && (
                        <motion.a href={project.demo} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white"
                          style={{ background: `linear-gradient(135deg, ${project.color}, ${project.accentColor})` }}
                          whileHover={{ scale: 1.05 }} aria-label="View live demo">
                          <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} className="relative py-24 px-4 sm:px-6 lg:px-8"
      aria-label="Projects section">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-mono text-blue-400 border border-blue-500/30 bg-blue-500/10 mb-4">
            🔬 Innovation Lab
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            Digital <span className="gradient-text">Machines</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Each project is a machine I built. Click to inspect the internals —
            architecture, stack, challenges, and lessons.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <MachineCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Lab stats */}
        <motion.div className="mt-16 flex flex-wrap justify-center gap-8 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}>
          {[
            { label: 'AI-Powered', value: '4', color: '#7C3AED' },
            { label: 'In Production', value: '2', color: '#4ADE80' },
            { label: 'Tech Integrated', value: '20+', color: '#3B82F6' },
            { label: 'Problems Solved', value: '∞', color: '#F59E0B' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="font-display font-bold text-3xl" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
