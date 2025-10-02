'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { X, Upload, Plane, Trash2 } from 'lucide-react'
import { Flight, flightService } from '@/lib/supabase'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

interface FlightFormProps {
  flight?: Flight | null
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  mode: 'create' | 'edit'
}

interface FlightFormData {
  flight_id: string
  aircraft: string
  price: string
  price_numeric: number | null
  currency: string
  flight_date: string
  seats: number | null
  from_city: string
  from_country: string
  from_formatted: string
  to_city: string
  to_country: string
  to_formatted: string
  route_summary: string
  involves_korea: boolean
  image_urls: string[]
  raw_text?: string
}

export function FlightForm({ flight, isOpen, onClose, onSuccess, mode }: FlightFormProps) {
  const t = useTranslations()
  
  
  const [formData, setFormData] = useState<FlightFormData>({
    flight_id: flight?.flight_id || '',
    aircraft: flight?.aircraft || '',
    price: flight?.price || '',
    price_numeric: flight?.price_numeric || null,
    currency: flight?.currency || 'USD',
    flight_date: flight?.flight_date || '',
    seats: flight?.seats || null,
    from_city: flight?.from_city || '',
    from_country: flight?.from_country || '',
    from_formatted: flight?.from_formatted || '',
    to_city: flight?.to_city || '',
    to_country: flight?.to_country || '',
    to_formatted: flight?.to_formatted || '',
    route_summary: flight?.route_summary || '',
    involves_korea: flight?.involves_korea || false,
    image_urls: flight?.image_urls || [],
    raw_text: flight?.raw_text || ''
  })

  const [uploadingImages, setUploadingImages] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (field: keyof FlightFormData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Auto-update route summary when cities change
    if ((field === 'from_city' || field === 'to_city') && value) {
      const fromCity = field === 'from_city' ? String(value) : formData.from_city
      const toCity = field === 'to_city' ? String(value) : formData.to_city
      if (fromCity && toCity) {
        setFormData(prev => ({
          ...prev,
          route_summary: `${fromCity} → ${toCity}`,
          from_formatted: fromCity,
          to_formatted: toCity
        }))
      }
    }

    // Auto-update price_numeric when price changes
    if (field === 'price' && value) {
      const priceMatch = String(value).match(/[\d,]+/)
      const priceNumeric = priceMatch ? parseFloat(priceMatch[0].replace(/,/g, '')) : null
      setFormData(prev => ({
        ...prev,
        price_numeric: priceNumeric
      }))
    }

    // Auto-detect if flight involves Korea
    if (field === 'from_city' || field === 'to_city' || field === 'from_country' || field === 'to_country') {
      const koreanCities = ['Seoul', 'Busan', 'Incheon', 'Jeju', '서울', '부산', '인천', '제주']
      const koreanCountries = ['South Korea', 'Korea', '한국']
      const isKorean = 
        koreanCities.some(city => 
          formData.from_city?.includes(city) || 
          formData.to_city?.includes(city) ||
          (field === 'from_city' && String(value || '').includes(city)) ||
          (field === 'to_city' && String(value || '').includes(city))
        ) ||
        koreanCountries.some(country => 
          formData.from_country?.includes(country) || 
          formData.to_country?.includes(country) ||
          (field === 'from_country' && String(value || '').includes(country)) ||
          (field === 'to_country' && String(value || '').includes(country))
        )
      
      setFormData(prev => ({
        ...prev,
        involves_korea: isKorean
      }))
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploadingImages(true)
    try {
      const uploadedUrls: string[] = []

      for (const file of Array.from(files)) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} is not an image file`)
          continue
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large (max 5MB)`)
          continue
        }

        // Upload via API route
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          const error = await response.json()
          toast.error(`Failed to upload ${file.name}: ${error.error}`)
          continue
        }

        const { url } = await response.json()
        uploadedUrls.push(url)
      }

      setFormData(prev => ({
        ...prev,
        image_urls: [...prev.image_urls, ...uploadedUrls]
      }))

      toast.success(`${uploadedUrls.length} image(s) uploaded successfully`)
    } catch (error) {
      console.error('Image upload error:', error)
      toast.error('Failed to upload images')
    } finally {
      setUploadingImages(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const flightData = {
        ...formData,
        price_numeric: formData.price_numeric || undefined,
        seats: formData.seats || undefined,
        date_timestamp: formData.flight_date ? new Date(formData.flight_date).getTime() : undefined,
        scraped_timestamp: new Date().toISOString()
      }

      if (mode === 'create') {
        await flightService.create(flightData)
        toast.success(t('admin.flightForm.success.created'))
      } else if (mode === 'edit' && flight?.id) {
        await flightService.update(flight.id, flightData)
        toast.success(t('admin.flightForm.success.updated'))
      }

      onSuccess()
      onClose()
    } catch (error) {
      console.error('Flight operation error:', error)
      toast.error(mode === 'create' ? t('admin.flightForm.error.createFailed') : t('admin.flightForm.error.updateFailed'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!flight?.id) return

    if (!confirm(t('admin.flightForm.confirmDelete'))) return

    setIsSubmitting(true)
    try {
      await flightService.delete(flight.id)
      toast.success(t('admin.flightForm.success.deleted'))
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Flight delete error:', error)
      toast.error(t('admin.flightForm.error.deleteFailed'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            {mode === 'create' ? t('admin.flightForm.createTitle') : t('admin.flightForm.editTitle')}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? t('admin.flightForm.createDescription')
              : t('admin.flightForm.editDescription')
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Flight ID */}
            <div className="space-y-2">
              <Label htmlFor="flight_id">{t('admin.flightForm.flightId')}</Label>
              <Input
                id="flight_id"
                value={formData.flight_id}
                onChange={(e) => handleInputChange('flight_id', e.target.value)}
                placeholder="FL-2024-001"
                required
              />
            </div>

            {/* Aircraft */}
            <div className="space-y-2">
              <Label htmlFor="aircraft">{t('admin.flightForm.aircraft')}</Label>
              <Input
                id="aircraft"
                value={formData.aircraft}
                onChange={(e) => handleInputChange('aircraft', e.target.value)}
                placeholder="Gulfstream G650"
                required
              />
            </div>

            {/* Flight Date */}
            <div className="space-y-2">
              <Label htmlFor="flight_date">{t('admin.flightForm.flightDate')}</Label>
              <Input
                id="flight_date"
                type="date"
                value={formData.flight_date}
                onChange={(e) => handleInputChange('flight_date', e.target.value)}
                required
              />
            </div>

            {/* Seats */}
            <div className="space-y-2">
              <Label htmlFor="seats">{t('admin.flightForm.seats')}</Label>
              <Input
                id="seats"
                type="number"
                min="1"
                max="50"
                value={formData.seats || ''}
                onChange={(e) => handleInputChange('seats', e.target.value ? parseInt(e.target.value) : 0)}
                placeholder="12"
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">{t('admin.flightForm.price')}</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="$25,000"
                required
              />
            </div>

            {/* Currency */}
            <div className="space-y-2">
              <Label htmlFor="currency">{t('admin.flightForm.currency')}</Label>
              <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="KRW">KRW</SelectItem>
                  <SelectItem value="JPY">JPY</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* From City */}
            <div className="space-y-2">
              <Label htmlFor="from_city">{t('admin.flightForm.fromCity')}</Label>
              <Input
                id="from_city"
                value={formData.from_city}
                onChange={(e) => handleInputChange('from_city', e.target.value)}
                placeholder="New York"
                required
              />
            </div>

            {/* From Country */}
            <div className="space-y-2">
              <Label htmlFor="from_country">{t('admin.flightForm.fromCountry')}</Label>
              <Input
                id="from_country"
                value={formData.from_country}
                onChange={(e) => handleInputChange('from_country', e.target.value)}
                placeholder="United States"
                required
              />
            </div>

            {/* To City */}
            <div className="space-y-2">
              <Label htmlFor="to_city">{t('admin.flightForm.toCity')}</Label>
              <Input
                id="to_city"
                value={formData.to_city}
                onChange={(e) => handleInputChange('to_city', e.target.value)}
                placeholder="Los Angeles"
                required
              />
            </div>

            {/* To Country */}
            <div className="space-y-2">
              <Label htmlFor="to_country">{t('admin.flightForm.toCountry')}</Label>
              <Input
                id="to_country"
                value={formData.to_country}
                onChange={(e) => handleInputChange('to_country', e.target.value)}
                placeholder="United States"
                required
              />
            </div>
          </div>

          {/* Route Summary */}
          <div className="space-y-2">
            <Label htmlFor="route_summary">{t('admin.flightForm.routeSummary')}</Label>
            <Input
              id="route_summary"
              value={formData.route_summary}
              onChange={(e) => handleInputChange('route_summary', e.target.value)}
              placeholder="New York → Los Angeles"
            />
          </div>

          {/* Raw Text */}
          <div className="space-y-2">
            <Label htmlFor="raw_text">{t('admin.flightForm.rawText')}</Label>
            <Textarea
              id="raw_text"
              value={formData.raw_text}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('raw_text', e.target.value)}
              placeholder="Additional flight details..."
              rows={3}
            />
          </div>

          {/* Korea Route Badge */}
          {formData.involves_korea && (
            <div className="flex items-center gap-2">
              <Badge variant="default" className="bg-blue-600">
                {t('admin.flightForm.koreaRoute')}
              </Badge>
            </div>
          )}

          {/* Image Upload */}
          <div className="space-y-4">
            <Label>{t('admin.flightForm.images')}</Label>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImages}
                className="mb-4"
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploadingImages ? t('admin.flightForm.uploading') : t('admin.flightForm.uploadImages')}
              </Button>
              <p className="text-sm text-muted-foreground">
                {t('admin.flightForm.imageUploadHint')}
              </p>
            </div>

            {/* Image Preview */}
            {formData.image_urls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.image_urls.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-video relative overflow-hidden rounded-lg">
                      <Image
                        src={url}
                        alt={`Flight image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <div>
              {mode === 'edit' && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {t('admin.flightForm.deleteFlight')}
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                {t('admin.flightForm.cancel')}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting 
                  ? (mode === 'create' ? t('admin.flightForm.creating') : t('admin.flightForm.updating'))
                  : (mode === 'create' ? t('admin.flightForm.create') : t('admin.flightForm.update'))
                }
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

