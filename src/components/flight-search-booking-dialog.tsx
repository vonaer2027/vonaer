'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Plane, Calendar, Users, ArrowRight, Phone, User, Shield, Send, Loader2, Mail } from "lucide-react"
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { useLocale } from '@/components/locale-provider'

interface FlightSearchData {
  tripType: 'one-way' | 'round-trip'
  fromLocation: string
  toLocation: string
  departDate: Date | undefined
  returnDate?: Date | undefined
  passengers: number
}

interface FlightSearchBookingDialogProps {
  flightData: FlightSearchData | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

interface BookingFormData {
  customerName: string
  customerPhone: string
  customerEmail: string
  contactConsent: boolean
  privacyConsent: boolean
}

export function FlightSearchBookingDialog({ flightData, open, onOpenChange, onSuccess }: FlightSearchBookingDialogProps) {
  const t = useTranslations()
  const { locale } = useLocale()
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    contactConsent: false,
    privacyConsent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!flightData) return
    
    // Validation
    if (!formData.customerName.trim()) {
      toast.error(t('flightSearchDialog.validation.nameRequired'))
      return
    }
    
    if (!formData.customerPhone.trim()) {
      toast.error(t('flightSearchDialog.validation.phoneRequired'))
      return
    }
    
    if (!flightData.fromLocation.trim()) {
      toast.error(t('flightSearchDialog.validation.fromRequired'))
      return
    }
    
    if (!flightData.toLocation.trim()) {
      toast.error(t('flightSearchDialog.validation.toRequired'))
      return
    }
    
    if (!flightData.departDate) {
      toast.error(t('flightSearchDialog.validation.dateRequired'))
      return
    }
    
    if (!formData.contactConsent) {
      toast.error(t('flightSearchDialog.validation.contactConsentRequired'))
      return
    }
    
    if (!formData.privacyConsent) {
      toast.error(t('flightSearchDialog.validation.privacyConsentRequired'))
      return
    }

    setIsSubmitting(true)

    try {
      // Send to Google Chat
      await sendFlightSearchRequestToGoogleChat({
        flightData,
        customerData: formData
      })
      
      // Reset form
      setFormData({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        contactConsent: false,
        privacyConsent: false
      })
      
      // Show success toast
      toast.success(t('flightSearchDialog.success.submitted'))
      
      onSuccess()
    } catch (error: unknown) {
      console.error('Error submitting flight search request:', error)
      
      let errorMessage = t('flightSearchDialog.error.unknownError')
      
      if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = String(error.message)
      } else if (typeof error === 'string') {
        errorMessage = error
      }
      
