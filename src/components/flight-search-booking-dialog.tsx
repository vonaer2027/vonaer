'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plane } from "lucide-react"
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
  customerCountryCode: string
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
    customerCountryCode: '+82',
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

    if (!formData.customerEmail.trim()) {
      toast.error(t('flightSearchDialog.validation.emailRequired'))
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
        customerCountryCode: '+82',
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
      <DialogContent className="max-w-lg">
        <DialogHeader className="space-y-1">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <Plane className="h-5 w-5 text-primary" />
            {t('flightSearchDialog.title')}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {t('flightSearchDialog.subtitle')}
          </DialogDescription>
        </DialogHeader>

        {/* Flight Information Summary */}
        <div className="bg-muted/30 rounded-lg p-3 space-y-2 border">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <div>
                <div className="font-medium">{flightData.fromLocation}</div>
                <div className="text-xs text-muted-foreground">{t('flightSearchDialog.from')}</div>
              </div>
              <span className="text-muted-foreground">→</span>
              <div>
                <div className="font-medium">{flightData.toLocation}</div>
                <div className="text-xs text-muted-foreground">{t('flightSearchDialog.to')}</div>
              </div>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              <div>{flightData.tripType === 'one-way' ? t('flightSearchDialog.oneWay') : t('flightSearchDialog.roundTrip')}</div>
              <div>{flightData.passengers} {t('flightSearchDialog.passengers')}</div>
            </div>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground border-t pt-2">
            <span>{t('flightSearchDialog.departureDate')}: <span className="font-medium text-foreground">{formatDate(flightData.departDate)}</span></span>
            {flightData.tripType === 'round-trip' && (
              <span>{t('flightSearchDialog.returnDate')}: <span className="font-medium text-foreground">{formatDate(flightData.returnDate)}</span></span>
            )}
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Contact Information */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm">
              {t('flightSearchDialog.contactInfo')}
            </h3>

            <div className="space-y-2">
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
                <div className="flex gap-2">
                  <Select
                    value={formData.customerCountryCode}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, customerCountryCode: value }))}
                  >
                    <SelectTrigger className="h-9 w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+82">🇰🇷 +82</SelectItem>
                      <SelectItem value="+1">🇺🇸 +1</SelectItem>
                      <SelectItem value="+44">🇬🇧 +44</SelectItem>
                      <SelectItem value="+81">🇯🇵 +81</SelectItem>
                      <SelectItem value="+86">🇨🇳 +86</SelectItem>
                      <SelectItem value="+33">🇫🇷 +33</SelectItem>
                      <SelectItem value="+49">🇩🇪 +49</SelectItem>
                      <SelectItem value="+65">🇸🇬 +65</SelectItem>
                      <SelectItem value="+852">🇭🇰 +852</SelectItem>
                      <SelectItem value="+971">🇦🇪 +971</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="customerPhone"
                    type="tel"
                    placeholder={t('flightSearchDialog.phonePlaceholder')}
                    value={formData.customerPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                    className="h-9 flex-1"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="customerEmail" className="text-xs font-medium">
                  {t('flightSearchDialog.email')} *
                </Label>
                <Input
                  id="customerEmail"
                  type="email"
                  placeholder={t('flightSearchDialog.emailPlaceholder')}
                  value={formData.customerEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
                  className="h-9"
                  required
                />
              </div>
            </div>
          </div>

          {/* Consent Section */}
          <div className="space-y-2 pt-2 border-t">
            <h3 className="font-medium text-sm">
              {t('flightSearchDialog.consent')}
            </h3>

            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="contactConsent"
                  checked={formData.contactConsent}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, contactConsent: checked as boolean }))
                  }
                  className="mt-0.5"
                />
                <Label htmlFor="contactConsent" className="text-xs leading-relaxed cursor-pointer">
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
                <Label htmlFor="privacyConsent" className="text-xs leading-relaxed cursor-pointer">
                  <span className="inline">
                    {t('flightSearchDialog.privacyConsentText')}
                    <a
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline hover:text-primary/80 inline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t('flightSearchDialog.privacyPolicy')}
                    </a>
                    {t('flightSearchDialog.andText')}
                    <a
                      href="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline hover:text-primary/80 inline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t('flightSearchDialog.locationTerms')}
                    </a>
                    {t('flightSearchDialog.privacyConsentText2')}
                  </span>
                </Label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-3">
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
              {isSubmitting ? t('flightSearchDialog.submitting') : t('flightSearchDialog.submit')}
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
  // Unified charter request chat webhook (same as inquiry-dialog.tsx)
  const webhookUrl = 'https://chat.googleapis.com/v1/spaces/AAQA4rwvLhg/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=XSsHMsMPf167hnnuvDJ0afpKAUu0s-s36NpffX9Niig'
  
  const formatDate = (date?: Date) => {
    if (!date) return '미정'
    return date.toLocaleDateString('ko-KR')
  }

  const message = {
    text: `🛫 항공편 차터 예약\n\n` +
          `고객 정보:\n` +
          `• 이름: ${customerData.customerName}\n` +
          `• 이메일: ${customerData.customerEmail || '미제공'}\n` +
          `• 전화번호: ${customerData.customerCountryCode} ${customerData.customerPhone}\n\n` +
          `비행 정보:\n` +
          `• 출발지: ${flightData.fromLocation}\n` +
          `• 도착지: ${flightData.toLocation}\n` +
          `• 출발일: ${formatDate(flightData.departDate)}\n` +
          `${flightData.tripType === 'round-trip' && flightData.returnDate ? `• 귀국일: ${formatDate(flightData.returnDate)}\n` : ''}` +
          `• 승객 수: ${flightData.passengers}명\n` +
          `• 여행 유형: ${flightData.tripType === 'one-way' ? '편도' : '왕복'}\n\n` +
          `특별 요청사항:\n` +
          `항공편 차터 예약 요청입니다. 즉시 고객에게 연락하여 최적의 항공편을 찾아드리세요.${customerData.contactConsent && customerData.privacyConsent ? ' (개인정보 동의 완료)' : ' (개인정보 동의 필요)'}\n\n` +
          `📅 예약 시간: ${new Date().toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          })}`
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

  // Send to Google Sheets
  try {
    const sheetsWebhookUrl = 'https://script.google.com/macros/s/AKfycbwjXDwaA_C8HCk4-nJIhfEwnAZD0a7a6nQDilZLJzWZxRhEi7MMdToM70JENRoSy8JgvA/exec'
    if (sheetsWebhookUrl) {
      await fetch(sheetsWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'charter',
          name: customerData.customerName,
          phone: `${customerData.customerCountryCode} ${customerData.customerPhone}`,
          email: customerData.customerEmail || '',
          departure: flightData.fromLocation,
          destination: flightData.toLocation,
          date: flightData.departDate ? flightData.departDate.toLocaleDateString('ko-KR') : '',
          returnDate: flightData.returnDate ? flightData.returnDate.toLocaleDateString('ko-KR') : '',
          passengers: flightData.passengers,
          tripType: flightData.tripType === 'one-way' ? '편도' : '왕복',
        }),
      })
    }
  } catch (sheetsError) {
    console.error('Google Sheets logging failed:', sheetsError)
  }
}
