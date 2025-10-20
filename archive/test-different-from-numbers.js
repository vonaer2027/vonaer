#!/usr/bin/env node

// Test different from numbers to see if any work without registration
const testNumbers = [
  '15005550006', // Common test number
  '15005550001', // Another test number
  '01012345678', // Korean format
  '0000000000',  // Zeros
  '1111111111',  // Ones
  '',            // Empty string
  'TEST',        // Text
];

const testMMS = async (fromNumber) => {
  try {
    console.log(`🧪 Testing with from number: "${fromNumber}"`);
    
    const response = await fetch('http://localhost:3000/api/send-mms-omni', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipients: [
          {
            phone: '821099343991',
            name: 'Test User',
            id: 'test-001'
          }
        ],
        message: {
          text: `Test message with from: ${fromNumber}`,
          title: 'From Number Test'
        },
        from: fromNumber
      })
    });

    const result = await response.json();
    
    if (result.success && result.results.details[0].success) {
      const msgResult = result.results.details[0].data.data.data.destinations[0];
      console.log(`✅ SUCCESS with "${fromNumber}": ${msgResult.code} - ${msgResult.result}`);
      return true;
    } else {
      const msgResult = result.results.details[0].data.data.data.destinations[0];
      console.log(`❌ FAILED with "${fromNumber}": ${msgResult.code} - ${msgResult.result}`);
      return false;
    }
    
  } catch (error) {
    console.log(`🚨 ERROR with "${fromNumber}": ${error.message}`);
    return false;
  }
};

const runTests = async () => {
  console.log('🧪 Testing different from numbers...\n');
  
  for (const number of testNumbers) {
    const success = await testMMS(number);
    if (success) {
      console.log(`\n🎉 Found working from number: "${number}"`);
      break;
    }
    console.log(''); // Empty line between tests
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n✅ Test completed!');
};

runTests();


