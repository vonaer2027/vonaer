// Direct BizGO API integration for MMS messaging (bypassing SDK due to auth format mismatch)
import axios from 'axios';

export interface MMSMessage {
  to: string;
  from: string;
  title?: string;
  text: string;
  fileKey?: string[];
}

export interface SMSMessage {
  to: string;
  from: string;
  text: string;
}

/**
 * Send MMS message using direct BizGO API
 */
export async function sendMMS(message: MMSMessage) {
  try {
    const baseURL = process.env.BIZGO_BASE_URL || 'https://mars.ibapi.kr/api/comm';
    const apiKey = process.env.BIZGO_API_KEY || '';

    if (!apiKey) {
      throw new Error('BIZGO_API_KEY is required');
    }

    // Always append unsubscribe footer for Empty Leg messages
    const unsubscribeFooter = '\n\n수신거부: 080-877-6077';
    const messageText = message.text + unsubscribeFooter;

    const requestBody = {
      messageFlow: [{
        mms: {
          from: message.from,
          text: messageText,
          title: message.title || '',
          fileKey: message.fileKey || [],
          ttl: "86400"
        }
      }],
      destinations: [{
        to: message.to
      }],
      ref: `mms_${Date.now()}`
    };

    const response = await axios.post(`${baseURL}/v1/send/omni`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey, // BizGO uses direct API key
        'Accept': 'application/json'
      }
    });

    if (response.data.common?.authCode === 'A000' && response.data.data?.code === 'A000') {
      return {
        success: true,
        data: response.data,
        messageKey: response.data.data?.destinations?.[0]?.msgKey
      };
    } else {
      return {
        success: false,
        error: response.data.data?.result || response.data.common?.authResult || 'Unknown API error'
      };
    }
  } catch (error: any) {
    console.error('BizGO MMS Error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Unknown error'
    };
  }
}

/**
 * Send SMS message using direct BizGO API
 */
export async function sendSMS(message: SMSMessage) {
  try {
    const baseURL = process.env.BIZGO_BASE_URL || 'https://mars.ibapi.kr/api/comm';
    const apiKey = process.env.BIZGO_API_KEY || '';

    if (!apiKey) {
      throw new Error('BIZGO_API_KEY is required');
    }

    // Always append unsubscribe footer for Empty Leg messages
    const unsubscribeFooter = '\n\n수신거부: 080-877-6077';
    const messageText = message.text + unsubscribeFooter;

    const requestBody = {
      messageFlow: [{
        sms: {
          from: message.from,
          text: messageText,
          ttl: "86400"
        }
      }],
      destinations: [{
        to: message.to
      }],
      ref: `sms_${Date.now()}`
    };

    const response = await axios.post(`${baseURL}/v1/send/omni`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
        'Accept': 'application/json'
      }
    });

    if (response.data.common?.authCode === 'A000' && response.data.data?.code === 'A000') {
      return {
        success: true,
        data: response.data,
        messageKey: response.data.data?.destinations?.[0]?.msgKey
      };
    } else {
      return {
        success: false,
        error: response.data.data?.result || response.data.common?.authResult || 'Unknown API error'
      };
    }
  } catch (error: any) {
    console.error('BizGO SMS Error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Unknown error'
    };
  }
}

/**
 * Send bulk messages to multiple recipients
 */
export async function sendBulkMessages(messages: (MMSMessage | SMSMessage)[], type: 'mms' | 'sms' = 'mms') {
  const results = [];
  
  for (const message of messages) {
    try {
      const result = type === 'mms' 
        ? await sendMMS(message as MMSMessage)
        : await sendSMS(message as SMSMessage);
      
      results.push({
        to: message.to,
        ...result
      });
      
      // Add small delay between messages to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      results.push({
        to: message.to,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
  
  return results;
}

/**
 * Get message delivery report using direct BizGO API
 */
export async function getMessageReport(messageKey: string) {
  try {
    const baseURL = process.env.BIZGO_BASE_URL || 'https://mars.ibapi.kr/api/comm';
    const apiKey = process.env.BIZGO_API_KEY || '';
    
    if (!apiKey) {
      throw new Error('BIZGO_API_KEY is required');
    }

    const requestBody = {
      msgKeys: [messageKey]
    };

    const response = await axios.post(`${baseURL}/v1/report/polling`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
        'Accept': 'application/json'
      }
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    console.error('BizGO Report Error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Unknown error'
    };
  }
}
