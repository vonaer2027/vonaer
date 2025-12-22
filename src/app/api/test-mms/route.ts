import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phoneNumber } = body

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    // Clean phone number
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '')

    // Validate Korean phone number
    if (!/^01[0-9]{8,9}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Invalid Korean phone number format. Use 01012345678' },
        { status: 400 }
      )
    }

    const bizgoApiKey = process.env.BIZGO_API_KEY
    const bizgoBaseUrl = process.env.BIZGO_BASE_URL || 'https://mars.ibapi.kr/api/comm'

    if (!bizgoApiKey) {
      return NextResponse.json(
        { error: 'BIZGO_API_KEY not configured' },
        { status: 500 }
      )
    }

    // Test message
    const testMessage = `[본에어 테스트 메시지]
이것은 BizGO MMS API 테스트 메시지입니다.
발송 시각: ${new Date().toLocaleString('ko-KR')}

수신거부: 080-877-6077`

    const bizgoRequest = {
      destinations: [{
        to: cleanPhone,
        replaceWords: {},
        ref: `test_${Date.now()}`
      }],
      messageFlow: [{
        mms: {
          from: '0260129500',
          text: testMessage,
          title: '[본에어 테스트]',
          ttl: '86400'
        }
      }],
      groupKey: `test_${Date.now()}`,
      ref: `test_request_${Date.now()}`
    }

    console.log('=== MMS TEST ===')
    console.log('Target phone:', cleanPhone)
    console.log('API URL:', `${bizgoBaseUrl}/v1/send/omni`)
    console.log('Request:', JSON.stringify(bizgoRequest, null, 2))

    const response = await fetch(`${bizgoBaseUrl}/v1/send/omni`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bizgoApiKey
      },
      body: JSON.stringify(bizgoRequest)
    })

    const responseText = await response.text()
    console.log('Response status:', response.status)
    console.log('Response body:', responseText)

    let responseData
    try {
      responseData = JSON.parse(responseText)
    } catch {
      responseData = { raw: responseText }
    }

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      phoneNumber: cleanPhone,
      apiUrl: `${bizgoBaseUrl}/v1/send/omni`,
      response: responseData,
      message: response.ok
        ? 'Test message sent successfully!'
        : `API Error: ${response.status}`
    })

  } catch (error) {
    console.error('Test MMS Error:', error)
    return NextResponse.json(
      {
        error: 'Test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  const bizgoApiKey = process.env.BIZGO_API_KEY
  const bizgoBaseUrl = process.env.BIZGO_BASE_URL || 'https://mars.ibapi.kr/api/comm'

  return NextResponse.json({
    message: 'MMS Test Endpoint',
    usage: 'POST with { "phoneNumber": "01012345678" }',
    config: {
      apiKeyConfigured: !!bizgoApiKey,
      apiKeyPrefix: bizgoApiKey ? bizgoApiKey.substring(0, 10) + '...' : 'NOT SET',
      baseUrl: bizgoBaseUrl
    }
  })
}
