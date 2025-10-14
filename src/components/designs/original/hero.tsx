'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

export function OriginalHero() {
  const t = useTranslations();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        {/* Video element */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Subtle dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50 z-10" />

        {/* Animated background elements */}
        <div className="absolute inset-0 z-5">
          {[...Array(20)].map((_, i) => {
            const left = (i * 17.3 + 23.7) % 100;
            const top = (i * 31.1 + 11.9) % 100;
            const width = ((i * 7 + 3) % 3) + 1;
            const height = ((i * 5 + 2) % 3) + 1;
            const duration = 4 + (i % 3);
            const delay = (i * 0.5) % 3;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${width}px`,
                  height: `${height}px`,
                }}
                animate={{
                  opacity: [0.1, 0.4, 0.1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 z-5"
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
               backgroundSize: '40px 40px'
             }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-8 leading-tight tracking-wide">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <button className="bg-white text-black hover:bg-gray-100 transition-all duration-300 px-16 py-6 text-xl font-semibold tracking-wide group shadow-2xl border-2 border-white hover:border-gray-200 hover:shadow-3xl transform hover:scale-105 flex items-center justify-center gap-2 mx-auto">
            {t('hero.bookFlight')}
            <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
          </button>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute top-1/4 right-10 z-10 hidden lg:block"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 border border-white/10 rounded-full flex items-center justify-center"
        >
          <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white/10 rounded-full" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
        className="absolute bottom-1/4 left-10 z-10 hidden lg:block"
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center"
        >
          <div className="w-8 h-8 bg-white/5 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
