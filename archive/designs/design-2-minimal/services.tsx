'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Clock, Crown, ArrowRight, Heart } from 'lucide-react'

export function Design2Services() {
  const t = useTranslations()

  const services = [
    {
      id: 'von-private',
      title: t('services.vonPrivate.title'),
      subtitle: t('services.vonPrivate.subtitle'),
      description: t('services.vonPrivate.description'),
      features: [
        t('services.vonPrivate.features.feature1'),
        t('services.vonPrivate.features.feature2'),
        t('services.vonPrivate.features.feature3')
      ],
      icon: Crown,
      image: '/api/placeholder/600/400'
    },
    {
      id: 'von-routine',
      title: t('services.vonRoutine.title'),
      subtitle: t('services.vonRoutine.subtitle'),
      description: t('services.vonRoutine.description'),
      features: [
        t('services.vonRoutine.features.feature1'),
        t('services.vonRoutine.features.feature2'),
        t('services.vonRoutine.features.feature3')
      ],
      icon: Clock,
      image: '/api/placeholder/600/400'
    },
    {
      id: 'von-tour',
      title: t('services.vonTour.title'),
      subtitle: t('services.vonTour.subtitle'),
      description: t('services.vonTour.description'),
      features: [
        t('services.vonTour.features.feature1'),
        t('services.vonTour.features.feature2'),
        t('services.vonTour.features.feature3')
      ],
      icon: Heart,
      image: '/api/placeholder/600/400'
    }
  ]

  const tourPackages = [
    {
      name: t('services.tourPackages.gwanakMountain.name'),
      route: t('services.tourPackages.gwanakMountain.route'),
      tags: [
        t('services.tourPackages.gwanakMountain.tags.tag1'),
        t('services.tourPackages.gwanakMountain.tags.tag2'),
        t('services.tourPackages.gwanakMountain.tags.tag3')
      ]
    },
    {
      name: t('services.tourPackages.hanRiver.name'),
      route: t('services.tourPackages.hanRiver.route'),
      tags: [
        t('services.tourPackages.hanRiver.tags.tag1'),
        t('services.tourPackages.hanRiver.tags.tag2')
      ]
    },
    {
      name: t('services.tourPackages.bukhanMountain.name'),
      route: t('services.tourPackages.bukhanMountain.route'),
      tags: [
        t('services.tourPackages.bukhanMountain.tags.tag1'),
        t('services.tourPackages.bukhanMountain.tags.tag2')
      ]
    },
    {
      name: t('services.tourPackages.dmz.name'),
      route: t('services.tourPackages.dmz.route'),
      tags: [
        t('services.tourPackages.dmz.tags.tag1')
      ]
    }
  ]

  return (
    <section id="services" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-12">
        {/* Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <h2 className="text-5xl font-light text-gray-900 mb-6 tracking-tight">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl font-light leading-relaxed">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Full-Width Alternating Sections */}
        <div className="space-y-48">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-20`}
            >
              {/* Text Content */}
              <div className="flex-1 space-y-8">
                <div className="flex items-center gap-6">
                  <service.icon className="h-12 w-12 text-gray-900" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-4xl font-light text-gray-900 tracking-tight">{service.title}</h3>
                    <p className="text-lg text-gray-500 mt-2 font-light">{service.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed font-light">
                  {service.description}
                </p>

                <div className="space-y-4 pt-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-1 h-1 rounded-full bg-gray-900 mt-3" />
                      <p className="text-gray-600 leading-relaxed font-light">{feature}</p>
                    </div>
                  ))}
                </div>

                <Button className="bg-gray-900 text-white hover:bg-gray-800 px-10 py-6 text-base font-light group border-none mt-8">
                  {t('services.learnMore')}
                  <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>

              {/* Image Placeholder - Minimal */}
              <div className="flex-1 w-full">
                <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                  <service.icon className="h-24 w-24 text-gray-300" strokeWidth={1} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tour Packages - Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-48 pt-32 border-t border-gray-200"
        >
          <h3 className="text-4xl font-light text-gray-900 mb-20 tracking-tight">
            {t('services.tourPackages.title')}
          </h3>
          <div className="grid md:grid-cols-2 gap-16">
            {tourPackages.map((tour, index) => (
              <div key={index} className="space-y-6">
                <h4 className="text-2xl font-light text-gray-900">{tour.name}</h4>
                <p className="text-gray-600 leading-relaxed font-light">{tour.route}</p>
                <div className="flex flex-wrap gap-3 pt-4">
                  {tour.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-4 py-2 border border-gray-300 text-gray-600 text-sm font-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Usage Guide - Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-48 pt-32 border-t border-gray-200"
        >
          <h3 className="text-4xl font-light text-gray-900 mb-12 tracking-tight">
            {t('services.usageGuide.title')}
          </h3>
          <p className="text-xl text-gray-600 mb-24 font-light max-w-3xl leading-relaxed">
            {t('services.usageGuide.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            {[
              { step: 1, title: t('services.usageGuide.steps.step1.title'), description: t('services.usageGuide.steps.step1.description') },
              { step: 2, title: t('services.usageGuide.steps.step2.title'), description: t('services.usageGuide.steps.step2.description') },
              { step: 3, title: t('services.usageGuide.steps.step3.title'), description: t('services.usageGuide.steps.step3.description') },
              { step: 4, title: t('services.usageGuide.steps.step4.title'), description: t('services.usageGuide.steps.step4.description') },
              { step: 5, title: t('services.usageGuide.steps.step5.title'), description: t('services.usageGuide.steps.step5.description') },
              { step: 6, title: t('services.usageGuide.steps.step6.title'), description: t('services.usageGuide.steps.step6.description') }
            ].map((step) => (
              <div key={step.step} className="space-y-6">
                <div className="text-6xl font-extralight text-gray-300">{step.step}</div>
                <h4 className="text-xl font-light text-gray-900">{step.title}</h4>
                <p className="text-gray-600 leading-relaxed font-light">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
