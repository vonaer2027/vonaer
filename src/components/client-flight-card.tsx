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
  const roundUpToNearestHundred = (price: number) => {
    return Math.ceil(price / 100) * 100
  }

  const calculateFinalPrice = () => {
    if (!flight.price_numeric) return flight.price_numeric || 0
    
    // If custom price is set, use that
    if (flight.custom_price !== null && flight.custom_price !== undefined) {
      return flight.custom_price
    }
    
    // Apply margin and round up to nearest hundred
    if (marginSetting && marginSetting.margin_percentage > 0) {
      const adjustedPrice = flight.price_numeric * (1 + (marginSetting.margin_percentage / 100))
      return roundUpToNearestHundred(adjustedPrice)
    }
    
    return flight.price_numeric
  }

  const formatPrice = () => {
    const finalPrice = calculateFinalPrice()
    return `$${finalPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '날짜 미정'
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      weekday: 'short',
      month: 'long',
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
{flight.aircraft || '럭셔리 항공기'}
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
출발
                </div>
                <div className="font-bold text-lg text-foreground">
{flight.from_city || '미정'}
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
빈 항공편
                </div>
              </div>
              
              <div className="text-center flex-1">
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
도착
                </div>
                <div className="font-bold text-lg text-foreground">
{flight.to_city || '미정'}
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
                <div className="text-sm text-muted-foreground font-medium">항공편 날짜</div>
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
                <div className="text-xs text-muted-foreground font-medium">수용 인원</div>
                <div className="text-sm font-semibold text-foreground">
{flight.seats ? `${flight.seats}명` : '미정'}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="border-t border-border/50 pt-6 mt-auto">
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">
가격
                </div>
                <div className="text-3xl font-bold text-primary">
                  {formatPrice()}
                </div>
                <div className="text-xs text-muted-foreground">
총 항공편 비용
                </div>
              </div>
              
              <Button 
                onClick={onBookingRequest}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
예약 요청
              </Button>
            </div>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  )
}
