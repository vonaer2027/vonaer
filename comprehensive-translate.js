const fs = require('fs');
const path = require('path');

// Comprehensive translations
const comprehensiveTranslations = {
  kr: {
    "hero": {
      "title": "VONAER",
      "subtitle": "새로운 라이프스타일을 제안하는 플랫폼, VONAER는 도시 항공 모빌리티 서비스입니다.",
      "bookFlight": "항공편 예약"
    },
    "services": {
      "title": "VONAER 서비스",
      "subtitle": "새로운 라이프스타일을 제안하는 플랫폼, VONAER는 도시 항공 모빌리티 서비스입니다.",
      "vonPrivate": {
        "title": "VON 프라이빗",
        "subtitle": "시간을 가장 소중히 여기는 분들을 위한 VIP 서비스",
        "description": "VON 프라이빗은 목적지와 시간을 자유롭게 지정할 수 있는 VIP 전세 서비스로 원활한 여행 경험을 제공합니다.",
        "features": {
          "feature1": "편리한 출발지와 목적지 선택",
          "feature2": "가입비 없음. 크레딧 구매 후 앱을 통한 예약",
          "feature3": "공항 에스코트, VON 캐리, VON 라운지 서비스"
        }
      },
      "vonRoutine": {
        "title": "VON 루틴",
        "subtitle": "강남에서 인천공항까지 20분",
        "description": "VON 루틴은 강남과 인천공항 간 빠르고 편안한 항공 셔틀 서비스를 제공합니다. VONAER 앱을 통해 간단히 예약하세요.",
        "features": {
          "feature1": "강남에서 인천공항까지 차원이 다른 편안함 경험",
          "feature2": "편리하고 빠른 교통수단",
          "feature3": "헬리콥터 전세 서비스 이용 가능"
        }
      },
      "vonTour": {
        "title": "VON 투어",
        "subtitle": "한국의 숨막히는 하늘 경치를 즐기세요",
        "description": "경치 좋은 헬리콥터 투어로 한국을 이전과는 다르게 경험해보세요. 다양한 투어 패키지를 이용할 수 있습니다.",
        "features": {
          "feature1": "관악산 투어 - 단풍 & 봄꽃 투어",
          "feature2": "한강 투어 - 서울 스카이라인 & 벚꽃 투어",
          "feature3": "DMZ 투어 - 한국에서만 볼 수 있는 역사적 랜드마크"
        }
      },
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
    },
    "common": {
      "imagePlaceholder": "이미지 플레이스홀더",
      "learnMore": "더 알아보기",
      "home": "홈",
      "customer": "고객",
      "test": "테스트",
      "switchLanguage": "언어 변경",
      "toggleTheme": "테마 전환",
      "refresh": "새로고침",
      "from": "출발",
      "to": "도착",
      "date": "날짜",
      "price": "가격",
      "passengers": "승객",
      "aircraft": "항공기",
      "departure": "출발",
      "arrival": "도착",
      "flightDate": "항공편 날짜",
      "capacity": "수용 인원",
      "totalCost": "총 비용",
      "bookingRequest": "예약 요청",
      "emptyLeg": "엠프티 레그",
      "priceAdjustment": "가격 조정",
      "individualPriceAdjustment": "개별 가격 조정",
      "margin": "마진",
      "selectDate": "출발 날짜 선택",
      "passenger": "승객"
    }
  },
  
  cn: {
    "hero": {
      "title": "VONAER",
      "subtitle": "提出新生活方式的平台，VONAER是城市航空移动服务。",
      "bookFlight": "预订航班"
    },
    "services": {
      "title": "VONAER服务",
      "subtitle": "提出新生活方式的平台，VONAER是城市航空移动服务。",
      "vonPrivate": {
        "title": "VON私人",
        "subtitle": "为最重视时间的人提供的VIP服务",
        "description": "VON私人提供可灵活指定目的地和时间的VIP包机服务，带来无缝旅行体验。",
        "features": {
          "feature1": "便捷的出发地和目的地选择",
          "feature2": "无入会费。购买积分后通过应用预订",
          "feature3": "机场护送、VON携带、VON贵宾室服务"
        }
      },
      "vonRoutine": {
        "title": "VON常规",
        "subtitle": "从江南到仁川机场20分钟",
        "description": "VON常规提供江南和仁川机场之间快速舒适的航空班车服务。只需通过VONAER应用预订。",
        "features": {
          "feature1": "体验从江南到仁川机场的下一级舒适",
          "feature2": "便捷快速的交通",
          "feature3": "直升机包机服务可用"
        }
      },
      "vonTour": {
        "title": "VON旅游",
        "subtitle": "享受韩国令人叹为观止的天空景色",
        "description": "通过我们的风景直升机之旅以前所未有的方式体验韩国。提供多种旅游套餐。",
        "features": {
          "feature1": "冠岳山旅游 - 秋叶和春花旅游",
          "feature2": "汉江旅游 - 首尔天际线和樱花旅游",
          "feature3": "DMZ旅游 - 仅在韩国可见的历史地标"
        }
      },
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
    },
    "common": {
      "imagePlaceholder": "图像占位符",
      "learnMore": "了解更多",
      "home": "首页",
      "customer": "客户",
      "test": "测试",
      "switchLanguage": "切换语言",
      "toggleTheme": "切换主题",
      "refresh": "刷新",
      "from": "出发",
      "to": "到达",
      "date": "日期",
      "price": "价格",
      "passengers": "乘客",
      "aircraft": "飞机",
      "departure": "出发",
      "arrival": "到达",
      "flightDate": "航班日期",
      "capacity": "容量",
      "totalCost": "总成本",
      "bookingRequest": "预订请求",
      "emptyLeg": "空腿航班",
      "priceAdjustment": "价格调整",
      "individualPriceAdjustment": "个人价格调整",
      "margin": "利润率",
      "selectDate": "选择出发日期",
      "passenger": "乘客"
    }
  },
  
  jp: {
    "hero": {
      "title": "VONAER",
      "subtitle": "新しいライフスタイルを提案するプラットフォーム、VONAERは都市航空モビリティサービスです。",
      "bookFlight": "フライト予約"
    },
    "services": {
      "title": "VONAERサービス",
      "subtitle": "新しいライフスタイルを提案するプラットフォーム、VONAERは都市航空モビリティサービスです。",
      "vonPrivate": {
        "title": "VONプライベート",
        "subtitle": "時間を何よりも大切にする方のためのVIPサービス",
        "description": "VONプライベートは、目的地と時間を自由に指定できるVIPチャーターサービスで、シームレスな旅行体験を提供します。",
        "features": {
          "feature1": "便利な出発地と目的地の選択",
          "feature2": "入会金なし。クレジット購入後、アプリで予約",
          "feature3": "空港エスコート、VONキャリー、VONラウンジサービス"
        }
      },
      "vonRoutine": {
        "title": "VONルーチン",
        "subtitle": "江南から仁川空港まで20分",
        "description": "VONルーチンは江南と仁川空港間の快適で高速な航空シャトルサービスを提供します。VONAERアプリで簡単に予約できます。",
        "features": {
          "feature1": "江南から仁川空港まで次元の違う快適さを体験",
          "feature2": "便利で高速な交通手段",
          "feature3": "ヘリコプターチャーターサービス利用可能"
        }
      },
      "vonTour": {
        "title": "VONツアー",
        "subtitle": "韓国の息をのむような空の景色をお楽しみください",
        "description": "風光明媚なヘリコプターツアーで韓国をこれまでとは違った方法で体験してください。複数のツアーパッケージをご利用いただけます。",
        "features": {
          "feature1": "関岳山ツアー - 紅葉＆春の花ツアー",
          "feature2": "漢江ツアー - ソウルスカイライン＆桜ツアー",
          "feature3": "DMZツアー - 韓国でのみ見ることができる歴史的ランドマーク"
        }
      },
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
    },
    "common": {
      "imagePlaceholder": "画像プレースホルダー",
      "learnMore": "詳細を見る",
      "home": "ホーム",
      "customer": "顧客",
      "test": "テスト",
      "switchLanguage": "言語切り替え",
      "toggleTheme": "テーマ切り替え",
      "refresh": "更新",
      "from": "出発",
      "to": "到着",
      "date": "日付",
      "price": "価格",
      "passengers": "乗客",
      "aircraft": "航空機",
      "departure": "出発",
      "arrival": "到着",
      "flightDate": "フライト日",
      "capacity": "定員",
      "totalCost": "総費用",
      "bookingRequest": "予約リクエスト",
      "emptyLeg": "エンプティレッグ",
      "priceAdjustment": "価格調整",
      "individualPriceAdjustment": "個別価格調整",
      "margin": "マージン",
      "selectDate": "出発日を選択",
      "passenger": "乗客"
    }
  }
};

// Function to deep merge objects
function deepMerge(target, source) {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}

// Read the English file
const enFile = path.join(__dirname, 'messages', 'en.json');
const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));

// Create comprehensive translations for each language
Object.keys(comprehensiveTranslations).forEach(lang => {
  const translatedData = deepMerge(enData, comprehensiveTranslations[lang]);
  const outputFile = path.join(__dirname, 'messages', `${lang}.json`);
  
  fs.writeFileSync(outputFile, JSON.stringify(translatedData, null, 2), 'utf8');
  console.log(`Updated ${lang}.json with comprehensive translations`);
});

console.log('Comprehensive translation complete!');


