'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { VonaerFooter } from '@/components/vonaer-footer'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { 
  Car, 
  Calendar,
  Star,
  Shield
} from 'lucide-react'

export default function SuperCarPage() {
  const t = useTranslations()
  const [menuOpen, setMenuOpen] = useState(false)

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
              {t('supercar.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('supercar.subtitle')}
            </p>
          </motion.div>

          {/* Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <Card className="border shadow-lg p-16">
              <div className="w-24 h-24 rounded-3xl border border-border bg-muted/30 flex items-center justify-center mx-auto mb-8">
                <Car className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {t('supercar.comingSoon.title')}
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t('supercar.comingSoon.description')}
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl border border-border bg-muted/30 flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{t('supercar.comingSoon.features.luxuryFleet.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('supercar.comingSoon.features.luxuryFleet.description')}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl border border-border bg-muted/30 flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{t('supercar.comingSoon.features.professionalService.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('supercar.comingSoon.features.professionalService.description')}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl border border-border bg-muted/30 flex items-center justify-center mx-auto mb-3">
                    <Calendar className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{t('supercar.comingSoon.features.flexibleBooking.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('supercar.comingSoon.features.flexibleBooking.description')}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold">
                  {t('supercar.comingSoon.cta.getNotified')}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-border text-muted-foreground hover:bg-muted/30 hover:text-foreground px-8 py-3 text-lg font-semibold"
                >
                  {t('supercar.comingSoon.cta.contactSales')}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <VonaerFooter />
    </div>
  )
}
