# BizGO MMS/SMS Integration - Implementation Summary

## ✅ Completed Tasks

### 1. **Environment Configuration**
- ✅ Added `BIZGO_BASE_URL=https://mars.ibapi.kr/api/comm` to `.env`
- ✅ Verified `BIZGO_API_KEY=mars_ak_92fbaf90-13b0-4878-94c3-aac34bed54d0` is set

### 2. **SDK Authentication Fix**
**Problem**: The Infobank OMNI SDK expected `Bearer ${token}` format, but BizGO uses direct API key authentication.

**Solution**: Modified `/Users/kjyoo/Downloads/infobank-omni-sdk-js-main/src/services/send/Send.ts`

**Changes**:
```typescript
// Before (line 41):
'Authorization': `Bearer ${options.token}`

// After (line 37-39):
const authHeader = options.token.startsWith('mars_ak_') || options.token.startsWith('Bearer ')
  ? options.token  // Use direct API key or existing Bearer token
  : `Bearer ${options.token}`;  // Add Bearer prefix for standard tokens
```

### 3. **SDK Rebuild**
- ✅ Installed SDK dependencies: `npm install`
- ✅ Rebuilt SDK with fix: `npm run build`
- ✅ Reinstalled in main project to pick up changes

### 4. **Refactored Integration Layer**
**File**: `/Users/kjyoo/emptyleg/src/lib/infobank-omni.ts`

**Before**: Direct axios calls (bypassing SDK due to auth issues)
**After**: Proper SDK integration using builders

**Key Changes**:

#### MMS Sending (using SDK):
```typescript
// Initialize OMNI client
function getOMNIClient() {
  const options = new OMNIOptionsBuilder()
    .setBaseURL(process.env.BIZGO_BASE_URL)
    .setToken(process.env.BIZGO_API_KEY)  // Now supports BizGO format!
    .build();

  return new OMNI(options);
}

// Send MMS using SDK builders
export async function sendMMS(message: MMSMessage) {
  const omni = getOMNIClient();

  const mmsRequest = new MMSRequestBodyBuilder()
    .setFrom(message.from)
    .setTo(message.to)
    .setText(messageText)
    .setTitle(message.title)
    .setFileKey(message.fileKey)
    .build();

  const response = await omni.send?.MMS(mmsRequest);
  // ... handle response
}
```

#### SMS Sending (using SDK):
```typescript
export async function sendSMS(message: SMSMessage) {
  const omni = getOMNIClient();

  const smsRequest = new SMSRequestBodyBuilder()
    .setFrom(message.from)
    .setTo(message.to)
    .setText(messageText)
    .build();

  const response = await omni.send?.SMS(smsRequest);
  // ... handle response
}
```

## 🎯 Benefits of SDK Integration

### 1. **Type Safety**
- Full TypeScript support with proper interfaces
- Compile-time validation of message structure
- Auto-completion in IDE

### 2. **Maintainability**
- Uses official SDK maintained by Infobank
- Easier to update when API changes
- Standard builder pattern for clarity

### 3. **Error Handling**
- SDK includes built-in error handling
- Better error messages and logging
- Centralized error management

### 4. **Feature Support**
- Easy access to all BizGO features (MMS, SMS, OMNI, RCS, etc.)
- Simple to add new message types
- Supports file uploads, polling, webhooks, etc.

## 🔍 Testing

### Test Configuration
Run the test script to verify setup:
```bash
node test-mms.js
```

### Manual Testing via Admin Panel
1. Start the dev server: `npm run dev`
2. Navigate to: `http://localhost:3001/admin`
3. Login with admin credentials
4. Go to **MMS Messaging** tab
5. Select:
   - A flight (Korean routes only)
   - A message template
   - Flight details (times, aircraft info)
   - Recipients from user list
6. Click **Preview** to review message
7. Click **Send** to deliver MMS

### Expected Flow
```
User Action → Admin Panel → API Route → infobank-omni.ts → OMNI SDK → BizGO API
                                                ↓
                                          Success/Failure
```

