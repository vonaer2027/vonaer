'use client'

import { useLocale } from './locale-provider'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Languages } from 'lucide-react'

const languages = [
  { code: 'en', name: 'EN' },
  { code: 'kr', name: 'KR' },
  { code: 'jp', name: 'JP' },
  { code: 'cn', name: 'CN' },
] as const

export function LanguageDropdown() {
  const { locale, setLocale } = useLocale()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 sm:h-9 sm:w-9 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 hover:bg-primary-foreground/10 hover:border-primary-foreground/30 transition-all duration-300 touch-manipulation"
        >
          <Languages className="h-4 w-4 text-primary-foreground" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[80px] touch-manipulation">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLocale(lang.code as 'en' | 'kr' | 'jp' | 'cn')}
            className={`justify-center font-medium min-h-[44px] cursor-pointer ${
              locale === lang.code ? 'bg-accent' : ''
            }`}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
