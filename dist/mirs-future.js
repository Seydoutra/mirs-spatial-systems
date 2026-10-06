import { academyCourses, storeCategories, storeProducts, SESSIONS_NOTE } from './mirs-data.js?v=nova-2';

const BASE_PATH = new URL('.', document.baseURI).pathname.replace(/\/$/, '');
const AS = `${BASE_PATH}/assets/`;

function localRoute(path = location.pathname) {
  if (!BASE_PATH) return path.replace(/\/+$/, '') || '/';
  const localPath = path === BASE_PATH ? '/' : path.startsWith(`${BASE_PATH}/`) ? path.slice(BASE_PATH.length) : path;
  return localPath.replace(/\/+$/, '') || '/';
}

function routeInfo(path = location.pathname) {
  const localPath = localRoute(path);
  const english = localPath === '/en' || localPath.startsWith('/en/');
  return { locale: english ? 'en' : 'fr', route: english ? (localPath.slice(3) || '/') : localPath };
}

const pageHref = (path = '/', locale = state?.locale || 'fr') => {
  const normalized = path === '/' ? '' : (path.startsWith('/') ? path : `/${path}`);
  const localized = locale === 'en' ? `/en${normalized}` : normalized;
  return `${BASE_PATH}${localized}` || '/';
};

function pageRoute(path = location.pathname) {
  return routeInfo(path).route;
}

function storedCart() {
  try {
    const saved = JSON.parse(localStorage.getItem('mirs-future-cart') || '[]');
    if (!Array.isArray(saved)) return [];
    return saved
      .map((item) => (typeof item === 'string' ? { key: `brief:${item}`, name: item, qty: 1, kind: 'brief' } : item))
      .filter((item) => item && typeof item.name === 'string' && typeof item.key === 'string')
      .map((item) => ({ ...item, qty: Math.max(1, Math.min(999, Math.round(Number(item.qty) || 1))) }))
      .slice(0, 60);
  } catch {
    return [];
  }
}

const state = {
  theme: (() => { try { return localStorage.getItem('mirs-future-theme') || 'dark'; } catch { return 'dark'; } })(),
  cart: storedCart(),
  locale: 'fr',
  adminView: 'home',
};

const tr = (fr, en) => state.locale === 'en' ? en : fr;
const local = (value) => typeof value === 'string' ? value : (value?.[state.locale] || value?.fr || '');
const alternateLanguageHref = () => pageHref(pageRoute(), state.locale === 'fr' ? 'en' : 'fr');
const searchKey = (value) => String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '');
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

const products = {
  print: [
    { name: { fr: 'Polo personnalisé', en: 'Custom polo shirt' }, category: { fr: 'textile', en: 'textile' }, categoryKey: 'textile', image: 'mirs-media/nimba-polo-transparent.png', detail: { fr: 'Textile de communication produit par notre atelier.', en: 'Branded textile produced by our workshop.' } },
    { name: { fr: 'Casquette personnalisée', en: 'Custom cap' }, category: { fr: 'textile', en: 'textile' }, categoryKey: 'textile', image: 'mirs-media/sonapi-cap-transparent.png', detail: { fr: 'Une série personnalisée pour vos équipes et événements.', en: 'A personalized series for teams and events.' } },
    { name: { fr: 'Tote bag', en: 'Tote bag' }, category: { fr: 'textile', en: 'textile' }, categoryKey: 'textile', image: 'catalogue/tote-bag.png', detail: { fr: 'Support utile, personnalisable et durable.', en: 'A useful, customizable and durable medium.' } },
    { name: { fr: 'Packaging', en: 'Packaging' }, category: { fr: 'support', en: 'collateral' }, categoryKey: 'support', image: 'catalogue/packaging-orange.png', detail: { fr: 'Une présence qui commence avant l’ouverture.', en: 'A brand experience that begins before opening.' } },
    { name: { fr: 'Signalétique', en: 'Signage' }, category: { fr: 'support', en: 'collateral' }, categoryKey: 'support', image: 'editorial/impression-grand-format.jpg', detail: { fr: 'Grand format, habillage et visibilité.', en: 'Large format, wayfinding and visibility.' } },
  ],
};

const courses = academyCourses.map((course) => ({ name: course.name, category: course.category, detail: course.summary }));

const universes = [
  { path: '/informatique', key: 'informatique', index: '01', signal: 'INFRASTRUCTURE', name: { fr: 'Informatique', en: 'Information technology' }, title: { fr: 'Des systèmes plus <em>fiables.</em>', en: 'More <em>reliable</em> systems.' }, detail: { fr: 'Infrastructure, réseau, cybersécurité et assistance pour sécuriser la continuité de vos activités.', en: 'Infrastructure, networking, cybersecurity and support for business continuity.' }, image: 'future/informatique-team.jpg', className: 'tech' },
  { path: '/imprimerie', key: 'imprimerie', index: '02', signal: 'PRODUCTION', name: { fr: 'Imprimerie', en: 'Print production' }, title: { fr: 'Une marque qui <em>se voit.</em>', en: 'A brand that is <em>seen.</em>' }, detail: { fr: 'Supports imprimés, signalétique et objets promotionnels pour renforcer votre marque.', en: 'Printed materials, signage and promotional items that strengthen your brand.' }, image: 'future/imprimerie-team.jpg', className: 'print' },
  { path: '/formation', key: 'formation', index: '03', signal: 'COMPÉTENCES', name: { fr: 'MIRS Academy', en: 'MIRS Academy' }, title: { fr: 'Des compétences qui <em>restent.</em>', en: 'Skills that <em>last.</em>' }, detail: { fr: 'Des formations pratiques pour développer des compétences immédiatement mobilisables.', en: 'Practical training that develops immediately applicable skills.' }, image: 'editorial/formation-collaboration.jpg', className: 'academy' },
  { path: '/creation-agence', key: 'creation-agence', index: '04', signal: 'CRÉATION', name: { fr: 'Création d’agence', en: 'Agency creation' }, title: { fr: 'Une agence prête à <em>opérer.</em>', en: 'An agency ready to <em>operate.</em>' }, detail: { fr: 'Positionnement, identité, outils et cadre opérationnel pour construire une agence cohérente.', en: 'Positioning, identity, tools and operating framework for a coherent agency.' }, image: 'editorial/developpement-web.jpg', className: 'agency' },
  { path: '/maintenance', key: 'maintenance', index: '05', signal: 'CONTINUITÉ', name: { fr: 'Maintenance', en: 'Maintenance' }, title: { fr: 'Préserver ce qui <em>fonctionne.</em>', en: 'Keep what <em>works.</em>' }, detail: { fr: 'Prévention, intervention et suivi pour préserver la disponibilité de vos environnements.', en: 'Prevention, intervention and follow-up to preserve system availability.' }, image: 'editorial/maintenance-pc.jpg', className: 'maintenance' },
];

const ADMIN_STORAGE_KEY = 'mirs-admin-workspace-v2';
const LEGACY_ADMIN_STORAGE_KEY = 'mirs-admin-workspace-v1';
const ADMIN_SESSION_KEY = 'mirs-admin-session-v1';
const ADMIN_USERNAME = 'adminmirs';
const ADMIN_PASSWORD = 'admin';

const todayStamp = () => new Date().toLocaleDateString('fr-FR').replaceAll('/', '.');
const isoToday = () => new Date().toISOString().slice(0, 10);

function adminSeed() {
  return {
    content: [
      { id: 'home', area: { fr: 'Accueil MIRS', en: 'MIRS home' }, type: { fr: 'Page', en: 'Page' }, title: { fr: 'Des solutions intégrées qui font avancer.', en: 'Integrated solutions for performance.' }, status: 'published', updated: '06.10.2026' },
      { id: 'amadeus', area: { fr: 'AMADEUS · Représentation exclusive', en: 'AMADEUS · Exclusive representation' }, type: { fr: 'Page', en: 'Page' }, title: { fr: 'MIRS, représentant exclusif d’AMADEUS.', en: 'MIRS, exclusive AMADEUS representative.' }, status: 'published', updated: '06.10.2026' },
      { id: 'formation', area: { fr: 'MIRS Academy · E-learning', en: 'MIRS Academy · E-learning' }, type: { fr: 'Catalogue', en: 'Catalogue' }, title: { fr: 'Apprendre, puis savoir faire.', en: 'Learn. Apply. Perform.' }, status: 'published', updated: '06.10.2026' },
      { id: 'boutique', area: { fr: 'Boutique informatique', en: 'IT store' }, type: { fr: 'E-commerce', en: 'E-commerce' }, title: { fr: 'L’équipement informatique, sur devis.', en: 'IT equipment, on quotation.' }, status: 'published', updated: '06.10.2026' },
      { id: 'maintenance', area: { fr: 'Maintenance & urgences', en: 'Maintenance & emergencies' }, type: { fr: 'Page', en: 'Page' }, title: { fr: 'Préserver ce qui fonctionne.', en: 'Keep what works.' }, status: 'published', updated: '06.10.2026' },
      { id: 'informatique', area: { fr: 'Univers · Informatique', en: 'Capability · IT' }, type: { fr: 'Univers', en: 'Capability' }, title: { fr: 'Des systèmes plus fiables.', en: 'More reliable systems.' }, status: 'published', updated: '04.10.2026' },
      { id: 'imprimerie', area: { fr: 'Univers · Imprimerie', en: 'Capability · Print' }, type: { fr: 'Univers', en: 'Capability' }, title: { fr: 'Une marque qui se voit.', en: 'A brand that is seen.' }, status: 'published', updated: '04.10.2026' },
      { id: 'creation-agence', area: { fr: 'Univers · Création d’agence de voyage', en: 'Capability · Travel agency creation' }, type: { fr: 'Univers', en: 'Capability' }, title: { fr: 'Une agence prête à opérer.', en: 'An agency ready to operate.' }, status: 'published', updated: '02.10.2026' },
    ],
    requests: [
      { id: 'REQ-104', type: 'request', demo: true, customer: 'Nimba SMS', service: 'Imprimerie', detail: 'Polos et casquettes pour une équipe terrain.', priority: 'high', status: 'new', updated: '04.10.2026' },
      { id: 'REQ-103', type: 'request', demo: true, customer: 'Groupe Amara', service: 'Informatique', detail: 'Mise à niveau réseau et postes de travail.', priority: 'normal', status: 'analysis', updated: '03.10.2026' },
      { id: 'REQ-101', type: 'request', demo: true, customer: 'Atelier Koba', service: 'Maintenance', detail: 'Contrat de suivi préventif des équipements.', priority: 'high', status: 'progress', updated: '01.10.2026' },
      { id: 'REQ-100', type: 'request', demo: true, customer: 'Studio Sira', service: 'Création d’agence de voyage', detail: 'Positionnement, identité et cadre de lancement.', priority: 'normal', status: 'done', updated: '29.09.2026' },
    ],
    courses: {},
    extraSessions: [],
    inventory: {},
    media: [
      { id: 'company-film', name: { fr: 'Présentation de MIRS', en: 'MIRS company film' }, type: { fr: 'Vidéo · Institutionnel', en: 'Video · Corporate' }, file: 'mirs-media/mirs-company-presentation.mp4', poster: 'mirs-media/posters/company.jpg', status: 'published', updated: '05.10.2026' },
      { id: 'print-film', name: { fr: 'Présentation de l’imprimerie', en: 'Print workshop film' }, type: { fr: 'Vidéo · Imprimerie', en: 'Video · Print workshop' }, file: 'mirs-media/mirs-print-presentation.mp4', poster: 'mirs-media/posters/print.jpg', status: 'published', updated: '05.10.2026' },
      { id: 'digital-film', name: { fr: 'Animation MacBook', en: 'MacBook motion' }, type: { fr: 'Vidéo · Digital', en: 'Video · Digital' }, file: 'mirs-media/mirs-macbook-motion.mp4', poster: 'mirs-media/posters/macbook.jpg', status: 'published', updated: '04.10.2026' },
    ],
    settings: { maintenance: false, publicRequests: true, bilingual: true },
  };
}

function readStoredAdmin() {
  try {
    const saved = JSON.parse(localStorage.getItem(ADMIN_STORAGE_KEY) || 'null');
    if (saved && typeof saved === 'object') return saved;
    const legacy = JSON.parse(localStorage.getItem(LEGACY_ADMIN_STORAGE_KEY) || 'null');
    if (legacy && typeof legacy === 'object') {
      return {
        requests: Array.isArray(legacy.requests) ? legacy.requests.map((item) => ({ type: 'request', ...item })) : undefined,
        settings: legacy.settings,
      };
    }
  } catch {
    // Unreadable storage falls back to the seed below.
  }
  return null;
}

function adminData() {
  const fallback = adminSeed();
  const saved = readStoredAdmin();
  if (!saved) return fallback;
  const savedContent = Array.isArray(saved.content) ? saved.content : [];
  const content = [...savedContent, ...fallback.content.filter((item) => !savedContent.some((entry) => entry.id === item.id))];
  return {
    ...fallback,
    ...saved,
    content,
    requests: Array.isArray(saved.requests) ? saved.requests : fallback.requests,
    courses: { ...(saved.courses || {}) },
    extraSessions: Array.isArray(saved.extraSessions) ? saved.extraSessions : [],
    inventory: { ...(saved.inventory || {}) },
    media: Array.isArray(saved.media) ? saved.media : fallback.media,
    settings: { ...fallback.settings, ...(saved.settings || {}) },
  };
}

function saveAdminData(data) {
  try {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage can be full or blocked; the public flow still reaches WhatsApp.
  }
}

function makeReference(prefix) {
  const date = new Date();
  const stamp = `${String(date.getFullYear()).slice(2)}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  return `${prefix}-${stamp}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
}

/* Every public form lands in the admin queue (this browser) and opens WhatsApp. */
function recordRequest(entry) {
  const data = adminData();
  const record = { status: 'new', priority: 'normal', updated: todayStamp(), createdAt: new Date().toISOString(), ...entry };
  data.requests.unshift(record);
  saveAdminData(data);
  return record;
}

function openWhatsApp(message) {
  window.open(`https://wa.me/224622051321?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
}

const isProductVisible = (key) => adminData().inventory[key] !== false;
const isCoursePublished = (slug) => adminData().courses[slug]?.status !== 'draft';

function courseSessions(course, data = adminData()) {
  const extra = data.extraSessions.filter((session) => session.slug === course.slug);
  return [...course.sessions, ...extra]
    .filter((session) => session.date >= isoToday())
    .sort((a, b) => a.date.localeCompare(b.date));
}

function formatDate(iso, style = 'long') {
  const date = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  const options = style === 'short' ? { day: '2-digit', month: 'short' } : { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
  const text = new Intl.DateTimeFormat(state.locale === 'en' ? 'en-GB' : 'fr-FR', options).format(date);
  return style === 'short' ? text : text.charAt(0).toUpperCase() + text.slice(1);
}

function adminAuthenticated() {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'authenticated';
  } catch {
    return false;
  }
}

function adminLogout() {
  try {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  } catch {
    // Private browsing can deny sessionStorage access; the guard remains closed.
  }
}

const clientLogos = Array.from({ length: 81 }, (_, index) => `clients/${String(index + 1).padStart(2, '0')}.webp`);

const videoChunks = {
  'technology-flow.mp4': [
    'technology-flow-aaa', 'technology-flow-aab', 'technology-flow-aac', 'technology-flow-aad',
    'technology-flow-aae', 'technology-flow-aaf', 'technology-flow-aag', 'technology-flow-aah',
    'technology-flow-aai', 'technology-flow-aaj', 'technology-flow-aak', 'technology-flow-aal',
    'technology-flow-aam', 'technology-flow-aan', 'technology-flow-aao', 'technology-flow-aap',
    'technology-flow-aaq', 'technology-flow-aar', 'technology-flow-aas', 'technology-flow-aat',
    'technology-flow-aau', 'technology-flow-aav',
  ],
  'imprimerie-presentation.mp4': [
    'imprimerie-presentation-aaa', 'imprimerie-presentation-aab', 'imprimerie-presentation-aac', 'imprimerie-presentation-aad',
    'imprimerie-presentation-aae', 'imprimerie-presentation-aaf', 'imprimerie-presentation-aag', 'imprimerie-presentation-aah',
    'imprimerie-presentation-aai', 'imprimerie-presentation-aaj', 'imprimerie-presentation-aak', 'imprimerie-presentation-aal',
    'imprimerie-presentation-aam', 'imprimerie-presentation-aan', 'imprimerie-presentation-aao', 'imprimerie-presentation-aap',
  ],
};

let routeAbort = null;
let activeVideoUrl = null;

/* ------------------------------------------------------------------
   MIRS Nova — public interface.
   Markup helpers. Motion is attached later by setupMotion() through
   data attributes: data-nv (reveal), data-split (word mask), data-scrub
   (scroll-lit text), data-count, data-scramble, data-speed (parallax),
   data-progress (scroll progress → --p), data-spot, data-tilt,
   data-magnetic and data-cursor.
------------------------------------------------------------------- */
const ICON_ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8.5 7H17v8.5"/></svg>';
const ICON_DOWN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg>';
const ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';
const ICON_PLUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';

const roll = (label) => `<span class="nv-roll"><span data-text="${label.replace(/"/g, '&quot;')}">${label}</span></span>`;
const link = (path, label, className = '') => `<a href="${pageHref(path)}" data-link class="nv-link ${className}">${roll(label)}<i aria-hidden="true">${ICON_ARROW}</i></a>`;
const button = (path, label, variant = 'primary') => `<a href="${pageHref(path)}" data-link class="nv-btn nv-btn--${variant}" data-magnetic>${roll(label)}<i aria-hidden="true">${ICON_ARROW}</i></a>`;
const anchor = (id, label, variant = 'ghost') => `<a href="${pageHref('/')}#${id}" data-anchor="${id}" class="nv-btn nv-btn--${variant}" data-magnetic>${roll(label)}<i aria-hidden="true">${ICON_DOWN}</i></a>`;
const videoButton = (file, label, variant = 'ghost') => `<button type="button" class="nv-btn nv-btn--${variant}" data-video="${file}" data-video-title="${label}" data-magnetic>${roll(label)}<i aria-hidden="true">${ICON_PLAY}</i></button>`;
const eyebrow = (copy, index = '') => `<p class="nv-eyebrow" data-nv="fade">${index ? `<b>${index}</b>` : '<span aria-hidden="true"></span>'}${copy}</p>`;
const sectionTitle = (copy, extra = '', tag = 'h2', attrs = '') => `<${tag} class="nv-title ${extra}" data-split ${attrs}>${copy}</${tag}>`;

function brandMark() {
  return `<span class="brand-mark" aria-hidden="true"><img class="brand-logo brand-logo--color" src="${AS}mirs-logo.png" alt=""><img class="brand-logo brand-logo--white" src="${AS}mirs-media/mirs-logo-white-transparent.png" alt=""></span>`;
}

function marquee(items, variant = '') {
  const row = items.map((item) => `<span>${item}</span><i aria-hidden="true">✦</i>`).join('');
  return `<div class="nv-marquee ${variant}" aria-hidden="true"><div class="nv-marquee__track"><div>${row}</div><div>${row}</div></div></div>`;
}

function universeNames() {
  return universes.map((unit) => local(unit.name).toUpperCase());
}

/* ---------------- Layout ---------------- */

const ICON_MINUS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/></svg>';
const ICON_ALERT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4.5M12 17.5h.01"/></svg>';
const ICON_PHONE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>';
const ICON_CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const ICON_CART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2.5l2.2 10.5a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6.3"/><circle cx="9.5" cy="19.5" r="1.3"/><circle cx="17" cy="19.5" r="1.3"/></svg>';

const DEVICE_ICONS = {
  laptop: '<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20M10 16.5h4"/>',
  desktop: '<rect x="2.5" y="4" width="13" height="10" rx="1.5"/><path d="M9 14v3M5.5 17.5h7"/><rect x="18" y="4" width="3.5" height="14" rx="1"/><path d="M19.75 7h.01"/>',
  monitor: '<rect x="2.5" y="4" width="19" height="12" rx="1.5"/><path d="M12 16v3M8 20h8"/>',
  printer: '<path d="M7 9V3.5h10V9"/><rect x="3" y="9" width="18" height="8" rx="1.5"/><path d="M7 14h10v6.5H7z"/><path d="M17.5 12h.01"/>',
  keyboard: '<rect x="2" y="7" width="20" height="10" rx="1.5"/><path d="M6 10.5h.01M9 10.5h.01M12 10.5h.01M15 10.5h.01M18 10.5h.01M7 14h10"/>',
  router: '<rect x="3" y="13" width="18" height="6" rx="1.5"/><path d="M7 16h.01M10 16h.01M17 13V9M9 9.5a4.5 4.5 0 0 1 6 0M6.5 7a8 8 0 0 1 11 0"/>',
  switch: '<rect x="2" y="8" width="20" height="8" rx="1.5"/><path d="M5 12h1.5M8.5 12H10M12 12h1.5M15.5 12H17M19 12h.01"/>',
  cable: '<path d="M4.5 19c0-6 3.5-7.5 7.5-7.5S19.5 10 19.5 5"/><rect x="2.5" y="18" width="4" height="3.5" rx=".5"/><rect x="17.5" y="2.5" width="4" height="3.5" rx=".5"/>',
  camera: '<path d="M3 7h11l3 3v4l-3 3H3z"/><circle cx="8.5" cy="12" r="2.5"/><path d="M17 11l4-2.5v7L17 13"/>',
  shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  battery: '<rect x="3" y="7" width="16" height="10" rx="1.5"/><path d="M21 10.5v3M11.5 8.5l-2.5 4h3.5l-2.5 4"/>',
  server: '<rect x="4" y="3" width="16" height="7" rx="1.5"/><rect x="4" y="14" width="16" height="7" rx="1.5"/><path d="M8 6.5h.01M8 17.5h.01M12 6.5h4M12 17.5h4"/>',
  chip: '<rect x="6" y="6" width="12" height="12" rx="1.5"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"/>',
  tools: '<path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L3.5 17.5l3 3 5.7-5.7a4 4 0 0 0 5.3-5.3l-2.5 2.5-2.5-.5-.5-2.5z"/>',
};

function deviceArt(icon, size = '') {
  return `<div class="nv-device ${size}" aria-hidden="true"><span class="nv-device__grid"></span><span class="nv-device__halo"></span><svg viewBox="0 0 24 24">${DEVICE_ICONS[icon] || DEVICE_ICONS.chip}</svg></div>`;
}

/* Reference wall: every logo whole and readable (no cropping, no fade mask). */
function logoWall(limit = 81) {
  const visible = clientLogos.slice(0, limit);
  const hidden = clientLogos.slice(limit);
  return `<div class="nv-wall-wrap nv-wrap">
    <ul class="nv-wall" aria-label="${tr('81 organisations accompagnées par MIRS', '81 organizations supported by MIRS')}">
      ${visible.map((file, index) => `<li class="nv-wall__item" style="--i:${index % 9}"><img src="${AS}${file}" alt="" loading="lazy" decoding="async"></li>`).join('')}
      ${hidden.map((file) => `<li class="nv-wall__item" data-logo-extra hidden><img src="${AS}${file}" alt="" loading="lazy" decoding="async"></li>`).join('')}
    </ul>
    ${hidden.length ? `<button type="button" class="nv-btn nv-btn--ghost nv-wall__more" data-logos-more data-magnetic>${roll(tr(`Afficher les ${clientLogos.length} références`, `Show all ${clientLogos.length} references`))}<i aria-hidden="true">${ICON_PLUS}</i></button>` : ''}
  </div>`;
}
const logoBands = (compact = false) => logoWall(compact ? 27 : 81);

const cartCount = () => state.cart.reduce((total, item) => total + item.qty, 0);

function header() {
  const route = pageRoute();
  const current = (path) => (route === path || route.startsWith(`${path}/`)) ? ' aria-current="page"' : '';
  return `<header class="nv-header" data-header>
    <a href="${pageHref('/')}" data-link class="nv-brand" aria-label="${tr('MIRS — accueil', 'MIRS — home')}">
      ${brandMark()}
      <span><b>MIRS</b><small>SPATIAL SYSTEMS</small></span>
    </a>
    <nav class="nv-nav" aria-label="${tr('Navigation principale', 'Main navigation')}">
      <a href="${pageHref('/')}#univers" data-anchor="univers" data-scramble>${tr('Univers', 'Capabilities')}</a>
      <a href="${pageHref('/amadeus')}" data-link class="nv-nav__amadeus"${current('/amadeus')}><span data-scramble>AMADEUS</span><small>${tr('Exclusif', 'Exclusive')}</small></a>
      <a href="${pageHref('/formation')}" data-link data-scramble${current('/formation')}>Academy</a>
      <a href="${pageHref('/informatique/boutique')}" data-link data-scramble${current('/informatique/boutique')}>${tr('Boutique', 'Store')}</a>
      <a href="${pageHref('/maintenance')}" data-link data-scramble${current('/maintenance')}>Maintenance</a>
      <a href="${pageHref('/realisations')}" data-link data-scramble${current('/realisations')}>${tr('Réalisations', 'Projects')}</a>
    </nav>
    <div class="nv-header__actions">
      <a class="nv-chip" href="${alternateLanguageHref()}" data-link aria-label="${tr('Passer en anglais', 'Switch to French')}">${state.locale === 'fr' ? 'EN' : 'FR'}</a>
      <button type="button" class="nv-chip nv-chip--icon" data-theme aria-label="${tr('Changer de thème', 'Change theme')}" title="${tr('Changer de thème', 'Change theme')}"><span class="nv-theme-icon" aria-hidden="true"></span></button>
      <button type="button" data-cart class="nv-chip nv-cart-chip" aria-label="${tr('Ouvrir le panier', 'Open cart')}"><i aria-hidden="true">${ICON_CART}</i><span>${tr('Panier', 'Cart')}</span><b data-cart-count>${cartCount()}</b></button>
      ${button('/contact', tr('Parler à MIRS', 'Talk to MIRS'), 'primary nv-btn--sm nv-header__cta')}
      <button type="button" class="nv-burger" data-menu aria-controls="nv-menu" aria-expanded="false"><span></span><span></span><span class="sr-only">Menu</span></button>
    </div>
  </header>
  <div class="nv-menu" id="nv-menu" data-mobile-menu>
    <div class="nv-menu__bg" aria-hidden="true"></div>
    <nav class="nv-menu__inner" aria-label="${tr('Menu', 'Menu')}">
      <p class="nv-menu__label">${tr('NAVIGATION / MIRS', 'NAVIGATION / MIRS')}</p>
      ${[
        ['/', tr('Accueil', 'Home')],
        ['/amadeus', tr('AMADEUS · exclusif', 'AMADEUS · exclusive')],
        ['/formation', 'MIRS Academy'],
        ['/informatique/boutique', tr('Boutique informatique', 'IT store')],
        ['/maintenance', tr('Maintenance & urgence', 'Maintenance & emergency')],
        ['/informatique', tr('Informatique', 'Information technology')],
        ['/imprimerie', tr('Imprimerie', 'Print production')],
        ['/creation-agence', tr('Création d’agence', 'Agency creation')],
        ['/realisations', tr('Réalisations', 'Projects')],
        ['/contact', 'Contact'],
      ].map(([path, label], index) => `<a href="${pageHref(path)}" data-link style="--i:${index}"><small>${String(index).padStart(2, '0')}</small>${label}</a>`).join('')}
      <div class="nv-menu__foot"><a href="tel:+224622051321">+224 622 05 13 21</a><a href="https://wa.me/224622051321" target="_blank" rel="noreferrer">WhatsApp ↗</a><span>Conakry · Guinée</span></div>
    </nav>
  </div>`;
}

function footer() {
  return `<footer class="nv-footer">
    <div class="nv-footer__glow" aria-hidden="true"></div>
    <div class="nv-footer__top nv-wrap">
      <div class="nv-footer__intro">
        <a href="${pageHref('/')}" data-link class="nv-brand">${brandMark()}<span><b>MIRS</b><small>SPATIAL SYSTEMS</small></span></a>
        <p>${tr('Solutions intégrées pour les opérations, la visibilité et les compétences.', 'Integrated solutions for operations, visibility and capabilities.')}</p>
        <a href="${pageHref('/amadeus')}" data-link class="nv-amadeus-pill"><i aria-hidden="true"></i>${tr('Représentant exclusif AMADEUS', 'Exclusive AMADEUS representative')}</a>
        ${button('/contact', tr('Démarrer un projet', 'Start a project'), 'primary')}
      </div>
      <div class="nv-footer__col"><span>${tr('Univers', 'Capabilities')}</span>${universes.map((unit) => `<a href="${pageHref(unit.path)}" data-link data-scramble>${local(unit.name)}</a>`).join('')}<a href="${pageHref('/amadeus')}" data-link data-scramble>AMADEUS</a></div>
      <div class="nv-footer__col"><span>${tr('Explorer', 'Explore')}</span><a href="${pageHref('/informatique/boutique')}" data-link data-scramble>${tr('Boutique informatique', 'IT store')}</a><a href="${pageHref('/imprimerie/boutique')}" data-link data-scramble>${tr('Boutique imprimerie', 'Print store')}</a><a href="${pageHref('/formation')}" data-link data-scramble>${tr('Sessions Academy', 'Academy sessions')}</a><a href="${pageHref('/realisations')}" data-link data-scramble>${tr('Réalisations', 'Projects')}</a><a href="${pageHref('/contact')}" data-link data-scramble>Contact</a></div>
      <div class="nv-footer__col"><span>Conakry · Guinée</span><a href="tel:+224622051321">+224 622 05 13 21</a><a href="https://wa.me/224622051321" target="_blank" rel="noreferrer">WhatsApp ↗</a><a href="${pageHref('/maintenance')}" data-link class="nv-footer__urgent"><i aria-hidden="true"></i>${tr('Intervention d’urgence', 'Emergency call-out')}</a><p class="nv-clock"><i></i>Conakry <b data-clock>--:--</b> GMT</p></div>
    </div>
    <div class="nv-footer__mark" data-progress aria-hidden="true"><span>MIRS</span></div>
    <div class="nv-footer__bottom nv-wrap"><span>© ${new Date().getFullYear()} MIRS Spatial Systems</span><span>${tr('Concevoir · Déployer · Accompagner', 'Design · Deploy · Support')}</span><a href="${pageHref('/admin')}" data-link>${tr('Administration', 'Administration')}</a><button type="button" class="nv-totop" data-totop aria-label="${tr('Revenir en haut', 'Back to top')}">↑</button></div>
  </footer>`;
}

