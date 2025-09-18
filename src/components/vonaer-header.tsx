'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { FontToggle } from '@/components/font-toggle'
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
      <div className="px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Hamburger Menu */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground transition-colors"
              onClick={onMenuToggle}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Center: VONAER Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
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
              <h1 className="text-xl lg:text-2xl font-bold tracking-widest text-primary-foreground">
                VONAER
              </h1>
            </motion.div>
          </div>

          {/* Right: Language, Font & Theme Toggle */}
          <div className="flex items-center gap-3">
            <LanguageDropdown />
            <FontToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  )
}
