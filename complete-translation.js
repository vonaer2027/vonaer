const fs = require('fs');
const path = require('path');

// Read the English file
const enFile = path.join(__dirname, 'messages', 'en.json');
const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));

// Function to recursively translate all strings in an object
function translateAllStrings(obj, translator) {
  if (typeof obj === 'string') {
    return translator(obj);
  } else if (Array.isArray(obj)) {
    return obj.map(item => translateAllStrings(item, translator));
  } else if (typeof obj === 'object' && obj !== null) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = translateAllStrings(value, translator);
    }
    return result;
  }
  return obj;
}

// Translation dictionaries for common terms
const translations = {
  korean: {
    // Hero section
    "VONAER": "VONAER",
    "A platform proposing a new lifestyle, VONAER is an Urban Air Mobility service.": "새로운 라이프스타일을 제안하는 플랫폼, VONAER는 도시 항공 모빌리티 서비스입니다.",
    "Book Flight": "항공편 예약",
    
    // Services
    "VONAER SERVICE": "VONAER 서비스",
    "VON Private": "VON 프라이빗",
    "VIP service for those who value their time over everything else": "시간을 가장 소중히 여기는 분들을 위한 VIP 서비스",
    "VON Private offers a VIP charter service with flexibility to specify your destination and time for a seamless travel experience.": "VON 프라이빗은 목적지와 시간을 자유롭게 지정할 수 있는 VIP 전세 서비스로 원활한 여행 경험을 제공합니다.",
    "Pick your departure and destination at your convenience": "편리한 출발지와 목적지 선택",
    "No initiation fee. Purchase credits and make reservation through app": "가입비 없음. 크레딧 구매 후 앱을 통한 예약",
    "Airport escort, VON Carry, and Von Lounge service": "공항 에스코트, VON 캐리, VON 라운지 서비스",
    
    "VON Routine": "VON 루틴",
    "From Gangnam to ICN in 20 minutes": "강남에서 인천공항까지 20분",
    "VON Routine offers fast and comfortable air shuttle service between Gangnam and Incheon Airport. Simply make reservation through VONAER app.": "VON 루틴은 강남과 인천공항 간 빠르고 편안한 항공 셔틀 서비스를 제공합니다. VONAER 앱을 통해 간단히 예약하세요.",
    "Experience next level of comfort from Gangnam to Incheon Airport": "강남에서 인천공항까지 차원이 다른 편안함 경험",
    "Convenient and fast transportation": "편리하고 빠른 교통수단",
    "Helicopter charter service available": "헬리콥터 전세 서비스 이용 가능",
    
    "VON Tour": "VON 투어",
    "Enjoy a breath taking sky view of Korea": "한국의 숨막히는 하늘 경치를 즐기세요",
    "Experience Korea like never before with our scenic helicopter tours. Multiple tour packages available.": "경치 좋은 헬리콥터 투어로 한국을 이전과는 다르게 경험해보세요. 다양한 투어 패키지를 이용할 수 있습니다.",
    "GwanAk Mountain Tour - Autumn Leaves & Spring Flower Tours": "관악산 투어 - 단풍 & 봄꽃 투어",
    "Han River Tour - Seoul Skyline & Cherry Blossom Tours": "한강 투어 - 서울 스카이라인 & 벚꽃 투어",
    "DMZ Tour - Historical landmarks only available in South Korea": "DMZ 투어 - 한국에서만 볼 수 있는 역사적 랜드마크",
    
    "Learn More": "더 알아보기",
    "Tour Packages": "투어 패키지",
    "GwanAk Mountain": "관악산",
    "COEX → Jamsil → Yangjae Forest → Seoul Amusement Park → GwanAk Mountain": "COEX → 잠실 → 양재숲 → 서울놀이공원 → 관악산",
    "Autumn Leaves Tour": "단풍 투어",
    "Spring Flower Tour": "봄꽃 투어",
    "Seoul Amusement Park Tour": "서울놀이공원 투어",
    
    "Han River": "한강",
    "COEX → Lotte Tower → Seokchon Lake → Olympic Park → Amsa Heritage → Namyangju": "COEX → 롯데타워 → 석촌호수 → 올림픽공원 → 암사유적 → 남양주",
    "Seoul Skyline": "서울 스카이라인",
    "Seokchon Lake Cherry Blossom Tour": "석촌호수 벚꽃 투어",
    "Olympic Park": "올림픽공원",
    
    "BukHan Mountain": "북한산",
    "COEX → Lotte Tower → Seokchon Lake → BukHan Mountain → Dobong Mountain": "COEX → 롯데타워 → 석촌호수 → 북한산 → 도봉산",
    "Bukhan mountain National Park": "북한산 국립공원",
    "Seoul Rocky Mountains Tour": "서울 암산 투어",
    
    "DMZ Tour": "DMZ 투어",
    "Witness historical landmarks only available in South Korea. Experience a breathtaking view of North Korea from the sky, across the DMZ.": "한국에서만 볼 수 있는 역사적 랜드마크를 목격하세요. DMZ 너머 하늘에서 북한의 숨막히는 경치를 경험하세요.",
    
    // Booking
    "Book Your Flight": "항공편 예약",
    "Experience luxury air travel with VONAER's premium services": "VONAER의 프리미엄 서비스로 럭셔리 항공 여행을 경험하세요",
    "One Way": "편도",
    "Round Trip": "왕복",
    "Departure City": "출발 도시",
    "Destination City": "도착 도시",
    "Departure date": "출발 날짜",
    "Return date": "귀국 날짜",
    "passenger": "승객",
    "passengers": "승객",
    "Search Flights": "항공편 검색",
    
    // Common terms
    "Loading...": "로딩 중...",
    "Home": "홈",
    "Customer": "고객",
    "Test": "테스트",
    "Switch Language": "언어 변경",
    "Toggle Theme": "테마 전환",
    "Refresh": "새로고침",
    "From": "출발",
    "To": "도착",
    "Date": "날짜",
    "Price": "가격",
    "Passengers": "승객",
    "Aircraft": "항공기",
    "Departure": "출발",
    "Arrival": "도착",
    "Flight Date": "항공편 날짜",
    "Capacity": "수용 인원",
    "Total Cost": "총 비용",
    "Booking Request": "예약 요청",
    "Empty Leg": "엠프티 레그",
    "Admin Dashboard": "관리자 대시보드",
    "View Landing Page": "랜딩 페이지 보기",
    "View Customer Page": "고객 페이지 보기",
    "Dashboard": "대시보드",
    "Users": "사용자",
    "Settings": "설정",
    "Booking Requests": "예약 요청",
    "Total Flights": "총 항공편",
    "Average Price": "평균 가격",
    "Current Margin": "현재 마진",
    "No flights available": "사용 가능한 항공편이 없습니다",
    "There are currently no flights in the system. Add some flights to get started.": "현재 시스템에 항공편이 없습니다. 시작하려면 항공편을 추가하세요.",
    "Price Test": "가격 테스트",
    "Flights": "항공편",
    "Bookings": "예약",
    "MMS Messaging": "MMS 발송"
  },
  
  chinese: {
    // Hero section
    "VONAER": "VONAER",
    "A platform proposing a new lifestyle, VONAER is an Urban Air Mobility service.": "提出新生活方式的平台，VONAER是城市航空移动服务。",
    "Book Flight": "预订航班",
    
    // Services
    "VONAER SERVICE": "VONAER服务",
    "VON Private": "VON私人",
    "VIP service for those who value their time over everything else": "为最重视时间的人提供的VIP服务",
    "VON Private offers a VIP charter service with flexibility to specify your destination and time for a seamless travel experience.": "VON私人提供可灵活指定目的地和时间的VIP包机服务，带来无缝旅行体验。",
    "Pick your departure and destination at your convenience": "便捷的出发地和目的地选择",
    "No initiation fee. Purchase credits and make reservation through app": "无入会费。购买积分后通过应用预订",
    "Airport escort, VON Carry, and Von Lounge service": "机场护送、VON携带、VON贵宾室服务",
    
    "VON Routine": "VON常规",
    "From Gangnam to ICN in 20 minutes": "从江南到仁川机场20分钟",
    "VON Routine offers fast and comfortable air shuttle service between Gangnam and Incheon Airport. Simply make reservation through VONAER app.": "VON常规提供江南和仁川机场之间快速舒适的航空班车服务。只需通过VONAER应用预订。",
    "Experience next level of comfort from Gangnam to Incheon Airport": "体验从江南到仁川机场的下一级舒适",
    "Convenient and fast transportation": "便捷快速的交通",
    "Helicopter charter service available": "直升机包机服务可用",
    
    "VON Tour": "VON旅游",
    "Enjoy a breath taking sky view of Korea": "享受韩国令人叹为观止的天空景色",
    "Experience Korea like never before with our scenic helicopter tours. Multiple tour packages available.": "通过我们的风景直升机之旅以前所未有的方式体验韩国。提供多种旅游套餐。",
    "GwanAk Mountain Tour - Autumn Leaves & Spring Flower Tours": "冠岳山旅游 - 秋叶和春花旅游",
    "Han River Tour - Seoul Skyline & Cherry Blossom Tours": "汉江旅游 - 首尔天际线和樱花旅游",
    "DMZ Tour - Historical landmarks only available in South Korea": "DMZ旅游 - 仅在韩国可见的历史地标",
    
    "Learn More": "了解更多",
    "Tour Packages": "旅游套餐",
    "GwanAk Mountain": "冠岳山",
    "COEX → Jamsil → Yangjae Forest → Seoul Amusement Park → GwanAk Mountain": "COEX → 蚕室 → 良才森林 → 首尔游乐园 → 冠岳山",
    "Autumn Leaves Tour": "秋叶之旅",
    "Spring Flower Tour": "春花之旅",
    "Seoul Amusement Park Tour": "首尔游乐园之旅",
    
    "Han River": "汉江",
    "COEX → Lotte Tower → Seokchon Lake → Olympic Park → Amsa Heritage → Namyangju": "COEX → 乐天塔 → 石村湖 → 奥林匹克公园 → 岩寺遗址 → 南杨州",
    "Seoul Skyline": "首尔天际线",
    "Seokchon Lake Cherry Blossom Tour": "石村湖樱花之旅",
    "Olympic Park": "奥林匹克公园",
    
    "BukHan Mountain": "北汉山",
    "COEX → Lotte Tower → Seokchon Lake → BukHan Mountain → Dobong Mountain": "COEX → 乐天塔 → 石村湖 → 北汉山 → 道峰山",
    "Bukhan mountain National Park": "北汉山国立公园",
    "Seoul Rocky Mountains Tour": "首尔岩山之旅",
    
    "DMZ Tour": "DMZ旅游",
    "Witness historical landmarks only available in South Korea. Experience a breathtaking view of North Korea from the sky, across the DMZ.": "见证仅在韩国可见的历史地标。从天空中体验跨越DMZ的朝鲜令人叹为观止的景色。",
    
    // Booking
    "Book Your Flight": "预订航班",
    "Experience luxury air travel with VONAER's premium services": "通过VONAER的优质服务体验豪华航空旅行",
    "One Way": "单程",
    "Round Trip": "往返",
    "Departure City": "出发城市",
    "Destination City": "目的地城市",
    "Departure date": "出发日期",
    "Return date": "返程日期",
    "passenger": "乘客",
    "passengers": "乘客",
    "Search Flights": "搜索航班",
    
    // Common terms
    "Loading...": "加载中...",
    "Home": "首页",
    "Customer": "客户",
    "Test": "测试",
    "Switch Language": "切换语言",
    "Toggle Theme": "切换主题",
    "Refresh": "刷新",
    "From": "出发",
    "To": "到达",
    "Date": "日期",
    "Price": "价格",
    "Passengers": "乘客",
    "Aircraft": "飞机",
    "Departure": "出发",
    "Arrival": "到达",
    "Flight Date": "航班日期",
    "Capacity": "容量",
    "Total Cost": "总成本",
    "Booking Request": "预订请求",
    "Empty Leg": "空腿航班",
    "Admin Dashboard": "管理员仪表板",
    "View Landing Page": "查看着陆页",
    "View Customer Page": "查看客户页面",
    "Dashboard": "仪表板",
    "Users": "用户",
    "Settings": "设置",
    "Booking Requests": "预订请求",
    "Total Flights": "总航班数",
    "Average Price": "平均价格",
    "Current Margin": "当前利润率",
    "No flights available": "没有可用航班",
    "There are currently no flights in the system. Add some flights to get started.": "当前系统中没有航班。添加一些航班开始使用。",
    "Price Test": "价格测试",
    "Flights": "航班",
    "Bookings": "预订",
    "MMS Messaging": "MMS消息"
  },
  
  japanese: {
    // Hero section
    "VONAER": "VONAER",
    "A platform proposing a new lifestyle, VONAER is an Urban Air Mobility service.": "新しいライフスタイルを提案するプラットフォーム、VONAERは都市航空モビリティサービスです。",
    "Book Flight": "フライト予約",
    
    // Services
    "VONAER SERVICE": "VONAERサービス",
    "VON Private": "VONプライベート",
    "VIP service for those who value their time over everything else": "時間を何よりも大切にする方のためのVIPサービス",
    "VON Private offers a VIP charter service with flexibility to specify your destination and time for a seamless travel experience.": "VONプライベートは、目的地と時間を自由に指定できるVIPチャーターサービスで、シームレスな旅行体験を提供します。",
    "Pick your departure and destination at your convenience": "便利な出発地と目的地の選択",
    "No initiation fee. Purchase credits and make reservation through app": "入会金なし。クレジット購入後、アプリで予約",
    "Airport escort, VON Carry, and Von Lounge service": "空港エスコート、VONキャリー、VONラウンジサービス",
    
    "VON Routine": "VONルーチン",
    "From Gangnam to ICN in 20 minutes": "江南から仁川空港まで20分",
    "VON Routine offers fast and comfortable air shuttle service between Gangnam and Incheon Airport. Simply make reservation through VONAER app.": "VONルーチンは江南と仁川空港間の快適で高速な航空シャトルサービスを提供します。VONAERアプリで簡単に予約できます。",
    "Experience next level of comfort from Gangnam to Incheon Airport": "江南から仁川空港まで次元の違う快適さを体験",
    "Convenient and fast transportation": "便利で高速な交通手段",
    "Helicopter charter service available": "ヘリコプターチャーターサービス利用可能",
    
    "VON Tour": "VONツアー",
    "Enjoy a breath taking sky view of Korea": "韓国の息をのむような空の景色をお楽しみください",
    "Experience Korea like never before with our scenic helicopter tours. Multiple tour packages available.": "風光明媚なヘリコプターツアーで韓国をこれまでとは違った方法で体験してください。複数のツアーパッケージをご利用いただけます。",
    "GwanAk Mountain Tour - Autumn Leaves & Spring Flower Tours": "関岳山ツアー - 紅葉＆春の花ツアー",
    "Han River Tour - Seoul Skyline & Cherry Blossom Tours": "漢江ツアー - ソウルスカイライン＆桜ツアー",
    "DMZ Tour - Historical landmarks only available in South Korea": "DMZツアー - 韓国でのみ見ることができる歴史的ランドマーク",
    
    "Learn More": "詳細を見る",
    "Tour Packages": "ツアーパッケージ",
    "GwanAk Mountain": "冠岳山",
    "COEX → Jamsil → Yangjae Forest → Seoul Amusement Park → GwanAk Mountain": "COEX → 蚕室 → 良才の森 → ソウル遊園地 → 冠岳山",
    "Autumn Leaves Tour": "紅葉ツアー",
    "Spring Flower Tour": "春の花ツアー",
    "Seoul Amusement Park Tour": "ソウル遊園地ツアー",
    
    "Han River": "漢江",
    "COEX → Lotte Tower → Seokchon Lake → Olympic Park → Amsa Heritage → Namyangju": "COEX → ロッテタワー → 石村湖 → オリンピック公園 → 岩寺遺跡 → 南楊州",
    "Seoul Skyline": "ソウルスカイライン",
    "Seokchon Lake Cherry Blossom Tour": "石村湖桜ツアー",
    "Olympic Park": "オリンピック公園",
    
    "BukHan Mountain": "北漢山",
    "COEX → Lotte Tower → Seokchon Lake → BukHan Mountain → Dobong Mountain": "COEX → ロッテタワー → 石村湖 → 北漢山 → 道峰山",
    "Bukhan mountain National Park": "北漢山国立公園",
    "Seoul Rocky Mountains Tour": "ソウル岩山ツアー",
    
    "DMZ Tour": "DMZツアー",
    "Witness historical landmarks only available in South Korea. Experience a breathtaking view of North Korea from the sky, across the DMZ.": "韓国でのみ見ることができる歴史的ランドマークを目撃してください。DMZを越えて空から北朝鮮の息をのむような景色を体験してください。",
    
    // Booking
    "Book Your Flight": "フライト予約",
    "Experience luxury air travel with VONAER's premium services": "VONAERのプレミアムサービスでラグジュアリー航空旅行を体験",
    "One Way": "片道",
    "Round Trip": "往復",
    "Departure City": "出発都市",
    "Destination City": "到着都市",
    "Departure date": "出発日",
    "Return date": "帰国日",
    "passenger": "乗客",
    "passengers": "乗客",
    "Search Flights": "フライト検索",
    
    // Common terms
    "Loading...": "読み込み中...",
    "Home": "ホーム",
    "Customer": "顧客",
    "Test": "テスト",
    "Switch Language": "言語切り替え",
    "Toggle Theme": "テーマ切り替え",
    "Refresh": "更新",
    "From": "出発",
    "To": "到着",
    "Date": "日付",
    "Price": "価格",
    "Passengers": "乗客",
    "Aircraft": "航空機",
    "Departure": "出発",
    "Arrival": "到着",
    "Flight Date": "フライト日",
    "Capacity": "定員",
    "Total Cost": "総費用",
    "Booking Request": "予約リクエスト",
    "Empty Leg": "エンプティレッグ",
    "Admin Dashboard": "管理者ダッシュボード",
    "View Landing Page": "ランディングページを見る",
    "View Customer Page": "顧客ページを見る",
    "Dashboard": "ダッシュボード",
    "Users": "ユーザー",
    "Settings": "設定",
    "Booking Requests": "予約リクエスト",
    "Total Flights": "総フライト数",
    "Average Price": "平均価格",
    "Current Margin": "現在のマージン",
    "No flights available": "利用可能なフライトがありません",
    "There are currently no flights in the system. Add some flights to get started.": "現在システムにフライトがありません。開始するにはフライトを追加してください。",
    "Price Test": "価格テスト",
    "Flights": "フライト",
    "Bookings": "予約",
    "MMS Messaging": "MMSメッセージ"
  }
};

// Create translator functions
function createTranslator(dictionary) {
  return function(text) {
    return dictionary[text] || text;
  };
}

// Apply translations to each language
const languages = {
  'kr': translations.korean,
  'cn': translations.chinese,
  'jp': translations.japanese
};

Object.entries(languages).forEach(([lang, dictionary]) => {
  const translator = createTranslator(dictionary);
  const translatedData = translateAllStrings(enData, translator);
  const outputFile = path.join(__dirname, 'messages', `${lang}.json`);
  
  fs.writeFileSync(outputFile, JSON.stringify(translatedData, null, 2), 'utf8');
  console.log(`Completely translated ${lang}.json`);
});

console.log('Complete translation finished!');


