'use client'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Target, TrendingUp, Bot, Zap, Bell, Grid3X3, ArrowDownUp, Layers } from 'lucide-react'

const STRATEGIES = [
  { icon: Target, title: 'Scalping', sub: 'Short-term precision. Quick execution.', desc: 'Lightning-fast entries on 1m–5m timeframes exploiting micro-inefficiencies in order flow.', items: ['1–5 minute timeframes', 'High win-rate setups only', 'Tight stop-loss discipline', 'Volume & order flow analysis'], color: '#8B5CF6' },
  { icon: TrendingUp, title: 'Swing Trading', sub: 'Capture trends. Maximize moves.', desc: 'Multi-day positions riding macro waves with high conviction trend-reversal entries.', items: ['4H–Weekly timeframes', 'Support/resistance confluence', 'Macro catalyst awareness', 'R:R minimum 1:3'], color: '#6C3FE8' },
  { icon: Bot, title: 'Trading Bots', sub: 'Automated. Emotionless. Efficient.', desc: 'Algorithmic systems running 24/7. Strategy trigger to execution in milliseconds.', items: ['Auto-execute on signal', 'Grid & DCA strategies', 'Arbitrage detection', 'Risk-managed always'], color: '#A78BFA' },
]

const BOTS = [
  { icon: Zap, title: 'Auto-Execute Bot', desc: '24/7 automated order placement when all predefined criteria are met.', tags: ['API Connected', 'Risk Managed', '24/7 Active'] },
  { icon: Bell, title: 'Signal Alert Bot', desc: 'Identifies setups and sends real-time trade alerts via Telegram with entry, SL, and TP.', tags: ['Telegram Alert', 'Entry/SL/TP', 'Instant Push'] },
  { icon: Grid3X3, title: 'Grid Trading Bot', desc: 'Places a grid of buy/sell orders at intervals. Profits from sideways markets.', tags: ['Range Markets', 'DCA Logic', 'Passive'] },
  { icon: ArrowDownUp, title: 'DCA Bot', desc: 'Dollar-cost averaging bot accumulating positions at optimal intervals.', tags: ['Accumulation', 'Long-term', 'Risk Reduction'] },
  { icon: Layers, title: 'Arbitrage Bot', desc: 'Detects price discrepancies across exchanges and captures risk-free spreads.', tags: ['Cross-Exchange', 'Low Risk', 'High Frequency'] },
  { icon: TrendingUp, title: 'Trend Bot', desc: 'Follows dominant market direction with EMA systems and trailing stop management.', tags: ['Trend Following', 'EMA', 'Trailing Stop'] },
]

const TABS = ['Strategies', 'Trading Bots', 'Signals']

export default function Trading() {
  const [tab, setTab] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="trading" ref={ref} className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-purple-400 text-sm font-mono mb-6">
            <Target size={14} /> How We Trade
          </div>
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(108,63,232,0.15)', border: '1px solid rgba(108,63,232,0.3)' }}>
            <Target size={36} className="text-purple-400" />
          </div>
          <h2 className="font-black mb-3 leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            <span className="text-white">Discipline. Strategy. </span><span className="text-gradient">Technology.</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">Our trading style is a blend of proven strategies and smart automation.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="glass-strong rounded-2xl p-1 flex gap-1">
            {TABS.map((t, i) => (
              <button key={i} onClick={() => setTab(i)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${tab === i ? 'bg-purple-700 text-white glow-purple-sm' : 'text-gray-400 hover:text-white'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {tab === 0 && (
            <motion.div key="strat" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STRATEGIES.map((s, i) => {
                const Icon = s.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }}
                    className="glass-strong rounded-2xl p-6 group">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${s.color}20`, border: `1px solid ${s.color}40` }}>
                      <Icon size={26} style={{ color: s.color }} />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-1">{s.title}</h3>
                    <p className="font-mono text-xs mb-3" style={{ color: s.color }}>{s.sub}</p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                    <ul className="space-y-2">
                      {s.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                          <span style={{ color: s.color }}>→</span> {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

          {tab === 1 && (
            <motion.div key="bots" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BOTS.map((b, i) => {
                const Icon = b.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }} whileHover={{ y: -4, scale: 1.02 }}
                    className="glass-strong rounded-2xl p-5 cursor-default">
                    <div className="w-10 h-10 rounded-xl bg-purple-700/30 border border-purple-500/30 flex items-center justify-center mb-3">
                      <Icon size={18} className="text-purple-400" />
                    </div>
                    <h3 className="text-white font-bold text-base mb-2">{b.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">{b.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {b.tags.map((t, j) => (
                        <span key={j} className="text-xs font-mono px-2 py-0.5 rounded-lg text-purple-400 bg-purple-700/20 border border-purple-500/20">{t}</span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

          {tab === 2 && (
            <motion.div key="signals" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Signal Distribution', featured: true, desc: 'High-conviction trade setups delivered directly to subscribers via Telegram. Every signal includes full context.', items: ['Asset pair & direction (Long/Short)', 'Entry zone with precision levels', 'Stop-loss placement', 'Take-profit targets (TP1, TP2, TP3)', 'Risk-to-reward ratio displayed', 'Market context & reasoning'] },
                { title: 'Signal Infrastructure', featured: false, desc: 'Built on our proprietary Telegram bot architecture — signals are pushed instantly the moment a setup triggers.', items: ['Zero-delay Telegram push', 'Formatted signal cards', 'Win-rate tracking & reporting', 'Multi-channel broadcast', 'Admin dashboard control', 'Subscriber management'] },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: i === 0 ? -20 : 20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`rounded-2xl p-6 ${s.featured ? 'border border-purple-500/40 bg-purple-900/10' : 'glass-strong'}`}>
                  <h3 className="text-white font-bold text-xl mb-3">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <ul className="space-y-2">
                    {s.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-300 border-b border-white/5 pb-2">
                        <span className="text-purple-400">→</span> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
