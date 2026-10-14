import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import {
  BarChart3,
  Download,
  RefreshCw,
  CloudRain,
  ShieldCheck,
  AlertTriangle,
  Activity,
  Database,
  FileBarChart,
} from 'lucide-react'

import {
  fetchDemoPrediction,
  VarshaNetraPrediction,
} from '@services/varshanetraApi'

import AtmosphericBackground from '@components/graphics/AtmosphericBackground'
import DataStream from '@components/graphics/DataStream'
import GlassCard from '@components/ui/GlassCard'
import PageTransition from '@components/ui/PageTransition'

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

const riskClass: Record<string, string> = {
  GREEN: 'text-risk-low bg-risk-low/10 border-risk-low/20',
  YELLOW: 'text-risk-moderate bg-risk-moderate/10 border-risk-moderate/20',
  ORANGE: 'text-risk-high bg-risk-high/10 border-risk-high/20',
  RED: 'text-risk-critical bg-risk-critical/10 border-risk-critical/20',
}

const riskBar: Record<string, string> = {
  GREEN: 'bg-risk-low',
  YELLOW: 'bg-risk-moderate',
  ORANGE: 'bg-risk-high',
  RED: 'bg-risk-critical',
}

export default function Reports() {
  const [data, setData] = useState<VarshaNetraPrediction[]>([])
  const [loading, setLoading] = useState(true)
  const [range, setRange] = useState('7')

  const generate = async () => {
    setLoading(true)

    try {
      const result = await Promise.all(
        regions.map((r) =>
          fetchDemoPrediction(r, 3, 6)
        )
      )

      setData(result)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    generate()
  }, [])

  const csv = () => {
    if (!data.length) return

    const rows = [
      'Region,Rainfall_mm,Flood_Probability,Inundation_m,Warning,Confidence',
      ...data.map(
        (p) =>
          `${p.region},${p.rainfall_mm},${p.flood_probability},${p.inundation_depth_m},${p.warning_level},${p.confidence}`
      ),
    ]

    const a = document.createElement('a')

    a.href = URL.createObjectURL(
      new Blob(
        [rows.join('\n')],
        { type: 'text/csv' }
      )
    )

    a.download = 'varshanetra-report.csv'
    a.click()

    URL.revokeObjectURL(a.href)
  }

  const avg = data.length
    ? data.reduce(
        (s, p) => s + p.rainfall_mm,
        0
      ) / data.length
    : 0

  const highCritical = data.filter(
    (x) =>
      x.warning_level === 'RED' ||
      x.warning_level === 'ORANGE'
  ).length

  const confidence = data.length
    ? Math.round(
        (data.reduce(
          (s, p) => s + p.confidence,
          0
        ) /
          data.length) *
          100
      )
    : 0

  const maxFlood = data.length
    ? Math.round(
        Math.max(
          ...data.map(
            (p) => p.flood_probability
          )
        ) * 100
      )
    : 0

  /*
   * ==========================================================
   * INITIAL LOADING SCREEN
   * ==========================================================
   */

  if (loading && !data.length) {
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
            Initializing Report Intelligence
          </h2>

          <p className="mt-2 text-sm text-text-muted">
            Generating regional analytics and model insights...
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
   * LOADED REPORT UI
   * ==========================================================
   */

  return (
    <PageTransition className="min-h-full">
      <AtmosphericBackground variant="default">

        <div className="relative min-h-full overflow-visible px-4 py-5 md:px-6 lg:px-8">

          {/* ==================================================
              REPORT PAGE GRAPHIC
              Historical data stream / analysis visualization
          ================================================== */}

          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <DataStream />
          </div>

          {/* Ambient glow */}

          <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />

          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-[1800px]">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="mb-8 flex flex-wrap items-start justify-between gap-4">

              <div>

                <div className="mb-2 flex items-center gap-2">

                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-sky-400/70">
                    Terrain Analytics Network
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <FileBarChart className="hidden h-8 w-8 text-sky-400 md:block" />

                  <h1 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                    Analytics & Reports
                  </h1>

                </div>

                <p className="mt-2 max-w-2xl text-sm text-text-secondary md:text-base">
                  Incident trends, rainfall intelligence and
                  VarshaNetra model performance
                </p>

              </div>

              {/* Header actions */}

              <div className="flex items-center gap-2">

                <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-2 text-xs text-emerald-400 backdrop-blur-xl">

                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

                  Model Connected

                </div>

                <button
                  onClick={csv}
                  disabled={!data.length}
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
                    disabled:opacity-40
                  "
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </button>

              </div>

            </div>

            {/* ==================================================
                CONTROLS
            ================================================== */}

            <GlassCard
              hover={false}
              className="mb-6"
            >

              <div className="flex flex-wrap items-center justify-between gap-4">

                <div className="flex flex-wrap items-center gap-3">

                  <div className="flex items-center gap-2">

                    <BarChart3 className="h-4 w-4 text-sky-400" />

                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
                      Analysis Period
                    </span>

                  </div>

                  <select
                    value={range}
                    onChange={(e) =>
                      setRange(e.target.value)
                    }
                    className="
                      rounded-xl
                      border border-white/[0.08]
                      bg-white/[0.035]
                      px-4
                      py-2.5
                      text-sm
                      text-text-primary
                      outline-none
                      transition-all
                      focus:border-sky-400/30
                      focus:ring-1
                      focus:ring-sky-400/20
                    "
                  >
                    <option value="7">
                      Last 7 Days
                    </option>

                    <option value="30">
                      Last 30 Days
                    </option>
                  </select>

                </div>

                <button
                  onClick={generate}
                  disabled={loading}
                  className="
                    flex items-center gap-2
                    rounded-xl
                    border border-white/[0.08]
                    bg-white/[0.035]
                    px-4 py-2.5
                    text-sm
                    font-medium
                    text-text-secondary
                    backdrop-blur-xl
                    transition-all duration-300
                    hover:border-sky-400/20
                    hover:bg-sky-400/[0.06]
                    hover:text-sky-300
                    disabled:opacity-50
                  "
                >

                  <RefreshCw
                    className={
                      loading
                        ? 'h-4 w-4 animate-spin'
                        : 'h-4 w-4'
                    }
                  />

                  Generate live model report

                </button>

              </div>

            </GlassCard>

            {/* ==================================================
                STAT CARDS
            ================================================== */}

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <Stat
                icon={AlertTriangle}
                label="High/Critical regions"
                value={String(highCritical)}
                description="Requires attention"
              />

              <Stat
                icon={CloudRain}
                label="Average rainfall"
                value={`${avg.toFixed(0)} mm`}
                description="Across monitored regions"
              />

              <Stat
                icon={ShieldCheck}
                label="Model confidence"
                value={
                  data.length
                    ? `${confidence}%`
                    : '—'
                }
                description="Prediction confidence"
              />

              <Stat
                icon={Activity}
                label="Maximum risk score"
                value={
                  data.length
                    ? `${maxFlood}%`
                    : '—'
                }
                description="Highest flood probability"
              />

            </div>

            {/* ==================================================
                ANALYTICS GRID
            ================================================== */}

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

              {/* Risk Score Trend */}

              <GlassCard
                hover={false}
                className="p-5"
              >

                <div className="mb-6 flex items-start justify-between">

                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-400/60">
                      Risk Intelligence
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-text-primary">
                      Risk Score Trend
                    </h2>

                    <p className="mt-1 text-xs text-text-muted">
                      Regional flood probability · {range}-day
                    </p>

                  </div>

                  <div className="rounded-xl border border-sky-400/10 bg-sky-400/[0.05] p-2.5">
                    <Activity className="h-4 w-4 text-sky-400" />
                  </div>

                </div>

                <div className="relative h-56">

                  <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between border-t border-white/[0.04]">
                    <span className="mt-1 text-[9px] text-text-muted">
                      100
                    </span>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 top-1/4 border-t border-white/[0.04]" />

                  <div className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-white/[0.04]" />

                  <div className="pointer-events-none absolute inset-x-0 top-3/4 border-t border-white/[0.04]" />

                  <div className="pointer-events-none absolute inset-x-0 bottom-5 border-b border-white/[0.08]" />

                  <div className="absolute inset-x-0 bottom-5 top-0 flex items-end gap-3 px-3">

                    {(data.length
                      ? data
                      : [1, 2, 3, 4]
                    ).map(
                      (p: any, i: number) => {

                        const value =
                          typeof p === 'number'
                            ? 35 + i * 7
                            : Math.round(
                                p.flood_probability *
                                  100
                              )

                        const region =
                          typeof p === 'number'
                            ? `R${i + 1}`
                            : p.region

                        return (
                          <motion.div
                            key={i}
                            initial={{
                              height: 0,
                              opacity: 0,
                            }}
                            animate={{
                              height: `${Math.max(
                                8,
                                value
                              )}%`,
                              opacity: 1,
                            }}
                            transition={{
                              duration: 0.7,
                              delay: i * 0.08,
                            }}
                            className="group relative flex min-w-0 flex-1 flex-col items-center justify-end"
                          >

                            <div className="mb-2 text-[10px] font-semibold text-text-muted opacity-0 transition-opacity group-hover:opacity-100">
                              {value}%
                            </div>

                            <div
                              className="
                                w-full
                                max-w-14
                                rounded-t-lg
                                bg-gradient-to-t
                                from-sky-500/40
                                to-cyan-300/80
                                shadow-[0_0_20px_rgba(56,189,248,0.08)]
                                transition-all duration-300
                                group-hover:shadow-[0_0_25px_rgba(56,189,248,0.18)]
                              "
                              style={{
                                height: '100%',
                              }}
                            />

                            <span className="mt-2 max-w-16 truncate text-[9px] capitalize text-text-muted">
                              {typeof region === 'string'
                                ? region.slice(0, 8)
                                : ''}
                            </span>

                          </motion.div>
                        )
                      }
                    )}

                  </div>

                </div>

              </GlassCard>

              {/* Rainfall Trend */}

              <GlassCard
                hover={false}
                className="p-5"
              >

                <div className="mb-6 flex items-start justify-between">

                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-400/60">
                      Atmospheric Intelligence
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-text-primary">
                      Rainfall Trend
                    </h2>

                    <p className="mt-1 text-xs text-text-muted">
                      Predicted rainfall by region
                    </p>

                  </div>

                  <div className="rounded-xl border border-sky-400/10 bg-sky-400/[0.05] p-2.5">
                    <CloudRain className="h-4 w-4 text-sky-400" />
                  </div>

                </div>

                <div className="space-y-5">

                  {(data.length
                    ? data
                    : regions.map(
                        (r, i) =>
                          ({
                            region: r,
                            rainfall_mm: [
                              185,
                              412,
                              156,
                              198,
                            ][i],
                          } as any)
                      )
                  ).map((p: any) => {

                    const rainfall =
                      Number(
                        p.rainfall_mm
                      )

                    const percentage =
                      Math.min(
                        100,
                        rainfall / 4.5
                      )

                    return (
                      <div
                        key={p.region}
                      >

                        <div className="mb-2 flex items-center justify-between">

                          <div className="flex items-center gap-2">

                            <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]" />

                            <span className="text-sm capitalize text-text-secondary">
                              {p.region}
                            </span>

                          </div>

                          <b className="text-sm text-text-primary">
                            {rainfall.toFixed(0)}
                            <span className="ml-1 text-[10px] font-normal text-text-muted">
                              mm
                            </span>
                          </b>

                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">

                          <motion.div
                            initial={{
                              width: 0,
                            }}
                            animate={{
                              width: `${percentage}%`,
                            }}
                            transition={{
                              duration: 0.8,
                              ease: 'easeOut',
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-sky-500/60 to-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.15)]"
                          />

                        </div>

                      </div>
                    )
                  })}

                </div>

              </GlassCard>

            </div>

            {/* ==================================================
                REGIONAL REPORT
            ================================================== */}

            <GlassCard
              hover={false}
              className="mt-5 overflow-hidden p-0"
            >

              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-4">

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-400/60">
                    Regional Intelligence
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-text-primary">
                    Regional Report
                  </h2>

                </div>

                <div className="flex items-center gap-2 text-[10px] text-text-muted">

                  <Database className="h-3.5 w-3.5 text-sky-400/60" />

                  Model-generated data

                </div>

              </div>

              {data.length ? (

                <div className="overflow-x-auto">

                  <table className="w-full text-sm">

                    <thead>

                      <tr className="border-b border-white/[0.06] text-left">

                        <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                          Region
                        </th>

                        <th className="px-3 py-4 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                          Rainfall
                        </th>

                        <th className="px-3 py-4 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                          Flood
                        </th>

                        <th className="px-3 py-4 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                          Inundation
                        </th>

                        <th className="px-3 py-4 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                          Warning
                        </th>

                        <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                          Confidence
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {data
                        .slice()
                        .sort(
                          (a, b) =>
                            rank[
                              b.warning_level
                            ] -
                            rank[
                              a.warning_level
                            ]
                        )
                        .map((p) => (

                          <tr
                            key={p.region}
                            className="border-b border-white/[0.04] transition-colors hover:bg-white/[0.025]"
                          >

                            <td className="px-5 py-4">

                              <div className="flex items-center gap-3">

                                <span
                                  className={`
                                    h-2.5
                                    w-2.5
                                    rounded-full
                                    ${riskBar[p.warning_level]}
                                  `}
                                />

                                <span className="font-semibold capitalize text-text-primary">
                                  {p.region}
                                </span>

                              </div>

                            </td>

                            <td className="px-3 py-4 text-text-secondary">
                              {p.rainfall_mm.toFixed(
                                1
                              )}{' '}
                              mm
                            </td>

                            <td className="px-3 py-4 text-text-secondary">
                              {Math.round(
                                p.flood_probability *
                                  100
                              )}
                              %
                            </td>

                            <td className="px-3 py-4 text-text-secondary">
                              {p.inundation_depth_m.toFixed(
                                2
                              )}{' '}
                              m
                            </td>

                            <td className="px-3 py-4">

                              <span
                                className={`
                                  inline-flex
                                  rounded-lg
                                  border
                                  px-2.5
                                  py-1
                                  text-[10px]
                                  font-bold
                                  tracking-wider
                                  ${riskClass[p.warning_level]}
                                `}
                              >
                                {p.warning_level}
                              </span>

                            </td>

                            <td className="px-5 py-4">

                              <div className="flex items-center gap-3">

                                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/[0.06]">

                                  <div
                                    className="h-full rounded-full bg-sky-400"
                                    style={{
                                      width: `${Math.min(
                                        100,
                                        p.confidence *
                                          100
                                      )}%`,
                                    }}
                                  />

                                </div>

                                <span className="text-xs text-text-secondary">
                                  {Math.round(
                                    p.confidence *
                                      100
                                  )}
                                  %
                                </span>

                              </div>

                            </td>

                          </tr>

                        ))}

                    </tbody>

                  </table>

                </div>

              ) : (

                <div className="p-8 text-center">

                  <BarChart3 className="mx-auto h-8 w-8 text-sky-400/30" />

                  <p className="mt-3 text-sm text-text-primary">
                    No report data available
                  </p>

                  <p className="mt-1 text-xs text-text-muted">
                    Generate a live model report to query the backend.
                  </p>

                </div>

              )}

            </GlassCard>

            {/* ==================================================
                DATA NOTICE
            ================================================== */}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.05] pt-4">

              <p className="text-[10px] leading-5 text-text-muted">
                The report queries the real trained model;
                demo environmental inputs are synthetic until
                live data ingestion is connected.
              </p>

              <div className="flex items-center gap-2 text-[10px] text-text-muted">

                <span className="h-1.5 w-1.5 rounded-full bg-sky-400/70" />

                VarshaNetra Analytics Engine

              </div>

            </div>

          </div>

        </div>

      </AtmosphericBackground>
    </PageTransition>
  )
}

/*
 * ============================================================
 * STAT CARD
 * ============================================================
 */

function Stat({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ElementType
  label: string
  value: string
  description: string
}) {
  return (
    <GlassCard
      hover={true}
      className="relative overflow-hidden p-5"
    >

      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-sky-400/[0.05] blur-2xl" />

      <div className="relative z-10">

        <div className="mb-4 flex items-center justify-between">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-sky-400/10 bg-sky-400/[0.05]">

            <Icon className="h-4 w-4 text-sky-400" />

          </div>

          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />

        </div>

        <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-text-muted">
          {label}
        </div>

        <div className="mt-1 text-3xl font-bold tracking-tight text-text-primary">
          {value}
        </div>

        <div className="mt-2 text-[10px] text-text-muted">
          {description}
        </div>

      </div>

    </GlassCard>
  )
}