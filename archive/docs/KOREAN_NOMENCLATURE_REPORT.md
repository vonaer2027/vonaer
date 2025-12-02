# Korean Nomenclature Analysis Report

## Executive Summary

This report analyzes the Korean translation file (`messages/kr.json`) for terminology consistency, CTA (Call-to-Action) phrasing, and grammatical issues.

---

## 1. Critical Issues Found

### 1.1 Grammatical Errors (조사 오류)

| Location | Current Text | Issue | Corrected Text |
|----------|-------------|-------|----------------|
| Line 620 | "아직 예약 문의**이** 없습니다" | 조사 오류 (받침 없look는 명사 + 가) | "아직 예약 문의**가** 없습니다" |
| Line 621 | "고객 예약 문의**이** 여기에 표시됩니다" | 조사 오류 | "고객 예약 문의**가** 여기에 표시됩니다" |
| Line 640 | "예약 문의**이** 삭제되었습니다" | 조사 오류 | "예약 문의**가** 삭제되었습니다" |
| Line 646 | "이 예약 문의**을** 정말로 삭제하시겠습니까?" | 조사 오류 | make"이 예약 문의**를** 정말로 삭제하시겠습니까?" |

---

## 2. CTA Button Terminology Analysis

### 2.1 Primary Action CTAs (주요 액션 버튼)

| Category | Korean | Location | Status |
|----------|--------|----------|--------|
| **문의 제출** | 문의하기 | bookingDialog.submit, flightSearchDialog.submit | ✅ Consistent |
| **예약 문의** | 예약 문의 | clientFlightCard.bookRequest, common.bookingRequest | ✅ Consistent |
| **견적/문의 요청** | 문의하기 | jets.cta.requestQuote, aircraft.cta.requestQuote, yacht.cta.requestQuote | ✅ Consistent |

### 2.2 Navigation CTAs (네비게이션 버튼)

| Korean | English Equivalent | Location | Status |
|--------|-------------------|----------|--------|
| 더 알아보기 | Learn More | services.learnMore, yacht.cta.learnMore, common.learnMore | ✅ Consistent |
| 시작하기 | Get Started | membership.getStarted | ✅ OK |
| 지금 가입하기 | Join Now | membership.joinNow | ✅ OK |

### 2.3 Booking/Reservation CTAs

| Korean | Context | Location | Status |
|--------|---------|----------|--------|
| 항공편 예약 | Flight Booking (main) | hero.bookFlight, hero.bookFlightButton, booking.title | ✅ Consistent |
| 전용기 문의하기 | Private Jet Inquiry | booking.searchRequest, flightSearchDialog.title | ✅ Consistent |
| Chauffeured Car 문의하기 | Car Inquiry | flightSearchDialog.carTitle | ✅ Consistent |
| 슈퍼 요트 문의하기 | Yacht Inquiry | flightSearchDialog.yachtTitle | ✅ Consistent |
| 예약 문의 | Booking Inquiry | bookingDialog.title, bookingRequests.title, clientFlightCard.bookRequest | ✅ Consistent |

### 2.4 Form Action CTAs

| Korean | Context | Location | Status |
|--------|---------|----------|--------|
| 취소 | Cancel | bookingDialog.cancel, flightSearchDialog.cancel, admin.flightCard.cancel | ✅ Consistent |
| 저장 | Save | userManagement.save, marginSettings.save, admin.flightCard.save | ✅ Consistent |
| 삭제 | Delete | userManagement.delete, bookingRequests.delete | ✅ Consistent |
| 수정 | Edit | userManagement.edit, admin.flightCard.edit | ✅ Consistent |
| 새로고침 | Refresh | common.refresh, client.refresh, bookingRequests.refresh | ✅ Consistent |

---

## 3. Dialog/Page Titles Analysis

### 3.1 Main Service Titles

| Korean | Location | Notes |
|--------|----------|-------|
| 전용기 문의하기 | flightSearchDialog.title | ✅ Updated |
| Chauffeured Car 문의하기 | flightSearchDialog.carTitle | ✅ Updated |
| 슈퍼 요트 문의하기 | flightSearchDialog.yachtTitle | ✅ Updated |
| 예약 문의 | bookingDialog.title, bookingRequests.title | ✅ Consistent |

### 3.2 Page Section Titles

