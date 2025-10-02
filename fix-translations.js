const fs = require('fs');
const path = require('path');

// Read the English file
const enFile = path.join(__dirname, 'messages', 'en.json');
const enData = JSON.parse(fs.readFileSync(enFile, 'utf8'));

// Complete Korean translations
const koreanTranslations = {
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
    "learnMore": "더 알아보기",
    "tourPackages": {
      "title": "투어 패키지",
      "gwanakMountain": {
        "name": "관악산",
        "route": "COEX → 잠실 → 양재숲 → 서울놀이공원 → 관악산",
        "tags": {
          "tag1": "단풍 투어",
          "tag2": "봄꽃 투어",
          "tag3": "서울놀이공원 투어"
        }
      },
      "hanRiver": {
        "name": "한강",
        "route": "COEX → 롯데타워 → 석촌호수 → 올림픽공원 → 암사유적 → 남양주",
        "tags": {
          "tag1": "서울 스카이라인",
          "tag2": "석촌호수 벚꽃 투어",
          "tag3": "올림픽공원"
        }
      },
      "bukhanMountain": {
        "name": "북한산",
        "route": "COEX → 롯데타워 → 석촌호수 → 북한산 → 도봉산",
        "tags": {
          "tag1": "북한산 국립공원",
          "tag2": "서울 암산 투어"
        }
      },
      "dmz": {
        "name": "DMZ 투어",
        "route": "한국에서만 볼 수 있는 역사적 랜드마크를 목격하세요. DMZ 너머 하늘에서 북한의 숨막히는 경치를 경험하세요.",
        "tags": {
          "tag1": "DMZ 투어"
        }
      }
    },
    "usageGuide": {
      "title": "VONAER 이용 방법",
      "subtitle": "프리미엄 항공 경험 예약을 위한 간단한 단계",
      "steps": {
        "step1": {
          "title": "회원가입",
          "description": "VONAER 앱을 다운로드하고 개인 인증 과정을 완료하세요. 만 19세 이상의 성인만 등록할 수 있습니다."
        },
        "step2": {
          "title": "서비스 선택",
          "description": "프리미엄하고 맞춤형 여행 경험을 위해서는 VIP 전세 서비스인 VON 프라이빗을 선택하세요. 강남과 인천공항 간 빠른 이동을 원한다면 VON 루틴을 선택하세요. 하늘에서 잊을 수 없는 추억을 만들고 싶다면 VON 투어를 선택하세요."
        },
        "step3": {
          "title": "예약하기",
          "description": "원하는 장소와 날짜를 선택하고 예약 요청을 제출하세요."
        },
        "step4": {
          "title": "예약 승인 및 확인",
          "description": "관리자가 예약 세부사항을 검토하고 승인하면 예약이 확정됩니다."
        },
        "step5": {
          "title": "탑승",
          "description": "예정된 시간에 헬리패드에 도착하여 간단한 탑승 절차를 완료하고 안전 요원의 지시에 따라 헬리콥터에 탑승하세요."
        },
        "step6": {
          "title": "하기",
          "description": "착륙 후 VON 렌터카 또는 VON 리무진으로 라스트 마일 이동을 통해 최종 목적지까지 편안하게 여행을 계속하세요."
        }
      }
    }
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
  "about": {
    "coreValues": {
      "value1": {
        "title": "시간 효율성",
        "description": "우리는 무엇보다 고객의 시간을 소중히 여기며, 가장 빠른 경로와 최소한의 대기 시간을 제공합니다."
      },
      "value2": {
        "title": "안전 우선",
        "description": "엄격한 정비와 인증된 조종사를 통해 안전에 대한 우리의 약속은 흔들리지 않습니다."
      },
      "value3": {
        "title": "럭셔리 경험",
        "description": "모든 여행은 최고의 편안함과 세련됨을 제공하도록 세심하게 계획됩니다."
      },
      "value4": {
        "title": "혁신",
        "description": "우리는 최신 항공 기술과 서비스를 제공하기 위해 지속적으로 혁신합니다."
      }
    },
    "companyStory": {
      "title": "우리의 이야기",
      "description": "VONAER는 한국의 도시 항공 모빌리티를 혁신하겠다는 비전으로 설립되었습니다. 우리는 프리미엄 항공 여행이 접근 가능하고, 효율적이며, 환경을 고려해야 한다고 믿습니다. 항공 전문가와 기술 혁신가로 구성된 우리 팀은 오늘 여러분에게 교통의 미래를 가져다주기 위해 끊임없이 노력하고 있습니다."
    },
    "appDownload": {
      "title": "VONAER 앱 다운로드",
      "subtitle": "손끝에서 항공 여행의 미래를 경험하세요",
      "button": "앱 다운로드"
    }
  }
};

