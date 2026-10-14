import React from 'react'
import { motion } from 'motion/react'
import {
  Activity,
  CloudRain,
  Database,
  MapPin,
  Mountain,
  Radio,
  ShieldCheck,
  Waves,
  Zap,
} from 'lucide-react'

const nodes = [
  {
    label: 'RAINFALL',
    icon: CloudRain,
    className: 'left-[12%] top-[28%]',
  },
  {
    label: 'TERRAIN',
    icon: Mountain,
    className: 'right-[10%] top-[24%]',
  },
  {
    label: 'FLOOD',
    icon: Waves,
    className: 'left-[10%] bottom-[29%]',
  },
  {
    label: 'ALERTS',
    icon: Radio,
    className: 'right-[10%] bottom-[25%]',
  },
]

export default function CommandAccess() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Ambient glow */}

      <div className="absolute left-1/2 top-[46%] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.045] blur-[100px]" />

      <div className="absolute left-[25%] top-[15%] h-[300px] w-[300px] rounded-full bg-sky-500/[0.035] blur-[100px]" />

      {/* Technical grid */}

      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56,189,248,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.18) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
          maskImage:
            'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
        }}
      />

      {/* Vertical intelligence beam */}

      <motion.div
        className="absolute left-1/2 top-[8%] h-[70%] w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-300/60 to-transparent"
        animate={{
          opacity: [0.25, 0.8, 0.25],
          scaleY: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute left-1/2 top-[8%] h-[70%] w-8 -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-400/[0.08] to-transparent blur-md"
        animate={{
          opacity: [0.2, 0.8, 0.2],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Radar rings */}

      <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2">
        {[420, 330, 245, 165].map((size, index) => (
          <motion.div
            key={size}
            className="absolute left-1/2 top-1/2 rounded-full border border-cyan-300/10"
            style={{
              width: size,
              height: size,
              marginLeft: -size / 2,
              marginTop: -size / 2,
            }}
            animate={{
              opacity: [0.25, 0.65, 0.25],
              scale: [0.98, 1.02, 0.98],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              delay: index * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Central intelligence core */}

      <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2">

        <motion.div
          className="absolute -inset-10 rounded-full border border-cyan-400/10"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.div
          className="absolute -inset-5 rounded-full border border-dashed border-sky-300/20"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.div
          className="
            relative flex h-32 w-32
            items-center justify-center
            rounded-full
            border border-cyan-300/30
            bg-slate-950/80
            shadow-[0_0_70px_rgba(34,211,238,0.18)]
            backdrop-blur-xl
          "
          animate={{
            boxShadow: [
              '0 0 45px rgba(34,211,238,0.10)',
              '0 0 90px rgba(34,211,238,0.28)',
              '0 0 45px rgba(34,211,238,0.10)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          <div className="absolute inset-3 rounded-full border border-cyan-400/15" />

          <div className="flex flex-col items-center">
            <Activity className="h-6 w-6 text-cyan-300" />

            <span className="mt-2 font-mono text-2xl font-black tracking-[0.18em] text-white">
              VN
            </span>

            <span className="mt-1 font-mono text-[7px] uppercase tracking-[0.28em] text-cyan-300/80">
              Intelligence Core
            </span>
          </div>
        </motion.div>

        {/* Core pulse */}

        <motion.div
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200"
          animate={{
            boxShadow: [
              '0 0 8px rgba(103,232,249,0.5)',
              '0 0 30px rgba(103,232,249,1)',
              '0 0 8px rgba(103,232,249,0.5)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Connection lines */}

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 760"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="vn-command-line"
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
              stopColor="#22d3ee"
              stopOpacity="0.45"
            />
            <stop
              offset="100%"
              stopColor="#38bdf8"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        <motion.path
          d="M120 240 C280 300 370 350 600 365"
          fill="none"
          stroke="url(#vn-command-line)"
          strokeWidth="1"
          strokeDasharray="5 8"
          animate={{
            strokeDashoffset: [0, -80],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.path
          d="M1080 225 C900 290 790 335 600 365"
          fill="none"
          stroke="url(#vn-command-line)"
          strokeWidth="1"
          strokeDasharray="5 8"
          animate={{
            strokeDashoffset: [0, -80],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.path
          d="M120 555 C280 500 400 440 600 395"
          fill="none"
          stroke="url(#vn-command-line)"
          strokeWidth="1"
          strokeDasharray="5 8"
          animate={{
            strokeDashoffset: [0, -80],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.path
          d="M1080 555 C920 500 800 440 600 395"
          fill="none"
          stroke="url(#vn-command-line)"
          strokeWidth="1"
          strokeDasharray="5 8"
          animate={{
            strokeDashoffset: [0, -80],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>

      {/* Intelligence nodes */}

      {nodes.map((node, index) => {
        const Icon = node.icon

        return (
          <motion.div
            key={node.label}
            className={`absolute ${node.className}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{
              opacity: [0.55, 1, 0.55],
              y: [0, -4, 0],
            }}
            transition={{
              duration: 3,
              delay: index * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="flex items-center gap-2 rounded-full border border-cyan-300/10 bg-slate-950/50 px-3 py-2 backdrop-blur-md">
              <Icon className="h-3.5 w-3.5 text-cyan-300" />

              <span className="font-mono text-[8px] tracking-[0.18em] text-slate-300">
                {node.label}
              </span>
            </div>
          </motion.div>
        )
      })}

      {/* Left terrain telemetry */}

      <div className="absolute left-7 top-[18%] hidden md:block">
        <div className="border-l border-t border-cyan-400/40 pl-4 pt-3">
          <p className="font-mono text-[9px] font-bold tracking-[0.25em] text-cyan-300">
            TERRAIN DATA
          </p>

          <div className="mt-4 space-y-2 font-mono text-[8px] tracking-wider">
            <div className="flex gap-8">
              <span className="text-slate-500">
                ELEVATION
              </span>
              <span className="text-slate-300">
                342 m
              </span>
            </div>

            <div className="flex gap-8">
              <span className="text-slate-500">
                SLOPE
              </span>
              <span className="text-slate-300">
                12.4°
              </span>
            </div>

            <div className="flex gap-8">
              <span className="text-slate-500">
                SOIL
              </span>
              <span className="text-slate-300">
                68%
              </span>
            </div>

            <div className="flex gap-8">
              <span className="text-slate-500">
                RISK
              </span>
              <span className="text-amber-300">
                MODERATE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Intelligence core label */}

      <motion.div
        className="absolute left-[57%] top-[22%] hidden md:block"
        animate={{
          opacity: [0.45, 1, 0.45],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        <div className="flex items-start gap-3">
          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />

          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-cyan-300">
              INTELLIGENCE CORE
            </p>

            <p className="mt-2 font-mono text-[7px] tracking-wider text-slate-500">
              ANALYZING TERRAIN DATA...
            </p>
          </div>
        </div>
      </motion.div>

      {/* Satellite */}

      <div className="absolute left-[27%] top-[28%] hidden md:flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/5">
          <Zap className="h-3.5 w-3.5 text-cyan-300" />
        </div>

        <div>
          <p className="font-mono text-[8px] tracking-[0.16em] text-cyan-300">
            SATELLITE FEED
          </p>

          <p className="mt-1 font-mono text-[7px] text-slate-500">
            18.5204° N · 73.8567° E
          </p>
        </div>
      </div>

      {/* Monitoring node */}

      <div className="absolute right-[18%] top-[34%] hidden md:flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/5">
          <Radio className="h-3.5 w-3.5 text-cyan-300" />
        </div>

        <div>
          <p className="font-mono text-[8px] tracking-[0.16em] text-cyan-300">
            MONITORING NODE
          </p>

          <p className="mt-1 font-mono text-[7px] text-slate-500">
            18.6129° N · 73.7419° E
          </p>
        </div>
      </div>

      {/* Data stream */}

      <motion.div
        className="absolute bottom-[19%] left-7 hidden md:block"
        animate={{
          opacity: [0.45, 1, 0.45],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/30">
            <Database className="h-3.5 w-3.5 text-cyan-300" />
          </div>

          <div>
            <p className="font-mono text-[8px] tracking-[0.2em] text-cyan-300">
              DATA STREAM
            </p>

            <p className="mt-1 font-mono text-[7px] text-slate-500">
              LIVE · 12.4 MB/s
            </p>
          </div>
        </div>
      </motion.div>

      {/* Verification panel */}

      <div className="absolute bottom-8 left-7 hidden md:block">
        <div className="border-b border-l border-cyan-400/20 pb-4 pl-3">
          <div className="space-y-3">
            {[
              'IDENTITY VERIFIED',
              'SECURE LINK ESTABLISHED',
              'MONITORING NODE ACTIVE',
            ].map((text, index) => (
              <motion.div
                key={text}
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: index * 0.4,
                }}
              >
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-300" />

                <span className="font-mono text-[8px] tracking-[0.16em] text-cyan-300">
                  {text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Coordinates */}

      <div className="absolute bottom-10 right-[22%] hidden font-mono md:block">
        <div className="text-[8px] tracking-[0.18em] text-cyan-300/50">
          18.5204° N
        </div>

        <div className="mt-1 text-[8px] tracking-[0.18em] text-cyan-300/50">
          73.8567° E
        </div>
      </div>

      {/* Scan line */}

      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent"
        animate={{
          top: ['15%', '85%', '15%'],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Corner HUD */}

      <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-cyan-400/30" />
      <div className="absolute right-4 top-4 h-6 w-6 border-r border-t border-cyan-400/30" />
      <div className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-cyan-400/30" />
      <div className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-cyan-400/30" />

      {/* Bottom access channel */}

      <div className="absolute bottom-7 left-[24%] hidden items-center gap-3 md:flex">
        <div className="flex gap-1">
          {Array.from({ length: 7 }).map((_, index) => (
            <motion.span
              key={index}
              className="h-2 w-5 -skew-x-12 bg-cyan-400/60"
              animate={{
                opacity: [0.35, 1, 0.35],
              }}
              transition={{
                duration: 1.4,
                delay: index * 0.12,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        <span className="font-mono text-[8px] tracking-[0.2em] text-cyan-300/60">
          ACCESS CHANNEL
        </span>

        <div className="h-px w-24 bg-cyan-400/30" />
      </div>

      {/* Status */}

      <div className="absolute right-7 top-7 hidden items-center gap-2 font-mono text-[7px] tracking-[0.2em] text-slate-500 md:flex">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        SYSTEM ONLINE
      </div>

      {/* Map pin */}

      <div className="absolute bottom-[12%] right-[7%] hidden md:block">
        <MapPin className="h-4 w-4 text-cyan-300/40" />
      </div>
    </div>
  )
}