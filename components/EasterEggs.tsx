'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useKonamiCode } from '@/hooks/useKonamiCode'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
}

const ACHIEVEMENTS: Record<string, Achievement> = {
  konami: {
    id: 'konami',
    title: 'Code Warrior',
    description: 'You know the Konami Code! Respect. 🎮',
    icon: '🎮',
  },
  coffee: {
    id: 'coffee',
    title: 'Caffeine Addict',
    description: "You clicked the coffee 5 times. Are you okay? ☕",
    icon: '☕',
  },
  explorer: {
    id: 'explorer',
    title: 'Deep Diver',
    description: 'You scrolled all the way down. Respect! 🏊',
    icon: '🏊',
  },
  terminal: {
    id: 'terminal',
    title: 'Shell Master',
    description: 'You typed in the terminal. You\'re one of us! 💻',
    icon: '💻',
  },
  duck: {
    id: 'duck',
    title: 'Duck Hunter',
    description: 'You found the hidden rubber duck! 🦆',
    icon: '🦆',
  },
}

export default function EasterEggs() {
  const [activeAchievement, setActiveAchievement] = useState<Achievement | null>(null)
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set())
  const [duckVisible, setDuckVisible] = useState(false)
  const [duckPos, setDuckPos] = useState({ x: 0, y: 0 })
  const [devModeOn, setDevModeOn] = useState(false)

  const unlock = useCallback((id: string) => {
    if (unlockedIds.has(id)) return
    const achievement = ACHIEVEMENTS[id]
    if (!achievement) return
    setUnlockedIds(prev => new Set([...prev, id]))
    setActiveAchievement(achievement)
    setTimeout(() => setActiveAchievement(null), 4000)
  }, [unlockedIds])

  // Konami code
  useKonamiCode(() => {
    unlock('konami')
    setDevModeOn(true)
    setTimeout(() => setDevModeOn(false), 5000)
  })

  // Duck appears randomly
  useEffect(() => {
    const showDuck = () => {
      if (Math.random() > 0.7) {
        setDuckPos({
          x: Math.random() * (window.innerWidth - 100),
          y: Math.random() * (window.innerHeight - 100) + 100,
        })
        setDuckVisible(true)
        setTimeout(() => setDuckVisible(false), 4000)
      }
    }

    const interval = setInterval(showDuck, 45000)
    const timer = setTimeout(showDuck, 20000)
    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  // Listen for terminal usage (coffee counter)
  useEffect(() => {
    let coffeeClicks = 0

    const handleCoffeeClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-coffee]')) {
        coffeeClicks++
        if (coffeeClicks >= 5) {
          unlock('coffee')
          coffeeClicks = 0
        }
      }
    }

    const handleScrollBottom = () => {
      const scrolled = window.scrollY + window.innerHeight
      const total = document.documentElement.scrollHeight
      if (scrolled >= total - 50) unlock('explorer')
    }

    window.addEventListener('click', handleCoffeeClick)
    window.addEventListener('scroll', handleScrollBottom, { passive: true })
    return () => {
      window.removeEventListener('click', handleCoffeeClick)
      window.removeEventListener('scroll', handleScrollBottom)
    }
  }, [unlock])

  return (
    <>
      {/* Achievement notification */}
      <AnimatePresence>
        {activeAchievement && (
          <motion.div
            className="fixed top-20 right-4 z-50 flex items-center gap-3 p-4 rounded-2xl border border-yellow-500/40 shadow-[0_0_30px_rgba(245,158,11,0.3)] max-w-xs"
            style={{ background: 'rgba(8, 17, 31, 0.95)' }}
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            role="alert"
            aria-live="polite">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-xl flex-shrink-0">
              {activeAchievement.icon}
            </div>
            <div>
              <div className="text-xs text-yellow-400 font-mono mb-0.5">🏆 Achievement Unlocked!</div>
              <div className="text-sm font-display font-bold text-white">{activeAchievement.title}</div>
              <div className="text-xs text-slate-400">{activeAchievement.description}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden rubber duck */}
      <AnimatePresence>
        {duckVisible && (
          <motion.button
            className="fixed z-30 text-3xl cursor-pointer select-none"
            style={{ left: duckPos.x, top: duckPos.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ y: { duration: 2, repeat: Infinity }, scale: { duration: 0.3 } }}
            onClick={() => {
              setDuckVisible(false)
              unlock('duck')
            }}
            aria-label="Click the rubber duck!"
            title="🦆 Click me!">
            🦆
          </motion.button>
        )}
      </AnimatePresence>

      {/* Dev mode overlay (Konami code) */}
      <AnimatePresence>
        {devModeOn && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className="absolute inset-x-0 top-16 flex justify-center">
              <div className="px-6 py-3 rounded-2xl font-mono text-sm text-green-400 border border-green-500/40"
                style={{ background: 'rgba(4, 20, 8, 0.95)' }}>
                <div className="flex items-center gap-2">
                  <motion.div className="w-2 h-2 rounded-full bg-green-400"
                    animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.5, repeat: Infinity }} />
                  DEV MODE ACTIVATED — &lt;Konami Code Detected&gt; 🎮
                </div>
              </div>
            </div>
            {/* Scanline effect */}
            <motion.div
              className="absolute inset-x-0 h-px bg-green-400 opacity-30"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
