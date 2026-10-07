// 챔댕슝슝 기본 데이터. 앱에서 수정한 일정은 기기에 따로 저장되고, 이 파일은 초기값으로만 쓰인다.
window.TRIP = {
  title: '챔댕슝슝',
  start: '2026-10-08',
  end: '2026-10-11',
  days: [
    { date: '2026-10-08', label: '10.8', dow: '목', name: '야시장', color: 'pink' },
    { date: '2026-10-09', label: '10.9', dow: '금', name: '스노클링', color: 'sky' },
    { date: '2026-10-10', label: '10.10', dow: '토', name: '타이난', color: 'lemon' },
    { date: '2026-10-11', label: '10.11', dow: '일', name: '가오슝', color: 'mint' }
  ],
  hotels: [
    { name: 'Kindness Hotel 가오슝역점', zh: '康橋商旅 高雄車站館', addr: '高雄市三民區建國二路295號', q: 'Kindness Hotel Kaohsiung Main Station', in: '10/8 15:00', out: '10/10 12:00', perk: '조식 포함 · 로비 커피/아이스크림 무료 · 짐 보관 무료' },
    { name: '그랜드 하이라이', zh: '漢來大飯店', addr: '高雄市前金區成功一路266號', q: 'Grand Hi-Lai Hotel Kaohsiung', in: '10/10 15:00', out: '10/11 11:00', perk: '한신백화점 바로 옆 · MRT 중앙공원역(R9) 도보 약 10분' }
  ]
};

