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
