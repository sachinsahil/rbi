'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Activity, Bot, ArrowRight, Send, Workflow, Brain, BookOpen, Layers } from 'lucide-react'

const FEATURES = [
  {
    icon: Workflow,
    label: 'Feature 05',
    title: 'TradingView Workflow Automation',
    desc: 'Connect TradingView alerts directly to your execution pipeline. Strategize, notify, and deploy — automatically or manually.',
    color: '#8B5CF6',
    steps: [
      { icon: Activity, text: 'Strategize the position in TradingView' },
      { icon: Send, text: 'TradingView notifies pipeline via Telegram or Email' },
      { icon: Layers, text: 'Manual or automatic trade deployment' },
    ],
    badge: 'Workflow',
  },
  {
    icon: Brain,
    label: 'Feature 06',
    title: 'AI Agents',
    desc: 'Autonomous AI agents that plan, execute, journal, and manage multiple trades simultaneously — with zero emotional bias.',
    color: '#A78BFA',
    steps: [
      { icon: Bot, text: 'Autonomous trade execution' },
      { icon: BookOpen, text: 'Planning and journaling every move' },
      { icon: Layers, text: 'Multiple simultaneous trade execution' },
    ],
    badge: 'AI Powered',
  },
]

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" ref={ref} className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-purple-400 text-sm font-mono mb-6">
            <Activity size={14} /> Platform Features
          </div>
          <h2 className="font-black mb-4 leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            <span className="text-white">Built for the </span><span className="text-gradient">Modern Trader</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">Cutting-edge automation and AI tools that give you an unfair advantage in any market condition.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.2 }} whileHover={{ y: -6 }}
                className="glass-strong rounded-3xl p-8 relative overflow-hidden group">
                {/* Gradient bg on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at top left, ${f.color}15 0%, transparent 60%)` }} />

                <div className="relative z-10">
                  {/* Badge + Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}>
                      <Icon size={26} style={{ color: f.color }} />
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full" style={{ background: `${f.color}20`, color: f.color, border: `1px solid ${f.color}30` }}>
                      {f.badge}
                    </span>
                  </div>

                  <div className="font-mono text-xs text-gray-500 mb-2">{f.label}</div>
                  <h3 className="text-white font-bold text-2xl mb-3">{f.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-6">{f.desc}</p>

                  {/* Steps */}
                  <div className="space-y-3">
                    {f.steps.map((step, j) => {
                      const StepIcon = step.icon
                      return (
                        <motion.div key={j} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.4 + i * 0.2 + j * 0.1 }}
                          className="flex items-center gap-3 p-3 rounded-xl" style={{ background: `${f.color}08`, border: `1px solid ${f.color}15` }}>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${f.color}20` }}>
                            <StepIcon size={15} style={{ color: f.color }} />
                          </div>
                          <span className="text-gray-300 text-sm">{step.text}</span>
                          {j < f.steps.length - 1 && (
                            <ArrowRight size={14} className="ml-auto text-gray-600" />
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
