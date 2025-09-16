'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane, Calendar, Users, MapPin, ArrowRight } from "lucide-react"
import { Flight, MarginSetting } from "@/lib/supabase"
import { motion } from "framer-motion"
import Image from "next/image"

interface ClientFlightCardProps {
  flight: Flight
  marginSetting?: MarginSetting
  onBookingRequest: () => void
}

export function ClientFlightCard({ flight, marginSetting, onBookingRequest }: ClientFlightCardProps) {
  const calculateFinalPrice = () => {
    if (!flight.price_numeric || !marginSetting) return flight.price_numeric || 0
    return flight.price_numeric * (1 + (marginSetting.margin_percentage / 100))
  }

  const formatPrice = () => {
    const finalPrice = calculateFinalPrice()
    return `$${finalPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Date TBD'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-card to-card/80 h-full flex flex-col">
        {/* Aircraft Image */}
        {flight.image_urls && flight.image_urls.length > 0 && (
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={flight.image_urls[0]}
              alt={`${flight.aircraft || 'Aircraft'} image`}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
          </div>
        )}
        
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl font-bold flex items-center gap-2 text-foreground">
              <Plane className="h-5 w-5 text-primary" />
              {flight.aircraft || 'Luxury Aircraft'}
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 flex-1 flex flex-col">
          {/* Route Information */}
          <div className="relative">
            <div className="flex items-center justify-between bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl p-4">
              <div className="text-center flex-1">
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  Departure
                </div>
                <div className="font-bold text-lg text-foreground">
                  {flight.from_city || 'TBD'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {flight.from_country}
                </div>
              </div>
              
              <div className="flex flex-col items-center mx-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                  Empty Leg
                </div>
              </div>
              
              <div className="text-center flex-1">
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  Arrival
                </div>
                <div className="font-bold text-lg text-foreground">
                  {flight.to_city || 'TBD'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {flight.to_country}
                </div>
              </div>
            </div>
          </div>

          {/* Flight Date - Prominent */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/20">
            <div className="flex items-center justify-center gap-3">
              <Calendar className="h-6 w-6 text-primary" />
              <div className="text-center">
                <div className="text-sm text-muted-foreground font-medium">Flight Date</div>
                <div className="text-lg font-bold text-foreground">
                  {formatDate(flight.flight_date)}
                </div>
              </div>
            </div>
          </div>

          {/* Flight Details */}
          <div className="flex justify-center">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <div className="text-xs text-muted-foreground font-medium">Capacity</div>
                <div className="text-sm font-semibold text-foreground">
                  {flight.seats ? `${flight.seats} passengers` : 'TBD'}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="border-t border-border/50 pt-6 mt-auto">
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">
                  Price
                </div>
                <div className="text-3xl font-bold text-primary">
                  {formatPrice()}
                </div>
                <div className="text-xs text-muted-foreground">
                  Total flight cost
                </div>
              </div>
              
              <Button 
                onClick={onBookingRequest}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Request Booking
              </Button>
            </div>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  )
}
