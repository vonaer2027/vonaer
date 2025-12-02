'use client'

import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { VonaerFooter } from '@/components/vonaer-footer'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function TermsPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const t = useTranslations('legal.terms')

  return (
    <div className="bg-background text-foreground min-h-screen">
      <VonaerHeader
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
      />

      <VonaerMenuOverlay
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <main className="pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              {t('title')}
            </h1>

            <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section1.title')}</h2>
                <p className="leading-relaxed">
                  {t('section1.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section2.title')}</h2>
                {Array.from({ length: 4 }).map((_, i) => (
                  <p key={i} className="leading-relaxed mt-4">
                    {t(`section2.paragraphs.${i}`)}
                  </p>
                ))}
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section3.title')}</h2>
                <p className="leading-relaxed">
                  {t('section3.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section4.title')}</h2>
                <p className="leading-relaxed">
                  {t('section4.intro')}
                </p>

                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full border border-border">
                    <thead>
                      <tr className="bg-muted/30">
                        <th className="border border-border px-4 py-2 text-left">{t('section4.serviceName')}</th>
                        <th className="border border-border px-4 py-2 text-left">{t('section4.serviceContent')}</th>
                        <th className="border border-border px-4 py-2 text-left">{t('section4.retentionPeriod')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border px-4 py-2">{t('section4.serviceName')}</td>
                        <td className="border border-border px-4 py-2">{t('section4.serviceContent')}</td>
                        <td className="border border-border px-4 py-2">{t('section4.retentionPeriod')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section5.title')}</h2>
                <p className="leading-relaxed">
                  {t('section5.rejectionCases')}
                </p>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <li key={i}>{t(`section5.cases.${i}`)}</li>
                  ))}
                </ul>
                {Array.from({ length: 2 }).map((_, i) => (
                  <p key={i} className="leading-relaxed mt-4">
                    {t(`section5.memberResponsibility.${i}`)}
                  </p>
                ))}
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section6.title')}</h2>
                <p className="leading-relaxed">
                  {t('section6.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section7.title')}</h2>
                <p className="leading-relaxed">
                  {t('section7.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section8.title')}</h2>
                {Array.from({ length: 5 }).map((_, i) => (
                  <p key={i} className="leading-relaxed mt-4">
                    {t(`section8.paragraphs.${i}`)}
                  </p>
                ))}
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section9.title')}</h2>
                <p className="leading-relaxed">
                  {t('section9.intro')}
                </p>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <li key={i}>{t(`section9.cases.${i}`)}</li>
                  ))}
                </ul>
                <p className="leading-relaxed mt-4">
                  {t('section9.notification')}
                </p>
                <p className="leading-relaxed mt-4">
                  {t('section9.accuracy')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section10.title')}</h2>
                {Array.from({ length: 2 }).map((_, i) => (
                  <p key={i} className="leading-relaxed mt-4">
                    {t(`section10.paragraphs.${i}`)}
                  </p>
                ))}
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  <li>{t('section10.exception')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section11.title')}</h2>
                {Array.from({ length: 2 }).map((_, i) => (
                  <p key={i} className="leading-relaxed mt-4">
                    {t(`section11.paragraphs.${i}`)}
                  </p>
                ))}
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section12.title')}</h2>
                {Array.from({ length: 2 }).map((_, i) => (
                  <p key={i} className="leading-relaxed mt-4">
                    {t(`section12.paragraphs.${i}`)}
                  </p>
                ))}
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section13.title')}</h2>
                {Array.from({ length: 3 }).map((_, i) => (
                  <p key={i} className="leading-relaxed mt-4">
                    {t(`section13.rights.${i}`)}
                  </p>
                ))}
                <ol className="list-decimal ml-6 mt-4 space-y-2">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <li key={i}>{t(`section13.reviewableData.${i}`)}</li>
                  ))}
                </ol>
                <p className="leading-relaxed mt-4">
                  {t('section13.exerciseRights')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section14.title')}</h2>
                {Array.from({ length: 2 }).map((_, i) => (
                  <p key={i} className="leading-relaxed mt-4">
                    {t(`section14.paragraphs.${i}`)}
                  </p>
                ))}
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section15.title')}</h2>
                {Array.from({ length: 2 }).map((_, i) => (
                  <p key={i} className="leading-relaxed mt-4">
                    {t(`section15.paragraphs.${i}`)}
                  </p>
                ))}
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section16.title')}</h2>
                <p className="leading-relaxed">
                  {t('section16.intro')}
                </p>
                <ol className="list-decimal ml-6 mt-4 space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <li key={i}>{t(`section16.cases.${i}`)}</li>
                  ))}
                </ol>
                <p className="leading-relaxed mt-4">
                  {t('section16.disclaimer')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section17.title')}</h2>
                {Array.from({ length: 2 }).map((_, i) => (
                  <p key={i} className="leading-relaxed mt-4">
                    {t(`section17.paragraphs.${i}`)}
                  </p>
                ))}
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section18.title')}</h2>
                {Array.from({ length: 2 }).map((_, i) => (
                  <p key={i} className="leading-relaxed mt-4">
                    {t(`section18.paragraphs.${i}`)}
                  </p>
                ))}
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section19.title')}</h2>
                <div className="leading-relaxed space-y-2">
                  <p>{t('section19.companyInfo.name')}</p>
                  <p>{t('section19.companyInfo.address')}</p>
                  <p>{t('section19.companyInfo.phone')}</p>
                  <p>{t('section19.companyInfo.manager')}</p>
                  <p>{t('section19.companyInfo.email')}</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('appendix.title')}</h2>

                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">{t('appendix.article1.title')}</h3>
                <p className="leading-relaxed">
                  {t('appendix.article1.content')}
                </p>

                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">{t('appendix.article2.title')}</h3>
                <p className="leading-relaxed">
                  {t('appendix.article2.content')}
                </p>
              </section>

              <section className="mt-12 pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  {t('metadata.announcement')}<br />
                  {t('metadata.effective')}
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <VonaerFooter />
    </div>
  )
}
