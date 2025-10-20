'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Clock, Plane, TrendingUp, ArrowRight } from 'lucide-react';

export function OriginalAbout() {
  const t = useTranslations();

  const coreValues = [
    {
      icon: Clock,
      title: t('about.coreValues.value1.title'),
      description: t('about.coreValues.value1.description')
    },
    {
      icon: Plane,
      title: t('about.coreValues.value2.title'),
      description: t('about.coreValues.value2.description')
    },
    {
      icon: TrendingUp,
      title: t('about.coreValues.value3.title'),
      description: t('about.coreValues.value3.description')
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full"
              >
                <div className="p-8 text-center h-full flex flex-col">
                  <div className="w-16 h-16 rounded-2xl border border-gray-200 bg-white flex items-center justify-center mx-auto mb-8">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 leading-tight flex-shrink-0">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed flex-1">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Story with Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-12">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-12">
              <img
                src="/assets/dashboard.png"
                alt="Company story and achievements"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t('about.companyStory.title')}
            </h3>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed text-center">
              {t('about.companyStory.description')}
            </p>
          </div>
        </motion.div>

        {/* App Download CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-12 md:p-16 text-center">
            <h3 className="text-3xl font-bold mb-6 text-gray-900">
              {t('about.appDownload.title')}
            </h3>
            <p className="text-xl mb-10 text-gray-600">
              {t('about.appDownload.subtitle')}
            </p>
            <button className="border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 text-lg font-semibold group shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto">
              {t('about.appDownload.button')}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
