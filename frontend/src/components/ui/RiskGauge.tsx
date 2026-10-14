import React from "react";

interface RiskGaugeProps {
  value: number;
  label?: string;
}

export default function RiskGauge({
  value,
  label = "RISK",
}: RiskGaugeProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const progress =
    circumference - (safeValue / 100) * circumference;

  let riskLabel = "LOW";

  if (safeValue >= 75) {
    riskLabel = "CRITICAL";
  } else if (safeValue >= 55) {
    riskLabel = "HIGH";
  } else if (safeValue >= 30) {
    riskLabel = "MODERATE";
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-36 w-36">
        <svg
          className="-rotate-90"
          viewBox="0 0 128 128"
          width="100%"
          height="100%"
        >
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-white/10"
          />

          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            className="text-status-warning transition-all duration-1000"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-text-primary">
            {safeValue}%
          </span>

          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-text-muted">
            {label}
          </span>
        </div>
      </div>

      <span className="mt-2 text-xs font-semibold uppercase tracking-widest text-status-warning">
        {riskLabel}
      </span>
    </div>
  );
}