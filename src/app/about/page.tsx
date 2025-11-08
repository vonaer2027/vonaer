'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { VonaerFooter } from '@/components/vonaer-footer'
import { useState } from 'react'
import Image from 'next/image'

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

      {/* Hero Section - Similar to Main Page */}
      <section className="relative min-h-screen flex items-center bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-90" />

          <Image
            src="/about/vonaer-lounge.png"
            alt="VONAER Lounge"
            fill
            className="object-cover opacity-50"
            priority
            quality={90}
          />

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 z-10" />
        </div>

        {/* Center Text */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
          <div className="flex items-center justify-center min-h-screen">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold italic tracking-wider" style={{ color: '#71717A' }}>
                Elevate Your FlyStyle
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main>
        <div className="container mx-auto px-4 py-16 max-w-5xl">
          {/* About VONAER Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <div className="prose prose-lg max-w-none" style={{ color: '#71717A', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
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
