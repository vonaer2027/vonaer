'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Plane, 
  Clock, 
  Crown, 
  MapPin, 
  Star,
  ArrowRight,
  Shield,
  Zap,
  Heart
} from 'lucide-react'

const services = [
  {
    id: 'von-private',
    title: 'VON Private',
    subtitle: 'VIP service for those who value their time over everything else',
    description: 'VON Private offers a VIP charter service with flexibility to specify your destination and time for a seamless travel experience.',
    features: [
      'Pick your departure and destination at your convenience',
      'No initiation fee. Purchase credits and make reservation through app',
      'Airport escort, VON Carry, and Von Lounge service'
    ],
    icon: Crown,
    image: '/api/placeholder/600/400'
  },
  {
    id: 'von-routine',
    title: 'VON Routine',
    subtitle: 'From Gangnam to ICN in 20 minutes',
    description: 'VON Routine offers fast and comfortable air shuttle service between Gangnam and Incheon Airport. Simply make reservation through VONAER app.',
    features: [
      'Experience next level of comfort from Gangnam to Incheon Airport',
      'Convenient and fast transportation',
      'Helicopter charter service available'
    ],
    icon: Clock,
    image: '/api/placeholder/600/400'
  },
  {
    id: 'von-tour',
    title: 'VON Tour',
    subtitle: 'Enjoy a breath taking sky view of Korea',
    description: 'Experience Korea like never before with our scenic helicopter tours. Multiple tour packages available.',
    features: [
      'GwanAk Mountain Tour - Autumn Leaves & Spring Flower Tours',
      'Han River Tour - Seoul Skyline & Cherry Blossom Tours',
      'DMZ Tour - Historical landmarks only available in South Korea'
    ],
    icon: Heart,
    image: '/api/placeholder/600/400'
  }
]

const tourPackages = [
  {
    name: 'GwanAk Mountain Tour',
    route: 'COEX → Jamsil → Yangjae Forest → Seoul Amusement Park → GwanAk Mountain',
    tags: ['#Autumn Leaves Tour', '#Spring Flower Tour', '#Seoul Amusement Park Tour']
  },
  {
    name: 'Han River Tour',
    route: 'COEX → Lotte Tower → Seokchon Lake → Olympic Park → Amsa Heritage → Namyangju',
    tags: ['#Seoul Skyline', '#Seokchon Lake Cherry Blossom Tour']
  },
  {
    name: 'BukHan Mountain Tour',
    route: 'COEX → Lotte Tower → Seokchon Lake → BukHan Mountain → Dobong Mountain',
    tags: ['#Bukhan mountain National Park', '#Seoul Rocky Mountains Tour']
  },
  {
    name: 'DMZ Tour',
    route: 'Witness the historical landmarks only available in South Korea. View of North Korea beyond DMZ from the sky.',
    tags: ['#DMZ Tour']
  }
]

export function VonaerServicesSection() {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            VONAER SERVICE
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A platform proposing a new lifestyle, VONAER is an Urban Air Mobility service.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-32">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-20`}
            >
              {/* Content */}
              <div className="flex-1 space-y-8">
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-2xl border border-border bg-muted/30">
                    <service.icon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-foreground mb-2">{service.title}</h3>
                    <p className="text-lg text-muted-foreground">{service.subtitle}</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-4">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full border border-border bg-muted/50 flex items-center justify-center mt-1">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>

                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 px-8 py-3 text-lg font-semibold group"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>

              {/* Image Placeholder */}
              <div className="flex-1 w-full">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border">
                  <div className="text-center text-muted-foreground">
                    <service.icon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">{service.title}</p>
                    <p className="text-sm">Image Placeholder</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* VON Tour Packages */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">
            VON Tour Packages
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {tourPackages.map((tour, index) => (
              <Card key={index} className="border shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <h4 className="text-xl font-bold text-foreground mb-4">{tour.name}</h4>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{tour.route}</p>
                  <div className="flex flex-wrap gap-3">
                    {tour.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-4 py-2 border border-border bg-muted/30 text-muted-foreground text-sm rounded-full font-medium"
                      >
                        {tag}
                      </span>
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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 bg-card rounded-3xl p-12 shadow-lg border"
        >
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">
            VONAER Helicopter Usage Guide
          </h3>
          <p className="text-center text-muted-foreground mb-16 text-lg max-w-3xl mx-auto">
            With the VONAER service, booking a helicopter is quick and easy via the app.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { step: 1, title: 'Sign Up', description: 'Download the VONAER app and complete the personal verification process. Only adults 19 years or older can register.' },
              { step: 2, title: 'Select Your Service', description: 'Choose from VON Private for premium experience, VON Routine for fast transfers, or VON Tour for scenic flights.' },
              { step: 3, title: 'Make a Reservation', description: 'Choose your preferred location and date, and submit your reservation request.' },
              { step: 4, title: 'Reservation Approval', description: 'Once an administrator reviews and approves your reservation details, your booking will be confirmed.' },
              { step: 5, title: 'Boarding', description: 'Arrive at the helipad at your scheduled time and follow the safety staff\'s instructions.' },
              { step: 6, title: 'Disembarkation', description: 'After landing, continue your journey with VON RentCar or VON Limousine for your Last Mile transfer.' }
            ].map((step, index) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 rounded-full border border-border bg-muted/30 text-muted-foreground font-bold text-lg flex items-center justify-center mx-auto mb-6">
                  {step.step}
                </div>
                <h4 className="font-bold text-foreground mb-4">{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
