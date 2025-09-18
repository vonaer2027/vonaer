'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Plane, 
  Clock, 
  TrendingUp, 
  ArrowRight
} from 'lucide-react'

const coreValues = [
  {
    icon: Clock,
    title: 'Adding value to your precious time',
    description: 'VONAER enhances the value of time and redefines lifestyles through private jets, embodying its core values and vision in a visually expressive design.'
  },
  {
    icon: Plane,
    title: 'Making Dreams and Imagination Reality',
    description: 'We transform your aviation dreams into reality with cutting-edge technology and exceptional service.'
  },
  {
    icon: TrendingUp,
    title: 'Trendsetter that sets new standards',
    description: 'Leading the Air Mobility Service industry with innovative solutions and pioneering approaches.'
  }
]


export function VonaerAboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Card className="border shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center h-full flex flex-col">
                    <div className="w-16 h-16 rounded-2xl border border-border bg-muted/30 flex items-center justify-center mx-auto mb-8">
                      <value.icon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-6 leading-tight flex-shrink-0">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed flex-1">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Story */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <Card className="border shadow-lg p-12 text-center">
            <h3 className="text-3xl font-bold text-foreground mb-8">
              Founded in 2021, VONAER has experienced rapid growth
            </h3>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              With numerous leading enterprises collaborating with us to revolutionize the Air Mobility industry.
            </p>
          </Card>
        </motion.div>



        {/* App Download CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="border shadow-lg">
            <CardContent className="p-12 md:p-16 text-center">
              <h3 className="text-3xl font-bold mb-6 text-foreground">Download VONAER APP</h3>
              <p className="text-xl mb-10 text-muted-foreground">Experience the future of air mobility</p>
              <Button className="border border-border bg-muted/30 text-foreground hover:bg-muted/50 px-10 py-4 text-lg font-semibold group shadow-lg">
                Download Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
