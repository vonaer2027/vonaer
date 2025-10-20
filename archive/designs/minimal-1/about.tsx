'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Award, Users, Globe, TrendingUp } from 'lucide-react';

export function Minimal1About() {
  const t = useTranslations();

  const features = [
    {
      icon: Award,
      title: t('about.coreValues.value1.title'),
      description: t('about.coreValues.value1.description')
    },
    {
      icon: Users,
      title: t('about.coreValues.value2.title'),
      description: t('about.coreValues.value2.description')
    },
    {
      icon: Globe,
      title: t('about.coreValues.value3.title'),
      description: t('about.coreValues.value3.description')
    },
    {
      icon: TrendingUp,
      title: t('about.coreValues.value4.title'),
      description: t('about.coreValues.value4.description')
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-16"
          >
            <img
              src="/assets/dashboard.png"
              alt="Company overview and service capabilities dashboard"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                {t('about.companyStory.title')}
              </h2>

              <p className="text-lg text-gray-900 leading-relaxed mb-8">
                {t('about.companyStory.description')}
              </p>

              <div className="space-y-4">
                {[
                  'Commitment to excellence in every detail',
                  'Personalized service for each client',
                  'State-of-the-art fleet and facilities'
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-gray-900">{point}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-800">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
