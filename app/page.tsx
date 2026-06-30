'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Heavy components loaded dynamically
const Background = dynamic(() => import('@/components/Background'), { ssr: false })
const Cursor = dynamic(() => import('@/components/Cursor'), { ssr: false })
const AIAssistant = dynamic(() => import('@/components/AIAssistant'), { ssr: false })
const EasterEggs = dynamic(() => import('@/components/EasterEggs'), { ssr: false })

// Sections
import Navbar from '@/components/Navbar'
import Landing from '@/components/sections/Landing'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Timeline from '@/components/sections/Timeline'
import TerminalSection from '@/components/sections/TerminalSection'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'
import SectionDivider from '@/components/SectionDivider'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: '#08111F' }}>
      {/* Global background — canvas particles, grid, blobs */}
      <Suspense fallback={null}>
        <Background />
      </Suspense>

      {/* Custom cursor */}
      <Suspense fallback={null}>
        <Cursor />
      </Suspense>

      {/* Navigation */}
      <Navbar />

      {/* ── Sections ─────────────────────────────────────────── */}
      <div className="relative z-10">

        {/* 1. Landing — hero, character, terminal boot */}
        <Landing />

        {/* 2. About — interactive workspace room */}
        <div style={{ background: 'linear-gradient(180deg, #08111F 0%, #0A1525 100%)' }}>
          <About />
        </div>

        <SectionDivider />

        {/* 3. Skills — RPG inventory */}
        <div style={{ background: 'linear-gradient(180deg, #0A1525 0%, #08111F 100%)' }}>
          <Skills />
        </div>

        <SectionDivider flip />

        {/* 4. Projects — digital innovation lab */}
        <div style={{ background: 'linear-gradient(180deg, #08111F 0%, #0B1620 100%)' }}>
          <Projects />
        </div>

        <SectionDivider />

        {/* 5. Timeline — story so far */}
        <div style={{ background: 'linear-gradient(180deg, #0B1620 0%, #08111F 100%)' }}>
          <Timeline />
        </div>

        <SectionDivider flip />

        {/* 6. Terminal — interactive command line */}
        <div style={{ background: 'linear-gradient(180deg, #08111F 0%, #0A1825 100%)' }}>
          <TerminalSection />
        </div>

        <SectionDivider />

        {/* 7. Contact — communication desk */}
        <div style={{ background: 'linear-gradient(180deg, #0A1825 0%, #08111F 100%)' }}>
          <Contact />
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* ── Global overlays ───────────────────────────────────── */}

      {/* Floating AI assistant robot */}
      <Suspense fallback={null}>
        <AIAssistant />
      </Suspense>

      {/* Easter eggs and achievements */}
      <Suspense fallback={null}>
        <EasterEggs />
      </Suspense>
    </main>
  )
}
