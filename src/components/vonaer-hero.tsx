'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronDown } from 'lucide-react'

export function VonaerHero() {
  return (
    <div className="relative">
      {/* Main Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Video/Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 vonaer-gradient-bg opacity-95 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60 z-15" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 z-5">
          {[...Array(20)].map((_, i) => {
            // Use deterministic values based on index to avoid hydration mismatch
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
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-16"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-widest text-primary-foreground mb-4">
            VONAER
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30 max-w-md mx-auto" />
        </motion.div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-primary-foreground mb-8 leading-tight tracking-wide">
            Exploring The World With You
          </h2>
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-100 transition-all duration-300 px-16 py-6 text-xl font-semibold tracking-wide group shadow-2xl border-2 border-white hover:border-gray-200 hover:shadow-3xl transform hover:scale-105"
            asChild
          >
            <a href="/empty">
              Book a Flight
              <ArrowRight className="ml-4 h-6 w-6 transition-transform group-hover:translate-x-2" />
            </a>
          </Button>
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

      {/* Version indicator */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-8 right-8 text-gray-500 text-xs tracking-wider"
      >
      </motion.div>
      </div>

      {/* Footer Section */}
      <div className="relative bg-black/95 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-light text-white mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>+82 1600 9064</p>
                <p>business@vonaer.com</p>
                <p>Seoul, Korea</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-light text-white mb-4">Services</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>Private Jets</p>
                <p>Helicopters</p>
                <p>Empty Legs</p>
                <p>VIP Services</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-light text-white mb-4">Company</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>Moviation Inc</p>
                <p>Urban Air Mobility</p>
                <p>Korea's First Platform</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500 text-xs"
          >
            <p>© 2024 Moviation Inc. All Rights Reserved.</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
