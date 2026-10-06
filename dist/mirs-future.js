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
    return Array.isArray(saved) ? saved.filter((item) => typeof item === 'string').slice(0, 50) : [];
  } catch {
    return [];
  }
}

const state = {
  theme: localStorage.getItem('mirs-future-theme') || 'dark',
  cart: storedCart(),
  locale: 'fr',
  adminView: 'home',
};

const tr = (fr, en) => state.locale === 'en' ? en : fr;
const local = (value) => typeof value === 'string' ? value : (value?.[state.locale] || value?.fr || '');
const alternateLanguageHref = () => pageHref(pageRoute(), state.locale === 'fr' ? 'en' : 'fr');

const products = {
  tech: [
    { name: { fr: 'Poste de travail', en: 'Workstation' }, category: { fr: 'infrastructure', en: 'infrastructure' }, categoryKey: 'infrastructure', image: 'editorial/equipement-clavier.jpg', detail: { fr: 'Configuration, équipement et mise en service.', en: 'Configuration, equipment and deployment.' } },
    { name: { fr: 'Réseau & Wi-Fi', en: 'Network & Wi-Fi' }, category: { fr: 'infrastructure', en: 'infrastructure' }, categoryKey: 'infrastructure', image: 'editorial/maintenance-pc.jpg', detail: { fr: 'Connecter les équipes sans créer de complexité.', en: 'Connect teams without adding complexity.' } },
    { name: { fr: 'Cybersécurité', en: 'Cybersecurity' }, category: { fr: 'protection', en: 'protection' }, categoryKey: 'protection', image: 'future/informatique-team.jpg', detail: { fr: 'Clarifier les priorités avant de protéger.', en: 'Clarify priorities before protecting.' } },
    { name: { fr: 'Maintenance IT', en: 'IT maintenance' }, category: { fr: 'assistance', en: 'support' }, categoryKey: 'support', image: 'editorial/maintenance-pc.jpg', detail: { fr: 'Un suivi technique conçu pour la continuité.', en: 'Technical support designed for continuity.' } },
  ],
  print: [
    { name: { fr: 'Polo personnalisé', en: 'Custom polo shirt' }, category: { fr: 'textile', en: 'textile' }, categoryKey: 'textile', image: 'mirs-media/nimba-polo-transparent.png', detail: { fr: 'Textile de communication produit par notre atelier.', en: 'Branded textile produced by our workshop.' } },
    { name: { fr: 'Casquette personnalisée', en: 'Custom cap' }, category: { fr: 'textile', en: 'textile' }, categoryKey: 'textile', image: 'mirs-media/sonapi-cap-transparent.png', detail: { fr: 'Une série personnalisée pour vos équipes et événements.', en: 'A personalized series for teams and events.' } },
    { name: { fr: 'Tote bag', en: 'Tote bag' }, category: { fr: 'textile', en: 'textile' }, categoryKey: 'textile', image: 'catalogue/tote-bag.png', detail: { fr: 'Support utile, personnalisable et durable.', en: 'A useful, customizable and durable medium.' } },
    { name: { fr: 'Packaging', en: 'Packaging' }, category: { fr: 'support', en: 'collateral' }, categoryKey: 'support', image: 'catalogue/packaging-orange.png', detail: { fr: 'Une présence qui commence avant l’ouverture.', en: 'A brand experience that begins before opening.' } },
    { name: { fr: 'Signalétique', en: 'Signage' }, category: { fr: 'support', en: 'collateral' }, categoryKey: 'support', image: 'editorial/impression-grand-format.jpg', detail: { fr: 'Grand format, habillage et visibilité.', en: 'Large format, wayfinding and visibility.' } },
  ],
};

const courses = [
  { name: 'AMADEUS', category: { fr: 'Voyage & réservation', en: 'Travel and booking operations' }, detail: { fr: 'Outiller les équipes opérationnelles sur les usages métier.', en: 'Equip operational teams for day-to-day business use.' } },
  { name: { fr: 'Réseaux & systèmes', en: 'Networks & systems' }, category: { fr: 'Déployer et administrer', en: 'Deploy and administer' }, detail: { fr: 'Concevoir une base technique lisible et maîtrisable.', en: 'Build a clear, maintainable technical foundation.' } },
  { name: 'Microsoft Office', category: { fr: 'Produire efficacement', en: 'Work efficiently' }, detail: { fr: 'Créer des habitudes de travail simples et solides.', en: 'Create simple, reliable working habits.' } },
  { name: { fr: 'Marketing digital', en: 'Digital marketing' }, category: { fr: 'Structurer la visibilité', en: 'Build digital visibility' }, detail: { fr: 'Mettre l’identité et le message au bon endroit.', en: 'Place identity and messaging where they matter.' } },
  { name: 'Live coding', category: { fr: 'Concevoir par la pratique', en: 'Build through practice' }, detail: { fr: 'Passer de l’idée à un système qui fonctionne.', en: 'Move from an idea to a functioning system.' } },
];

const universes = [
  { path: '/informatique', key: 'informatique', index: '01', signal: 'INFRASTRUCTURE', name: { fr: 'Informatique', en: 'Information technology' }, title: { fr: 'Des systèmes plus <em>fiables.</em>', en: 'More <em>reliable</em> systems.' }, detail: { fr: 'Infrastructure, réseau, cybersécurité et assistance pour sécuriser la continuité de vos activités.', en: 'Infrastructure, networking, cybersecurity and support for business continuity.' }, image: 'future/informatique-team.jpg', className: 'tech' },
  { path: '/imprimerie', key: 'imprimerie', index: '02', signal: 'PRODUCTION', name: { fr: 'Imprimerie', en: 'Print production' }, title: { fr: 'Une marque qui <em>se voit.</em>', en: 'A brand that is <em>seen.</em>' }, detail: { fr: 'Supports imprimés, signalétique et objets promotionnels pour renforcer votre marque.', en: 'Printed materials, signage and promotional items that strengthen your brand.' }, image: 'future/imprimerie-team.jpg', className: 'print' },
  { path: '/formation', key: 'formation', index: '03', signal: 'COMPÉTENCES', name: { fr: 'MIRS Academy', en: 'MIRS Academy' }, title: { fr: 'Des compétences qui <em>restent.</em>', en: 'Skills that <em>last.</em>' }, detail: { fr: 'Des formations pratiques pour développer des compétences immédiatement mobilisables.', en: 'Practical training that develops immediately applicable skills.' }, image: 'editorial/formation-collaboration.jpg', className: 'academy' },
  { path: '/creation-agence', key: 'creation-agence', index: '04', signal: 'CRÉATION', name: { fr: 'Création d’agence', en: 'Agency creation' }, title: { fr: 'Une agence prête à <em>opérer.</em>', en: 'An agency ready to <em>operate.</em>' }, detail: { fr: 'Positionnement, identité, outils et cadre opérationnel pour construire une agence cohérente.', en: 'Positioning, identity, tools and operating framework for a coherent agency.' }, image: 'editorial/developpement-web.jpg', className: 'agency' },
  { path: '/maintenance', key: 'maintenance', index: '05', signal: 'CONTINUITÉ', name: { fr: 'Maintenance', en: 'Maintenance' }, title: { fr: 'Préserver ce qui <em>fonctionne.</em>', en: 'Keep what <em>works.</em>' }, detail: { fr: 'Prévention, intervention et suivi pour préserver la disponibilité de vos environnements.', en: 'Prevention, intervention and follow-up to preserve system availability.' }, image: 'editorial/maintenance-pc.jpg', className: 'maintenance' },
];

const ADMIN_STORAGE_KEY = 'mirs-admin-workspace-v1';
const ADMIN_SESSION_KEY = 'mirs-admin-session-v1';
const ADMIN_USERNAME = 'adminmirs';
const ADMIN_PASSWORD = 'admin';

