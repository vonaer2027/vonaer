'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CitySearchInput } from '@/components/city-search-input'
import { FlightDatePicker } from '@/components/flight-date-picker'
import { FlightSearchBookingDialog } from '@/components/flight-search-booking-dialog'
import { Toaster } from 'sonner'
import { 
  Minus, 
  Plus
} from 'lucide-react'

export function FlightBookingForm() {
  const t = useTranslations()
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way')
  const [passengers, setPassengers] = useState(1)
  const [fromLocation, setFromLocation] = useState('')
  const [toLocation, setToLocation] = useState('')
  const [departDate, setDepartDate] = useState<Date | undefined>()
  const [returnDate, setReturnDate] = useState<Date | undefined>()
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleTripTypeChange = (value: 'one-way' | 'round-trip') => {
    setTripType(value)
    // Clear dates when switching trip type
    setDepartDate(undefined)
    setReturnDate(undefined)
  }

  const handleSearch = () => {
    // Open the flight search booking dialog
    setDialogOpen(true)
  }

  // Check if all required fields are filled
  const isFormValid = fromLocation.trim() !== '' && toLocation.trim() !== '' && departDate !== undefined

  const handleDialogSuccess = () => {
    setDialogOpen(false)
    // Reset form
    setFromLocation('')
    setToLocation('')
    setDepartDate(undefined)
    setReturnDate(undefined)
    setPassengers(1)
    setTripType('one-way')
  }

  return (
    <section id="book-flight" className="w-full bg-background py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{t('booking.title')}</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('booking.subtitle')}
            </p>
          </div>

          {/* Booking Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
            {/* Trip Type Selector - aligned with fields */}
            <div className="sm:col-span-1 lg:col-span-2">
              <Tabs value={tripType} onValueChange={(value) => handleTripTypeChange(value as 'one-way' | 'round-trip')} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-14">
                  <TabsTrigger
                    value="one-way"
                    className="text-sm font-medium data-[state=active]:shadow-[0_0_20px_rgba(34,64,66,0.6),0_0_40px_rgba(34,64,66,0.3)] transition-all duration-300"
                  >
                    {t('booking.tripType.oneWay')}
                  </TabsTrigger>
                  <TabsTrigger
                    value="round-trip"
                    className="text-sm font-medium data-[state=active]:shadow-[0_0_20px_rgba(34,64,66,0.6),0_0_40px_rgba(34,64,66,0.3)] transition-all duration-300"
                  >
                    {t('booking.tripType.roundTrip')}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Spacer for alignment */}
            <div className="hidden lg:block lg:col-span-10"></div>

            {/* From */}
            <div className="sm:col-span-1 lg:col-span-2">
              <CitySearchInput
                id="from"
                placeholder={t('booking.placeholders.departureCity')}
                value={fromLocation}
                onChange={setFromLocation}
                icon="plane"
                className="h-14 text-base"
              />
            </div>

            {/* To */}
            <div className="sm:col-span-1 lg:col-span-2">
              <CitySearchInput
                id="to"
                placeholder={t('booking.placeholders.destinationCity')}
                value={toLocation}
                onChange={setToLocation}
                icon="plane"
                className="h-14 text-base"
              />
            </div>

            {/* Date Picker - fixed width */}
            <div className="sm:col-span-2 lg:col-span-4">
              <FlightDatePicker
                date={departDate}
                onDateSelect={setDepartDate}
                returnDate={returnDate}
                onReturnDateSelect={setReturnDate}
                placeholder={t('booking.placeholders.departureDate')}
                isRoundTrip={tripType === 'round-trip'}
                className="h-14 w-full"
              />
            </div>

            {/* Passengers */}
            <div className="sm:col-span-1 lg:col-span-2">
              <div className="flex items-center border rounded-md h-14 bg-background">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-full px-3 sm:px-4 text-foreground hover:bg-muted/50"
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                >
                  <Minus className="h-4 w-4 text-foreground" />
                </Button>
                <span className="flex-1 text-center font-medium text-foreground text-sm sm:text-base">
                  {passengers} {passengers === 1 ? t('booking.passengers') : t('booking.passengersPlural')}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-full px-3 sm:px-4 text-foreground hover:bg-muted/50"
                  onClick={() => setPassengers(passengers + 1)}
                >
                  <Plus className="h-4 w-4 text-foreground" />
                </Button>
              </div>
            </div>

            {/* Search Button */}
            <div className="sm:col-span-1 lg:col-span-2">
              <Button
                onClick={handleSearch}
                disabled={!isFormValid}
                className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold tracking-wide text-sm sm:text-base"
              >
                {t('booking.search')}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Flight Search Booking Dialog */}
      <FlightSearchBookingDialog
        flightData={dialogOpen ? {
          tripType,
          fromLocation,
          toLocation,
          departDate,
          returnDate,
          passengers
        } : null}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleDialogSuccess}
      />
      
      <Toaster />
    </section>
  )
}
