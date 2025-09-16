'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function ConnectionDebug() {
  const [envStatus, setEnvStatus] = useState<{
    supabaseUrl: boolean
    anonKey: boolean
    hasClient: boolean
    error?: string
  }>({
    supabaseUrl: false,
    anonKey: false,
    hasClient: false
  })

  useEffect(() => {
    const checkConnection = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      console.log('Environment check:', {
        supabaseUrl: supabaseUrl ? 'Set' : 'Missing',
        anonKey: anonKey ? 'Set' : 'Missing'
      })

      let hasClient = false
      let error = undefined

      try {
        const { getSupabaseClient } = await import('@/lib/supabase')
        const client = getSupabaseClient()
        hasClient = !!client
        console.log('Supabase client created successfully')
      } catch (err) {
        error = err instanceof Error ? err.message : String(err)
        console.error('Supabase client error:', error)
      }

      setEnvStatus({
        supabaseUrl: !!supabaseUrl,
        anonKey: !!anonKey,
        hasClient,
        error
      })
    }

    checkConnection()
  }, [])

  return (
    <Card className="mb-6 border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20">
      <CardHeader>
        <CardTitle className="text-yellow-800 dark:text-yellow-200">Connection Debug</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant={envStatus.supabaseUrl ? 'default' : 'destructive'}>
              Supabase URL: {envStatus.supabaseUrl ? 'Set' : 'Missing'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={envStatus.anonKey ? 'default' : 'destructive'}>
              Anon Key: {envStatus.anonKey ? 'Set' : 'Missing'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={envStatus.hasClient ? 'default' : 'destructive'}>
              Client: {envStatus.hasClient ? 'Connected' : 'Failed'}
            </Badge>
          </div>
          {envStatus.error && (
            <div className="text-sm text-red-600 dark:text-red-400 mt-2">
              Error: {envStatus.error}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
