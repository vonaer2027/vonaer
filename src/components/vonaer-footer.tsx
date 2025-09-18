'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Instagram, 
  Youtube, 
  MessageCircle, 
  ArrowRight,
  Phone,
  Mail
} from 'lucide-react'

export function VonaerFooter() {
  const t = useTranslations()
  
  const footerServices = [
    t('footer.services.0'),
    t('footer.services.1'),
    t('footer.services.2'),
    t('footer.services.3')
  ]
  const ancillaryServices = [
    t('footer.ancillaryServices.0'),
    t('footer.ancillaryServices.1'),
    t('footer.ancillaryServices.2'),
    t('footer.ancillaryServices.3'),
    t('footer.ancillaryServices.4'),
    t('footer.ancillaryServices.5')
  ]
  const companyLinks = [
    t('footer.companyLinks.0'),
    t('footer.companyLinks.1'),
    t('footer.companyLinks.2'),
    t('footer.companyLinks.3')
  ]
  
  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: MessageCircle, label: 'KakaoTalk', href: '#' },
    { icon: Youtube, label: 'Youtube', href: '#' }
  ]
  return (
    <footer id="contact" className="bg-card text-card-foreground border-t">
      {/* Newsletter Section */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h3 className="text-3xl font-bold mb-4 text-foreground">{t('footer.newsletter.title')}</h3>
            <p className="text-muted-foreground mb-8">
              {t('footer.newsletter.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className="flex-1"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 group">
                {t('footer.newsletter.subscribe')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* VONAER SERVICE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-lg mb-6 text-foreground">{t('footer.sections.vonaerService')}</h4>
            <div className="space-y-3">
              {footerServices.map((service, index) => (
                <a
                  key={index}
                  href="#"
                  className="block text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {service}
                </a>
              ))}
            </div>
          </motion.div>

          {/* ANCILLARY SERVICE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-lg mb-6 text-foreground">{t('footer.sections.ancillaryService')}</h4>
            <div className="space-y-3">
              {ancillaryServices.map((service, index) => (
                <a
                  key={index}
                  href="#"
                  className="block text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {service}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-lg mb-6 text-foreground">{t('footer.sections.company')}</h4>
            <div className="space-y-3">
              {companyLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="block text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-lg mb-6 text-foreground">{t('footer.sections.contact')}</h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{t('footer.contact.phone')}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>{t('footer.contact.email')}</span>
              </div>
            </div>

            <div className="mb-6">
              <h5 className="font-medium text-foreground mb-3">{t('footer.contact.businessHours')}</h5>
              <p className="text-muted-foreground text-sm">{t('footer.contact.businessDays')}</p>
              <p className="text-muted-foreground text-sm">{t('footer.contact.holidays')}</p>
            </div>

            <div>
              <h5 className="font-medium text-foreground mb-3">{t('footer.contact.sns')}</h5>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <div className="text-sm text-muted-foreground space-y-1">
              <p>{t('footer.company.name')}</p>
              <p>{t('footer.company.address')}</p>
              <p>{t('footer.company.businessNumber')}</p>
              <p>{t('footer.company.representative')}</p>
              <p>{t('footer.company.telecomSales')}</p>
              <p>{t('footer.company.telecomAuthority')}</p>
            </div>
            <p className="text-muted-foreground text-sm">
              {t('footer.company.copyright')}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
