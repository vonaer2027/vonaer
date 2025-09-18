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
      toast.error('성명을 입력해주세요')
      return
    }
    
    if (!formData.customerPhone.trim()) {
      toast.error('전화번호를 입력해주세요')
      return
    }
    
    if (!formData.contactConsent) {
      toast.error('VONAER 연락 동의를 제공해주세요')
      return
    }
    
    if (!formData.privacyConsent) {
      toast.error('개인정보처리방침에 동의해주세요')
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
      let errorMessage = '알 수 없는 오류가 발생했습니다'
      
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
      
      toast.error(`예약 요청 실패: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '날짜 미정'
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
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
예약 요청
          </DialogTitle>
          <DialogDescription className="text-sm">
세부 정보를 입력하시면 24시간 이내에 연락드리겠습니다.
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
                  {flight.seats}석
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
연락처 정보
              </h3>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="customerName" className="text-xs font-medium">
성명 *
                  </Label>
                  <Input
                    id="customerName"
                    type="text"
                    placeholder="성명을 입력하세요"
                    value={formData.customerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                    className="h-9"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="customerPhone" className="text-xs font-medium">
전화번호 *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <Input
                      id="customerPhone"
                      type="tel"
                      placeholder="010-1234-5678"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                      className="h-9 pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="customerEmail" className="text-xs font-medium">
이메일 주소 (선택사항)
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <Input
                      id="customerEmail"
                      type="email"
                      placeholder="your.email@example.com"
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
개인정보 및 동의
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
                    VONAER에서 항공편 예약과 관련하여 연락하는 것에 동의합니다.
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
                    서비스를 이용함으로써{' '}
                    <a href="#" className="text-primary underline hover:text-primary/80">
                      개인정보처리방침
                    </a>을 읽고 이해했으며 동의함을 확인합니다.
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
취소
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
제출 중...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
요청 제출
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
