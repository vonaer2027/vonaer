'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function Design2Hero() {
  const t = useTranslations()
  return (
    <div id="home" className="relative">
      {/* Full-Height Split Screen */}
      <div className="relative min-h-screen flex items-stretch overflow-hidden">
        {/* Left Side - Text with Lots of Whitespace */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-12 lg:px-20 py-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-xl space-y-12"
          >
            <h1 className="text-5xl lg:text-6xl font-light text-gray-900 leading-tight tracking-tight">
              <img src="/vonaer.svg" alt="VONAER" className="h-12 lg:h-16 w-auto" />
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              {t('hero.subtitle')}
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button
                size="lg"
                className="bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 px-12 py-7 text-lg font-light tracking-wide group border-none"
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
                {t('hero.bookFlight')}
                <ArrowRight className="ml-4 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Visual */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="hidden lg:block w-1/2 bg-gradient-to-br from-gray-100 to-gray-200"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-gray-300" />
              <p className="font-light text-lg">Visual Area</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
