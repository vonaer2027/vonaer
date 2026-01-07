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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white">
                Elevate Your Flystyle
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
            <div className="prose prose-base max-w-none" style={{ color: '#71717A', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
              <p className="text-base leading-relaxed mb-4">
                {t('intro.paragraph1')}
              </p>
              <p className="text-base leading-relaxed mb-4">
                {t('intro.paragraph2')}
              </p>
              <p className="text-base leading-relaxed mb-4">
                {t('intro.paragraph3')}
              </p>
              <p className="text-base leading-relaxed mb-4">
                {t('intro.paragraph4')}
              </p>
              <p className="text-base leading-relaxed mb-4">
                {t('intro.paragraph5')}
              </p>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-12 text-center">
              {t('team.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Min Shin - CEO */}
              <div className="bg-card rounded-lg overflow-hidden shadow-sm border border-border">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={t('team.members.min.image')}
                    alt={t('team.members.min.name')}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-foreground mb-1">
                    {t('team.members.min.name')}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('team.members.min.role')}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                    {t('team.members.min.bio')}
                  </p>
                  <p className="text-sm italic text-foreground/80 border-l-2 border-primary pl-4" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                    "{t('team.members.min.quote')}"
                  </p>
                </div>
              </div>

              {/* Hyun Lee - CRO */}
              <div className="bg-card rounded-lg overflow-hidden shadow-sm border border-border">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={t('team.members.hyun.image')}
                    alt={t('team.members.hyun.name')}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-foreground mb-1">
                    {t('team.members.hyun.name')}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('team.members.hyun.role')}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                    {t('team.members.hyun.bio')}
                  </p>
                  <p className="text-sm italic text-foreground/80 border-l-2 border-primary pl-4" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                    "{t('team.members.hyun.quote')}"
                  </p>
                </div>
              </div>

              {/* David Lee - Flight Ops */}
              <div className="bg-card rounded-lg overflow-hidden shadow-sm border border-border">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={t('team.members.david.image')}
                    alt={t('team.members.david.name')}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-foreground mb-1">
                    {t('team.members.david.name')}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('team.members.david.role')}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                    {t('team.members.david.bio')}
                  </p>
                  <p className="text-sm italic text-foreground/80 border-l-2 border-primary pl-4" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                    "{t('team.members.david.quote')}"
                  </p>
                </div>
              </div>

              {/* Becky Han - Concierge Ops */}
              <div className="bg-card rounded-lg overflow-hidden shadow-sm border border-border">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={t('team.members.becky.image')}
                    alt={t('team.members.becky.name')}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-foreground mb-1">
                    {t('team.members.becky.name')}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('team.members.becky.role')}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                    {t('team.members.becky.bio')}
                  </p>
                  <p className="text-sm italic text-foreground/80 border-l-2 border-primary pl-4" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                    "{t('team.members.becky.quote')}"
                  </p>
                </div>
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
