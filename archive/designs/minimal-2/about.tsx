'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function Minimal2About() {
  const t = useTranslations();

  const stats = [
    { value: '20+', label: 'Years Experience' },
    { value: '1000+', label: 'Flights Completed' },
    { value: '500+', label: 'Airports Served' },
    { value: '99%', label: 'Satisfaction Rate' }
  ];

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
            src="/assets/services.png"
            alt="Company achievements and service excellence metrics"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left side - Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="border-l-4 border-primary pl-8"
              >
                <div className="text-6xl font-extralight text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-lg text-gray-900">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-5xl md:text-6xl font-extralight text-gray-900 mb-8 leading-tight">
              {t('about.companyStory.title')}
            </h2>

            <div className="space-y-6 text-lg text-gray-900 leading-relaxed">
              <p>
                {t('about.companyStory.description')}
              </p>
            </div>

            <div className="mt-12 space-y-4">
              {[
                'Safety is our top priority',
                'Excellence in every detail',
                'Personalized service always'
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-2 h-2 bg-primary" />
                  <span className="text-primary font-light">{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
