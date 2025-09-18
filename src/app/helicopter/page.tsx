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
  Zap, 
  Users, 
  Gauge, 
  MapPin, 
  Clock,
  ArrowRight,
  Mountain,
  Building,
  Shield
} from 'lucide-react'

const helicopterServices = [
  {
    id: 'von-routine',
    title: 'VON Routine',
    subtitle: 'Regular Shuttle Service',
    description: 'Fast and comfortable air shuttle service between Gangnam and Incheon Airport in just 20 minutes.',
    route: 'Gangnam ↔ Incheon Airport',
    duration: '20 minutes',
    frequency: 'Multiple daily flights',
    features: [
      'Express airport transfers',
      'Premium helicopter fleet',
      'Professional pilots',
      'Weather monitoring'
    ],
    popular: true
  },
  {
    id: 'von-tour',
    title: 'VON Tour',
    subtitle: 'Scenic Helicopter Tours',
    description: 'Scenic helicopter tours offering breathtaking aerial views of Korea\'s most beautiful landmarks.',
    route: 'Various scenic routes',
    duration: '30-90 minutes',
    frequency: 'On-demand',
    features: [
      'Scenic route options',
      'Professional tour guides',
      'Photography opportunities',
      'Flexible scheduling'
    ],
    popular: false
  },
  {
    id: 'von-private',
    title: 'VON Private Helicopter',
    subtitle: 'Private Helicopter Charter',
    description: 'Custom helicopter charter service with flexible destinations and personalized flight experience.',
    route: 'Custom destinations',
    duration: 'As needed',
    frequency: 'On-demand',
    features: [
      'Custom flight planning',
      'VIP service',
      'Flexible timing',
      'Premium amenities'
    ],
    popular: false
  }
]

const tourRoutes = [
  {
    name: 'GwanAk Mountain Tour',
    route: 'COEX → Jamsil → Yangjae Forest → Seoul Amusement Park → GwanAk Mountain',
    duration: '45 minutes',
    highlights: ['Autumn Leaves', 'Spring Flowers', 'Seoul Amusement Park'],
    icon: Mountain
  },
  {
    name: 'Han River Tour',
    route: 'COEX → Lotte Tower → Seokchon Lake → Olympic Park → Amsa Heritage → Namyangju',
    duration: '60 minutes',
    highlights: ['Seoul Skyline', 'Cherry Blossoms', 'Olympic Park'],
    icon: Building
  },
  {
    name: 'BukHan Mountain Tour',
    route: 'COEX → Lotte Tower → Seokchon Lake → BukHan Mountain → Dobong Mountain',
    duration: '75 minutes',
    highlights: ['National Park', 'Rocky Mountains', 'Mountain Views'],
    icon: Mountain
  },
  {
    name: 'DMZ Tour',
    route: 'Historical landmarks and North Korea views from above the DMZ',
    duration: '90 minutes',
    highlights: ['Historical Sites', 'DMZ Views', 'Unique Experience'],
    icon: Shield
  }
]

export default function HelicopterPage() {
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
              Helicopter Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Versatile helicopter services for transportation, tours, and unique aerial experiences
            </p>
          </motion.div>

          {/* Helicopter Services */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {helicopterServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative"
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <Card className={`border shadow-lg hover:shadow-xl transition-all duration-300 h-full ${service.popular ? 'ring-2 ring-primary' : ''}`}>
                  {/* Image Placeholder */}
                  <div className="relative h-48 bg-muted/30 border-b flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Zap className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Helicopter Image</p>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground">
                      {service.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{service.subtitle}</p>
                  </CardHeader>

                  <CardContent className="space-y-6 flex-1 flex flex-col">
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>

                    {/* Service Details */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Route</span>
                        <span className="text-sm font-medium text-foreground">{service.route}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Duration</span>
                        <span className="text-sm font-medium text-foreground">{service.duration}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Frequency</span>
                        <span className="text-sm font-medium text-foreground">{service.frequency}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 flex-1">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-4 h-4 rounded-full border border-border bg-muted/50 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground">{feature}</p>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button className={`w-full ${service.popular 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'border border-border bg-muted/30 text-foreground hover:bg-muted/50'
                    } transition-all duration-300 group mt-auto`}>
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Tour Routes */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Scenic Tour Routes
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tourRoutes.map((tour, index) => (
                <Card key={index} className="border shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl border border-border bg-muted/30 flex items-center justify-center">
                        <tour.icon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{tour.name}</h3>
                        <p className="text-sm text-muted-foreground">{tour.duration}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{tour.route}</p>
                    <div className="flex flex-wrap gap-2">
                      {tour.highlights.map((highlight, highlightIndex) => (
                        <Badge key={highlightIndex} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Usage Guide */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="border shadow-lg p-12 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                How to Book
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Booking a helicopter with VONAER is simple and convenient through our mobile app or website.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold">
                  Download App
                </Button>
                <Button 
                  variant="outline" 
                  className="border-border text-muted-foreground hover:bg-muted/30 hover:text-foreground px-8 py-3 text-lg font-semibold"
                >
                  Book Online
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