function cartLine(item, index, compact = true) {
  const stepper = `<div class="nv-qty" role="group" aria-label="${tr('Quantité', 'Quantity')}"><button type="button" data-cart-qty="${index}:-1" aria-label="${tr('Diminuer', 'Decrease')}">${ICON_MINUS}</button><b>${item.qty}</b><button type="button" data-cart-qty="${index}:1" aria-label="${tr('Augmenter', 'Increase')}">${ICON_PLUS}</button></div>`;
  const art = item.icon ? deviceArt(item.icon, 'nv-device--xs') : `<span class="nv-line__tag">${item.kind === 'course' ? 'ACAD' : item.kind === 'print' ? 'PRINT' : 'MIRS'}</span>`;
  return `<li class="nv-line" style="--i:${index}">
    ${art}
    <div class="nv-line__copy"><b>${escapeHtml(item.name)}</b>${item.option ? `<small>${escapeHtml(item.option)}</small>` : ''}${compact ? '' : `<small>${tr('Prix sur devis', 'Price on quotation')}</small>`}</div>
    ${stepper}
    <button type="button" class="nv-line__remove" data-remove="${index}" aria-label="${tr('Retirer', 'Remove')} ${escapeHtml(item.name)}">×</button>
  </li>`;
}

function cartPanel() {
  const entries = state.cart.length
    ? state.cart.map((item, index) => cartLine(item, index)).join('')
    : `<li class="nv-drawer__empty">${tr('Votre panier est vide. Ajoutez un équipement, un support ou une formation.', 'Your cart is empty. Add equipment, a print item or a course.')}</li>`;
  return `<div class="nv-drawer__head"><span>${tr('PANIER', 'CART')} / ${String(cartCount()).padStart(2, '0')}</span><button type="button" data-close-cart aria-label="${tr('Fermer', 'Close')}">×</button></div>
    <h2>${tr('Votre<br><em>panier.</em>', 'Your<br><em>cart.</em>')}</h2>
    <ul class="nv-lines">${entries}</ul>
    ${state.cart.length ? `<div class="nv-drawer__total"><span>${tr('Total', 'Total')}</span><b>${tr('Sur devis', 'On quotation')}</b><small>${tr('MIRS confirme le montant et la disponibilité.', 'MIRS confirms the amount and availability.')}</small></div>${button('/checkout', tr('Passer commande', 'Checkout'), 'primary nv-btn--block')}<button type="button" class="nv-drawer__continue" data-close-cart>${tr('Continuer mes achats', 'Continue shopping')}</button>` : `${button('/informatique/boutique', tr('Voir la boutique', 'Browse the store'), 'ghost')}`}`;
}

function overlays() {
  return `<div class="nv-scrim" data-close-cart></div>
    <aside class="nv-drawer" data-cart-drawer aria-label="${tr('Panier', 'Cart')}">${cartPanel()}</aside>
    <div class="nv-toast" data-toast role="status" aria-live="polite"></div>
    <dialog class="nv-video" data-video-modal>
      <button type="button" class="nv-video__close" data-close-video aria-label="${tr('Fermer la vidéo', 'Close video')}">×</button>
      <div class="nv-video__body" data-video-body></div>
    </dialog>
    ${enrollDialog()}`;
}

function shell(content, route = '') {
  const isAdminRoute = route === '/admin';
  if (isAdminRoute) return `<div class="site-shell nv nva route-admin">${content}</div>`;
  return `<div class="site-shell nv route-${route.replaceAll('/', '-').replace(/^-/, '') || 'home'}">
    <a class="nv-skip" href="#contenu">${tr('Aller au contenu', 'Skip to content')}</a>
    <div class="nv-progress" aria-hidden="true"><span data-scroll-meter></span></div>
    <div class="nv-grain" aria-hidden="true"></div>
    ${header()}
    <div id="contenu" class="nv-page">${content}</div>
    ${footer()}
    ${overlays()}
  </div>`;
}

/* Home: the exclusive AMADEUS representation, given its own stage. */
function amadeusBand() {
  const next = academyCourses.find((course) => course.amadeus);
  const session = next ? courseSessions(next)[0] : null;
  return `<section class="nv-amadeus-band" aria-labelledby="nv-amadeus-band-title">
    <div class="nv-amadeus-band__inner nv-wrap" data-spot>
      <div class="nv-amadeus-band__mark" aria-hidden="true"><span>AMADEUS</span><span>AMADEUS</span></div>
      <div class="nv-amadeus-band__copy">
        <p class="nv-amadeus-pill nv-amadeus-pill--lg"><i aria-hidden="true"></i>${tr('Représentant exclusif', 'Exclusive representative')}</p>
        ${sectionTitle(tr('MIRS, représentant exclusif <em>d’AMADEUS.</em>', 'MIRS, the exclusive <em>AMADEUS</em> representative.'), 'nv-amadeus-band__title', 'h2', 'id="nv-amadeus-band-title"')}
        <p data-nv="up">${tr('Accès à la solution, déploiement en agence, formation des équipes et assistance au quotidien : un seul interlocuteur pour travailler avec AMADEUS.', 'Access to the solution, agency deployment, team training and day-to-day support: one single partner to work with AMADEUS.')}</p>
        <div class="nv-hero__actions" data-nv="up" style="--d:120ms">${button('/amadeus', tr('Découvrir l’offre AMADEUS', 'Discover the AMADEUS offer'), 'primary')}${button('/formation/amadeus', session ? tr(`Session du ${formatDate(session.date, 'short')}`, `Session on ${formatDate(session.date, 'short')}`) : tr('Formation AMADEUS', 'AMADEUS training'), 'ghost')}</div>
      </div>
      <ul class="nv-amadeus-band__pillars">
        ${[
          ['01', tr('Représentation', 'Representation'), tr('L’interlocuteur officiel pour accéder à AMADEUS.', 'The official partner to access AMADEUS.')],
          ['02', tr('Déploiement', 'Deployment'), tr('Installation et paramétrage en agence.', 'Installation and set-up in your agency.')],
          ['03', tr('Formation', 'Training'), tr('Des agents opérationnels sur le système.', 'Agents operational on the system.')],
          ['04', tr('Assistance', 'Support'), tr('Un accompagnement au quotidien.', 'Day-to-day support.')],
        ].map(([index, title, text], position) => `<li data-nv="up" style="--d:${position * 80}ms"><span>${index}</span><b>${title}</b><small>${text}</small></li>`).join('')}
      </ul>
    </div>
  </section>`;
}


/* ---------------- Home ---------------- */

function universeCards() {
  return universes.map((item, index) => `<a href="${pageHref(item.path)}" data-link class="nv-unit nv-unit--${item.className}" data-spot data-nv="up" style="--d:${index * 70}ms" data-cursor="${tr('Explorer', 'Explore')}">
    <div class="nv-unit__media"><img src="${AS}${item.image}" alt="" loading="lazy" data-speed="-0.06"></div>
    <div class="nv-unit__veil" aria-hidden="true"></div>
    <div class="nv-unit__top"><span>${item.index} / ${item.signal}</span><i aria-hidden="true">${ICON_ARROW}</i></div>
    <div class="nv-unit__body"><small>${local(item.name)}</small><h3>${local(item.title)}</h3><p>${local(item.detail)}</p></div>
  </a>`).join('');
}

function homeProductCard(item, mode, index = 0) {
  const name = local(item.name);
  return `<article class="nv-product nv-product--${mode}" data-spot data-tilt data-nv="up" style="--d:${index * 80}ms">
    <div class="nv-product__image"><img src="${AS}${item.image}" alt="${name}" loading="lazy"><span>${mode === 'tech' ? 'MIRS / IT' : 'MIRS / PRINT'}</span></div>
    <div class="nv-product__body"><small>${local(item.category)}</small><h3>${name}</h3><p>${local(item.detail)}</p><button type="button" class="nv-add" data-add="${name}" data-add-kind="${mode}">${tr('Ajouter au panier', 'Add to cart')} <i aria-hidden="true">${ICON_PLUS}</i></button></div>
  </article>`;
}

const methodSteps = [
  [{ fr: 'Écouter', en: 'Listen' }, { fr: 'Comprendre le contexte avant de nommer la réponse.', en: 'Understand the context before naming the answer.' }, 'LISTEN'],
  [{ fr: 'Cadrer', en: 'Frame' }, { fr: 'Définir un terrain réaliste, une priorité et un rythme.', en: 'Define a realistic scope, a priority and a pace.' }, 'FRAME'],
  [{ fr: 'Produire', en: 'Produce' }, { fr: 'Déployer, imprimer ou former avec des gestes précis.', en: 'Deploy, print or train with precise execution.' }, 'BUILD'],
  [{ fr: 'Accompagner', en: 'Support' }, { fr: 'Rester présent au moment où la solution devient usage.', en: 'Stay present as the solution becomes everyday use.' }, 'GUIDE'],
  [{ fr: 'Transmettre', en: 'Transfer' }, { fr: 'Laisser derrière nous plus d’autonomie que de dépendance.', en: 'Leave behind more autonomy than dependency.' }, 'SHARE'],
];

function home() {
  const films = [
    { file: 'mirs-media/mirs-company-presentation.mp4', index: '01 / MIRS', kicker: tr('Présentation institutionnelle', 'Corporate presentation'), title: tr('L’entreprise,<br>dans son <em>élan.</em>', 'The company,<br>in <em>motion.</em>'), shape: 'wide', poster: 'company' },
    { file: 'mirs-media/mirs-print-presentation.mp4', index: '02 / PRINT', kicker: tr('Atelier d’imprimerie', 'Print workshop'), title: tr('L’atelier, au plus près de la <em>matière.</em>', 'The workshop, close to the <em>material.</em>'), shape: 'tall', poster: 'print' },
    { file: 'mirs-media/mirs-macbook-motion.mp4', index: '03 / DIGITAL', kicker: tr('Animation digitale', 'Digital animation'), title: tr('Le produit,<br>en <em>mouvement.</em>', 'The product,<br>in <em>motion.</em>'), shape: 'tall', poster: 'macbook' },
  ];
  const priorities = [
    { path: '/creation-agence', index: '04', code: 'TRAVEL SYSTEM', kicker: tr('Création d’agence de voyage', 'Travel agency creation'), title: tr('Une agence prête à <em>opérer.</em>', 'An agency ready to <em>operate.</em>'), text: tr('Positionnement, identité, offres et outils pour passer d’une idée à une agence de voyage structurée.', 'Positioning, identity, offers and tools to turn an idea into a structured travel agency.'), image: 'editorial/developpement-web.jpg' },
    { path: '/formation', index: '03', code: 'AMADEUS', kicker: tr('Représentation & formation', 'Representation & training'), title: tr('AMADEUS, au cœur du <em>métier.</em>', 'AMADEUS, at the heart of <em>travel.</em>'), text: tr('Une porte d’entrée dédiée pour représenter, déployer et transmettre les usages AMADEUS aux équipes de voyage.', 'A dedicated entry point to represent, deploy and transfer AMADEUS know-how to travel teams.'), image: 'editorial/formation-collaboration.jpg' },
    { path: '/maintenance', index: '05', code: 'CONTINUITY', kicker: tr('Suivi de maintenance', 'Maintenance follow-up'), title: tr('Préserver ce qui <em>fonctionne.</em>', 'Keep what <em>works.</em>'), text: tr('Prévention, intervention et historique clair pour suivre les équipements et réduire les interruptions.', 'Prevention, intervention and a clear history to monitor assets and reduce interruptions.'), image: 'editorial/maintenance-pc.jpg' },
  ];
  return shell(`<main class="nv-home">
    <section class="nv-hero" id="top" data-hero>
      <canvas class="nv-hero__field" data-field aria-hidden="true"></canvas>
      <div class="nv-hero__aurora" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="nv-hero__grid" aria-hidden="true"></div>
      <div class="nv-hero__inner nv-wrap">
        <div class="nv-hero__meta" data-nv="fade"><span>MIRS / CONAKRY</span><span>09° 31' N · 13° 42' W</span><span>${tr('DEPUIS 2006', 'SINCE 2006')}</span></div>
        <p class="nv-badge" data-nv="up"><i aria-hidden="true"></i><b>${tr('Système actif', 'System online')}</b><span data-cycle='${JSON.stringify(universeNames())}'>${universeNames()[0]}</span></p>
        ${sectionTitle(tr('Des solutions intégrées<br>qui font <em>avancer.</em>', 'Integrated solutions<br>built for <em>performance.</em>'), 'nv-hero__title', 'h1')}
        <div class="nv-hero__row">
          <p class="nv-hero__intro" data-nv="up" style="--d:200ms">${tr('MIRS conçoit, déploie et accompagne des solutions fiables qui renforcent vos opérations, votre visibilité et les compétences de vos équipes.', 'MIRS designs, deploys and supports reliable solutions that strengthen operations, visibility and team capabilities.')}</p>
          <div class="nv-hero__actions" data-nv="up" style="--d:320ms">${button('/contact', tr('Échanger avec un expert', 'Speak with an expert'), 'primary')}${anchor('univers', tr('Découvrir nos pôles', 'Explore our capabilities'))}</div>
        </div>
      </div>
      <div class="nv-hero__stage nv-wrap" data-progress="enter">
        <div class="nv-hero__media" data-cursor="${tr('Lecture', 'Play')}">
          <video autoplay muted loop playsinline preload="metadata" data-ambient poster="${AS}mirs-media/posters/macbook.jpg" src="${AS}mirs-media/mirs-macbook-motion.mp4"></video>
          <div class="nv-hero__scan" aria-hidden="true"></div>
          <div class="nv-hud nv-hud--tl"><span>REC ●</span><b>MIRS / LIVE FIELD</b></div>
          <div class="nv-hud nv-hud--tr"><span>05 ${tr('UNIVERS', 'CAPABILITIES')}</span><span>81 ${tr('RÉFÉRENCES', 'REFERENCES')}</span></div>
          <div class="nv-hero__chips" aria-hidden="true">
            <div class="nv-glass nv-glass--a" data-speed="0.08"><small>01 / IT</small><b>${tr('Système fiable', 'Reliable systems')}</b><span class="nv-bars"><i></i><i></i><i></i><i></i></span></div>
            <div class="nv-glass nv-glass--b" data-speed="-0.06"><small>02 / PRINT</small><b>${tr('Marque visible', 'Visible brand')}</b><span class="nv-cmyk"><i></i><i></i><i></i><i></i></span></div>
            <div class="nv-glass nv-glass--c" data-speed="0.12"><small>03 / ACADEMY</small><b>${tr('Équipe prête', 'Teams ready')}</b><span class="nv-ring"><i></i></span></div>
          </div>
          <button type="button" class="nv-hero__play" data-video="mirs-media/mirs-company-presentation.mp4" data-video-title="${tr('MIRS en vidéo', 'MIRS on film')}"><span class="nv-play-orb">${ICON_PLAY}</span><span><small>${tr('FILM INSTITUTIONNEL', 'CORPORATE FILM')}</small>${tr('Voir MIRS en mouvement', 'Watch MIRS in motion')}</span></button>
        </div>
      </div>
      <a class="nv-hero__scroll" href="#signal" data-anchor="signal" aria-label="${tr('Découvrir la suite', 'Discover more')}"><span>SCROLL</span><i aria-hidden="true"></i></a>
    </section>

    <section class="nv-ribbons" id="signal" aria-label="${tr('Les pôles d’action MIRS', 'MIRS capabilities')}">
      ${marquee(universeNames())}
      ${marquee([tr('CONCEVOIR', 'DESIGN'), tr('DÉPLOYER', 'DEPLOY'), tr('ACCOMPAGNER', 'SUPPORT'), tr('TRANSMETTRE', 'TRANSFER'), 'CONAKRY', tr('DEPUIS 2006', 'SINCE 2006')], 'nv-marquee--alt')}
    </section>

    ${amadeusBand()}

    <section class="nv-manifesto nv-wrap">
      <div class="nv-manifesto__side">${eyebrow(tr('UN PARTENAIRE, CINQ CAPACITÉS', 'ONE PARTNER, FIVE CAPABILITIES'), '01')}${link('/realisations', tr('Voir les réalisations', 'View our projects'))}</div>
      <p class="nv-manifesto__text" data-scrub>${tr('Un même partenaire pour vos enjeux opérationnels. Chaque univers MIRS apporte une expertise spécifique. Ensemble, ils donnent aux organisations des fondations techniques, des supports cohérents et des équipes plus autonomes.', 'One partner for your operational priorities. Each MIRS capability brings a specific expertise. Together they provide technical foundations, coherent materials and more autonomous teams.')}</p>
      <div class="nv-stats">
        <div class="nv-stat" data-spot data-nv="up"><b data-scramble-in>2006</b><span>${tr('année d’ancrage', 'year established')}</span><i aria-hidden="true"></i></div>
        <div class="nv-stat" data-spot data-nv="up" style="--d:90ms"><b data-count="81">81</b><span>${tr('références visibles', 'visible references')}</span><i aria-hidden="true"></i></div>
        <div class="nv-stat" data-spot data-nv="up" style="--d:180ms"><b data-count="5" data-pad="2">05</b><span>${tr('univers complémentaires', 'connected capabilities')}</span><i aria-hidden="true"></i></div>
      </div>
    </section>

    <section class="nv-section nv-wrap" id="univers">
      <div class="nv-head">
        <div>${eyebrow(tr('NOS UNIVERS', 'OUR CAPABILITIES'), '02')}${sectionTitle(tr('Cinq expertises.<br>Une même <em>exigence.</em>', 'Five disciplines.<br>One <em>standard.</em>'))}</div>
        <p data-nv="up">${tr('Des expertises distinctes, structurées pour ouvrir la bonne conversation au bon moment.', 'Distinct capabilities designed to open the right conversation at the right time.')}</p>
      </div>
      <div class="nv-bento">${universeCards()}</div>
    </section>

    <section class="nv-section nv-wrap nv-priorities" aria-labelledby="nv-priorities-title">
      <div class="nv-head">
        <div>${eyebrow(tr('POUR GRANDIR ET DURER', 'BUILT TO GROW AND LAST'), '03')}${sectionTitle(tr('Les priorités qui rendent<br>votre activité <em>durable.</em>', 'Priorities that make your<br>business more <em>resilient.</em>'), '', 'h2', 'id="nv-priorities-title"')}</div>
        <p data-nv="up">${tr('MIRS accompagne aussi les métiers du voyage et la continuité des opérations : de la création d’une agence au déploiement d’AMADEUS, jusqu’au suivi de maintenance.', 'MIRS also supports travel operations and business continuity: from creating an agency and deploying AMADEUS to maintaining the systems that keep work moving.')}</p>
      </div>
      <div class="nv-hoverlist" data-hoverlist>
        ${priorities.map((item, index) => `<a href="${pageHref(item.path)}" data-link class="nv-hoverlist__row" data-img="${AS}${item.image}" data-nv="up" style="--d:${index * 80}ms">
          <span class="nv-hoverlist__index">${item.index}</span>
          <span class="nv-hoverlist__main"><small>${item.kicker} · ${item.code}</small><b>${item.title}</b></span>
          <span class="nv-hoverlist__text">${item.text}</span>
          <i aria-hidden="true">${ICON_ARROW}</i>
        </a>`).join('')}
        <figure class="nv-hoverlist__preview" aria-hidden="true">${priorities.map((item) => `<img src="${AS}${item.image}" alt="" loading="lazy" data-src="${AS}${item.image}">`).join('')}</figure>
      </div>
    </section>

    <section class="nv-films" data-hscroll aria-labelledby="nv-films-title">
      <div class="nv-films__pin">
        <div class="nv-films__head nv-wrap">
          <div>${eyebrow(tr('MIRS EN VIDÉO', 'MIRS ON FILM'), '04')}${sectionTitle(tr('Trois films.<br>Un même <em>élan.</em>', 'Three films.<br>One <em>drive.</em>'), '', 'h2', 'id="nv-films-title"')}</div>
          <p class="nv-films__hint" data-nv="fade"><span>${tr('Faites défiler', 'Keep scrolling')}</span><i aria-hidden="true"></i></p>
        </div>
        <div class="nv-films__track" data-hscroll-track>
          ${films.map((film) => `<button type="button" class="nv-film nv-film--${film.shape}" data-video="${film.file}" data-video-title="${film.kicker}" data-cursor="${tr('Lecture', 'Play')}">
            <video muted loop playsinline preload="none" data-preview poster="${AS}mirs-media/posters/${film.poster}.jpg" src="${AS}${film.file}"></video>
            <span class="nv-film__veil" aria-hidden="true"></span>
            <span class="nv-film__top"><span>${film.index}</span><span class="nv-play-orb nv-play-orb--sm">${ICON_PLAY}</span></span>
            <span class="nv-film__copy"><small>${film.kicker}</small><b>${film.title}</b></span>
          </button>`).join('')}
          <div class="nv-film nv-film--end"><p>${tr('Chaque projet commence par une conversation.', 'Every project starts with a conversation.')}</p>${button('/contact', tr('Commencer', 'Get started'), 'primary')}</div>
        </div>
        <div class="nv-films__bar nv-wrap" aria-hidden="true"><span data-hscroll-bar></span></div>
      </div>
    </section>

    <section class="nv-method" aria-labelledby="nv-method-title">
      <div class="nv-method__layout nv-wrap">
        <div class="nv-method__intro">
          ${eyebrow(tr('UNE MÉTHODE EN MOUVEMENT', 'A METHOD IN MOTION'), '05')}
          ${sectionTitle(tr('Pas de solution hors-sol. <em>Seulement le juste enchaînement.</em>', 'No out-of-context solutions. <em>Only the right sequence.</em>'), '', 'h2', 'id="nv-method-title"')}
          <p data-nv="up">${tr('Un projet s’éclaircit lorsque l’écoute, le cadre, la production, l’accompagnement et la transmission se suivent dans le bon ordre.', 'A project becomes clear when listening, framing, production, support and transfer follow one another in the right order.')}</p>
        </div>
        <div class="nv-stack">
          ${methodSteps.map((step, index) => `<article class="nv-stack__card" style="--i:${index}" data-stack>
            <div class="nv-stack__top"><span>0${index + 1} / 05</span><span>${step[2]}</span></div>
            <b class="nv-stack__num" aria-hidden="true">0${index + 1}</b>
            <div class="nv-stack__body"><h3>${local(step[0])}</h3><p>${local(step[1])}</p></div>
            <div class="nv-stack__orbit" aria-hidden="true"><i></i><i></i><i></i></div>
          </article>`).join('')}
        </div>
      </div>
    </section>

    <section class="nv-section nv-wrap" aria-labelledby="nv-shop-title">
      <div class="nv-head">
        <div>${eyebrow(tr('BOUTIQUES MIRS', 'MIRS STORES'), '06')}${sectionTitle(tr('Des articles pour<br>passer à l’<em>action.</em>', 'Items that turn<br>projects into <em>action.</em>'), '', 'h2', 'id="nv-shop-title"')}</div>
        <p data-nv="up">${tr('Découvrez une sélection des boutiques informatique et imprimerie. Chaque article peut devenir le point de départ d’un devis structuré.', 'Explore a selection from the IT and print stores. Each item can be the first step toward a structured quotation.')}</p>
      </div>
      <div class="nv-shelf">
        <div class="nv-shelf__label"><span>01</span><b>${tr('Boutique informatique', 'IT store')}</b>${link('/informatique/boutique', tr('Tout voir', 'View all'))}</div>
        <div class="nv-skus">${storeProducts.filter((product) => isProductVisible(product.id)).slice(0, 3).map(storeCard).join('')}</div>
        <div class="nv-shelf__label"><span>02</span><b>${tr('Boutique imprimerie', 'Print store')}</b>${link('/imprimerie/boutique', tr('Tout voir', 'View all'))}</div>
        <div class="nv-products">${products.print.filter((_, index) => isProductVisible(`print:${index}`)).slice(0, 3).map((item, index) => homeProductCard(item, 'print', index)).join('')}</div>
      </div>
    </section>

    <section class="nv-section nv-references" id="references">
      <div class="nv-wrap nv-head">
        <div>${eyebrow(tr('UNE CARTE DE CONFIANCE', 'A MAP OF TRUST'), '07')}${sectionTitle(tr('<span data-count="81">81</span> identités dans<br>notre <em>champ d’action.</em>', '<span data-count="81">81</span> organizations<br>in our <em>field of action.</em>'))}</div>
        <p data-nv="up">${tr('Institutions, entreprises, PME et organisations : les marques affichées ici sont les véritables références remises par MIRS.', 'Institutions, companies, SMEs and organizations: the brands shown here are genuine references provided by MIRS.')}</p>
      </div>
      ${logoBands()}
    </section>

    <section class="nv-academy-band">
      <div class="nv-wrap nv-academy-band__layout">
        <div class="nv-academy-band__copy">
          ${eyebrow('MIRS ACADEMY', '08')}
          ${sectionTitle(tr('Le vrai luxe : une équipe qui <em>sait faire.</em>', 'The real luxury: a team that <em>knows how.</em>'))}
          <p data-nv="up">${tr('Des parcours concrets, une pédagogie de pratique et un point de départ adapté à votre contexte.', 'Concrete pathways, practice-led teaching and a starting point adapted to your context.')}</p>
          <div data-nv="up" style="--d:120ms">${button('/formation', tr('Entrer dans l’Academy', 'Enter the Academy'), 'primary')}</div>
        </div>
        <div class="nv-orbit" aria-hidden="true">
          <div class="nv-orbit__core">${brandMark()}<small>ACADEMY</small></div>
          <div class="nv-orbit__ring nv-orbit__ring--a">${courses.map((course, index) => `<span style="--a:${index * 72}deg">${local(course.name)}</span>`).join('')}</div>
          <div class="nv-orbit__ring nv-orbit__ring--b">${[tr('OUTILS', 'TOOLS'), tr('GESTES', 'PRACTICE'), tr('RELAIS', 'FOLLOW-UP')].map((word, index) => `<span style="--a:${index * 120 + 30}deg">${word}</span>`).join('')}</div>
        </div>
      </div>
    </section>

    ${closingPortal(tr('Faisons entrer votre projet dans le <em>réel.</em>', 'Let’s bring your project into the <em>real world.</em>'), tr('Parlez-nous du point de départ. Nous chercherons la suite la plus juste.', 'Tell us where you are starting from. We will look for the most fitting next step.'), tr('Commencer la conversation', 'Start the conversation'))}
  </main>`, '/');
}

function closingPortal(title, text, cta) {
  return `<section class="nv-portal" data-spot>
    <div class="nv-portal__rings" aria-hidden="true"><i></i><i></i><i></i></div>
    <div class="nv-portal__inner nv-wrap">
      ${eyebrow(tr('LA PROCHAINE ÉTAPE', 'THE NEXT STEP'))}
      ${sectionTitle(title, 'nv-portal__title')}
      <p data-nv="up">${text}</p>
      <div class="nv-portal__actions" data-nv="up" style="--d:120ms">${button('/contact', cta, 'primary nv-btn--lg')}<a class="nv-btn nv-btn--ghost" href="https://wa.me/224622051321" target="_blank" rel="noreferrer" data-magnetic>${roll('WhatsApp')}<i aria-hidden="true">${ICON_ARROW}</i></a></div>
    </div>
  </section>`;
}

