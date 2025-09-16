'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { MarginSetting, marginService } from '@/lib/supabase'
import { Settings, TrendingUp, History, Save, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface MarginSettingsProps {
  currentMargin: MarginSetting | null
  onMarginUpdate: (margin: MarginSetting) => void
}

export function MarginSettings({ currentMargin, onMarginUpdate }: MarginSettingsProps) {
  const [marginPercentage, setMarginPercentage] = useState('')
  const [history, setHistory] = useState<MarginSetting[]>([])
  const [loading, setLoading] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(true)

  useEffect(() => {
    if (currentMargin) {
      setMarginPercentage(currentMargin.margin_percentage.toString())
    }
    loadHistory()
  }, [currentMargin])

  const loadHistory = async () => {
    try {
      const data = await marginService.getHistory()
      setHistory(data)
    } catch (error) {
      console.error('Error loading margin history:', error)
      toast.error('Failed to load margin history')
    } finally {
      setHistoryLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const percentage = parseFloat(marginPercentage)
    
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      toast.error('Please enter a valid percentage between 0 and 100')
      return
    }

    if (currentMargin && percentage === currentMargin.margin_percentage) {
      toast.info('Margin percentage is already set to this value')
      return
    }

    try {
      setLoading(true)
      const newMargin = await marginService.update(percentage, 'admin')
      onMarginUpdate(newMargin)
      loadHistory()
    } catch (error) {
      console.error('Error updating margin:', error)
      toast.error('Failed to update margin settings')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
            Margin Settings
          </CardTitle>
          <CardDescription>
            Set the margin percentage applied to all flight prices
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="margin">Margin Percentage (%)</Label>
              <div className="flex gap-2">
                <Input
                  id="margin"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={marginPercentage}
                  onChange={(e) => setMarginPercentage(e.target.value)}
                  placeholder="Enter percentage (e.g., 15.5)"
                  className="flex-1"
                />
                <Button type="submit" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : 'Save'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Current margin: {currentMargin?.margin_percentage || 0}%
              </p>
            </div>
          </form>

          {/* Example Pricing */}
          {marginPercentage && (
            <div className="border rounded-lg p-4 bg-muted/50">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Pricing Example
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Base Price</div>
                  <div className="font-medium">${example.basePrice.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Margin ({example.percentage}%)</div>
                  <div className="font-medium text-green-600">+${example.margin.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Final Price</div>
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
                Important Notice
              </p>
              <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                Changing the margin will affect all flight prices displayed to customers. 
                The new margin will be applied immediately to all existing and new flights.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Margin History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Margin History
          </CardTitle>
          <CardDescription>
            Track all margin changes and their timestamps
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {historyLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Loading history...</p>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-8">
              <History className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No margin history available</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Margin %</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((setting) => (
                    <TableRow key={setting.id}>
                      <TableCell className="font-medium">
                        {setting.margin_percentage}%
                      </TableCell>
                      <TableCell>
                        <Badge variant={setting.is_active ? "default" : "secondary"}>
                          {setting.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {setting.created_by || 'Unknown'}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {setting.created_at ? formatDate(setting.created_at) : 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
