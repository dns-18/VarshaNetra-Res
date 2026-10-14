import React from "react";

interface GridOverlayProps {
  opacity?: number;
}

export default function GridOverlay({
  opacity = 0.35,
}: GridOverlayProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{ opacity }}
    >
      <div className="vn-grid-overlay" />
    </div>
  );
}