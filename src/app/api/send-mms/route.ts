import { NextRequest, NextResponse } from 'next/server'

interface MMSDestination {
  to: string
  replaceWords?: Record<string, string>
  ref?: string
}

interface MMSMessageFlow {
  mms: {
    from: string
    text: string
    title?: string
    ttl?: string
    originCID?: string
  }
}

interface MMSRequest {
  destinations: MMSDestination[]
  messageFlow: MMSMessageFlow[]
  groupKey?: string
  ref?: string
}

interface BizGOResponse {
  common: {
    authCode: string
    authResult: string
    infobankTrId: string
  }
  data: {
    code: string
    result: string
    data: {
      destinations: Array<{
        to: string
        msgKey: string
        code: string
        result: string
        ref?: string
      }>
    }
    ref?: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: MMSRequest = await request.json()
    
    // Validate required environment variables
    const bizgoApiKey = process.env.BIZGO_API_KEY
    const bizgoBaseUrl = process.env.BIZGO_BASE_URL || 'https://mars.ibapi.kr/api/comm'
    
    if (!bizgoApiKey) {
      console.error('Missing BIZGO_API_KEY environment variable')
      return NextResponse.json(
        { success: false, error: 'BizGO API key not configured' },
        { status: 500 }
      )
    }

    // Validate request body
    if (!body.destinations || !Array.isArray(body.destinations) || body.destinations.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No destinations provided' },
        { status: 400 }
      )
    }

    if (!body.messageFlow || !Array.isArray(body.messageFlow) || body.messageFlow.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No message flow provided' },
        { status: 400 }
      )
    }

    // Validate phone numbers (Korean format)
    const invalidNumbers = body.destinations.filter(dest => {
      const phoneNumber = dest.to.replace(/[^0-9]/g, '')
      // Korean phone numbers: 010XXXXXXXX (11 digits) or 01XXXXXXXXX (10-11 digits)
      return !/^01[0-9]{8,9}$/.test(phoneNumber)
    })

    if (invalidNumbers.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Invalid phone numbers detected: ${invalidNumbers.map(n => n.to).join(', ')}` 
        },
        { status: 400 }
      )
    }

    // Prepare BizGO API request
    const bizgoRequest = {
      destinations: body.destinations.map(dest => ({
        to: dest.to.replace(/[^0-9]/g, ''), // Ensure only numbers
        replaceWords: dest.replaceWords || {},
        ref: dest.ref || ''
      })),
      messageFlow: body.messageFlow,
      groupKey: body.groupKey || `mms_${Date.now()}`,
      ref: body.ref || `mms_request_${Date.now()}`
    }

    console.log('Sending MMS request to BizGO:', {
      url: `${bizgoBaseUrl}/v1/send/omni`,
      destinations: bizgoRequest.destinations.length,
      messageFlow: bizgoRequest.messageFlow.length
    })

    // Send request to BizGO API
    const response = await fetch(`${bizgoBaseUrl}/v1/send/omni`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bizgoApiKey
      },
      body: JSON.stringify(bizgoRequest)
    })

    const responseText = await response.text()
    console.log('BizGO API response status:', response.status)
    console.log('BizGO API response body:', responseText)

    if (!response.ok) {
      console.error('BizGO API error:', response.status, responseText)
      return NextResponse.json(
        { 
          success: false, 
          error: `BizGO API error: ${response.status} - ${responseText}` 
        },
        { status: response.status }
      )
    }

    let bizgoResponse: BizGOResponse
    try {
      bizgoResponse = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Failed to parse BizGO response:', parseError)
      return NextResponse.json(
        { success: false, error: 'Invalid response from BizGO API' },
        { status: 500 }
      )
    }

    // Check if the request was successful
    if (bizgoResponse.common?.authCode !== 'A000' || bizgoResponse.data?.code !== 'A000') {
      console.error('BizGO API returned error:', bizgoResponse)
      return NextResponse.json(
        { 
          success: false, 
          error: `BizGO API error: ${bizgoResponse.common?.authResult || bizgoResponse.data?.result || 'Unknown error'}` 
        },
        { status: 400 }
      )
    }

    // Count successful and failed sends
    const results = bizgoResponse.data.data.destinations
    const successful = results.filter(dest => dest.code === 'A000')
    const failed = results.filter(dest => dest.code !== 'A000')

    console.log(`MMS sending completed: ${successful.length} successful, ${failed.length} failed`)

    return NextResponse.json({
      success: true,
      data: {
        total: results.length,
        successful: successful.length,
        failed: failed.length,
        results: results,
        groupKey: body.groupKey,
        infobankTrId: bizgoResponse.common.infobankTrId
      }
    })

  } catch (error) {
    console.error('Error in MMS API:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Method not allowed. Use POST to send MMS messages.' 
    },
    { status: 405 }
  )
}


