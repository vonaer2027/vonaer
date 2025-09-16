'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Plane, Calendar, Users, ArrowRight, Phone, User, Shield, Send, Loader2 } from "lucide-react"
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
  contactConsent: boolean
  privacyConsent: boolean
}

export function BookingDialog({ flight, open, onOpenChange, onSuccess }: BookingDialogProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: '',
    customerPhone: '',
    contactConsent: false,
    privacyConsent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!flight) return
    
    if (!formData.customerName.trim()) {
      toast.error('Please enter your name')
      return
    }
    
    if (!formData.customerPhone.trim()) {
      toast.error('Please enter your phone number')
      return
    }
    
    if (!formData.contactConsent) {
      toast.error('Please provide consent for Vonaer to contact you')
      return
    }
    
    if (!formData.privacyConsent) {
      toast.error('Please acknowledge that you have read and agree to the Privacy Policy')
      return
    }

    setIsSubmitting(true)

    try {
      // Submit booking request to database
      await bookingRequestService.create({
        flight_id: flight.flight_id,
        customer_name: formData.customerName.trim(),
        customer_phone: formData.customerPhone.trim(),
        consent_given: formData.contactConsent && formData.privacyConsent,
        called: false
      })
      
      // Reset form
      setFormData({
        customerName: '',
        customerPhone: '',
        contactConsent: false,
        privacyConsent: false
      })
      
      onSuccess()
    } catch (error: unknown) {
      console.error('Error submitting booking request:', error)
      
      // More detailed error handling
      let errorMessage = 'Unknown error occurred'
      
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
      
      toast.error(`Booking request failed: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Date TBD'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
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
            Request Booking
          </DialogTitle>
          <DialogDescription className="text-sm">
            Submit your details and we&apos;ll contact you within 24 hours.
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
                  {flight.seats} seats
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
                Contact Information
              </h3>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="customerName" className="text-xs font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="customerName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.customerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                    className="h-9"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="customerPhone" className="text-xs font-medium">
                    Phone Number *
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
              </div>
            </div>

            {/* Consent Section */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacy & Consent
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
                    I hereby consent to be contacted by Vonaer regarding my flight booking.
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
                    By using the services, I acknowledge that I have read, understood, and agree to the{' '}
                    <a href="#" className="text-primary underline hover:text-primary/80">
                      Privacy Policy
                    </a>.
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
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Request
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
