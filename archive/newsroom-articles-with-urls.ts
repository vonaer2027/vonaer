// Newsroom Articles with Media Outlet URLs
const newsroomArticles = [
  {
    id: 1,
    title: '본에어, 프라이빗 제트에 세계 최초 XR 명상 솔루션 도입… 이동에서 몰입으로',
    date: '2025.07.24',
    category: 'News', // Update category as needed
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1753340201.jpeg',
    url: 'https://www.enewstoday.co.kr/news/articleView.html?idxno=2267689' // ✅ Found
  },
  {
    id: 2,
    title: '러시아 우회 없이 유럽 간다 – 직선 항로 프라이빗 운항 개시',
    date: '2025.05.13',
    category: 'News', // Update category as needed
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1747125100.png',
    url: null // ❌ Not found
  },
  {
    id: 3,
    title: '본에어–더블미, 프라이빗 제트에 XR 콘텐츠 도입',
    date: '2025.04.22',
    category: 'News', // Update category as needed
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1745369545.jpg',
    url: 'https://www.edaily.co.kr/News/Read?newsId=02095926642138744&mediaCodeNo=257' // ✅ Found
  },
  {
    id: 4,
    title: '본에어, 英 소라와 30인승 eVTOL 도입',
    date: '2025.03.11',
    category: 'News', // Update category as needed
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1743040830.jpg',
    url: 'https://www.hankyung.com/article/202503116849i' // ✅ Found
  },
  {
    id: 5,
    title: '본에어 TIPS 최종 선정',
    date: '2024.11.09',
    category: 'News', // Update category as needed
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1736213859.png',
    url: 'https://www.edaily.co.kr/News/Read?newsId=02345206639087360&mediaCodeN' // ✅ Found
  },
  {
    id: 6,
    title: '본에어 골프 당일 라운딩 상품 출시',
    date: '2024.10.07',
    category: 'News', // Update category as needed
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1736732843.png',
    url: 'https://digitalchosun.dizzo.com/site/data/html_dir/2024/10/07/2024100780109.html' // ✅ Found
  },
  {
    id: 7,
    title: '본에어 프라이빗 제트 서비스 런칭',
    date: '2024.09.02',
    category: 'News', // Update category as needed
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1736213524.png',
    url: 'https://news.mtn.co.kr/news-detail/2024090214162775392' // ✅ Found
  },
  {
    id: 8,
    title: '본에어,  추석특가 프라이빗 헬기상품 판매',
    date: '2024.08.27',
    category: 'News', // Update category as needed
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1724727336.png',
    url: 'https://www.moneys.co.kr/article/2024082709355971587' // ✅ Found
  },
  {
    id: 9,
    title: '본에어, 아티스트 지원하는 한불 특별교류전 ‘블랑’ 후원사 참여',
    date: '2024.08.23',
    category: 'News', // Update category as needed
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1724727388.png',
    url: 'https://www.startupn.kr/news/articleView.html?idxno=47663' // ✅ Found
  },
  {
    id: 10,
    title: '본에어 서비스 그랜드 오픈',
    date: '2024.06.10',
    category: 'News', // Update category as needed
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1736125077.png',
    url: 'https://news.kbs.co.kr/news/mobile/view/view.do?ncd=7985353' // ✅ Found
  },
  {
    id: 11,
    title: '앱으로 헬리콥터 부른다...본에어 국내 첫 출시',
    date: '2024.04.23',
    category: 'News', // Update category as needed
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721293263.png',
    url: 'https://www.mk.co.kr/news/business/10997484' // ✅ Found
  },
  {
    id: 12,
    title: '강남서 인천공항까지 20분…44만원 헬기서비스 나온다',
    date: '2024.04.17',
    category: 'News', // Update category as needed
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721293272.png',
    url: 'https://www.mk.co.kr/news/business/10992778' // ✅ Found
  },
  {
    id: 13,
    title: '본에어, 올댓아너스클럽과 업무협약',
    date: '2024.04.02',
    category: 'News', // Update category as needed
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721714773.png',
    url: 'https://www.mk.co.kr/news/business/10980554' // ✅ Found
  },
  {
    id: 14,
    title: '본에어, UAM 제작사 오토플라이트와 MOU',
    date: '2024.03.05',
    category: 'News', // Update category as needed
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721293300.png',
    url: 'https://www.edaily.co.kr/news/read?newsId=02092646638820368&amp;mediaCodeNo=257&amp;OutLnkChk=Y' // ✅ Found
  },
  {
    id: 15,
    title: '본에어-아이엠택시, 지상 및 항공 교통 연계 MOU 체결',
    date: '2024.02.19',
    category: 'News', // Update category as needed
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721293313.png',
    url: 'https://www.mt.co.kr/future/2024/02/19/2024021910085959131' // ✅ Found
  },
  {
    id: 16,
    title: '도심 항공교통 서비스 스타트업 본에어, Global AAM Forum 참가',
    date: '2024.01.30',
    category: 'News', // Update category as needed
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721293324.png',
    url: 'https://www.hankyung.com/article/202401301807i' // ✅ Found
  },
  {
    id: 17,
    title: '모비에이션, 자사 VONAER(본에어) 맴버십 서비스 진행',
    date: '2023.12.19',
    category: 'News', // Update category as needed
    image: 'https://home-data-staging.s3.ap-northeast-2.amazonaws.com/home/newsroom/1721293331.png',
    url: 'https://www.paxetv.com/news/articleView.html?idxno=192506' // ✅ Found
  }
]