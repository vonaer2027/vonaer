'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { FlightCard } from '@/components/flight-card'
import { FlightForm } from '@/components/flight-form'
import { UserManagement } from '@/components/user-management'
import { MarginSettings } from '@/components/margin-settings'
import { BookingRequests } from '@/components/booking-requests'
import { MMSMessaging } from '@/components/mms-messaging'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Flight, MarginSetting, flightService, marginService } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

export default function AdminDashboard() {
  const t = useTranslations()
  const router = useRouter()
  const [flights, setFlights] = useState<Flight[]>([])
  const [marginSetting, setMarginSetting] = useState<MarginSetting | null>(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null)
  const [authChecking, setAuthChecking] = useState(true)

  // Client-side authentication check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/session')
        const data = await response.json()

        if (!data.isLoggedIn) {
          router.push('/admin/login')
          return
        }

        setAuthChecking(false)
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/admin/login')
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      if (response.ok) {
        router.push('/admin/login')
        router.refresh()
      } else {
        toast.error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Logout failed')
    }
  }

  const loadData = async () => {
    try {
      
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
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleMarginUpdate = (newMargin: MarginSetting) => {
    setMarginSetting(newMargin)
    toast.success(t('marginSettings.updateSuccess'))
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

  const handleCreateFlight = () => {
    setEditingFlight(null)
    setIsFormOpen(true)
  }

  const handleEditFlight = (flight: Flight) => {
    setEditingFlight(flight)
    setIsFormOpen(true)
  }

  const handleFormSuccess = () => {
    loadData()
    setIsFormOpen(false)
    setEditingFlight(null)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingFlight(null)
  }


  const stats = {
    totalFlights: flights.length,
    koreaFlights: flights.filter(f => f.involves_korea).length,
    averagePrice: flights.length > 0 
      ? flights.reduce((sum, f) => sum + (f.price_numeric || 0), 0) / flights.length 
      : 0,
    currentMargin: marginSetting?.margin_percentage || 0
  }

  // Show loading screen while checking authentication
  if (authChecking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    )
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
            <p className="text-muted-foreground">{t('admin.loading')}</p>
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
        <div className="container mx-auto px-4 lg:px-6 py-4 lg:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{t('admin.title')}</h1>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
            >
              Logout
            </Button>
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
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('admin.stats.totalFlights')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFlights}</div>
              <p className="text-xs text-muted-foreground">
                {t('admin.flights.description')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('admin.stats.koreaRoutes')}</CardTitle>
              <Badge variant="outline" className="text-xs">KR</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.koreaFlights}</div>
              <p className="text-xs text-muted-foreground">
                {t('admin.stats.koreaRoutes')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('admin.stats.averagePrice')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.averagePrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <p className="text-xs text-muted-foreground">
                {t('admin.stats.averagePrice')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t('admin.stats.currentMargin')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.currentMargin}%</div>
              <p className="text-xs text-muted-foreground">
                {t('admin.stats.currentMargin')}
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
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
              <TabsTrigger value="flights" className="text-xs lg:text-sm p-2 lg:p-3">
                <span className="hidden sm:inline">{t('admin.tabs.flights')} ({flights.length})</span>
                <span className="sm:hidden">{flights.length}</span>
              </TabsTrigger>
              <TabsTrigger value="bookings" className="text-xs lg:text-sm p-2 lg:p-3">
                <span className="hidden sm:inline">{t('admin.tabs.bookings')}</span>
                <span className="sm:hidden">Bookings</span>
              </TabsTrigger>
              <TabsTrigger value="mms" className="text-xs lg:text-sm p-2 lg:p-3">
                <span className="hidden sm:inline">{t('admin.tabs.mms')}</span>
                <span className="sm:hidden">MMS</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="text-xs lg:text-sm p-2 lg:p-3">
                <span className="hidden sm:inline">{t('admin.tabs.users')}</span>
                <span className="sm:hidden">Users</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs lg:text-sm p-2 lg:p-3">
                <span className="hidden sm:inline">{t('admin.tabs.settings')}</span>
                <span className="sm:hidden">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="flights" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{t('admin.flights.title')}</CardTitle>
                      <CardDescription>
                        {t('admin.flights.description')}
                      </CardDescription>
                    </div>
                    <Button onClick={handleCreateFlight}>
                      {t('admin.flights.addFlight')}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {flights.length === 0 ? (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium text-muted-foreground mb-2">
                        {t('admin.flights.noFlights')}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {t('admin.flights.noFlightsDescription')}
                      </p>
                      <Button onClick={handleCreateFlight} variant="outline">
                        {t('admin.flights.addFirstFlight')}
                      </Button>
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
                            onEdit={handleEditFlight}
                            onDelete={() => loadData()}
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

            <TabsContent value="mms">
              <MMSMessaging />
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
      </div>
      
      {/* Flight Form Dialog */}
      <FlightForm
        flight={editingFlight}
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
        mode={editingFlight ? 'edit' : 'create'}
      />
      
      <Toaster />
    </div>
  )
}
