'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      dot.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`

      const over = document.elementFromPoint(e.clientX, e.clientY)
      const isInteractive = over?.closest('a, button, input, textarea, [role="button"], [tabindex]')
      if (isInteractive) {
        dot.style.width = '20px'
        dot.style.height = '20px'
        dot.style.background = 'rgba(168, 85, 247, 0.8)'
        ring.style.width = '48px'
        ring.style.height = '48px'
        ring.style.borderColor = 'rgba(168, 85, 247, 0.4)'
      } else {
        dot.style.width = '12px'
        dot.style.height = '12px'
        dot.style.background = 'rgba(96, 165, 250, 0.9)'
        ring.style.width = '36px'
        ring.style.height = '36px'
        ring.style.borderColor = 'rgba(59, 130, 246, 0.4)'
      }
    }

    const animateRing = () => {
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.12
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.12
      ring.style.transform = `translate(${ringPosRef.current.x - 18}px, ${ringPosRef.current.y - 18}px)`
      rafRef.current = requestAnimationFrame(animateRing)
    }

    document.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animateRing)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: 'rgba(96, 165, 250, 0.9)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.15s, height 0.15s, background 0.15s',
          mixBlendMode: 'screen',
          top: 0,
          left: 0,
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(59, 130, 246, 0.4)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
          top: 0,
          left: 0,
          willChange: 'transform',
        }}
      />
    </>
  )
}
