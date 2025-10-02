import { NextRequest, NextResponse } from 'next/server'
import { sendBulkMessages } from '@/lib/infobank-omni'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { recipients, message, from = '1600-9064' } = body

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json(
        { error: 'Recipients array is required' },
        { status: 400 }
      )
    }

    if (!message || !message.text) {
      return NextResponse.json(
        { error: 'Message text is required' },
        { status: 400 }
      )
    }

    console.log(`Sending MMS to ${recipients.length} recipients via BizGO API`)

    // Prepare messages for bulk sending
    const messages = recipients.map(recipient => ({
      to: recipient.phone,
      from: from,
      title: message.title || 'VONAER 본에어',
      text: message.text,
      fileKey: message.fileKeys || []
    }))

    // Send bulk messages using OMNI SDK
    const results = await sendBulkMessages(messages, 'mms')

    // Count successful and failed sends
    const successful = results.filter(r => r.success).length
    const failed = results.filter(r => !r.success).length

    console.log(`BizGO MMS Results: ${successful} successful, ${failed} failed`)

    return NextResponse.json({
      success: true,
      message: `Messages sent successfully via BizGO API`,
      results: {
        total: recipients.length,
        successful,
        failed,
        details: results
      }
    })

  } catch (error) {
    console.error('BizGO MMS API Error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send messages via BizGO API',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
