'use client'

import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Plane } from 'lucide-react'
import { searchCities, City } from '@/lib/cities'
import { motion, AnimatePresence } from 'framer-motion'

interface CitySearchInputProps {
  id: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  icon?: 'plane' | 'pin'
  className?: string
}

export function CitySearchInput({ 
  id, 
  placeholder, 
  value, 
  onChange, 
  icon = 'pin',
  className = '' 
}: CitySearchInputProps) {
  const [searchResults, setSearchResults] = useState<City[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value.length >= 2) {
      const results = searchCities(value)
      setSearchResults(results)
      setShowDropdown(results.length > 0)
    } else {
      setSearchResults([])
      setShowDropdown(false)
    }
    setSelectedIndex(-1)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
  }

  const handleCitySelect = (city: City) => {
    onChange(`${city.name}, ${city.country}`)
    setShowDropdown(false)
    setSelectedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || searchResults.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          handleCitySelect(searchResults[selectedIndex])
        }
        break
      case 'Escape':
        setShowDropdown(false)
        setSelectedIndex(-1)
        break
    }
  }

  const IconComponent = icon === 'plane' ? Plane : MapPin

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
          <IconComponent className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          ref={inputRef}
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => value.length >= 2 && setShowDropdown(searchResults.length > 0)}
          className="h-14 text-base pl-10 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          autoComplete="off"
        />
      </div>

      <AnimatePresence>
        {showDropdown && searchResults.length > 0 && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 z-50 mt-1"
          >
            <Card className="border shadow-lg max-h-64 overflow-y-auto bg-white dark:bg-gray-800">
              <CardContent className="p-0">
                {searchResults.map((city, index) => (
                  <Button
                    key={`${city.name}-${city.country}`}
                    variant="ghost"
                    className={`w-full justify-start p-3 h-auto text-left rounded-none border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${
                      index === selectedIndex ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                    onClick={() => handleCitySelect(city)}
                  >
                    <div className="w-full">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {city.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {city.country}
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
