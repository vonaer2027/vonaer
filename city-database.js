/**
 * Comprehensive City Database for Flight Crawlers
 *
 * Purpose: Robust city-to-country mapping with fuzzy matching
 *
 * Features:
 * - 150+ major world cities/airports
 * - Case-insensitive matching
 * - Handles concatenated city names (e.g., "LosAngeles")
 * - Fuzzy matching for partial matches
 * - Logging for unknown cities (for future additions)
 */

// Comprehensive city database organized by region
const CITY_DATABASE = {
    // ============ ASIA-PACIFIC ============
    // South Korea
    'Seoul': { city: 'Seoul', country: 'South Korea', code: 'ICN' },
    'Incheon': { city: 'Seoul', country: 'South Korea', code: 'ICN' },
    'Gimpo': { city: 'Seoul', country: 'South Korea', code: 'GMP' },
    'Busan': { city: 'Busan', country: 'South Korea', code: 'PUS' },
    'Jeju': { city: 'Jeju', country: 'South Korea', code: 'CJU' },

    // Japan
    'Tokyo': { city: 'Tokyo', country: 'Japan', code: 'NRT' },
    'Narita': { city: 'Tokyo', country: 'Japan', code: 'NRT' },
    'Haneda': { city: 'Tokyo', country: 'Japan', code: 'HND' },
    'Osaka': { city: 'Osaka', country: 'Japan', code: 'KIX' },
    'Kansai': { city: 'Osaka', country: 'Japan', code: 'KIX' },
    'Nagoya': { city: 'Nagoya', country: 'Japan', code: 'NGO' },
    'Fukuoka': { city: 'Fukuoka', country: 'Japan', code: 'FUK' },
    'Sapporo': { city: 'Sapporo', country: 'Japan', code: 'CTS' },
    'Hiroshima': { city: 'Hiroshima', country: 'Japan', code: 'HIJ' },
    'Okinawa': { city: 'Okinawa', country: 'Japan', code: 'OKA' },
    'Naha': { city: 'Okinawa', country: 'Japan', code: 'OKA' },

    // China
    'Beijing': { city: 'Beijing', country: 'China', code: 'PEK' },
    'Shanghai': { city: 'Shanghai', country: 'China', code: 'PVG' },
    'Pudong': { city: 'Shanghai', country: 'China', code: 'PVG' },
    'Guangzhou': { city: 'Guangzhou', country: 'China', code: 'CAN' },
    'Shenzhen': { city: 'Shenzhen', country: 'China', code: 'SZX' },
    'Chengdu': { city: 'Chengdu', country: 'China', code: 'CTU' },
    'Hangzhou': { city: 'Hangzhou', country: 'China', code: 'HGH' },
    'Xian': { city: "Xi'an", country: 'China', code: 'XIY' },
    'Nanjing': { city: 'Nanjing', country: 'China', code: 'NKG' },
    'Chongqing': { city: 'Chongqing', country: 'China', code: 'CKG' },
    'Tianjin': { city: 'Tianjin', country: 'China', code: 'TSN' },
    'Dalian': { city: 'Dalian', country: 'China', code: 'DLC' },
    'Qingdao': { city: 'Qingdao', country: 'China', code: 'TAO' },
    'Wuhan': { city: 'Wuhan', country: 'China', code: 'WUH' },
    'Kunming': { city: 'Kunming', country: 'China', code: 'KMG' },
    'Xiamen': { city: 'Xiamen', country: 'China', code: 'XMN' },
    'Hainan': { city: 'Hainan', country: 'China', code: 'HAK' },
    'Sanya': { city: 'Sanya', country: 'China', code: 'SYX' },

    // Hong Kong, Macau, Taiwan
    'Hong Kong': { city: 'Hong Kong', country: 'Hong Kong', code: 'HKG' },
    'HongKong': { city: 'Hong Kong', country: 'Hong Kong', code: 'HKG' },
    'Macau': { city: 'Macau', country: 'Macau', code: 'MFM' },
    'Macao': { city: 'Macau', country: 'Macau', code: 'MFM' },
    'Taipei': { city: 'Taipei', country: 'Taiwan', code: 'TPE' },
    'Taoyuan': { city: 'Taipei', country: 'Taiwan', code: 'TPE' },
    'Kaohsiung': { city: 'Kaohsiung', country: 'Taiwan', code: 'KHH' },

    // Southeast Asia
    'Singapore': { city: 'Singapore', country: 'Singapore', code: 'SIN' },
    'Changi': { city: 'Singapore', country: 'Singapore', code: 'SIN' },
    'Bangkok': { city: 'Bangkok', country: 'Thailand', code: 'BKK' },
    'Suvarnabhumi': { city: 'Bangkok', country: 'Thailand', code: 'BKK' },
    'Phuket': { city: 'Phuket', country: 'Thailand', code: 'HKT' },
    'Chiang Mai': { city: 'Chiang Mai', country: 'Thailand', code: 'CNX' },
    'ChiangMai': { city: 'Chiang Mai', country: 'Thailand', code: 'CNX' },
    'Kuala Lumpur': { city: 'Kuala Lumpur', country: 'Malaysia', code: 'KUL' },
    'KualaLumpur': { city: 'Kuala Lumpur', country: 'Malaysia', code: 'KUL' },
    'Penang': { city: 'Penang', country: 'Malaysia', code: 'PEN' },
    'Jakarta': { city: 'Jakarta', country: 'Indonesia', code: 'CGK' },
    'Bali': { city: 'Bali', country: 'Indonesia', code: 'DPS' },
    'Denpasar': { city: 'Bali', country: 'Indonesia', code: 'DPS' },
    'Manila': { city: 'Manila', country: 'Philippines', code: 'MNL' },
    'Cebu': { city: 'Cebu', country: 'Philippines', code: 'CEB' },
    'Ho Chi Minh': { city: 'Ho Chi Minh City', country: 'Vietnam', code: 'SGN' },
    'HoChiMinh': { city: 'Ho Chi Minh City', country: 'Vietnam', code: 'SGN' },
    'Saigon': { city: 'Ho Chi Minh City', country: 'Vietnam', code: 'SGN' },
    'Hanoi': { city: 'Hanoi', country: 'Vietnam', code: 'HAN' },
    'Da Nang': { city: 'Da Nang', country: 'Vietnam', code: 'DAD' },
    'DaNang': { city: 'Da Nang', country: 'Vietnam', code: 'DAD' },
    'Phnom Penh': { city: 'Phnom Penh', country: 'Cambodia', code: 'PNH' },
    'PhnomPenh': { city: 'Phnom Penh', country: 'Cambodia', code: 'PNH' },
    'Siem Reap': { city: 'Siem Reap', country: 'Cambodia', code: 'REP' },
    'SiemReap': { city: 'Siem Reap', country: 'Cambodia', code: 'REP' },
    'Vientiane': { city: 'Vientiane', country: 'Laos', code: 'VTE' },
    'Yangon': { city: 'Yangon', country: 'Myanmar', code: 'RGN' },
    'Rangoon': { city: 'Yangon', country: 'Myanmar', code: 'RGN' },

    // South Asia
    'Mumbai': { city: 'Mumbai', country: 'India', code: 'BOM' },
    'Bombay': { city: 'Mumbai', country: 'India', code: 'BOM' },
    'Delhi': { city: 'Delhi', country: 'India', code: 'DEL' },
    'New Delhi': { city: 'Delhi', country: 'India', code: 'DEL' },
    'NewDelhi': { city: 'Delhi', country: 'India', code: 'DEL' },
    'Bangalore': { city: 'Bangalore', country: 'India', code: 'BLR' },
    'Chennai': { city: 'Chennai', country: 'India', code: 'MAA' },
    'Kolkata': { city: 'Kolkata', country: 'India', code: 'CCU' },
    'Hyderabad': { city: 'Hyderabad', country: 'India', code: 'HYD' },
    'Colombo': { city: 'Colombo', country: 'Sri Lanka', code: 'CMB' },
    'Male': { city: 'Male', country: 'Maldives', code: 'MLE' },
    'Maldives': { city: 'Male', country: 'Maldives', code: 'MLE' },
    'Kathmandu': { city: 'Kathmandu', country: 'Nepal', code: 'KTM' },

    // Oceania
    'Sydney': { city: 'Sydney', country: 'Australia', code: 'SYD' },
    'Melbourne': { city: 'Melbourne', country: 'Australia', code: 'MEL' },
    'Brisbane': { city: 'Brisbane', country: 'Australia', code: 'BNE' },
    'Perth': { city: 'Perth', country: 'Australia', code: 'PER' },
    'Auckland': { city: 'Auckland', country: 'New Zealand', code: 'AKL' },
    'Wellington': { city: 'Wellington', country: 'New Zealand', code: 'WLG' },
    'Guam': { city: 'Guam', country: 'Guam', code: 'GUM' },
    'Fiji': { city: 'Nadi', country: 'Fiji', code: 'NAN' },
    'Nadi': { city: 'Nadi', country: 'Fiji', code: 'NAN' },

    // ============ AMERICAS ============
    // United States - Major Cities
    'Los Angeles': { city: 'Los Angeles', country: 'United States', code: 'LAX' },
    'LosAngeles': { city: 'Los Angeles', country: 'United States', code: 'LAX' },
    'LA': { city: 'Los Angeles', country: 'United States', code: 'LAX' },
    'San Francisco': { city: 'San Francisco', country: 'United States', code: 'SFO' },
    'SanFrancisco': { city: 'San Francisco', country: 'United States', code: 'SFO' },
    'SF': { city: 'San Francisco', country: 'United States', code: 'SFO' },
    'New York': { city: 'New York', country: 'United States', code: 'JFK' },
    'NewYork': { city: 'New York', country: 'United States', code: 'JFK' },
    'NYC': { city: 'New York', country: 'United States', code: 'JFK' },
    'JFK': { city: 'New York', country: 'United States', code: 'JFK' },
    'Chicago': { city: 'Chicago', country: 'United States', code: 'ORD' },
    'Seattle': { city: 'Seattle', country: 'United States', code: 'SEA' },
    'Las Vegas': { city: 'Las Vegas', country: 'United States', code: 'LAS' },
    'LasVegas': { city: 'Las Vegas', country: 'United States', code: 'LAS' },
    'Vegas': { city: 'Las Vegas', country: 'United States', code: 'LAS' },
    'Miami': { city: 'Miami', country: 'United States', code: 'MIA' },
    'Houston': { city: 'Houston', country: 'United States', code: 'IAH' },
    'Dallas': { city: 'Dallas', country: 'United States', code: 'DFW' },
    'Denver': { city: 'Denver', country: 'United States', code: 'DEN' },
    'Atlanta': { city: 'Atlanta', country: 'United States', code: 'ATL' },
    'Boston': { city: 'Boston', country: 'United States', code: 'BOS' },
    'Washington': { city: 'Washington D.C.', country: 'United States', code: 'IAD' },
    'Washington DC': { city: 'Washington D.C.', country: 'United States', code: 'IAD' },
    'WashingtonDC': { city: 'Washington D.C.', country: 'United States', code: 'IAD' },
    'DC': { city: 'Washington D.C.', country: 'United States', code: 'IAD' },
    'Phoenix': { city: 'Phoenix', country: 'United States', code: 'PHX' },
    'San Diego': { city: 'San Diego', country: 'United States', code: 'SAN' },
    'SanDiego': { city: 'San Diego', country: 'United States', code: 'SAN' },
    'Portland': { city: 'Portland', country: 'United States', code: 'PDX' },
    'Orlando': { city: 'Orlando', country: 'United States', code: 'MCO' },
    'Honolulu': { city: 'Honolulu', country: 'United States', code: 'HNL' },
    'Hawaii': { city: 'Honolulu', country: 'United States', code: 'HNL' },
    'Anchorage': { city: 'Anchorage', country: 'United States', code: 'ANC' },
    'Alaska': { city: 'Anchorage', country: 'United States', code: 'ANC' },

    // Canada
    'Vancouver': { city: 'Vancouver', country: 'Canada', code: 'YVR' },
    'Toronto': { city: 'Toronto', country: 'Canada', code: 'YYZ' },
    'Montreal': { city: 'Montreal', country: 'Canada', code: 'YUL' },
    'Calgary': { city: 'Calgary', country: 'Canada', code: 'YYC' },

    // Mexico & Caribbean
    'Mexico City': { city: 'Mexico City', country: 'Mexico', code: 'MEX' },
    'MexicoCity': { city: 'Mexico City', country: 'Mexico', code: 'MEX' },
    'Cancun': { city: 'Cancun', country: 'Mexico', code: 'CUN' },
    'Cabo': { city: 'Los Cabos', country: 'Mexico', code: 'SJD' },
    'Los Cabos': { city: 'Los Cabos', country: 'Mexico', code: 'SJD' },
    'LosCabos': { city: 'Los Cabos', country: 'Mexico', code: 'SJD' },
    'Nassau': { city: 'Nassau', country: 'Bahamas', code: 'NAS' },
    'Bahamas': { city: 'Nassau', country: 'Bahamas', code: 'NAS' },
    'Jamaica': { city: 'Montego Bay', country: 'Jamaica', code: 'MBJ' },

    // South America
    'Sao Paulo': { city: 'São Paulo', country: 'Brazil', code: 'GRU' },
    'SaoPaulo': { city: 'São Paulo', country: 'Brazil', code: 'GRU' },
    'Rio': { city: 'Rio de Janeiro', country: 'Brazil', code: 'GIG' },
    'Rio de Janeiro': { city: 'Rio de Janeiro', country: 'Brazil', code: 'GIG' },
    'RiodeJaneiro': { city: 'Rio de Janeiro', country: 'Brazil', code: 'GIG' },
    'Buenos Aires': { city: 'Buenos Aires', country: 'Argentina', code: 'EZE' },
    'BuenosAires': { city: 'Buenos Aires', country: 'Argentina', code: 'EZE' },
    'Lima': { city: 'Lima', country: 'Peru', code: 'LIM' },
    'Bogota': { city: 'Bogota', country: 'Colombia', code: 'BOG' },
    'Santiago': { city: 'Santiago', country: 'Chile', code: 'SCL' },

    // ============ EUROPE ============
    // UK & Ireland
    'London': { city: 'London', country: 'United Kingdom', code: 'LHR' },
    'Heathrow': { city: 'London', country: 'United Kingdom', code: 'LHR' },
    'Gatwick': { city: 'London', country: 'United Kingdom', code: 'LGW' },
    'Manchester': { city: 'Manchester', country: 'United Kingdom', code: 'MAN' },
    'Edinburgh': { city: 'Edinburgh', country: 'United Kingdom', code: 'EDI' },
    'Dublin': { city: 'Dublin', country: 'Ireland', code: 'DUB' },

    // Western Europe
    'Paris': { city: 'Paris', country: 'France', code: 'CDG' },
    'Nice': { city: 'Nice', country: 'France', code: 'NCE' },
    'Lyon': { city: 'Lyon', country: 'France', code: 'LYS' },
    'Amsterdam': { city: 'Amsterdam', country: 'Netherlands', code: 'AMS' },
    'Brussels': { city: 'Brussels', country: 'Belgium', code: 'BRU' },
    'Luxembourg': { city: 'Luxembourg', country: 'Luxembourg', code: 'LUX' },

    // Central Europe
    'Frankfurt': { city: 'Frankfurt', country: 'Germany', code: 'FRA' },
    'Munich': { city: 'Munich', country: 'Germany', code: 'MUC' },
    'Berlin': { city: 'Berlin', country: 'Germany', code: 'BER' },
    'Hamburg': { city: 'Hamburg', country: 'Germany', code: 'HAM' },
    'Dusseldorf': { city: 'Düsseldorf', country: 'Germany', code: 'DUS' },
    'Zurich': { city: 'Zurich', country: 'Switzerland', code: 'ZRH' },
    'Geneva': { city: 'Geneva', country: 'Switzerland', code: 'GVA' },
    'Vienna': { city: 'Vienna', country: 'Austria', code: 'VIE' },
    'Prague': { city: 'Prague', country: 'Czech Republic', code: 'PRG' },
    'Warsaw': { city: 'Warsaw', country: 'Poland', code: 'WAW' },
    'Budapest': { city: 'Budapest', country: 'Hungary', code: 'BUD' },

    // Southern Europe
    'Rome': { city: 'Rome', country: 'Italy', code: 'FCO' },
    'Milan': { city: 'Milan', country: 'Italy', code: 'MXP' },
    'Venice': { city: 'Venice', country: 'Italy', code: 'VCE' },
    'Florence': { city: 'Florence', country: 'Italy', code: 'FLR' },
    'Madrid': { city: 'Madrid', country: 'Spain', code: 'MAD' },
    'Barcelona': { city: 'Barcelona', country: 'Spain', code: 'BCN' },
    'Lisbon': { city: 'Lisbon', country: 'Portugal', code: 'LIS' },
    'Athens': { city: 'Athens', country: 'Greece', code: 'ATH' },
    'Mykonos': { city: 'Mykonos', country: 'Greece', code: 'JMK' },
    'Santorini': { city: 'Santorini', country: 'Greece', code: 'JTR' },

    // Nordic & Baltic
    'Stockholm': { city: 'Stockholm', country: 'Sweden', code: 'ARN' },
    'Copenhagen': { city: 'Copenhagen', country: 'Denmark', code: 'CPH' },
    'Oslo': { city: 'Oslo', country: 'Norway', code: 'OSL' },
    'Helsinki': { city: 'Helsinki', country: 'Finland', code: 'HEL' },
    'Reykjavik': { city: 'Reykjavik', country: 'Iceland', code: 'KEF' },
    'Iceland': { city: 'Reykjavik', country: 'Iceland', code: 'KEF' },

    // Eastern Europe & Russia
    'Moscow': { city: 'Moscow', country: 'Russia', code: 'SVO' },
    'St Petersburg': { city: 'St. Petersburg', country: 'Russia', code: 'LED' },
    'StPetersburg': { city: 'St. Petersburg', country: 'Russia', code: 'LED' },
    'Istanbul': { city: 'Istanbul', country: 'Turkey', code: 'IST' },

    // ============ MIDDLE EAST & AFRICA ============
    // Middle East
    'Dubai': { city: 'Dubai', country: 'UAE', code: 'DXB' },
    'Abu Dhabi': { city: 'Abu Dhabi', country: 'UAE', code: 'AUH' },
    'AbuDhabi': { city: 'Abu Dhabi', country: 'UAE', code: 'AUH' },
    'Doha': { city: 'Doha', country: 'Qatar', code: 'DOH' },
    'Qatar': { city: 'Doha', country: 'Qatar', code: 'DOH' },
    'Riyadh': { city: 'Riyadh', country: 'Saudi Arabia', code: 'RUH' },
    'Jeddah': { city: 'Jeddah', country: 'Saudi Arabia', code: 'JED' },
    'Kuwait': { city: 'Kuwait City', country: 'Kuwait', code: 'KWI' },
    'Bahrain': { city: 'Manama', country: 'Bahrain', code: 'BAH' },
    'Tel Aviv': { city: 'Tel Aviv', country: 'Israel', code: 'TLV' },
    'TelAviv': { city: 'Tel Aviv', country: 'Israel', code: 'TLV' },
    'Amman': { city: 'Amman', country: 'Jordan', code: 'AMM' },
    'Muscat': { city: 'Muscat', country: 'Oman', code: 'MCT' },
    'Tehran': { city: 'Tehran', country: 'Iran', code: 'IKA' },

    // Africa
    'Cairo': { city: 'Cairo', country: 'Egypt', code: 'CAI' },
    'Casablanca': { city: 'Casablanca', country: 'Morocco', code: 'CMN' },
    'Marrakech': { city: 'Marrakech', country: 'Morocco', code: 'RAK' },
    'Johannesburg': { city: 'Johannesburg', country: 'South Africa', code: 'JNB' },
    'Cape Town': { city: 'Cape Town', country: 'South Africa', code: 'CPT' },
    'CapeTown': { city: 'Cape Town', country: 'South Africa', code: 'CPT' },
    'Nairobi': { city: 'Nairobi', country: 'Kenya', code: 'NBO' },
    'Lagos': { city: 'Lagos', country: 'Nigeria', code: 'LOS' },
    'Addis Ababa': { city: 'Addis Ababa', country: 'Ethiopia', code: 'ADD' },
    'AddisAbaba': { city: 'Addis Ababa', country: 'Ethiopia', code: 'ADD' },
};

