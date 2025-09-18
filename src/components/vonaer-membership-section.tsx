'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Crown, 
  Star, 
  Plane, 
  Shield, 
  Check, 
  X
} from 'lucide-react'

export function VonaerMembershipSection() {
  const t = useTranslations()
  
  const membershipTiers = [
    {
      name: t('membership.tiers.aerMember.name'),
      icon: Plane,
      gradient: 'from-gray-600 to-gray-800',
      annualDues: t('membership.tiers.aerMember.annualDues'),
      bookingFee: t('membership.tiers.aerMember.bookingFee'),
      charterPrice: t('membership.tiers.aerMember.charterPrice'),
      features: [
        { name: t('membership.tiers.aerMember.features.0.name'), included: t('membership.tiers.aerMember.features.0.included') === 'true' },
        { name: t('membership.tiers.aerMember.features.1.name'), included: t('membership.tiers.aerMember.features.1.included') === 'true' },
        { name: t('membership.tiers.aerMember.features.2.name'), included: t('membership.tiers.aerMember.features.2.included') === 'true' },
        { name: t('membership.tiers.aerMember.features.3.name'), included: t('membership.tiers.aerMember.features.3.included') === 'true', value: t('membership.tiers.aerMember.features.3.value') }
      ]
    },
    {
      name: t('membership.tiers.von.name'),
      icon: Shield,
      gradient: 'from-blue-600 to-blue-800',
      annualDues: t('membership.tiers.von.annualDues'),
      bookingFee: t('membership.tiers.von.bookingFee'),
      charterPrice: t('membership.tiers.von.charterPrice'),
      features: [
        { name: t('membership.tiers.von.features.0.name'), included: t('membership.tiers.von.features.0.included') === 'true' },
        { name: t('membership.tiers.von.features.1.name'), included: t('membership.tiers.von.features.1.included') === 'true' },
        { name: t('membership.tiers.von.features.2.name'), included: t('membership.tiers.von.features.2.included') === 'true' },
        { name: t('membership.tiers.von.features.3.name'), included: t('membership.tiers.von.features.3.included') === 'true' },
        { name: t('membership.tiers.von.features.4.name'), included: t('membership.tiers.von.features.4.included') === 'true', value: t('membership.tiers.von.features.4.value') }
      ]
    },
    {
      name: t('membership.tiers.vonPremiere.name'),
      icon: Star,
      gradient: 'from-purple-600 to-purple-800',
      annualDues: t('membership.tiers.vonPremiere.annualDues'),
      bookingFee: t('membership.tiers.vonPremiere.bookingFee'),
      charterPrice: t('membership.tiers.vonPremiere.charterPrice'),
      features: [
        { name: t('membership.tiers.vonPremiere.features.0.name'), included: t('membership.tiers.vonPremiere.features.0.included') === 'true' },
        { name: t('membership.tiers.vonPremiere.features.1.name'), included: t('membership.tiers.vonPremiere.features.1.included') === 'true' },
        { name: t('membership.tiers.vonPremiere.features.2.name'), included: t('membership.tiers.vonPremiere.features.2.included') === 'true' },
        { name: t('membership.tiers.vonPremiere.features.3.name'), included: t('membership.tiers.vonPremiere.features.3.included') === 'true' },
        { name: t('membership.tiers.vonPremiere.features.4.name'), included: t('membership.tiers.vonPremiere.features.4.included') === 'true', value: t('membership.tiers.vonPremiere.features.4.value') }
      ]
    },
    {
      name: t('membership.tiers.vonUltimate.name'),
      icon: Crown,
      gradient: 'from-amber-600 to-yellow-600',
      annualDues: t('membership.tiers.vonUltimate.annualDues'),
      bookingFee: t('membership.tiers.vonUltimate.bookingFee'),
      charterPrice: t('membership.tiers.vonUltimate.charterPrice'),
      features: [
        { name: t('membership.tiers.vonUltimate.features.0.name'), included: t('membership.tiers.vonUltimate.features.0.included') === 'true' },
        { name: t('membership.tiers.vonUltimate.features.1.name'), included: t('membership.tiers.vonUltimate.features.1.included') === 'true' },
        { name: t('membership.tiers.vonUltimate.features.2.name'), included: t('membership.tiers.vonUltimate.features.2.included') === 'true' },
        { name: t('membership.tiers.vonUltimate.features.3.name'), included: t('membership.tiers.vonUltimate.features.3.included') === 'true' },
        { name: t('membership.tiers.vonUltimate.features.4.name'), included: t('membership.tiers.vonUltimate.features.4.included') === 'true', value: t('membership.tiers.vonUltimate.features.4.value') }
      ]
    }
  ]

  const membershipBenefits = [
    t('membership.terms.term1'),
    t('membership.terms.term2'),
    t('membership.terms.term3'),
    t('membership.terms.term4'),
    t('membership.terms.term5')
  ]
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
            {t('membership.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('membership.subtitle')}
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
              
              <Card className="border shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-gradient-to-br from-card to-card/80">
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
                      <p className="text-sm text-muted-foreground font-medium">{t('membership.annualDues')}</p>
                      <p className="text-2xl font-bold text-foreground">{tier.annualDues}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{t('membership.bookingFee')}</p>
                      <p className="text-lg font-semibold text-foreground">{tier.bookingFee}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{t('membership.charterPrice')}</p>
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
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300 py-3 font-semibold"
                  >
                    {tier.name === t('membership.tiers.aerMember.name') ? t('membership.getStarted') : t('membership.joinNow')}
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
                {t('membership.termsTitle')}
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
