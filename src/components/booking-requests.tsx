'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Phone, Calendar, Plane, ArrowRight, Check, RefreshCw, Trash2, Eye, Users } from "lucide-react"
import { BookingRequest, bookingRequestService } from "@/lib/supabase"
import { motion } from "framer-motion"
import { toast } from 'sonner'

export function BookingRequests() {
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedFlight, setSelectedFlight] = useState<BookingRequest | null>(null)
  const [flightDetailsOpen, setFlightDetailsOpen] = useState(false)

  const loadBookingRequests = async () => {
    try {
      setRefreshing(true)
      const data = await bookingRequestService.getAll()
      setBookingRequests(data)
    } catch (error) {
      console.error('Error loading booking requests:', error)
      toast.error('Failed to load booking requests')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadBookingRequests()
  }, [])

  const handleMarkAsCalled = async (id: number) => {
    try {
      await bookingRequestService.markAsCalled(id)
      setBookingRequests(prev => 
        prev.map(request => 
          request.id === id ? { ...request, called: true } : request
        )
      )
      toast.success('Marked as called')
    } catch (error) {
      console.error('Error marking as called:', error)
      toast.error('Failed to update status')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this booking request?')) return
    
    try {
      await bookingRequestService.delete(id)
      setBookingRequests(prev => prev.filter(request => request.id !== id))
      toast.success('Booking request deleted')
    } catch (error) {
      console.error('Error deleting booking request:', error)
      toast.error('Failed to delete booking request')
    }
  }

  const handleViewFlightDetails = (request: BookingRequest) => {
    setSelectedFlight(request)
    setFlightDetailsOpen(true)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatFlightDate = (dateString?: string) => {
    if (!dateString) return 'TBD'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const pendingRequests = bookingRequests.filter(req => !req.called)
  const completedRequests = bookingRequests.filter(req => req.called)

  if (loading) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading booking requests...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Booking Requests</h3>
          <p className="text-sm text-muted-foreground">
            Customer inquiries for empty leg flights
          </p>
        </div>
        <Button 
          onClick={loadBookingRequests} 
          disabled={refreshing}
          variant="outline"
          size="sm"
          className="self-start sm:self-auto"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookingRequests.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingRequests.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Called</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedRequests.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-orange-600" />
              Pending Calls ({pendingRequests.length})
            </CardTitle>
            <CardDescription>
              New booking requests that need to be contacted
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-full inline-block align-middle">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[150px] sm:w-[200px]">Customer</TableHead>
                      <TableHead className="min-w-[120px] sm:w-[180px]">Flight</TableHead>
                      <TableHead className="min-w-[140px] sm:w-[160px]">Route</TableHead>
                      <TableHead className="min-w-[100px] sm:w-[140px]">Flight Date</TableHead>
                      <TableHead className="min-w-[100px] sm:w-[140px]">Requested</TableHead>
                      <TableHead className="min-w-[120px] sm:w-[160px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                <TableBody>
                  {pendingRequests.map((request, index) => (
                    <motion.tr
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/30"
                    >
                      <TableCell className="py-4">
                        <div className="space-y-1">
                          <div className="font-semibold text-sm">
                            {request.customer_name}
                          </div>
                          <div className="text-sm text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded font-medium">
                            {request.customer_phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="font-medium text-sm">
                          {request.flight?.aircraft || 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-1 text-sm">
                          <span className="font-medium">{request.flight?.from_city}</span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground mx-1" />
                          <span className="font-medium">{request.flight?.to_city}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="text-sm font-medium">
                          {formatFlightDate(request.flight?.flight_date)}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="text-xs text-muted-foreground">
                          {formatDate(request.created_at)}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-1 flex-wrap">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewFlightDetails(request)}
                            className="h-8 w-8 p-0 flex-shrink-0"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleMarkAsCalled(request.id)}
                            className="bg-green-600 hover:bg-green-700 text-xs h-8 flex-shrink-0"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">Called</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(request.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed Requests */}
      {completedRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              Called ({completedRequests.length})
            </CardTitle>
            <CardDescription>
              Customers that have been contacted
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-full inline-block align-middle">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[150px] sm:w-[200px]">Customer</TableHead>
                      <TableHead className="min-w-[120px] sm:w-[180px]">Flight</TableHead>
                      <TableHead className="min-w-[140px] sm:w-[160px]">Route</TableHead>
                      <TableHead className="min-w-[100px] sm:w-[140px]">Flight Date</TableHead>
                      <TableHead className="min-w-[100px] sm:w-[140px]">Requested</TableHead>
                      <TableHead className="min-w-[100px] sm:w-[120px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                <TableBody>
                  {completedRequests.map((request) => (
                    <TableRow key={request.id} className="hover:bg-muted/30">
                      <TableCell className="py-4">
                        <div className="space-y-1">
                          <div className="font-semibold text-sm">
                            {request.customer_name}
                          </div>
                          <div className="text-sm text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded font-medium">
                            {request.customer_phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="font-medium text-sm">
                          {request.flight?.aircraft || 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-1 text-sm">
                          <span className="font-medium">{request.flight?.from_city}</span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground mx-1" />
                          <span className="font-medium">{request.flight?.to_city}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="text-sm font-medium">
                          {formatFlightDate(request.flight?.flight_date)}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="text-xs text-muted-foreground">
                          {formatDate(request.created_at)}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewFlightDetails(request)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                            <Check className="h-3 w-3 mr-1" />
                            Called
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(request.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {bookingRequests.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Phone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">
              No booking requests yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Customer booking requests will appear here
            </p>
          </CardContent>
        </Card>
      )}

      {/* Flight Details Modal - No Scroll Admin View */}
      <Dialog open={flightDetailsOpen} onOpenChange={setFlightDetailsOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <Plane className="h-4 w-4 text-primary" />
              Booking Details
            </DialogTitle>
            <DialogDescription className="text-xs">
              {selectedFlight?.customer_name}&apos;s booking request
            </DialogDescription>
          </DialogHeader>

          {selectedFlight && (
            <div className="space-y-3">
              {/* Customer & Flight Info - Combined */}
              <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                {/* Customer Info */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs text-muted-foreground">Customer</div>
                    <div className="font-semibold text-xs">{selectedFlight.customer_name}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Phone</div>
                    <div className="font-mono font-semibold text-xs">{selectedFlight.customer_phone}</div>
                  </div>
                </div>
                
                {/* Status & Request Date */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-muted">
                  <div>
                    <div className="text-xs text-muted-foreground">Status</div>
                    <div>
                      {selectedFlight.called ? (
                        <Badge className="bg-green-100 text-green-800 text-xs h-5">Called</Badge>
                      ) : (
                        <Badge className="bg-orange-100 text-orange-800 text-xs h-5">Pending</Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Requested</div>
                    <div className="text-xs font-medium">{formatDate(selectedFlight.created_at)}</div>
                  </div>
                </div>
              </div>

              {/* Flight Summary - Ultra Compact */}
              {selectedFlight.flight && (
                <div className="bg-muted/30 rounded-lg p-2">
                  <div className="text-center space-y-1">
                    <h3 className="font-semibold text-xs">{selectedFlight.flight.aircraft}</h3>
                    <div className="flex items-center justify-center gap-2 font-medium">
                      <span className="text-xs">{selectedFlight.flight.from_city}</span>
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <span className="text-xs">{selectedFlight.flight.to_city}</span>
                    </div>
                    <div className="flex justify-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-2 w-2" />
                        {formatFlightDate(selectedFlight.flight.flight_date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-2 w-2" />
                        {selectedFlight.flight.seats} seats
                      </span>
                      {selectedFlight.flight.price && (
                        <span className="font-semibold text-primary text-xs">
                          {selectedFlight.flight.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Aircraft Image - Extra Compact */}
              {selectedFlight.flight?.image_urls && selectedFlight.flight.image_urls.length > 0 && (
                <div className="relative h-20 w-full overflow-hidden rounded-lg">
                  <img
                    src={selectedFlight.flight.image_urls[0]}
                    alt={`${selectedFlight.flight.aircraft || 'Aircraft'} image`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              )}

              {/* Consent Info */}
              <div className="bg-muted/30 rounded-lg p-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Privacy Consent</span>
                  {selectedFlight.consent_given ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs h-5">
                      <Check className="h-2 w-2 mr-1" />
                      Given
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs h-5">
                      Not Given
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-3 mt-3 border-t">
            {selectedFlight && !selectedFlight.called && (
              <Button
                onClick={() => handleMarkAsCalled(selectedFlight.id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-xs h-8"
                size="sm"
              >
                <Check className="h-3 w-3 mr-1" />
                Mark as Called
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setFlightDetailsOpen(false)}
              className="flex-1 text-xs h-8"
              size="sm"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