// Create case-insensitive lookup map
const CITY_LOOKUP = {};
for (const [key, value] of Object.entries(CITY_DATABASE)) {
    CITY_LOOKUP[key.toLowerCase()] = value;
    // Also add version without spaces for concatenated parsing
    const noSpaces = key.replace(/\s+/g, '');
    if (noSpaces !== key) {
        CITY_LOOKUP[noSpaces.toLowerCase()] = value;
    }
}

// Track unknown cities for logging/future additions
const unknownCitiesLog = new Set();

/**
 * Look up a city and return its location data
 * @param {string} cityName - The city name to look up
 * @returns {Object} Location object with city, country, formatted, code
 */
function lookupCity(cityName) {
    if (!cityName || typeof cityName !== 'string') {
        return null;
    }

    const normalized = cityName.trim();
    const key = normalized.toLowerCase();

    // Direct lookup
    if (CITY_LOOKUP[key]) {
        const data = CITY_LOOKUP[key];
        return {
            city: data.city,
            country: data.country,
            code: data.code,
            formatted: data.country === data.city
                ? data.city
                : `${data.city}, ${data.country}`
        };
    }

    // Try without common suffixes
    const withoutSuffixes = key
        .replace(/\s*(international|intl|airport|city)$/i, '')
        .trim();
    if (withoutSuffixes !== key && CITY_LOOKUP[withoutSuffixes]) {
        const data = CITY_LOOKUP[withoutSuffixes];
        return {
            city: data.city,
            country: data.country,
            code: data.code,
            formatted: data.country === data.city
                ? data.city
                : `${data.city}, ${data.country}`
        };
    }

    // Fuzzy match - check if city name is contained in a known city
    for (const [dbKey, data] of Object.entries(CITY_LOOKUP)) {
        if (dbKey.includes(key) || key.includes(dbKey)) {
            if (Math.abs(dbKey.length - key.length) <= 3) {
                return {
                    city: data.city,
                    country: data.country,
                    code: data.code,
                    formatted: data.country === data.city
                        ? data.city
                        : `${data.city}, ${data.country}`
                };
            }
        }
    }

    // Log unknown city for future additions
    if (!unknownCitiesLog.has(normalized)) {
        unknownCitiesLog.add(normalized);
        console.log(`⚠️  Unknown city encountered: "${normalized}" - consider adding to city-database.js`);
    }

    return null;
}

