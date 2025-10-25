'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageDropdown } from '@/components/language-dropdown'
import { Menu, X } from 'lucide-react'

interface VonaerHeaderProps {
  menuOpen: boolean
  onMenuToggle: () => void
}

export function VonaerHeader({ menuOpen, onMenuToggle }: VonaerHeaderProps) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-xl border-b border-primary/20"
    >
      <div className="px-4 md:px-6 lg:px-12 py-2">
        <div className="flex items-center justify-between relative">
          {/* Left: Hamburger Menu */}
          <div className="flex items-center -ml-2 md:ml-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 sm:h-9 sm:w-9 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground transition-colors touch-manipulation"
              onClick={onMenuToggle}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Center: VONAER Logo */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Check if we're on the main page (has #home element)
                const homeElement = document.querySelector('#home')
                if (homeElement) {
                  // On main page, scroll to home section
                  homeElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                } else {
                  // On service pages, navigate to main page
                  window.location.href = '/'
                }
              }}
            >
              <img
                src="/vonaer.svg"
                alt="VONAER"
                className="h-3 lg:h-5 w-auto"
              />
            </motion.div>
          </div>

          {/* Right: Language & Theme Toggle - Hidden on mobile, shown on desktop */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3">
            <LanguageDropdown />
            <ThemeToggle />
          </div>

          {/* Right spacer for mobile to balance layout */}
          <div className="md:hidden w-10"></div>
        </div>
      </div>
    </motion.header>
  )
}
