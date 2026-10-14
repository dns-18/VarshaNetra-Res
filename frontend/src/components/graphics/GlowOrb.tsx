import React from "react";

interface GlowOrbProps {
  size?: number;
  className?: string;
}

export default function GlowOrb({
  size = 320,
  className = "",
}: GlowOrbProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-20 ${className}`}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}