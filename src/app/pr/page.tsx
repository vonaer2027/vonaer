'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { VonaerFooter } from '@/components/vonaer-footer'
import { useState } from 'react'
import {
  Calendar,
  Newspaper
} from 'lucide-react'

// Newsroom Articles
const newsroomArticles = [
  {
    id: 7,
    title: '본에어 프라이빗 제트 서비스 런칭',
    date: '2024.09.02',
    category: 'Service Launch',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1736213524.png',
    url: 'https://news.mtn.co.kr/news-detail/2024090214162775392'
  },
  {
    id: 2,
    title: '러시아 우회 없이 유럽 간다 – 직선 항로 프라이빗 운항 개시',
    date: '2025.05.13',
    category: 'Service Launch',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1747125100.png',
    url: 'https://www.yna.co.kr/view/AKR20250513076900003?input=1195m'
  },
  {
    id: 3,
    title: '본에어–더블미, 프라이빗 제트에 XR 콘텐츠 도입',
    date: '2025.04.22',
    category: 'Partnership',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1745369545.jpg',
    url: 'https://www.edaily.co.kr/News/Read?newsId=02095926642138744&mediaCodeNo=257'
  }
]

export default function PRPage() {
  const t = useTranslations()
  const [menuOpen, setMenuOpen] = useState(false)

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('.')
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
              {t('pr.title')}
            </h1>
          </motion.div>

          {/* Newsletter Subscription Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <Card className="border shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  본에어 뉴스레터를 구독하고
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  특별한 경험을 제공하는 본에어의 소식을 이메일로 받아보세요.
                </p>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold"
                  onClick={() => window.open('https://vonaer.stibee.com/subscribe/', '_blank')}
                >
                  뉴스레터 구독하기
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Newsroom Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <Newspaper className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">
                Newsroom
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsroomArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="cursor-pointer"
                  onClick={() => window.open(article.url, '_blank')}
                >
                  <Card className="border shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-0">
                      {/* Image */}
                      <div className="overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-auto"
                        />
                      </div>

                      {/* Content */}
                      <div className="px-4 py-4">
                        <h3 className="text-base font-bold text-foreground mb-2 line-clamp-2">
                          {article.title}
                        </h3>

                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Calendar className="h-3 w-3" />
                          {article.date}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <VonaerFooter />
    </div>
  )
}