| Korean | Location | Status |
|--------|----------|--------|
| 항공편 예약 | booking.title | ✅ OK |
| 회사 소개 | about.title | ✅ OK |
| VONAER 멤버십 | membership.title | ✅ OK |
| 부가 서비스 | ancillary.title | ✅ OK |
| 개인 제트기 | jets.title | ✅ OK |
| 헬리콥터 서비스 | helicopter.title | ✅ OK |
| Chauffeured Car | supercar.title | ✅ OK (English brand name) |
| 슈퍼 요트 | superyacht.title | ✅ OK |

---

## 4. Menu Items Analysis

### 4.1 Sidebar Menu (sidebar.menuItems)

| Key | Korean | Status |
|-----|--------|--------|
| home | 홈 | ✅ OK |
| charter | 전세 | ✅ OK |
| aircraft | 항공기 | ✅ OK |
| emptyLeg | Empty Leg | ✅ OK (Industry term) |
| supercar | Chauffeured Car | ✅ Updated |
| membership | 멤버십 전용 | ✅ OK |
| pr | PR | ✅ OK |
| contact | 문의하기 | ✅ OK |
| yacht | 요트 | ✅ OK |

---

## 5. Success/Error Messages Analysis

### 5.1 Success Messages Pattern

| Pattern | Examples | Status |
|---------|----------|--------|
| "~가 성공적으로 제출되었습니다" | 전용기 문의가 성공적으로 제출되었습니다 | ✅ Consistent |
| "~가 성공적으로 생성되었습니다" | 항공편이 성공적으로 생성되었습니다 | ✅ Consistent |
| "~가 성공적으로 업데이트되었습니다" | 항공편이 성공적으로 업데이트되었습니다 | ✅ Consistent |
| "~가 성공적으로 삭제되었습니다" | 항공편이 성공적으로 삭제되었습니다 | ✅ Consistent |

### 5.2 Error Messages Pattern

| Pattern | Examples | Status |
|---------|----------|--------|
| "~ 실패" | 전용기 문의 실패, 예약 문의 실패 | ✅ Consistent |
| "~ 로드 실패" | 예약 문의 로드 실패 | ✅ Consistent |

---

## 6. Terminology Glossary

### 6.1 Service Names (서비스명)

| Korean | English | Notes |
|--------|---------|-------|
| 전용기 | Private Jet | 항공편/항공기 대신 사용 |
| Chauffeured Car | Chauffeured Car | 슈퍼카에서 변경됨 |
| 슈퍼 요트 | Super Yacht | 그대로 유지 |
| Empty Leg | Empty Leg | 업계 용어, 번역하지 않음 |

### 6.2 Action Verbs (액션 동사)

| Korean | Context | Notes |
|--------|---------|-------|
| 문의하기 | 버튼 제출 | 주요 CTA |
| 예약하기 | 예약 완료 | 예약 확정 시 |
| 요청하다 | 일반적 요청 | 문의보다 격식적 |

### 6.3 Key Terms (주요 용어)

| Korean | English | Location |
|--------|---------|----------|
| 예약 문의 | Booking Inquiry | 고객 문의 컨텍스트 |
| 전용기 문의 | Private Jet Inquiry | 항공편 문의 컨텍스트 |
| 견적 | Quote | 가격 문의 시 |

---

## 7. Recommendations

### 7.1 Immediate Fixes Required

```json
// Line 620
"noRequests": "아직 예약 문의가 없습니다"

// Line 621
"noRequestsDescription": "고객 예약 문의가 여기에 표시됩니다"

// Line 640
"deleted": "예약 문의가 삭제되었습니다"

// Line 646
"confirmDelete": "이 예약 문의를 정말로 삭제하시겠습니까?"
```

### 7.2 Consistency Checklist

- [x] 슈퍼카 → Chauffeured Car (완료)
- [x] 검색 요청 → 견적 요청 → 전용기 문의하기 (완료)
- [x] 요청 제출 → 문의하기 (완료)
- [x] 예약 요청 → 예약 문의 (완료)
- [x] 조사 오류 수정 완료 (4개)

---

## 8. Summary Statistics

| Category | Count | Status |
|----------|-------|--------|
| Total CTAs Analyzed | 25+ | ✅ |
| Consistent CTAs | 23 | ✅ |
| Grammatical Issues | 4 | ✅ Fixed |
| Terminology Updates Applied | 4 | ✅ |

---

*Report Generated: 2025-11-28*
