'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Instagram, 
  Youtube, 
  MessageCircle, 
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'

const footerServices = [
  'VONAER Jet',
  'VON Private', 
  'VON Routine',
  'VON Tour'
]

const ancillaryServices = [
  'Membership',
  'Company'
]

const companyLinks = [
  'ABOUT US',
  'Careers',
  'Personal Information Policy',
  'Terms of Use'
]

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: MessageCircle, label: 'KakaoTalk', href: '#' },
  { icon: Youtube, label: 'Youtube', href: '#' }
]

export function VonaerFooter() {
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
            <h3 className="text-3xl font-bold mb-4 text-foreground">Newsletter</h3>
            <p className="text-muted-foreground mb-8">
              Stay updated with the latest from VONAER and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 group">
                Subscribe
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
            <h4 className="font-bold text-lg mb-6 text-foreground">VONAER SERVICE</h4>
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
            <h4 className="font-bold text-lg mb-6 text-foreground">ANCILLARY SERVICE</h4>
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
            <h4 className="font-bold text-lg mb-6 text-foreground">Company</h4>
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
            <h4 className="font-bold text-lg mb-6 text-foreground">Contact</h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+82 1600 9064</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>business@VONAER.com</span>
              </div>
            </div>

            <div className="mb-6">
              <h5 className="font-medium text-foreground mb-3">Business hours</h5>
              <p className="text-muted-foreground text-sm">Business days | 09:00 ~ 18:00</p>
              <p className="text-muted-foreground text-sm">Holidays</p>
            </div>

            <div>
              <h5 className="font-medium text-foreground mb-3">SNS</h5>
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
              <p>Company : Moviation Inc | Business registration number: 216-81-49698</p>
              <p>Address : 06164, 2nd floor of Korea City Airport, 22, Teheran-ro 87-gil, Gangnam-gu, Seoul</p>
              <p>e-commerce registration number : 2022-SeoulGangnam-00453 | e-commerce registration authority : Gangnam-gu office</p>
            </div>
            <p className="text-muted-foreground text-sm">
              Copyright Moviation Inc. All Rights Reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