const branchData = {
  informatique: {
    label: '01 / INFRASTRUCTURE',
    name: 'Informatique',
    hero: 'future/informatique-team.jpg',
    accent: 'blue',
    code: 'SYSTEM / 01',
    initial: 'A',
    intro: 'Des fondations technologiques fiables pour sécuriser la continuité des opérations et la performance des équipes.',
    shop: '/informatique/boutique',
    shopLabel: 'Voir les solutions',
    video: 'technology-flow.mp4',
    videoLabel: 'Voir MIRS en action',
    featureTitle: 'Une infrastructure claire pour des opérations continues.',
    featureText: 'Du poste de travail au réseau, nous organisons les éléments essentiels pour qu’ils soient lisibles, sécurisés et suivis.',
    capabilities: [
      ['Architecture', 'Postes, réseau et accès pensés comme un ensemble.'],
      ['Protection', 'Des priorités de sécurité adaptées à ce qui compte vraiment.'],
      ['Support', 'Un point de contact quand le quotidien doit repartir vite.'],
      ['Évolution', 'Une base capable de suivre les équipes et les usages.'],
    ],
    steps: [['Écouter', 'Comprendre les usages, les points de friction et le terrain.'], ['Cartographier', 'Dessiner les dépendances avant de déplacer une pièce.'], ['Déployer', 'Installer avec une logique qui sera comprise après nous.'], ['Accompagner', 'Mettre les équipes à l’aise avec leur nouvel environnement.'], ['Maintenir', 'Préserver la continuité, intervenir et ajuster.']],
  },
  imprimerie: {
    label: '02 / PRODUCTION',
    name: 'Imprimerie',
    hero: 'future/imprimerie-team.jpg',
    accent: 'cyan',
    code: 'PRINT / 02',
    initial: 'B',
    intro: 'Des supports de communication conçus pour renforcer la présence de votre marque, de l’idée au support final.',
    shop: '/imprimerie/boutique',
    shopLabel: 'Voir les supports',
    video: 'imprimerie-presentation.mp4',
    videoLabel: 'Découvrir l’atelier',
    featureTitle: 'Une identité cohérente, sur chaque support.',
    featureText: 'Du premier fichier au dernier exemplaire, notre atelier relie exigence graphique, choix de support et précision de fabrication.',
    capabilities: [
      ['Identité', 'Une cohérence visuelle qui traverse chaque support.'],
      ['Grand format', 'Signalétique, habillage et présence dans l’espace.'],
      ['Objets & textile', 'Des objets que l’on garde, porte et partage.'],
      ['Production', 'Un suivi de fabrication attentif aux détails concrets.'],
    ],
    steps: [['Cadrer', 'Clarifier le message, les usages et le résultat attendu.'], ['Composer', 'Choisir formats, matières et détails qui portent l’idée.'], ['Préparer', 'Contrôler les fichiers et anticiper les contraintes de production.'], ['Produire', 'Fabriquer avec la précision qui respecte l’intention.'], ['Livrer', 'Faire arriver le support là où il a besoin d’agir.']],
  },
  'creation-agence': {
    label: '04 / CRÉATION D’AGENCE',
    name: 'Création<br>d’agence',
    hero: 'future/references-enterprises.jpg',
    accent: 'blue',
    code: 'AGENCY / 04',
    initial: 'D',
    intro: 'Nous structurons les bases d’une agence : positionnement, identité, outils, offres et cadre de fonctionnement.',
    video: 'mirs-media/mirs-company-presentation.mp4',
    videoLabel: 'Voir l’approche MIRS',
    featureTitle: 'Une agence se construit comme un système opérationnel.',
    featureText: 'Au-delà d’un nom ou d’une identité, nous mettons en cohérence l’offre, les méthodes et les outils nécessaires au démarrage.',
    capabilities: [
      ['Positionnement', 'Clarifier le rôle, l’offre et les publics prioritaires.'],
      ['Identité', 'Créer un langage visuel cohérent et déployable.'],
      ['Offres', 'Formaliser les services, les parcours et les livrables.'],
      ['Pilotage', 'Installer des méthodes et outils adaptés au quotidien.'],
    ],
    steps: [['Diagnostiquer', 'Lire l’idée, le marché et les usages attendus.'], ['Positionner', 'Définir une promesse claire et des offres lisibles.'], ['Concevoir', 'Déployer identité, supports et outils de travail.'], ['Structurer', 'Mettre en place les priorités de lancement.'], ['Accompagner', 'Ajuster l’agence au contact du terrain.']],
  },
  maintenance: {
    label: '05 / CONTINUITÉ',
    name: 'Maintenance',
    hero: 'editorial/maintenance-pc.jpg',
    accent: 'cyan',
    code: 'CARE / 05',
    initial: 'E',
    intro: 'Nous préservons la disponibilité de vos environnements grâce à une maintenance préventive, réactive et documentée.',
    video: 'technology-flow.mp4',
    videoLabel: 'Voir le dispositif MIRS',
    featureTitle: 'La continuité se prépare avant l’incident.',
    featureText: 'Suivi, prévention, intervention et traçabilité : la maintenance MIRS met en place une réponse claire avant que les usages ne soient interrompus.',
    capabilities: [
      ['Prévention', 'Identifier les risques avant qu’ils n’arrêtent l’activité.'],
      ['Intervention', 'Répondre vite avec une priorité et un historique clairs.'],
      ['Parc', 'Connaître les équipements, leur état et leurs dépendances.'],
      ['Suivi', 'Documenter les actions et ajuster le dispositif dans le temps.'],
    ],
    steps: [['Auditer', 'Cartographier le parc, les usages et les points de vigilance.'], ['Planifier', 'Définir un rythme préventif et des niveaux de priorité.'], ['Surveiller', 'Contrôler les signaux utiles et les échéances techniques.'], ['Intervenir', 'Traiter les demandes avec méthode et traçabilité.'], ['Améliorer', 'Transformer les incidents en décisions durables.']],
  },
};

const branchTranslations = {
  informatique: { label: '01 / INFRASTRUCTURE', name: 'Information<br>technology', intro: 'Reliable technology foundations that secure operational continuity and team performance.', shopLabel: 'View solutions', videoLabel: 'See MIRS in action', featureTitle: 'Clear infrastructure for continuous operations.', featureText: 'From workstations to networks, we organize core elements so they are clear, secure and monitored.', capabilities: [['Architecture', 'Workstations, network and access designed as one system.'], ['Protection', 'Security priorities adapted to what matters most.'], ['Support', 'A clear point of contact when operations need to resume quickly.'], ['Evolution', 'A foundation that can evolve with teams and uses.']], steps: [['Assess', 'Understand uses, friction points and the operational environment.'], ['Map', 'Draw dependencies before changing a component.'], ['Deploy', 'Install with a logic teams can understand afterwards.'], ['Enable', 'Help teams use their new environment with confidence.'], ['Maintain', 'Preserve continuity, intervene and adjust.']] },
  imprimerie: { label: '02 / PRODUCTION', name: 'Print<br>production', intro: 'Communication materials designed to strengthen your brand from the initial idea to the finished medium.', shopLabel: 'View print materials', videoLabel: 'Discover the workshop', featureTitle: 'A coherent identity across every medium.', featureText: 'From the first file to the final item, our workshop combines graphic standards, material selection and production accuracy.', capabilities: [['Identity', 'A visual coherence that carries across every medium.'], ['Large format', 'Signage, wayfinding and presence in physical spaces.'], ['Objects & textile', 'Items that people keep, wear and share.'], ['Production', 'Manufacturing follow-up attentive to concrete details.']], steps: [['Scope', 'Clarify message, uses and expected outcome.'], ['Design', 'Choose formats, materials and details that support the idea.'], ['Prepare', 'Check files and anticipate production constraints.'], ['Produce', 'Manufacture with accuracy that respects the intent.'], ['Deliver', 'Bring materials where they need to perform.']] },
  'creation-agence': { label: '04 / AGENCY CREATION', name: 'Agency<br>creation', intro: 'We build an agency’s foundations: positioning, identity, tools, offers and operating framework.', videoLabel: 'See the MIRS approach', featureTitle: 'An agency is built as an operating system.', featureText: 'Beyond a name or identity, we align services, methods and tools required for a strong start.', capabilities: [['Positioning', 'Clarify role, offer and priority audiences.'], ['Identity', 'Create a coherent, deployable visual language.'], ['Offers', 'Formalize services, pathways and deliverables.'], ['Operations', 'Install methods and tools designed for day-to-day work.']], steps: [['Diagnose', 'Read the idea, the market and intended uses.'], ['Position', 'Define a clear promise and readable offers.'], ['Design', 'Deploy identity, collateral and working tools.'], ['Structure', 'Set up launch priorities.'], ['Support', 'Adjust the agency in contact with the field.']] },
  maintenance: { label: '05 / CONTINUITY', name: 'Maintenance', intro: 'We preserve environment availability through preventive, responsive and documented maintenance.', videoLabel: 'See the MIRS framework', featureTitle: 'Continuity is prepared before an incident.', featureText: 'Monitoring, prevention, intervention and traceability: MIRS maintenance establishes a clear response before operations are interrupted.', capabilities: [['Prevention', 'Identify risks before they stop operations.'], ['Intervention', 'Respond quickly with clear priority and history.'], ['Asset base', 'Know equipment, condition and dependencies.'], ['Follow-up', 'Document actions and adjust the programme over time.']], steps: [['Audit', 'Map assets, uses and points of attention.'], ['Plan', 'Define a preventive rhythm and priority levels.'], ['Monitor', 'Watch useful signals and technical deadlines.'], ['Intervene', 'Handle requests with method and traceability.'], ['Improve', 'Turn incidents into sustainable decisions.']] },
};

function branch(kind) {
  const data = state.locale === 'en' ? { ...branchData[kind], ...branchTranslations[kind] } : branchData[kind];
  const unit = universes.find((item) => item.key === kind);
  const heroImage = unit?.image || data.hero;
  const secondaryAction = data.shop
    ? button(data.shop, data.shopLabel, 'ghost')
    : videoButton(data.video, data.videoLabel);
  return shell(`<main class="nv-branch nv-branch--${data.accent}">
    <section class="nv-unit-hero" data-hero>
      <div class="nv-unit-hero__media"><img src="${AS}${heroImage}" alt="" loading="eager" data-speed="0.12"></div>
      <div class="nv-unit-hero__veil" aria-hidden="true"></div>
      <div class="nv-hero__grid" aria-hidden="true"></div>
      <div class="nv-unit-hero__inner nv-wrap">
        <div class="nv-hero__meta" data-nv="fade"><span>${data.label}</span><span>${data.code}</span><span>CONAKRY · MIRS</span></div>
        <div class="nv-unit-hero__copy">
          ${sectionTitle(`${data.name}<br><em>${tr('en action.', 'in action.')}</em>`, 'nv-unit-hero__title', 'h1')}
          <p data-nv="up" style="--d:220ms">${data.intro}</p>
          <div class="nv-hero__actions" data-nv="up" style="--d:320ms">${button('/contact', tr('Parler à un expert', 'Speak with an expert'), 'primary')}${secondaryAction}</div>
        </div>
        <div class="nv-radar" data-tilt aria-hidden="true"><span class="nv-radar__sweep"></span><i></i><i></i><i></i><b>${data.code}</b><small>${tr('CHAMP ACTIF', 'LIVE FIELD')}</small></div>
      </div>
      <div class="nv-unit-hero__foot nv-wrap"><span>${data.label}</span><span>${tr('CONCEVOIR AVANT D’EXÉCUTER', 'DESIGN BEFORE EXECUTION')}</span><span class="nv-hero__scroll-mini">↓</span></div>
    </section>

    ${marquee(data.capabilities.map((capability) => capability[0].toUpperCase()), 'nv-marquee--solo')}

    <section class="nv-thesis nv-wrap">
      <div class="nv-thesis__initial" aria-hidden="true" data-speed="-0.08">${data.initial}</div>
      <div class="nv-thesis__copy">${eyebrow(tr('LE RÔLE DE MIRS', 'THE MIRS ROLE'), '01')}${sectionTitle(data.featureTitle)}<p class="nv-thesis__text" data-scrub>${data.featureText}</p></div>
    </section>

    <section class="nv-section nv-wrap">
      <div class="nv-capabilities">
        ${data.capabilities.map((capability, index) => `<article class="nv-capability" data-spot data-nv="up" style="--d:${index * 80}ms"><div class="nv-capability__top"><span>0${index + 1}</span><i aria-hidden="true">${ICON_ARROW}</i></div><div class="nv-capability__glyph" aria-hidden="true"><i></i><i></i><i></i></div><h3>${capability[0]}</h3><p>${capability[1]}</p></article>`).join('')}
      </div>
    </section>

    <section class="nv-feature-film nv-wrap" data-progress="enter">
      <button type="button" class="nv-feature-film__frame" data-video="${data.video}" data-video-title="${data.videoLabel}" data-cursor="${tr('Lecture', 'Play')}">
        <img src="${AS}${heroImage}" alt="" loading="lazy" data-speed="-0.05">
        <span class="nv-film__veil" aria-hidden="true"></span>
        <span class="nv-play-orb nv-play-orb--lg">${ICON_PLAY}</span>
        <span class="nv-feature-film__caption"><small>${data.code}</small>${data.videoLabel}</span>
      </button>
    </section>

    ${kind === 'imprimerie' ? printMockups() : ''}

    <section class="nv-section nv-wrap nv-process" data-progress>
      <div class="nv-head"><div>${eyebrow(tr('UNE MÉTHODE STRUCTURÉE', 'A STRUCTURED METHOD'), '02')}${sectionTitle(tr('Un projet avance<br>en cinq <em>temps.</em>', 'A project moves<br>through five <em>stages.</em>'))}</div></div>
      <div class="nv-process__line" aria-hidden="true"><span></span></div>
      <ol class="nv-process__rail">
        ${data.steps.map((step, index) => `<li data-nv="up" style="--d:${index * 90}ms"><span class="nv-process__dot" aria-hidden="true"></span><small>0${index + 1}</small><b>${step[0]}</b><p>${step[1]}</p></li>`).join('')}
      </ol>
    </section>

    <section class="nv-section nv-references">
      <div class="nv-wrap nv-head"><div>${eyebrow(tr('ANCRÉ DANS DES PROJETS RÉELS', 'BUILT ON REAL PROJECTS'), '03')}${sectionTitle(tr('La confiance se construit<br>dans <em>la durée.</em>', 'Trust is built through<br><em>lasting</em> results.'))}</div><p data-nv="up">${tr('Les organisations qui font appel à MIRS recherchent une exécution fiable et un accompagnement durable.', 'Organizations that choose MIRS look for reliable delivery and lasting support.')}</p></div>
      ${logoBands(true)}
    </section>

    ${closingPortal(tr('Parlons de vos priorités <em>opérationnelles.</em>', 'Let’s discuss your <em>operational</em> priorities.'), tr('Partagez votre contexte : nous proposerons une première orientation adaptée.', 'Share your context: we will suggest an initial, relevant direction.'), tr('Échanger avec MIRS', 'Talk to MIRS'))}
  </main>`, `/${kind}`);
}

function printMockups() {
  return `<section class="nv-section nv-wrap nv-mockups" aria-labelledby="nv-mockups-title">
    <div class="nv-head"><div>${eyebrow(tr('PRODUCTION TEXTILE', 'TEXTILE PRODUCTION'))}${sectionTitle(tr('Des supports qui portent<br><em>votre marque.</em>', 'Materials that carry<br><em>your brand.</em>'))}</div><p id="nv-mockups-title" data-nv="up">${tr('Exemples de pièces produites par l’imprimerie MIRS, présentées sans fond dans une rotation 3D douce.', 'Examples of items produced by MIRS Print, shown without background in a subtle 3D rotation.')}</p></div>
    <div class="nv-mockups__grid">
      <figure class="nv-mockup" data-spot data-tilt data-nv="up"><div class="nv-mockup__stage"><span class="nv-mockup__halo" aria-hidden="true"></span><img src="${AS}mirs-media/nimba-polo-transparent.png" alt="${tr('Polos personnalisés Nimba SMS produits par MIRS', 'Custom Nimba SMS polo shirts produced by MIRS')}" loading="lazy"></div><figcaption><span>01 / TEXTILE</span><b>${tr('Polos personnalisés', 'Custom polo shirts')}</b><small>${tr('Front et dos, production atelier.', 'Front and back, workshop production.')}</small></figcaption></figure>
      <figure class="nv-mockup" data-spot data-tilt data-nv="up" style="--d:120ms"><div class="nv-mockup__stage"><span class="nv-mockup__halo" aria-hidden="true"></span><img src="${AS}mirs-media/sonapi-cap-transparent.png" alt="${tr('Casquette SONAPI personnalisée produite par MIRS', 'Custom SONAPI cap produced by MIRS')}" loading="lazy"></div><figcaption><span>02 / TEXTILE</span><b>${tr('Casquette personnalisée', 'Custom cap')}</b><small>${tr('Broderie et finition de marque.', 'Brand embroidery and finishing.')}</small></figcaption></figure>
    </div>
  </section>`;
}

function productCard(item, mode, index = 0) {
  const name = local(item.name);
  return `<article class="nv-product nv-product--${mode}" data-product-card data-category="${item.categoryKey}" data-spot data-tilt data-nv="up" style="--d:${index * 70}ms">
    <div class="nv-product__image"><img src="${AS}${item.image}" alt="${name}" loading="lazy"><span>${mode === 'tech' ? 'MIRS / IT' : 'MIRS / PRINT'}</span></div>
    <div class="nv-product__body"><small>${local(item.category)}</small><h3>${name}</h3><p>${local(item.detail)}</p><button type="button" class="nv-add" data-add="${name}" data-add-kind="print">${tr('Ajouter au panier', 'Add to cart')} <i aria-hidden="true">${ICON_PLUS}</i></button></div>
  </article>`;
}

function shop(kind) {
  const isTech = kind === 'tech';
  const name = isTech ? tr('Solutions informatique', 'IT solutions') : tr('Supports imprimés', 'Print materials');
  const items = products[kind].filter((_, index) => isProductVisible(`print:${index}`));
  const filters = [...new Map(items.map((item) => [item.categoryKey, local(item.category)])).entries()];
  const hero = isTech ? 'editorial/equipement-clavier.jpg' : 'mirs-media/nimba-polo-transparent.png';
  return shell(`<main class="nv-shop nv-shop--${kind}">
    <section class="nv-shop-hero" data-hero>
      <div class="nv-hero__aurora" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="nv-hero__grid" aria-hidden="true"></div>
      <div class="nv-shop-hero__layout nv-wrap">
        <div>
          <div class="nv-hero__meta" data-nv="fade"><span>${isTech ? 'MIRS / INFRASTRUCTURE' : 'MIRS / PRODUCTION'}</span><span>${isTech ? 'FIELD KIT / 01' : 'PRINT KIT / 02'}</span></div>
          ${sectionTitle(isTech ? tr('Des solutions adaptées à vos priorités <em>opérationnelles.</em>', 'Solutions aligned with your <em>operational</em> priorities.') : tr('Des supports conçus pour renforcer votre <em>marque.</em>', 'Materials designed to strengthen your <em>brand.</em>'), 'nv-shop-hero__title', 'h1')}
          <p data-nv="up" style="--d:200ms">${tr('Une sélection de solutions pour cadrer une demande. Chaque élément peut ouvrir un projet plus large.', 'A selection of solutions to scope a request. Each item can open a broader project.')}</p>
          <div class="nv-hero__actions" data-nv="up" style="--d:300ms">${button(isTech ? '/imprimerie/boutique' : '/informatique/boutique', isTech ? tr('Boutique imprimerie', 'Print store') : tr('Boutique informatique', 'IT store'), 'ghost')}</div>
        </div>
        <div class="nv-shop-hero__object ${isTech ? 'is-photo' : 'is-cutout'}" data-tilt aria-hidden="true"><span class="nv-mockup__halo"></span><img src="${AS}${hero}" alt=""><b>${isTech ? 'FIELD KIT' : 'PRINT KIT'}</b><small>${String(items.length).padStart(2, '0')} ${tr('ARTICLES', 'ITEMS')}</small></div>
      </div>
    </section>
    <section class="nv-section nv-wrap">
      <div class="nv-head"><div>${eyebrow(tr('EXPLORER PAR BESOIN', 'EXPLORE BY NEED'))}${sectionTitle(name)}</div><p data-nv="up">${tr('Ajoutez les sujets à discuter ; nous transformerons la liste en décision claire.', 'Add the subjects to discuss; we will turn the list into a clear decision.')}</p></div>
      <div class="nv-filters" role="toolbar" aria-label="${tr('Filtrer le catalogue', 'Filter catalogue')}"><span class="nv-filters__pill" aria-hidden="true" data-filter-pill></span><button type="button" data-filter="all" class="is-active">${tr('Tout', 'All')}</button>${filters.map(([key, label]) => `<button type="button" data-filter="${key}">${label}</button>`).join('')}</div>
      <div class="nv-products nv-products--catalog">${items.map((item, index) => productCard(item, kind, index)).join('')}</div>
    </section>
    ${closingPortal(tr('Transformons votre sélection en <em>projet.</em>', 'Let’s turn your selection into a <em>project.</em>'), tr('Votre liste devient un brief : nous revenons vers vous avec une première lecture.', 'Your list becomes a brief: we come back with an initial reading.'), tr('Préparer le brief', 'Prepare the brief'))}
  </main>`, isTech ? '/informatique/boutique' : '/imprimerie/boutique');
}

/* ==================================================================
   Administration — MIRS Nova control room.
   Reads the same data as the public site: orders, registrations,
   emergencies and requests sent from this browser, the course catalogue
   and its sessions, and the store catalogue with its visibility.
================================================================== */

const REQUEST_TYPES = {
  urgent: { fr: 'Urgence', en: 'Emergency', tone: 'danger' },
  ticket: { fr: 'Intervention', en: 'Service request', tone: 'warn' },
  contract: { fr: 'Contrat maintenance', en: 'Maintenance contract', tone: 'info' },
  order: { fr: 'Commande', en: 'Order', tone: 'accent' },
  enrolment: { fr: 'Inscription', en: 'Registration', tone: 'academy' },
  contact: { fr: 'Contact', en: 'Contact', tone: 'info' },
  request: { fr: 'Demande', en: 'Request', tone: 'info' },
};

const STATUS_LABELS = {
  new: { fr: 'Nouvelle', en: 'New' },
  analysis: { fr: 'En analyse', en: 'In review' },
  quote: { fr: 'Devis envoyé', en: 'Quote sent' },
  confirmed: { fr: 'Confirmée', en: 'Confirmed' },
  progress: { fr: 'En cours', en: 'In progress' },
  done: { fr: 'Terminée', en: 'Completed' },
  cancelled: { fr: 'Annulée', en: 'Cancelled' },
  published: { fr: 'Publié', en: 'Published' },
  draft: { fr: 'Brouillon', en: 'Draft' },
  review: { fr: 'À relire', en: 'Review' },
};

const isOpen = (item) => !['done', 'cancelled'].includes(item.status);
const adminBadge = (status) => `<span class="nva-badge nva-badge--${status}">${local(STATUS_LABELS[status]) || status}</span>`;
const typeBadge = (type) => {
  const meta = REQUEST_TYPES[type] || REQUEST_TYPES.request;
  return `<span class="nva-type nva-type--${meta.tone}">${local(meta)}</span>`;
};

const ADMIN_ICONS = {
  home: '<rect x="3" y="3" width="7" height="8" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="15" width="7" height="6" rx="1.5"/>',
  urgent: '<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4.5M12 17.5h.01"/>',
  orders: '<path d="M3 4h2.5l2.2 10.5a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6.3"/><circle cx="9.5" cy="19.5" r="1.3"/><circle cx="17" cy="19.5" r="1.3"/>',
  enrolments: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5"/>',
  requests: '<path d="M4 5h16v11H8l-4 4z"/><path d="M8 9h8M8 12h5"/>',
  training: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 2.5v3M16 2.5v3"/>',
  stores: '<path d="M4 9h16l-1 11H5z"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/>',
  content: '<path d="M5 3h10l4 4v14H5z"/><path d="M15 3v4h4M8 12h8M8 16h6"/>',
  media: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9.5v5l4.5-2.5z"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
};
const adminIcon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ADMIN_ICONS[name] || ADMIN_ICONS.home}</svg>`;

function adminLogin() {
  return shell(`<main class="nva-auth">
    <canvas class="nv-hero__field" data-field aria-hidden="true"></canvas>
    <div class="nv-hero__aurora" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="nv-hero__grid" aria-hidden="true"></div>
    <section class="nva-auth__card" data-spot>
      <div class="nva-auth__brand">${brandMark()}<span><b>MIRS</b><small>SPATIAL SYSTEMS</small></span></div>
      <p class="nv-eyebrow"><span aria-hidden="true"></span>${tr('MIRS / ADMINISTRATION', 'MIRS / ADMINISTRATION')}</p>
      <h1>${tr('Accéder au <em>poste de pilotage.</em>', 'Access the <em>control room.</em>')}</h1>
      <p>${tr('Commandes, inscriptions, urgences, catalogue et contenus du site MIRS.', 'Orders, registrations, emergencies, catalogue and MIRS site content.')}</p>
      <form class="nva-auth__form" data-admin-login>
        <label class="nv-field"><input name="username" required autocomplete="username" placeholder=" "><span>${tr('Identifiant', 'Username')}</span></label>
        <label class="nv-field"><input name="password" type="password" required autocomplete="current-password" placeholder=" "><span>${tr('Mot de passe', 'Password')}</span></label>
        <button type="submit" class="nv-btn nv-btn--primary nv-btn--lg nv-btn--block">${roll(tr('Ouvrir l’administration', 'Open administration'))}<i aria-hidden="true">${ICON_ARROW}</i></button>
        <p class="nva-auth__status" data-admin-login-status aria-live="polite" role="status"></p>
      </form>
      <div class="nva-auth__foot"><span>${tr('Accès réservé à l’équipe MIRS.', 'Access reserved for the MIRS team.')}</span><a href="${pageHref('/')}" data-link>← ${tr('Retour au site', 'Back to site')}</a></div>
    </section>
  </main>`, '/admin');
}

function requestRow(item) {
  const search = [item.id, item.customer, item.service, item.detail, item.phone, item.courseName, ...(item.lines || []).map((line) => line.name)].filter(Boolean).join(' ').toLowerCase();
  const phone = String(item.phone || '').replace(/[^\d+]/g, '');
  const statuses = item.type === 'enrolment' ? ['new', 'confirmed', 'done', 'cancelled'] : item.type === 'order' ? ['new', 'quote', 'confirmed', 'progress', 'done', 'cancelled'] : ['new', 'analysis', 'quote', 'progress', 'done', 'cancelled'];
  return `<article class="nva-row ${item.type === 'urgent' && isOpen(item) ? 'is-urgent' : ''}" data-admin-row="requests" data-type="${item.type || 'request'}" data-search-text="${escapeHtml(search)}">
    <div class="nva-row__id">${typeBadge(item.type)}<b>${escapeHtml(item.id)}</b><small>${escapeHtml(item.updated || '')}${item.demo ? ` · ${tr('démo', 'demo')}` : ''}</small></div>
    <div class="nva-row__copy">
      <b>${escapeHtml(item.customer || '—')}</b>
      <span>${escapeHtml(item.service || '')}${item.session ? ` · ${formatDate(item.session)}` : ''}</span>
      ${item.detail ? `<p>${escapeHtml(item.detail)}</p>` : ''}
      ${item.lines?.length ? `<ul class="nva-row__lines">${item.lines.map((line) => `<li><b>×${line.qty}</b>${escapeHtml(line.name)}${line.option ? ` <small>${escapeHtml(line.option)}</small>` : ''}</li>`).join('')}</ul>` : ''}
    </div>
    <div class="nva-row__contact">${phone ? `<a href="tel:${phone}">${escapeHtml(item.phone)}</a><a href="https://wa.me/${phone.replace(/^\+/, '')}" target="_blank" rel="noreferrer">WhatsApp ↗</a>` : '<small>—</small>'}${item.email ? `<a href="mailto:${escapeHtml(item.email)}">${escapeHtml(item.email)}</a>` : ''}</div>
    <div class="nva-row__state">${adminBadge(item.status)}${item.priority === 'high' ? `<small class="nva-priority">${tr('Prioritaire', 'High priority')}</small>` : ''}
      <select data-admin-request-status="${escapeHtml(item.id)}" aria-label="${tr('Statut', 'Status')} ${escapeHtml(item.id)}">${statuses.map((status) => `<option value="${status}" ${item.status === status ? 'selected' : ''}>${local(STATUS_LABELS[status])}</option>`).join('')}</select>
    </div>
  </article>`;
}

function requestList(items, emptyText) {
  return items.length ? `<div class="nva-list">${items.map(requestRow).join('')}</div>` : `<div class="nva-empty"><b>${tr('Rien pour l’instant.', 'Nothing yet.')}</b><p>${emptyText}</p></div>`;
}

function adminToolbar(scope, placeholder, extra = '') {
  return `<div class="nva-toolbar"><label class="nv-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg><input type="search" data-admin-search="${scope}" placeholder="${placeholder}"></label>${extra}</div>`;
}

function adminKpi(value, label, detail, view, tone = '') {
  return `<button type="button" class="nva-kpi ${tone}" data-admin-view="${view}" data-spot><span class="nva-kpi__value" data-count="${value}" data-pad="2">${String(value).padStart(2, '0')}</span><b>${label}</b><small>${detail}</small><i aria-hidden="true">${ICON_ARROW}</i></button>`;
}

