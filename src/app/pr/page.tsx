'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  ArrowRight
} from 'lucide-react'

const pressReleases = [
  {
    id: 1,
    title: 'VONAER Launches Revolutionary Urban Air Mobility Platform',
    date: '2024-03-15',
    category: 'Company News',
    excerpt: 'VONAER announces the official launch of Korea\'s first comprehensive air mobility platform, connecting private jets, helicopters, and luxury ground transportation.',
    image: '/api/placeholder/400/250'
  },
  {
    id: 2,
    title: 'Partnership with Leading Aviation Companies Expands Fleet',
    date: '2024-02-28',
    category: 'Partnerships',
    excerpt: 'Strategic partnerships with major aviation companies significantly expand VONAER\'s fleet capabilities and service coverage across Asia.',
    image: '/api/placeholder/400/250'
  },
  {
    id: 3,
    title: 'VON Routine Service Reduces Seoul-ICN Travel Time to 20 Minutes',
    date: '2024-02-10',
    category: 'Service Launch',
    excerpt: 'New helicopter shuttle service between Gangnam and Incheon Airport revolutionizes business travel in Seoul metropolitan area.',
    image: '/api/placeholder/400/250'
  },
  {
    id: 4,
    title: 'VONAER Receives $50M Series A Funding',
    date: '2024-01-20',
    category: 'Funding',
    excerpt: 'Major investment round led by prominent venture capital firms accelerates expansion plans and technology development.',
    image: '/api/placeholder/400/250'
  },
  {
    id: 5,
    title: 'Safety Certification Milestone Achieved',
    date: '2024-01-05',
    category: 'Safety',
    excerpt: 'VONAER receives comprehensive safety certifications from Korean aviation authorities, ensuring highest safety standards.',
    image: '/api/placeholder/400/250'
  },
  {
    id: 6,
    title: 'VON Tour Packages Launch with Scenic Korean Routes',
    date: '2023-12-15',
    category: 'Service Launch',
    excerpt: 'New tourism helicopter packages offer breathtaking aerial views of Korea\'s most beautiful landmarks and natural scenery.',
    image: '/api/placeholder/400/250'
  }
]

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
  const [menuOpen, setMenuOpen] = useState(false)

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
              Press & Media
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Latest news, press releases, and media resources from VONAER
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
              Media Kit
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

          {/* Press Releases */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Press Releases
            </h2>
            <div className="grid gap-6">
              {pressReleases.map((release, index) => (
                <motion.div
                  key={release.id}
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
                          <div className="h-48 md:h-full bg-muted/30 border-r border-border flex items-center justify-center">
                            <div className="text-center text-muted-foreground">
                              <Image className="h-12 w-12 mx-auto mb-2 opacity-50" />
                              <p className="text-sm">Press Image</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="md:w-2/3 p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <Badge variant="outline">
                              {release.category}
                            </Badge>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                              <Calendar className="h-4 w-4" />
                              {new Date(release.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-foreground mb-3">
                            {release.title}
                          </h3>
                          
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            {release.excerpt}
                          </p>
                          
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

          {/* Contact for Media */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
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

      {/* Footer */}
      <VonaerFooter />
    </div>
  )
}