// Complete Chinese translations
const chineseTranslations = {
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
    "learnMore": "了解更多",
    "tourPackages": {
      "title": "旅游套餐",
      "gwanakMountain": {
        "name": "冠岳山",
        "route": "COEX → 蚕室 → 良才森林 → 首尔游乐园 → 冠岳山",
        "tags": {
          "tag1": "秋叶之旅",
          "tag2": "春花之旅",
          "tag3": "首尔游乐园之旅"
        }
      },
      "hanRiver": {
        "name": "汉江",
        "route": "COEX → 乐天塔 → 石村湖 → 奥林匹克公园 → 岩寺遗址 → 南杨州",
        "tags": {
          "tag1": "首尔天际线",
          "tag2": "石村湖樱花之旅",
          "tag3": "奥林匹克公园"
        }
      },
      "bukhanMountain": {
        "name": "北汉山",
        "route": "COEX → 乐天塔 → 石村湖 → 北汉山 → 道峰山",
        "tags": {
          "tag1": "北汉山国立公园",
          "tag2": "首尔岩山之旅"
        }
      },
      "dmz": {
        "name": "DMZ旅游",
        "route": "见证仅在韩国可见的历史地标。从天空中体验跨越DMZ的朝鲜令人叹为观止的景色。",
        "tags": {
          "tag1": "DMZ旅游"
        }
      }
    },
    "usageGuide": {
      "title": "如何使用VONAER",
      "subtitle": "预订优质航班体验的简单步骤",
      "steps": {
        "step1": {
          "title": "注册",
          "description": "下载VONAER应用并完成个人验证过程。只有19岁或以上的成年人才能注册。"
        },
        "step2": {
          "title": "选择您的服务",
          "description": "为了获得优质、定制的旅行体验，请选择VIP包机服务VON私人。如果您想在江南和仁川机场之间快速转移，请选择VON常规。要在天空中创造难忘的回忆，请选择VON旅游。"
        },
        "step3": {
          "title": "预订",
          "description": "选择您喜欢的地点和日期，并提交您的预订请求。"
        },
        "step4": {
          "title": "预订批准和确认",
          "description": "管理员审核并批准您的预订详情后，您的预订将得到确认。"
        },
        "step5": {
          "title": "登机",
          "description": "在预定时间到达直升机停机坪，完成快速登机程序，并按照安全人员的指示登上直升机。"
        },
        "step6": {
          "title": "下机",
          "description": "着陆后，通过VON租车或VON豪华轿车进行最后一英里转移，舒适地继续您的旅程到最终目的地。"
        }
      }
    }
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
  "about": {
    "coreValues": {
      "value1": {
        "title": "时间效率",
        "description": "我们最重视您的时间，提供最快的路线和最少的等待时间。"
      },
      "value2": {
        "title": "安全第一",
        "description": "我们对安全的承诺坚定不移，拥有严格的维护和认证飞行员。"
      },
      "value3": {
        "title": "奢华体验",
        "description": "每次旅程都经过精心设计，提供极致的舒适和精致。"
      },
      "value4": {
        "title": "创新",
        "description": "我们不断创新，为您带来最新的航空技术和服务。"
      }
    },
    "companyStory": {
      "title": "我们的故事",
      "description": "VONAER成立时怀着革新韩国城市航空移动的愿景。我们相信优质航空旅行应该是可及的、高效的和环保的。我们的航空专家和技术创新者团队不懈努力，为您带来今天的交通未来。"
    },
    "appDownload": {
      "title": "下载VONAER应用",
      "subtitle": "在您的指尖体验航空旅行的未来",
      "button": "下载应用"
    }
  }
};

