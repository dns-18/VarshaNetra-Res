import React, { useState, useEffect, useCallback } from 'react'
import {
  Cloud,
  Wind,
  AlertTriangle,
  RefreshCw,
  Zap,
  Info,
  Droplet,
  WifiOff,
  Activity,
  BrainCircuit,
  MapPin,
  ShieldAlert,
  Radio,
  Clock3,
} from 'lucide-react'

import { motion } from 'motion/react'

import MetricCard from '@components/dashboard/MetricCard'
import StatusIndicator from '@components/dashboard/StatusIndicator'
import {
  fetchDemoPrediction,
  VarshaNetraPrediction,
  VarshaNetraApiError,
  WarningLevel,
} from '@services/varshanetraApi'

import {
  generateStateMetrics,
  getRegionStatuses,
  RegionStatus,
} from '@services/mockData'

import RadarSweep from '@/components/graphics/RadarSweep'
import IntelligencePulse from '@components/graphics/IntelligencePulse'
import AtmosphericBackground from '@components/graphics/AtmosphericBackground'
import GlassCard from '@components/ui/GlassCard'
import AnimatedNumber from '@components/ui/AnimatedNumber'
import RiskGauge from '@components/ui/RiskGauge'
import PageTransition from '@components/ui/PageTransition'

/**
 * Dashboard Page
 *
 * Calls the real VarshaNetra model backend (POST /demo/predict) for the
 * selected NER state. The model and its prediction are real; the "current
 * conditions" the backend feeds it are simulated until real sensor
 * ingestion is wired up — see services/varshanetraApi.ts and the backend's
 * inference/demo.py for exactly what that means. This is surfaced to the
 * user via the banner below rather than hidden.
 *
 * If the backend is unreachable at all (not running, wrong URL, etc.), the
 * dashboard falls back to the old client-side mock generator so the UI
 * still demos something instead of showing a blank error page — clearly
 * labeled as offline/preview data when that happens.
 */

const RISK_LEVEL_BY_WARNING: Record<
  WarningLevel,
  {
    label: string
    color: 'success' | 'warning' | 'error'
    baseScore: number
  }
> = {
  GREEN: {
    label: 'Low Risk',
    color: 'success',
    baseScore: 10,
  },
  YELLOW: {
    label: 'Moderate Risk',
    color: 'warning',
    baseScore: 40,
  },
  ORANGE: {
    label: 'High Risk',
    color: 'error',
    baseScore: 65,
  },
  RED: {
    label: 'Critical Risk',
    color: 'error',
    baseScore: 88,
  },
}

/**
 * Warning level gives the coarse risk band; blending in the model's own
 * probabilities spreads scores out within that band instead of every GREEN
 * prediction showing the same flat number.
 */
function riskScoreFromPrediction(
  p: VarshaNetraPrediction
): number {
  const { baseScore } =
    RISK_LEVEL_BY_WARNING[p.warning_level]

  const maxProb = Math.max(
    p.heavy_rain_probability,
    p.flood_probability
  )

  return Math.min(
    100,
    Math.round(baseScore + maxProb * 20)
  )
}

