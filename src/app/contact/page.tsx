'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { VonaerFooter } from '@/components/vonaer-footer'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ContactPage() {
  const t = useTranslations('contact')
  const [menuOpen, setMenuOpen] = useState(false)

  const locations = [
    {
      id: 1,
      name: '강남 VON 라운지',
      address: '서울 강남구 학동로 523'
    },
    {
      id: 2,
      name: '잠실헬기장',
      address: '서울특별시 송파구 한가람로65, 잠실헬기장'
    },
    {
      id: 3,
      name: '인천공항 VON포트',
      address: '인천시 중구 운서동 2844-8'
    }
  ]

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
      <main className="pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {t('title')}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Single Card with All Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-2 shadow-xl bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-8 md:p-12">
                {/* Locations Section */}
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                    {t('locations')}
                  </h2>
                  <div className="space-y-6">
                    {locations.map((location) => (
                      <div
                        key={location.id}
                        className="p-4 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
                      >
                        <h3 className="text-base md:text-lg font-bold text-foreground mb-1">
                          {location.name}
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground">
                          {location.address}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border/50 my-8"></div>

                {/* Contact Information Section */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                    {t('contactInfo') || '연락처'}
                  </h2>

                  <div className="space-y-6">
                    {/* Email */}
                    <div className="p-4 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
                      <h3 className="text-base md:text-lg font-bold text-foreground mb-1">{t('email')}</h3>
                      <a
                        href="mailto:service@vonaer.com"
                        className="text-sm md:text-base text-primary hover:underline break-all"
                      >
                        service@vonaer.com
                      </a>
                    </div>

                    {/* Social Media */}
                    <div className="p-4 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
                      <h3 className="text-base md:text-lg font-bold text-foreground mb-3">{t('social')}</h3>
                      <div className="flex gap-4">
                        {/* KakaoTalk Link */}
                        <a
                          href="http://pf.kakao.com/_nxdxlHG"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                          {t('kakao')}
                        </a>

                        {/* Instagram Link */}
                        <a
                          href="https://www.instagram.com/vonaer_official/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                          {t('instagram')}
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="p-4 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
                      <h3 className="text-base md:text-lg font-bold text-foreground mb-1">{t('phone')}</h3>
                      <a
                        href="tel:+8216009064"
                        className="text-sm md:text-base text-primary hover:underline"
                      >
                        +82 1600 9064
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <VonaerFooter />
    </div>
  )
}
