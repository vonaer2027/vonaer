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

const vehicleKeys = [
  {
    id: 'maybach',
    image: '/car/Benz.png',
    gradient: 'from-primary/5 to-primary/10'
  },
  {
    id: 'sprinter',
    image: '/car/Sprinter.jpg',
    gradient: 'from-primary/5 to-primary/10'
  }
]

export default function SuperCarPage() {
  const t = useTranslations('supercar')
  const tCommon = useTranslations('flightSearchDialog')
  const [menuOpen, setMenuOpen] = useState(false)
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false)
  const [selectedCar, setSelectedCar] = useState('')

  const handleRequestQuote = (carName: string) => {
    setSelectedCar(carName)
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

          {/* Vehicles Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {vehicleKeys.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -8 }}
              >
                <Card className={`border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br ${vehicle.gradient}`}>
                  {/* Vehicle Image */}
                  <div className="relative h-64 bg-muted/30 overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={t(`vehicles.${vehicle.id}.name`)}
                      className={`w-full h-full ${vehicle.id === 'maybach' ? 'object-contain' : 'object-cover'}`}
                    />
                  </div>

                  <CardContent className="p-8" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                    {/* Vehicle Name */}
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {t(`vehicles.${vehicle.id}.name`)}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      {t(`vehicles.${vehicle.id}.subtitle`)}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      <p className="text-sm font-semibold text-foreground mb-3">{t('featuresLabel')}</p>
                      {[0, 1, 2, 3].map((idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">{t(`vehicles.${vehicle.id}.features.${idx}`)}</p>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      onClick={() => handleRequestQuote(t(`vehicles.${vehicle.id}.name`))}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-semibold"
                    >
                      {t('cta')}
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
        inquiryType="car"
        itemName={selectedCar}
      />
    </div>
  )
}
