'use client'

import { VonaerHeader } from '@/components/vonaer-header'
import { VonaerMenuOverlay } from '@/components/vonaer-menu-overlay'
import { VonaerFooter } from '@/components/vonaer-footer'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function PrivacyPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const t = useTranslations('legal.privacy')

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
                {Array.from({ length: 5 }).map((_, i) => (
                  <p key={i} className="leading-relaxed mt-4">
                    {t(`section1.paragraphs.${i}`)}
                  </p>
                ))}
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section2.title')}</h2>
                <p className="leading-relaxed">
                  {t('section2.intro')}
                </p>
                <ol className="list-decimal ml-6 mt-4 space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <li key={i}>{t(`section2.conditions.${i}`)}</li>
                  ))}
                </ol>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <li key={i}>{t(`section2.considerations.${i}`)}</li>
                  ))}
                </ul>
                <p className="leading-relaxed mt-4">
                  {t('section2.collectionInfo')}
                </p>
                <ol className="list-decimal ml-6 mt-4 space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <li key={i}>{t(`section2.methods.${i}`)}</li>
                  ))}
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section3.title')}</h2>
                <p className="leading-relaxed">
                  {t('section3.intro')}
                </p>

                <p className="leading-relaxed mt-4">
                  {t('section3.autoCollectedInfo')}
                </p>
                <p className="leading-relaxed mt-2">
                  {t('section3.autoCollectedItems')}
                </p>

                <p className="leading-relaxed mt-4">
                  {t('section3.sensitiveInfo')}
                </p>
                <p className="leading-relaxed mt-2">
                  {t('section3.sensitiveItems')}
                </p>

                <p className="leading-relaxed mt-4">
                  {t('section3.retention')}
                </p>
                <ol className="list-decimal ml-6 mt-4 space-y-2">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <li key={i}>{t(`section3.destructionMethods.${i}`)}</li>
                  ))}
                </ol>

                <p className="leading-relaxed mt-4">
                  {t('section3.accessRights')}
                </p>
                <p className="leading-relaxed mt-4">
                  {t('section3.security')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section4.title')}</h2>
                <p className="leading-relaxed">
                  {t('section4.intro')}
                </p>

                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">{t('section4.title')}</h3>
                <ol className="list-decimal ml-6 mt-4 space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <li key={i}>{t(`section4.cookieUsage.${i}`)}</li>
                  ))}
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section5.title')}</h2>
                <p className="leading-relaxed">
                  {t('section5.intro')}
                </p>

                <p className="leading-relaxed mt-6">
                  {t('section5.exceptions')}
                </p>
                <ol className="list-decimal ml-6 mt-4 space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <li key={i}>{t(`section5.exceptionCases.${i}`)}</li>
                  ))}
                </ol>
                <ul className="list-disc ml-6 mt-4 space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <li key={i}>{t(`section5.considerations.${i}`)}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section6.title')}</h2>
                {Array.from({ length: 3 }).map((_, i) => (
                  <p key={i} className="leading-relaxed mt-4">
                    {t(`section6.paragraphs.${i}`)}
                  </p>
                ))}
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section7.title')}</h2>
                {Array.from({ length: 2 }).map((_, i) => (
                  <p key={i} className="leading-relaxed mt-4">
                    {t(`section7.paragraphs.${i}`)}
                  </p>
                ))}
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section8.title')}</h2>

                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">{t('section8.technical.title')}</h3>
                <p className="leading-relaxed">
                  {t('section8.technical.intro')}
                </p>
                <ol className="list-decimal ml-6 mt-4 space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <li key={i}>{t(`section8.technical.measures.${i}`)}</li>
                  ))}
                </ol>

                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">{t('section8.administrative.title')}</h3>
                <p className="leading-relaxed">
                  {t('section8.administrative.intro')}
                </p>
                <ol className="list-decimal ml-6 mt-4 space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <li key={i}>{t(`section8.administrative.personnel.${i}`)}</li>
                  ))}
                </ol>

                {Array.from({ length: 5 }).map((_, i) => (
                  <p key={i} className="leading-relaxed mt-4">
                    {t(`section8.administrative.policies.${i}`)}
                  </p>
                ))}

                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">{t('section8.physical.title')}</h3>
                <p className="leading-relaxed">
                  {t('section8.physical.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section9.title')}</h2>
                <p className="leading-relaxed">
                  {t('section9.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section10.title')}</h2>
                {Array.from({ length: 2 }).map((_, i) => (
                  <p key={i} className="leading-relaxed mt-4">
                    {t(`section10.intro.${i}`)}
                  </p>
                ))}
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
                    {t(`section12.intro.${i}`)}
                  </p>
                ))}

                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">{t('section12.contact.title')}</h3>
                <p className="leading-relaxed">
                  {t('section12.contact.email')}: service@vonaer.com<br />
                  {t('section12.contact.phone')}: 02-6012-9500
                </p>

                {Array.from({ length: 4 }).map((_, i) => (
                  <p key={i} className="leading-relaxed mt-4">
                    {t(`section12.additionalInfo.${i}`)}
                  </p>
                ))}
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section13.title')}</h2>
                <p className="leading-relaxed">
                  {t('section13.intro')}
                </p>

                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full border border-border">
                    <thead>
                      <tr className="bg-muted/30">
                        <th className="border border-border px-4 py-2 text-left" colSpan={2}>{t('section13.title')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border px-4 py-2">
                          {t('section13.officer.name')}<br />
                          {t('section13.officer.title')}<br />
                          {t('section13.officer.department')}<br />
                          {t('section13.officer.email')}<br />
                          {t('section13.officer.phone')}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t('section14.title')}</h2>
                <p className="leading-relaxed">
                  {t('section14.content')}
                </p>
              </section>

              <section className="mt-12 pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  {t('metadata.announcement')}<br />
                  {t('metadata.effective')}<br />
                  {t('metadata.revised')}
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
