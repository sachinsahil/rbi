'use client'
import { useEffect, useState } from 'react'

export default function RBILogo({ size = 40 }: { size?: number }) {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Set initial value
    setIsDark(document.documentElement.classList.contains('dark'))

    // Watch for class changes
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  // Dark mode = show light (white) logo
  // Light mode = show dark (black) logo
  return (
    <img
      src={isDark ? '/logo-light.svg' : '/logo-dark.svg'}
      alt="Radical Brothers Inc."
      width={size}
      height={size}
      style={{ objectFit: 'contain', transition: 'opacity 0.3s ease' }}
    />
  )
}
