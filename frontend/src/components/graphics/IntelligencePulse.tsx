import React from 'react'
import { motion } from 'motion/react'

interface IntelligencePulseProps {
  live?: boolean
}

const orbitNodes = [
  {
    x: 50,
    y: 8,
    label: 'RAIN',
    delay: 0,
  },
  {
    x: 91,
    y: 50,
    label: 'GIS',
    delay: 0.8,
  },
  {
    x: 50,
    y: 92,
    label: 'ML',
    delay: 1.6,
  },
  {
    x: 9,
    y: 50,
    label: 'SOIL',
    delay: 2.4,
  },
]

export default function IntelligencePulse({
  live = true,
}: IntelligencePulseProps) {
  return (
    <div
      className="
        pointer-events-none absolute
        right-6 top-20
        z-0
        h-56 w-56
      "
      aria-hidden="true"
    >
      {/* =====================================================
          AMBIENT CORE GLOW
      ====================================================== */}

      <div
        className="
          absolute left-1/2 top-1/2
          h-40 w-40
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-400/[0.035]
          blur-3xl
        "
      />

      {/* =====================================================
          ORBIT SYSTEM
      ====================================================== */}

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 224 224"
        fill="none"
      >
        <defs>
          <radialGradient
            id="vn-intelligence-core"
          >
            <stop
              offset="0%"
              stopColor="#67e8f9"
              stopOpacity="0.34"
            />

            <stop
              offset="45%"
              stopColor="#22d3ee"
              stopOpacity="0.10"
            />

            <stop
              offset="100%"
              stopColor="#22d3ee"
              stopOpacity="0"
            />
          </radialGradient>

          <filter id="vn-intelligence-glow">
            <feGaussianBlur
              stdDeviation="3"
              result="blur"
            />

            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* =================================================
            ORBIT RINGS
        ================================================== */}

        <motion.circle
          cx="112"
          cy="112"
          r="91"
          stroke="#38bdf8"
          strokeOpacity="0.08"
          strokeWidth="1"
          strokeDasharray="2 8"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transformOrigin: '112px 112px',
          }}
        />

        <motion.circle
          cx="112"
          cy="112"
          r="70"
          stroke="#22d3ee"
          strokeOpacity="0.12"
          strokeWidth="1"
          strokeDasharray="1 7"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transformOrigin: '112px 112px',
          }}
        />

        <circle
          cx="112"
          cy="112"
          r="48"
          stroke="#67e8f9"
          strokeOpacity="0.12"
          strokeWidth="1"
        />

        {/* =================================================
            CROSSHAIR
        ================================================== */}

        <line
          x1="112"
          y1="25"
          x2="112"
          y2="199"
          stroke="#38bdf8"
          strokeOpacity="0.055"
        />

        <line
          x1="25"
          y1="112"
          x2="199"
          y2="112"
          stroke="#38bdf8"
          strokeOpacity="0.055"
        />

        {/* =================================================
            DATA CONNECTIONS
        ================================================== */}

        {orbitNodes.map((node) => {
          const x = (node.x / 100) * 224
          const y = (node.y / 100) * 224

          return (
            <g key={node.label}>
              <line
                x1="112"
                y1="112"
                x2={x}
                y2={y}
                stroke="#22d3ee"
                strokeOpacity="0.11"
                strokeWidth="1"
              />

              <motion.circle
                cx={x}
                cy={y}
                r="3"
                fill="#67e8f9"
                filter="url(#vn-intelligence-glow)"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.3, 0.8],
                }}
                transition={{
                  duration: 2.6,
                  delay: node.delay,
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
                r="8"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="0.8"
                animate={{
                  opacity: [0.25, 0, 0.25],
                  r: [5, 14, 5],
                }}
                transition={{
                  duration: 3,
                  delay: node.delay,
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
            CENTRAL INTELLIGENCE CORE
        ================================================== */}

        <circle
          cx="112"
          cy="112"
          r="37"
          fill="url(#vn-intelligence-core)"
        />

        <motion.circle
          cx="112"
          cy="112"
          r="25"
          stroke="#22d3ee"
          strokeOpacity="0.22"
          strokeWidth="1"
          strokeDasharray="3 5"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transformOrigin: '112px 112px',
          }}
        />

        <circle
          cx="112"
          cy="112"
          r="16"
          fill="#06131d"
          stroke="#67e8f9"
          strokeOpacity="0.28"
          strokeWidth="1"
        />

        <motion.circle
          cx="112"
          cy="112"
          r="5"
          fill="#67e8f9"
          filter="url(#vn-intelligence-glow)"
          animate={{
            r: [4, 7, 4],
            opacity: [0.55, 1, 0.55],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* =================================================
            DATA PACKET ON ORBIT
        ================================================== */}

        <motion.circle
          cx="112"
          cy="21"
          r="1.8"
          fill="#67e8f9"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transformOrigin: '112px 112px',
          }}
        />

        <motion.circle
          cx="203"
          cy="112"
          r="1.8"
          fill="#22d3ee"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transformOrigin: '112px 112px',
          }}
        />
      </svg>

      {/* =====================================================
          CORE LABEL
      ====================================================== */}

      <div
        className="
          absolute left-1/2 top-1/2
          -translate-x-1/2
          -translate-y-1/2
          text-center
        "
      >
        <div className="font-mono text-[8px] font-semibold tracking-[0.24em] text-cyan-300/90">
          AI CORE
        </div>

        <div className="mt-1 font-mono text-[6px] uppercase tracking-[0.18em] text-slate-500">
          Risk Engine
        </div>
      </div>

      {/* =====================================================
          ORBIT LABELS
      ====================================================== */}

      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
        <span className="font-mono text-[6px] uppercase tracking-[0.18em] text-cyan-300/35">
          Rainfall
        </span>
      </div>

      <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
        <span className="font-mono text-[6px] uppercase tracking-[0.18em] text-cyan-300/35">
          GIS
        </span>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
        <span className="font-mono text-[6px] uppercase tracking-[0.18em] text-cyan-300/35">
          ML MODEL
        </span>
      </div>

      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="font-mono text-[6px] uppercase tracking-[0.18em] text-cyan-300/35">
          Soil
        </span>
      </div>

      {/* =====================================================
          LIVE STATUS
      ====================================================== */}

      {live && (
        <div className="absolute right-1 top-1 flex items-center gap-1.5">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-cyan-300"
            animate={{
              opacity: [0.35, 1, 0.35],
              scale: [0.8, 1.15, 0.8],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
            }}
          />

          <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-cyan-300/55">
            Live intelligence
          </span>
        </div>
      )}

      {/* =====================================================
          MICRO TELEMETRY
      ====================================================== */}

      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap">
        <span className="font-mono text-[6px] tracking-[0.18em] text-slate-600">
          INPUT
        </span>

        <span className="h-px w-8 bg-cyan-400/15" />

        <span className="font-mono text-[6px] tracking-[0.18em] text-cyan-300/35">
          04 SIGNALS
        </span>

        <span className="h-px w-8 bg-cyan-400/15" />

        <span className="font-mono text-[6px] tracking-[0.18em] text-slate-600">
          ACTIVE
        </span>
      </div>
    </div>
  )
}