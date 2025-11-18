'use client'

import { useEffect, useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { ClientFlightCard } from '@/components/client-flight-card'
import { BookingDialog } from '@/components/booking-dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Flight, MarginSetting, flightService, marginService } from '@/lib/supabase'
import { VonaerFooter } from '@/components/vonaer-footer'
import { motion } from 'framer-motion'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

type SortOption = 'price-low' | 'price-high' | 'date-near' | 'date-far'

export default function ClientFlightsPage() {
  const t = useTranslations()
  const [flights, setFlights] = useState<Flight[]>([])
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([])
  const [marginSetting, setMarginSetting] = useState<MarginSetting | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('date-near')
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const loadData = useCallback(async () => {
    try {
      setRefreshing(true)

      console.log('[Empty Leg] Fetching flights from Supabase...')

      const [flightsData, marginData] = await Promise.all([
        flightService.getAll(),
        marginService.getCurrent().catch(() => null)
      ])

      console.log('[Empty Leg] Raw flights data:', {
        total: flightsData.length,
        flights: flightsData.map(f => ({
          id: f.flight_id,
          route: `${f.from_city} → ${f.to_city}`,
          date: f.flight_date,
          price: f.price,
          source: f.source,
          is_active: f.is_active
        }))
      })

      // Filter out flights without essential data for client view
      const validFlights = flightsData.filter(flight =>
        (flight.price_numeric || flight.price) && // Allow both numeric prices and "Enquire for Price"
        flight.flight_date &&
        flight.from_city &&
        flight.to_city
      )

      console.log('[Empty Leg] Valid flights after filtering:', {
        valid: validFlights.length,
        filtered_out: flightsData.length - validFlights.length
      })

      // Remove duplicates based on flight details
      const uniqueFlights = validFlights.reduce((acc, flight) => {
        // Create a unique key based on flight details
        const key = `${flight.flight_date}_${flight.from_city}_${flight.to_city}_${flight.aircraft || 'unknown'}`

        // If we haven't seen this flight before, add it
        if (!acc.has(key)) {
          acc.set(key, flight)
        } else {
          // If we have seen it, keep the one with more complete data
          const existing = acc.get(key)!
          if ((flight.image_urls?.length || 0) > (existing.image_urls?.length || 0) ||
              (flight.custom_price !== null && existing.custom_price === null)) {
            acc.set(key, flight)
          }
        }

        return acc
      }, new Map<string, Flight>())

      const deduplicatedFlights = Array.from(uniqueFlights.values())

      console.log('[Empty Leg] Deduplicated flights:', {
        before: validFlights.length,
        after: deduplicatedFlights.length,
        removed: validFlights.length - deduplicatedFlights.length
      })

      if (deduplicatedFlights.length === 0 && flightsData.length > 0) {
        console.warn('[Empty Leg] All flights were filtered out. Check data quality:', {
          missing_price: flightsData.filter(f => !f.price_numeric && !f.price).length,
          missing_date: flightsData.filter(f => !f.flight_date).length,
          missing_from: flightsData.filter(f => !f.from_city).length,
          missing_to: flightsData.filter(f => !f.to_city).length
        })
      }

      setFlights(deduplicatedFlights)
      setMarginSetting(marginData)

      if (marginData) {
        console.log('[Empty Leg] Margin setting:', marginData.margin_percentage + '%')
      }
    } catch (error) {
      console.error('[Empty Leg] Error loading data:', error)
      toast.error(t('client.loading'))
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [t])

  useEffect(() => {
    loadData()
  }, [loadData])

  const calculateFinalPrice = useCallback((flight: Flight): number => {
    if (!flight.price_numeric) return 0 // Enquire-only flights sort to end
    if (!marginSetting) return flight.price_numeric
    return flight.price_numeric * (1 + (marginSetting.margin_percentage / 100))
  }, [marginSetting])

  useEffect(() => {
    const sorted = [...flights]

    // Helper function to check if flight departs from Seoul
    const isSeoulDeparture = (flight: Flight) => {
      const fromCity = flight.from_city?.toLowerCase() || ''
      return fromCity.includes('seoul') || fromCity.includes('서울') || fromCity.includes('gimpo') || fromCity.includes('incheon')
    }

    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => {
          // Prioritize Seoul departures first
          const aSeoul = isSeoulDeparture(a)
          const bSeoul = isSeoulDeparture(b)
          if (aSeoul && !bSeoul) return -1
          if (!aSeoul && bSeoul) return 1

          const priceA = calculateFinalPrice(a)
          const priceB = calculateFinalPrice(b)
          return priceA - priceB
        })
        break
      case 'price-high':
        sorted.sort((a, b) => {
          // Prioritize Seoul departures first
          const aSeoul = isSeoulDeparture(a)
          const bSeoul = isSeoulDeparture(b)
          if (aSeoul && !bSeoul) return -1
          if (!aSeoul && bSeoul) return 1

          const priceA = calculateFinalPrice(a)
          const priceB = calculateFinalPrice(b)
          return priceB - priceA
        })
        break
      case 'date-near':
        sorted.sort((a, b) => {
          // Prioritize Seoul departures first
          const aSeoul = isSeoulDeparture(a)
          const bSeoul = isSeoulDeparture(b)
          if (aSeoul && !bSeoul) return -1
          if (!aSeoul && bSeoul) return 1

          const dateA = new Date(a.flight_date || '').getTime()
          const dateB = new Date(b.flight_date || '').getTime()
          return dateA - dateB
        })
        break
      case 'date-far':
        sorted.sort((a, b) => {
          // Prioritize Seoul departures first
          const aSeoul = isSeoulDeparture(a)
          const bSeoul = isSeoulDeparture(b)
          if (aSeoul && !bSeoul) return -1
          if (!aSeoul && bSeoul) return 1

          const dateA = new Date(a.flight_date || '').getTime()
          const dateB = new Date(b.flight_date || '').getTime()
          return dateB - dateA
        })
        break
    }

    setFilteredFlights(sorted)
  }, [flights, sortBy, marginSetting, calculateFinalPrice])

  const handleBookingRequest = (flight: Flight) => {
    setSelectedFlight(flight)
    setBookingDialogOpen(true)
  }

  const handleBookingSuccess = () => {
    toast.success(t('bookingDialog.bookingRequestSuccess'))
    setBookingDialogOpen(false)
    setSelectedFlight(null)
  }

  if (loading) {
    return (
      <div className="bg-primary text-primary-foreground relative min-h-screen">
        {/* Sticky Header */}
        <VonaerHeader 
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen(!menuOpen)}
        />

        {/* Full Screen Menu Overlay */}
        <VonaerMenuOverlay 
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
        />

        <div className="min-h-screen bg-background flex items-center justify-center pt-20">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">{t('client.loading')}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-primary text-primary-foreground relative min-h-screen">
      {/* Sticky Header */}
      <VonaerHeader 
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
      />

      {/* Full Screen Menu Overlay */}
      <VonaerMenuOverlay 
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">Empty Leg</h1>
        </motion.div>

        {/* Stats and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">{t('client.sortBy')}</span>
                <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">
                      {t('client.sortOptions.priceLow')}
                    </SelectItem>
                    <SelectItem value="price-high">
                      {t('client.sortOptions.priceHigh')}
                    </SelectItem>
                    <SelectItem value="date-near">
                      {t('client.sortOptions.dateNear')}
                    </SelectItem>
                    <SelectItem value="date-far">
                      {t('client.sortOptions.dateFar')}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Flights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {filteredFlights.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  {t('client.noFlights')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('client.noFlightsDescription')}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFlights.map((flight, index) => (
                <motion.div
                  key={flight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ClientFlightCard 
                    flight={flight} 
                    marginSetting={marginSetting || undefined}
                    onBookingRequest={() => handleBookingRequest(flight)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
        </div>
      </div>

      <VonaerFooter />

      {/* Booking Dialog */}
      <BookingDialog
        flight={selectedFlight}
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        onSuccess={handleBookingSuccess}
      />

      <Toaster />
    </div>
  )
}
