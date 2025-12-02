#!/usr/bin/env node

/**
 * Test Script for Combined Crawler Validation
 *
 * Tests the new validation logic to ensure:
 * 1. Flights with "Unknown" locations are filtered out
 * 2. Flights with missing critical data are rejected
 * 3. Past flights are filtered out
 * 4. Image fallback works correctly
 */

// Mock the CombinedCrawler validation logic
class ValidationTester {
    /**
     * Validates a flight has required data and is not invalid
     * @param {Object} flight - Flight object to validate
     * @returns {Object} { isValid: boolean, reason: string }
     */
    validateFlight(flight) {
        const data = flight.extractedData;

        // Check for Unknown country (invalid location data)
        if (data.from?.country === 'Unknown' || data.to?.country === 'Unknown') {
            return {
                isValid: false,
                reason: `Unknown location (${data.from?.country === 'Unknown' ? data.from.city : data.to.city})`
            };
        }

        // Check for missing critical location data
        if (!data.from?.city || !data.to?.city) {
            return {
                isValid: false,
                reason: 'Missing city information'
            };
        }

        if (!data.from?.country || !data.to?.country) {
            return {
                isValid: false,
                reason: 'Missing country information'
            };
        }

        // Check for missing or invalid date
        if (!data.date || !data.dateTimestamp) {
            return {
                isValid: false,
                reason: 'Missing or invalid date'
            };
        }

        // Check for invalid date (too far in past)
        const flightDate = new Date(data.dateTimestamp);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (flightDate < today) {
            return {
                isValid: false,
                reason: 'Past flight date'
            };
        }

        // Check for missing price
        if (!data.price) {
            return {
                isValid: false,
                reason: 'Missing price'
            };
        }

        // Check for missing route summary
        if (!data.route?.summary) {
            return {
                isValid: false,
                reason: 'Missing route summary'
            };
        }

        // All validations passed
        return { isValid: true, reason: null };
    }

    testImageFallback(flight) {
        const imageUrls = flight.images
            ?.map(img => img.src)
            ?.filter(src => src && src.trim().length > 0 && src.startsWith('http'))
            || [];

        const DEFAULT_IMAGE = 'https://xsctqzbwa1mbabgs.public.blob.vercel-storage.com/1.webp';
        const finalImageUrls = imageUrls.length > 0 ? imageUrls : [DEFAULT_IMAGE];

        return {
            hasOriginalImages: imageUrls.length > 0,
            usesDefault: imageUrls.length === 0,
            finalUrls: finalImageUrls
        };
    }
}

