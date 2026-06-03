# Radical Brothers Inc. — Website

A world-class SaaS landing page built with Next.js 15, React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

### Requirements
- Node.js 18+ (download from https://nodejs.org)
- npm (comes with Node.js)

### Setup

```bash
# 1. Extract the ZIP and open the folder in terminal
cd radical-brothers-inc

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Visit http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended - Free)
1. Push to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Click Deploy — done in 60 seconds!

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout + SEO metadata
│   ├── page.tsx          # Main page assembling all sections
│   └── globals.css       # Global styles + utility classes
├── components/
│   ├── ui/
│   │   └── Logo.tsx      # Animated RBI logo SVG
│   ├── layout/
│   │   └── Navbar.tsx    # Top nav (desktop) + Bottom nav (mobile)
│   └── sections/
│       ├── Hero.tsx      # Hero + animated terminal + ticker
│       ├── Trust.tsx     # Platform logos + testimonials
│       ├── About.tsx     # Who we are
│       ├── Markets.tsx   # Markets we dominate
│       ├── Trading.tsx   # Trading strategies + bots tabs
│       ├── Features.tsx  # TradingView workflow + AI Agents
│       ├── Demo.tsx      # Interactive trading chart demo
│       ├── Tech.tsx      # Technology infrastructure
│       └── Misc.tsx      # Passive income + Contact + Closing
```

## 🎨 Customization

### Colors (tailwind.config.ts)
- Primary purple: `#6C3FE8`
- Background: `#0D0D1A`

### Content
- Edit text in each section component
- Replace contact links in `src/components/sections/Misc.tsx`
- Update Telegram handle, email addresses

### Logo
- Modify `src/components/ui/Logo.tsx` to match your actual logo

## 📱 Mobile
- Bottom navigation bar (exactly like your mockup)
- Fully responsive across all screen sizes
- Touch-optimized interactions
