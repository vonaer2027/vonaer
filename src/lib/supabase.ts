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
    return data as BookingRequest
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
