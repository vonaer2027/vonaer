'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'

type Locale = 'en' | 'kr' | 'jp' | 'cn'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within a ClientLocaleProvider')
  }
  return context
}

interface ClientLocaleProviderProps {
  children: ReactNode
}

export function ClientLocaleProvider({ children }: ClientLocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [messages, setMessages] = useState<Record<string, unknown> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale
    if (savedLocale && ['en', 'kr', 'jp', 'cn'].includes(savedLocale)) {
      setLocaleState(savedLocale)
    }
  }, [])

  // Load messages when locale changes
  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true)
      try {
        // Try to fetch messages from the API route or static files
        const response = await fetch(`/api/messages/${locale}`)
        if (response.ok) {
          const messages = await response.json()
          setMessages(messages)
        } else {
          throw new Error('Failed to fetch messages')
        }
      } catch (error) {
        console.error('Failed to load messages for locale:', locale, error)
        // Fallback to English
        try {
          const fallbackResponse = await fetch(`/api/messages/en`)
          if (fallbackResponse.ok) {
            const fallbackMessages = await fallbackResponse.json()
            setMessages(fallbackMessages)
          } else {
            throw new Error('Failed to fetch fallback messages')
          }
        } catch (fallbackError) {
          console.error('Failed to load fallback messages:', fallbackError)
          // Use empty messages as last resort
          setMessages({})
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadMessages()
  }, [locale])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  // Show loading state only briefly, then show content even without messages
  if (isLoading && !messages) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider messages={messages} locale={locale}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  )
}
