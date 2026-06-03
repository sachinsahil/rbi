'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  const toggle = () => {
    const newDark = !isDark
    setIsDark(newDark)
    if (newDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      style={{
        width: '52px',
        height: '28px',
        borderRadius: '14px',
        background: isDark ? '#1A1030' : '#E8E8F0',
        border: `2px solid ${isDark ? '#9CA3AF' : '#9CA3AF'}`,
        position: 'relative',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      {/* Sliding pill */}
      <motion.div
        animate={{ x: isDark ? 3 : 26 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        style={{
          position: 'absolute',
          top: '2px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: isDark ? '#10B981' : '#B91C1C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Candle inside pill */}
        <svg width="8" height="14" viewBox="0 0 8 14">
          <line x1="4" y1="0" x2="4" y2="2"
            stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
          <rect x="1" y="2" width="6" height="8" rx="1"
            fill="white" opacity="0.9"/>
          <line x1="4" y1="10" x2="4" y2="14"
            stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </motion.div>

      {/* Opposite candle hint */}
      <div style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: isDark ? '4px' : 'auto',
        left: isDark ? 'auto' : '4px',
        opacity: 0.3,
      }}>
        <svg width="8" height="14" viewBox="0 0 8 14">
          <line x1="4" y1="0" x2="4" y2="2"
            stroke={isDark ? '#B91C1C' : '#10B981'}
            strokeWidth="1.2" strokeLinecap="round"/>
          <rect x="1" y="2" width="6" height="8" rx="1"
            fill={isDark ? '#B91C1C' : '#10B981'}/>
          <line x1="4" y1="10" x2="4" y2="14"
            stroke={isDark ? '#B91C1C' : '#10B981'}
            strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>
    </motion.button>
  )
}