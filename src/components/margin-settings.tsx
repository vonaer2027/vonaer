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

interface MarginSettingsProps {
  currentMargin: MarginSetting | null
  onMarginUpdate: (margin: MarginSetting) => void
}

export function MarginSettings({ currentMargin, onMarginUpdate }: MarginSettingsProps) {
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
      toast.error('0과 100 사이의 유효한 백분율을 입력하세요')
      return
    }

    if (currentMargin && percentage === currentMargin.margin_percentage) {
      toast.info('마진 백분율이 이미 이 값으로 설정되어 있습니다')
      return
    }

    try {
      setLoading(true)
      const newMargin = await marginService.update(percentage, 'admin')
      onMarginUpdate(newMargin)
    } catch (error) {
      console.error('Error updating margin:', error)
      toast.error('마진 설정 업데이트에 실패했습니다')
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
마진 설정
          </CardTitle>
          <CardDescription>
모든 항공편 가격에 적용될 마진 백분율을 설정하세요
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="margin">마진 백분율 (%)</Label>
              <div className="flex gap-2">
                <Input
                  id="margin"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={marginPercentage}
                  onChange={(e) => setMarginPercentage(e.target.value)}
                  placeholder="백분율을 입력하세요 (예: 15.5)"
                  className="flex-1"
                />
                <Button type="submit" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? '저장 중...' : '저장'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
현재 마진: {currentMargin?.margin_percentage || 0}%
              </p>
            </div>
          </form>

          {/* Example Pricing */}
          {marginPercentage && (
            <div className="border rounded-lg p-4 bg-muted/50">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
가격 예시
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">기본 가격</div>
                  <div className="font-medium">${example.basePrice.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">마진 ({example.percentage}%)</div>
                  <div className="font-medium text-green-600">+${example.margin.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">최종 가격</div>
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
중요 안내
              </p>
              <p className="text-yellow-700 dark:text-yellow-300 mt-1">
마진을 변경하면 고객에게 표시되는 모든 항공편 가격에 영향을 미칩니다. 
                새로운 마진은 기존 및 신규 모든 항공편에 즉시 적용됩니다.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

    </motion.div>
  )
}
