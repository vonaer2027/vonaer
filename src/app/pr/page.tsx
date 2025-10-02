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
  ExternalLink, 
  FileText, 
  Image,
  Video,
  Download,
  Newspaper,
  Mail,
  Bell,
  Play
} from 'lucide-react'

// Newsroom Articles
const newsroomArticles = [
  {
    id: 1,
    title: '본에어, 프라이빗 제트에 세계 최초 XR 명상 솔루션 도입… 이동에서 몰입으로',
    date: '2025.07.24',
    category: 'Technology',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1753340201.jpeg'
  },
  {
    id: 2,
    title: '러시아 우회 없이 유럽 간다 – 직선 항로 프라이빗 운항 개시',
    date: '2025.05.13',
    category: 'Service Launch',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1747125100.png'
  },
  {
    id: 3,
    title: '본에어–더블미, 프라이빗 제트에 XR 콘텐츠 도입',
    date: '2025.04.22',
    category: 'Partnership',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1745369545.jpg'
  },
  {
    id: 4,
    title: '본에어, 英 소라와 30인승 eVTOL 도입',
    date: '2025.03.11',
    category: 'Fleet Expansion',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1743040830.jpg'
  },
  {
    id: 5,
    title: '본에어 TIPS 최종 선정',
    date: '2024.11.09',
    category: 'Award',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1736213859.png'
  },
  {
    id: 6,
    title: '본에어 골프 당일 라운딩 상품 출시',
    date: '2024.10.07',
    category: 'Service Launch',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1736732843.png'
  },
  {
    id: 7,
    title: '본에어 프라이빗 제트 서비스 런칭',
    date: '2024.09.02',
    category: 'Service Launch',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1736213524.png'
  },
  {
    id: 8,
    title: '본에어,  추석특가 프라이빗 헬기상품 판매',
    date: '2024.08.27',
    category: 'Promotion',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1724727336.png'
  },
  {
    id: 9,
    title: '본에어, 아티스트 지원하는 한불 특별교류전 \'블랑\' 후원사 참여',
    date: '2024.08.23',
    category: 'Partnership',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1724727388.png'
  },
  {
    id: 10,
    title: '본에어 서비스 그랜드 오픈',
    date: '2024.06.10',
    category: 'Company News',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1736125077.png'
  }
]

// Newsletter Articles
const newsletterArticles = [
  {
    id: 1,
    title: '텃밭에서 스타트업의 전략을 발견했어요',
    date: '2025.07.31',
    category: 'Insights',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1756277351.png'
  },
  {
    id: 2,
    title: '\'시간부자\'로 만들어드릴께요!',
    date: '2025.06.30',
    category: 'Service',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1751252351.jpg'
  },
  {
    id: 3,
    title: '제트기 타고 친구랑 오사카 가실래요?',
    date: '2025.05.30',
    category: 'Travel',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1749619590.png'
  },
  {
    id: 4,
    title: '세계 최고 부자와 구독자님과의 공통점은?',
    date: '2025.04.30',
    category: 'Insights',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1749621081.jpg'
  },
  {
    id: 5,
    title: '하늘의 페라리, 팔콘8X 를 타고 나르샤',
    date: '2025.03.26',
    category: 'Fleet',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1743040977.jpg'
  }
]

// Notice Articles
const noticeArticles = [
  {
    id: 1,
    title: '본에어, 당일 골프 라운딩 즐길 수 있는 헬기 상품 런칭',
    date: '2024.10.04',
    category: 'Service Launch',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/notice/1728363846.png'
  },
  {
    id: 2,
    title: '본에어 프라이빗 제트 서비스 런칭 기념 특가 이벤트',
    date: '2024.09.02',
    category: 'Promotion',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/notice/1725244334.png'
  },
  {
    id: 3,
    title: '본에어, 추석특가 프라이빗 헬기상품 판매',
    date: '2024.08.27',
    category: 'Promotion',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/notice/1724725253.png'
  },
  {
    id: 4,
    title: 'VON프라이빗 멤버십 특별혜택 이벤트 오픈',
    date: '2023.12.19',
    category: 'Membership',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/notice/1721609433.png'
  },
  {
    id: 5,
    title: '[종료] 2023 제1회 본에어 UAM 메이커톤',
    date: '2023.05.01',
    category: 'Event',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/notice/1721609492.jpg'
  }
]

// Video Content
const videoContent = {
  brandFilms: [
    {
      id: 1,
      title: '[KR] VONAER Brand Film (ver.1)',
      thumbnail: 'https://i.ytimg.com/vi/IK9l1uMrN7Q/sddefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/IK9l1uMrN7Q',
      category: 'Brand Film'
    },
    {
      id: 2,
      title: '[EN] VONAER Brand Film (ver.1)',
      thumbnail: 'https://i.ytimg.com/vi/6ul64GA7COI/sddefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/6ul64GA7COI',
      category: 'Brand Film'
    },
    {
      id: 3,
      title: 'VONAER Teaser',
      thumbnail: 'https://i.ytimg.com/vi/CxfN3DDso-Q/sddefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/CxfN3DDso-Q',
      category: 'Brand Film'
    }
  ],
  eventSketches: [
    {
      id: 4,
      title: '연합뉴스TV 출근길 인터뷰',
      thumbnail: 'https://i.ytimg.com/vi/ROxd9OSW7uQ/sddefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/ROxd9OSW7uQ',
      category: 'Interview'
    },
    {
      id: 5,
      title: '한국형 도심항공교통(K-UAM·Urban Air Mobility) 그랜드챌린지 공개 비행 시연 행사',
      thumbnail: 'https://i.ytimg.com/vi/qk9ElLz6zRw/sddefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/qk9ElLz6zRw',
      category: 'Event'
    },
    {
      id: 6,
      title: '2023 서울모빌리티쇼 현장 스케치',
      thumbnail: 'https://i.ytimg.com/vi/tFPiohal34c/sddefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/tFPiohal34c',
      category: 'Event'
    }
  ],
  safetyGuides: [
    {
      id: 7,
      title: 'VONAER 안전영상 (Korean Ver.)',
      thumbnail: 'https://i.ytimg.com/vi/omLcIprnO1s/sddefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/omLcIprnO1s',
      category: 'Safety'
    },
    {
      id: 8,
      title: 'VONAER Safety Video (English Subs Ver.)',
      thumbnail: 'https://i.ytimg.com/vi/m3DVj0ozMVo/sddefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/m3DVj0ozMVo',
      category: 'Safety'
    }
  ]
}

