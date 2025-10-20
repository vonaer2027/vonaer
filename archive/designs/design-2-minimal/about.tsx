'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Plane, Clock, TrendingUp, ArrowRight } from 'lucide-react'

export function Design2About() {
  const t = useTranslations()

  const coreValues = [
    {
      icon: Clock,
      title: t('about.coreValues.value1.title'),
      description: t('about.coreValues.value1.description')
    },
    {
      icon: Plane,
      title: t('about.coreValues.value2.title'),
      description: t('about.coreValues.value2.description')
    },
    {
      icon: TrendingUp,
      title: t('about.coreValues.value3.title'),
      description: t('about.coreValues.value3.description')
    }
  ]

  return (
    <section id="about" className="py-32 bg-white">
      <div className="container mx-auto px-12">
        {/* Large Typography for Values - Horizontal Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-48 overflow-x-auto"
        >
          <div className="flex gap-20 pb-8 min-w-max">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-96 space-y-8"
              >
                <value.icon className="h-16 w-16 text-gray-900" strokeWidth={1} />
                <h3 className="text-3xl font-light text-gray-900 leading-tight">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-light text-lg">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Story - Full-Width Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-48 pt-32 border-t border-gray-200"
        >
          <h3 className="text-5xl font-light text-gray-900 mb-12 tracking-tight max-w-4xl">
            {t('about.companyStory.title')}
          </h3>
          <p className="text-2xl text-gray-600 max-w-5xl leading-relaxed font-light">
            {t('about.companyStory.description')}
          </p>
        </motion.div>

        {/* App Download - Minimal CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="pt-32 border-t border-gray-200"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
            <div className="space-y-6 max-w-2xl">
              <h3 className="text-4xl font-light text-gray-900 tracking-tight">
                {t('about.appDownload.title')}
              </h3>
              <p className="text-xl text-gray-600 font-light leading-relaxed">
                {t('about.appDownload.subtitle')}
              </p>
            </div>
            <Button className="bg-gray-900 text-white hover:bg-gray-800 px-12 py-7 text-lg font-light tracking-wide group border-none flex-shrink-0">
              {t('about.appDownload.button')}
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
