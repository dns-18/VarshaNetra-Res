import React, { FormEvent, useMemo, useState } from 'react'
import {
  Activity,
  AlertTriangle,
  Ambulance,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  CloudRain,
  Flame,
  Headphones,
  LifeBuoy,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Radio,
  ShieldAlert,
  Siren,
  Users,
  Waves,
} from 'lucide-react'

import AtmosphericBackground from '@components/graphics/AtmosphericBackground'
import CommunicationSignal from '@components/graphics/CommunicationSignal'
import GlassCard from '@components/ui/GlassCard'
import PageTransition from '@components/ui/PageTransition'

type Category =
  | 'emergency'
  | 'disaster'
  | 'medical'
  | 'fire'
  | 'police'
  | 'support'

type StateName =
  | 'ALL'
  | 'ASSAM'
  | 'MEGHALAYA'
  | 'MANIPUR'
  | 'MIZORAM'

interface Helpline {
  name: string
  number: string
  description: string
  category: Category
  states: StateName[]
  featured?: boolean
}

/* =========================================================
   VERIFIED HELPLINE DIRECTORY
========================================================= */

const helplines: Helpline[] = [
  {
    name: 'Integrated Emergency',
    number: '112',
    description:
      'Police, fire, health and emergency response support.',
    category: 'emergency',
    states: [
      'ALL',
      'ASSAM',
      'MEGHALAYA',
      'MANIPUR',
      'MIZORAM',
    ],
    featured: true,
  },

  {
    name: 'National Ambulance Service',
    number: '102',
    description:
      'Emergency ambulance and medical assistance.',
    category: 'medical',
    states: ['ALL'],
    featured: true,
  },

  {
    name: 'Police Helpline',
    number: '100',
    description:
      'Police assistance and immediate safety response.',
    category: 'police',
    states: ['ALL'],
    featured: true,
  },

  {
    name: 'Fire Helpline',
    number: '101',
    description:
      'Fire and rescue emergency assistance.',
    category: 'fire',
    states: ['ALL'],
    featured: true,
  },

  {
    name: 'Natural Calamity Relief',
    number: '1070',
    description:
      'Relief assistance for natural calamities.',
    category: 'disaster',
    states: ['ALL', 'ASSAM', 'MIZORAM'],
  },

  {
    name: 'District Emergency Operation Centre',
    number: '1077',
    description:
      'District-level disaster and emergency coordination.',
    category: 'disaster',
    states: ['ASSAM', 'MIZORAM'],
  },

  {
    name: 'Child Helpline',
    number: '1098',
    description:
      'Emergency support and assistance for children.',
    category: 'support',
    states: ['ALL'],
  },

  {
    name: 'Cyber Crime Helpline',
    number: '1930',
    description:
      'Report cybercrime and financial cyber fraud.',
    category: 'support',
    states: ['ALL'],
  },

  {
    name: 'Mizoram State Emergency Operation Centre',
    number: '0389-2342520',
    description:
      'State emergency coordination in Mizoram.',
    category: 'disaster',
    states: ['MIZORAM'],
  },
]

/* =========================================================
   CATEGORY FILTERS
========================================================= */

const categories = [
  {
    id: 'all',
    label: 'All services',
    icon: LifeBuoy,
  },
  {
    id: 'emergency',
    label: 'Emergency',
    icon: Siren,
  },
  {
    id: 'disaster',
    label: 'Disaster',
    icon: AlertTriangle,
  },
  {
    id: 'medical',
    label: 'Medical',
    icon: Ambulance,
  },
  {
    id: 'fire',
    label: 'Fire',
    icon: Flame,
  },
  {
    id: 'police',
    label: 'Police',
    icon: ShieldAlert,
  },
  {
    id: 'support',
    label: 'Support',
    icon: Users,
  },
]

const states: StateName[] = [
  'ALL',
  'ASSAM',
  'MEGHALAYA',
  'MANIPUR',
  'MIZORAM',
]

/* =========================================================
   ICON / LABEL HELPERS
========================================================= */

