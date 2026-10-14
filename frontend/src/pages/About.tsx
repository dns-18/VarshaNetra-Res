import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Eye,
  BrainCircuit,
  ShieldCheck,
  CloudRain,
  Mountain,
  Droplets,
  Wind,
  Radio,
  ArrowRight,
  ChevronRight,
  Activity,
  MapPin,
  Satellite,
  Sparkles,
  Target,
  Users,
  Waves,
  Zap,
  CheckCircle2,
} from 'lucide-react'

import AtmosphericBackground from '@components/graphics/AtmosphericBackground'
import TopographicScan from '@components/graphics/TopographicScan'
import GlassCard from '@components/ui/GlassCard'
import PageTransition from '@components/ui/PageTransition'

type Stage = 'observe' | 'predict' | 'warn' | 'protect'

const stages = {
  observe: {
    number: '01',
    title: 'OBSERVE',
    subtitle: 'See the terrain before the terrain changes.',
    description:
      'VarshaNetra brings environmental signals together so changing conditions can be understood as one connected picture.',
    icon: Eye,
  },
  predict: {
    number: '02',
    title: 'PREDICT',
    subtitle: 'Turn environmental signals into intelligence.',
    description:
      'The prediction engine evaluates rainfall and environmental conditions to generate location-focused risk signals.',
    icon: BrainCircuit,
  },
  warn: {
    number: '03',
    title: 'WARN',
    subtitle: 'Convert intelligence into an actionable signal.',
    description:
      'Risk is translated into understandable warning levels so decision-makers can recognize where attention is needed.',
    icon: Radio,
  },
  protect: {
    number: '04',
    title: 'PROTECT',
    subtitle: 'Make the warning useful.',
    description:
      'The final objective is not another prediction. It is giving communities, responders and authorities information early enough to act.',
    icon: ShieldCheck,
  },
}

const signals = [
  {
    icon: CloudRain,
    title: 'Rainfall',
    value: 'PRECIPITATION',
    description:
      'Intensity and accumulation provide a critical environmental signal.',
  },
  {
    icon: Droplets,
    title: 'Soil Moisture',
    value: 'SATURATION',
    description:
      'Increasing moisture can indicate reduced ground absorption capacity.',
  },
  {
    icon: Mountain,
    title: 'Terrain',
    value: 'TOPOGRAPHY',
    description:
      'Terrain characteristics provide geographic context for risk.',
  },
  {
    icon: Wind,
    title: 'Atmosphere',
    value: 'WEATHER',
    description:
      'Changing atmospheric conditions add another layer of context.',
  },
]

const regions = [
  {
    name: 'ASSAM',
    code: 'AS',
    status: 'MONITORED',
    x: '18%',
    y: '48%',
  },
  {
    name: 'MEGHALAYA',
    code: 'ML',
    status: 'MONITORED',
    x: '42%',
    y: '58%',
  },
  {
    name: 'MANIPUR',
    code: 'MN',
    status: 'MONITORED',
    x: '67%',
    y: '48%',
  },
  {
    name: 'MIZORAM',
    code: 'MZ',
    status: 'MONITORED',
    x: '72%',
    y: '76%',
  },
]

