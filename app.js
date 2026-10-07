/* 챔댕슝슝 · 가오슝 신혼여행 웹앱 */
(() => {
'use strict';

const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const T = window.TRIP;

/* ───────── icons ───────── */
const P = {
  plane: '<path d="M10.5 13.5 4 11l1.5-1.5 7 1 3.5-3.5a2 2 0 0 1 3 3L15.5 13.5l1 7L15 22l-2.5-6.5L9 19v2.5L7.5 23l-1-3.5L3 18.5 4.5 17H7l3.5-3.5Z"/>',
  hotel: '<path d="M3 18V7m0 6h18v5M3 18h18M7 13v-2.5a1.5 1.5 0 0 1 3 0V13m4 0V9.5h4.5A2.5 2.5 0 0 1 21 12v1"/>',
  eat: '<path d="M4 11h16a8 8 0 0 1-16 0Zm4-3c0-1.5 1-1.5 1-3m3 3c0-1.5 1-1.5 1-3m3 3c0-1.5 1-1.5 1-3"/>',
  sight: '<path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.2"/>',
  sea: '<path d="M2 15c2 0 2-1.5 4-1.5S8 15 10 15s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5M2 19.5c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/><circle cx="16" cy="7" r="3"/>',
  shop: '<path d="M5 8h14l-1 12H6zm4 0V6a3 3 0 0 1 6 0v2"/>',
  move: '<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M8 21l1-4m7 4-1-4"/><circle cx="8.5" cy="14" r=".6"/><circle cx="15.5" cy="14" r=".6"/>',
  mrt: '<rect x="6" y="3" width="12" height="14" rx="3"/><path d="M6 10h12M9 21l1.5-4m4.5 4-1.5-4M9.5 13.5h.01m5 0h.01"/>',
  lrt: '<rect x="4" y="5" width="16" height="11" rx="3"/><path d="M4 11h16M8 20l1.5-4m6.5 4-1.5-4M10 2l2 3 2-3"/>',
  walk: '<circle cx="13" cy="4.5" r="1.8"/><path d="m9 21 2.5-6.5L14 17v4m-3.5-6.5L11.5 9l3 2 2.5 1M11.5 9 8 10.5 7 13.5"/>',
  taxi: '<path d="M5 16V12l2-5h10l2 5v4M3 16h18v2H3zM5 12h14M9 4h6v3H9z"/><circle cx="7.5" cy="18.5" r="1.5"/><circle cx="16.5" cy="18.5" r="1.5"/>',
  shuttle: '<rect x="3" y="5" width="18" height="11" rx="2.5"/><path d="M3 10h18M8 5v5m8-5v5"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
  ferry: '<path d="M4 15 3 11h18l-1 4M6 11V7h12v4M12 7V3M2 19c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/>',
  scooter: '<circle cx="6" cy="17" r="2.5"/><circle cx="18" cy="17" r="2.5"/><path d="M8.5 17h7M15 6h3l-2.5 11M6 14.5 9 12h5"/>',
  nav: '<path d="m3 11 18-8-8 18-2-8z"/>',
  pin: '<path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/>',
  car: '<path d="M5 16V12l2-5h10l2 5v4M3 16h18v2H3zM5 12h14"/><circle cx="7.5" cy="18.5" r="1.5"/><circle cx="16.5" cy="18.5" r="1.5"/>',
  route: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H16a3 3 0 0 0 0-6H8a3 3 0 0 1 0-6h7.5"/>',
  home: '<path d="M4 11 12 4l8 7v9H4z"/><path d="M10 20v-5h4v5"/>',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>',
  cal: '<rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4m8-4v4"/>',
  img: '<rect x="3.5" y="4" width="17" height="16" rx="3"/><circle cx="9" cy="9.5" r="1.8"/><path d="m4 17 5-4.5 4 3.5 3-2.5 4 3.5"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
  coin: '<circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.6 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1 0-2-.5-2.5-1.5M12 6.5v11"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  cam: '<path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.2"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  speak: '<path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M15.5 9a4 4 0 0 1 0 6m2.5-8.5a7.5 7.5 0 0 1 0 11"/>',
  swap: '<path d="M7 4v15m0 0-3-3m3 3 3-3M17 20V5m0 0-3 3m3-3 3 3"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.6-4.5M4 4v3.5h3.5M4 13a8 8 0 0 0 14.6 4.5M20 20v-3.5h-3.5"/>',
  back: '<path d="M14 6l-6 6 6 6"/>',
  down: '<path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/>',
  up: '<path d="M12 15V4m0 0L8 8m4-4 4 4M5 20h14"/>',
  trash: '<path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13"/>',
  share: '<path d="M12 15V4m0 0L8 8m4-4 4 4M6 12v8h12v-8"/>',
  undo: '<path d="M9 7 4 12l5 5"/><path d="M4 12h11a5 5 0 0 1 0 10h-2"/>'
};
const ic = (n, s = 22, w = 2) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${P[n] || P.pin}</svg>`;
const KIND_ICON = { plane: 'plane', hotel: 'hotel', eat: 'eat', sight: 'sight', sea: 'sea', shop: 'shop', move: 'move' };
const PIN_COLOR = { plane: '#A07CFF', hotel: '#FF5C8A', eat: '#FF8A5B', sight: '#F5B400', sea: '#3BB8F0', shop: '#2FCB8B', move: '#9A8FA0' };
const COLOR = { pink: '#222222', sky: '#222222', lemon: '#222222', mint: '#222222', coral: '#222222', lilac: '#222222' };

/* ───────── storage (IndexedDB) ───────── */
const DB = {
  db: null,
  open() {
    return new Promise((res, rej) => {
      const r = indexedDB.open('chamdaeng', 1);
      r.onupgradeneeded = () => {
        const d = r.result;
        d.createObjectStore('items', { keyPath: 'id' });
        d.createObjectStore('memos', { keyPath: 'id' });
        d.createObjectStore('blobs', { keyPath: 'id' });
      };
      r.onsuccess = () => { this.db = r.result; res(); };
      r.onerror = () => rej(r.error);
    });
  },
  tx(store, mode, fn) {
    return new Promise((res, rej) => {
      const t = this.db.transaction(store, mode);
      const s = t.objectStore(store);
      const out = fn(s);
      t.oncomplete = () => res(out && 'result' in out ? out.result : out);
      t.onerror = () => rej(t.error);
      t.onabort = () => rej(t.error);
    });
  },
  all(store) { return this.tx(store, 'readonly', s => s.getAll()); },
  get(store, id) { return this.tx(store, 'readonly', s => s.get(id)); },
  put(store, v) { return this.tx(store, 'readwrite', s => s.put(v)); },
  del(store, id) { return this.tx(store, 'readwrite', s => s.delete(id)); },
  putMany(store, arr) { return this.tx(store, 'readwrite', s => { arr.forEach(v => s.put(v)); }); },
  clear(store) { return this.tx(store, 'readwrite', s => s.clear()); }
};

const urlCache = new Map();
async function blobUrl(id) {
  if (urlCache.has(id)) return urlCache.get(id);
  const rec = await DB.get('blobs', id);
  if (!rec) return '';
  const u = URL.createObjectURL(rec.blob);
  urlCache.set(id, u);
  return u;
}
async function hydrateImgs(root) {
  for (const img of root.querySelectorAll('img[data-blob]')) {
    img.src = await blobUrl(img.dataset.blob);
  }
}

/* ───────── state ───────── */
const S = {
  items: [],
  memos: [],
  view: 'plan',
  day: null,
  cat: 0,
  money: { dir: 'tw', input: '0' },
  rate: null,
  pending: [],
  pickCb: null,
  map: null
};

/* ───────── time helpers (대만 시간 UTC+8) ───────── */
function tpNow() {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
  const g = t => p.find(x => x.type === t).value;
  const h = g('hour') === '24' ? '00' : g('hour');
  return { date: `${g('year')}-${g('month')}-${g('day')}`, hm: `${h}:${g('minute')}`, min: (+h) * 60 + (+g('minute')) };
}
const toMin = hm => { const [h, m] = (hm || '0:0').split(':').map(Number); return h * 60 + (m || 0); };
const inTrip = d => d >= T.start && d <= T.end;
const dayOf = date => T.days.find(d => d.date === date);
function dLabel() {
  const n = tpNow().date;
  if (n < T.start) {
    const diff = Math.round((new Date(T.start) - new Date(n)) / 864e5);
    return `D-${diff}`;
  }
  if (n > T.end) return '다녀왔어요';
  return `Day ${T.days.findIndex(d => d.date === n) + 1}`;
}
function currentHotel() {
  const n = tpNow();
  if (n.date < '2026-10-10' || (n.date === '2026-10-10' && n.min < 12 * 60)) return T.hotels[0];
  return T.hotels[1];
}
const itemsOf = date => S.items.filter(i => i.day === date).sort((a, b) => toMin(a.time) - toMin(b.time));

/* ───────── maps links ───────── */
const gq = it => it.q || it.zh || it.title;
const navUrl = (dest, origin) => {
  const u = new URL('https://www.google.com/maps/dir/');
  u.searchParams.set('api', '1');
  if (origin) u.searchParams.set('origin', origin);
  u.searchParams.set('destination', dest);
  u.searchParams.set('travelmode', 'transit');
  return u.toString();
};
const placeUrl = q => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
function dayRouteUrl(list) {
  const pts = [];
  list.forEach(i => { const q = gq(i); if (pts[pts.length - 1] !== q) pts.push(q); });
  if (pts.length < 2) return placeUrl(pts[0] || 'Kaohsiung');
  const u = new URL('https://www.google.com/maps/dir/');
  u.searchParams.set('api', '1');
  u.searchParams.set('origin', pts[0]);
  u.searchParams.set('destination', pts[pts.length - 1]);
  if (pts.length > 2) u.searchParams.set('waypoints', pts.slice(1, -1).slice(0, 8).join('|'));
  return u.toString();
}
const go = url => window.open(url, '_blank', 'noopener');

/* ───────── toast ───────── */
let toastT;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('on'), 1800);
}

/* ───────── nav ───────── */
const TABS = [['plan', 'cal', '일정'], ['album', 'heart', '기록'], ['talk', 'chat', '회화'], ['money', 'coin', '환율']];
function renderNav() {
  $('#nav').innerHTML = TABS.map(([v, i, l]) => `<button data-v="${v}" class="${S.view === v ? 'on' : ''}">${ic(i, 22, 2.2)}<span>${l}</span></button>`).join('');
}
function show(v) {
  S.view = v;
  document.querySelectorAll('.view').forEach(el => el.classList.toggle('on', el.id === 'v-' + v));
  renderNav();
  ({ plan: renderPlan, album: renderAlbum, talk: renderTalk, money: renderMoney })[v]();
  window.scrollTo({ top: 0 });
}

/* ───────── PLAN ───────── */
function confetti() {
  const dots = [
    [6, 18, 14, '#FFC93C'], [88, 12, 10, '#3BB8F0'], [92, 46, 16, '#FF8A5B'], [3, 58, 10, '#2FCB8B'],
    [12, 84, 12, '#A07CFF'], [86, 80, 12, '#FF5C8A'], [50, 2, 8, '#2FCB8B'], [97, 66, 7, '#FFC93C']
  ];
  return `<div class="confetti">${dots.map(([x, y, s, c]) => `<i style="left:${x}%;top:${y}%;width:${s}px;height:${s}px;background:${c}"></i>`).join('')}</div>`;
}

function renderPlan() {
  const el = $('#v-plan');
  const now = tpNow();
  if (!S.day) S.day = inTrip(now.date) ? now.date : T.start;
  const d = dayOf(S.day);
  const list = itemsOf(S.day);
  const isToday = now.date === S.day;
  let curIdx = -1;
  if (isToday) list.forEach((it, i) => { if (toMin(it.time) <= now.min) curIdx = i; });
  const showInstall = !matchMedia('(display-mode: standalone)').matches && !navigator.standalone && !localStorage.getItem('hideInstall');

  el.innerHTML = `
    <header class="hero">
      ${confetti()}
      <div class="hero-top">
        <span class="chip pink">${ic('heart', 14, 2.6)} ${dLabel()}</span>
        <span class="chip" id="clock">TW ${now.hm}</span>
      </div>
      <div class="arch"><img src="img/taiwan-cat.webp" alt="대만 간식과 고양이"></div>
      <h1 class="title"><span>챔</span><span>댕</span><span>슝</span><span>슝</span></h1>
      <div class="sub">10.8 – 10.11 · 가오슝</div>
      <div class="quick">
        <button class="qbtn pink" data-act="home-nav">${ic('home', 18, 2.4)} 호텔로</button>
        <button class="qbtn lemon" data-act="home-taxi">${ic('car', 18, 2.4)} 택시카드</button>
      </div>
    </header>
    ${showInstall ? `<div class="install">${ic('down', 18, 2.4)} 공유 → 홈 화면에 추가 <button data-act="hide-install">${ic('x', 16, 2.4)}</button></div>` : ''}
    <div class="days">
      ${T.days.map(x => `<button class="day ${x.color} ${x.date === S.day ? 'on' : ''}" data-day="${x.date}"><b>${x.label}</b><small>${x.dow} · ${x.name}</small></button>`).join('')}
    </div>
    <div id="nowbox">${nowBanner(list, now, isToday)}</div>
    <div class="mapcard"><div id="map"></div><div class="off" id="mapoff" hidden>지도는 온라인에서 보여요</div>
      <button class="route" data-act="day-route">${ic('route', 16, 2.4)} 동선</button></div>
    <div class="tl">
      ${list.map((it, i) => `
        ${i > 0 || it.move ? legHtml(it, list[i - 1]) : ''}
        <button class="item ${i === curIdx ? 'cur' : ''} ${isToday && i < curIdx ? 'past' : ''}" data-item="${it.id}">
          <span class="ico k-${it.kind}">${ic(KIND_ICON[it.kind] || 'pin', 22, 2.2)}</span>
          <span class="txt"><div class="tm">${esc(it.time)}</div><div class="nm">${esc(it.title)}</div></span>
          <span class="badges">${memoBadge(it.id)}</span>
        </button>`).join('')}
    </div>
    <button class="add" data-act="add-item" style="border-color:${COLOR[d.color]}55;color:${COLOR[d.color]}">${ic('plus', 18, 2.6)} 일정</button>
  `;
  drawMap(list);
}

function memoBadge(id) {
  const ms = S.memos.filter(m => m.itemId === id);
  if (!ms.length) return '';
  const ph = ms.reduce((a, m) => a + (m.photos?.length || 0), 0);
  return `<span class="mini">${ph ? ic('img', 12, 2.6) + ph : ic('edit', 12, 2.6) + ms.length}</span>`;
}

function legHtml(it, prev) {
  const m = it.move || {};
  const origin = prev ? gq(prev) : '';
  return `<div class="leg">
    <span class="mi">${ic(m.mode || 'walk', 15, 2.4)}</span>
    <span class="lt">${esc(m.text || '')}</span>
    <button class="go" data-nav="${esc(gq(it))}" data-origin="${esc(origin)}">${ic('nav', 13, 2.6)} 길찾기</button>
  </div>`;
}

function nowBanner(list, now, isToday) {
  if (!isToday) return '';
  const next = list.find(it => toMin(it.time) > now.min);
  if (!next) {
    const h = currentHotel();
    return `<div class="now"><span class="dot"></span><span class="t"><small>오늘 일정 끝</small><b>${esc(h.name)}</b></span><button data-nav="${esc(h.q)}">${ic('home', 20, 2.4)}</button></div>`;
  }
  const left = toMin(next.time) - now.min;
  const ls = left >= 60 ? `${Math.floor(left / 60)}시간 ${left % 60}분 뒤` : `${left}분 뒤`;
  return `<div class="now"><span class="dot"></span><span class="t"><small>다음 · ${esc(next.time)} · ${ls}</small><b>${esc(next.title)}</b></span><button data-nav="${esc(gq(next))}">${ic('nav', 20, 2.4)}</button></div>`;
}

function drawMap(list) {
  if (S.map) { S.map.remove(); S.map = null; }
  const box = $('#map');
  if (!box) return;
  if (!window.L) {
    if (!navigator.onLine) { $('#mapoff').hidden = false; return; }
    window.addEventListener('load', () => { if (S.view === 'plan' && window.L) drawMap(itemsOf(S.day)); }, { once: true });
    return;
  }
  const pts = list.filter(i => typeof i.lat === 'number');
  const map = L.map(box, { zoomControl: false, attributionControl: true, scrollWheelZoom: false });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19, subdomains: 'abcd', attribution: '© OpenStreetMap © CARTO'
  }).addTo(map);
  const seen = new Map();
  pts.forEach((it, i) => {
    const key = it.lat.toFixed(4) + ',' + it.lng.toFixed(4);
    if (seen.has(key)) { seen.get(key).push(i + 1); return; }
    seen.set(key, [i + 1]);
  });
  const latlngs = pts.map(i => [i.lat, i.lng]);
  if (latlngs.length > 1) L.polyline(latlngs, { color: '#FF5C8A', weight: 3, dashArray: '6 7', opacity: .8 }).addTo(map);
  const done = new Set();
  pts.forEach((it, i) => {
    const key = it.lat.toFixed(4) + ',' + it.lng.toFixed(4);
    if (done.has(key)) return;
    done.add(key);
    const nums = seen.get(key);
    const html = `<div class="pin" style="background:${PIN_COLOR[it.kind] || '#FF5C8A'}">${nums[0]}</div>`;
    L.marker([it.lat, it.lng], { icon: L.divIcon({ html, className: '', iconSize: [26, 26], iconAnchor: [13, 13] }) })
      .addTo(map).on('click', () => openItem(it.id));
  });
  if (latlngs.length) map.fitBounds(latlngs, { padding: [28, 28], maxZoom: 15 });
  else map.setView([22.627, 120.30], 12);
  S.map = map;
}

/* ───────── item sheet ───────── */
function openSheet(html) {
  const sh = $('#sheet');
  sh.innerHTML = `<div class="grab"></div>${html}`;
  sh.scrollTop = 0;
  sh.classList.add('on');
  $('#scrim').classList.add('on');
}
function closeSheet() {
  $('#sheet').classList.remove('on');
  $('#scrim').classList.remove('on');
  S.pending = [];
  S.sheetFor = null;
}

async function openItem(id) {
  const it = S.items.find(x => x.id === id);
  if (!it) return;
  const list = itemsOf(it.day);
  const prev = list[list.findIndex(x => x.id === id) - 1];
  S.sheetFor = id;
  S.pending = [];
  const memos = S.memos.filter(m => m.itemId === id).sort((a, b) => b.at - a.at);
  openSheet(`
    <div class="sh-top">
      <span class="ico k-${it.kind}" style="width:52px;height:52px;border-radius:18px">${ic(KIND_ICON[it.kind], 26, 2.2)}</span>
      <div class="txt"><div class="tm">${esc(dayOf(it.day)?.label)} · ${esc(it.time)}</div><h3>${esc(it.title)}</h3>${it.zh ? `<div class="zh">${esc(it.zh)}</div>` : ''}</div>
      <button class="ibtn" data-act="edit-item" data-id="${it.id}">${ic('edit', 18, 2.2)}</button>
    </div>
    <div class="acts4">
      <button class="act" data-nav="${esc(gq(it))}"><span style="background:var(--sky-soft);color:#1a8fc4">${ic('nav', 24, 2.2)}</span>지금 여기서</button>
      <button class="act" data-nav="${esc(gq(it))}" data-origin="${esc(prev ? gq(prev) : '')}" ${prev ? '' : 'disabled style="opacity:.35"'}><span style="background:var(--lilac-soft);color:var(--lilac)">${ic('route', 24, 2.2)}</span>이전 장소부터</button>
      <button class="act" data-act="taxi" data-id="${it.id}"><span style="background:var(--lemon-soft);color:#c48f00">${ic('car', 24, 2.2)}</span>택시카드</button>
      <button class="act" data-place="${esc(gq(it))}"><span style="background:var(--mint-soft);color:#1e9e6a">${ic('pin', 24, 2.2)}</span>지도</button>
    </div>
    ${(it.move?.text || it.tip) ? `<div class="tip">
      ${it.move?.text ? `<div class="mv">${ic(it.move.mode || 'walk', 18, 2.2)}<span>${esc(it.move.text)}</span></div>` : ''}
      ${esc(it.tip || '')}
    </div>` : ''}
    <div class="sec">메모 ${ic('heart', 16, 2.4).replace('<svg', '<svg style="color:var(--pink)"')}</div>
    <div class="composer">
      <textarea id="memo-text" placeholder="여기서 뭐 했어? 🍜"></textarea>
      <div class="bar">
        <button class="ibtn" data-act="pick-memo" style="background:var(--pink-soft);color:var(--pink);box-shadow:none">${ic('cam', 20, 2.2)}</button>
        <div class="thumbs" id="pend"></div>
        <button class="btn pink" data-act="save-memo" data-id="${it.id}">저장</button>
      </div>
    </div>
    <div style="margin-top:12px" id="memo-list">
      ${memos.map(memoHtml).join('')}
    </div>
  `);
  await hydrateImgs($('#sheet'));
}

function memoHtml(m) {
  const dt = new Date(m.at);
  const stamp = `${dt.getMonth() + 1}/${dt.getDate()} ${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`;
  return `<div class="note memo"><small>${stamp}<button class="del" data-act="del-memo" data-id="${m.id}">삭제</button></small>${esc(m.text)}
    ${m.photos?.length ? `<div class="grid">${m.photos.map(p => `<button class="ph" data-photo="${p}" data-memo="${m.id}"><img data-blob="${p}" alt=""></button>`).join('')}</div>` : ''}</div>`;
}

/* ───────── edit / add ───────── */
const KINDS = [['sight', '구경'], ['eat', '먹기'], ['sea', '바다'], ['hotel', '숙소'], ['shop', '쇼핑'], ['move', '이동'], ['plane', '항공']];
const MODES = [['walk', '도보'], ['mrt', 'MRT'], ['lrt', '경전철'], ['taxi', '택시'], ['shuttle', '버스/셔틀'], ['ferry', '페리'], ['scooter', '스쿠터'], ['plane', '비행기']];
function openEdit(id, day) {
  const it = id ? S.items.find(x => x.id === id) : { id: '', day, time: '12:00', kind: 'sight', title: '', zh: '', addr: '', q: '', tip: '', move: { mode: 'walk', text: '' } };
  const opt = (arr, v) => arr.map(([k, l]) => `<option value="${k}" ${k === v ? 'selected' : ''}>${l}</option>`).join('');
  openSheet(`
    <div class="sh-top"><div class="txt"><h3>${id ? '일정 수정' : '일정 추가'}</h3></div></div>
    <form class="form" id="edit-form">
      <div class="two">
        <div><label>날짜</label><select name="day">${T.days.map(d => `<option value="${d.date}" ${d.date === it.day ? 'selected' : ''}>${d.label} (${d.dow})</option>`).join('')}</select></div>
        <div><label>시간</label><input name="time" type="time" value="${esc(it.time)}" required></div>
      </div>
      <label>이름</label><input name="title" value="${esc(it.title)}" required placeholder="예: 보얼예술특구">
      <div class="two">
        <div><label>종류</label><select name="kind">${opt(KINDS, it.kind)}</select></div>
        <div><label>이동수단</label><select name="mode">${opt(MODES, it.move?.mode)}</select></div>
      </div>
      <label>이동 방법</label><input name="mtext" value="${esc(it.move?.text)}" placeholder="예: MRT R11 → R10 · 2분">
      <label>지도 검색어 (영어/중국어)</label><input name="q" value="${esc(it.q)}" placeholder="예: Pier-2 Art Center">
      <label>중국어 이름 · 택시카드</label><input name="zh" value="${esc(it.zh)}" placeholder="예: 駁二藝術特區">
      <label>중국어 주소</label><input name="addr" value="${esc(it.addr)}">
      <label>팁</label><textarea name="tip">${esc(it.tip)}</textarea>
      <div class="btns">
        ${id ? `<button type="button" class="btn red" data-act="del-item" data-id="${id}">${ic('trash', 18, 2.2)}</button>` : ''}
        <button type="button" class="btn gray" data-act="close">취소</button>
        <button type="submit" class="btn pink">저장</button>
      </div>
    </form>
  `);
  $('#edit-form').onsubmit = async e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const old = id ? S.items.find(x => x.id === id) : {};
    const next = {
      ...old,
      id: id || 'u-' + uid(),
      day: f.get('day'), time: f.get('time'), kind: f.get('kind'),
      title: f.get('title').trim(), q: f.get('q').trim(), zh: f.get('zh').trim(), addr: f.get('addr').trim(), tip: f.get('tip').trim(),
      move: f.get('mtext').trim() ? { mode: f.get('mode'), text: f.get('mtext').trim() } : null
    };
    if (old.q !== next.q && old.lat != null) { delete next.lat; delete next.lng; }
    await DB.put('items', next);
    const i = S.items.findIndex(x => x.id === next.id);
    if (i >= 0) S.items[i] = next; else S.items.push(next);
    S.day = next.day;
    closeSheet();
    renderPlan();
    toast('저장했어요');
  };
}

/* ───────── photos ───────── */
function compress(file, max = 1600, q = .82) {
  return new Promise(res => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const r = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      const c = document.createElement('canvas');
      c.width = Math.round(img.naturalWidth * r);
      c.height = Math.round(img.naturalHeight * r);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob(b => res(b || file), 'image/jpeg', q);
    };
    img.onerror = () => { URL.revokeObjectURL(url); res(file); };
    img.src = url;
  });
}
function pick(cb) {
  S.pickCb = cb;
  const p = $('#picker');
  p.value = '';
  try {
    if (typeof p.showPicker === 'function') p.showPicker();
    else p.click();
  } catch {
    p.click();
  }
}
async function saveBlobs(blobs) {
  const ids = blobs.map(() => 'b-' + uid());
  await DB.putMany('blobs', blobs.map((blob, i) => ({ id: ids[i], blob })));
  return ids;
}

async function addMemo({ itemId, day, text, blobs }) {
  const photos = blobs.length ? await saveBlobs(blobs) : [];
  const m = { id: 'm-' + uid(), itemId, day, text, photos, at: Date.now() };
  await DB.put('memos', m);
  S.memos.push(m);
  queueCloudBackup();
  return m;
}

let cloudQueue = Promise.resolve();
function queueCloudBackup() {
  cloudQueue = cloudQueue.catch(() => {}).then(async () => {
    try {
      await backupCloud();
      toast('클라우드 저장 완료');
    } catch (err) {
      console.warn('클라우드 백업 실패', err);
      toast('기기에 저장했어요 · 클라우드는 백업 버튼으로 재시도');
    }
  });
}
async function backupCloud() {
  const data = { app: 'chamdaeng', v: 1, at: Date.now(), items: S.items, memos: S.memos, blobs: {} };
  for (const rec of await DB.all('blobs')) data.blobs[rec.id] = await readAsDataURL(rec.blob);
  await window.TripCloud.upload(data);
}

async function deleteMemo(id) {
  const m = S.memos.find(x => x.id === id);
  if (!m) return;
  for (const p of m.photos || []) { await DB.del('blobs', p); urlCache.delete(p); }
  await DB.del('memos', id);
  S.memos = S.memos.filter(x => x.id !== id);
}

async function deletePhoto(memoId, photoId) {
  const m = S.memos.find(x => x.id === memoId);
  if (!m) return;
  m.photos = m.photos.filter(p => p !== photoId);
  await DB.del('blobs', photoId);
  urlCache.delete(photoId);
  if (!m.photos.length && !m.text) await deleteMemo(m.id);
  else await DB.put('memos', m);
}

async function openViewer(photoId, memoId) {
  const m = S.memos.find(x => x.id === memoId);
  const v = $('#viewer');
  v.innerHTML = `<div class="vbar"><button data-act="close-viewer">${ic('x', 22, 2.4)}</button>
    <span style="display:flex;gap:10px"><button data-act="share-photo" data-id="${photoId}">${ic('share', 20, 2.4)}</button>
    <button data-act="del-photo" data-id="${photoId}" data-memo="${memoId}">${ic('trash', 20, 2.4)}</button></span></div>
    <img data-blob="${photoId}" alt="">
    ${m?.text ? `<div class="cap">${esc(m.text)}</div>` : '<div class="cap"></div>'}`;
  v.classList.add('on');
  await hydrateImgs(v);
}

/* ───────── ALBUM ───────── */
async function renderAlbum() {
  const el = $('#v-album');
  el.innerHTML = `
    <div class="head"><h2>우리 기록</h2>
      <div class="acts">
        <button class="ibtn" data-act="export" aria-label="백업">${ic('down', 20, 2.2)}</button>
        <button class="ibtn" data-act="import" aria-label="불러오기">${ic('up', 20, 2.2)}</button>
      </div></div>
    <div class="cloud-panel">
      <span>사진 자동 백업</span><button data-act="cloud-upload">백업</button><button data-act="cloud-download">복원</button>
    </div>
    ${T.days.map(d => {
      const ms = S.memos.filter(m => m.day === d.date).sort((a, b) => a.at - b.at);
      const photos = ms.flatMap(m => (m.photos || []).map(p => [p, m.id]));
      const notes = ms.filter(m => m.text);
      return `<div class="album-day">
        <div class="dh"><b><i style="background:${COLOR[d.color]}"></i>${d.label} ${d.name}</b>
          <button class="addph" data-act="add-review" data-day="${d.date}" style="background:${COLOR[d.color]}22;color:${d.color === 'lemon' ? '#b98600' : COLOR[d.color]}">${ic('plus', 15, 2.8)} 사진</button></div>
        ${photos.length ? `<div class="grid">${photos.map(([p, mid]) => `<button class="ph" data-photo="${p}" data-memo="${mid}"><img data-blob="${p}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
        ${notes.length ? `<div style="margin-top:10px">${notes.map(m => {
          const it = S.items.find(x => x.id === m.itemId);
          return `<div class="note"><small>${esc(it ? it.title : '후기')}</small>${esc(m.text)}</div>`;
        }).join('')}</div>` : ''}
        ${!photos.length && !notes.length ? `<div class="empty">${ic('heart', 22, 2)}</div>` : ''}
      </div>`;
    }).join('')}
  `;
  await hydrateImgs(el);
}

function readAsDataURL(blob) {
  return new Promise(r => { const f = new FileReader(); f.onload = () => r(f.result); f.readAsDataURL(blob); });
}
async function exportAll() {
  toast('백업 만드는 중…');
  const blobs = await DB.all('blobs');
  const out = { app: 'chamdaeng', v: 1, at: Date.now(), items: S.items, memos: S.memos, blobs: {} };
  for (const b of blobs) out.blobs[b.id] = await readAsDataURL(b.blob);
  const file = new File([JSON.stringify(out)], `chamdaeng-backup-${tpNow().date}.json`, { type: 'application/json' });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try { await navigator.share({ files: [file], title: '챔댕슝슝 백업' }); return; } catch (e) { if (e.name === 'AbortError') return; }
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = file.name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}
async function importAll(file) {
  try {
    const data = JSON.parse(await file.text());
    if (data.app !== 'chamdaeng') throw new Error('형식이 달라요');
    const blobs = [];
    for (const [id, du] of Object.entries(data.blobs || {})) blobs.push({ id, blob: await (await fetch(du)).blob() });
    await DB.putMany('blobs', blobs);
    await DB.putMany('memos', data.memos || []);
    await DB.putMany('items', data.items || []);
    await loadState();
    toast('불러왔어요');
    show(S.view);
  } catch (e) {
    toast('불러오기 실패: ' + e.message);
  }
}

/* ───────── TALK ───────── */
let voices = [];
function loadVoices() { voices = speechSynthesis?.getVoices?.() || []; }
function speak(text) {
  if (!('speechSynthesis' in window)) { toast('이 기기는 음성 지원이 안 돼요'); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/[○\/]/g, ' '));
  u.lang = 'zh-TW';
  u.voice = voices.find(v => /zh[-_]TW/i.test(v.lang)) || voices.find(v => /^zh/i.test(v.lang)) || null;
  u.rate = .85;
  speechSynthesis.speak(u);
}
function renderTalk() {
  const el = $('#v-talk');
  const cats = [...window.PHRASES.map(c => [c.cat, c.color]), ['숫자', 'lilac']];
  const isNum = S.cat === window.PHRASES.length;
  const cur = window.PHRASES[S.cat];
  el.innerHTML = `
    <div class="head"><h2>니하오!</h2></div>
    <div class="cats">${cats.map(([c, col], i) => `<button class="cat ${col} ${i === S.cat ? 'on' : ''}" data-cat="${i}">${c}</button>`).join('')}</div>
    ${isNum ? `<div class="nums">${window.NUMBERS.map(n => `<button class="num" data-speak="${esc(n[1].split('/')[0])}"><b>${n[0]}</b><span>${n[1]}</span><small>${n[3]}</small></button>`).join('')}</div>`
    : `<div class="phr">${cur.items.map((p, i) => `
      <div class="pcard" data-say="${i}">
        <div class="pt"><div class="ko">${esc(p[0])}</div><div class="zh">${esc(p[1])}</div><div class="rd">${esc(p[3])}<span class="py">${esc(p[2])}</span></div></div>
        <button class="spk" data-speak="${esc(p[1])}">${ic('speak', 20, 2.2)}</button>
      </div>`).join('')}</div>`}
  `;
}

/* ───────── MONEY ───────── */
const FALLBACK_RATE = { rate: 42.24, at: '2026-10-06', src: '기본값' };
function getRate() {
  try { return JSON.parse(localStorage.getItem('rate')) || FALLBACK_RATE; } catch { return FALLBACK_RATE; }
}
async function refreshRate(force) {
  const r = getRate();
  if (!force && r.fetched && Date.now() - r.fetched < 6 * 36e5) return;
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/TWD', { cache: 'no-store' });
    const j = await res.json();
    const k = j?.rates?.KRW;
    if (!k) throw 0;
    const at = new Date(j.time_last_update_unix * 1000);
    const nr = { rate: +k.toFixed(2), at: `${at.getMonth() + 1}/${at.getDate()}`, src: '실시간', fetched: Date.now() };
    localStorage.setItem('rate', JSON.stringify(nr));
    if (S.view === 'money') renderMoney();
    if (force) toast('환율 업데이트!');
  } catch {
    if (force) toast('오프라인이라 저장된 환율을 써요');
  }
}
const fmt = (n, d = 0) => n.toLocaleString('ko-KR', { maximumFractionDigits: d, minimumFractionDigits: 0 });
function renderMoney() {
  const el = $('#v-money');
  const r = getRate();
  const m = S.money;
  const v = parseFloat(m.input) || 0;
  const tw = m.dir === 'tw';
  const out = tw ? Math.round(v * r.rate / 10) * 10 : v / r.rate;
  const disp = m.input.includes('.') ? m.input.replace(/^(\d+)/, s => fmt(+s)) : fmt(+m.input);
  el.innerHTML = `
    <div class="head"><h2>얼마야?</h2></div>
    <div class="money">
      <div class="screen">
        <div class="row"><span class="cur">${tw ? 'NT$' : '₩'}</span><span class="amt">${disp}</span></div>
        <div class="swap"><button data-act="swap">${ic('swap', 20, 2.4)}</button></div>
        <div class="row to"><span class="cur">${tw ? '₩' : 'NT$'}</span><span class="amt">${fmt(out, tw ? 0 : 1)}</span></div>
      </div>
      <div class="rate"><button data-act="rate">${ic('refresh', 14, 2.4)} 1 NT$ = ${r.rate}원 · ${esc(r.at)} ${esc(r.src)}</button></div>
      <div class="chips">${(tw ? [100, 500, 1000, 2000] : [10000, 30000, 50000, 100000]).map(x => `<button data-quick="${x}">${fmt(x)}</button>`).join('')}</div>
      <div class="pad">
        ${['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'].map(k => `<button class="key ${k === '.' || k === '⌫' ? 'fn' : ''}" data-key="${k}">${k}</button>`).join('')}
      </div>
    </div>`;
}
function pressKey(k) {
  const m = S.money;
  if (k === '⌫') m.input = m.input.length > 1 ? m.input.slice(0, -1) : '0';
  else if (k === '.') { if (!m.input.includes('.')) m.input += '.'; }
  else if (m.input.replace('.', '').length < 9) m.input = m.input === '0' ? k : m.input + k;
  renderMoney();
}

/* ───────── overlays ───────── */
function openTaxi(it) {
  const t = $('#taxi');
  t.innerHTML = `<button class="ibtn x" data-act="close-taxi">${ic('x', 20, 2.4)}</button>
    <div class="hi">司機您好 👋</div>
    <div class="big">${esc(it.zh || it.title)}</div>
    ${it.addr ? `<div class="addr">${esc(it.addr)}</div>` : ''}
    <div class="ty">請帶我們到這裡，謝謝！</div>`;
  t.classList.add('on');
}
function openSay(p) {
  const s = $('#say');
  s.innerHTML = `<div class="zh">${esc(p[1])}</div><div class="rd">${esc(p[3])}</div><div class="ko">${esc(p[0])}</div>`;
  s.classList.add('on');
  speak(p[1]);
}

/* ───────── events ───────── */
document.addEventListener('click', async e => {
  const b = e.target.closest('button, [data-say], .full.say');
  if (!b) return;
  const d = b.dataset;

  if (b.id === 'say') { b.classList.remove('on'); return; }
  if (d.v) return show(d.v);
  if (d.day && !d.act) { S.day = d.day; renderPlan(); return; }
  if (d.item) return openItem(d.item);
  if (d.nav) { e.stopPropagation(); return go(navUrl(d.nav, d.origin || '')); }
  if (d.place) return go(placeUrl(d.place));
  if (d.photo) return openViewer(d.photo, d.memo);
  if (d.cat) { S.cat = +d.cat; renderTalk(); return; }
  if (d.speak) { e.stopPropagation(); speak(d.speak); return; }
  if (d.say != null && !e.target.closest('.spk')) return openSay(window.PHRASES[S.cat].items[+d.say]);
  if (d.key) return pressKey(d.key);
  if (d.quick) { S.money.input = d.quick; renderMoney(); return; }

  switch (d.act) {
    case 'cloud-upload': {
      b.disabled = true;
      toast('백업 중…');
      try {
        await cloudQueue;
        await backupCloud();
        toast('클라우드 백업 완료');
      } catch (err) { toast('백업 실패: ' + err.message); }
      finally { b.disabled = false; }
      return;
    }
    case 'cloud-download': {
      if (!confirm('클라우드 기록을 불러올까요? 같은 기록은 백업 내용으로 갱신됩니다.')) return;
      b.disabled = true;
      try {
        const data = await window.TripCloud.download();
        await importAll(new Blob([JSON.stringify(data)], { type: 'application/json' }));
      } catch (err) { toast('복원 실패: ' + err.message); }
      finally { b.disabled = false; }
      return;
    }
    case 'home-nav': return go(navUrl(currentHotel().q));
    case 'home-taxi': { const h = currentHotel(); return openTaxi({ zh: h.zh, addr: h.addr }); }
    case 'hide-install': localStorage.setItem('hideInstall', '1'); return renderPlan();
    case 'day-route': return go(dayRouteUrl(itemsOf(S.day)));
    case 'add-item': return openEdit(null, S.day);
    case 'edit-item': return openEdit(d.id);
    case 'close': return closeSheet();
    case 'del-item':
      if (!confirm('이 일정을 지울까요?')) return;
      await DB.del('items', d.id);
      S.items = S.items.filter(x => x.id !== d.id);
      closeSheet(); renderPlan(); return;
    case 'taxi': return openTaxi(S.items.find(x => x.id === d.id));
    case 'close-taxi': return $('#taxi').classList.remove('on');
    case 'pick-memo':
      return pick(async files => {
        for (const f of files) S.pending.push(await compress(f));
        $('#pend').innerHTML = S.pending.map(bl => `<img src="${URL.createObjectURL(bl)}" alt="">`).join('');
      });
    case 'save-memo': {
      const text = $('#memo-text').value.trim();
      if (!text && !S.pending.length) return toast('내용이나 사진을 넣어주세요');
      const it = S.items.find(x => x.id === d.id);
      b.disabled = true;
      await addMemo({ itemId: it.id, day: it.day, text, blobs: S.pending });
      S.pending = [];
      toast('기록 완료 ♥');
      await openItem(it.id);
      renderPlan();
      return;
    }
    case 'del-memo':
      if (!confirm('메모를 지울까요?')) return;
      await deleteMemo(d.id);
      if (S.sheetFor) openItem(S.sheetFor);
      renderPlan();
      return;
    case 'add-review':
      return pick(async files => {
        toast('사진 저장 중…');
        const blobs = [];
        for (const f of files) blobs.push(await compress(f));
        await addMemo({ itemId: null, day: d.day, text: '', blobs });
        renderAlbum();
        toast(`${blobs.length}장 저장 ♥`);
      });
    case 'close-viewer': return $('#viewer').classList.remove('on');
    case 'del-photo':
      if (!confirm('사진을 지울까요?')) return;
      await deletePhoto(d.memo, d.id);
      $('#viewer').classList.remove('on');
      if (S.view === 'album') renderAlbum();
      if (S.sheetFor) openItem(S.sheetFor);
      return;
    case 'share-photo': {
      const rec = await DB.get('blobs', d.id);
      const file = new File([rec.blob], `kaohsiung-${d.id}.jpg`, { type: 'image/jpeg' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file] }); } catch { } }
      else { const a = document.createElement('a'); a.href = URL.createObjectURL(file); a.download = file.name; a.click(); }
      return;
    }
    case 'export': return exportAll();
    case 'import': { const i = $('#importer'); i.value = ''; return i.click(); }
    case 'swap': S.money.dir = S.money.dir === 'tw' ? 'kr' : 'tw'; S.money.input = '0'; return renderMoney();
    case 'rate': {
      const r = getRate();
      const ans = prompt('환율 직접 입력 (1 NT$ = ?원)\n비워두고 확인하면 실시간 환율로 새로고침해요', '');
      if (ans === null) return;
      if (ans.trim() === '') return refreshRate(true);
      const n = parseFloat(ans);
      if (!(n > 0)) return toast('숫자로 입력해주세요');
      localStorage.setItem('rate', JSON.stringify({ rate: n, at: `${new Date().getMonth() + 1}/${new Date().getDate()}`, src: '직접입력', fetched: Date.now() + 864e5 * 30 }));
      renderMoney();
      return;
    }
  }
});

$('#scrim').addEventListener('click', closeSheet);
$('#say').addEventListener('click', () => $('#say').classList.remove('on'));
$('#picker').addEventListener('change', e => {
  const files = [...e.target.files];
  const cb = S.pickCb;
  S.pickCb = null;
  if (!files.length || !cb) return;
  Promise.resolve(cb(files)).catch(err => {
    console.error('사진 첨부 실패', err);
    toast('사진을 첨부하지 못했어요. 다시 시도해주세요');
  });
});
$('#importer').addEventListener('change', e => { const f = e.target.files[0]; if (f) importAll(f); });

// 1분마다 대만 시계 & 다음 일정 갱신
setInterval(() => {
  if (S.view !== 'plan') return;
  const now = tpNow();
  const c = $('#clock'); if (c) c.textContent = `TW ${now.hm}`;
  const nb = $('#nowbox'); if (nb) nb.innerHTML = nowBanner(itemsOf(S.day), now, now.date === S.day);
}, 30000);

/* ───────── boot ───────── */
async function loadState() {
  S.items = await DB.all('items');
  S.memos = await DB.all('memos');
}
async function boot() {
  await DB.open();
  if (!localStorage.getItem('seeded')) {
    await DB.putMany('items', window.DEFAULT_ITEMS);
    localStorage.setItem('seeded', '1');
  }
  await loadState();
  renderNav();
  renderPlan();
  refreshRate(false);
  window.TripCloud.connect().catch(err => console.warn('익명 클라우드 연결 실패', err));
  if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  if (navigator.storage?.persist) navigator.storage.persist().catch(() => { });
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => { });
}
boot().catch(err => {
  document.body.insertAdjacentHTML('afterbegin', `<p style="padding:20px">앗, 저장공간을 열 수 없어요: ${esc(err.message)}</p>`);
});
})();
