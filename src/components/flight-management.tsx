'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FlightForm } from './flight-form'
import { Flight, TieredMarginSetting, flightService, tieredMarginService } from '@/lib/supabase'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'

interface FlightManagementProps {
  flights: Flight[]
  tieredMargins?: TieredMarginSetting[]
  onFlightsChange: () => void
}

export function FlightManagement({ flights, tieredMargins, onFlightsChange }: FlightManagementProps) {
  const t = useTranslations()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterAircraft, setFilterAircraft] = useState('all')
  const [filterKorea, setFilterKorea] = useState('all')

  const handleCreateFlight = () => {
    setEditingFlight(null)
    setIsFormOpen(true)
  }

  const handleEditFlight = (flight: Flight) => {
    setEditingFlight(flight)
    setIsFormOpen(true)
  }

  const handleFormSuccess = () => {
    onFlightsChange()
    setIsFormOpen(false)
    setEditingFlight(null)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingFlight(null)
  }

  // Filter flights based on search and filters
  const filteredFlights = flights.filter(flight => {
    const matchesSearch = searchTerm === '' || 
      flight.flight_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.aircraft?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.from_city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.to_city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flight.route_summary?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAircraft = filterAircraft === 'all' || 
      flight.aircraft?.toLowerCase().includes(filterAircraft.toLowerCase())

    const matchesKorea = filterKorea === 'all' || 
      (filterKorea === 'yes' && flight.involves_korea) ||
      (filterKorea === 'no' && !flight.involves_korea)

    return matchesSearch && matchesAircraft && matchesKorea
  })

  // Get unique aircraft types for filter
  const aircraftTypes = Array.from(new Set(flights.map(f => f.aircraft).filter(Boolean)))

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">{t('admin.flightManagement.title')}</h2>
          <p className="text-sm text-muted-foreground">
            {t('admin.flightManagement.description')} ({filteredFlights.length} {t('admin.flightManagement.of')} {flights.length})
          </p>
        </div>
        <Button onClick={handleCreateFlight} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {t('admin.flightManagement.addFlight')}
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-4 w-4" />
            {t('admin.flightManagement.filters')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('admin.flightManagement.search')}</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('admin.flightManagement.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Aircraft Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('admin.flightManagement.filterByAircraft')}</label>
              <Select value={filterAircraft} onValueChange={setFilterAircraft}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('admin.flightManagement.allAircraft')}</SelectItem>
                  {aircraftTypes.map(aircraft => (
                    <SelectItem key={aircraft} value={aircraft?.toLowerCase() || ''}>
                      {aircraft}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Korea Route Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('admin.flightManagement.filterByKorea')}</label>
              <Select value={filterKorea} onValueChange={setFilterKorea}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('admin.flightManagement.allRoutes')}</SelectItem>
                  <SelectItem value="yes">{t('admin.flightManagement.koreaRoutes')}</SelectItem>
                  <SelectItem value="no">{t('admin.flightManagement.nonKoreaRoutes')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flights List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFlights.map((flight) => (
          <FlightCardWithActions
            key={flight.id}
            flight={flight}
            tieredMargins={tieredMargins}
            onEdit={handleEditFlight}
            onDelete={onFlightsChange}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredFlights.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="text-muted-foreground">
                {searchTerm || filterAircraft !== 'all' || filterKorea !== 'all' 
                  ? t('admin.flightManagement.noMatchingFlights')
                  : t('admin.flightManagement.noFlights')
                }
              </div>
              {!searchTerm && filterAircraft === 'all' && filterKorea === 'all' && (
                <Button onClick={handleCreateFlight} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  {t('admin.flightManagement.addFirstFlight')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Flight Form Dialog */}
      <FlightForm
        flight={editingFlight}
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
        mode={editingFlight ? 'edit' : 'create'}
      />
    </div>
  )
}

// Individual flight card with action buttons
function FlightCardWithActions({
  flight,
  tieredMargins,
  onEdit,
  onDelete
}: {
  flight: Flight
  tieredMargins?: TieredMarginSetting[]
  onEdit: (flight: Flight) => void
  onDelete: () => void
}) {
  const t = useTranslations()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(t('admin.flightManagement.confirmDelete'))) return

    setIsDeleting(true)
    try {
      await flightService.delete(flight.id)
      toast.success(t('admin.flightManagement.deleted'))
      onDelete()
    } catch (error) {
      console.error('Delete error:', error)
      toast.error(t('admin.flightManagement.deleteError'))
    } finally {
      setIsDeleting(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return t('admin.flightManagement.tbd')
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">{flight.flight_id}</span>
          </div>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit(flight)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDelete}
              disabled={isDeleting}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="font-medium">{flight.aircraft || t('admin.flightManagement.tbd')}</div>
          <div className="text-sm text-muted-foreground">
            {flight.from_city} → {flight.to_city}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">{t('admin.flightManagement.date')}</div>
            <div>{formatDate(flight.flight_date)}</div>
          </div>
          <div>
            <div className="text-muted-foreground">{t('admin.flightManagement.seats')}</div>
            <div>{flight.seats || t('admin.flightManagement.tbd')}</div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">{t('admin.flightManagement.price')}</span>
            <span className="font-medium">
              {(() => {
                const roundUpToNearestHundred = (price: number) => Math.ceil(price / 100) * 100
                // Priority 1: Custom price
                if (flight.custom_price !== null && flight.custom_price !== undefined) {
                  return `$${flight.custom_price.toLocaleString()}`
                }
                // Priority 2: Tiered margins
                if (flight.price_numeric && tieredMargins && tieredMargins.length > 0) {
                  const { adjustedPrice } = tieredMarginService.calculateAdjustedPrice(flight.price_numeric, tieredMargins)
                  return `$${roundUpToNearestHundred(adjustedPrice).toLocaleString()}`
                }
                // Fallback to original price
                return flight.price || t('admin.flightManagement.tbd')
              })()}
            </span>
          </div>
          {flight.involves_korea && (
            <div className="mt-1">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {t('admin.flightManagement.koreaRoute')}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