## 📝 API Endpoints

### POST /api/send-mms-omni
**Purpose**: Send MMS/SMS messages to multiple recipients

**Request Body**:
```json
{
  "recipients": [
    {
      "phone": "01012345678",
      "name": "홍길동",
      "id": 1
    }
  ],
  "message": {
    "text": "메시지 내용",
    "title": "[본에어 Empty Leg 특가 안내]",
    "fileKeys": []
  },
  "from": "1600-9064",
  "flightId": "flight_123",
  "templateId": "empty-leg-special"
}
```

**Response** (Success):
```json
{
  "success": true,
  "message": "Messages sent successfully via BizGO API",
  "results": {
    "total": 1,
    "successful": 1,
    "failed": 0,
    "details": [...]
  }
}
```

## 🚀 Features

### 1. **Message Templates**
Three pre-configured templates:
- Empty Leg 특가 안내 (단일 노선)
- Empty Leg 특가 안내 (복수 노선)
- Empty Leg 왕복 패키지

### 2. **Dynamic Content**
Templates support variables:
- `{{date}}`, `{{route}}`, `{{departure_time}}`, etc.
- Auto-populated from flight data
- Customizable via dropdowns

### 3. **Recipient Management**
- Select individual users or all users
- Filter by active status
- Displays user info (name, phone, join date)

### 4. **Message Preview**
- Real-time preview with populated data
- Verify before sending
- Edit custom message content

## 📁 Modified Files

1. **`.env`**
   - Added `BIZGO_BASE_URL`

2. **`/Users/kjyoo/Downloads/infobank-omni-sdk-js-main/src/services/send/Send.ts`**
   - Updated authentication to support BizGO API key format

3. **`/Users/kjyoo/emptyleg/src/lib/infobank-omni.ts`**
   - Refactored from direct axios to SDK usage
   - Implemented proper builder pattern
   - Added SDK client initialization

4. **Created: `test-mms.js`**
   - Test script for verification

## 🔒 Security Notes

- API key stored in `.env` (not committed to git)
- Server-side only (Next.js API routes)
- Rate limiting: 100ms delay between messages
- Unsubscribe footer automatically added: `수신거부: 080-877-6077`

## 📊 Response Codes

### Success Codes
- `A000`: Success (both auth and message sending)

### Error Codes
- Check BizGO API documentation for full list
- Logged in console with details

## 🎓 SDK Documentation

For more information about the SDK features:
- **Local SDK Path**: `/Users/kjyoo/Downloads/infobank-omni-sdk-js-main`
- **README**: `/Users/kjyoo/Downloads/infobank-omni-sdk-js-main/README.md`
- **OMNI API Docs**: https://infobank-guide.gitbook.io/omni_api

## ✨ Next Steps

1. **Test with real phone number**
   - Modify `test-mms.js` with your number
   - Uncomment test code
   - Run: `node test-mms.js`

2. **Monitor in production**
   - Check logs for errors
   - Monitor delivery reports
   - Track success/failure rates

3. **Add features** (optional)
   - File attachments (image MMS)
   - Delivery reports UI
   - Message history
   - Scheduled sending

## 🐛 Troubleshooting

### Issue: "Cannot find module '@infobank/infobank-omni-sdk-js'"
**Solution**: Run `npm install` in project root

### Issue: "BIZGO_API_KEY is required"
**Solution**: Check `.env` file has `BIZGO_API_KEY` set

### Issue: Authentication failed
**Solution**: Verify API key is correct and SDK is rebuilt

### Issue: Message sending fails
**Solution**:
1. Check API key validity
2. Verify phone number format (10-11 digits, no hyphens)
3. Check BizGO account status/credits
4. Review error logs in console

## 📞 Support

For BizGO API issues, contact:
- **Email**: support@infobank.net
- **Documentation**: https://infobank-guide.gitbook.io/omni_api

---

**Implementation Date**: November 19, 2025
**Status**: ✅ Ready for Testing
**Developer**: Claude Code Assistant
