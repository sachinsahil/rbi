'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Bitcoin, DollarSign, Gem, Bot, Leaf, TrendingUp } from 'lucide-react'

const MARKETS = [
  {
    icon: Bitcoin,
    title: 'Crypto Futures',
    subtitle: 'High volatility. High opportunity.',
    desc: 'Perpetual and quarterly futures on BTC, ETH, SOL and more. Long and short positions with precision risk management.',
    tags: ['Perpetuals', 'Long/Short', 'Leverage', '24/7'],
    chart: [30, 45, 35, 60, 50, 75, 65, 80, 70, 90, 85, 95],
    color: 'from-orange-500/20 to-yellow-500/10',
    accent: '#F59E0B',
  },
  {
    icon: DollarSign,
    title: 'Forex',
    subtitle: 'Global markets. 24/5. Precision and consistency.',
    desc: 'Major and minor currency pairs traded with macroeconomic intelligence and technical precision.',
    tags: ['EUR/USD', 'GBP/USD', 'Majors', 'Swing'],
    chart: [50, 48, 55, 52, 60, 58, 65, 62, 68, 66, 72, 70],
    color: 'from-blue-500/20 to-cyan-500/10',
    accent: '#3B82F6',
  },
  {
    icon: Gem,
    title: 'Gold (XAU/USD)',
    subtitle: 'The ultimate store of value.',
    desc: 'Safe haven asset trading driven by macro events, DXY correlation, and inflation cycles.',
    tags: ['XAU/USD', 'Macro Driven', 'Hedge', 'Store of Value'],
    chart: [60, 65, 62, 70, 68, 75, 73, 80, 78, 85, 82, 88],
    color: 'from-yellow-500/20 to-amber-500/10',
    accent: '#D4A843',
  },
]

function MiniChart({ data, accent }: { data: number[]; accent: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 120, h = 40
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * h
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs>
        <linearGradient id={`cg-${accent.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Markets() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="markets" ref={ref} className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-purple-400 text-sm font-mono mb-6">
            <TrendingUp size={14} /> What We Trade
          </div>
          <h2 className="font-black mb-4 leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <span className="text-white">Markets We </span>
            <span className="text-gradient">Dominate</span>
          </h2>
          <p className="text-purple-400 text-lg font-semibold mb-3">Crypto futures, Forex, Gold</p>
          <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
            We focus on the most liquid and opportunity-rich markets. Volatility is our playground.
          </p>
          <p className="text-white font-bold text-xl mt-6 italic">
            We don&apos;t follow the markets.<br />We dominate them.
          </p>
        </motion.div>

        {/* Market cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {MARKETS.map((market, i) => {
            const Icon = market.icon
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-strong rounded-2xl p-6 cursor-default group relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${market.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${market.accent}20`, border: `1px solid ${market.accent}40` }}>
                      <Icon size={22} style={{ color: market.accent }} />
                    </div>
                    <MiniChart data={market.chart} accent={market.accent} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-1">{market.title}</h3>
                  <p className="text-xs font-mono mb-3" style={{ color: market.accent }}>{market.subtitle}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{market.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {market.tags.map((t, j) => (
                      <span key={j} className="text-xs font-mono px-2 py-1 rounded-lg" style={{ background: `${market.accent}15`, color: market.accent, border: `1px solid ${market.accent}25` }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }} className="text-center">
          <motion.a href="#trading" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-base transition-all glow-purple">
            See How We Trade <TrendingUp size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
