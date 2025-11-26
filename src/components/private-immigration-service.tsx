'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export function PrivateImmigrationService() {
  const t = useTranslations('immigration')

  const vonaerSteps = [
    { key: 'arrival', number: 1 },
    { key: 'checkin', number: 2 },
    { key: 'boarding', number: 3 },
  ]

  const regularSteps = [
    { key: 'arrival', number: 1 },
    { key: 'checkin', number: 2 },
    { key: 'customs', number: 3 },
    { key: 'departurehall', number: 4 },
    { key: 'security', number: 5 },
    { key: 'immigration', number: 6 },
    { key: 'gate', number: 7 },
    { key: 'boarding', number: 8 },
  ]

  return (
    <section className="py-12 md:py-24 bg-[#FAF9F7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
          style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            {t('title')}
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Process Comparison Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-6xl mx-auto space-y-8 md:space-y-12"
        >
          {/* VONAER Jet Section - Simple 3 Step Circle Process */}
          <div className="relative bg-white rounded-2xl p-5 sm:p-8 md:p-12 shadow-sm border border-gray-100">
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 sm:w-2 bg-primary rounded-l-2xl" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6 sm:mb-10 ml-3 sm:ml-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                {t('vonaer.title')}
              </h3>
              <span className="self-start px-3 py-1 sm:px-4 sm:py-1.5 bg-primary/10 text-primary text-xs sm:text-sm font-semibold rounded-full">
                {t('vonaer.duration')}
              </span>
            </div>

            {/* VONAER Steps - Vertical on mobile, Horizontal on desktop */}
            <div className="ml-3 sm:ml-4">
              {/* Mobile: Vertical Layout */}
              <div className="flex flex-col items-center gap-3 sm:hidden">
                {vonaerSteps.map((step, index) => (
                  <div key={step.key} className="flex flex-col items-center">
                    {/* Circle Step */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 }}
                      className="relative"
                    >
                      <div className="relative w-20 h-20">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                          {[0, 1, 2, 3].map((segment) => (
                            <circle
                              key={segment}
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="rgb(34, 64, 66)"
                              strokeWidth="4"
                              strokeDasharray={`${282.7 * 0.2} ${282.7 * 0.8}`}
                              strokeDashoffset={-segment * 282.7 * 0.25}
                              strokeLinecap="round"
                            />
                          ))}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                          <span className="text-[10px] text-primary/60 font-medium">
                            Step {step.number}
                          </span>
                          <span className="text-xs font-semibold text-primary text-center leading-tight">
                            {t(`vonaer.steps.${step.key}`)}
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Vertical arrow between steps */}
                    {index < vonaerSteps.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
                        className="flex flex-col items-center py-1"
                      >
                        <div className="h-4 border-l-2 border-dashed border-primary/40" />
                        <svg className="w-3 h-3 text-primary/60 -mt-0.5 rotate-90" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop: Horizontal Layout */}
              <div className="hidden sm:flex items-center justify-center gap-4 md:gap-8 lg:gap-16">
                {vonaerSteps.map((step, index) => (
                  <div key={step.key} className="flex items-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 }}
                      className="relative"
                    >
                      <div className="relative w-28 md:w-32 lg:w-36 h-28 md:h-32 lg:h-36">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                          {[0, 1, 2, 3].map((segment) => (
                            <circle
                              key={segment}
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="rgb(34, 64, 66)"
                              strokeWidth="4"
                              strokeDasharray={`${282.7 * 0.2} ${282.7 * 0.8}`}
                              strokeDashoffset={-segment * 282.7 * 0.25}
                              strokeLinecap="round"
                            />
                          ))}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                          <span className="text-sm text-primary/60 font-medium mb-1">
                            Step {step.number}
                          </span>
                          <span className="text-sm lg:text-base font-semibold text-primary text-center leading-tight px-1">
                            {t(`vonaer.steps.${step.key}`)}
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {index < vonaerSteps.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
                        className="flex items-center mx-2 md:mx-4"
                      >
                        <div className="w-8 md:w-12 lg:w-16 border-t-2 border-dashed border-primary/40" />
                        <svg className="w-4 h-4 text-primary/60 -ml-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-center text-muted-foreground mt-6 sm:mt-8 ml-3 sm:ml-4 text-xs sm:text-sm md:text-base">
              {t('vonaer.simplicity')} • {t('vonaer.simplified')}
            </p>
          </div>

          {/* Regular Airlines Section - Complex 8 Step Rectangle Process */}
          <div className="relative bg-white rounded-2xl p-5 sm:p-8 md:p-12 shadow-sm border border-gray-100">
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 sm:w-2 bg-gray-400 rounded-l-2xl" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6 sm:mb-10 ml-3 sm:ml-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
                {t('regular.title')}
              </h3>
              <span className="self-start px-3 py-1 sm:px-4 sm:py-1.5 bg-gray-100 text-gray-600 text-xs sm:text-sm font-semibold rounded-full">
                {t('regular.duration')}
              </span>
            </div>

            {/* Regular Steps */}
            <div className="ml-3 sm:ml-4">
              {/* Mobile: Vertical Single Column */}
              <div className="flex flex-col gap-2 sm:hidden">
                {regularSteps.map((step, index) => (
                  <div key={step.key} className="flex items-center">
                    {/* Step number circle */}
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center mr-3"
                    >
                      <span className="text-xs font-semibold text-gray-600">{step.number}</span>
                    </motion.div>

                    {/* Step content */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 + 0.1 }}
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3"
                    >
                      <span className="text-xs font-medium text-gray-700">
                        {t(`regular.steps.${step.key}`)}
                      </span>
                    </motion.div>

                    {/* Connecting line */}
                    {index < regularSteps.length - 1 && (
                      <div className="absolute left-[17px] ml-3 mt-7 h-[calc(100%-1.75rem)]">
                        {/* This creates a visual connecting effect */}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Tablet: 2 columns grid */}
              <div className="hidden sm:grid md:hidden grid-cols-2 gap-3">
                {regularSteps.map((step, index) => (
                  <motion.div
                    key={step.key}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-3 h-[70px] flex items-center"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                        {step.number}
                      </span>
                      <span className="text-xs font-medium text-gray-700 leading-tight">
                        {t(`regular.steps.${step.key}`)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Desktop: 2-row grid layout */}
              <div className="hidden md:grid grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-4 max-w-[680px] lg:max-w-[780px] mx-auto">
                {regularSteps.map((step, index) => (
                  <motion.div
                    key={step.key}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-3 lg:p-4 h-[85px] lg:h-[95px] flex items-center justify-center"
                  >
                    <div className="flex flex-col items-center text-center">
                      <span className="text-xs text-gray-400 font-medium mb-1">{step.number}</span>
                      <span className="text-[11px] lg:text-xs font-medium text-gray-700 leading-tight">
                        {t(`regular.steps.${step.key}`)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-center text-gray-500 mt-6 sm:mt-8 ml-3 sm:ml-4 text-xs sm:text-sm md:text-base">
              {t('regular.complexity')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
