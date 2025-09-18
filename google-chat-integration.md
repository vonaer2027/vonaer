# Google Chat Integration for VONAER Booking Notifications

## Overview
When a customer submits a booking request through the VONAER empty leg platform, an automatic notification is sent to a Google Chat space to alert the team immediately.

## Features
- **Real-time Notifications**: Instant alerts when new booking requests are submitted
- **Comprehensive Information**: Includes customer details, flight information, and booking context
- **Korean Language Support**: All notifications are in Korean for the Korean market
- **Error Handling**: Robust error handling ensures booking requests succeed even if notifications fail
- **Test Function**: Built-in webhook testing capability

## Notification Content
Each notification includes:
- 👤 **Customer Information**:
  - Name (이름)
  - Phone number (전화번호)
  - Email address (이메일) - if provided
  - Privacy consent status (개인정보 동의)

- ✈️ **Flight Information**:
  - Flight ID (항공편 ID)
  - Aircraft type (항공기)
  - Route (노선): Origin → Destination
  - Flight date (날짜)
  - Price (가격)

- 📅 **Request timestamp** (요청 시간)
- ⚡ **Call-to-action** to contact customer immediately

## Configuration

### Environment Variables
Add to your `.env.local` file:
```env
NEXT_PUBLIC_GOOGLE_CHAT_WEBHOOK_URL=https://chat.googleapis.com/v1/spaces/AAQAx5xO6FY/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=hWcSRLTVCNGvw4_PHrAW3wXJqjaJmKUXW2jvXupKXtA
```

### Current Webhook URL
The webhook is currently configured to send to:
`https://chat.googleapis.com/v1/spaces/AAQAx5xO6FY/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=hWcSRLTVCNGvw4_PHrAW3wXJqjaJmKUXW2jvXupKXtA`

## Testing
You can test the webhook integration by calling:
```javascript
import { bookingRequestService } from '@/lib/supabase'

// Test the webhook
await bookingRequestService.testGoogleChatWebhook()
```

## Implementation Details
- Notifications are sent asynchronously after booking request creation
- If notification fails, the booking request still succeeds (non-blocking)
- Flight details are fetched and included when available
- All timestamps use Korean locale formatting
- Error handling with detailed logging for troubleshooting

## Error Handling
- Network failures are logged but don't prevent booking creation
- Invalid webhook URLs are caught and logged
- Missing flight details are handled gracefully
- All errors are logged to console for debugging

## Security
- Webhook URL can be configured via environment variables
- Sensitive information is not exposed in client-side code
- Error messages don't leak sensitive details

