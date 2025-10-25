'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import {
  Instagram,
  Youtube,
  MessageCircle
} from 'lucide-react'

export function VonaerFooter() {
  const t = useTranslations()

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/vonaer_official/' },
    { icon: MessageCircle, label: 'KakaoTalk', href: 'http://pf.kakao.com/_uxdihG' },
    { icon: Youtube, label: 'Youtube', href: 'https://www.youtube.com/@vonaer' }
  ]

  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-card text-card-foreground border-t">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information & Company Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-xs mb-2 text-foreground">{t('footer.sections.contact')}</h4>
            <div className="text-muted-foreground text-[13px] leading-tight space-y-1">
              <p>{t('footer.contact.phone')} · {t('footer.contact.email')}</p>
              <p>{t('footer.company.name')} · {t('footer.company.address')}</p>
              <p>{t('footer.company.businessNumber')} · {t('footer.company.telecomSales')}</p>
              <p>{t('footer.company.telecomAuthority')}</p>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-xs mb-2 text-foreground">{t('footer.contact.sns')}</h4>
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-2"
          >
            <div className="flex justify-center gap-4 text-xs">
              <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                개인정보 처리방침
              </a>
              <span className="text-muted-foreground">|</span>
              <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                위치기반서비스 이용약관
              </a>
            </div>
            <p className="text-muted-foreground text-xs">
              Copyright Moviation Inc. All Rights Reserved. {currentYear}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
