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
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: MessageCircle, label: 'KakaoTalk', href: '#' },
    { icon: Youtube, label: 'Youtube', href: '#' }
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
              <p>{t('footer.contact.phone')} · service@vonaer.com</p>
              <p>주식회사 모비에이션 · 서울특별시 강남구 학동로 523</p>
              <p>사업등록번호: 216-81-49698 · 통신판매신고번호: 제2022-서울강남-00453호</p>
              <p>통신판매업신고기관: 서울특별시 강남구청</p>
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
            className="text-center"
          >
            <p className="text-muted-foreground text-xs">
              Copyright Moviation Inc. All Rights Reserved. {currentYear}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
