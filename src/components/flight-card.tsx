'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plane, Calendar, Users, MapPin, ArrowRight } from "lucide-react"
import { Flight, MarginSetting } from "@/lib/supabase"
import { motion } from "framer-motion"
import Image from "next/image"

interface FlightCardProps {
  flight: Flight
  marginSetting?: MarginSetting
}

export function FlightCard({ flight, marginSetting }: FlightCardProps) {
  const calculateAdjustedPrice = () => {
    if (!flight.price_numeric || !marginSetting) return flight.price

    const adjustedPrice = flight.price_numeric * (1 + (marginSetting.margin_percentage / 100))
    return `${adjustedPrice.toLocaleString()} ${flight.currency || 'USD'}`
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Date TBD'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Aircraft Image */}
        {flight.image_urls && flight.image_urls.length > 0 && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={flight.image_urls[0]}
              alt={`${flight.aircraft || 'Aircraft'} image`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="text-xs bg-black/70 text-white">
                {flight.flight_id}
              </Badge>
            </div>
          </div>
        )}
        
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Plane className="h-5 w-5 text-primary" />
              {flight.aircraft || 'Aircraft TBD'}
            </CardTitle>
            {(!flight.image_urls || flight.image_urls.length === 0) && (
              <Badge variant="secondary" className="text-xs">
                {flight.flight_id}
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Route Information */}
          <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
            <div className="text-center">
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                <MapPin className="h-3 w-3" />
                From
              </div>
              <div className="font-medium text-sm">
                {flight.from_city || 'TBD'}
              </div>
              <div className="text-xs text-muted-foreground">
                {flight.from_country}
              </div>
            </div>
            
            <div className="flex items-center">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="text-center">
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                <MapPin className="h-3 w-3" />
                To
              </div>
              <div className="font-medium text-sm">
                {flight.to_city || 'TBD'}
              </div>
              <div className="text-xs text-muted-foreground">
                {flight.to_country}
              </div>
            </div>
          </div>

          {/* Flight Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Date</div>
                <div className="text-sm font-medium">
                  {formatDate(flight.flight_date)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Seats</div>
                <div className="text-sm font-medium">
                  {flight.seats || 'TBD'}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Price</div>
                {marginSetting && marginSetting.margin_percentage > 0 ? (
                  <div className="space-y-1">
                    <div className="text-xs line-through text-muted-foreground">
                      {flight.price}
                    </div>
                    <div className="text-lg font-bold text-primary">
                      {calculateAdjustedPrice()}
                    </div>
                    <div className="text-xs text-green-600">
                      +{marginSetting.margin_percentage}% margin
                    </div>
                  </div>
                ) : (
                  <div className="text-lg font-bold text-primary">
                    {flight.price || 'Price TBD'}
                  </div>
                )}
              </div>
              
              <Button size="sm" className="ml-4">
                View Details
              </Button>
            </div>
          </div>

          {/* Korea Badge */}
          {flight.involves_korea && (
            <Badge variant="outline" className="w-fit">
              🇰🇷 Korea Route
            </Badge>
          )}

        </CardContent>
      </Card>
    </motion.div>
  )
}
