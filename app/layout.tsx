import type { Metadata } from 'next'
import './globals.css'
import Toast from '@/components/Toast'

export const metadata: Metadata = {
  metadataBase: new URL('https://kartikeyasingh.dev'),
  title: 'Kartikeya Singh — AI Engineer & Full Stack Developer',
  description:
    'AI Engineer, Full Stack Developer, and Data Science Student building intelligent systems that solve real-world problems. Specializing in LLMs, RAG systems, healthcare AI, and automation.',
  keywords: [
    'Kartikeya Singh',
    'AI Engineer',
    'Full Stack Developer',
    'Data Science',
    'LLM',
    'RAG',
    'Machine Learning',
    'Next.js',
    'Python',
    'Portfolio',
  ],
  authors: [{ name: 'Kartikeya Singh', url: 'https://kartikeyasingh.dev' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kartikeyasingh.dev',
    title: 'Kartikeya Singh — AI Engineer & Full Stack Developer',
    description:
      'Building intelligent systems that solve real-world problems.',
    siteName: 'Kartikeya Singh Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kartikeya Singh Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kartikeya Singh — AI Engineer & Full Stack Developer',
    description: 'Building intelligent systems that solve real-world problems.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#08111F" />
      </head>
      <body className="bg-bg text-slate-200 antialiased">
        {children}
        <Toast />
      </body>
    </html>
  )
}
