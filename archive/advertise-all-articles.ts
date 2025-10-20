// Complete content from vonaer.com/advertise

// NEWSROOM (18 items)
const newsroomArticles = [
  {
    id: 1,
    title: '본에어의 특별한 소식을 뉴스룸에서 만나보세요.',
    date: '2025.07.24',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1753340201.jpeg',
    url: null // ❌
  },
  {
    id: 2,
    title: '본에어, 프라이빗 제트에 세계 최초 XR 명상 솔루션 도입… 이동에서 몰입으로',
    date: '2025.07.24',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1753340201.jpeg',
    url: null // ❌
  },
  {
    id: 3,
    title: '러시아 우회 없이 유럽 간다 – 직선 항로 프라이빗 운항 개시',
    date: '2025.05.13',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1747125100.png',
    url: 'https://www.yna.co.kr/view/AKR20250513076900003?input=1195m' // ✅
  },
  {
    id: 4,
    title: '본에어–더블미, 프라이빗 제트에 XR 콘텐츠 도입',
    date: '2025.04.22',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1745369545.jpg',
    url: 'https://www.edaily.co.kr/News/Read?newsId=02095926642138744&mediaCodeNo=257' // ✅
  },
  {
    id: 5,
    title: '본에어, 英 소라와 30인승 eVTOL 도입',
    date: '2025.03.11',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1743040830.jpg',
    url: 'https://www.hankyung.com/article/202503116849i' // ✅
  },
  {
    id: 6,
    title: '본에어 TIPS 최종 선정',
    date: '2024.11.09',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1736213859.png',
    url: 'https://www.edaily.co.kr/News/Read?newsId=02345206639087360&mediaCodeN' // ✅
  },
  {
    id: 7,
    title: '본에어 골프 당일 라운딩 상품 출시',
    date: '2024.10.07',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1736732843.png',
    url: 'https://bit.ly/4gHkPv7' // ✅
  },
  {
    id: 8,
    title: '본에어 프라이빗 제트 서비스 런칭',
    date: '2024.09.02',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1736213524.png',
    url: 'https://news.mtn.co.kr/news-detail/2024090214162775392' // ✅
  },
  {
    id: 9,
    title: '본에어,  추석특가 프라이빗 헬기상품 판매',
    date: '2024.08.27',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1724727336.png',
    url: 'https://www.moneys.co.kr/article/2024082709355971587' // ✅
  },
  {
    id: 10,
    title: '본에어, 아티스트 지원하는 한불 특별교류전 ‘블랑’ 후원사 참여',
    date: '2024.08.23',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1724727388.png',
    url: 'https://www.startupn.kr/news/articleView.html?idxno=47663' // ✅
  },
  {
    id: 11,
    title: '본에어 서비스 그랜드 오픈',
    date: '2024.06.10',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1736125077.png',
    url: 'https://news.kbs.co.kr/news/mobile/view/view.do?ncd=7985353' // ✅
  },
  {
    id: 12,
    title: '앱으로 헬리콥터 부른다...본에어 국내 첫 출시',
    date: '2024.04.23',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721293263.png',
    url: 'https://www.mk.co.kr/news/business/10997484' // ✅
  },
  {
    id: 13,
    title: '강남서 인천공항까지 20분…44만원 헬기서비스 나온다',
    date: '2024.04.17',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721293272.png',
    url: 'https://www.mk.co.kr/news/business/10992778' // ✅
  },
  {
    id: 14,
    title: '본에어, 올댓아너스클럽과 업무협약',
    date: '2024.04.02',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721714773.png',
    url: 'https://www.mk.co.kr/news/business/10980554' // ✅
  },
  {
    id: 15,
    title: '본에어, UAM 제작사 오토플라이트와 MOU',
    date: '2024.03.05',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721293300.png',
    url: 'https://www.edaily.co.kr/news/read?newsId=02092646638820368&amp;mediaCodeNo=257&amp;OutLnkChk=Y' // ✅
  },
  {
    id: 16,
    title: '본에어-아이엠택시, 지상 및 항공 교통 연계 MOU 체결',
    date: '2024.02.19',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721293313.png',
    url: 'https://www.mt.co.kr/future/2024/02/19/2024021910085959131' // ✅
  },
  {
    id: 17,
    title: '도심 항공교통 서비스 스타트업 본에어, Global AAM Forum 참가',
    date: '2024.01.30',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721293324.png',
    url: 'https://www.hankyung.com/article/202401301807i' // ✅
  },
  {
    id: 18,
    title: '모비에이션, 자사 VONAER(본에어) 맴버십 서비스 진행',
    date: '2023.12.19',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721293331.png',
    url: 'https://www.paxetv.com/news/articleView.html?idxno=192506' // ✅
  }
]

