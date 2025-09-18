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
  scraped_timestamp?: string
  image_urls?: string[]
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
      .order('flight_date', { ascending: true })
    
    if (error) throw error
    return data as Flight[]
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
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select()
      .single()
    
    if (error) throw error
    return data as User
  },

  async update(id: number, user: Partial<User>) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('users')
      .update(user)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as User
  },

  async delete(id: number) {
    const supabase = getSupabaseClient()
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
    
    if (error) throw error
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
    const supabase = getSupabaseClient()
    // Deactivate current margin
    await supabase
      .from('margin_settings')
      .update({ is_active: false })
      .eq('is_active', true)

    // Create new active margin
    const { data, error } = await supabase
      .from('margin_settings')
      .insert([{
        margin_percentage: marginPercentage,
        is_active: true,
        created_by: createdBy || 'admin'
      }])
      .select()
      .single()
    
    if (error) throw error
    return data as MarginSetting
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
    const supabase = getSupabaseClient()
    
    // First, check if user already exists with this phone number
    const existingUser = await userService.getByPhoneNumber(bookingRequest.customer_phone)
    
    // If user doesn't exist, create them automatically
    if (!existingUser) {
      try {
        await userService.create({
          name: bookingRequest.customer_name,
          phone_number: bookingRequest.customer_phone,
          is_active: true,
          notes: `Auto-created from booking request for flight ${bookingRequest.flight_id}`
        })
        console.log(`Auto-created user: ${bookingRequest.customer_name} (${bookingRequest.customer_phone})`)
      } catch (userCreateError) {
        console.warn('Failed to create user, but continuing with booking request:', userCreateError)
        // Continue with booking request even if user creation fails
        // This could happen due to race conditions or database constraints
      }
    } else {
      // User exists, optionally update their name if it's different
      if (existingUser.name !== bookingRequest.customer_name) {
        try {
          await userService.update(existingUser.id, {
            name: bookingRequest.customer_name,
            notes: existingUser.notes ? 
              `${existingUser.notes}; Name updated from booking request` : 
              'Name updated from booking request'
          })
          console.log(`Updated existing user name: ${bookingRequest.customer_name} (${bookingRequest.customer_phone})`)
        } catch (updateError) {
          console.warn('Failed to update user name:', updateError)
        }
      }
    }
    
    // Create the booking request
    const { data, error } = await supabase
      .from('booking_requests')
      .insert([bookingRequest])
      .select()
      .single()
    
    if (error) throw error
    
    // Send notification to Google Chat
    try {
      await this.sendGoogleChatNotification(data, bookingRequest.flight_id)
    } catch (notificationError) {
      console.warn('Failed to send Google Chat notification:', notificationError)
      // Don't throw error - booking request should still succeed even if notification fails
    }
    
    return data as BookingRequest
  },

  async sendGoogleChatNotification(bookingRequest: BookingRequest, flightId: string) {
    const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_CHAT_WEBHOOK_URL || 
      'https://chat.googleapis.com/v1/spaces/AAQAx5xO6FY/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=hWcSRLTVCNGvw4_PHrAW3wXJqjaJmKUXW2jvXupKXtA'
    
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
      text: `🛩️ *새로운 VONAER 예약 요청*\n\n` +
            `👤 *고객 정보:*\n` +
            `• 이름: ${bookingRequest.customer_name}\n` +
            `• 전화번호: ${bookingRequest.customer_phone}\n` +
            `${bookingRequest.customer_email ? `• 이메일: ${bookingRequest.customer_email}\n` : ''}` +
            `• 개인정보 동의: ${bookingRequest.consent_given ? '✅ 동의함' : '❌ 동의 안함'}\n\n` +
            `✈️ *항공편 정보:*\n` +
            `• 항공편 ID: ${flightId}\n` +
            `${flightDetails ? `• 항공기: ${flightDetails.aircraft || '미정'}\n` : ''}` +
            `${flightDetails ? `• 노선: ${flightDetails.from_city || '미정'} → ${flightDetails.to_city || '미정'}\n` : ''}` +
            `${flightDetails && flightDetails.flight_date ? `• 날짜: ${new Date(flightDetails.flight_date).toLocaleDateString('ko-KR')}\n` : ''}` +
            `${flightDetails && flightDetails.seats ? `• 수용 인원: ${flightDetails.seats}명\n` : ''}` +
            priceInfo +
            `📅 *요청 시간:* ${new Date().toLocaleString('ko-KR')}\n\n` +
            `⚡ *즉시 고객에게 연락하여 예약을 확정하세요!*`
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
      'https://chat.googleapis.com/v1/spaces/AAQAx5xO6FY/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=hWcSRLTVCNGvw4_PHrAW3wXJqjaJmKUXW2jvXupKXtA'
    
    const testMessage = {
      text: `🧪 *VONAER 웹훅 테스트*\n\n` +
            `✅ Google Chat 알림이 정상적으로 작동합니다!\n` +
            `📅 테스트 시간: ${new Date().toLocaleString('ko-KR')}`
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
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('booking_requests')
      .update({ called: true })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as BookingRequest
  },

  async delete(id: number) {
    const supabase = getSupabaseClient()
    const { error } = await supabase
      .from('booking_requests')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}