function adminViewMarkup(view, data) {
  const requests = data.requests;
  const byType = (type) => requests.filter((item) => item.type === type);
  const openOf = (types) => requests.filter((item) => types.includes(item.type) && isOpen(item));
  const urgentOpen = openOf(['urgent']);
  const maintenanceOpen = openOf(['urgent', 'ticket', 'contract']);
  const ordersOpen = openOf(['order']);
  const enrolOpen = openOf(['enrolment']);
  const allOpen = requests.filter(isOpen);
  const publishedCourses = academyCourses.filter((course) => data.courses[course.slug]?.status !== 'draft');
  const upcoming = publishedCourses.flatMap((course) => courseSessions(course, data).map((session) => ({ course, session }))).sort((a, b) => a.session.date.localeCompare(b.session.date));
  const enrolCount = (slug, date) => byType('enrolment').filter((item) => item.course === slug && (!date || item.session === date) && item.status !== 'cancelled').reduce((total, item) => total + (Number(item.seats) || 1), 0);

  if (view === 'urgent') {
    const items = requests.filter((item) => ['urgent', 'ticket', 'contract'].includes(item.type));
    return `<section class="nva-view">
      ${urgentOpen.length ? `<div class="nva-alert"><span class="nva-alert__pulse" aria-hidden="true"></span><div><b>${urgentOpen.length} ${tr('urgence(s) en attente', 'emergency call(s) waiting')}</b><small>${tr('Rappelez le client puis passez le statut à « En cours ».', 'Call the client back, then set the status to “In progress”.')}</small></div></div>` : ''}
      ${adminToolbar('requests', tr('Rechercher un client, une adresse, une panne…', 'Search a client, address, fault…'), `<div class="nva-chips">${['all', 'urgent', 'ticket', 'contract'].map((type, index) => `<button type="button" data-admin-type-filter="${type}" class="${index === 0 ? 'is-active' : ''}">${type === 'all' ? tr('Tout', 'All') : local(REQUEST_TYPES[type])}</button>`).join('')}</div>`)}
      ${requestList(items, tr('Les alertes envoyées depuis la page Maintenance apparaissent ici.', 'Alerts sent from the Maintenance page appear here.'))}
    </section>`;
  }
  if (view === 'orders') {
    const orders = byType('order');
    const units = orders.reduce((total, item) => total + (item.lines || []).reduce((sum, line) => sum + line.qty, 0), 0);
    return `<section class="nva-view">
      <div class="nva-mini-stats"><div><b>${orders.length}</b><span>${tr('commandes', 'orders')}</span></div><div><b>${ordersOpen.length}</b><span>${tr('à chiffrer / suivre', 'to quote / follow')}</span></div><div><b>${units}</b><span>${tr('articles demandés', 'items requested')}</span></div></div>
      ${adminToolbar('requests', tr('Rechercher une référence, un client, un produit…', 'Search a reference, client, product…'), `<button type="button" class="nva-action" data-admin-export="order">${tr('Exporter CSV', 'Export CSV')}</button>`)}
      ${requestList(orders, tr('Les commandes passées depuis la boutique apparaissent ici avec leurs lignes et quantités.', 'Orders placed in the store appear here with their lines and quantities.'))}
    </section>`;
  }
  if (view === 'enrolments') {
    return `<section class="nva-view">
      <div class="nva-sessions-grid">${upcoming.slice(0, 6).map(({ course, session }) => `<article class="nva-session" data-spot><small>${formatDate(session.date, 'short')} · ${session.place || 'Conakry'}</small><b>${local(course.name)}</b><span class="nva-session__seats"><b>${enrolCount(course.slug, session.date)}</b> ${tr('participant(s) inscrit(s)', 'participant(s) registered')}</span></article>`).join('') || `<div class="nva-empty"><p>${tr('Aucune session à venir.', 'No upcoming session.')}</p></div>`}</div>
      ${adminToolbar('requests', tr('Rechercher un participant, un parcours…', 'Search a participant, pathway…'), `<button type="button" class="nva-action" data-admin-export="enrolment">${tr('Exporter CSV', 'Export CSV')}</button>`)}
      ${requestList(byType('enrolment'), tr('Les demandes d’inscription envoyées depuis MIRS Academy apparaissent ici.', 'Registration requests sent from MIRS Academy appear here.'))}
    </section>`;
  }
  if (view === 'requests') {
    const types = [...new Set(requests.map((item) => item.type || 'request'))];
    return `<section class="nva-view">
      ${adminToolbar('requests', tr('Rechercher dans toutes les demandes…', 'Search all requests…'), `<div class="nva-chips"><button type="button" data-admin-type-filter="all" class="is-active">${tr('Tout', 'All')}</button>${types.map((type) => `<button type="button" data-admin-type-filter="${type}">${local(REQUEST_TYPES[type] || REQUEST_TYPES.request)}</button>`).join('')}</div><button type="button" class="nva-action" data-admin-export="all">${tr('Exporter CSV', 'Export CSV')}</button>`)}
      ${requestList(requests, tr('Toutes les demandes du site apparaissent ici.', 'All site requests appear here.'))}
    </section>`;
  }
  if (view === 'training') {
    return `<section class="nva-view">
      <form class="nva-card nva-session-form" data-admin-session-form>
        <div><span class="nva-card__label">${tr('PLANIFIER', 'SCHEDULE')}</span><h2>${tr('Ajouter une session', 'Add a session')}</h2></div>
        <label class="nv-field nv-field--select"><select name="slug">${academyCourses.map((course) => `<option value="${course.slug}">${local(course.name)}</option>`).join('')}</select><span>${tr('Parcours', 'Pathway')}</span></label>
        <label class="nv-field"><input type="date" name="date" required min="${isoToday()}" placeholder=" "><span>Date</span></label>
        <label class="nv-field"><input name="place" value="Conakry" placeholder=" "><span>${tr('Lieu', 'Venue')}</span></label>
        <button type="submit" class="nv-btn nv-btn--primary">${roll(tr('Ajouter', 'Add'))}<i aria-hidden="true">${ICON_PLUS}</i></button>
      </form>
      <div class="nva-courses">${academyCourses.map((course) => {
        const published = data.courses[course.slug]?.status !== 'draft';
        const sessions = courseSessions(course, data);
        return `<article class="nva-course" data-spot>
          <div class="nva-course__head"><div><small>${local(course.category)}${course.amadeus ? ' · AMADEUS' : ''}</small><b>${local(course.name)}</b><span>${local(course.duration)} · ${course.modules.length} modules</span></div>${adminBadge(published ? 'published' : 'draft')}</div>
          <ul class="nva-course__sessions">${sessions.map((session) => {
            const extra = data.extraSessions.find((item) => item.slug === course.slug && item.date === session.date && item.id);
            return `<li><span>${formatDate(session.date)}</span><b>${enrolCount(course.slug, session.date)} ${tr('inscrit(s)', 'registered')}</b>${extra ? `<button type="button" data-admin-remove-session="${extra.id}" aria-label="${tr('Retirer la session', 'Remove session')}">×</button>` : `<small>${tr('catalogue', 'catalogue')}</small>`}</li>`;
          }).join('') || `<li><span>${tr('Aucune session à venir', 'No upcoming session')}</span></li>`}</ul>
          <div class="nva-course__foot"><a href="${pageHref(`/formation/${course.slug}`)}" data-link class="nva-link">${tr('Voir la page', 'View page')} ↗</a><button type="button" class="nva-action" data-admin-toggle-course="${course.slug}">${published ? tr('Dépublier', 'Unpublish') : tr('Publier', 'Publish')}</button></div>
        </article>`;
      }).join('')}</div>
    </section>`;
  }
  if (view === 'stores') {
    const liveTech = storeProducts.filter((product) => data.inventory[product.id] !== false).length;
    return `<section class="nva-view">
      ${adminToolbar('stores', tr('Rechercher un produit…', 'Search a product…'), `<span class="nva-toolbar__stat">${liveTech} / ${storeProducts.length} ${tr('produits en ligne', 'products live')}</span>`)}
      <div class="nva-card"><div class="nva-card__head"><div><span class="nva-card__label">01 / IT STORE</span><h2>${tr('Boutique informatique', 'IT store')}</h2></div><a href="${pageHref('/informatique/boutique')}" data-link class="nva-link">${tr('Voir la boutique', 'View store')} ↗</a></div>
        <div class="nva-products">${storeProducts.map((product) => {
          const live = data.inventory[product.id] !== false;
          return `<article class="nva-product" data-admin-row="stores" data-search-text="${escapeHtml(`${local(product.name)} ${product.category}`.toLowerCase())}">${deviceArt(product.icon, 'nv-device--xs')}<div><b>${local(product.name)}</b><small>${local(storeCategories.find((category) => category.key === product.category)?.label)} · ${tr('sur devis', 'on quotation')}</small></div><button type="button" class="nva-switch ${live ? 'is-on' : ''}" data-admin-toggle-product="${product.id}" role="switch" aria-checked="${live}" aria-label="${tr('Visibilité', 'Visibility')} ${local(product.name)}"><i></i></button></article>`;
        }).join('')}</div></div>
      <div class="nva-card"><div class="nva-card__head"><div><span class="nva-card__label">02 / PRINT</span><h2>${tr('Boutique imprimerie', 'Print store')}</h2></div><a href="${pageHref('/imprimerie/boutique')}" data-link class="nva-link">${tr('Voir la boutique', 'View store')} ↗</a></div>
        <div class="nva-products">${products.print.map((product, index) => {
          const key = `print:${index}`;
          const live = data.inventory[key] !== false;
          return `<article class="nva-product" data-admin-row="stores" data-search-text="${escapeHtml(local(product.name).toLowerCase())}"><img src="${AS}${product.image}" alt="" loading="lazy"><div><b>${local(product.name)}</b><small>${local(product.category)}</small></div><button type="button" class="nva-switch ${live ? 'is-on' : ''}" data-admin-toggle-product="${key}" role="switch" aria-checked="${live}" aria-label="${tr('Visibilité', 'Visibility')} ${local(product.name)}"><i></i></button></article>`;
        }).join('')}</div></div>
    </section>`;
  }
  if (view === 'content') {
    return `<section class="nva-view">
      ${adminToolbar('content', tr('Rechercher une page…', 'Search a page…'), `<button type="button" class="nva-action nva-action--accent" data-admin-action="new-content">${tr('Nouveau contenu', 'New content')}</button>`)}
      <div class="nva-list">${data.content.map((item) => `<article class="nva-row nva-row--content" data-admin-row="content" data-search-text="${escapeHtml([item.area.fr, item.area.en, item.title.fr, item.title.en].join(' ').toLowerCase())}">
        <div class="nva-row__id"><span class="nva-type nva-type--info">${local(item.type)}</span><b>${escapeHtml(item.id.toUpperCase())}</b><small>${item.updated}</small></div>
        <div class="nva-row__copy"><b>${escapeHtml(local(item.title))}</b><span>${escapeHtml(local(item.area))}</span></div>
        <div class="nva-row__state">${adminBadge(item.status)}<button type="button" class="nva-action" data-admin-edit="content" data-admin-id="${escapeHtml(item.id)}">${tr('Modifier', 'Edit')}</button></div>
      </article>`).join('')}</div>
    </section>`;
  }
  if (view === 'media') {
    return `<section class="nva-view"><div class="nva-media">${data.media.map((item) => `<article class="nva-media__item" data-spot>
      <button type="button" class="nva-media__preview" data-video="${item.file}" data-video-title="${escapeHtml(local(item.name))}"><img src="${AS}${item.poster || 'mirs-media/posters/company.jpg'}" alt="" loading="lazy"><span class="nv-play-orb nv-play-orb--sm">${ICON_PLAY}</span></button>
      <div><small>${local(item.type)}</small><b>${local(item.name)}</b><span>${item.file}</span></div>
      <div class="nva-row__state">${adminBadge(item.status)}<button type="button" class="nva-action" data-admin-toggle-media="${item.id}">${item.status === 'published' ? tr('Archiver', 'Archive') : tr('Publier', 'Publish')}</button></div>
    </article>`).join('')}</div></section>`;
  }
  if (view === 'settings') {
    return `<section class="nva-view">
      <div class="nva-card"><div class="nva-card__head"><div><span class="nva-card__label">${tr('PRÉFÉRENCES', 'PREFERENCES')}</span><h2>${tr('Fonctionnement du site', 'Site operations')}</h2></div></div>
        <div class="nva-settings">${[
          ['publicRequests', tr('Recevoir les demandes publiques', 'Accept public requests'), tr('Formulaires, commandes et inscriptions actifs.', 'Forms, orders and registrations active.')],
          ['bilingual', tr('Publier les deux langues', 'Publish both languages'), tr('Maintenir un contenu FR / EN cohérent.', 'Keep FR / EN content aligned.')],
          ['maintenance', tr('Mode maintenance', 'Maintenance mode'), tr('Préparer une interruption visible du site.', 'Prepare a visible site interruption.')],
        ].map(([key, label, detail]) => `<label class="nva-setting"><span><b>${label}</b><small>${detail}</small></span><input type="checkbox" data-admin-setting="${key}" ${data.settings[key] ? 'checked' : ''}><i class="nva-switch ${data.settings[key] ? 'is-on' : ''}" aria-hidden="true"><i></i></i></label>`).join('')}</div></div>
      <div class="nva-card nva-card--danger"><div><b>${tr('Données locales', 'Local data')}</b><p>${tr('Les demandes sont enregistrées dans ce navigateur et transmises à MIRS sur WhatsApp. Exportez-les régulièrement en CSV.', 'Requests are stored in this browser and sent to MIRS on WhatsApp. Export them regularly as CSV.')}</p></div><div class="nva-card__actions"><button type="button" class="nva-action" data-admin-export="all">${tr('Exporter tout', 'Export all')}</button><button type="button" class="nva-action" data-admin-action="reset">${tr('Réinitialiser', 'Reset')}</button></div></div>
    </section>`;
  }

  // Overview
  const latestOrders = byType('order').slice(0, 4);
  return `<section class="nva-view">
    <div class="nva-kpis">
      ${adminKpi(urgentOpen.length, tr('Urgences ouvertes', 'Open emergencies'), tr('Maintenance prioritaire', 'Priority maintenance'), 'urgent', urgentOpen.length ? 'is-danger' : '')}
      ${adminKpi(ordersOpen.length, tr('Commandes à chiffrer', 'Orders to quote'), tr('Boutique informatique', 'IT store'), 'orders')}
      ${adminKpi(enrolOpen.length, tr('Inscriptions à confirmer', 'Registrations to confirm'), 'MIRS Academy', 'enrolments')}
      ${adminKpi(allOpen.length, tr('Demandes ouvertes', 'Open requests'), tr('Tous canaux confondus', 'All channels'), 'requests')}
    </div>
    <div class="nva-grid">
      <section class="nva-card nva-card--wide"><div class="nva-card__head"><div><span class="nva-card__label">${tr('MAINTENANCE', 'MAINTENANCE')}</span><h2>${tr('Alertes & interventions', 'Alerts & call-outs')}</h2></div><button type="button" class="nva-link" data-admin-view="urgent">${tr('Tout voir', 'View all')} ↗</button></div>${requestList(maintenanceOpen.slice(0, 3), tr('Aucune intervention en attente.', 'No call-out waiting.'))}</section>
      <section class="nva-card"><div class="nva-card__head"><div><span class="nva-card__label">ACADEMY</span><h2>${tr('Prochaines sessions', 'Upcoming sessions')}</h2></div><button type="button" class="nva-link" data-admin-view="training">${tr('Planifier', 'Schedule')} ↗</button></div>
        <ul class="nva-agenda">${upcoming.slice(0, 5).map(({ course, session }) => `<li><span class="nva-agenda__date"><b>${new Date(`${session.date}T12:00:00`).getDate()}</b><small>${formatDate(session.date, 'short').replace(/^\d+\s*/, '')}</small></span><span><b>${local(course.name)}</b><small>${enrolCount(course.slug, session.date)} ${tr('inscrit(s)', 'registered')}</small></span></li>`).join('') || `<li>${tr('Aucune session à venir.', 'No upcoming session.')}</li>`}</ul></section>
      <section class="nva-card"><div class="nva-card__head"><div><span class="nva-card__label">STORE</span><h2>${tr('Dernières commandes', 'Latest orders')}</h2></div><button type="button" class="nva-link" data-admin-view="orders">${tr('Tout voir', 'View all')} ↗</button></div>
        <ul class="nva-feed">${latestOrders.map((item) => `<li><b>${escapeHtml(item.id)}</b><span>${escapeHtml(item.customer)}</span><small>${(item.lines || []).reduce((total, line) => total + line.qty, 0)} ${tr('article(s)', 'item(s)')} · ${local(STATUS_LABELS[item.status])}</small></li>`).join('') || `<li class="nva-feed__empty">${tr('Aucune commande pour l’instant.', 'No orders yet.')}</li>`}</ul></section>
      <section class="nva-card"><div class="nva-card__head"><div><span class="nva-card__label">${tr('RACCOURCIS', 'SHORTCUTS')}</span><h2>${tr('Le site en un clic', 'The site in one click')}</h2></div></div>
        <div class="nva-shortcuts">${[['/amadeus', 'AMADEUS'], ['/formation', 'Academy'], ['/informatique/boutique', tr('Boutique', 'Store')], ['/maintenance', 'Maintenance']].map(([path, label]) => `<a href="${pageHref(path)}" data-link>${label}<i aria-hidden="true">${ICON_ARROW}</i></a>`).join('')}</div></section>
    </div>
  </section>`;
}

function dashboard() {
  if (!adminAuthenticated()) return adminLogin();
  const data = adminData();
  const open = (types) => data.requests.filter((item) => types.includes(item.type) && isOpen(item)).length;
  const nav = [
    ['home', tr('Vue d’ensemble', 'Overview'), 0],
    ['urgent', tr('Maintenance & urgences', 'Maintenance & emergencies'), open(['urgent', 'ticket', 'contract'])],
    ['orders', tr('Commandes', 'Orders'), open(['order'])],
    ['enrolments', tr('Inscriptions', 'Registrations'), open(['enrolment'])],
    ['requests', tr('Toutes les demandes', 'All requests'), data.requests.filter(isOpen).length],
    ['training', tr('Formations & sessions', 'Courses & sessions'), 0],
    ['stores', tr('Catalogue boutiques', 'Store catalogue'), 0],
    ['content', tr('Contenus du site', 'Site content'), 0],
    ['media', tr('Médias', 'Media'), 0],
    ['settings', tr('Paramètres', 'Settings'), 0],
  ];
  const view = nav.some(([key]) => key === state.adminView) ? state.adminView : 'home';
  const headings = {
    home: [tr('VUE D’ENSEMBLE', 'OVERVIEW'), tr('Bonjour, voici <em>MIRS aujourd’hui.</em>', 'Hello, here is <em>MIRS today.</em>')],
    urgent: [tr('MAINTENANCE', 'MAINTENANCE'), tr('Urgences & <em>interventions.</em>', 'Emergencies & <em>call-outs.</em>')],
    orders: ['STORE', tr('Commandes <em>boutique.</em>', 'Store <em>orders.</em>')],
    enrolments: ['ACADEMY', tr('Inscriptions aux <em>sessions.</em>', 'Session <em>registrations.</em>')],
    requests: [tr('FILE DE SUIVI', 'TRACKING QUEUE'), tr('Toutes les <em>demandes.</em>', 'All <em>requests.</em>')],
    training: ['ACADEMY', tr('Parcours & <em>calendrier.</em>', 'Pathways & <em>calendar.</em>')],
    stores: ['STORE', tr('Catalogue & <em>visibilité.</em>', 'Catalogue & <em>visibility.</em>')],
    content: [tr('SITE', 'SITE'), tr('Contenus du <em>site.</em>', 'Site <em>content.</em>')],
    media: [tr('SITE', 'SITE'), tr('Films & <em>médias.</em>', 'Films & <em>media.</em>')],
    settings: [tr('CONFIGURATION', 'SETTINGS'), tr('Paramètres & <em>données.</em>', 'Settings & <em>data.</em>')],
  };
  const [label, title] = headings[view];
  return shell(`<main class="nva-app">
    <aside class="nva-side" data-admin-side>
      <a href="${pageHref('/admin')}" data-link class="nva-side__brand">${brandMark()}<span><b>MIRS</b><small>CONTROL ROOM</small></span></a>
      <nav class="nva-nav" aria-label="${tr('Navigation administration', 'Administration navigation')}">${nav.map(([key, text, count]) => `<button type="button" data-admin-view="${key}" aria-current="${view === key ? 'page' : 'false'}" class="${key === 'urgent' && count ? 'has-alert' : ''}">${adminIcon(key === 'urgent' ? 'urgent' : key)}<b>${text}</b>${count ? `<small>${count}</small>` : ''}</button>`).join('')}</nav>
      <div class="nva-side__foot"><span class="nv-amadeus-pill"><i aria-hidden="true"></i>${tr('Représentant exclusif AMADEUS', 'Exclusive AMADEUS representative')}</span><p class="nv-clock"><i></i>Conakry <b data-clock>--:--</b> GMT</p></div>
    </aside>
    <div class="nva-main">
      <header class="nva-top">
        <button type="button" class="nva-top__menu" data-admin-menu aria-label="Menu">${adminIcon('home')}</button>
        <div class="nva-top__title"><span>${label}</span><h1>${title}</h1></div>
        <div class="nva-top__actions"><a href="${pageHref('/')}" data-link class="nva-action">${tr('Voir le site', 'View site')} ↗</a><a href="${alternateLanguageHref()}" data-link class="nv-chip">${state.locale === 'fr' ? 'EN' : 'FR'}</a><button type="button" class="nv-chip nv-chip--icon" data-theme aria-label="${tr('Changer de thème', 'Change theme')}"><span class="nv-theme-icon" aria-hidden="true"></span></button><button type="button" class="nva-action" data-admin-logout>${tr('Déconnexion', 'Sign out')}</button></div>
      </header>
      ${adminViewMarkup(view, data)}
    </div>
    <dialog class="nv-dialog" data-admin-dialog><form class="nv-dialog__form" data-admin-content-form><div class="nv-dialog__head"><div><span>${tr('ÉDITION DE CONTENU', 'CONTENT EDITOR')}</span><h2>${tr('Mettre à jour une <em>page.</em>', 'Update a <em>page.</em>')}</h2></div><button type="button" class="nv-dialog__close" data-dialog-close aria-label="${tr('Fermer', 'Close')}">×</button></div><input type="hidden" name="id"><div class="nv-dialog__grid"><label class="nv-field"><input name="areaFr" required placeholder=" "><span>${tr('Zone (FR)', 'Area (FR)')}</span></label><label class="nv-field"><input name="areaEn" required placeholder=" "><span>${tr('Zone (EN)', 'Area (EN)')}</span></label><label class="nv-field"><input name="titleFr" required placeholder=" "><span>${tr('Titre FR', 'FR title')}</span></label><label class="nv-field"><input name="titleEn" required placeholder=" "><span>${tr('Titre EN', 'EN title')}</span></label><label class="nv-field nv-field--select nv-field--wide"><select name="status"><option value="published">${tr('Publié', 'Published')}</option><option value="review">${tr('À relire', 'Review')}</option><option value="draft">${tr('Brouillon', 'Draft')}</option></select><span>${tr('Statut', 'Status')}</span></label></div><div class="nv-dialog__foot"><button type="button" class="nva-action" data-dialog-close>${tr('Annuler', 'Cancel')}</button><button type="submit" class="nv-btn nv-btn--primary">${roll(tr('Enregistrer', 'Save'))}<i aria-hidden="true">${ICON_CHECK}</i></button></div></form></dialog>
    <dialog class="nv-video" data-video-modal><button type="button" class="nv-video__close" data-close-video aria-label="${tr('Fermer la vidéo', 'Close video')}">×</button><div class="nv-video__body" data-video-body></div></dialog>
    <div class="nv-toast" data-toast role="status" aria-live="polite"></div>
  </main>`, '/admin');
}

