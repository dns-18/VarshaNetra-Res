import React from 'react'
import { motion } from 'motion/react'

const nodes = [
  { x: 105, y: 110, label: 'API', delay: 0 },
  { x: 250, y: 75, label: 'ML', delay: 0.5 },
  { x: 390, y: 125, label: 'GIS', delay: 1 },
  { x: 175, y: 235, label: 'DATA', delay: 1.4 },
  { x: 325, y: 255, label: 'RISK', delay: 0.8 },
  { x: 445, y: 330, label: 'ALERT', delay: 1.8 },
]

const connections = [
  [105, 110, 250, 75],
  [250, 75, 390, 125],
  [105, 110, 175, 235],
  [250, 75, 325, 255],
  [390, 125, 325, 255],
  [175, 235, 325, 255],
  [325, 255, 445, 330],
]

export default function SystemNetwork() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        right-[-20px]
        top-8
        hidden
        h-[410px]
        w-[520px]
        overflow-hidden
        md:block
      "
      aria-hidden="true"
    >
      {/* Network atmosphere */}
      <div className="
        absolute
        right-20
        top-16
        h-72
        w-72
        rounded-full
        bg-cyan-400/[0.035]
        blur-3xl
      " />

      <svg
        viewBox="0 0 520 410"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient
            id="vn-network-line"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#22d3ee"
              stopOpacity="0.08"
            />

            <stop
              offset="50%"
              stopColor="#38bdf8"
              stopOpacity="0.42"
            />

            <stop
              offset="100%"
              stopColor="#22d3ee"
              stopOpacity="0.08"
            />
          </linearGradient>

          <radialGradient id="vn-node-glow">
            <stop
              offset="0%"
              stopColor="#67e8f9"
              stopOpacity="0.8"
            />

            <stop
              offset="100%"
              stopColor="#67e8f9"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        {/* Configuration grid */}
        <path
          d="M55 50 H475"
          stroke="#38bdf8"
          strokeOpacity="0.05"
        />

        <path
          d="M55 365 H475"
          stroke="#38bdf8"
          strokeOpacity="0.05"
        />

        {[90, 190, 290, 390, 450].map((x) => (
          <line
            key={x}
            x1={x}
            y1="45"
            x2={x}
            y2="365"
            stroke="#38bdf8"
            strokeOpacity="0.045"
          />
        ))}

        {/* Network connections */}
        {connections.map(
          ([x1, y1, x2, y2], index) => (
            <g key={index}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#vn-network-line)"
                strokeWidth="1"
              />

              {/* Data travelling through connection */}
              <motion.circle
                r="2.5"
                fill="#67e8f9"
                initial={{
                  cx: x1,
                  cy: y1,
                  opacity: 0,
                }}
                animate={{
                  cx: [x1, x2],
                  cy: [y1, y2],
                  opacity: [0, 0.9, 0],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  delay: index * 0.45,
                  ease: 'linear',
                }}
              />
            </g>
          )
        )}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.label}>
            {/* Outer glow */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="25"
              fill="url(#vn-node-glow)"
              animate={{
                opacity: [0.08, 0.28, 0.08],
                r: [20, 28, 20],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                delay: node.delay,
                ease: 'easeInOut',
              }}
            />

            {/* Node ring */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="10"
              stroke="#67e8f9"
              strokeOpacity="0.35"
              strokeWidth="1"
              animate={{
                strokeOpacity: [0.2, 0.65, 0.2],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: node.delay,
              }}
            />

            {/* Node core */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="3"
              fill="#67e8f9"
              animate={{
                opacity: [0.35, 1, 0.35],
                scale: [0.8, 1.15, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: node.delay,
              }}
            />
          </g>
        ))}

        {/* Central configuration pulse */}
        <motion.circle
          cx="250"
          cy="190"
          r="32"
          stroke="#22d3ee"
          strokeOpacity="0.12"
          strokeWidth="1"
          strokeDasharray="3 6"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transformOrigin: '250px 190px',
          }}
        />

        {/* Scan sweep */}
        <motion.line
          x1="60"
          y1="40"
          x2="60"
          y2="370"
          stroke="#22d3ee"
          strokeOpacity="0.18"
          strokeWidth="1"
          animate={{
            x1: [60, 470, 60],
            x2: [60, 470, 60],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>

      {/* Technical labels */}
      <div
        className="
          absolute
          right-10
          top-10
          font-mono
          text-[8px]
          font-medium
          uppercase
          tracking-[0.22em]
          text-cyan-300/55
        "
      >
        SYSTEM ARCHITECTURE
      </div>

      <div
        className="
          absolute
          right-10
          top-[31px]
          font-mono
          text-[7px]
          tracking-[0.18em]
          text-cyan-300/30
        "
      >
        CONFIGURATION // TELEMETRY
      </div>

      <div
        className="
          absolute
          bottom-12
          right-10
          font-mono
          text-[8px]
          tracking-[0.18em]
          text-white/30
        "
      >
        NETWORK STATUS · SYNCHRONIZED
      </div>
    </div>
  )
}