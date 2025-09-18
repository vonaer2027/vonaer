'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { Component } from '@/components/ui/etheral-shadow'

export function VonaerHeroNew() {
  return (
    <div id="home" className="relative">
      {/* Main Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Ethereal Shadow Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-5" />
          <Component
            color="rgba(34, 64, 66, 1)"
            animation={{ scale: 150, speed: 40 }}
            noise={{ opacity: 0.4, scale: 1.8 }}
            sizing="fill"
            className="z-10"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-20 text-center px-6 max-w-7xl mx-auto w-full">
          {/* Simplified Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-primary-foreground mb-8 leading-tight tracking-wide">
              Exploring The World With You
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-4xl mx-auto mb-12 leading-relaxed">
              Korea&apos;s first Air Mobility Platform
            </p>
            
            {/* Book Flight CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 transition-all duration-300 px-12 py-6 text-xl font-semibold tracking-wide group shadow-2xl border-2 border-white hover:border-gray-200 hover:shadow-3xl transform hover:scale-105"
                onClick={() => {
                  const element = document.querySelector('#book-flight')
                  if (element) {
                    const headerOffset = 80
                    const elementPosition = element.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    })
                  }
                }}
              >
                Book Flight
                <ArrowRight className="ml-4 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Button>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </div>
  )
}
