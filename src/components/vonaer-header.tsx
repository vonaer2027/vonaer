'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Menu, X, Phone } from 'lucide-react'

interface VonaerHeaderProps {
  menuOpen: boolean
  onMenuToggle: () => void
  currentSection: string
  onSectionChange?: (section: string) => void
}

export function VonaerHeader({ menuOpen, onMenuToggle, currentSection, onSectionChange }: VonaerHeaderProps) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-xl border-b border-primary/20"
    >
      <div className="px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Hamburger Menu & Empty Leg */}
          <div className="flex items-center gap-4 lg:gap-8">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground transition-colors"
              onClick={onMenuToggle}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <Button
              variant="ghost"
              className="hidden lg:flex text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground text-sm font-medium tracking-wide uppercase"
              asChild
            >
              <a href="/empty">Empty Leg</a>
            </Button>
          </div>


          {/* Center: VONAER Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <motion.div
              className="cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h1 className="text-xl lg:text-2xl font-bold tracking-widest text-primary-foreground">
                VONAER
              </h1>
            </motion.div>
          </div>

          {/* Right: Contact & CTA */}
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="hidden lg:flex items-center gap-2 text-primary-foreground text-sm">
              <Phone className="h-4 w-4" />
              <span>+82 1600 9064</span>
            </div>
            <Button
              size="sm"
              className="bg-white text-black hover:bg-gray-100 font-semibold text-xs lg:text-sm px-3 py-2 lg:px-6 lg:py-3 tracking-wide shadow-lg border-2 border-white hover:border-gray-200 transition-all duration-300 whitespace-nowrap"
              asChild
            >
              <a href="/empty">
                <span className="hidden sm:inline">REQUEST A CHARTER</span>
                <span className="sm:hidden">CHARTER</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
