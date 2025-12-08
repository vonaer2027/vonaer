import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl) {
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
    }

    if (!supabaseKey) {
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
    }

    supabaseClient = createClient(supabaseUrl, supabaseKey)
  }
  
  return supabaseClient
}


// Types for our database tables
export interface Flight {
  id: number
  flight_id: string
  raw_text?: string
  price?: string
  price_numeric?: number
  price_type?: string // 'fixed' | 'enquire'
  currency?: string
  flight_date?: string
  date_timestamp?: number
  aircraft?: string
  seats?: number
  from_city?: string
  from_country?: string
  from_formatted?: string
  to_city?: string
  to_country?: string
  to_formatted?: string
  route_summary?: string
  involves_korea?: boolean
  is_active?: boolean
  scraped_timestamp?: string
  last_seen_at?: string
  archived_at?: string
  image_urls?: string[]
  source?: string // 'flyxo' | 'jetbay'
  created_at?: string
  updated_at?: string
  custom_price?: number // For admin price adjustments
}

export interface User {
  id: number
  name: string
  phone_number: string
  email?: string
  created_at?: string
  updated_at?: string
  is_active?: boolean
  notes?: string
}

export interface MarginSetting {
  id: number
  margin_percentage: number
  is_active: boolean
  created_by?: string
  created_at?: string
  updated_at?: string
}

export interface BookingRequest {
  id: number
  flight_id: string
  customer_name: string
  customer_phone: string
  customer_email?: string
  consent_given: boolean
  called: boolean
  created_at?: string
  updated_at?: string
  flight?: Flight // For joined queries
}

// Flight operations
export const flightService = {
  async getAll() {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('flights')
      .select('*')
      .eq('is_active', true)
      .eq('involves_korea', true) // Only show Korea-related flights
      .gte('flight_date', new Date().toISOString().split('T')[0])
      .order('flight_date', { ascending: true })

    if (error) throw error

    // Additional safeguard: filter for Korea in from/to countries
    const koreaFiltered = (data || []).filter((flight: Flight) => {
      const fromKorea = flight.from_country === 'South Korea' ||
                        /korea|seoul|busan|incheon|gimpo|jeju/i.test(flight.from_city || '')
      const toKorea = flight.to_country === 'South Korea' ||
                      /korea|seoul|busan|incheon|gimpo|jeju/i.test(flight.to_city || '')
      return fromKorea || toKorea
    })

    return koreaFiltered as Flight[]
  },

  async getById(id: number) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('flights')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Flight
  },

  async updateCustomPrice(id: number, customPrice: number | null) {
    const supabase = getSupabaseClient()
    
    console.log('Supabase updateCustomPrice called with:', { id, customPrice })
    
    // First, let's check if the flight exists
    const { data: existingFlight, error: fetchError } = await supabase
      .from('flights')
      .select('id, flight_id, custom_price')
      .eq('id', id)
      .single()
    
    if (fetchError) {
      console.error('Error fetching flight:', fetchError)
      throw new Error(`Flight with ID ${id} not found: ${fetchError.message}`)
    }
    
    console.log('Found flight:', existingFlight)
    
    // Try the update without expecting data back first
    const { error: updateError } = await supabase
      .from('flights')
      .update({ custom_price: customPrice })
      .eq('id', id)
    
    console.log('Update error:', updateError)
    
    if (updateError) {
      console.error('Supabase update error details:', updateError)
      throw new Error(`Failed to update price: ${updateError.message}`)
    }
    
    // Now fetch the updated flight data
    const { data: updatedFlight, error: fetchUpdatedError } = await supabase
      .from('flights')
      .select('*')
      .eq('id', id)
      .single()
    
    console.log('Updated flight data:', updatedFlight)
    console.log('Fetch updated error:', fetchUpdatedError)
    
    if (fetchUpdatedError) {
      console.error('Error fetching updated flight:', fetchUpdatedError)
      throw new Error(`Failed to fetch updated flight: ${fetchUpdatedError.message}`)
    }
    
    return updatedFlight as Flight
  },

  async testCustomPriceUpdate(flightId: number) {
    const supabase = getSupabaseClient()
    
    console.log('Testing custom price update for flight ID:', flightId)
    
    // First, get the current flight data
    const { data: currentFlight, error: fetchError } = await supabase
      .from('flights')
      .select('id, flight_id, custom_price, price_numeric')
      .eq('id', flightId)
      .single()
    
    if (fetchError) {
      console.error('Error fetching flight for test:', fetchError)
      return { success: false, error: fetchError.message }
    }
    
    console.log('Current flight data:', currentFlight)
    
    // Try to update with a test value
    const testPrice = 99999
    const { error: updateError } = await supabase
      .from('flights')
      .update({ custom_price: testPrice })
      .eq('id', flightId)
    
    if (updateError) {
      console.error('Update error:', updateError)
      return { success: false, error: updateError.message }
    }
    
    // Fetch the updated data
    const { data: updatedFlight, error: fetchUpdatedError } = await supabase
      .from('flights')
      .select('id, flight_id, custom_price, price_numeric')
      .eq('id', flightId)
      .single()
    
    if (fetchUpdatedError) {
      console.error('Error fetching updated flight:', fetchUpdatedError)
      return { success: false, error: fetchUpdatedError.message }
    }
    
    console.log('Updated flight data:', updatedFlight)
    
    // Reset to null
    await supabase
      .from('flights')
      .update({ custom_price: null })
      .eq('id', flightId)
    
    return { 
      success: true, 
      original: currentFlight, 
      updated: updatedFlight,
      message: 'Test completed successfully' 
    }
  },

  async create(flight: Omit<Flight, 'id' | 'created_at' | 'updated_at'>) {
    const response = await fetch('/api/flights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(flight),
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create flight')
    }
    
    return response.json()
  },

  async update(id: number, flight: Partial<Flight>) {
    const response = await fetch(`/api/flights/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(flight),
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to update flight')
    }
    
    return response.json()
  },

  async delete(id: number) {
    const response = await fetch(`/api/flights/${id}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to delete flight')
    }
  }
}

