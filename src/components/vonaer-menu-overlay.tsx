'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useLocale } from './locale-provider'
import { Button } from '@/components/ui/button'

interface VonaerMenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function VonaerMenuOverlay({ isOpen, onClose }: VonaerMenuOverlayProps) {
  const t = useTranslations('sidebar')
  const { locale } = useLocale()
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  // Create simplified menu items using new structure
  const menuItems = useMemo(() => [
    { id: 'home', label: t('menuItems.home'), href: '/' },
    { id: 'charter', label: t('menuItems.charter'), href: '/jets' },
    { id: 'aircraft', label: t('menuItems.aircraft'), href: '/aircraft' },
    { id: 'empty-leg', label: t('menuItems.emptyLeg'), href: '/empty' },
    { id: 'membership', label: t('menuItems.membership'), href: '/membership' },
    { id: 'pr', label: t('menuItems.pr'), href: '/pr' },
    { id: 'contact', label: t('menuItems.contact'), anchor: '#contact' }
  ], [t, locale])

  const handleSmoothScroll = (anchor: string) => {
    // Check if we're on the main page (has #home element)
    const homeElement = document.querySelector('#home')
    if (homeElement) {
      // On main page, scroll to the section
      const element = document.querySelector(anchor)
      if (element) {
        // Close menu first to avoid interference
        onClose()
        
        // Wait for menu animation to complete, then scroll
        setTimeout(() => {
          // Use scrollIntoView for better browser compatibility
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          })
        }, 300) // Wait for menu close animation (300ms)
      }
    } else {
      // On other pages, navigate to main page with anchor
      window.location.href = `/${anchor}`
    }
  }

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  return (
    <>
      {/* Overlay Background */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -400 }}
        animate={{ x: isOpen ? 0 : -400 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-0 z-40 h-full w-80 bg-primary/95 backdrop-blur-xl border-r border-primary/20"
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-between items-center p-6 border-b border-primary/20">
            <span className="text-primary-foreground text-sm font-medium tracking-wider">MENU</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              onClick={onClose}
            >
              <motion.div
                animate={{ rotate: isOpen ? 0 : -90 }}
                transition={{ duration: 0.2 }}
              >
                ×
              </motion.div>
            </Button>
          </div>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto py-4">
            {/* Menu Items */}
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="border-b border-primary/20"
              >
                {item.href ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start py-4 px-6 text-primary-foreground hover:bg-primary-foreground/5 hover:text-primary-foreground font-medium tracking-wider text-left"
                    asChild
                  >
                    <a href={item.href} onClick={onClose}>
                      <span>{item.label}</span>
                    </a>
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    className="w-full justify-start py-4 px-6 text-primary-foreground hover:bg-primary-foreground/5 hover:text-primary-foreground font-medium tracking-wider text-left"
                    onClick={() => {
                      if (item.anchor) {
                        handleSmoothScroll(item.anchor)
                      }
                      onClose()
                    }}
                  >
                    <span>{item.label}</span>
                  </Button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="p-6 border-t border-primary/20">
            <div className="text-primary-foreground/50 text-xs space-y-1">
              <p>+82 1600 9064</p>
              <p>business@VONAER.com</p>
              <p className="text-primary-foreground/30 mt-2">
                © 2024 Moviation Inc.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
