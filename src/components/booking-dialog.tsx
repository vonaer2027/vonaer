'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Plane, Calendar, Users, ArrowRight, Phone, User, Shield, Send, Loader2, Mail } from "lucide-react"
import { Flight, bookingRequestService } from "@/lib/supabase"
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { useLocale } from '@/components/locale-provider'

interface BookingDialogProps {
  flight: Flight | null
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

export function BookingDialog({ flight, open, onOpenChange, onSuccess }: BookingDialogProps) {
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
    
    if (!flight) return
    
    if (!formData.customerName.trim()) {
      toast.error(t('bookingDialog.validation.nameRequired'))
      return
    }
    
    if (!formData.customerPhone.trim()) {
      toast.error(t('bookingDialog.validation.phoneRequired'))
      return
    }
    
    if (!formData.contactConsent) {
      toast.error(t('bookingDialog.validation.contactConsentRequired'))
      return
    }
    
    if (!formData.privacyConsent) {
      toast.error(t('bookingDialog.validation.privacyConsentRequired'))
      return
    }

    setIsSubmitting(true)

    try {
      // Submit booking request to database
      await bookingRequestService.create({
        flight_id: flight.flight_id,
        customer_name: formData.customerName.trim(),
        customer_phone: formData.customerPhone.trim(),
        customer_email: formData.customerEmail.trim() || undefined,
        consent_given: formData.contactConsent && formData.privacyConsent,
        called: false
      })
      
      // Reset form
      setFormData({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        contactConsent: false,
        privacyConsent: false
      })
      
      onSuccess()
    } catch (error: unknown) {
      console.error('Error submitting booking request:', error)
      
      // More detailed error handling
      let errorMessage = t('bookingDialog.error.unknownError')
      
      if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = String(error.message)
      } else if (error && typeof error === 'object' && 'error_description' in error) {
        errorMessage = String((error as Record<string, unknown>).error_description)
      } else if (error && typeof error === 'object' && 'details' in error) {
        errorMessage = String((error as Record<string, unknown>).details)
      } else if (error && typeof error === 'object' && 'hint' in error) {
        errorMessage = String((error as Record<string, unknown>).hint)
      } else if (typeof error === 'string') {
        errorMessage = error
      }
      
      // Log full error for debugging
      console.log('Full error object:', JSON.stringify(error, null, 2))
      
      toast.error(`${t('bookingDialog.error.submitFailed')}: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return t('bookingDialog.dateTBD')
    const date = new Date(dateString)
    
    // Map our locale codes to proper locale strings
    const localeMap: { [key: string]: string } = {
      'en': 'en-US',
      'kr': 'ko-KR', 
      'jp': 'ja-JP',
      'cn': 'zh-CN'
    }
    
    const browserLocale = localeMap[locale] || 'en-US'
    
    return date.toLocaleDateString(browserLocale, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (!flight) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Plane className="h-5 w-5 text-primary" />
{t('bookingDialog.title')}
          </DialogTitle>
          <DialogDescription className="text-sm">
{t('bookingDialog.subtitle')}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-2">
          {/* Flight Summary - Ultra Compact */}
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="text-center space-y-2">
              <h3 className="font-semibold">{flight.aircraft}</h3>
              <div className="flex items-center justify-center gap-2 font-medium">
                <span className="text-sm">{flight.from_city}</span>
                <ArrowRight className="h-4 w-4 text-primary" />
                <span className="text-sm">{flight.to_city}</span>
              </div>
              <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(flight.flight_date)}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {flight.seats}{t('bookingDialog.seats')}
                </span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Contact Information */}
            <div className="space-y-3">
              <h3 className="font-medium text-sm flex items-center gap-2">
                <User className="h-4 w-4" />
{t('bookingDialog.contactInfo')}
              </h3>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="customerName" className="text-xs font-medium">
{t('bookingDialog.name')} *
                  </Label>
                  <Input
                    id="customerName"
                    type="text"
                    placeholder={t('bookingDialog.namePlaceholder')}
                    value={formData.customerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                    className="h-9"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="customerPhone" className="text-xs font-medium">
{t('bookingDialog.phone')} *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <Input
                      id="customerPhone"
                      type="tel"
                      placeholder={t('bookingDialog.phonePlaceholder')}
                      value={formData.customerPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                      className="h-9 pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="customerEmail" className="text-xs font-medium">
{t('bookingDialog.email')}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <Input
                      id="customerEmail"
                      type="email"
                      placeholder={t('bookingDialog.emailPlaceholder')}
                      value={formData.customerEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
                      className="h-9 pl-9"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Consent Section */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
{t('bookingDialog.consent')}
              </h3>
              
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox
                    checked={formData.contactConsent}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, contactConsent: checked as boolean }))
                    }
                    className="mt-0.5"
                  />
                  <span className="text-sm leading-relaxed">
                    {t('bookingDialog.contactConsentText')}
                  </span>
                </label>
                
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox
                    checked={formData.privacyConsent}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, privacyConsent: checked as boolean }))
                    }
                    className="mt-0.5"
                  />
                  <span className="text-sm leading-relaxed">
                    {t('bookingDialog.privacyConsentText')}{' '}
                    <a href="#" className="text-primary underline hover:text-primary/80">
                      {t('bookingDialog.privacyPolicy')}
                    </a>{t('bookingDialog.privacyConsentText2')}
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
                disabled={isSubmitting}
              >
{t('bookingDialog.cancel')}
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
{t('bookingDialog.submitting')}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
{t('bookingDialog.submit')}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
