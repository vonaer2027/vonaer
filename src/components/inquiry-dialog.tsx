'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { useLocale } from '@/components/locale-provider'

interface InquiryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  inquiryType: 'aircraft' | 'car' | 'yacht'
  itemName: string
}

interface InquiryFormData {
  customerName: string
  customerCountryCode: string
  customerPhone: string
  customerEmail: string
  inquiryDetail: string
  privacyConsent: boolean
}

export function InquiryDialog({ open, onOpenChange, onSuccess, inquiryType, itemName }: InquiryDialogProps) {
  const t = useTranslations()
  const { locale } = useLocale()
  const [formData, setFormData] = useState<InquiryFormData>({
    customerName: '',
    customerCountryCode: '+82',
    customerPhone: '',
    customerEmail: '',
    inquiryDetail: '',
    privacyConsent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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

    if (!formData.privacyConsent) {
      toast.error(t('flightSearchDialog.validation.privacyConsentRequired'))
      return
    }

    setIsSubmitting(true)

    try {
      const inquiryTypeLabels = {
        aircraft: 'Jet & Helicopter',
        car: 'Super Car',
        yacht: 'Super Yacht'
      }

      // Format data for Google Chat webhook
      const message = {
        text: `🔔 New Inquiry - ${inquiryTypeLabels[inquiryType]}`,
        cards: [{
          sections: [{
            widgets: [
              {
                keyValue: {
                  topLabel: "Inquiry Type",
                  content: inquiryTypeLabels[inquiryType]
                }
              },
              {
                keyValue: {
                  topLabel: "Item",
                  content: itemName
                }
              },
              {
                keyValue: {
                  topLabel: "Name",
                  content: formData.customerName
                }
              },
              {
                keyValue: {
                  topLabel: "Phone",
                  content: `${formData.customerCountryCode} ${formData.customerPhone}`
                }
              },
              {
                keyValue: {
                  topLabel: "Email",
                  content: formData.customerEmail
                }
              },
              {
                keyValue: {
                  topLabel: "Inquiry Detail",
                  content: formData.inquiryDetail || 'No additional details'
                }
              },
              {
                keyValue: {
                  topLabel: "Language",
                  content: locale.toUpperCase()
                }
              }
            ]
          }]
        }]
      }

      const webhookUrl = 'https://chat.googleapis.com/v1/spaces/AAAAxySK94A/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=LCgXwO5qU-Qi0gRjxD94MzEj1dLN-rl_HbXxN0ZUmHo'

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      })

      if (!response.ok) {
        throw new Error('Failed to send inquiry')
      }

      toast.success(t('flightSearchDialog.success.message'))
      onSuccess()

      // Reset form
      setFormData({
        customerName: '',
        customerCountryCode: '+82',
        customerPhone: '',
        customerEmail: '',
        inquiryDetail: '',
        privacyConsent: false
      })

    } catch (error) {
      console.error('Error sending inquiry:', error)
      toast.error(t('flightSearchDialog.error.generic'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const getTitleKey = () => {
    switch (inquiryType) {
      case 'car':
        return 'flightSearchDialog.carTitle'
      case 'yacht':
        return 'flightSearchDialog.yachtTitle'
      default:
        return 'flightSearchDialog.title'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {t(getTitleKey())}
          </DialogTitle>
          <DialogDescription className="text-center">
            {itemName}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">{t('flightSearchDialog.name')}</Label>
            <Input
              id="name"
              placeholder={t('flightSearchDialog.namePlaceholder')}
              value={formData.customerName}
              onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
              className="h-11"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">{t('flightSearchDialog.phone')}</Label>
            <div className="flex gap-2">
              <Select
                value={formData.customerCountryCode}
                onValueChange={(value) => setFormData(prev => ({ ...prev, customerCountryCode: value }))}
              >
                <SelectTrigger className="h-11 w-32">
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
                  <SelectItem value="+39">🇮🇹 +39</SelectItem>
                  <SelectItem value="+34">🇪🇸 +34</SelectItem>
                  <SelectItem value="+61">🇦🇺 +61</SelectItem>
                  <SelectItem value="+65">🇸🇬 +65</SelectItem>
                  <SelectItem value="+852">🇭🇰 +852</SelectItem>
                  <SelectItem value="+971">🇦🇪 +971</SelectItem>
                </SelectContent>
              </Select>
              <Input
                id="phone"
                type="tel"
                placeholder={t('flightSearchDialog.phonePlaceholder')}
                value={formData.customerPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                className="h-11 flex-1"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">{t('flightSearchDialog.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('flightSearchDialog.emailPlaceholder')}
              value={formData.customerEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
              className="h-11"
            />
          </div>

          {/* Inquiry Detail */}
          <div className="space-y-2">
            <Label htmlFor="inquiry">{t('flightSearchDialog.inquiryDetail')} (Optional)</Label>
            <Textarea
              id="inquiry"
              placeholder={t('flightSearchDialog.inquiryDetailPlaceholder')}
              value={formData.inquiryDetail}
              onChange={(e) => setFormData(prev => ({ ...prev, inquiryDetail: e.target.value }))}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Privacy Consent */}
          <div className="space-y-4 pt-2">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="privacy"
                checked={formData.privacyConsent}
                onCheckedChange={(checked) =>
                  setFormData(prev => ({ ...prev, privacyConsent: checked as boolean }))
                }
                className="mt-1"
              />
              <label
                htmlFor="privacy"
                className="text-sm leading-relaxed cursor-pointer"
              >
                {t('flightSearchDialog.privacyConsentText')}{' '}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-primary/80"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t('flightSearchDialog.privacyPolicy')}
                </a>
                {t('flightSearchDialog.privacyConsentText2')}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('flightSearchDialog.submitting') : t('flightSearchDialog.submit')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
