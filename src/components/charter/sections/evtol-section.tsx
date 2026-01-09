'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export function EvtolSection() {
  const t = useTranslations('evtol')

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
          {t('title')}
        </h2>
      </motion.div>

      {/* E-VTOL Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mb-12 max-w-4xl mx-auto"
      >
        <Image
          src="/evtol/vonaer_evtol.png"
          alt="VONAER eVTOL Aircraft"
          width={1200}
          height={400}
          className="w-full h-auto object-contain bg-white"
        />
      </motion.div>

      {/* Present the Future Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-12"
      >
        <div className="prose prose-lg max-w-none text-foreground space-y-6" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
          <p className="text-lg leading-relaxed">
            {t('paragraph1')}
          </p>
          <p className="text-lg leading-relaxed">
            {t('paragraph2')}
          </p>
          <p className="text-lg leading-relaxed">
            {t('paragraph3')}
          </p>
          {t('paragraph4') && (
            <p className="text-lg leading-relaxed">
              {t('paragraph4')}
            </p>
          )}
          <p className="text-lg leading-relaxed">
            {t('paragraph5')}
          </p>
        </div>
      </motion.div>

      {/* Our Commitment Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-12"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          {t('commitment.title')}
        </h3>

        <div className="prose prose-lg max-w-none text-foreground space-y-6" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
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

          {t('commitment.paragraph3') && (
            <p className="text-lg leading-relaxed">
              {t('commitment.paragraph3')}
            </p>
          )}
          <p className="text-lg leading-relaxed">
            {t('commitment.paragraph4')}
          </p>
        </div>
      </motion.div>

      {/* Bottom Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center mt-16 pt-8 border-t border-border"
      >
        <p className="text-xl md:text-2xl font-semibold text-foreground" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
          {t('bottomTagline')}
        </p>
      </motion.div>
    </div>
  )
}
