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

  // 원본 + 복사본 (seamless loop)
  const all = [...ytVideoIds, ...ytVideoIds];

  all.forEach(id => {
    const card = document.createElement('div');
    card.className = 'scroll-card';
    card.innerHTML = `
      <img src="https://img.youtube.com/vi/${id}/maxresdefault.jpg"
           alt="소담 유튜브 쇼츠"
           loading="lazy"
           onerror="this.src='https://img.youtube.com/vi/${id}/hqdefault.jpg'">
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
  if (!grid) return;

  ytVideoIds.forEach(id => {
    const item = document.createElement('div');
    item.className = 'reel-item';
    item.innerHTML = `
      <img class="reel-thumb"
        src="https://img.youtube.com/vi/${id}/maxresdefault.jpg"
        alt="소담 유튜브 영상"
        loading="lazy"
        onerror="this.src='https://img.youtube.com/vi/${id}/hqdefault.jpg'">
      <div class="reel-play">
        <div class="reel-play-btn">▶</div>
      </div>
    `;
    item.addEventListener('click', () => openPlayer(id));
    grid.appendChild(item);
  });
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

  // 원본 15개 + 복사본 15개 = seamless loop
  [...igCodes, ...igCodes].forEach(code => {
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
  buildIgAutoScroll();
}

window.addEventListener('load', () => {
  buildHeroScroll();
  buildYouTubeGrid();
  setTimeout(() => {
    if (!igBuilt) buildIgAutoScroll();
  }, 2000);
});
