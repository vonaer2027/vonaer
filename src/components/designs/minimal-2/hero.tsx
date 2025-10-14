'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function Minimal2Hero() {
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
        <div className="flex items-center">
          {/* Left content - 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight text-white mb-8 leading-none">
              {t('hero.title')}
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl font-light leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <div>
              <button className="group px-10 py-5 bg-primary text-primary-foreground rounded-none font-medium hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2">
                {t('hero.bookFlight')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-6 h-6 text-primary/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