export default function Dashboard() {
  const [selectedState, setSelectedState] =
    useState<string>('assam')

  const [prediction, setPrediction] =
    useState<VarshaNetraPrediction | null>(null)

  const [regions, setRegions] =
    useState<RegionStatus[]>([])

  const [loading, setLoading] =
    useState(true)

  const [lastUpdate, setLastUpdate] =
    useState<Date>(new Date())

  const [offline, setOffline] =
    useState(false)

  const [offlineReason, setOfflineReason] =
    useState<string>('')

  const states = [
    {
      id: 'assam',
      name: 'Assam',
      flag: '🟢',
    },
    {
      id: 'meghalaya',
      name: 'Meghalaya',
      flag: '🟠',
    },
    {
      id: 'manipur',
      name: 'Manipur',
      flag: '🔵',
    },
    {
      id: 'mizoram',
      name: 'Mizoram',
      flag: '🟡',
    },
  ]

  const load = useCallback(
    async (state: string) => {
      try {
        const result =
          await fetchDemoPrediction(
            state,
            3,
            6
          )

        setPrediction(result)
        setOffline(false)
        setOfflineReason('')
      } catch (err) {
        // Backend unreachable — fall back to the old
        // client-side mock so the UI still shows something,
        // clearly labeled as offline/preview data.

        const message =
          err instanceof VarshaNetraApiError
            ? err.message
            : String(err)

        console.error(
          '[VarshaNetra] Backend request failed:',
          message
        )

        setOfflineReason(
          'Backend unavailable. Please ensure the VarshaNetra API is running.'
        )

        setOffline(true)

        const mock =
          generateStateMetrics(state)

        setPrediction({
          location: mock.district,

          forecast_time:
            mock.timestamp.toISOString(),

          rainfall_mm:
            mock.rainfall,

          rainfall_category:
            mock.rainfall > 150
              ? 'Heavy'
              : mock.rainfall > 50
                ? 'Moderate'
                : 'Light',

          heavy_rain_probability:
            mock.riskScore / 100,

          flood_probability:
            mock.riskScore / 150,

          inundation_depth_m:
            0,

          confidence:
            0.5,

          uncertainty:
            0.5,

          thermo_wind_signal:
            0,

          warning_level:
            mock.riskScore > 70
              ? 'RED'
              : mock.riskScore > 50
                ? 'ORANGE'
                : mock.riskScore > 25
                  ? 'YELLOW'
                  : 'GREEN',

          top_contributing_features:
            [],

          region:
            mock.state,

          demo_mode:
            true,

          data_source:
            'synthetic',

          data_source_notice:
            'Backend unreachable — showing offline preview data (client-side mock, not a model prediction).',

          current_conditions: {
            rainfall_last_hour_mm:
              mock.rainfall / 24,

            wind_speed_ms:
              mock.windSpeed / 3.6,

            wind_dir_deg:
              0,

            temperature_c:
              28,

            relative_humidity_pct:
              70,

            soil_moisture_pct:
              mock.soilSaturation,

            river_stage_m:
              0,
          },
        })
      }

      setLastUpdate(
        new Date()
      )

      setLoading(false)
    },
    []
  )

  useEffect(() => {
    setLoading(true)

    load(selectedState)

    setRegions(
      getRegionStatuses()
    )
  }, [
    selectedState,
    load,
  ])

  /**
   * Poll for fresh predictions periodically.
   * 60s because /demo/predict performs real feature
   * engineering + model inference per call.
   */
  useEffect(() => {
    const interval =
      setInterval(
        () =>
          load(selectedState),
        60_000
      )

    return () =>
      clearInterval(interval)
  }, [
    selectedState,
    load,
  ])

  /*
   * ---------------------------------------------------------
   * LOADING SCREEN
   * ---------------------------------------------------------
   */

  if (loading || !prediction) {
    return (
      <div className="relative flex h-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-surface-base" />

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="relative z-10 text-center"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10">
            <RefreshCw className="h-7 w-7 animate-spin text-sky-400" />
          </div>

          <h2 className="text-lg font-semibold text-text-primary">
            Initializing Terrain Intelligence
          </h2>

          <p className="mt-2 text-sm text-text-muted">
            Connecting to the VarshaNetra prediction engine...
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
   * ---------------------------------------------------------
   * DERIVED DATA
   * ---------------------------------------------------------
   */

  const riskInfo =
    RISK_LEVEL_BY_WARNING[
      prediction.warning_level
    ]

  const riskScore =
    riskScoreFromPrediction(
      prediction
    )

  const conditions =
    prediction.current_conditions

  const stateMeta =
    states.find(
      (s) =>
        s.id === selectedState
    )!

  const windSpeedKmh =
    conditions
      ? conditions.wind_speed_ms * 3.6
      : 0

  /*
   * ---------------------------------------------------------
   * MAIN DASHBOARD
   * ---------------------------------------------------------
   */

  return (
    <PageTransition>
      <AtmosphericBackground variant="rain">
        <div className="relative overflow-visible px-4 py-5 md:px-6 lg:px-8">

          {/* Dashboard intelligence graphics */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <RadarSweep />
            <IntelligencePulse live={true} />
          </div>

          {/* Ambient dashboard glow */}

          <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-sky-500/5 blur-3xl" />

          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-400/5 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-[1800px]">

            {/* =====================================================
                HEADER
            ====================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: -12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="mb-6"
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">

                {/* Title */}

                <div>

                  <div className="mb-3 flex items-center gap-2">

                    <span className="flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300">
                      <Activity className="h-3 w-3" />
                      Terrain Intelligence
                    </span>

                    <span className="text-[10px] uppercase tracking-[0.18em] text-text-muted">
                      NER / LIVE MONITORING
                    </span>

                  </div>

                  <h1 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
                    Risk Intelligence

                    <span className="ml-2 text-sky-400">
                      Command Center
                    </span>
                  </h1>

                  <p className="mt-3 max-w-3xl text-sm leading-6 text-text-secondary md:text-base">
                    AI-powered rainfall, inundation and
                    terrain-risk monitoring across the
                    North-East Region of India.
                  </p>

                </div>

                {/* Status */}

                <div className="flex flex-wrap items-center gap-3">

                  {offline ? (

                    <div className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-2.5">

                      <WifiOff className="h-4 w-4 text-red-400" />

                      <div>

                        <div className="text-xs font-bold text-red-300">
                          OFFLINE PREVIEW
                        </div>

                        <div className="text-[10px] text-red-300/60">
                          Model unavailable
                        </div>

                      </div>

                    </div>

                  ) : (

                    <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2.5">

                      <span className="relative flex h-2.5 w-2.5">

                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />

                      </span>

                      <div>

                        <div className="text-xs font-bold text-emerald-300">
                          LIVE MODEL
                        </div>

                        <div className="text-[10px] text-emerald-300/60">
                          Prediction engine active
                        </div>

                      </div>

                    </div>
                  )}

                  {/* Last update */}

                  <div className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-2.5 backdrop-blur-xl">

                    <div className="flex items-center gap-2">

                      <Clock3 className="h-4 w-4 text-text-muted" />

                      <div>

                        <div className="text-[10px] uppercase tracking-wider text-text-muted">
                          Last update
                        </div>

                        <div className="text-xs font-semibold text-text-primary">
                          {lastUpdate.toLocaleTimeString()}
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================================
                  DATA SOURCE NOTICE
              ================================================== */}

              <GlassCard
                hover={false}
                className={`mt-5 p-4 ${
                  offline
                    ? 'border-red-400/20 bg-red-400/[0.04]'
                    : 'border-sky-400/10'
                }`}
              >

                <div className="flex items-start gap-3">

                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      offline
                        ? 'bg-red-400/10 text-red-400'
                        : 'bg-sky-400/10 text-sky-400'
                    }`}
                  >

                    {offline ? (
                      <WifiOff className="h-4 w-4" />
                    ) : (
                      <Info className="h-4 w-4" />
                    )}

                  </div>

                  <div>

                    <div className="text-xs font-bold uppercase tracking-wider text-text-primary">
                      {offline
                        ? 'Offline preview'
                        : 'Prediction from trained VarshaNetra model'}
                    </div>

                    <p className="mt-1 text-xs leading-5 text-text-secondary">
                      {offline
                        ? offlineReason
                        : prediction.data_source_notice}
                    </p>

                  </div>

                </div>

              </GlassCard>

            </motion.div>

            {/* =====================================================
                REGION SELECTOR
            ====================================================== */}

            <div className="mb-6">

              <div className="mb-3 flex items-center justify-between">

                <div>

                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                    Monitoring region
                  </div>

                  <h2 className="mt-1 text-lg font-semibold text-text-primary">
                    Select intelligence zone
                  </h2>

                </div>

                <div className="hidden items-center gap-2 text-[10px] uppercase tracking-wider text-text-muted md:flex">

                  <Radio className="h-3.5 w-3.5" />

                  Multi-region surveillance

                </div>

              </div>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

                {states.map((state) => {

                  const active =
                    selectedState ===
                    state.id

                  return (
                    <motion.button
                      key={state.id}
                      onClick={() =>
                        setSelectedState(
                          state.id
                        )
                      }
                      whileHover={{
                        y: -3,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                        active
                          ? 'border-sky-400/40 bg-sky-400/[0.10] shadow-[0_0_30px_rgba(56,189,248,0.08)]'
                          : 'border-white/[0.08] bg-white/[0.025] hover:border-sky-400/20 hover:bg-white/[0.045]'
                      }`}
                    >

                      {active && (
                        <motion.div
                          layoutId="active-region"
                          className="absolute inset-x-0 top-0 h-px bg-sky-400"
                        />
                      )}

                      <div className="flex items-center justify-between">

                        <span className="text-xl">
                          {state.flag}
                        </span>

                        {active && (
                          <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-sky-300">

                            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />

                            Active

                          </span>
                        )}

                      </div>

                      <div className="mt-4 text-sm font-bold text-text-primary">
                        {state.name}
                      </div>

                      <div className="mt-1 text-[10px] text-text-muted">
                        Regional monitoring zone
                      </div>

                    </motion.button>
                  )
                })}

              </div>

            </div>

            {/* =====================================================
                PRIMARY RISK INTELLIGENCE
            ====================================================== */}

            <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_0.65fr]">

              {/* RISK PULSE */}

              <GlassCard
                hover={false}
                glow={riskScore >= 55}
                className="relative overflow-hidden p-6"
              >

                <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />

                <div className="relative z-10">

                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                    <div>

                      <div className="flex items-center gap-2">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-400/10">

                          <ShieldAlert className="h-5 w-5 text-sky-400" />

                        </div>

                        <div>

                          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                            Current risk pulse
                          </div>

                          <div className="text-sm font-semibold text-text-primary">
                            {prediction.region ??
                              stateMeta.name}
                          </div>

                        </div>

                      </div>

                      <div className="mt-6">

                        <div className="flex items-baseline gap-3">

                          <AnimatedNumber
                            value={riskScore}
                            suffix=""
                            className="text-6xl font-black tracking-tight text-text-primary md:text-7xl"
                          />

                          <span className="text-lg text-text-muted">
                            /100
                          </span>

                        </div>

                        <div className="mt-2 flex items-center gap-2">

                          <span
                            className={`h-2.5 w-2.5 rounded-full ${
                              prediction.warning_level ===
                              'RED'
                                ? 'bg-red-500'
                                : prediction.warning_level ===
                                    'ORANGE'
                                  ? 'bg-orange-400'
                                  : prediction.warning_level ===
                                      'YELLOW'
                                    ? 'bg-yellow-400'
                                    : 'bg-emerald-400'
                            }`}
                          />

                          <span className="text-sm font-bold text-text-primary">
                            {riskInfo.label}
                          </span>

                          <span className="text-xs text-text-muted">
                            • Warning{' '}
                            {prediction.warning_level}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* Gauge */}

                    <div className="flex justify-center">

                      <RiskGauge
                        value={riskScore}
                      />

                    </div>

                  </div>

                  {/* Risk signal strip */}

                  <div className="mt-6 grid grid-cols-3 gap-2">

                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">

                      <div className="text-[9px] uppercase tracking-wider text-text-muted">
                        Heavy rain
                      </div>

                      <div className="mt-1 text-lg font-bold text-text-primary">
                        {Math.round(
                          prediction.heavy_rain_probability *
                            100
                        )}
                        %
                      </div>

                    </div>

                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">

                      <div className="text-[9px] uppercase tracking-wider text-text-muted">
                        Flood
                      </div>

                      <div className="mt-1 text-lg font-bold text-text-primary">
                        {Math.round(
                          prediction.flood_probability *
                            100
                        )}
                        %
                      </div>

                    </div>

                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">

                      <div className="text-[9px] uppercase tracking-wider text-text-muted">
                        Confidence
                      </div>

                      <div className="mt-1 text-lg font-bold text-text-primary">
                        {Math.round(
                          prediction.confidence *
                            100
                        )}
                        %
                      </div>

                    </div>

                  </div>

                </div>

              </GlassCard>

              {/* INTELLIGENCE NODE */}

              <GlassCard
                hover={false}
                className="p-6"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10">

                    <MapPin className="h-5 w-5 text-emerald-400" />

                  </div>

                  <div>

                    <div className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
                      Intelligence node
                    </div>

                    <div className="text-sm font-bold text-text-primary">
                      {prediction.location}
                    </div>

                  </div>

                </div>

                <div className="mt-6 space-y-4">

                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">

                    <span className="text-xs text-text-muted">
                      Region
                    </span>

                    <span className="text-xs font-semibold text-text-primary">
                      {prediction.region ??
                        stateMeta.name}
                    </span>

                  </div>

                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">

                    <span className="text-xs text-text-muted">
                      Forecast
                    </span>

                    <span className="text-right text-xs font-semibold text-text-primary">
                      {new Date(
                        prediction.forecast_time
                      ).toLocaleString()}
                    </span>

                  </div>

                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">

                    <span className="text-xs text-text-muted">
                      River stage
                    </span>

                    <span className="text-xs font-semibold text-text-primary">
                      {conditions
                        ? `${conditions.river_stage_m.toFixed(2)} m`
                        : '—'}
                    </span>

                  </div>

                  {/* Confidence */}

                  <div>

                    <div className="mb-2 flex items-center justify-between">

                      <span className="text-xs text-text-muted">
                        Model confidence
                      </span>

                      <span className="text-xs font-bold text-sky-300">
                        {Math.round(
                          prediction.confidence *
                            100
                        )}
                        %
                      </span>

                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">

                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: `${
                            prediction.confidence *
                            100
                          }%`,
                        }}
                        transition={{
                          duration: 1,
                        }}
                        className="h-full rounded-full bg-sky-400"
                      />

                    </div>

                  </div>

                </div>

              </GlassCard>

            </div>

            {/* =====================================================
                LIVE CONDITIONS
            ====================================================== */}

            <div className="mb-8">

              <div className="mb-4 flex items-end justify-between">

                <div>

                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                    Environmental telemetry
                  </div>

                  <h2 className="mt-1 flex items-center gap-2 text-xl font-bold text-text-primary">

                    <Activity className="h-5 w-5 text-sky-400" />

                    Live Conditions

                  </h2>

                </div>

                <div className="hidden items-center gap-2 text-[10px] text-text-muted md:flex">

                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

                  Updating every 60 seconds

                </div>

              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

                <MetricCard
                  icon={Cloud}
                  label="Rainfall (forecast)"
                  value={
                    prediction.rainfall_mm
                  }
                  unit="mm"
                  color="info"
                  description={`${prediction.rainfall_category} rainfall predicted for ${prediction.forecast_time}`}
                  source={`Model: VarshaNetra | Grid cell: ${prediction.location}`}
                  lastUpdated={
                    lastUpdate
                  }
                />

                <MetricCard
                  icon={Wind}
                  label="Wind Speed"
                  value={
                    windSpeedKmh.toFixed(1)
                  }
                  unit="km/h"
                  color="warning"
                  trend={
                    windSpeedKmh > 40
                      ? 'up'
                      : 'stable'
                  }
                  description="Current wind speed feeding the Thermo-Wind convergence signal"
                  source={`${
                    offline
                      ? 'Offline preview'
                      : 'Simulated current conditions'
                  } | ${
                    prediction.region ??
                    stateMeta.name
                  }`}
                  lastUpdated={
                    lastUpdate
                  }
                />

                <MetricCard
                  icon={AlertTriangle}
                  label={riskInfo.label}
                  value={
                    riskScore
                  }
                  unit="/100"
                  color={
                    riskInfo.color
                  }
                  description={`Warning level: ${prediction.warning_level} — heavy-rain probability ${Math.round(
                    prediction.heavy_rain_probability *
                      100
                  )}%, flood probability ${Math.round(
                    prediction.flood_probability *
                      100
                  )}%`}
                  source={`VarshaNetra AI Engine | ${
                    prediction.region ??
                    stateMeta.name
                  }`}
                  lastUpdated={
                    lastUpdate
                  }
                />

                <MetricCard
                  icon={Droplet}
                  label="Soil Saturation"
                  value={
                    conditions
                      ? conditions.soil_moisture_pct.toFixed(
                          0
                        )
                      : '—'
                  }
                  unit="%"
                  color={
                    conditions &&
                    conditions.soil_moisture_pct >
                      80
                      ? 'error'
                      : conditions &&
                          conditions.soil_moisture_pct >
                            60
                        ? 'warning'
                        : 'success'
                  }
                  description="Soil moisture — higher values mean less capacity to absorb further rainfall"
                  source={`${
                    offline
                      ? 'Offline preview'
                      : 'Simulated current conditions'
                  } | ${
                    prediction.region ??
                    stateMeta.name
                  }`}
                  lastUpdated={
                    lastUpdate
                  }
                />

              </div>

            </div>

            {/* =====================================================
                AI DECISION TRACE
            ====================================================== */}

            <GlassCard
              hover={false}
              className="mb-8 overflow-hidden p-0"
            >

              <div className="border-b border-white/[0.07] p-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10">

                    <BrainCircuit className="h-5 w-5 text-violet-300" />

                  </div>

                  <div>

                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                      AI decision trace
                    </div>

                    <h3 className="mt-1 text-base font-bold text-text-primary">
                      Why is this warning active?
                    </h3>

                  </div>

                </div>

              </div>

              <div className="p-5">

                {prediction.top_contributing_features.length >
                0 ? (

                  <div className="grid gap-3 md:grid-cols-2">

                    {prediction.top_contributing_features.map(
                      (reason, i) => (

                        <motion.div
                          key={i}
                          initial={{
                            opacity: 0,
                            x: -8,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: i * 0.08,
                          }}
                          className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4"
                        >

                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-400/10 text-xs font-bold text-violet-300">

                            {String(
                              i + 1
                            ).padStart(
                              2,
                              '0'
                            )}

                          </div>

                          <p className="text-xs leading-5 text-text-secondary">
                            {reason}
                          </p>

                        </motion.div>

                      )
                    )}

                  </div>

                ) : (

                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">

                    <p className="text-xs leading-5 text-text-secondary">

                      {offline
                        ? 'Feature attribution requires a live connection to the model backend.'
                        : 'No individual feature stood out for this prediction.'}

                    </p>

                  </div>

                )}

              </div>

            </GlassCard>

            {/* =====================================================
                REGIONAL NETWORK
            ====================================================== */}

            <div className="mb-8">

              <div className="mb-4 flex items-end justify-between">

                <div>

                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                    Regional network
                  </div>

                  <h2 className="mt-1 flex items-center gap-2 text-xl font-bold text-text-primary">

                    <Radio className="h-5 w-5 text-sky-400" />

                    All Monitored Regions

                  </h2>

                </div>

                <div className="hidden text-xs text-text-muted md:block">
                  {regions.length} intelligence zones
                </div>

              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                {regions.map(
                  (region, idx) => {

                    const regionDetails = [
                      {
                        district:
                          'Sonitpur, Lakhimpur',
                        sensors: 8,
                        risk: 'Moderate',
                      },
                      {
                        district:
                          'Khasi Hills, Jaintia Hills',
                        sensors: 6,
                        risk: 'High',
                      },
                      {
                        district:
                          'Imphal Valley, Thoubal',
                        sensors: 5,
                        risk: 'Moderate',
                      },
                      {
                        district:
                          'Aizawl, Kolasib',
                        sensors: 7,
                        risk: 'Low',
                      },
                    ][idx]

                    return (
                      <StatusIndicator
                        key={
                          region.region
                        }
                        region={
                          region.region
                        }
                        district={
                          regionDetails?.district ??
                          'Regional monitoring zone'
                        }
                        status={
                          region.status
                        }
                        message={`${
                          regionDetails?.sensors ??
                          0
                        } active sensor stations | Last update: ${
                          region.lastUpdate
                        }`}
                        sensors={
                          regionDetails?.sensors ??
                          0
                        }
                        riskLevel={
                          regionDetails?.risk ??
                          'Moderate'
                        }
                      />
                    )
                  }
                )}

              </div>

            </div>

            {/* =====================================================
                SYSTEM INTELLIGENCE NOTES
            ====================================================== */}

            <GlassCard
              hover={false}
              className="mb-4 p-5"
            >

              <div className="flex items-start gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-400/10">

                  <Info className="h-4 w-4 text-sky-400" />

                </div>

                <div>

                  <div className="text-xs font-bold uppercase tracking-[0.15em] text-text-primary">
                    System intelligence notes
                  </div>

                  <div className="mt-3 grid gap-2 text-[11px] leading-5 text-text-muted md:grid-cols-2">

                    <div>
                      ✓ Predictions refresh every 60
                      seconds
                    </div>

                    <div>
                      ✓ Model warning level drives
                      the risk band
                    </div>

                    <div>
                      ✓ Current conditions are
                      simulated until real
                      ingestion is connected
                    </div>

                    <div>
                      ✓ Regional selector changes
                      the monitored intelligence
                      zone
                    </div>

                  </div>

                </div>

              </div>

            </GlassCard>

          </div>

        </div>
      </AtmosphericBackground>
    </PageTransition>
  )
}