      toast.error(`${t('flightSearchDialog.error.submitFailed')}: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (date?: Date) => {
    if (!date) return t('flightSearchDialog.dateTBD')
    return date.toLocaleDateString(locale)
  }

  if (!flightData) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <Plane className="h-5 w-5 text-primary" />
            {t('flightSearchDialog.title')}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {t('flightSearchDialog.subtitle')}
          </DialogDescription>
        </DialogHeader>

        {/* Flight Information Summary */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-3 border">
          <h3 className="font-medium text-sm flex items-center gap-2">
            <Plane className="h-4 w-4" />
            {t('flightSearchDialog.flightInfo')}
          </h3>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">{t('flightSearchDialog.tripType')}:</span>
              <div className="font-medium">
                {flightData.tripType === 'one-way' 
                  ? t('flightSearchDialog.oneWay') 
                  : t('flightSearchDialog.roundTrip')
                }
              </div>
            </div>
            
            <div>
              <span className="text-muted-foreground">{t('flightSearchDialog.passengers')}:</span>
              <div className="font-medium flex items-center gap-1">
                <Users className="h-3 w-3" />
                {flightData.passengers}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <div>
                <div className="font-medium">{flightData.fromLocation}</div>
                <div className="text-xs text-muted-foreground">{t('flightSearchDialog.from')}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="text-right">
                <div className="font-medium">{flightData.toLocation}</div>
                <div className="text-xs text-muted-foreground">{t('flightSearchDialog.to')}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-muted-foreground">{t('flightSearchDialog.departureDate')}:</span>
                <div className="font-medium flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(flightData.departDate)}
                </div>
              </div>
              
              {flightData.tripType === 'round-trip' && (
                <div className="text-right">
                  <span className="text-muted-foreground">{t('flightSearchDialog.returnDate')}:</span>
                  <div className="font-medium flex items-center gap-1 justify-end">
                    <Calendar className="h-3 w-3" />
                    {formatDate(flightData.returnDate)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm flex items-center gap-2">
              <User className="h-4 w-4" />
              {t('flightSearchDialog.contactInfo')}
            </h3>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="customerName" className="text-xs font-medium">
                  {t('flightSearchDialog.name')} *
                </Label>
                <Input
                  id="customerName"
                  type="text"
                  placeholder={t('flightSearchDialog.namePlaceholder')}
                  value={formData.customerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                  className="h-9"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="customerPhone" className="text-xs font-medium">
                  {t('flightSearchDialog.phone')} *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                  <Input
                    id="customerPhone"
                    type="tel"
                    placeholder={t('flightSearchDialog.phonePlaceholder')}
                    value={formData.customerPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                    className="h-9 pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="customerEmail" className="text-xs font-medium">
                  {t('flightSearchDialog.email')}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                  <Input
                    id="customerEmail"
                    type="email"
                    placeholder={t('flightSearchDialog.emailPlaceholder')}
                    value={formData.customerEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
                    className="h-9 pl-9"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Consent Section */}
          <div className="space-y-3 pt-2">
            <h3 className="font-medium text-sm flex items-center gap-2">
              <Shield className="h-4 w-4" />
              {t('flightSearchDialog.consent')}
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="contactConsent"
                  checked={formData.contactConsent}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, contactConsent: checked as boolean }))
                  }
                  className="mt-0.5"
                />
                <Label htmlFor="contactConsent" className="text-xs leading-relaxed">
                  {t('flightSearchDialog.contactConsentText')}
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacyConsent"
                  checked={formData.privacyConsent}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, privacyConsent: checked as boolean }))
                  }
                  className="mt-0.5"
                />
                <Label htmlFor="privacyConsent" className="text-xs leading-relaxed">
                  {t('flightSearchDialog.privacyConsentText')}
                  <span className="text-primary underline cursor-pointer">
                    {t('flightSearchDialog.privacyPolicy')}
                  </span>
                  {t('flightSearchDialog.privacyConsentText2')}
                </Label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-9"
              disabled={isSubmitting}
            >
              {t('flightSearchDialog.cancel')}
            </Button>
            <Button
              type="submit"
              className="flex-1 h-9 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                  {t('flightSearchDialog.submitting')}
                </>
              ) : (
                <>
                  <Send className="w-3 h-3 mr-2" />
                  {t('flightSearchDialog.submit')}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Function to send flight search request to Google Chat
async function sendFlightSearchRequestToGoogleChat({
  flightData,
  customerData
}: {
  flightData: FlightSearchData
  customerData: BookingFormData
}) {
  const webhookUrl = 'https://chat.googleapis.com/v1/spaces/AAQA4rwvLhg/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=XSsHMsMPf167hnnuvDJ0afpKAUu0s-s36NpffX9Niig'
  
  const formatDate = (date?: Date) => {
    if (!date) return '미정'
    return date.toLocaleDateString('ko-KR')
  }

  const message = {
    text: `🛩️ *새로운 VONAER 항공편 검색 요청*\n\n` +
          `👤 *고객 정보:*\n` +
          `• 이름: ${customerData.customerName}\n` +
          `• 전화번호: ${customerData.customerPhone}\n` +
          `${customerData.customerEmail ? `• 이메일: ${customerData.customerEmail}\n` : ''}` +
          `• 개인정보 동의: ${customerData.contactConsent && customerData.privacyConsent ? '✅ 동의함' : '❌ 동의 안함'}\n\n` +
          `✈️ *항공편 정보:*\n` +
          `• 여행 유형: ${flightData.tripType === 'one-way' ? '편도' : '왕복'}\n` +
          `• 노선: ${flightData.fromLocation} → ${flightData.toLocation}\n` +
          `• 출발 날짜: ${formatDate(flightData.departDate)}\n` +
          `${flightData.tripType === 'round-trip' && flightData.returnDate ? `• 귀국 날짜: ${formatDate(flightData.returnDate)}\n` : ''}` +
          `• 승객 수: ${flightData.passengers}명\n\n` +
          `📅 *요청 시간:* ${new Date().toLocaleString('ko-KR')}\n\n` +
          `⚡ *즉시 고객에게 연락하여 항공편을 찾아드리세요!*`
  }
  
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message)
  })
  
  if (!response.ok) {
    throw new Error(`Google Chat webhook failed: ${response.status} ${response.statusText}`)
  }
  
  console.log('Google Chat notification sent successfully')
}


