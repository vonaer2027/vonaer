'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowDown, ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function Minimal2Hero() {
  const t = useTranslations();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Play video after mount
  useEffect(() => {
    const playVideo = async (video: HTMLVideoElement | null, name: string) => {
      if (!video) return;

      // Add event listeners for debugging
      video.addEventListener('canplay', () => {
        console.log(`${name} can play`);
        video.play().catch(err => console.error(`${name} play error:`, err));
      });

      video.addEventListener('error', (e) => {
        console.error(`${name} error:`, video.error);
      });

      // Try to play immediately if ready
      if (video.readyState >= 3) {
        try {
          await video.play();
        } catch (err) {
          console.error(`${name} autoplay failed:`, err);
        }
      }
    };

    // Try to play both videos - browser will only show the correct one based on CSS
    playVideo(videoRef.current, 'Desktop video');
    playVideo(mobileVideoRef.current, 'Mobile video');
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video background - Full coverage */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Fallback background image while video loads */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: 'url(/hero/1.webp)' }}
        />

        {/* Desktop video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero/1.webp"
          className="hidden md:block absolute inset-0 w-full h-full object-cover z-[1]"
          style={{ objectPosition: 'center center' }}
        >
          <source src="/hero/hero_video.mp4" type="video/mp4" />
        </video>

        {/* Mobile video */}
        <video
          ref={mobileVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero/1.webp"
          className="block md:hidden absolute inset-0 w-full h-full object-cover z-[1]"
          style={{ objectPosition: 'center center' }}
        >
          <source src="/hero/hero_video_mobile.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for text readability - Covers entire video */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/60 via-black/30 to-black/40 z-10" />
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
