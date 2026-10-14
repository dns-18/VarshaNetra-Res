import React from 'react'

export default function ForecastTimeline() {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-52 overflow-hidden">
      
      {/* Central forecast line */}
      <div className="absolute bottom-10 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      {/* Forecast nodes */}
      <div className="absolute bottom-[37px] left-[10%] h-3 w-3 rounded-full border border-cyan-400/60 bg-cyan-400/20 shadow-[0_0_12px_rgba(34,211,238,0.4)]" />

      <div className="absolute bottom-[37px] left-[25%] h-3 w-3 rounded-full border border-cyan-400/60 bg-cyan-400/20 shadow-[0_0_12px_rgba(34,211,238,0.4)]" />

      <div className="absolute bottom-[37px] left-[40%] h-3 w-3 rounded-full border border-cyan-400/70 bg-cyan-400/30 shadow-[0_0_16px_rgba(34,211,238,0.5)]" />

      <div className="absolute bottom-[37px] left-[55%] h-3 w-3 rounded-full border border-sky-400/60 bg-sky-400/20 shadow-[0_0_12px_rgba(56,189,248,0.4)]" />

      <div className="absolute bottom-[37px] left-[70%] h-3 w-3 rounded-full border border-sky-400/60 bg-sky-400/20 shadow-[0_0_12px_rgba(56,189,248,0.4)]" />

      <div className="absolute bottom-[37px] left-[85%] h-3 w-3 rounded-full border border-sky-400/60 bg-sky-400/20 shadow-[0_0_12px_rgba(56,189,248,0.4)]" />

      {/* Connecting signal */}
      <svg
        className="absolute bottom-10 left-[5%] h-32 w-[90%]"
        viewBox="0 0 900 130"
        preserveAspectRatio="none"
      >
        <path
          d="M0 100 C80 95 110 55 170 70 S260 115 330 65 S430 25 500 60 S600 90 670 48 S780 35 900 20"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2"
          strokeOpacity="0.18"
        />

        <path
          d="M0 108 C100 105 130 75 190 82 S280 120 350 78 S450 48 520 70 S620 100 700 62 S810 52 900 35"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1"
          strokeOpacity="0.10"
        />
      </svg>

      {/* Atmospheric glows */}
      <div className="absolute bottom-0 left-[15%] h-32 w-32 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="absolute bottom-0 left-[45%] h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="absolute bottom-0 right-[15%] h-36 w-36 rounded-full bg-sky-400/10 blur-3xl" />
    </div>
  )
}