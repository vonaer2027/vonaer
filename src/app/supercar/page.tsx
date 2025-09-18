'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { VonaerFooter } from '@/components/vonaer-footer'
import { useState } from 'react'
import { 
  Car, 
  Gauge, 
  Users, 
  Calendar,
  ArrowRight,
  Star,
  Shield
} from 'lucide-react'

export default function SuperCarPage() {
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
              Super Car
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the ultimate in luxury ground transportation with our premium supercar fleet
            </p>
          </motion.div>

          {/* Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <Card className="border shadow-lg p-16">
              <div className="w-24 h-24 rounded-3xl border border-border bg-muted/30 flex items-center justify-center mx-auto mb-8">
                <Car className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Coming Soon
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our luxury supercar service is currently in development. Experience premium ground transportation that matches the excellence of our aviation services.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl border border-border bg-muted/30 flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Luxury Fleet</h3>
                  <p className="text-sm text-muted-foreground">Premium supercars from top manufacturers</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl border border-border bg-muted/30 flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Professional Service</h3>
                  <p className="text-sm text-muted-foreground">Expert drivers and concierge service</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl border border-border bg-muted/30 flex items-center justify-center mx-auto mb-3">
                    <Calendar className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Flexible Booking</h3>
                  <p className="text-sm text-muted-foreground">On-demand and scheduled services</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold">
                  Get Notified
                </Button>
                <Button 
                  variant="outline" 
                  className="border-border text-muted-foreground hover:bg-muted/30 hover:text-foreground px-8 py-3 text-lg font-semibold"
                >
                  Contact Sales
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
