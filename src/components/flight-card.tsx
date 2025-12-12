'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plane, Calendar, Users, MapPin, ArrowRight, Edit, MoreVertical, Trash2, RotateCcw } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Flight, MarginSetting, TieredMarginSetting, flightService, tieredMarginService } from "@/lib/supabase"
import { motion } from "framer-motion"
import { toast } from "sonner"
import Image from "next/image"
import { useTranslations } from 'next-intl'
import { useLocale } from '@/components/locale-provider'

interface FlightCardProps {
  flight: Flight
  marginSetting?: MarginSetting
  tieredMargins?: TieredMarginSetting[]
  onPriceUpdate?: (flightId: number, newPrice: number) => void
  onEdit?: (flight: Flight) => void
  onDelete?: () => void
}

export function FlightCard({ flight, marginSetting, tieredMargins, onPriceUpdate, onEdit, onDelete }: FlightCardProps) {
  const t = useTranslations()
  const { locale } = useLocale()
  const [customPrice, setCustomPrice] = useState<number | null>(flight.custom_price || null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [priceInput, setPriceInput] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Quick margin percentages from base price
  const quickMargins = [5, 10, 15, 25]
  const roundUpToNearestHundred = (price: number) => {
    return Math.ceil(price / 100) * 100
  }

  // Get the display price (custom override or tiered margin)
  const calculateAdjustedPrice = () => {
    if (!flight.price_numeric) return flight.price

    // Only use custom price if manually set by admin
    const effectiveCustomPrice = customPrice !== null ? customPrice : flight.custom_price
    if (effectiveCustomPrice !== null && effectiveCustomPrice !== undefined) {
      return `$${effectiveCustomPrice.toLocaleString()}`
    }

    // Otherwise use tiered margins (default system behavior)
    if (tieredMargins && tieredMargins.length > 0) {
      const { adjustedPrice } = tieredMarginService.calculateAdjustedPrice(flight.price_numeric, tieredMargins)
      const roundedPrice = roundUpToNearestHundred(adjustedPrice)
      return `$${roundedPrice.toLocaleString()}`
    }

    // Fallback to base price
    return `$${flight.price_numeric.toLocaleString()}`
  }

  // Calculate price with a specific margin percentage from BASE price
  const calculatePriceWithMargin = (marginPercent: number): number => {
    if (!flight.price_numeric) return 0
    const adjustedPrice = flight.price_numeric * (1 + marginPercent / 100)
    return roundUpToNearestHundred(adjustedPrice)
  }

  // Get current margin percentage if custom price is set
  const getCurrentMarginPercent = (): number | null => {
    const effectiveCustomPrice = customPrice !== null ? customPrice : flight.custom_price
    if (effectiveCustomPrice === null || effectiveCustomPrice === undefined || !flight.price_numeric) {
      return null
    }
    const marginPercent = ((effectiveCustomPrice - flight.price_numeric) / flight.price_numeric) * 100
    return Math.round(marginPercent)
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
      toast.error(t('admin.flightCard.validation.invalidPrice'))
      return
    }

    await saveCustomPrice(newPrice)
    setDialogOpen(false)
  }

  // Apply quick margin from base price
  const handleQuickMargin = async (marginPercent: number) => {
    if (!flight.price_numeric) {
      toast.error('No base price available')
      return
    }

    const newPrice = calculatePriceWithMargin(marginPercent)
    await saveCustomPrice(newPrice)
  }

  // Reset to use tiered margins (remove custom price)
  const handleResetToTieredMargin = async () => {
    setIsSaving(true)
    try {
      // Set custom_price to null in database
      await flightService.updateCustomPrice(flight.id, null)
      setCustomPrice(null)
      toast.success('가격이 기본 마진으로 초기화되었습니다')

      if (onPriceUpdate) {
        onPriceUpdate(flight.id, 0) // Signal refresh
      }
    } catch (error) {
      console.error('Error resetting price:', error)
      toast.error('가격 초기화 실패')
    } finally {
      setIsSaving(false)
    }
  }

  // Save custom price to database
  const saveCustomPrice = async (newPrice: number) => {
    setIsSaving(true)
    try {
      console.log('Updating price for flight ID:', flight.id, 'New price:', newPrice)

      const result = await flightService.updateCustomPrice(flight.id, newPrice)
      console.log('Price update result:', result)

      setCustomPrice(newPrice)
      toast.success(t('admin.flightCard.success.priceUpdated'))

      if (onPriceUpdate) {
        onPriceUpdate(flight.id, newPrice)
      }
    } catch (error) {
      console.error('Error updating price:', error)

      let errorMessage = t('admin.flightCard.error.updateFailed')
      if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = `${t('admin.flightCard.error.updateFailed')}: ${error.message}`
      }

      toast.error(errorMessage)
    } finally {
      setIsSaving(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return t('admin.flightCard.dateTBD')
    
    // Map our locale codes to proper locale strings
    const localeMap: { [key: string]: string } = {
      'en': 'en-US',
      'kr': 'ko-KR', 
      'jp': 'ja-JP',
      'cn': 'zh-CN'
    }
    
    const browserLocale = localeMap[locale] || 'en-US'
    
    return new Date(dateString).toLocaleDateString(browserLocale, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleDelete = async () => {
    if (!onDelete) return
    
    if (!confirm(t('admin.flightCard.confirmDelete'))) return

    setIsDeleting(true)
    try {
      await flightService.delete(flight.id)
      toast.success(t('admin.flightCard.deleted'))
      onDelete()
    } catch (error) {
      console.error('Delete error:', error)
      toast.error(t('admin.flightCard.deleteError'))
    } finally {
      setIsDeleting(false)
    }
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
            <div className="absolute top-2 right-2 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs bg-black/70 text-white">
                {flight.flight_id}
              </Badge>
              {(onEdit || onDelete) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 bg-black/70 hover:bg-black/80 text-white"
                    >
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {onEdit && (
                      <DropdownMenuItem onClick={() => onEdit(flight)}>
                        <Edit className="h-3 w-3 mr-2" />
                        {t('admin.flightCard.edit')}
                      </DropdownMenuItem>
                    )}
                    {onDelete && (
                      <DropdownMenuItem 
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-3 w-3 mr-2" />
                        {t('admin.flightCard.deleteFlight')}
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        )}
        
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Plane className="h-5 w-5 text-primary" />
              {flight.aircraft || 'Aircraft TBD'}
            </CardTitle>
            <div className="flex items-center gap-2">
              {(!flight.image_urls || flight.image_urls.length === 0) && (
                <Badge variant="secondary" className="text-xs">
                  {flight.flight_id}
                </Badge>
              )}
              {(onEdit || onDelete) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {onEdit && (
                      <DropdownMenuItem onClick={() => onEdit(flight)}>
                        <Edit className="h-4 w-4 mr-2" />
                        {t('admin.flightCard.edit')}
                      </DropdownMenuItem>
                    )}
                    {onDelete && (
                      <DropdownMenuItem 
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        {t('admin.flightCard.deleteFlight')}
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Route Information */}
          <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
            <div className="text-center">
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                <MapPin className="h-3 w-3" />
                {t('admin.flightCard.from')}
              </div>
              <div className="font-medium text-sm">
                {flight.from_city || t('admin.flightCard.tbd')}
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
                {t('admin.flightCard.to')}
              </div>
              <div className="font-medium text-sm">
                {flight.to_city || t('admin.flightCard.tbd')}
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
                <div className="text-xs text-muted-foreground">{t('admin.flightCard.date')}</div>
                <div className="text-sm font-medium">
                  {formatDate(flight.flight_date)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">{t('admin.flightCard.seats')}</div>
                <div className="text-sm font-medium">
                  {flight.seats || t('admin.flightCard.tbd')}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="border-t pt-4 space-y-3">
            {/* Price Display */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">기준가</div>
                <div className="text-sm text-muted-foreground">
                  {getOriginalPrice() || t('admin.flightCard.priceTBD')}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">판매가</div>
                <div className="text-lg font-bold text-primary">
                  {calculateAdjustedPrice()}
                </div>
                {(customPrice !== null || flight.custom_price) ? (
                  <div className="text-xs text-blue-600">
                    수동 설정 (+{getCurrentMarginPercent()}%)
                  </div>
                ) : tieredMargins && tieredMargins.length > 0 ? (
                  <div className="text-xs text-green-600">
                    기본 마진 적용
                  </div>
                ) : null}
              </div>
            </div>

            {/* Quick Margin Buttons */}
            {flight.price_numeric && (
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">빠른 마진 설정 (기준가 기준)</div>
                <div className="flex flex-wrap gap-1">
                  {quickMargins.map((margin) => (
                    <Button
                      key={margin}
                      size="sm"
                      variant={getCurrentMarginPercent() === margin ? "default" : "outline"}
                      onClick={() => handleQuickMargin(margin)}
                      disabled={isSaving}
                      className="text-xs h-7 px-2"
                    >
                      +{margin}%
                    </Button>
                  ))}
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handlePriceAdjustment}
                        disabled={isSaving}
                        className="text-xs h-7 px-2"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        직접입력
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>가격 직접 설정</DialogTitle>
                        <DialogDescription>
                          {flight.aircraft} - {flight.from_city} → {flight.to_city}
                          <br />
                          <span className="text-xs">기준가: {getOriginalPrice()}</span>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <label htmlFor="price" className="text-sm font-medium">
                            판매가 (USD)
                          </label>
                          <Input
                            id="price"
                            type="number"
                            value={priceInput}
                            onChange={(e) => setPriceInput(e.target.value)}
                            placeholder="예: 15000"
                          />
                          {priceInput && flight.price_numeric && (
                            <div className="text-xs text-muted-foreground">
                              마진: +{Math.round(((parseInt(priceInput) - flight.price_numeric) / flight.price_numeric) * 100)}%
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                          취소
                        </Button>
                        <Button onClick={handleSavePriceAdjustment} disabled={isSaving}>
                          저장
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  {(customPrice !== null || flight.custom_price) && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleResetToTieredMargin}
                      disabled={isSaving}
                      className="text-xs h-7 px-2 text-orange-600 hover:text-orange-700"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      초기화
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>


        </CardContent>
      </Card>
    </motion.div>
  )
}
