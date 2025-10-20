'use client'

import { FlightBookingForm } from '@/components/flight-booking-form'
import { PrivateImmigrationService } from '@/components/private-immigration-service'

// Minimal-2 Design (Active)
import { Minimal2Hero } from '@/components/designs/minimal-2/hero'

export function DesignRouter() {
  return (
    <>
      <Minimal2Hero />
      <FlightBookingForm />
      <PrivateImmigrationService />
    </>
  )
}
