'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, Shield, Target, Zap } from 'lucide-react'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const pillars = [
    { icon: Target, label: '10 Years', sub: 'of Experience', desc: 'A decade of learning, building, and evolving — turning experience into an ecosystem that empowers traders and creates real opportunities.' },
    { icon: Shield, label: 'One Mission', sub: 'Create Value', desc: 'Built on experience. Driven by purpose. Every system, every strategy, every line of code serves one goal: sustainable value creation.' },
  ]

  return (
    <section id="about" ref={ref} className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(108,63,232,0.06) 0%, transparent 70%)' }} />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-purple-400 text-sm font-mono mb-6">
            <Users size={14} /> Who We Are
          </div>
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(108,63,232,0.15)', border: '1px solid rgba(108,63,232,0.3)' }}>
            <Users size={36} className="text-purple-400" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          className="text-center mb-12">
          <h2 className="font-black mb-6 leading-tight" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            We are a collective of traders, builders, and innovators working at the intersection of markets and technology.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-3xl mx-auto mb-4">
            For the past 10 years, we&apos;ve been learning, building, and evolving — turning experience into an ecosystem that empowers traders and creates real opportunities.
          </p>
          <p className="text-purple-300 font-semibold text-lg">Built on experience. Driven by purpose.</p>
          <motion.a href="#markets" whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold mt-3 transition-colors">
            Discover Our Story →
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div key={i} initial={{ opacity: 0, x: i === 0 ? -30 : 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15 }} whileHover={{ scale: 1.02 }}
                className="glass-strong rounded-2xl p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-700/30 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-purple-400" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{p.label}</div>
                  <div className="text-purple-400 text-sm font-mono mb-2">{p.sub}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
