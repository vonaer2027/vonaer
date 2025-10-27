'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

export function PrivateImmigrationService() {
  const t = useTranslations('immigration')

  const regularSteps = [
    { key: 'arrival' },
    { key: 'checkin' },
    { key: 'customs' },
    { key: 'departurehall' },
    { key: 'security' },
    { key: 'immigration' },
    { key: 'gate' },
    { key: 'boarding' },
  ]

  const vonaerSteps = [
    { key: 'arrival' },
    { key: 'checkin' },
    { key: 'boarding' },
  ]

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Immigration Process Comparison Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-6xl mx-auto"
        >
          <img
            src="/immigration-comparison.png"
            alt="VONAER Jet vs Regular Airport Immigration Process Comparison"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>

      </div>
    </section>
  )
}
