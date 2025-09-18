'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Crown, 
  Star, 
  Plane, 
  Shield, 
  Check, 
  X,
  Sparkles
} from 'lucide-react'

const membershipTiers = [
  {
    name: 'AER Member',
    icon: Plane,
    gradient: 'from-gray-600 to-gray-800',
    popular: false,
    annualDues: 'N/A',
    bookingFee: '$495',
    charterPrice: 'Dynamic',
    features: [
      { name: 'Airport Escort', included: false },
      { name: 'Private Terminal', included: true },
      { name: 'VONAER Event', included: false },
      { name: 'Empty Leg Discount', included: false, value: '' }
    ]
  },
  {
    name: 'VON',
    icon: Shield,
    gradient: 'from-blue-600 to-blue-800',
    popular: true,
    annualDues: '$92,500',
    bookingFee: 'Complimentary',
    charterPrice: 'Dynamic',
    features: [
      { name: 'Aircraft Alteration', included: false },
      { name: 'Airport Escort', included: true },
      { name: 'Private Terminal', included: true },
      { name: 'VONAER Event', included: true },
      { name: 'Empty Leg Discount', included: true, value: '2%' }
    ]
  },
  {
    name: 'VON Premiere',
    icon: Star,
    gradient: 'from-purple-600 to-purple-800',
    popular: false,
    annualDues: '$234,000',
    bookingFee: 'Complimentary',
    charterPrice: 'Dynamic',
    features: [
      { name: 'Aircraft Alteration', included: true },
      { name: 'Airport Escort', included: true },
      { name: 'Private Terminal', included: true },
      { name: 'VONAER Event', included: true },
      { name: 'Empty Leg Discount', included: true, value: '3%' }
    ]
  },
  {
    name: 'VON Ultimate',
    icon: Crown,
    gradient: 'from-amber-600 to-yellow-600',
    popular: false,
    annualDues: '$350,000',
    bookingFee: 'Complimentary',
    charterPrice: 'Dynamic',
    features: [
      { name: 'Premium Aircraft', included: true },
      { name: 'Airport Escort', included: true },
      { name: 'Private Terminal', included: true },
      { name: 'VONAER Event', included: true },
      { name: 'Empty Leg Discount', included: true, value: '5%' }
    ]
  }
]

const membershipBenefits = [
  'Membership is completed upon payment of the annual dues.',
  'The membership is valid for one year. Available flight hours must be used within that period.',
  'If additional hours are purchased before the membership ends, any remaining hours will be carried over.',
  'Once the dedicated flight hours are exhausted, applicable rate within the member status will apply.',
  'Additional charges may apply for De-icing, Smoking, and Special Catering services.'
]


export function VonaerMembershipSection() {
  return (
    <section id="membership" className="py-20 bg-background">
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
            VONAER Membership
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the membership tier that best fits your aviation needs
          </p>
        </motion.div>

        {/* Membership Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {membershipTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 text-sm font-semibold">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`border shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-gradient-to-br from-card to-card/80 ${tier.popular ? 'ring-2 ring-primary scale-105' : ''}`}>
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <tier.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{tier.name}</h3>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Pricing */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Annual Dues</p>
                      <p className="text-2xl font-bold text-foreground">{tier.annualDues}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Booking Fee</p>
                      <p className="text-lg font-semibold text-foreground">{tier.bookingFee}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Charter Price</p>
                      <p className="text-lg font-semibold text-foreground">{tier.charterPrice}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{feature.name}</span>
                        <div className="flex items-center gap-2">
                          {feature.included ? (
                            <>
                              <Check className="h-4 w-4 text-primary" />
                              {feature.value && (
                                <span className="text-sm font-medium text-primary">{feature.value}</span>
                              )}
                            </>
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className={`w-full ${tier.popular 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    } transition-all duration-300 py-3 font-semibold`}
                  >
                    {tier.name === 'AER Member' ? 'Get Started' : 'Join Now'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Membership Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="border shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Membership Terms & Benefits
              </h3>
              <div className="space-y-4">
                {membershipBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </section>
  )
}
