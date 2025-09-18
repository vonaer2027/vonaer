'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  Package, 
  Car, 
  Coffee, 
  Crown, 
  MapPin,
  ArrowRight
} from 'lucide-react'

export function VonaerAncillarySection() {
  const t = useTranslations()
  
  const ancillaryServices = [
    {
      id: t('ancillary.services.0.id'),
      title: t('ancillary.services.0.title'),
      description: t('ancillary.services.0.description'),
      icon: Shield,
      features: [
        t('ancillary.services.0.features.0'),
        t('ancillary.services.0.features.1'),
        t('ancillary.services.0.features.2'),
        t('ancillary.services.0.features.3')
      ]
    },
    {
      id: t('ancillary.services.1.id'),
      title: t('ancillary.services.1.title'),
      description: t('ancillary.services.1.description'),
      icon: Package,
      features: [
        t('ancillary.services.1.features.0'),
        t('ancillary.services.1.features.1'),
        t('ancillary.services.1.features.2'),
        t('ancillary.services.1.features.3')
      ]
    },
    {
      id: t('ancillary.services.2.id'),
      title: t('ancillary.services.2.title'),
      description: t('ancillary.services.2.description'),
      icon: MapPin,
      features: [
        t('ancillary.services.2.features.0'),
        t('ancillary.services.2.features.1'),
        t('ancillary.services.2.features.2'),
        t('ancillary.services.2.features.3')
      ]
    },
    {
      id: t('ancillary.services.3.id'),
      title: t('ancillary.services.3.title'),
      description: t('ancillary.services.3.description'),
      icon: Coffee,
      features: [
        t('ancillary.services.3.features.0'),
        t('ancillary.services.3.features.1'),
        t('ancillary.services.3.features.2'),
        t('ancillary.services.3.features.3')
      ]
    },
    {
      id: t('ancillary.services.4.id'),
      title: t('ancillary.services.4.title'),
      description: t('ancillary.services.4.description'),
      icon: Crown,
      features: [
        t('ancillary.services.4.features.0'),
        t('ancillary.services.4.features.1'),
        t('ancillary.services.4.features.2'),
        t('ancillary.services.4.features.3')
      ]
    },
    {
      id: t('ancillary.services.5.id'),
      title: t('ancillary.services.5.title'),
      description: t('ancillary.services.5.description'),
      icon: Car,
      features: [
        t('ancillary.services.5.features.0'),
        t('ancillary.services.5.features.1'),
        t('ancillary.services.5.features.2'),
        t('ancillary.services.5.features.3')
      ]
    }
  ]
  return (
    <section id="ancillary" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('ancillary.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('ancillary.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {ancillaryServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl border border-border bg-muted/30 flex items-center justify-center mb-8">
                    <service.icon className="h-8 w-8 text-muted-foreground" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8 flex-1">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full border border-border bg-muted/50 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{feature}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className="w-full border border-border bg-muted/30 text-foreground hover:bg-muted/50 transition-all duration-300 group"
                  >
                    {t('common.learnMore')}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
