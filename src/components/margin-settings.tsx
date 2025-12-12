'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TieredMarginSetting, tieredMarginService } from '@/lib/supabase'
import { TrendingUp, Save, AlertCircle, Plus, Trash2, Layers } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface TierInput {
  id: string
  min_price: string
  max_price: string
  margin_percentage: string
}

export function MarginSettings() {
  const [tieredLoading, setTieredLoading] = useState(false)
  const [tiers, setTiers] = useState<TierInput[]>([])
  const [tieredMargins, setTieredMargins] = useState<TieredMarginSetting[]>([])
  const [loadingTiers, setLoadingTiers] = useState(true)

  // Load tiered margins on mount
  useEffect(() => {
    loadTieredMargins()
  }, [])

  const loadTieredMargins = async () => {
    try {
      setLoadingTiers(true)
      const data = await tieredMarginService.getAll()
      setTieredMargins(data)

      // Convert to input format
      if (data.length > 0) {
        setTiers(data.map(tier => ({
          id: tier.id.toString(),
          min_price: tier.min_price.toString(),
          max_price: tier.max_price.toString(),
          margin_percentage: tier.margin_percentage.toString()
        })))
      } else {
        // Default tiers if none exist
        setTiers([
          { id: '1', min_price: '0', max_price: '10000', margin_percentage: '30' },
          { id: '2', min_price: '10000', max_price: '20000', margin_percentage: '25' },
          { id: '3', min_price: '20000', max_price: '40000', margin_percentage: '15' },
          { id: '4', min_price: '40000', max_price: '80000', margin_percentage: '10' },
          { id: '5', min_price: '80000', max_price: '999999999', margin_percentage: '5' },
        ])
      }
    } catch (error) {
      console.error('Error loading tiered margins:', error)
      // Set default tiers on error
      setTiers([
        { id: '1', min_price: '0', max_price: '10000', margin_percentage: '30' },
        { id: '2', min_price: '10000', max_price: '20000', margin_percentage: '25' },
        { id: '3', min_price: '20000', max_price: '40000', margin_percentage: '15' },
        { id: '4', min_price: '40000', max_price: '80000', margin_percentage: '10' },
        { id: '5', min_price: '80000', max_price: '999999999', margin_percentage: '5' },
      ])
    } finally {
      setLoadingTiers(false)
    }
  }

  const handleTierChange = (index: number, field: keyof TierInput, value: string) => {
    const newTiers = [...tiers]
    newTiers[index] = { ...newTiers[index], [field]: value }

    // Auto-update next tier's min_price when max_price changes
    if (field === 'max_price' && index < newTiers.length - 1) {
      newTiers[index + 1] = { ...newTiers[index + 1], min_price: value }
    }

    setTiers(newTiers)
  }

  const addTier = () => {
    const lastTier = tiers[tiers.length - 1]
    const newMinPrice = lastTier ? lastTier.max_price : '0'
    setTiers([
      ...tiers,
      {
        id: `new-${Date.now()}`,
        min_price: newMinPrice,
        max_price: (parseInt(newMinPrice) + 10000).toString(),
        margin_percentage: '5'
      }
    ])
  }

  const removeTier = (index: number) => {
    if (tiers.length <= 1) {
      toast.error('At least one tier is required')
      return
    }
    const newTiers = tiers.filter((_, i) => i !== index)
    setTiers(newTiers)
  }

  const saveTieredMargins = async () => {
    // Validate tiers
    for (let i = 0; i < tiers.length; i++) {
      const tier = tiers[i]
      const minPrice = parseFloat(tier.min_price)
      const maxPrice = parseFloat(tier.max_price)
      const marginPct = parseFloat(tier.margin_percentage)

      if (isNaN(minPrice) || isNaN(maxPrice) || isNaN(marginPct)) {
        toast.error(`Tier ${i + 1}: All fields must be valid numbers`)
        return
      }

      if (minPrice >= maxPrice) {
        toast.error(`Tier ${i + 1}: Min price must be less than max price`)
        return
      }

      if (marginPct < 0 || marginPct > 100) {
        toast.error(`Tier ${i + 1}: Margin must be between 0 and 100`)
        return
      }
    }

    try {
      setTieredLoading(true)

      const tiersToSave = tiers.map(tier => ({
        min_price: parseFloat(tier.min_price),
        max_price: parseFloat(tier.max_price),
        margin_percentage: parseFloat(tier.margin_percentage),
        is_active: true,
        created_by: 'admin'
      }))

      await tieredMarginService.update(tiersToSave)
      toast.success('Tiered margins saved successfully')
      await loadTieredMargins()
    } catch (error) {
      console.error('Error saving tiered margins:', error)
      toast.error('Failed to save tiered margins')
    } finally {
      setTieredLoading(false)
    }
  }

  const calculateTieredExample = (basePrice: number) => {
    const result = tieredMarginService.calculateAdjustedPrice(basePrice, tieredMargins)
    return result
  }

  // Example prices to demonstrate tiered pricing
  const examplePrices = [5000, 15000, 30000, 60000, 100000]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Tiered Margin Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Tiered Margin Settings
          </CardTitle>
          <CardDescription>
            Automatically apply different margins based on flight price. Lower prices get higher margins.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {loadingTiers ? (
            <div className="text-center py-4 text-muted-foreground">Loading tiers...</div>
          ) : (
            <>
              {/* Tier List */}
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground px-2">
                  <div className="col-span-3">Min Price ($)</div>
                  <div className="col-span-3">Max Price ($)</div>
                  <div className="col-span-3">Margin (%)</div>
                  <div className="col-span-3">Actions</div>
                </div>

                {tiers.map((tier, index) => (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="grid grid-cols-12 gap-2 items-center"
                  >
                    <div className="col-span-3">
                      <Input
                        type="number"
                        value={tier.min_price}
                        onChange={(e) => handleTierChange(index, 'min_price', e.target.value)}
                        placeholder="0"
                        min="0"
                        disabled={index > 0} // Auto-calculated from previous tier
                        className={index > 0 ? 'bg-muted' : ''}
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        type="number"
                        value={tier.max_price}
                        onChange={(e) => handleTierChange(index, 'max_price', e.target.value)}
                        placeholder="10000"
                        min="0"
                      />
                    </div>
                    <div className="col-span-3">
                      <div className="flex items-center gap-1">
                        <Input
                          type="number"
                          value={tier.margin_percentage}
                          onChange={(e) => handleTierChange(index, 'margin_percentage', e.target.value)}
                          placeholder="25"
                          min="0"
                          max="100"
                          step="0.5"
                        />
                        <span className="text-muted-foreground">%</span>
                      </div>
                    </div>
                    <div className="col-span-3 flex gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTier(index)}
                        disabled={tiers.length <= 1}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Add Tier Button */}
              <Button
                type="button"
                variant="outline"
                onClick={addTier}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Tier
              </Button>

              {/* Save Button */}
              <Button
                onClick={saveTieredMargins}
                disabled={tieredLoading}
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                {tieredLoading ? 'Saving...' : 'Save Tiered Margins'}
              </Button>

              {/* Tiered Pricing Examples */}
              {tieredMargins.length > 0 && (
                <div className="border rounded-lg p-4 bg-muted/50">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Tiered Pricing Examples
                  </h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-4 text-xs font-medium text-muted-foreground border-b pb-2">
                      <div>Base Price</div>
                      <div>Margin %</div>
                      <div>Margin Amount</div>
                      <div>Final Price</div>
                    </div>
                    {examplePrices.map((price) => {
                      const result = calculateTieredExample(price)
                      return (
                        <div key={price} className="grid grid-cols-4 text-sm py-1">
                          <div>${price.toLocaleString()}</div>
                          <div className="text-primary font-medium">{result.marginPercentage}%</div>
                          <div className="text-green-600">+${result.marginAmount.toLocaleString()}</div>
                          <div className="font-bold">${result.adjustedPrice.toLocaleString()}</div>
                        </div>
                      )
                    })}
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
                    Changing margins will affect all flight prices displayed to customers. New margins apply immediately to all existing and new flights.
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

    </motion.div>
  )
}
