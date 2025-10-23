'use client'

import { useEffect, useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { ClientFlightCard } from '@/components/client-flight-card'
import { BookingDialog } from '@/components/booking-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Plane, Filter, SortAsc, SortDesc, Calendar, DollarSign, RefreshCw } from 'lucide-react'
import { Flight, MarginSetting, flightService, marginService } from '@/lib/supabase'
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
      
      const [flightsData, marginData] = await Promise.all([
        flightService.getAll(),
        marginService.getCurrent().catch(() => null)
      ])
      
      // Filter out flights without essential data for client view
      const validFlights = flightsData.filter(flight =>
        (flight.price_numeric || flight.price) && // Allow both numeric prices and "Enquire for Price"
        flight.flight_date &&
        flight.from_city &&
        flight.to_city
      )
      
      setFlights(validFlights)
      setMarginSetting(marginData)
    } catch (error) {
      console.error('Error loading data:', error)
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
    
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => {
          const priceA = calculateFinalPrice(a)
          const priceB = calculateFinalPrice(b)
          return priceA - priceB
        })
        break
      case 'price-high':
        sorted.sort((a, b) => {
          const priceA = calculateFinalPrice(a)
          const priceB = calculateFinalPrice(b)
          return priceB - priceA
        })
        break
      case 'date-near':
        sorted.sort((a, b) => {
          const dateA = new Date(a.flight_date || '').getTime()
          const dateB = new Date(b.flight_date || '').getTime()
          return dateA - dateB
        })
        break
      case 'date-far':
        sorted.sort((a, b) => {
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
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t('client.title')}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                onClick={loadData} 
                disabled={refreshing}
                variant="outline"
                size="sm"
                className="text-foreground hover:text-foreground"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
{t('client.refresh')}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats and Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="h-5 w-5" />
                    {t('client.availableFlights')}
                  </CardTitle>
                  <CardDescription>
                    {t('client.flightsAvailable', { count: filteredFlights.length })}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-sm">
                  {t('client.updateDate')} {new Date().toLocaleDateString('ko-KR')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{t('client.sortBy')}</span>
                </div>
                <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <SortAsc className="h-4 w-4" />
                        {t('client.sortOptions.priceLow')}
                      </div>
                    </SelectItem>
                    <SelectItem value="price-high">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <SortDesc className="h-4 w-4" />
                        {t('client.sortOptions.priceHigh')}
                      </div>
                    </SelectItem>
                    <SelectItem value="date-near">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <SortAsc className="h-4 w-4" />
                        {t('client.sortOptions.dateNear')}
                      </div>
                    </SelectItem>
                    <SelectItem value="date-far">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <SortDesc className="h-4 w-4" />
                        {t('client.sortOptions.dateFar')}
                      </div>
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
                <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
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
