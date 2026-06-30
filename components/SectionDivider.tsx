'use client'

interface SectionDividerProps {
  flip?: boolean
}

export default function SectionDivider({ flip = false }: SectionDividerProps) {
  return (
    <div className={`relative w-full h-16 pointer-events-none ${flip ? 'rotate-180' : ''}`}
      aria-hidden="true">
      <svg viewBox="0 0 1440 64" xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <path
          d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z"
          fill="rgba(18, 29, 47, 0.4)"
        />
        <path
          d="M0,48 C480,16 960,64 1440,48 L1440,64 L0,64 Z"
          fill="rgba(8, 17, 31, 0.3)"
        />
      </svg>
      {/* Glowing line */}
      <div className="absolute top-8 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.2), rgba(124,58,237,0.2), transparent)' }} />
    </div>
  )
}
