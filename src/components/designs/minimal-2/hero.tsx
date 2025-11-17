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
    '/hero/1.webp',
    '/hero/2.webp',
    '/hero/3.webp',
    '/hero/4-1.webp',
    '/hero/4-2.webp',
    '/hero/5.webp',
    '/hero/5-1.webp',
    '/hero/5-2.webp',
    '/hero/5-3.webp',
    '/hero/5-4.webp',
    '/hero/5-5.webp',
    '/hero/5-6.webp',
    '/hero/5-7.webp',
    '/hero/5-8.webp',
    '/hero/5-9.webp',
    '/hero/6.webp',
    '/hero/7.webp',
    '/hero/8.webp',
    '/hero/9.webp',
    '/hero/10.webp',
    '/hero/11.webp',
    '/hero/12.webp',
    '/hero/13.webp',
    '/hero/14.webp',
    '/hero/15.webp',
    '/hero/16.webp',
    '/hero/17.webp'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Image slideshow background - Full coverage */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Image slideshow */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={slides[currentSlide]}
              alt={`Hero slide ${currentSlide + 1}`}
              fill
              className="object-cover"
              priority={currentSlide === 0}
              quality={90}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay for text readability - Covers entire image */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/80 via-black/50 to-black/70 z-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 h-full flex items-center justify-center">
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