function exportRequests(type) {
  const rows = adminData().requests.filter((item) => type === 'all' || item.type === type);
  const header = ['id', 'type', 'status', 'priority', 'updated', 'customer', 'phone', 'email', 'service', 'session', 'detail', 'lines'];
  const escapeCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
  const csv = [header.join(';'), ...rows.map((item) => header.map((key) => escapeCell(key === 'lines' ? (item.lines || []).map((line) => `${line.qty}x ${line.name}${line.option ? ` (${line.option})` : ''}`).join(' | ') : item[key])).join(';'))].join('\n');
  const url = URL.createObjectURL(new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8' }));
  const anchorNode = document.createElement('a');
  anchorNode.href = url;
  anchorNode.download = `mirs-${type}-${isoToday()}.csv`;
  document.body.append(anchorNode);
  anchorNode.click();
  anchorNode.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}


/* ---------------- AMADEUS ---------------- */

function amadeusPage() {
  const course = academyCourses.find((item) => item.amadeus);
  const sessions = course ? courseSessions(course) : [];
  const pillars = [
    ['01', tr('Représentation exclusive', 'Exclusive representation'), tr('MIRS est l’interlocuteur exclusif d’AMADEUS : un point d’entrée unique pour les agences et les entreprises qui veulent accéder à la solution.', 'MIRS is the exclusive AMADEUS partner: a single entry point for agencies and companies who want to access the solution.')],
    ['02', tr('Déploiement en agence', 'Agency deployment'), tr('Installation des postes, paramétrage, accès des agents et mise en route des premiers dossiers.', 'Workstation installation, set-up, agent access and first live bookings.')],
    ['03', tr('Formation des équipes', 'Team training'), tr('Le parcours AMADEUS Selling Platform de MIRS Academy rend les agents opérationnels sur le système.', 'The MIRS Academy AMADEUS Selling Platform pathway makes agents operational on the system.')],
    ['04', tr('Assistance & suivi', 'Support & follow-up'), tr('Un interlocuteur local pour les questions du quotidien, les évolutions et les nouveaux collaborateurs.', 'A local contact for daily questions, changes and new team members.')],
  ];
  const steps = [
    [tr('Échange', 'Discovery'), tr('Comprendre votre activité, votre équipe et vos besoins de réservation.', 'Understand your business, team and booking needs.')],
    [tr('Proposition', 'Proposal'), tr('Définir l’accès AMADEUS adapté et le plan de mise en place.', 'Define the right AMADEUS access and roll-out plan.')],
    [tr('Mise en place', 'Set-up'), tr('Installer, paramétrer et connecter vos postes.', 'Install, configure and connect your workstations.')],
    [tr('Formation', 'Training'), tr('Former les agents sur des cas réels.', 'Train agents on real cases.')],
    [tr('Suivi', 'Follow-up'), tr('Rester présent quand l’activité démarre.', 'Stay close as activity takes off.')],
  ];
  return shell(`<main class="nv-amadeus">
    <section class="nv-amadeus-hero" data-hero>
      <canvas class="nv-hero__field" data-field aria-hidden="true"></canvas>
      <div class="nv-hero__aurora" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="nv-hero__grid" aria-hidden="true"></div>
      <div class="nv-amadeus-hero__word" aria-hidden="true" data-speed="0.1">AMADEUS</div>
      <div class="nv-wrap nv-amadeus-hero__layout">
        <div>
          <div class="nv-hero__meta" data-nv="fade"><span>MIRS × AMADEUS</span><span>${tr('REPRÉSENTATION EXCLUSIVE', 'EXCLUSIVE REPRESENTATION')}</span><span>CONAKRY</span></div>
          <p class="nv-amadeus-pill nv-amadeus-pill--lg" data-nv="up"><i aria-hidden="true"></i>${tr('Représentant exclusif d’AMADEUS', 'Exclusive AMADEUS representative')}</p>
          ${sectionTitle(tr('Le système de réservation mondial, <em>avec MIRS.</em>', 'The global booking system, <em>with MIRS.</em>'), 'nv-page-hero__title', 'h1')}
          <p data-nv="up" style="--d:200ms">${tr('Agences de voyage et entreprises : MIRS vous ouvre l’accès à AMADEUS, déploie la solution et forme vos équipes, avec un accompagnement local à Conakry.', 'Travel agencies and companies: MIRS opens access to AMADEUS, deploys the solution and trains your teams, with local support in Conakry.')}</p>
          <div class="nv-hero__actions" data-nv="up" style="--d:300ms">${button('/contact', tr('Devenir partenaire AMADEUS', 'Become an AMADEUS partner'), 'primary')}${course ? `<button type="button" class="nv-btn nv-btn--ghost" data-enroll="${course.slug}" data-magnetic>${roll(tr('S’inscrire à la formation', 'Enrol in the training'))}<i aria-hidden="true">${ICON_ARROW}</i></button>` : ''}</div>
        </div>
        <div class="nv-globe" aria-hidden="true">
          <div class="nv-globe__sphere"><i></i><i></i><i></i><i></i></div>
          <div class="nv-globe__orbit"><span>GDS</span></div>
          <div class="nv-globe__orbit nv-globe__orbit--b"><span>PNR</span></div>
          <div class="nv-globe__orbit nv-globe__orbit--c"><span>e-TKT</span></div>
          <b>AMADEUS</b>
        </div>
      </div>
    </section>

    ${marquee(['AMADEUS', tr('REPRÉSENTANT EXCLUSIF', 'EXCLUSIVE REPRESENTATIVE'), tr('RÉSERVATION', 'BOOKING'), tr('BILLETTERIE', 'TICKETING'), tr('FORMATION', 'TRAINING')], 'nv-marquee--alt')}

    <section class="nv-section nv-wrap">
      <div class="nv-head"><div>${eyebrow(tr('CE QUE L’EXCLUSIVITÉ CHANGE POUR VOUS', 'WHAT EXCLUSIVITY MEANS FOR YOU'), '01')}${sectionTitle(tr('Un seul interlocuteur,<br>de l’accès à <em>l’usage.</em>', 'One single partner,<br>from access to <em>daily use.</em>'))}</div><p data-nv="up">${tr('MIRS réunit la représentation, la mise en place technique et la formation : vos équipes avancent sans multiplier les intermédiaires.', 'MIRS brings together representation, technical set-up and training: your teams move forward without multiple intermediaries.')}</p></div>
      <div class="nv-capabilities">${pillars.map(([index, title, text], position) => `<article class="nv-capability" data-spot data-nv="up" style="--d:${position * 80}ms"><div class="nv-capability__top"><span>${index}</span><i aria-hidden="true">${ICON_ARROW}</i></div><div class="nv-capability__glyph" aria-hidden="true"><i></i><i></i><i></i></div><h3>${title}</h3><p>${text}</p></article>`).join('')}</div>
    </section>

    <section class="nv-section nv-wrap nv-process" data-progress>
      <div class="nv-head"><div>${eyebrow(tr('DEVENIR UTILISATEUR', 'GETTING STARTED'), '02')}${sectionTitle(tr('De l’échange au premier<br><em>billet émis.</em>', 'From first call to first<br><em>ticket issued.</em>'))}</div></div>
      <div class="nv-process__line" aria-hidden="true"><span></span></div>
      <ol class="nv-process__rail">${steps.map((step, index) => `<li data-nv="up" style="--d:${index * 90}ms"><span class="nv-process__dot" aria-hidden="true"></span><small>0${index + 1}</small><b>${step[0]}</b><p>${step[1]}</p></li>`).join('')}</ol>
    </section>

    ${course ? `<section class="nv-section nv-wrap nv-amadeus-training">
      <div class="nv-amadeus-training__card" data-spot>
        <div>${eyebrow(tr('MIRS ACADEMY × AMADEUS', 'MIRS ACADEMY × AMADEUS'), '03')}${sectionTitle(local(course.name))}<p data-nv="up">${local(course.summary)}</p>
          <ul class="nv-meta-list" data-nv="up"><li><small>${tr('Durée', 'Duration')}</small><b>${local(course.duration)}</b></li><li><small>${tr('Niveau', 'Level')}</small><b>${local(course.level)}</b></li><li><small>Format</small><b>${local(course.format)}</b></li><li><small>Modules</small><b>${course.modules.length}</b></li></ul>
          <div class="nv-hero__actions" data-nv="up">${button(`/formation/${course.slug}`, tr('Voir le programme', 'View the programme'), 'ghost')}</div>
        </div>
        <div class="nv-sessions">${sessionList(course, sessions)}</div>
      </div>
    </section>` : ''}

    <section class="nv-feature-film nv-wrap" data-progress="enter">
      <button type="button" class="nv-feature-film__frame" data-video="mirs-media/mirs-company-presentation.mp4" data-video-title="MIRS × AMADEUS" data-cursor="${tr('Lecture', 'Play')}">
        <img src="${AS}mirs-media/posters/company.jpg" alt="" loading="lazy" data-speed="-0.05">
        <span class="nv-film__veil" aria-hidden="true"></span>
        <span class="nv-play-orb nv-play-orb--lg">${ICON_PLAY}</span>
        <span class="nv-feature-film__caption"><small>MIRS × AMADEUS</small>${tr('Découvrir MIRS en vidéo', 'Discover MIRS on film')}</span>
      </button>
    </section>

    ${closingPortal(tr('Travaillons ensemble sur <em>AMADEUS.</em>', 'Let’s work together on <em>AMADEUS.</em>'), tr('Création d’agence, accès à la solution ou formation de vos agents : parlons de votre projet.', 'Agency creation, access to the solution or agent training: let’s talk about your project.'), tr('Contacter le représentant', 'Contact the representative'))}
  </main>`, '/amadeus');
}

/* ---------------- Academy (e-learning catalogue) ---------------- */

function sessionList(course, sessions = courseSessions(course)) {
  if (!sessions.length) {
    return `<div class="nv-session nv-session--empty"><b>${tr('Prochaine session en préparation', 'Next session being scheduled')}</b><small>${tr('Inscrivez-vous : MIRS vous contacte dès que la date est fixée.', 'Register: MIRS will contact you as soon as the date is set.')}</small><button type="button" class="nv-btn nv-btn--primary nv-btn--sm" data-enroll="${course.slug}" data-magnetic>${roll(tr('Être prévenu', 'Get notified'))}<i aria-hidden="true">${ICON_ARROW}</i></button></div>`;
  }
  return `${sessions.map((session, index) => `<div class="nv-session ${index === 0 ? 'is-next' : ''}">
      <div class="nv-session__date"><b>${formatDate(session.date, 'short')}</b><small>${new Date(`${session.date}T12:00:00`).getFullYear()}</small></div>
      <div class="nv-session__copy">${index === 0 ? `<span class="nv-session__badge">${tr('Prochaine session', 'Next session')}</span>` : ''}<b>${formatDate(session.date)}</b><small>${session.place || 'Conakry'} · ${local(course.duration)}</small></div>
      <button type="button" class="nv-btn nv-btn--${index === 0 ? 'primary' : 'ghost'} nv-btn--sm" data-enroll="${course.slug}" data-session="${session.date}" data-magnetic>${roll(tr('S’inscrire', 'Enrol'))}<i aria-hidden="true">${ICON_ARROW}</i></button>
    </div>`).join('')}<p class="nv-sessions__note">${local(SESSIONS_NOTE)}</p>`;
}

function courseCard(course, index = 0) {
  const next = courseSessions(course)[0];
  const lessons = course.modules.reduce((total, module) => total + module.lessons.length, 0);
  return `<article class="nv-ecourse ${course.amadeus ? 'is-amadeus' : ''}" data-course-card data-category="${course.categoryKey}" data-spot data-nv="up" style="--d:${(index % 3) * 80}ms">
    <a href="${pageHref(`/formation/${course.slug}`)}" data-link class="nv-ecourse__cover" data-cursor="${tr('Programme', 'Syllabus')}">
      <span class="nv-ecourse__code">${course.short}</span>
      ${course.amadeus ? `<span class="nv-amadeus-pill"><i aria-hidden="true"></i>${tr('Représentant exclusif', 'Exclusive representative')}</span>` : `<span class="nv-ecourse__cat">${local(course.category)}</span>`}
      <span class="nv-ecourse__lines" aria-hidden="true"><i></i><i></i><i></i></span>
    </a>
    <div class="nv-ecourse__body">
      <small>${local(course.category)} · ${local(course.level)}</small>
      <h3><a href="${pageHref(`/formation/${course.slug}`)}" data-link>${local(course.name)}</a></h3>
      <p>${local(course.summary)}</p>
      <ul class="nv-ecourse__facts"><li>${local(course.duration)}</li><li>${course.modules.length} modules · ${lessons} ${tr('leçons', 'lessons')}</li></ul>
      <div class="nv-ecourse__next">${next ? `<span><i aria-hidden="true"></i>${tr('Prochaine session', 'Next session')}</span><b>${formatDate(next.date)}</b>` : `<span><i aria-hidden="true"></i>${tr('Session en préparation', 'Session being scheduled')}</span>`}</div>
      <div class="nv-ecourse__actions"><button type="button" class="nv-btn nv-btn--primary nv-btn--sm" data-enroll="${course.slug}" ${next ? `data-session="${next.date}"` : ''} data-magnetic>${roll(tr('S’inscrire', 'Enrol'))}<i aria-hidden="true">${ICON_ARROW}</i></button>${link(`/formation/${course.slug}`, tr('Programme', 'Syllabus'))}</div>
    </div>
  </article>`;
}

function training() {
  const data = adminData();
  const visible = academyCourses.filter((course) => isCoursePublished(course.slug));
  const featured = visible.find((course) => course.amadeus);
  const upcoming = visible.flatMap((course) => courseSessions(course, data).map((session) => ({ course, session }))).sort((a, b) => a.session.date.localeCompare(b.session.date)).slice(0, 6);
  const categories = [...new Map(visible.map((course) => [course.categoryKey, local(course.category)])).entries()];
  const totalModules = visible.reduce((total, course) => total + course.modules.length, 0);
  const totalLessons = visible.reduce((total, course) => total + course.modules.reduce((sum, module) => sum + module.lessons.length, 0), 0);
  const myEnrolments = data.requests.filter((item) => item.type === 'enrolment').slice(0, 3);
  return shell(`<main class="nv-academy">
    <section class="nv-academy-hero" data-hero>
      <canvas class="nv-hero__field" data-field aria-hidden="true"></canvas>
      <div class="nv-hero__aurora" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="nv-hero__grid" aria-hidden="true"></div>
      <div class="nv-academy-hero__layout nv-wrap">
        <div class="nv-academy-hero__copy">
          <div class="nv-hero__meta" data-nv="fade"><span>MIRS ACADEMY</span><span>${tr('E-LEARNING & PRÉSENTIEL', 'E-LEARNING & IN PERSON')}</span></div>
          ${sectionTitle(tr('Apprendre,<br>puis savoir<br><em>faire.</em>', 'Learn.<br>Apply.<br><em>Perform.</em>'), 'nv-academy-hero__title', 'h1')}
          <p data-nv="up" style="--d:220ms">${tr('Des parcours structurés en modules, des sessions planifiées et un suivi après la formation. Choisissez votre parcours et réservez votre place.', 'Pathways structured into modules, scheduled sessions and follow-up after training. Choose your pathway and book your seat.')}</p>
          <div class="nv-hero__actions" data-nv="up" style="--d:320ms"><a href="#catalogue" class="nv-btn nv-btn--primary" data-magnetic>${roll(tr('Voir les parcours', 'Browse pathways'))}<i aria-hidden="true">${ICON_DOWN}</i></a><a href="#calendrier" class="nv-btn nv-btn--ghost" data-magnetic>${roll(tr('Prochaines sessions', 'Upcoming sessions'))}<i aria-hidden="true">${ICON_DOWN}</i></a></div>
          <div class="nv-academy-stats" data-nv="up" style="--d:420ms"><div><b data-count="${visible.length}" data-pad="2">${String(visible.length).padStart(2, '0')}</b><span>${tr('parcours', 'pathways')}</span></div><div><b data-count="${totalModules}">${totalModules}</b><span>modules</span></div><div><b data-count="${totalLessons}">${totalLessons}</b><span>${tr('leçons', 'lessons')}</span></div><div><b data-count="${upcoming.length}" data-pad="2">${String(upcoming.length).padStart(2, '0')}</b><span>${tr('sessions à venir', 'upcoming sessions')}</span></div></div>
        </div>
        ${featured ? `<a href="${pageHref(`/formation/${featured.slug}`)}" data-link class="nv-featured-course" data-tilt data-spot>
          <span class="nv-amadeus-pill"><i aria-hidden="true"></i>${tr('Représentant exclusif AMADEUS', 'Exclusive AMADEUS representative')}</span>
          <b class="nv-featured-course__word">AMADEUS</b>
          <span class="nv-featured-course__name">${local(featured.name)}</span>
          <span class="nv-featured-course__meta">${local(featured.duration)} · ${featured.modules.length} modules</span>
          ${courseSessions(featured, data)[0] ? `<span class="nv-featured-course__next">${tr('Prochaine session', 'Next session')} · <b>${formatDate(courseSessions(featured, data)[0].date)}</b></span>` : ''}
          <i aria-hidden="true">${ICON_ARROW}</i>
        </a>` : ''}
      </div>
    </section>

    ${marquee(visible.map((course) => local(course.name).toUpperCase()), 'nv-marquee--solo')}

    <section class="nv-section nv-wrap" id="catalogue">
      <div class="nv-head"><div>${eyebrow(tr('CATALOGUE DES PARCOURS', 'PATHWAY CATALOGUE'), '01')}${sectionTitle(tr('Des parcours qui passent<br>à l’<em>action.</em>', 'Pathways that move<br>into <em>action.</em>'))}</div><p data-nv="up">${tr('Chaque parcours est découpé en modules et leçons. Ouvrez le programme pour voir le détail, puis réservez une session.', 'Each pathway is broken down into modules and lessons. Open the syllabus for details, then book a session.')}</p></div>
      <div class="nv-filters" role="toolbar" aria-label="${tr('Filtrer les parcours', 'Filter pathways')}"><span class="nv-filters__pill" aria-hidden="true" data-filter-pill></span><button type="button" data-filter="all" data-filter-scope="course" class="is-active">${tr('Tous', 'All')}</button>${categories.map(([key, label]) => `<button type="button" data-filter="${key}" data-filter-scope="course">${label}</button>`).join('')}</div>
      <div class="nv-ecourses">${visible.map(courseCard).join('')}</div>
    </section>

    <section class="nv-section nv-wrap nv-calendar" id="calendrier">
      <div class="nv-head"><div>${eyebrow(tr('CALENDRIER', 'CALENDAR'), '02')}${sectionTitle(tr('Les prochaines<br><em>sessions.</em>', 'Upcoming<br><em>sessions.</em>'))}</div><p data-nv="up">${local(SESSIONS_NOTE)} ${tr('Les sessions en entreprise se planifient à la demande.', 'In-company sessions are scheduled on request.')}</p></div>
      <ol class="nv-calendar__list">${upcoming.map(({ course, session }, index) => `<li data-spot data-nv="up" style="--d:${index * 60}ms">
        <div class="nv-calendar__date"><b>${new Date(`${session.date}T12:00:00`).getDate()}</b><small>${formatDate(session.date, 'short').replace(/^\d+\s*/, '')}</small></div>
        <div class="nv-calendar__copy"><small>${local(course.category)}${course.amadeus ? ` · ${tr('Représentant exclusif', 'Exclusive representative')}` : ''}</small><b>${local(course.name)}</b><span>${formatDate(session.date)} · ${session.place || 'Conakry'} · ${local(course.duration)}</span></div>
        <button type="button" class="nv-btn nv-btn--primary nv-btn--sm" data-enroll="${course.slug}" data-session="${session.date}" data-magnetic>${roll(tr('Réserver ma place', 'Book my seat'))}<i aria-hidden="true">${ICON_ARROW}</i></button>
      </li>`).join('') || `<li class="nv-calendar__empty">${tr('De nouvelles sessions arrivent bientôt.', 'New sessions are coming soon.')}</li>`}</ol>
    </section>

    <section class="nv-section nv-wrap nv-path" data-progress>
      <div class="nv-path__intro">${eyebrow(tr('COMMENT ÇA SE PASSE', 'HOW IT WORKS'), '03')}${sectionTitle(tr('De l’inscription<br><em>au savoir-faire.</em>', 'From registration<br><em>to know-how.</em>'))}</div>
      <ol class="nv-path__list"><span class="nv-path__line" aria-hidden="true"><i></i></span>${[
        [tr('Inscription', 'Registration'), tr('Choisissez un parcours et une session, MIRS confirme votre place.', 'Choose a pathway and a session; MIRS confirms your seat.')],
        [tr('Positionnement', 'Assessment'), tr('Nous identifions votre niveau et vos objectifs.', 'We identify your level and objectives.')],
        [tr('Modules pratiques', 'Hands-on modules'), tr('Chaque module combine démonstration, exercices et cas réels.', 'Each module combines demos, exercises and real cases.')],
        [tr('Évaluation & suivi', 'Assessment & follow-up'), tr('Un bilan des acquis et un point de contact après la session.', 'A skills review and a point of contact after the session.')],
      ].map((step, index) => `<li data-nv="up" style="--d:${index * 90}ms"><span>0${index + 1}</span><div><b>${step[0]}</b><p>${step[1]}</p></div></li>`).join('')}</ol>
    </section>

    ${myEnrolments.length ? `<section class="nv-section nv-wrap nv-mine"><div class="nv-mine__card" data-spot>${eyebrow(tr('MES DEMANDES D’INSCRIPTION', 'MY REGISTRATION REQUESTS'))}<ul>${myEnrolments.map((item) => `<li><b>${escapeHtml(item.courseName || item.service)}</b><span>${item.session ? formatDate(item.session) : tr('Date à confirmer', 'Date to be confirmed')}</span><small>${item.id}</small></li>`).join('')}</ul><p>${tr('Enregistrées sur cet appareil. MIRS confirme chaque inscription par WhatsApp ou téléphone.', 'Saved on this device. MIRS confirms each registration by WhatsApp or phone.')}</p></div></section>` : ''}

    <section class="nv-quote nv-wrap" data-progress="enter">
      <figure class="nv-quote__media"><img src="${AS}editorial/formation-collaboration.jpg" alt="${tr('Échange pendant une formation MIRS', 'Discussion during a MIRS training session')}" loading="lazy" data-speed="-0.06"></figure>
      <div class="nv-quote__copy" data-spot><span aria-hidden="true">“</span><p data-scrub>${tr('Une bonne formation se mesure à ce que les équipes peuvent appliquer après la session.', 'Good training is measured by what teams can apply after the session.')}</p>${button('/contact', tr('Former toute une équipe', 'Train a whole team'), 'primary')}</div>
    </section>

    ${closingPortal(tr('Réservez votre place à la prochaine <em>session.</em>', 'Book your seat at the next <em>session.</em>'), tr('Inscription individuelle ou groupe d’entreprise : MIRS confirme la date et les modalités.', 'Individual or company group registration: MIRS confirms the date and terms.'), tr('Parler à l’Academy', 'Talk to the Academy'))}
  </main>`, '/formation');
}

function courseDetail(slug) {
  const course = academyCourses.find((item) => item.slug === slug);
  if (!course || !isCoursePublished(slug)) return notFound();
  const sessions = courseSessions(course);
  const lessons = course.modules.reduce((total, module) => total + module.lessons.length, 0);
  const others = academyCourses.filter((item) => item.slug !== slug && isCoursePublished(item.slug)).slice(0, 3);
  return shell(`<main class="nv-course">
    <section class="nv-course-hero" data-hero>
      <div class="nv-hero__aurora" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="nv-hero__grid" aria-hidden="true"></div>
      <div class="nv-wrap">
        <nav class="nv-crumbs" aria-label="${tr('Fil d’Ariane', 'Breadcrumb')}" data-nv="fade"><a href="${pageHref('/formation')}" data-link>MIRS Academy</a><span>/</span><span>${local(course.name)}</span></nav>
        <div class="nv-course-hero__layout">
          <div>
            ${course.amadeus ? `<p class="nv-amadeus-pill nv-amadeus-pill--lg" data-nv="up"><i aria-hidden="true"></i>${tr('Par le représentant exclusif d’AMADEUS', 'By the exclusive AMADEUS representative')}</p>` : eyebrow(local(course.category))}
            ${sectionTitle(local(course.name), 'nv-page-hero__title', 'h1')}
            <p data-nv="up" style="--d:200ms">${local(course.summary)}</p>
            <ul class="nv-meta-list" data-nv="up" style="--d:280ms"><li><small>${tr('Durée', 'Duration')}</small><b>${local(course.duration)}</b></li><li><small>${tr('Niveau', 'Level')}</small><b>${local(course.level)}</b></li><li><small>Format</small><b>${local(course.format)}</b></li><li><small>${tr('Contenu', 'Content')}</small><b>${course.modules.length} modules · ${lessons} ${tr('leçons', 'lessons')}</b></li></ul>
          </div>
          <aside class="nv-enroll-card" data-spot data-nv="up" style="--d:300ms">
            <span class="nv-enroll-card__code">${course.short}</span>
            <b>${sessions[0] ? formatDate(sessions[0].date) : tr('Session en préparation', 'Session being scheduled')}</b>
            <small>${sessions[0] ? `${tr('Prochaine session', 'Next session')} · ${sessions[0].place || 'Conakry'}` : tr('Inscrivez-vous pour être prévenu', 'Register to be notified')}</small>
            <button type="button" class="nv-btn nv-btn--primary nv-btn--lg nv-btn--block" data-enroll="${course.slug}" ${sessions[0] ? `data-session="${sessions[0].date}"` : ''} data-magnetic>${roll(tr('S’inscrire à la session', 'Enrol in the session'))}<i aria-hidden="true">${ICON_ARROW}</i></button>
            <button type="button" class="nv-add" data-add="${tr('Formation', 'Training')} : ${local(course.name)}" data-add-kind="course">${tr('Ajouter au panier pour un groupe', 'Add to cart for a group')} <i aria-hidden="true">${ICON_PLUS}</i></button>
            <p>${local(SESSIONS_NOTE)}</p>
          </aside>
        </div>
      </div>
    </section>

    <section class="nv-section nv-wrap nv-course-body">
      <div class="nv-course-body__main">
        <div class="nv-course-block">${eyebrow(tr('OBJECTIFS', 'OBJECTIVES'), '01')}<ul class="nv-checks">${course.objectives.map((objective) => `<li data-nv="up"><i aria-hidden="true">${ICON_CHECK}</i>${local(objective)}</li>`).join('')}</ul></div>
        <div class="nv-course-block">${eyebrow(tr('PROGRAMME DÉTAILLÉ', 'DETAILED SYLLABUS'), '02')}
          <div class="nv-curriculum">${course.modules.map((module, index) => `<details class="nv-module" ${index === 0 ? 'open' : ''} data-nv="up" style="--d:${index * 50}ms">
            <summary><span class="nv-module__index">${String(index + 1).padStart(2, '0')}</span><span class="nv-module__title"><b>${local(module.title)}</b><small>${module.lessons.length} ${tr('leçons', 'lessons')} · ${module.duration}</small></span><i aria-hidden="true">${ICON_PLUS}</i></summary>
            <ol>${module.lessons.map((lesson, lessonIndex) => `<li><span>${index + 1}.${lessonIndex + 1}</span>${local(lesson)}</li>`).join('')}</ol>
          </details>`).join('')}</div>
        </div>
        <div class="nv-course-grid">
          <div class="nv-course-block nv-course-block--card" data-spot>${eyebrow(tr('PUBLIC', 'AUDIENCE'))}<p>${local(course.audience)}</p></div>
          <div class="nv-course-block nv-course-block--card" data-spot>${eyebrow(tr('PRÉREQUIS', 'PREREQUISITES'))}<p>${local(course.prerequisites)}</p></div>
        </div>
      </div>
      <aside class="nv-course-body__side"><div class="nv-sessions nv-sessions--sticky">${eyebrow(tr('SESSIONS À VENIR', 'UPCOMING SESSIONS'), '03')}${sessionList(course, sessions)}</div></aside>
    </section>

    ${others.length ? `<section class="nv-section nv-wrap"><div class="nv-head"><div>${eyebrow(tr('À DÉCOUVRIR AUSSI', 'ALSO WORTH EXPLORING'))}${sectionTitle(tr('D’autres <em>parcours.</em>', 'Other <em>pathways.</em>'))}</div>${link('/formation', tr('Tout le catalogue', 'Full catalogue'))}</div><div class="nv-ecourses">${others.map(courseCard).join('')}</div></section>` : ''}

    ${closingPortal(tr('Votre place vous <em>attend.</em>', 'Your seat is <em>waiting.</em>'), tr('Réservez maintenant : MIRS vous confirme la date, le lieu et les modalités.', 'Book now: MIRS confirms the date, venue and terms.'), tr('Poser une question', 'Ask a question'))}
  </main>`, `/formation/${slug}`);
}

function enrollDialog() {
  const visible = academyCourses.filter((course) => isCoursePublished(course.slug));
  return `<dialog class="nv-dialog" data-enroll-dialog aria-labelledby="nv-enroll-title">
    <form class="nv-dialog__form" data-enroll-form>
      <div class="nv-dialog__head"><div><span>MIRS ACADEMY</span><h2 id="nv-enroll-title">${tr('Réserver ma <em>place.</em>', 'Book my <em>seat.</em>')}</h2></div><button type="button" class="nv-dialog__close" data-dialog-close aria-label="${tr('Fermer', 'Close')}">×</button></div>
      <div class="nv-dialog__grid">
        <label class="nv-field nv-field--select nv-field--wide"><select name="course" required data-enroll-course>${visible.map((course) => `<option value="${course.slug}">${local(course.name)}</option>`).join('')}</select><span>${tr('Parcours', 'Pathway')}</span></label>
        <label class="nv-field nv-field--select nv-field--wide"><select name="session" data-enroll-session></select><span>Session</span></label>
        <label class="nv-field"><input required name="name" autocomplete="name" placeholder=" "><span>${tr('Nom et prénom', 'Full name')}</span></label>
        <label class="nv-field"><input required name="phone" type="tel" autocomplete="tel" placeholder=" "><span>${tr('Téléphone / WhatsApp', 'Phone / WhatsApp')}</span></label>
        <label class="nv-field"><input name="email" type="email" autocomplete="email" placeholder=" "><span>Email</span></label>
        <label class="nv-field"><input name="company" autocomplete="organization" placeholder=" "><span>${tr('Organisation (facultatif)', 'Organization (optional)')}</span></label>
        <label class="nv-field nv-field--select"><select name="seats">${[1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20].map((value) => `<option value="${value}">${value} ${value > 1 ? tr('participants', 'participants') : tr('participant', 'participant')}</option>`).join('')}</select><span>${tr('Participants', 'Participants')}</span></label>
        <label class="nv-field nv-field--select"><select name="funding"><option>${tr('Inscription individuelle', 'Individual registration')}</option><option>${tr('Prise en charge entreprise', 'Company-funded')}</option></select><span>${tr('Financement', 'Funding')}</span></label>
        <label class="nv-field nv-field--wide"><textarea name="note" rows="3" placeholder=" "></textarea><span>${tr('Votre niveau ou vos attentes (facultatif)', 'Your level or expectations (optional)')}</span></label>
      </div>
      <div class="nv-dialog__foot"><p>${tr('Votre demande est envoyée à MIRS sur WhatsApp. Une confirmation suit avec la date et les modalités.', 'Your request is sent to MIRS on WhatsApp. A confirmation follows with the date and terms.')}</p><button type="submit" class="nv-btn nv-btn--primary nv-btn--lg" data-magnetic>${roll(tr('Confirmer ma demande', 'Confirm my request'))}<i aria-hidden="true">${ICON_ARROW}</i></button></div>
    </form>
    <div class="nv-dialog__done" data-enroll-done hidden></div>
  </dialog>`;
}

/* ---------------- Maintenance & emergency ---------------- */

function maintenancePage() {
  const data = state.locale === 'en' ? { ...branchData.maintenance, ...branchTranslations.maintenance } : branchData.maintenance;
  const reflexes = [
    tr('Vérifier l’alimentation électrique et l’onduleur.', 'Check the power supply and UPS.'),
    tr('Redémarrer la box ou le routeur en cas de coupure internet.', 'Restart the modem or router if the internet is down.'),
    tr('Noter le message d’erreur exact (une photo suffit).', 'Note the exact error message (a photo is enough).'),
    tr('Virus suspecté : débrancher le poste du réseau, ne pas l’éteindre.', 'Suspected virus: unplug the machine from the network, do not shut it down.'),
    tr('Identifier qui est bloqué : un poste, une équipe, toute l’activité.', 'Identify who is blocked: one machine, a team, or the whole business.'),
  ];
  return shell(`<main class="nv-maint">
    <section class="nv-maint-hero" data-hero>
      <div class="nv-unit-hero__media"><img src="${AS}editorial/maintenance-pc.jpg" alt="" loading="eager" data-speed="0.12"></div>
      <div class="nv-unit-hero__veil" aria-hidden="true"></div>
      <div class="nv-hero__grid" aria-hidden="true"></div>
      <div class="nv-wrap nv-maint-hero__layout">
        <div>
          <div class="nv-hero__meta" data-nv="fade"><span>05 / ${tr('CONTINUITÉ', 'CONTINUITY')}</span><span>CARE / 05</span><span>CONAKRY</span></div>
          ${sectionTitle(tr('Maintenance &<br><em>intervention.</em>', 'Maintenance &<br><em>call-out.</em>'), 'nv-unit-hero__title', 'h1')}
          <p data-nv="up" style="--d:220ms">${data.intro}</p>
          <div class="nv-hero__actions" data-nv="up" style="--d:320ms"><a href="#demande" class="nv-btn nv-btn--ghost" data-magnetic>${roll(tr('Demande non urgente', 'Non-urgent request'))}<i aria-hidden="true">${ICON_DOWN}</i></a><a href="#contrat" class="nv-btn nv-btn--ghost" data-magnetic>${roll(tr('Contrat de maintenance', 'Maintenance contract'))}<i aria-hidden="true">${ICON_DOWN}</i></a></div>
        </div>
        <div class="nv-sos" data-nv="up" style="--d:250ms">
          <span class="nv-sos__label"><i aria-hidden="true"></i>${tr('Ligne d’urgence', 'Emergency line')}</span>
          <button type="button" class="nv-sos__button" data-urgent-open aria-haspopup="dialog">
            <span class="nv-sos__rings" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="nv-sos__core">${ICON_ALERT}<b>${tr('Intervention<br>d’urgence', 'Emergency<br>call-out')}</b></span>
          </button>
          <a class="nv-sos__call" href="tel:+224622051321">${ICON_PHONE}<span><small>${tr('Appeler maintenant', 'Call now')}</small>+224 622 05 13 21</span></a>
          <p>${tr('Activité bloquée, réseau coupé, serveur en panne, virus : déclenchez une alerte, MIRS reçoit votre demande avec toutes les informations utiles.', 'Business stopped, network down, server failure, virus: raise an alert and MIRS receives your request with all the useful details.')}</p>
        </div>
      </div>
    </section>

    ${marquee([tr('PRÉVENTION', 'PREVENTION'), tr('INTERVENTION', 'CALL-OUT'), tr('PARC', 'ASSETS'), tr('SUIVI', 'FOLLOW-UP'), tr('URGENCE', 'EMERGENCY')], 'nv-marquee--solo')}

    <section class="nv-section nv-wrap">
      <div class="nv-head"><div>${eyebrow(tr('CE QUE NOUS PRENONS EN CHARGE', 'WHAT WE COVER'), '01')}${sectionTitle(data.featureTitle)}</div><p data-nv="up">${data.featureText}</p></div>
      <div class="nv-capabilities">${data.capabilities.map((capability, index) => `<article class="nv-capability" data-spot data-nv="up" style="--d:${index * 80}ms"><div class="nv-capability__top"><span>0${index + 1}</span><i aria-hidden="true">${ICON_ARROW}</i></div><div class="nv-capability__glyph" aria-hidden="true"><i></i><i></i><i></i></div><h3>${capability[0]}</h3><p>${capability[1]}</p></article>`).join('')}</div>
    </section>

    <section class="nv-section nv-wrap nv-reflex">
      <div class="nv-reflex__intro">${eyebrow(tr('AVANT D’APPELER', 'BEFORE YOU CALL'), '02')}${sectionTitle(tr('Les bons <em>réflexes.</em>', 'The right <em>reflexes.</em>'))}<p data-nv="up">${tr('Cochez ce qui a été fait : ces informations accélèrent le diagnostic et sont ajoutées à votre alerte.', 'Tick what has been done: this information speeds up diagnosis and is added to your alert.')}</p></div>
      <ul class="nv-reflex__list" data-reflex>${reflexes.map((item, index) => `<li data-nv="up" style="--d:${index * 60}ms"><label><input type="checkbox" value="${escapeHtml(item)}" data-reflex-item><span class="nv-reflex__box" aria-hidden="true">${ICON_CHECK}</span><span>${item}</span></label></li>`).join('')}</ul>
    </section>

    <section class="nv-section nv-wrap nv-maint-forms">
      <form class="nv-form nv-form--card" id="demande" data-ticket-form data-spot>
        <div class="nv-form__head">${eyebrow(tr('DEMANDE D’INTERVENTION', 'SERVICE REQUEST'), '03')}<h2>${tr('Une panne, un réglage, une <em>question.</em>', 'A fault, a setting, a <em>question.</em>')}</h2></div>
        <label class="nv-field nv-field--select"><select name="equipment"><option>${tr('Poste de travail', 'Workstation')}</option><option>${tr('Réseau / Wi-Fi', 'Network / Wi-Fi')}</option><option>${tr('Serveur', 'Server')}</option><option>${tr('Imprimante', 'Printer')}</option><option>${tr('Logiciel / messagerie', 'Software / email')}</option><option>${tr('Autre', 'Other')}</option></select><span>${tr('Équipement', 'Equipment')}</span></label>
        <label class="nv-field nv-field--select"><select name="when"><option>${tr('Dès que possible', 'As soon as possible')}</option><option>${tr('Cette semaine', 'This week')}</option><option>${tr('À planifier', 'To be scheduled')}</option></select><span>${tr('Délai souhaité', 'Preferred timing')}</span></label>
        <label class="nv-field"><input required name="name" autocomplete="name" placeholder=" "><span>${tr('Nom', 'Name')}</span></label>
        <label class="nv-field"><input required name="phone" type="tel" autocomplete="tel" placeholder=" "><span>${tr('Téléphone', 'Phone')}</span></label>
        <label class="nv-field nv-field--wide"><input name="company" autocomplete="organization" placeholder=" "><span>${tr('Organisation et adresse', 'Organization and address')}</span></label>
        <label class="nv-field nv-field--wide"><textarea required name="message" rows="4" placeholder=" "></textarea><span>${tr('Décrivez le problème', 'Describe the issue')}</span></label>
        <div class="nv-form__submit"><button type="submit" class="nv-btn nv-btn--primary nv-btn--lg" data-magnetic>${roll(tr('Envoyer la demande', 'Send the request'))}<i aria-hidden="true">${ICON_ARROW}</i></button><p data-form-status role="status" aria-live="polite">${tr('Envoyée sur WhatsApp avec une référence de suivi.', 'Sent on WhatsApp with a tracking reference.')}</p></div>
      </form>

      <form class="nv-form nv-form--card nv-contract" id="contrat" data-contract-form data-spot>
        <div class="nv-form__head">${eyebrow(tr('CONTRAT DE MAINTENANCE', 'MAINTENANCE CONTRACT'), '04')}<h2>${tr('Composez votre <em>contrat.</em>', 'Build your <em>contract.</em>')}</h2></div>
        <label class="nv-range nv-field--wide"><span>${tr('Postes de travail', 'Workstations')}</span><output data-range-out="workstations">10</output><input type="range" name="workstations" min="1" max="200" value="10" data-range></label>
        <label class="nv-range"><span>${tr('Serveurs', 'Servers')}</span><output data-range-out="servers">1</output><input type="range" name="servers" min="0" max="20" value="1" data-range></label>
        <label class="nv-range"><span>${tr('Imprimantes', 'Printers')}</span><output data-range-out="printers">2</output><input type="range" name="printers" min="0" max="50" value="2" data-range></label>
        <fieldset class="nv-choice nv-field--wide"><legend>${tr('Visites préventives', 'Preventive visits')}</legend>${[tr('Mensuelles', 'Monthly'), tr('Trimestrielles', 'Quarterly'), tr('Semestrielles', 'Twice a year')].map((label, index) => `<label><input type="radio" name="frequency" value="${label}" ${index === 0 ? 'checked' : ''}><span>${label}</span></label>`).join('')}</fieldset>
        <fieldset class="nv-choice nv-field--wide"><legend>${tr('Couverture', 'Coverage')}</legend>${[tr('Heures ouvrées', 'Business hours'), tr('Horaires étendus', 'Extended hours')].map((label, index) => `<label><input type="radio" name="coverage" value="${label}" ${index === 0 ? 'checked' : ''}><span>${label}</span></label>`).join('')}</fieldset>
        <label class="nv-field"><input required name="name" autocomplete="name" placeholder=" "><span>${tr('Nom', 'Name')}</span></label>
        <label class="nv-field"><input required name="phone" type="tel" autocomplete="tel" placeholder=" "><span>${tr('Téléphone', 'Phone')}</span></label>
        <label class="nv-field nv-field--wide"><input name="company" autocomplete="organization" placeholder=" "><span>${tr('Organisation', 'Organization')}</span></label>
        <div class="nv-form__submit"><button type="submit" class="nv-btn nv-btn--primary nv-btn--lg" data-magnetic>${roll(tr('Demander un devis', 'Request a quote'))}<i aria-hidden="true">${ICON_ARROW}</i></button><p data-form-status role="status" aria-live="polite">${tr('Devis personnalisé, sans engagement.', 'Personalised quote, no commitment.')}</p></div>
      </form>
    </section>

    <section class="nv-section nv-wrap nv-process" data-progress>
      <div class="nv-head"><div>${eyebrow(tr('UNE MÉTHODE STRUCTURÉE', 'A STRUCTURED METHOD'), '05')}${sectionTitle(tr('La continuité en<br>cinq <em>temps.</em>', 'Continuity in<br>five <em>stages.</em>'))}</div></div>
      <div class="nv-process__line" aria-hidden="true"><span></span></div>
      <ol class="nv-process__rail">${data.steps.map((step, index) => `<li data-nv="up" style="--d:${index * 90}ms"><span class="nv-process__dot" aria-hidden="true"></span><small>0${index + 1}</small><b>${step[0]}</b><p>${step[1]}</p></li>`).join('')}</ol>
    </section>

    <section class="nv-section nv-references">
      <div class="nv-wrap nv-head"><div>${eyebrow(tr('ILS NOUS FONT CONFIANCE', 'THEY TRUST US'), '06')}${sectionTitle(tr('La confiance se construit<br>dans <em>la durée.</em>', 'Trust is built through<br><em>lasting</em> results.'))}</div></div>
      ${logoWall(27)}
    </section>

    <button type="button" class="nv-sos-float" data-urgent-open aria-haspopup="dialog"><span aria-hidden="true">${ICON_ALERT}</span>${tr('Urgence', 'Emergency')}</button>

    <dialog class="nv-dialog nv-dialog--urgent" data-urgent-dialog aria-labelledby="nv-urgent-title">
      <form class="nv-dialog__form" data-urgent-form>
        <div class="nv-dialog__head"><div><span class="nv-urgent-tag"><i aria-hidden="true"></i>${tr('ALERTE PRIORITAIRE', 'PRIORITY ALERT')}</span><h2 id="nv-urgent-title">${tr('Intervention <em>d’urgence.</em>', 'Emergency <em>call-out.</em>')}</h2></div><button type="button" class="nv-dialog__close" data-dialog-close aria-label="${tr('Fermer', 'Close')}">×</button></div>
        <fieldset class="nv-choice nv-choice--grid"><legend>${tr('Que se passe-t-il ?', 'What is happening?')}</legend>${[
          tr('Internet / réseau coupé', 'Internet / network down'), tr('Serveur en panne', 'Server failure'), tr('Poste bloqué', 'Workstation blocked'), tr('Virus / piratage', 'Virus / breach'), tr('Coupure électrique / onduleur', 'Power / UPS failure'), tr('Autre urgence', 'Other emergency'),
        ].map((label, index) => `<label><input type="radio" name="issue" value="${label}" ${index === 0 ? 'checked' : ''}><span>${label}</span></label>`).join('')}</fieldset>
        <fieldset class="nv-choice"><legend>${tr('Impact', 'Impact')}</legend>${[tr('Toute l’activité est arrêtée', 'Whole business stopped'), tr('Une équipe est bloquée', 'A team is blocked'), tr('Un poste est touché', 'One machine affected')].map((label, index) => `<label><input type="radio" name="impact" value="${label}" ${index === 0 ? 'checked' : ''}><span>${label}</span></label>`).join('')}</fieldset>
        <div class="nv-dialog__grid">
          <label class="nv-field"><input required name="name" autocomplete="name" placeholder=" "><span>${tr('Votre nom', 'Your name')}</span></label>
          <label class="nv-field"><input required name="phone" type="tel" autocomplete="tel" placeholder=" "><span>${tr('Téléphone joignable', 'Reachable phone')}</span></label>
          <label class="nv-field nv-field--wide"><input required name="location" autocomplete="street-address" placeholder=" "><span>${tr('Organisation et adresse / quartier', 'Organization and address / district')}</span></label>
          <label class="nv-field nv-field--wide"><textarea name="message" rows="3" placeholder=" "></textarea><span>${tr('Détails utiles (facultatif)', 'Useful details (optional)')}</span></label>
        </div>
        <div class="nv-dialog__foot"><a class="nv-btn nv-btn--ghost" href="tel:+224622051321">${roll(tr('Appeler', 'Call'))}<i aria-hidden="true">${ICON_PHONE}</i></a><button type="submit" class="nv-btn nv-btn--urgent nv-btn--lg" data-magnetic>${roll(tr('Envoyer l’alerte', 'Send the alert'))}<i aria-hidden="true">${ICON_ALERT}</i></button></div>
      </form>
      <div class="nv-dialog__done" data-urgent-done hidden></div>
    </dialog>
  </main>`, '/maintenance');
}

/* ---------------- IT store (e-commerce, quote-based) ---------------- */

function storeCard(product, index = 0) {
  const name = local(product.name);
  const category = storeCategories.find((item) => item.key === product.category);
  return `<article class="nv-sku" data-sku data-category="${product.category}" data-name="${escapeHtml(searchKey(`${name} ${local(product.detail)} ${product.option?.values.join(' ') || ''}`))}" data-spot data-nv="up" style="--d:${(index % 3) * 70}ms">
    <a href="${pageHref(`/informatique/boutique/${product.id}`)}" data-link class="nv-sku__media" data-cursor="${tr('Voir', 'View')}">${deviceArt(product.icon)}<span class="nv-sku__cat">${local(category?.label)}</span></a>
    <div class="nv-sku__body">
      <h3><a href="${pageHref(`/informatique/boutique/${product.id}`)}" data-link>${name}</a></h3>
      <p>${local(product.detail)}</p>
      <div class="nv-sku__price"><span>${tr('Prix', 'Price')}</span><b>${tr('Sur devis', 'On quotation')}</b></div>
      <div class="nv-sku__actions"><button type="button" class="nv-btn nv-btn--primary nv-btn--sm" data-add-product="${product.id}" data-magnetic>${roll(tr('Ajouter', 'Add'))}<i aria-hidden="true">${ICON_CART}</i></button>${link(`/informatique/boutique/${product.id}`, tr('Détails', 'Details'))}</div>
    </div>
  </article>`;
}

function techStore() {
  const items = storeProducts.filter((product) => isProductVisible(product.id));
  const categories = storeCategories.filter((category) => items.some((product) => product.category === category.key));
  return shell(`<main class="nv-store">
    <section class="nv-shop-hero nv-store-hero" data-hero>
      <div class="nv-hero__aurora" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="nv-hero__grid" aria-hidden="true"></div>
      <div class="nv-shop-hero__layout nv-wrap">
        <div>
          <div class="nv-hero__meta" data-nv="fade"><span>MIRS / STORE</span><span>${tr('INFORMATIQUE', 'IT')}</span><span>${String(items.length).padStart(2, '0')} ${tr('PRODUITS', 'PRODUCTS')}</span></div>
          ${sectionTitle(tr('L’équipement informatique, <em>installé.</em>', 'IT equipment, <em>installed.</em>'), 'nv-shop-hero__title', 'h1')}
          <p data-nv="up" style="--d:200ms">${tr('Composez votre panier, passez commande : MIRS vous envoie un devis, confirme la disponibilité et peut installer le matériel sur site.', 'Build your cart and place your order: MIRS sends a quote, confirms availability and can install the equipment on site.')}</p>
          <ul class="nv-store-perks" data-nv="up" style="--d:300ms"><li><i aria-hidden="true">${ICON_CHECK}</i>${tr('Devis sous confirmation MIRS', 'Quote confirmed by MIRS')}</li><li><i aria-hidden="true">${ICON_CHECK}</i>${tr('Configuration & installation', 'Configuration & installation')}</li><li><i aria-hidden="true">${ICON_CHECK}</i>${tr('Retrait ou livraison à convenir', 'Pick-up or delivery to be arranged')}</li></ul>
        </div>
        <div class="nv-store-hero__stack" data-tilt aria-hidden="true">${['laptop', 'router', 'server'].map((icon, index) => `<div class="nv-store-hero__card nv-store-hero__card--${index + 1}">${deviceArt(icon)}</div>`).join('')}</div>
      </div>
    </section>

    <section class="nv-section nv-wrap nv-store-body" id="catalogue">
      <div class="nv-store-toolbar" data-nv="up">
        <label class="nv-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg><input type="search" placeholder="${tr('Rechercher un produit…', 'Search a product…')}" data-store-search aria-label="${tr('Rechercher un produit', 'Search a product')}"></label>
        <div class="nv-filters" role="toolbar" aria-label="${tr('Catégories', 'Categories')}"><span class="nv-filters__pill" aria-hidden="true" data-filter-pill></span><button type="button" data-filter="all" data-filter-scope="sku" class="is-active">${tr('Tout', 'All')}</button>${categories.map((category) => `<button type="button" data-filter="${category.key}" data-filter-scope="sku">${local(category.label)}</button>`).join('')}</div>
      </div>
      <p class="nv-store-count" data-store-count>${items.length} ${tr('produits', 'products')}</p>
      <div class="nv-skus">${items.map(storeCard).join('')}</div>
      <p class="nv-store-empty" data-store-empty hidden>${tr('Aucun produit ne correspond. Décrivez votre besoin : MIRS trouve l’équipement adapté.', 'No product matches. Describe your need: MIRS will find the right equipment.')} ${link('/contact', 'Contact')}</p>
    </section>

    <section class="nv-section nv-wrap nv-howto">
      <div class="nv-head"><div>${eyebrow(tr('COMMENT COMMANDER', 'HOW TO ORDER'))}${sectionTitle(tr('Trois étapes jusqu’à<br>votre <em>équipement.</em>', 'Three steps to<br>your <em>equipment.</em>'))}</div></div>
      <ol class="nv-howto__list">${[
        [tr('Panier', 'Cart'), tr('Choisissez produits, options et quantités.', 'Choose products, options and quantities.')],
        [tr('Commande', 'Order'), tr('Renseignez vos coordonnées et le mode de remise.', 'Fill in your details and delivery mode.')],
        [tr('Devis & livraison', 'Quote & delivery'), tr('MIRS confirme le montant, la disponibilité et la date.', 'MIRS confirms the amount, availability and date.')],
      ].map((step, index) => `<li data-spot data-nv="up" style="--d:${index * 80}ms"><span>0${index + 1}</span><b>${step[0]}</b><p>${step[1]}</p></li>`).join('')}</ol>
    </section>

    ${closingPortal(tr('Un besoin plus large ? <em>Parlons-en.</em>', 'A bigger need? <em>Let’s talk.</em>'), tr('Équipement d’un site complet, renouvellement de parc ou projet réseau : MIRS chiffre l’ensemble.', 'Equipping a full site, refreshing assets or a network project: MIRS prices the whole project.'), tr('Demander un devis global', 'Request a global quote'))}
  </main>`, '/informatique/boutique');
}

function productDetail(id) {
  const product = storeProducts.find((item) => item.id === id);
  if (!product || !isProductVisible(product.id)) return notFound();
  const name = local(product.name);
  const category = storeCategories.find((item) => item.key === product.category);
  const related = storeProducts.filter((item) => item.id !== id && item.category === product.category && isProductVisible(item.id)).concat(storeProducts.filter((item) => item.category !== product.category && isProductVisible(item.id))).slice(0, 3);
  return shell(`<main class="nv-pdp">
    <section class="nv-section nv-wrap nv-pdp__top">
      <nav class="nv-crumbs" aria-label="${tr('Fil d’Ariane', 'Breadcrumb')}" data-nv="fade"><a href="${pageHref('/informatique/boutique')}" data-link>${tr('Boutique', 'Store')}</a><span>/</span><span>${local(category?.label)}</span><span>/</span><span>${name}</span></nav>
      <div class="nv-pdp__layout">
        <div class="nv-pdp__media" data-tilt data-spot>${deviceArt(product.icon, 'nv-device--xl')}<span class="nv-sku__cat">${local(category?.label)}</span></div>
        <form class="nv-pdp__info" data-product-form="${product.id}">
          ${eyebrow(`MIRS STORE / ${local(category?.label).toUpperCase()}`)}
          ${sectionTitle(name, 'nv-pdp__title', 'h1')}
          <p data-nv="up">${local(product.detail)}</p>
          <div class="nv-sku__price nv-sku__price--lg" data-nv="up"><span>${tr('Prix', 'Price')}</span><b>${tr('Sur devis', 'On quotation')}</b><small>${tr('Montant confirmé par MIRS selon configuration et quantité.', 'Amount confirmed by MIRS according to configuration and quantity.')}</small></div>
          ${product.option ? `<fieldset class="nv-choice nv-choice--options" data-nv="up"><legend>${local(product.option.label)}</legend>${product.option.values.map((value, index) => `<label><input type="radio" name="option" value="${escapeHtml(value)}" ${index === 0 ? 'checked' : ''}><span>${value}</span></label>`).join('')}</fieldset>` : ''}
          <div class="nv-pdp__buy" data-nv="up">
            <div class="nv-qty nv-qty--lg" role="group" aria-label="${tr('Quantité', 'Quantity')}"><button type="button" data-step="-1" aria-label="${tr('Diminuer', 'Decrease')}">${ICON_MINUS}</button><input type="number" name="qty" value="1" min="1" max="999" inputmode="numeric" aria-label="${tr('Quantité', 'Quantity')}"><button type="button" data-step="1" aria-label="${tr('Augmenter', 'Increase')}">${ICON_PLUS}</button></div>
            <button type="submit" class="nv-btn nv-btn--primary nv-btn--lg" data-magnetic>${roll(tr('Ajouter au panier', 'Add to cart'))}<i aria-hidden="true">${ICON_CART}</i></button>
            <button type="submit" class="nv-btn nv-btn--ghost nv-btn--lg" data-buy-now data-magnetic>${roll(tr('Commander', 'Order now'))}<i aria-hidden="true">${ICON_ARROW}</i></button>
          </div>
          <ul class="nv-store-perks" data-nv="up"><li><i aria-hidden="true">${ICON_CHECK}</i>${tr('Configuration avant remise', 'Configured before handover')}</li><li><i aria-hidden="true">${ICON_CHECK}</i>${tr('Installation sur site possible', 'On-site installation available')}</li><li><i aria-hidden="true">${ICON_CHECK}</i>${tr('Conseil avant achat', 'Advice before purchase')}</li></ul>
        </form>
      </div>
    </section>
    <section class="nv-section nv-wrap nv-pdp__specs">
      <div>${eyebrow(tr('CARACTÉRISTIQUES', 'SPECIFICATIONS'), '01')}${sectionTitle(tr('Les points <em>clés.</em>', 'Key <em>points.</em>'))}</div>
      <dl class="nv-specs">${product.specs.map(([label, value]) => `<div data-nv="up"><dt>${local(label)}</dt><dd>${local(value)}</dd></div>`).join('')}${product.option ? `<div data-nv="up"><dt>${local(product.option.label)}</dt><dd>${product.option.values.join(' · ')}</dd></div>` : ''}</dl>
    </section>
    <section class="nv-section nv-wrap"><div class="nv-head"><div>${eyebrow(tr('À ASSOCIER', 'GOES WELL WITH'))}${sectionTitle(tr('Complétez votre <em>commande.</em>', 'Complete your <em>order.</em>'))}</div>${link('/informatique/boutique', tr('Toute la boutique', 'Full store'))}</div><div class="nv-skus">${related.map(storeCard).join('')}</div></section>
  </main>`, `/informatique/boutique/${id}`);
}

/* ---------------- Checkout ---------------- */

function checkout() {
  const lines = state.cart;
  return shell(`<main class="nv-checkout">
    <section class="nv-page-hero nv-checkout-hero" data-hero>
      <div class="nv-hero__aurora" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="nv-hero__grid" aria-hidden="true"></div>
      <div class="nv-wrap nv-page-hero__layout">
        <ol class="nv-steps" data-nv="fade"><li class="is-done"><span>01</span>${tr('Panier', 'Cart')}</li><li class="is-current"><span>02</span>${tr('Coordonnées', 'Details')}</li><li><span>03</span>${tr('Devis & confirmation', 'Quote & confirmation')}</li></ol>
        ${sectionTitle(tr('Finaliser ma <em>commande.</em>', 'Complete my <em>order.</em>'), 'nv-page-hero__title', 'h1')}
      </div>
    </section>
    <section class="nv-section nv-wrap nv-checkout__layout" data-checkout>
      ${lines.length ? `<form class="nv-form nv-form--card nv-checkout__form" data-checkout-form data-spot>
        <div class="nv-form__head">${eyebrow(tr('VOS COORDONNÉES', 'YOUR DETAILS'), '01')}</div>
        <label class="nv-field"><input required name="name" autocomplete="name" placeholder=" "><span>${tr('Nom et prénom', 'Full name')}</span></label>
        <label class="nv-field"><input name="company" autocomplete="organization" placeholder=" "><span>${tr('Organisation (facultatif)', 'Organization (optional)')}</span></label>
        <label class="nv-field"><input required name="phone" type="tel" autocomplete="tel" placeholder=" "><span>${tr('Téléphone / WhatsApp', 'Phone / WhatsApp')}</span></label>
        <label class="nv-field"><input name="email" type="email" autocomplete="email" placeholder=" "><span>Email</span></label>
        <div class="nv-form__head nv-field--wide">${eyebrow(tr('REMISE DE LA COMMANDE', 'ORDER HANDOVER'), '02')}</div>
        <fieldset class="nv-choice nv-field--wide">${[[tr('Retrait chez MIRS', 'Pick-up at MIRS'), 'pickup'], [tr('Livraison à convenir', 'Delivery to be arranged'), 'delivery'], [tr('Livraison + installation', 'Delivery + installation'), 'install']].map(([label, value], index) => `<label><input type="radio" name="delivery" value="${label}" data-delivery="${value}" ${index === 0 ? 'checked' : ''}><span>${label}</span></label>`).join('')}</fieldset>
        <label class="nv-field nv-field--wide" data-address hidden><input name="address" autocomplete="street-address" placeholder=" "><span>${tr('Adresse / quartier de livraison', 'Delivery address / district')}</span></label>
        <label class="nv-field nv-field--wide"><textarea name="note" rows="3" placeholder=" "></textarea><span>${tr('Précisions (délai, usage, budget…)', 'Details (timing, use, budget…)')}</span></label>
        <label class="nv-consent nv-field--wide"><input type="checkbox" required name="consent"><span>${tr('Je comprends que les prix sont communiqués sur devis et que la commande est confirmée par MIRS.', 'I understand prices are provided on quotation and the order is confirmed by MIRS.')}</span></label>
        <div class="nv-form__submit"><button type="submit" class="nv-btn nv-btn--primary nv-btn--lg" data-magnetic>${roll(tr('Envoyer ma commande', 'Send my order'))}<i aria-hidden="true">${ICON_ARROW}</i></button><p data-form-status role="status" aria-live="polite">${tr('La commande est transmise à MIRS sur WhatsApp avec sa référence.', 'The order is sent to MIRS on WhatsApp with its reference.')}</p></div>
      </form>
      <aside class="nv-summary" data-spot>
        <div class="nv-summary__head"><span>${tr('RÉCAPITULATIF', 'SUMMARY')}</span><b>${cartCount()} ${tr('article(s)', 'item(s)')}</b></div>
        <ul class="nv-lines" data-checkout-list>${lines.map((item, index) => cartLine(item, index, false)).join('')}</ul>
        <div class="nv-summary__total"><span>${tr('Total', 'Total')}</span><b>${tr('Sur devis', 'On quotation')}</b></div>
        <p>${tr('Aucun paiement en ligne : MIRS vous envoie le devis, puis convient avec vous du règlement et de la remise.', 'No online payment: MIRS sends the quote, then agrees payment and handover with you.')}</p>
        ${link('/informatique/boutique', tr('Continuer mes achats', 'Continue shopping'))}
      </aside>` : `<div class="nv-empty-cart" data-spot>${deviceArt('laptop', 'nv-device--xl')}<h2>${tr('Votre panier est vide.', 'Your cart is empty.')}</h2><p>${tr('Ajoutez des produits depuis la boutique ou une formation depuis l’Academy.', 'Add products from the store or a course from the Academy.')}</p><div class="nv-hero__actions">${button('/informatique/boutique', tr('Voir la boutique', 'Browse the store'), 'primary')}${button('/formation', 'MIRS Academy', 'ghost')}</div></div>`}
    </section>
  </main>`, '/checkout');
}

function orderConfirmation(record) {
  return `<div class="nv-confirm" data-spot>
    <span class="nv-confirm__icon" aria-hidden="true">${ICON_CHECK}</span>
    <p class="nv-eyebrow"><b>03</b>${tr('COMMANDE TRANSMISE', 'ORDER SENT')}</p>
    <h2>${tr('Merci, votre commande est <em>enregistrée.</em>', 'Thank you, your order is <em>recorded.</em>')}</h2>
    <p>${tr('Référence', 'Reference')} <b>${record.id}</b>. ${tr('MIRS revient vers vous avec le devis, la disponibilité et la date de remise.', 'MIRS will come back with the quote, availability and handover date.')}</p>
    <ul class="nv-lines">${(record.lines || []).map((line) => `<li class="nv-line"><span class="nv-line__tag">×${line.qty}</span><div class="nv-line__copy"><b>${escapeHtml(line.name)}</b>${line.option ? `<small>${escapeHtml(line.option)}</small>` : ''}</div></li>`).join('')}</ul>
    <div class="nv-hero__actions"><button type="button" class="nv-btn nv-btn--primary" data-whatsapp-again="${record.id}" data-magnetic>${roll(tr('Rouvrir WhatsApp', 'Reopen WhatsApp'))}<i aria-hidden="true">${ICON_ARROW}</i></button>${button('/informatique/boutique', tr('Retour à la boutique', 'Back to the store'), 'ghost')}</div>
  </div>`;
}

function projects() {
  const cases = [
    [tr('Systèmes et continuité', 'Systems and continuity'), tr('Des fondations numériques qui allègent le quotidien et donnent une ligne claire aux équipes.', 'Digital foundations that reduce complexity and bring clarity to teams.'), 'future/informatique-team.jpg', tr('INFORMATIQUE', 'IT'), '/informatique'],
    [tr('Présence de marque', 'Brand presence'), tr('Des supports fabriqués pour une identité qui se voit, se touche et se transmet.', 'Materials produced for an identity that can be seen, touched and shared.'), 'editorial/impression-grand-format.jpg', tr('IMPRIMERIE', 'PRINT'), '/imprimerie'],
    [tr('Compétences opérationnelles', 'Operational capability'), tr('Des formats d’apprentissage qui relient les outils à une pratique immédiate.', 'Learning formats that connect tools to immediate practice.'), 'editorial/formation-collaboration.jpg', 'ACADEMY', '/formation'],
    [tr('Projets institutionnels', 'Institutional projects'), tr('Des projets pour les organisations où coordination, lisibilité et confiance doivent tenir ensemble.', 'Projects for organizations where coordination, clarity and trust must work together.'), 'future/references-institutions.jpg', tr('RÉFÉRENCES', 'REFERENCES'), '/contact'],
  ];
  return shell(`<main class="nv-projects">
    <section class="nv-page-hero" data-hero>
      <div class="nv-hero__aurora" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="nv-hero__grid" aria-hidden="true"></div>
      <div class="nv-wrap nv-page-hero__layout">
        <div class="nv-hero__meta" data-nv="fade"><span>${tr('RÉALISATIONS', 'PROJECTS')}</span><span>${tr('CHAMPS D’ACTION', 'FIELDS OF ACTION')}</span><span>04 ${tr('DOSSIERS', 'CASES')}</span></div>
        ${sectionTitle(tr('Des projets conçus<br>pour <em>durer.</em>', 'Projects designed<br>to <em>last.</em>'), 'nv-page-hero__title', 'h1')}
        <p data-nv="up" style="--d:200ms">${tr('Un projet MIRS est la rencontre entre un objectif, un contexte et les équipes qui devront le faire vivre.', 'A MIRS project brings together an objective, a context and the teams who will make it work.')}</p>
      </div>
    </section>
    <section class="nv-cases nv-wrap">
      ${cases.map((item, index) => `<article class="nv-case ${index % 2 ? 'is-reversed' : ''} ${item[2].includes('references') ? 'is-sheet' : ''}">
        <a href="${pageHref(item[4])}" data-link class="nv-case__media" data-nv="clip" data-cursor="${tr('Ouvrir', 'Open')}"><img src="${AS}${item[2]}" alt="" loading="lazy" data-speed="-0.05"><span>0${index + 1}</span></a>
        <div class="nv-case__copy" data-nv="up"><small>${item[3]}</small><h2>${item[0]}</h2><p>${item[1]}</p>${button('/contact', tr('Parler d’un projet', 'Talk about a project'), 'ghost')}</div>
      </article>`).join('')}
    </section>
    <section class="nv-section nv-references"><div class="nv-wrap nv-head"><div>${eyebrow(tr('UNE CARTE DE CONFIANCE', 'A MAP OF TRUST'))}${sectionTitle(tr('Des identités qui nous<br>font <em>confiance.</em>', 'Organizations that<br>place <em>trust</em> in us.'))}</div><p data-nv="up">${tr('Une base concrète pour continuer à livrer des projets qui tiennent dans le temps.', 'A concrete foundation for continuing to deliver projects that last.')}</p></div>${logoBands()}</section>
    ${closingPortal(tr('Votre projet peut être le <em>prochain.</em>', 'Your project could be <em>next.</em>'), tr('Parlez-nous du point de départ. Nous chercherons la suite la plus juste.', 'Tell us where you are starting from. We will look for the most fitting next step.'), tr('Démarrer un projet', 'Start a project'))}
  </main>`, '/realisations');
}

function contact() {
  return shell(`<main class="nv-contact">
    <section class="nv-page-hero nv-contact-hero" data-hero>
      <div class="nv-hero__aurora" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="nv-hero__grid" aria-hidden="true"></div>
      <div class="nv-wrap nv-contact-hero__layout">
        <div>
          <div class="nv-hero__meta" data-nv="fade"><span>CONTACT</span><span>${tr('RÉPONSE SUR WHATSAPP', 'REPLY ON WHATSAPP')}</span></div>
          ${sectionTitle(tr('Discutons de vos objectifs et de la meilleure <em>réponse.</em>', 'Let’s discuss your objectives and the best <em>way forward.</em>'), 'nv-page-hero__title', 'h1')}
          <p data-nv="up" style="--d:200ms">${tr('Une question, une urgence ou un projet déjà défini : partagez votre contexte. Nous vous proposerons une première orientation adaptée.', 'A question, an urgent issue or a defined project: share your context. We will provide an initial, relevant direction.')}</p>
          <div class="nv-contact-links" data-nv="up" style="--d:300ms"><a href="tel:+224622051321" data-spot><small>${tr('Téléphone', 'Phone')}</small>+224 622 05 13 21</a><a href="https://wa.me/224622051321" target="_blank" rel="noreferrer" data-spot><small>WhatsApp</small>${tr('Écrire maintenant', 'Write now')} ↗</a></div>
        </div>
        <div class="nv-map" data-tilt aria-label="${tr('MIRS est basé à Conakry, Guinée', 'MIRS is based in Conakry, Guinea')}" role="img">
          <div class="nv-map__grid" aria-hidden="true"></div>
          <div class="nv-map__rings" aria-hidden="true"><i></i><i></i><i></i></div>
          <span class="nv-map__pin" aria-hidden="true"></span>
          <span class="nv-map__label" aria-hidden="true">MIRS<br>CONAKRY</span>
          <span class="nv-map__coords" aria-hidden="true">09° 31' N<br>13° 42' W</span>
          <span class="nv-map__time" aria-hidden="true"><i></i><b data-clock>--:--</b> GMT</span>
        </div>
      </div>
    </section>
    <section class="nv-section nv-wrap nv-contact-form-wrap">
      <div class="nv-contact-note" data-nv="up"><span>01</span><p>${tr('Le plus utile est souvent simple : quel objectif, pour quelle équipe, et pour quand ?', 'The most useful starting point is often simple: which objective, for which team, and by when?')}</p></div>
      <form class="nv-form" data-contact-form data-spot data-nv="up">
        <label class="nv-field"><input required name="name" autocomplete="name" placeholder=" "><span>${tr('Votre nom', 'Your name')}</span></label>
        <label class="nv-field"><input name="company" autocomplete="organization" placeholder=" "><span>${tr('Votre organisation', 'Your organization')}</span></label>
        <label class="nv-field"><input required type="email" name="email" autocomplete="email" placeholder=" "><span>${tr('Votre email', 'Your email')}</span></label>
        <label class="nv-field nv-field--select"><select name="topic"><option>${tr('Informatique', 'Information technology')}</option><option>${tr('Imprimerie', 'Print production')}</option><option>MIRS Academy</option><option>${tr('Création d’agence', 'Agency creation')}</option><option>${tr('Maintenance', 'Maintenance')}</option><option>${tr('Projet transversal', 'Cross-functional project')}</option></select><span>${tr('Votre sujet', 'Your topic')}</span></label>
        <label class="nv-field nv-field--wide"><textarea required name="message" rows="5" placeholder=" "></textarea><span>${tr('Votre point de départ', 'Your starting point')}</span></label>
        <div class="nv-form__submit"><button type="submit" class="nv-btn nv-btn--primary nv-btn--lg" data-magnetic>${roll(tr('Préparer le message WhatsApp', 'Prepare WhatsApp message'))}<i aria-hidden="true">${ICON_ARROW}</i></button><p data-form-status role="status" aria-live="polite">${tr('Nous ouvrirons WhatsApp avec votre demande préremplie.', 'We will open WhatsApp with a pre-filled request.')}</p></div>
      </form>
    </section>
  </main>`, '/contact');
}

function notFound() {
  return shell(`<main class="nv-404" data-hero>
    <canvas class="nv-hero__field" data-field aria-hidden="true"></canvas>
    <div class="nv-hero__grid" aria-hidden="true"></div>
    <div class="nv-wrap nv-404__inner">
      <b class="nv-404__code" data-glitch="404" aria-hidden="true">404</b>
      ${eyebrow(tr('SIGNAL INTROUVABLE', 'SIGNAL NOT FOUND'))}
      ${sectionTitle(tr('Cette page n’est pas <em>sur la carte.</em>', 'This page is not <em>on the map.</em>'), '', 'h1')}
      <p data-nv="up">${tr('Revenons à un terrain connu.', 'Let’s return to familiar ground.')}</p>
      <div data-nv="up">${button('/', tr('Retour à l’accueil', 'Back to home'), 'primary')}</div>
    </div>
  </main>`, '/404');
}

function persistCart() {
  try {
    localStorage.setItem('mirs-future-cart', JSON.stringify(state.cart));
  } catch {
    // The cart still works for this visit when storage is unavailable.
  }
}

function setCartOpen(open) {
  document.body.classList.toggle('cart-open', open);
}

let toastTimer = 0;
function showToast(message) {
  const toast = document.querySelector('[data-toast]');
  if (!toast) return;
  toast.innerHTML = `<i aria-hidden="true">${ICON_CHECK}</i><span>${message}</span>`;
  toast.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-on'), 2600);
}

function updateCartPresentation() {
  document.querySelectorAll('[data-cart-count]').forEach((node) => {
    node.textContent = cartCount();
    node.classList.remove('is-bump');
    requestAnimationFrame(() => node.classList.add('is-bump'));
  });
  const drawer = document.querySelector('[data-cart-drawer]');
  if (drawer) drawer.innerHTML = cartPanel();
  if (pageRoute() === '/checkout' && !document.querySelector('[data-checkout-done]')) renderRoute(location.pathname, { preserveScroll: true });
}

function addToCart(item) {
  const existing = state.cart.find((entry) => entry.key === item.key);
  if (existing) existing.qty = Math.min(999, existing.qty + item.qty);
  else state.cart.push(item);
  persistCart();
  updateCartPresentation();
  showToast(`${escapeHtml(item.name)} — ${tr('ajouté au panier', 'added to cart')}`);
}

function productCartItem(id, option, qty = 1) {
  const product = storeProducts.find((item) => item.id === id);
  if (!product) return null;
  const chosen = option || product.option?.values[0] || '';
  return { key: `store:${id}:${chosen}`, id, name: local(product.name), option: chosen, qty: Math.max(1, Math.min(999, Number(qty) || 1)), kind: 'store', icon: product.icon };
}

function updateEnrollSessions(dialog, preferred = '') {
  const slug = dialog.querySelector('[data-enroll-course]')?.value;
  const course = academyCourses.find((item) => item.slug === slug);
  const select = dialog.querySelector('[data-enroll-session]');
  if (!course || !select) return;
  const sessions = courseSessions(course);
  select.innerHTML = `${sessions.map((session) => `<option value="${session.date}" ${session.date === preferred ? 'selected' : ''}>${formatDate(session.date)} · ${session.place || 'Conakry'}</option>`).join('')}<option value="" ${!sessions.length ? 'selected' : ''}>${tr('Prochaine session disponible', 'Next available session')}</option>`;
}

function openEnroll(slug, session = '') {
  const dialog = document.querySelector('[data-enroll-dialog]');
  if (!dialog) return;
  const form = dialog.querySelector('[data-enroll-form]');
  const done = dialog.querySelector('[data-enroll-done]');
  form.hidden = false;
  done.hidden = true;
  const courseSelect = dialog.querySelector('[data-enroll-course]');
  if (courseSelect && slug) courseSelect.value = slug;
  updateEnrollSessions(dialog, session);
  dialog.showModal();
}

function dialogSuccess(container, title, text, record) {
  container.innerHTML = `<div class="nv-confirm nv-confirm--dialog"><span class="nv-confirm__icon" aria-hidden="true">${ICON_CHECK}</span><h2>${title}</h2><p>${text}</p><p class="nv-confirm__ref">${tr('Référence', 'Reference')} <b>${record.id}</b></p><div class="nv-hero__actions"><button type="button" class="nv-btn nv-btn--primary" data-whatsapp-again="${record.id}">${roll(tr('Rouvrir WhatsApp', 'Reopen WhatsApp'))}<i aria-hidden="true">${ICON_ARROW}</i></button><button type="button" class="nv-btn nv-btn--ghost" data-dialog-close>${roll(tr('Fermer', 'Close'))}<i aria-hidden="true">×</i></button></div></div>`;
  container.hidden = false;
}


function closeVideo() {
  const dialog = document.querySelector('[data-video-modal]');
  const body = document.querySelector('[data-video-body]');
  if (dialog?.open) dialog.close();
  if (body) body.innerHTML = '';
  if (activeVideoUrl) {
    URL.revokeObjectURL(activeVideoUrl);
    activeVideoUrl = null;
  }
}

async function repairVideoFromChunks(file, video) {
  const chunks = videoChunks[file];
  if (!chunks || video.dataset.repairing) return;
  video.dataset.repairing = 'true';
  try {
    const pieces = await Promise.all(chunks.map((chunk) => fetch(`${AS}video-chunks/${chunk}`).then((response) => {
      if (!response.ok) throw new Error(`Missing chunk ${chunk}`);
      return response.arrayBuffer();
    })));
    activeVideoUrl = URL.createObjectURL(new Blob(pieces, { type: 'video/mp4' }));
    video.src = activeVideoUrl;
    await video.play().catch(() => {});
  } catch {
    const caption = document.querySelector('[data-video-error]');
    if (caption) caption.hidden = false;
  }
}

function openVideo(file, title) {
  const dialog = document.querySelector('[data-video-modal]');
  const body = document.querySelector('[data-video-body]');
  if (!dialog || !body) return;
  closeVideo();
  const source = file.startsWith('mirs-media/') ? `${AS}${file}` : `${AS}video/${file}`;
  body.innerHTML = `<p class="video-kicker">${title || tr('MIRS en mouvement', 'MIRS in motion')}</p><video controls autoplay playsinline><source src="${source}" type="video/mp4"></video><p data-video-error hidden>${tr('La lecture n’est pas disponible dans ce navigateur.', 'Playback is not available in this browser.')}</p>`;
  const video = body.querySelector('video');
  video.addEventListener('error', () => repairVideoFromChunks(file, video), { once: true });
  dialog.showModal();
}

/* ---------------- Navigation & motion ---------------- */

const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => matchMedia('(hover: hover) and (pointer: fine)').matches;
const clamp01 = (value) => Math.min(1, Math.max(0, value));
let bootReady = Promise.resolve();
let scrollVelocity = 0;

function navigate(path, preserveScroll = false) {
  const target = new URL(path, location.href);
  if (target.origin !== location.origin) {
    location.href = target.href;
    return;
  }
  const targetPath = target.pathname;
  const samePage = targetPath === location.pathname;
  const go = () => {
    if (!samePage) history.pushState({}, '', target.href);
    renderRoute(targetPath, { preserveScroll: preserveScroll || (samePage && Boolean(target.hash)) });
    if (target.hash) requestAnimationFrame(() => document.getElementById(target.hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };
  const curtain = document.querySelector('[data-curtain]');
  if (samePage || !curtain || prefersReducedMotion()) {
    go();
    return;
  }
  curtain.classList.remove('is-out');
  curtain.classList.add('is-in');
  setTimeout(() => {
    go();
    curtain.classList.remove('is-in');
    curtain.classList.add('is-out');
  }, 560);
}

function splitWords(element) {
  if (element.dataset.splitDone) return;
  element.dataset.splitDone = 'true';
  const copy = element.cloneNode(true);
  copy.querySelectorAll('br').forEach((node) => node.replaceWith(' '));
  const label = copy.textContent.replace(/\s+/g, ' ').trim();
  let index = 0;
  const wrap = (content) => {
    const outer = document.createElement('span');
    outer.className = 'nv-w';
    const inner = document.createElement('span');
    inner.style.setProperty('--i', index++);
    inner.append(content);
    outer.append(inner);
    return outer;
  };
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const fragment = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) fragment.append(document.createTextNode(' '));
          else fragment.append(wrap(document.createTextNode(part)));
        });
        child.replaceWith(fragment);
      } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') {
        if (child.hasAttribute('data-count')) child.replaceWith(wrap(child.cloneNode(true)));
        else walk(child);
      }
    });
  };
  walk(element);
  element.setAttribute('aria-label', label);
  [...element.children].forEach((child) => child.setAttribute('aria-hidden', 'true'));
}

