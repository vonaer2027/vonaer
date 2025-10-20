'use client'

import { useState } from 'react'
import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerFooter } from '@/components/vonaer-footer'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { DesignProvider } from '@/contexts/design-context'
import { DesignRouter } from '@/components/design-router'

export default function VonaerLanding() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <DesignProvider>
      <div className="bg-primary text-primary-foreground relative min-h-screen">
        {/* Sticky Header */}
        <VonaerHeader
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen(!menuOpen)}
        />

        {/* Full Screen Menu Overlay */}
        <VonaerMenuOverlay
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
        />

        {/* Main Content - Minimal-2 Design */}
        <main className="relative">
          <DesignRouter />
          <VonaerFooter />
        </main>
      </div>
    </DesignProvider>
  )
}