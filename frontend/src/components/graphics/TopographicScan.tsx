import React from 'react'
import { motion } from 'motion/react'

const contourLines = [
  {
    d: 'M-80 500 C80 420 130 560 270 470 S500 330 650 430 S900 560 1280 350',
    opacity: 0.22,
    width: 1.4,
    delay: 0,
  },
  {
    d: 'M-80 535 C90 450 150 595 285 505 S515 365 670 465 S920 595 1280 390',
    opacity: 0.18,
    width: 1.2,
    delay: 0.4,
  },
  {
    d: 'M-80 570 C90 480 165 630 305 540 S535 400 690 500 S945 630 1280 430',
    opacity: 0.15,
    width: 1.1,
    delay: 0.8,
  },
  {
    d: 'M-80 605 C95 515 180 665 325 575 S555 435 715 535 S965 665 1280 470',
    opacity: 0.12,
    width: 1,
    delay: 1.2,
  },
  {
    d: 'M-80 640 C100 550 195 700 345 610 S575 470 740 570 S985 700 1280 510',
    opacity: 0.09,
    width: 1,
    delay: 1.6,
  },

  {
    d: 'M40 190 C170 100 285 235 420 155 S625 95 760 185 S985 245 1220 120',
    opacity: 0.12,
    width: 1,
    delay: 0.5,
  },
  {
    d: 'M10 225 C165 125 290 270 435 190 S645 125 785 220 S1010 275 1245 155',
    opacity: 0.09,
    width: 1,
    delay: 1,
  },
  {
    d: 'M-20 260 C160 155 300 305 450 225 S665 160 805 255 S1030 310 1270 190',
    opacity: 0.07,
    width: 1,
    delay: 1.5,
  },
]

const scanPoints = [
  { cx: 180, cy: 490 },
  { cx: 365, cy: 430 },
  { cx: 570, cy: 385 },
  { cx: 760, cy: 430 },
  { cx: 950, cy: 470 },
]

