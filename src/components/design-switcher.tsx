'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDesign, DesignVariant } from '@/contexts/design-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Palette, LayoutGrid, Columns, AlignJustify, Sparkles } from 'lucide-react'

export function DesignSwitcher() {
  const { design, setDesign } = useDesign()
  const [isOpen, setIsOpen] = useState(false)

  const designs = [
    {
      id: 'original' as DesignVariant,
      name: 'Original',
      description: 'Classic VONAER design with video background',
      icon: Sparkles
    },
    {
      id: 'minimal-1' as DesignVariant,
      name: 'Minimal 1',
      description: 'Floating cards with subtle shadows',
      icon: LayoutGrid
    },
    {
      id: 'minimal-2' as DesignVariant,
      name: 'Minimal 2',
      description: 'Side-by-side asymmetric sections',
      icon: Columns
    },
    {
      id: 'minimal-3' as DesignVariant,
      name: 'Minimal 3',
      description: 'Staggered content with thin borders',
      icon: AlignJustify
    }
  ]

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl"
          size="icon"
        >
          <Palette className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Design Selector Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed bottom-28 right-8 z-50 w-96"
            >
              <Card className="border shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-foreground">Choose Design</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {designs.map((d) => (
                      <motion.button
                        key={d.id}
                        onClick={() => {
                          setDesign(d.id)
                          setIsOpen(false)
                        }}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                          design === d.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50 bg-card'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary">
                            <d.icon className="h-5 w-5 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-bold text-foreground">{d.name}</h4>
                              {design === d.id && (
                                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                                  Active
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{d.description}</p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    Switch between design variations
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
