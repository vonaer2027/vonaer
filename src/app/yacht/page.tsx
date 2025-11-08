'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { VonaerFooter } from '@/components/vonaer-footer'
import { InquiryDialog } from '@/components/inquiry-dialog'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import {
  Users,
  Anchor
} from 'lucide-react'

// Yacht data keys for translation lookup
const yachtKeys = [
  { id: 'energy', image: '/yacht/Yacht1.png', gradient: 'from-primary/5 to-primary/10' },
  { id: 'axioma', image: '/yacht/Yacht2.png', gradient: 'from-primary/5 to-primary/10' },
  { id: 'carpeDiem', image: '/yacht/Yacht3.png', gradient: 'from-primary/5 to-primary/10' },
  { id: 'afterYou', image: '/yacht/Yacht4.png', gradient: 'from-primary/5 to-primary/10' }
]

export default function YachtPage() {
  const t = useTranslations('yacht')
  const tCommon = useTranslations('flightSearchDialog')
  const [menuOpen, setMenuOpen] = useState(false)
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false)
  const [selectedYacht, setSelectedYacht] = useState('')

  const handleRequestQuote = (yachtName: string) => {
    setSelectedYacht(yachtName)
    setInquiryDialogOpen(true)
  }

  const handleInquirySuccess = () => {
    setInquiryDialogOpen(false)
    toast.success(tCommon('success.submitted'))
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <VonaerHeader
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
      />

      {/* Menu Overlay */}
      <VonaerMenuOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      {/* Main Content */}
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Yachts Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {yachtKeys.map((yacht, index) => (
              <motion.div
                key={yacht.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -8 }}
              >
                <Card className={`border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br ${yacht.gradient}`}>
                  {/* Yacht Image */}
                  <div className="relative h-64 bg-muted/30 overflow-hidden">
                    <img
                      src={yacht.image}
                      alt={t(`yachts.${yacht.id}.name`)}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardContent className="p-8">
                    {/* Yacht Name */}
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {t(`yachts.${yacht.id}.name`)}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      {t(`yachts.${yacht.id}.builder`)}
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      {t('specs.year')}: {t(`yachts.${yacht.id}.year`)}
                    </p>

                    {/* Yacht Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                        <Anchor className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{t('specs.length')}</p>
                          <p className="text-sm text-muted-foreground">{t(`yachts.${yacht.id}.length`)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                        <Users className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{t('specs.guests')}</p>
                          <p className="text-sm text-muted-foreground">{t(`yachts.${yacht.id}.guests`)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                        {t(`yachts.${yacht.id}.description`)}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Button
                      onClick={() => handleRequestQuote(t(`yachts.${yacht.id}.name`))}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-semibold"
                    >
                      {t('cta.requestQuote')}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <VonaerFooter />

      {/* Inquiry Dialog */}
      <InquiryDialog
        open={inquiryDialogOpen}
        onOpenChange={setInquiryDialogOpen}
        onSuccess={handleInquirySuccess}
        inquiryType="yacht"
        itemName={selectedYacht}
      />
    </div>
  )
}
