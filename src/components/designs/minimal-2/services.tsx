'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Plane, Calendar, Shield } from 'lucide-react';

export function Minimal2Services() {
  const t = useTranslations();

  const services = [
    {
      icon: Plane,
      title: t('services.vonPrivate.title'),
      description: t('services.vonPrivate.description')
    },
    {
      icon: Calendar,
      title: t('services.vonRoutine.title'),
      description: t('services.vonRoutine.description')
    },
    {
      icon: Shield,
      title: t('services.vonTour.title'),
      description: t('services.vonTour.description')
    }
  ];

  return (
    <section className="py-32 md:py-40 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Asymmetric header */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h2 className="text-5xl md:text-6xl font-extralight text-primary leading-tight">
              {t('services.title')}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <p className="text-xl text-gray-600 font-light leading-relaxed">
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
          className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-20"
        >
          <img
            src="/assets/jet.jpg"
            alt="Luxury private jet aircraft showcasing premium aviation services"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Services grid - asymmetric layout */}
        <div className="space-y-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ x: 8 }}
              className="group grid lg:grid-cols-12 gap-6 items-center border-t border-gray-200 py-8 cursor-pointer"
            >
              <div className="lg:col-span-1 flex items-center justify-start lg:justify-center">
                <div className="w-16 h-16 rounded-none bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
              </div>

              <div className="lg:col-span-3">
                <h3 className="text-2xl font-light text-primary">
                  {service.title}
                </h3>
              </div>

              <div className="lg:col-span-6">
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="lg:col-span-2 flex justify-end">
                <div className="w-8 h-8 rounded-full border border-primary/20 group-hover:border-primary flex items-center justify-center transition-colors duration-300">
                  <span className="text-primary text-sm">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
