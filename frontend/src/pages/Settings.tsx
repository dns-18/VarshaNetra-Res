import { useState, useEffect } from 'react'
import { Settings, Bell, Shield, Palette, Save, Check } from 'lucide-react'
import { useTheme } from '@contexts/ThemeContext'
import AtmosphericBackground from '@components/graphics/AtmosphericBackground'
import SystemNetwork from '@components/graphics/SystemNetwork'
import GlassCard from '@components/ui/GlassCard'
import PageTransition from '@components/ui/PageTransition'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem('varshanetra-settings')
      if (stored) return JSON.parse(stored)
    } catch {
      /* ignore */
    }

    return {
      notifications: true,
      emailAlerts: true,
      smsAlerts: false,
      riskThreshold: 70,
      updateFrequency: 30,
    }
  })

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(
        'varshanetra-settings',
        JSON.stringify(settings)
      )
    } catch {
      /* ignore */
    }
  }, [settings])

  const handleSave = () => {
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2500)
  }

  return (
    <PageTransition className="min-h-full">
      <AtmosphericBackground variant="default">

        {/* PAGE GRAPHICS */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <SystemNetwork />
        </div>

        <div className="relative z-10 min-h-full px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">

            {/* HEADER */}
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex h-11 w-11 items-center justify-center
                    rounded-xl
                    border border-sky-400/20
                    bg-sky-400/10
                    shadow-[0_0_25px_rgba(56,189,248,0.08)]
                  "
                >
                  <Settings className="h-5 w-5 text-sky-400" />
                </div>

                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-text-primary">
                    Settings
                  </h1>

                  <p className="mt-1 text-sm text-text-secondary">
                    Manage preferences and system configuration
                  </p>
                </div>
              </div>
            </div>

            {/* THEME SETTINGS */}
            <GlassCard
              className="mb-6 p-6"
              hover={false}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400/10">
                  <Palette className="h-5 w-5 text-sky-400" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-text-primary">
                    Display Theme
                  </h2>

                  <p className="text-xs text-text-muted">
                    Customize the command center appearance
                  </p>
                </div>
              </div>

              <p className="mb-4 text-sm text-text-secondary">
                Choose how VarshaNetra appears. Theme persists across sessions.
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  {
                    value: 'dark' as const,
                    label: 'Dark Mode',
                    desc: 'Command center interface',
                  },
                  {
                    value: 'light' as const,
                    label: 'Light Mode',
                    desc: 'Clean daylight interface',
                  },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTheme(opt.value)}
                    className={`
                      group relative flex flex-col items-start gap-1
                      rounded-xl border p-4 text-left
                      transition-all duration-300
                      ${
                        theme === opt.value
                          ? `
                            border-sky-400/60
                            bg-sky-400/10
                            shadow-[0_0_25px_rgba(56,189,248,0.10)]
                          `
                          : `
                            border-surface-border
                            bg-surface-base/40
                            hover:border-sky-400/30
                            hover:bg-sky-400/5
                          `
                      }
                    `}
                    aria-pressed={theme === opt.value}
                  >
                    <span className="text-sm font-semibold text-text-primary">
                      {opt.label}
                    </span>

                    <span className="text-xs text-text-muted">
                      {opt.desc}
                    </span>

                    {theme === opt.value && (
                      <Check className="mt-2 h-4 w-4 text-sky-400" />
                    )}
                  </button>
                ))}
              </div>
            </GlassCard>

            {/* NOTIFICATIONS */}
            <GlassCard
              className="mb-6 p-6"
              hover={false}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400/10">
                  <Bell className="h-5 w-5 text-sky-400" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-text-primary">
                    Notifications
                  </h2>

                  <p className="text-xs text-text-muted">
                    Configure how warning signals are delivered
                  </p>
                </div>
              </div>

              <p className="mb-5 text-xs text-text-muted">
                Notification settings are stored locally. Backend integration
                is required for push, email and SMS delivery.
              </p>

              <div className="space-y-3">
                <ToggleRow
                  checked={settings.notifications}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      notifications: value,
                    })
                  }
                  title="Push Notifications"
                  description="Receive real-time alerts on your device"
                />

                <ToggleRow
                  checked={settings.emailAlerts}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      emailAlerts: value,
                    })
                  }
                  title="Email Alerts"
                  description="Get email notifications for critical incidents"
                />

                <ToggleRow
                  checked={settings.smsAlerts}
                  onChange={(value) =>
                    setSettings({
                      ...settings,
                      smsAlerts: value,
                    })
                  }
                  title="SMS Alerts"
                  description="Receive SMS for emergency alerts"
                />
              </div>
            </GlassCard>

            {/* ALERT THRESHOLDS */}
            <GlassCard
              className="mb-6 p-6"
              hover={false}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400/10">
                  <Shield className="h-5 w-5 text-sky-400" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-text-primary">
                    Alert Thresholds
                  </h2>

                  <p className="text-xs text-text-muted">
                    Configure risk detection sensitivity
                  </p>
                </div>
              </div>

              <div className="space-y-7">

                {/* RISK THRESHOLD */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-medium text-text-primary">
                      Risk Score Threshold
                    </label>

                    <span className="rounded-lg border border-sky-400/20 bg-sky-400/10 px-2.5 py-1 text-xs font-semibold text-sky-400">
                      {settings.riskThreshold}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="30"
                    max="90"
                    value={settings.riskThreshold}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        riskThreshold: parseInt(e.target.value),
                      })
                    }
                    className="w-full accent-sky-400"
                  />

                  <p className="mt-2 text-xs text-text-muted">
                    Alert when risk exceeds{' '}
                    <span className="font-semibold text-status-warning">
                      {settings.riskThreshold}%
                    </span>
                  </p>
                </div>

                {/* UPDATE FREQUENCY */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-text-primary">
                    Update Frequency
                  </label>

                  <select
                    value={settings.updateFrequency}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        updateFrequency: parseInt(e.target.value),
                      })
                    }
                    className="
                      w-full rounded-xl
                      border border-surface-border
                      bg-surface-base/70
                      px-4 py-3
                      text-sm text-text-primary
                      outline-none
                      backdrop-blur-xl
                      transition-all duration-300
                      focus:border-sky-400/50
                      focus:ring-2
                      focus:ring-sky-400/10
                    "
                  >
                    <option value="15">Every 15 seconds</option>
                    <option value="30">Every 30 seconds</option>
                    <option value="60">Every minute</option>
                    <option value="300">Every 5 minutes</option>
                  </select>
                </div>
              </div>
            </GlassCard>

            {/* SAVE */}
            <button
              onClick={handleSave}
              className="
                flex w-full items-center justify-center gap-2
                rounded-xl
                bg-sky-500
                px-6 py-3.5
                font-semibold text-white
                shadow-[0_0_25px_rgba(56,189,248,0.15)]
                transition-all duration-300
                hover:bg-sky-400
                hover:shadow-[0_0_35px_rgba(56,189,248,0.25)]
                active:scale-[0.99]
              "
            >
              {saved ? (
                <>
                  <Check className="h-5 w-5" />
                  Settings Saved
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Save Settings
                </>
              )}
            </button>

            {saved && (
              <p className="mt-3 text-center text-sm text-status-success">
                All settings have been saved locally.
              </p>
            )}

          </div>
        </div>

      </AtmosphericBackground>
    </PageTransition>
  )
}

function ToggleRow({
  checked,
  onChange,
  title,
  description,
}: {
  checked: boolean
  onChange: (value: boolean) => void
  title: string
  description: string
}) {
  return (
    <label
      className="
        flex cursor-pointer items-center justify-between
        gap-4 rounded-xl
        border border-surface-border
        bg-surface-base/30
        p-4
        transition-all duration-300
        hover:border-sky-400/25
        hover:bg-sky-400/5
      "
    >
      <div>
        <p className="text-sm font-medium text-text-primary">
          {title}
        </p>

        <p className="mt-1 text-xs text-text-muted">
          {description}
        </p>
      </div>

      <div className="relative shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />

        <div
          className="
            h-6 w-11 rounded-full
            border border-surface-border
            bg-surface-secondary
            transition-all duration-300
            peer-checked:border-sky-400/50
            peer-checked:bg-sky-400
          "
        />

        <div
          className="
            absolute left-1 top-1
            h-4 w-4 rounded-full
            bg-white
            shadow-sm
            transition-transform duration-300
            peer-checked:translate-x-5
          "
        />
      </div>
    </label>
  )
}