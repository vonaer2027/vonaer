'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Clock, Crown, Heart, ArrowRight } from 'lucide-react';

export function OriginalServices() {
  const t = useTranslations();

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
      icon: Crown
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
      icon: Clock
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
      icon: Heart
    }
  ];

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
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-32">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-20`}
            >
              {/* Content */}
              <div className="flex-1 space-y-8">
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-lg text-gray-600">{service.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-4">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full border border-primary bg-primary/10 flex items-center justify-center mt-1">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <p className="text-gray-600 leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>

                <button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 px-8 py-3 text-lg font-semibold group flex items-center gap-2">
                  {t('services.learnMore')}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Image */}
              <div className="flex-1 w-full">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/assets/jet.jpg"
                    alt={`${service.title} - Luxury private aviation services`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* VON Tour Packages */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t('services.tourPackages.title')}
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {tourPackages.map((tour, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">{tour.name}</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">{tour.route}</p>
                <div className="flex flex-wrap gap-3">
                  {tour.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-4 py-2 border border-gray-200 bg-white text-gray-700 text-sm rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Usage Guide */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 bg-white rounded-3xl p-12 shadow-lg border border-gray-200"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {t('services.usageGuide.title')}
          </h3>
          <p className="text-center text-gray-600 mb-16 text-lg max-w-3xl mx-auto">
            {t('services.usageGuide.subtitle')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { step: 1, title: t('services.usageGuide.steps.step1.title'), description: t('services.usageGuide.steps.step1.description') },
              { step: 2, title: t('services.usageGuide.steps.step2.title'), description: t('services.usageGuide.steps.step2.description') },
              { step: 3, title: t('services.usageGuide.steps.step3.title'), description: t('services.usageGuide.steps.step3.description') },
              { step: 4, title: t('services.usageGuide.steps.step4.title'), description: t('services.usageGuide.steps.step4.description') },
              { step: 5, title: t('services.usageGuide.steps.step5.title'), description: t('services.usageGuide.steps.step5.description') },
              { step: 6, title: t('services.usageGuide.steps.step6.title'), description: t('services.usageGuide.steps.step6.description') }
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 rounded-full border border-primary bg-primary/10 text-primary font-bold text-lg flex items-center justify-center mx-auto mb-6">
                  {step.step}
                </div>
                <h4 className="font-bold text-gray-900 mb-4">{step.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
