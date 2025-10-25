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

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Regular Airport */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full border-2">
              <CardContent className="p-6 md:p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t('regular.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('regular.duration')}
                  </p>
                </div>

                <div className="space-y-3">
                  {regularSteps.map((step, index) => (
                    <motion.div
                      key={step.key}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                      className="p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-muted-foreground/20 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {t(`regular.steps.${step.key}`)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">{t('regular.complexity')}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* VONAER Jet */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full border-2 border-primary shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t('vonaer.title')}
                    <span className="ml-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">
                      90% {t('vonaer.faster')}
                    </span>
                  </h3>
                  <p className="text-sm text-primary">
                    {t('vonaer.duration')}
                  </p>
                </div>

                <div className="space-y-3">
                  {vonaerSteps.map((step, index) => (
                    <motion.div
                      key={step.key}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                      className="p-3 rounded-lg bg-primary/5 border border-primary/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {t(`vonaer.steps.${step.key}`)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Simplified steps notice */}
                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground text-center">
                    {t('vonaer.simplified')}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-primary/20">
                  <p className="text-sm text-primary font-medium">{t('vonaer.simplicity')}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
