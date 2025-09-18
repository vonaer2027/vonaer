'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { VonaerFooter } from '@/components/vonaer-footer'
import { useState } from 'react'
import { 
  Plane, 
  Users, 
  Gauge, 
  MapPin, 
  Clock,
  ArrowRight,
  Zap
} from 'lucide-react'

const aircraftCategories = [
  {
    id: 'light-jet',
    title: 'Light Jet',
    subtitle: '전용기 - 라이트 제트',
    description: 'Perfect for short to medium-range flights with excellent fuel efficiency and comfortable seating for small groups.',
    icon: Plane,
    specs: {
      passengers: '4-8',
      range: '1,500-2,500 nm',
      speed: '400-500 mph',
      airports: '5,000+'
    },
    features: [
      'Cost-effective for short trips',
      'Access to smaller airports',
      'Quick boarding process',
      'Fuel efficient'
    ],
    image: '/api/placeholder/600/400'
  },
  {
    id: 'mid-jet',
    title: 'Mid Jet',
    subtitle: '전용기 - 미드 제트',
    description: 'Ideal balance of comfort, range, and performance for medium-distance travel with enhanced cabin space.',
    icon: Plane,
    specs: {
      passengers: '6-10',
      range: '2,000-3,500 nm',
      speed: '450-550 mph',
      airports: '3,500+'
    },
    features: [
      'Spacious cabin design',
      'Extended range capabilities',
      'Enhanced comfort features',
      'Reliable performance'
    ],
    image: '/api/placeholder/600/400'
  },
  {
    id: 'heavy-jet',
    title: 'Heavy Jet',
    subtitle: '전용기 - 헤비 제트',
    description: 'Maximum luxury and range for long-distance flights with premium amenities and spacious cabins.',
    icon: Plane,
    specs: {
      passengers: '8-16',
      range: '3,500-7,000 nm',
      speed: '500-600 mph',
      airports: '3,000+'
    },
    features: [
      'Luxury cabin amenities',
      'Long-range capabilities',
      'Premium dining options',
      'Full-size lavatories'
    ],
    image: '/api/placeholder/600/400'
  },
  {
    id: 'ultra-long-haul',
    title: 'Ultra Long Haul',
    subtitle: '전용기 - 울트라 롱홀',
    description: 'Ultimate in luxury and range for intercontinental flights with hotel-like amenities.',
    icon: Plane,
    specs: {
      passengers: '10-19',
      range: '6,000+ nm',
      speed: '550-650 mph',
      airports: '2,500+'
    },
    features: [
      'Bedroom and shower facilities',
      'Conference room setup',
      'Gourmet dining service',
      'Global range capability'
    ],
    image: '/api/placeholder/600/400'
  },
  {
    id: 'vip-airline',
    title: 'VIP Airline',
    subtitle: '전용기 - VIP 항공',
    description: 'Commercial airline VIP services with first-class amenities and priority boarding.',
    icon: Plane,
    specs: {
      passengers: '1-4',
      range: 'Global',
      speed: '500-600 mph',
      airports: 'Major hubs'
    },
    features: [
      'First-class cabin access',
      'Priority boarding',
      'Dedicated check-in',
      'Global network'
    ],
    image: '/api/placeholder/600/400'
  },
  {
    id: 'helicopter',
    title: 'Helicopter',
    subtitle: '헬기',
    description: 'Versatile rotorcraft for short-distance travel, scenic tours, and access to restricted areas.',
    icon: Zap,
    specs: {
      passengers: '2-8',
      range: '200-400 nm',
      speed: '120-180 mph',
      airports: 'Helipads'
    },
    features: [
      'Vertical takeoff/landing',
      'Access to city centers',
      'Scenic flight capabilities',
      'Flexible scheduling'
    ],
    image: '/api/placeholder/600/400'
  }
]

export default function AircraftPage() {
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
              Aircraft Fleet
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our comprehensive fleet of aircraft to meet your specific travel needs
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
                  {/* Image Placeholder */}
                  <div className="relative h-48 bg-muted/30 border-b flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <aircraft.icon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Aircraft Image</p>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold text-foreground">
                        {aircraft.title}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {aircraft.subtitle}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6 flex-1 flex flex-col">
                    <p className="text-muted-foreground leading-relaxed">
                      {aircraft.description}
                    </p>

                    {/* Specifications */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Passengers</p>
                            <p className="text-sm font-medium text-foreground">{aircraft.specs.passengers}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Range</p>
                            <p className="text-sm font-medium text-foreground">{aircraft.specs.range}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Gauge className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Speed</p>
                            <p className="text-sm font-medium text-foreground">{aircraft.specs.speed}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Airports</p>
                            <p className="text-sm font-medium text-foreground">{aircraft.specs.airports}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 flex-1">
                      {aircraft.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-4 h-4 rounded-full border border-border bg-muted/50 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground">{feature}</p>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 group mt-auto">
                      Request Quote
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <Card className="border shadow-lg p-12">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Need Help Choosing?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our aviation experts are here to help you select the perfect aircraft for your specific needs and requirements.
              </p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold">
                Contact Our Experts
              </Button>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <VonaerFooter />
    </div>
  )
}
