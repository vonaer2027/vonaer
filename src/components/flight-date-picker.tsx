'use client'

import * as React from 'react'
import { Calendar as CalendarIcon, Plane } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useLocale } from '@/components/locale-provider'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface FlightDatePickerProps {
  date?: Date
  onDateSelect?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  minDate?: Date
  maxDate?: Date
}

export function FlightDatePicker({
  date,
  onDateSelect,
  placeholder,
  disabled = false,
  className,
  minDate,
  maxDate
}: FlightDatePickerProps) {
  const t = useTranslations()
  const { locale } = useLocale()
  const [open, setOpen] = React.useState(false)

  // Map our locale codes to proper locale strings for date formatting
  const localeMap: { [key: string]: string } = {
    'en': 'en-US',
    'kr': 'ko-KR', 
    'jp': 'ja-JP',
    'cn': 'zh-CN'
  }
  
  const browserLocale = localeMap[locale] || 'en-US'

  const formatDate = (date: Date) => {
    // Use consistent MMDDYYYY format for all locales
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    onDateSelect?.(selectedDate)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal h-14 px-4",
            !date && "text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          disabled={disabled}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-center gap-2 text-primary flex-shrink-0">
              <Plane className="h-4 w-4" />
              <CalendarIcon className="h-4 w-4" />
            </div>
            <div className="flex-1 text-left">
              {date ? (
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">
                    {formatDate(date)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {t('common.flightDate')}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    {placeholder || t('common.selectDate')}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {t('common.flightDate')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          disabled={(date) => {
            if (minDate && date < minDate) return true
            if (maxDate && date > maxDate) return true
            return false
          }}
          className="rounded-md border shadow-sm"
        />
      </PopoverContent>
    </Popover>
  )
}
