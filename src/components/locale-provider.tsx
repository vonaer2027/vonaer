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
  const [locale, setLocale] = useState<Locale>('en')

  useEffect(() => {
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem('locale') as Locale
    if (savedLocale && ['en', 'kr', 'jp', 'cn'].includes(savedLocale)) {
      setLocale(savedLocale)
    }
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
