'use client'

import { useState, useEffect, useRef } from 'react'
import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { VonaerFooter } from '@/components/vonaer-footer'
import { InquiryDialog } from '@/components/inquiry-dialog'
import { CharterHero } from '@/components/charter/charter-hero'
import { CharterSectionNav } from '@/components/charter/charter-section-nav'
import { AircraftSection } from '@/components/charter/sections/aircraft-section'
import { SupercarSection } from '@/components/charter/sections/supercar-section'
import { YachtSection } from '@/components/charter/sections/yacht-section'
import { EvtolSection } from '@/components/charter/sections/evtol-section'
import { Toaster } from 'sonner'

type InquiryType = 'aircraft' | 'yacht' | 'car'

export default function CharterPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false)
  const [inquiryType, setInquiryType] = useState<InquiryType>('aircraft')
  const [selectedItem, setSelectedItem] = useState<string>('')
  const [activeSection, setActiveSection] = useState('aircraft')

  // Section refs for scroll spy
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  // Valid section IDs
  const sectionIds = ['aircraft', 'supercar', 'yacht', 'evtol']

  // Scroll spy using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
        sectionRefs.current[id] = element
      }
    })

    return () => observer.disconnect()
  }, [])

  // Handle initial hash navigation (e.g., /charter#aircraft)
  useEffect(() => {
    const hash = window.location.hash.slice(1) // Remove '#'
    if (hash && sectionIds.includes(hash)) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [])

  // Handle hash changes while on page
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash && sectionIds.includes(hash)) {
        scrollToSection(hash)
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Handle inquiry requests from different sections
  const handleAircraftQuote = (aircraftName: string) => {
    setInquiryType('aircraft')
    setSelectedItem(aircraftName)
    setInquiryDialogOpen(true)
  }

  const handleSupercarQuote = (carName: string) => {
    setInquiryType('car')
    setSelectedItem(carName)
    setInquiryDialogOpen(true)
  }

  const handleYachtQuote = (yachtName: string) => {
    setInquiryType('yacht')
    setSelectedItem(yachtName)
    setInquiryDialogOpen(true)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <VonaerHeader menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(true)} />

      {/* Menu Overlay */}
      <VonaerMenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Hero Section */}
      <CharterHero />

      {/* Sticky Section Navigation */}
      <CharterSectionNav
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />

      {/* Aircraft Section */}
      <section
        id="aircraft"
        className="scroll-mt-28 md:scroll-mt-32 border-b border-border"
      >
        <AircraftSection onRequestQuote={handleAircraftQuote} />
      </section>

      {/* Supercar Section */}
      <section
        id="supercar"
        className="scroll-mt-28 md:scroll-mt-32 border-b border-border"
      >
        <SupercarSection onRequestQuote={handleSupercarQuote} />
      </section>

      {/* Yacht Section */}
      <section
        id="yacht"
        className="scroll-mt-28 md:scroll-mt-32 border-b border-border"
      >
        <YachtSection onRequestQuote={handleYachtQuote} />
      </section>

      {/* eVTOL Section */}
      <section
        id="evtol"
        className="scroll-mt-28 md:scroll-mt-32"
      >
        <EvtolSection />
      </section>

      {/* Footer */}
      <VonaerFooter />

      {/* Inquiry Dialog */}
      <InquiryDialog
        open={inquiryDialogOpen}
        onOpenChange={setInquiryDialogOpen}
        onSuccess={() => setInquiryDialogOpen(false)}
        inquiryType={inquiryType}
        itemName={selectedItem}
      />

      {/* Toast notifications */}
      <Toaster position="top-center" richColors />
    </main>
  )
}