// Complete Japanese translations
const japaneseTranslations = {
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
    "learnMore": "詳細を見る",
    "tourPackages": {
      "title": "ツアーパッケージ",
      "gwanakMountain": {
        "name": "冠岳山",
        "route": "COEX → 蚕室 → 良才の森 → ソウル遊園地 → 冠岳山",
        "tags": {
          "tag1": "紅葉ツアー",
          "tag2": "春の花ツアー",
          "tag3": "ソウル遊園地ツアー"
        }
      },
      "hanRiver": {
        "name": "漢江",
        "route": "COEX → ロッテタワー → 石村湖 → オリンピック公園 → 岩寺遺跡 → 南楊州",
        "tags": {
          "tag1": "ソウルスカイライン",
          "tag2": "石村湖桜ツアー",
          "tag3": "オリンピック公園"
        }
      },
      "bukhanMountain": {
        "name": "北漢山",
        "route": "COEX → ロッテタワー → 石村湖 → 北漢山 → 道峰山",
        "tags": {
          "tag1": "北漢山国立公園",
          "tag2": "ソウル岩山ツアー"
        }
      },
      "dmz": {
        "name": "DMZツアー",
        "route": "韓国でのみ見ることができる歴史的ランドマークを目撃してください。DMZを越えて空から北朝鮮の息をのむような景色を体験してください。",
        "tags": {
          "tag1": "DMZツアー"
        }
      }
    },
    "usageGuide": {
      "title": "VONAERの使用方法",
      "subtitle": "プレミアムフライト体験を予約するための簡単なステップ",
      "steps": {
        "step1": {
          "title": "サインアップ",
          "description": "VONAERアプリをダウンロードし、個人認証プロセスを完了してください。19歳以上の成人のみ登録できます。"
        },
        "step2": {
          "title": "サービスを選択",
          "description": "プレミアムでカスタマイズされた旅行体験には、VIPチャーターサービスのVONプライベートを選択してください。江南と仁川空港間の高速移動をお望みの場合は、VONルーチンを選択してください。空で忘れられない思い出を作りたい場合は、VONツアーを選択してください。"
        },
        "step3": {
          "title": "予約する",
          "description": "お好みの場所と日付を選択し、予約リクエストを送信してください。"
        },
        "step4": {
          "title": "予約承認と確認",
          "description": "管理者が予約詳細を確認し承認すると、予約が確定されます。"
        },
        "step5": {
          "title": "搭乗",
          "description": "予定時刻にヘリポートに到着し、簡単な搭乗手続きを完了し、安全スタッフの指示に従ってヘリコプターに搭乗してください。"
        },
        "step6": {
          "title": "降機",
          "description": "着陸後、VONレンタカーまたはVONリムジンでラストマイル移動を利用して、最終目的地まで快適に旅を続けてください。"
        }
      }
    }
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
  "about": {
    "coreValues": {
      "value1": {
        "title": "時間効率",
        "description": "私たちは何よりもお客様の時間を大切にし、最速のルートと最小限の待ち時間を提供します。"
      },
      "value2": {
        "title": "安全第一",
        "description": "厳格な整備と認定パイロットによる安全への取り組みは揺るぎません。"
      },
      "value3": {
        "title": "ラグジュアリー体験",
        "description": "すべての旅は究極の快適さと洗練を提供するよう細心に作られています。"
      },
      "value4": {
        "title": "イノベーション",
        "description": "私たちは最新の航空技術とサービスをお届けするため継続的に革新しています。"
      }
    },
    "companyStory": {
      "title": "私たちのストーリー",
      "description": "VONAERは韓国の都市航空モビリティを革命化するビジョンを持って設立されました。私たちはプレミアム航空旅行がアクセス可能で、効率的で、環境に配慮したものであるべきだと信じています。航空専門家と技術革新者のチームが、今日皆様に交通の未来をお届けするため絶え間なく働いています。"
    },
    "appDownload": {
      "title": "VONAERアプリをダウンロード",
      "subtitle": "指先で航空旅行の未来を体験",
      "button": "アプリをダウンロード"
    }
  }
};

// Function to recursively replace translations
function applyTranslations(obj, translations) {
  const result = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Recursively apply translations to nested objects
      if (translations[key]) {
        result[key] = applyTranslations(value, translations[key]);
      } else {
        result[key] = applyTranslations(value, {});
      }
    } else {
      // Apply translation if available, otherwise keep original
      result[key] = translations[key] !== undefined ? translations[key] : value;
    }
  }
  
  return result;
}

// Apply translations to each language
const languages = {
  'kr': koreanTranslations,
  'cn': chineseTranslations,
  'jp': japaneseTranslations
};

Object.entries(languages).forEach(([lang, translations]) => {
  const translatedData = applyTranslations(enData, translations);
  const outputFile = path.join(__dirname, 'messages', `${lang}.json`);
  
  fs.writeFileSync(outputFile, JSON.stringify(translatedData, null, 2), 'utf8');
  console.log(`Updated ${lang}.json with proper translations`);
});

console.log('All translations have been properly applied!');


