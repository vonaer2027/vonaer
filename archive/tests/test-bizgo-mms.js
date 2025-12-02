#!/usr/bin/env node

/**
 * Comprehensive Bizgo MMS Testing Script
 * Tests the Bizgo API integration to identify issues
 */

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`),
  section: (msg) => console.log(`\n${colors.magenta}═══ ${msg} ═══${colors.reset}\n`)
};

// Configuration
const BIZGO_API_KEY = process.env.BIZGO_API_KEY;
const BIZGO_BASE_URL = process.env.BIZGO_BASE_URL || 'https://mars.ibapi.kr/api/comm';
const TEST_PHONE = '821099343991'; // From TEST_MMS.md

async function testEnvironmentVariables() {
  log.section('Environment Variables Check');

  log.info('Checking BIZGO_API_KEY...');
  if (BIZGO_API_KEY) {
    log.success(`BIZGO_API_KEY is set: ${BIZGO_API_KEY.substring(0, 20)}...`);
  } else {
    log.error('BIZGO_API_KEY is NOT set!');
    return false;
  }

  log.info('Checking BIZGO_BASE_URL...');
  log.success(`BIZGO_BASE_URL: ${BIZGO_BASE_URL}`);

  return true;
}

async function testDirectBizgoAPI() {
  log.section('Direct Bizgo API Test');

  const requestBody = {
    messageFlow: [{
      mms: {
        from: '1600-9064',
        text: '✈️ [본에어 Empty Leg 특가 안내] 테스트\n\n📍 김포 → 제주\n⏰ 16:30 출발 / 17:39 도착\n🚀 Challenger 605\n💰 $9,000\n\n⚠️ 테스트 메시지입니다.\n📞 1600-9064\n\n수신거부: 080-877-6077',
        title: '[본에어 Empty Leg 특가 안내] 테스트',
        fileKey: [],
        ttl: "86400"
      }
    }],
    destinations: [{
      to: TEST_PHONE
    }],
    ref: `test_mms_${Date.now()}`
  };

  log.info('Sending request to Bizgo API...');
  log.info(`Endpoint: ${BIZGO_BASE_URL}/v1/send/omni`);
  log.info(`Phone: ${TEST_PHONE}`);
  log.info(`From: 1600-9064`);

  try {
    const response = await axios.post(`${BIZGO_BASE_URL}/v1/send/omni`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': BIZGO_API_KEY,
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    log.success('API Response received!');
    console.log(JSON.stringify(response.data, null, 2));

    // Check response codes
    if (response.data.common?.authCode === 'A000' && response.data.data?.code === 'A000') {
      log.success('✓✓✓ MMS SENT SUCCESSFULLY! ✓✓✓');
      log.success(`Message Key: ${response.data.data?.destinations?.[0]?.msgKey}`);
      return true;
    } else {
      log.error('API returned error codes:');
      log.error(`Auth Code: ${response.data.common?.authCode}`);
      log.error(`Data Code: ${response.data.data?.code}`);
      log.error(`Message: ${response.data.data?.result || response.data.common?.authResult}`);
      return false;
    }
  } catch (error) {
    log.error('Failed to send MMS via direct API!');
    if (error.response) {
      log.error(`Status: ${error.response.status}`);
      log.error(`Response:`, JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      log.error('No response received from server');
      log.error(`Request error: ${error.message}`);
    } else {
      log.error(`Error: ${error.message}`);
    }
    return false;
  }
}

async function testLocalAPIEndpoint() {
  log.section('Local API Endpoint Test (/api/send-mms-omni)');

  const requestBody = {
    recipients: [
      {
        phone: TEST_PHONE,
        name: 'Test User',
        id: 'test-001'
      }
    ],
    message: {
      text: '✈️ [본에어 Empty Leg 특가 안내] 로컬 API 테스트\n\n📍 김포 → 제주\n⏰ 16:30 출발 / 17:39 도착\n🚀 Challenger 605\n💰 $9,000\n\n⚠️ 로컬 API 테스트 메시지입니다.\n📞 1600-9064',
      title: '[본에어 Empty Leg 특가 안내] 테스트'
    },
    from: '1600-9064'
  };

  log.info('Sending request to local API...');
  log.info('Endpoint: http://localhost:3001/api/send-mms-omni');

  try {
    const response = await axios.post('http://localhost:3001/api/send-mms-omni', requestBody, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 15000
    });

    log.success('Local API Response received!');
    console.log(JSON.stringify(response.data, null, 2));

    if (response.data.success) {
      log.success('✓✓✓ LOCAL API TEST PASSED! ✓✓✓');
      return true;
    } else {
      log.error('Local API returned error:');
      log.error(response.data.error || response.data.details);
      return false;
    }
  } catch (error) {
    log.error('Failed to send MMS via local API!');
    if (error.response) {
      log.error(`Status: ${error.response.status}`);
      log.error(`Response:`, JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      log.error('No response received from server');
      log.error(`Request error: ${error.message}`);
      log.warning('Is the dev server running on port 3001?');
    } else {
      log.error(`Error: ${error.message}`);
    }
    return false;
  }
}

async function testAPIKeyValidity() {
  log.section('API Key Validity Test');

  // Test with a minimal request to check if API key is valid
  const testRequest = {
    messageFlow: [{
      sms: {
        from: '1600-9064',
        text: 'Test',
        ttl: "86400"
      }
    }],
    destinations: [{
      to: '821000000000' // Fake number for key validation
    }],
    ref: `key_test_${Date.now()}`
  };

  try {
    const response = await axios.post(`${BIZGO_BASE_URL}/v1/send/omni`, testRequest, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': BIZGO_API_KEY,
        'Accept': 'application/json'
      },
      timeout: 5000
    });

    // Check auth code
    if (response.data.common?.authCode === 'A000') {
      log.success('API Key is VALID!');
      return true;
    } else if (response.data.common?.authCode) {
      log.error(`API Key validation failed: ${response.data.common.authCode}`);
      log.error(`Message: ${response.data.common.authResult}`);
      return false;
    }
  } catch (error) {
    if (error.response?.data?.common?.authCode === 'A001') {
      log.error('API Key is INVALID or UNAUTHORIZED!');
      log.error(`Auth Result: ${error.response.data.common.authResult}`);
      return false;
    } else if (error.response) {
      log.warning('Unexpected response during key validation');
      log.info(`Status: ${error.response.status}`);
      // If we get here, key might be valid but request was malformed
      return true;
    }
  }

  return false;
}

async function runAllTests() {
  console.clear();
  log.section('BIZGO MMS COMPREHENSIVE TEST SUITE');
  log.info('Testing Bizgo API integration to identify issues\n');

  const results = {
    env: false,
    keyValid: false,
    directAPI: false,
    localAPI: false
  };

  // Test 1: Environment Variables
  results.env = await testEnvironmentVariables();
  if (!results.env) {
    log.error('\n❌ Environment variables not configured properly!');
    log.info('Please set BIZGO_API_KEY in .env.local file');
    return;
  }

  // Test 2: API Key Validity
  results.keyValid = await testAPIKeyValidity();
  if (!results.keyValid) {
    log.error('\n❌ API Key validation failed!');
    log.info('Please check if the BIZGO_API_KEY is correct and active');
    return;
  }

  // Test 3: Direct API Call
  results.directAPI = await testDirectBizgoAPI();

  // Test 4: Local API Endpoint
  results.localAPI = await testLocalAPIEndpoint();

  // Final Summary
  log.section('TEST SUMMARY');
  console.log(`Environment Variables: ${results.env ? '✅' : '❌'}`);
  console.log(`API Key Validation:    ${results.keyValid ? '✅' : '❌'}`);
  console.log(`Direct Bizgo API:      ${results.directAPI ? '✅' : '❌'}`);
  console.log(`Local API Endpoint:    ${results.localAPI ? '✅' : '❌'}`);

  if (results.directAPI && results.localAPI) {
    log.success('\n✅✅✅ ALL TESTS PASSED! MMS system is working correctly! ✅✅✅');
  } else if (results.directAPI && !results.localAPI) {
    log.warning('\n⚠️ Direct API works but local endpoint fails');
    log.info('Issue is likely in the Next.js API route or library code');
  } else if (!results.directAPI) {
    log.error('\n❌ Direct API call failed');
    log.info('Issue is with Bizgo API configuration or credentials');
  }
}

// Run the tests
runAllTests().catch(error => {
  log.error('Unexpected error during test execution:');
  console.error(error);
  process.exit(1);
});