// User operations
export const userService = {
  async getAll() {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as User[]
  },

  async getByPhoneNumber(phoneNumber: string) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('phone_number', phoneNumber)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error // PGRST116 is "no rows returned"
    return data as User | null
  },

  async create(user: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create user')
    }
    
    return response.json()
  },

  async update(id: number, user: Partial<User>) {
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to update user')
    }
    
    return response.json()
  },

  async delete(id: number) {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to delete user')
    }
  }
}

// Margin settings operations
export const marginService = {
  async getCurrent() {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('margin_settings')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    
    if (error) throw error
    return data as MarginSetting
  },

  async update(marginPercentage: number, createdBy?: string) {
    const response = await fetch('/api/margin-settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        margin_percentage: marginPercentage,
        created_by: createdBy || 'admin'
      }),
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to update margin setting')
    }
    
    return response.json()
  },

  async getHistory() {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('margin_settings')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as MarginSetting[]
  }
}

// Booking request operations
export const bookingRequestService = {
  async getAll() {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('booking_requests')
      .select(`
        *,
        flight:flights(*)
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as BookingRequest[]
  },

  async create(bookingRequest: Omit<BookingRequest, 'id' | 'created_at' | 'updated_at' | 'flight'>) {
    try {
      const response = await fetch('/api/booking-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingRequest),
      })

      if (!response.ok) {
        let errorMessage = 'Failed to create booking request'
        try {
          const error = await response.json()
          errorMessage = error.error || errorMessage
        } catch {
          // Response is not JSON, use status text
          errorMessage = `${errorMessage}: ${response.status} ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      return response.json()
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Failed to create booking request: Network error')
    }
  },

  async sendGoogleChatNotification(bookingRequest: BookingRequest, flightId: string) {
    const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_CHAT_WEBHOOK_URL ||
      'https://chat.googleapis.com/v1/spaces/AAQAAmm4UZc/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=82yAxYH8a-VjTb2ZQcBCrALF5NHLm173-aqrnH8HXSM'
    
    // Get flight details for the notification
    let flightDetails = null
    try {
      const flights = await flightService.getAll()
      flightDetails = flights.find(f => f.flight_id === flightId)
    } catch (error) {
      console.warn('Could not fetch flight details for notification:', error)
    }
    
    // Calculate the final price to display
    let priceInfo = ''
    if (flightDetails) {
      if (flightDetails.custom_price !== null && flightDetails.custom_price !== undefined) {
        priceInfo = `• 가격: $${flightDetails.custom_price.toLocaleString()} (개별 조정 가격)\n`
      } else if (flightDetails.price) {
        priceInfo = `• 가격: ${flightDetails.price}\n`
      } else if (flightDetails.price_numeric) {
        priceInfo = `• 가격: $${flightDetails.price_numeric.toLocaleString()}\n`
      }
    }

    const message = {
      text: `🛫 Empty Leg 예약\n\n` +
            `고객 정보:\n` +
            `• 이름: ${bookingRequest.customer_name}\n` +
            `• 이메일: ${bookingRequest.customer_email || '미제공'}\n` +
            `• 전화번호: ${bookingRequest.customer_phone}\n\n` +
            `비행 정보:\n` +
            (flightDetails ? `• 출발지: ${flightDetails.from_city || '미정'}\n` : '') +
            (flightDetails ? `• 도착지: ${flightDetails.to_city || '미정'}\n` : '') +
            (flightDetails?.flight_date ? `• 출발일: ${new Date(flightDetails.flight_date).toLocaleDateString('ko-KR')}\n` : '') +
            (flightDetails?.aircraft ? `• 항공기 유형: ${flightDetails.aircraft}\n` : '') +
            (flightDetails ? `• 항공편: ${flightDetails.from_city || '미정'} → ${flightDetails.to_city || '미정'}\n` : '') +
            (flightDetails?.seats ? `• 수용 인원: ${flightDetails.seats}명\n` : '') +
            priceInfo +
            `\n특별 요청사항:\n` +
            `Empty Leg 예약 요청입니다. 즉시 고객에게 연락하여 확인해주세요.${bookingRequest.consent_given ? ' (개인정보 동의 완료)' : ' (개인정보 동의 필요)'}\n\n` +
            `📅 예약 시간: ${new Date().toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            })}`
    }
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    })
    
    if (!response.ok) {
      throw new Error(`Google Chat webhook failed: ${response.status} ${response.statusText}`)
    }
    
    console.log('Google Chat notification sent successfully')
  },

  async testGoogleChatWebhook() {
    const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_CHAT_WEBHOOK_URL ||
      'https://chat.googleapis.com/v1/spaces/AAQAAmm4UZc/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=82yAxYH8a-VjTb2ZQcBCrALF5NHLm173-aqrnH8HXSM'
    
    const testMessage = {
      text: `🛫 [TEST] 웹훅 테스트\n\n` +
            `고객 정보:\n` +
            `• 이름: 테스트 고객\n` +
            `• 이메일: test@vonaer.com\n` +
            `• 전화번호: 010-1234-5678\n\n` +
            `비행 정보:\n` +
            `• 출발지: 서울 (ICN)\n` +
            `• 도착지: 도쿄 (NRT)\n` +
            `• 출발일: ${new Date().toLocaleDateString('ko-KR')}\n` +
            `• 항공기 유형: Light Jet\n\n` +
            `특별 요청사항:\n` +
            `웹훅 테스트입니다. Google Chat 알림이 정상적으로 작동합니다!\n\n` +
            `📅 예약 시간: ${new Date().toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            })}`
    }
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testMessage)
    })
    
    if (!response.ok) {
      throw new Error(`Google Chat webhook test failed: ${response.status} ${response.statusText}`)
    }
    
    console.log('Google Chat webhook test successful')
    return { success: true, message: 'Webhook test completed successfully' }
  },

  async getById(id: number) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('booking_requests')
      .select(`
        *,
        flight:flights(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as BookingRequest
  },

  async markAsCalled(id: number) {
    try {
      const response = await fetch(`/api/booking-requests/${id}/mark-called`, {
        method: 'PUT',
      })

      if (!response.ok) {
        let errorMessage = 'Failed to mark booking request as called'
        try {
          const error = await response.json()
          errorMessage = error.error || errorMessage
        } catch {
          errorMessage = `${errorMessage}: ${response.status} ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      return response.json()
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Failed to mark booking request as called: Network error')
    }
  },

  async delete(id: number) {
    try {
      const response = await fetch(`/api/booking-requests/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        let errorMessage = 'Failed to delete booking request'
        try {
          const error = await response.json()
          errorMessage = error.error || errorMessage
        } catch {
          errorMessage = `${errorMessage}: ${response.status} ${response.statusText}`
        }
        throw new Error(errorMessage)
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Failed to delete booking request: Network error')
    }
  }
}
