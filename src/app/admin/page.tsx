'use client'

import { useEffect, useState } from 'react'
import { FlightCard } from '@/components/flight-card'
import { UserManagement } from '@/components/user-management'
import { MarginSettings } from '@/components/margin-settings'
import { BookingRequests } from '@/components/booking-requests'
import { ThemeToggle } from '@/components/theme-toggle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plane, Users, Settings, RefreshCw, TrendingUp, Phone, ExternalLink, Home } from 'lucide-react'
import { Flight, MarginSetting, flightService, marginService } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

export default function AdminDashboard() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [marginSetting, setMarginSetting] = useState<MarginSetting | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadData = async () => {
    try {
      setRefreshing(true)
      
      // Check if environment variables are available
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.error('Missing Supabase environment variables')
        toast.error('Configuration error: Missing database connection')
        return
      }
      
      const [flightsData, marginData] = await Promise.all([
        flightService.getAll(),
        marginService.getCurrent().catch(() => null) // Handle case where no margin is set
      ])
      
      setFlights(flightsData)
      setMarginSetting(marginData)
    } catch (error) {
      console.error('Error loading data:', error)
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleMarginUpdate = (newMargin: MarginSetting) => {
    setMarginSetting(newMargin)
    toast.success('마진 설정이 성공적으로 업데이트되었습니다')
  }

  const handlePriceUpdate = async (flightId: number, newPrice: number) => {
    // Update local flight data with new custom price
    setFlights(prev => prev.map(flight => 
      flight.id === flightId 
        ? { ...flight, custom_price: newPrice }
        : flight
    ))
    
    // Also refresh the data to ensure we have the latest from database
    try {
      await loadData()
    } catch (error) {
      console.warn('Failed to refresh data after price update:', error)
    }
  }

  const testCustomPriceUpdate = async () => {
    if (flights.length === 0) {
      toast.error('No flights available to test')
      return
    }
    
    const firstFlight = flights[0]
    try {
      const result = await flightService.testCustomPriceUpdate(firstFlight.id)
      console.log('Test result:', result)
      if (result.success) {
        toast.success('Custom price update test successful!')
      } else {
        toast.error(`Test failed: ${result.error}`)
      }
    } catch (error) {
      console.error('Test error:', error)
      toast.error('Test failed with error')
    }
  }

  const stats = {
    totalFlights: flights.length,
    koreaFlights: flights.filter(f => f.involves_korea).length,
    averagePrice: flights.length > 0 
      ? flights.reduce((sum, f) => sum + (f.price_numeric || 0), 0) / flights.length 
      : 0,
    currentMargin: marginSetting?.margin_percentage || 0
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">VONAER 대시보드 로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-6 py-4 lg:py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">VONAER 관리자 대시보드</h1>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button 
                asChild
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
              >
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <Home className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">랜딩 페이지 보기</span>
                  <span className="sm:hidden">홈</span>
                </a>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
              >
                <a href="/empty" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">고객 사이트 보기</span>
                  <span className="sm:hidden">고객</span>
                </a>
              </Button>
              <ThemeToggle />
              <Button 
                onClick={loadData} 
                disabled={refreshing}
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">새로고침</span>
              </Button>
              <Button 
                onClick={testCustomPriceUpdate}
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
              >
                <span className="hidden sm:inline">가격 테스트</span>
                <span className="sm:hidden">테스트</span>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">전체 항공편</CardTitle>
              <Plane className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFlights}</div>
              <p className="text-xs text-muted-foreground">
                이용 가능한 빈 항공편
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">한국 노선</CardTitle>
              <Badge variant="outline" className="text-xs">KR</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.koreaFlights}</div>
              <p className="text-xs text-muted-foreground">
                한국 관련 항공편
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">평균 가격</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.averagePrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <p className="text-xs text-muted-foreground">
                평균 항공편 가격
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">현재 마진</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.currentMargin}%</div>
              <p className="text-xs text-muted-foreground">
                모든 항공편에 적용
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="flights" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
              <TabsTrigger value="flights" className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm p-2 lg:p-3">
                <Plane className="h-3 w-3 lg:h-4 lg:w-4" />
                <span className="hidden sm:inline">항공편 ({flights.length})</span>
                <span className="sm:hidden">{flights.length}</span>
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm p-2 lg:p-3">
                <Phone className="h-3 w-3 lg:h-4 lg:w-4" />
                <span className="hidden sm:inline">예약</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm p-2 lg:p-3">
                <Users className="h-3 w-3 lg:h-4 lg:w-4" />
                <span className="hidden sm:inline">사용자</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm p-2 lg:p-3">
                <Settings className="h-3 w-3 lg:h-4 lg:w-4" />
                <span className="hidden sm:inline">설정</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="flights" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>빈 항공편</CardTitle>
                  <CardDescription>
                    현재 가격이 적용된 모든 이용 가능한 빈 항공편
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {flights.length === 0 ? (
                    <div className="text-center py-12">
                      <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-muted-foreground mb-2">
                        이용 가능한 항공편이 없습니다
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        새로운 빈 항공편 기회를 확인하려면 나중에 다시 확인하세요
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {flights.map((flight, index) => (
                        <motion.div
                          key={flight.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <FlightCard 
                            flight={flight} 
                            marginSetting={marginSetting || undefined}
                            onPriceUpdate={handlePriceUpdate}
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings">
              <BookingRequests />
            </TabsContent>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            <TabsContent value="settings">
              <MarginSettings 
                currentMargin={marginSetting}
                onMarginUpdate={handleMarginUpdate}
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      
      <Toaster />
    </div>
  )
}
