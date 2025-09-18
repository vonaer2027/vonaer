'use client'

import { useEffect, useState, useCallback } from 'react'
import { ClientFlightCard } from '@/components/client-flight-card'
import { BookingDialog } from '@/components/booking-dialog'
import { ThemeToggle } from '@/components/theme-toggle'
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
  const [flights, setFlights] = useState<Flight[]>([])
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([])
  const [marginSetting, setMarginSetting] = useState<MarginSetting | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('date-near')
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)

  const loadData = async () => {
    try {
      setRefreshing(true)
      
      const [flightsData, marginData] = await Promise.all([
        flightService.getAll(),
        marginService.getCurrent().catch(() => null)
      ])
      
      // Filter out flights without essential data for client view
      const validFlights = flightsData.filter(flight => 
        flight.price_numeric && 
        flight.flight_date && 
        flight.from_city && 
        flight.to_city
      )
      
      setFlights(validFlights)
      setMarginSetting(marginData)
    } catch (error) {
      console.error('Error loading data:', error)
      toast.error('항공편 로드에 실패했습니다')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const calculateFinalPrice = useCallback((flight: Flight): number => {
    if (!flight.price_numeric || !marginSetting) return flight.price_numeric || 0
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
    toast.success('예약 요청이 성공적으로 제출되었습니다! 곧 연락드리겠습니다.')
    setBookingDialogOpen(false)
    setSelectedFlight(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">이용 가능한 항공편 로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">VONAER 빈 항공편</h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button 
                onClick={loadData} 
                disabled={refreshing}
                variant="outline"
                size="sm"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
새로고침
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
이용 가능한 항공편
                  </CardTitle>
                  <CardDescription>
{filteredFlights.length}개의 빈 항공편이 이용 가능합니다
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-sm">
업데이트: {new Date().toLocaleDateString('ko-KR')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">정렬 기준:</span>
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
가격: 낮은 순
                      </div>
                    </SelectItem>
                    <SelectItem value="price-high">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <SortDesc className="h-4 w-4" />
가격: 높은 순
                      </div>
                    </SelectItem>
                    <SelectItem value="date-near">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <SortAsc className="h-4 w-4" />
날짜: 가까운 순
                      </div>
                    </SelectItem>
                    <SelectItem value="date-far">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <SortDesc className="h-4 w-4" />
날짜: 먼 순
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
                  이용 가능한 항공편이 없습니다
                </h3>
                <p className="text-sm text-muted-foreground">
                  새로운 빈 항공편 기회를 확인하려면 나중에 다시 확인하세요
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
