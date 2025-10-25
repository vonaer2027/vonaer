'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Plane, 
  MapPin, 
  Users, 
  ArrowRight,
  Calendar,
  Phone,
  Mail,
  Car,
  Anchor,
  Crown,
  Zap
} from 'lucide-react'

interface VonaerServicesProps {
  section: string
}

const serviceContent = {
  'light-jet': {
    title: 'Light Jet',
    subtitle: 'Perfect for short to medium range flights',
    description: 'Experience luxury and efficiency with our light jet fleet, ideal for business trips and weekend getaways.',
    features: ['4-8 passengers', 'Range: 1,500-2,500 km', 'Speed: 800 km/h', 'Cost-effective'],
    image: '/api/placeholder/800/600',
    icon: Plane
  },
  'mid-jet': {
    title: 'Midsize Jet',
    subtitle: 'Balanced performance for continental travel',
    description: 'Our mid-size jets offer the perfect balance of comfort, range, and performance for longer journeys.',
    features: ['6-9 passengers', 'Range: 3,000-4,500 km', 'Speed: 850 km/h', 'Enhanced comfort'],
    image: '/api/placeholder/800/600',
    icon: Plane
  },
  'heavy-jet': {
    title: 'Heavy Jet',
    subtitle: 'Ultimate luxury for transcontinental flights',
    description: 'Experience unparalleled luxury and space with our heavy jet fleet for long-distance travel.',
    features: ['10-16 passengers', 'Range: 6,000+ km', 'Speed: 900 km/h', 'Full amenities'],
    image: '/api/placeholder/800/600',
    icon: Plane
  },
  'ultra-long-haul': {
    title: 'Ultra Long Range Jet',
    subtitle: 'Non-stop global connectivity',
    description: 'Connect any two points on Earth with our ultra-long-haul aircraft, featuring bedroom suites and office spaces.',
    features: ['12-19 passengers', 'Range: 12,000+ km', 'Speed: 950 km/h', 'Bedroom suites'],
    image: '/api/placeholder/800/600',
    icon: Plane
  },
  'vip-airline': {
    title: 'Executive Airliner',
    subtitle: 'Commercial aviation redefined',
    description: 'Experience commercial aviation like never before with our Executive Airliner services and dedicated terminals.',
    features: ['Private terminals', 'Expedited boarding', 'Luxury amenities', 'Global network'],
    image: '/api/placeholder/800/600',
    icon: Crown
  },
  'helicopter': {
    title: 'Helicopter Services',
    subtitle: 'Urban mobility solutions',
    description: 'Navigate urban landscapes efficiently with our helicopter services, perfect for city transfers and scenic tours.',
    features: ['VON Private', 'VON Routine', 'VON Tour', 'City transfers'],
    image: '/api/placeholder/800/600',
    icon: Zap
  },
  'super-car': {
    title: 'Chauffeured Car',
    subtitle: 'Ground transportation excellence',
    description: 'Complete your journey with our premium ground transportation fleet of luxury vehicles.',
    features: ['Luxury fleet', 'Professional drivers', 'Airport transfers', '24/7 availability'],
    image: '/api/placeholder/800/600',
    icon: Car
  },
  'super-yacht': {
    title: 'Super Yacht',
    subtitle: 'Maritime luxury experiences',
    description: 'Extend your luxury travel experience to the seas with our curated super yacht charter services.',
    features: ['Luxury yachts', 'Global destinations', 'Crew included', 'Custom itineraries'],
    image: '/api/placeholder/800/600',
    icon: Anchor
  },
  'pr': {
    title: 'PR & Media',
    subtitle: 'VONAER in the spotlight',
    description: 'Stay updated with VONAER news, press releases, and media coverage of our innovative air mobility solutions.',
    features: ['Press releases', 'Media kit', 'News updates', 'Industry insights'],
    image: '/api/placeholder/800/600',
    icon: Users
  },
  'contact': {
    title: 'Contact Us',
    subtitle: 'Get in touch with our team',
    description: 'Ready to experience the future of air mobility? Contact our team for personalized service and bookings.',
    features: ['24/7 support', 'Personal concierge', 'Instant booking', 'Custom solutions'],
    image: '/api/placeholder/800/600',
    icon: Phone
  },
  'membership': {
    title: 'Membership Lounge',
    subtitle: 'Exclusive member benefits',
    description: 'Join our exclusive membership program and unlock premium benefits, priority booking, and special rates.',
    features: ['Priority booking', 'Exclusive rates', 'Concierge service', 'Event access'],
    image: '/api/placeholder/800/600',
    icon: Crown
  },
  'empty-leg': {
    title: 'Empty Leg Flights',
    subtitle: 'Luxury travel at unbeatable prices',
    description: 'Save up to 75% on private jet travel with our empty leg flights. These one-way flights are available when aircraft need to reposition for scheduled flights.',
    features: ['Up to 75% savings', 'Same luxury service', 'Last-minute availability', 'Global destinations'],
    image: '/api/placeholder/800/600',
    icon: Plane
  }
}

