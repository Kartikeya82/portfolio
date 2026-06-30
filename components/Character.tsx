'use client'

import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export type CharacterAnimation = 'idle' | 'typing' | 'waving' | 'thinking' | 'celebrating' | 'looking' | 'jumping'

interface CharacterProps {
  animation?: CharacterAnimation
  size?: number
  className?: string
  showDesk?: boolean
}

export interface CharacterRef {
  triggerAnimation: (anim: CharacterAnimation) => void
}

const Character = forwardRef<CharacterRef, CharacterProps>(
  ({ animation = 'idle', size = 280, className = '', showDesk = false }, ref) => {
    const [currentAnim, setCurrentAnim] = useState<CharacterAnimation>(animation)

    useImperativeHandle(ref, () => ({
      triggerAnimation: (anim: CharacterAnimation) => {
        setCurrentAnim(anim)
        if (anim !== 'idle') setTimeout(() => setCurrentAnim('idle'), 2500)
      },
    }))

    useEffect(() => { setCurrentAnim(animation) }, [animation])

    const floatVariants = {
      idle: {
        y: [0, -8, 0] as number[],
        transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      },
      typing: {
        y: [0, -2, 0] as number[],
        transition: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' },
      },
      waving: {
        y: [0, -6, 0] as number[],
        rotate: [0, 2, -1, 2, 0] as number[],
        transition: { duration: 0.9, repeat: Infinity, ease: 'easeInOut' },
      },
      thinking: {
        y: [0, -4, 0] as number[],
        x: [0, 3, 0] as number[],
        transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
      },
      celebrating: {
        y: [0, -14, 0, -9, 0] as number[],
        rotate: [0, -2.5, 0, 2.5, 0] as number[],
        transition: { duration: 0.65, repeat: Infinity, ease: 'easeOut' },
      },
      looking: {
        y: [0, -5, 0] as number[],
        transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
      },
      jumping: {
        y: [0, -22, 0] as number[],
        transition: { duration: 0.5, repeat: 3, ease: 'easeOut' },
      },
    }

    const particles = [
      { l: '8%',  t: '20%', delay: 0   },
      { l: '88%', t: '15%', delay: 0.7 },
      { l: '15%', t: '75%', delay: 1.3 },
      { l: '85%', t: '70%', delay: 0.4 },
      { l: '50%', t: '5%',  delay: 1.0 },
      { l: '5%',  t: '50%', delay: 0.8 },
      { l: '95%', t: '45%', delay: 0.3 },
    ]

    return (
      <div className={`relative select-none ${className}`} style={{ width: size, height: size }}>

        {/* Deep ambient glow — behind everything */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: '-30%',
            background: 'radial-gradient(ellipse, rgba(59,130,246,0.28) 0%, rgba(139,92,246,0.12) 50%, transparent 75%)',
            filter: 'blur(24px)',
          }}
        />

        {/* Floating tech particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400 pointer-events-none"
            style={{ left: p.l, top: p.t }}
            animate={{ y: [0, -8, 0], opacity: [0.25, 0.65, 0.25] }}
            transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}

        {/* Avatar wrapper — carries float + hover scale */}
        <motion.div
          variants={floatVariants}
          animate={currentAnim}
          whileHover={{ scale: 1.03 }}
          style={{ width: size, height: size, position: 'relative' }}
          className="z-10"
        >
          {/* Pulsing glow halo — outermost, blurred */}
          <motion.div
            style={{
              position: 'absolute',
              inset: -12,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(139,92,246,0.2) 55%, transparent 78%)',
              filter: 'blur(10px)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
            animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.96, 1.04, 0.96] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Spinning conic-gradient ring */}
          <motion.div
            style={{
              position: 'absolute',
              inset: -4,
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, #3B82F6, #8B5CF6, #06B6D4, #3B82F6)',
              zIndex: 1,
              pointerEvents: 'none',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
          />

          {/* Circular image — perfectly clipped, object-cover centered */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              overflow: 'hidden',
              zIndex: 10,
            }}
          >
            <Image
              src="/images/avatar.png"
              alt="Kartikeya Singh"
              fill
              priority
              sizes={`${size}px`}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>

          {/* Glass ring — inner highlight + subtle vignette */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.18), inset 0 0 40px rgba(0,0,0,0.25)',
              zIndex: 20,
              pointerEvents: 'none',
            }}
          />
        </motion.div>

        {/* Waving hand */}
        {currentAnim === 'waving' && (
          <motion.span
            className="absolute pointer-events-none z-30"
            style={{ right: '-8%', top: '40%', fontSize: size * 0.14 }}
            animate={{ rotate: [0, 18, -10, 18, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            👋
          </motion.span>
        )}

        {/* Celebration bursts */}
        {currentAnim === 'celebrating' && ['✨', '⭐', '🎉'].map((e, i) => (
          <motion.span
            key={i}
            className="absolute pointer-events-none z-30"
            style={{ left: `${[8, 72, 44][i]}%`, top: `${[14, 8, 4][i]}%`, fontSize: size * 0.1 }}
            animate={{ y: [0, -18, 0], opacity: [1, 0.5, 1], rotate: [0, 20, -20, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.18 }}
          >
            {e}
          </motion.span>
        ))}

        {/* Thinking bubble */}
        {currentAnim === 'thinking' && (
          <motion.span
            className="absolute pointer-events-none z-30 text-blue-400 font-mono text-xs font-bold"
            style={{ right: '4%', top: '18%' }}
            animate={{ opacity: [0, 1, 0], y: [0, -12, -24] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            {'{ }'}
          </motion.span>
        )}

        {showDesk && (
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-lg opacity-60"
            style={{
              width: size * 1.4,
              height: 8,
              background: 'linear-gradient(180deg, #334155, #1E293B)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          />
        )}
      </div>
    )
  }
)

Character.displayName = 'Character'
export default Character
