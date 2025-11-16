'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export function Minimal2Hero() {
  const t = useTranslations();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    '/main/hero-slide-2.jpg',
    '/main/hero-slide-3.jpg',
    '/main/hero-slide-4.jpg',
    '/main/hero-slide-5.jpg',
    '/main/hero-slide-6.jpg',
    '/main/hero-slide-7.jpg',
    '/main/hero-slide-8.jpg',
    '/main/hero-slide-9.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen flex items-center bg-black">
      {/* Image slideshow background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-90" />

        {/* Image slideshow */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide]}
              alt={`Hero slide ${currentSlide + 1}`}
              fill
              className="object-cover animate-wave"
              priority={currentSlide === 0}
              quality={90}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 z-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
        <div className="flex flex-col items-center">
          {/* Center content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center text-center w-full"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-8 leading-none">
              <img src="/vonaer.svg" alt="VONAER" className="h-12 md:h-14 lg:h-16 w-auto" />
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl font-light leading-relaxed" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
              {t('hero.subtitle')}
            </p>
          </motion.div>

          {/* Center aligned button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="w-full flex justify-center"
          >
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
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
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
