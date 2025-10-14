'use client'

import { useDesign } from '@/contexts/design-context'
import { FlightBookingForm } from '@/components/flight-booking-form'

// Minimal Design Variations
import { Minimal1Hero } from '@/components/designs/minimal-1/hero'
import { Minimal1Services } from '@/components/designs/minimal-1/services'
import { Minimal1About } from '@/components/designs/minimal-1/about'
import { Minimal1Ancillary } from '@/components/designs/minimal-1/ancillary'

import { Minimal2Hero } from '@/components/designs/minimal-2/hero'
import { Minimal2Services } from '@/components/designs/minimal-2/services'
import { Minimal2About } from '@/components/designs/minimal-2/about'
import { Minimal2Ancillary } from '@/components/designs/minimal-2/ancillary'

import { Minimal3Hero } from '@/components/designs/minimal-3/hero'
import { Minimal3Services } from '@/components/designs/minimal-3/services'
import { Minimal3About } from '@/components/designs/minimal-3/about'
import { Minimal3Ancillary } from '@/components/designs/minimal-3/ancillary'

import { OriginalHero } from '@/components/designs/original/hero'
import { OriginalServices } from '@/components/designs/original/services'
import { OriginalAbout } from '@/components/designs/original/about'
import { OriginalAncillary } from '@/components/designs/original/ancillary'

export function DesignRouter() {
  const { design } = useDesign()

  switch (design) {
    case 'minimal-1':
      return (
        <>
          <Minimal1Hero />
          <FlightBookingForm />
          <Minimal1Services />
          <Minimal1About />
          <Minimal1Ancillary />
        </>
      )
    case 'minimal-2':
      return (
        <>
          <Minimal2Hero />
          <FlightBookingForm />
          <Minimal2Services />
          <Minimal2About />
          <Minimal2Ancillary />
        </>
      )
    case 'minimal-3':
      return (
        <>
          <Minimal3Hero />
          <FlightBookingForm />
          <Minimal3Services />
          <Minimal3About />
          <Minimal3Ancillary />
        </>
      )
    case 'original':
      return (
        <>
          <OriginalHero />
          <FlightBookingForm />
          <OriginalServices />
          <OriginalAbout />
          <OriginalAncillary />
        </>
      )
    default:
      return (
        <>
          <Minimal1Hero />
          <FlightBookingForm />
          <Minimal1Services />
          <Minimal1About />
          <Minimal1Ancillary />
        </>
      )
  }
}
