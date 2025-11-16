'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import enMessages from '../../messages/en.json'
import krMessages from '../../messages/kr.json'
import jpMessages from '../../messages/jp.json'
import cnMessages from '../../messages/cn.json'

type Locale = 'en' | 'kr' | 'jp' | 'cn'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}

const messages = {
  en: enMessages,
  kr: krMessages,
  jp: jpMessages,
  cn: cnMessages,
}

interface LocaleProviderProps {
  children: ReactNode
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>('kr')
  const [isDetecting, setIsDetecting] = useState(false) // Can be used to show loading state

  useEffect(() => {
    const detectAndSetLocale = async () => {
      // Check if user has a saved preference
      const savedLocale = localStorage.getItem('locale') as Locale

      if (savedLocale && ['en', 'kr', 'jp', 'cn'].includes(savedLocale)) {
        // User has a saved preference, use it
        setLocale(savedLocale)
        return
      }

      // Check if we've already detected locale in this session
      const detectedLocale = sessionStorage.getItem('detected-locale') as Locale
      if (detectedLocale && ['en', 'kr', 'jp', 'cn'].includes(detectedLocale)) {
        setLocale(detectedLocale)
        return
      }

      // No saved preference and no detection yet - detect based on IP
      try {
        setIsDetecting(true)
        const response = await fetch('/api/detect-locale')

        if (!response.ok) {
          throw new Error('Failed to detect locale')
        }

        const data = await response.json()
        const detectedLocale = data.locale as Locale

        // Validate the detected locale
        if (detectedLocale && ['en', 'kr', 'jp', 'cn'].includes(detectedLocale)) {
          setLocale(detectedLocale)
          // Save to sessionStorage to avoid re-detecting on page refresh
          sessionStorage.setItem('detected-locale', detectedLocale)

          // Optionally log for debugging (remove in production)
          console.log(`[Locale] Auto-detected: ${detectedLocale} (${data.country})`)
        } else {
          // Fallback to Korean
          setLocale('kr')
          sessionStorage.setItem('detected-locale', 'kr')
        }
      } catch (error) {
        console.error('[Locale] Detection failed, defaulting to Korean:', error)
        // Fallback to Korean on error
        setLocale('kr')
        sessionStorage.setItem('detected-locale', 'kr')
      } finally {
        setIsDetecting(false)
      }
    }

    detectAndSetLocale()
  }, [])

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      <NextIntlClientProvider 
        key={locale} // Force re-render when locale changes
        locale={locale} 
        messages={messages[locale]}
        timeZone="Asia/Seoul"
      >
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  )
}
