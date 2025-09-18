"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface CalendarProps {
  mode?: "single"
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  className?: string
}

function Calendar({
  selected,
  onSelect,
  disabled,
  className,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(
    selected ? new Date(selected.getFullYear(), selected.getMonth(), 1) : new Date()
  )

  const today = new Date()
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }

  const handleDateSelect = (date: Date) => {
    if (disabled && disabled(date)) return
    onSelect?.(date)
  }

  const isSelected = (date: Date) => {
    if (!selected) return false
    return date.toDateString() === selected.toDateString()
  }

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString()
  }

  const days = getDaysInMonth(currentMonth)

  return (
    <div className={cn("p-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateMonth("prev")}
          className="h-8 w-8 p-0 hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <h2 className="text-sm font-semibold text-foreground">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateMonth("next")}
          className="h-8 w-8 p-0 hover:bg-muted"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-3">
        {dayNames.map((day) => (
          <div
            key={day}
            className="h-8 w-9 text-center text-xs font-semibold text-muted-foreground flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => (
          <div key={index} className="h-9 w-9">
            {date && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDateSelect(date)}
                disabled={disabled && disabled(date)}
                className={cn(
                  "h-9 w-9 p-0 font-normal transition-colors rounded-md",
                  isSelected(date) && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground font-semibold shadow-sm",
                  isToday(date) && !isSelected(date) && "bg-accent text-accent-foreground hover:bg-accent/80 font-medium",
                  !isSelected(date) && !isToday(date) && "hover:bg-muted text-foreground hover:text-foreground",
                  disabled && disabled(date) && "text-muted-foreground opacity-50 cursor-not-allowed"
                )}
              >
                {date.getDate()}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
