'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, Star, Zap, Shield, Crown } from 'lucide-react'
import { skills } from '@/config/data'
import type { Skill } from '@/types'
import { cn } from '@/lib/utils'

const CATEGORIES = ['All', 'Languages', 'Frontend', 'Backend', 'AI', 'ML', 'Cloud', 'DevOps', 'Tools']

const RARITY_CONFIG = {
  common:    { label: 'Common',    icon: <Shield className="w-3 h-3" />,  color: '#94A3B8', border: '#475569', glow: 'rgba(71,85,105,0.3)'   },
  rare:      { label: 'Rare',      icon: <Star className="w-3 h-3" />,    color: '#60A5FA', border: '#3B82F6', glow: 'rgba(59,130,246,0.4)'  },
  epic:      { label: 'Epic',      icon: <Zap className="w-3 h-3" />,     color: '#A855F7', border: '#7C3AED', glow: 'rgba(124,58,237,0.4)'  },
  legendary: { label: 'Legendary', icon: <Crown className="w-3 h-3" />,   color: '#F59E0B', border: '#D97706', glow: 'rgba(217,119,6,0.5)'   },
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [selected, setSelected] = useState(false)
  const rarity = RARITY_CONFIG[skill.rarity]

  return (
    <>
      <motion.div
        className="relative rounded-xl p-4 cursor-pointer transition-all duration-200 border"
        style={{
          background: hovered ? `${rarity.color}08` : 'rgba(18, 29, 47, 0.6)',
          borderColor: hovered ? `${rarity.border}80` : 'rgba(255,255,255,0.05)',
          boxShadow: hovered ? `0 0 20px ${rarity.glow}` : 'none',
        }}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: index * 0.04, type: 'spring', stiffness: 200 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => setSelected(true)}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.97 }}
        role="button"
        aria-label={`View ${skill.name} details`}
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setSelected(true)}
      >
        {/* Rarity badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium"
          style={{ color: rarity.color, background: `${rarity.color}15` }}>
          {rarity.icon}
          {rarity.label}
        </div>

        {/* Icon */}
        <div className="text-2xl mb-2 leading-none">{skill.icon}</div>

        {/* Name */}
        <div className="font-display font-semibold text-sm text-white mb-1">{skill.name}</div>
        <div className="text-xs text-slate-500 mb-3">{skill.category}</div>

        {/* XP Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-mono">
            <span style={{ color: rarity.color }}>LVL {skill.level}</span>
            <span className="text-slate-600">{skill.xp}/{skill.maxXp} XP</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${rarity.color}, ${skill.color})` }}
              initial={{ width: 0 }}
              animate={{ width: `${(skill.xp / skill.maxXp) * 100}%` }}
              transition={{ duration: 1, delay: index * 0.04 + 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(false)} />
            <motion.div className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
              <div className="w-full max-w-sm rounded-2xl p-6 border relative"
                style={{
                  background: 'rgba(10, 20, 35, 0.98)',
                  borderColor: `${rarity.border}60`,
                  boxShadow: `0 0 50px ${rarity.glow}`,
                }}
                role="dialog" aria-modal="true" aria-label={`${skill.name} details`}>
                <button onClick={() => setSelected(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close">
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{skill.icon}</div>
                  <div>
                    <h3 className="font-display font-bold text-white">{skill.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ color: rarity.color, background: `${rarity.color}20` }}>
                        {rarity.icon} {rarity.label}
                      </span>
                      <span className="text-xs text-slate-500">{skill.category}</span>
                    </div>
                  </div>
                </div>

                {/* XP bar full */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span style={{ color: rarity.color }}>Level {skill.level}</span>
                    <span className="text-slate-500">{skill.xp} / {skill.maxXp} XP</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${rarity.color}, ${skill.color})` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(skill.xp / skill.maxXp) * 100}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }} />
                  </div>
                </div>

                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{skill.description}</p>

                {skill.projects.length > 0 && (
                  <div>
                    <div className="text-xs text-slate-500 font-mono mb-2">Used in:</div>
                    <div className="flex flex-wrap gap-2">
                      {skill.projects.map(p => (
                        <span key={p} className="text-xs px-2 py-0.5 rounded-md font-mono"
                          style={{ background: `${skill.color}15`, color: skill.color, border: `1px solid ${skill.color}30` }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All')
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory)

  return (
    <section id="skills" ref={ref} className="relative py-24 px-4 sm:px-6 lg:px-8"
      aria-label="Skills section">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-mono text-purple-400 border border-purple-500/30 bg-purple-500/10 mb-4">
            ⚔️ RPG Inventory
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            Tech <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Every skill earned through real projects. Hover to inspect, click for details.
            Rarity reflects depth of experience.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}>
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
                activeCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-neon-blue'
                  : 'glass border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Rarity legend */}
        <motion.div className="flex flex-wrap justify-center gap-4 mb-8 text-xs"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}>
          {Object.entries(RARITY_CONFIG).map(([key, val]) => (
            <div key={key} className="flex items-center gap-1.5"
              style={{ color: val.color }}>
              {val.icon}
              <span>{val.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
          layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div key={skill.name} layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, delay: i * 0.02 }}>
                <SkillCard skill={skill} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom stats */}
        <motion.div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}>
          {[
            { label: 'Total Skills', value: skills.length.toString() },
            { label: 'Legendary', value: skills.filter(s => s.rarity === 'legendary').length.toString() },
            { label: 'Epic', value: skills.filter(s => s.rarity === 'epic').length.toString() },
            { label: 'Avg Level', value: Math.round(skills.reduce((a, s) => a + s.level, 0) / skills.length).toString() },
          ].map(stat => (
            <div key={stat.label} className="glass rounded-xl p-4 text-center border border-white/5">
              <div className="font-display font-bold text-2xl text-white">{stat.value}</div>
              <div className="text-slate-500 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