export default function About() {
  const [activeStage, setActiveStage] = useState<Stage>('observe')
  const [activeSignal, setActiveSignal] = useState(0)

  const stage = stages[activeStage]
  const StageIcon = stage.icon

  const stageOrder: Stage[] = [
    'observe',
    'predict',
    'warn',
    'protect',
  ]

  const nextStage = () => {
    const index = stageOrder.indexOf(activeStage)

    setActiveStage(
      stageOrder[(index + 1) % stageOrder.length]
    )
  }

  return (
    <PageTransition className="min-h-full">
      <AtmosphericBackground variant="default">
        <div className="relative min-h-full overflow-hidden px-4 py-6 md:px-6 lg:px-10">

          {/* =====================================================
              PAGE ATMOSPHERE
          ====================================================== */}

          <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />

          <div className="pointer-events-none absolute right-0 top-[35%] h-80 w-80 rounded-full bg-cyan-400/5 blur-3xl" />

          {/* =====================================================
              TOPOGRAPHIC TERRAIN INTELLIGENCE
          ====================================================== */}

          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <TopographicScan />
          </div>

          {/* =====================================================
              MAIN CONTENT
          ====================================================== */}

          <div className="relative z-10 mx-auto max-w-[1500px]">

            {/* =====================================================
                HERO
            ====================================================== */}

            <section className="relative mb-16 min-h-[520px] overflow-hidden rounded-[2rem] border border-sky-400/10 bg-slate-950/30">

              {/* Decorative coordinates */}

              <div className="absolute left-6 top-6 font-mono text-[9px] uppercase tracking-[0.3em] text-sky-400/50">
                VN / INTELLIGENCE SYSTEM / 01
              </div>

              <div className="absolute right-6 top-6 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-400/70">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                SYSTEM CONCEPT
              </div>

              {/* Radar-like center */}

              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-400/5">
                <div className="absolute inset-8 rounded-full border border-sky-400/5" />
                <div className="absolute inset-20 rounded-full border border-sky-400/5" />

                <div className="absolute left-1/2 top-0 h-full w-px bg-sky-400/5" />

                <div className="absolute left-0 top-1/2 h-px w-full bg-sky-400/5" />
              </div>

              <div className="relative z-10 flex min-h-[520px] items-center justify-center px-6 py-20 text-center">

                <div className="max-w-4xl">

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-6 flex items-center justify-center gap-3"
                  >
                    <div className="h-px w-10 bg-sky-400/40" />

                    <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-sky-400">
                      Terrain Intelligence
                    </span>

                    <div className="h-px w-10 bg-sky-400/40" />
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-5xl font-black tracking-tight text-text-primary md:text-7xl"
                  >
                    THE TERRAIN
                    <br />

                    <span className="bg-gradient-to-r from-sky-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      HAS A STORY.
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.35 }}
                    className="mx-auto mt-7 max-w-2xl text-base leading-7 text-text-secondary md:text-lg"
                  >
                    VarshaNetra transforms environmental signals into
                    understandable intelligence — helping people see risk
                    before risk becomes an emergency.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-10 flex flex-wrap justify-center gap-3"
                  >
                    {[
                      ['OBSERVE', Eye],
                      ['PREDICT', BrainCircuit],
                      ['WARN', Radio],
                      ['PROTECT', ShieldCheck],
                    ].map(([label, Icon]: any, index) => (
                      <React.Fragment key={label}>
                        <button
                          onClick={() =>
                            setActiveStage(stageOrder[index])
                          }
                          className={`group flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold tracking-wider transition-all ${
                            activeStage === stageOrder[index]
                              ? 'border-sky-400/50 bg-sky-400/10 text-sky-300 shadow-[0_0_25px_rgba(56,189,248,0.12)]'
                              : 'border-white/10 bg-white/[0.03] text-text-muted hover:border-sky-400/30 hover:text-text-primary'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {label}
                        </button>

                        {index < 3 && (
                          <ChevronRight className="hidden h-4 w-4 self-center text-sky-400/30 md:block" />
                        )}
                      </React.Fragment>
                    ))}
                  </motion.div>

                  <div className="mt-10 font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted">
                    OBSERVE · PREDICT · WARN · PROTECT
                  </div>

                </div>
              </div>
            </section>

            {/* =====================================================
                INTERACTIVE INTELLIGENCE JOURNEY
            ====================================================== */}

            <section className="mb-16">

              <div className="mb-7 flex items-end justify-between gap-4">

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-sky-400">
                    The intelligence journey
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-text-primary">
                    How VarshaNetra thinks
                  </h2>
                </div>

                <button
                  onClick={nextStage}
                  className="hidden items-center gap-2 rounded-lg border border-surface-border bg-white/[0.03] px-4 py-2 text-xs font-semibold text-text-secondary transition hover:border-sky-400/40 hover:text-sky-300 md:flex"
                >
                  Explore next
                  <ArrowRight className="h-4 w-4" />
                </button>

              </div>

              <div className="grid gap-5 lg:grid-cols-[280px_1fr]">

                {/* Stage navigation */}

                <GlassCard
                  hover={false}
                  className="p-3"
                >
                  {stageOrder.map((id) => {
                    const item = stages[id]
                    const Icon = item.icon
                    const active = activeStage === id

                    return (
                      <button
                        key={id}
                        onClick={() => setActiveStage(id)}
                        className={`relative mb-2 flex w-full items-center gap-4 rounded-xl p-4 text-left transition-all ${
                          active
                            ? 'bg-sky-400/10'
                            : 'hover:bg-white/[0.03]'
                        }`}
                      >
                        {active && (
                          <motion.div
                            layoutId="stage-indicator"
                            className="absolute bottom-2 left-0 top-2 w-0.5 rounded-full bg-sky-400"
                          />
                        )}

                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
                            active
                              ? 'border-sky-400/30 bg-sky-400/10 text-sky-300'
                              : 'border-white/10 bg-white/[0.03] text-text-muted'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>
                          <div className="font-mono text-[9px] text-text-muted">
                            {item.number}
                          </div>

                          <div
                            className={`text-sm font-bold ${
                              active
                                ? 'text-sky-300'
                                : 'text-text-primary'
                            }`}
                          >
                            {item.title}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </GlassCard>

                {/* Stage explanation */}

                <GlassCard
                  hover={false}
                  className="relative min-h-[350px] overflow-hidden p-7 md:p-10"
                >
                  <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-sky-400/5 blur-3xl" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStage}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <div className="flex items-start justify-between">

                        <div>
                          <span className="font-mono text-[10px] tracking-[0.3em] text-sky-400">
                            STAGE {stage.number}
                          </span>

                          <h3 className="mt-3 text-4xl font-black tracking-tight text-text-primary">
                            {stage.title}
                          </h3>

                          <p className="mt-2 text-lg font-medium text-sky-300">
                            {stage.subtitle}
                          </p>
                        </div>

                        <div className="hidden h-16 w-16 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 md:flex">
                          <StageIcon className="h-8 w-8 text-sky-300" />
                        </div>

                      </div>

                      <p className="mt-7 max-w-2xl text-sm leading-7 text-text-secondary">
                        {stage.description}
                      </p>

                      <div className="mt-9 flex items-center gap-2">
                        {stageOrder.map((id) => (
                          <div
                            key={id}
                            className={`h-1 rounded-full transition-all ${
                              id === activeStage
                                ? 'w-12 bg-sky-400'
                                : 'w-5 bg-white/10'
                            }`}
                          />
                        ))}
                      </div>

                      <div className="mt-8 rounded-xl border border-white/5 bg-black/10 p-4">
                        <div className="flex items-center gap-3">
                          <Activity className="h-4 w-4 text-emerald-400" />

                          <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                            Intelligence status
                          </span>

                          <span className="ml-auto text-[10px] font-semibold text-emerald-400">
                            ACTIVE
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </GlassCard>

              </div>
            </section>

            {/* =====================================================
                SIGNAL CONSTELLATION
            ====================================================== */}

            <section className="mb-16">

              <div className="mb-7">

                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-sky-400">
                  Environmental signal constellation
                </p>

                <h2 className="mt-2 text-3xl font-bold text-text-primary">
                  What does VarshaNetra observe?
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
                  Risk is rarely caused by one signal alone. VarshaNetra
                  brings multiple environmental dimensions into one
                  intelligence layer.
                </p>

              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                {signals.map((signal, index) => {
                  const Icon = signal.icon
                  const active = activeSignal === index

                  return (
                    <motion.button
                      key={signal.title}
                      whileHover={{ y: -5 }}
                      onClick={() => setActiveSignal(index)}
                      className={`text-left ${
                        active
                          ? 'rounded-2xl ring-1 ring-sky-400/30'
                          : ''
                      }`}
                    >
                      <GlassCard
                        hover={false}
                        className={`h-full p-6 transition-all ${
                          active
                            ? 'bg-sky-400/[0.07]'
                            : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">

                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                              active
                                ? 'bg-sky-400/15 text-sky-300'
                                : 'bg-white/5 text-text-muted'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          <span className="font-mono text-[9px] text-text-muted">
                            0{index + 1}
                          </span>

                        </div>

                        <h3 className="mt-6 text-lg font-bold text-text-primary">
                          {signal.title}
                        </h3>

                        <div className="mt-1 font-mono text-[9px] tracking-widest text-sky-400">
                          {signal.value}
                        </div>

                        <p className="mt-4 text-sm leading-6 text-text-secondary">
                          {signal.description}
                        </p>

                        {active && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            className="mt-5 h-px bg-sky-400/30"
                          />
                        )}

                      </GlassCard>
                    </motion.button>
                  )
                })}

              </div>
            </section>

            {/* =====================================================
                AI CORE
            ====================================================== */}

            <section className="mb-16">

              <GlassCard
                hover={false}
                className="relative overflow-hidden p-6 md:p-10"
              >
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/5 blur-3xl" />

                <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_320px_1fr]">

                  {/* Inputs */}

                  <div>
                    <div className="mb-5 font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted">
                      Environmental inputs
                    </div>

                    {[
                      ['Rainfall', CloudRain],
                      ['Soil moisture', Droplets],
                      ['Terrain', Mountain],
                    ].map(([label, Icon]: any, index) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="mb-3 flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
                      >
                        <Icon className="h-4 w-4 text-sky-400" />

                        <span className="text-sm text-text-secondary">
                          {label}
                        </span>

                        <div className="ml-auto flex gap-1">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <span
                              key={n}
                              className={`h-1.5 w-3 rounded-full ${
                                n <= index + 3
                                  ? 'bg-sky-400/70'
                                  : 'bg-white/10'
                              }`}
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* AI CORE */}

                  <div className="relative mx-auto flex h-52 w-52 items-center justify-center">

                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="absolute inset-0 rounded-full border border-dashed border-sky-400/20"
                    />

                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                      }}
                      className="absolute inset-8 rounded-full border border-sky-400/20 bg-sky-400/5"
                    />

                    <div className="relative flex h-28 w-28 flex-col items-center justify-center rounded-full border border-sky-400/40 bg-slate-950/80 shadow-[0_0_50px_rgba(56,189,248,0.12)]">
                      <BrainCircuit className="h-8 w-8 text-sky-300" />

                      <span className="mt-2 font-mono text-[8px] tracking-[0.2em] text-sky-300">
                        AI CORE
                      </span>
                    </div>

                    {/* Orbit nodes */}

                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ rotate: -360 }}
                        transition={{
                          duration: 8 + i * 3,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="absolute inset-0"
                      >
                        <span
                          className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
                          style={{
                            transform: `rotate(${i * 120}deg) translateY(-2px)`,
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Outputs */}

                  <div>
                    <div className="mb-5 font-mono text-[9px] uppercase tracking-[0.3em] text-text-muted">
                      Intelligence outputs
                    </div>

                    {[
                      ['Risk Score', Target],
                      ['Warning Level', Zap],
                      ['Response Signal', ShieldCheck],
                    ].map(([label, Icon], index) => (
                      <motion.div
                        key={label as string}
                        initial={{ opacity: 0, x: 15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="mb-3 flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
                      >
                        {React.createElement(Icon as any, {
                          className: 'h-4 w-4 text-cyan-400',
                        })}

                        <span className="text-sm text-text-secondary">
                          {label as string}
                        </span>

                        <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-400/70" />
                      </motion.div>
                    ))}
                  </div>

                </div>
              </GlassCard>
            </section>

            {/* =====================================================
                NER NETWORK
            ====================================================== */}

            <section className="mb-16">

              <div className="mb-7">

                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-sky-400">
                  Regional intelligence network
                </p>

                <h2 className="mt-2 text-3xl font-bold text-text-primary">
                  Built for the North-East
                </h2>

              </div>

              <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">

                {/* Network visualization */}

                <GlassCard
                  hover={false}
                  className="relative min-h-[400px] overflow-hidden p-6"
                >
                  <div className="absolute inset-0 opacity-40">

                    <div className="absolute left-[15%] top-[20%] h-px w-[70%] rotate-[12deg] bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />

                    <div className="absolute left-[20%] top-[55%] h-px w-[65%] rotate-[-8deg] bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />

                    <div className="absolute left-[30%] top-[30%] h-[50%] w-px rotate-[25deg] bg-sky-400/10" />

                  </div>

                  <div className="absolute left-6 top-6">
                    <div className="font-mono text-[9px] tracking-widest text-text-muted">
                      NER / MONITORING GRID
                    </div>
                  </div>

                  {/* Central node */}

                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 15px rgba(56,189,248,0.1)',
                        '0 0 35px rgba(56,189,248,0.25)',
                        '0 0 15px rgba(56,189,248,0.1)',
                      ],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                    className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-sky-400/40 bg-slate-950/80"
                  >
                    <Satellite className="h-6 w-6 text-sky-300" />

                    <span className="mt-1 font-mono text-[7px] text-sky-300">
                      CORE
                    </span>
                  </motion.div>

                  {regions.map((region, index) => (
                    <motion.div
                      key={region.name}
                      initial={{
                        opacity: 0,
                        scale: 0.5,
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        delay: index * 0.15,
                      }}
                      className="absolute"
                      style={{
                        left: region.x,
                        top: region.y,
                      }}
                    >
                      <div className="group relative">

                        <motion.div
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [1, 0.4, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                          }}
                          className="h-4 w-4 rounded-full border-2 border-sky-300 bg-sky-400/30"
                        />

                        <div className="absolute left-1/2 top-6 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-slate-950/90 px-2 py-1 opacity-0 transition group-hover:opacity-100">
                          <div className="text-[9px] font-bold text-text-primary">
                            {region.name}
                          </div>

                          <div className="font-mono text-[7px] text-emerald-400">
                            {region.status}
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  ))}

                  <div className="absolute bottom-5 left-6 flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                    <span className="font-mono text-[8px] tracking-widest text-text-muted">
                      NETWORK ACTIVE
                    </span>
                  </div>

                </GlassCard>

                {/* Region cards */}

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">

                  {regions.map((region) => (
                    <motion.div
                      key={region.name}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 rounded-xl border border-surface-border bg-white/[0.02] p-4"
                    >

                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-400/10 font-mono text-xs font-bold text-sky-300">
                        {region.code}
                      </div>

                      <div>

                        <div className="text-sm font-bold text-text-primary">
                          {region.name}
                        </div>

                        <div className="mt-1 flex items-center gap-2 text-[9px] uppercase tracking-wider text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Monitoring active
                        </div>

                      </div>

                      <MapPin className="ml-auto h-4 w-4 text-text-muted" />

                    </motion.div>
                  ))}

                </div>
              </div>
            </section>

            {/* =====================================================
                MISSION
            ====================================================== */}

            <section className="mb-10">

              <GlassCard
                hover={false}
                className="relative overflow-hidden p-8 md:p-12"
              >
                <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />

                <div className="relative z-10 max-w-4xl">

                  <div className="flex items-center gap-3">

                    <Sparkles className="h-5 w-5 text-sky-400" />

                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-sky-400">
                      Our mission
                    </span>

                  </div>

                  <h2 className="mt-5 text-3xl font-black text-text-primary md:text-5xl">
                    A warning is useful
                    <br />

                    <span className="text-sky-300">
                      only when it leads to action.
                    </span>
                  </h2>

                  <p className="mt-6 max-w-2xl text-sm leading-7 text-text-secondary md:text-base">
                    VarshaNetra is designed around a simple idea:
                    technology should not only predict risk — it should
                    make that risk understandable, visible and actionable.
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">

                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                      <Users className="h-5 w-5 text-sky-400" />

                      <div className="mt-3 text-sm font-bold text-text-primary">
                        Communities
                      </div>

                      <p className="mt-1 text-xs leading-5 text-text-muted">
                        Earlier awareness for people living in vulnerable areas.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                      <ShieldCheck className="h-5 w-5 text-cyan-400" />

                      <div className="mt-3 text-sm font-bold text-text-primary">
                        Responders
                      </div>

                      <p className="mt-1 text-xs leading-5 text-text-muted">
                        Clearer signals for prioritizing response.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                      <Waves className="h-5 w-5 text-blue-400" />

                      <div className="mt-3 text-sm font-bold text-text-primary">
                        Resilience
                      </div>

                      <p className="mt-1 text-xs leading-5 text-text-muted">
                        Better preparation before conditions escalate.
                      </p>
                    </div>

                  </div>
                </div>
              </GlassCard>
            </section>

            {/* =====================================================
                FOOTER
            ====================================================== */}

            <footer className="flex flex-col gap-3 border-t border-white/5 py-6 text-[9px] font-mono uppercase tracking-[0.2em] text-text-muted md:flex-row md:items-center md:justify-between">
              <span>
                VARSHANETRA · TERRAIN INTELLIGENCE SYSTEM
              </span>

              <span>
                OBSERVE · PREDICT · WARN · PROTECT
              </span>
            </footer>

          </div>
        </div>
      </AtmosphericBackground>
    </PageTransition>
  )
}