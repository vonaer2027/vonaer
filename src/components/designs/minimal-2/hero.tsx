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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-8 leading-none">
              <img src="/vonaer.svg" alt="VONAER" className="h-12 md:h-14 lg:h-16 w-auto" />
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl font-light leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <div>
              <button
                onClick={() => {
                  const element = document.querySelector('#book-flight');
                  if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="group text-white text-xl underline underline-offset-8 hover:text-gray-300 transition-colors duration-300 flex items-center gap-2 bg-transparent border-none p-0 cursor-pointer"
              >
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
