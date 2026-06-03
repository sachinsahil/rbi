'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QUOTES = [
  { text: "The trend is your friend until it ends.", author: "Ed Seykota" },
  { text: "Cut your losses short and let your profits run.", author: "Jesse Livermore" },
  { text: "Risk comes from not knowing what you are doing.", author: "Warren Buffett" },
  { text: "The market is never wrong. Opinions often are.", author: "Jesse Livermore" },
  { text: "Plan the trade. Trade the plan.", author: "Unknown" },
  { text: "In trading, the person who is right and sits tight wins.", author: "Jesse Livermore" },
  { text: "Every trader has the strategy they deserve.", author: "Ed Seykota" },
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { text: "The goal of a successful trader is to make the best trades.", author: "Mark Douglas" },
  { text: "Be patient. The market will give you opportunities.", author: "Unknown" },
]

const CANDLES = [
  { x: 36,  bodyY: 170, bodyH: 55, wickT: 155, wickB: 240, green: true  },
  { x: 68,  bodyY: 158, bodyH: 42, wickT: 145, wickB: 215, green: false },
  { x: 100, bodyY: 140, bodyH: 70, wickT: 120, wickB: 228, green: true  },
  { x: 132, bodyY: 148, bodyH: 30, wickT: 130, wickB: 195, green: true  },
  { x: 164, bodyY: 132, bodyH: 50, wickT: 115, wickB: 200, green: false },
  { x: 196, bodyY: 112, bodyH: 88, wickT: 90,  wickB: 218, green: true  },
  { x: 228, bodyY: 120, bodyH: 35, wickT: 108, wickB: 172, green: false },
  { x: 260, bodyY: 98,  bodyH: 65, wickT: 80,  wickB: 180, green: true  },
]

function CandleChart() {
  return (
    <svg width="300" height="280" viewBox="0 0 300 280">
      {/* Grid lines */}
      {[80, 130, 180, 230].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="300" y2={y} stroke="#6C3FE810" strokeWidth="1" />
      ))}

      {/* Candles */}
      {CANDLES.map((c, i) => (
        <motion.g key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.18, duration: 0.3, repeat: Infinity, repeatDelay: CANDLES.length * 0.18 + 0.8 }}
        >
          {/* Top wick */}
          <motion.line
            x1={c.x} y1={c.wickT} x2={c.x} y2={c.bodyY}
            stroke={c.green ? '#10B981' : '#EF4444'}
            strokeWidth="2" strokeLinecap="round"
            initial={{ scaleY: 0, originY: c.bodyY }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.18, duration: 0.2, repeat: Infinity, repeatDelay: CANDLES.length * 0.18 + 0.8 }}
          />
          {/* Body */}
          <motion.rect
            x={c.x - 8} y={c.bodyY} width="16" height={c.bodyH} rx="2"
            fill={c.green ? '#10B981' : '#EF4444'}
            initial={{ scaleY: 0, originY: `${c.bodyY + c.bodyH}px` }}
            animate={{ scaleY: 1 }}
            style={{ transformOrigin: `${c.x}px ${c.bodyY + c.bodyH}px` }}
            transition={{ delay: i * 0.18 + 0.1, duration: 0.25, repeat: Infinity, repeatDelay: CANDLES.length * 0.18 + 0.8 }}
          />
          {/* Bottom wick */}
          <motion.line
            x1={c.x} y1={c.bodyY + c.bodyH} x2={c.x} y2={c.wickB}
            stroke={c.green ? '#10B981' : '#EF4444'}
            strokeWidth="2" strokeLinecap="round"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            style={{ transformOrigin: `${c.x}px ${c.bodyY + c.bodyH}px` }}
            transition={{ delay: i * 0.18 + 0.15, duration: 0.2, repeat: Infinity, repeatDelay: CANDLES.length * 0.18 + 0.8 }}
          />
        </motion.g>
      ))}

      {/* Trend line */}
      <motion.polyline
        points="36,225 68,200 100,210 132,178 164,182 196,200 228,155 260,163"
        fill="none" stroke="#6C3FE8" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ delay: 1.6, duration: 1.2, repeat: Infinity, repeatDelay: 0.4 }}
      />
    </svg>
  )
}

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [quote, setQuote] = useState(QUOTES[0])

useEffect(() => {
  setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)])
}, [])
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onComplete, 800)
    }, 4000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#080810',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {/* Candle animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CandleChart />
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ textAlign: 'center', maxWidth: '400px', padding: '0 2rem' }}
          >
            <p style={{
              color: 'rgba(255,255,255,0.85)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              fontStyle: 'italic',
              lineHeight: 1.7,
              marginBottom: '0.6rem',
            }}>
              &ldquo;{quote.text}&rdquo;
            </p>
            <p style={{
              color: '#6C3FE8',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}>
              — {quote.author}
            </p>
          </motion.div>

          {/* Loading bar */}
          <motion.div style={{ width: '200px', height: '2px', background: '#6C3FE820', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3.8, ease: 'linear' }}
              style={{ height: '100%', background: '#6C3FE8', borderRadius: '2px' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
