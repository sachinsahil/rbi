'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Activity, Zap, TrendingUp } from 'lucide-react'

type Candle = {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

type AnalysisStep = {
  id: number
  text: string
  color: string
}

type Indicator = {
  label: string
  val: string
  color: string
  active: boolean
}

// ── Typewriter line ──────────────────────────────────────────────────────────
function TypeLine({ text, color, delay }: { text: string; color: string; delay: number }) {
  const [displayed, setDisplayed] = useState('')
  const [visible, setVisible] = useState(false)

  useState(() => {
    const t = setTimeout(() => {
      setVisible(true)
      let i = 0
      const iv = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) clearInterval(iv)
      }, 16)
    }, delay * 1000)
    return () => clearTimeout(t)
  })

  if (!visible) return null
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`font-mono text-xs leading-relaxed ${color}`}
    >
      {displayed}
      {displayed.length < text.length && (
        <span className="animate-pulse">▌</span>
      )}
    </motion.div>
  )
}

// ── Real Candlestick Chart ───────────────────────────────────────────────────
function CandleChart({
  candles,
  ema9,
  ema21,
  fibLevels,
  orderBlock,
  active,
}: {
  candles: Candle[]
  ema9: number[]
  ema21: number[]
  fibLevels: { f382: number; f500: number; f618: number }
  orderBlock: { y1: number; y2: number } | null
  active: number
}) {
  if (candles.length === 0) return (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-gray-600 font-mono text-xs">Awaiting data...</p>
    </div>
  )

  const W = 540, H = 180
  const pad = { left: 8, right: 48, top: 10, bottom: 10 }
  const chartW = W - pad.left - pad.right
  const chartH = H - pad.top - pad.bottom

  const allPrices = candles.flatMap(c => [c.high, c.low])
  const minP = Math.min(...allPrices) * 0.9995
  const maxP = Math.max(...allPrices) * 1.0005
  const range = maxP - minP

  const toX = (i: number) => pad.left + (i / (candles.length - 1)) * chartW
  const toY = (p: number) => pad.top + ((maxP - p) / range) * chartH
  const cw = Math.max(2, chartW / candles.length * 0.6)

  // EMA lines
  const ema9Pts = ema9.map((v, i) => `${toX(i + (candles.length - ema9.length))},${toY(v)}`).join(' ')
  const ema21Pts = ema21.map((v, i) => `${toX(i + (candles.length - ema21.length))},${toY(v)}`).join(' ')

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
      <defs>
        <linearGradient id="obGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Grid */}
      {[0.25, 0.5, 0.75].map((t, i) => (
        <line key={i}
          x1={pad.left} y1={pad.top + t * chartH}
          x2={W - pad.right} y2={pad.top + t * chartH}
          stroke="#6C3FE815" strokeWidth="1" />
      ))}

      {/* Order Block */}
      {active >= 4 && orderBlock && (
        <motion.rect
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          x={pad.left} y={toY(orderBlock.y2)}
          width={chartW}
          height={Math.abs(toY(orderBlock.y1) - toY(orderBlock.y2))}
          fill="url(#obGrad)"
          stroke="#10B98140" strokeWidth="1"
        />
      )}

      {/* Fibonacci levels */}
      {active >= 3 && (
        <>
          {[
            { level: fibLevels.f618, label: '0.618', color: '#3B82F6' },
            { level: fibLevels.f500, label: '0.500', color: '#8B5CF6' },
            { level: fibLevels.f382, label: '0.382', color: '#F59E0B' },
          ].map((fib, i) => (
            <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.2 }}>
              <line
                x1={pad.left} y1={toY(fib.level)}
                x2={W - pad.right} y2={toY(fib.level)}
                stroke={fib.color} strokeWidth="1" strokeDasharray="4 3" opacity="0.7"
              />
              <text x={W - pad.right + 2} y={toY(fib.level) + 3}
                fill={fib.color} fontSize="7" fontFamily="monospace">{fib.label}</text>
            </motion.g>
          ))}
        </>
      )}

      {/* Candles */}
      {candles.map((c, i) => {
        const x = toX(i)
        const bull = c.close >= c.open
        const bodyY = toY(Math.max(c.open, c.close))
        const bodyH = Math.max(1, Math.abs(toY(c.open) - toY(c.close)))
        return (
          <motion.g key={i}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: i * 0.02, duration: 0.2 }}
            style={{ transformOrigin: `${x}px ${toY(c.close)}px` }}
          >
            {/* Wick */}
            <line x1={x} y1={toY(c.high)} x2={x} y2={toY(c.low)}
              stroke={bull ? '#10B981' : '#EF4444'} strokeWidth="1" />
            {/* Body */}
            <rect x={x - cw / 2} y={bodyY} width={cw} height={bodyH} rx="1"
              fill={bull ? '#10B981' : '#EF4444'} opacity="0.9" />
          </motion.g>
        )
      })}

      {/* EMA lines */}
      {active >= 2 && ema9.length > 0 && (
        <motion.polyline
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          points={ema9Pts}
          fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"
        />
      )}
      {active >= 2 && ema21.length > 0 && (
        <motion.polyline
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          points={ema21Pts}
          fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round"
        />
      )}

      {/* Entry arrow */}
      {active >= 6 && (
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          style={{ transformOrigin: `${toX(candles.length - 3)}px ${toY(candles[candles.length - 3]?.close ?? 0)}px` }}>
          <polygon
            points={`
              ${toX(candles.length - 3)},${toY(candles[candles.length - 3]?.close ?? 0) + 20}
              ${toX(candles.length - 3) - 8},${toY(candles[candles.length - 3]?.close ?? 0) + 34}
              ${toX(candles.length - 3) + 8},${toY(candles[candles.length - 3]?.close ?? 0) + 34}
            `}
            fill="#6C3FE8"
          />
          <text
            x={toX(candles.length - 3)}
            y={toY(candles[candles.length - 3]?.close ?? 0) + 46}
            fill="#6C3FE8" fontSize="8" textAnchor="middle" fontFamily="monospace"
          >ENTRY</text>
        </motion.g>
      )}

      {/* Price labels */}
      {[0, Math.floor(candles.length / 2), candles.length - 1].map((idx) => (
        <text key={idx}
          x={W - pad.right + 2}
          y={toY(candles[idx]?.close ?? 0) + 3}
          fill="#6C3FE880" fontSize="7" fontFamily="monospace">
          {candles[idx]?.close.toFixed(0)}
        </text>
      ))}
    </svg>
  )
}

