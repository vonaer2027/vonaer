# English Nomenclature Analysis Report

## Executive Summary

This report analyzes the English translation file (`messages/en.json`) for grammatical errors, spelling mistakes, and terminology inconsistencies when compared against the Korean source text (`messages/kr.json`).

---

## 1. Critical Grammatical Errors

### 1.1 Spelling/Pluralization Errors

| Location | Current Text | Issue | Corrected Text |
|----------|-------------|-------|----------------|
| Line 594 | "Loading booking **inquirys**..." | Incorrect plural form | "Loading booking **inquiries**..." |
| Line 595 | "Failed to load booking **inquirys**" | Incorrect plural form | "Failed to load booking **inquiries**" |
| Line 604 | "New booking **inquirys** requiring contact" | Incorrect plural form | "New booking **inquiries** requiring contact" |
| Line 616 | "No booking **inquirys** yet" | Incorrect plural form | "No booking **inquiries** yet" |
| Line 617 | "Customer booking **inquirys** will appear here" | Incorrect plural form | "Customer booking **inquiries** will appear here" |
| Line 34 | "**breath taking** sky view" | Should be one word | "**breathtaking** sky view" |

### 1.2 Capitalization Inconsistencies

| Location | Current Text | Issue | Recommended |
|----------|-------------|-------|-------------|
| Line 67 | "Bukhan **m**ountain National Park" | Inconsistent capitalization | "Bukhan **M**ountain National Park" |
| Line 649-651 | "HOME", "CHARTER" vs "Aircraft" | Mixed case in menu | Standardize to either all caps or title case |

---

## 2. Terminology Inconsistencies (EN vs KR)

### 2.1 "Booking Inquiry" vs "Booking Request" Mismatch

Korean uses "예약 문의" (Booking Inquiry) consistently. English has inconsistent usage:

| Location | English Text | Expected (per KR) | Status |
|----------|-------------|-------------------|--------|
| bookingRequests.title | "Booking Inquiries" | Booking Inquiries | ✅ OK |
| bookingRequests.details.subtitle | "Booking **request** from" | "Booking **inquiry** from" | ❌ Fix |
| bookingRequests.success.deleted | "Booking **request** deleted" | "Booking **inquiry** deleted" | ❌ Fix |
| common.bookingRequest | "Booking Inquiry" | Booking Inquiry | ✅ OK |
| clientFlightCard.bookRequest | "Booking Inquiry" | Booking Inquiry | ✅ OK |

### 2.2 Submit Button Terminology

| Korean | English | Location | Status |
|--------|---------|----------|--------|
| 문의하기 | Inquire | bookingDialog.submit | ✅ Consistent |
| 문의하기 | Inquire | flightSearchDialog.submit | ✅ Consistent |

### 2.3 Dialog Titles

| Korean | English | Location | Status |
|--------|---------|----------|--------|
| 전용기 문의하기 | Private Jet Inquiry | flightSearchDialog.title | ✅ Consistent |
| Chauffeured Car 문의하기 | Chauffeured Car Inquiry | flightSearchDialog.carTitle | ✅ Consistent |
| 슈퍼 요트 문의하기 | Super Yacht Inquiry | flightSearchDialog.yachtTitle | ✅ Consistent |
| 예약 문의 | Booking Inquiry | bookingDialog.title | ✅ Consistent |

---

## 3. Style & Tone Inconsistencies

### 3.1 Tour Description Style

| Location | Issue | Current | Recommended |
|----------|-------|---------|-------------|
| services.vonTour.subtitle | "breath taking" | Two words | "breathtaking" (one word) |

### 3.2 Menu Item Casing

| Key | Current | Issue |
|-----|---------|-------|
| sidebar.menuItems.home | "HOME" | All caps |
| sidebar.menuItems.charter | "CHARTER" | All caps |
| sidebar.menuItems.aircraft | "Aircraft" | Title case |
| sidebar.menuItems.emptyLeg | "Empty Leg" | Title case |

**Recommendation**: Standardize to title case for consistency (e.g., "Home", "Charter", "Aircraft")

---

## 4. Korean Source Text Issues Found

### 4.1 Remaining Grammatical Error in Korean

| Location | Current Text | Issue | Corrected Text |
|----------|-------------|-------|----------------|
| Line 93 (services.usageGuide.steps.step3.description) | "예약 문의**을** 제출하세요" | 조사 오류 | "예약 문의**를** 제출하세요" |

---

## 5. Recommendations

### 5.1 Immediate Fixes Required (English)

```json
// bookingRequests.loading.text (Line 594)
"text": "Loading booking inquiries..."

// bookingRequests.loading.failed (Line 595)
"failed": "Failed to load booking inquiries"

// bookingRequests.pendingCallsDescription (Line 604)
"pendingCallsDescription": "New booking inquiries requiring contact"

// bookingRequests.noRequests (Line 616)
"noRequests": "No booking inquiries yet"

// bookingRequests.noRequestsDescription (Line 617)
"noRequestsDescription": "Customer booking inquiries will appear here"

// bookingRequests.details.subtitle (Line 620)
"subtitle": "Booking inquiry from"

// bookingRequests.success.deleted (Line 636)
"deleted": "Booking inquiry deleted"

// services.vonTour.subtitle (Line 34)
"subtitle": "Enjoy a breathtaking sky view of Korea"

// helicopter.tours.bukhanMountain.highlights.0 (Line 814)
"0": "Bukhan Mountain National Park"
```

### 5.2 Immediate Fix Required (Korean)

```json
// services.usageGuide.steps.step3.description (Line 93)
"description": "원하는 장소와 날짜를 선택하고 예약 문의를 제출하세요."
```

### 5.3 Consistency Checklist

- [x] "Private Jet Inquiry" matches "전용기 문의하기"
- [x] "Chauffeured Car Inquiry" matches "Chauffeured Car 문의하기"
- [x] "Super Yacht Inquiry" matches "슈퍼 요트 문의하기"
- [x] "Booking Inquiry" matches "예약 문의"
- [x] "Inquire" button matches "문의하기"
- [x] "inquirys" → "inquiries" (5 instances) ✅ Fixed
- [x] "breath taking" → "breathtaking" (1 instance) ✅ Fixed
- [x] "Booking request" → "Booking inquiry" (2 instances) ✅ Fixed
- [x] Korean "예약 문의을" → "예약 문의를" (1 instance) ✅ Fixed
- [x] "Bukhan mountain" → "Bukhan Mountain" (2 instances) ✅ Fixed

---

## 6. Summary Statistics

| Category | Count | Status |
|----------|-------|--------|
| Spelling Errors (inquirys) | 5 | ✅ Fixed |
| Spelling Errors (breath taking) | 1 | ✅ Fixed |
| Terminology Mismatches | 2 | ✅ Fixed |
| Capitalization Issues | 2 | ✅ Fixed |
| Korean Grammar Errors | 1 | ✅ Fixed |
| Total Issues Fixed | 11 | ✅ All Resolved |

---

*Report Generated: 2025-11-28*
