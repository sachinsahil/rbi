'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Leaf, Shield, TrendingUp, Send, Mail, MessageCircle, ArrowRight, Star } from 'lucide-react'

export function PassiveIncome() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const items = [
    { icon: Shield, title: 'Apps & Websites', desc: 'Earn crypto from trusted platforms. Curated sources, consistent returns.', color: '#8B5CF6' },
    { icon: TrendingUp, title: 'Staking & Yield', desc: 'Grow your assets. Compound smartly. Every asset works while we sleep.', color: '#10B981' },
    { icon: Leaf, title: 'Long-Term Wealth', desc: 'Build freedom. One step at a time. Compounding over years, not days.', color: '#D4A843' },
  ]
  return (
    <section id="yield" ref={ref} className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-purple-400 text-sm font-mono mb-6">
            <Leaf size={14} /> Earn & Grow
          </div>
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(108,63,232,0.15)', border: '1px solid rgba(108,63,232,0.3)' }}>
            <Leaf size={36} className="text-purple-400" />
          </div>
          <h2 className="font-black mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            <span className="text-white">Digital Asset </span><span className="text-gradient">Cultivation</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">We help you grow your digital assets through innovative systems and strategic partnerships.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 }} whileHover={{ y: -6 }}
                className="glass-strong rounded-2xl p-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}>
                  <Icon size={22} style={{ color: item.color }} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const contacts = [
    { icon: MessageCircle, label: 'Telegram', value: '@radicalbrothers_inc', href: 'https://t.me/radicalbrothers_inc', color: '#3B82F6' },
    { icon: Mail, label: 'General Inquiries', value: 'hello@radicalbrothers.com', href: 'mailto:hello@radicalbrothers.com', color: '#8B5CF6' },
    { icon: Send, label: 'Partnerships', value: 'partner@radicalbrothers.com', href: 'mailto:partner@radicalbrothers.com', color: '#10B981' },
  ]
  return (
    <section id="contact" ref={ref} className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-purple-400 text-sm font-mono mb-6">
            <Send size={14} /> Work With Us
          </div>
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(108,63,232,0.15)', border: '1px solid rgba(108,63,232,0.3)' }}>
            <Send size={36} className="text-purple-400" />
          </div>
          <h2 className="font-black mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            {"Let's build something "}
            <span className="text-gradient">extraordinary.</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">Whether you&apos;re a trader, developer, partner, or brand — let&apos;s connect and create impact.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {contacts.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.a key={i} href={c.href} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }} whileHover={{ y: -4, scale: 1.02 }}
                className="glass-strong rounded-2xl p-5 flex flex-col items-center text-center gap-3 cursor-pointer group">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: `${c.color}20`, border: `1px solid ${c.color}40` }}>
                  <Icon size={22} style={{ color: c.color }} />
                </div>
                <div>
                  <div className="text-gray-400 text-xs font-mono mb-1">{c.label}</div>
                  <div className="text-white font-semibold text-sm group-hover:text-purple-300 transition-colors">{c.value}</div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Closing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <section ref={ref} className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(108,63,232,0.15) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(108,63,232,1) 1px, transparent 1px), linear-gradient(90deg, rgba(108,63,232,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
          className="w-24 h-24 mx-auto mb-8 rounded-3xl flex items-center justify-center" style={{ background: 'rgba(108,63,232,0.2)', border: '1px solid rgba(108,63,232,0.4)' }}>
          <Star size={44} className="text-purple-400" />
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          className="font-black mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
          <span className="text-white block">One Ecosystem.</span>
          <span className="text-gradient block">Endless Opportunity.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
          className="text-gray-400 text-lg mb-10">10 years down, the future is limitless. Grow with us.</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-base transition-all glow-purple">
            Join The Movement <ArrowRight size={18} />
          </motion.a>
          <motion.a href="#home" whileHover={{ scale: 1.05 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass text-white font-semibold text-base transition-all">
            Back to Home
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
