'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export function OriginalAncillary() {
  const t = useTranslations();

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-12"
          >
            <img
              src="/assets/amenities.png"
              alt="Ancillary services and premium VIP amenities"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 md:p-16 mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
              {t('ancillary.title')}
            </h2>

            <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              {t('ancillary.subtitle')}
            </p>

            {/* Services info */}
            <div className="space-y-6 mb-8">
              <p className="text-gray-600">
                {t('ancillary.services.0.description')}
              </p>
              <p className="text-gray-600">
                {t('ancillary.services.1.description')}
              </p>
              <p className="text-gray-600">
                {t('ancillary.services.2.description')}
              </p>
            </div>
          </motion.div>

          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              {
                icon: Mail,
                label: 'VON Escort',
                value: t('ancillary.services.0.title')
              },
              {
                icon: Phone,
                label: 'VON Carry',
                value: t('ancillary.services.1.title')
              },
              {
                icon: MapPin,
                label: 'VON Connect',
                value: t('ancillary.services.2.title')
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-sm text-gray-600 mb-1">{item.label}</div>
                <div className="font-medium text-gray-900">{item.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
