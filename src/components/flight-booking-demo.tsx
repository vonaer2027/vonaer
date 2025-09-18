'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { FlightDatePicker } from '@/components/flight-date-picker'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plane, Users, Calendar, MapPin } from 'lucide-react'

export function FlightBookingDemo() {
  const t = useTranslations()
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [passengers, setPassengers] = useState('1')
  const [fromCity, setFromCity] = useState('')
  const [toCity, setToCity] = useState('')

  const today = new Date()
  const nextYear = new Date()
  nextYear.setFullYear(today.getFullYear() + 1)

  const handleSearch = () => {
    console.log('Searching flights:', {
      departureDate,
      returnDate,
      passengers,
      fromCity,
      toCity
    })
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Plane className="h-6 w-6 text-primary" />
          {t('common.bookingRequest')}
        </CardTitle>
        <CardDescription>
          {t('client.subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Route Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {t('common.from')}
            </Label>
            <Input
              id="from"
              placeholder="Seoul, South Korea"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              className="h-12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="to" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {t('common.to')}
            </Label>
            <Input
              id="to"
              placeholder="Tokyo, Japan"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              className="h-12"
            />
          </div>
        </div>

        {/* Date Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {t('common.departure')}
            </Label>
            <FlightDatePicker
              date={departureDate}
              onDateSelect={setDepartureDate}
              placeholder={t('common.selectDate')}
              minDate={today}
              maxDate={nextYear}
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {t('common.arrival')}
            </Label>
            <FlightDatePicker
              date={returnDate}
              onDateSelect={setReturnDate}
              placeholder={t('common.selectDate')}
              minDate={departureDate || today}
              maxDate={nextYear}
            />
          </div>
        </div>

        {/* Passengers */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {t('common.passengers')}
          </Label>
          <Select value={passengers} onValueChange={setPassengers}>
            <SelectTrigger className="h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? t('common.passenger') : t('common.passengers')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <Button 
          onClick={handleSearch}
          className="w-full h-12 text-lg font-medium"
          size="lg"
        >
          <Plane className="h-5 w-5 mr-2" />
          {t('client.bookFlight')}
        </Button>
      </CardContent>
    </Card>
  )
}