// Test cases
const testCases = [
    {
        name: 'Valid Flight - Should PASS',
        flight: {
            id: 'test_1',
            extractedData: {
                from: { city: 'Seoul', country: 'South Korea', formatted: 'Seoul, South Korea' },
                to: { city: 'Tokyo', country: 'Japan', formatted: 'Tokyo, Japan' },
                date: 'Nov 25, 2025',
                dateTimestamp: new Date('2025-11-25').getTime(),
                price: '$15,000 USD',
                route: { summary: 'Seoul → Tokyo' }
            },
            images: [{ src: 'https://example.com/image.jpg' }]
        },
        expectedValid: true
    },
    {
        name: 'Invalid - Unknown Country (Dominican) - Should FAIL',
        flight: {
            id: 'test_2',
            extractedData: {
                from: { city: 'Dominican', country: 'Unknown', formatted: 'Dominican' },
                to: { city: 'Seoul', country: 'South Korea', formatted: 'Seoul, South Korea' },
                date: 'Nov 24, 2025',
                dateTimestamp: new Date('2025-11-24').getTime(),
                price: '$26,250 USD',
                route: { summary: 'Dominican → Seoul' }
            },
            images: []
        },
        expectedValid: false,
        expectedReason: 'Unknown location'
    },
    {
        name: 'Invalid - Missing City - Should FAIL',
        flight: {
            id: 'test_3',
            extractedData: {
                from: { city: '', country: 'USA', formatted: 'USA' },
                to: { city: 'Seoul', country: 'South Korea', formatted: 'Seoul, South Korea' },
                date: 'Nov 25, 2025',
                dateTimestamp: new Date('2025-11-25').getTime(),
                price: '$20,000 USD',
                route: { summary: 'Unknown → Seoul' }
            },
            images: []
        },
        expectedValid: false,
        expectedReason: 'Missing city information'
    },
    {
        name: 'Invalid - Past Date - Should FAIL',
        flight: {
            id: 'test_4',
            extractedData: {
                from: { city: 'Tokyo', country: 'Japan', formatted: 'Tokyo, Japan' },
                to: { city: 'Seoul', country: 'South Korea', formatted: 'Seoul, South Korea' },
                date: 'Nov 20, 2025',
                dateTimestamp: new Date('2025-11-20').getTime(), // Past date
                price: '$15,000 USD',
                route: { summary: 'Tokyo → Seoul' }
            },
            images: []
        },
        expectedValid: false,
        expectedReason: 'Past flight date'
    },
    {
        name: 'Valid - No Seats (FlyXO style) - Should PASS',
        flight: {
            id: 'test_5',
            extractedData: {
                from: { city: 'Tokyo', country: 'Japan', formatted: 'Tokyo, Japan' },
                to: { city: 'Seoul', country: 'South Korea', formatted: 'Seoul, South Korea' },
                date: 'Nov 25, 2025',
                dateTimestamp: new Date('2025-11-25').getTime(),
                price: '$15,170 USD',
                route: { summary: 'Tokyo → Seoul' },
                seats: null, // null seats is OK
                aircraft: 'Private Jet'
            },
            images: []
        },
        expectedValid: true
    },
    {
        name: 'Valid - With Seats (JetBay style) - Should PASS',
        flight: {
            id: 'test_6',
            extractedData: {
                from: { city: 'Hong Kong', country: 'Hong Kong', formatted: 'Hong Kong' },
                to: { city: 'Seoul', country: 'South Korea', formatted: 'Seoul, South Korea' },
                date: 'Nov 26, 2025',
                dateTimestamp: new Date('2025-11-26').getTime(),
                price: '$18,500 USD',
                route: { summary: 'Hong Kong → Seoul' },
                seats: 14,
                aircraft: 'Gulfstream G650'
            },
            images: [{ src: 'https://example.com/jet.jpg' }]
        },
        expectedValid: true
    },
    {
        name: 'Invalid - Missing Price - Should FAIL',
        flight: {
            id: 'test_7',
            extractedData: {
                from: { city: 'Shanghai', country: 'China', formatted: 'Shanghai, China' },
                to: { city: 'Seoul', country: 'South Korea', formatted: 'Seoul, South Korea' },
                date: 'Nov 27, 2025',
                dateTimestamp: new Date('2025-11-27').getTime(),
                price: '',
                route: { summary: 'Shanghai → Seoul' }
            },
            images: []
        },
        expectedValid: false,
        expectedReason: 'Missing price'
    }
];

// Run tests
console.log('🧪 Combined Crawler Validation Tests');
console.log('====================================\n');

const tester = new ValidationTester();
let passed = 0;
let failed = 0;

testCases.forEach((testCase, index) => {
    console.log(`Test ${index + 1}: ${testCase.name}`);

    // Test validation
    const result = tester.validateFlight(testCase.flight);
    const validationPassed = result.isValid === testCase.expectedValid;

    if (testCase.expectedReason) {
        const reasonMatches = result.reason && result.reason.includes(testCase.expectedReason.split('(')[0].trim());
        if (validationPassed && reasonMatches) {
            console.log(`   ✅ PASS - Correctly ${result.isValid ? 'accepted' : 'rejected'}: ${result.reason || 'Valid flight'}`);
            passed++;
        } else {
            console.log(`   ❌ FAIL - Expected reason: ${testCase.expectedReason}, Got: ${result.reason}`);
            failed++;
        }
    } else if (validationPassed) {
        console.log(`   ✅ PASS - Correctly ${result.isValid ? 'accepted' : 'rejected'}`);
        passed++;
    } else {
        console.log(`   ❌ FAIL - Expected ${testCase.expectedValid ? 'valid' : 'invalid'}, Got ${result.isValid ? 'valid' : 'invalid'}`);
        console.log(`      Reason: ${result.reason}`);
        failed++;
    }

    // Test image fallback
    const imageResult = tester.testImageFallback(testCase.flight);
    console.log(`   📸 Images: ${imageResult.hasOriginalImages ? 'Has original' : 'Using default'}`);

    console.log('');
});

// Summary
console.log('====================================');
console.log(`Test Results: ${passed}/${testCases.length} passed`);
if (failed > 0) {
    console.log(`⚠️  ${failed} test(s) failed`);
    process.exit(1);
} else {
    console.log('✅ All tests passed!');
    process.exit(0);
}
