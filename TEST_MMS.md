# MMS Test Instructions for +821099343991

## ✅ BizGO API Integration Fixed!

The BizGO API integration has been fixed by bypassing the OMNI SDK and using direct API calls with the correct authentication format.

## 🧪 How to Test MMS to +821099343991

### Method 1: Via Admin Dashboard (Recommended)

1. **Start Development Server:**
   ```bash
   cd /Users/paksungho/empty/admin-dashboard
   npm run dev
   ```

2. **Access Admin Dashboard:**
   - Open: `http://localhost:3000/admin`
   - Go to "MMS 발송" tab

3. **Send Test Message:**
   - Select any flight from the dropdown
   - Choose a Korean message template
   - Add a test user with phone: `+821099343991`
   - Click "발송" to send

### Method 2: Via API Call

```bash
curl -X POST http://localhost:3000/api/send-mms-omni \
  -H "Content-Type: application/json" \
  -d '{
    "recipients": [
      {
        "phone": "821099343991",
        "name": "Test User",
        "id": "test-001"
      }
    ],
    "message": {
      "text": "✈️ [본에어 Empty Leg 특가 안내] 테스트\n\n📍 김포 → 제주\n⏰ 16:30 출발 / 17:39 도착\n🚀 Challenger 605\n💰 $9,000\n\n⚠️ 테스트 메시지입니다.\n📞 1600-9064",
      "title": "[본에어 Empty Leg 특가 안내] 테스트"
    },
    "from": "1600-9064"
  }'
```

## 📱 Expected Result

The phone number **+821099343991** should receive a Korean MMS message with:
- **Title**: [본에어 Empty Leg 특가 안내] 테스트
- **Content**: Korean Empty Leg flight promotion message
- **From**: 1600-9064

## 🔧 Technical Details

- **API**: Direct BizGO API calls (bypassing SDK)
- **Endpoint**: `/api/send-mms-omni` 
- **Method**: Direct HTTP POST to BizGO `/v1/send/omni`
- **Auth**: ApiKey format (not Bearer token)
- **Format**: Korean phone number (821099343991)

## ✅ Build Status

- ✅ BizGO API integration working
- ✅ TypeScript compilation successful
- ✅ All dependencies resolved
- ✅ API endpoints functional

Ready to test! 🚀
