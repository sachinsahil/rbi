'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react'
import RBILogo from '@/components/ui/RBILogo'


const TICKER_PAIRS = [
  { pair: 'BTC/USDT', symbol: 'BTCUSDT' },
  { pair: 'ETH/USDT', symbol: 'ETHUSDT' },
  { pair: 'SOL/USDT', symbol: 'SOLUSDT' },
  { pair: 'BNB/USDT', symbol: 'BNBUSDT' },
  { pair: 'ADA/USDT', symbol: 'ADAUSDT' },
  { pair: 'XRP/USDT', symbol: 'XRPUSDT' },
  { pair: 'DOGE/USDT', symbol: 'DOGEUSDT' },
]

type TickerItem = {
  pair: string
  price: string
  change: string
  up: boolean
}

type TerminalLine = {
  text: string
  color: string
}

function TerminalLine({ text, color, delay = 0 }: { text: string; color: string; delay?: number }) {
  const [visible, setVisible] = useState(false)
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setVisible(true)
      let i = 0
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) clearInterval(interval)
      }, 18)
      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(startTimer)
  }, [text, delay])

  if (!visible) return null
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`font-mono text-xs sm:text-sm leading-relaxed ${color}`}
    >
      {displayed}<span className="animate-pulse">▌</span>
    </motion.div>
  )
}

function FlipWord() {
  const [flipped, setFlipped] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    // Wait for entrance animation to finish first
    const startDelay = setTimeout(() => {
      setStarted(true)
    }, 6000)
    return () => clearTimeout(startDelay)
  }, [])

  useEffect(() => {
    if (!started) return
    const interval = setInterval(() => {
      setFlipped(f => !f)
    }, 4000)
    return () => clearInterval(interval)
  }, [started])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 4.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: '1000px', display: 'inline-block' }}
    >
      <motion.div
        animate={{ rotateX: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', display: 'inline-block' }}
      >
        <motion.span
          style={{ backfaceVisibility: 'hidden', display: 'inline-block' }}
          className="text-2xl sm:text-3xl font-black tracking-tight text-white"
        >
          Compound.
        </motion.span>

        <motion.span
         style={{
           backfaceVisibility: 'hidden',
           position: 'absolute',
           top: 0,
           left: 0,
           rotateX: 180,
           display: 'inline-block',
           whiteSpace: 'nowrap',
           color: 'inherit',
           fontWeight: 1200,
           letterSpacing: '2px',
        }}
          className="text-xl sm:text-2xl font-black tracking-tight font-sans"
        >
          A=P(1 + r/n)ⁿᵗ
        </motion.span>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 2.5], [1, 0])
  const [tickerData, setTickerData] = useState<TickerItem[]>([
  { pair: 'BTC/USDT', price: '...', change: '...', up: true },
  { pair: 'ETH/USDT', price: '...', change: '...', up: true },
  { pair: 'SOL/USDT', price: '...', change: '...', up: true },
  { pair: 'BNB/USDT', price: '...', change: '...', up: true },
  { pair: 'ADA/USDT', price: '...', change: '...', up: true },
  { pair: 'XRP/USDT', price: '...', change: '...', up: true },
  { pair: 'DOGE/USDT', price: '...', change: '...', up: true },
  
])
const doubled = [...tickerData, ...tickerData]

useEffect(() => {
  const fetchPrices = async () => {
    try {
      const symbols = TICKER_PAIRS.map(p => `"${p.symbol}"`).join(',')
      const res = await fetch(
        `https://api.binance.com/api/v3/ticker/24hr?symbols=[${symbols}]`
      )
      const data = await res.json()
      const updated: TickerItem[] = TICKER_PAIRS.map(({ pair, symbol }) => {
  const item = data.find((d: any) => d.symbol === symbol)
  if (!item) return { pair, price: '...', change: '...', up: true }
  const p = parseFloat(item.lastPrice)
  return {
    pair,
    price: p >= 1000 ? p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) :
           p >= 1 ? p.toFixed(4) :
           p >= 0.1 ? p.toFixed(4) :
           p.toFixed(6),
    change: `${parseFloat(item.priceChangePercent) >= 0 ? '+' : ''}${parseFloat(item.priceChangePercent).toFixed(2)}%`,
    up: parseFloat(item.priceChangePercent) >= 0,
  }
})
      setTickerData(updated)
    } catch (e) {
      console.error('Price fetch failed', e)
    }
  }

  fetchPrices()
  const interval = setInterval(fetchPrices, 30000)
  return () => clearInterval(interval)
}, [])

const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([])
const [terminalKey, setTerminalKey] = useState(0)

