import React from 'react'
import { motion } from 'motion/react'
import {
  Check,
  CircleUserRound,
  Database,
  Fingerprint,
  KeyRound,
  Network,
  Radio,
  ShieldCheck,
  UserPlus,
} from 'lucide-react'

const steps = [
  'IDENTITY PROFILE',
  'SECURE CREDENTIAL',
  'MONITORING ACCESS',
]

export default function CreateAccess() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Ambient atmosphere */}

      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.035] blur-[110px]" />

      <div className="absolute right-[10%] top-[15%] h-[260px] w-[260px] rounded-full bg-sky-500/[0.03] blur-[90px]" />

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56,189,248,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.16) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      {/* Registration network */}

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 760"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="vn-create-network"
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
              offset="50%"
              stopColor="#38bdf8"
              stopOpacity="0.5"
            />

            <stop
              offset="100%"
              stopColor="#22d3ee"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        <path
          d="M150 180 L400 290 L600 380 L830 280 L1050 170"
          fill="none"
          stroke="url(#vn-create-network)"
          strokeWidth="1"
          strokeDasharray="5 9"
        />

        <path
          d="M180 570 L390 470 L600 390 L820 480 L1040 570"
          fill="none"
          stroke="url(#vn-create-network)"
          strokeWidth="1"
          strokeDasharray="5 9"
        />

        <path
          d="M600 90 L600 670"
          fill="none"
          stroke="#22d3ee"
          strokeOpacity="0.12"
          strokeWidth="1"
          strokeDasharray="3 10"
        />

        <motion.circle
          cx="600"
          cy="380"
          r="95"
          fill="none"
          stroke="#22d3ee"
          strokeOpacity="0.12"
          strokeWidth="1"
          strokeDasharray="4 8"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>

      {/* Central identity node */}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

        <motion.div
          className="absolute -inset-16 rounded-full border border-cyan-400/10"
          animate={{
            scale: [0.96, 1.04, 0.96],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="
            relative flex h-36 w-36
            items-center justify-center
            rounded-full
            border border-cyan-300/25
            bg-slate-950/75
            shadow-[0_0_70px_rgba(34,211,238,0.14)]
            backdrop-blur-xl
          "
        >
          <div className="absolute inset-3 rounded-full border border-dashed border-cyan-300/15" />

          <div className="flex flex-col items-center">
            <Fingerprint className="h-8 w-8 text-cyan-300" />

            <span className="mt-2 font-mono text-[9px] tracking-[0.28em] text-cyan-300">
              IDENTITY
            </span>

            <span className="mt-1 font-mono text-[7px] tracking-[0.2em] text-slate-500">
              REGISTRATION CORE
            </span>
          </div>
        </motion.div>
      </div>

      {/* Floating nodes */}

      <motion.div
        className="absolute left-[13%] top-[25%]"
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        <div className="flex items-center gap-3 rounded-xl border border-cyan-300/10 bg-slate-950/50 px-4 py-3 backdrop-blur-md">
          <CircleUserRound className="h-4 w-4 text-cyan-300" />

          <div>
            <p className="font-mono text-[8px] tracking-[0.18em] text-cyan-300">
              OPERATOR PROFILE
            </p>

            <p className="mt-1 font-mono text-[7px] text-slate-500">
              IDENTITY CHANNEL
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-[10%] top-[28%]"
        animate={{ y: [0, 5, 0] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
        }}
      >
        <div className="flex items-center gap-3 rounded-xl border border-cyan-300/10 bg-slate-950/50 px-4 py-3 backdrop-blur-md">
          <KeyRound className="h-4 w-4 text-cyan-300" />

          <div>
            <p className="font-mono text-[8px] tracking-[0.18em] text-cyan-300">
              CREDENTIAL VAULT
            </p>

            <p className="mt-1 font-mono text-[7px] text-slate-500">
              ENCRYPTION READY
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[25%] left-[10%]"
        animate={{ y: [0, 4, 0] }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
        }}
      >
        <div className="flex items-center gap-3 rounded-xl border border-cyan-300/10 bg-slate-950/50 px-4 py-3 backdrop-blur-md">
          <Network className="h-4 w-4 text-cyan-300" />

          <div>
            <p className="font-mono text-[8px] tracking-[0.18em] text-cyan-300">
              NETWORK NODE
            </p>

            <p className="mt-1 font-mono text-[7px] text-slate-500">
              ACCESS ROUTE
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[24%] right-[10%]"
        animate={{
          opacity: [0.45, 1, 0.45],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
        }}
      >
        <div className="flex items-center gap-3 rounded-xl border border-emerald-400/10 bg-slate-950/50 px-4 py-3 backdrop-blur-md">
          <Radio className="h-4 w-4 text-emerald-300" />

          <div>
            <p className="font-mono text-[8px] tracking-[0.18em] text-emerald-300">
              MONITORING ACCESS
            </p>

            <p className="mt-1 font-mono text-[7px] text-slate-500">
              READY TO ACTIVATE
            </p>
          </div>
        </div>
      </motion.div>

      {/* Registration steps */}

      <div className="absolute bottom-9 left-8 hidden md:block">
        <div className="border-b border-l border-cyan-400/20 pb-5 pl-4">
          <p className="mb-4 font-mono text-[8px] tracking-[0.25em] text-cyan-300">
            ACCESS INITIALIZATION
          </p>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <motion.div
                key={step}
                className="flex items-center gap-3"
                initial={{ opacity: 0.25 }}
                animate={{
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 2.8,
                  delay: index * 0.5,
                  repeat: Infinity,
                }}
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-cyan-300/25">
                  {index === 0 ? (
                    <Check className="h-3 w-3 text-cyan-300" />
                  ) : (
                    <span className="font-mono text-[7px] text-cyan-300">
                      0{index + 1}
                    </span>
                  )}
                </div>

                <span className="font-mono text-[8px] tracking-[0.16em] text-slate-400">
                  {step}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Security status */}

      <div className="absolute right-8 top-8 hidden items-center gap-2 font-mono text-[7px] tracking-[0.2em] text-emerald-400 md:flex">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        SECURE REGISTRATION CHANNEL
      </div>

      {/* Identity verification label */}

      <motion.div
        className="absolute left-[56%] top-[20%] hidden md:block"
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-cyan-400/30" />

          <div>
            <p className="font-mono text-[8px] tracking-[0.2em] text-cyan-300">
              IDENTITY VERIFICATION
            </p>

            <p className="mt-1 font-mono text-[7px] text-slate-600">
              ESTABLISHING SECURE PROFILE...
            </p>
          </div>
        </div>
      </motion.div>

      {/* Data stream */}

      <div className="absolute left-8 top-[14%] hidden md:block">
        <div className="flex items-center gap-3">
          <Database className="h-4 w-4 text-cyan-300/50" />

          <div>
            <p className="font-mono text-[8px] tracking-[0.2em] text-cyan-300/60">
              PROFILE DATA
            </p>

            <p className="mt-1 font-mono text-[7px] text-slate-600">
              CHANNEL ENCRYPTED
            </p>
          </div>
        </div>
      </div>

      {/* Shield marker */}

      <motion.div
        className="absolute bottom-[13%] right-[7%]"
        animate={{
          scale: [0.95, 1.05, 0.95],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        <ShieldCheck className="h-5 w-5 text-cyan-300/40" />
      </motion.div>

      {/* Scan line */}

      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent"
        animate={{
          top: ['10%', '90%', '10%'],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Corner HUD */}

      <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-cyan-400/25" />
      <div className="absolute right-4 top-4 h-6 w-6 border-r border-t border-cyan-400/25" />
      <div className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-cyan-400/25" />
      <div className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-cyan-400/25" />

      {/* Bottom registration channel */}

      <div className="absolute bottom-7 right-[22%] hidden items-center gap-3 md:flex">
        <div className="h-px w-24 bg-cyan-400/25" />

        <span className="font-mono text-[8px] tracking-[0.2em] text-cyan-300/60">
          NEW OPERATOR CHANNEL
        </span>

        <UserPlus className="h-3.5 w-3.5 text-cyan-300/50" />
      </div>
    </div>
  )
}