// NEWSLETTER (13 items)
const newsletterArticles = [
  {
    id: 1,
    title: '본에어 뉴스레터를 구독하고특별한 경험을 제공하는 본에어의 소식을 이메일로 받아보세요.',
    date: '2025.08.31',
    category: 'Uncategorized',
    image: 'data:image/svg+xml,%3csvg%20width='12'%20height='13'%20viewBox='0%200%2012%2013'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Vector%2020'%20d='M1%2011.8843L11.5%201.38428M11.5%201.38428H1M11.5%201.38428V11.8843'%20stroke='%23053D44'/%3e%3c/svg%3e',
    url: null // ❌
  },
  {
    id: 2,
    title: '빌게이츠와 같이 모실께요',
    date: '2025.08.31',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1758786333.jpg',
    url: null // ❌
  },
  {
    id: 3,
    title: '텃밭에서 스타트업의 전략을 발견했어요',
    date: '2025.07.31',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1756277351.png',
    url: 'https://vonaer.stibee.com/p/69' // ✅
  },
  {
    id: 4,
    title: '\'시간부자\'로 만들어드릴께요!',
    date: '2025.06.30',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1751252351.jpg',
    url: 'https://vonaer.stibee.com/p/68' // ✅
  },
  {
    id: 5,
    title: '제트기 타고 친구랑 오사카 가실래요?',
    date: '2025.05.30',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1749619590.png',
    url: 'https://vonaer.stibee.com/p/67/' // ✅
  },
  {
    id: 6,
    title: '세계 최고 부자와 구독자님과의 공통점은?',
    date: '2025.04.30',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1749621081.jpg',
    url: 'https://vonaer.stibee.com/p/66/' // ✅
  },
  {
    id: 7,
    title: '하늘의 페라리, 팔콘8X 를 타고 나르샤',
    date: '2025.03.26',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1743040977.jpg',
    url: 'https://vonaer.stibee.com/p/64/' // ✅
  },
  {
    id: 8,
    title: '구독자님 90% 할인된 프라이빗제트 정보를 놓치지 마세요.',
    date: '2025.02.25',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1740549915.png',
    url: 'https://vonaer.stibee.com/p/62/' // ✅
  },
  {
    id: 9,
    title: '구독자님 최대 70% 할인된 프라이빗제트기 타보시겠어요?',
    date: '2025.01.23',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1737703382.png',
    url: 'https://vonaer.stibee.com/p/61/' // ✅
  },
  {
    id: 10,
    title: '특히 구독자님께 감사드립니다',
    date: '2025.01.07',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1736991826.png',
    url: 'https://vonaer.stibee.com/p/60/' // ✅
  },
  {
    id: 11,
    title: '헬싱키 공항에 서서 구독자님의 이름을 떠올렸어요.',
    date: '2024.11.28',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1732856746.png',
    url: 'https://vonaer.stibee.com/p/59/' // ✅
  },
  {
    id: 12,
    title: '여수/남해로 골프치러 갈 친구 8명 모이세요',
    date: '2024.10.08',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1728356599.png',
    url: 'https://vonaer.stibee.com/p/58/' // ✅
  },
  {
    id: 13,
    title: '헬기타고 구독자님 고향 앞으로',
    date: '2024.09.24',
    category: 'Uncategorized',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1727144186.png',
    url: 'https://vonaer.stibee.com/p/57/' // ✅
  }
]

// NOTICES (2 items)
const noticesArticles = [
  {
    id: 1,
    title: '본에어의 공지사항을 알려드립니다.',
    date: 'No date',
    category: 'Uncategorized',
    image: 'No image',
    url: null // ❌
  },
  {
    id: 2,
    title: 'No title',
    date: 'No date',
    category: 'Uncategorized',
    image: 'No image',
    url: null // ❌
  }
]

