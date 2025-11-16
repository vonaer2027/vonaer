'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface FloorPlan {
  name: string
  image: string
}

interface FloorPlanModalProps {
  isOpen: boolean
  onClose: () => void
  floorPlans: FloorPlan[]
  aircraftTitle: string
}

export function FloorPlanModal({ isOpen, onClose, floorPlans, aircraftTitle }: FloorPlanModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (floorPlans.length === 0) return null

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? floorPlans.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === floorPlans.length - 1 ? 0 : prev + 1))
  }

  const currentPlan = floorPlans[currentIndex]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold">
            {aircraftTitle} - Floor Plans
          </DialogTitle>
        </DialogHeader>

        <div className="relative">
          {/* Floor Plan Image */}
          <div className="relative bg-white p-8 min-h-[400px] flex items-center justify-center">
            <Image
              src={currentPlan.image}
              alt={currentPlan.name}
              width={800}
              height={600}
              className="object-contain max-h-[600px] w-auto"
              priority
            />
          </div>

          {/* Navigation Buttons */}
          {floorPlans.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                onClick={handleNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>

        {/* Floor Plan Info */}
        <div className="p-6 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-lg">{currentPlan.name}</p>
              {floorPlans.length > 1 && (
                <p className="text-sm text-muted-foreground">
                  {currentIndex + 1} of {floorPlans.length}
                </p>
              )}
            </div>

            {/* Thumbnails */}
            {floorPlans.length > 1 && (
              <div className="flex gap-2">
                {floorPlans.map((plan, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-16 h-12 rounded border-2 overflow-hidden transition-all ${
                      index === currentIndex
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Image
                      src={plan.image}
                      alt={plan.name}
                      width={64}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
