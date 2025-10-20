// Simple test script to verify the scraper API endpoint
const fetch = require('node-fetch');

async function testScraperEndpoint() {
  try {
    console.log('🧪 Testing scraper API endpoint...');
    
    // Test GET endpoint first
    console.log('📡 Testing GET /api/scrape-flights...');
    const getResponse = await fetch('http://localhost:3000/api/scrape-flights');
    const getResult = await getResponse.json();
    
    console.log('✅ GET Response:', getResult);
    
    // Note: We won't test POST in this script as it would actually run the scraper
    // which takes several minutes and uses browser resources
    
    console.log('\n📋 To test the full scraping functionality:');
    console.log('1. Start the development server: npm run dev');
    console.log('2. Go to http://localhost:3000/admin');
    console.log('3. Navigate to the Settings tab');
    console.log('4. Click "Start Scraping" in the Flight Scraper component');
    console.log('\n⚠️  Note: Full scraping takes 2-5 minutes and requires a stable internet connection');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure the development server is running: npm run dev');
  }
}

if (require.main === module) {
  testScraperEndpoint();
}

module.exports = { testScraperEndpoint };

