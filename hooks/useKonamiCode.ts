'use client'

import { useState, useEffect, useCallback } from 'react'

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export function useKonamiCode(onSuccess: () => void) {
  const [sequence, setSequence] = useState<string[]>([])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      setSequence(prev => {
        const next = [...prev, e.key].slice(-KONAMI_CODE.length)
        if (next.join(',') === KONAMI_CODE.join(',')) {
          onSuccess()
          return []
        }
        return next
      })
    },
    [onSuccess]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

export function useCoffeeCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem('coffee-count')
    if (stored) setCount(parseInt(stored))
  }, [])

  const increment = useCallback(() => {
    setCount(prev => {
      const next = prev + 1
      localStorage.setItem('coffee-count', String(next))
      return next
    })
  }, [])

  return { count, increment }
}
