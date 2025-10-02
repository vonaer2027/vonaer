const fs = require('fs');
const path = require('path');

// Complete translation mappings for all sections
const completeTranslations = {
  kr: {
    "client": {
      "loading": "로딩 중...",
      "title": "사용 가능한 항공편",
      "subtitle": "다음 엠프티 레그 항공편을 예약하세요",
      "sortBy": "정렬 기준",
      "priceLow": "가격: 낮은 순",
      "priceHigh": "가격: 높은 순",
      "dateNear": "날짜: 가까운 순",
      "dateFar": "날짜: 먼 순",
      "noFlights": "사용 가능한 항공편이 없습니다",
      "noFlightsDescription": "현재 사용 가능한 항공편이 없습니다. 나중에 다시 확인하거나 더 많은 정보를 위해 문의해주세요.",
      "bookFlight": "항공편 예약",
      "from": "출발",
      "to": "도착",
      "date": "날짜",
      "price": "가격",
      "passengers": "승객",
      "aircraft": "항공기",
      "refresh": "새로고침",
      "availableFlights": "사용 가능한 항공편",
      "flightsAvailable": "엠프티 레그 항공편 사용 가능",
      "updateDate": "업데이트:"
    },
    "userManagement": {
      "title": "사용자 관리",
      "subtitle": "사용자 계정 및 권한 관리",
      "addUser": "사용자 추가",
      "editUser": "사용자 편집",
      "deleteUser": "사용자 삭제",
      "name": "이름",
      "phone": "전화번호",
      "status": "상태",
      "createdAt": "생성일",
      "actions": "작업",
      "active": "활성",
      "inactive": "비활성",
      "cancel": "취소",
      "save": "저장",
      "edit": "편집",
      "delete": "삭제",
      "noUsers": "사용자를 찾을 수 없습니다",
      "noUsersDescription": "시작하려면 첫 번째 사용자를 추가하세요",
      "addFirstUser": "첫 번째 사용자 추가"
    },
    "marginSettings": {
      "title": "마진 설정",
      "subtitle": "모든 항공편 가격에 적용할 마진 비율 설정",
      "marginPercentage": "마진 비율 (%)",
      "placeholder": "비율 입력 (예: 15.5)",
      "currentMargin": "현재 마진",
      "save": "저장",
      "saving": "저장 중...",
      "example": {
        "title": "가격 예시",
        "basePrice": "기본 가격",
        "margin": "마진",
        "finalPrice": "최종 가격"
      }
    },
    "bookingDialog": {
      "title": "예약 요청",
      "subtitle": "세부 정보를 제공해주시면 24시간 내에 연락드리겠습니다.",
      "seats": " 좌석",
      "dateTBD": "날짜 미정",
      "contactInfo": "연락처 정보",
      "name": "이름",
      "namePlaceholder": "이름을 입력하세요",
      "phone": "전화번호",
      "phonePlaceholder": "010-1234-5678",
      "email": "이메일 주소 (선택사항)",
      "emailPlaceholder": "your.email@example.com",
      "consent": "개인정보 및 동의",
      "contactConsentText": "항공편 예약에 대해 VONAER로부터 연락받는 것에 동의합니다.",
      "privacyConsentText": "서비스를 사용함으로써 다음을 읽고 이해했습니다:",
      "privacyPolicy": "개인정보처리방침",
      "privacyConsentText2": "에 동의합니다.",
      "cancel": "취소",
      "submit": "요청 제출",
      "submitting": "제출 중..."
    }
  },
  
  cn: {
    "client": {
      "loading": "加载中...",
      "title": "可用航班",
      "subtitle": "预订您的下一个空腿航班",
      "sortBy": "排序方式",
      "priceLow": "价格：从低到高",
      "priceHigh": "价格：从高到低",
      "dateNear": "日期：最近优先",
      "dateFar": "日期：最远优先",
      "noFlights": "没有可用航班",
      "noFlightsDescription": "目前没有可用航班。请稍后再查看或联系我们获取更多信息。",
      "bookFlight": "预订航班",
      "from": "出发",
      "to": "到达",
      "date": "日期",
      "price": "价格",
      "passengers": "乘客",
      "aircraft": "飞机",
      "refresh": "刷新",
      "availableFlights": "可用航班",
      "flightsAvailable": "空腿航班可用",
      "updateDate": "更新："
    },
    "userManagement": {
      "title": "用户管理",
      "subtitle": "管理用户账户和权限",
      "addUser": "添加用户",
      "editUser": "编辑用户",
      "deleteUser": "删除用户",
      "name": "姓名",
      "phone": "电话",
      "status": "状态",
      "createdAt": "创建时间",
      "actions": "操作",
      "active": "活跃",
      "inactive": "非活跃",
      "cancel": "取消",
      "save": "保存",
      "edit": "编辑",
      "delete": "删除",
      "noUsers": "未找到用户",
      "noUsersDescription": "添加您的第一个用户开始使用",
      "addFirstUser": "添加第一个用户"
    },
    "marginSettings": {
      "title": "利润率设置",
      "subtitle": "设置应用于所有航班价格的利润率百分比",
      "marginPercentage": "利润率 (%)",
      "placeholder": "输入百分比 (例如: 15.5)",
      "currentMargin": "当前利润率",
      "save": "保存",
      "saving": "保存中...",
      "example": {
        "title": "价格示例",
        "basePrice": "基础价格",
        "margin": "利润率",
        "finalPrice": "最终价格"
      }
    },
    "bookingDialog": {
      "title": "预订请求",
      "subtitle": "请提供您的详细信息，我们将在24小时内与您联系。",
      "seats": " 座位",
      "dateTBD": "日期待定",
      "contactInfo": "联系信息",
      "name": "姓名",
      "namePlaceholder": "输入您的姓名",
      "phone": "电话",
      "phonePlaceholder": "010-1234-5678",
      "email": "电子邮件地址 (可选)",
      "emailPlaceholder": "your.email@example.com",
      "consent": "隐私和同意",
      "contactConsentText": "我同意VONAER就航班预订事宜与我联系。",
      "privacyConsentText": "通过使用服务，我已阅读并理解",
      "privacyPolicy": "隐私政策",
      "privacyConsentText2": "并同意。",
      "cancel": "取消",
      "submit": "提交请求",
      "submitting": "提交中..."
    }
  },
  
  jp: {
    "client": {
      "loading": "読み込み中...",
      "title": "利用可能なフライト",
      "subtitle": "次のエンプティレッグフライトを予約",
      "sortBy": "並び順",
      "priceLow": "価格：安い順",
      "priceHigh": "価格：高い順",
      "dateNear": "日付：近い順",
      "dateFar": "日付：遠い順",
      "noFlights": "利用可能なフライトがありません",
      "noFlightsDescription": "現在利用可能なフライトがありません。後でもう一度確認するか、詳細情報についてお問い合わせください。",
      "bookFlight": "フライト予約",
      "from": "出発",
      "to": "到着",
      "date": "日付",
      "price": "価格",
      "passengers": "乗客",
      "aircraft": "航空機",
      "refresh": "更新",
      "availableFlights": "利用可能なフライト",
      "flightsAvailable": "エンプティレッグフライト利用可能",
      "updateDate": "更新："
    },
    "userManagement": {
      "title": "ユーザー管理",
      "subtitle": "ユーザーアカウントと権限の管理",
      "addUser": "ユーザー追加",
      "editUser": "ユーザー編集",
      "deleteUser": "ユーザー削除",
      "name": "名前",
      "phone": "電話",
      "status": "ステータス",
      "createdAt": "作成日",
      "actions": "操作",
      "active": "アクティブ",
      "inactive": "非アクティブ",
      "cancel": "キャンセル",
      "save": "保存",
      "edit": "編集",
      "delete": "削除",
      "noUsers": "ユーザーが見つかりません",
      "noUsersDescription": "最初のユーザーを追加して開始",
      "addFirstUser": "最初のユーザーを追加"
    },
    "marginSettings": {
      "title": "マージン設定",
      "subtitle": "すべてのフライト価格に適用するマージン率を設定",
      "marginPercentage": "マージン率 (%)",
      "placeholder": "率を入力 (例: 15.5)",
      "currentMargin": "現在のマージン",
      "save": "保存",
      "saving": "保存中...",
      "example": {
        "title": "価格例",
        "basePrice": "基本価格",
        "margin": "マージン",
        "finalPrice": "最終価格"
      }
    },
    "bookingDialog": {
      "title": "予約リクエスト",
      "subtitle": "詳細を提供していただければ、24時間以内にご連絡いたします。",
      "seats": " 席",
      "dateTBD": "日付未定",
      "contactInfo": "連絡先情報",
      "name": "名前",
      "namePlaceholder": "お名前を入力してください",
      "phone": "電話",
      "phonePlaceholder": "010-1234-5678",
      "email": "メールアドレス (任意)",
      "emailPlaceholder": "your.email@example.com",
      "consent": "プライバシーと同意",
      "contactConsentText": "フライト予約についてVONAERから連絡を受けることに同意します。",
      "privacyConsentText": "サービスを使用することで、以下を読み理解しました：",
      "privacyPolicy": "プライバシーポリシー",
      "privacyConsentText2": "に同意します。",
      "cancel": "キャンセル",
      "submit": "リクエスト送信",
      "submitting": "送信中..."
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

// Create final comprehensive translations for each language
Object.keys(completeTranslations).forEach(lang => {
  const translatedData = deepMerge(enData, completeTranslations[lang]);
  const outputFile = path.join(__dirname, 'messages', `${lang}.json`);
  
  fs.writeFileSync(outputFile, JSON.stringify(translatedData, null, 2), 'utf8');
  console.log(`Final update of ${lang}.json completed`);
});

console.log('Final comprehensive translation complete!');