function adminSeed() {
  return {
    content: [
      { id: 'home', area: { fr: 'Accueil MIRS', en: 'MIRS home' }, type: { fr: 'Page', en: 'Page' }, title: { fr: 'Des solutions intégrées qui font avancer.', en: 'Integrated solutions for performance.' }, status: 'published', updated: '05.10.2026' },
      { id: 'informatique', area: { fr: 'Univers · Informatique', en: 'Capability · IT' }, type: { fr: 'Univers', en: 'Capability' }, title: { fr: 'Des systèmes plus fiables.', en: 'More reliable systems.' }, status: 'published', updated: '04.10.2026' },
      { id: 'imprimerie', area: { fr: 'Univers · Imprimerie', en: 'Capability · Print' }, type: { fr: 'Univers', en: 'Capability' }, title: { fr: 'Une marque qui se voit.', en: 'A brand that is seen.' }, status: 'published', updated: '04.10.2026' },
      { id: 'formation', area: { fr: 'Univers · MIRS Academy', en: 'Capability · MIRS Academy' }, type: { fr: 'Univers', en: 'Capability' }, title: { fr: 'Des compétences qui restent.', en: 'Skills that last.' }, status: 'review', updated: '03.10.2026' },
      { id: 'creation-agence', area: { fr: 'Univers · Création d’agence de voyage', en: 'Capability · Travel agency creation' }, type: { fr: 'Univers', en: 'Capability' }, title: { fr: 'Une agence prête à opérer.', en: 'An agency ready to operate.' }, status: 'published', updated: '02.10.2026' },
      { id: 'maintenance', area: { fr: 'Univers · Maintenance', en: 'Capability · Maintenance' }, type: { fr: 'Univers', en: 'Capability' }, title: { fr: 'Préserver ce qui fonctionne.', en: 'Keep what works.' }, status: 'review', updated: '02.10.2026' },
    ],
    requests: [
      { id: 'REQ-104', customer: 'Nimba SMS', service: 'Imprimerie', detail: 'Polos et casquettes pour une équipe terrain.', priority: 'high', status: 'new', updated: '04.10.2026' },
      { id: 'REQ-103', customer: 'Groupe Amara', service: 'Informatique', detail: 'Mise à niveau réseau et postes de travail.', priority: 'normal', status: 'analysis', updated: '03.10.2026' },
      { id: 'REQ-102', customer: 'Cabinet Horizon', service: 'Formation', detail: 'Parcours Microsoft Office pour 12 collaborateurs.', priority: 'normal', status: 'quote', updated: '02.10.2026' },
      { id: 'REQ-101', customer: 'Atelier Koba', service: 'Maintenance', detail: 'Contrat de suivi préventif des équipements.', priority: 'high', status: 'progress', updated: '01.10.2026' },
      { id: 'REQ-100', customer: 'Studio Sira', service: 'Création d’agence de voyage', detail: 'Positionnement, identité et cadre de lancement.', priority: 'normal', status: 'done', updated: '29.09.2026' },
    ],
    training: courses.map((course, index) => ({
      id: `course-${index}`,
      name: course.name,
      category: course.category,
      status: index === 4 ? 'draft' : 'published',
      sessions: index === 4 ? 0 : index + 1,
      learners: [18, 12, 24, 9, 0][index],
      capacity: [24, 18, 30, 16, 18][index],
    })),
    media: [
      { id: 'company-film', name: { fr: 'Présentation de MIRS', en: 'MIRS company film' }, type: { fr: 'Vidéo · Institutionnel', en: 'Video · Corporate' }, file: 'mirs-media/mirs-company-presentation.mp4', status: 'published', updated: '05.10.2026' },
      { id: 'print-film', name: { fr: 'Présentation de l’imprimerie', en: 'Print workshop film' }, type: { fr: 'Vidéo · Imprimerie', en: 'Video · Print workshop' }, file: 'mirs-media/mirs-print-presentation.mp4', status: 'published', updated: '05.10.2026' },
      { id: 'digital-film', name: { fr: 'Animation MacBook', en: 'MacBook motion' }, type: { fr: 'Vidéo · Digital', en: 'Video · Digital' }, file: 'mirs-media/mirs-macbook-motion.mp4', status: 'published', updated: '04.10.2026' },
    ],
    inventory: {
      tech: products.tech.map(() => true),
      print: products.print.map(() => true),
    },
    settings: { maintenance: false, publicRequests: true, bilingual: true },
  };
}

function adminData() {
  const fallback = adminSeed();
  try {
    const saved = JSON.parse(localStorage.getItem(ADMIN_STORAGE_KEY) || 'null');
    if (!saved || typeof saved !== 'object') return fallback;
    return {
      ...fallback,
      ...saved,
      content: Array.isArray(saved.content) ? saved.content : fallback.content,
      requests: Array.isArray(saved.requests) ? saved.requests : fallback.requests,
      training: Array.isArray(saved.training) ? saved.training : fallback.training,
      media: Array.isArray(saved.media) ? saved.media : fallback.media,
      inventory: { ...fallback.inventory, ...(saved.inventory || {}) },
      settings: { ...fallback.settings, ...(saved.settings || {}) },
    };
  } catch {
    return fallback;
  }
}

function saveAdminData(data) {
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(data));
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

