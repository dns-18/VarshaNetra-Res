import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  MapPin,
  RefreshCw,
  Layers,
  CloudRain,
  ShieldAlert,
} from 'lucide-react'

import RadarSweep from '@components/graphics/RadarSweep'
import TerrainOverlay from '@components/graphics/TerrainOverlay'

import LeafletMap, {
  MapMarker,
} from '@components/maps/LeafletMap'

import {
  fetchDemoPrediction,
  fetchDemoRegions,
  DemoRegion,
  VarshaNetraPrediction,
} from '@services/varshanetraApi'

const pretty: Record<string, string> = {
  assam: 'Assam Plains',
  meghalaya: 'Meghalaya Hills',
  manipur: 'Imphal Valley',
  mizoram: 'Mizoram Ridge',
}

export default function LiveMap() {
  const [regions, setRegions] = useState<DemoRegion[]>([])
  const [preds, setPreds] = useState<VarshaNetraPrediction[]>([])
  const [selected, setSelected] = useState('all')
  const [loading, setLoading] = useState(true)
  const [satellite, setSatellite] = useState(false)

  const load = async () => {
    setLoading(true)

    try {
      const r = await fetchDemoRegions()

      setRegions(r.regions)

      setPreds(
        await Promise.all(
          r.regions.map((x) =>
            fetchDemoPrediction(x.id, 3, 6)
          )
        )
      )
    } catch {
      // Preserve existing behavior.
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const selectMarker = useCallback((m: MapMarker) => {
    setSelected(m.id)
  }, [])

  const markers: MapMarker[] = useMemo(
    () =>
      regions.map((r) => {
        const p = preds.find(
          (x) => x.region === r.id
        )

        return {
          id: r.id,
          label: pretty[r.id] || r.label,
          lat: r.lat,
          lon: r.lon,
          rainfall: p?.rainfall_mm || 0,
          warning: p?.warning_level || 'GREEN',
          flood: p?.flood_probability || 0,
        }
      }),
    [regions, preds]
  )

  const shown =
    selected === 'all'
      ? markers
      : markers.filter(
          (x) => x.id === selected
        )

  const active =
    markers.find(
      (x) => x.id === selected
    ) || markers[0]

  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-surface-base">

      {/* Atmospheric glow */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)',
            backgroundSize: '45px 45px',
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-20 shrink-0 border-b border-white/10 bg-black/20 px-4 py-4 backdrop-blur-xl sm:px-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 shadow-[0_0_25px_rgba(56,189,248,0.08)]">
              <MapPin className="h-5 w-5 text-sky-400" />
            </div>

            <div>
              <div className="flex items-center gap-2">

                <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                  Live GIS Map
                </h1>

                <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Live
                </span>

              </div>

              <p className="mt-1 text-xs text-text-muted sm:text-sm">
                Landslide risk monitoring across Assam,
                Meghalaya, Manipur, and Mizoram
              </p>
            </div>

          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">

            <button
              onClick={() =>
                setSatellite((v) => !v)
              }
              className="
                flex items-center gap-2
                rounded-xl
                border border-white/10
                bg-white/[0.04]
                px-3 py-2.5
                text-xs font-medium
                text-text-primary
                backdrop-blur-xl
                transition-all duration-200
                hover:border-sky-400/30
                hover:bg-sky-400/10
              "
            >
              <Layers className="h-4 w-4 text-sky-400" />

              {satellite
                ? 'Street'
                : 'Satellite'}
            </button>

            <button
              onClick={load}
              disabled={loading}
              className="
                flex items-center justify-center
                rounded-xl
                border border-sky-400/20
                bg-sky-400/10
                px-3 py-2.5
                text-sky-400
                backdrop-blur-xl
                transition-all duration-200
                hover:border-sky-400/40
                hover:bg-sky-400/20
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
              aria-label="Refresh map data"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  loading
                    ? 'animate-spin'
                    : ''
                }`}
              />
            </button>

          </div>
        </div>
      </div>

      {/* Main map + sidebar */}
      <div className="relative z-10 grid min-h-0 flex-1 lg:grid-cols-[1fr_390px]">

        {/* Map */}
        <div className="relative min-h-[500px] overflow-hidden">

          <LeafletMap
            markers={shown}
            satellite={satellite}
            onSelect={selectMarker}
          />

          {/* Map location badge */}
          <div className="absolute left-4 top-4 z-[500]">

            <div className="
              flex items-center gap-2
              rounded-xl
              border border-white/15
              bg-black/45
              px-3 py-2
              text-xs
              text-white
              shadow-xl
              backdrop-blur-xl
            ">

              <MapPin className="h-3.5 w-3.5 text-sky-400" />

              <span className="font-medium">
                North-East India
              </span>

              <span className="h-1 w-1 rounded-full bg-white/30" />

              <span className="text-white/60">
                Live monitoring
              </span>

            </div>

          </div>

          {/* Prediction status */}
          <div className="absolute bottom-4 left-4 z-[500]">

            <div className="
              flex items-center gap-2
              rounded-xl
              border border-white/10
              bg-black/45
              px-3 py-2
              text-[10px]
              font-medium
              uppercase
              tracking-wider
              text-white/70
              backdrop-blur-xl
            ">

              <span className="
                h-2 w-2
                animate-pulse
                rounded-full
                bg-emerald-400
                shadow-[0_0_10px_rgba(52,211,153,0.8)]
              " />

              Prediction layer active

            </div>

          </div>

        </div>

        {/* Right command panel */}
        <aside className="
          relative
          overflow-y-auto
          border-l border-white/10
          bg-black/20
          p-5
          backdrop-blur-2xl
        ">

          {/* Sidebar glow */}
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-sky-400/5 blur-3xl" />

          <div className="relative">

            {/* Region filter */}
            <div className="mb-6">

              <div className="mb-3 flex items-center justify-between">

                <div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-text-primary">
                    Region Filter
                  </h2>

                  <p className="mt-1 text-[10px] text-text-muted">
                    Select monitoring zone
                  </p>
                </div>

                <span className="
                  rounded-md
                  border border-sky-400/15
                  bg-sky-400/10
                  px-2 py-1
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-sky-400
                ">
                  {markers.length} zones
                </span>

              </div>

              <div className="flex flex-wrap gap-2">

                <button
                  onClick={() =>
                    setSelected('all')
                  }
                  className={`
                    rounded-lg
                    border
                    px-3 py-2
                    text-[11px]
                    font-semibold
                    transition-all duration-200
                    ${
                      selected === 'all'
                        ? `
                          border-sky-400/30
                          bg-sky-400/15
                          text-sky-300
                          shadow-[0_0_18px_rgba(56,189,248,0.08)]
                        `
                        : `
                          border-white/10
                          bg-white/[0.035]
                          text-text-muted
                          hover:border-white/20
                          hover:bg-white/[0.06]
                          hover:text-text-primary
                        `
                    }
                  `}
                >
                  All
                </button>

                {markers.map((m) => (

                  <button
                    key={m.id}
                    onClick={() =>
                      setSelected(m.id)
                    }
                    className={`
                      rounded-lg
                      border
                      px-3 py-2
                      text-[11px]
                      font-medium
                      transition-all duration-200
                      ${
                        selected === m.id
                          ? `
                            border-sky-400/30
                            bg-sky-400/15
                            text-sky-300
                          `
                          : `
                            border-white/10
                            bg-white/[0.035]
                            text-text-muted
                            hover:border-white/20
                            hover:bg-white/[0.06]
                            hover:text-text-primary
                          `
                      }
                    `}
                  >
                    {m.label}
                  </button>

                ))}

              </div>
            </div>

            {/* Divider */}
            <div className="mb-6 h-px bg-white/10" />

            {/* Risk overview */}
            <div>

              <div className="mb-3 flex items-center justify-between">

                <div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-text-primary">
                    Risk Overview
                  </h2>

                  <p className="mt-1 text-[10px] text-text-muted">
                    Current regional conditions
                  </p>
                </div>

                <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-emerald-400">

                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

                  Live

                </span>

              </div>

              <div className="space-y-3">

                {markers.map((m) => {

                  const riskStyle =
                    m.warning === 'RED'
                      ? {
                          dot: 'bg-red-500',
                          text: 'text-red-400',
                          bg: 'bg-red-400/10',
                          border: 'border-red-400/20',
                          label: 'Critical',
                        }
                      : m.warning === 'ORANGE'
                      ? {
                          dot: 'bg-orange-500',
                          text: 'text-orange-400',
                          bg: 'bg-orange-400/10',
                          border: 'border-orange-400/20',
                          label: 'High',
                        }
                      : m.warning === 'YELLOW'
                      ? {
                          dot: 'bg-amber-400',
                          text: 'text-amber-400',
                          bg: 'bg-amber-400/10',
                          border: 'border-amber-400/20',
                          label: 'Moderate',
                        }
                      : {
                          dot: 'bg-emerald-400',
                          text: 'text-emerald-400',
                          bg: 'bg-emerald-400/10',
                          border: 'border-emerald-400/20',
                          label: 'Low',
                        }

                  return (

                    <button
                      key={m.id}
                      onClick={() =>
                        setSelected(m.id)
                      }
                      className={`
                        group
                        relative
                        w-full
                        overflow-hidden
                        rounded-xl
                        border
                        p-4
                        text-left
                        transition-all duration-200
                        ${
                          selected === m.id
                            ? `
                              border-sky-400/35
                              bg-sky-400/[0.08]
                              shadow-[0_0_25px_rgba(56,189,248,0.06)]
                            `
                            : `
                              border-white/10
                              bg-white/[0.025]
                              hover:border-white/20
                              hover:bg-white/[0.05]
                            `
                        }
                      `}
                    >

                      {/* Selected indicator */}
                      {selected === m.id && (
                        <div className="
                          absolute
                          bottom-0
                          left-0
                          top-0
                          w-0.5
                          bg-sky-400
                          shadow-[0_0_10px_rgba(56,189,248,0.7)]
                        " />
                      )}

                      <div className="flex items-center justify-between gap-3">

                        <div className="flex min-w-0 items-center gap-2">

                          <span
                            className={`
                              h-2.5 w-2.5
                              shrink-0
                              rounded-full
                              ${riskStyle.dot}
                            `}
                          />

                          <span className="
                            truncate
                            text-sm
                            font-semibold
                            text-text-primary
                          ">
                            {m.label}
                          </span>

                        </div>

                        <span
                          className={`
                            shrink-0
                            rounded-md
                            border
                            px-2
                            py-1
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-wider
                            ${riskStyle.text}
                            ${riskStyle.bg}
                            ${riskStyle.border}
                          `}
                        >
                          {riskStyle.label}
                        </span>

                      </div>

                      <div className="
                        mt-3
                        flex
                        items-center
                        justify-between
                        border-t
                        border-white/5
                        pt-3
                        text-xs
                        text-text-muted
                      ">

                        <span className="flex items-center gap-1.5">

                          <CloudRain className="h-3.5 w-3.5 text-sky-400" />

                          {m.rainfall.toFixed(0)} mm

                        </span>

                        <span>
                          Flood{' '}
                          <span className="font-semibold text-violet-400">
                            {Math.round(
                              m.flood * 100
                            )}
                            %
                          </span>
                        </span>

                      </div>

                    </button>

                  )
                })}

              </div>

            </div>

            {/* Selected region */}
            {active && (

              <div className="
                mt-6
                rounded-xl
                border
                border-sky-400/15
                bg-sky-400/[0.035]
                p-4
                shadow-[0_0_30px_rgba(56,189,248,0.04)]
                backdrop-blur-xl
              ">

                <div className="flex items-center gap-2">

                  <div className="
                    flex h-8 w-8
                    items-center justify-center
                    rounded-lg
                    border border-sky-400/20
                    bg-sky-400/10
                  ">
                    <ShieldAlert className="h-4 w-4 text-sky-400" />
                  </div>

                  <div>

                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                      Selected region
                    </p>

                    <p className="text-sm font-semibold text-text-primary">
                      {active.label}
                    </p>

                  </div>

                </div>

                <p className="
                  mt-3
                  text-xs
                  leading-relaxed
                  text-text-muted
                ">
                  {active.label}:{' '}
                  {active.rainfall.toFixed(1)} mm
                  predicted,{' '}
                  {Math.round(
                    active.flood * 100
                  )}
                  % flood probability.
                </p>

              </div>

            )}

            {/* Legend */}
            <div className="mt-6">

              <div className="mb-3 flex items-center justify-between">

                <h3 className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-text-muted
                ">
                  Legend
                </h3>

                <span className="text-[9px] text-text-muted">
                  Rainfall
                </span>

              </div>

              <div className="grid grid-cols-2 gap-2">

                {[
                  ['bg-red-500', 'Very Heavy'],
                  ['bg-orange-500', 'Heavy'],
                  ['bg-amber-400', 'Moderate'],
                  ['bg-yellow-300', 'Light'],
                  ['bg-indigo-500', 'Very Light'],
                ].map(([c, l]) => (

                  <div
                    key={l}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-white/5
                      bg-white/[0.02]
                      px-2.5
                      py-2
                    "
                  >

                    <i
                      className={`
                        h-2
                        w-2
                        rounded-sm
                        ${c}
                      `}
                    />

                    <span className="text-[10px] text-text-muted">
                      {l}
                    </span>

                  </div>

                ))}

              </div>

            </div>

            {/* Data note */}
            <div className="
              mt-6
              rounded-xl
              border
              border-white/10
              bg-white/[0.02]
              p-3
            ">

              <p className="
                text-[10px]
                leading-relaxed
                text-text-muted
              ">
                Prediction markers use the trained
                models with synthetic demo inputs.
                Satellite/street basemap is provided
                by public map tiles.
              </p>

            </div>

          </div>
        </aside>

      </div>
    </div>
  )
}