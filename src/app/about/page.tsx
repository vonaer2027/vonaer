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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              About Us
            </h1>
          </motion.div>

          {/* About VONAER Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="prose prose-lg max-w-none text-foreground">
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

              <div className="text-center my-12">
                <p className="text-2xl font-bold italic text-primary">
                  {t('tagline')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <VonaerFooter />
    </div>
  )
}
