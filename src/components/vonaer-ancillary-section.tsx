'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  Package, 
  Car, 
  Coffee, 
  Crown, 
  MapPin,
  ArrowRight,
  Star
} from 'lucide-react'

const ancillaryServices = [
  {
    id: 'von-escort',
    title: 'VON Escort',
    description: 'Distinguished airport escort service for a true VIP experience',
    icon: Shield,
    features: [
      'Personal escort through airport',
      'Fast-track security and immigration',
      'VIP lounge access',
      'Baggage assistance'
    ]
  },
  {
    id: 'von-carry',
    title: 'VON Carry',
    description: 'Premium baggage delivery service that delivers your luggage to your final destination',
    icon: Package,
    features: [
      'Door-to-door luggage delivery',
      'Real-time tracking',
      'Insurance coverage',
      'White-glove handling'
    ]
  },
  {
    id: 'von-connect',
    title: 'VON Connect',
    description: 'Car service between Heliport and Airport Terminal',
    icon: MapPin,
    features: [
      'Seamless terminal transfers',
      'Professional chauffeurs',
      'Luxury vehicle fleet',
      'Real-time coordination'
    ]
  },
  {
    id: 'von-lounge',
    title: 'VON Lounge',
    description: 'Exclusive Lounge for VON members',
    icon: Coffee,
    features: [
      'Private lounge access',
      'Premium dining options',
      'Business facilities',
      'Concierge services'
    ]
  },
  {
    id: 'von-limousine',
    title: 'VON Limousine',
    description: 'VON Limousine offers VIP black car service for first & last mile.',
    icon: Crown,
    features: [
      'Luxury limousine fleet',
      'Professional chauffeurs',
      'First and last mile service',
      'Premium amenities'
    ]
  },
  {
    id: 'von-rentcar',
    title: 'VON RentCar',
    description: 'Rent-a-car service that allows our customers to drive to final destination.',
    icon: Car,
    features: [
      'Premium vehicle selection',
      'Flexible rental terms',
      'Airport delivery',
      '24/7 support'
    ]
  }
]

export function VonaerAncillarySection() {
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
            Ancillary Service
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enhance VONAER service with our comprehensive ancillary services
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
                    Learn More
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
