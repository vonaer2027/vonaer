'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Shield, Package, Car, Coffee, Crown, MapPin, ArrowRight } from 'lucide-react'

export function Design2Ancillary() {
  const t = useTranslations()

  const ancillaryServices = [
    {
      id: t('ancillary.services.0.id'),
      title: t('ancillary.services.0.title'),
      description: t('ancillary.services.0.description'),
      icon: Shield,
      features: [
        t('ancillary.services.0.features.0'),
        t('ancillary.services.0.features.1'),
        t('ancillary.services.0.features.2'),
        t('ancillary.services.0.features.3')
      ]
    },
    {
      id: t('ancillary.services.1.id'),
      title: t('ancillary.services.1.title'),
      description: t('ancillary.services.1.description'),
      icon: Package,
      features: [
        t('ancillary.services.1.features.0'),
        t('ancillary.services.1.features.1'),
        t('ancillary.services.1.features.2'),
        t('ancillary.services.1.features.3')
      ]
    },
    {
      id: t('ancillary.services.2.id'),
      title: t('ancillary.services.2.title'),
      description: t('ancillary.services.2.description'),
      icon: MapPin,
      features: [
        t('ancillary.services.2.features.0'),
        t('ancillary.services.2.features.1'),
        t('ancillary.services.2.features.2'),
        t('ancillary.services.2.features.3')
      ]
    },
    {
      id: t('ancillary.services.3.id'),
      title: t('ancillary.services.3.title'),
      description: t('ancillary.services.3.description'),
      icon: Coffee,
      features: [
        t('ancillary.services.3.features.0'),
        t('ancillary.services.3.features.1'),
        t('ancillary.services.3.features.2'),
        t('ancillary.services.3.features.3')
      ]
    },
    {
      id: t('ancillary.services.4.id'),
      title: t('ancillary.services.4.title'),
      description: t('ancillary.services.4.description'),
      icon: Crown,
      features: [
        t('ancillary.services.4.features.0'),
        t('ancillary.services.4.features.1'),
        t('ancillary.services.4.features.2'),
        t('ancillary.services.4.features.3')
      ]
    },
    {
      id: t('ancillary.services.5.id'),
      title: t('ancillary.services.5.title'),
      description: t('ancillary.services.5.description'),
      icon: Car,
      features: [
        t('ancillary.services.5.features.0'),
        t('ancillary.services.5.features.1'),
        t('ancillary.services.5.features.2'),
        t('ancillary.services.5.features.3')
      ]
    }
  ]

  return (
    <section id="ancillary" className="py-32 bg-gray-50">
      <div className="container mx-auto px-12">
        {/* Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <h2 className="text-5xl font-light text-gray-900 mb-6 tracking-tight">
            {t('ancillary.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl font-light leading-relaxed">
            {t('ancillary.subtitle')}
          </p>
        </motion.div>

        {/* Single Column Wide Cards - Minimalist */}
        <div className="max-w-4xl mx-auto space-y-20">
          {ancillaryServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-t border-gray-200 pt-12"
            >
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Minimalist Icon */}
                <div className="flex-shrink-0">
                  <service.icon className="h-16 w-16 text-gray-900" strokeWidth={1} />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-8">
                  <div>
                    <h3 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>

                  {/* Features - Minimal List */}
                  <div className="space-y-4">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-4">
                        <div className="w-1 h-1 rounded-full bg-gray-900 mt-3 flex-shrink-0" />
                        <p className="text-gray-600 leading-relaxed font-light">{feature}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button className="bg-gray-900 text-white hover:bg-gray-800 px-10 py-6 text-base font-light group border-none">
                    {t('common.learnMore')}
                    <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