// mode: plane, mrt, lrt, walk, taxi, shuttle, ferry, scooter, boat
window.DEFAULT_ITEMS = [
  // ── 10/8 목 ──
  { id: 'd1-1', day: '2026-10-08', time: '12:00', kind: 'plane', title: '가오슝 공항 도착', zh: '高雄國際機場', q: 'Kaohsiung International Airport', lat: 22.5771, lng: 120.3500,
    tip: '도착 시간은 항공편에 맞게 수정하세요. 입국장 나와서 MRT 표지판 따라 R4 공항역으로. 편의점에서 iPASS/EasyCard 충전하면 MRT·버스·편의점 다 됩니다.' },
  { id: 'd1-2', day: '2026-10-08', time: '13:00', kind: 'hotel', title: '킨드니스 호텔 (짐 맡기기)', zh: '康橋商旅 高雄車站館', addr: '高雄市三民區建國二路295號', q: 'Kindness Hotel Kaohsiung Main Station', lat: 22.6379, lng: 120.3040,
    move: { mode: 'mrt', text: 'MRT 레드 R4 공항 → R11 가오슝역 · 약 20분 · NT$35 안팎' },
    tip: '체크인은 15:00. 먼저 짐만 맡기고 점심. 가오슝역 MRT 출구에서 길 건너 도보 5분.' },
  { id: 'd1-3', day: '2026-10-08', time: '13:30', kind: 'eat', title: '점심 · 역 근처 우육면', zh: '高雄車站 牛肉麵', q: 'beef noodle near Kaohsiung Main Station', lat: 22.6370, lng: 120.3020,
    move: { mode: 'walk', text: '도보 5~10분' },
    tip: '역 지하상가나 건국로 주변 식당. 가볍게 먹고 야시장에서 본게임.' },
  { id: 'd1-4', day: '2026-10-08', time: '15:00', kind: 'hotel', title: '체크인 & 휴식', zh: '康橋商旅 高雄車站館', addr: '高雄市三民區建國二路295號', q: 'Kindness Hotel Kaohsiung Main Station', lat: 22.6379, lng: 120.3040,
    move: { mode: 'walk', text: '도보 5분' },
    tip: '로비 무료 커피·아이스크림 챙기기. 저녁 일정 전 샤워하고 쉬기.' },
  { id: 'd1-5', day: '2026-10-08', time: '16:00', kind: 'sight', title: '빛의 돔 (메이리다오역)', zh: '捷運美麗島站 光之穹頂', q: 'Formosa Boulevard Station Dome of Light', lat: 22.6313, lng: 120.3021,
    move: { mode: 'mrt', text: 'MRT 레드 R11 → R10 메이리다오 · 1정거장 · 2분' },
    tip: '역 안이라 무료. 개찰구 밖 지하 홀 중앙에서 위를 보고 사진.' },
  { id: 'd1-6', day: '2026-10-08', time: '16:40', kind: 'sight', title: '보얼예술특구 & 노을', zh: '駁二藝術特區', q: 'Pier-2 Art Center', lat: 22.6199, lng: 120.2814,
    move: { mode: 'mrt', text: 'MRT 오렌지 O5 → O2 옌청푸 · 4정거장 · 약 8분' },
    tip: '창고 거리 산책, 대형 조형물 앞에서 커플사진. 10월 일몰 17:40 전후, 항구 쪽으로.' },
  { id: 'd1-7', day: '2026-10-08', time: '19:00', kind: 'eat', title: '루이펑 야시장', zh: '瑞豐夜市', q: 'Ruifeng Night Market', lat: 22.6659, lng: 120.2995,
    move: { mode: 'mrt', text: 'O2 → O5 환승 → 레드 R14 거단역(Kaohsiung Arena) · 약 25분' },
    tip: '월·수 휴무, 목요일은 영업. 현지인 야시장이라 좁고 붐빔. 현금 준비.' },
  { id: 'd1-8', day: '2026-10-08', time: '21:30', kind: 'hotel', title: '호텔 복귀', zh: '康橋商旅 高雄車站館', addr: '高雄市三民區建國二路295號', q: 'Kindness Hotel Kaohsiung Main Station', lat: 22.6379, lng: 120.3040,
    move: { mode: 'mrt', text: 'MRT 레드 R14 → R11 · 3정거장 · 약 6분' },
    tip: '내일 아침 9시 셔틀. 수영복·래시가드·방수팩·멀미약 미리 챙기기.' },

  // ── 10/9 금 · 류큐 ──
  { id: 'd2-1', day: '2026-10-09', time: '08:45', kind: 'move', title: '가오슝역 셔틀 집결', zh: '高雄車站', q: 'Kaohsiung Main Station', lat: 22.6394, lng: 120.3025,
    move: { mode: 'walk', text: '호텔에서 도보 5분' },
    tip: '셔틀 09:00 출발. 15분 전 도착. 투어사 안내 메시지의 집결 위치를 우선으로.' },
  { id: 'd2-2', day: '2026-10-09', time: '10:00', kind: 'move', title: '동강 항구', zh: '東港碼頭', addr: '屏東縣東港鎮朝隆路43號', q: 'Donggang Ferry Terminal', lat: 22.4655, lng: 120.4447,
    move: { mode: 'shuttle', text: '셔틀버스 · 약 1시간' },
    tip: '페리 동강→류큐 07:20·09:00·10:30·12:00·13:30·15:30·16:50 (시즌별 변동). 25분 소요. 여권 지참.' },
  { id: 'd2-3', day: '2026-10-09', time: '11:00', kind: 'sea', title: '류큐 도착 · 바이샤항', zh: '小琉球 白沙觀光港', q: 'Baisha Port Xiaoliuqiu', lat: 22.3510, lng: 120.3786,
    move: { mode: 'ferry', text: '페리 · 약 25분' },
    tip: '배에서 멀미 잦음. 출발 30분 전 멀미약.' },
  { id: 'd2-4', day: '2026-10-09', time: '11:30', kind: 'sea', title: '스노쿨링 · 바다거북', zh: '小琉球 浮潛', q: 'Xiaoliuqiu snorkeling', lat: 22.3443, lng: 120.3637,
    move: { mode: 'scooter', text: '투어 차량/스쿠터' },
    tip: '거북이 만지면 벌금(최대 NT$30,000). 거리 3m 유지. 리프 손대지 않기, 리프세이프 선크림.' },
  { id: 'd2-5', day: '2026-10-09', time: '13:30', kind: 'eat', title: '섬 점심', zh: '小琉球 午餐', q: 'Xiaoliuqiu restaurant', lat: 22.3500, lng: 120.3760,
    tip: '마화권(麻花捲)이 류큐 명물 간식. 선물용으로도 좋음.' },
  { id: 'd2-6', day: '2026-10-09', time: '14:30', kind: 'sight', title: '화병암 · 미인동', zh: '花瓶岩 / 美人洞', q: 'Vase Rock Xiaoliuqiu', lat: 22.3517, lng: 120.3797,
    move: { mode: 'scooter', text: '투어 차량/스쿠터 · 10분' },
    tip: '화병암은 항구 바로 옆. 물 맑은 날 위에서 거북이 보이기도 함.' },
  { id: 'd2-7', day: '2026-10-09', time: '16:10', kind: 'sea', title: '류큐 → 동강 페리', zh: '白沙觀光港', q: 'Baisha Port Xiaoliuqiu', lat: 22.3510, lng: 120.3786,
    tip: '귀항 08:00·09:50·11:20·12:50·14:30·16:10·17:20 (시즌별 변동). 투어 귀환 시간 우선.' },
  { id: 'd2-8', day: '2026-10-09', time: '17:00', kind: 'move', title: '셔틀로 가오슝 복귀', zh: '東港碼頭', q: 'Donggang Ferry Terminal', lat: 22.4655, lng: 120.4447,
    move: { mode: 'ferry', text: '페리 · 약 25분' },
    tip: '약 1시간 후 가오슝역 도착 예정.' },
  { id: 'd2-9', day: '2026-10-09', time: '19:00', kind: 'eat', title: '류허 야시장', zh: '六合夜市', q: 'Liuhe Night Market', lat: 22.6326, lng: 120.2992,
    move: { mode: 'walk', text: '가오슝역에서 도보 15분 · 또는 MRT R11→R10 1정거장' },
    tip: '피곤하면 가볍게. 파파야우유, 철판 새우 추천.' },

  // ── 10/10 토 · 쌍십절 ──
  { id: 'd3-1', day: '2026-10-10', time: '08:30', kind: 'sight', title: '연지담 용호탑', zh: '蓮池潭 龍虎塔', q: 'Dragon and Tiger Pagodas Kaohsiung', lat: 22.6806, lng: 120.2951,
    move: { mode: 'taxi', text: '택시 약 15분 · NT$250 안팎' },
    tip: '용 입으로 들어가 호랑이 입으로 나오면 액운이 풀린다는 전설. 국경일이라 오전에 가야 덜 붐빔.' },
  { id: 'd3-2', day: '2026-10-10', time: '11:00', kind: 'hotel', title: '체크아웃 (12시까지)', zh: '康橋商旅 高雄車站館', addr: '高雄市三民區建國二路295號', q: 'Kindness Hotel Kaohsiung Main Station', lat: 22.6379, lng: 120.3040,
    move: { mode: 'taxi', text: '택시 약 15분' },
    tip: '짐 챙겨서 바로 다음 호텔로.' },
  { id: 'd3-3', day: '2026-10-10', time: '11:40', kind: 'hotel', title: '그랜드 하이라이 (짐 맡기기)', zh: '漢來大飯店', addr: '高雄市前金區成功一路266號', q: 'Grand Hi-Lai Hotel Kaohsiung', lat: 22.6198, lng: 120.2982,
    move: { mode: 'taxi', text: '택시 약 10분 · NT$150 안팎' },
    tip: '체크인 15:00. 짐 보관 후 가볍게 이동.' },
  { id: 'd3-4', day: '2026-10-10', time: '12:30', kind: 'eat', title: '점심 · 압육진 오리고기밥', zh: '鴨肉珍', q: 'Ya Rou Zhen Kaohsiung', lat: 22.6235, lng: 120.2850,
    move: { mode: 'taxi', text: '택시 약 7분 · 또는 도보 20분' },
    tip: '줄이 길면 회전 빠르니 기다릴 만함. 휴무일 확인 필요.' },
  { id: 'd3-5', day: '2026-10-10', time: '14:00', kind: 'sea', title: '치진섬', zh: '旗津', q: 'Cijin Island Kaohsiung', lat: 22.6150, lng: 120.2660,
    move: { mode: 'ferry', text: '구산 페리터미널 → 치진 · 약 5분 · NT$30 안팎' },
    tip: '페리 앞 자전거·전동카 대여. 해변, 등대, 해산물 거리. 국경일엔 페리 줄 김.' },
  { id: 'd3-6', day: '2026-10-10', time: '17:00', kind: 'sight', title: '다거우 영국영사관 · 노을', zh: '打狗英國領事館', q: 'Former British Consulate at Takao', lat: 22.6198, lng: 120.2636,
    move: { mode: 'taxi', text: '페리로 구산 복귀 후 택시 5분' },
    tip: '시즈완 노을 명소. 일몰 17:40 전후. 언덕 위 테라스에서.' },
  { id: 'd3-7', day: '2026-10-10', time: '18:30', kind: 'hotel', title: '하이라이 체크인', zh: '漢來大飯店', addr: '高雄市前金區成功一路266號', q: 'Grand Hi-Lai Hotel Kaohsiung', lat: 22.6198, lng: 120.2982,
    move: { mode: 'taxi', text: '택시 약 15분 · NT$200 안팎' },
    tip: '고층 객실 야경 감상.' },
  { id: 'd3-8', day: '2026-10-10', time: '20:00', kind: 'sight', title: '아이허(사랑의 강) 야경', zh: '愛河', q: 'Love River Kaohsiung', lat: 22.6233, lng: 120.2874,
    move: { mode: 'walk', text: '도보 약 15분 · 택시 5분' },
    tip: '강변 산책 또는 유람선. 쌍십절 행사가 있을 수 있으니 현지 확인.' },

  // ── 10/11 일 ──
  { id: 'd4-1', day: '2026-10-11', time: '09:00', kind: 'eat', title: '호텔 조식', zh: '漢來大飯店', q: 'Grand Hi-Lai Hotel Kaohsiung', lat: 22.6198, lng: 120.2982,
    tip: '여유롭게. 체크아웃 11:00.' },
  { id: 'd4-2', day: '2026-10-11', time: '10:00', kind: 'shop', title: '한신백화점 · 기념품', zh: '漢神百貨', q: 'Hanshin Department Store Chenggong', lat: 22.6195, lng: 120.2972,
    move: { mode: 'walk', text: '호텔과 연결 · 도보 1분' },
    tip: '펑리수, 우롱차, 누가크래커. 지하 식품관.' },
  { id: 'd4-3', day: '2026-10-11', time: '11:00', kind: 'hotel', title: '체크아웃', zh: '漢來大飯店', addr: '高雄市前金區成功一路266號', q: 'Grand Hi-Lai Hotel Kaohsiung', lat: 22.6198, lng: 120.2982,
    move: { mode: 'walk', text: '도보 1분' },
    tip: '항공편 시간 보고 공항 출발 시간 조정.' },
  { id: 'd4-4', day: '2026-10-11', time: '12:00', kind: 'plane', title: '공항으로', zh: '高雄國際機場', q: 'Kaohsiung International Airport', lat: 22.5771, lng: 120.3500,
    move: { mode: 'mrt', text: 'MRT R9 중앙공원 → R4 공항 · 약 15분 · 또는 택시 20분' },
    tip: '출발 2시간 전 도착. 시간은 항공편에 맞게 수정하세요.' }
];

