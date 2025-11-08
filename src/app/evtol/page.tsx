'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { VonaerFooter } from '@/components/vonaer-footer'
import { useState } from 'react'

export default function EvtolPage() {
  const t = useTranslations('evtol')
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
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {t('title')}
            </h1>
          </motion.div>

          {/* E-VTOL Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-12 rounded-2xl overflow-hidden shadow-2xl max-w-xl mx-auto"
          >
            <Image
              src="/evtol/eVTOL_v1.png"
              alt="VONAER eVTOL Aircraft"
              width={600}
              height={338}
              className="w-full h-auto object-contain"
              priority
            />
          </motion.div>

          {/* Present the Future Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="prose prose-lg max-w-none text-foreground space-y-6">
              <p className="text-lg leading-relaxed">
                {t('paragraph1')}
              </p>
              <p className="text-lg leading-relaxed">
                {t('paragraph2')}
              </p>
              <p className="text-lg leading-relaxed">
                {t('paragraph3')}
              </p>
              <p className="text-lg leading-relaxed">
                {t('paragraph4')}
              </p>
              <p className="text-lg leading-relaxed">
                {t('paragraph5')}
              </p>
            </div>
          </motion.div>

          {/* Our Commitment Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              {t('commitment.title')}
            </h2>

            <div className="prose prose-lg max-w-none text-foreground space-y-6">
              <p className="text-lg leading-relaxed">
                {t('commitment.paragraph1')}
              </p>
              <p className="text-lg leading-relaxed">
                {t('commitment.paragraph2')}
              </p>

              <div className="text-center my-8 p-8 bg-primary/5 rounded-lg border-l-4 border-primary">
                <p className="text-2xl font-bold text-primary mb-2">
                  &ldquo;{t('commitment.quote')}&rdquo;
                </p>
              </div>

              <p className="text-lg leading-relaxed">
                {t('commitment.paragraph3')}
              </p>
              <p className="text-lg leading-relaxed">
                {t('commitment.paragraph4')}
              </p>
            </div>
          </motion.div>

          {/* e VTOL Section - Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16 pt-8 border-t border-border"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-wider">
              e VTOL
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              electric Vertical Take-Off and Landing
            </p>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <VonaerFooter />
    </div>
  )
}
