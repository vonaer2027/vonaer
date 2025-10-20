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
import {
  Users,
  Anchor
} from 'lucide-react'

const yachts = [
  {
    id: 1,
    name: 'ENERGY',
    builder: 'Amels, 네덜란드',
    year: '2022년',
    length: '77.8m (255.2ft)',
    guests: '7개 캐빈에 14명 수용',
    description: '일부 요트는 트렌드를 따르도록 설계되지만, 2022년 인도된 77.8m (255.2ft) 풀 커스텀 Amels인 ENERGY는 트렌드를 선도하기 위해 건조되었습니다. Lloyd\'s 등급의 강철 선체와 알루미늄 상부 구조물, Espen Øino의 스타일링, François Zuretti의 인테리어로 완성된 ENERGY는 관습에 도전하고 바다와의 연결을 핵심에 두는 디자인 철학의 산물입니다.',
    image: '/yacht/Yacht1.png',
    gradient: 'from-primary/5 to-primary/10'
  },
  {
    id: 2,
    name: 'AXIOMA',
    builder: 'Dunya Yachts, 터키',
    year: '2013년 (2025년 리피팅)',
    length: '72m (236.2ft)',
    guests: '6개 캐빈에 12명 수용',
    description: '놀라운 72m (236.2ft) AXIOMA는 2013년 터키 조선소 Dunya Yachts에서 건조된 강철 선체 배수형 요트입니다. 1,620GT의 넓은 내부 공간과 12명의 게스트 수용 시설을 제공합니다. Sterling Scott의 외관 스타일링과 Alberto Pinto의 인테리어 디자인으로 완성되었으며, ABS 및 MCA를 준수합니다.',
    image: '/yacht/Yacht2.png',
    gradient: 'from-primary/5 to-primary/10'
  },
  {
    id: 3,
    name: 'CARPE DIEM',
    builder: 'Trinity Yachts, 미국',
    year: '2011년 (2024년 리피팅)',
    length: '58.2m (190.9ft)',
    guests: '6개 캐빈에 12명 수용',
    description: '진정으로 웅장한 58.2m (191ft) Trinity CARPE DIEM은 미국 디자인과 장인정신의 진정한 증거입니다. Trinity의 고효율 알루미늄 선체와 얕은 흘수, 넓은 10.2m (33.5ft) 빔 위에 건조되어, 이 크기의 요트로서는 탁월한 내부 공간과 넓은 데크 공간을 제공합니다.',
    image: '/yacht/Yacht3.png',
    gradient: 'from-primary/5 to-primary/10'
  },
  {
    id: 4,
    name: 'AFTER YOU',
    builder: 'Heesen, 네덜란드',
    year: '2011년 (2022년 리피팅)',
    length: '55m (180.4ft)',
    guests: '6개 캐빈에 12명 수용',
    description: 'AFTER YOU는 2011년 네덜란드 조선소 Heesen에서 인도된 55m (180.5ft) 모터 요트입니다. 인도 당시 Heesen이 진수한 가장 크고 강력한 요트 중 하나였습니다. 맞춤형 디자인 프로젝트로 건조된 AFTER YOU는 독특한 기능, 유일무이한 디자인 및 인상적인 성능으로 진정한 혈통을 보여줍니다.',
    image: '/yacht/Yacht4.png',
    gradient: 'from-primary/5 to-primary/10'
  }
]

export default function YachtPage() {
  const t = useTranslations()
  const [menuOpen, setMenuOpen] = useState(false)
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false)
  const [selectedYacht, setSelectedYacht] = useState('')

  const handleRequestQuote = (yachtName: string) => {
    setSelectedYacht(yachtName)
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
              럭셔리 요트
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              세계 최고의 럭셔리 요트로 바다 위의 특별한 경험을 선사합니다
            </p>
          </motion.div>

          {/* Yachts Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {yachts.map((yacht, index) => (
              <motion.div
                key={yacht.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -8 }}
              >
                <Card className={`border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-br ${yacht.gradient}`}>
                  {/* Yacht Image */}
                  <div className="relative h-64 bg-muted/30 overflow-hidden">
                    <img
                      src={yacht.image}
                      alt={yacht.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardContent className="p-8">
                    {/* Yacht Name */}
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {yacht.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      {yacht.builder}
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      건조연도: {yacht.year}
                    </p>

                    {/* Yacht Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                        <Anchor className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">길이</p>
                          <p className="text-sm text-muted-foreground">{yacht.length}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                        <Users className="h-5 w-5 text-primary flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">탑승 인원</p>
                          <p className="text-sm text-muted-foreground">{yacht.guests}</p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                        {yacht.description}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Button
                      onClick={() => handleRequestQuote(yacht.name)}
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
        inquiryType="yacht"
        itemName={selectedYacht}
      />
    </div>
  )
}
