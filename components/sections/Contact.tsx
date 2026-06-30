'use client'

import { useState, useRef, FormEvent } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Send, Github, Linkedin, Mail, MapPin, Coffee, CheckCircle, Loader } from 'lucide-react'
import { socialLinks } from '@/config/data'

type FormState = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormState('sending')

    // Simulate submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setFormState('success')
    setFormData({ name: '', email: '', message: '' })

    setTimeout(() => setFormState('idle'), 5000)
  }

  const updateField = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [field]: e.target.value }))

  return (
    <section id="contact" ref={ref} className="relative py-24 px-4 sm:px-6 lg:px-8"
      aria-label="Contact section">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-mono text-green-400 border border-green-500/30 bg-green-500/10 mb-4">
            📡 Open Line
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have an interesting problem? Want to collaborate? Just want to talk AI?
            My desk is always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — desk illustration + info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}>

            {/* Communication desk visual */}
            <div className="relative rounded-2xl p-6 border border-slate-700/50 mb-8 overflow-hidden"
              style={{ background: 'rgba(12, 22, 38, 0.8)' }}>
              {/* Desk lamp */}
              <div className="absolute top-4 right-6 flex flex-col items-center">
                <div className="w-0.5 h-12 bg-slate-600 mx-auto" />
                <div className="w-8 h-5 rounded-t-xl bg-slate-700 border border-slate-600 -mt-0.5 relative overflow-hidden">
                  <motion.div className="absolute inset-0 bg-yellow-300/20 rounded-t-xl"
                    animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                </div>
                {/* Lamp glow */}
                <motion.div className="absolute top-12 right-3 w-20 h-20 rounded-full blur-2xl"
                  style={{ background: 'rgba(253,230,138,0.15)' }}
                  animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 2, repeat: Infinity }} />
              </div>

              {/* Mail animation */}
              <div className="text-center mb-4">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl border border-blue-500/30 mx-auto"
                  style={{ background: 'rgba(59,130,246,0.1)' }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                  <Mail className="w-7 h-7 text-blue-400" />
                </motion.div>
              </div>

              <h3 className="font-display font-semibold text-white text-center mb-6">
                Reach me at
              </h3>

              <div className="space-y-3">
                {[
                  { icon: <Mail className="w-4 h-4" />, label: 'Email', value: socialLinks.email, href: `mailto:${socialLinks.email}`, color: '#3B82F6' },
                  { icon: <Github className="w-4 h-4" />, label: 'GitHub', value: 'github.com/Kartikeya82', href: socialLinks.github, color: '#A855F7' },
                  { icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn', value: 'in/kartikeya-singh-454645304', href: socialLinks.linkedin, color: '#0EA5E9' },
                  { icon: <MapPin className="w-4 h-4" />, label: 'Location', value: 'India 🇮🇳 · Open to Remote', href: null, color: '#4ADE80' },
                ].map(item => (
                  <motion.a
                    key={item.label}
                    href={item.href ?? undefined}
                    target={item.href ? '_blank' : undefined}
                    rel={item.href ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-white/15 transition-all group"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                    whileHover={{ x: 4 }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}20`, color: item.color }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">{item.label}</div>
                      <div className="text-sm text-slate-300 group-hover:text-white transition-colors">{item.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Availability */}
              <div className="mt-5 p-3 rounded-xl border border-green-500/20 bg-green-500/5 flex items-center gap-2">
                <motion.div className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }} />
                <span className="text-green-400 text-xs font-medium">
                  Available for internships & collaborations
                </span>
              </div>
            </div>

            {/* Fun note */}
            <div className="p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 flex items-start gap-3">
              <Coffee className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-400 text-sm">
                I respond to messages within 24 hours. Best bet:{' '}
                <span className="text-yellow-400">email</span> or{' '}
                <span className="text-blue-400">LinkedIn</span>. Chai optional but appreciated.
              </p>
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-slate-400 mb-2">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={updateField('name')}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-[#0D1A2E] border border-slate-700/50 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-slate-400 mb-2">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={updateField('email')}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#0D1A2E] border border-slate-700/50 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-slate-400 mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={updateField('message')}
                  required
                  rows={5}
                  placeholder="Tell me about your project, opportunity, or just say hello..."
                  className="w-full px-4 py-3 rounded-xl bg-[#0D1A2E] border border-slate-700/50 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm resize-none"
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={formState === 'sending' || formState === 'success'}
                className="w-full py-3 px-6 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                style={{
                  background: formState === 'success'
                    ? 'linear-gradient(135deg, #059669, #10B981)'
                    : 'linear-gradient(135deg, #2563EB, #7C3AED)',
                }}
                whileHover={formState === 'idle' ? { scale: 1.02, y: -1 } : {}}
                whileTap={formState === 'idle' ? { scale: 0.98 } : {}}>

                <AnimatePresence mode="wait">
                  {formState === 'idle' && (
                    <motion.div key="idle" className="flex items-center gap-2"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </motion.div>
                  )}
                  {formState === 'sending' && (
                    <motion.div key="sending" className="flex items-center gap-2"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </motion.div>
                  )}
                  {formState === 'success' && (
                    <motion.div key="success" className="flex items-center gap-2"
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                      <CheckCircle className="w-4 h-4" />
                      <span>Message Sent!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Paper airplane success animation */}
              <AnimatePresence>
                {formState === 'success' && (
                  <motion.div
                    className="text-center mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}>
                    <motion.div
                      className="text-3xl inline-block"
                      animate={{
                        x: [0, 50, 200],
                        y: [0, -20, -60],
                        rotate: [0, -15, -30],
                        opacity: [1, 1, 0],
                      }}
                      transition={{ duration: 1.5, delay: 0.5 }}>
                      ✈️
                    </motion.div>
                    <p className="text-green-400 text-sm mt-2">
                      Your message is on its way! I&apos;ll reply within 24 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
