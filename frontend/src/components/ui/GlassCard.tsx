import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  glow = false,
}: GlassCardProps) {
  return (
    <div
      className={[
        "vn-glass",
        hover ? "vn-glass-hover" : "",
        glow ? "vn-glass-glow" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}