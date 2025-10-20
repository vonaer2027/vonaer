#!/usr/bin/env node

// Test without specifying from number
const testMMS = async () => {
  try {
    console.log('🧪 Testing without from number...');
    
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
          text: 'Test message without from number',
          title: 'No From Test'
        }
        // No 'from' field specified
      })
    });

    const result = await response.json();
    console.log('📱 Result:', JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.log(`🚨 ERROR: ${error.message}`);
  }
};

testMMS();