export function VonaerServices({ section }: VonaerServicesProps) {
  const content = serviceContent[section as keyof typeof serviceContent]
  
  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white">Section not found</p>
      </div>
    )
  }

  const Icon = content.icon

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-90" />
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/800')] bg-cover bg-center opacity-20" />
        
        <div className="relative z-10 px-6 lg:px-12 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
            >
              <Icon className="h-8 w-8 text-white" />
            </motion.div>
            
            <h1 className="text-4xl lg:text-6xl font-light tracking-wider text-white mb-4">
              {content.title}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 font-light mb-8">
              {content.subtitle}
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {content.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl lg:text-3xl font-light text-white mb-6">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {content.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                      <Card className="vonaer-luxury-card">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-white rounded-full" />
                            <span className="text-white font-medium">{feature}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Special Features for Jets */}
              {section.includes('jet') && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="space-y-6"
                >
                  <div className="border-t border-white/10 pt-8">
                    <h3 className="text-xl font-light text-white mb-4">Empty Leg Opportunities</h3>
                    <p className="text-gray-400 mb-4">
                      Save up to 75% on private jet travel with our empty leg flights. 
                      These one-way flights are available when aircraft need to reposition for scheduled flights.
                    </p>
                    <Button 
                      variant="outline" 
                      className="bg-transparent border-white/20 text-white hover:bg-white/10"
                    >
                      View Empty Legs
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Contact CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="pt-8"
              >
                <Button 
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 transition-all duration-300 px-8 py-6"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Now
                </Button>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900" />
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon className="h-20 w-20 text-white/30" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contact Section for Contact Page */}
      {section === 'contact' && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="px-6 lg:px-12 pb-20"
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-8">
                  <h3 className="text-xl font-light text-white mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span className="text-white">+82 1600 9064</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <span className="text-white">business@VONAER.com</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                      <span className="text-white">
                        2nd floor of Korea City Airport<br />
                        22, Teheran-ro 87-gil, Gangnam-gu<br />
                        Seoul, Korea 06164
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-8">
                  <h3 className="text-xl font-light text-white mb-6">Business Hours</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-gray-400">Business Days</span>
                      <p className="text-white">09:00 ~ 18:00</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Emergency Support</span>
                      <p className="text-white">24/7 Available</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      )}

      {/* Membership Login for Membership Page */}
      {section === 'membership' && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="px-6 lg:px-12 pb-20"
        >
          <div className="max-w-md mx-auto">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-light text-white mb-8 text-center">Member Login</h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-gray-400 text-sm">Email</label>
                    <input 
                      type="email" 
                      className="w-full mt-2 p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-white/30 focus:outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Password</label>
                    <input 
                      type="password" 
                      className="w-full mt-2 p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-white/30 focus:outline-none"
                      placeholder="Enter your password"
                    />
                  </div>
                  <Button className="w-full bg-white text-black hover:bg-gray-100">
                    Sign In
                  </Button>
                  <p className="text-center text-gray-400 text-sm">
                    Not a member? <span className="text-white cursor-pointer hover:underline">Apply for membership</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}
    </div>
  )
}
