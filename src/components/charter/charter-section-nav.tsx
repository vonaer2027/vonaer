'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CharteSectionNavProps {
  activeSection: string
  onSectionClick: (sectionId: string) => void
}

// Always English labels
const sections = [
  { id: 'aircraft', label: 'JET & HELICOPTER' },
  { id: 'supercar', label: 'CHAUFFEURED CAR' },
  { id: 'yacht', label: 'SUPER YACHT' },
  { id: 'evtol', label: 'eVTOL' }
]

export function CharterSectionNav({ activeSection, onSectionClick }: CharteSectionNavProps) {

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-[56px] md:top-[72px] z-20 bg-background/95 backdrop-blur-sm border-b border-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 py-3 overflow-x-auto scrollbar-hide">
          {sections.map((section) => {
            const isActive = activeSection === section.id

            return (
              <button
                key={section.id}
                onClick={() => onSectionClick(section.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {section.label}
              </button>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}
