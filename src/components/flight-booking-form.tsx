'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Minus, 
  Plus
} from 'lucide-react'

export function FlightBookingForm() {
  const [tripType, setTripType] = useState('one-way')
  const [passengers, setPassengers] = useState(1)
  const [fromLocation, setFromLocation] = useState('')
  const [toLocation, setToLocation] = useState('')
  const [departDate, setDepartDate] = useState('')
  const [returnDate, setReturnDate] = useState('')

  const handleSearch = () => {
    // Handle flight search logic
    console.log({
      tripType,
      passengers,
      fromLocation,
      toLocation,
      departDate,
      returnDate
    })
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
            <h2 className="text-4xl font-bold text-foreground mb-4">BOOK A FLIGHT</h2>
            <p className="text-muted-foreground text-lg">
              Please fill out the form to be connected with our sales team. Private jet charter costs are subject to various factors and start at <span className="font-semibold text-foreground">$5,000 per hour</span>.
            </p>
          </div>

          {/* Trip Type Selector */}
          <div className="mb-8">
            <Tabs value={tripType} onValueChange={setTripType} className="w-full">
              <TabsList className="grid w-full max-w-sm grid-cols-2 h-12">
                <TabsTrigger value="one-way" className="text-sm font-medium">
                  ONE WAY
                </TabsTrigger>
                <TabsTrigger value="round-trip" className="text-sm font-medium">
                  ROUND TRIP
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Booking Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
            {/* From */}
            <div className="lg:col-span-1">
              <Input
                id="from"
                placeholder="Departure city"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="h-14 text-base"
              />
            </div>

            {/* To */}
            <div className="lg:col-span-1">
              <Input
                id="to"
                placeholder="Destination city"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="h-14 text-base"
              />
            </div>

            {/* Depart Date */}
            <div className="lg:col-span-1">
              <Input
                id="depart"
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className="h-14 text-base [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:invert-0 dark:[&::-webkit-calendar-picker-indicator]:invert [&::-webkit-datetime-edit-text]:text-foreground [&::-webkit-datetime-edit]:text-foreground"
              />
            </div>

            {/* Return Date - only show for round trip */}
            {tripType === 'round-trip' && (
              <div className="lg:col-span-1">
                <Input
                  id="return"
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="h-14 text-base [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:invert-0 dark:[&::-webkit-calendar-picker-indicator]:invert [&::-webkit-datetime-edit-text]:text-foreground [&::-webkit-datetime-edit]:text-foreground"
                />
              </div>
            )}

            {/* Passengers */}
            <div className={`${tripType === 'round-trip' ? 'lg:col-span-1' : 'lg:col-span-2'}`}>
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
                  {passengers} Passenger{passengers !== 1 ? 's' : ''}
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
            <div className="lg:col-span-1">
              <Button
                onClick={handleSearch}
                className="w-full h-14 bg-black text-white hover:bg-gray-800 transition-all duration-300 font-semibold tracking-wide text-base"
              >
                SEARCH
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
