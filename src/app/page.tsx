'use client'
import { useState } from 'react'
import ThemeToggle from '@/components/ui/ThemeToggle'
import Navbar from '@/components/layout/Navbar'
import Preloader from '@/components/sections/Preloader'
import Hero from '@/components/sections/Hero'
import Trust from '@/components/sections/Trust'
import About from '@/components/sections/About'
import Markets from '@/components/sections/Markets'
import Trading from '@/components/sections/Trading'
import Features from '@/components/sections/Features'
import Demo from '@/components/sections/Demo'
import Tech from '@/components/sections/Tech'
import { PassiveIncome, Contact, Closing } from '@/components/sections/Misc'



export default function Home() {
  const [loading, setLoading] = useState(true)
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{background: 'var(--bg, #0D0D1A)', transition: 'background 0.4s ease'}}>
      
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Navbar />
      <Hero />
      <Trust />
      <About />
      <Markets />
      <Trading />
      <Features />
      <Demo />
      <Tech />
      <PassiveIncome />
      <Contact />
      <Closing />
      {/* Footer */}
      <footer className="border-t border-purple-500/10 py-8 px-4 text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-gray-600 tracking-widest">RADICAL BROTHERS INC.</span>
          <span className="font-mono text-xs text-gray-700">© 2025 · All Rights Reserved</span>
          <span className="font-mono text-xs text-purple-500/40 tracking-[4px]">TRADE · BUILD · COMPOUND</span>
        </div>
      </footer>
      {/* Bottom padding for mobile nav */}
      <div className="h-20 md:h-0" />
    </main>
  )
}