useEffect(() => {
  const analyzeMarket = async () => {
    try {
      // Fetch real BTC data
      const [tickerRes, klinesRes] = await Promise.all([
        fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT'),
        fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=15m&limit=20')
      ])
      const ticker = await tickerRes.json()
      const klines = await klinesRes.json()

      const price = parseFloat(ticker.lastPrice).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      const change = parseFloat(ticker.priceChangePercent).toFixed(2)
      const high = parseFloat(ticker.highPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })
      const low = parseFloat(ticker.lowPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })
      const volume = (parseFloat(ticker.volume) / 1000).toFixed(1)

      // Calculate indicators from klines
      const closes = klines.map((k: any) => parseFloat(k[4]))
      const highs = klines.map((k: any) => parseFloat(k[2]))
      const lows = klines.map((k: any) => parseFloat(k[3]))

      // RSI calculation
      let gains = 0, losses = 0
      for (let i = 1; i < closes.length; i++) {
        const diff = closes[i] - closes[i - 1]
        if (diff > 0) gains += diff
        else losses += Math.abs(diff)
      }
      const avgGain = gains / closes.length
      const avgLoss = losses / closes.length
      const rs = avgGain / avgLoss
      const rsi = (100 - (100 / (1 + rs))).toFixed(1)

      // EMA calculation
      const ema9 = closes.slice(-9).reduce((a: number, b: number) => a + b, 0) / 9
      const ema21 = closes.slice(-21).reduce((a: number, b: number) => a + b, 0) / 21

      // MACD simplified
      const macdSignal = ema9 > ema21 ? 'Bullish Cross' : 'Bearish Cross'
      const macdColor = ema9 > ema21 ? 'text-green-400' : 'text-red-400'

      // Fibonacci levels
      const swingHigh = Math.max(...highs)
      const swingLow = Math.min(...lows)
      const fib618 = (swingHigh - (swingHigh - swingLow) * 0.618).toFixed(1)
      const fib382 = (swingHigh - (swingHigh - swingLow) * 0.382).toFixed(1)

      // Volume analysis
      const avgVol = parseFloat(volume)
      const volSignal = avgVol > 50 ? 'High Volume ⚡' : 'Low Volume'

      // Order block detection
      const lastCandle = closes[closes.length - 1]
      const prevCandle = closes[closes.length - 2]
      const obSignal = lastCandle > prevCandle ? 'Bullish OB detected' : 'Bearish OB detected'
      const obColor = lastCandle > prevCandle ? 'text-green-400' : 'text-red-400'

      // Determine position
      const rsiNum = parseFloat(rsi)
      let position = ''
let posColor = ''
const currentPrice = parseFloat(price.replace(/,/g, ''))
const aboveFib618 = currentPrice > parseFloat(fib618)
const aboveFib382 = currentPrice > parseFloat(fib382)
const bullishOB = lastCandle > prevCandle

// Strong LONG
if (rsiNum < 35 && ema9 > ema21 && bullishOB) {
  position = '⚡ STRONG LONG — oversold RSI + bullish EMA cross + OB confirmed'
  posColor = 'text-green-300'
// Strong SHORT
} else if (rsiNum > 65 && ema9 < ema21 && !bullishOB) {
  position = '⚡ STRONG SHORT — overbought RSI + bearish EMA cross + OB confirmed'
  posColor = 'text-red-300'
// Moderate LONG
} else if (rsiNum < 45 && ema9 > ema21) {
  position = '📈 POTENTIAL LONG — bullish EMA, RSI building momentum'
  posColor = 'text-green-400'
// Moderate SHORT
} else if (rsiNum > 55 && ema9 < ema21) {
  position = '📉 POTENTIAL SHORT — bearish EMA, RSI losing momentum'
  posColor = 'text-red-400'
// Fib bounce LONG
} else if (!aboveFib618 && aboveFib382 && bullishOB) {
  position = '📈 FIB BOUNCE LONG — price at 0.618 support with bullish OB'
  posColor = 'text-green-400'
// Fib rejection SHORT
} else if (aboveFib618 && !bullishOB) {
  position = '📉 FIB REJECTION SHORT — price rejected at 0.618 resistance'
  posColor = 'text-red-400'
// Neutral
} else {
  position = '⏳ NEUTRAL — no clear confluence. Wait for RSI + EMA alignment.'
  posColor = 'text-yellow-400'
}
      const randomSuffix = Math.floor(Math.random() * 9000 + 1000)

      const lines: TerminalLine[] = [
        { text: `$ rbi-trader analyze --pair BTC/USDT --tf 15m`, color: 'text-purple-400' },
        { text: `✓ Connected to Binance API [session: ${randomSuffix}]`, color: 'text-green-400' },
        { text: `→ Price: $${price}  |  24h Change: ${change}%`, color: 'text-purple-400' },
        { text: `→ 24h High: $${high}  |  24h Low: $${low}`, color: 'text-purple-300' },
        { text: `→ Volume: ${volume}K BTC  |  ${volSignal}`, color: 'text-blue-400' },
        { text: `→ RSI(14): ${rsi} — ${rsiNum > 70 ? 'Overbought ⚠' : rsiNum < 30 ? 'Oversold ✓' : 'Neutral zone'}`, color: rsiNum > 70 ? 'text-red-400' : rsiNum < 30 ? 'text-green-400' : 'text-yellow-400' },
        { text: `→ MACD: ${macdSignal}`, color: macdColor },
        { text: `→ EMA(9): $${ema9.toFixed(1)}  |  EMA(21): $${ema21.toFixed(1)}`, color: 'text-blue-300' },
        { text: `→ Fibonacci 0.618: $${fib618}  |  0.382: $${fib382}`, color: 'text-purple-300' },
        { text: `→ ${obSignal}`, color: obColor },
        { text: `→ Bollinger Band: ${parseFloat(price.replace(/,/g, '')) > ema21 ? 'Price above mid-band' : 'Price below mid-band'}`, color: 'text-cyan-400' },
        { text: position, color: posColor },
      ]

      setTerminalLines(lines)
      setTerminalKey(k => k + 1)
    } catch (e) {
      console.error('Terminal fetch failed', e)
    }
  }

 const initialDelay = setTimeout(() => {
  analyzeMarket()
}, 4500)
return () => clearTimeout(initialDelay)
}, [])

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex flex-col overflow-hidden pt-16 md:pt-0">
      {/* Background effects */}
      <div className="absolute inset-0" style={{background:'var(--bg, #0D0D1A)', transition:'background 0.4s ease'}} />
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(108,63,232,0.12) 0%, transparent 70%)'
      }} />
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(rgba(108,63,232,1) 1px, transparent 1px), linear-gradient(90deg, rgba(108,63,232,1) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      {/* Orbs */}
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(108,63,232,0.3) 0%, transparent 70%)' }} />
      <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 70%)' }} />

      <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-20">
        

        {/* Brand name */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="text-center mb-6">
          <div className="font-mono text-xs tracking-[6px] text-purple-400 uppercase mb-2">Radical Brothers Inc.</div>

          <div className="w-16 h-px bg-purple-500 mx-auto" />
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center font-black mb-4 leading-[1.05]"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
          <span className="text-white block">10 Years.</span>
          <span className="text-gradient block">One Ecosystem.</span>
        </motion.h1>

         
      <motion.div className="flex gap-4 justify-center mt-3 mb-3" style={{perspective: '1000px'}}>
  {['Trade.', 'Build.'].map((word, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 4.5 + i * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="text-2xl sm:text-3xl font-black tracking-tight text-white"
    >
      {word}
    </motion.span>
  ))}
  <FlipWord />
</motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
          className="text-gray-400 text-center max-w-xl text-base sm:text-lg leading-relaxed mb-10">
          A decade-forged ecosystem built on <span className="text-purple-300 font-semibold">precision trading</span>,
          automated intelligence, and full-stack digital infrastructure.
        </motion.p>

        {/* Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-16">
          <motion.a href="#markets" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-base tracking-wide transition-all glow-purple">
            Explore Our Ecosystem <ArrowRight size={18} />
          </motion.a>
          <motion.a href="#demo" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass text-white font-semibold text-base tracking-wide transition-all hover:border-purple-500/40">
            Live Demo
          </motion.a>
        </motion.div>

        {/* TERMINAL */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8 }}
          className="w-full max-w-2xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl" style={{background:'#080810'}}>
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-purple-500/10" style={{background:'#050508'}}>
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 font-mono text-xs text-gray-500">rbi-trader — bash</span>
            </div>
            {/* Terminal body */}
               <div className="p-5 space-y-1.5 min-h-[220px]" style={{background:'#080810'}}>
                  {terminalLines.map((line, i) => (
                    <TerminalLine key={`${terminalKey}-${i}`} text={line.text} color={line.color} delay={i * 1.2} />
                   ))}
                  {terminalLines.length === 0 && (
               <div className="font-mono text-xs text-purple-400">
                     Initializing RBI Analysis Engine...
                     <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="inline-block ml-1">▌</motion.span>
               </div>
                  )}
               </div>
          </div>
        </motion.div>

        {/* Floating pairs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
          {tickerData.slice(0, 4).map((item, i) => (
            <motion.div key={i}
              className="absolute glass rounded-xl px-3 py-2 text-xs font-mono"
              style={{ top: `${20 + i * 18}%`, left: i % 2 === 0 ? '5%' : '88%' }}
              animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}>
              <div className="text-gray-300 font-semibold">{item.pair}</div>
              <div className={item.up ? 'text-green-400' : 'text-red-400'}>{item.change}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* TICKER */}
      <div className="relative z-10 border-t border-purple-500/10 py-3 overflow-hidden mt-8 mb-16 md:mb-0" style={{background:'#050508'}}>
        <div className="flex gap-12 whitespace-nowrap" style={{
            display: 'flex',
            animation: 'ticker 60s linear infinite',
            width: 'max-content',
            }}>
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center gap-3 flex-shrink-0">
              <span className="font-mono text-sm font-semibold" style={{color:'#9CA3AF'}}>
              {item.pair}
              </span>
              <span className="font-mono text-sm font-bold" style={{color:'#ffffff'}}>
              {item.price}
              </span>
              <span className={`font-mono text-sm flex items-center gap-1 ${item.up ? 'text-green-400' : 'text-red-400'}`}>
                {item.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {item.change}
              </span>
              <span className="text-gray-700">|</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
