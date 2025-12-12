import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('tiered_margin_settings')
      .select('*')
      .eq('is_active', true)
      .order('min_price', { ascending: true })

    if (error) {
      console.error('Error fetching tiered margins:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET /api/tiered-margins:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { tiers } = body

    if (!tiers || !Array.isArray(tiers) || tiers.length === 0) {
      return NextResponse.json(
        { error: 'Tiers array is required' },
        { status: 400 }
      )
    }

    // Validate tiers
    for (const tier of tiers) {
      if (tier.min_price === undefined || tier.max_price === undefined || tier.margin_percentage === undefined) {
        return NextResponse.json(
          { error: 'Each tier must have min_price, max_price, and margin_percentage' },
          { status: 400 }
        )
      }
      if (tier.min_price >= tier.max_price) {
        return NextResponse.json(
          { error: 'min_price must be less than max_price' },
          { status: 400 }
        )
      }
      if (tier.margin_percentage < 0 || tier.margin_percentage > 100) {
        return NextResponse.json(
          { error: 'margin_percentage must be between 0 and 100' },
          { status: 400 }
        )
      }
    }

    // Deactivate all existing tiers
    const { error: deactivateError } = await supabase
      .from('tiered_margin_settings')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('is_active', true)

    if (deactivateError) {
      console.error('Error deactivating old tiers:', deactivateError)
      return NextResponse.json({ error: deactivateError.message }, { status: 500 })
    }

    // Insert new tiers
    const tiersToInsert = tiers.map(tier => ({
      min_price: tier.min_price,
      max_price: tier.max_price,
      margin_percentage: tier.margin_percentage,
      is_active: true,
      created_by: tier.created_by || 'admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    const { data, error: insertError } = await supabase
      .from('tiered_margin_settings')
      .insert(tiersToInsert)
      .select()

    if (insertError) {
      console.error('Error inserting new tiers:', insertError)
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in PUT /api/tiered-margins:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
