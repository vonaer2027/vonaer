'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Plane, 
  Car, 
  Anchor, 
  Zap, 
  Crown,
  Users,
  Phone,
  ChevronRight
} from 'lucide-react'

interface VonaerMenuOverlayProps {
  isOpen: boolean
  onSectionChange: (section: string) => void
  onClose: () => void
}

const menuItems = [
  {
    category: '전용기',
    items: [
      { id: 'light-jet', label: 'Light Jet', icon: Plane },
      { id: 'mid-jet', label: 'Mid Jet', icon: Plane },
      { id: 'heavy-jet', label: 'Heavy Jet', icon: Plane },
      { id: 'ultra-long-haul', label: 'Ultra Long Haul', icon: Plane },
      { id: 'vip-airline', label: 'VIP Airline', icon: Crown },
    ]
  },
  {
    category: '헬기',
    items: [
      { id: 'helicopter', label: 'Helicopter', icon: Zap }
    ]
  },
  {
    category: 'Super Car',
    items: [
      { id: 'super-car', label: 'Super Car', icon: Car }
    ]
  },
  {
    category: 'Super Yacht',
    items: [
      { id: 'super-yacht', label: 'Super Yacht', icon: Anchor }
    ]
  }
]

const otherItems = [
  { id: 'empty-leg', label: 'EMPTY LEG', icon: Plane, href: '/empty' },
  { id: 'about', label: 'ABOUT US', icon: Users },
  { id: 'pr', label: 'PR', icon: Users },
  { id: 'careers', label: 'CAREERS', icon: Users },
  { id: 'contact', label: 'CONTACT', icon: Phone }
]

export function VonaerMenuOverlay({ isOpen, onSectionChange, onClose }: VonaerMenuOverlayProps) {
  const handleSectionChange = (section: string) => {
    onSectionChange(section)
    onClose()
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
            <span className="text-primary-foreground text-sm font-medium tracking-wider">CLOSE</span>
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
            {/* Main Menu Categories */}
            {menuItems.map((category, categoryIndex) => (
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
                >
                  <span>{category.category}</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                
                {/* Subcategory items - hidden by default, can be expanded */}
                <div className="pl-6 pb-2 space-y-1">
                  {category.items.map((item, itemIndex) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + categoryIndex * 0.05 + itemIndex * 0.02 }}
                      className="block w-full text-left py-2 px-4 text-white/70 hover:text-primary-foreground hover:bg-primary-foreground/5 hover:text-primary-foreground text-sm transition-all duration-200"
                      onClick={() => handleSectionChange(item.id)}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Other Menu Items */}
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
                    className="w-full justify-between py-4 px-6 text-primary-foreground hover:bg-primary-foreground/5 hover:text-primary-foreground font-medium tracking-wider text-left"
                    asChild
                  >
                    <a href={item.href}>
                      <span>{item.label}</span>
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    className="w-full justify-between py-4 px-6 text-primary-foreground hover:bg-primary-foreground/5 hover:text-primary-foreground font-medium tracking-wider text-left"
                    onClick={() => handleSectionChange(item.id)}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="p-6 border-t border-primary/20">
            <Button
              variant="outline"
              className="w-full bg-transparent border-primary/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary/50 py-3 font-medium tracking-wide mb-4"
              onClick={() => handleSectionChange('membership')}
            >
              Membership Lounge
            </Button>
            
            <div className="text-primary-foreground/50 text-xs space-y-1">
              <p>+82 1600 9064</p>
              <p>business@VONAER.com</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
