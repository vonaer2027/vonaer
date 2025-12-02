# MMS 메시지 발송 기능 설정 가이드

## 개요
관리자 대시보드에 BizGO API를 사용한 MMS 메시지 발송 기능이 추가되었습니다. 한국 노선 항공편 정보를 기반으로 고객에게 Empty Leg 특가 안내 메시지를 발송할 수 있습니다.

## 환경 변수 설정

`.env.local` 파일에 다음 환경 변수를 추가하세요:

```env
# BizGO SMS/MMS API Configuration
BIZGO_API_KEY=your_bizgo_api_key_here
BIZGO_BASE_URL=https://mars.ibapi.kr/api/comm
```

## 기능 구성

### 1. MMS 메시지 템플릿
- **Empty Leg 특가 안내 (단일 노선)**: 단일 항공편에 대한 기본 특가 안내
- **Empty Leg 특가 안내 (복수 노선)**: 여러 항공편 옵션이 있는 경우
- **Empty Leg 왕복 패키지**: 왕복 항공편 패키지 안내

### 2. 자동 데이터 치환
템플릿의 플레이스홀더가 실제 항공편 데이터로 자동 치환됩니다:

- `{{date}}`: 항공편 날짜 (한국어 형식)
- `{{route}}`: 출발지 → 도착지
- `{{departure_time}}`: 출발 시간
- `{{arrival_time}}`: 도착 시간
- `{{duration}}`: 비행 시간
- `{{aircraft}}`: 항공기 기종
- `{{seats}}`: 탑승 가능 인원
- `{{price}}`: 항공편 가격
- `{{aircraft_description}}`: 항공기 설명
- `{{aircraft_features}}`: 항공기 특징
- `{{aircraft_optimization}}`: 항공기 최적화 정보

### 3. 왕복 패키지 전용 플레이스홀더
- `{{outbound_*}}`: 출발편 정보 (date, route, departure, arrival, duration, aircraft, description, features, price)
- `{{return_*}}`: 복귀편 정보
- `{{destination}}`: 목적지 도시

## 사용 방법

### 1. 항공편 선택
- MMS 탭에서 한국 노선 항공편 목록을 확인
- 메시지를 발송할 항공편을 선택

### 2. 템플릿 선택 및 편집
- 3가지 템플릿 중 적절한 템플릿 선택
- 자동 생성된 메시지 내용을 필요에 따라 수정

### 3. 수신자 선택
- 수신자 관리 탭에서 메시지를 받을 고객 선택
- 전체 선택 또는 개별 선택 가능

### 4. 메시지 발송
- 미리보기로 최종 메시지 확인
- 선택된 고객들에게 일괄 발송

## API 엔드포인트

### POST /api/send-mms
MMS 메시지 발송을 위한 API 엔드포인트

**요청 형식:**
```json
{
  "destinations": [
    {
      "to": "01012345678",
      "ref": "flight_FL001_user_123"
    }
  ],
  "messageFlow": [
    {
      "mms": {
        "from": "1600-9064",
        "text": "메시지 내용",
        "title": "[본에어 Empty Leg 특가 안내]"
      }
    }
  ],
  "groupKey": "flight_FL001_1234567890",
  "ref": "mms_campaign_FL001"
}
```

**응답 형식:**
```json
{
  "success": true,
  "data": {
    "total": 10,
    "successful": 9,
    "failed": 1,
    "results": [...],
    "groupKey": "flight_FL001_1234567890",
    "infobankTrId": "tracking_id"
  }
}
```

## 전화번호 형식
- 한국 휴대폰 번호만 지원 (010XXXXXXXX 형식)
- 자동으로 숫자만 추출하여 발송
- 잘못된 번호 형식은 사전에 검증

## 주의사항

1. **BizGO API 키**: 실제 발송을 위해서는 유효한 BizGO API 키가 필요합니다.
2. **발송 제한**: BizGO API의 발송 제한 정책을 확인하세요.
3. **개인정보 보호**: 고객 정보 처리 시 개인정보보호법을 준수하세요.
4. **메시지 내용**: 스팸 방지를 위해 적절한 메시지 내용을 작성하세요.

## 문제 해결

### 일반적인 오류
- **API 키 오류**: BIZGO_API_KEY 환경 변수 확인
- **전화번호 오류**: 한국 휴대폰 번호 형식 확인 (01XXXXXXXXX)
- **네트워크 오류**: BizGO API 서버 상태 확인

### 로그 확인
서버 콘솔에서 MMS 발송 관련 로그를 확인할 수 있습니다:
```
Sending MMS request to BizGO: {...}
BizGO API response status: 200
MMS sending completed: 9 successful, 1 failed
```

## 추가 개발 사항

향후 개선 가능한 기능들:
- 발송 이력 관리
- 메시지 템플릿 관리자 기능
- 예약 발송 기능
- 발송 결과 통계
- 고객 그룹 관리


