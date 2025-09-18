'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plane, Calendar, Users, MapPin, ArrowRight, Edit } from "lucide-react"
import { Flight, MarginSetting, flightService } from "@/lib/supabase"
import { motion } from "framer-motion"
import { toast } from "sonner"
import Image from "next/image"

interface FlightCardProps {
  flight: Flight
  marginSetting?: MarginSetting
  onPriceUpdate?: (flightId: number, newPrice: number) => void
}

export function FlightCard({ flight, marginSetting, onPriceUpdate }: FlightCardProps) {
  const [customPrice, setCustomPrice] = useState<number | null>(flight.custom_price || null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [priceInput, setPriceInput] = useState('')
  const roundUpToNearestHundred = (price: number) => {
    return Math.ceil(price / 100) * 100
  }

  const calculateAdjustedPrice = () => {
    if (!flight.price_numeric) return flight.price

    // If custom price is set (either from props or state), use that
    const effectiveCustomPrice = customPrice !== null ? customPrice : flight.custom_price
    if (effectiveCustomPrice !== null && effectiveCustomPrice !== undefined) {
      return `$${effectiveCustomPrice.toLocaleString()}`
    }

    // Apply margin and round up to nearest hundred
    if (marginSetting && marginSetting.margin_percentage > 0) {
      const adjustedPrice = flight.price_numeric * (1 + (marginSetting.margin_percentage / 100))
      const roundedPrice = roundUpToNearestHundred(adjustedPrice)
      return `$${roundedPrice.toLocaleString()}`
    }

    return flight.price || 'Price TBD'
  }

  const getOriginalPrice = () => {
    if (!flight.price_numeric) return null
    return `$${flight.price_numeric.toLocaleString()}`
  }

  const handlePriceAdjustment = () => {
    // Use the current custom price if available, otherwise use the calculated price
    const effectiveCustomPrice = customPrice !== null ? customPrice : flight.custom_price
    if (effectiveCustomPrice !== null && effectiveCustomPrice !== undefined) {
      setPriceInput(effectiveCustomPrice.toString())
    } else {
      const currentAdjusted = calculateAdjustedPrice()
      if (currentAdjusted && currentAdjusted !== 'Price TBD') {
        const numericPrice = parseInt(currentAdjusted.replace(/[^0-9]/g, ''))
        setPriceInput(numericPrice.toString())
      } else {
        setPriceInput('')
      }
    }
    setDialogOpen(true)
  }

  const handleSavePriceAdjustment = async () => {
    const newPrice = parseInt(priceInput)
    if (isNaN(newPrice) || newPrice <= 0) {
      toast.error('유효한 가격을 입력하세요')
      return
    }
    
    try {
      console.log('Updating price for flight ID:', flight.id, 'New price:', newPrice)
      
      // Update price in Supabase
      const result = await flightService.updateCustomPrice(flight.id, newPrice)
      console.log('Price update result:', result)
      
      setCustomPrice(newPrice)
      setDialogOpen(false)
      toast.success('가격이 성공적으로 업데이트되었습니다')
      
      if (onPriceUpdate) {
        onPriceUpdate(flight.id, newPrice)
      }
    } catch (error) {
      console.error('Error updating price:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      
      // More specific error message
      let errorMessage = '가격 업데이트에 실패했습니다'
      if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = `가격 업데이트 실패: ${error.message}`
      }
      
      toast.error(errorMessage)
    }
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
                <div className="text-xs text-muted-foreground">날짜</div>
                <div className="text-sm font-medium">
                  {formatDate(flight.flight_date)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">석</div>
                <div className="text-sm font-medium">
                  {flight.seats || 'TBD'}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">가격</div>
                {(marginSetting && marginSetting.margin_percentage > 0) || customPrice !== null || flight.custom_price ? (
                  <div className="space-y-1">
                    {getOriginalPrice() && (
                      <div className="text-xs line-through text-muted-foreground">
                        {getOriginalPrice()}
                      </div>
                    )}
                    <div className="text-lg font-bold text-primary">
                      {calculateAdjustedPrice()}
                    </div>
                    {(customPrice !== null || flight.custom_price) ? (
                      <div className="text-xs text-blue-600">
                        개별 조정 가격
                      </div>
                    ) : marginSetting && (
                      <div className="text-xs text-green-600">
                        +{marginSetting.margin_percentage}% 마진
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-lg font-bold text-primary">
                    {flight.price || 'Price TBD'}
                  </div>
                )}
              </div>
              
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" onClick={handlePriceAdjustment} className="ml-2">
                    <Edit className="h-3 w-3 mr-1" />
                    가격 조정
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>가격 조정</DialogTitle>
                    <DialogDescription>
                      {flight.aircraft} - {flight.from_city} → {flight.to_city}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="price" className="text-sm font-medium">
                        새 가격 (USD)
                      </label>
                      <Input
                        id="price"
                        type="number"
                        value={priceInput}
                        onChange={(e) => setPriceInput(e.target.value)}
                        placeholder="가격을 입력하세요"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      취소
                    </Button>
                    <Button onClick={handleSavePriceAdjustment}>
                      저장
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>


        </CardContent>
      </Card>
    </motion.div>
  )
}