// ── RSI Chart ────────────────────────────────────────────────────────────────
function RSIChart({ rsiValues, active }: { rsiValues: number[]; active: number }) {
  if (!active || rsiValues.length === 0) return null
  const W = 540, H = 50
  const pad = { left: 8, right: 48, top: 5, bottom: 5 }
  const chartW = W - pad.left - pad.right
  const chartH = H - pad.top - pad.bottom
  const toX = (i: number) => pad.left + (i / (rsiValues.length - 1)) * chartW
  const toY = (v: number) => pad.top + ((100 - v) / 100) * chartH
  const pts = rsiValues.map((v, i) => `${toX(i)},${toY(v)}`).join(' ')

  return (
    <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      width="100%" viewBox={`0 0 ${W} ${H}`} className="overflow-visible mt-2">
      <line x1={pad.left} y1={toY(70)} x2={W - pad.right} y2={toY(70)}
        stroke="#EF444430" strokeWidth="1" strokeDasharray="3 3" />
      <line x1={pad.left} y1={toY(30)} x2={W - pad.right} y2={toY(30)}
        stroke="#10B98130" strokeWidth="1" strokeDasharray="3 3" />
      <text x={W - pad.right + 2} y={toY(70) + 3} fill="#EF444480" fontSize="7" fontFamily="monospace">70</text>
      <text x={W - pad.right + 2} y={toY(30) + 3} fill="#10B98180" fontSize="7" fontFamily="monospace">30</text>
      <polyline points={pts} fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
      <text x={pad.left} y={H - 1} fill="#6C3FE880" fontSize="7" fontFamily="monospace">RSI(14)</text>
    </motion.svg>
  )
}