function splitScrub(element) {
  if (element.dataset.scrubDone) return [];
  element.dataset.scrubDone = 'true';
  const words = element.textContent.trim().split(/\s+/);
  element.setAttribute('aria-label', words.join(' '));
  element.innerHTML = words.map((word) => `<span class="nv-s" aria-hidden="true">${word}</span>`).join(' ');
  return [...element.querySelectorAll('.nv-s')];
}

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_#';
function scramble(element, finalText = element.dataset.original || element.textContent) {
  if (prefersReducedMotion()) {
    element.textContent = finalText;
    return;
  }
  element.dataset.original = element.dataset.original || element.textContent;
  cancelAnimationFrame(Number(element.dataset.scrambleFrame || 0));
  const length = finalText.length;
  let frame = 0;
  const total = Math.max(14, length * 2);
  const step = () => {
    const settled = Math.floor((frame / total) * length);
    element.textContent = finalText.split('').map((char, position) => {
      if (position < settled || char === ' ') return char;
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }).join('');
    frame += 1;
    if (frame <= total) element.dataset.scrambleFrame = String(requestAnimationFrame(step));
    else element.textContent = finalText;
  };
  step();
}

function animateCount(element) {
  const target = Number(element.dataset.count || 0);
  const pad = Number(element.dataset.pad || 0);
  const format = (value) => String(value).padStart(pad, '0');
  if (prefersReducedMotion()) {
    element.textContent = format(target);
    return;
  }
  const start = performance.now();
  const duration = 1700;
  const tick = (now) => {
    const t = clamp01((now - start) / duration);
    const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    element.textContent = format(Math.round(target * eased));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function startField(canvas, signal) {
  const context = canvas.getContext('2d');
  if (!context) return;
  const reduce = prefersReducedMotion();
  let width = 0;
  let height = 0;
  let points = [];
  let frame = 0;
  let visible = true;
  let colors = ['#00ccff', '#3d4bff'];
  const pointer = { x: -9999, y: -9999 };
  const readColors = () => {
    const style = getComputedStyle(canvas);
    colors = [style.getPropertyValue('--field-a').trim() || '#00ccff', style.getPropertyValue('--field-b').trim() || '#3d4bff'];
  };
  const resize = () => {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(120, Math.floor((width * height) / 13000));
    points = Array.from({ length: count }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      r: Math.random() * 1.6 + 0.6,
      c: index % 3 === 0 ? 1 : 0,
    }));
    readColors();
  };
  const draw = () => {
    context.clearRect(0, 0, width, height);
    const linkDistance = Math.min(150, width / 8);
    for (let i = 0; i < points.length; i += 1) {
      const point = points[i];
      if (!reduce) {
        const dx = point.x - pointer.x;
        const dy = point.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 170 && distance > 0.1) {
          point.vx += (dx / distance) * 0.035;
          point.vy += (dy / distance) * 0.035;
        }
        point.vx *= 0.985;
        point.vy *= 0.985;
        if (Math.abs(point.vx) < 0.08) point.vx += (Math.random() - 0.5) * 0.04;
        if (Math.abs(point.vy) < 0.08) point.vy += (Math.random() - 0.5) * 0.04;
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < -20) point.x = width + 20;
        if (point.x > width + 20) point.x = -20;
        if (point.y < -20) point.y = height + 20;
        if (point.y > height + 20) point.y = -20;
      }
      for (let j = i + 1; j < points.length; j += 1) {
        const other = points[j];
        const distance = Math.hypot(point.x - other.x, point.y - other.y);
        if (distance < linkDistance) {
          context.globalAlpha = (1 - distance / linkDistance) * 0.32;
          context.strokeStyle = colors[point.c];
          context.lineWidth = 0.7;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }
      const near = Math.hypot(point.x - pointer.x, point.y - pointer.y) < 140;
      context.globalAlpha = near ? 1 : 0.75;
      context.fillStyle = colors[point.c];
      context.beginPath();
      context.arc(point.x, point.y, near ? point.r * 1.8 : point.r, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;
  };
  const loop = () => {
    if (signal.aborted) return;
    frame += 1;
    if (frame % 90 === 0) readColors();
    if (visible && !document.hidden) draw();
    requestAnimationFrame(loop);
  };
  resize();
  if (reduce) {
    draw();
    return;
  }
  const host = canvas.parentElement;
  host.addEventListener('pointermove', (event) => {
    const bounds = canvas.getBoundingClientRect();
    pointer.x = event.clientX - bounds.left;
    pointer.y = event.clientY - bounds.top;
  }, { signal });
  host.addEventListener('pointerleave', () => { pointer.x = -9999; pointer.y = -9999; }, { signal });
  addEventListener('resize', resize, { signal });
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
  observer.observe(canvas);
  signal.addEventListener('abort', () => observer.disconnect(), { once: true });
  requestAnimationFrame(loop);
}

function positionFilterPill() {
  const pill = document.querySelector('[data-filter-pill]');
  const active = document.querySelector('[data-filter].is-active');
  if (!pill || !active) return;
  pill.style.width = `${active.offsetWidth}px`;
  pill.style.transform = `translateX(${active.offsetLeft}px)`;
}

function setupMotion(signal) {
  const reduce = prefersReducedMotion();
  document.querySelectorAll('[data-split]').forEach(splitWords);
  const scrubGroups = [...document.querySelectorAll('[data-scrub]')].map((element) => ({ element, words: splitScrub(element) }));
  const revealTargets = [...document.querySelectorAll('[data-nv], [data-split], [data-count], [data-scramble-in]')];

  if (reduce || !('IntersectionObserver' in window)) {
    revealTargets.forEach((target) => target.classList.add('is-in'));
    scrubGroups.forEach(({ words }) => words.forEach((word) => { word.style.opacity = 1; }));
  } else {
    bootReady.then(() => {
      if (signal.aborted) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target;
          target.classList.add('is-in');
          if (target.hasAttribute('data-count')) animateCount(target);
          target.querySelectorAll?.('[data-count]').forEach(animateCount);
          if (target.hasAttribute('data-scramble-in')) scramble(target);
          observer.unobserve(target);
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -6%' });
      revealTargets.forEach((target) => observer.observe(target));
      signal.addEventListener('abort', () => observer.disconnect(), { once: true });
    });
  }

  // Scroll-linked state: progress meter, header, parallax, progress vars, pinned films, stacked cards.
  const meter = document.querySelector('[data-scroll-meter]');
  const headerNode = document.querySelector('[data-header]');
  const depthTargets = reduce ? [] : [...document.querySelectorAll('[data-speed]')];
  const progressTargets = [...document.querySelectorAll('[data-progress]')];
  const stackCards = [...document.querySelectorAll('[data-stack]')];
  const hscroll = document.querySelector('[data-hscroll]');
  const hTrack = hscroll?.querySelector('[data-hscroll-track]');
  const hBar = hscroll?.querySelector('[data-hscroll-bar]');
  let hDistance = 0;
  let lastY = scrollY;
  let ticking = false;

  const measure = () => {
    if (!hscroll || !hTrack) return;
    const pinned = !reduce && innerWidth > 900;
    hscroll.classList.toggle('is-pinned', pinned);
    if (!pinned) {
      hscroll.style.height = '';
      hTrack.style.transform = '';
      hDistance = 0;
      return;
    }
    hDistance = Math.max(0, hTrack.scrollWidth - hTrack.clientWidth);
    hscroll.style.height = `${hDistance + innerHeight}px`;
  };

  const update = () => {
    const y = scrollY;
    const vh = innerHeight;
    const scrollable = document.documentElement.scrollHeight - vh;
    if (meter) meter.style.transform = `scaleX(${scrollable > 0 ? y / scrollable : 0})`;
    if (headerNode) {
      headerNode.classList.toggle('is-scrolled', y > 24);
      if (!document.body.classList.contains('menu-open')) {
        if (y > 160 && y > lastY + 6) headerNode.classList.add('is-hidden');
        else if (y < lastY - 6 || y < 160) headerNode.classList.remove('is-hidden');
      }
    }
    scrollVelocity += (y - lastY) * 0.12;
    lastY = y;

    depthTargets.forEach((target) => {
      const bounds = (target.parentElement || target).getBoundingClientRect();
      if (bounds.bottom < -200 || bounds.top > vh + 200) return;
      const offset = (bounds.top + bounds.height / 2 - vh / 2) * Number(target.dataset.speed || 0);
      target.style.setProperty('--py', `${offset.toFixed(1)}px`);
    });

    progressTargets.forEach((target) => {
      const bounds = target.getBoundingClientRect();
      const mode = target.dataset.progress;
      const value = mode === 'enter'
        ? clamp01((vh - bounds.top) / (vh * 0.95))
        : clamp01((vh - bounds.top) / (vh + bounds.height));
      target.style.setProperty('--p', value.toFixed(4));
    });

    scrubGroups.forEach(({ element, words }) => {
      if (reduce) return;
      const bounds = element.getBoundingClientRect();
      const progress = clamp01((vh * 0.88 - bounds.top) / (bounds.height + vh * 0.38));
      const lit = progress * words.length;
      words.forEach((word, index) => {
        const value = clamp01(lit - index);
        const opacity = (0.16 + value * 0.84).toFixed(2);
        if (word.style.opacity !== opacity) word.style.opacity = opacity;
      });
    });

    if (hscroll && hTrack && hDistance > 0) {
      const bounds = hscroll.getBoundingClientRect();
      const progress = clamp01(-bounds.top / Math.max(1, bounds.height - vh));
      hTrack.style.transform = `translate3d(${(-progress * hDistance).toFixed(1)}px, 0, 0)`;
      if (hBar) hBar.style.transform = `scaleX(${progress})`;
    }

    stackCards.forEach((card, index) => {
      const next = stackCards[index + 1];
      if (!next || reduce) return;
      const bounds = card.getBoundingClientRect();
      const nextBounds = next.getBoundingClientRect();
      const covered = clamp01(1 - (nextBounds.top - bounds.top) / Math.max(1, bounds.height));
      card.style.setProperty('--q', covered.toFixed(3));
    });
    ticking = false;
  };
  const requestUpdate = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };
  addEventListener('scroll', requestUpdate, { passive: true, signal });
  addEventListener('resize', () => { measure(); positionFilterPill(); requestUpdate(); }, { signal });
  measure();
  positionFilterPill();
  requestUpdate();
  // Images can change the measured width of the film track after load.
  hTrack?.querySelectorAll('video').forEach((video) => video.addEventListener('loadedmetadata', () => { measure(); requestUpdate(); }, { once: true, signal }));

  // Hero particle fields.
  document.querySelectorAll('[data-field]').forEach((canvas) => startField(canvas, signal));

  // Ambient hero video only plays while visible and when motion is welcome.
  document.querySelectorAll('[data-ambient]').forEach((video) => {
    if (reduce) {
      video.removeAttribute('autoplay');
      video.pause();
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    signal.addEventListener('abort', () => observer.disconnect(), { once: true });
  });

  // Live Conakry clock (GMT) and the cycling capability badge.
  const clocks = [...document.querySelectorAll('[data-clock]')];
  if (clocks.length) {
    const tickClock = () => {
      const value = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Conakry' }).format(new Date());
      clocks.forEach((clock) => { clock.textContent = value; });
    };
    tickClock();
    const timer = setInterval(tickClock, 20000);
    signal.addEventListener('abort', () => clearInterval(timer), { once: true });
  }
  document.querySelectorAll('[data-cycle]').forEach((element) => {
    let words = [];
    try { words = JSON.parse(element.dataset.cycle); } catch { words = []; }
    if (words.length < 2 || reduce) return;
    let index = 0;
    const timer = setInterval(() => {
      index = (index + 1) % words.length;
      element.dataset.original = words[index];
      scramble(element, words[index]);
    }, 2600);
    signal.addEventListener('abort', () => clearInterval(timer), { once: true });
  });

  if (reduce) return;

  // Pointer-driven details: spotlight, tilt, magnetic buttons, scramble, previews.
  document.querySelectorAll('[data-spot]').forEach((target) => {
    target.addEventListener('pointermove', (event) => {
      const bounds = target.getBoundingClientRect();
      target.style.setProperty('--sx', `${event.clientX - bounds.left}px`);
      target.style.setProperty('--sy', `${event.clientY - bounds.top}px`);
    }, { signal });
  });

  document.querySelectorAll('[data-tilt]').forEach((target) => {
    target.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;
      const bounds = target.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      target.style.setProperty('--tilt-x', `${(x * 7).toFixed(2)}deg`);
      target.style.setProperty('--tilt-y', `${(y * -7).toFixed(2)}deg`);
    }, { signal });
    target.addEventListener('pointerleave', () => {
      target.style.removeProperty('--tilt-x');
      target.style.removeProperty('--tilt-y');
    }, { signal });
  });

  if (finePointer()) {
    document.querySelectorAll('[data-magnetic]').forEach((target) => {
      target.addEventListener('pointermove', (event) => {
        const bounds = target.getBoundingClientRect();
        const x = event.clientX - bounds.left - bounds.width / 2;
        const y = event.clientY - bounds.top - bounds.height / 2;
        target.style.setProperty('--gx', `${(x * 0.22).toFixed(1)}px`);
        target.style.setProperty('--gy', `${(y * 0.32).toFixed(1)}px`);
      }, { signal });
      target.addEventListener('pointerleave', () => {
        target.style.removeProperty('--gx');
        target.style.removeProperty('--gy');
      }, { signal });
    });

    document.querySelectorAll('[data-scramble]').forEach((target) => {
      target.addEventListener('pointerenter', () => scramble(target), { signal });
    });

    document.querySelectorAll('[data-preview]').forEach((video) => {
      const host = video.closest('.nv-film');
      host?.addEventListener('pointerenter', () => video.play().catch(() => {}), { signal });
      host?.addEventListener('pointerleave', () => video.pause(), { signal });
    });

    document.querySelectorAll('[data-hoverlist]').forEach((list) => {
      const preview = list.querySelector('.nv-hoverlist__preview');
      const images = [...(preview?.querySelectorAll('img') || [])];
      const rows = [...list.querySelectorAll('.nv-hoverlist__row')];
      if (!preview) return;
      let targetX = 0;
      let targetY = 0;
      let x = 0;
      let y = 0;
      let active = false;
      const follow = () => {
        if (signal.aborted || !active) return;
        x += (targetX - x) * 0.14;
        y += (targetY - y) * 0.14;
        preview.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${((targetX - x) * 0.05).toFixed(2)}deg)`;
        requestAnimationFrame(follow);
      };
      list.addEventListener('pointermove', (event) => {
        const bounds = list.getBoundingClientRect();
        targetX = event.clientX - bounds.left;
        targetY = event.clientY - bounds.top;
        if (!active) {
          x = targetX;
          y = targetY;
          active = true;
          requestAnimationFrame(follow);
        }
      }, { signal });
      rows.forEach((row, index) => row.addEventListener('pointerenter', () => {
        preview.classList.add('is-on');
        images.forEach((image, imageIndex) => image.classList.toggle('is-active', imageIndex === index));
      }, { signal }));
      list.addEventListener('pointerleave', () => {
        preview.classList.remove('is-on');
        active = false;
      }, { signal });
    });
  }
}

/* One-time chrome that survives route changes: cursor, curtain, velocity skew. */
function setupGlobalChrome() {
  const curtain = document.createElement('div');
  curtain.className = 'nv-curtain';
  curtain.dataset.curtain = '';
  curtain.setAttribute('aria-hidden', 'true');
  curtain.innerHTML = '<span></span><span></span><b>MIRS</b>';
  document.body.append(curtain);

  if (prefersReducedMotion()) return;
  const root = document.documentElement;
  const loop = () => {
    scrollVelocity *= 0.9;
    const skew = Math.max(-7, Math.min(7, scrollVelocity));
    root.style.setProperty('--skew', `${skew.toFixed(2)}deg`);
    root.style.setProperty('--velocity', Math.min(1, Math.abs(scrollVelocity) / 6).toFixed(3));
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  if (!finePointer()) return;
  const cursor = document.createElement('div');
  cursor.className = 'nv-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<span class="nv-cursor__ring"><b></b></span><span class="nv-cursor__dot"></span>';
  document.body.append(cursor);
  root.classList.add('has-cursor');
  const ring = cursor.querySelector('.nv-cursor__ring');
  const dot = cursor.querySelector('.nv-cursor__dot');
  const label = cursor.querySelector('b');
  let targetX = innerWidth / 2;
  let targetY = innerHeight / 2;
  let x = targetX;
  let y = targetY;
  addEventListener('pointermove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    cursor.classList.add('is-visible');
  }, { passive: true });
  document.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
  addEventListener('pointerover', (event) => {
    const labelled = event.target.closest?.('[data-cursor]');
    const interactive = event.target.closest?.('a, button, [data-magnetic], input, select, textarea, label');
    const onAdmin = Boolean(event.target.closest?.('.route-admin'));
    cursor.classList.toggle('is-off', onAdmin);
    cursor.classList.toggle('is-label', Boolean(labelled));
    cursor.classList.toggle('is-hover', Boolean(interactive) && !labelled);
    if (labelled) label.textContent = labelled.dataset.cursor;
  });
  addEventListener('pointerdown', () => cursor.classList.add('is-down'));
  addEventListener('pointerup', () => cursor.classList.remove('is-down'));
  const follow = () => {
    x += (targetX - x) * 0.18;
    y += (targetY - y) * 0.18;
    ring.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    requestAnimationFrame(follow);
  };
  requestAnimationFrame(follow);
}

function runLoader() {
  return new Promise((resolve) => {
    let seen = false;
    try { seen = sessionStorage.getItem('mirs-nova-loaded') === 'true'; } catch { seen = false; }
    if (seen || prefersReducedMotion() || pageRoute() === '/admin') {
      resolve();
      return;
    }
    try { sessionStorage.setItem('mirs-nova-loaded', 'true'); } catch { /* Private mode: the loader simply replays. */ }
    const loader = document.createElement('div');
    loader.className = 'nv-loader';
    loader.setAttribute('aria-hidden', 'true');
    loader.innerHTML = `<div class="nv-loader__grid"></div>
      <div class="nv-loader__core">${brandMark()}<span class="nv-loader__orbit"></span><span class="nv-loader__orbit nv-loader__orbit--b"></span></div>
      <div class="nv-loader__meta"><span>MIRS / SPATIAL SYSTEMS</span><span>${tr('INITIALISATION DU SYSTÈME', 'SYSTEM BOOT')}</span></div>
      <div class="nv-loader__count"><b data-loader-count>000</b><span>%</span></div>
      <div class="nv-loader__bar"><span data-loader-bar></span></div>
      <div class="nv-loader__words"><span>${tr('CONCEVOIR', 'DESIGN')}</span><span>${tr('DÉPLOYER', 'DEPLOY')}</span><span>${tr('ACCOMPAGNER', 'SUPPORT')}</span></div>`;
    document.body.append(loader);
    const count = loader.querySelector('[data-loader-count]');
    const bar = loader.querySelector('[data-loader-bar]');
    const start = performance.now();
    const duration = 1650;
    const tick = (now) => {
      const t = clamp01((now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      count.textContent = String(Math.round(eased * 100)).padStart(3, '0');
      bar.style.transform = `scaleX(${eased})`;
      if (t < 1) {
        requestAnimationFrame(tick);
        return;
      }
      loader.classList.add('is-done');
      setTimeout(resolve, 420);
      setTimeout(() => loader.remove(), 1400);
    };
    requestAnimationFrame(tick);
  });
}

const formValue = (form, name) => String(new FormData(form).get(name) || '').trim();

function applySkuFilters() {
  const active = document.querySelector('[data-filter-scope="sku"].is-active')?.dataset.filter || 'all';
  const query = searchKey(document.querySelector('[data-store-search]')?.value);
  let shown = 0;
  document.querySelectorAll('[data-sku]').forEach((card) => {
    const visible = (active === 'all' || card.dataset.category === active) && (!query || card.dataset.name.includes(query));
    card.hidden = !visible;
    if (visible) shown += 1;
  });
  const count = document.querySelector('[data-store-count]');
  if (count) count.textContent = `${shown} ${tr('produits', 'products')}`;
  const empty = document.querySelector('[data-store-empty]');
  if (empty) empty.hidden = shown > 0;
}

function rerenderAdmin() {
  renderRoute(location.pathname, { preserveScroll: true });
}

function bind() {
  routeAbort?.abort();
  routeAbort = new AbortController();
  const { signal } = routeAbort;
  const root = document.getElementById('app');

  root.addEventListener('click', (event) => {
    const target = event.target;
    const routeLink = target.closest('[data-link]');
    if (routeLink && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
      event.preventDefault();
      setCartOpen(false);
      document.body.classList.remove('menu-open', 'admin-menu-open');
      target.closest('dialog')?.close();
      navigate(routeLink.getAttribute('href'));
      return;
    }
    const anchorLink = target.closest('[data-anchor]');
    if (anchorLink) {
      event.preventDefault();
      const id = anchorLink.dataset.anchor;
      document.body.classList.remove('menu-open');
      if (pageRoute() !== '/') navigate(`${pageHref('/')}#${id}`);
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const hashLink = target.closest('a[href^="#"]');
    if (hashLink && hashLink.getAttribute('href').length > 1) {
      event.preventDefault();
      document.getElementById(hashLink.getAttribute('href').slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (target.closest('[data-totop]')) {
      scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      return;
    }
    if (target.closest('button[data-theme]')) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('mirs-future-theme', state.theme); } catch { /* theme still applies */ }
      document.documentElement.dataset.theme = state.theme;
      return;
    }
    const menuButton = target.closest('[data-menu]');
    if (menuButton) {
      const open = document.body.classList.toggle('menu-open');
      menuButton.setAttribute('aria-expanded', String(open));
      document.querySelector('[data-header]')?.classList.remove('is-hidden');
      return;
    }
    if (target.closest('[data-cart]')) {
      setCartOpen(true);
      return;
    }
    if (target.closest('[data-close-cart]')) {
      setCartOpen(false);
      return;
    }
    if (target.closest('[data-dialog-close]')) {
      target.closest('dialog')?.close();
      return;
    }
    const add = target.closest('[data-add]');
    if (add) {
      const kind = add.dataset.addKind || (pageRoute().startsWith('/imprimerie') ? 'print' : 'brief');
      addToCart({ key: `${kind}:${add.dataset.add}`, name: add.dataset.add, qty: 1, kind });
      return;
    }
    const addProduct = target.closest('[data-add-product]');
    if (addProduct) {
      const item = productCartItem(addProduct.dataset.addProduct);
      if (item) addToCart(item);
      return;
    }
    const step = target.closest('[data-step]');
    if (step) {
      const input = step.parentElement.querySelector('input[name="qty"]');
      if (input) input.value = String(Math.max(1, Math.min(999, (Number(input.value) || 1) + Number(step.dataset.step))));
      return;
    }
    const qty = target.closest('[data-cart-qty]');
    if (qty) {
      const [index, delta] = qty.dataset.cartQty.split(':').map(Number);
      const line = state.cart[index];
      if (line) {
        line.qty = Math.max(1, Math.min(999, line.qty + delta));
        persistCart();
        updateCartPresentation();
      }
      return;
    }
    const remove = target.closest('[data-remove]');
    if (remove) {
      state.cart.splice(Number(remove.dataset.remove), 1);
      persistCart();
      updateCartPresentation();
      return;
    }
    const filter = target.closest('[data-filter]');
    if (filter) {
      const value = filter.dataset.filter;
      const scope = filter.dataset.filterScope || 'product';
      filter.parentElement.querySelectorAll('[data-filter]').forEach((node) => node.classList.toggle('is-active', node === filter));
      if (scope === 'sku') applySkuFilters();
      else {
        const selector = scope === 'course' ? '[data-course-card]' : '[data-product-card]';
        document.querySelectorAll(selector).forEach((card) => { card.hidden = value !== 'all' && card.dataset.category !== value; });
      }
      positionFilterPill();
      return;
    }
    const logosMore = target.closest('[data-logos-more]');
    if (logosMore) {
      logosMore.closest('.nv-wall-wrap')?.querySelectorAll('[data-logo-extra]').forEach((item) => { item.hidden = false; });
      logosMore.remove();
      return;
    }
    const enroll = target.closest('[data-enroll]');
    if (enroll) {
      openEnroll(enroll.dataset.enroll, enroll.dataset.session || '');
      return;
    }
    if (target.closest('[data-urgent-open]')) {
      const dialog = document.querySelector('[data-urgent-dialog]');
      if (dialog) {
        dialog.querySelector('[data-urgent-form]').hidden = false;
        dialog.querySelector('[data-urgent-done]').hidden = true;
        dialog.showModal();
      }
      return;
    }
    const again = target.closest('[data-whatsapp-again]');
    if (again) {
      const record = adminData().requests.find((item) => item.id === again.dataset.whatsappAgain);
      if (record?.message) openWhatsApp(record.message);
      return;
    }
    const video = target.closest('[data-video]');
    if (video) {
      openVideo(video.dataset.video, video.dataset.videoTitle);
      return;
    }
    if (target.closest('[data-close-video]')) {
      closeVideo();
      return;
    }

    /* ---- Administration ---- */
    if (target.closest('[data-admin-logout]')) {
      adminLogout();
      state.adminView = 'home';
      rerenderAdmin();
      return;
    }
    if (target.closest('[data-admin-menu]')) {
      document.body.classList.toggle('admin-menu-open');
      return;
    }
    const adminViewButton = target.closest('[data-admin-view]');
    if (adminViewButton) {
      state.adminView = adminViewButton.dataset.adminView || 'home';
      document.body.classList.remove('admin-menu-open');
      renderRoute(location.pathname);
      return;
    }
    const typeFilter = target.closest('[data-admin-type-filter]');
    if (typeFilter) {
      const value = typeFilter.dataset.adminTypeFilter;
      typeFilter.parentElement.querySelectorAll('button').forEach((node) => node.classList.toggle('is-active', node === typeFilter));
      document.querySelectorAll('[data-admin-row="requests"]').forEach((row) => { row.hidden = value !== 'all' && row.dataset.type !== value; });
      return;
    }
    const exportButton = target.closest('[data-admin-export]');
    if (exportButton) {
      exportRequests(exportButton.dataset.adminExport);
      return;
    }
    const courseToggle = target.closest('[data-admin-toggle-course]');
    if (courseToggle) {
      const data = adminData();
      const slug = courseToggle.dataset.adminToggleCourse;
      const published = data.courses[slug]?.status !== 'draft';
      data.courses[slug] = { ...(data.courses[slug] || {}), status: published ? 'draft' : 'published' };
      saveAdminData(data);
      rerenderAdmin();
      return;
    }
    const productToggle = target.closest('[data-admin-toggle-product]');
    if (productToggle) {
      const data = adminData();
      const key = productToggle.dataset.adminToggleProduct;
      data.inventory[key] = data.inventory[key] === false;
      saveAdminData(data);
      rerenderAdmin();
      return;
    }
    const removeSession = target.closest('[data-admin-remove-session]');
    if (removeSession) {
      const data = adminData();
      data.extraSessions = data.extraSessions.filter((session) => session.id !== removeSession.dataset.adminRemoveSession);
      saveAdminData(data);
      rerenderAdmin();
      return;
    }
    const mediaToggle = target.closest('[data-admin-toggle-media]');
    if (mediaToggle) {
      const data = adminData();
      const media = data.media.find((item) => item.id === mediaToggle.dataset.adminToggleMedia);
      if (media) media.status = media.status === 'published' ? 'draft' : 'published';
      saveAdminData(data);
      rerenderAdmin();
      return;
    }
    const adminEdit = target.closest('[data-admin-edit="content"]');
    const adminAction = target.closest('[data-admin-action]');
    if (adminEdit || adminAction?.dataset.adminAction === 'new-content') {
      const dialog = document.querySelector('[data-admin-dialog]');
      const form = dialog?.querySelector('[data-admin-content-form]');
      if (!dialog || !form) return;
      form.reset();
      const record = adminEdit ? adminData().content.find((item) => item.id === adminEdit.dataset.adminId) : null;
      form.elements.id.value = record?.id || '';
      form.elements.areaFr.value = record?.area.fr || '';
      form.elements.areaEn.value = record?.area.en || '';
      form.elements.titleFr.value = record?.title.fr || '';
      form.elements.titleEn.value = record?.title.en || '';
      form.elements.status.value = record?.status || 'draft';
      dialog.showModal();
      return;
    }
    if (adminAction?.dataset.adminAction === 'reset') {
      if (window.confirm(tr('Réinitialiser les données locales du dashboard ?', 'Reset local dashboard data?'))) {
        saveAdminData(adminSeed());
        rerenderAdmin();
      }
    }
  }, { signal });

  root.addEventListener('input', (event) => {
    const target = event.target;
    if (target.matches('[data-store-search]')) {
      applySkuFilters();
      return;
    }
    if (target.matches('[data-range]')) {
      const output = target.closest('form')?.querySelector(`[data-range-out="${target.name}"]`);
      if (output) output.textContent = target.value;
      return;
    }
    const search = target.closest('[data-admin-search]');
    if (!search) return;
    const value = search.value.trim().toLowerCase();
    root.querySelectorAll(`[data-admin-row="${search.dataset.adminSearch}"]`).forEach((row) => {
      row.hidden = Boolean(value) && !row.dataset.searchText.includes(value);
    });
  }, { signal });

  root.addEventListener('change', (event) => {
    const target = event.target;
    if (target.matches('[data-enroll-course]')) {
      updateEnrollSessions(target.closest('dialog'));
      return;
    }
    if (target.matches('[data-delivery]')) {
      const address = target.closest('form')?.querySelector('[data-address]');
      if (address) {
        address.hidden = target.dataset.delivery === 'pickup';
        address.querySelector('input').required = !address.hidden;
      }
      return;
    }
    const statusSelect = target.closest('[data-admin-request-status]');
    if (statusSelect) {
      const data = adminData();
      const request = data.requests.find((item) => item.id === statusSelect.dataset.adminRequestStatus);
      if (request) {
        request.status = statusSelect.value;
        request.updated = todayStamp();
      }
      saveAdminData(data);
      rerenderAdmin();
      return;
    }
    const setting = target.closest('[data-admin-setting]');
    if (setting) {
      const data = adminData();
      data.settings[setting.dataset.adminSetting] = setting.checked;
      saveAdminData(data);
      rerenderAdmin();
    }
  }, { signal });

  root.addEventListener('submit', (event) => {
    const form = event.target;

    if (form.matches('[data-product-form]')) {
      event.preventDefault();
      const item = productCartItem(form.dataset.productForm, formValue(form, 'option'), formValue(form, 'qty'));
      if (!item) return;
      addToCart(item);
      if (event.submitter?.hasAttribute('data-buy-now')) navigate(pageHref('/checkout'));
      return;
    }

    if (form.matches('[data-checkout-form]')) {
      event.preventDefault();
      if (!state.cart.length) return;
      const lines = state.cart.map((item) => ({ name: item.name, option: item.option || '', qty: item.qty, kind: item.kind }));
      const id = makeReference('CMD');
      const delivery = formValue(form, 'delivery');
      const message = [
        `🛒 ${tr('COMMANDE', 'ORDER')} ${id}`,
        `${tr('Client', 'Customer')} : ${formValue(form, 'name')}${formValue(form, 'company') ? ` — ${formValue(form, 'company')}` : ''}`,
        `${tr('Téléphone', 'Phone')} : ${formValue(form, 'phone')}`,
        formValue(form, 'email') ? `Email : ${formValue(form, 'email')}` : '',
        `${tr('Remise', 'Handover')} : ${delivery}${formValue(form, 'address') ? ` — ${formValue(form, 'address')}` : ''}`,
        '',
        ...lines.map((line) => `• ${line.qty} × ${line.name}${line.option ? ` (${line.option})` : ''}`),
        '',
        formValue(form, 'note') ? `${tr('Précisions', 'Details')} : ${formValue(form, 'note')}` : '',
        tr('Merci de m’envoyer le devis.', 'Please send me the quote.'),
      ].filter((line, index, all) => line !== '' || (index > 0 && all[index - 1] !== '')).join('\n').replace(/\n{3,}/g, '\n\n');
      const record = recordRequest({ id, type: 'order', customer: formValue(form, 'name') + (formValue(form, 'company') ? ` · ${formValue(form, 'company')}` : ''), phone: formValue(form, 'phone'), email: formValue(form, 'email'), service: tr('Boutique', 'Store'), detail: `${delivery}${formValue(form, 'address') ? ` — ${formValue(form, 'address')}` : ''}${formValue(form, 'note') ? ` · ${formValue(form, 'note')}` : ''}`, lines, message });
      openWhatsApp(message);
      state.cart = [];
      persistCart();
      document.querySelectorAll('[data-cart-count]').forEach((node) => { node.textContent = '0'; });
      const drawer = document.querySelector('[data-cart-drawer]');
      if (drawer) drawer.innerHTML = cartPanel();
      const container = document.querySelector('[data-checkout]');
      if (container) {
        container.innerHTML = `<div data-checkout-done>${orderConfirmation(record)}</div>`;
        document.querySelector('.nv-steps')?.querySelectorAll('li').forEach((node) => { node.className = 'is-done'; });
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    if (form.matches('[data-enroll-form]')) {
      event.preventDefault();
      const course = academyCourses.find((item) => item.slug === formValue(form, 'course'));
      if (!course) return;
      const session = formValue(form, 'session');
      const id = makeReference('INS');
      const seats = Number(formValue(form, 'seats')) || 1;
      const message = [
        `🎓 ${tr('INSCRIPTION', 'REGISTRATION')} ${id} — MIRS Academy`,
        `${tr('Parcours', 'Pathway')} : ${local(course.name)}`,
        `Session : ${session ? formatDate(session) : tr('prochaine session disponible', 'next available session')}`,
        `${tr('Participant(s)', 'Participant(s)')} : ${seats}`,
        `${tr('Nom', 'Name')} : ${formValue(form, 'name')}${formValue(form, 'company') ? ` — ${formValue(form, 'company')}` : ''}`,
        `${tr('Téléphone', 'Phone')} : ${formValue(form, 'phone')}`,
        formValue(form, 'email') ? `Email : ${formValue(form, 'email')}` : '',
        `${tr('Financement', 'Funding')} : ${formValue(form, 'funding')}`,
        formValue(form, 'note') ? `${tr('Remarques', 'Notes')} : ${formValue(form, 'note')}` : '',
      ].filter(Boolean).join('\n');
      const record = recordRequest({ id, type: 'enrolment', customer: formValue(form, 'name') + (formValue(form, 'company') ? ` · ${formValue(form, 'company')}` : ''), phone: formValue(form, 'phone'), email: formValue(form, 'email'), service: 'MIRS Academy', course: course.slug, courseName: local(course.name), session, seats, detail: `${local(course.name)} · ${seats} ${tr('participant(s)', 'participant(s)')} · ${formValue(form, 'funding')}${formValue(form, 'note') ? ` · ${formValue(form, 'note')}` : ''}`, message });
      openWhatsApp(message);
      form.hidden = true;
      dialogSuccess(form.closest('dialog').querySelector('[data-enroll-done]'), tr('Demande d’inscription <em>envoyée.</em>', 'Registration request <em>sent.</em>'), tr(`MIRS confirme votre place pour « ${local(course.name)} » et vous communique les modalités.`, `MIRS will confirm your seat for “${local(course.name)}” and share the details.`), record);
      return;
    }

    if (form.matches('[data-urgent-form]')) {
      event.preventDefault();
      const id = makeReference('URG');
      const reflexes = [...document.querySelectorAll('[data-reflex-item]:checked')].map((input) => input.value);
      const message = [
        `🚨 ${tr('URGENCE MAINTENANCE', 'MAINTENANCE EMERGENCY')} ${id}`,
        `${tr('Problème', 'Issue')} : ${formValue(form, 'issue')}`,
        `Impact : ${formValue(form, 'impact')}`,
        `${tr('Contact', 'Contact')} : ${formValue(form, 'name')} — ${formValue(form, 'phone')}`,
        `${tr('Lieu', 'Location')} : ${formValue(form, 'location')}`,
        formValue(form, 'message') ? `${tr('Détails', 'Details')} : ${formValue(form, 'message')}` : '',
        reflexes.length ? `${tr('Déjà vérifié', 'Already checked')} : ${reflexes.join(' / ')}` : '',
        tr('Merci de me rappeler au plus vite.', 'Please call me back as soon as possible.'),
      ].filter(Boolean).join('\n');
      const record = recordRequest({ id, type: 'urgent', priority: 'high', customer: `${formValue(form, 'name')} · ${formValue(form, 'location')}`, phone: formValue(form, 'phone'), service: formValue(form, 'issue'), detail: `${formValue(form, 'impact')}${formValue(form, 'message') ? ` · ${formValue(form, 'message')}` : ''}`, message });
      openWhatsApp(message);
      form.hidden = true;
      dialogSuccess(form.closest('dialog').querySelector('[data-urgent-done]'), tr('Alerte <em>envoyée.</em>', 'Alert <em>sent.</em>'), tr('Gardez votre téléphone à portée de main : MIRS vous rappelle. Si WhatsApp ne s’est pas ouvert, appelez le +224 622 05 13 21.', 'Keep your phone at hand: MIRS will call you back. If WhatsApp did not open, call +224 622 05 13 21.'), record);
      return;
    }

    if (form.matches('[data-ticket-form]') || form.matches('[data-contract-form]')) {
      event.preventDefault();
      const contract = form.matches('[data-contract-form]');
      const id = makeReference(contract ? 'CTR' : 'INT');
      const message = contract ? [
        `🛠 ${tr('DEVIS CONTRAT DE MAINTENANCE', 'MAINTENANCE CONTRACT QUOTE')} ${id}`,
        `${tr('Postes', 'Workstations')} : ${formValue(form, 'workstations')} · ${tr('Serveurs', 'Servers')} : ${formValue(form, 'servers')} · ${tr('Imprimantes', 'Printers')} : ${formValue(form, 'printers')}`,
        `${tr('Visites', 'Visits')} : ${formValue(form, 'frequency')} · ${tr('Couverture', 'Coverage')} : ${formValue(form, 'coverage')}`,
        `${tr('Contact', 'Contact')} : ${formValue(form, 'name')} — ${formValue(form, 'phone')}${formValue(form, 'company') ? ` — ${formValue(form, 'company')}` : ''}`,
      ].join('\n') : [
        `🔧 ${tr('DEMANDE D’INTERVENTION', 'SERVICE REQUEST')} ${id}`,
        `${tr('Équipement', 'Equipment')} : ${formValue(form, 'equipment')} · ${tr('Délai', 'Timing')} : ${formValue(form, 'when')}`,
        `${tr('Contact', 'Contact')} : ${formValue(form, 'name')} — ${formValue(form, 'phone')}${formValue(form, 'company') ? ` — ${formValue(form, 'company')}` : ''}`,
        `${tr('Problème', 'Issue')} : ${formValue(form, 'message')}`,
      ].join('\n');
      recordRequest({ id, type: contract ? 'contract' : 'ticket', customer: formValue(form, 'name') + (formValue(form, 'company') ? ` · ${formValue(form, 'company')}` : ''), phone: formValue(form, 'phone'), service: contract ? tr('Contrat de maintenance', 'Maintenance contract') : formValue(form, 'equipment'), detail: contract ? `${formValue(form, 'workstations')} ${tr('postes', 'workstations')}, ${formValue(form, 'servers')} ${tr('serveurs', 'servers')}, ${formValue(form, 'printers')} ${tr('imprimantes', 'printers')} · ${formValue(form, 'frequency')} · ${formValue(form, 'coverage')}` : `${formValue(form, 'when')} · ${formValue(form, 'message')}`, message });
      openWhatsApp(message);
      const status = form.querySelector('[data-form-status]');
      if (status) status.innerHTML = `${tr('Envoyé', 'Sent')} · ${tr('référence', 'reference')} <b>${id}</b>`;
      showToast(`${tr('Demande envoyée', 'Request sent')} · ${id}`);
      return;
    }

    if (form.matches('[data-contact-form]')) {
      event.preventDefault();
      const id = makeReference('CTC');
      const message = [
        `${tr('Bonjour MIRS, je suis', 'Hello MIRS, I am')} ${formValue(form, 'name')}.`,
        formValue(form, 'company') ? `${tr('Organisation', 'Organization')} : ${formValue(form, 'company')}` : '',
        `${tr('Sujet', 'Topic')} : ${formValue(form, 'topic')}`,
        `Contact : ${formValue(form, 'email')}`,
        `${tr('Besoin', 'Need')} : ${formValue(form, 'message')}`,
        `${tr('Référence', 'Reference')} : ${id}`,
      ].filter(Boolean).join('\n');
      recordRequest({ id, type: 'contact', customer: formValue(form, 'name') + (formValue(form, 'company') ? ` · ${formValue(form, 'company')}` : ''), email: formValue(form, 'email'), service: formValue(form, 'topic'), detail: formValue(form, 'message'), message });
      const status = form.querySelector('[data-form-status]');
      if (status) status.textContent = tr('Ouverture de WhatsApp avec votre demande préremplie…', 'Opening WhatsApp with your pre-filled request…');
      openWhatsApp(message);
      return;
    }

    /* ---- Administration ---- */
    if (form.matches('[data-admin-login]')) {
      event.preventDefault();
      const status = form.querySelector('[data-admin-login-status]');
      if (formValue(form, 'username') === ADMIN_USERNAME && String(new FormData(form).get('password') || '') === ADMIN_PASSWORD) {
        try {
          sessionStorage.setItem(ADMIN_SESSION_KEY, 'authenticated');
        } catch {
          if (status) status.textContent = tr('La session ne peut pas être enregistrée dans ce navigateur.', 'This browser cannot store the session.');
          return;
        }
        state.adminView = 'home';
        rerenderAdmin();
      } else if (status) {
        status.textContent = tr('Identifiant ou mot de passe incorrect.', 'Incorrect username or password.');
        form.classList.remove('is-invalid');
        requestAnimationFrame(() => form.classList.add('is-invalid'));
        form.elements.password.value = '';
        form.elements.username.focus();
      }
      return;
    }
    if (form.matches('[data-admin-session-form]')) {
      event.preventDefault();
      const data = adminData();
      data.extraSessions.push({ id: `session-${Date.now()}`, slug: formValue(form, 'slug'), date: formValue(form, 'date'), place: formValue(form, 'place') || 'Conakry' });
      saveAdminData(data);
      rerenderAdmin();
      showToast(tr('Session ajoutée au calendrier', 'Session added to the calendar'));
      return;
    }
    if (form.matches('[data-admin-content-form]')) {
      event.preventDefault();
      const data = adminData();
      const id = formValue(form, 'id') || `content-${Date.now()}`;
      const record = {
        id,
        area: { fr: formValue(form, 'areaFr'), en: formValue(form, 'areaEn') },
        type: { fr: 'Page', en: 'Page' },
        title: { fr: formValue(form, 'titleFr'), en: formValue(form, 'titleEn') },
        status: formValue(form, 'status') || 'draft',
        updated: todayStamp(),
      };
      const existing = data.content.findIndex((item) => item.id === id);
      if (existing >= 0) data.content[existing] = { ...data.content[existing], ...record };
      else data.content.unshift(record);
      saveAdminData(data);
      form.closest('dialog')?.close();
      rerenderAdmin();
    }
  }, { signal });

  document.documentElement.dataset.theme = state.theme;
  setupMotion(signal);
}

function renderRoute(path = location.pathname, options = {}) {
  const info = routeInfo(path);
  state.locale = info.locale;
  const clean = info.route;
  const parts = clean.split('/').filter(Boolean);
  const markup = clean === '/' ? home()
    : clean === '/informatique' ? branch('informatique')
      : clean === '/imprimerie' ? branch('imprimerie')
        : clean === '/creation-agence' ? branch('creation-agence')
          : clean === '/maintenance' ? maintenancePage()
            : clean === '/amadeus' ? amadeusPage()
              : clean === '/formation' ? training()
                : parts[0] === 'formation' && parts.length === 2 ? courseDetail(parts[1])
                  : clean === '/informatique/boutique' ? techStore()
                    : parts[0] === 'informatique' && parts[1] === 'boutique' && parts.length === 3 ? productDetail(parts[2])
                      : clean === '/imprimerie/boutique' ? shop('print')
                        : clean === '/realisations' ? projects()
                          : clean === '/contact' ? contact()
                            : clean === '/checkout' ? checkout()
                              : clean === '/admin' ? dashboard()
                                : notFound();
  closeVideo();
  document.body.classList.remove('menu-open', 'cart-open', 'admin-menu-open');
  document.body.classList.add('is-nova');
  document.body.classList.toggle('is-admin', clean === '/admin');
  document.getElementById('app').innerHTML = markup;
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.lang = state.locale;
  const titles = { '/': 'MIRS — Spatial Systems', '/amadeus': 'MIRS — AMADEUS', '/formation': 'MIRS Academy', '/informatique/boutique': tr('MIRS — Boutique informatique', 'MIRS — IT store'), '/checkout': tr('MIRS — Commande', 'MIRS — Checkout'), '/maintenance': tr('MIRS — Maintenance & urgence', 'MIRS — Maintenance & emergency'), '/admin': 'MIRS — Administration' };
  const course = parts[0] === 'formation' && parts[1] ? academyCourses.find((item) => item.slug === parts[1]) : null;
  const product = parts[2] ? storeProducts.find((item) => item.id === parts[2]) : null;
  document.title = titles[clean] || (course ? `${local(course.name)} — MIRS Academy` : product ? `${local(product.name)} — MIRS` : `MIRS — ${(parts.pop() || '').replaceAll('-', ' ')}`);
  bind();
  if (!options.preserveScroll) scrollTo({ top: 0, behavior: 'instant' });
}


addEventListener('popstate', () => renderRoute(location.pathname));
addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  document.body.classList.remove('menu-open', 'cart-open');
  document.querySelector('[data-menu]')?.setAttribute('aria-expanded', 'false');
});
state.locale = routeInfo().locale;
setupGlobalChrome();
bootReady = runLoader();
renderRoute();