const categoryIcons: Record<Category, React.ElementType> = {
  emergency: Siren,
  disaster: AlertTriangle,
  medical: Ambulance,
  fire: Flame,
  police: ShieldAlert,
  support: Users,
}

const categoryLabels: Record<Category, string> = {
  emergency: 'Emergency',
  disaster: 'Disaster',
  medical: 'Medical',
  fire: 'Fire & Rescue',
  police: 'Police',
  support: 'Support',
}

/* =========================================================
   CONTACT PAGE
========================================================= */

export default function ContactPage() {
  const [category, setCategory] = useState('all')

  const [selectedState, setSelectedState] =
    useState<StateName>('ALL')

  const [selectedHelpline, setSelectedHelpline] =
    useState<Helpline>(helplines[0])

  const [sent, setSent] = useState(false)

  /* =========================================================
     FORM SUBMISSION
  ========================================================= */

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  /* =========================================================
     FILTER HELPLINES
  ========================================================= */

  const filteredHelplines = useMemo(() => {
    return helplines.filter((item) => {
      const categoryMatch =
        category === 'all' ||
        item.category === category

      const stateMatch =
        selectedState === 'ALL' ||
        item.states.includes('ALL') ||
        item.states.includes(selectedState)

      return categoryMatch && stateMatch
    })
  }, [category, selectedState])

  /* =========================================================
     CATEGORY SELECTOR
  ========================================================= */

  const handleCategory = (id: string) => {
    setCategory(id)

    const firstMatching = helplines.find((item) => {
      const categoryMatch =
        id === 'all' ||
        item.category === id

      const stateMatch =
        selectedState === 'ALL' ||
        item.states.includes('ALL') ||
        item.states.includes(selectedState)

      return categoryMatch && stateMatch
    })

    if (firstMatching) {
      setSelectedHelpline(firstMatching)
    }
  }

  /* =========================================================
     STATE SELECTOR
  ========================================================= */

  const handleState = (state: StateName) => {
    setSelectedState(state)

    const firstMatching = helplines.find((item) => {
      const categoryMatch =
        category === 'all' ||
        item.category === category

      const stateMatch =
        state === 'ALL' ||
        item.states.includes('ALL') ||
        item.states.includes(state)

      return categoryMatch && stateMatch
    })

    if (firstMatching) {
      setSelectedHelpline(firstMatching)
    }
  }

  const SelectedIcon =
    categoryIcons[selectedHelpline.category]

  return (
    <PageTransition className="min-h-full">
      <AtmosphericBackground variant="alert">

        <div className="relative min-h-full overflow-auto px-4 py-6 md:px-6 lg:px-10">

          {/* =====================================================
              CONTACT PAGE GRAPHICS
          ====================================================== */}

          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <CommunicationSignal />
          </div>

          {/* =====================================================
              MAIN CONTENT
          ====================================================== */}

          <div className="relative z-10 mx-auto max-w-[1500px]">

            {/* =====================================================
                HERO
            ====================================================== */}

            <section className="relative mb-8 overflow-hidden rounded-[2rem] border border-sky-400/10 bg-slate-950/40 p-6 backdrop-blur-xl md:p-8">

              {/* Background glow */}

              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-cyan-400/5 blur-3xl" />

              <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_420px]">

                {/* Hero text */}

                <div>

                  <div className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-sky-400">

                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                    RESILIENCE NETWORK / ONLINE

                  </div>

                  <h1 className="max-w-3xl text-4xl font-black tracking-tight text-text-primary md:text-6xl">

                    RESILIENCE

                    <span className="block text-sky-400">
                      HELP HUB.
                    </span>

                  </h1>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-text-secondary md:text-base">

                    One place for critical emergency connections,
                    disaster-response numbers and regional assistance
                    across the North-East.

                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">

                    <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs text-emerald-300">

                      <Activity size={14} />

                      Response network active

                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs text-sky-300">

                      <Radio size={14} />

                      Government helplines

                    </div>

                  </div>

                </div>

                {/* =================================================
                    EMERGENCY CORE
                ================================================== */}

                <div className="relative flex min-h-[290px] items-center justify-center">

                  {/* Radar rings */}

                  <div className="absolute h-64 w-64 animate-pulse rounded-full border border-sky-400/10" />

                  <div className="absolute h-48 w-48 rounded-full border border-sky-400/10" />

                  <div className="absolute h-32 w-32 rounded-full border border-sky-400/20" />

                  <div className="absolute h-72 w-72 rounded-full border border-sky-400/5" />

                  {/* Center */}

                  <div className="relative flex h-40 w-40 flex-col items-center justify-center rounded-full border border-sky-300/30 bg-sky-400/10 shadow-[0_0_70px_rgba(56,189,248,0.16)] backdrop-blur-xl">

                    <Siren className="mb-2 h-7 w-7 text-sky-300" />

                    <span className="font-mono text-5xl font-black text-white">
                      112
                    </span>

                    <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-sky-300">
                      Emergency
                    </span>

                  </div>

                </div>

              </div>

            </section>

            {/* =====================================================
                QUICK RESPONSE
            ====================================================== */}

            <section className="mb-10">

              <div className="mb-5 flex items-end justify-between gap-4">

                <div>

                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-sky-400">
                    01 / QUICK RESPONSE
                  </div>

                  <h2 className="mt-2 text-2xl font-bold text-text-primary">
                    Critical connections
                  </h2>

                </div>

                <span className="hidden font-mono text-[10px] text-text-muted sm:block">
                  TAP TO CONNECT
                </span>

              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {helplines
                  .filter(
                    (item) =>
                      item.featured ||
                      ['medical', 'fire', 'police'].includes(
                        item.category
                      )
                  )
                  .slice(0, 4)
                  .map((item) => {

                    const Icon =
                      categoryIcons[item.category]

                    const active =
                      selectedHelpline.number ===
                      item.number

                    return (

                      <GlassCard
                        key={item.number}
                        className={`group p-5 transition-all duration-300 ${
                          active
                            ? 'border-sky-400/30 bg-sky-400/[0.08]'
                            : ''
                        }`}
                      >

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedHelpline(item)
                          }
                          className="w-full text-left"
                        >

                          <div className="flex items-start justify-between">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10">

                              <Icon className="h-5 w-5 text-sky-300" />

                            </div>

                            <ArrowRight
                              className="h-4 w-4 text-text-muted transition-transform duration-300 group-hover:translate-x-1"
                            />

                          </div>

                          <p className="mt-5 text-xs uppercase tracking-wider text-text-muted">
                            {categoryLabels[item.category]}
                          </p>

                          <div className="mt-1 font-mono text-3xl font-black text-text-primary">
                            {item.number}
                          </div>

                          <p className="mt-2 text-xs leading-5 text-text-secondary">
                            {item.name}
                          </p>

                        </button>

                        <a
                          href={`tel:${item.number.replace(
                            /[^0-9+]/g,
                            ''
                          )}`}
                          className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-sky-400/20 bg-sky-400/10 px-3 py-2 text-xs font-semibold text-sky-300 transition hover:bg-sky-400/20"
                        >

                          <Phone size={14} />

                          Call now

                        </a>

                      </GlassCard>

                    )
                  })}

              </div>

            </section>

            {/* =====================================================
                INTELLIGENT FINDER
            ====================================================== */}

            <section className="mb-10">

              <div className="mb-5">

                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-sky-400">
                  02 / INTELLIGENT FINDER
                </div>

                <h2 className="mt-2 text-2xl font-bold text-text-primary">
                  Find the right connection
                </h2>

                <p className="mt-2 max-w-2xl text-sm text-text-secondary">
                  Select a service and region. VarshaNetra filters
                  the response network to surface the most relevant
                  assistance.
                </p>

              </div>

              <div className="grid gap-5 lg:grid-cols-[1fr_360px]">

                {/* =================================================
                    DIRECTORY
                ================================================== */}

                <GlassCard className="p-5">

                  {/* Categories */}

                  <div className="mb-5 flex flex-wrap gap-2">

                    {categories.map((item) => {

                      const Icon = item.icon

                      const active =
                        category === item.id

                      return (

                        <button
                          key={item.id}
                          type="button"
                          onClick={() =>
                            handleCategory(item.id)
                          }
                          className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs transition ${
                            active
                              ? 'border-sky-400/30 bg-sky-400/15 text-sky-300'
                              : 'border-surface-border bg-surface-secondary text-text-muted hover:text-text-primary'
                          }`}
                        >

                          <Icon size={14} />

                          {item.label}

                        </button>

                      )
                    })}

                  </div>

                  {/* State selector */}

                  <div className="mb-5 flex gap-2 overflow-x-auto pb-1">

                    {states.map((state) => {

                      const active =
                        selectedState === state

                      return (

                        <button
                          key={state}
                          type="button"
                          onClick={() =>
                            handleState(state)
                          }
                          className={`whitespace-nowrap rounded-lg px-3 py-2 font-mono text-[10px] font-bold tracking-wider transition ${
                            active
                              ? 'bg-sky-400 text-slate-950'
                              : 'border border-surface-border bg-surface-secondary text-text-muted hover:text-text-primary'
                          }`}
                        >

                          {state}

                        </button>

                      )
                    })}

                  </div>

                  {/* Results */}

                  <div className="space-y-3">

                    {filteredHelplines.length > 0 ? (

                      filteredHelplines.map((item) => {

                        const Icon =
                          categoryIcons[item.category]

                        const active =
                          selectedHelpline.number ===
                          item.number

                        return (

                          <button
                            key={`${item.name}-${item.number}`}
                            type="button"
                            onClick={() =>
                              setSelectedHelpline(item)
                            }
                            className={`w-full rounded-xl border p-4 text-left transition ${
                              active
                                ? 'border-sky-400/30 bg-sky-400/[0.08]'
                                : 'border-surface-border bg-surface-secondary/50 hover:border-sky-400/20'
                            }`}
                          >

                            <div className="flex items-center gap-4">

                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-400/10">

                                <Icon className="h-5 w-5 text-sky-300" />

                              </div>

                              <div className="min-w-0 flex-1">

                                <div className="flex flex-wrap items-center gap-2">

                                  <h3 className="font-semibold text-text-primary">
                                    {item.name}
                                  </h3>

                                  <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-emerald-300">
                                    Verified
                                  </span>

                                </div>

                                <p className="mt-1 text-xs text-text-muted">
                                  {item.description}
                                </p>

                              </div>

                              <div className="hidden items-center gap-3 sm:flex">

                                <span className="font-mono text-xl font-bold text-sky-300">
                                  {item.number}
                                </span>

                                <ChevronRight
                                  size={17}
                                  className="text-text-muted"
                                />

                              </div>

                            </div>

                          </button>

                        )
                      })

                    ) : (

                      <div className="rounded-xl border border-dashed border-surface-border p-8 text-center">

                        <MapPin className="mx-auto text-text-muted" />

                        <p className="mt-3 text-sm text-text-secondary">
                          No regional service found for this combination.
                        </p>

                      </div>

                    )}

                  </div>

                </GlassCard>

                {/* =================================================
                    SELECTED SERVICE
                ================================================== */}

                <GlassCard
                  glow
                  className="relative overflow-hidden p-6"
                >

                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />

                  <div className="relative z-10">

                    <div className="flex items-center justify-between">

                      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-sky-400">
                        SELECTED SERVICE
                      </span>

                      <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-emerald-400">

                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

                        Available

                      </span>

                    </div>

                    <div className="mt-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10">

                      <SelectedIcon className="h-7 w-7 text-sky-300" />

                    </div>

                    <h3 className="mt-6 text-xl font-bold text-text-primary">
                      {selectedHelpline.name}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-text-secondary">
                      {selectedHelpline.description}
                    </p>

                    <div className="mt-7 rounded-xl border border-sky-400/10 bg-black/10 p-5">

                      <div className="text-[9px] uppercase tracking-[0.2em] text-text-muted">
                        CONTACT
                      </div>

                      <div className="mt-1 break-all font-mono text-3xl font-black text-sky-300">
                        {selectedHelpline.number}
                      </div>

                    </div>

                    <a
                      href={`tel:${selectedHelpline.number.replace(
                        /[^0-9+]/g,
                        ''
                      )}`}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-300"
                    >

                      <Phone size={17} />

                      Call this service

                    </a>

                    <div className="mt-4 flex items-start gap-2 text-[10px] leading-5 text-text-muted">

                      <CheckCircle2
                        size={14}
                        className="mt-0.5 shrink-0 text-emerald-400"
                      />

                      Number sourced from official government
                      helpline information.

                    </div>

                  </div>

                </GlassCard>

              </div>

            </section>

            {/* =====================================================
                NORTHEAST NETWORK
            ====================================================== */}

            <section className="mb-10">

              <div className="mb-5">

                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-sky-400">
                  03 / NORTHEAST NETWORK
                </div>

                <h2 className="mt-2 text-2xl font-bold text-text-primary">
                  Regional response network
                </h2>

              </div>

              <GlassCard className="relative overflow-hidden p-6 md:p-8">

                <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

                  {/* Network visualization */}

                  <div className="relative min-h-[350px] overflow-hidden rounded-2xl border border-sky-400/10 bg-slate-950/30">

                    {/* Grid */}

                    <div className="absolute inset-0 opacity-30">

                      <div className="absolute left-1/2 top-0 h-full w-px bg-sky-400/10" />

                      <div className="absolute left-0 top-1/2 h-px w-full bg-sky-400/10" />

                    </div>

                    {/* Connection lines */}

                    <div className="absolute left-[28%] top-[49%] h-px w-[44%] rotate-[12deg] bg-sky-400/20" />

                    <div className="absolute left-[48%] top-[55%] h-px w-[30%] rotate-[-12deg] bg-sky-400/20" />

                    <div className="absolute left-[55%] top-[61%] h-px w-[24%] rotate-[30deg] bg-sky-400/20" />

                    {/* Central node */}

                    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">

                      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-sky-300/30 bg-sky-400/10 shadow-[0_0_50px_rgba(56,189,248,0.15)]">

                        <Waves className="h-8 w-8 text-sky-300" />

                        <span className="absolute -bottom-7 whitespace-nowrap font-mono text-[8px] tracking-[0.2em] text-sky-300">
                          VARSHANETRA
                        </span>

                      </div>

                    </div>

                    {/* State nodes */}

                    {[
                      {
                        name: 'ASSAM',
                        x: '18%',
                        y: '28%',
                      },
                      {
                        name: 'MEGHALAYA',
                        x: '72%',
                        y: '26%',
                      },
                      {
                        name: 'MANIPUR',
                        x: '76%',
                        y: '70%',
                      },
                      {
                        name: 'MIZORAM',
                        x: '27%',
                        y: '76%',
                      },
                    ].map((node) => (

                      <div
                        key={node.name}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: node.x,
                          top: node.y,
                        }}
                      >

                        <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-sky-400/20 bg-sky-400/10">

                          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />

                        </div>

                        <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] font-bold tracking-wider text-text-muted">

                          {node.name}

                        </span>

                      </div>

                    ))}

                    {/* Status */}

                    <div className="absolute bottom-4 left-4 flex items-center gap-2 font-mono text-[8px] uppercase tracking-wider text-text-muted">

                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                      Regional node online

                    </div>

                  </div>

                  {/* Network information */}

                  <div className="flex flex-col justify-center">

                    <div className="flex items-center gap-2 text-sky-300">

                      <MapPin size={17} />

                      <span className="text-xs font-semibold uppercase tracking-wider">
                        North-East India
                      </span>

                    </div>

                    <h3 className="mt-4 text-2xl font-bold text-text-primary">

                      One network.

                      <br />

                      Multiple response points.

                    </h3>

                    <p className="mt-4 text-sm leading-6 text-text-secondary">

                      VarshaNetra focuses on making environmental
                      intelligence useful at the regional level,
                      where warnings need to connect with real
                      response systems.

                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">

                      {[
                        'Assam',
                        'Meghalaya',
                        'Manipur',
                        'Mizoram',
                      ].map((state) => (

                        <div
                          key={state}
                          className="rounded-xl border border-surface-border bg-surface-secondary/50 p-3"
                        >

                          <div className="flex items-center gap-2">

                            <span className="h-2 w-2 rounded-full bg-emerald-400" />

                            <span className="text-xs font-semibold text-text-primary">
                              {state}
                            </span>

                          </div>

                          <p className="mt-1 text-[9px] uppercase tracking-wider text-text-muted">
                            Monitoring node
                          </p>

                        </div>

                      ))}

                    </div>

                  </div>

                </div>

              </GlassCard>

            </section>

            {/* =====================================================
                CONTACT FORM
            ====================================================== */}

            <section className="mb-10">

              <div className="mb-5">

                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-sky-400">
                  04 / CONNECT WITH VARSHANETRA
                </div>

                <h2 className="mt-2 text-2xl font-bold text-text-primary">
                  Send us a message
                </h2>

              </div>

              <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">

                {/* Information */}

                <GlassCard className="p-6">

                  <Mail
                    className="text-sky-300"
                    size={28}
                  />

                  <h3 className="mt-5 text-2xl font-bold text-text-primary">
                    Help improve the network.
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-text-secondary">

                    Send feedback, report a data issue,
                    suggest a feature, or ask about the
                    VarshaNetra system.

                  </p>

                  <div className="mt-8 space-y-4">

                    <div className="flex items-center gap-3 text-sm text-text-secondary">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-400/10">

                        <Mail
                          size={16}
                          className="text-sky-300"
                        />

                      </div>

                      support@varshanetra.local

                    </div>

                    <div className="flex items-center gap-3 text-sm text-text-secondary">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-400/10">

                        <MessageSquare
                          size={16}
                          className="text-sky-300"
                        />

                      </div>

                      Monitoring team feedback channel

                    </div>

                    <div className="flex items-center gap-3 text-sm text-text-secondary">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-400/10">

                        <Headphones
                          size={16}
                          className="text-sky-300"
                        />

                      </div>

                      System support & feedback

                    </div>

                  </div>

                </GlassCard>

                {/* Form */}

                <GlassCard className="p-6">

                  <form onSubmit={submit}>

                    <div className="grid gap-4 md:grid-cols-2">

                      <input
                        required
                        className="w-full rounded-xl border border-surface-border bg-surface-base/70 px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-sky-400/50"
                        placeholder="Your name"
                      />

                      <input
                        required
                        type="email"
                        className="w-full rounded-xl border border-surface-border bg-surface-base/70 px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-sky-400/50"
                        placeholder="Email address"
                      />

                    </div>

                    <textarea
                      required
                      rows={6}
                      className="mt-4 w-full resize-none rounded-xl border border-surface-border bg-surface-base/70 px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-sky-400/50"
                      placeholder="How can we help?"
                    />

                    {sent && (

                      <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-300">

                        <CheckCircle2 size={17} />

                        Message received successfully.

                      </div>

                    )}

                    <button
                      type="submit"
                      className="mt-5 flex items-center gap-2 rounded-xl bg-sky-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-sky-300"
                    >

                      Send message

                      <ArrowRight size={16} />

                    </button>

                  </form>

                </GlassCard>

              </div>

            </section>

            {/* =====================================================
                FOOTER
            ====================================================== */}

            <footer className="border-t border-surface-border py-6">

              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-400/10">

                    <CloudRain
                      size={17}
                      className="text-sky-300"
                    />

                  </div>

                  <div>

                    <p className="text-xs font-bold tracking-wider text-text-primary">
                      VARSHANETRA
                    </p>

                    <p className="text-[9px] uppercase tracking-wider text-text-muted">
                      Observe · Predict · Warn · Protect
                    </p>

                  </div>

                </div>

                <p className="max-w-xl text-[10px] leading-5 text-text-muted md:text-right">

                  Emergency numbers shown here are intended
                  as a quick information directory. In an
                  immediate emergency, use the appropriate
                  official emergency service.

                </p>

              </div>

            </footer>

          </div>

        </div>

      </AtmosphericBackground>
    </PageTransition>
  )
}