const fs = require('fs');
const path = require('path');

// Read the current Korean file to get the pattern
const krFile = path.join(__dirname, 'messages', 'kr.json');
const krData = JSON.parse(fs.readFileSync(krFile, 'utf8'));

// Chinese translations for the same sections
const chineseUpdates = {
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
};

// Japanese translations for the same sections
const japaneseUpdates = {
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

// Read and update Chinese file
const cnFile = path.join(__dirname, 'messages', 'cn.json');
const cnData = JSON.parse(fs.readFileSync(cnFile, 'utf8'));
cnData.services = deepMerge(cnData.services, chineseUpdates);
fs.writeFileSync(cnFile, JSON.stringify(cnData, null, 2), 'utf8');

// Read and update Japanese file
const jpFile = path.join(__dirname, 'messages', 'jp.json');
const jpData = JSON.parse(fs.readFileSync(jpFile, 'utf8'));
jpData.services = deepMerge(jpData.services, japaneseUpdates);
fs.writeFileSync(jpFile, JSON.stringify(jpData, null, 2), 'utf8');

console.log('Applied translations to Chinese and Japanese files');
console.log('All landing page translations are now complete!');


