'use client'

import { useEffect, useRef, memo } from 'react'
import { codeSnippets, randomBetween, randomInt } from '@/lib/utils'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
  type: 'star' | 'dot'
}

interface CodeSnippet {
  x: number
  y: number
  text: string
  speed: number
  opacity: number
  fontSize: number
}

const PARTICLE_COLORS = [
  'rgba(96, 165, 250, ',
  'rgba(168, 85, 247, ',
  'rgba(34, 211, 238, ',
  'rgba(74, 222, 128, ',
]

function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let codeItems: CodeSnippet[] = []
    let width = window.innerWidth
    let height = window.innerHeight

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      initParticles()
    }

    const initParticles = () => {
      const count = Math.min(Math.floor((width * height) / 18000), 80)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: randomBetween(0.5, 2.5),
        speedX: randomBetween(-0.15, 0.15),
        speedY: randomBetween(-0.2, -0.05),
        opacity: randomBetween(0.2, 0.8),
        color: PARTICLE_COLORS[randomInt(0, PARTICLE_COLORS.length - 1)],
        type: Math.random() > 0.3 ? 'star' : 'dot',
      }))

      const codeCount = Math.min(Math.floor(width / 200), 8)
      codeItems = Array.from({ length: codeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        text: codeSnippets[randomInt(0, codeSnippets.length - 1)],
        speed: randomBetween(0.2, 0.6),
        opacity: randomBetween(0.03, 0.08),
        fontSize: randomInt(10, 13),
      }))
    }

    const drawGrid = () => {
      const gridSize = 40
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.04)'
      ctx.lineWidth = 1

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    }

    const drawBlobs = (time: number) => {
      const blobs = [
        { x: width * 0.15, y: height * 0.2, r: 300, color: 'rgba(124, 58, 237, 0.04)' },
        { x: width * 0.85, y: height * 0.3, r: 250, color: 'rgba(59, 130, 246, 0.04)' },
        { x: width * 0.5, y: height * 0.7, r: 350, color: 'rgba(6, 182, 212, 0.03)' },
      ]

      blobs.forEach((blob, i) => {
        const offsetX = Math.sin(time * 0.0003 + i * 2) * 30
        const offsetY = Math.cos(time * 0.0004 + i * 1.5) * 20
        const grad = ctx.createRadialGradient(
          blob.x + offsetX, blob.y + offsetY, 0,
          blob.x + offsetX, blob.y + offsetY, blob.r
        )
        grad.addColorStop(0, blob.color)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(blob.x + offsetX, blob.y + offsetY, blob.r, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height)

      drawGrid()
      drawBlobs(time)

      // Draw particles
      particles.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.y < -10) p.y = height + 10
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        const twinkle = 0.5 + 0.5 * Math.sin(time * 0.002 + p.x * 0.01)
        ctx.globalAlpha = p.opacity * twinkle

        if (p.type === 'star') {
          ctx.fillStyle = p.color + '1)'
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()

          if (p.size > 1.5) {
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4)
            grad.addColorStop(0, p.color + '0.3)')
            grad.addColorStop(1, 'transparent')
            ctx.fillStyle = grad
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2)
            ctx.fill()
          }
        } else {
          ctx.fillStyle = p.color + '0.6)'
          ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)
        }
      })

      // Draw code snippets
      ctx.font = `${codeItems[0]?.fontSize || 12}px 'JetBrains Mono', monospace`
      codeItems.forEach(item => {
        item.y += item.speed
        if (item.y > height + 50) {
          item.y = -50
          item.x = Math.random() * width
          item.text = codeSnippets[randomInt(0, codeSnippets.length - 1)]
        }
        ctx.globalAlpha = item.opacity
        ctx.fillStyle = 'rgba(96, 165, 250, 1)'
        ctx.font = `${item.fontSize}px 'JetBrains Mono', monospace`
        ctx.fillText(item.text, item.x, item.y)
      })

      ctx.globalAlpha = 1
      animFrameRef.current = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}

export default memo(BackgroundCanvas)
