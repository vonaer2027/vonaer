'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Minimal3Ancillary() {
  const t = useTranslations();

  return (
    <section className="py-32 md:py-40 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-20"
          >
            <img
              src="/assets/dashboard.png"
              alt="Comprehensive ancillary services and additional offerings"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Header - staggered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-24"
          >
            <h2 className="text-6xl md:text-7xl font-extralight text-primary mb-6 leading-none">
              {t('ancillary.title') || 'Ancillary Service'}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed border-l border-primary/20 pl-8">
              {t('ancillary.subtitle') || 'Enhance VONAER service with our comprehensive ancillary services'}
            </p>
          </motion.div>

          {/* Two column layout - staggered */}
          <div className="grid lg:grid-cols-2 gap-24">
            {/* Left - Contact form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-light text-primary mb-3">
                    {t('ancillary.services.0.title') || 'VON Escort'}
                  </h3>
                  <p className="text-gray-600">
                    {t('ancillary.services.0.description') || 'Distinguished airport escort service for a true VIP experience'}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-light text-primary mb-3">
                    {t('ancillary.services.1.title') || 'VON Carry'}
                  </h3>
                  <p className="text-gray-600">
                    {t('ancillary.services.1.description') || 'Premium baggage delivery service that delivers your luggage to your final destination'}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-light text-primary mb-3">
                    {t('ancillary.services.2.title') || 'VON Connect'}
                  </h3>
                  <p className="text-gray-600">
                    {t('ancillary.services.2.description') || 'Car service between Heliport and Airport Terminal'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right - Contact info - staggered */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:ml-12 space-y-16"
            >
              {[
                {
                  icon: Mail,
                  label: t('ancillary.services.3.title') || 'VON Lounge',
                  value: t('ancillary.services.3.description') || 'Exclusive Lounge for VON members',
                  link: null
                },
                {
                  icon: Phone,
                  label: t('ancillary.services.4.title') || 'VON Limousine',
                  value: t('ancillary.services.4.description') || 'VON Limousine offers VIP black car service',
                  link: null
                },
                {
                  icon: MapPin,
                  label: t('ancillary.services.5.title') || 'VON RentCar',
                  value: t('ancillary.services.5.description') || 'Rent-a-car service for customers',
                  link: null
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={index % 2 === 0 ? '' : 'lg:ml-12'}
                >
                  <div className="flex items-start gap-6 pb-6 border-b border-gray-200">
                    <div className="w-12 h-12 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs tracking-widest text-gray-500 mb-2">
                        {item.label.toUpperCase()}
                      </div>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-xl text-primary hover:opacity-70 transition-opacity"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-xl text-primary">
                          {item.value}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
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
