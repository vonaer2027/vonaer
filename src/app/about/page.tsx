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
            className="mb-24"
          >
            {/* Hero Statement */}
            <div className="text-center mb-16">
              <p className="text-xl md:text-2xl lg:text-3xl font-light text-foreground leading-relaxed tracking-wide" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                {t('intro.paragraph1')}
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 mb-16">
              <div className="w-16 h-px bg-border" />
              <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
              <div className="w-16 h-px bg-border" />
            </div>

            {/* Description */}
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm md:text-base text-muted-foreground leading-[2]" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                {t('intro.paragraph2')}
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
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-16 text-center tracking-wide">
              {t('team.title')}
            </h2>
            <div className="flex flex-col gap-20 md:gap-24">
              {/* Min Shin - CEO (Photo Left) */}
              <div className="group">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                  <div className="w-full md:w-2/5 flex-shrink-0">
                    <div className="aspect-[4/5] relative overflow-hidden rounded-2xl shadow-2xl">
                      <Image
                        src={t('team.members.min.image')}
                        alt={t('team.members.min.name')}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-light text-foreground tracking-wide">
                        {t('team.members.min.name')}
                      </h3>
                      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mt-2">
                        {t('team.members.min.role')}
                      </p>
                    </div>
                    <div className="w-12 h-px bg-border" />
                    <p className="text-sm md:text-base text-muted-foreground leading-[1.8] whitespace-pre-line" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                      {t('team.members.min.bio')}
                    </p>
                    <blockquote className="text-sm md:text-base text-foreground/70 italic pt-4 border-l border-foreground/20 pl-6">
                      {t('team.members.min.quote')}
                    </blockquote>
                  </div>
                </div>
              </div>

              {/* Hyun Lee - CRO (Photo Right) */}
              <div className="group">
                <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-start">
                  <div className="w-full md:w-2/5 flex-shrink-0">
                    <div className="aspect-[4/5] relative overflow-hidden rounded-2xl shadow-2xl">
                      <Image
                        src={t('team.members.hyun.image')}
                        alt={t('team.members.hyun.name')}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-light text-foreground tracking-wide">
                        {t('team.members.hyun.name')}
                      </h3>
                      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mt-2">
                        {t('team.members.hyun.role')}
                      </p>
                    </div>
                    <div className="w-12 h-px bg-border" />
                    <p className="text-sm md:text-base text-muted-foreground leading-[1.8] whitespace-pre-line" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                      {t('team.members.hyun.bio')}
                    </p>
                    <blockquote className="text-sm md:text-base text-foreground/70 italic pt-4 border-l border-foreground/20 pl-6">
                      {t('team.members.hyun.quote')}
                    </blockquote>
                  </div>
                </div>
              </div>

              {/* David Lee - Flight Ops (Photo Left) */}
              <div className="group">
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                  <div className="w-full md:w-2/5 flex-shrink-0">
                    <div className="aspect-[4/5] relative overflow-hidden rounded-2xl shadow-2xl">
                      <Image
                        src={t('team.members.david.image')}
                        alt={t('team.members.david.name')}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-light text-foreground tracking-wide">
                        {t('team.members.david.name')}
                      </h3>
                      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mt-2">
                        {t('team.members.david.role')}
                      </p>
                    </div>
                    <div className="w-12 h-px bg-border" />
                    <p className="text-sm md:text-base text-muted-foreground leading-[1.8] whitespace-pre-line" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                      {t('team.members.david.bio')}
                    </p>
                    <blockquote className="text-sm md:text-base text-foreground/70 italic pt-4 border-l border-foreground/20 pl-6">
                      {t('team.members.david.quote')}
                    </blockquote>
                  </div>
                </div>
              </div>

              {/* Becky Han - Concierge Ops (Photo Right) */}
              <div className="group">
                <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-start">
                  <div className="w-full md:w-2/5 flex-shrink-0">
                    <div className="aspect-[4/5] relative overflow-hidden rounded-2xl shadow-2xl">
                      <Image
                        src={t('team.members.becky.image')}
                        alt={t('team.members.becky.name')}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-light text-foreground tracking-wide">
                        {t('team.members.becky.name')}
                      </h3>
                      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mt-2">
                        {t('team.members.becky.role')}
                      </p>
                    </div>
                    <div className="w-12 h-px bg-border" />
                    <p className="text-sm md:text-base text-muted-foreground leading-[1.8] whitespace-pre-line" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                      {t('team.members.becky.bio')}
                    </p>
                    <blockquote className="text-sm md:text-base text-foreground/70 italic pt-4 border-l border-foreground/20 pl-6">
                      {t('team.members.becky.quote')}
                    </blockquote>
                  </div>
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
