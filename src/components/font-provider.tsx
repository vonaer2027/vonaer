'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type FontType = 'noto-sans-kr' | 'pretendard'

interface FontContextType {
  font: FontType
  setFont: (font: FontType) => void
}

const FontContext = createContext<FontContextType | undefined>(undefined)

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [font, setFont] = useState<FontType>('noto-sans-kr')

  useEffect(() => {
    // Load font preference from localStorage
    const savedFont = localStorage.getItem('font-preference') as FontType
    if (savedFont && (savedFont === 'noto-sans-kr' || savedFont === 'pretendard')) {
      setFont(savedFont)
    }
  }, [])

  useEffect(() => {
    // Save font preference to localStorage
    localStorage.setItem('font-preference', font)
    
    // Apply font to document
    const root = document.documentElement
    if (font === 'pretendard') {
      root.style.setProperty('--font-sans', 'var(--font-pretendard)')
    } else {
      root.style.setProperty('--font-sans', 'var(--font-noto-sans-kr)')
    }
  }, [font])

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  )
}

export function useFont() {
  const context = useContext(FontContext)
  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider')
  }
  return context
}