function adminLogin() {
  return shell(`<main class="admin-auth"><section class="admin-auth__card"><div class="admin-auth__mark">${brandMark()}<span><b>MIRS</b><small>SPATIAL SYSTEMS</small></span></div><div class="admin-auth__intro"><span>${tr('MIRS / ADMINISTRATION', 'MIRS / ADMINISTRATION')}</span><h1>${tr('Accéder au<br><em>poste de pilotage.</em>', 'Access the<br><em>control room.</em>')}</h1><p>${tr('Un espace réservé pour administrer le contenu du site, les services, les formations et les boutiques MIRS.', 'A private workspace to manage MIRS site content, services, training and stores.')}</p></div><form class="admin-auth__form" data-admin-login><label>${tr('Identifiant', 'Username')}<input name="username" required autocomplete="username" placeholder="adminmirs"></label><label>${tr('Mot de passe', 'Password')}<input name="password" type="password" required autocomplete="current-password" placeholder="•••••"></label><button type="submit" class="admin-action-button admin-action-button--accent">${tr('Ouvrir l’administration', 'Open administration')} <span>↗</span></button><p class="admin-auth__status" data-admin-login-status aria-live="polite" role="status"></p></form><p class="admin-auth__security">${tr('Accès réservé à l’équipe MIRS.', 'Access reserved for the MIRS team.')}</p><a class="admin-auth__back" href="${pageHref('/')}" data-link>← ${tr('Retour au site public', 'Return to public site')}</a></section></main>`, '/admin');
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

function logoCell(file) {
  return `<figure class="nv-logo"><img src="${AS}${file}" alt="" loading="lazy" decoding="async"></figure>`;
}

function logoBands(compact = false) {
  const groups = [clientLogos.slice(0, 27), clientLogos.slice(27, 54), clientLogos.slice(54, 81)];
  const lanes = compact ? groups.slice(0, 2) : groups;
  return `<div class="nv-logos ${compact ? 'is-compact' : ''}" aria-label="${tr('81 organisations accompagnées par MIRS', '81 organizations supported by MIRS')}">
    ${lanes.map((group, index) => `<div class="nv-logos__lane" style="--dir:${index % 2 ? 'reverse' : 'normal'};--dur:${70 + index * 12}s"><div class="nv-logos__track">${[...group, ...group].map(logoCell).join('')}</div></div>`).join('')}
  </div>`;
}

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

function header() {
  const route = pageRoute();
  const current = (path) => route === path ? ' aria-current="page"' : '';
  return `<header class="nv-header" data-header>
    <a href="${pageHref('/')}" data-link class="nv-brand" aria-label="${tr('MIRS — accueil', 'MIRS — home')}">
      ${brandMark()}
      <span><b>MIRS</b><small>SPATIAL SYSTEMS</small></span>
    </a>
    <nav class="nv-nav" aria-label="${tr('Navigation principale', 'Main navigation')}">
      <a href="${pageHref('/')}#univers" data-anchor="univers" data-scramble>${tr('Univers', 'Capabilities')}</a>
      <a href="${pageHref('/realisations')}" data-link data-scramble${current('/realisations')}>${tr('Réalisations', 'Projects')}</a>
      <a href="${pageHref('/formation')}" data-link data-scramble${current('/formation')}>Academy</a>
      <a href="${pageHref('/informatique/boutique')}" data-link data-scramble${current('/informatique/boutique')}>${tr('Boutiques', 'Stores')}</a>
      <a href="${pageHref('/')}#references" data-anchor="references" data-scramble>${tr('Références', 'References')}</a>
    </nav>
    <div class="nv-header__actions">
      <a class="nv-chip" href="${alternateLanguageHref()}" data-link aria-label="${tr('Passer en anglais', 'Switch to French')}">${state.locale === 'fr' ? 'EN' : 'FR'}</a>
      <button type="button" class="nv-chip nv-chip--icon" data-theme aria-label="${tr('Changer de thème', 'Change theme')}" title="${tr('Changer de thème', 'Change theme')}"><span class="nv-theme-icon" aria-hidden="true"></span></button>
      <button type="button" data-cart class="nv-chip nv-cart-chip" aria-label="${tr('Ouvrir la liste de projet', 'Open project list')}"><span>${tr('Brief', 'Brief')}</span><b data-cart-count>${state.cart.length}</b></button>
      ${button('/contact', tr('Parler à MIRS', 'Talk to MIRS'), 'primary nv-btn--sm nv-header__cta')}
      <button type="button" class="nv-burger" data-menu aria-controls="nv-menu" aria-expanded="false"><span></span><span></span><span class="sr-only">Menu</span></button>
    </div>
  </header>
  <div class="nv-menu" id="nv-menu" data-mobile-menu>
    <div class="nv-menu__bg" aria-hidden="true"></div>
    <nav class="nv-menu__inner" aria-label="${tr('Menu', 'Menu')}">
      <p class="nv-menu__label">${tr('NAVIGATION / MIRS', 'NAVIGATION / MIRS')}</p>
      <a href="${pageHref('/')}" data-link style="--i:0"><small>00</small>${tr('Accueil', 'Home')}</a>
      ${universes.map((unit, index) => `<a href="${pageHref(unit.path)}" data-link style="--i:${index + 1}"><small>${unit.index}</small>${local(unit.name)}</a>`).join('')}
      <a href="${pageHref('/realisations')}" data-link style="--i:6"><small>06</small>${tr('Réalisations', 'Projects')}</a>
      <a href="${pageHref('/contact')}" data-link style="--i:7"><small>07</small>Contact</a>
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
        ${button('/contact', tr('Démarrer un projet', 'Start a project'), 'primary')}
      </div>
      <div class="nv-footer__col"><span>${tr('Univers', 'Capabilities')}</span>${universes.map((unit) => `<a href="${pageHref(unit.path)}" data-link data-scramble>${local(unit.name)}</a>`).join('')}</div>
      <div class="nv-footer__col"><span>${tr('Explorer', 'Explore')}</span><a href="${pageHref('/realisations')}" data-link data-scramble>${tr('Réalisations', 'Projects')}</a><a href="${pageHref('/informatique/boutique')}" data-link data-scramble>${tr('Boutique informatique', 'IT store')}</a><a href="${pageHref('/imprimerie/boutique')}" data-link data-scramble>${tr('Boutique imprimerie', 'Print store')}</a><a href="${pageHref('/contact')}" data-link data-scramble>Contact</a></div>
      <div class="nv-footer__col"><span>Conakry · Guinée</span><a href="tel:+224622051321">+224 622 05 13 21</a><a href="https://wa.me/224622051321" target="_blank" rel="noreferrer">WhatsApp ↗</a><p class="nv-clock"><i></i>${tr('Conakry', 'Conakry')} <b data-clock>--:--</b> GMT</p></div>
    </div>
    <div class="nv-footer__mark" data-progress aria-hidden="true"><span>MIRS</span></div>
    <div class="nv-footer__bottom nv-wrap"><span>© ${new Date().getFullYear()} MIRS Spatial Systems</span><span>${tr('Concevoir · Déployer · Accompagner', 'Design · Deploy · Support')}</span><a href="${pageHref('/admin')}" data-link>${tr('Administration', 'Administration')}</a><button type="button" class="nv-totop" data-totop aria-label="${tr('Revenir en haut', 'Back to top')}">↑</button></div>
  </footer>`;
}

function cartPanel() {
  const entries = state.cart.length
    ? state.cart.map((item, index) => `<li style="--i:${index}"><small>${String(index + 1).padStart(2, '0')}</small><span>${item}</span><button type="button" data-remove="${index}" aria-label="${tr('Retirer', 'Remove')} ${item}">×</button></li>`).join('')
    : `<li class="nv-drawer__empty">${tr('Votre liste est vide. Ajoutez une piste à explorer.', 'Your list is empty. Add something worth exploring.')}</li>`;
  return `<div class="nv-drawer__head"><span>${tr('BRIEF', 'BRIEF')} / ${String(state.cart.length).padStart(2, '0')}</span><button type="button" data-close-cart aria-label="${tr('Fermer', 'Close')}">×</button></div>
    <h2>${tr('Votre liste<br>de <em>départ.</em>', 'Your starting<br><em>list.</em>')}</h2>
    <ul>${entries}</ul>
    ${state.cart.length ? button('/checkout', tr('Préparer le brief', 'Prepare the brief'), 'primary') : `<p class="nv-drawer__note">${tr('Une offre, un support ou une formation : ajoutez ce qui mérite une conversation.', 'A service, a material or a course: add what deserves a conversation.')}</p>`}`;
}

function overlays() {
  return `<div class="nv-scrim" data-close-cart></div>
    <aside class="nv-drawer" data-cart-drawer aria-label="${tr('Liste de projet', 'Project list')}">${cartPanel()}</aside>
    <dialog class="nv-video" data-video-modal>
      <button type="button" class="nv-video__close" data-close-video aria-label="${tr('Fermer la vidéo', 'Close video')}">×</button>
      <div class="nv-video__body" data-video-body></div>
    </dialog>`;
}

function shell(content, route = '') {
  const isAdminRoute = route === '/admin';
  if (isAdminRoute) return `<div class="site-shell route-admin">${content}</div>`;
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
    <div class="nv-product__body"><small>${local(item.category)}</small><h3>${name}</h3><p>${local(item.detail)}</p><button type="button" class="nv-add" data-add="${name}">${tr('Ajouter au brief', 'Add to brief')} <i aria-hidden="true">${ICON_PLUS}</i></button></div>
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
        <div class="nv-products nv-products--two">${products.tech.slice(0, 2).map((item, index) => homeProductCard(item, 'tech', index)).join('')}</div>
        <div class="nv-shelf__label"><span>02</span><b>${tr('Boutique imprimerie', 'Print store')}</b>${link('/imprimerie/boutique', tr('Tout voir', 'View all'))}</div>
        <div class="nv-products">${products.print.slice(0, 3).map((item, index) => homeProductCard(item, 'print', index)).join('')}</div>
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

function training() {
  const path = [
    [tr('Positionner', 'Assess'), tr('Identifier les besoins et le niveau de départ.', 'Identify needs and the starting level.')],
    [tr('Pratiquer', 'Practice'), tr('Faire, recommencer et relier les outils au contexte.', 'Do, repeat and connect tools to context.')],
    [tr('Transférer', 'Transfer'), tr('Préparer le retour à l’équipe et aux situations réelles.', 'Prepare the return to the team and real situations.')],
    [tr('Suivre', 'Follow up'), tr('Garder un point de contact lorsque les questions apparaissent.', 'Keep a point of contact when questions arise.')],
  ];
  return shell(`<main class="nv-academy">
    <section class="nv-academy-hero" data-hero>
      <canvas class="nv-hero__field" data-field aria-hidden="true"></canvas>
      <div class="nv-hero__aurora" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="nv-hero__grid" aria-hidden="true"></div>
      <div class="nv-academy-hero__layout nv-wrap">
        <div class="nv-academy-hero__copy">
          <div class="nv-hero__meta" data-nv="fade"><span>MIRS ACADEMY</span><span>${tr('PARCOURS MÉTIER', 'BUSINESS PATHWAYS')}</span></div>
          ${sectionTitle(tr('Apprendre,<br>puis savoir<br><em>faire.</em>', 'Learn.<br>Apply.<br><em>Perform.</em>'), 'nv-academy-hero__title', 'h1')}
          <p data-nv="up" style="--d:220ms">${tr('Des formations structurées autour de vos outils, de vos équipes et de vos objectifs opérationnels.', 'Training structured around your tools, teams and operational objectives.')}</p>
          <div class="nv-hero__actions" data-nv="up" style="--d:320ms">${button('/contact', tr('Construire un parcours', 'Build a pathway'), 'primary')}${videoButton('mirs-media/mirs-company-presentation.mp4', tr('Voir l’approche', 'See our approach'))}</div>
          <div class="nv-proof" data-nv="fade" style="--d:420ms"><span>${tr('PRATIQUE', 'PRACTICE')}</span><span>${tr('OUTILS', 'TOOLS')}</span><span>${tr('RELAIS', 'FOLLOW-UP')}</span></div>
        </div>
        <div class="nv-cards3d" data-tilt aria-hidden="true">
          <div class="nv-cards3d__card nv-cards3d__card--1"><span>01</span><b>${tr('OBSERVEZ', 'OBSERVE')}</b><i></i></div>
          <div class="nv-cards3d__card nv-cards3d__card--2"><span>02</span><b>${tr('ESSAYEZ', 'TRY')}</b><i></i></div>
          <div class="nv-cards3d__card nv-cards3d__card--3"><span>03</span><b>${tr('MAÎTRISEZ', 'MASTER')}</b><i></i></div>
        </div>
      </div>
    </section>

    ${marquee(courses.map((course) => local(course.name).toUpperCase()), 'nv-marquee--solo')}

    <section class="nv-thesis nv-wrap">
      <div class="nv-thesis__initial" aria-hidden="true" data-speed="-0.08">A</div>
      <div class="nv-thesis__copy">${eyebrow(tr('UNE PÉDAGOGIE DE TERRAIN', 'PRACTICAL LEARNING'), '01')}${sectionTitle(tr('Le savoir utile est celui qui <em>s’applique.</em>', 'Useful learning is learning that <em>applies.</em>'))}<p class="nv-thesis__text" data-scrub>${tr('Chaque parcours commence avec un niveau réel, des outils réels et une situation à améliorer. L’objectif est de permettre aux équipes d’appliquer les acquis dès le lendemain.', 'Every pathway begins with a real level, real tools and a situation to improve. The aim is for teams to apply new skills the very next day.')}</p>
        <div class="nv-minimetrics" data-nv="up"><span><b>01</b> ${tr('contexte', 'context')}</span><span><b>02</b> ${tr('pratique', 'practice')}</span><span><b>03</b> ${tr('autonomie', 'autonomy')}</span></div></div>
    </section>

    <section class="nv-section nv-wrap">
      <div class="nv-head"><div>${eyebrow(tr('POINTS D’ENTRÉE', 'STARTING POINTS'), '02')}${sectionTitle(tr('Des parcours qui passent<br>à l’<em>action.</em>', 'Pathways that move<br>into <em>action.</em>'))}</div><p data-nv="up">${tr('Choisissez une porte d’entrée ; nous vous aiderons à concevoir la suite.', 'Choose a starting point; we will help you design what follows.')}</p></div>
      <div class="nv-courses">${courses.map((course, index) => `<article class="nv-course" data-spot data-nv="up" style="--d:${index * 70}ms"><div class="nv-course__top"><span>0${index + 1}</span><small>${local(course.category)}</small></div><h3>${local(course.name)}</h3><p>${local(course.detail)}</p><button type="button" class="nv-add" data-add="${tr('Formation', 'Training')} : ${local(course.name)}">${tr('Ajouter au brief', 'Add to brief')} <i aria-hidden="true">${ICON_PLUS}</i></button></article>`).join('')}</div>
    </section>

    <section class="nv-section nv-wrap nv-path" data-progress>
      <div class="nv-path__intro">${eyebrow(tr('COMMENT LE PARCOURS SE DÉPLIE', 'HOW THE PATHWAY UNFOLDS'), '03')}${sectionTitle(tr('Partir de l’usage.<br><em>Revenir au réel.</em>', 'Start with the use case.<br><em>Return to work.</em>'))}</div>
      <ol class="nv-path__list"><span class="nv-path__line" aria-hidden="true"><i></i></span>${path.map((step, index) => `<li data-nv="up" style="--d:${index * 90}ms"><span>0${index + 1}</span><div><b>${step[0]}</b><p>${step[1]}</p></div></li>`).join('')}</ol>
    </section>

    <section class="nv-quote nv-wrap" data-progress="enter">
      <figure class="nv-quote__media"><img src="${AS}editorial/formation-collaboration.jpg" alt="${tr('Échange pendant une formation MIRS', 'Discussion during a MIRS training session')}" loading="lazy" data-speed="-0.06"></figure>
      <div class="nv-quote__copy" data-spot><span aria-hidden="true">“</span><p data-scrub>${tr('Une bonne formation se mesure à ce que les équipes peuvent appliquer après la session.', 'Good training is measured by what teams can apply after the session.')}</p>${button('/contact', tr('Parler de votre équipe', 'Talk about your team'), 'primary')}</div>
    </section>

    ${closingPortal(tr('Composons le parcours de votre <em>équipe.</em>', 'Let’s design your team’s <em>pathway.</em>'), tr('Un niveau de départ, des outils, un objectif : c’est suffisant pour commencer.', 'A starting level, tools and an objective: that is enough to begin.'), tr('Construire un parcours', 'Build a pathway'))}
  </main>`, '/formation');
}

function productCard(item, mode, index = 0) {
  const name = local(item.name);
  return `<article class="nv-product nv-product--${mode}" data-product-card data-category="${item.categoryKey}" data-spot data-tilt data-nv="up" style="--d:${index * 70}ms">
    <div class="nv-product__image"><img src="${AS}${item.image}" alt="${name}" loading="lazy"><span>${mode === 'tech' ? 'MIRS / IT' : 'MIRS / PRINT'}</span></div>
    <div class="nv-product__body"><small>${local(item.category)}</small><h3>${name}</h3><p>${local(item.detail)}</p><button type="button" class="nv-add" data-add="${name}">${tr('Ajouter au brief', 'Add to brief')} <i aria-hidden="true">${ICON_PLUS}</i></button></div>
  </article>`;
}

function shop(kind) {
  const isTech = kind === 'tech';
  const name = isTech ? tr('Solutions informatique', 'IT solutions') : tr('Supports imprimés', 'Print materials');
  const items = products[kind];
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

function adminStatus(status) {
  const labels = {
    published: tr('Publié', 'Published'),
    draft: tr('Brouillon', 'Draft'),
    review: tr('À relire', 'Review'),
    new: tr('Nouvelle', 'New'),
    analysis: tr('En analyse', 'In review'),
    quote: tr('Devis envoyé', 'Quote sent'),
    progress: tr('En cours', 'In progress'),
    done: tr('Terminée', 'Completed'),
  };
  return `<span class="admin-badge admin-badge--${status}">${labels[status] || status}</span>`;
}

function adminViewHeading(view) {
  const headings = {
    home: [tr('VUE D’ENSEMBLE', 'OVERVIEW'), tr('Le poste de pilotage<br><em>MIRS.</em>', 'The <em>MIRS</em><br>control room.'), tr('Les priorités du site et des services au même endroit.', 'Site and service priorities in one place.')],
    content: [tr('SITE / CONTENUS', 'SITE / CONTENT'), tr('Modifier ce que<br>vos publics <em>voient.</em>', 'Edit what your<br>audiences <em>see.</em>'), tr('Pages, univers, textes FR / EN et statut de publication.', 'Pages, capabilities, FR / EN copy and publishing status.')],
    services: [tr('SERVICES / DEMANDES', 'SERVICES / REQUESTS'), tr('Traiter chaque<br>demande avec <em>méthode.</em>', 'Handle every<br>request with <em>care.</em>'), tr('Une file de suivi pour les cinq univers et les commandes.', 'One tracking queue for all five capabilities and orders.')],
    training: [tr('ACADEMY / FORMATIONS', 'ACADEMY / TRAINING'), tr('Des parcours<br>prêts à <em>transmettre.</em>', 'Pathways ready<br>to be <em>shared.</em>'), tr('Sessions, inscriptions, capacité et publication des modules.', 'Sessions, enrolments, capacity and module publishing.')],
    stores: [tr('BOUTIQUES / CATALOGUES', 'STORES / CATALOGUES'), tr('Garder les offres<br><em>disponibles.</em>', 'Keep offers<br><em>available.</em>'), tr('Produits, visuels et disponibilité pour l’informatique et l’imprimerie.', 'Products, imagery and availability for IT and print.')],
    media: [tr('SITE / MÉDIAS', 'SITE / MEDIA'), tr('Les bons médias<br>au bon <em>endroit.</em>', 'The right media<br>in the right <em>place.</em>'), tr('Vidéos immersives, logos et ressources publiques.', 'Immersive videos, logos and public resources.')],
    settings: [tr('CONFIGURATION', 'SETTINGS'), tr('Un espace simple<br>à <em>maintenir.</em>', 'A workspace<br>easy to <em>maintain.</em>'), tr('Préférences de fonctionnement et qualité de publication.', 'Operating preferences and publishing quality.')],
  };
  const [label, title, detail] = headings[view] || headings.home;
  return `<div class="admin-main__heading"><div><span>${label}</span><h1>${title}</h1></div><p>${detail}</p></div>`;
}

function adminRequestsRows(data, compact = false) {
  const requests = compact ? data.requests.slice(0, 4) : data.requests;
  return requests.map((item) => `<article class="admin-request-row ${compact ? 'is-compact' : ''}" data-admin-row="requests" data-search-text="${[item.id, item.customer, item.service, item.detail].join(' ').toLowerCase()}">
    <div class="admin-request-id"><b>${item.id}</b><small>${item.updated}</small></div>
    <div class="admin-request-copy"><b>${item.customer}</b><span>${item.service}</span><p>${item.detail}</p></div>
    <div class="admin-request-state">${adminStatus(item.status)}${item.priority === 'high' ? `<small class="admin-priority-note">${tr('Prioritaire', 'High priority')}</small>` : ''}</div>
    ${compact ? `<button type="button" class="admin-row-link" data-admin-view="services">${tr('Ouvrir', 'Open')}</button>` : `<label class="admin-inline-field"><span>${tr('Statut', 'Status')}</span><select data-admin-request-status="${item.id}" aria-label="${tr(`Statut de ${item.id}`, `Status of ${item.id}`)}"><option value="new" ${item.status === 'new' ? 'selected' : ''}>${tr('Nouvelle', 'New')}</option><option value="analysis" ${item.status === 'analysis' ? 'selected' : ''}>${tr('En analyse', 'In review')}</option><option value="quote" ${item.status === 'quote' ? 'selected' : ''}>${tr('Devis envoyé', 'Quote sent')}</option><option value="progress" ${item.status === 'progress' ? 'selected' : ''}>${tr('En cours', 'In progress')}</option><option value="done" ${item.status === 'done' ? 'selected' : ''}>${tr('Terminée', 'Completed')}</option></select></label>`}
  </article>`).join('');
}

function adminContentRows(data) {
  return data.content.map((item) => `<article class="admin-content-row" data-admin-row="content" data-search-text="${[item.area.fr, item.area.en, item.title.fr, item.title.en].join(' ').toLowerCase()}">
    <div class="admin-content-type"><span>${item.type[state.locale] || item.type.fr}</span><b>${item.id.toUpperCase()}</b></div>
    <div class="admin-content-copy"><b>${item.title[state.locale] || item.title.fr}</b><small>${item.area[state.locale] || item.area.fr}</small></div>
    ${adminStatus(item.status)}
    <small class="admin-date">${item.updated}</small>
    <button type="button" class="admin-row-link" data-admin-edit="content" data-admin-id="${item.id}">${tr('Modifier', 'Edit')}</button>
  </article>`).join('');
}

function adminTrainingRows(data) {
  return data.training.map((course, index) => `<article class="admin-training-row" data-admin-row="training" data-search-text="${[local(course.name), local(course.category)].join(' ').toLowerCase()}">
    <span class="admin-index">${String(index + 1).padStart(2, '0')}</span>
    <div class="admin-training-copy"><b>${local(course.name)}</b><small>${local(course.category)}</small></div>
    <div class="admin-training-stat"><b>${course.learners}</b><small>${tr('inscrits', 'learners')}</small></div>
    <div class="admin-training-stat"><b>${course.sessions}</b><small>${tr('sessions', 'sessions')}</small></div>
    ${adminStatus(course.status)}
    <button type="button" class="admin-row-link" data-admin-toggle-training="${course.id}">${course.status === 'published' ? tr('Dépublier', 'Unpublish') : tr('Publier', 'Publish')}</button>
  </article>`).join('');
}

function adminProductRows(mode, data) {
  return products[mode].map((item, index) => {
    const active = data.inventory[mode]?.[index] !== false;
    return `<article class="admin-product-row" data-admin-row="stores" data-search-text="${[local(item.name), local(item.category), local(item.detail)].join(' ').toLowerCase()}">
      <div class="admin-product-thumb"><img src="${AS}${item.image}" alt="" loading="lazy"></div>
      <div class="admin-product-copy"><b>${local(item.name)}</b><small>${local(item.category)}</small><p>${local(item.detail)}</p></div>
      <span class="admin-live-dot ${active ? 'is-live' : ''}">${active ? tr('Visible', 'Live') : tr('Masqué', 'Hidden')}</span>
      <button type="button" class="admin-row-link" data-admin-product="${mode}:${index}">${active ? tr('Masquer', 'Hide') : tr('Publier', 'Publish')}</button>
    </article>`;
  }).join('');
}

function adminMediaRows(data) {
  return data.media.map((item) => `<article class="admin-media-row" data-admin-row="media" data-search-text="${[item.name.fr, item.name.en, item.type.fr, item.type.en].join(' ').toLowerCase()}">
    <div class="admin-media-preview"><video muted playsinline preload="metadata"><source src="${AS}${item.file}" type="video/mp4"></video><span>${tr('Aperçu', 'Preview')}</span></div>
    <div class="admin-media-copy"><span>${item.type[state.locale] || item.type.fr}</span><b>${item.name[state.locale] || item.name.fr}</b><small>${item.file}</small></div>
    ${adminStatus(item.status)}<small class="admin-date">${item.updated}</small>
    <button type="button" class="admin-row-link" data-admin-toggle-media="${item.id}">${item.status === 'published' ? tr('Archiver', 'Archive') : tr('Publier', 'Publish')}</button>
  </article>`).join('');
}

function adminViewMarkup(view, data) {
  const openRequests = data.requests.filter((item) => !['done'].includes(item.status)).length;
  const publishedContent = data.content.filter((item) => item.status === 'published').length;
  const publishedTraining = data.training.filter((item) => item.status === 'published').length;
  const liveProducts = [...(data.inventory.tech || []), ...(data.inventory.print || [])].filter(Boolean).length;
  if (view === 'content') return `<section class="admin-view admin-view--content">
    <div class="admin-toolbar"><label class="admin-search"><span>⌕</span><input type="search" data-admin-search="content" placeholder="${tr('Rechercher une page ou un univers', 'Search a page or capability')}"></label><button type="button" class="admin-action-button admin-action-button--accent" data-admin-action="new-content">${tr('Nouveau contenu', 'New content')}</button></div>
    <div class="admin-table-head"><span>${tr('Page / univers', 'Page / capability')}</span><span>${tr('Statut', 'Status')}</span><span>${tr('Mise à jour', 'Updated')}</span><span></span></div>
    <div class="admin-content-list">${adminContentRows(data)}</div>
  </section>`;
  if (view === 'services') return `<section class="admin-view admin-view--services">
    <div class="admin-toolbar"><label class="admin-search"><span>⌕</span><input type="search" data-admin-search="requests" placeholder="${tr('Rechercher par dossier, client ou univers', 'Search by case, client or capability')}"></label><button type="button" class="admin-action-button" data-admin-view="content">${tr('Voir les contenus', 'View content')}</button></div>
    <div class="admin-service-note"><span>${openRequests}</span><div><b>${tr('demandes ouvertes', 'open requests')}</b><small>${tr('Les statuts sont sauvegardés dans ce navigateur.', 'Statuses are saved in this browser.')}</small></div></div>
    <div class="admin-request-list">${adminRequestsRows(data)}</div>
  </section>`;
  if (view === 'training') return `<section class="admin-view admin-view--training">
    <div class="admin-toolbar"><label class="admin-search"><span>⌕</span><input type="search" data-admin-search="training" placeholder="${tr('Rechercher une formation', 'Search a course')}"></label><button type="button" class="admin-action-button admin-action-button--accent" data-admin-action="new-training">${tr('Ajouter un module', 'Add a module')}</button></div>
    <div class="admin-training-summary"><div><b>${publishedTraining}</b><span>${tr('modules publiés', 'published modules')}</span></div><div><b>${data.training.reduce((total, item) => total + item.learners, 0)}</b><span>${tr('apprenants suivis', 'learners tracked')}</span></div><div><b>${data.training.reduce((total, item) => total + item.sessions, 0)}</b><span>${tr('sessions planifiées', 'planned sessions')}</span></div></div>
    <div class="admin-training-list">${adminTrainingRows(data)}</div>
  </section>`;
  if (view === 'stores') return `<section class="admin-view admin-view--stores">
    <div class="admin-toolbar"><label class="admin-search"><span>⌕</span><input type="search" data-admin-search="stores" placeholder="${tr('Rechercher un produit', 'Search a product')}"></label><span class="admin-toolbar-stat">${liveProducts} / ${products.tech.length + products.print.length} ${tr('offres visibles', 'offers live')}</span></div>
    <div class="admin-store-section"><div class="admin-store-heading"><div><span>01 / IT</span><h2>${tr('Boutique informatique', 'IT store')}</h2></div><a href="${pageHref('/informatique/boutique')}" data-link class="admin-row-link">${tr('Voir la boutique', 'View store')}</a></div><div class="admin-product-list">${adminProductRows('tech', data)}</div></div>
    <div class="admin-store-section"><div class="admin-store-heading"><div><span>02 / PRINT</span><h2>${tr('Boutique imprimerie', 'Print store')}</h2></div><a href="${pageHref('/imprimerie/boutique')}" data-link class="admin-row-link">${tr('Voir la boutique', 'View store')}</a></div><div class="admin-product-list">${adminProductRows('print', data)}</div></div>
  </section>`;
  if (view === 'media') return `<section class="admin-view admin-view--media">
    <div class="admin-toolbar"><label class="admin-search"><span>⌕</span><input type="search" data-admin-search="media" placeholder="${tr('Rechercher un média', 'Search media')}"></label><span class="admin-toolbar-stat">03 ${tr('vidéos natives', 'native videos')}</span></div>
    <div class="admin-media-list--full">${adminMediaRows(data)}</div>
  </section>`;
  if (view === 'settings') return `<section class="admin-view admin-view--settings">
    <div class="admin-settings-card"><div><span>${tr('QUALITÉ DU SITE', 'SITE QUALITY')}</span><h2>${tr('Des règles simples<br>pour garder MIRS <em>clair.</em>', 'Simple rules<br>to keep MIRS <em>clear.</em>')}</h2><p>${tr('Ces préférences sont enregistrées localement pour préparer la future connexion sécurisée.', 'These preferences are stored locally ahead of the future secure connection.')}</p></div><div class="admin-settings-list"><label><span><b>${tr('Recevoir les demandes publiques', 'Accept public requests')}</b><small>${tr('Laisser le formulaire de contact actif.', 'Keep the contact form active.')}</small></span><input type="checkbox" data-admin-setting="publicRequests" ${data.settings.publicRequests ? 'checked' : ''}></label><label><span><b>${tr('Publier les deux langues', 'Publish both languages')}</b><small>${tr('Maintenir un contenu FR / EN cohérent.', 'Keep FR / EN content aligned.')}</small></span><input type="checkbox" data-admin-setting="bilingual" ${data.settings.bilingual ? 'checked' : ''}></label><label><span><b>${tr('Mode maintenance', 'Maintenance mode')}</b><small>${tr('Préparer une interruption visible du site.', 'Prepare a visible site interruption.')}</small></span><input type="checkbox" data-admin-setting="maintenance" ${data.settings.maintenance ? 'checked' : ''}></label></div></div>
    <div class="admin-settings-foot"><span>${tr('Données de démonstration locales · prêtes à être reliées à une base sécurisée.', 'Local demo data · ready to connect to a secure database.')}</span><button type="button" class="admin-action-button" data-admin-action="reset">${tr('Réinitialiser les données', 'Reset data')}</button></div>
  </section>`;
  return `<section class="admin-view admin-view--home">
    <div class="admin-kpi-grid"><article><span>${String(openRequests).padStart(2, '0')}</span><b>${tr('Demandes à traiter', 'Requests to process')}</b><small>${tr('Tous les univers confondus', 'Across all capabilities')}</small><button type="button" data-admin-view="services">${tr('Ouvrir la file', 'Open queue')}</button></article><article><span>${String(publishedContent).padStart(2, '0')}</span><b>${tr('Contenus publiés', 'Published content')}</b><small>${tr('Pages et univers actifs', 'Active pages and capabilities')}</small><button type="button" data-admin-view="content">${tr('Gérer le site', 'Manage site')}</button></article><article><span>${String(publishedTraining).padStart(2, '0')}</span><b>${tr('Formations actives', 'Active courses')}</b><small>${tr('Modules disponibles', 'Available modules')}</small><button type="button" data-admin-view="training">${tr('Voir Academy', 'View Academy')}</button></article><article><span>${String(liveProducts).padStart(2, '0')}</span><b>${tr('Offres visibles', 'Live offers')}</b><small>${tr('Informatique + imprimerie', 'IT + print')}</small><button type="button" data-admin-view="stores">${tr('Gérer les boutiques', 'Manage stores')}</button></article></div>
    <div class="admin-home-grid"><section class="admin-card"><div class="admin-card-head"><div><span>${tr('À TRAITER', 'TO PROCESS')}</span><h2>${tr('Les dernières demandes', 'Latest requests')}</h2></div><button type="button" class="admin-row-link" data-admin-view="services">${tr('Tout voir', 'View all')}</button></div><div class="admin-request-list admin-request-list--compact">${adminRequestsRows(data, true)}</div></section><section class="admin-card"><div class="admin-card-head"><div><span>${tr('SANTÉ DU SITE', 'SITE HEALTH')}</span><h2>${tr('Une lecture rapide', 'A quick read')}</h2></div><button type="button" class="admin-row-link" data-admin-view="settings">${tr('Paramètres', 'Settings')}</button></div><div class="admin-health-list"><div><span class="admin-health-dot is-good"></span><b>${tr('Pages publiques', 'Public pages')}</b><small>${publishedContent} / ${data.content.length} ${tr('publiées', 'published')}</small></div><div><span class="admin-health-dot is-good"></span><b>${tr('Médias immersifs', 'Immersive media')}</b><small>${data.media.length} ${tr('vidéos natives', 'native videos')}</small></div><div><span class="admin-health-dot ${data.settings.bilingual ? 'is-good' : 'is-warning'}"></span><b>${tr('Version anglaise', 'English version')}</b><small>${data.settings.bilingual ? tr('Active', 'Active') : tr('À vérifier', 'Needs review')}</small></div><div><span class="admin-health-dot ${data.settings.maintenance ? 'is-warning' : 'is-good'}"></span><b>${tr('Disponibilité du site', 'Site availability')}</b><small>${data.settings.maintenance ? tr('Mode maintenance', 'Maintenance mode') : tr('Opérationnel', 'Operational')}</small></div></div></section></div>
    <section class="admin-card admin-card--universes"><div class="admin-card-head"><div><span>${tr('CINQ UNIVERS', 'FIVE CAPABILITIES')}</span><h2>${tr('Chaque pôle a son espace de gestion.', 'Each capability has its own workspace.')}</h2></div><button type="button" class="admin-row-link" data-admin-view="content">${tr('Modifier les pages', 'Edit pages')}</button></div><div class="admin-universe-grid">${universes.map((unit) => `<button type="button" data-admin-view="content"><span>${unit.index}</span><b>${local(unit.name)}</b><small>${unit.signal}</small></button>`).join('')}</div></section>
  </section>`;
}

function dashboard() {
  if (!adminAuthenticated()) return adminLogin();
  const labels = {
    home: tr('Vue d’ensemble', 'Overview'),
    content: tr('Contenus du site', 'Site content'),
    services: tr('Demandes de services', 'Service requests'),
    training: tr('Formations', 'Training'),
    stores: tr('Boutiques', 'Stores'),
    media: tr('Médias & vidéos', 'Media & videos'),
    settings: tr('Paramètres', 'Settings'),
  };
  const data = adminData();
  const view = state.adminView || 'home';
  const requestCount = data.requests.filter((item) => !['done'].includes(item.status)).length;
  return shell(`<main class="admin-app">
    <header class="admin-topbar"><div class="admin-topbar__context"><span>MIRS / ADMINISTRATION</span><b>${tr('Poste de pilotage', 'Control room')}</b></div><div class="admin-topbar__actions"><span class="admin-local-state"><i></i>${tr('Données locales', 'Local data')}</span><a href="${pageHref('/') }" data-link>${tr('Retour au site', 'Return to site')}</a><a href="${alternateLanguageHref()}" data-link>${state.locale === 'fr' ? 'EN' : 'FR'}</a><button type="button" data-admin-logout>${tr('Déconnexion', 'Sign out')}</button><button type="button" data-theme aria-label="${tr('Changer de thème', 'Change theme')}">◐</button></div></header>
    <div class="admin-layout">
      <aside class="admin-sidebar"><a href="${pageHref('/admin')}" data-link class="admin-sidebar__brand">${brandMark()}<span><b>MIRS</b><small>SPATIAL SYSTEMS</small></span></a><div class="admin-sidebar__label">${tr('ESPACES DE GESTION', 'MANAGEMENT SPACES')}</div><nav class="admin-nav" aria-label="${tr('Navigation administration', 'Administration navigation')}">${Object.entries(labels).map(([key, label]) => `<button type="button" data-admin-view="${key}" aria-current="${view === key ? 'page' : 'false'}"><span class="admin-nav__icon"></span><b>${label}</b>${key === 'services' && requestCount ? `<small>${requestCount}</small>` : ''}</button>`).join('')}</nav><div class="admin-sidebar__foot"><span>${tr('MIRS · Conakry', 'MIRS · Conakry')}</span><small>${tr('Espace de travail local', 'Local workspace')}</small></div></aside>
      <section class="admin-main">${adminViewHeading(view)}${adminViewMarkup(view, data)}</section>
    </div>
    <dialog class="admin-dialog" data-admin-dialog><form method="dialog" data-admin-content-form><div class="admin-dialog__head"><div><span>${tr('ÉDITION DE CONTENU', 'CONTENT EDITOR')}</span><h2>${tr('Mettre à jour une page.', 'Update a page.')}</h2></div><button type="button" data-admin-close-dialog aria-label="${tr('Fermer', 'Close')}">×</button></div><input type="hidden" name="id"><label>${tr('Zone', 'Area')}<input name="areaFr" required placeholder="Accueil MIRS"></label><label>${tr('Area in English', 'English area')}<input name="areaEn" required placeholder="MIRS home"></label><div class="admin-dialog__grid"><label>${tr('Titre FR', 'FR title')}<input name="titleFr" required></label><label>${tr('Titre EN', 'EN title')}<input name="titleEn" required></label></div><label>${tr('Statut', 'Status')}<select name="status"><option value="published">${tr('Publié', 'Published')}</option><option value="review">${tr('À relire', 'Review')}</option><option value="draft">${tr('Brouillon', 'Draft')}</option></select></label><div class="admin-dialog__actions"><button type="button" class="admin-action-button" data-admin-close-dialog>${tr('Annuler', 'Cancel')}</button><button type="submit" class="admin-action-button admin-action-button--accent">${tr('Enregistrer', 'Save')}</button></div></form></dialog>
    <dialog class="admin-dialog" data-admin-training-dialog><form method="dialog" data-admin-training-form><div class="admin-dialog__head"><div><span>${tr('MIRS ACADEMY', 'MIRS ACADEMY')}</span><h2>${tr('Créer un module.', 'Create a module.')}</h2></div><button type="button" data-admin-close-dialog aria-label="${tr('Fermer', 'Close')}">×</button></div><div class="admin-dialog__grid"><label>${tr('Nom FR', 'FR name')}<input name="nameFr" required placeholder="Réseaux & systèmes"></label><label>${tr('Nom EN', 'EN name')}<input name="nameEn" required placeholder="Networks & systems"></label></div><div class="admin-dialog__grid"><label>${tr('Catégorie FR', 'FR category')}<input name="categoryFr" required placeholder="Déployer et administrer"></label><label>${tr('Catégorie EN', 'EN category')}<input name="categoryEn" required placeholder="Deploy and administer"></label></div><label>${tr('Statut', 'Status')}<select name="status"><option value="draft">${tr('Brouillon', 'Draft')}</option><option value="published">${tr('Publié', 'Published')}</option></select></label><div class="admin-dialog__actions"><button type="button" class="admin-action-button" data-admin-close-dialog>${tr('Annuler', 'Cancel')}</button><button type="submit" class="admin-action-button admin-action-button--accent">${tr('Enregistrer', 'Save')}</button></div></form></dialog>
  </main>`, '/admin');
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

function checkout() {
  const entries = state.cart.length
    ? state.cart.map((item, index) => `<li data-spot><span>${String(index + 1).padStart(2, '0')}</span><b>${item}</b><button type="button" data-remove="${index}">${tr('Retirer', 'Remove')}</button></li>`).join('')
    : `<li class="nv-checkout__empty">${tr('Votre liste est encore vide. Explorez les univers pour composer un premier brief.', 'Your list is still empty. Explore the capabilities to compose a first brief.')}</li>`;
  return shell(`<main class="nv-checkout">
    <section class="nv-page-hero" data-hero>
      <div class="nv-hero__aurora" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="nv-hero__grid" aria-hidden="true"></div>
      <div class="nv-wrap nv-page-hero__layout">
        <div class="nv-hero__meta" data-nv="fade"><span>${tr('VOTRE LISTE', 'YOUR LIST')}</span><span>${tr('PREMIER BRIEF', 'FIRST BRIEF')}</span><span>${String(state.cart.length).padStart(2, '0')} ${tr('ÉLÉMENTS', 'ITEMS')}</span></div>
        ${sectionTitle(tr('Ce qui mérite une <em>conversation.</em>', 'What deserves a <em>conversation.</em>'), 'nv-page-hero__title', 'h1')}
        <p data-nv="up" style="--d:200ms">${tr('La liste ne remplace pas un devis : elle permet de commencer avec les bons repères.', 'The list does not replace a quotation: it helps start with the right reference points.')}</p>
      </div>
    </section>
    <section class="nv-section nv-wrap nv-checkout__layout">
      <div class="nv-checkout__list"><h2>${state.cart.length ? tr('Votre sélection', 'Your selection') : tr('Pas encore de sélection', 'No selection yet')}</h2><ol data-checkout-list>${entries}</ol></div>
      <aside class="nv-checkout__note" data-spot><span>${tr('PROCHAINE ÉTAPE', 'NEXT STEP')}</span><h2>${tr('Mettre cette liste dans son contexte.', 'Put this list into context.')}</h2><p>${tr('Expliquez le besoin ; MIRS revient vers vous avec une première lecture.', 'Explain the need; MIRS comes back with an initial reading.')}</p>${button('/contact', tr('Préparer le brief', 'Prepare the brief'), 'primary')}</aside>
    </section>
  </main>`, '/checkout');
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

function updateCartPresentation() {
  document.querySelectorAll('[data-cart-count]').forEach((node) => { node.textContent = state.cart.length; });
  const drawer = document.querySelector('[data-cart-drawer]');
  if (drawer) drawer.innerHTML = cartPanel();
  const list = document.querySelector('[data-checkout-list]');
  if (list && pageRoute() === '/checkout') renderRoute(location.pathname, { preserveScroll: true });
}

function persistCart() {
  localStorage.setItem('mirs-future-cart', JSON.stringify(state.cart));
}

function setCartOpen(open) {
  document.body.classList.toggle('cart-open', open);
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

function bind() {
  routeAbort?.abort();
  routeAbort = new AbortController();
  const { signal } = routeAbort;
  const root = document.getElementById('app');
  root.addEventListener('click', (event) => {
    const routeLink = event.target.closest('[data-link]');
    if (routeLink && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
      event.preventDefault();
      setCartOpen(false);
      document.body.classList.remove('menu-open');
      navigate(routeLink.getAttribute('href'));
      return;
    }
    const anchorLink = event.target.closest('[data-anchor]');
    if (anchorLink) {
      event.preventDefault();
      const id = anchorLink.dataset.anchor;
      document.body.classList.remove('menu-open');
      if (pageRoute() !== '/') navigate(`${pageHref('/')}#${id}`);
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (event.target.closest('[data-totop]')) {
      scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      return;
    }
    if (event.target.closest('button[data-theme]')) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('mirs-future-theme', state.theme);
      document.documentElement.dataset.theme = state.theme;
      return;
    }
    if (event.target.closest('[data-admin-logout]')) {
      adminLogout();
      state.adminView = 'home';
      renderRoute(location.pathname, { preserveScroll: true });
      return;
    }
    const menuButton = event.target.closest('[data-menu]');
    if (menuButton) {
      const open = document.body.classList.toggle('menu-open');
      menuButton.setAttribute('aria-expanded', String(open));
      document.querySelector('[data-header]')?.classList.remove('is-hidden');
      return;
    }
    if (event.target.closest('[data-cart]')) {
      setCartOpen(true);
      return;
    }
    if (event.target.closest('[data-close-cart]')) {
      setCartOpen(false);
      return;
    }
    const add = event.target.closest('[data-add]');
    if (add) {
      state.cart.push(add.dataset.add);
      persistCart();
      updateCartPresentation();
      setCartOpen(true);
      return;
    }
    const remove = event.target.closest('[data-remove]');
    if (remove) {
      state.cart.splice(Number(remove.dataset.remove), 1);
      persistCart();
      updateCartPresentation();
      return;
    }
    const filter = event.target.closest('[data-filter]');
    if (filter) {
      const value = filter.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach((buttonNode) => buttonNode.classList.toggle('is-active', buttonNode === filter));
      document.querySelectorAll('[data-product-card]').forEach((card) => {
        card.hidden = value !== 'all' && card.dataset.category !== value;
      });
      positionFilterPill();
      return;
    }
    const adminViewButton = event.target.closest('[data-admin-view]');
    if (adminViewButton) {
      state.adminView = adminViewButton.dataset.adminView || 'home';
      renderRoute(location.pathname, { preserveScroll: true });
      return;
    }
    const adminEdit = event.target.closest('[data-admin-edit="content"]');
    if (adminEdit) {
      const record = adminData().content.find((item) => item.id === adminEdit.dataset.adminId);
      const dialog = document.querySelector('[data-admin-dialog]');
      const form = dialog?.querySelector('[data-admin-content-form]');
      if (record && dialog && form) {
        form.elements.id.value = record.id;
        form.elements.areaFr.value = record.area.fr;
        form.elements.areaEn.value = record.area.en;
        form.elements.titleFr.value = record.title.fr;
        form.elements.titleEn.value = record.title.en;
        form.elements.status.value = record.status;
        dialog.showModal();
      }
      return;
    }
    const adminAction = event.target.closest('[data-admin-action]');
    if (adminAction?.dataset.adminAction === 'new-content') {
      const dialog = document.querySelector('[data-admin-dialog]');
      const form = dialog?.querySelector('[data-admin-content-form]');
      if (dialog && form) {
        form.reset();
        form.elements.id.value = '';
        form.elements.status.value = 'draft';
        dialog.showModal();
      }
      return;
    }
    if (adminAction?.dataset.adminAction === 'new-training') {
      const dialog = document.querySelector('[data-admin-training-dialog]');
      const form = dialog?.querySelector('[data-admin-training-form]');
      if (dialog && form) {
        form.reset();
        form.elements.status.value = 'draft';
        dialog.showModal();
      }
      return;
    }
    if (adminAction?.dataset.adminAction === 'reset') {
      if (window.confirm(tr('Réinitialiser les données locales du dashboard ?', 'Reset local dashboard data?'))) {
        saveAdminData(adminSeed());
        renderRoute(location.pathname, { preserveScroll: true });
      }
      return;
    }
    const closeAdminDialog = event.target.closest('[data-admin-close-dialog]');
    if (closeAdminDialog) {
      closeAdminDialog.closest('dialog')?.close();
      return;
    }
    const trainingToggle = event.target.closest('[data-admin-toggle-training]');
    if (trainingToggle) {
      const data = adminData();
      const course = data.training.find((item) => item.id === trainingToggle.dataset.adminToggleTraining);
      if (course) course.status = course.status === 'published' ? 'draft' : 'published';
      saveAdminData(data);
      renderRoute(location.pathname, { preserveScroll: true });
      return;
    }
    const mediaToggle = event.target.closest('[data-admin-toggle-media]');
    if (mediaToggle) {
      const data = adminData();
      const media = data.media.find((item) => item.id === mediaToggle.dataset.adminToggleMedia);
      if (media) media.status = media.status === 'published' ? 'draft' : 'published';
      saveAdminData(data);
      renderRoute(location.pathname, { preserveScroll: true });
      return;
    }
    const productToggle = event.target.closest('[data-admin-product]');
    if (productToggle) {
      const data = adminData();
      const [mode, rawIndex] = productToggle.dataset.adminProduct.split(':');
      const index = Number(rawIndex);
      if (Array.isArray(data.inventory[mode])) data.inventory[mode][index] = data.inventory[mode][index] === false;
      saveAdminData(data);
      renderRoute(location.pathname, { preserveScroll: true });
      return;
    }
    const adminTab = event.target.closest('[data-admin-tab]');
    if (adminTab) {
      const panel = adminTab.dataset.adminTab;
      document.querySelectorAll('[data-admin-tab]').forEach((buttonNode) => buttonNode.setAttribute('aria-selected', String(buttonNode === adminTab)));
      document.querySelectorAll('[data-admin-panel]').forEach((panelNode) => { panelNode.hidden = panelNode.dataset.adminPanel !== panel; });
      return;
    }
    const video = event.target.closest('[data-video]');
    if (video) {
      openVideo(video.dataset.video, video.dataset.videoTitle);
      return;
    }
    if (event.target.closest('[data-close-video]')) {
      closeVideo();
    }
  }, { signal });

  root.addEventListener('input', (event) => {
    const search = event.target.closest('[data-admin-search]');
    if (!search) return;
    const value = search.value.trim().toLowerCase();
    const scope = search.dataset.adminSearch;
    root.querySelectorAll(`[data-admin-row="${scope}"]`).forEach((row) => {
      row.hidden = value && !row.dataset.searchText.includes(value);
    });
  }, { signal });

  root.addEventListener('change', (event) => {
    const statusSelect = event.target.closest('[data-admin-request-status]');
    if (statusSelect) {
      const data = adminData();
      const request = data.requests.find((item) => item.id === statusSelect.dataset.adminRequestStatus);
      if (request) {
        request.status = statusSelect.value;
        request.updated = new Date().toLocaleDateString('fr-FR').replaceAll('/', '.');
      }
      saveAdminData(data);
      renderRoute(location.pathname, { preserveScroll: true });
      return;
    }
    const setting = event.target.closest('[data-admin-setting]');
    if (setting) {
      const data = adminData();
      data.settings[setting.dataset.adminSetting] = setting.checked;
      saveAdminData(data);
      renderRoute(location.pathname, { preserveScroll: true });
    }
  }, { signal });

  root.addEventListener('submit', (event) => {
    const loginForm = event.target.closest('[data-admin-login]');
    if (loginForm) {
      event.preventDefault();
      const formData = new FormData(loginForm);
      const username = String(formData.get('username') || '').trim();
      const password = String(formData.get('password') || '');
      const status = loginForm.querySelector('[data-admin-login-status]');
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        try {
          sessionStorage.setItem(ADMIN_SESSION_KEY, 'authenticated');
        } catch {
          if (status) status.textContent = tr('La session ne peut pas être enregistrée dans ce navigateur.', 'This browser cannot store the session.');
          return;
        }
        state.adminView = 'home';
        renderRoute(location.pathname, { preserveScroll: true });
      } else if (status) {
        status.textContent = tr('Identifiant ou mot de passe incorrect.', 'Incorrect username or password.');
        loginForm.classList.remove('is-invalid');
        requestAnimationFrame(() => loginForm.classList.add('is-invalid'));
        loginForm.elements.password.value = '';
        loginForm.elements.username.focus();
      }
      return;
    }
    const trainingForm = event.target.closest('[data-admin-training-form]');
    if (trainingForm) {
      event.preventDefault();
      const formData = new FormData(trainingForm);
      const data = adminData();
      data.training.push({
        id: `course-${Date.now()}`,
        name: { fr: String(formData.get('nameFr') || '').trim(), en: String(formData.get('nameEn') || '').trim() },
        category: { fr: String(formData.get('categoryFr') || '').trim(), en: String(formData.get('categoryEn') || '').trim() },
        status: String(formData.get('status') || 'draft'),
        sessions: 0,
        learners: 0,
        capacity: 18,
      });
      saveAdminData(data);
      document.querySelector('[data-admin-training-dialog]')?.close();
      state.adminView = 'training';
      renderRoute(location.pathname, { preserveScroll: true });
      return;
    }
    const adminForm = event.target.closest('[data-admin-content-form]');
    if (adminForm) {
      event.preventDefault();
      const formData = new FormData(adminForm);
      const data = adminData();
      const id = String(formData.get('id') || '').trim() || `content-${Date.now()}`;
      const record = {
        id,
        area: { fr: String(formData.get('areaFr') || '').trim(), en: String(formData.get('areaEn') || '').trim() },
        type: { fr: tr('Page', 'Page'), en: 'Page' },
        title: { fr: String(formData.get('titleFr') || '').trim(), en: String(formData.get('titleEn') || '').trim() },
        status: String(formData.get('status') || 'draft'),
        updated: new Date().toLocaleDateString('fr-FR').replaceAll('/', '.'),
      };
      const existing = data.content.findIndex((item) => item.id === id);
      if (existing >= 0) data.content[existing] = { ...data.content[existing], ...record };
      else data.content.unshift(record);
      saveAdminData(data);
      document.querySelector('[data-admin-dialog]')?.close();
      state.adminView = 'content';
      renderRoute(location.pathname, { preserveScroll: true });
      return;
    }
    const form = event.target.closest('[data-contact-form]');
    if (!form) return;
    event.preventDefault();
    const data = new FormData(form);
    const message = [
      `Bonjour MIRS, je suis ${data.get('name')}.`,
      data.get('company') ? `Organisation : ${data.get('company')}` : '',
      `Sujet : ${data.get('topic')}`,
      `Contact : ${data.get('email')}`,
      `Besoin : ${data.get('message')}`,
    ].filter(Boolean).join('\n');
    const status = form.querySelector('[data-form-status]');
    status.textContent = tr('Ouverture de WhatsApp avec votre demande préremplie…', 'Opening WhatsApp with your pre-filled request…');
    window.open(`https://wa.me/224622051321?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  }, { signal });

  document.documentElement.dataset.theme = state.theme;
  setupMotion(signal);
}

function renderRoute(path = location.pathname, options = {}) {
  const info = routeInfo(path);
  state.locale = info.locale;
  const clean = info.route;
  const markup = clean === '/' ? home()
    : clean === '/informatique' ? branch('informatique')
      : clean === '/imprimerie' ? branch('imprimerie')
        : clean === '/formation' ? training()
          : clean === '/creation-agence' ? branch('creation-agence')
            : clean === '/maintenance' ? branch('maintenance')
              : clean === '/informatique/boutique' ? shop('tech')
                : clean === '/imprimerie/boutique' ? shop('print')
                  : clean === '/realisations' ? projects()
                    : clean === '/contact' ? contact()
                      : clean === '/checkout' ? checkout()
                        : clean === '/admin' ? dashboard()
                          : notFound();
  closeVideo();
  document.body.classList.remove('menu-open', 'cart-open');
  document.body.classList.toggle('is-nova', clean !== '/admin');
  document.getElementById('app').innerHTML = markup;
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.lang = state.locale;
  document.title = clean === '/' ? 'MIRS — Spatial Systems' : `MIRS — ${clean.split('/').filter(Boolean).pop().replaceAll('-', ' ')}`;
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
