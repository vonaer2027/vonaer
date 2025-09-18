'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Check, Type } from 'lucide-react'

type FontType = 'noto-sans-kr' | 'pretendard'

export function FontToggle() {
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

  const fonts = [
    {
      value: 'noto-sans-kr' as const,
      label: 'Noto Sans KR',
      description: 'Google Noto Sans Korean'
    },
    {
      value: 'pretendard' as const,
      label: 'Pretendard',
      description: 'Pretendard Korean font'
    }
  ]

  const currentFont = fonts.find(f => f.value === font)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-3 gap-2"
        >
          <Type className="h-4 w-4" />
          <span className="hidden sm:inline">{currentFont?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {fonts.map((fontOption) => (
          <DropdownMenuItem
            key={fontOption.value}
            onClick={() => setFont(fontOption.value)}
            className="flex items-center justify-between"
          >
            <div className="flex flex-col">
              <span className="font-medium">{fontOption.label}</span>
              <span className="text-xs text-muted-foreground">
                {fontOption.description}
              </span>
            </div>
            {font === fontOption.value && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
