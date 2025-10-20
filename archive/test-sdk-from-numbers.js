#!/usr/bin/env node

// Test with SDK example from numbers
const testNumbers = [
  '0310000000', // Used in SDK examples (line 188, 197, 245, 285, 316)
  '0316281500', // Used in SDK examples (line 279)
];

const testMMS = async (fromNumber) => {
  try {
    console.log(`🧪 Testing with SDK example from number: "${fromNumber}"`);
    
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
          text: `✈️ SDK 테스트 메시지\n\nFrom: ${fromNumber}\n\n📞 본에어`,
          title: 'SDK From Number Test'
        },
        from: fromNumber
      })
    });

    const result = await response.json();
    
    if (result.success && result.results.details[0].success) {
      const msgResult = result.results.details[0].data.data.data.destinations[0];
      console.log(`📱 Result: ${msgResult.code} - ${msgResult.result}`);
      
      if (msgResult.code === 'A000') {
        console.log(`🎉 SUCCESS! "${fromNumber}" works for testing!`);
        return true;
      } else {
        console.log(`⚠️  "${fromNumber}": ${msgResult.result}`);
        return false;
      }
    } else {
      console.log(`❌ API Error with "${fromNumber}"`);
      return false;
    }
    
  } catch (error) {
    console.log(`🚨 ERROR with "${fromNumber}": ${error.message}`);
    return false;
  }
};

const runTests = async () => {
  console.log('🧪 Testing SDK example from numbers...\n');
  
  for (const number of testNumbers) {
    const success = await testMMS(number);
    if (success) {
      console.log(`\n✅ Found working SDK from number: "${number}"`);
      console.log('🎉 You can use this number for testing without registration!');
      break;
    }
    console.log(''); // Empty line between tests
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📋 Test completed!');
};

runTests();