// Retain the prior defaults to migrate only unchanged seeded items.
window.PREVIOUS_DEFAULT_ITEMS = window.DEFAULT_ITEMS;
const revisedCityDays = [
  { id: 'tainan-1', day: '2026-10-10', time: '09:00', kind: 'move', title: '타이난으로', zh: '臺南車站', q: 'Tainan Railway Station Taiwan', lat: 22.9971, lng: 120.2129, move: { mode: 'mrt', text: '가오슝역 → 타이난역 · TRA 열차' }, tip: '출발 시간과 열차편은 당일 확인. 숙소 이동·짐 보관은 예약에 맞게 조정하세요.' },
  { id: 'tainan-2', day: '2026-10-10', time: '10:00', kind: 'sight', title: '적감루', zh: '赤崁樓', q: 'Chihkan Tower Tainan', lat: 22.9974, lng: 120.2025, move: { mode: 'taxi', text: '타이난역에서 택시 또는 도보' } },
  { id: 'tainan-3', day: '2026-10-10', time: '12:00', kind: 'eat', title: '타이난 점심', zh: '國華街', q: 'Guohua Street Tainan', lat: 22.9946, lng: 120.1977, move: { mode: 'walk', text: '국화거리 로컬 음식' } },
  { id: 'tainan-4', day: '2026-10-10', time: '13:30', kind: 'sight', title: '타이난 공자묘', zh: '臺南孔子廟', q: 'Tainan Confucius Temple', lat: 22.9904, lng: 120.2043, move: { mode: 'walk', text: '도보 또는 택시' } },
  { id: 'tainan-5', day: '2026-10-10', time: '15:00', kind: 'sight', title: '신농거리', zh: '神農街', q: 'Shennong Street Tainan', lat: 22.998, lng: 120.1956, move: { mode: 'taxi', text: '골목 산책 · 카페' } },
  { id: 'tainan-6', day: '2026-10-10', time: '18:00', kind: 'move', title: '가오슝으로 복귀', zh: '高雄車站', q: 'Kaohsiung Main Station', lat: 22.6394, lng: 120.3025, move: { mode: 'mrt', text: '타이난역 → 가오슝역 · TRA 열차' } },
  { id: 'city-1', day: '2026-10-11', time: '09:00', kind: 'sight', title: '연지담 · 용호탑', zh: '蓮池潭 龍虎塔', q: 'Dragon and Tiger Pagodas Kaohsiung', lat: 22.6806, lng: 120.2951 },
  { id: 'city-2', day: '2026-10-11', time: '11:00', kind: 'sight', title: '빛의 돔', zh: '捷運美麗島站 光之穹頂', q: 'Formosa Boulevard Station Dome of Light', lat: 22.6313, lng: 120.3021, move: { mode: 'mrt', text: '메이리다오역' } },
  { id: 'city-3', day: '2026-10-11', time: '12:30', kind: 'eat', title: '옌청 점심', zh: '鹽埕區', q: 'Yancheng District Kaohsiung', lat: 22.6247, lng: 120.2868, move: { mode: 'mrt', text: '옌청푸역 주변' } },
  { id: 'city-4', day: '2026-10-11', time: '14:00', kind: 'sight', title: '보얼예술특구', zh: '駁二藝術特區', q: 'Pier-2 Art Center', lat: 22.6199, lng: 120.2814, move: { mode: 'walk', text: '항구 산책' } },
  { id: 'city-5', day: '2026-10-11', time: '16:00', kind: 'shop', title: '기념품 · 시내 산책', zh: '漢神百貨', q: 'Hanshin Department Store Chenggong', lat: 22.6195, lng: 120.2972, tip: '체크아웃·공항 이동은 실제 항공편에 맞춰 일정을 추가해주세요.' }
];
window.PREVIOUS_CITY_DEFAULT_ITEMS = revisedCityDays;
const tainanDayTrip = [
  { id: 'tainan-plan-1', day: '2026-10-10', time: '08:30', kind: 'move', title: '가오슝역 → 타이난역', zh: '臺南車站', q: 'Tainan Railway Station Taiwan', move: { mode: 'mrt', text: 'TRA 열차 · 가오슝역 출발' }, tip: '열차편과 소요 시간은 당일 시간표를 확인하세요.' },
  { id: 'tainan-plan-2', day: '2026-10-10', time: '09:30', kind: 'eat', title: '브런치 · 딴삥, 만두, 콩물스프', q: 'Tainan breakfast dan bing dumplings soy milk', tip: '메뉴 기준 검색입니다. 식당을 정하면 Google 장소 검색으로 추가·수정해주세요.' },
  { id: 'tainan-plan-3', day: '2026-10-10', time: '10:00', kind: 'shop', title: '하야시백화점 · 티타임', zh: '林百貨', q: 'Hayashi Department Store Tainan', move: { mode: 'walk', text: '하야시백화점으로 이동' }, tip: '백화점·카페 운영 시간은 방문 전에 확인하세요.' },
  { id: 'tainan-plan-4', day: '2026-10-10', time: '12:00', kind: 'eat', title: '우육면 / 돼지등심튀김 후룩', q: 'Tainan beef noodle fried pork chop', tip: '우육면 또는 돼지등심튀김 중 선택. 식당은 아직 미정이에요.' },
  { id: 'tainan-plan-5', day: '2026-10-10', time: '13:00', kind: 'sight', title: '안평노가 · 안평고성', zh: '安平老街 / 安平古堡', q: 'Anping Old Fort Tainan', optional: true, move: { mode: 'taxi', text: '안평으로 이동 · 옵션, 패스 가능' }, tip: '선택 일정입니다. 건너뛰면 휴식 후 쓰차오 녹색터널로 바로 이동하세요.' },
  { id: 'tainan-plan-6', day: '2026-10-10', time: '15:00', kind: 'sight', title: '쓰차오 녹색터널 · 나룻배 슝슝', zh: '四草綠色隧道', q: 'Sicao Green Tunnel Tainan', move: { mode: 'taxi', text: '맹그로프숲으로 이동' }, tip: '보트 운영 시간·대기·날씨를 확인하세요.' },
  { id: 'tainan-plan-7', day: '2026-10-10', time: '17:00', kind: 'eat', title: '선농지애 · 게찜 / 장어국수', zh: '神農街', q: 'Shennong Street Tainan', move: { mode: 'taxi', text: '선농거리로 이동' }, tip: '저녁은 ① 해산물 게찜 ② 장어국수 중 선택. 식당은 현장에서 정해주세요.' },
  { id: 'tainan-plan-8', day: '2026-10-10', time: '19:00', kind: 'shop', title: '야시장 구경', q: 'Tainan night market', tip: '방문할 야시장의 당일 영업을 확인하세요.' },
  { id: 'tainan-plan-9', day: '2026-10-10', time: '20:30', kind: 'move', title: '가오슝 복귀', zh: '臺南車站', q: 'Tainan Railway Station Taiwan', move: { mode: 'mrt', text: '타이난역 → 가오슝역 · TRA 열차' }, tip: '타이난역에서 출발합니다. 열차편을 확인하세요.' }
];
window.DEFAULT_ITEMS = [
  ...window.PREVIOUS_DEFAULT_ITEMS.filter(it => it.day < '2026-10-10'),
  ...tainanDayTrip,
  ...revisedCityDays.filter(it => it.day === '2026-10-11')
];

