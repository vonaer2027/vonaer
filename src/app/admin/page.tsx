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
    toast.success('Margin settings updated successfully')
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
          <p className="text-muted-foreground">Loading Vonaer dashboard...</p>
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
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Vonaer Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1 text-sm lg:text-base">
                Comprehensive platform for managing empty leg flights, users, and pricing
              </p>
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
                  <span className="hidden sm:inline">View Landing Page</span>
                  <span className="sm:hidden">Home</span>
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
                  <span className="hidden sm:inline">View Client Site</span>
                  <span className="sm:hidden">Client</span>
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
                <span className="hidden sm:inline">Refresh</span>
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
              <CardTitle className="text-sm font-medium">Total Flights</CardTitle>
              <Plane className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFlights}</div>
              <p className="text-xs text-muted-foreground">
                Available empty legs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Korea Routes</CardTitle>
              <Badge variant="outline" className="text-xs">KR</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.koreaFlights}</div>
              <p className="text-xs text-muted-foreground">
                Flights involving Korea
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.averagePrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <p className="text-xs text-muted-foreground">
                Average flight price
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Margin</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.currentMargin}%</div>
              <p className="text-xs text-muted-foreground">
                Applied to all flights
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
                <span className="hidden sm:inline">Flights ({flights.length})</span>
                <span className="sm:hidden">{flights.length}</span>
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm p-2 lg:p-3">
                <Phone className="h-3 w-3 lg:h-4 lg:w-4" />
                <span className="hidden sm:inline">Bookings</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm p-2 lg:p-3">
                <Users className="h-3 w-3 lg:h-4 lg:w-4" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-1 lg:gap-2 text-xs lg:text-sm p-2 lg:p-3">
                <Settings className="h-3 w-3 lg:h-4 lg:w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="flights" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Empty Leg Flights</CardTitle>
                  <CardDescription>
                    All available empty leg flights with current pricing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {flights.length === 0 ? (
                    <div className="text-center py-12">
                      <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-muted-foreground mb-2">
                        No flights available
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Check back later for new empty leg opportunities
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
