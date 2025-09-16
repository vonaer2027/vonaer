'use client'

import { useState } from 'react'
import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerHero } from '@/components/vonaer-hero'
import { VonaerServices } from '@/components/vonaer-services'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { motion, AnimatePresence } from 'framer-motion'

export default function VonaerLanding() {
  const [currentSection, setCurrentSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-primary text-primary-foreground relative min-h-screen">
      {/* Sticky Header - Amalfi Jets Style */}
      <VonaerHeader 
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />

      {/* Full Screen Menu Overlay */}
      <VonaerMenuOverlay 
        isOpen={menuOpen}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        onClose={() => setMenuOpen(false)}
      />

      {/* Main Content */}
      <main className="relative">
        <AnimatePresence mode="wait">
          {currentSection === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <VonaerHero />
            </motion.div>
          )}

          {currentSection !== 'home' && (
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <VonaerServices section={currentSection} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}