// Planning estimates, not live Google transit results. Unknown meal/market
// locations are deliberately left without an invented duration or bus number.
window.TRAVEL_RECOMMENDATIONS = {
  'tainan-plan-1': 'TRA 열차 · 약 40–60분',
  'tainan-plan-2': '도보/택시 · 식당 선택 후 시간 확인',
  'tainan-plan-3': '도보/택시 · 출발 식당에 따라 시간 확인',
  'tainan-plan-4': '도보/택시 · 식당 선택 후 시간 확인',
  'tainan-plan-5': '택시 · 약 15–25분',
  'tainan-plan-6': '택시 · 약 15–25분',
  'tainan-plan-7': '택시 · 약 20–30분',
  'tainan-plan-8': '택시/버스 · 야시장 선택 후 노선·시간 확인',
  'tainan-plan-9': '택시 → TRA 열차 · 열차 약 40–60분',
  'city-1': '택시/MRT · 출발 위치에서 시간 확인',
  'city-2': '택시 · 약 20–30분',
  'city-3': 'MRT 오렌지선 · 약 10–20분',
  'city-4': '도보 · 약 10–15분',
  'city-5': '택시 · 약 10–15분'
};

window.PHRASES = [
  { cat: '기본', color: 'pink', items: [
    ['안녕하세요', '你好', 'nǐ hǎo', '니 하오'],
    ['감사합니다', '謝謝', 'xièxie', '씨에 씨에'],
    ['괜찮아요 (천만에요)', '不客氣', 'bú kèqi', '부 커치'],
    ['실례합니다', '不好意思', 'bù hǎoyìsi', '뿌 하오 이쓰'],
    ['죄송해요', '對不起', 'duìbuqǐ', '뚜이 부 치'],
    ['네 / 아니요', '對 / 不是', 'duì / búshì', '뚜이 / 부스'],
    ['저희는 한국인이에요', '我們是韓國人', 'wǒmen shì Hánguó rén', '워먼 스 한궈 런'],
    ['신혼여행 왔어요', '我們來度蜜月', 'wǒmen lái dù mìyuè', '워먼 라이 뚜 미위에'],
    ['중국어 잘 못해요', '我不太會說中文', 'wǒ bú tài huì shuō zhōngwén', '워 부 타이 후이 슈오 중원'],
    ['영어 되나요?', '可以說英文嗎？', 'kěyǐ shuō yīngwén ma', '커이 슈오 잉원 마']
  ]},
  { cat: '먹기', color: 'coral', items: [
    ['이거 주세요', '我要這個', 'wǒ yào zhège', '워 야오 쩌거'],
    ['두 개요', '兩個', 'liǎng ge', '량 거'],
    ['얼마예요?', '多少錢？', 'duōshǎo qián', '뚜오샤오 치엔'],
    ['고수 빼주세요', '不要香菜', 'bú yào xiāngcài', '부야오 샹차이'],
    ['안 맵게요', '不要辣', 'bú yào là', '부야오 라'],
    ['얼음 적게 / 빼고', '少冰 / 去冰', 'shǎo bīng / qù bīng', '샤오 빙 / 취 빙'],
    ['당도 반 / 무설탕', '半糖 / 無糖', 'bàn táng / wú táng', '빤 탕 / 우 탕'],
    ['먹고 갈게요 / 포장', '內用 / 外帶', 'nèi yòng / wài dài', '네이 용 / 와이 따이'],
    ['맛있어요!', '好吃！', 'hǎochī', '하오 츠'],
    ['계산할게요', '我要結帳', 'wǒ yào jiézhàng', '워 야오 지에짱'],
    ['카드 돼요?', '可以刷卡嗎？', 'kěyǐ shuā kǎ ma', '커이 슈아카 마']
  ]},
  { cat: '쇼핑', color: 'lemon', items: [
    ['조금 깎아주세요', '可以便宜一點嗎？', 'kěyǐ piányi yìdiǎn ma', '커이 피엔이 이디엔 마'],
    ['너무 비싸요', '太貴了', 'tài guì le', '타이 꾸이 러'],
    ['그냥 구경할게요', '我只是看看', 'wǒ zhǐshì kànkan', '워 즈스 칸칸'],
    ['봉투 있나요?', '有袋子嗎？', 'yǒu dàizi ma', '요우 따이즈 마'],
    ['이거 있어요?', '有這個嗎？', 'yǒu zhège ma', '요우 쩌거 마']
  ]},
  { cat: '이동', color: 'sky', items: [
    ['여기로 가주세요', '請到這裡', 'qǐng dào zhèlǐ', '칭 따오 쩌리'],
    ['여기서 세워주세요', '請在這裡停', 'qǐng zài zhèlǐ tíng', '칭 짜이 쩌리 팅'],
    ['○○ 어디예요?', '○○在哪裡？', '○○ zài nǎlǐ', '○○ 짜이 나리'],
    ['화장실 어디예요?', '廁所在哪裡？', 'cèsuǒ zài nǎlǐ', '처쑤오 짜이 나리'],
    ['MRT역', '捷運站', 'jiéyùn zhàn', '지에윈 짠'],
    ['가오슝역', '高雄車站', 'Gāoxióng chēzhàn', '까오슝 처짠'],
    ['공항', '機場', 'jīchǎng', '지창'],
    ['선착장', '碼頭', 'mǎtóu', '마터우']
  ]},
  { cat: '호텔', color: 'mint', items: [
    ['체크인할게요', '我要辦理入住', 'wǒ yào bànlǐ rùzhù', '워 야오 빤리 루주'],
    ['체크아웃할게요', '我要退房', 'wǒ yào tuìfáng', '워 야오 투이팡'],
    ['짐 맡길 수 있나요?', '可以寄放行李嗎？', 'kěyǐ jìfàng xíngli ma', '커이 지팡 싱리 마'],
    ['와이파이 비밀번호는?', 'Wi-Fi密碼是什麼？', 'mìmǎ shì shénme', '미마 스 션머']
  ]},
  { cat: '바다', color: 'sky', items: [
    ['수영 못해요', '我不會游泳', 'wǒ bú huì yóuyǒng', '워 부후이 요우용'],
    ['구명조끼', '救生衣', 'jiùshēngyī', '지우셩이'],
    ['거북이 있어요?', '有海龜嗎？', 'yǒu hǎiguī ma', '요우 하이꾸이 마'],
    ['배멀미해요', '我暈船', 'wǒ yùnchuán', '워 윈추안']
  ]},
  { cat: '긴급', color: 'coral', items: [
    ['도와주세요!', '救命！', 'jiùmìng', '지우밍'],
    ['몸이 안 좋아요', '我不舒服', 'wǒ bù shūfu', '워 뿌 슈푸'],
    ['약국 어디예요?', '藥局在哪裡？', 'yàojú zài nǎlǐ', '야오쥐 짜이 나리'],
    ['구급차 불러주세요', '請幫我叫救護車', 'qǐng bāng wǒ jiào jiùhùchē', '칭 빵워 지아오 지우후처'],
    ['여권을 잃어버렸어요', '我的護照不見了', 'wǒ de hùzhào bú jiàn le', '워더 후자오 부지엔러']
  ]}
];

window.NUMBERS = [
  ['1', '一', 'yī', '이'], ['2', '二/兩', 'èr/liǎng', '얼/량'], ['3', '三', 'sān', '싼'], ['4', '四', 'sì', '쓰'], ['5', '五', 'wǔ', '우'],
  ['6', '六', 'liù', '리우'], ['7', '七', 'qī', '치'], ['8', '八', 'bā', '빠'], ['9', '九', 'jiǔ', '지우'], ['10', '十', 'shí', '스'],
  ['100', '一百', 'yìbǎi', '이바이'], ['1000', '一千', 'yìqiān', '이치엔']
];
