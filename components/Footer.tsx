'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react'
import { socialLinks } from '@/config/data'

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5"
      aria-label="Footer">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="text-center sm:text-left">
            <div className="font-display font-bold text-white mb-1">
              Kartikeya Singh
              <span className="text-blue-400">.</span>
            </div>
            <div className="text-slate-500 text-sm flex items-center gap-1 justify-center sm:justify-start">
              Built with
              <Heart className="w-3 h-3 text-red-400 mx-1" aria-hidden />
              using Next.js & Framer Motion
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {[
              { icon: <Github className="w-4 h-4" />, href: socialLinks.github, label: 'GitHub' },
              { icon: <Linkedin className="w-4 h-4" />, href: socialLinks.linkedin, label: 'LinkedIn' },
              { icon: <Mail className="w-4 h-4" />, href: `mailto:${socialLinks.email}`, label: 'Email' },
            ].map(link => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/40 transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={link.label}>
                {link.icon}
              </motion.a>
            ))}
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
            whileHover={{ y: -2 }}
            aria-label="Back to top">
            <ArrowUp className="w-4 h-4" />
            Back to top
          </motion.button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-slate-600 font-mono">
          <span>© {new Date().getFullYear()} Kartikeya Singh · All rights reserved · </span>
          <span className="text-green-500/70">Status: Online ●</span>
        </div>
      </div>
    </footer>
  )
}