// OTHER (39 items)
const otherArticles = [
  {
    id: 1,
    title: '본에어, 프라이빗 제트에 세계 최초 XR 명상 솔루션 도입… 이동에서 몰입으로',
    date: '2025.07.24',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1753340201.jpeg',
    url: null // ❌
  },
  {
    id: 2,
    title: '러시아 우회 없이 유럽 간다 – 직선 항로 프라이빗 운항 개시',
    date: '2025.05.13',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1747125100.png',
    url: 'https://www.yna.co.kr/view/AKR20250513076900003?input=1195m' // ✅
  },
  {
    id: 3,
    title: '본에어–더블미, 프라이빗 제트에 XR 콘텐츠 도입',
    date: '2025.04.22',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1745369545.jpg',
    url: 'https://www.edaily.co.kr/News/Read?newsId=02095926642138744&mediaCodeNo=257' // ✅
  },
  {
    id: 4,
    title: '본에어, 英 소라와 30인승 eVTOL 도입',
    date: '2025.03.11',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1743040830.jpg',
    url: 'https://www.hankyung.com/article/202503116849i' // ✅
  },
  {
    id: 5,
    title: '본에어 TIPS 최종 선정',
    date: '2024.11.09',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1736213859.png',
    url: 'https://www.edaily.co.kr/News/Read?newsId=02345206639087360&mediaCodeN' // ✅
  },
  {
    id: 6,
    title: '본에어 골프 당일 라운딩 상품 출시',
    date: '2024.10.07',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1736732843.png',
    url: 'https://digitalchosun.dizzo.com/site/data/html_dir/2024/10/07/2024100780109.html' // ✅
  },
  {
    id: 7,
    title: '본에어 프라이빗 제트 서비스 런칭',
    date: '2024.09.02',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1736213524.png',
    url: 'https://news.mtn.co.kr/news-detail/2024090214162775392' // ✅
  },
  {
    id: 8,
    title: '본에어,  추석특가 프라이빗 헬기상품 판매',
    date: '2024.08.27',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1724727336.png',
    url: 'https://www.moneys.co.kr/article/2024082709355971587' // ✅
  },
  {
    id: 9,
    title: '본에어, 아티스트 지원하는 한불 특별교류전 ‘블랑’ 후원사 참여',
    date: '2024.08.23',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1724727388.png',
    url: 'https://www.startupn.kr/news/articleView.html?idxno=47663' // ✅
  },
  {
    id: 10,
    title: '본에어 서비스 그랜드 오픈',
    date: '2024.06.10',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1736125077.png',
    url: 'https://news.kbs.co.kr/news/mobile/view/view.do?ncd=7985353' // ✅
  },
  {
    id: 11,
    title: '앱으로 헬리콥터 부른다...본에어 국내 첫 출시',
    date: '2024.04.23',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721293263.png',
    url: 'https://www.mk.co.kr/news/business/10997484' // ✅
  },
  {
    id: 12,
    title: '강남서 인천공항까지 20분…44만원 헬기서비스 나온다',
    date: '2024.04.17',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721293272.png',
    url: 'https://www.mk.co.kr/news/business/10992778' // ✅
  },
  {
    id: 13,
    title: '본에어, 올댓아너스클럽과 업무협약',
    date: '2024.04.02',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721714773.png',
    url: 'https://www.mk.co.kr/news/business/10980554' // ✅
  },
  {
    id: 14,
    title: '본에어, UAM 제작사 오토플라이트와 MOU',
    date: '2024.03.05',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721293300.png',
    url: 'https://www.edaily.co.kr/news/read?newsId=02092646638820368&amp;mediaCodeNo=257&amp;OutLnkChk=Y' // ✅
  },
  {
    id: 15,
    title: '본에어-아이엠택시, 지상 및 항공 교통 연계 MOU 체결',
    date: '2024.02.19',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721293313.png',
    url: 'https://www.mt.co.kr/future/2024/02/19/2024021910085959131' // ✅
  },
  {
    id: 16,
    title: '도심 항공교통 서비스 스타트업 본에어, Global AAM Forum 참가',
    date: '2024.01.30',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721293324.png',
    url: 'https://www.hankyung.com/article/202401301807i' // ✅
  },
  {
    id: 17,
    title: '모비에이션, 자사 VONAER(본에어) 맴버십 서비스 진행',
    date: '2023.12.19',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721293331.png',
    url: 'https://www.paxetv.com/news/articleView.html?idxno=192506' // ✅
  },
  {
    id: 18,
    title: '빌게이츠와 같이 모실께요',
    date: '2025.08.31',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1758786333.jpg',
    url: null // ❌
  },
  {
    id: 19,
    title: '텃밭에서 스타트업의 전략을 발견했어요',
    date: '2025.07.31',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1756277351.png',
    url: 'https://vonaer.stibee.com/p/69' // ✅
  },
  {
    id: 20,
    title: '\'시간부자\'로 만들어드릴께요!',
    date: '2025.06.30',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1751252351.jpg',
    url: 'https://vonaer.stibee.com/p/68' // ✅
  },
  {
    id: 21,
    title: '제트기 타고 친구랑 오사카 가실래요?',
    date: '2025.05.30',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1749619590.png',
    url: 'https://vonaer.stibee.com/p/67/' // ✅
  },
  {
    id: 22,
    title: '세계 최고 부자와 구독자님과의 공통점은?',
    date: '2025.04.30',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1749621081.jpg',
    url: 'https://vonaer.stibee.com/p/66/' // ✅
  },
  {
    id: 23,
    title: '하늘의 페라리, 팔콘8X 를 타고 나르샤',
    date: '2025.03.26',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1743040977.jpg',
    url: 'https://vonaer.stibee.com/p/64/' // ✅
  },
  {
    id: 24,
    title: '구독자님 90% 할인된 프라이빗제트 정보를 놓치지 마세요.',
    date: '2025.02.25',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1740549915.png',
    url: 'https://vonaer.stibee.com/p/62/' // ✅
  },
  {
    id: 25,
    title: '구독자님 최대 70% 할인된 프라이빗제트기 타보시겠어요?',
    date: '2025.01.23',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1737703382.png',
    url: 'https://vonaer.stibee.com/p/61/' // ✅
  },
  {
    id: 26,
    title: '특히 구독자님께 감사드립니다',
    date: '2025.01.07',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1736991826.png',
    url: 'https://vonaer.stibee.com/p/60/' // ✅
  },
  {
    id: 27,
    title: '헬싱키 공항에 서서 구독자님의 이름을 떠올렸어요.',
    date: '2024.11.28',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1732856746.png',
    url: 'https://vonaer.stibee.com/p/59/' // ✅
  },
  {
    id: 28,
    title: '여수/남해로 골프치러 갈 친구 8명 모이세요',
    date: '2024.10.08',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1728356599.png',
    url: 'https://vonaer.stibee.com/p/58/' // ✅
  },
  {
    id: 29,
    title: '헬기타고 구독자님 고향 앞으로',
    date: '2024.09.24',
    category: 'undefined',
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsletter/1727144186.png',
    url: 'https://vonaer.stibee.com/p/57/' // ✅
  },
  {
    id: 30,
    title: '[KR] VONAER Brand Film (ver.1)',
    date: 'No date',
    category: 'undefined',
    image: 'data:image/png;base64,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',
    url: null // ❌
  },
  {
    id: 31,
    title: '[EN] VONAER Brand Film (ver.1)',
    date: 'No date',
    category: 'undefined',
    image: 'data:image/png;base64,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',
    url: null // ❌
  },
  {
    id: 32,
    title: 'VONAER Teaser',
    date: 'No date',
    category: 'undefined',
    image: 'data:image/png;base64,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',
    url: null // ❌
  },
  {
    id: 33,
    title: '연합뉴스TV 출근길 인터뷰',
    date: 'No date',
    category: 'undefined',
    image: 'data:image/png;base64,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',
    url: null // ❌
  },
  {
    id: 34,
    title: '한국형 도심항공교통(K-UAM·Urban Air Mobility) 그랜드챌린지 공개 비행 시연 행사',
    date: 'No date',
    category: 'undefined',
    image: 'data:image/png;base64,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',
    url: null // ❌
  },
  {
    id: 35,
    title: '2023 서울모빌리티쇼 현장 스케치',
    date: 'No date',
    category: 'undefined',
    image: 'data:image/png;base64,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',
    url: null // ❌
  },
  {
    id: 36,
    title: '2023 THE 1ST TAKE-OFF - VONAER Launching Event Sketch',
    date: 'No date',
    category: 'undefined',
    image: 'data:image/png;base64,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',
    url: null // ❌
  },
  {
    id: 37,
    title: '2022 K-UAM 첫째날 행사 스케치',
    date: 'No date',
    category: 'undefined',
    image: 'data:image/png;base64,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',
    url: null // ❌
  },
  {
    id: 38,
    title: 'VONAER 안전영상 (Korean Ver.)',
    date: 'No date',
    category: 'undefined',
    image: 'data:image/png;base64,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',
    url: null // ❌
  },
  {
    id: 39,
    title: 'VONAER Safety Video (English Subs Ver.)',
    date: 'No date',
    category: 'undefined',
    image: 'data:image/png;base64,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',
    url: null // ❌
  }
]

