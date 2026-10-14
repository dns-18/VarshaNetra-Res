import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { useSearchParams } from 'react-router-dom'
import {
  BellRing,
  RefreshCw,
  ShieldAlert,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Activity,
  Search,
} from 'lucide-react'

import {
  fetchDemoPrediction,
  VarshaNetraPrediction,
} from '@services/varshanetraApi'

import AtmosphericBackground from '@components/graphics/AtmosphericBackground'
import GlassCard from '@components/ui/GlassCard'
import PageTransition from '@components/ui/PageTransition'
import WarningSignal from '@components/graphics/WarningSignal'

const regions = [
  'assam',
  'meghalaya',
  'manipur',
  'mizoram',
]

const rank: Record<string, number> = {
  GREEN: 0,
  YELLOW: 1,
  ORANGE: 2,
  RED: 3,
}

const badge: Record<string, string> = {
  GREEN: 'text-risk-low bg-risk-low/10 border-risk-low/20',
  YELLOW: 'text-risk-moderate bg-risk-moderate/10 border-risk-moderate/20',
  ORANGE: 'text-risk-high bg-risk-high/10 border-risk-high/20',
  RED: 'text-risk-critical bg-risk-critical/10 border-risk-critical/20',
}

const riskColor: Record<string, string> = {
  GREEN: 'bg-risk-low',
  YELLOW: 'bg-risk-moderate',
  ORANGE: 'bg-risk-high',
  RED: 'bg-risk-critical',
}

const riskBorder: Record<string, string> = {
  GREEN: 'border-risk-low/50',
  YELLOW: 'border-risk-moderate/50',
  ORANGE: 'border-risk-high/50',
  RED: 'border-risk-critical/50',
}

const riskGlow: Record<string, string> = {
  GREEN: 'shadow-[0_0_35px_rgba(16,185,129,0.05)]',
  YELLOW: 'shadow-[0_0_35px_rgba(245,158,11,0.06)]',
  ORANGE: 'shadow-[0_0_35px_rgba(249,115,22,0.07)]',
  RED: 'shadow-[0_0_35px_rgba(239,68,68,0.08)]',
}

function getAlertTitle(level: string) {
  if (level === 'RED') return 'Critical Risk Alert'
  if (level === 'ORANGE') return 'High Risk Alert'
  if (level === 'YELLOW') return 'Moderate Rainfall Warning'
  return 'Heavy Rainfall Warning'
}

function getRiskLabel(level: string) {
  if (level === 'RED') return 'Critical'
  if (level === 'ORANGE') return 'High'
  if (level === 'YELLOW') return 'Moderate'
  return 'Low'
}

