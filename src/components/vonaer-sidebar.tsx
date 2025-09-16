'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Menu, 
  X, 
  Plane, 
  Car, 
  Anchor, 
  Zap, 
  Crown,
  Users,
  Phone,
  LogIn
} from 'lucide-react'

interface VonaerSidebarProps {
  currentSection: string
  onSectionChange: (section: string) => void
  isOpen: boolean
  onToggle: () => void
}

const handleSectionChange = (section: string, onSectionChange: (section: string) => void, onToggle: () => void) => {
  onSectionChange(section)
  // Close sidebar on mobile after selection
  if (window.innerWidth < 1024) {
    onToggle()
  }
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
  { id: 'about', label: 'ABOUT US', icon: Users },
  { id: 'pr', label: 'PR', icon: Users },
  { id: 'careers', label: 'CAREERS', icon: Users },
  { id: 'contact', label: 'CONTACT', icon: Phone }
]

export function VonaerSidebar({ currentSection, onSectionChange, isOpen, onToggle }: VonaerSidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <>
      {/* Menu Toggle Button - Always Visible */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-20 left-6 z-50 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-foreground hover:bg-primary/30 hover:border-primary/50 shadow-lg transition-all duration-200"
        onClick={onToggle}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed left-0 top-0 z-40 h-full w-80 bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border"
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="p-8 border-b border-sidebar-border">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="cursor-pointer"
              onClick={() => handleSectionChange('home', onSectionChange, onToggle)}
            >
              <h1 className="text-2xl font-bold tracking-wider text-sidebar-foreground">
                VONAER
              </h1>
              <p className="text-xs text-sidebar-foreground/60 mt-1 tracking-wide">
                URBAN AIR MOBILITY
              </p>
              <p className="text-xs text-sidebar-foreground/40 mt-1">
                Korea's First Air Mobility Platform
              </p>
            </motion.div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-6">
            <div className="space-y-8 px-6">
              {menuItems.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + categoryIndex * 0.1 }}
                >
                  <h3 className="text-xs uppercase tracking-widest text-sidebar-foreground/50 font-medium mb-4">
                    {category.category}
                  </h3>
                  <div className="space-y-2">
                    {category.items.map((item) => {
                      const Icon = item.icon
                      const isActive = currentSection === item.id
                      const isHovered = hoveredItem === item.id

                      return (
                        <motion.button
                          key={item.id}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                            isActive 
                              ? 'bg-sidebar-primary/20 text-sidebar-primary-foreground border border-sidebar-primary/30' 
                              : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                          }`}
                          onClick={() => handleSectionChange(item.id, onSectionChange, onToggle)}
                          onMouseEnter={() => setHoveredItem(item.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Icon className={`h-4 w-4 transition-colors ${
                            isActive || isHovered ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground/50'
                          }`} />
                          <span className="font-medium tracking-wide">
                            {item.label}
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              ))}

              {/* Divider */}
              <div className="border-t border-sidebar-border my-8" />

              {/* Other Menu Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-2"
              >
                {otherItems.map((item) => {
                  const Icon = item.icon
                  const isActive = currentSection === item.id
                  const isHovered = hoveredItem === item.id

                  return (
                    <motion.button
                      key={item.id}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        isActive 
                          ? 'bg-sidebar-primary/20 text-sidebar-primary-foreground border border-sidebar-primary/30' 
                          : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                      }`}
                      onClick={() => handleSectionChange(item.id, onSectionChange, onToggle)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className={`h-4 w-4 transition-colors ${
                        isActive || isHovered ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground/50'
                      }`} />
                      <span className="font-medium tracking-wide">
                        {item.label}
                      </span>
                    </motion.button>
                  )
                })}
              </motion.div>
            </div>
          </div>

          {/* Membership Lounge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="p-6 border-t border-white/10"
          >
            <Button
              variant="outline"
              className="w-full bg-transparent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/50 hover:border-sidebar-primary/50 transition-all duration-200"
              onClick={() => handleSectionChange('membership', onSectionChange, onToggle)}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Membership Lounge
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Overlay for mobile */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  )
}
