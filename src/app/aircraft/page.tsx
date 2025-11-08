'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { VonaerFooter } from '@/components/vonaer-footer'
import { InquiryDialog } from '@/components/inquiry-dialog'
import { Toaster } from 'sonner'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  Plane,
  Users,
  Gauge,
  MapPin,
  Clock,
  ArrowRight,
  Zap
} from 'lucide-react'

export default function AircraftPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false)
  const [selectedAircraft, setSelectedAircraft] = useState<string>('')
  const t = useTranslations('aircraft')

  // Define aircraft categories with translation keys
  const aircraftCategories = [
    {
      id: 'light-jet',
      titleKey: 'categories.lightJet.title',
      subtitleKey: 'categories.lightJet.subtitle',
      descriptionKey: 'categories.lightJet.description',
      icon: Plane,
      mostPopular: false,
      specs: {
        passengers: '4-8',
        range: '1,500-2,500 nm',
        speed: '400-500 mph',
        airports: '5,000+'
      },
      featuresKey: 'categories.lightJet.features',
      image: '/jet/Light Jet 1.webp'
    },
    {
      id: 'heavy-jet',
      titleKey: 'categories.heavyJet.title',
      subtitleKey: 'categories.heavyJet.subtitle',
      descriptionKey: 'categories.heavyJet.description',
      icon: Plane,
      mostPopular: true,
      specs: {
        passengers: '8-16',
        range: '3,500-7,000 nm',
        speed: '500-600 mph',
        airports: '3,000+'
      },
      featuresKey: 'categories.heavyJet.features',
      image: '/jet/Heavy Jet 1.jpg'
    },
    {
      id: 'mid-jet',
      titleKey: 'categories.midJet.title',
      subtitleKey: 'categories.midJet.subtitle',
      descriptionKey: 'categories.midJet.description',
      icon: Plane,
      mostPopular: false,
      specs: {
        passengers: '6-10',
        range: '2,000-3,500 nm',
        speed: '450-550 mph',
        airports: '3,500+'
      },
      featuresKey: 'categories.midJet.features',
      image: '/jet/Mid Jet.jpg'
    },
    {
      id: 'ultra-long-haul',
      titleKey: 'categories.ultraLongHaul.title',
      subtitleKey: 'categories.ultraLongHaul.subtitle',
      descriptionKey: 'categories.ultraLongHaul.description',
      icon: Plane,
      mostPopular: false,
      specs: {
        passengers: '10-19',
        range: '6,000+ nm',
        speed: '550-650 mph',
        airports: '2,500+'
      },
      featuresKey: 'categories.ultraLongHaul.features',
      image: '/jet/Ultra Long.jpg'
    },
    {
      id: 'vip-airline',
      titleKey: 'categories.vipAirline.title',
      subtitleKey: 'categories.vipAirline.subtitle',
      descriptionKey: 'categories.vipAirline.description',
      icon: Plane,
      mostPopular: false,
      specs: {
        passengers: '1-4',
        range: 'Global',
        speed: '500-600 mph',
        airports: 'Major hubs'
      },
      featuresKey: 'categories.vipAirline.features',
      image: '/jet/boeing777x-hero-960x600.jpeg'
    },
    {
      id: 'helicopter',
      titleKey: 'categories.helicopter.title',
      subtitleKey: 'categories.helicopter.subtitle',
      descriptionKey: 'categories.helicopter.description',
      icon: Zap,
      mostPopular: false,
      specs: {
        passengers: '2-8',
        range: '200-400 nm',
        speed: '120-180 mph',
        airports: 'Helipads'
      },
      featuresKey: 'categories.helicopter.features',
      image: '/jet/helicopter.png'
    }
  ]

  const handleRequestQuote = (aircraftTitle: string) => {
    setSelectedAircraft(aircraftTitle)
    setInquiryDialogOpen(true)
  }

  const handleInquirySuccess = () => {
    setInquiryDialogOpen(false)
    setSelectedAircraft('')
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
            <p className="text-xl text-muted-foreground">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Aircraft Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {aircraftCategories.map((aircraft, index) => (
              <motion.div
                key={aircraft.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="border shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  {/* Aircraft Image */}
                  <div className="relative h-48 bg-muted/30 border-b overflow-hidden">
                    {aircraft.mostPopular && (
                      <Badge className="absolute top-4 right-4 bg-white text-black font-bold text-base px-4 py-2 shadow-lg shadow-black/30 z-10 border-2 border-black/10">
                        Most Popular
                      </Badge>
                    )}
                    <Image
                      src={aircraft.image}
                      alt={t(aircraft.titleKey)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground">
                      {t(aircraft.titleKey)}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                      {t(aircraft.subtitleKey)}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-6 flex-1 flex flex-col">
                    <p className="text-muted-foreground leading-relaxed">
                      {t(aircraft.descriptionKey)}
                    </p>

                    {/* Specifications */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">{t('specs.passengers')}</p>
                            <p className="text-sm font-medium text-foreground">{aircraft.specs.passengers}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">{t('specs.range')}</p>
                            <p className="text-sm font-medium text-foreground">{aircraft.specs.range}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Gauge className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">{t('specs.speed')}</p>
                            <p className="text-sm font-medium text-foreground">{aircraft.specs.speed}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">{t('specs.airports')}</p>
                            <p className="text-sm font-medium text-foreground">{aircraft.specs.airports}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 flex-1">
                      {[0, 1, 2, 3].map((featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-4 h-4 rounded-full border border-border bg-muted/50 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground">{t(`${aircraft.featuresKey}.${featureIndex}`)}</p>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      onClick={() => handleRequestQuote(t(aircraft.titleKey))}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 group mt-auto"
                    >
                      {t('cta.requestQuote')}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
        inquiryType="aircraft"
        itemName={selectedAircraft}
      />

      <Toaster />
    </div>
  )
}
