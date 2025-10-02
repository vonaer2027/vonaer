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

  const handleSearch = () => {
    // Open the flight search booking dialog
    setDialogOpen(true)
  }

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
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">{t('booking.title')}</h2>
            <p className="text-muted-foreground text-lg">
              {t('booking.subtitle')}
            </p>
          </div>

          {/* Trip Type Selector */}
          <div className="mb-8">
            <Tabs value={tripType} onValueChange={(value) => setTripType(value as 'one-way' | 'round-trip')} className="w-full">
              <TabsList className="grid w-full max-w-sm grid-cols-2 h-12">
                <TabsTrigger value="one-way" className="text-sm font-medium">
                  {t('booking.tripType.oneWay')}
                </TabsTrigger>
                <TabsTrigger value="round-trip" className="text-sm font-medium">
                  {t('booking.tripType.roundTrip')}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Booking Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
            {/* From */}
            <div className="lg:col-span-2">
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
            <div className="lg:col-span-2">
              <CitySearchInput
                id="to"
                placeholder={t('booking.placeholders.destinationCity')}
                value={toLocation}
                onChange={setToLocation}
                icon="plane"
                className="h-14 text-base"
              />
            </div>

            {/* Depart Date */}
            <div className="lg:col-span-2">
              <FlightDatePicker
                date={departDate}
                onDateSelect={setDepartDate}
                placeholder={t('booking.placeholders.departureDate')}
                className="h-14"
              />
            </div>

            {/* Return Date - only show for round trip */}
            {tripType === 'round-trip' && (
              <div className="lg:col-span-2">
                <FlightDatePicker
                  date={returnDate}
                  onDateSelect={setReturnDate}
                  placeholder={t('booking.placeholders.returnDate')}
                  minDate={departDate}
                  className="h-14"
                />
              </div>
            )}

            {/* Passengers */}
            <div className={`${tripType === 'round-trip' ? 'lg:col-span-2' : 'lg:col-span-4'}`}>
              <div className="flex items-center border rounded-md h-14 bg-background">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-full px-4 text-foreground hover:bg-muted/50"
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                >
                  <Minus className="h-4 w-4 text-foreground" />
                </Button>
                <span className="flex-1 text-center font-medium text-foreground text-base">
                  {passengers} {passengers === 1 ? t('booking.passengers') : t('booking.passengersPlural')}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-full px-4 text-foreground hover:bg-muted/50"
                  onClick={() => setPassengers(passengers + 1)}
                >
                  <Plus className="h-4 w-4 text-foreground" />
                </Button>
              </div>
            </div>

            {/* Search Button */}
            <div className="lg:col-span-2">
              <Button
                onClick={handleSearch}
                className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-semibold tracking-wide text-base"
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
