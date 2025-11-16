'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Flight, User, flightService, userService } from '@/lib/supabase'
import { MessageSquare, Send, Users, Plane, Calendar, MapPin, DollarSign, Eye, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface MMSTemplate {
  id: string
  name: string
  template: string
}

interface MessagePreview {
  flight: Flight
  template: MMSTemplate
  content: string
}

interface FlightDetails {
  departureTime: string
  arrivalTime: string
  duration: string
  aircraftDescription: string
  aircraftFeatures: string
  returnDepartureTime?: string
  returnArrivalTime?: string
  returnDuration?: string
  returnAircraftDescription?: string
  returnAircraftFeatures?: string
}

export function MMSMessaging() {
  const t = useTranslations()
  const [flights, setFlights] = useState<Flight[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<MMSTemplate | null>(null)
  const [customMessage, setCustomMessage] = useState('')
  const [flightDetails, setFlightDetails] = useState<FlightDetails>({
    departureTime: '',
    arrivalTime: '',
    duration: '',
    aircraftDescription: '',
    aircraftFeatures: ''
  })
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [messagePreview, setMessagePreview] = useState<MessagePreview | null>(null)

  // MMS Templates based on the provided examples
  const mmsTemplates: MMSTemplate[] = [
    {
      id: 'empty-leg-special',
      name: 'Empty Leg 특가 안내 (단일 노선)',
      template: `[본에어 Empty Leg 특가 안내]
더 이상의 합리적인 조건은 없습니다.
일정: {{date}} {{route}}
시간: {{departure_time}} 출발 / {{arrival_time}} 도착 ({{duration}})
항공기: {{aircraft}} (최대 {{seats}}명 탑승)
요금: 단 {{price}} (기체 전체 요금)
안내: Empty Leg 특성상 선착순 마감됩니다.
문의: 1600-9064

수신거부: 080-877-6077`
    },
    {
      id: 'multiple-routes',
      name: 'Empty Leg 특가 안내 (복수 노선)',
      template: `[본에어 Empty Leg 특가 안내]

일정: {{date}} {{route}}
시간: {{departure_time}} 출발 / {{arrival_time}} 도착 ({{duration}})
항공기: {{aircraft_description}}
– {{aircraft_features}}
– 최대 {{seats}}명 탑승 / {{aircraft_optimization}}
요금: 단 {{price}} (기체 전체 요금)

안내: Empty Leg 특성상 선착순 마감됩니다.
문의: 1600-9064

수신거부: 080-877-6077`
    },
    {
      id: 'round-trip-package',
      name: 'Empty Leg 왕복 패키지',
      template: `[본에어 Empty Leg 특가 안내]

출발편: {{outbound_date}} {{outbound_route}}
시간: 출발 {{outbound_departure}} / 도착 {{outbound_arrival}} ({{outbound_duration}})
항공기: {{outbound_aircraft}} – {{outbound_description}}
– {{outbound_features}}
요금: {{outbound_price}} (기체 전체 요금)

---
복귀편: {{return_date}} {{return_route}}
시간: 출발 {{return_departure}} / 도착 {{return_arrival}} ({{return_duration}})
항공기: {{return_aircraft}} – {{return_description}}
– {{return_features}}
요금: {{return_price}} (기체 전체 요금)
---
안내: 개별 예약 가능하며, 왕복으로 연결 시 {{destination}} 여정 전용 패키지로도 이용하실 수 있습니다.

주의: Empty Leg 특성상 선착순 마감
문의: 1600-9064

수신거부: 080-877-6077`
    }
  ]

  // Dropdown options for flight details
  const timeOptions = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '원하는 시간대'
  ]

  const durationOptions = [
    '1h09m', '1h30m', '1h45m', '2h00m', '2h15m', '2h30m', 
    '2h45m', '3h00m', '3h30m', '4h00m', '비행시간'
  ]

  const aircraftDescriptionOptions = [
    '비즈니스 최적 기종 – Challenger 605',
    '세계 최상위 기종 – Global 7500',
    'VIP Jet – Gulfstream G650',
    'VIP Jet – Embraer Lineage 1000',
    'Heavy Jet – Challenger 605',
    '초대형 VIP 기종',
    '비즈니스 최적 기종'
  ]

  const aircraftFeaturesOptions = [
    '중대형 비즈니스 제트 대표 기종',
    '초장거리 전용 / 최고속·최고고도 성능',
    '4구역 캐빈 / 전용 침대 & 샤워실 구성',
    '초대형 VIP 기종 / 최대 18명 탑승',
    '비즈니스 최적 기종 / 최대 10명 탑승',
    '최고급 VIP 기종 / 최상위 성능',
    '고급 비즈니스 제트'
  ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [flightsData, usersData] = await Promise.all([
        flightService.getAll(),
        userService.getAll()
      ])
      
      // Filter for Korean flights only
      const koreanFlights = flightsData.filter(flight => flight.involves_korea)
      setFlights(koreanFlights)
      
      // Filter for active users only
      const activeUsers = usersData.filter(user => user.is_active !== false)
      setUsers(activeUsers)
    } catch (error) {
      console.error('Error loading data:', error)
      toast.error('데이터 로딩에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const generateMessageContent = (flight: Flight, template: MMSTemplate): string => {
    return generateMessageContentWithDetails(flight, template, flightDetails)
  }

  const extractTimeFromFlightData = (flight: Flight): string | null => {
    // Try to extract time from raw_text if available
    if (flight.raw_text) {
      const timeMatch = flight.raw_text.match(/(\d{1,2}):(\d{2})/);
      if (timeMatch) {
        return `${timeMatch[1]}:${timeMatch[2]}`
      }
    }
    
    // Default times based on route
    const route = flight.route_summary?.toLowerCase() || ''
    if (route.includes('김포') && route.includes('제주')) {
      return '16:30'
    }
    if (route.includes('김포') && route.includes('상하이')) {
      return '15:25'
    }
    if (route.includes('인천') && route.includes('상하이')) {
      return '09:05'
    }
    
    return '원하는 시간대'
  }

  const calculateArrivalTime = (flight: Flight): string | null => {
    // Try to extract arrival time from raw_text
    if (flight.raw_text) {
      const arrivalMatch = flight.raw_text.match(/도착\s*(\d{1,2}):(\d{2})/);
      if (arrivalMatch) {
        return `${arrivalMatch[1]}:${arrivalMatch[2]}`
      }
    }
    
    // Default arrival times based on route
    const route = flight.route_summary?.toLowerCase() || ''
    if (route.includes('김포') && route.includes('제주')) {
      return '17:39'
    }
    if (route.includes('김포') && route.includes('상하이')) {
      return '16:14'
    }
    if (route.includes('인천') && route.includes('상하이')) {
      return '09:35'
    }
    
    return '도착 시간'
  }

  const calculateDuration = (flight: Flight): string | null => {
    // Try to extract duration from raw_text if available
    if (flight.raw_text) {
      const durationMatch = flight.raw_text.match(/(\d+h\s*\d*m?)/i);
      if (durationMatch) {
        return durationMatch[1]
      }
    }
    
    // Default durations based on route
    const route = flight.route_summary?.toLowerCase() || ''
    if (route.includes('김포') && route.includes('제주')) {
      return '1h09m'
    }
    if (route.includes('김포') && route.includes('상하이')) {
      return '1h49m'
    }
    if (route.includes('인천') && route.includes('상하이')) {
      return '1h30m'
    }
    
    return '비행시간'
  }

  const getNextDay = (date: Date): string => {
    const nextDay = new Date(date)
    nextDay.setDate(nextDay.getDate() + 1)
    return nextDay.toLocaleDateString('ko-KR', {
      month: 'numeric',
      day: 'numeric',
      weekday: 'short'
    })
  }

  const getReverseRoute = (flight: Flight): string => {
    return `${flight.to_city} → ${flight.from_city}`
  }

  const getDestinationCity = (flight: Flight): string => {
    return flight.to_city || '목적지'
  }

  // Better parsing functions for flight number and seats
  const parseFlightNumber = (flight: Flight): string => {
    if (!flight.flight_id) return 'FL-001'
    
    // Extract meaningful flight number from flight_id
    // flight_id format: "flight_1758456910727_3" -> "FL-003"
    const match = flight.flight_id.match(/_(\d+)$/)
    if (match) {
      const num = parseInt(match[1])
      return `FL-${num.toString().padStart(3, '0')}`
    }
    
    return flight.flight_id
  }

  const parseSeatsFromRawText = (flight: Flight): number | null => {
    if (!flight.raw_text) return flight.seats || null
    
    // Try to extract seats from raw text patterns like:
    // "Global 600014 seats" -> 14 seats (extract last 2 digits before "seats")
    // "14 seats" -> 14 seats
    // "Model: Global 600014 seats" -> 14 seats
    
    const patterns = [
      /(\d{1,2})\s*seats?/i,                    // "14 seats" - direct seat count
      /seats?\s*:?\s*(\d{1,2})/i,               // "seats: 14"
      /Model:\s*\w+\s*\w*?(\d{2})\s*seats?/i,   // "Model: Global 600014 seats" -> extract "14"
      /\w+\s*\w*?(\d{2})\s*seats?/i,            // "Global 600014 seats" -> extract "14"
      /(\d{2})(?=\s*seats?)/i                   // Look for 2 digits directly before "seats"
    ]
    
    for (const pattern of patterns) {
      const match = flight.raw_text.match(pattern)
      if (match) {
        const seats = parseInt(match[1])
        // Reasonable seat count validation (4-50 for private jets)
        if (seats >= 4 && seats <= 50) {
          return seats
        }
      }
    }
    
    // If no pattern matches, try to extract the last 2 digits before "seats"
    const lastTwoDigitsMatch = flight.raw_text.match(/(\d{2})(?=\s*seats?)/i)
    if (lastTwoDigitsMatch) {
      const seats = parseInt(lastTwoDigitsMatch[1])
      if (seats >= 4 && seats <= 50) {
        return seats
      }
    }
    
    return flight.seats || null
  }

  const parseAircraftFromRawText = (flight: Flight): string => {
    if (!flight.raw_text) return flight.aircraft || '비즈니스 제트'
    
    // Try to extract clean aircraft model from raw text
    // "Model: Global 600014 seats" -> "Global 6000" (remove seat digits)
    // "Challenger 60512 seats" -> "Challenger 605" (remove seat digits)
    
    const patterns = [
      /Model:\s*([A-Za-z\s]+?)(\d+)(\d{2})\s*seats?/i,  // "Model: Global 600014 seats" -> "Global 6000" (remove last 2 digits)
      /([A-Za-z\s]+?)(\d+)(\d{2})\s*seats?/i            // "Global 600014 seats" -> "Global 6000" (remove last 2 digits)
    ]
    
    for (const pattern of patterns) {
      const match = flight.raw_text.match(pattern)
      if (match) {
        const aircraftBase = match[1].trim()
        const modelNumber = match[2]
        // match[3] contains the seat digits that we ignore
        
        // Clean up common aircraft models
        if (aircraftBase.toLowerCase().includes('global')) {
          return `Global ${modelNumber}` // Global 600014 -> Global 6000
        }
        if (aircraftBase.toLowerCase().includes('challenger')) {
          return `Challenger ${modelNumber}` // Challenger 60512 -> Challenger 605
        }
        if (aircraftBase.toLowerCase().includes('gulfstream')) {
          return `Gulfstream G${modelNumber}` // Gulfstream 65012 -> Gulfstream G650
        }
        
        return `${aircraftBase} ${modelNumber}`
      }
    }
    
    // Fallback: try simpler patterns
    const simplePatterns = [
      /Model:\s*([A-Za-z\s]+\d+)/i,  // "Model: Global 6000"
      /([A-Za-z\s]+\d+)/i            // "Global 6000"
    ]
    
    for (const pattern of simplePatterns) {
      const match = flight.raw_text.match(pattern)
      if (match) {
        return match[1].trim()
      }
    }
    
    return flight.aircraft || '비즈니스 제트'
  }

  const getAircraftDescription = (aircraft?: string): string => {
    if (!aircraft) return '비즈니스 최적 기종'
    
    const aircraftLower = aircraft.toLowerCase()
    if (aircraftLower.includes('challenger')) return '비즈니스 최적 기종 – Challenger 605'
    if (aircraftLower.includes('global')) return '세계 최상위 기종 – Global 7500'
    if (aircraftLower.includes('gulfstream')) return 'VIP Jet – Gulfstream'
    if (aircraftLower.includes('embraer')) return 'VIP Jet – Embraer Lineage 1000'
    return `비즈니스 최적 기종 – ${aircraft}`
  }

  const getAircraftFeatures = (aircraft?: string): string => {
    if (!aircraft) return '중대형 비즈니스 제트 대표 기종'
    
    const aircraftLower = aircraft.toLowerCase()
    if (aircraftLower.includes('challenger')) return '중대형 비즈니스 제트 대표 기종'
    if (aircraftLower.includes('global')) return '초장거리 전용 / 최고속·최고고도 성능'
    if (aircraftLower.includes('gulfstream')) return '최고급 VIP 기종 / 최상위 성능'
    if (aircraftLower.includes('embraer')) return '초대형 VIP 기종'
    return '고급 비즈니스 제트'
  }

  const getAircraftOptimization = (aircraft?: string): string => {
    if (!aircraft) return '효율적인 단거리 이동에 최적화'
    
    const aircraftLower = aircraft.toLowerCase()
    if (aircraftLower.includes('challenger')) return '효율적인 단거리 이동에 최적화'
    if (aircraftLower.includes('global')) return '비즈니스·여행 모두 완벽한 선택'
    if (aircraftLower.includes('gulfstream')) return '최고급 여행 경험 제공'
    if (aircraftLower.includes('embraer')) return '대규모 그룹 여행에 최적'
    return '다양한 용도에 최적화'
  }

  const handleFlightSelect = (flight: Flight) => {
    setSelectedFlight(flight)
    setSelectedTemplate(null)
    setCustomMessage('')
    
    // Reset flight details to defaults based on the selected flight with improved parsing
    const parsedAircraft = parseAircraftFromRawText(flight)
    setFlightDetails({
      departureTime: extractTimeFromFlightData(flight) || '',
      arrivalTime: calculateArrivalTime(flight) || '',
      duration: calculateDuration(flight) || '',
      aircraftDescription: getAircraftDescription(parsedAircraft),
      aircraftFeatures: getAircraftFeatures(parsedAircraft),
      returnDepartureTime: '10:00',
      returnArrivalTime: '12:45',
      returnDuration: '1h45m',
      returnAircraftDescription: 'Heavy Jet – Challenger 605',
      returnAircraftFeatures: '비즈니스 최적 기종 / 최대 10명 탑승'
    })
  }

  const handleTemplateSelect = (template: MMSTemplate) => {
    setSelectedTemplate(template)
    if (selectedFlight) {
      const generatedContent = generateMessageContent(selectedFlight, template)
      setCustomMessage(generatedContent)
    }
  }

  const handleFlightDetailChange = (field: keyof FlightDetails, value: string) => {
    const updatedDetails = { ...flightDetails, [field]: value }
    setFlightDetails(updatedDetails)
    
    // Regenerate message content if template is selected
    if (selectedFlight && selectedTemplate) {
      // Generate content with the updated details immediately
      const generatedContent = generateMessageContentWithDetails(selectedFlight, selectedTemplate, updatedDetails)
      setCustomMessage(generatedContent)
    }
  }

  // New function that accepts flightDetails as parameter
  const generateMessageContentWithDetails = (flight: Flight, template: MMSTemplate, details: FlightDetails): string => {
    let content = template.template

    // Format date
    const flightDate = flight.flight_date ? new Date(flight.flight_date) : new Date()
    const formattedDate = flightDate.toLocaleDateString('ko-KR', {
      month: 'numeric',
      day: 'numeric',
      weekday: 'short'
    })

    // Use provided details or defaults with improved parsing
    const departureTime = details.departureTime || extractTimeFromFlightData(flight) || '원하는 시간대'
    const arrivalTime = details.arrivalTime || calculateArrivalTime(flight) || '도착 시간'
    const duration = details.duration || calculateDuration(flight) || '비행시간'
    const parsedAircraft = parseAircraftFromRawText(flight)
    const parsedSeats = parseSeatsFromRawText(flight)
    const aircraftDescription = details.aircraftDescription || getAircraftDescription(parsedAircraft)
    const aircraftFeatures = details.aircraftFeatures || getAircraftFeatures(parsedAircraft)

    // Basic replacements for single flight templates
    const basicReplacements = {
      '{{date}}': formattedDate,
      '{{route}}': flight.route_summary || `${flight.from_city} → ${flight.to_city}`,
      '{{departure_time}}': departureTime,
      '{{arrival_time}}': arrivalTime,
      '{{duration}}': duration,
      '{{aircraft}}': parsedAircraft,
      '{{seats}}': parsedSeats?.toString() || '9',
      '{{price}}': flight.price || '$0',
      '{{aircraft_description}}': aircraftDescription,
      '{{aircraft_features}}': aircraftFeatures,
      '{{aircraft_optimization}}': getAircraftOptimization(flight.aircraft)
    }

    // Additional replacements for round-trip templates
    const roundTripReplacements = {
      // Outbound flight
      '{{outbound_date}}': formattedDate,
      '{{outbound_route}}': flight.route_summary || `${flight.from_city} → ${flight.to_city}`,
      '{{outbound_departure}}': departureTime,
      '{{outbound_arrival}}': arrivalTime,
      '{{outbound_duration}}': duration,
      '{{outbound_aircraft}}': parsedAircraft,
      '{{outbound_description}}': aircraftDescription,
      '{{outbound_features}}': aircraftFeatures,
      '{{outbound_price}}': flight.price || '$0',
      
      // Return flight (using selected values or defaults)
      '{{return_date}}': getNextDay(flightDate),
      '{{return_route}}': getReverseRoute(flight),
      '{{return_departure}}': details.returnDepartureTime || '10:00',
      '{{return_arrival}}': details.returnArrivalTime || '12:45',
      '{{return_duration}}': details.returnDuration || '1h45m',
      '{{return_aircraft}}': 'Challenger 605',
      '{{return_description}}': details.returnAircraftDescription || 'Heavy Jet – Challenger 605',
      '{{return_features}}': details.returnAircraftFeatures || '비즈니스 최적 기종 / 최대 10명 탑승',
      '{{return_price}}': '$11,000',
      
      // Package info
      '{{destination}}': getDestinationCity(flight)
    }

    // Combine all replacements
    const allReplacements = { ...basicReplacements, ...roundTripReplacements }

    // Apply replacements
    Object.entries(allReplacements).forEach(([placeholder, value]) => {
      content = content.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), value)
    })

    return content
  }

  const handleUserToggle = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectAllUsers = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(users.map(user => user.id))
    }
  }

  const handlePreview = () => {
    if (!selectedFlight || !selectedTemplate) {
      toast.error('항공편과 템플릿을 선택해주세요.')
      return
    }

    const content = customMessage || generateMessageContent(selectedFlight, selectedTemplate)
    setMessagePreview({
      flight: selectedFlight,
      template: selectedTemplate,
      content
    })
    setPreviewOpen(true)
  }

  const handleSendMessages = async () => {
    if (!selectedFlight || !selectedTemplate || selectedUsers.length === 0) {
      toast.error('항공편, 템플릿, 수신자를 모두 선택해주세요.')
      return
    }

    if (!customMessage.trim()) {
      toast.error('메시지 내용을 입력해주세요.')
      return
    }

    setSending(true)
    try {
      const selectedUserData = users.filter(user => selectedUsers.includes(user.id))
      
      // Prepare recipients for OMNI SDK
      const recipients = selectedUserData.map(user => ({
        phone: user.phone_number.replace(/[^0-9]/g, ''), // Remove non-numeric characters
        name: user.name,
        id: user.id
      }))

      const requestBody = {
        recipients,
        message: {
          text: customMessage,
          title: "[본에어 Empty Leg 특가 안내]"
        },
        from: "1600-9064", // Your business phone number
        flightId: selectedFlight.flight_id,
        templateId: selectedTemplate.id
      }

      // Send via OMNI SDK API
      const response = await fetch('/api/send-mms-omni', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        throw new Error('MMS 발송에 실패했습니다.')
      }

      const result = await response.json()
      
      if (result.success) {
        toast.success(`${selectedUsers.length}명에게 MMS를 성공적으로 발송했습니다.`)
        
        // Reset form
        setSelectedUsers([])
        setCustomMessage('')
        setSelectedTemplate(null)
      } else {
        throw new Error(result.error || 'MMS 발송에 실패했습니다.')
      }

    } catch (error) {
      console.error('Error sending MMS:', error)
      toast.error(error instanceof Error ? error.message : 'MMS 발송에 실패했습니다.')
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <MessageSquare className="h-8 w-8 animate-pulse mx-auto text-primary" />
            <p className="text-muted-foreground">데이터를 불러오는 중...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            MMS 메시지 발송
          </CardTitle>
          <CardDescription>
            한국 노선 항공편 정보를 활용하여 고객에게 MMS 메시지를 발송합니다.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-6">
          {/* Flight Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-4 w-4" />
                항공편 선택
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {flights.length === 0 ? (
                <div className="text-center py-8">
                  <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">한국 노선 항공편이 없습니다.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>항공편 선택</Label>
                    <Select 
                      value={selectedFlight?.id.toString() || ''} 
                      onValueChange={(value) => {
                        const flight = flights.find(f => f.id.toString() === value)
                        if (flight) handleFlightSelect(flight)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="항공편을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {flights.map((flight) => (
                          <SelectItem key={flight.id} value={flight.id.toString()}>
                            <div className="flex items-center gap-3 py-1">
                              <span className="font-medium">
                                {flight.route_summary || `${flight.from_city} → ${flight.to_city}`}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {parseAircraftFromRawText(flight)}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                ({parseSeatsFromRawText(flight) || 'TBD'}명)
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Selected Flight Details */}
                  {selectedFlight && (
                    <Card className="bg-muted/30">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Plane className="h-4 w-4 text-primary" />
                              <span className="font-semibold">{parseAircraftFromRawText(selectedFlight)}</span>
                            </div>
                            <Badge variant="secondary">{parseFlightNumber(selectedFlight)}</Badge>
                          </div>
                          
                          {/* Route Information */}
                          <div className="flex items-center justify-between bg-background rounded-lg p-3">
                            <div className="text-center">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                                <MapPin className="h-3 w-3" />
                                출발지
                              </div>
                              <div className="font-medium text-sm">
                                {selectedFlight.from_city || 'TBD'}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {selectedFlight.from_country}
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-muted-foreground rotate-90" />
                            </div>
                            
                            <div className="text-center">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                                <MapPin className="h-3 w-3" />
                                도착지
                              </div>
                              <div className="font-medium text-sm">
                                {selectedFlight.to_city || 'TBD'}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {selectedFlight.to_country}
                              </div>
                            </div>
                          </div>

                          {/* Flight Details */}
                          <div className="grid grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div className="text-xs text-muted-foreground">날짜</div>
                                <div className="text-sm font-medium">
                                  {selectedFlight.flight_date 
                                    ? new Date(selectedFlight.flight_date).toLocaleDateString('ko-KR')
                                    : '날짜 미정'
                                  }
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div className="text-xs text-muted-foreground">좌석 수</div>
                                <div className="text-sm font-medium">
                                  {parseSeatsFromRawText(selectedFlight) ? `${parseSeatsFromRawText(selectedFlight)}명` : 'TBD'}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div className="text-xs text-muted-foreground">가격</div>
                                <div className="text-sm font-medium">
                                  {selectedFlight.price || 'TBD'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Template Selection */}
          {selectedFlight && (
            <Card>
              <CardHeader>
                <CardTitle>메시지 템플릿 선택</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mmsTemplates.map((template) => (
                    <Button
                      key={template.id}
                      variant={selectedTemplate?.id === template.id ? "default" : "outline"}
                      className="h-auto p-4 text-left justify-start"
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {template.template.split('\n')[0]}...
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>

                {selectedTemplate && (
                  <div className="space-y-6">
                    {/* Flight Details Configuration */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">항공편 세부 정보 설정</CardTitle>
                        <CardDescription>
                          메시지에 포함될 항공편 정보를 선택하세요.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {/* Departure Time */}
                          <div className="space-y-2">
                            <Label>출발 시간</Label>
                            <Select 
                              value={flightDetails.departureTime} 
                              onValueChange={(value) => handleFlightDetailChange('departureTime', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="출발 시간 선택" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeOptions.map((time) => (
                                  <SelectItem key={time} value={time}>{time}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Arrival Time */}
                          <div className="space-y-2">
                            <Label>도착 시간</Label>
                            <Select 
                              value={flightDetails.arrivalTime} 
                              onValueChange={(value) => handleFlightDetailChange('arrivalTime', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="도착 시간 선택" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeOptions.map((time) => (
                                  <SelectItem key={time} value={time}>{time}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Duration */}
                          <div className="space-y-2">
                            <Label>비행 시간</Label>
                            <Select 
                              value={flightDetails.duration} 
                              onValueChange={(value) => handleFlightDetailChange('duration', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="비행 시간 선택" />
                              </SelectTrigger>
                              <SelectContent>
                                {durationOptions.map((duration) => (
                                  <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Aircraft Description */}
                          <div className="space-y-2">
                            <Label>항공기 설명</Label>
                            <Select 
                              value={flightDetails.aircraftDescription} 
                              onValueChange={(value) => handleFlightDetailChange('aircraftDescription', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="항공기 설명 선택" />
                              </SelectTrigger>
                              <SelectContent>
                                {aircraftDescriptionOptions.map((desc) => (
                                  <SelectItem key={desc} value={desc}>{desc}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Aircraft Features */}
                          <div className="space-y-2 md:col-span-2">
                            <Label>항공기 특징</Label>
                            <Select 
                              value={flightDetails.aircraftFeatures} 
                              onValueChange={(value) => handleFlightDetailChange('aircraftFeatures', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="항공기 특징 선택" />
                              </SelectTrigger>
                              <SelectContent>
                                {aircraftFeaturesOptions.map((feature) => (
                                  <SelectItem key={feature} value={feature}>{feature}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Round-trip specific fields */}
                        {selectedTemplate.id === 'round-trip-package' && (
                          <div className="border-t pt-4 mt-6">
                            <h4 className="font-medium mb-4">복귀편 정보</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {/* Return Departure Time */}
                              <div className="space-y-2">
                                <Label>복귀편 출발 시간</Label>
                                <Select 
                                  value={flightDetails.returnDepartureTime || ''} 
                                  onValueChange={(value) => handleFlightDetailChange('returnDepartureTime', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="복귀편 출발 시간" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeOptions.map((time) => (
                                      <SelectItem key={time} value={time}>{time}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              {/* Return Arrival Time */}
                              <div className="space-y-2">
                                <Label>복귀편 도착 시간</Label>
                                <Select 
                                  value={flightDetails.returnArrivalTime || ''} 
                                  onValueChange={(value) => handleFlightDetailChange('returnArrivalTime', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="복귀편 도착 시간" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeOptions.map((time) => (
                                      <SelectItem key={time} value={time}>{time}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              {/* Return Duration */}
                              <div className="space-y-2">
                                <Label>복귀편 비행 시간</Label>
                                <Select 
                                  value={flightDetails.returnDuration || ''} 
                                  onValueChange={(value) => handleFlightDetailChange('returnDuration', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="복귀편 비행 시간" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {durationOptions.map((duration) => (
                                      <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              {/* Return Aircraft Description */}
                              <div className="space-y-2">
                                <Label>복귀편 항공기 설명</Label>
                                <Select 
                                  value={flightDetails.returnAircraftDescription || ''} 
                                  onValueChange={(value) => handleFlightDetailChange('returnAircraftDescription', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="복귀편 항공기 설명" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {aircraftDescriptionOptions.map((desc) => (
                                      <SelectItem key={desc} value={desc}>{desc}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              {/* Return Aircraft Features */}
                              <div className="space-y-2 md:col-span-2">
                                <Label>복귀편 항공기 특징</Label>
                                <Select 
                                  value={flightDetails.returnAircraftFeatures || ''} 
                                  onValueChange={(value) => handleFlightDetailChange('returnAircraftFeatures', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="복귀편 항공기 특징" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {aircraftFeaturesOptions.map((feature) => (
                                      <SelectItem key={feature} value={feature}>{feature}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Message Content */}
                    <div className="space-y-4">
                      <Label htmlFor="custom-message">메시지 내용 (수정 가능)</Label>
                      <Textarea
                        id="custom-message"
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        rows={12}
                        className="font-mono text-sm"
                        placeholder="메시지 내용을 입력하세요..."
                      />
                      <div className="flex gap-2">
                        <Button onClick={handlePreview} variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          미리보기
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Recipients Selection */}
          {selectedTemplate && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  수신자 선택 ({selectedUsers.length}/{users.length})
                </CardTitle>
                <CardDescription>
                  메시지를 받을 고객을 선택하세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="select-all"
                      checked={selectedUsers.length === users.length}
                      onCheckedChange={handleSelectAllUsers}
                    />
                    <Label htmlFor="select-all">전체 선택</Label>
                  </div>

                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">선택</TableHead>
                          <TableHead>이름</TableHead>
                          <TableHead>전화번호</TableHead>
                          <TableHead>가입일</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedUsers.includes(user.id)}
                                onCheckedChange={() => handleUserToggle(user.id)}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.phone_number}</TableCell>
                            <TableCell>
                              {user.created_at ? new Date(user.created_at).toLocaleDateString('ko-KR') : '-'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {selectedUsers.length > 0 && selectedTemplate && customMessage && (
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSendMessages} 
                        disabled={sending}
                        className="flex items-center gap-2"
                      >
                        <Send className="h-4 w-4" />
                        {sending ? '발송 중...' : `${selectedUsers.length}명에게 발송`}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>메시지 미리보기</DialogTitle>
            <DialogDescription>
              실제 발송될 메시지 내용을 확인하세요.
            </DialogDescription>
          </DialogHeader>
          
          {messagePreview && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">
                  항공편: {messagePreview.flight.flight_id} | 템플릿: {messagePreview.template.name}
                </div>
                <div className="whitespace-pre-wrap text-sm font-mono bg-background p-3 rounded border">
                  {messagePreview.content}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
