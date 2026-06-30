'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { subscribeToast } from '@/lib/toast'

interface ToastItem {
  id: number
  message: string
}

export default function Toast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    let counter = 0
    return subscribeToast((message) => {
      const id = ++counter
      setToasts(prev => [...prev, { id, message }])
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000)
    })
  }, [])

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            className="px-5 py-3 rounded-xl border border-white/10 text-sm text-white shadow-xl whitespace-nowrap"
            style={{ background: 'rgba(8, 15, 26, 0.97)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
