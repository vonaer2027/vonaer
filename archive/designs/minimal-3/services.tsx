'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Plane, Calendar, Shield } from 'lucide-react';

export function Minimal3Services() {
  const t = useTranslations();

  const services = [
    {
      icon: Plane,
      number: '01',
      title: t('services.vonPrivate.title'),
      description: t('services.vonPrivate.description')
    },
    {
      icon: Calendar,
      number: '02',
      title: t('services.vonRoutine.title'),
      description: t('services.vonRoutine.description')
    },
    {
      icon: Shield,
      number: '03',
      title: t('services.vonTour.title'),
      description: t('services.vonTour.description')
    }
  ];

  return (
    <section className="py-32 md:py-40 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - staggered */}
        <div className="max-w-7xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-6xl md:text-7xl font-extralight text-primary mb-6 leading-none">
              {t('services.title')}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="max-w-2xl ml-auto mt-8"
          >
            <p className="text-xl text-gray-600 leading-relaxed border-l border-primary/20 pl-8">
              {t('services.subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Image placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-20 max-w-7xl mx-auto"
        >
          <img
            src="/assets/jet.jpg"
            alt="Luxury private jet aircraft showcasing premium aviation services"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Services - staggered grid */}
        <div className="max-w-7xl mx-auto space-y-0">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`grid lg:grid-cols-12 gap-8 items-start py-16 border-t border-gray-200 ${
                index % 2 === 0 ? '' : 'lg:ml-24'
              }`}
            >
              {/* Number */}
              <div className="lg:col-span-2">
                <span className="text-6xl font-extralight text-gray-200">
                  {service.number}
                </span>
              </div>

              {/* Icon */}
              <div className="lg:col-span-2 flex items-start">
                <div className="w-16 h-16 border border-primary/20 flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-8 space-y-4">
                <h3 className="text-3xl font-light text-primary">
                  {service.title}
                </h3>
                <p className="text-lg text-gray-800 leading-relaxed max-w-2xl">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full border-x border-gray-100" />
        </div>
      </div>
    </section>
  );
}