const mediaKit = [
  {
    title: 'Company Logos',
    description: 'High-resolution VONAER logos in various formats',
    type: 'Images',
    icon: Image,
    downloadLink: '#'
  },
  {
    title: 'Press Kit',
    description: 'Company overview, executive bios, and fact sheets',
    type: 'Documents',
    icon: FileText,
    downloadLink: '#'
  },
  {
    title: 'Product Videos',
    description: 'Promotional and educational videos about VONAER services',
    type: 'Videos',
    icon: Video,
    downloadLink: '#'
  }
]

export default function PRPage() {
  const t = useTranslations()
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

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
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('pr.subtitle')}
            </p>
          </motion.div>

          {/* Media Kit */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t('pr.mediaKit.title')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {mediaKit.map((item, index) => (
                <Card key={index} className="border shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-2xl border border-border bg-muted/30 flex items-center justify-center mx-auto mb-6">
                      <item.icon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{item.description}</p>
                    <Badge variant="outline" className="mb-4">
                      {item.type}
                    </Badge>
                    <Button className="w-full border border-border bg-muted/30 text-foreground hover:bg-muted/50 transition-all duration-300 group">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
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
            <div className="grid gap-6">
              {newsroomArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="border shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Image */}
                        <div className="md:w-1/3">
                          <div className="h-48 md:h-full bg-muted/30 border-r border-border overflow-hidden">
                            <img 
                              src={article.image} 
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="md:w-2/3 p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <Badge variant="outline">
                              {article.category}
                            </Badge>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                              <Calendar className="h-4 w-4" />
                              {formatDate(article.date)}
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-foreground mb-3">
                            {article.title}
                          </h3>
                          
                          <Button className="border border-border bg-muted/30 text-foreground hover:bg-muted/50 transition-all duration-300 group">
                            Read More
                            <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <Mail className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">
                Newsletter
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsletterArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="border shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="h-48 bg-muted/30 overflow-hidden">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            {article.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-muted-foreground text-xs">
                            <Calendar className="h-3 w-3" />
                            {formatDate(article.date)}
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2">
                          {article.title}
                        </h3>
                        <Button size="sm" className="w-full border border-border bg-muted/30 text-foreground hover:bg-muted/50 transition-all duration-300">
                          Read More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Notice Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <Bell className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">
                Notices
              </h2>
            </div>
            <div className="grid gap-4">
              {noticeArticles.map((notice, index) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <Card className="border shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-muted/30 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={notice.image} 
                            alt={notice.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {notice.category}
                            </Badge>
                            <div className="flex items-center gap-1 text-muted-foreground text-sm">
                              <Calendar className="h-3 w-3" />
                              {formatDate(notice.date)}
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-foreground">
                            {notice.title}
                          </h3>
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <Video className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">
                Videos
              </h2>
            </div>

            {/* Brand Films */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-6">Brand Films</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {videoContent.brandFilms.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <Card className="border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="relative">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Button
                            size="lg"
                            className="rounded-full bg-white/90 text-black hover:bg-white"
                            onClick={() => setSelectedVideo(video.videoUrl)}
                          >
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-bold text-foreground mb-2">{video.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {video.category}
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Event Sketches */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-6">Event Sketches</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoContent.eventSketches.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <Card className="border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="relative">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Button
                            size="sm"
                            className="rounded-full bg-white/90 text-black hover:bg-white"
                            onClick={() => setSelectedVideo(video.videoUrl)}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-bold text-foreground mb-2 text-sm line-clamp-2">{video.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {video.category}
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Safety Guides */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Safety Guides</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {videoContent.safetyGuides.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <Card className="border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="relative">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Button
                            size="lg"
                            className="rounded-full bg-white/90 text-black hover:bg-white"
                            onClick={() => setSelectedVideo(video.videoUrl)}
                          >
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-bold text-foreground mb-2">{video.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {video.category}
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact for Media */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16"
          >
            <Card className="border shadow-lg">
              <CardContent className="p-12 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Media Inquiries
                </h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  For press inquiries, interview requests, or additional information, please contact our media relations team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold">
                    Contact Media Team
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-border text-muted-foreground hover:bg-muted/30 hover:text-foreground px-8 py-3 text-lg font-semibold"
                  >
                    Download Media Kit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <Button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 bg-white/20 text-white hover:bg-white/30"
            >
              Close
            </Button>
            <div className="aspect-video">
              <iframe
                src={selectedVideo}
                title="VONAER Video"
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <VonaerFooter />
    </div>
  )
}
