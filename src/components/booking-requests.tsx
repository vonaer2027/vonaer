'use client'

import { useEffect, useState, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Phone, Calendar, Plane, ArrowRight, Check, RefreshCw, Trash2, Eye, Users } from "lucide-react"
import Image from "next/image"
import { BookingRequest, TieredMarginSetting, bookingRequestService, tieredMarginService } from "@/lib/supabase"
import { motion } from "framer-motion"
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'

export function BookingRequests() {
  const t = useTranslations()
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([])
  const [tieredMargins, setTieredMargins] = useState<TieredMarginSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedFlight, setSelectedFlight] = useState<BookingRequest | null>(null)
  const [flightDetailsOpen, setFlightDetailsOpen] = useState(false)

  const loadBookingRequests = useCallback(async () => {
    try {
      setRefreshing(true)
      const [data, marginsData] = await Promise.all([
        bookingRequestService.getAll(),
        tieredMarginService.getAll().catch(() => [])
      ])
      setBookingRequests(data)
      setTieredMargins(marginsData)
    } catch (error) {
      console.error('Error loading booking requests:', error)
      toast.error(t('bookingRequests.loading.failed'))
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [t])

  // Calculate display price with tiered margins
  const calculateDisplayPrice = (flight: BookingRequest['flight']): string => {
    if (!flight) return 'N/A'

    const roundUpToNearestHundred = (price: number) => Math.ceil(price / 100) * 100

    // Priority 1: Custom price
    if (flight.custom_price !== null && flight.custom_price !== undefined) {
      return `$${flight.custom_price.toLocaleString()}`
    }

    // Priority 2: Calculate with tiered margins
    if (flight.price_numeric && tieredMargins && tieredMargins.length > 0) {
      const { adjustedPrice } = tieredMarginService.calculateAdjustedPrice(flight.price_numeric, tieredMargins)
      const roundedPrice = roundUpToNearestHundred(adjustedPrice)
      return `$${roundedPrice.toLocaleString()}`
    }

    // Fallback to original price
    return flight.price || 'N/A'
  }

  useEffect(() => {
    loadBookingRequests()
  }, [loadBookingRequests])

  const handleMarkAsCalled = async (id: number) => {
    try {
      await bookingRequestService.markAsCalled(id)
      setBookingRequests(prev => 
        prev.map(request => 
          request.id === id ? { ...request, called: true } : request
        )
      )
      toast.success(t('bookingRequests.success.markedAsCalled'))
    } catch (error) {
      console.error('Error marking as called:', error)
      toast.error(t('bookingRequests.error.statusUpdateFailed'))
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm(t('bookingRequests.confirmDelete'))) return
    
    try {
      await bookingRequestService.delete(id)
      setBookingRequests(prev => prev.filter(request => request.id !== id))
      toast.success(t('bookingRequests.success.deleted'))
    } catch (error) {
      console.error('Error deleting booking request:', error)
      toast.error(t('bookingRequests.error.deleteFailed'))
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
          <p className="text-muted-foreground">{t('bookingRequests.loading.text')}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{t('bookingRequests.title')}</h3>
          <p className="text-sm text-muted-foreground">
            {t('bookingRequests.subtitle')}
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
{t('bookingRequests.refresh')}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('bookingRequests.stats.totalRequests')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookingRequests.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('bookingRequests.stats.pendingCalls')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{pendingRequests.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t('bookingRequests.stats.completedCalls')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">{completedRequests.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
대기 중인 통화 ({pendingRequests.length})
            </CardTitle>
            <CardDescription>
연락이 필요한 새로운 예약 요청
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-full inline-block align-middle">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[150px] sm:w-[200px]">고객</TableHead>
                      <TableHead className="min-w-[120px] sm:w-[180px]">항공편</TableHead>
                      <TableHead className="min-w-[140px] sm:w-[160px]">노선</TableHead>
                      <TableHead className="min-w-[100px] sm:w-[140px]">항공편 날짜</TableHead>
                      <TableHead className="min-w-[100px] sm:w-[140px]">요청일</TableHead>
                      <TableHead className="min-w-[120px] sm:w-[160px]">작업</TableHead>
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
                          {request.customer_email && (
                            <div className="text-xs text-muted-foreground">
                              {request.customer_email}
                            </div>
                          )}
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
                            className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-8 flex-shrink-0"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">통화 완료</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(request.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive/80 hover:bg-destructive/10 flex-shrink-0"
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
              <Check className="h-5 w-5 text-muted-foreground" />
통화 완료 ({completedRequests.length})
            </CardTitle>
            <CardDescription>
연락이 완료된 고객
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-full inline-block align-middle">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[150px] sm:w-[200px]">고객</TableHead>
                      <TableHead className="min-w-[120px] sm:w-[180px]">항공편</TableHead>
                      <TableHead className="min-w-[140px] sm:w-[160px]">노선</TableHead>
                      <TableHead className="min-w-[100px] sm:w-[140px]">항공편 날짜</TableHead>
                      <TableHead className="min-w-[100px] sm:w-[140px]">요청일</TableHead>
                      <TableHead className="min-w-[100px] sm:w-[120px]">작업</TableHead>
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
                          {request.customer_email && (
                            <div className="text-xs text-muted-foreground">
                              {request.customer_email}
                            </div>
                          )}
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
                          <Badge className="bg-muted text-muted-foreground hover:bg-muted text-xs">
                            <Check className="h-3 w-3 mr-1" />
통화 완료
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(request.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
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
                예약 요청이 아직 없습니다
              </h3>
              <p className="text-sm text-muted-foreground">
                고객 예약 요청이 여기에 나타납니다
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
예약 세부사항
            </DialogTitle>
            <DialogDescription className="text-xs">
{selectedFlight?.customer_name}님의 예약 요청
            </DialogDescription>
          </DialogHeader>

          {selectedFlight && (
            <div className="space-y-3">
              {/* Customer & Flight Info - Combined */}
              <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                {/* Customer Info */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs text-muted-foreground">고객</div>
                    <div className="font-semibold text-xs">{selectedFlight.customer_name}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">전화번호</div>
                    <div className="font-mono font-semibold text-xs">{selectedFlight.customer_phone}</div>
                    {selectedFlight.customer_email && (
                      <>
                        <div className="text-xs text-muted-foreground mt-1">이메일</div>
                        <div className="font-mono text-xs">{selectedFlight.customer_email}</div>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Status & Request Date */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-muted">
                  <div>
                    <div className="text-xs text-muted-foreground">상태</div>
                    <div>
                      {selectedFlight.called ? (
                        <Badge className="bg-muted text-muted-foreground text-xs h-5">통화 완료</Badge>
                      ) : (
                        <Badge className="bg-primary/10 text-primary text-xs h-5">대기 중</Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">요청일</div>
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
                      {selectedFlight.flight && (
                        <span className="font-semibold text-primary text-xs">
                          {calculateDisplayPrice(selectedFlight.flight)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Aircraft Image - Extra Compact */}
              {selectedFlight.flight?.image_urls && selectedFlight.flight.image_urls.length > 0 && (
                <div className="relative h-20 w-full overflow-hidden rounded-lg">
                  <Image
                    src={selectedFlight.flight.image_urls[0]}
                    alt={`${selectedFlight.flight.aircraft || 'Aircraft'} image`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              )}

              {/* Consent Info */}
              <div className="bg-muted/30 rounded-lg p-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">개인정보 동의</span>
                  {selectedFlight.consent_given ? (
                    <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs h-5">
                      <Check className="h-2 w-2 mr-1" />
동의함
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-destructive/10 text-destructive text-xs h-5">
동의 안함
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
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-8"
                size="sm"
              >
                <Check className="h-3 w-3 mr-1" />
통화 완료로 표시
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setFlightDetailsOpen(false)}
              className="flex-1 text-xs h-8"
              size="sm"
            >
닫기
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