export default function Alerts() {
  const [searchParams] = useSearchParams()

  const initialRegion = searchParams.get('region')

  const [items, setItems] = useState<VarshaNetraPrediction[]>([])
  const [sel, setSel] =
    useState<VarshaNetraPrediction | null>(null)

  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [priority, setPriority] = useState('ALL')

  const load = async () => {
    setLoading(true)

    try {
      const x = await Promise.all(
        regions.map((r) =>
          fetchDemoPrediction(r, 3, 6)
        )
      )

      setItems(x)

      const highestRisk = [...x].sort(
        (a, b) =>
          rank[b.warning_level] -
          rank[a.warning_level]
      )[0]

      setSel(highestRisk || null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    if (initialRegion && items.length) {
      const found = items.find(
        (x) =>
          x.region?.toLowerCase() ===
          initialRegion.toLowerCase()
      )

      if (found) {
        setSel(found)
      }
    }
  }, [initialRegion, items])

  const shown = useMemo(
    () =>
      [...items]
        .filter(
          (x) =>
            (priority === 'ALL' ||
              x.warning_level === priority) &&
            (x.region || '')
              .toLowerCase()
              .includes(query.toLowerCase())
        )
        .sort(
          (a, b) =>
            rank[b.warning_level] -
            rank[a.warning_level]
        ),
    [items, priority, query]
  )

  const critical = items.filter(
    (x) => rank[x.warning_level] >= 2
  ).length

  /*
   * ==========================================================
   * INITIAL LOADING SCREEN
   * ==========================================================
   */

  if (loading && !items.length) {
    return (
      <div className="flex h-full items-center justify-center bg-surface-base">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.35,
          }}
          className="text-center"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10">
            <RefreshCw className="h-7 w-7 animate-spin text-sky-400" />
          </div>

          <h2 className="text-lg font-semibold text-text-primary">
            Initializing Alert Intelligence
          </h2>

          <p className="mt-2 text-sm text-text-muted">
            Loading regional warnings and risk signals...
          </p>

          <div className="mx-auto mt-5 h-1 w-48 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full bg-sky-400"
              initial={{
                x: '-100%',
              }}
              animate={{
                x: '100%',
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      </div>
    )
  }

  /*
   * ==========================================================
   * LOADED ALERT INTELLIGENCE UI
   * ==========================================================
   */

  return (
    <PageTransition className="min-h-full">
      <AtmosphericBackground variant="alert">

        <div className="relative min-h-full overflow-visible px-4 py-5 md:px-6 lg:px-8">

          {/* ==================================================
              ALERT WARNING SIGNAL GRAPHIC
              Decorative only — does not affect functionality
              ================================================== */}

          <WarningSignal />

          {/* Ambient atmospheric glow */}

          <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />

          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-[1800px]">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="mb-8">

              <div className="flex flex-wrap items-start justify-between gap-4">

                <div>

                  <div className="mb-2 flex items-center gap-2">

                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />

                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-sky-400/70">
                      Early Warning Network
                    </span>

                  </div>

                  <div className="flex items-center gap-3">

                    <BellRing className="hidden h-8 w-8 text-sky-400 md:block" />

                    <h1 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                      Alerts & Warnings
                    </h1>

                  </div>

                  <p className="mt-2 max-w-2xl text-sm text-text-secondary md:text-base">
                    Real-time early warning system with incident
                    timeline and recommended actions
                  </p>

                </div>

                {/* Header controls */}

                <div className="flex items-center gap-2">

                  <div className="flex items-center gap-2 rounded-full border border-risk-critical/20 bg-risk-critical/[0.06] px-3 py-2 text-sm text-risk-critical backdrop-blur-xl">

                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-risk-critical" />

                    <span>
                      {critical} High/Critical
                    </span>

                  </div>

                  <button
                    onClick={load}
                    disabled={loading}
                    className="
                      flex items-center gap-2
                      rounded-xl
                      border border-cyan-300/20
                      bg-cyan-400/90
                      px-4 py-2.5
                      text-sm font-semibold
                      text-slate-950
                      shadow-[0_0_25px_rgba(34,211,238,0.12)]
                      transition-all duration-300
                      hover:bg-cyan-300
                      hover:shadow-[0_0_35px_rgba(34,211,238,0.2)]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >

                    <RefreshCw
                      className={
                        loading
                          ? 'h-4 w-4 animate-spin'
                          : 'h-4 w-4'
                      }
                    />

                    Refresh

                  </button>

                </div>

              </div>

            </div>

            {/* ==================================================
                SEARCH
            ================================================== */}

            <GlassCard
              hover={false}
              className="mb-5 p-0"
            >

              <div className="relative">

                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400/60" />

                <input
                  value={query}
                  onChange={(e) =>
                    setQuery(e.target.value)
                  }
                  placeholder="Search alerts by location, state, title..."
                  className="
                    w-full
                    rounded-2xl
                    border border-white/[0.06]
                    bg-white/[0.025]
                    py-4
                    pl-11
                    pr-4
                    text-sm
                    text-text-primary
                    placeholder:text-text-muted
                    outline-none
                    backdrop-blur-xl
                    transition-all duration-300
                    focus:border-sky-400/30
                    focus:bg-white/[0.045]
                    focus:ring-1
                    focus:ring-sky-400/20
                  "
                />

              </div>

            </GlassCard>

            {/* ==================================================
                PRIORITY FILTERS
            ================================================== */}

            <div className="mb-6 flex flex-wrap items-center gap-2">

              <span className="mr-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">

                <Activity className="h-3.5 w-3.5 text-sky-400/70" />

                Priority

              </span>

              {[
                'ALL',
                'RED',
                'ORANGE',
                'YELLOW',
                'GREEN',
              ].map((x) => (

                <button
                  key={x}
                  onClick={() =>
                    setPriority(x)
                  }
                  className={`
                    rounded-xl
                    border
                    px-4 py-2
                    text-xs
                    font-medium
                    transition-all duration-300

                    ${
                      priority === x
                        ? `
                          border-sky-400/40
                          bg-sky-400/[0.12]
                          text-sky-300
                          shadow-[0_0_25px_rgba(56,189,248,0.08)]
                        `
                        : `
                          border-white/[0.08]
                          bg-white/[0.025]
                          text-text-secondary
                          hover:border-sky-400/20
                          hover:bg-white/[0.05]
                          hover:text-text-primary
                        `
                    }
                  `}
                >

                  {x === 'ALL' ? 'All' : x}

                </button>

              ))}

            </div>

            {/* ==================================================
                MAIN ALERT GRID
            ================================================== */}

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.85fr)]">

              {/* ==================================================
                  ALERT LIST
              ================================================== */}

              <div className="space-y-3">

                <div className="mb-3 flex items-center justify-between">

                  <div>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-400/60">
                      Regional Signals
                    </p>

                    <h2 className="mt-1 text-lg font-bold text-text-primary">
                      Active Alerts
                    </h2>

                  </div>

                  <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[11px] text-text-muted backdrop-blur-xl">
                    {shown.length} detected
                  </span>

                </div>

                {shown.map((p, index) => (

                  <motion.button
                    key={p.region}
                    onClick={() => setSel(p)}
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`
                      group
                      relative
                      w-full
                      overflow-hidden
                      rounded-2xl
                      border
                      p-5
                      text-left
                      backdrop-blur-xl
                      transition-all duration-300

                      ${
                        sel?.region === p.region
                          ? 'border-sky-400/30 bg-sky-400/[0.055] ring-1 ring-sky-400/20'
                          : 'border-white/[0.08] bg-white/[0.035] hover:border-sky-400/20 hover:bg-white/[0.05]'
                      }

                      ${riskGlow[p.warning_level]}
                    `}
                  >

                    {/* Risk accent line */}

                    <div
                      className={`
                        absolute inset-x-0 top-0 h-px
                        opacity-80
                        ${riskColor[p.warning_level]}
                      `}
                    />

                    {/* Soft risk glow */}

                    <div
                      className={`
                        pointer-events-none
                        absolute
                        -right-20
                        -top-20
                        h-40
                        w-40
                        rounded-full
                        opacity-10
                        blur-3xl
                        ${riskColor[p.warning_level]}
                      `}
                    />

                    <div className="relative z-10">

                      {/* Alert heading */}

                      <div className="flex items-start justify-between gap-3">

                        <div className="flex items-center gap-3">

                          <span
                            className={`
                              flex
                              h-3
                              w-3
                              shrink-0
                              rounded-full
                              ${riskColor[p.warning_level]}
                              ${
                                p.warning_level === 'RED' ||
                                p.warning_level === 'ORANGE'
                                  ? 'animate-pulse'
                                  : ''
                              }
                            `}
                          />

                          <div>

                            <p className="font-semibold text-text-primary">
                              {getAlertTitle(
                                p.warning_level
                              )}
                            </p>

                            <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-text-muted">
                              VarshaNetra prediction signal
                            </p>

                          </div>

                        </div>

                        <span
                          className={`
                            rounded-lg
                            border
                            px-2.5
                            py-1
                            text-[10px]
                            font-bold
                            tracking-wider
                            ${badge[p.warning_level]}
                          `}
                        >
                          {p.warning_level}
                        </span>

                      </div>

                      {/* Region */}

                      <div className="mt-5 flex items-center gap-2">

                        <MapPin className="h-4 w-4 text-sky-400/70" />

                        <span className="text-base font-semibold text-text-primary">
                          {p.region}
                        </span>

                      </div>

                      {/* Metrics */}

                      <div className="mt-3 grid grid-cols-2 gap-3">

                        <div className="rounded-xl border border-white/[0.05] bg-black/10 p-3">

                          <p className="text-[9px] uppercase tracking-[0.15em] text-text-muted">
                            Rainfall
                          </p>

                          <p className="mt-1 text-sm font-semibold text-text-primary">
                            {p.rainfall_mm.toFixed(1)}
                            <span className="ml-1 text-xs font-normal text-text-muted">
                              mm
                            </span>
                          </p>

                        </div>

                        <div className="rounded-xl border border-white/[0.05] bg-black/10 p-3">

                          <p className="text-[9px] uppercase tracking-[0.15em] text-text-muted">
                            Flood Risk
                          </p>

                          <p className="mt-1 text-sm font-semibold text-text-primary">
                            {Math.round(
                              p.flood_probability * 100
                            )}
                            <span className="ml-1 text-xs font-normal text-text-muted">
                              %
                            </span>
                          </p>

                        </div>

                      </div>

                      {/* Footer */}

                      <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-white/[0.05] pt-3 text-[10px] text-text-muted">

                        <span className="flex items-center gap-1.5">

                          <Users className="h-3 w-3 text-sky-400/60" />

                          Monitored region

                        </span>

                        <span className="flex items-center gap-1.5">

                          <Clock className="h-3 w-3 text-sky-400/60" />

                          Current model run

                        </span>

                        {sel?.region === p.region && (

                          <span className="ml-auto flex items-center gap-1 text-sky-400">

                            <CheckCircle2 className="h-3 w-3" />

                            Selected

                          </span>

                        )}

                      </div>

                    </div>

                  </motion.button>

                ))}

                {!shown.length && !loading && (

                  <GlassCard
                    hover={false}
                    className="p-10 text-center"
                  >

                    <BellRing className="mx-auto h-8 w-8 text-sky-400/40" />

                    <p className="mt-4 font-medium text-text-primary">
                      No matching alerts
                    </p>

                    <p className="mt-1 text-xs text-text-muted">
                      Try changing the priority filter or search query.
                    </p>

                  </GlassCard>

                )}

              </div>

              {/* ==================================================
                  SELECTED ALERT / INTELLIGENCE PANEL
              ================================================== */}

              <GlassCard
                hover={false}
                className={`
                  relative
                  min-h-[520px]
                  overflow-hidden
                  p-6
                  ${
                    sel
                      ? `${riskBorder[sel.warning_level]}`
                      : 'border-white/[0.08]'
                  }
                `}
              >

                {/* Atmospheric panel glow */}

                <div
                  className={`
                    pointer-events-none
                    absolute
                    -right-24
                    -top-24
                    h-72
                    w-72
                    rounded-full
                    blur-3xl
                    ${
                      sel
                        ? `${riskColor[sel.warning_level]} opacity-[0.07]`
                        : 'bg-sky-400/5'
                    }
                  `}
                />

                <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/[0.04] blur-3xl" />

                {sel ? (

                  <div className="relative z-10">

                    {/* Panel label */}

                    <div className="mb-5 flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-400/60">
                          Selected Signal
                        </span>

                        <span className="h-1 w-1 rounded-full bg-sky-400/50" />

                        <span className="text-[10px] uppercase tracking-wider text-text-muted">
                          Live
                        </span>

                      </div>

                      <Activity className="h-4 w-4 text-sky-400/60" />

                    </div>

                    {/* Title */}

                    <div className="flex items-start gap-3">

                      <span
                        className={`
                          mt-2
                          h-4
                          w-4
                          shrink-0
                          rounded-full
                          ${riskColor[sel.warning_level]}
                          ${
                            sel.warning_level === 'RED' ||
                            sel.warning_level === 'ORANGE'
                              ? 'animate-pulse'
                              : ''
                          }
                        `}
                      />

                      <div>

                        <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                          {sel.warning_level === 'RED'
                            ? 'Critical Risk'
                            : sel.warning_level === 'ORANGE'
                              ? 'High Risk'
                              : 'Rainfall Risk'}
                          : {sel.region}
                        </h2>

                        <p className="mt-1 text-xs text-text-muted">
                          {getRiskLabel(sel.warning_level)} severity prediction
                        </p>

                      </div>

                    </div>

                    {/* Status */}

                    <div className="mt-5 flex items-center gap-2">

                      <span
                        className={`
                          rounded-full
                          border
                          px-3
                          py-1
                          text-xs
                          font-medium
                          ${badge[sel.warning_level]}
                        `}
                      >
                        Active
                      </span>

                      <span className="flex items-center gap-1.5 text-[10px] text-text-muted">

                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

                        Model signal available

                      </span>

                    </div>

                    {/* Intelligence information */}

                    <div className="mt-7 space-y-4">

                      {/* Location */}

                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">

                        <div className="flex items-center gap-2">

                          <MapPin className="h-4 w-4 text-sky-400" />

                          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">
                            Location
                          </span>

                        </div>

                        <p className="mt-2 text-sm text-text-secondary">
                          {sel.location}
                        </p>

                      </div>

                      {/* Forecast time */}

                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">

                        <div className="flex items-center gap-2">

                          <Clock className="h-4 w-4 text-sky-400" />

                          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">
                            Forecast Time
                          </span>

                        </div>

                        <p className="mt-2 text-sm text-text-secondary">
                          {sel.forecast_time}
                        </p>

                      </div>

                      {/* Model signal */}

                      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">

                        <div className="flex items-center gap-2">

                          <ShieldAlert className="h-4 w-4 text-sky-400" />

                          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">
                            Model Signal
                          </span>

                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-3">

                          <div>

                            <p className="text-[10px] text-text-muted">
                              Flood probability
                            </p>

                            <p className="mt-1 text-lg font-semibold text-text-primary">
                              {Math.round(
                                sel.flood_probability * 100
                              )}
                              %
                            </p>

                          </div>

                          <div>

                            <p className="text-[10px] text-text-muted">
                              Inundation
                            </p>

                            <p className="mt-1 text-lg font-semibold text-text-primary">
                              {sel.inundation_depth_m.toFixed(2)}
                              <span className="ml-1 text-xs font-normal text-text-muted">
                                m
                              </span>
                            </p>

                          </div>

                        </div>

                      </div>

                      {/* Recommended action */}

                      <div className="rounded-xl border border-sky-400/10 bg-sky-400/[0.035] p-4">

                        <div className="flex items-center gap-2">

                          <CheckCircle2 className="h-4 w-4 text-sky-400" />

                          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-sky-300/80">
                            Recommended Action
                          </span>

                        </div>

                        <p className="mt-3 text-sm leading-6 text-text-secondary">
                          Continue close monitoring and verify
                          local field observations before issuing
                          public evacuation instructions.
                        </p>

                      </div>

                    </div>

                    {/* Bottom metadata */}

                    <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">

                      <span className="text-[10px] uppercase tracking-wider text-text-muted">
                        VarshaNetra AI Engine
                      </span>

                      <span className="flex items-center gap-1.5 text-[10px] text-emerald-400/80">

                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                        Monitoring

                      </span>

                    </div>

                  </div>

                ) : (

                  <div className="flex h-full min-h-[420px] items-center justify-center text-center">

                    <div>

                      <ShieldAlert className="mx-auto h-10 w-10 text-sky-400/30" />

                      <p className="mt-4 font-medium text-text-primary">
                        Select an alert
                      </p>

                      <p className="mt-1 text-xs text-text-muted">
                        Choose a regional signal to inspect its intelligence data.
                      </p>

                    </div>

                  </div>

                )}

              </GlassCard>

            </div>

            {/* ==================================================
                FOOTER DATA NOTICE
            ================================================== */}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.05] pt-4">

              <p className="text-[10px] leading-5 text-text-muted">
                Demo alerts use the trained VarshaNetra models with
                synthetic environmental inputs. Live alert delivery
                is not connected yet.
              </p>

              <div className="flex items-center gap-2 text-[10px] text-text-muted">

                <span className="h-1.5 w-1.5 rounded-full bg-sky-400/70" />

                Early Warning Network

              </div>

            </div>

          </div>

        </div>

      </AtmosphericBackground>
    </PageTransition>
  )
}