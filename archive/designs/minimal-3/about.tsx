'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function Minimal3About() {
  const t = useTranslations();

  const values = [
    {
      number: '01',
      title: t('about.coreValues.value1.title'),
      description: t('about.coreValues.value1.description')
    },
    {
      number: '02',
      title: t('about.coreValues.value2.title'),
      description: t('about.coreValues.value2.description')
    },
    {
      number: '03',
      title: t('about.coreValues.value3.title'),
      description: t('about.coreValues.value3.description')
    }
  ];

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
              src="/assets/amenities.png"
              alt="Company history and core values visualization"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Staggered header */}
          <div className="grid lg:grid-cols-12 gap-16 mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <h2 className="text-6xl md:text-7xl font-extralight text-gray-900 leading-none">
                {t('about.companyStory.title')}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 border-l border-primary/20 pl-12 space-y-6"
            >
              <p className="text-xl text-gray-900 leading-relaxed">
                {t('about.companyStory.description')}
              </p>
            </motion.div>
          </div>

          {/* Stats section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 mb-24"
          >
            {[
              { value: '20+', label: 'Years' },
              { value: '1000+', label: 'Flights' },
              { value: '500+', label: 'Airports' },
              { value: '99%', label: 'Satisfaction' }
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white p-8 text-center"
              >
                <div className="text-5xl font-extralight text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-800 tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Values - staggered */}
          <div className="space-y-12">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`grid lg:grid-cols-12 gap-8 items-start ${
                  index % 2 === 0 ? '' : 'lg:ml-24'
                }`}
              >
                <div className="lg:col-span-2">
                  <span className="text-6xl font-extralight text-gray-200">
                    {value.number}
                  </span>
                </div>

                <div className="lg:col-span-10 border-l border-primary/20 pl-8 space-y-3">
                  <h3 className="text-3xl font-light text-gray-900">
                    {value.title}
                  </h3>
                  <p className="text-lg text-gray-900 leading-relaxed max-w-2xl">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
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