/**
 * Parse a location string and return location data
 * Handles Seoul-specific logic and falls back to database
 * @param {string} cityName - The city name to parse
 * @returns {Object} Location object
 */
function parseLocation(cityName) {
    if (!cityName || typeof cityName !== 'string') {
        return {
            city: 'Unknown',
            country: 'Unknown',
            formatted: 'Unknown'
        };
    }

    const normalized = cityName.trim();

    // Special handling for Seoul/Korea
    if (/^(seoul|icn|gmp|incheon|gimpo)$/i.test(normalized)) {
        return {
            city: 'Seoul',
            country: 'South Korea',
            code: 'ICN',
            formatted: 'Seoul, South Korea'
        };
    }

    // Try database lookup
    const result = lookupCity(normalized);
    if (result) {
        return result;
    }

    // Return with "Unverified" instead of "Unknown" to allow through validation
    // but mark for review
    return {
        city: normalized,
        country: 'Unverified',
        formatted: `${normalized} (Unverified)`
    };
}

/**
 * Split concatenated city names (e.g., "SeoulLosAngeles" → ["Seoul", "Los Angeles"])
 * @param {string} routeStr - The concatenated route string
 * @returns {Object} { from: string, to: string }
 */
function splitConcatenatedRoute(routeStr) {
    if (!routeStr || typeof routeStr !== 'string') {
        return { from: null, to: null };
    }

    const str = routeStr.trim();

    // Handle all-uppercase strings (e.g., "VIENTIANE")
    const isAllUppercase = str === str.toUpperCase() && str.length > 3;

    // Try to find Seoul as delimiter
    const seoulMatch = str.match(/^(.+?)(Seoul)$/i) || str.match(/^(Seoul)(.+)$/i);
    if (seoulMatch) {
        if (/^seoul$/i.test(seoulMatch[1])) {
            return { from: 'Seoul', to: seoulMatch[2] };
        } else {
            return { from: seoulMatch[1], to: 'Seoul' };
        }
    }

    // For all uppercase, check if it's a single city name
    if (isAllUppercase) {
        const lookup = lookupCity(str);
        if (lookup) {
            // This is a single city, not a route
            return { from: str, to: null };
        }
    }

    // Try to split on known city boundaries
    // Check each known city to see if the string starts or ends with it
    const sortedCities = Object.keys(CITY_DATABASE).sort((a, b) => b.length - a.length);

    for (const city of sortedCities) {
        const cityLower = city.toLowerCase();
        const strLower = str.toLowerCase();
        const cityNoSpaces = city.replace(/\s+/g, '');
        const cityNoSpacesLower = cityNoSpaces.toLowerCase();

        // Check if string starts with this city
        if (strLower.startsWith(cityLower)) {
            const remainder = str.substring(city.length);
            if (remainder.length > 0) {
                return { from: city, to: remainder };
            }
        }
        if (strLower.startsWith(cityNoSpacesLower)) {
            const remainder = str.substring(cityNoSpaces.length);
            if (remainder.length > 0) {
                return { from: cityNoSpaces, to: remainder };
            }
        }

        // Check if string ends with this city
        if (strLower.endsWith(cityLower)) {
            const remainder = str.substring(0, str.length - city.length);
            if (remainder.length > 0) {
                return { from: remainder, to: city };
            }
        }
        if (strLower.endsWith(cityNoSpacesLower)) {
            const remainder = str.substring(0, str.length - cityNoSpaces.length);
            if (remainder.length > 0) {
                return { from: remainder, to: cityNoSpaces };
            }
        }
    }

    // Fallback: split on capital letters for CamelCase
    const parts = str.split(/(?=[A-Z][a-z])/);
    if (parts.length >= 2) {
        // Try to find a valid split point
        for (let i = 1; i < parts.length; i++) {
            const from = parts.slice(0, i).join('');
            const to = parts.slice(i).join('');

            // Check if both parts look like valid cities
            if (from.length >= 2 && to.length >= 2) {
                return { from, to };
            }
        }
    }

    // Could not split - return as single city
    return { from: str, to: null };
}

/**
 * Get list of unknown cities encountered during this session
 * @returns {Array} List of unknown city names
 */
function getUnknownCities() {
    return Array.from(unknownCitiesLog);
}

/**
 * Clear the unknown cities log
 */
function clearUnknownCitiesLog() {
    unknownCitiesLog.clear();
}

module.exports = {
    CITY_DATABASE,
    lookupCity,
    parseLocation,
    splitConcatenatedRoute,
    getUnknownCities,
    clearUnknownCitiesLog
};
