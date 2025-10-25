'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { VonaerFooter } from '@/components/vonaer-footer'
import { InquiryDialog } from '@/components/inquiry-dialog'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

const vehicles = [
  {
    id: 1,
    name: '벤츠 S580 마이바흐',
    subtitle: '울트라 럭셔리 세단',
    features: [
      '비할 데 없는 세련됨',
      '임원 뒷좌석',
      '궁극의 편안함',
      '프레스티지 럭셔리'
    ],
    image: '/car/Benz.png',
    gradient: 'from-primary/5 to-primary/10'
  },
  {
    id: 2,
    name: '벤츠 스프린터 VIP 리무진',
    subtitle: '맞춤형 VIP 리무진',
    features: [
      '맞춤형 럭셔리 편의시설',
      '뛰어난 공간',
      '높은 맞춤화',
      'VIP 편안함'
    ],
    image: '/car/Sprinter.jpg',
    gradient: 'from-primary/5 to-primary/10'
  }
]

export default function SuperCarPage() {
  const t = useTranslations()
  const [menuOpen, setMenuOpen] = useState(false)
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false)
  const [selectedCar, setSelectedCar] = useState('')

  const handleRequestQuote = (carName: string) => {
    setSelectedCar(carName)
    setInquiryDialogOpen(true)
  }

  const handleInquirySuccess = () => {
    setInquiryDialogOpen(false)
    toast.success(t('flightSearchDialog.success.submitted'))
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <VonaerHeader 
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
      />

      {/* Menu Overlay */}
      <VonaerMenuOverlay 
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      {/* Main Content */}
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Chauffeured Car
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              프리미엄 럭셔리 차량으로 최고의 지상 교통을 경험하세요
            </p>
          </motion.div>

          {/* Vehicles Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {vehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -8 }}
              >
                <Card className={`border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br ${vehicle.gradient}`}>
                  {/* Vehicle Image */}
                  <div className="relative h-64 bg-muted/30 overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardContent className="p-8">
                    {/* Vehicle Name */}
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {vehicle.name}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      {vehicle.subtitle}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      <p className="text-sm font-semibold text-foreground mb-3">차량별 주요 특징</p>
                      {vehicle.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">{feature}</p>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      onClick={() => handleRequestQuote(vehicle.name)}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-semibold"
                    >
                      예약 문의
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <VonaerFooter />

      {/* Inquiry Dialog */}
      <InquiryDialog
        open={inquiryDialogOpen}
        onOpenChange={setInquiryDialogOpen}
        onSuccess={handleInquirySuccess}
        inquiryType="car"
        itemName={selectedCar}
      />
    </div>
  )
}
