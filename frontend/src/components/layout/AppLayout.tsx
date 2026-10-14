import React, { useState } from 'react'
import { Menu } from 'lucide-react'
import { Outlet, useLocation } from 'react-router-dom'

import TopBar from './TopBar'
import Sidebar from './Sidebar'

/**
 * Main Application Layout
 *
 * Structure:
 *
 * ┌──────────────┬──────────────────────────────────────────────┐
 * │              │                    TopBar                    │
 * │   Sidebar    ├──────────────────────────────────────────────┤
 * │              │                                              │
 * │              │              Scrollable Page                 │
 * │              │                 Content                      │
 * │              │                    ↕                         │
 * │              │                  SCROLL                      │
 * │              │                                              │
 * └──────────────┴──────────────────────────────────────────────┘
 *
 * The right-side Layers / RightPanel has been removed.
 */
export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="flex h-screen min-h-0 flex-col overflow-hidden bg-surface-base">

      {/* ========================================================
          TOP BAR
          ======================================================== */}

      {!isHome && (
        <>
          <div className="relative flex shrink-0 items-center">

            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="
                absolute
                left-4
                z-50
                rounded-md
                p-2
                transition-colors
                hover:bg-surface-secondary
                md:hidden
              "
              aria-label="Toggle navigation"
              aria-expanded={sidebarOpen}
            >
              <Menu className="h-5 w-5 text-text-primary" />
            </button>

            {/* Top navigation */}
            <div className="min-w-0 flex-1">
              <TopBar />
            </div>
          </div>

          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="
                fixed
                inset-0
                top-16
                z-30
                bg-black/50
                backdrop-blur-sm
                md:hidden
              "
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
          )}
        </>
      )}

      {/* ========================================================
          MAIN APPLICATION AREA
          ======================================================== */}

      <div className="flex min-h-0 flex-1 overflow-hidden">

        {/* ======================================================
            LEFT SIDEBAR
            ====================================================== */}

        {!isHome && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        {/* ======================================================
            CENTER CONTENT
            ====================================================== */}

        <main
          className="
            min-h-0
            min-w-0
            flex-1
            overflow-y-auto
            overflow-x-hidden
            bg-surface-base
          "
        >
          <Outlet />
        </main>

      </div>
    </div>
  )
}