'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'

const TESTIMONIALS = [
  { name: 'Arjun S.', role: 'Crypto Futures Trader', text: 'The scalping bot alone changed my game. Precise entries, disciplined exits — exactly what I needed.', stars: 5 },
  { name: 'Priya M.', role: 'Forex Trader', text: 'Radical Brothers built our signal bot from scratch. The admin panel is clean and the signals are consistently accurate.', stars: 5 },
  { name: 'Rahul K.', role: 'Telegram Community Owner', text: 'The Telegram mini app they built for us handles 10,000+ users flawlessly. Zero downtime, beautiful UI.', stars: 5 },
]

const TRUST_LOGOS = [
  'Binance', 'Bybit', 'OKX', 'TradingView', 'MetaTrader', 'Telegram'
]

export default function Trust() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Platform logos */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} className="text-center mb-16">
          <p className="text-gray-500 text-sm font-mono tracking-widest uppercase mb-8">Connected & Integrated With</p>
          <div className="flex flex-wrap justify-center gap-6">
            {TRUST_LOGOS.map((logo, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className="glass px-6 py-3 rounded-xl text-gray-400 font-semibold text-sm tracking-wide hover:text-white hover:border-purple-500/30 transition-all cursor-default">
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }} whileHover={{ y: -4 }}
              className="glass-strong rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={14} className="text-purple-400 fill-purple-400" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
              <div>
                <div className="text-white font-semibold text-sm">{t.name}</div>
                <div className="text-purple-400 font-mono text-xs">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
