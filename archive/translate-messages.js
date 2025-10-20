const fs = require('fs');
const path = require('path');

// Translation mappings
const translations = {
  // Korean translations
  kr: {
    "hero": {
      "title": "VONAER",
      "subtitle": "전세계를 하나로 잇는 아시아 최초의 럭셔리 에어 모빌리티 플랫폼입니다. 비즈니스 미팅이든 가족 여행이든 — 우리는 ‘당신의 시간을 되돌려 드리는’ 경험을 제공합니다",
      "bookFlight": "항공편 예약"
    },
    "services": {
      "title": "VONAER 서비스",
      "subtitle": "전세계를 하나로 잇는 아시아 최초의 럭셔리 에어 모빌리티 플랫폼입니다. 비즈니스 미팅이든 가족 여행이든 — 우리는 ‘당신의 시간을 되돌려 드리는’ 경험을 제공합니다",
      "learnMore": "더 알아보기"
    },
    "booking": {
      "title": "항공편 예약",
      "subtitle": "VONAER의 프리미엄 서비스로 럭셔리 항공 여행을 경험하세요",
      "tripType": {
        "oneWay": "편도",
        "roundTrip": "왕복"
      },
      "placeholders": {
        "departureCity": "출발 도시",
        "destinationCity": "도착 도시",
        "departureDate": "출발 날짜",
        "returnDate": "귀국 날짜"
      },
      "passengers": "승객",
      "passengersPlural": "승객",
      "search": "항공편 검색"
    },
    "admin": {
      "loading": "로딩 중...",
      "title": "관리자 대시보드",
      "viewLanding": "랜딩 페이지 보기",
      "viewCustomer": "고객 페이지 보기",
      "dashboard": "대시보드",
      "users": "사용자",
      "settings": "설정",
      "bookingRequests": "예약 요청",
      "totalFlights": "총 항공편",
      "averagePrice": "평균 가격",
      "currentMargin": "현재 마진",
      "refresh": "새로고침",
      "noFlights": "사용 가능한 항공편이 없습니다",
      "noFlightsDescription": "현재 시스템에 항공편이 없습니다. 시작하려면 항공편을 추가하세요.",
      "priceTest": "가격 테스트",
      "tabs": {
        "flights": "항공편",
        "bookings": "예약",
        "mms": "MMS 발송",
        "users": "사용자",
        "settings": "설정"
      }
    }
  },
  
  // Chinese translations
  cn: {
    "hero": {
      "title": "VONAER",
      "subtitle": "提出新生活方式的平台，VONAER是城市航空移动服务。",
      "bookFlight": "预订航班"
    },
    "services": {
      "title": "VONAER服务",
      "subtitle": "提出新生活方式的平台，VONAER是城市航空移动服务。",
      "learnMore": "了解更多"
    },
    "booking": {
      "title": "预订航班",
      "subtitle": "通过VONAER的优质服务体验豪华航空旅行",
      "tripType": {
        "oneWay": "单程",
        "roundTrip": "往返"
      },
      "placeholders": {
        "departureCity": "出发城市",
        "destinationCity": "目的地城市",
        "departureDate": "出发日期",
        "returnDate": "返程日期"
      },
      "passengers": "乘客",
      "passengersPlural": "乘客",
      "search": "搜索航班"
    },
    "admin": {
      "loading": "加载中...",
      "title": "管理员仪表板",
      "viewLanding": "查看着陆页",
      "viewCustomer": "查看客户页面",
      "dashboard": "仪表板",
      "users": "用户",
      "settings": "设置",
      "bookingRequests": "预订请求",
      "totalFlights": "总航班数",
      "averagePrice": "平均价格",
      "currentMargin": "当前利润率",
      "refresh": "刷新",
      "noFlights": "没有可用航班",
      "noFlightsDescription": "当前系统中没有航班。添加一些航班开始使用。",
      "priceTest": "价格测试",
      "tabs": {
        "flights": "航班",
        "bookings": "预订",
        "mms": "MMS消息",
        "users": "用户",
        "settings": "设置"
      }
    }
  },
  
  // Japanese translations
  jp: {
    "hero": {
      "title": "VONAER",
      "subtitle": "新しいライフスタイルを提案するプラットフォーム、VONAERは都市航空モビリティサービスです。",
      "bookFlight": "フライト予約"
    },
    "services": {
      "title": "VONAERサービス",
      "subtitle": "新しいライフスタイルを提案するプラットフォーム、VONAERは都市航空モビリティサービスです。",
      "learnMore": "詳細を見る"
    },
    "booking": {
      "title": "フライト予約",
      "subtitle": "VONAERのプレミアムサービスでラグジュアリー航空旅行を体験",
      "tripType": {
        "oneWay": "片道",
        "roundTrip": "往復"
      },
      "placeholders": {
        "departureCity": "出発都市",
        "destinationCity": "到着都市",
        "departureDate": "出発日",
        "returnDate": "帰国日"
      },
      "passengers": "乗客",
      "passengersPlural": "乗客",
      "search": "フライト検索"
    },
    "admin": {
      "loading": "読み込み中...",
      "title": "管理者ダッシュボード",
      "viewLanding": "ランディングページを見る",
      "viewCustomer": "顧客ページを見る",
      "dashboard": "ダッシュボード",
      "users": "ユーザー",
      "settings": "設定",
      "bookingRequests": "予約リクエスト",
      "totalFlights": "総フライト数",
      "averagePrice": "平均価格",
      "currentMargin": "現在のマージン",
      "refresh": "更新",
      "noFlights": "利用可能なフライトがありません",
      "noFlightsDescription": "現在システムにフライトがありません。開始するにはフライトを追加してください。",
      "priceTest": "価格テスト",
      "tabs": {
        "flights": "フライト",
        "bookings": "予約",
        "mms": "MMSメッセージ",
        "users": "ユーザー",
        "settings": "設定"
      }
    }
  }
};

// Function to recursively translate an object
function translateObject(obj, translations) {
  const result = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Recursively translate nested objects
      result[key] = translateObject(value, translations[key] || {});
    } else if (translations[key]) {
      // Use translation if available
      result[key] = translations[key];
    } else {
      // Keep original value if no translation
      result[key] = value;
    }
  }
  
  return result;
}

// Read the English file
const enFile = path.join(__dirname, 'messages', 'en.json');
const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));

// Create translations for each language
Object.keys(translations).forEach(lang => {
  const translatedData = translateObject(enData, translations[lang]);
  const outputFile = path.join(__dirname, 'messages', `${lang}.json`);
  
  fs.writeFileSync(outputFile, JSON.stringify(translatedData, null, 2), 'utf8');
  console.log(`Created ${lang}.json with translations`);
});

console.log('Translation complete!');


