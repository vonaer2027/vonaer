'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
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
            style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
          >
            <h4 className="font-semibold text-xs mb-3 text-foreground">{t('footer.sections.contact')}</h4>
            <div className="text-muted-foreground text-[12px] leading-relaxed space-y-1.5">
              {/* Contact */}
              <div className="flex flex-col sm:flex-row sm:gap-6">
                <span><span className="text-foreground/70">{t('footer.contact.phoneLabel')}</span> {t('footer.contact.phone')}</span>
                <span><span className="text-foreground/70">{t('footer.contact.emailLabel')}</span> {t('footer.contact.email')}</span>
              </div>
              {/* Company */}
              <div className="flex flex-col sm:flex-row sm:gap-6">
                <span><span className="text-foreground/70">{t('footer.company.companyLabel')}</span> {t('footer.company.name')}</span>
                <span><span className="text-foreground/70">{t('footer.company.addressLabel')}</span> {t('footer.company.address')}</span>
              </div>
              {/* Registration */}
              <div className="text-[11px] text-muted-foreground/70 space-y-0.5 pt-1">
                <div className="flex flex-col sm:flex-row sm:gap-6">
                  <span>{t('footer.company.businessNumber')}</span>
                  <span>{t('footer.company.telecomSales')}</span>
                </div>
                <div>
                  <span>{t('footer.company.telecomAuthority')}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
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
            style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
          >
            <div className="flex justify-center gap-4 text-xs">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('footer.legal.privacyPolicy')}
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('footer.legal.termsOfService')}
              </Link>
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
