// BizGO MMS/SMS integration using Infobank OMNI SDK
import { OMNI, OMNIOptionsBuilder, MMSRequestBodyBuilder, SMSRequestBodyBuilder } from '@infobank/infobank-omni-sdk-js';

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
 * Initialize OMNI SDK with BizGO API credentials
 */
function getOMNIClient() {
  const baseURL = process.env.BIZGO_BASE_URL || 'https://mars.ibapi.kr/api/comm';
  const apiKey = process.env.BIZGO_API_KEY || '';

  if (!apiKey) {
    throw new Error('BIZGO_API_KEY is required');
  }

  const options = new OMNIOptionsBuilder()
    .setBaseURL(baseURL)
    .setToken(apiKey)  // SDK now supports BizGO API key format
    .build();

  return new OMNI(options);
}

/**
 * Send MMS message using OMNI SDK (via OMNI endpoint for better routing)
 */
export async function sendMMS(message: MMSMessage) {
  try {
    const omni = getOMNIClient();

    // Only append unsubscribe footer if not already present
    const unsubscribeFooter = '수신거부: 080-877-6077';
    const messageText = message.text.includes(unsubscribeFooter)
      ? message.text
      : message.text + '\n\n' + unsubscribeFooter;

    // Remove title from message text if it's already included
    const defaultTitle = '[본에어 Empty Leg 특가 안내]';
    const cleanedText = messageText.startsWith(defaultTitle)
      ? messageText.substring(defaultTitle.length).trim()
      : messageText;

    // Build OMNI request (better routing than direct MMS endpoint)
    const omniRequest = {
      messageFlow: [{
        mms: {
          from: message.from,
          text: cleanedText,
          title: message.title || defaultTitle,
          fileKey: message.fileKey || [],
          ttl: "86400"
        }
      }],
      destinations: [{
        to: message.to
      }],
      ref: `mms_${Date.now()}`
    };

    const response = await omni.send?.OMNI(omniRequest) as any;

    if (response?.common?.authCode === 'A000' && response?.data?.code === 'A000') {
      return {
        success: true,
        data: response,
        messageKey: response.data?.msgKey
      };
    } else {
      return {
        success: false,
        error: response?.data?.result || response?.common?.authResult || 'Unknown API error'
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
 * Send SMS message using OMNI SDK (via OMNI endpoint for better routing)
 */
export async function sendSMS(message: SMSMessage) {
  try {
    const omni = getOMNIClient();

    // Only append unsubscribe footer if not already present
    const unsubscribeFooter = '수신거부: 080-877-6077';
    const messageText = message.text.includes(unsubscribeFooter)
      ? message.text
      : message.text + '\n\n' + unsubscribeFooter;

    // Build OMNI request (better routing than direct SMS endpoint)
    const omniRequest = {
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

    const response = await omni.send?.OMNI(omniRequest) as any;

    if (response?.common?.authCode === 'A000' && response?.data?.code === 'A000') {
      return {
        success: true,
        data: response,
        messageKey: response.data?.msgKey
      };
    } else {
      return {
        success: false,
        error: response?.data?.result || response?.common?.authResult || 'Unknown API error'
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
 * Get message delivery report using OMNI SDK
 */
export async function getMessageReport(messageKey: string) {
  try {
    const omni = getOMNIClient();

    const response = await omni.polling?.getReport();

    return {
      success: true,
      data: response
    };
  } catch (error: any) {
    console.error('BizGO Report Error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Unknown error'
    };
  }
}
