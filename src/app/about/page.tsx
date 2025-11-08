'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { VonaerFooter } from '@/components/vonaer-footer'
import { useState } from 'react'

export default function AboutPage() {
  const t = useTranslations('about')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <VonaerHeader
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
      />

      {/* Menu Overlay */}
      <VonaerMenuOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      {/* Main Content */}
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          {/* Tagline at Top */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold italic mb-16" style={{ color: '#71717A' }}>
              Elevate Your FlyStyle
            </h1>
          </motion.div>

          {/* Hero Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden mb-12">
              <img
                src="/jet/Heavy Jet 1.jpg"
                alt="VONAER Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* About VONAER Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <div className="prose prose-lg max-w-none" style={{ color: '#71717A' }}>
              <p className="text-lg leading-relaxed mb-4">
                {t('intro.paragraph1')}
              </p>
              <p className="text-lg leading-relaxed mb-4">
                {t('intro.paragraph2')}
              </p>
              <p className="text-lg leading-relaxed mb-4">
                {t('intro.paragraph3')}
              </p>
              <p className="text-lg leading-relaxed mb-4">
                {t('intro.paragraph4')}
              </p>
              <p className="text-lg leading-relaxed mb-4">
                {t('intro.paragraph5')}
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <VonaerFooter />
    </div>
  )
}
