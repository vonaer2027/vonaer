'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Minimal2Ancillary() {
  const t = useTranslations();

  return (
    <section className="py-32 md:py-40 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Image placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-20"
        >
          <img
            src="/assets/amenities.png"
            alt="Premium ancillary services and VIP amenities"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left side - Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-extralight text-primary mb-8 leading-tight">
              {t('ancillary.title') || 'Ancillary Service'}
            </h2>

            <p className="text-xl text-gray-600 mb-16 leading-relaxed">
              {t('ancillary.subtitle') || 'Enhance VONAER service with our comprehensive ancillary services'}
            </p>

            <div className="space-y-8">
              {[
                {
                  icon: Mail,
                  label: t('ancillary.services.0.title') || 'VON Escort',
                  value: t('ancillary.services.0.description') || 'Distinguished airport escort service'
                },
                {
                  icon: Phone,
                  label: t('ancillary.services.1.title') || 'VON Carry',
                  value: t('ancillary.services.1.description') || 'Premium baggage delivery service'
                },
                {
                  icon: MapPin,
                  label: t('ancillary.services.2.title') || 'VON Connect',
                  value: t('ancillary.services.2.description') || 'Car service between Heliport and Airport Terminal'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex items-start gap-6 border-l-2 border-primary/20 pl-6 hover:border-primary transition-colors duration-300"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/5 flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                    <div className="text-lg text-primary font-light">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-primary mb-2">
                    {t('ancillary.services.3.title') || 'VON Lounge'}
                  </h3>
                  <p className="text-gray-600">
                    {t('ancillary.services.3.description') || 'Exclusive Lounge for VON members'}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-primary mb-2">
                    {t('ancillary.services.4.title') || 'VON Limousine'}
                  </h3>
                  <p className="text-gray-600">
                    {t('ancillary.services.4.description') || 'VON Limousine offers VIP black car service for first & last mile.'}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-primary mb-2">
                    {t('ancillary.services.5.title') || 'VON RentCar'}
                  </h3>
                  <p className="text-gray-600">
                    {t('ancillary.services.5.description') || 'Rent-a-car service that allows our customers to drive to final destination.'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
