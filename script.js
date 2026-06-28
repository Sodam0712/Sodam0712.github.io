// ============ NAVBAR ============
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============ YOUTUBE VIDEO IDs ============
const ytVideoIds = [
  'j4FNV6fDBG4',
  'Iu4-Qy3bmmU',
  'DuGJ3Df2mgo',
  'Dw6yHRCASyc',
  'U7xvKU-1-PU',
  'HLVbhdIVBg0',
  '_8Tp5BS8KQY',
  'VFxoj9nfngs',
  '16hKjh_Fqvk',
  'I19SJ5V8h4U',
  '5sY3tFKWcSo',
  'ESmBoi-UmCU',
  'GNs00IC_Sl4',
  'l06tpSag-IA',
  'p5uTfTj15Rg',
  'swwDlUcMjNw',
  'g_5i6dORorI',
  'fH031N7KNY0',
  'WLwVGFwkAvs',
  'YrjQJMuCjvE',
  'MAqPt1KchLk',
  'sQK8yNfTEC0',
  'udTHPmB9XDA',
  '0GuvxRLjHzU',
  'vrBunVxZ_uY',
];

// ============ HERO 무한 스크롤 트랙 ============
function buildHeroScroll() {
  const track = document.getElementById('heroScrollTrack');
  if (!track) return;

  const isMobile = window.innerWidth <= 768;
  // 모바일: 카드 수 절반으로 줄여 DOM/메모리 부담 감소
  const source = isMobile ? ytVideoIds.slice(0, 12) : ytVideoIds;
  // 원본 + 복사본 (seamless loop)
  const all = [...source, ...source];
  // 모바일: mqdefault(320×180) 직접 사용 — maxresdefault는 쇼츠에서 대부분 404라 더블 요청 발생
  const thumbQuality = isMobile ? 'mqdefault' : 'hqdefault';

  all.forEach(id => {
    const card = document.createElement('div');
    card.className = 'scroll-card';
    card.innerHTML = `
      <img src="https://img.youtube.com/vi/${id}/${thumbQuality}.jpg"
           alt="소담 유튜브 쇼츠"
           loading="lazy">
      <div class="scroll-card-overlay">
        <div class="scroll-play-btn">▶</div>
      </div>
    `;
    card.addEventListener('click', () => openPlayer(id));
    track.appendChild(card);
  });
}

// ============ YOUTUBE REEL GRID (영상 섹션) ============
function buildYouTubeGrid() {
  const grid = document.getElementById('ytGrid');
  const moreWrap = document.getElementById('videoMoreWrap');
  const moreBtn = document.getElementById('videoMoreBtn');
  if (!grid) return;

  const isMobile = window.innerWidth <= 900;
  const initialCount = isMobile ? 6 : 14;

  const isMobile = window.innerWidth <= 900;
  // hqdefault 직접 사용 — maxresdefault는 쇼츠에서 대부분 404 → 더블 요청 방지
  const thumbQ = isMobile ? 'mqdefault' : 'hqdefault';

  ytVideoIds.forEach((id, index) => {
    const item = document.createElement('div');
    item.className = 'reel-item';
    if (index >= initialCount) item.classList.add('reel-hidden');
    item.innerHTML = `
      <img class="reel-thumb"
        src="https://img.youtube.com/vi/${id}/${thumbQ}.jpg"
        alt="소담 유튜브 영상"
        loading="lazy">
      <div class="reel-play">
        <div class="reel-play-btn">▶</div>
      </div>
    `;
    item.addEventListener('click', () => openPlayer(id));
    grid.appendChild(item);
  });

  if (moreBtn && moreWrap) {
    if (ytVideoIds.length <= initialCount) {
      moreWrap.style.display = 'none';
    } else {
      moreBtn.addEventListener('click', () => {
        document.querySelectorAll('.reel-hidden').forEach(el => el.classList.remove('reel-hidden'));
        moreWrap.style.display = 'none';
      });
    }
  }
}

// ============ VIDEO OVERLAY PLAYER ============
const overlay = document.getElementById('ytOverlay');
const ytFrame = document.getElementById('ytFrame');
const ytClose = document.getElementById('ytClose');
const ytOverlayBg = document.getElementById('ytOverlayBg');

function openPlayer(videoId) {
  ytFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePlayer() {
  overlay.classList.remove('open');
  ytFrame.src = '';
  document.body.style.overflow = '';
}

ytClose.addEventListener('click', closePlayer);
ytOverlayBg.addEventListener('click', closePlayer);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePlayer(); });

// ============ SCROLL REVEAL ============
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(
  '.social-card, .contact-item, .profile-card, .career-card, .ct-card'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

// ============ INSTAGRAM AUTO-SCROLL ============
const igCodes = [
  'DZPa5OVBS72','DZNUA7chulD','DYgrK0oBeUe','DYZa9KrhMC_','DYRN5ZMBeUl',
  'DX-hZ7shCzx','DXwopZfB3_P','DXvPkK-hfc-','DXqsHFCgdUn','DXku7C7AVOj',
  'DXbJXv7galF','DXVtvwWgW61','DXGcIXBgb8d','DXE0L5eAWko','DW2_BS5AaH_',
];

let igBuilt = false;

function buildIgAutoScroll() {
  if (igBuilt) return;
  igBuilt = true;
  const track = document.getElementById('igStrip');
  if (!track) return;

  const isMobile = window.innerWidth <= 768;
  // 모바일: 임베드 수 줄임 (embed.js가 모바일에서 매우 무거움)
  const source = isMobile ? igCodes.slice(0, 8) : igCodes;

  [...source, ...source].forEach(code => {
    const wrap = document.createElement('div');
    wrap.className = 'ig-embed-item';
    const bq = document.createElement('blockquote');
    bq.className = 'instagram-media';
    bq.setAttribute('data-instgrm-permalink', `https://www.instagram.com/p/${code}/`);
    bq.setAttribute('data-instgrm-version', '14');
    wrap.appendChild(bq);
    track.appendChild(wrap);
  });

  if (window.instgrm) window.instgrm.Embeds.process();
}

function initIgEmbeds() {
  // embed.js 로드 완료 시 호출 — 이미 섹션 진입했으면 바로 빌드
  if (igBuilt) { window.instgrm && window.instgrm.Embeds.process(); return; }
  buildIgAutoScroll();
}

window.addEventListener('load', () => {
  buildHeroScroll();
  buildYouTubeGrid();

  // 인스타 섹션 진입 시에만 빌드 (모바일 초기 로드 부담 제거)
  const igSection = document.getElementById('instagram');
  if (igSection) {
    const igObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        igObserver.disconnect();
        if (!igBuilt) buildIgAutoScroll();
      }
    }, { threshold: 0.1 });
    igObserver.observe(igSection);
  }
});
