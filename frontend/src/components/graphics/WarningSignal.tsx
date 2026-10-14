import React from 'react'
import { motion } from 'motion/react'

export default function WarningSignal() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        right-0
        top-0
        z-0
        hidden
        h-[430px]
        w-[760px]
        overflow-hidden
        opacity-80
        lg:block
      "
      aria-hidden="true"
    >
      {/* =====================================================
          AMBIENT WARNING GLOW
          ===================================================== */}

      <div className="absolute right-20 top-16 h-72 w-72 rounded-full bg-red-500/[0.035] blur-3xl" />

      <div className="absolute right-52 top-20 h-52 w-52 rounded-full bg-orange-400/[0.025] blur-3xl" />

      {/* =====================================================
          TECHNICAL GRID
          ===================================================== */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.14]
          [mask-image:linear-gradient(to_left,black,transparent)]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(56,189,248,0.35) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(56,189,248,0.35) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '42px 42px',
        }}
      />

      {/* =====================================================
          BROADCAST WAVES
          ===================================================== */}

      <div className="absolute right-[175px] top-[150px] h-40 w-40">

        <motion.div
          className="
            absolute
            inset-0
            rounded-full
            border
            border-red-400/20
          "
          animate={{
            scale: [0.55, 1.8],
            opacity: [0.7, 0],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />

        <motion.div
          className="
            absolute
            inset-0
            rounded-full
            border
            border-orange-400/15
          "
          animate={{
            scale: [0.35, 2.4],
            opacity: [0.55, 0],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            delay: 0.8,
            ease: 'easeOut',
          }}
        />

        <motion.div
          className="
            absolute
            inset-0
            rounded-full
            border
            border-sky-400/10
          "
          animate={{
            scale: [0.25, 3],
            opacity: [0.45, 0],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            delay: 1.6,
            ease: 'easeOut',
          }}
        />

        {/* Origin node */}

        <motion.div
          className="
            absolute
            left-1/2
            top-1/2
            h-3
            w-3
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-red-400
            shadow-[0_0_18px_rgba(248,113,113,0.8)]
          "
          animate={{
            scale: [1, 1.35, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-7
            w-7
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-red-400/30
          "
        />
      </div>

      {/* =====================================================
          EMERGENCY WAVEFORM
          ===================================================== */}

      <svg
        className="absolute inset-x-0 top-[205px] h-[150px] w-full"
        viewBox="0 0 760 150"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>

          <linearGradient
            id="vn-warning-wave"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop
              offset="0"
              stopColor="#38bdf8"
              stopOpacity="0"
            />

            <stop
              offset="0.25"
              stopColor="#38bdf8"
              stopOpacity="0.12"
            />

            <stop
              offset="0.52"
              stopColor="#f97316"
              stopOpacity="0.7"
            />

            <stop
              offset="0.68"
              stopColor="#ef4444"
              stopOpacity="0.85"
            />

            <stop
              offset="1"
              stopColor="#ef4444"
              stopOpacity="0"
            />
          </linearGradient>

          <filter id="vn-warning-glow">
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

        {/* Main emergency waveform */}

        <motion.path
          d="
            M0 78
            C35 78 42 78 62 78
            C80 78 82 78 92 78
            L108 78
            L116 52
            L124 104
            L134 24
            L144 128
            L154 58
            L164 78
            C190 78 215 78 242 78
            C270 78 294 78 320 78
            C348 78 372 78 400 78
            C428 78 448 78 475 78
            C500 78 516 78 535 78
            L550 55
            L558 101
            L568 36
            L578 120
            L588 60
            L600 78
            C628 78 650 78 680 78
            C710 78 735 78 760 78
          "
          stroke="url(#vn-warning-wave)"
          strokeWidth="2"
          filter="url(#vn-warning-glow)"
          animate={{
            opacity: [0.35, 0.9, 0.35],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Secondary signal */}

        <path
          d="
            M0 80
            C100 80 130 80 200 80
            S300 80 380 80
            S500 80 580 80
            S680 80 760 80
          "
          stroke="#38bdf8"
          strokeOpacity="0.08"
          strokeWidth="1"
          strokeDasharray="4 9"
        />
      </svg>

      {/* =====================================================
          SIGNAL NODES
          ===================================================== */}

      <div className="absolute right-[430px] top-[190px]">

        <motion.span
          className="block h-1.5 w-1.5 rounded-full bg-sky-400"
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

      </div>

      <div className="absolute right-[290px] top-[260px]">

        <motion.span
          className="block h-1.5 w-1.5 rounded-full bg-orange-400"
          animate={{
            opacity: [0.25, 1, 0.25],
            scale: [0.8, 1.5, 0.8],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: 0.5,
          }}
        />

      </div>

      <div className="absolute right-[90px] top-[235px]">

        <motion.span
          className="block h-1.5 w-1.5 rounded-full bg-red-400"
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.5, 0.8],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            delay: 1,
          }}
        />

      </div>

      {/* =====================================================
          TECHNICAL LABELS
          ===================================================== */}

      <div
        className="
          absolute
          right-10
          top-12
          text-right
          font-mono
        "
      >
        <div className="text-[9px] font-semibold uppercase tracking-[0.25em] text-red-300/55">
          ALERT PROPAGATION
        </div>

        <div className="mt-1 text-[8px] uppercase tracking-[0.2em] text-sky-300/35">
          EARLY WARNING NETWORK
        </div>
      </div>

      <div
        className="
          absolute
          bottom-12
          right-10
          flex
          items-center
          gap-2
          font-mono
          text-[8px]
          uppercase
          tracking-[0.18em]
          text-text-muted/40
        "
      >
        <span className="h-px w-8 bg-red-400/30" />

        SIGNAL ACTIVE

        <span className="h-1 w-1 rounded-full bg-red-400/60" />
      </div>

      {/* =====================================================
          CORNER MARKERS
          ===================================================== */}

      <div className="absolute right-6 top-6 h-5 w-5 border-r border-t border-red-400/20" />

      <div className="absolute bottom-8 right-6 h-5 w-5 border-b border-r border-sky-400/15" />

    </div>
  )
}