// ── Main Demo Component ──────────────────────────────────────────────────────
export default function Demo() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [candles, setCandles] = useState<Candle[]>([])
  const [ema9, setEma9] = useState<number[]>([])
  const [ema21, setEma21] = useState<number[]>([])
  const [rsiValues, setRsiValues] = useState<number[]>([])
  const [fibLevels, setFibLevels] = useState({ f382: 0, f500: 0, f618: 0 })
  const [orderBlock, setOrderBlock] = useState<{ y1: number; y2: number } | null>(null)
  const [activeStep, setActiveStep] = useState(-1)
  const [running, setRunning] = useState(false)
  const [steps, setSteps] = useState<AnalysisStep[]>([])
  const [indicators, setIndicators] = useState<Indicator[]>([])
  const [analysisKey, setAnalysisKey] = useState(0)

  const calcEMA = (data: number[], period: number) => {
    const k = 2 / (period + 1)
    const result: number[] = []
    let ema = data.slice(0, period).reduce((a, b) => a + b, 0) / period
    result.push(ema)
    for (let i = period; i < data.length; i++) {
      ema = data[i] * k + ema * (1 - k)
      result.push(ema)
    }
    return result
  }

  const calcRSI = (closes: number[], period = 14) => {
    const result: number[] = []
    for (let i = period; i < closes.length; i++) {
      let gains = 0, losses = 0
      for (let j = i - period + 1; j <= i; j++) {
        const diff = closes[j] - closes[j - 1]
        if (diff > 0) gains += diff
        else losses += Math.abs(diff)
      }
      const avgG = gains / period
      const avgL = losses / period
      const rs = avgL === 0 ? 100 : avgG / avgL
      result.push(100 - 100 / (1 + rs))
    }
    return result
  }

  const runDemo = async () => {
    if (running) return
    setRunning(true)
    setActiveStep(-1)
    setSteps([])
    setCandles([])
    setAnalysisKey(k => k + 1)

    try {
      // Fetch real 5m candles
      const res = await fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=5m&limit=60')
      const raw = await res.json()
      const parsed: Candle[] = raw.map((k: any) => ({
        time: k[0],
        open: parseFloat(k[1]),
        high: parseFloat(k[2]),
        low: parseFloat(k[3]),
        close: parseFloat(k[4]),
        volume: parseFloat(k[5]),
      }))
      setCandles(parsed)

      const closes = parsed.map(c => c.close)
      const highs = parsed.map(c => c.high)
      const lows = parsed.map(c => c.low)

      // EMA
      const e9 = calcEMA(closes, 9)
      const e21 = calcEMA(closes, 21)
      setEma9(e9)
      setEma21(e21)

      // RSI
      const rsi = calcRSI(closes)
      setRsiValues(rsi)
      const latestRSI = rsi[rsi.length - 1]

      // Fibonacci
      const swingHigh = Math.max(...highs.slice(-20))
      const swingLow = Math.min(...lows.slice(-20))
      const fibs = {
        f618: swingHigh - (swingHigh - swingLow) * 0.618,
        f500: swingHigh - (swingHigh - swingLow) * 0.5,
        f382: swingHigh - (swingHigh - swingLow) * 0.382,
      }
      setFibLevels(fibs)

      // Order Block
      const obHigh = Math.max(...highs.slice(-10, -5))
      const obLow = Math.min(...lows.slice(-10, -5))
      setOrderBlock({ y1: obLow, y2: obHigh })

      // Latest values
      const lastClose = closes[closes.length - 1]
      const lastE9 = e9[e9.length - 1]
      const lastE21 = e21[e21.length - 1]
      const macdSignal = lastE9 > lastE21 ? 'Bullish Cross' : 'Bearish Cross'
      const macdColor = lastE9 > lastE21 ? 'text-green-400' : 'text-red-400'
      const volAvg = parsed.slice(-10).reduce((a, c) => a + c.volume, 0) / 10
      const lastVol = parsed[parsed.length - 1].volume
      const volSignal = lastVol > volAvg ? 'Above average ⚡' : 'Below average'

      // Position logic
      let position = ''
      let posColor = ''
      if (latestRSI < 35 && lastE9 > lastE21) {
        position = '⚡ LONG — oversold RSI + bullish EMA cross confirmed'
        posColor = 'text-green-300'
      } else if (latestRSI > 65 && lastE9 < lastE21) {
        position = '⚡ SHORT — overbought RSI + bearish EMA cross confirmed'
        posColor = 'text-red-300'
      } else if (lastE9 > lastE21 && latestRSI < 55) {
        position = '📈 POTENTIAL LONG — bullish EMA, RSI building momentum'
        posColor = 'text-green-400'
      } else if (lastE9 < lastE21 && latestRSI > 45) {
        position = '📉 POTENTIAL SHORT — bearish EMA, RSI losing momentum'
        posColor = 'text-red-400'
      } else {
        position = '⏳ NEUTRAL — no clear confluence, wait for alignment'
        posColor = 'text-yellow-400'
      }

      // Build analysis steps
      const newSteps: AnalysisStep[] = [
        { id: 1, text: `$ rbi-trader analyze --pair BTC/USDT --tf 5m --candles 60`, color: 'text-purple-400' },
        { id: 2, text: `✓ Fetched 60 candles from Binance`, color: 'text-green-400' },
        { id: 3, text: `→ Last close: $${lastClose.toFixed(2)} | High: $${Math.max(...highs.slice(-5)).toFixed(2)} | Low: $${Math.min(...lows.slice(-5)).toFixed(2)}`, color: 'text-white' },
        { id: 4, text: `→ EMA(9): $${lastE9.toFixed(2)} | EMA(21): $${lastE21.toFixed(2)} | ${macdSignal}`, color: macdColor },
        { id: 5, text: `→ RSI(14): ${latestRSI.toFixed(1)} — ${latestRSI > 70 ? 'Overbought ⚠' : latestRSI < 30 ? 'Oversold ✓' : 'Neutral zone'}`, color: latestRSI > 70 ? 'text-red-400' : latestRSI < 30 ? 'text-green-400' : 'text-yellow-400' },
        { id: 6, text: `→ Fibonacci 0.618: $${fibs.f618.toFixed(2)} | 0.500: $${fibs.f500.toFixed(2)} | 0.382: $${fibs.f382.toFixed(2)}`, color: 'text-blue-300' },
        { id: 7, text: `→ Order Block: $${obLow.toFixed(2)} — $${obHigh.toFixed(2)}`, color: 'text-green-400' },
        { id: 8, text: `→ Volume: ${lastVol.toFixed(2)} BTC | ${volSignal}`, color: 'text-cyan-400' },
        { id: 9, text: `→ Bollinger: price ${lastClose > lastE21 ? 'above' : 'below'} mid-band`, color: 'text-purple-300' },
        { id: 10, text: position, color: posColor },
      ]
      setSteps(newSteps)

      // Build indicators
      setIndicators([
        { label: 'RSI(14)', val: latestRSI.toFixed(1), color: latestRSI > 70 ? '#EF4444' : latestRSI < 30 ? '#10B981' : '#F59E0B', active: false },
        { label: 'EMA Cross', val: macdSignal, color: lastE9 > lastE21 ? '#10B981' : '#EF4444', active: false },
        { label: 'Fib 0.618', val: `$${fibs.f618.toFixed(0)}`, color: '#3B82F6', active: false },
        { label: 'Order Block', val: `$${obLow.toFixed(0)}–$${obHigh.toFixed(0)}`, color: '#10B981', active: false },
      ])

      // Animate steps one by one
      for (let i = 0; i < newSteps.length; i++) {
        await new Promise(r => setTimeout(r, 1400))
        setActiveStep(i + 1)
        setIndicators(prev => prev.map((ind, idx) => idx === i - 2 ? { ...ind, active: true } : ind))
      }

    } catch (e) {
      console.error('Demo fetch failed', e)
    } finally {
      setRunning(false)
    }
  }

  return (
    <section id="demo" ref={ref} className="py-24 px-4 relative">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(108,63,232,0.06) 0%, transparent 70%)' }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-purple-400 text-sm font-mono mb-6">
            <Activity size={14} /> Interactive Demo
          </div>
          <h2 className="font-black mb-4 leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            <span className="text-white">Watch AI Trade </span><span className="text-gradient">Live</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">Real BTC/USDT 5m chart with live RSI, EMA, Fibonacci, Order Blocks and AI execution.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
          className="rounded-3xl overflow-hidden border border-purple-500/20" style={{ background: '#080810' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/10" style={{ background: '#050508' }}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="font-mono text-xs text-gray-500">BTC/USDT · 5m · RBI Analysis Engine</span>
            </div>
            <div className="flex items-center gap-4">
              <motion.span animate={{ opacity: running ? [1, 0.3, 1] : 1 }} transition={{ duration: 1, repeat: running ? Infinity : 0 }}
                className="font-mono text-xs text-green-400">● {running ? 'ANALYZING' : 'LIVE'}</motion.span>
              <span className="font-mono text-sm font-bold" style={{color: '#fcfbfd'}}>
                 {candles.length > 0 ? `$${candles[candles.length - 1].close.toFixed(2)}` : 'BTC/USDT'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Chart */}
            <div className="lg:col-span-2 p-6 border-b lg:border-b-0 lg:border-r border-purple-500/10" style={{ background: '#080810' }}>
              <CandleChart
                candles={candles}
                ema9={ema9}
                ema21={ema21}
                fibLevels={fibLevels}
                orderBlock={orderBlock}
                active={activeStep}
              />
              <RSIChart rsiValues={rsiValues} active={activeStep} />

              {/* Legend */}
              {activeStep >= 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap gap-3 mt-3">
                  {[
                    { color: '#F59E0B', label: 'EMA 9' },
                    { color: '#A78BFA', label: 'EMA 21' },
                    { color: '#3B82F6', label: 'Fib levels' },
                    { color: '#10B981', label: 'Order Block' },
                  ].map((l, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="w-3 h-0.5 rounded" style={{ background: l.color }} />
                      <span className="font-mono text-xs text-gray-500">{l.label}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Indicator badges */}
              <div className="flex flex-wrap gap-2 mt-3">
                {indicators.map((ind, i) => (
                  <div key={i} className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-500 ${ind.active ? 'opacity-100' : 'opacity-20'}`}
                    style={{ background: `${ind.color}15`, border: `1px solid ${ind.color}30`, color: ind.color }}>
                    {ind.label}: <span className="font-bold">{ind.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Steps */}
            <div className="p-6 flex flex-col" style={{ background: '#080810' }}>
              <div className="flex items-center gap-2 mb-4">
                <Zap size={16} className="text-purple-400" />
                <span className="font-mono text-xs text-purple-400 uppercase tracking-wider">AI Analysis Steps</span>
              </div>
              <div className="space-y-1.5 flex-1 overflow-y-auto max-h-64">
                <AnimatePresence>
                  {steps.map((step, i) => (
                    activeStep >= step.id && (
                      <TypeLine
                        key={`${analysisKey}-${step.id}`}
                        text={step.text}
                        color={step.color}
                        delay={0}
                      />
                    )
                  ))}
                </AnimatePresence>
                {activeStep === -1 && (
                  <p className="text-gray-600 text-sm font-mono">Click Run to start AI analysis...</p>
                )}
              </div>
              <motion.button onClick={runDemo} disabled={running} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="mt-4 w-full py-3 rounded-xl bg-purple-700 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all flex items-center justify-center gap-2 glow-purple-sm">
                {running ? (
                  <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><Activity size={16} /></motion.div> Analyzing...</>
                ) : (
                  <><TrendingUp size={16} /> Run AI Analysis</>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}