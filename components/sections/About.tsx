'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  BookOpen, Monitor, Lightbulb, StickyNote, Coffee,
  Flower, Calendar, X, ChevronRight
} from 'lucide-react'

interface RoomObject {
  id: string
  icon: React.ReactNode
  label: string
  x: string
  y: string
  color: string
  title: string
  content: Array<{ label: string; value: string }>
}

const ROOM_OBJECTS: RoomObject[] = [
  {
    id: 'bookshelf',
    icon: <BookOpen className="w-5 h-5" />,
    label: 'Bookshelf',
    x: '8%',
    y: '25%',
    color: '#D97706',
    title: '📚 Education & Learning',
    content: [
      { label: 'Degree', value: 'B.Tech Computer Science (Data Science)' },
      { label: 'University', value: 'Bennett University · CGPA 8.34/10' },
      { label: 'Status', value: '3rd year — graduating 2027' },
      { label: 'Focus', value: 'AI · ML · MLOps · Data Engineering' },
      { label: 'Currently reading', value: 'Designing ML Systems — Chip Huyen' },
      { label: 'Learning next', value: 'Multi-agent architectures & AI evaluation' },
    ],
  },
  {
    id: 'monitor',
    icon: <Monitor className="w-5 h-5" />,
    label: 'Monitor',
    x: '42%',
    y: '18%',
    color: '#3B82F6',
    title: '💻 Current Work',
    content: [
      { label: 'Main project', value: 'Orvica Lead Intelligence Pipeline (production)' },
      { label: 'Stack', value: 'Claude API · FastAPI · SQLite · Google Maps · Apify' },
      { label: 'Also building', value: 'WhatsApp dental intake AI (DPDP-compliant)' },
      { label: 'Research interest', value: 'Evaluation-first RAG · Agentic pipelines' },
      { label: 'Exploring', value: 'GraphRAG for medical knowledge graphs' },
      { label: 'Open to', value: 'AI/ML internships · Research roles · Startups' },
    ],
  },
  {
    id: 'whiteboard',
    icon: <Lightbulb className="w-5 h-5" />,
    label: 'Whiteboard',
    x: '75%',
    y: '20%',
    color: '#A855F7',
    title: '💡 Opinions & Ideas',
    content: [
      { label: 'Strong take', value: 'Reranking beats a bigger LLM — +23% Precision@5 proved it' },
      { label: 'Hypothesis', value: 'Most RAG failures are chunking problems, not model problems' },
      { label: 'Question I ponder', value: 'How do we evaluate AI systems honestly, not optimistically?' },
      { label: 'Next experiment', value: 'Agentic lead scoring vs rule-based — which generalises?' },
      { label: 'Bold take', value: 'Most AI products fail due to bad evaluation, not bad models' },
      { label: 'Dream project', value: 'Building next-generation AI infrastructure and multimodal foundation models at NVIDIA' },
    ],
  },
  {
    id: 'sticky',
    icon: <StickyNote className="w-5 h-5" />,
    label: 'Sticky Notes',
    x: '62%',
    y: '42%',
    color: '#FBBF24',
    title: '📝 Fun Facts',
    content: [
      { label: 'Superpower', value: 'Can debug Python at 2 AM fueled by monster energy' },
      { label: 'First ML moment', value: 'A decision tree predicted something correctly — felt like magic' },
      { label: 'Hot take', value: '460 tests > 460 stars on GitHub' },
      { label: 'Music while coding', value: 'Lo-fi or film scores — no lyrics allowed' },
      { label: 'Guilty pleasure', value: 'Adding structured logging where nobody asked for it' },
      { label: 'Life goal', value: 'Build AI systems that improve healthcare, education, and everyday life at global scale' },
    ],
  },
  {
    id: 'coffee',
    icon: <Coffee className="w-5 h-5" />,
    label: 'Coffee',
    x: '28%',
    y: '65%',
    color: '#92400E',
    title: '☕ How I Think',
    content: [
      { label: 'Engineering philosophy', value: '"Make it work. Measure it. Then make it right."' },
      { label: 'On AI products', value: '"The best model is the one users trust enough to act on."' },
      { label: 'On testing', value: '"If it runs unattended at 6 AM, it needs 460 tests."' },
      { label: 'On learning', value: '"Build something real, then figure out what you don\'t know."' },
      { label: 'On impact', value: '"5-10 paying clients in 2 weeks is a better metric than accuracy."' },
      { label: 'What drives me', value: 'Seeing a system I built change someone\'s Monday morning.' },
    ],
  },
  {
    id: 'plant',
    icon: <Flower className="w-5 h-5" />,
    label: 'Plant',
    x: '88%',
    y: '60%',
    color: '#16A34A',
    title: '🌱 Beyond Code',
    content: [
      { label: 'Interests', value: 'Cricket, football, gaming, guitar' },
      { label: 'Last great book', value: 'The Pragmatic Programmer — still holds up' },
      { label: 'Podcasts', value: 'Latent Space, Lex Fridman, Acquired' },
      { label: 'Sport', value: 'Cricket and football enthusiast — always up for a good match' },
      { label: 'Travel dream', value: 'Japan for the food, Iceland for the silence' },
      { label: 'Fun fact', value: 'Naturally turns any repetitive task into an automation project — it\'s a reflex, not a choice' },
    ],
  },
  {
    id: 'calendar',
    icon: <Calendar className="w-5 h-5" />,
    label: 'Calendar',
    x: '8%',
    y: '62%',
    color: '#06B6D4',
    title: '🗓️ Goals & Availability',
    content: [
      { label: 'Currently', value: 'Orvica contract + 3rd year B.Tech' },
      { label: '2026 goal', value: 'Land a full-time AI/ML role or strong internship' },
      { label: 'Mid-term', value: 'Launch an open-source RAG evaluation toolkit' },
      { label: 'Long-term', value: 'Build or join an AI-first healthcare company' },
      { label: 'Available for', value: 'Remote · Hybrid · Willing to relocate' },
      { label: 'Response time', value: 'Within 24 hours — email or LinkedIn' },
    ],
  },
]

