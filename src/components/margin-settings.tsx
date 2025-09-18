'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MarginSetting, marginService } from '@/lib/supabase'
import { Settings, TrendingUp, Save, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'

interface MarginSettingsProps {
  currentMargin: MarginSetting | null
  onMarginUpdate: (margin: MarginSetting) => void
}

export function MarginSettings({ currentMargin, onMarginUpdate }: MarginSettingsProps) {
  const t = useTranslations()
  const [marginPercentage, setMarginPercentage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentMargin) {
      setMarginPercentage(currentMargin.margin_percentage.toString())
    }
  }, [currentMargin])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const percentage = parseFloat(marginPercentage)
    
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      toast.error(t('marginSettings.validation.invalidPercentage'))
      return
    }

    if (currentMargin && percentage === currentMargin.margin_percentage) {
      toast.info(t('marginSettings.validation.alreadySet'))
      return
    }

    try {
      setLoading(true)
      const newMargin = await marginService.update(percentage, 'admin')
      onMarginUpdate(newMargin)
    } catch (error) {
      console.error('Error updating margin:', error)
      toast.error(t('marginSettings.error.updateFailed'))
    } finally {
      setLoading(false)
    }
  }


  const calculateExamplePricing = () => {
    const basePrice = 10000
    const percentage = parseFloat(marginPercentage) || 0
    const adjustedPrice = basePrice * (1 + (percentage / 100))
    const margin = adjustedPrice - basePrice
    
    return { basePrice, adjustedPrice, margin, percentage }
  }

  const example = calculateExamplePricing()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Current Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
{t('marginSettings.title')}
          </CardTitle>
          <CardDescription>
{t('marginSettings.subtitle')}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="margin">{t('marginSettings.marginPercentage')}</Label>
              <div className="flex gap-2">
                <Input
                  id="margin"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={marginPercentage}
                  onChange={(e) => setMarginPercentage(e.target.value)}
                  placeholder={t('marginSettings.placeholder')}
                  className="flex-1"
                />
                <Button type="submit" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? t('marginSettings.saving') : t('marginSettings.save')}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
{t('marginSettings.currentMargin')}: {currentMargin?.margin_percentage || 0}%
              </p>
            </div>
          </form>

          {/* Example Pricing */}
          {marginPercentage && (
            <div className="border rounded-lg p-4 bg-muted/50">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
{t('marginSettings.example.title')}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">{t('marginSettings.example.basePrice')}</div>
                  <div className="font-medium">${example.basePrice.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">{t('marginSettings.example.margin')} ({example.percentage}%)</div>
                  <div className="font-medium text-primary">+${example.margin.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">{t('marginSettings.example.finalPrice')}</div>
                  <div className="font-bold text-primary">${example.adjustedPrice.toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800 dark:text-yellow-200">
{t('marginSettings.warning.title')}
              </p>
              <p className="text-yellow-700 dark:text-yellow-300 mt-1">
{t('marginSettings.warning.description')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

    </motion.div>
  )
}
