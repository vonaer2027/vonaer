'use client'

import { useLocale } from './locale-provider'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'kr', name: '한국어', flag: '🇰🇷' },
  { code: 'jp', name: '日本語', flag: '🇯🇵' },
  { code: 'cn', name: '中文', flag: '🇨🇳' },
] as const

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4" />
      <div className="flex gap-1">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={locale === lang.code ? "default" : "ghost"}
            size="sm"
            onClick={() => setLocale(lang.code as 'en' | 'kr' | 'jp' | 'cn')}
            className="h-8 px-2 text-xs"
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.name}
          </Button>
        ))}
      </div>
    </div>
  )
}