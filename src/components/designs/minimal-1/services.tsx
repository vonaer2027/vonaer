'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Plane, Calendar, Shield } from 'lucide-react';

export function Minimal1Services() {
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
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-primary mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Image placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-16 max-w-7xl mx-auto"
        >
          <img
            src="/assets/jet.jpg"
            alt="Luxury private jet aircraft showcasing premium aviation services"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <service.icon className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-xl font-medium text-primary mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
