'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, BarChart2, TrendingUp, Code2, User, Menu, X, Bell } from 'lucide-react'
import RBILogo from '@/components/ui/RBILogo'
import ThemeToggle from '@/components/ui/ThemeToggle'

const navLinks = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'Markets', href: '#markets', icon: BarChart2 },
  { label: 'Trading', href: '#trading', icon: TrendingUp },
  { label: 'Tech', href: '#tech', icon: Code2 },
  { label: 'Account', href: '#contact', icon: User },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleNav = (label: string, href: string) => {
    setActive(label)
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* DESKTOP NAV - top */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between px-8 py-4 transition-all duration-300 ${
          scrolled ? 'glass-strong' : 'bg-transparent'
        }`}
      >
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <div style={{ position: 'relative', top: '-4px', left: '4px' }}>
            <RBILogo size={36} />
          </div>
          <div>
         <div className="text-white font-bold text-sm tracking-widest leading-none">
            RADICAL BROTHERS <span className="text-purple-400">INC.</span>
         </div>
       <div className="text-purple-400 text-[9px] tracking-[3px] uppercase font-mono">Financial Ecosystem</div>
       </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.label, link.href)}
              className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 rounded-xl ${
                active === link.label ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {active === link.label && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-purple-700/30 rounded-xl border border-purple-500/30"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Bell size={18} />
          </button>
            <ThemeToggle />
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNav('Account', '#contact')}
            className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-sm font-semibold tracking-wide transition-all duration-200 glow-purple-sm"
          >
            Work With Us
          </motion.button>
        </div>
      </motion.nav>

      {/* MOBILE TOP BAR */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 flex md:hidden items-center justify-between px-4 py-3 glass-strong"
      >
        <div className="flex items-center gap-2">
          <div style={{ position: 'relative', top: '-2px', left: '4px' }}>
            <RBILogo size={28} />
          </div>
          <div>
       <div className="text-white font-bold text-sm tracking-wider leading-none">
           RADICAL BROTHERS <span className="text-purple-400">INC.</span>
       </div>
       <div className="text-purple-400 text-[9px] tracking-[3px] uppercase font-mono">Financial Ecosystem</div>
       </div>
        </div>
        <div className="flex items-center gap-3">
          <Bell size={18} className="text-gray-400" />
          <ThemeToggle />
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-400">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-14 left-4 right-4 z-40 glass-strong rounded-2xl p-4 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.label, link.href)}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-purple-700/20 text-gray-300 hover:text-white transition-all"
              >
                <link.icon size={18} className="text-purple-400" />
                <span className="font-medium">{link.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE BOTTOM NAV */}
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden items-center justify-around px-2 py-2 glass-strong border-t border-purple-500/20"
      >
        {navLinks.map((link) => {
          const Icon = link.icon
          const isActive = active === link.label
          return (
            <button
              key={link.label}
              onClick={() => handleNav(link.label, link.href)}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all"
            >
              <div className={`relative p-1.5 rounded-lg transition-all ${isActive ? 'bg-purple-700/40' : ''}`}>
                <Icon size={20} className={isActive ? 'text-purple-400' : 'text-gray-500'} />
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-dot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400"
                  />
                )}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'text-purple-400' : 'text-gray-500'}`}>
                {link.label}
              </span>
            </button>
          )
        })}
      </motion.nav>
    </>
  )
}
