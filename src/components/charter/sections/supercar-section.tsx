'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

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

interface SupercarSectionProps {
  onRequestQuote: (carName: string) => void
}

export function SupercarSection({ onRequestQuote }: SupercarSectionProps) {
  const t = useTranslations('supercar')

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
          CHAUFFEURED CAR
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
      </motion.div>

      {/* Vehicles Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {vehicleKeys.map((vehicle, index) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                  onClick={() => onRequestQuote(t(`vehicles.${vehicle.id}.name`))}
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
  )
}
