import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Radical Brothers Inc. — Financial Ecosystem',
  description: 'A decade-forged financial ecosystem built on precision trading, automated intelligence, and full-stack digital infrastructure. Crypto Futures, Forex, Gold, and Telegram Bot Development.',
  keywords: ['crypto trading', 'forex', 'gold trading', 'telegram bots', 'trading automation', 'financial ecosystem', 'radical brothers'],
  authors: [{ name: 'Radical Brothers Inc.' }],
  openGraph: {
    title: 'Radical Brothers Inc. — Financial Ecosystem',
    description: '10 Years. One Ecosystem. Trade. Build. Compound.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Radical Brothers Inc.',
    description: '10 Years. One Ecosystem.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  )
}
