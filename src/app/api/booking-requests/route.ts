import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client with service role key
function getAdminSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
  }

  if (!supabaseKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// GET /api/booking-requests - Get all booking requests
export async function GET() {
  try {
    const supabase = getAdminSupabaseClient()
    const { data, error } = await supabase
      .from('booking_requests')
      .select(`
        *,
        flight:flights!booking_requests_flight_id_fkey(*)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching booking requests:', error)
    return NextResponse.json({ error: 'Failed to fetch booking requests' }, { status: 500 })
  }
}

// POST /api/booking-requests - Create new booking request
export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()
    const supabase = getAdminSupabaseClient()

    // Validate required fields
    if (!bookingData.flight_id || !bookingData.customer_name || !bookingData.customer_phone) {
      return NextResponse.json(
        { error: 'Missing required fields: flight_id, customer_name, customer_phone' },
        { status: 400 }
      )
    }

    // Create booking request
    const { data, error } = await supabase
      .from('booking_requests')
      .insert([{
        flight_id: bookingData.flight_id,
        customer_name: bookingData.customer_name,
        customer_phone: bookingData.customer_phone,
        customer_email: bookingData.customer_email || null,
        consent_given: bookingData.consent_given || false,
        called: false
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    // Send Google Chat notification (don't fail if this errors)
    try {
      await sendGoogleChatNotification(data, bookingData.flight_id, supabase)
    } catch (notificationError) {
      console.error('Failed to send Google Chat notification:', notificationError)
      // Continue despite notification failure
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating booking request:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create booking request' },
      { status: 500 }
    )
  }
}

// Helper function to send Google Chat notification
async function sendGoogleChatNotification(
  bookingRequest: any,
  flightId: string,
  supabase: ReturnType<typeof getAdminSupabaseClient>
) {
  const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_CHAT_WEBHOOK_URL ||
    'https://chat.googleapis.com/v1/spaces/AAQAAmm4UZc/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=82yAxYH8a-VjTb2ZQcBCrALF5NHLm173-aqrnH8HXSM'

  // Get flight details
  const { data: flight, error: flightError } = await supabase
    .from('flights')
    .select('*')
    .eq('flight_id', flightId)
    .single()

  if (flightError) {
    console.warn('Could not fetch flight details for notification:', flightError)
  }

  // Calculate price info
  let priceInfo = ''
  if (flight) {
    if (flight.custom_price !== null && flight.custom_price !== undefined) {
      priceInfo = `• 가격: $${flight.custom_price.toLocaleString()} (개별 조정 가격)\n`
    } else if (flight.price) {
      priceInfo = `• 가격: ${flight.price}\n`
    } else if (flight.price_numeric) {
      priceInfo = `• 가격: $${flight.price_numeric.toLocaleString()}\n`
    }
  }

  const message = {
    text: `🛫 Empty Leg 예약\n\n` +
          `고객 정보:\n` +
          `• 이름: ${bookingRequest.customer_name}\n` +
          `• 이메일: ${bookingRequest.customer_email || '미제공'}\n` +
          `• 전화번호: ${bookingRequest.customer_phone}\n\n` +
          `비행 정보:\n` +
          (flight ? `• 출발지: ${flight.from_city || '미정'}\n` : '') +
          (flight ? `• 도착지: ${flight.to_city || '미정'}\n` : '') +
          (flight?.flight_date ? `• 출발일: ${flight.flight_date}\n` : '') +
          (flight?.aircraft ? `• 항공기 유형: ${flight.aircraft}\n` : '') +
          (flight ? `• 항공편: ${flight.route_summary || `${flight.from_city} → ${flight.to_city}`}\n` : '') +
          priceInfo +
          `\n특별 요청사항:\n` +
          `Empty Leg 예약 요청입니다. 즉시 고객에게 연락하여 확인해주세요.\n\n` +
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
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(message),
  })

  if (!response.ok) {
    throw new Error(`Google Chat notification failed: ${response.status} ${response.statusText}`)
  }

  console.log('Google Chat notification sent successfully')
}
