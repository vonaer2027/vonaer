'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function Minimal3Hero() {
  const t = useTranslations();

  return (
    <section className="relative min-h-screen flex items-center bg-black">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-90" />

        {/* Video element - placeholder for now */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 z-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
        {/* Staggered layout */}
        <div className="max-w-7xl mx-auto">
          {/* Top section - Badge and title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mb-16"
          >
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-extralight text-white leading-none mb-8">
              {t('hero.title')}
            </h1>
          </motion.div>

          {/* Middle section - Description and CTA (offset right) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-3xl ml-auto border-l border-primary/20 pl-12"
          >
            <p className="text-2xl md:text-3xl text-gray-200 font-extralight leading-relaxed mb-10">
              {t('hero.subtitle')}
            </p>

            <div>
              <button className="group px-10 py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2">
                {t('hero.bookFlight')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative thin lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full border-x border-gray-100" />
        </div>
      </div>
    </section>
  );
}
