export interface City {
  name: string
  country: string
  region: string
  code: string
  timezone: string
}

export const cities: City[] = [
  // Asia - Korea
  { name: 'Seoul', country: 'South Korea', region: 'Asia', code: 'ICN', timezone: 'Asia/Seoul' },
  { name: 'Busan', country: 'South Korea', region: 'Asia', code: 'PUS', timezone: 'Asia/Seoul' },
  { name: 'Incheon', country: 'South Korea', region: 'Asia', code: 'ICN', timezone: 'Asia/Seoul' },
  { name: 'Jeju', country: 'South Korea', region: 'Asia', code: 'CJU', timezone: 'Asia/Seoul' },
  
  // Asia - Japan
  { name: 'Tokyo', country: 'Japan', region: 'Asia', code: 'NRT', timezone: 'Asia/Tokyo' },
  { name: 'Osaka', country: 'Japan', region: 'Asia', code: 'KIX', timezone: 'Asia/Tokyo' },
  { name: 'Kyoto', country: 'Japan', region: 'Asia', code: 'KIX', timezone: 'Asia/Tokyo' },
  { name: 'Nagoya', country: 'Japan', region: 'Asia', code: 'NGO', timezone: 'Asia/Tokyo' },
  
  // Asia - China
  { name: 'Beijing', country: 'China', region: 'Asia', code: 'PEK', timezone: 'Asia/Shanghai' },
  { name: 'Shanghai', country: 'China', region: 'Asia', code: 'PVG', timezone: 'Asia/Shanghai' },
  { name: 'Hong Kong', country: 'Hong Kong', region: 'Asia', code: 'HKG', timezone: 'Asia/Hong_Kong' },
  { name: 'Shenzhen', country: 'China', region: 'Asia', code: 'SZX', timezone: 'Asia/Shanghai' },
  { name: 'Guangzhou', country: 'China', region: 'Asia', code: 'CAN', timezone: 'Asia/Shanghai' },
  
  // Asia - Southeast Asia
  { name: 'Singapore', country: 'Singapore', region: 'Asia', code: 'SIN', timezone: 'Asia/Singapore' },
  { name: 'Bangkok', country: 'Thailand', region: 'Asia', code: 'BKK', timezone: 'Asia/Bangkok' },
  { name: 'Kuala Lumpur', country: 'Malaysia', region: 'Asia', code: 'KUL', timezone: 'Asia/Kuala_Lumpur' },
  { name: 'Jakarta', country: 'Indonesia', region: 'Asia', code: 'CGK', timezone: 'Asia/Jakarta' },
  { name: 'Manila', country: 'Philippines', region: 'Asia', code: 'MNL', timezone: 'Asia/Manila' },
  { name: 'Ho Chi Minh City', country: 'Vietnam', region: 'Asia', code: 'SGN', timezone: 'Asia/Ho_Chi_Minh' },
  { name: 'Hanoi', country: 'Vietnam', region: 'Asia', code: 'HAN', timezone: 'Asia/Ho_Chi_Minh' },
  
  // Asia - India
  { name: 'Mumbai', country: 'India', region: 'Asia', code: 'BOM', timezone: 'Asia/Kolkata' },
  { name: 'New Delhi', country: 'India', region: 'Asia', code: 'DEL', timezone: 'Asia/Kolkata' },
  { name: 'Bangalore', country: 'India', region: 'Asia', code: 'BLR', timezone: 'Asia/Kolkata' },
  
  // Asia - Middle East
  { name: 'Dubai', country: 'UAE', region: 'Asia', code: 'DXB', timezone: 'Asia/Dubai' },
  { name: 'Abu Dhabi', country: 'UAE', region: 'Asia', code: 'AUH', timezone: 'Asia/Dubai' },
  { name: 'Doha', country: 'Qatar', region: 'Asia', code: 'DOH', timezone: 'Asia/Qatar' },
  
  // Europe - Western Europe
  { name: 'London', country: 'United Kingdom', region: 'Europe', code: 'LHR', timezone: 'Europe/London' },
  { name: 'Paris', country: 'France', region: 'Europe', code: 'CDG', timezone: 'Europe/Paris' },
  { name: 'Frankfurt', country: 'Germany', region: 'Europe', code: 'FRA', timezone: 'Europe/Berlin' },
  { name: 'Munich', country: 'Germany', region: 'Europe', code: 'MUC', timezone: 'Europe/Berlin' },
  { name: 'Amsterdam', country: 'Netherlands', region: 'Europe', code: 'AMS', timezone: 'Europe/Amsterdam' },
  { name: 'Zurich', country: 'Switzerland', region: 'Europe', code: 'ZUR', timezone: 'Europe/Zurich' },
  { name: 'Geneva', country: 'Switzerland', region: 'Europe', code: 'GVA', timezone: 'Europe/Zurich' },
  { name: 'Vienna', country: 'Austria', region: 'Europe', code: 'VIE', timezone: 'Europe/Vienna' },
  
  // Europe - Southern Europe
  { name: 'Rome', country: 'Italy', region: 'Europe', code: 'FCO', timezone: 'Europe/Rome' },
  { name: 'Milan', country: 'Italy', region: 'Europe', code: 'MXP', timezone: 'Europe/Rome' },
  { name: 'Madrid', country: 'Spain', region: 'Europe', code: 'MAD', timezone: 'Europe/Madrid' },
  { name: 'Barcelona', country: 'Spain', region: 'Europe', code: 'BCN', timezone: 'Europe/Madrid' },
  { name: 'Athens', country: 'Greece', region: 'Europe', code: 'ATH', timezone: 'Europe/Athens' },
  
  // Europe - Northern Europe
  { name: 'Stockholm', country: 'Sweden', region: 'Europe', code: 'ARN', timezone: 'Europe/Stockholm' },
  { name: 'Copenhagen', country: 'Denmark', region: 'Europe', code: 'CPH', timezone: 'Europe/Copenhagen' },
  { name: 'Oslo', country: 'Norway', region: 'Europe', code: 'OSL', timezone: 'Europe/Oslo' },
  { name: 'Helsinki', country: 'Finland', region: 'Europe', code: 'HEL', timezone: 'Europe/Helsinki' },
  
  // Europe - Eastern Europe
  { name: 'Moscow', country: 'Russia', region: 'Europe', code: 'SVO', timezone: 'Europe/Moscow' },
  { name: 'Warsaw', country: 'Poland', region: 'Europe', code: 'WAW', timezone: 'Europe/Warsaw' },
  { name: 'Prague', country: 'Czech Republic', region: 'Europe', code: 'PRG', timezone: 'Europe/Prague' },
  { name: 'Budapest', country: 'Hungary', region: 'Europe', code: 'BUD', timezone: 'Europe/Budapest' },
  
  // North America - USA
  { name: 'New York', country: 'United States', region: 'North America', code: 'JFK', timezone: 'America/New_York' },
  { name: 'Los Angeles', country: 'United States', region: 'North America', code: 'LAX', timezone: 'America/Los_Angeles' },
  { name: 'Chicago', country: 'United States', region: 'North America', code: 'ORD', timezone: 'America/Chicago' },
  { name: 'Miami', country: 'United States', region: 'North America', code: 'MIA', timezone: 'America/New_York' },
  { name: 'San Francisco', country: 'United States', region: 'North America', code: 'SFO', timezone: 'America/Los_Angeles' },
  { name: 'Las Vegas', country: 'United States', region: 'North America', code: 'LAS', timezone: 'America/Los_Angeles' },
  { name: 'Seattle', country: 'United States', region: 'North America', code: 'SEA', timezone: 'America/Los_Angeles' },
  { name: 'Boston', country: 'United States', region: 'North America', code: 'BOS', timezone: 'America/New_York' },
  { name: 'Washington DC', country: 'United States', region: 'North America', code: 'DCA', timezone: 'America/New_York' },
  { name: 'Atlanta', country: 'United States', region: 'North America', code: 'ATL', timezone: 'America/New_York' },
  
  // North America - Canada
  { name: 'Toronto', country: 'Canada', region: 'North America', code: 'YYZ', timezone: 'America/Toronto' },
  { name: 'Vancouver', country: 'Canada', region: 'North America', code: 'YVR', timezone: 'America/Vancouver' },
  { name: 'Montreal', country: 'Canada', region: 'North America', code: 'YUL', timezone: 'America/Montreal' },
  
  // South America
  { name: 'São Paulo', country: 'Brazil', region: 'South America', code: 'GRU', timezone: 'America/Sao_Paulo' },
  { name: 'Rio de Janeiro', country: 'Brazil', region: 'South America', code: 'GIG', timezone: 'America/Sao_Paulo' },
  { name: 'Buenos Aires', country: 'Argentina', region: 'South America', code: 'EZE', timezone: 'America/Argentina/Buenos_Aires' },
  { name: 'Lima', country: 'Peru', region: 'South America', code: 'LIM', timezone: 'America/Lima' },
  { name: 'Santiago', country: 'Chile', region: 'South America', code: 'SCL', timezone: 'America/Santiago' },
  { name: 'Bogotá', country: 'Colombia', region: 'South America', code: 'BOG', timezone: 'America/Bogota' },
  { name: 'Caracas', country: 'Venezuela', region: 'South America', code: 'CCS', timezone: 'America/Caracas' },
  
  // Africa
  { name: 'Cairo', country: 'Egypt', region: 'Africa', code: 'CAI', timezone: 'Africa/Cairo' },
  { name: 'Cape Town', country: 'South Africa', region: 'Africa', code: 'CPT', timezone: 'Africa/Johannesburg' },
  { name: 'Johannesburg', country: 'South Africa', region: 'Africa', code: 'JNB', timezone: 'Africa/Johannesburg' },
  { name: 'Lagos', country: 'Nigeria', region: 'Africa', code: 'LOS', timezone: 'Africa/Lagos' },
  
  // Oceania
  { name: 'Sydney', country: 'Australia', region: 'Oceania', code: 'SYD', timezone: 'Australia/Sydney' },
  { name: 'Melbourne', country: 'Australia', region: 'Oceania', code: 'MEL', timezone: 'Australia/Melbourne' },
  { name: 'Auckland', country: 'New Zealand', region: 'Oceania', code: 'AKL', timezone: 'Pacific/Auckland' },
]

export function searchCities(query: string): City[] {
  if (!query || query.length < 2) return []
  
  const normalizedQuery = query.toLowerCase().trim()
  
  return cities
    .filter(city => 
      city.name.toLowerCase().includes(normalizedQuery) ||
      city.country.toLowerCase().includes(normalizedQuery) ||
      city.code.toLowerCase().includes(normalizedQuery)
    )
    .sort((a, b) => {
      // Prioritize exact matches
      const aExact = a.name.toLowerCase().startsWith(normalizedQuery)
      const bExact = b.name.toLowerCase().startsWith(normalizedQuery)
      
      if (aExact && !bExact) return -1
      if (!aExact && bExact) return 1
      
      // Then sort alphabetically
      return a.name.localeCompare(b.name)
    })
    .slice(0, 8) // Limit to 8 results for clean UI
}

export function getCitiesByRegion(region: string): City[] {
  return cities.filter(city => city.region === region)
}

export function getAllRegions(): string[] {
  return [...new Set(cities.map(city => city.region))]
}
