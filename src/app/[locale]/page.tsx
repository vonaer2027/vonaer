'use client'

import { useState } from 'react'
import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerHeroNew } from '@/components/vonaer-hero-new'
import { FlightBookingForm } from '@/components/flight-booking-form'
import { VonaerServicesSection } from '@/components/vonaer-services-section'
import { VonaerAboutSection } from '@/components/vonaer-about-section'
import { VonaerAncillarySection } from '@/components/vonaer-ancillary-section'
import { VonaerFooter } from '@/components/vonaer-footer'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'

export default function VonaerLanding() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
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

      {/* Main Content */}
      <main className="relative">
        <VonaerHeroNew />
        <FlightBookingForm />
        <VonaerServicesSection />
        <VonaerAboutSection />
        <VonaerAncillarySection />
        <VonaerFooter />
      </main>
    </div>
  )
}