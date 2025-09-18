import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  try {
    const { locale } = await params
    const validLocales = ['en', 'kr', 'jp', 'cn']
    
    if (!validLocales.includes(locale)) {
      return NextResponse.json({ error: 'Invalid locale' }, { status: 400 })
    }

    // Read the messages file
    const messagesPath = join(process.cwd(), 'messages', `${locale}.json`)
    const messages = await readFile(messagesPath, 'utf8')
    
    return NextResponse.json(JSON.parse(messages))
  } catch (error) {
    console.error('Error loading messages:', error)
    return NextResponse.json({ error: 'Failed to load messages' }, { status: 500 })
  }
}
