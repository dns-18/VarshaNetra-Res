import React from 'react'

/**
 * Main Viewport
 *
 * Central content viewport.
 * Allows pages with long content to scroll vertically.
 */
export default function MainViewport() {
  return (
    <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-surface-base">
      <div className="min-h-full">
        <div className="flex min-h-full items-center justify-center p-6">
          <div className="text-center">
            <div className="mb-4 text-6xl">🗺️</div>

            <h2 className="mb-2 text-2xl font-semibold text-text-primary">
              GIS Map Viewport
            </h2>

            <p className="text-text-muted">
              Phase 6: Real-time satellite imagery and risk layers will be
              displayed here
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}