export default function TopographicScan() {
  return (
    <div
      className="
        pointer-events-none absolute inset-0 z-0
        overflow-hidden
      "
      aria-hidden="true"
    >
      {/* Atmospheric terrain glow */}

      <div className="absolute -bottom-40 left-1/3 h-[520px] w-[520px] rounded-full bg-sky-400/[0.035] blur-[100px]" />

      <div className="absolute right-[-120px] top-[12%] h-[360px] w-[360px] rounded-full bg-cyan-400/[0.025] blur-[90px]" />

      <svg
        viewBox="0 0 1200 760"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          {/* Topographic line gradient */}

          <linearGradient
            id="vn-topographic-gradient"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop
              offset="0%"
              stopColor="#38bdf8"
              stopOpacity="0"
            />

            <stop
              offset="35%"
              stopColor="#38bdf8"
              stopOpacity="0.65"
            />

            <stop
              offset="65%"
              stopColor="#22d3ee"
              stopOpacity="0.75"
            />

            <stop
              offset="100%"
              stopColor="#38bdf8"
              stopOpacity="0"
            />
          </linearGradient>

          {/* Scanning beam gradient */}

          <linearGradient
            id="vn-scan-gradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#22d3ee"
              stopOpacity="0"
            />

            <stop
              offset="50%"
              stopColor="#22d3ee"
              stopOpacity="0.35"
            />

            <stop
              offset="100%"
              stopColor="#22d3ee"
              stopOpacity="0"
            />
          </linearGradient>

          {/* Topographic glow */}

          <filter id="vn-topo-glow">
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

        {/* =====================================================
            FINE COORDINATE GRID
        ====================================================== */}

        <g opacity="0.16">
          {Array.from({ length: 13 }).map((_, index) => {
            const x = index * 100

            return (
              <line
                key={`vertical-${index}`}
                x1={x}
                y1="0"
                x2={x}
                y2="760"
                stroke="#38bdf8"
                strokeWidth="0.5"
                strokeDasharray="2 8"
              />
            )
          })}

          {Array.from({ length: 9 }).map((_, index) => {
            const y = index * 95

            return (
              <line
                key={`horizontal-${index}`}
                x1="0"
                y1={y}
                x2="1200"
                y2={y}
                stroke="#38bdf8"
                strokeWidth="0.5"
                strokeDasharray="2 8"
              />
            )
          })}
        </g>

        {/* =====================================================
            MAIN TOPOGRAPHIC CONTOURS
        ====================================================== */}

        <g filter="url(#vn-topo-glow)">
          {contourLines.map((line, index) => (
            <motion.path
              key={index}
              d={line.d}
              stroke="url(#vn-topographic-gradient)"
              strokeWidth={line.width}
              strokeOpacity={line.opacity}
              strokeLinecap="round"
              initial={{
                pathLength: 0.75,
                opacity: 0,
              }}
              animate={{
                pathLength: [0.75, 1, 0.75],
                opacity: [
                  line.opacity * 0.55,
                  line.opacity,
                  line.opacity * 0.55,
                ],
              }}
              transition={{
                duration: 7,
                delay: line.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </g>

        {/* =====================================================
            TERRAIN ELEVATION RINGS
        ====================================================== */}

        <g
          transform="translate(820 500)"
          stroke="#22d3ee"
          fill="none"
        >
          <motion.ellipse
            rx="230"
            ry="95"
            strokeOpacity="0.08"
            strokeWidth="1"
            animate={{
              scale: [1, 1.04, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <ellipse
            rx="185"
            ry="75"
            strokeOpacity="0.09"
            strokeWidth="1"
          />

          <ellipse
            rx="140"
            ry="56"
            strokeOpacity="0.1"
            strokeWidth="1"
          />

          <ellipse
            rx="95"
            ry="38"
            strokeOpacity="0.12"
            strokeWidth="1"
          />

          <ellipse
            rx="48"
            ry="20"
            strokeOpacity="0.16"
            strokeWidth="1"
          />

          <motion.circle
            r="5"
            fill="#22d3ee"
            stroke="none"
            animate={{
              opacity: [0.25, 1, 0.25],
              r: [3, 5, 3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </g>

        {/* =====================================================
            SCANNING BEAM
        ====================================================== */}

        <motion.rect
          x="0"
          y="-100"
          width="1200"
          height="90"
          fill="url(#vn-scan-gradient)"
          initial={{
            y: -100,
          }}
          animate={{
            y: [0, 760, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
          opacity="0.16"
        />

        {/* =====================================================
            TERRAIN INTELLIGENCE POINTS
        ====================================================== */}

        {scanPoints.map((point, index) => (
          <g key={index}>
            <motion.circle
              cx={point.cx}
              cy={point.cy}
              r="3"
              fill="#67e8f9"
              animate={{
                opacity: [0.2, 1, 0.2],
                r: [2, 4, 2],
              }}
              transition={{
                duration: 2.5,
                delay: index * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <motion.circle
              cx={point.cx}
              cy={point.cy}
              r="10"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1"
              animate={{
                r: [5, 18, 5],
                opacity: [0.35, 0, 0.35],
              }}
              transition={{
                duration: 3,
                delay: index * 0.35,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          </g>
        ))}

        {/* =====================================================
            TOPOGRAPHIC CROSSHAIR
        ====================================================== */}

        <g transform="translate(600 210)">
          <motion.circle
            r="28"
            stroke="#38bdf8"
            strokeOpacity="0.12"
            strokeWidth="1"
            strokeDasharray="3 5"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <circle
            r="4"
            fill="#22d3ee"
            fillOpacity="0.5"
          />

          <line
            x1="-42"
            y1="0"
            x2="-10"
            y2="0"
            stroke="#38bdf8"
            strokeOpacity="0.15"
          />

          <line
            x1="10"
            y1="0"
            x2="42"
            y2="0"
            stroke="#38bdf8"
            strokeOpacity="0.15"
          />

          <line
            x1="0"
            y1="-42"
            x2="0"
            y2="-10"
            stroke="#38bdf8"
            strokeOpacity="0.15"
          />

          <line
            x1="0"
            y1="10"
            x2="0"
            y2="42"
            stroke="#38bdf8"
            strokeOpacity="0.15"
          />
        </g>
      </svg>

      {/* =====================================================
          COORDINATE LABELS
      ====================================================== */}

      <div className="absolute left-5 top-1/3 hidden font-mono text-[8px] uppercase tracking-[0.22em] text-cyan-300/30 md:block">
        <div>26°N</div>

        <div className="mt-8">
          25°N
        </div>

        <div className="mt-8">
          24°N
        </div>

        <div className="mt-8">
          23°N
        </div>
      </div>

      {/* =====================================================
          TECHNICAL LABEL
      ====================================================== */}

      <div className="absolute right-6 top-24 hidden text-right font-mono md:block">
        <div className="text-[8px] uppercase tracking-[0.25em] text-cyan-300/40">
          TOPOGRAPHIC SCAN
        </div>

        <div className="mt-2 text-[7px] tracking-[0.2em] text-white/20">
          TERRAIN / ELEVATION / NER
        </div>
      </div>

      {/* =====================================================
          CORNER REGISTRATION MARKS
      ====================================================== */}

      <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-cyan-400/20" />

      <div className="absolute right-4 top-4 h-6 w-6 border-r border-t border-cyan-400/20" />

      <div className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-cyan-400/20" />

      <div className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-cyan-400/20" />

      {/* =====================================================
          BOTTOM TELEMETRY
      ====================================================== */}

      <div className="absolute bottom-6 right-7 hidden font-mono text-[7px] uppercase tracking-[0.22em] text-cyan-300/30 md:block">
        TERRAIN INTELLIGENCE // SCAN ACTIVE
      </div>
    </div>
  )
}