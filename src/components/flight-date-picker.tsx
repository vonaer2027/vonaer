'use client'

import * as React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
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
  returnDate?: Date
  onReturnDateSelect?: (date: Date | undefined) => void
  isRoundTrip?: boolean
}

export function FlightDatePicker({
  date,
  onDateSelect,
  placeholder,
  disabled = false,
  className,
  minDate,
  maxDate,
  returnDate,
  onReturnDateSelect,
  isRoundTrip = false
}: FlightDatePickerProps) {
  const t = useTranslations()
  const { locale } = useLocale()
  const [open, setOpen] = React.useState(false)
  const [selectingReturn, setSelectingReturn] = React.useState(false)

  // Map our locale codes to proper locale strings for date formatting
  const localeMap: { [key: string]: string } = {
    'en': 'en-US',
    'kr': 'ko-KR', 
    'jp': 'ja-JP',
    'cn': 'zh-CN'
  }

  const formatDate = (date: Date) => {
    // Use consistent MMDDYYYY format for all locales
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (isRoundTrip && !selectingReturn) {
      // First selection for round trip - set departure date
      onDateSelect?.(selectedDate)
      setSelectingReturn(true)
      // Don't close the popover, wait for return date selection
    } else if (isRoundTrip && selectingReturn) {
      // Second selection for round trip - set return date
      onReturnDateSelect?.(selectedDate)
      setSelectingReturn(false)
      setOpen(false)
    } else {
      // One-way trip
      onDateSelect?.(selectedDate)
      setOpen(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      setSelectingReturn(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
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
              <CalendarIcon className="h-4 w-4" />
            </div>
            <div className="flex-1 text-left">
              {isRoundTrip ? (
                <span className="text-sm text-foreground">
                  {date && returnDate
                    ? `${formatDate(date)} - ${formatDate(returnDate)}`
                    : date
                    ? `${formatDate(date)} - ${t('booking.placeholders.returnDate')}`
                    : placeholder || t('common.selectDate')}
                </span>
              ) : (
                <span className="text-sm text-foreground">
                  {date ? formatDate(date) : (placeholder || t('common.selectDate'))}
                </span>
              )}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 border-b">
          <p className="text-sm font-medium text-center">
            {isRoundTrip
              ? selectingReturn
                ? t('booking.placeholders.returnDate')
                : t('booking.placeholders.departureDate')
              : placeholder || t('common.selectDate')}
          </p>
        </div>
        <Calendar
          mode="single"
          selected={selectingReturn ? returnDate : date}
          onSelect={handleDateSelect}
          disabled={(calDate) => {
            if (selectingReturn && date && calDate < date) return true
            if (minDate && calDate < minDate) return true
            if (maxDate && calDate > maxDate) return true
            return false
          }}
          className="rounded-md shadow-sm"
        />
      </PopoverContent>
    </Popover>
  )
}
