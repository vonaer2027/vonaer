#!/usr/bin/env node

/**
 * Cleanup Script - Archive Invalid Flights
 *
 * This script finds and archives flights with:
 * 1. "Unknown" in country fields
 * 2. Missing critical location data
 * 3. Past flight dates
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanupInvalidFlights() {
    console.log('🧹 Starting cleanup of invalid flights...\n');

    try {
        // Get all active flights
        console.log('📊 Fetching all active flights from database...');
        const { data: activeFlights, error: fetchError } = await supabase
            .from('flights')
            .select('*')
            .eq('is_active', true);

        if (fetchError) {
            console.error('❌ Error fetching flights:', fetchError);
            throw fetchError;
        }

        console.log(`Found ${activeFlights.length} active flights\n`);

        // Identify invalid flights
        const invalidFlights = [];
        const today = new Date().toISOString().split('T')[0];

        for (const flight of activeFlights) {
            let reason = null;

            // Check for Unknown country
            if (flight.from_country === 'Unknown' || flight.to_country === 'Unknown') {
                reason = `Unknown location (${flight.from_country === 'Unknown' ? flight.from_city : flight.to_city})`;
            }
            // Check for missing critical location data
            else if (!flight.from_city || !flight.to_city) {
                reason = 'Missing city information';
            }
            else if (!flight.from_country || !flight.to_country) {
                reason = 'Missing country information';
            }
            // Check for past dates
            else if (flight.flight_date && flight.flight_date < today) {
                reason = 'Past flight date';
            }
            // Check for missing price
            else if (!flight.price) {
                reason = 'Missing price';
            }
            // Check for missing route
            else if (!flight.route_summary) {
                reason = 'Missing route summary';
            }

            if (reason) {
                invalidFlights.push({
                    id: flight.id,
                    flight_id: flight.flight_id,
                    route: flight.route_summary || `${flight.from_city} → ${flight.to_city}`,
                    date: flight.flight_date,
                    reason: reason
                });
            }
        }

        console.log(`🔍 Found ${invalidFlights.length} invalid flights to archive\n`);

        if (invalidFlights.length === 0) {
            console.log('✅ No invalid flights found - database is clean!');
            return;
        }

        // Display invalid flights
        console.log('📋 Invalid flights to be archived:');
        invalidFlights.forEach((flight, index) => {
            console.log(`${index + 1}. [${flight.flight_id}] ${flight.route} - ${flight.reason}`);
        });

        console.log('\n⏳ Archiving invalid flights...');

        // Archive invalid flights
        const flightIds = invalidFlights.map(f => f.flight_id);
        const { error: archiveError } = await supabase
            .from('flights')
            .update({
                is_active: false,
                archived_at: new Date().toISOString()
            })
            .in('flight_id', flightIds);

        if (archiveError) {
            console.error('❌ Error archiving flights:', archiveError);
            throw archiveError;
        }

        console.log(`✅ Successfully archived ${invalidFlights.length} invalid flights\n`);

        // Summary by reason
        const reasonBreakdown = invalidFlights.reduce((acc, flight) => {
            acc[flight.reason] = (acc[flight.reason] || 0) + 1;
            return acc;
        }, {});

        console.log('📊 Breakdown by reason:');
        for (const [reason, count] of Object.entries(reasonBreakdown)) {
            console.log(`   ${reason}: ${count} flights`);
        }

        console.log('\n✨ Cleanup completed successfully!');

    } catch (error) {
        console.error('\n❌ Fatal error:', error);
        throw error;
    }
}

// Main execution
(async () => {
    try {
        await cleanupInvalidFlights();
        process.exit(0);
    } catch (error) {
        console.error('Script failed:', error);
        process.exit(1);
    }
})();
