import React from 'react'
import { motion } from 'motion/react'

interface RadarSweepProps {
  size?: number
  className?: string
}

const blips = [
  { x: 31, y: 37, delay: 0.2, label: 'R1' },
  { x: 67, y: 28, delay: 1.1, label: 'R2' },
  { x: 73, y: 64, delay: 2.0, label: 'R3' },
  { x: 42, y: 73, delay: 2.8, label: 'R4' },
  { x: 56, y: 48, delay: 1.6, label: 'AI' },
]

export default function RadarSweep({
  size = 300,
  className = '',
}: RadarSweepProps) {
  const center = size / 2
  const radius = size * 0.38

  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{
        width: size,
        height: size,
      }}
      aria-hidden="true"
    >
      {/* =====================================================
          ATMOSPHERIC GLOW
      ====================================================== */}

      <div
        className="absolute rounded-full blur-3xl"
        style={{
          inset: '18%',
          background:
            'radial-gradient(circle, rgba(34,211,238,0.10), rgba(14,165,233,0.025) 45%, transparent 72%)',
        }}
      />

      {/* =====================================================
          RADAR SVG
      ====================================================== */}

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 overflow-visible"
        fill="none"
      >
        <defs>
          {/* Sweep gradient */}
          <linearGradient
            id="vn-radar-sweep-gradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#22d3ee"
              stopOpacity="0"
            />
            <stop
              offset="55%"
              stopColor="#22d3ee"
              stopOpacity="0.06"
            />
            <stop
              offset="100%"
              stopColor="#67e8f9"
              stopOpacity="0.42"
            />
          </linearGradient>

          {/* Outer glow */}
          <filter id="vn-radar-glow">
            <feGaussianBlur
              stdDeviation="3"
              result="blur"
            />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Core glow */}
          <filter id="vn-radar-core-glow">
            <feGaussianBlur
              stdDeviation="7"
              result="blur"
            />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* =================================================
            OUTER RADAR RINGS
        ================================================== */}

        <circle
          cx={center}
          cy={center}
          r={radius + 13}
          stroke="#22d3ee"
          strokeOpacity="0.05"
          strokeWidth="1"
        />

        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#38bdf8"
          strokeOpacity="0.16"
          strokeWidth="1"
        />

        <circle
          cx={center}
          cy={center}
          r={radius * 0.75}
          stroke="#38bdf8"
          strokeOpacity="0.11"
          strokeWidth="1"
          strokeDasharray="2 7"
        />

        <circle
          cx={center}
          cy={center}
          r={radius * 0.5}
          stroke="#22d3ee"
          strokeOpacity="0.10"
          strokeWidth="1"
        />

        <circle
          cx={center}
          cy={center}
          r={radius * 0.25}
          stroke="#67e8f9"
          strokeOpacity="0.14"
          strokeWidth="1"
          strokeDasharray="3 5"
        />

        {/* =================================================
            CROSSHAIR GRID
        ================================================== */}

        <line
          x1={center - radius - 8}
          y1={center}
          x2={center + radius + 8}
          y2={center}
          stroke="#38bdf8"
          strokeOpacity="0.08"
        />

        <line
          x1={center}
          y1={center - radius - 8}
          x2={center}
          y2={center + radius + 8}
          stroke="#38bdf8"
          strokeOpacity="0.08"
        />

        <line
          x1={center - radius * 0.7}
          y1={center - radius * 0.7}
          x2={center + radius * 0.7}
          y2={center + radius * 0.7}
          stroke="#38bdf8"
          strokeOpacity="0.035"
        />

        <line
          x1={center + radius * 0.7}
          y1={center - radius * 0.7}
          x2={center - radius * 0.7}
          y2={center + radius * 0.7}
          stroke="#38bdf8"
          strokeOpacity="0.035"
        />

        {/* =================================================
            RADAR SWEEP
        ================================================== */}

        <motion.g
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transformOrigin: `${center}px ${center}px`,
          }}
        >
          {/* Sweep cone */}

          <path
            d={`
              M ${center} ${center}
              L ${center} ${center - radius}
              A ${radius} ${radius} 0 0 1
              ${center + radius * 0.7}
              ${center - radius * 0.7}
              Z
            `}
            fill="url(#vn-radar-sweep-gradient)"
          />

          {/* Bright sweep edge */}

          <line
            x1={center}
            y1={center}
            x2={center}
            y2={center - radius}
            stroke="#67e8f9"
            strokeOpacity="0.65"
            strokeWidth="1"
            filter="url(#vn-radar-glow)"
          />
        </motion.g>

        {/* =================================================
            RADIAL TICKS
        ================================================== */}

        {Array.from({ length: 24 }).map((_, index) => {
          const angle =
            (index * 15 * Math.PI) / 180

          const inner = radius + 4
          const outer =
            radius + (index % 3 === 0 ? 10 : 6)

          const x1 =
            center + Math.cos(angle) * inner
          const y1 =
            center + Math.sin(angle) * inner

          const x2 =
            center + Math.cos(angle) * outer
          const y2 =
            center + Math.sin(angle) * outer

          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#38bdf8"
              strokeOpacity={
                index % 3 === 0 ? 0.28 : 0.12
              }
              strokeWidth={
                index % 3 === 0 ? 1 : 0.6
              }
            />
          )
        })}

        {/* =================================================
            RADAR BLIPS
        ================================================== */}

        {blips.map((blip) => {
          const x = (blip.x / 100) * size
          const y = (blip.y / 100) * size

          return (
            <g key={blip.label}>
              <motion.circle
                cx={x}
                cy={y}
                r="3"
                fill="#67e8f9"
                initial={{
                  opacity: 0.25,
                  scale: 0.8,
                }}
                animate={{
                  opacity: [0.25, 1, 0.25],
                  scale: [0.8, 1.35, 0.8],
                }}
                transition={{
                  duration: 2.5,
                  delay: blip.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  transformOrigin: `${x}px ${y}px`,
                }}
              />

              <motion.circle
                cx={x}
                cy={y}
                r="7"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="0.8"
                initial={{
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [0.5, 1.8, 2.2],
                }}
                transition={{
                  duration: 2.8,
                  delay: blip.delay,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                style={{
                  transformOrigin: `${x}px ${y}px`,
                }}
              />
            </g>
          )
        })}

        {/* =================================================
            CENTER CORE
        ================================================== */}

        <motion.circle
          cx={center}
          cy={center}
          r="5"
          fill="#67e8f9"
          filter="url(#vn-radar-core-glow)"
          animate={{
            opacity: [0.45, 1, 0.45],
            r: [4, 6, 4],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <circle
          cx={center}
          cy={center}
          r="10"
          stroke="#22d3ee"
          strokeOpacity="0.16"
          strokeWidth="1"
        />

        {/* =================================================
            CONNECTION LINES
        ================================================== */}

        <path
          d={`
            M ${center} ${center}
            C ${center - 35} ${center - 35},
              ${center - 60} ${center - 65},
              ${center - 92} ${center - 58}
          `}
          stroke="#22d3ee"
          strokeOpacity="0.14"
          strokeWidth="1"
        />

        <path
          d={`
            M ${center} ${center}
            C ${center + 35} ${center - 35},
              ${center + 55} ${center - 65},
              ${center + 82} ${center - 78}
          `}
          stroke="#38bdf8"
          strokeOpacity="0.11"
          strokeWidth="1"
        />

        <path
          d={`
            M ${center} ${center}
            C ${center + 30} ${center + 40},
              ${center + 70} ${center + 48},
              ${center + 88} ${center + 75}
          `}
          stroke="#22d3ee"
          strokeOpacity="0.09"
          strokeWidth="1"
        />
      </svg>

      {/* =====================================================
          TECHNICAL LABELS
      ====================================================== */}

      <div className="absolute left-1/2 top-[7%] -translate-x-1/2 whitespace-nowrap">
        <span className="font-mono text-[7px] uppercase tracking-[0.28em] text-cyan-300/45">
          Risk Surveillance
        </span>
      </div>

      <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-slate-500/70">
          AI // TERRAIN // WEATHER
        </span>
      </div>

      <div className="absolute left-[8%] top-1/2 -translate-y-1/2">
        <span className="font-mono text-[7px] text-cyan-300/30">
          N
        </span>
      </div>

      <div className="absolute bottom-[12%] right-[8%]">
        <span className="font-mono text-[7px] text-cyan-300/30">
          24.6°N
        </span>
      </div>
    </div>
  )
}