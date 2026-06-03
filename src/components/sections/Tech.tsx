'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Send, Smartphone, Settings, Zap, Link } from 'lucide-react'

const TECH_ITEMS = [
  { icon: Send, num: '01', title: 'Telegram Bots', sub: 'Automate. Notify. Execute.', desc: 'Full-featured Telegram bots with webhook handling, user management, and real-time notifications for trading signals.', tags: ['Webhooks', 'Real-time', 'Node.js'] },
  { icon: Smartphone, num: '02', title: 'Mini Apps', sub: 'Built for speed. Built for users.', desc: 'Full-stack Telegram Mini Apps with React frontends, rich UI, real-time data, and seamless in-chat experience.', tags: ['React', 'WebApp API', 'Responsive'] },
  { icon: Code2, num: '03', title: 'Custom Solutions', sub: 'Built by traders, for traders.', desc: 'Bespoke trading tools, dashboards, admin panels, and integrations tailored to your exact workflow requirements.', tags: ['Custom', 'Full-Stack', 'API'] },
  { icon: Zap, num: '04', title: 'Trading Bots', sub: 'Automated. Emotionless. Efficient.', desc: 'Exchange-connected bots with strategy logic, risk engine, and execution layer. Internal or client-facing products.', tags: ['Exchange API', 'Strategy', 'Risk Engine'] },
  { icon: Settings, num: '05', title: 'Admin Panels', sub: 'Total operational control.', desc: 'Comprehensive dashboards for user management, analytics, broadcast messaging, and system configuration.', tags: ['Dashboard', 'Analytics', 'Role Access'] },
  { icon: Link, num: '06', title: 'Integrations', sub: 'Connect everything.', desc: 'We bridge exchanges, payment processors, CRMs, and analytics platforms into cohesive operational pipelines.', tags: ['REST/GraphQL', 'Payments', 'Automation'] },
]

export default function Tech() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="tech" ref={ref} className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-purple-400 text-sm font-mono mb-6">
            <Code2 size={14} /> What We Build
          </div>
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(108,63,232,0.15)', border: '1px solid rgba(108,63,232,0.3)' }}>
            <Code2 size={36} className="text-purple-400" />
          </div>
          <h2 className="font-black mb-4 leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            We build tools that <span className="text-gradient">create an edge.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">From Telegram bots to mini apps, we build technology that simplifies trading and scales opportunity.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TECH_ITEMS.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }} whileHover={{ y: -6, scale: 1.02 }}
                className="glass-strong rounded-2xl p-6 cursor-default group relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: 'radial-gradient(ellipse at top left, rgba(108,63,232,0.1) 0%, transparent 60%)' }} />
                <div className="relative z-10">
                  <div className="font-mono text-5xl font-bold text-purple-500/10 leading-none mb-2">{item.num}</div>
                  <div className="w-10 h-10 rounded-xl bg-purple-700/30 border border-purple-500/30 flex items-center justify-center mb-4 group-hover:bg-purple-700/50 transition-colors">
                    <Icon size={20} className="text-purple-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-purple-400 font-mono text-xs mb-3">{item.sub}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((t, j) => (
                      <span key={j} className="text-xs font-mono px-2 py-0.5 rounded-lg text-green-400 bg-green-500/10 border border-green-500/20">{t}</span>
                    ))}
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
