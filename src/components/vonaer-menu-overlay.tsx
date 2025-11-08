'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageDropdown } from '@/components/language-dropdown'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface VonaerMenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function VonaerMenuOverlay({ isOpen, onClose }: VonaerMenuOverlayProps) {
  const [charterExpanded, setCharterExpanded] = useState(false)

  // Charter sub-items (accordion items)
  const charterSubItems = useMemo(() => [
    { id: 'evtol', label: 'E-VTOL', href: '/evtol' },
    { id: 'jet-helicopter', label: 'JET & HELICOPTER', href: '/aircraft' },
    { id: 'supercar', label: 'CHAUFFEURED CAR', href: '/supercar' },
    { id: 'super-yacht', label: 'SUPER YACHT', href: '/yacht' }
  ], [])

  // Main menu items (Charter removed, replaced with accordion)
  const menuItems = useMemo(() => [
    { id: 'home', label: 'HOME', href: '/' },
    { id: 'empty-leg', label: 'EMPTY LEG', href: '/empty' },
    { id: 'pr', label: 'PR', href: '/pr' },
    { id: 'about', label: 'ABOUT US', href: '/about' },
    { id: 'contact', label: 'CONTACT', href: '/contact' }
  ], [])

  // Membership item shown separately at bottom
  const membershipItem = { id: 'membership', label: 'MEMBER\'S LOUNGE', href: '/membership' }

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
            {/* Home */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="border-b border-primary/20"
            >
              <Button
                variant="ghost"
                className="w-full justify-start py-4 px-6 text-primary-foreground hover:bg-primary-foreground/5 hover:text-primary-foreground font-medium tracking-wider text-left"
                asChild
              >
                <Link href="/" onClick={onClose}>
                  <span>HOME</span>
                </Link>
              </Button>
            </motion.div>

            {/* Charter Accordion */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="border-b border-primary/20"
            >
              <Button
                variant="ghost"
                className="w-full justify-start py-4 px-6 text-primary-foreground hover:bg-primary-foreground/5 hover:text-primary-foreground font-medium tracking-wider text-left relative"
                onClick={() => setCharterExpanded(!charterExpanded)}
              >
                <span>CHARTER</span>
                <span className="absolute right-6">
                  {charterExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </span>
              </Button>

              {/* Charter Sub-items */}
              <AnimatePresence>
                {charterExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden bg-primary-foreground/5"
                  >
                    {charterSubItems.map((subItem, subIndex) => (
                      <Button
                        key={subItem.id}
                        variant="ghost"
                        className="w-full justify-start py-3 pl-12 pr-6 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground font-normal tracking-wide text-left text-sm"
                        asChild
                      >
                        <Link href={subItem.href} onClick={onClose}>
                          <span>{subItem.label}</span>
                        </Link>
                      </Button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Remaining Menu Items (Empty Leg, PR, About Us, Contact) */}
            {menuItems.slice(1).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="border-b border-primary/20"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start py-4 px-6 text-primary-foreground hover:bg-primary-foreground/5 hover:text-primary-foreground font-medium tracking-wider text-left"
                  asChild
                >
                  <Link href={item.href} onClick={onClose}>
                    <span>{item.label}</span>
                  </Link>
                </Button>
              </motion.div>
            ))}

            {/* Membership Only Section - Distinguished from other menu items */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="border-b border-primary/20 mt-4"
            >
              <Button
                variant="ghost"
                className="w-full justify-start py-4 px-6 text-primary-foreground hover:bg-primary/10 hover:text-primary-foreground font-medium tracking-wider text-left border-t-2 border-primary/40 bg-primary/5"
                asChild
              >
                <Link href={membershipItem.href} onClick={onClose}>
                  <span>{membershipItem.label}</span>
                </Link>
              </Button>
            </motion.div>

            {/* Settings Section - Language & Theme Toggle (Mobile Only) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 px-6 md:hidden"
            >
              <div className="border-t border-primary/20 pt-4">
                <span className="text-primary-foreground text-xs font-medium tracking-wider mb-3 block">SETTINGS</span>
                <div className="flex items-center gap-3">
                  <LanguageDropdown />
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