export default function About() {
  const [activeObject, setActiveObject] = useState<RoomObject | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8"
      aria-label="About section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-3 py-1 rounded-full text-xs font-mono text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 mb-4">
            $ cd ~/workspace
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            My <span className="gradient-text">Digital Room</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Click any object in my workspace to learn more about me.
            Every corner holds a story.
          </p>
        </motion.div>

        {/* Interactive room */}
        <motion.div
          className="relative w-full mx-auto"
          style={{ maxWidth: 900, aspectRatio: '16/9' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Room background */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden border border-slate-700/50"
            style={{ background: 'linear-gradient(180deg, #0F1A2E 0%, #0A1525 60%, #0D1B30 100%)' }}
          >
            {/* Floor */}
            <div className="absolute bottom-0 left-0 right-0 h-1/4 rounded-b-2xl"
              style={{ background: 'linear-gradient(180deg, #111D30, #0D1726)' }} />
            {/* Floor line */}
            <div className="absolute left-0 right-0"
              style={{ bottom: '25%', height: 2, background: 'rgba(59, 130, 246, 0.1)' }} />

            {/* Back wall details */}
            <div className="absolute top-4 left-4 right-4 h-1 rounded-full opacity-20"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)' }} />

            {/* Ambient window light */}
            <div className="absolute top-0 right-12 w-24 h-32 opacity-5"
              style={{ background: 'linear-gradient(180deg, rgba(253, 230, 138, 0.8), transparent)' }} />

            {/* Bookshelf visual */}
            <div className="absolute left-4 top-8 w-16 h-48 rounded opacity-30"
              style={{ background: 'linear-gradient(180deg, #1E293B, #0F172A)', border: '1px solid #334155' }}>
              {[0, 1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-7 mx-1 my-0.5 rounded-sm opacity-60"
                  style={{ background: ['#7C3AED', '#2563EB', '#059669', '#DC2626', '#D97706', '#06B6D4'][i] }} />
              ))}
            </div>
          </div>

          {/* Clickable objects */}
          {ROOM_OBJECTS.map((obj, i) => (
            <motion.button
              key={obj.id}
              className="absolute flex flex-col items-center gap-1.5 group"
              style={{ left: obj.x, top: obj.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
              onClick={() => setActiveObject(obj)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Open ${obj.label}`}
            >
              {/* Icon */}
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center relative"
                style={{
                  background: `${obj.color}20`,
                  border: `1px solid ${obj.color}50`,
                }}
                animate={{
                  boxShadow: [
                    `0 0 10px ${obj.color}20`,
                    `0 0 20px ${obj.color}40`,
                    `0 0 10px ${obj.color}20`,
                  ],
                }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
              >
                <div style={{ color: obj.color }}>{obj.icon}</div>

                {/* Ping indicator */}
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                  style={{ background: obj.color }}
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              </motion.div>

              {/* Label */}
              <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors font-mono hidden sm:block">
                {obj.label}
              </span>
            </motion.button>
          ))}

          {/* Hint */}
          <motion.div
            className="absolute bottom-3 right-4 text-xs text-slate-600 font-mono"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            click any object →
          </motion.div>
        </motion.div>

        {/* Short bio below room */}
        <motion.div
          className="mt-12 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          {[
            { icon: '🤖', label: 'AI First', desc: 'Every product decision starts with whether AI adds real value.' },
            { icon: '🏥', label: 'Impact Driven', desc: 'Healthcare and agriculture — where tech changes actual lives.' },
            { icon: '⚡', label: 'Ship Fast', desc: 'Iterate in the open. Perfect is the enemy of shipped.' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="glass rounded-xl p-5 border border-white/5 hover:border-blue-500/30 transition-colors text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 + i * 0.1 }}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-display font-semibold text-white text-sm mb-1">{item.label}</div>
              <div className="text-slate-500 text-xs leading-relaxed">{item.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {activeObject && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveObject(null)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div
                className="w-full max-w-md rounded-2xl p-6 border relative"
                style={{
                  background: 'rgba(12, 22, 38, 0.98)',
                  borderColor: `${activeObject.color}40`,
                  boxShadow: `0 0 40px ${activeObject.color}20`,
                }}
                role="dialog"
                aria-modal="true"
                aria-label={activeObject.title}
              >
                <button
                  onClick={() => setActiveObject(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </button>

                <h3 className="font-display font-bold text-lg text-white mb-5">
                  {activeObject.title}
                </h3>

                <div className="space-y-3">
                  {activeObject.content.map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: activeObject.color }} />
                      <div>
                        <span className="text-slate-500 text-xs">{item.label}: </span>
                        <span className="text-slate-200 text-sm">{item.value}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
