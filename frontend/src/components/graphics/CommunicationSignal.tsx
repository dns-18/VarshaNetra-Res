import React from 'react'
import { motion } from 'motion/react'

const nodes = [
  { x: 180, y: 220, label: 'FIELD' },
  { x: 390, y: 150, label: 'GIS' },
  { x: 600, y: 250, label: 'AI CORE' },
  { x: 820, y: 145, label: 'ALERT' },
  { x: 1030, y: 230, label: 'AUTHORITY' },
]

const connections = [
  { x1: 180, y1: 220, x2: 390, y2: 150, delay: 0 },
  { x1: 390, y1: 150, x2: 600, y2: 250, delay: 0.5 },
  { x1: 600, y1: 250, x2: 820, y2: 145, delay: 1 },
  { x1: 820, y1: 145, x2: 1030, y2: 230, delay: 1.5 },
  { x1: 180, y1: 220, x2: 600, y2: 250, delay: 2 },
  { x1: 600, y1: 250, x2: 1030, y2: 230, delay: 2.5 },
]

export default function CommunicationSignal() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Atmospheric signal glow */}
      <div className="absolute right-[12%] top-[18%] h-[420px] w-[420px] rounded-full bg-cyan-400/[0.025] blur-[110px]" />

      <svg
        viewBox="0 0 1200 700"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient
            id="vn-communication-gradient"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>

          <filter id="vn-signal-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Technical network grid */}
        <g opacity="0.12">
          {Array.from({ length: 13 }).map((_, index) => {
            const x = index * 100

            return (
              <line
                key={`v-${index}`}
                x1={x}
                y1="0"
                x2={x}
                y2="700"
                stroke="#38bdf8"
                strokeWidth="0.5"
                strokeDasharray="2 9"
              />
            )
          })}

          {Array.from({ length: 8 }).map((_, index) => {
            const y = index * 100

            return (
              <line
                key={`h-${index}`}
                x1="0"
                y1={y}
                x2="1200"
                y2={y}
                stroke="#38bdf8"
                strokeWidth="0.5"
                strokeDasharray="2 9"
              />
            )
          })}
        </g>

        {/* Network connections */}
        <g filter="url(#vn-signal-glow)">
          {connections.map((connection, index) => (
            <g key={index}>
              <line
                x1={connection.x1}
                y1={connection.y1}
                x2={connection.x2}
                y2={connection.y2}
                stroke="url(#vn-communication-gradient)"
                strokeWidth="1"
                strokeOpacity="0.18"
              />

              {/* Data travelling across connection */}
              <motion.circle
                r="2.5"
                fill="#67e8f9"
                initial={{
                  cx: connection.x1,
                  cy: connection.y1,
                  opacity: 0,
                }}
                animate={{
                  cx: [connection.x1, connection.x2],
                  cy: [connection.y1, connection.y2],
                  opacity: [0, 0.9, 0],
                }}
                transition={{
                  duration: 3,
                  delay: connection.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </g>
          ))}
        </g>

        {/* Communication nodes */}
        {nodes.map((node, index) => (
          <g key={node.label}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="5"
              fill="#22d3ee"
              animate={{
                opacity: [0.35, 1, 0.35],
                scale: [0.85, 1.2, 0.85],
              }}
              transition={{
                duration: 2.4,
                delay: index * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <motion.circle
              cx={node.x}
              cy={node.y}
              r="15"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1"
              animate={{
                r: [7, 25, 7],
                opacity: [0.35, 0, 0.35],
              }}
              transition={{
                duration: 3,
                delay: index * 0.35,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />

            <text
              x={node.x}
              y={node.y + 28}
              textAnchor="middle"
              fill="#67e8f9"
              fillOpacity="0.3"
              fontSize="7"
              fontFamily="monospace"
              letterSpacing="2"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* Central communication waves */}
        <g transform="translate(600 250)">
          {[45, 75, 105, 135].map((radius, index) => (
            <motion.circle
              key={radius}
              r={radius}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1"
              strokeOpacity={0.12 - index * 0.02}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.8, 1.08, 0.8],
                opacity: [0.15, 0.45, 0.15],
              }}
              transition={{
                duration: 4,
                delay: index * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          <circle
            r="6"
            fill="#22d3ee"
            fillOpacity="0.35"
          />

          <motion.circle
            r="10"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="1"
            animate={{
              r: [8, 18, 8],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </g>

        {/* Signal sweep */}
        <motion.line
          x1="0"
          y1="560"
          x2="1200"
          y2="560"
          stroke="url(#vn-communication-gradient)"
          strokeWidth="1"
          initial={{ x: -1200 }}
          animate={{ x: [0, 1200, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          opacity="0.18"
        />
      </svg>

      {/* Technical labels */}
      <div className="absolute left-5 top-24 hidden font-mono text-[8px] uppercase tracking-[0.22em] text-cyan-300/30 md:block">
        <div>COMMUNICATION LINK</div>
        <div className="mt-2">SIGNAL / RESPONSE / ACTION</div>
      </div>

      <div className="absolute right-6 bottom-24 hidden text-right font-mono md:block">
        <div className="text-[8px] uppercase tracking-[0.25em] text-cyan-300/35">
          RESPONSE NETWORK
        </div>
        <div className="mt-2 text-[7px] tracking-[0.2em] text-white/20">
          FIELD → AI → AUTHORITY
        </div>
      </div>

      {/* Corner brackets */}
      <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-cyan-400/20" />
      <div className="absolute right-4 top-4 h-6 w-6 border-r border-t border-cyan-400/20" />
      <div className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-cyan-400/20" />
      <div className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-cyan-400/20" />

      <div className="absolute bottom-6 left-6 hidden font-mono text-[7px] uppercase tracking-[0.22em] text-cyan-300/25 md:block">
        NER DISASTER RESPONSE // LINK ACTIVE
      </div>
    </div>
  )
}