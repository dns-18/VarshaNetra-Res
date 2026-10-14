import React from 'react'
import { motion } from 'motion/react'

const streams = [
  { y: 90, width: 310, delay: 0 },
  { y: 145, width: 230, delay: 0.7 },
  { y: 200, width: 360, delay: 1.2 },
  { y: 255, width: 270, delay: 0.4 },
  { y: 310, width: 330, delay: 1.6 },
  { y: 365, width: 210, delay: 0.9 },
]

export default function DataStream() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        right-[-40px]
        top-8
        hidden
        h-[430px]
        w-[520px]
        overflow-hidden
        md:block
      "
      aria-hidden="true"
    >
      {/* Analysis field */}
      <div className="
        absolute
        right-20
        top-20
        h-64
        w-64
        rounded-full
        bg-cyan-400/[0.04]
        blur-3xl
      " />

      <svg
        viewBox="0 0 520 430"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient
            id="vn-data-stream"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop
              offset="0%"
              stopColor="#22d3ee"
              stopOpacity="0"
            />

            <stop
              offset="35%"
              stopColor="#22d3ee"
              stopOpacity="0.5"
            />

            <stop
              offset="70%"
              stopColor="#60a5fa"
              stopOpacity="0.75"
            />

            <stop
              offset="100%"
              stopColor="#22d3ee"
              stopOpacity="0"
            />
          </linearGradient>

          <linearGradient
            id="vn-analysis-line"
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
              offset="50%"
              stopColor="#38bdf8"
              stopOpacity="0.4"
            />

            <stop
              offset="100%"
              stopColor="#38bdf8"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {/* Vertical analysis grid */}
        {[80, 160, 240, 320, 400, 480].map((x) => (
          <motion.line
            key={x}
            x1={x}
            y1="45"
            x2={x}
            y2="395"
            stroke="#38bdf8"
            strokeOpacity="0.08"
            strokeWidth="1"
            animate={{
              opacity: [0.25, 0.7, 0.25],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: x / 300,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Horizontal data streams */}
        {streams.map((stream, index) => (
          <g key={stream.y}>
            {/* Base line */}
            <line
              x1="40"
              y1={stream.y}
              x2="500"
              y2={stream.y}
              stroke="url(#vn-analysis-line)"
              strokeWidth="1"
            />

            {/* Moving data signal */}
            <motion.line
              x1="55"
              y1={stream.y}
              x2={55 + stream.width}
              y2={stream.y}
              stroke="url(#vn-data-stream)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              animate={{
                pathLength: [0, 1, 1],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                delay: stream.delay,
                ease: 'easeInOut',
              }}
            />

            {/* Data node */}
            <motion.circle
              cx={100 + index * 55}
              cy={stream.y}
              r="2.5"
              fill="#22d3ee"
              animate={{
                opacity: [0.2, 1, 0.2],
                r: [2, 3.5, 2],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: stream.delay,
              }}
            />
          </g>
        ))}

        {/* Historical trend / analysis line */}
        <motion.path
          d="
            M40 335
            C105 300 125 320 180 275
            S270 300 315 230
            S400 210 485 125
          "
          stroke="#67e8f9"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeDasharray="5 7"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={{
            pathLength: 1,
            opacity: 0.5,
          }}
          transition={{
            duration: 2.8,
            ease: 'easeOut',
          }}
        />

        {/* Moving analysis point */}
        <motion.circle
          r="4"
          fill="#67e8f9"
          initial={{
            cx: 40,
            cy: 335,
            opacity: 0,
          }}
          animate={{
            cx: [40, 180, 315, 485],
            cy: [335, 275, 230, 125],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Vertical scanning line */}
        <motion.line
          x1="40"
          y1="50"
          x2="40"
          y2="390"
          stroke="#22d3ee"
          strokeOpacity="0.3"
          strokeWidth="1"
          animate={{
            x1: [40, 490, 40],
            x2: [40, 490, 40],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>

      {/* Technical labels */}
      <div className="
        absolute
        right-10
        top-12
        font-mono
        text-[8px]
        uppercase
        tracking-[0.22em]
        text-cyan-300/55
      ">
        HISTORICAL INTELLIGENCE
      </div>

      <div className="
        absolute
        right-10
        top-[82px]
        font-mono
        text-[7px]
        tracking-[0.2em]
        text-cyan-300/35
      ">
        T+72H · TREND ENGINE
      </div>

      <div className="
        absolute
        bottom-14
        right-10
        font-mono
        text-[8px]
        tracking-[0.18em]
        text-white/30
      ">
        DATA STREAM // ANALYSIS
      </div>
    </div>
  )
}