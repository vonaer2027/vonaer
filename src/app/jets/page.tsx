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
  Star,
  Shield
} from 'lucide-react'

const jetCategories = [
  {
    id: 'light-jet',
    title: 'Light Jet',
    subtitle: 'Efficient Short-Range Jets',
    description: 'Perfect for short to medium-range flights with excellent fuel efficiency and comfortable seating for small groups.',
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
    popular: false
  },
  {
    id: 'mid-jet',
    title: 'Mid Jet',
    subtitle: 'Balanced Performance Jets',
    description: 'Ideal balance of comfort, range, and performance for medium-distance travel with enhanced cabin space.',
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
    popular: true
  },
  {
    id: 'heavy-jet',
    title: 'Heavy Jet',
    subtitle: 'Long-Range Luxury Jets',
    description: 'Maximum luxury and range for long-distance flights with premium amenities and spacious cabins.',
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
    popular: false
  },
  {
    id: 'ultra-long-haul',
    title: 'Ultra Long Haul',
    subtitle: 'Intercontinental Jets',
    description: 'Ultimate in luxury and range for intercontinental flights with hotel-like amenities.',
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
    popular: false
  },
  {
    id: 'vip-airline',
    title: 'VIP Airline',
    subtitle: 'Premium Airline Services',
    description: 'Commercial airline VIP services with first-class amenities and priority boarding.',
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
    popular: false
  }
]

export default function JetsPage() {
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
              Private Jets
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience luxury, comfort, and efficiency with our comprehensive private jet fleet
            </p>
          </motion.div>

          {/* Jets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {jetCategories.map((jet, index) => (
              <motion.div
                key={jet.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative"
              >
                {jet.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <Card className={`border shadow-lg hover:shadow-xl transition-all duration-300 h-full ${jet.popular ? 'ring-2 ring-primary' : ''}`}>
                  {/* Image Placeholder */}
                  <div className="relative h-48 bg-muted/30 border-b flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Plane className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Aircraft Image</p>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground">
                      {jet.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{jet.subtitle}</p>
                  </CardHeader>

                  <CardContent className="space-y-6 flex-1 flex flex-col">
                    <p className="text-muted-foreground leading-relaxed">
                      {jet.description}
                    </p>

                    {/* Specifications */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Passengers</p>
                            <p className="text-sm font-medium text-foreground">{jet.specs.passengers}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Range</p>
                            <p className="text-sm font-medium text-foreground">{jet.specs.range}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Gauge className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Speed</p>
                            <p className="text-sm font-medium text-foreground">{jet.specs.speed}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Airports</p>
                            <p className="text-sm font-medium text-foreground">{jet.specs.airports}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 flex-1">
                      {jet.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-4 h-4 rounded-full border border-border bg-muted/50 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground">{feature}</p>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button className={`w-full ${jet.popular 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'border border-border bg-muted/30 text-foreground hover:bg-muted/50'
                    } transition-all duration-300 group mt-auto`}>
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
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <Card className="border shadow-lg p-12">
              <div className="w-16 h-16 rounded-2xl border border-border bg-muted/30 flex items-center justify-center mx-auto mb-8">
                <Shield className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Safety & Certification
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                All VONAER aircraft meet the highest safety standards and are operated by certified professionals with extensive experience.
              </p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold">
                Learn About Safety
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
