import React from 'react'
import { motion } from 'motion/react'

const nodes = [
  {
    x: 28,
    y: 31,
    label: 'DATA',
    delay: 0,
  },
  {
    x: 72,
    y: 31,
    label: 'GIS',
    delay: 0.5,
  },
  {
    x: 22,
    y: 69,
    label: 'WEATHER',
    delay: 1,
  },
  {
    x: 78,
    y: 69,
    label: 'RISK',
    delay: 1.5,
  },
]

export default function MonitoringNode() {
  return (
    <div
      className="
        pointer-events-none absolute inset-0
        overflow-hidden
      "
      aria-hidden="true"
    >
      {/* Atmospheric glow */}

      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.035] blur-[110px]" />

      <div className="absolute left-[10%] top-[20%] h-56 w-56 rounded-full bg-sky-400/[0.02] blur-[90px]" />

      <svg
        viewBox="0 0 1000 720"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <radialGradient
            id="node-core-gradient"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop
              offset="0%"
              stopColor="#67e8f9"
              stopOpacity="0.5"
            />

            <stop
              offset="50%"
              stopColor="#22d3ee"
              stopOpacity="0.12"
            />

            <stop
              offset="100%"
              stopColor="#22d3ee"
              stopOpacity="0"
            />
          </radialGradient>

          <linearGradient
            id="node-line-gradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#38bdf8"
              stopOpacity="0"
            />

            <stop
              offset="50%"
              stopColor="#22d3ee"
              stopOpacity="0.5"
            />

            <stop
              offset="100%"
              stopColor="#38bdf8"
              stopOpacity="0"
            />
          </linearGradient>

          <filter id="node-glow">
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
            BACKGROUND GRID
        ====================================================== */}

        <g opacity="0.15">
          {Array.from({ length: 11 }).map((_, index) => (
            <line
              key={`vertical-${index}`}
              x1={index * 100}
              y1="0"
              x2={index * 100}
              y2="720"
              stroke="#38bdf8"
              strokeWidth="0.5"
              strokeDasharray="2 9"
            />
          ))}

          {Array.from({ length: 8 }).map((_, index) => (
            <line
              key={`horizontal-${index}`}
              x1="0"
              y1={index * 100}
              x2="1000"
              y2={index * 100}
              stroke="#38bdf8"
              strokeWidth="0.5"
              strokeDasharray="2 9"
            />
          ))}
        </g>

        {/* =====================================================
            NETWORK CONNECTIONS
        ====================================================== */}

        <g
          stroke="url(#node-line-gradient)"
          strokeWidth="1"
          strokeOpacity="0.4"
        >
          <path d="M280 220 L500 360" />
          <path d="M720 220 L500 360" />
          <path d="M220 500 L500 360" />
          <path d="M780 500 L500 360" />

          <path d="M280 220 L720 220" />
          <path d="M220 500 L780 500" />
        </g>

        {/* =====================================================
            ANIMATED DATA PACKETS
        ====================================================== */}

        {[0, 1, 2, 3].map((index) => (
          <motion.circle
            key={`packet-${index}`}
            r="3"
            fill="#67e8f9"
            initial={{
              cx: [
                280,
                720,
                220,
                780,
              ][index],
              cy: [
                220,
                220,
                500,
                500,
              ][index],
              opacity: 0,
            }}
            animate={{
              cx: [
                [
                  280,
                  720,
                  220,
                  780,
                ][index],
                500,
              ],
              cy: [
                [
                  220,
                  220,
                  500,
                  500,
                ][index],
                360,
              ],
              opacity: [
                0,
                1,
                0,
              ],
            }}
            transition={{
              duration: 2.8,
              delay: index * 0.7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* =====================================================
            CENTRAL NODE
        ====================================================== */}

        <g transform="translate(500 360)">
          {/* Large field */}

          <motion.circle
            r="150"
            fill="url(#node-core-gradient)"
            animate={{
              scale: [
                0.9,
                1.05,
                0.9,
              ],
              opacity: [
                0.35,
                0.65,
                0.35,
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Outer rotating ring */}

          <motion.circle
            r="100"
            stroke="#22d3ee"
            strokeOpacity="0.1"
            strokeWidth="1"
            strokeDasharray="3 8"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Secondary ring */}

          <motion.circle
            r="76"
            stroke="#38bdf8"
            strokeOpacity="0.14"
            strokeWidth="1"
            animate={{
              scale: [
                1,
                1.04,
                1,
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Core ring */}

          <circle
            r="52"
            stroke="#22d3ee"
            strokeOpacity="0.2"
            strokeWidth="1"
          />

          {/* Core */}

          <motion.circle
            r="20"
            fill="#22d3ee"
            fillOpacity="0.08"
            stroke="#67e8f9"
            strokeOpacity="0.5"
            strokeWidth="1"
            animate={{
              r: [
                17,
                23,
                17,
              ],
              opacity: [
                0.5,
                1,
                0.5,
              ],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <circle
            r="6"
            fill="#67e8f9"
            fillOpacity="0.85"
          />

          {/* Crosshair */}

          <line
            x1="-125"
            y1="0"
            x2="-82"
            y2="0"
            stroke="#22d3ee"
            strokeOpacity="0.16"
          />

          <line
            x1="82"
            y1="0"
            x2="125"
            y2="0"
            stroke="#22d3ee"
            strokeOpacity="0.16"
          />

          <line
            x1="0"
            y1="-125"
            x2="0"
            y2="-82"
            stroke="#22d3ee"
            strokeOpacity="0.16"
          />

          <line
            x1="0"
            y1="82"
            x2="0"
            y2="125"
            stroke="#22d3ee"
            strokeOpacity="0.16"
          />
        </g>

        {/* =====================================================
            SURROUNDING NODES
        ====================================================== */}

        {nodes.map((node, index) => (
          <g
            key={node.label}
            transform={`translate(${node.x * 10} ${
              node.y * 7.2
            })`}
          >
            {/* Connection pulse */}

            <motion.circle
              r="28"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1"
              animate={{
                r: [
                  18,
                  42,
                  18,
                ],
                opacity: [
                  0.25,
                  0,
                  0.25,
                ],
              }}
              transition={{
                duration: 3,
                delay: node.delay,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />

            {/* Node */}

            <motion.circle
              r="14"
              fill="#07141d"
              stroke="#22d3ee"
              strokeOpacity="0.35"
              strokeWidth="1"
              animate={{
                opacity: [
                  0.55,
                  1,
                  0.55,
                ],
              }}
              transition={{
                duration: 2.5,
                delay: node.delay,
                repeat: Infinity,
              }}
            />

            <motion.circle
              r="4"
              fill="#67e8f9"
              animate={{
                scale: [
                  0.7,
                  1.2,
                  0.7,
                ],
                opacity: [
                  0.4,
                  1,
                  0.4,
                ],
              }}
              transition={{
                duration: 2,
                delay: node.delay,
                repeat: Infinity,
              }}
            />
          </g>
        ))}

        {/* =====================================================
            SCANNING FIELD
        ====================================================== */}

        <motion.line
          x1="100"
          y1="0"
          x2="100"
          y2="720"
          stroke="#22d3ee"
          strokeOpacity="0.08"
          strokeWidth="1"
          animate={{
            x1: [
              100,
              900,
              100,
            ],
            x2: [
              100,
              900,
              100,
            ],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* =====================================================
            SMALL SIGNAL POINTS
        ====================================================== */}

        {[
          [140, 160],
          [840, 155],
          [110, 580],
          [890, 580],
          [370, 110],
          [650, 115],
        ].map(([cx, cy], index) => (
          <motion.circle
            key={index}
            cx={cx}
            cy={cy}
            r="2.5"
            fill="#67e8f9"
            animate={{
              opacity: [
                0.15,
                1,
                0.15,
              ],
              r: [
                2,
                4,
                2,
              ],
            }}
            transition={{
              duration: 2.2,
              delay: index * 0.35,
              repeat: Infinity,
            }}
          />
        ))}
      </svg>

      {/* =====================================================
          TOP LABEL
      ====================================================== */}

      <div className="absolute left-6 top-7 hidden font-mono md:block">
        <div className="text-[8px] uppercase tracking-[0.28em] text-cyan-300/45">
          MONITORING NETWORK
        </div>

        <div className="mt-2 text-[7px] uppercase tracking-[0.2em] text-white/20">
          NODE INITIALIZATION PROTOCOL
        </div>
      </div>

      {/* =====================================================
          NODE LABELS
      ====================================================== */}

      <div className="absolute left-[19%] top-[27%] hidden font-mono md:block">
        <div className="text-[8px] uppercase tracking-[0.2em] text-cyan-300/55">
          DATA NODE
        </div>

        <div className="mt-1 text-[7px] text-white/20">
          INPUT STREAM
        </div>
      </div>

      <div className="absolute right-[18%] top-[27%] hidden text-right font-mono md:block">
        <div className="text-[8px] uppercase tracking-[0.2em] text-cyan-300/55">
          GIS NODE
        </div>

        <div className="mt-1 text-[7px] text-white/20">
          TERRAIN FEED
        </div>
      </div>

      <div className="absolute bottom-[23%] left-[13%] hidden font-mono md:block">
        <div className="text-[8px] uppercase tracking-[0.2em] text-cyan-300/55">
          WEATHER NODE
        </div>

        <div className="mt-1 text-[7px] text-white/20">
          RAINFALL / ATMOSPHERE
        </div>
      </div>

      <div className="absolute bottom-[23%] right-[13%] hidden text-right font-mono md:block">
        <div className="text-[8px] uppercase tracking-[0.2em] text-cyan-300/55">
          RISK NODE
        </div>

        <div className="mt-1 text-[7px] text-white/20">
          PREDICTION ENGINE
        </div>
      </div>

      {/* =====================================================
          CENTER STATUS
      ====================================================== */}

      <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 translate-y-[70px] text-center font-mono md:block">
        <div className="text-[8px] uppercase tracking-[0.3em] text-cyan-300/60">
          NEW MONITORING NODE
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 text-[7px] uppercase tracking-[0.2em] text-emerald-300/50">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          INITIALIZATION READY
        </div>
      </div>

      {/* =====================================================
          BOTTOM SYSTEM STATUS
      ====================================================== */}

      <div className="absolute bottom-6 left-6 hidden items-center gap-4 font-mono md:flex">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

          <span className="text-[7px] uppercase tracking-[0.2em] text-white/25">
            NETWORK READY
          </span>
        </div>

        <span className="text-white/10">
          //
        </span>

        <span className="text-[7px] uppercase tracking-[0.2em] text-cyan-300/35">
          04 REGIONAL NODES
        </span>
      </div>

      {/* =====================================================
          CORNER MARKERS
      ====================================================== */}

      <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-cyan-400/15" />

      <div className="absolute right-4 top-4 h-6 w-6 border-r border-t border-cyan-400/15" />

      <div className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-cyan-400/15" />

      <div className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-cyan-400/15" />
    </div>
  )
}