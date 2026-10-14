import React from 'react'

export default function RainfallSignal() {
  return (
    <div className="pointer-events-none absolute right-0 top-0 z-0 hidden h-72 w-[620px] lg:block">
      <svg
        viewBox="0 0 620 290"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="forecastSignalGradient"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#22d3ee" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.15" />
          </linearGradient>

          <filter id="forecastGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Glow behind the signal */}
        <path
          d="M0 225 C80 215 105 155 170 178 S260 245 325 150 S425 75 490 120 S570 100 620 48"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="8"
          strokeOpacity="0.08"
          filter="url(#forecastGlow)"
        />

        {/* Main forecast signal */}
        <path
          d="M0 225 C80 215 105 155 170 178 S260 245 325 150 S425 75 490 120 S570 100 620 48"
          fill="none"
          stroke="url(#forecastSignalGradient)"
          strokeWidth="2.5"
        />

        {/* Secondary signal */}
        <path
          d="M0 245 C90 230 130 190 195 205 S285 255 345 175 S445 125 520 145 S585 125 620 105"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="1"
          strokeOpacity="0.18"
        />

        {/* Forecast nodes */}
        <circle cx="170" cy="178" r="3" fill="#38bdf8" opacity="0.7">
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>

        <circle cx="325" cy="150" r="4" fill="#22d3ee" opacity="0.8">
          <animate
            attributeName="r"
            values="3;6;3"
            dur="2.2s"
            repeatCount="indefinite"
          />

          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="2.2s"
            repeatCount="indefinite"
          />
        </circle>

        <circle cx="490" cy="120" r="3" fill="#38bdf8" opacity="0.7">
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="2.8s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Small technical grid lines */}
        <line
          x1="430"
          y1="40"
          x2="620"
          y2="40"
          stroke="#38bdf8"
          strokeOpacity="0.08"
        />

        <line
          x1="460"
          y1="80"
          x2="620"
          y2="80"
          stroke="#38bdf8"
          strokeOpacity="0.06"
        />

        <line
          x1="500"
          y1="120"
          x2="620"
          y2="120"
          stroke="#38bdf8"
          strokeOpacity="0.05"
        />
      </svg>
    </div>
  )
}