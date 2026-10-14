import React from 'react'

interface AtmosphericBackgroundProps {
  children?: React.ReactNode
  variant?: 'default' | 'rain' | 'map' | 'alert'
  className?: string
}

export default function AtmosphericBackground({
  children,
  variant = 'default',
  className = '',
}: AtmosphericBackgroundProps) {
  return (
    <div
      className={`
        vn-atmosphere
        vn-atmosphere-${variant}
        ${className}
      `}
    >
      <div className="vn-atmosphere-glow vn-glow-one" />
      <div className="vn-atmosphere-glow vn-glow-two" />
      <div className="vn-atmosphere-grid" />

      <div className="relative z-10 min-h-full">
        {children}
      </div>
    </div>
  )
}