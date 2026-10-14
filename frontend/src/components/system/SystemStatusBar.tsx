import React, { useEffect, useState } from 'react'
import {
  Activity,
  Bell,
  BrainCircuit,
  CloudRain,
  Radio,
  Wifi,
} from 'lucide-react'

interface SystemStatusBarProps {
  alertCount?: number
}

function StatusItem({
  icon: Icon,
  label,
  value,
  active = true,
}: {
  icon: React.ElementType
  label: string
  value: string
  active?: boolean
}) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <Icon
        className={`h-3.5 w-3.5 ${
          active ? 'text-emerald-400' : 'text-slate-500'
        }`}
      />

      <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-text-muted">
        {label}
      </span>

      <span
        className={`flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide ${
          active ? 'text-emerald-400' : 'text-slate-500'
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            active
              ? 'animate-pulse bg-emerald-400'
              : 'bg-slate-500'
          }`}
        />

        {value}
      </span>
    </div>
  )
}

export default function SystemStatusBar({
  alertCount = 3,
}: SystemStatusBarProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative z-30 border-b border-white/[0.06] bg-slate-950/60 backdrop-blur-xl">
      <div className="flex min-h-9 items-center justify-between gap-4 px-4 lg:px-6">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          {/* System identity */}
          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-cyan-400/10">
              <Activity className="h-3 w-3 text-cyan-400" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
              Terrain Intelligence
            </span>
          </div>

          <div className="hidden h-4 w-px bg-white/10 sm:block" />

          <StatusItem
            icon={BrainCircuit}
            label="AI"
            value="Active"
          />

          <StatusItem
            icon={Radio}
            label="Network"
            value="Online"
          />

          <StatusItem
            icon={CloudRain}
            label="Data"
            value="Live"
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* Alert count */}
          <div className="flex items-center gap-2">
            <Bell className="h-3.5 w-3.5 text-amber-400" />

            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Alerts
            </span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400/10 px-1.5 text-[10px] font-bold text-amber-300">
              {alertCount}
            </span>
          </div>

          <div className="hidden h-4 w-px bg-white/10 md:block" />

          {/* Connection */}
          <div className="hidden items-center gap-1.5 md:flex">
            <Wifi className="h-3.5 w-3.5 text-emerald-400" />

            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
              System Online
            </span>
          </div>

          {/* Clock */}
          <div className="hidden font-mono text-[10px] tracking-wider text-text-muted lg:block">
            {currentTime.toLocaleTimeString('en-IN', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            })}
          </div>
        </div>
      </div>
    </div>
  )
}