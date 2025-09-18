'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Plane, 
  Car, 
  Anchor, 
  Zap, 
  Users,
  Phone,
  ChevronRight,
  Home,
  Star
} from 'lucide-react'

interface VonaerMenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  {
    category: 'SERVICES',
    items: [
      { id: 'jets', label: 'Private Jets', icon: Plane, href: '/jets' },
      { id: 'helicopter', label: 'Helicopter', icon: Zap, href: '/helicopter' },
      { id: 'supercar', label: 'Super Car', icon: Car, href: '/supercar' },
      { id: 'superyacht', label: 'Super Yacht', icon: Anchor, href: '/superyacht' },
    ]
  }
]

const otherItems = [
  { id: 'home', label: 'HOME', icon: Home, anchor: '#home' },
  { id: 'about', label: 'ABOUT US', icon: Users, anchor: '#about' },
  { id: 'membership', label: 'MEMBERSHIP', icon: Star, anchor: '#membership' },
  { id: 'empty-leg', label: 'EMPTY LEG', icon: Plane, href: '/empty' },
  { id: 'contact', label: 'CONTACT', icon: Phone, anchor: '#contact' }
]

export function VonaerMenuOverlay({ isOpen, onClose }: VonaerMenuOverlayProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

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
            {/* Services Section */}
            {menuItems.map((category, categoryIndex) => {
              const isExpanded = expandedCategories.has(category.category)
              
              return (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + categoryIndex * 0.05 }}
                  className="border-b border-primary/20"
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-between py-4 px-6 text-primary-foreground hover:bg-primary-foreground/5 hover:text-primary-foreground font-medium tracking-wider text-left"
                    onClick={() => toggleCategory(category.category)}
                  >
                    <span>{category.category}</span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.div>
                  </Button>
                  
                  {/* Services items - expandable/collapsible */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-6 pb-2 space-y-1">
                          {category.items.map((item, itemIndex) => (
                            <motion.a
                              key={item.id}
                              href={item.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: itemIndex * 0.05 }}
                              className="flex items-center gap-3 w-full text-left py-2 px-4 text-white/70 hover:text-primary-foreground hover:bg-primary-foreground/5 text-sm transition-all duration-200 rounded-md"
                              onClick={onClose}
                            >
                              <item.icon className="h-4 w-4 flex-shrink-0" />
                              {item.label}
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}

            {/* Other Menu Items (without arrows) */}
            {otherItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="border-b border-primary/20"
              >
                {item.href ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start py-4 px-6 text-primary-foreground hover:bg-primary-foreground/5 hover:text-primary-foreground font-medium tracking-wider text-left"
                    asChild
                  >
                    <a href={item.href}>
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </div>
                    </a>
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    className="w-full justify-start py-4 px-6 text-primary-foreground hover:bg-primary-foreground/5 hover:text-primary-foreground font-medium tracking-wider text-left"
                    onClick={() => handleSmoothScroll(item.anchor!)}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
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
