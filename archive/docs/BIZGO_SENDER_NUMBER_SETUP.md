# BizGO Sender Number Setup Guide

## ⚠️ Current Error
**Error Code**: 23015
**Message**: 전송 경로 없음 (No transmission path)
**Cause**: Sender number `1600-9064` is not registered in your BizGO account

---

## ✅ Solution: Register Sender Number

### Step 1: Login to BizGO Dashboard
1. Go to BizGO admin portal
2. Login with your credentials (min@_om_w1tt3819)

### Step 2: Find Registered Senders
Look for one of these menu options:
- **발신번호 관리** (Sender Number Management)
- **Settings** → **Sender Numbers**
- **발신번호** or **Sender ID**

### Step 3: Check Current Numbers
- See what sender numbers are already registered
- Status should be "승인됨" (Approved) or "사용가능" (Available)

### Step 4A: Register New Number (1600-9064)
If `1600-9064` is not in the list:

1. Click **"발신번호 추가"** (Add Sender Number)
2. Enter: `1600-9064`
3. Select verification method:
   - 📞 Phone call verification
   - 📱 SMS verification
   - 📄 Document verification (business registration)
4. Complete verification process
5. Wait for approval (can take minutes to 24 hours)

### Step 4B: Use Existing Number
If you already have approved numbers:

1. Note the approved number (e.g., `010-1234-5678`)
2. Update the code to use it (see below)

---

## 🔧 Update Code with Your Number

### If you have a different registered number:

**Edit**: `/src/app/api/send-mms-omni/route.ts`

**Change line 9** from:
```typescript
const { recipients, message, from = '1600-9064' } = body
```

**To** (using your registered number):
```typescript
const { recipients, message, from = '010-1234-5678' } = body  // Replace with YOUR number
```

### Example with different formats:
```typescript
// Without hyphens
const { recipients, message, from = '01012345678' } = body

// With hyphens (BizGO accepts both)
const { recipients, message, from = '010-1234-5678' } = body

// Business number
const { recipients, message, from = '1600-9064' } = body
```

---

## 📋 Verification Checklist

After registering/updating:

- [ ] Sender number appears in BizGO dashboard
- [ ] Status is "승인됨" (Approved) or "Active"
- [ ] Number matches format in code
- [ ] Code updated with correct number
- [ ] Server restarted (if needed)

---

## 🧪 Test Again

Once registered and code updated:

1. **Restart dev server**:
   ```bash
   # Kill current server
   lsof -ti:3001 | xargs kill -9

   # Start fresh
   npm run dev
   ```

2. **Send test message**:
   - Go to: http://localhost:3001/admin
   - Click **MMS Messaging** tab
   - Select flight, template, recipients
   - Click **Send**

3. **Check result**:
   - ✅ Success: 발송 완료 (Send completed)
   - ❌ Fail: Check error code and message

---

## 🔍 Common BizGO Error Codes

| Code | Korean | English | Solution |
|------|--------|---------|----------|
| 23015 | 전송 경로 없음 | No transmission path | Register sender number |
| 23001 | 발신번호 미등록 | Sender not registered | Add number to BizGO |
| 23002 | 수신번호 오류 | Invalid recipient | Check phone format |
| 23003 | 잔액 부족 | Insufficient balance | Add BizGO credits |
| A000 | 성공 | Success | Message sent! |

---

## 💡 Tips

### Phone Number Formats
BizGO accepts multiple formats:
- `01012345678` (11 digits, no hyphens)
- `010-1234-5678` (with hyphens)
- `16009064` (business number, no hyphens)
- `1600-9064` (business number, with hyphens)

### International Format
For Korea numbers:
- `821012345678` (with country code)
- `+821012345678` (with + prefix)

### Best Practices
1. **Use business number** for professional appearance
2. **Keep consistent format** throughout code
3. **Document which number** is used in each environment
4. **Test with your own number** first

---

## 📞 Need Help?

### BizGO Support
- **Email**: support@infobank.net
- **Request**: Sender number registration assistance
- **Provide**:
  - Your account ID (min@_om_w1tt3819)
  - Number to register (1600-9064)
  - Business registration docs (if needed)

### Quick Self-Check
```bash
# Check your current default sender in code
grep -n "from = " src/app/api/send-mms-omni/route.ts

# Result should show:
# 9:    const { recipients, message, from = 'YOUR-NUMBER' } = body
```

---

## ✅ Success Criteria

You'll know it's working when:
1. ✅ No error code 23015
2. ✅ Status shows "발송 완료" (Send completed)
3. ✅ Message appears in BizGO sent history
4. ✅ Recipient receives the message

---

**Next Steps**:
1. Check BizGO dashboard for registered numbers
2. Either register `1600-9064` OR use existing number
3. Update code if using different number
4. Test send again
5. Check for "발송 완료" success status

**Remember**: The integration is working correctly - you just need to use a registered sender number! ✅
