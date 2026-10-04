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
  { path: '/creation-agence', key: 'creation-agence', index: '04', signal: 'CRÉATION', name: { fr: 'Création d’agence', en: 'Agency creation' }, title: { fr: 'Une agence prête à <em>opérer.</em>', en: 'An agency ready to <em>operate.</em>' }, detail: { fr: 'Positionnement, identité, outils et cadre opérationnel pour construire une agence cohérente.', en: 'Positioning, identity, tools and operating framework for a coherent agency.' }, image: 'future/references-enterprises.jpg', className: 'agency' },
  { path: '/maintenance', key: 'maintenance', index: '05', signal: 'CONTINUITÉ', name: { fr: 'Maintenance', en: 'Maintenance' }, title: { fr: 'Préserver ce qui <em>fonctionne.</em>', en: 'Keep what <em>works.</em>' }, detail: { fr: 'Prévention, intervention et suivi pour préserver la disponibilité de vos environnements.', en: 'Prevention, intervention and follow-up to preserve system availability.' }, image: 'editorial/maintenance-pc.jpg', className: 'maintenance' },
];

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

const link = (path, label, className = '') => `<a href="${pageHref(path)}" data-link class="${className}"><span>${label}</span><i aria-hidden="true">↗</i></a>`;
const button = (path, label, className = '') => link(path, label, `button-link ${className}`.trim());
const anchor = (id, label, className = '') => `<a href="${pageHref('/')}#${id}" data-anchor="${id}" class="${className}"><span>${label}</span><i aria-hidden="true">↓</i></a>`;
const eyebrow = (copy) => `<p class="eyebrow"><span></span>${copy}</p>`;
const sectionTitle = (copy, extra = '') => `<h2 class="display-title ${extra}" data-reveal>${copy}</h2>`;

function logoCell(file) {
  return `<figure class="logo-cell"><img src="${AS}${file}" alt="" loading="lazy" decoding="async"></figure>`;
}

function logoBands(compact = false) {
  const groups = [clientLogos.slice(0, 27), clientLogos.slice(27, 54), clientLogos.slice(54, 81)];
  return `<div class="logo-bands ${compact ? 'is-compact' : ''}" aria-label="81 organisations accompagnées par MIRS">
    ${groups.map((group, index) => `<div class="logo-lane logo-lane-${index + 1}"><div class="logo-track">${[...group, ...group].map(logoCell).join('')}</div></div>`).join('')}
  </div>`;
}

function brandMark() {
  return `<span class="brand-mark" aria-hidden="true"><img class="brand-logo brand-logo--color" src="${AS}mirs-logo.png" alt=""><img class="brand-logo brand-logo--white" src="${AS}mirs-media/mirs-logo-white-transparent.png" alt=""></span>`;
}

function universeCards() { return universes.map((item) => `<article class="universe-card universe-card--${item.className}" data-tilt><div class="universe-card__media"><img src="${AS}${item.image}" alt="${local(item.name)} — MIRS" loading="lazy"><div class="universe-card__veil"></div><span class="card-index">${item.index} / ${item.signal}</span></div><div class="universe-card__content"><span class="card-kicker">${local(item.name)}</span><h3>${local(item.title)}</h3><p>${local(item.detail)}</p>${button(item.path, tr('Découvrir', 'Discover'), 'quiet')}</div></article>`).join(''); }

function homeProductCard(item, mode) {
  const name = local(item.name);
  return `<article class="home-product-card home-product-card--${mode}" data-reveal>
    <div class="home-product-card__image"><img src="${AS}${item.image}" alt="${name}" loading="lazy"><span>${mode === 'tech' ? 'MIRS / IT' : 'MIRS / PRINT'}</span></div>
    <div><small>${local(item.category)}</small><h3>${name}</h3><p>${local(item.detail)}</p><button type="button" data-add="${name}">${tr('Ajouter au brief', 'Add to brief')} <i>↗</i></button></div>
  </article>`;
}

function header() {
  return `<header class="site-header" data-header>
    <a href="${pageHref('/')}" data-link class="brand" aria-label="MIRS — accueil">
      ${brandMark()}
      <span><b>MIRS</b><small>SPATIAL SYSTEMS</small></span>
    </a>
    <nav class="desktop-nav" aria-label="Navigation principale">
      <a href="${pageHref('/')}#univers" data-anchor="univers">${tr('Univers', 'Capabilities')}</a>
      <a href="${pageHref('/')}#references" data-anchor="references">${tr('Références', 'References')}</a>
      ${link('/realisations', tr('Réalisations', 'Projects'), 'nav-route')}
      ${link('/formation', 'Academy', 'nav-route')}
    </nav>
    <div class="header-actions">
      <a class="language-switch" href="${alternateLanguageHref()}" data-link aria-label="${tr('Passer en anglais', 'Switch to French')}">${state.locale === 'fr' ? 'EN' : 'FR'}</a>
      <button type="button" class="theme-button" data-theme aria-label="${tr('Changer de thème', 'Change theme')}" title="${tr('Changer de thème', 'Change theme')}"><span>◐</span></button>
      <button type="button" data-cart class="cart-button" aria-label="${tr('Ouvrir la liste de projet', 'Open project list')}"><span>${tr('Projet', 'Project')}</span><b data-cart-count>${state.cart.length}</b></button>
      ${button('/contact', tr('Parler à MIRS', 'Talk to MIRS'), 'header-cta primary')}
      <button type="button" class="menu-button" data-menu aria-controls="mobile-navigation" aria-expanded="false"><span></span><span></span><span class="sr-only">Menu</span></button>
    </div>
  </header>
  <aside class="mobile-navigation" id="mobile-navigation" data-mobile-menu hidden>
    <a href="${pageHref('/')}#univers" data-anchor="univers">${tr('Nos univers', 'Our capabilities')} <i>↓</i></a>
    <a href="${pageHref('/')}#references" data-anchor="references">${tr('Nos références', 'Our references')} <i>↓</i></a>
    ${link('/creation-agence', tr('Création d’agence', 'Agency creation'))}
    ${link('/maintenance', tr('Maintenance', 'Maintenance'))}
    ${link('/realisations', tr('Réalisations', 'Projects'))}
    ${link('/formation', 'MIRS Academy')}
    ${link('/contact', tr('Démarrer un projet', 'Start a project'), 'button-link primary')}
  </aside>`;
}

function footer() {
  return `<footer class="site-footer">
    <div class="footer-intro">
      <a href="${pageHref('/')}" data-link class="brand">${brandMark()}<span><b>MIRS</b><small>SPATIAL SYSTEMS</small></span></a>
      <p>${tr('Solutions intégrées pour les opérations, la visibilité et les compétences.', 'Integrated solutions for operations, visibility and capabilities.')}</p>
    </div>
    <div class="footer-list"><span>Conakry · Guinée</span><a href="tel:+224622051321">+224 622 05 13 21</a><a href="https://wa.me/224622051321" target="_blank" rel="noreferrer">WhatsApp ↗</a></div>
    <div class="footer-list"><span>${tr('Univers', 'Capabilities')}</span>${universes.map((unit) => link(unit.path, local(unit.name))).join('')}</div>
    <div class="footer-bottom"><span>© ${new Date().getFullYear()} MIRS Spatial Systems</span><span>${tr('Concevoir · Déployer · Accompagner', 'Design · Deploy · Support')}</span><a href="${pageHref('/admin')}" data-link>${tr('Administration', 'Administration')}</a></div>
  </footer>`;
}

function cartPanel() {
  const entries = state.cart.length
    ? state.cart.map((item, index) => `<li><span>${item}</span><button type="button" data-remove="${index}" aria-label="Retirer ${item}">×</button></li>`).join('')
    : '<li class="cart-empty">Votre liste est vide. Ajoutez une piste à explorer.</li>';
  return `<div class="cart-panel__head"><span>PROJET / ${String(state.cart.length).padStart(2, '0')}</span><button type="button" data-close-cart aria-label="Fermer">×</button></div>
    <h2>Votre liste de départ.</h2>
    <ul>${entries}</ul>
    ${state.cart.length ? `<a class="button-link primary" href="${pageHref('/checkout')}" data-link><span>Préparer le brief</span><i>↗</i></a>` : `<p class="cart-note">Une offre, un support ou une formation : ajoutez ce qui mérite une conversation.</p>`}`;
}

function overlays() {
  return `<div class="cart-scrim" data-close-cart></div>
    <aside class="cart-drawer" data-cart-drawer aria-label="Liste de projet">${cartPanel()}</aside>
    <dialog class="video-modal" data-video-modal>
      <button type="button" class="video-close" data-close-video aria-label="Fermer la vidéo">×</button>
      <div class="video-modal__body" data-video-body></div>
    </dialog>`;
}

function shell(content, route = '') {
  return `<div class="site-shell route-${route.replaceAll('/', '-').replace(/^-/, '') || 'home'}">
    <div class="scroll-meter" aria-hidden="true"><span data-scroll-meter></span></div>
    ${header()}
    ${content}
    ${footer()}
    ${overlays()}
  </div>`;
}

function home() {
  return shell(`<main>
    <section class="portal-hero" id="top">
      <div class="portal-grid" aria-hidden="true"></div>
      <div class="portal-stars" aria-hidden="true"></div>
      <div class="hero-orbit orbit-a" data-depth="0.08"></div>
      <div class="hero-orbit orbit-b" data-depth="-0.05"></div>
      <div class="hero-frame">
        <div class="hero-meta"><span>MIRS / CONAKRY</span><span>${tr('DEPUIS 2006', 'SINCE 2006')}</span><span>09° 31' N · 13° 42' W</span></div>
        <div class="hero-copy">
          ${eyebrow(tr('SOLUTIONS INTÉGRÉES', 'INTEGRATED SOLUTIONS'))}
          <h1 class="hero-title" data-reveal>${tr('Des solutions<br>intégrées qui<br><em>font avancer.</em>', 'Integrated<br>solutions for<br><em>performance.</em>')}</h1>
          <p class="hero-intro">${tr('MIRS conçoit, déploie et accompagne des solutions fiables qui renforcent vos opérations, votre visibilité et les compétences de vos équipes.', 'MIRS designs, deploys and supports reliable solutions that strengthen operations, visibility and team capabilities.')}</p>
          <div class="hero-actions">${button('/contact', tr('Échanger avec un expert', 'Speak with an expert'), 'primary')}${anchor('univers', tr('Découvrir nos pôles', 'Explore our capabilities'), 'quiet')}</div>
        </div>
        <div class="hero-core" data-tilt aria-label="${tr('Une scène abstraite représentant les cinq univers MIRS', 'An abstract scene representing MIRS five capabilities')}">
          <div class="core-glow"></div><div class="core-ring ring-one"></div><div class="core-ring ring-two"></div>
          <div class="core-card core-card--data"><small>01 / IT</small><b>${tr('Système<br>fiable', 'Reliable<br>systems')}</b><span>● ● ●</span></div>
          <div class="core-card core-card--print"><small>02 / PRINT</small><b>${tr('Marque<br>visible', 'Visible<br>brand')}</b><span>CMYK</span></div>
          <div class="core-card core-card--academy"><small>03 / ACADEMY</small><b>${tr('Équipe<br>prête', 'Teams<br>ready')}</b><span>↗</span></div>
          <div class="core-axis"><span></span><span></span><span></span></div>
        </div>
        <div class="hero-foot"><span>${tr('CONCEVOIR · DÉPLOYER · ACCOMPAGNER', 'DESIGN · DEPLOY · SUPPORT')}</span><a href="#signal" data-anchor="signal" aria-label="${tr('Découvrir la suite', 'Discover more')}">SCROLL <i>↓</i></a></div>
      </div>
    </section>

    <section class="signal-ribbon" id="signal" aria-label="${tr('Les pôles d’action MIRS', 'MIRS capabilities')}">
      <div><span>${tr('INFORMATIQUE', 'IT')}</span><i>✦</i><span>${tr('IMPRIMERIE', 'PRINT')}</span><i>✦</i><span>ACADEMY</span><i>✦</i><span>${tr('CRÉATION D’AGENCE', 'AGENCY CREATION')}</span><i>✦</i><span>${tr('MAINTENANCE', 'MAINTENANCE')}</span><i>✦</i><span>${tr('INFORMATIQUE', 'IT')}</span></div>
    </section>

    <section class="field-intro section-shell">
      <div class="field-intro__index"><span>01</span><span>UN MÊME<br>SYSTÈME</span></div>
      <div class="field-intro__copy">
        ${eyebrow(tr('UN PARTENAIRE, CINQ CAPACITÉS', 'ONE PARTNER, FIVE CAPABILITIES'))}
        ${sectionTitle(tr('Un même partenaire<br>pour vos enjeux<br><em>opérationnels.</em>', 'One partner<br>for your operational<br><em>priorities.</em>'))}
        <p>${tr('Chaque univers MIRS apporte une expertise spécifique. Ensemble, ils donnent aux organisations des fondations techniques, des supports cohérents et des équipes plus autonomes.', 'Each MIRS capability brings a specific expertise. Together they provide technical foundations, coherent materials and more autonomous teams.')}</p>
        ${link('/realisations', tr('Voir les réalisations', 'View our projects'), 'text-link')}
      </div>
      <div class="field-intro__numbers" data-reveal><div><b>2006</b><span>${tr('année d’ancrage', 'year established')}</span></div><div><b>81</b><span>${tr('références visibles', 'visible references')}</span></div><div><b>05</b><span>${tr('univers complémentaires', 'connected capabilities')}</span></div></div>
    </section>

    <section class="universe-section section-shell" id="univers">
      <div class="section-top">
        <div>${eyebrow(tr('NOS UNIVERS', 'OUR CAPABILITIES'))}${sectionTitle(tr('Cinq expertises.<br>Une même exigence.', 'Five disciplines.<br>One standard.'))}</div>
        <p>${tr('Des expertises distinctes, structurées pour ouvrir la bonne conversation au bon moment.', 'Distinct capabilities designed to open the right conversation at the right time.')}</p>
      </div>
      <div class="universe-grid">${universeCards()}</div>
    </section>

    <section class="home-catalogue section-shell" aria-labelledby="home-catalogue-title">
      <div class="section-top"><div>${eyebrow(tr('BOUTIQUES MIRS', 'MIRS STORES'))}${sectionTitle(tr('Des articles<br>pour passer<br>à l’<em>action.</em>', 'Items that turn<br>projects into<br><em>action.</em>'), 'home-catalogue__title')}</div><p id="home-catalogue-title">${tr('Découvrez une sélection des boutiques informatique et imprimerie. Chaque article peut devenir le point de départ d’un devis structuré.', 'Explore a selection from the IT and print stores. Each item can be the first step toward a structured quotation.')}</p></div>
      <div class="home-catalogue__groups">
        <div class="home-catalogue__group"><div class="home-catalogue__label"><span>01</span><b>${tr('Boutique informatique', 'IT store')}</b>${link('/informatique/boutique', tr('Tout voir', 'View all'), 'text-link')}</div><div class="home-product-grid">${products.tech.slice(0, 2).map((item) => homeProductCard(item, 'tech')).join('')}</div></div>
        <div class="home-catalogue__group"><div class="home-catalogue__label"><span>02</span><b>${tr('Boutique imprimerie', 'Print store')}</b>${link('/imprimerie/boutique', tr('Tout voir', 'View all'), 'text-link')}</div><div class="home-product-grid">${products.print.slice(0, 3).map((item) => homeProductCard(item, 'print')).join('')}</div></div>
      </div>
    </section>

    <section class="mirs-film-stage mirs-film-stage--company" aria-labelledby="mirs-film-company-title">
      <div class="mirs-film-stage__meta"><span>01 / MIRS</span><p>${tr('PRÉSENTATION INSTITUTIONNELLE', 'CORPORATE PRESENTATION')}</p></div>
      <div class="mirs-film-stage__content"><div><span>${tr('MIRS EN VIDÉO', 'MIRS ON FILM')}</span><h2 id="mirs-film-company-title">${tr('L’entreprise,<br>dans son <em>élan.</em>', 'The company,<br>in <em>motion.</em>')}</h2></div><video controls playsinline preload="metadata"><source src="${AS}mirs-media/mirs-company-presentation.mp4" type="video/mp4"><p>${tr('Votre navigateur ne prend pas en charge la vidéo.', 'Your browser does not support video.')}</p></video></div>
    </section>

    <section class="mirs-film-stage mirs-film-stage--print" aria-labelledby="mirs-film-print-title">
      <div class="mirs-film-stage__meta"><span>02 / PRINT</span><p>${tr('ATELIER D’IMPRIMERIE', 'PRINT WORKSHOP')}</p></div>
      <div class="mirs-film-stage__content"><div><span>${tr('MIRS IMPRIMERIE', 'MIRS PRINT')}</span><h2 id="mirs-film-print-title">${tr('L’atelier,<br>au plus près<br>de la <em>matière.</em>', 'The workshop,<br>close to the<br><em>material.</em>')}</h2></div><video controls playsinline preload="metadata"><source src="${AS}mirs-media/mirs-print-presentation.mp4" type="video/mp4"><p>${tr('Votre navigateur ne prend pas en charge la vidéo.', 'Your browser does not support video.')}</p></video></div>
    </section>

    <section class="mirs-film-stage mirs-film-stage--digital" aria-labelledby="mirs-film-digital-title">
      <div class="mirs-film-stage__meta"><span>03 / DIGITAL</span><p>${tr('ANIMATION DIGITALE', 'DIGITAL ANIMATION')}</p></div>
      <div class="mirs-film-stage__content"><div><span>${tr('MIRS DIGITAL', 'MIRS DIGITAL')}</span><h2 id="mirs-film-digital-title">${tr('Le produit,<br>en <em>mouvement.</em>', 'The product,<br>in <em>motion.</em>')}</h2></div><video controls playsinline preload="metadata"><source src="${AS}mirs-media/mirs-macbook-motion.mp4" type="video/mp4"><p>${tr('Votre navigateur ne prend pas en charge la vidéo.', 'Your browser does not support video.')}</p></video></div>
    </section>

    <section class="system-stage">
      <div class="system-stage__backdrop"></div>
      <div class="section-shell system-stage__layout">
        <div class="system-stage__copy">${eyebrow('UNE MÉTHODE EN MOUVEMENT')}${sectionTitle('Pas de solution<br>hors-sol.<br><em>Seulement le juste<br>enchaînement.</em>')}<p>Un projet s’éclaircit lorsque l’écoute, le cadre, la production, l’accompagnement et la transmission se suivent dans le bon ordre.</p></div>
        <div class="method-stack" data-reveal>
          <article><span>01</span><div><b>Écouter</b><p>Comprendre le contexte avant de nommer la réponse.</p></div><i>↗</i></article>
          <article><span>02</span><div><b>Cadrer</b><p>Définir un terrain réaliste, une priorité et un rythme.</p></div><i>↗</i></article>
          <article><span>03</span><div><b>Produire</b><p>Déployer, imprimer ou former avec des gestes précis.</p></div><i>↗</i></article>
          <article><span>04</span><div><b>Accompagner</b><p>Rester présent au moment où la solution devient usage.</p></div><i>↗</i></article>
          <article><span>05</span><div><b>Transmettre</b><p>Laisser derrière nous plus d’autonomie que de dépendance.</p></div><i>↗</i></article>
        </div>
      </div>
    </section>

    <section class="reference-field section-shell" id="references">
      <div class="reference-head"><div>${eyebrow('UNE CARTE DE CONFIANCE')}${sectionTitle('81 identités<br>dans notre<br><em>champ d’action.</em>')}</div><p>Institutions, entreprises, PME et organisations : les marques affichées ici sont les véritables références remises par MIRS.</p></div>
      ${logoBands()}
    </section>

    <section class="work-section section-shell">
      <div class="section-top"><div>${eyebrow('QUAND LE SYSTÈME PREND FORME')}${sectionTitle('Des actions<br>qui laissent<br>une trace.')}</div>${link('/realisations', 'Parcourir les réalisations', 'text-link')}</div>
      <div class="work-rail">
        <article class="case-card case-card--wide"><img src="${AS}future/references-enterprises.jpg" alt="" loading="lazy"><div><span>INFRASTRUCTURE</span><h3>Faire circuler les opérations sans faire circuler la complexité.</h3><a href="${pageHref('/informatique')}" data-link>Voir le système ↗</a></div></article>
        <article class="case-card"><img src="${AS}editorial/impression-grand-format.jpg" alt="" loading="lazy"><div><span>IMPRIMERIE</span><h3>Donner une présence matérielle à une identité.</h3><a href="${pageHref('/imprimerie')}" data-link>Voir l’atelier ↗</a></div></article>
        <article class="case-card case-card--signal"><div class="signal-disc"></div><span>ACADEMY</span><h3>Faire que le savoir reste après la session.</h3><a href="${pageHref('/formation')}" data-link>Voir les formations ↗</a></article>
      </div>
    </section>

    <section class="academy-callout section-shell">
      <div class="academy-callout__line"></div>
      <div class="academy-callout__copy">${eyebrow('MIRS ACADEMY')}${sectionTitle('Le vrai luxe :<br>une équipe qui<br><em>sait faire.</em>')}<p>Des parcours concrets, une pédagogie de pratique et un point de départ adapté à votre contexte.</p>${button('/formation', 'Entrer dans l’Academy', 'primary')}</div>
      <div class="academy-callout__cards" data-tilt><div><span>01</span><b>OUTILS</b><small>ceux qui servent demain</small></div><div><span>02</span><b>GESTES</b><small>ceux qui restent</small></div><div><span>03</span><b>RELAIS</b><small>ceux qui font avancer</small></div></div>
    </section>

    <section class="closing-orbit">
      <div class="closing-orbit__ring ring-one"></div><div class="closing-orbit__ring ring-two"></div>
      <div class="closing-orbit__inner">${eyebrow('LA PROCHAINE ÉTAPE')}<h2>Faisons entrer<br>votre projet<br>dans le <em>réel.</em></h2><p>Parlez-nous du point de départ. Nous chercherons la suite la plus juste.</p>${button('/contact', 'Commencer la conversation', 'primary')}</div>
    </section>
  </main>`, '/');
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
  const secondaryAction = data.shop
    ? button(data.shop, data.shopLabel, 'quiet')
    : `<button type="button" class="button-link quiet" data-video="${data.video}" data-video-title="${data.videoLabel}"><span>${data.videoLabel}</span><i>▶</i></button>`;
  return shell(`<main class="branch-page branch-page--${data.accent}">
    <section class="unit-portal">
      <div class="unit-portal__image"><img src="${AS}${data.hero}" alt="" loading="eager"><div class="unit-portal__grain"></div></div>
      <div class="unit-portal__content">
        ${eyebrow(data.label)}
        <h1>${data.name}<br><em>${tr('en action.', 'in action.')}</em></h1>
        <p>${data.intro}</p>
        <div class="hero-actions">${button('/contact', tr('Parler à un expert', 'Speak with an expert'), 'primary')}${secondaryAction}</div>
      </div>
      <div class="unit-specimen" data-tilt><span>${tr('CHAMP ACTIF', 'LIVE FIELD')}</span><div class="specimen-orbit"></div><b>${data.code}</b><small>CONAKRY · MIRS</small></div>
      <div class="unit-portal__foot"><span>${data.label}</span><span>${tr('CONCEVOIR AVANT D’EXÉCUTER', 'DESIGN BEFORE EXECUTION')}</span><span>↓</span></div>
    </section>

    <section class="unit-thesis section-shell">
      <div class="unit-thesis__lead"><span>${data.initial}</span><p>${data.featureText}</p></div>
      <div>${eyebrow(tr('LE RÔLE DE MIRS', 'THE MIRS ROLE'))}${sectionTitle(data.featureTitle)}</div>
    </section>

    <section class="capability-grid section-shell">
      ${data.capabilities.map((capability, index) => `<article data-reveal><span>0${index + 1}</span><h3>${capability[0]}</h3><p>${capability[1]}</p><i>↗</i></article>`).join('')}
    </section>

    <section class="unit-film">
      <button type="button" class="film-trigger" data-video="${data.video}" data-video-title="${data.videoLabel}">
        <img src="${AS}${data.hero}" alt="" loading="lazy"><span class="film-trigger__veil"></span><span class="film-play">▶</span><span class="film-caption">${data.videoLabel}<i>→</i></span>
      </button>
    </section>

    ${kind === 'imprimerie' ? printMockups() : ''}

    <section class="process-field section-shell">
      <div class="process-field__header">${eyebrow(tr('UNE MÉTHODE STRUCTURÉE', 'A STRUCTURED METHOD'))}${sectionTitle(tr('Un projet avance<br>en cinq <em>temps.</em>', 'A project moves<br>through five <em>stages.</em>'))}</div>
      <div class="process-rail">
        ${data.steps.map((step, index) => `<article><span>0${index + 1}</span><b>${step[0]}</b><p>${step[1]}</p></article>`).join('')}
      </div>
    </section>

    <section class="unit-reference section-shell">
      <div class="reference-head"><div>${eyebrow(tr('ANCRÉ DANS DES PROJETS RÉELS', 'BUILT ON REAL PROJECTS'))}${sectionTitle(tr('La confiance<br>se construit<br>dans <em>la durée.</em>', 'Trust is built<br>through <em>lasting</em><br>results.'))}</div><p>${tr('Les organisations qui font appel à MIRS recherchent une exécution fiable et un accompagnement durable.', 'Organizations that choose MIRS look for reliable delivery and lasting support.')}</p></div>
      ${logoBands(true)}
    </section>

    <section class="branch-close"><div>${eyebrow(tr('PROCHAINE ÉTAPE', 'NEXT STEP'))}<h2>${tr('Parlons de vos priorités opérationnelles.', 'Let’s discuss your operational priorities.')}</h2>${button('/contact', tr('Échanger avec MIRS', 'Talk to MIRS'), 'primary')}</div></section>
  </main>`, `/${kind}`);
}

function printMockups() {
  return `<section class="print-mockups section-shell" aria-labelledby="print-mockups-title">
    <div class="section-top"><div>${eyebrow(tr('PRODUCTION TEXTILE', 'TEXTILE PRODUCTION'))}${sectionTitle(tr('Des supports<br>qui portent<br><em>votre marque.</em>', 'Materials that<br>carry <em>your<br>brand.</em>'))}</div><p id="print-mockups-title">${tr('Exemples de pièces produites par l’imprimerie MIRS. Les visuels sont présentés sans fond, dans une rotation 3D douce.', 'Examples of items produced by MIRS Print. The visuals are shown without background in a subtle 3D rotation.')}</p></div>
    <div class="print-mockups__grid">
      <figure class="print-mockup print-mockup--polo"><div class="print-mockup__stage"><img src="${AS}mirs-media/nimba-polo-transparent.png" alt="Polos personnalisés Nimba SMS produits par MIRS" loading="lazy"></div><figcaption><span>01 / TEXTILE</span><b>${tr('Polos personnalisés', 'Custom polo shirts')}</b><small>${tr('Front et dos, production atelier.', 'Front and back, workshop production.')}</small></figcaption></figure>
      <figure class="print-mockup print-mockup--cap"><div class="print-mockup__stage"><img src="${AS}mirs-media/sonapi-cap-transparent.png" alt="Casquette SONAPI personnalisée produite par MIRS" loading="lazy"></div><figcaption><span>02 / TEXTILE</span><b>${tr('Casquette personnalisée', 'Custom cap')}</b><small>${tr('Broderie et finition de marque.', 'Brand embroidery and finishing.')}</small></figcaption></figure>
    </div>
  </section>`;
}

function training() {
  return shell(`<main class="academy-page">
    <section class="academy-portal">
      <div class="academy-portal__grid"></div><div class="academy-orb academy-orb--one"></div><div class="academy-orb academy-orb--two"></div>
      <div class="academy-portal__copy">${eyebrow(tr('MIRS ACADEMY / PARCOURS MÉTIER', 'MIRS ACADEMY / BUSINESS PATHWAYS'))}<h1>${tr('Apprendre,<br>puis savoir<br><em>faire.</em>', 'Learn.<br>Apply.<br><em>Perform.</em>')}</h1><p>${tr('Des formations structurées autour de vos outils, de vos équipes et de vos objectifs opérationnels.', 'Training structured around your tools, teams and operational objectives.')}</p><div class="hero-actions">${button('/contact', tr('Construire un parcours', 'Build a pathway'), 'primary')}<button type="button" class="button-link quiet" data-video="mirs-media/mirs-company-presentation.mp4" data-video-title="MIRS Academy"><span>${tr('Voir l’approche', 'See our approach')}</span><i>▶</i></button></div><div class="academy-proof"><span>${tr('PRATIQUE', 'PRACTICE')}</span><span>${tr('OUTILS', 'TOOLS')}</span><span>${tr('RELAIS', 'FOLLOW-UP')}</span></div></div>
      <div class="academy-portal__scene" data-tilt><div class="academy-card academy-card--back"><span>01</span><b>OBSERVEZ</b></div><div class="academy-card academy-card--middle"><span>02</span><b>ESSAYEZ</b></div><div class="academy-card academy-card--front"><span>03</span><b>MAÎTRISEZ</b></div><div class="academy-pencil"></div></div>
    </section>

    <section class="academy-manifesto section-shell">
      <div>${eyebrow(tr('UNE PÉDAGOGIE DE TERRAIN', 'PRACTICAL LEARNING'))}${sectionTitle(tr('Le savoir utile<br>est celui qui<br><em>s’applique.</em>', 'Useful learning<br>is learning that<br><em>applies.</em>'))}</div>
      <div class="academy-manifesto__text"><p>${tr('Chaque parcours commence avec un niveau réel, des outils réels et une situation à améliorer. L’objectif est de permettre aux équipes d’appliquer les acquis dès le lendemain.', 'Every pathway begins with a real level, real tools and a situation to improve. The aim is for teams to apply new skills the very next day.')}</p><div class="mini-metrics"><span><b>01</b> ${tr('contexte', 'context')}</span><span><b>02</b> ${tr('pratique', 'practice')}</span><span><b>03</b> ${tr('autonomie', 'autonomy')}</span></div></div>
    </section>

    <section class="course-catalogue section-shell">
      <div class="section-top"><div>${eyebrow(tr('POINTS D’ENTRÉE', 'STARTING POINTS'))}${sectionTitle(tr('Des parcours<br>qui passent<br>à l’<em>action.</em>', 'Pathways that<br>move into<br><em>action.</em>'))}</div><p>${tr('Choisissez une porte d’entrée ; nous vous aiderons à concevoir la suite.', 'Choose a starting point; we will help you design what follows.')}</p></div>
      <div class="course-grid">${courses.map((course, index) => `<article class="course-card" data-tilt><span>0${index + 1}</span><div><small>${local(course.category)}</small><h3>${local(course.name)}</h3><p>${local(course.detail)}</p></div><button type="button" data-add="${tr('Formation', 'Training')} : ${local(course.name)}">${tr('Ajouter au brief', 'Add to brief')} <i>↗</i></button></article>`).join('')}</div>
    </section>

    <section class="learning-path">
      <div class="section-shell learning-path__layout">
        <div>${eyebrow(tr('COMMENT LE PARCOURS SE DÉPLIE', 'HOW THE PATHWAY UNFOLDS'))}${sectionTitle(tr('Partir de<br>l’usage.<br><em>Revenir au réel.</em>', 'Start with<br>the use case.<br><em>Return to work.</em>'))}</div>
        <ol><li><span>01</span><div><b>${tr('Positionner', 'Assess')}</b><p>${tr('Identifier les besoins et le niveau de départ.', 'Identify needs and the starting level.')}</p></div></li><li><span>02</span><div><b>${tr('Pratiquer', 'Practice')}</b><p>${tr('Faire, recommencer et relier les outils au contexte.', 'Do, repeat and connect tools to context.')}</p></div></li><li><span>03</span><div><b>${tr('Transférer', 'Transfer')}</b><p>${tr('Préparer le retour à l’équipe et aux situations réelles.', 'Prepare the return to the team and real situations.')}</p></div></li><li><span>04</span><div><b>${tr('Suivre', 'Follow up')}</b><p>${tr('Garder un point de contact lorsque les questions apparaissent.', 'Keep a point of contact when questions arise.')}</p></div></li></ol>
      </div>
    </section>

    <section class="academy-proof-field section-shell"><img src="${AS}editorial/formation-collaboration.jpg" alt="${tr('Échange pendant une formation MIRS', 'Discussion during a MIRS training session')}" loading="lazy"><div><span>“</span><p>${tr('Une bonne formation se mesure à ce que les équipes peuvent appliquer après la session.', 'Good training is measured by what teams can apply after the session.')}</p>${button('/contact', tr('Parler de votre équipe', 'Talk about your team'), 'primary')}</div></section>
  </main>`, '/formation');
}

function productCard(item, mode) {
  const name = local(item.name);
  return `<article class="catalog-card" data-product-card data-category="${item.categoryKey}" data-reveal>
    <div class="catalog-card__image"><img src="${AS}${item.image}" alt="${name}" loading="lazy"><span>${mode === 'tech' ? 'MIRS / IT' : 'MIRS / PRINT'}</span></div>
    <div class="catalog-card__body"><small>${local(item.category)}</small><h3>${name}</h3><p>${local(item.detail)}</p><button type="button" data-add="${name}">${tr('Ajouter au brief', 'Add to brief')} <i>↗</i></button></div>
  </article>`;
}

function shop(kind) {
  const isTech = kind === 'tech';
  const name = isTech ? tr('Solutions informatique', 'IT solutions') : tr('Supports imprimés', 'Print materials');
  const items = products[kind];
  const filters = [...new Map(items.map((item) => [item.categoryKey, local(item.category)])).entries()];
  return shell(`<main class="shop-page shop-page--${kind}">
    <section class="shop-portal">
      <div class="shop-portal__copy">${eyebrow(isTech ? 'MIRS / INFRASTRUCTURE' : 'MIRS / PRODUCTION')}<h1>${isTech ? tr('Des solutions adaptées<br>à vos priorités opérationnelles.', 'Solutions aligned<br>with operational priorities.') : tr('Des supports conçus<br>pour renforcer votre marque.', 'Materials designed<br>to strengthen your brand.')}</h1><p>${tr('Une sélection de solutions pour cadrer une demande. Chaque élément peut ouvrir un projet plus large.', 'A selection of solutions to scope a request. Each item can open a broader project.')}</p></div>
      <div class="shop-portal__object" data-tilt><span>${isTech ? '01' : '02'}</span><div></div><b>${isTech ? 'FIELD KIT' : 'PRINT KIT'}</b></div>
    </section>
    <section class="catalogue section-shell">
      <div class="catalogue-top"><div>${eyebrow(tr('EXPLORER PAR BESOIN', 'EXPLORE BY NEED'))}${sectionTitle(name)}</div><p>${tr('Ajoutez les sujets à discuter ; nous transformerons la liste en décision claire.', 'Add the subjects to discuss; we will turn the list into a clear decision.')}</p></div>
      <div class="filter-row" role="toolbar" aria-label="${tr('Filtrer le catalogue', 'Filter catalogue')}"><button type="button" data-filter="all" class="is-active">${tr('Tout', 'All')}</button>${filters.map(([key, label]) => `<button type="button" data-filter="${key}">${label}</button>`).join('')}</div>
      <div class="catalog-grid">${items.map((item) => productCard(item, kind)).join('')}</div>
    </section>
  </main>`, isTech ? '/informatique/boutique' : '/imprimerie/boutique');
}

function dashboard() {
  const labels = {
    overview: tr('Vue d’ensemble', 'Overview'),
    universes: tr('Univers', 'Capabilities'),
    stores: tr('Boutiques', 'Stores'),
    academy: tr('Formations', 'Training'),
    content: tr('Contenus', 'Content'),
  };
  const universeRows = universes.map((unit) => `<article class="admin-universe-row">
    <span class="admin-universe-row__index">${unit.index}</span><div><b>${local(unit.name)}</b><small>${tr('Page publique · FR / EN', 'Public page · FR / EN')}</small></div><span class="admin-status">${tr('À relire', 'Review')}</span>
  </article>`).join('');
  const storeRows = [
    [tr('Boutique informatique', 'IT store'), products.tech.length, tr('offres à gérer', 'offers to manage')],
    [tr('Boutique imprimerie', 'Print store'), products.print.length, tr('offres à gérer', 'offers to manage')],
  ].map(([name, count, note]) => `<article class="admin-resource"><span>${name}</span><b>${count}</b><small>${note}</small><button type="button">${tr('Configurer', 'Configure')} ↗</button></article>`).join('');
  const courseRows = courses.map((course, index) => `<article class="admin-course-row"><span>0${index + 1}</span><div><b>${local(course.name)}</b><small>${local(course.category)}</small></div><button type="button">${tr('Modifier', 'Edit')}</button></article>`).join('');
  return shell(`<main class="admin-page">
    <section class="admin-portal">
      <div>${eyebrow('MIRS ADMIN / LOCAL PROTOTYPE')}<h1>${tr('Piloter le site,<br>les offres et les<br><em>parcours.</em>', 'Manage the site,<br>offers and<br><em>pathways.</em>')}</h1><p>${tr('Cet espace présente le futur poste de pilotage de MIRS. Il est un prototype visuel local : aucune publication, authentification ou donnée client réelle n’y est encore connectée.', 'This space presents the future MIRS control room. It is a local visual prototype: no publishing, authentication or real client data is connected yet.')}</p></div>
      <div class="admin-portal__mark" aria-hidden="true"><span>05</span><b>${tr('UNIVERS', 'CAPABILITIES')}</b><i>↗</i></div>
    </section>
    <section class="admin-workspace section-shell">
      <aside class="admin-aside"><span>${tr('ESPACES DE GESTION', 'MANAGEMENT SPACES')}</span><p>${tr('Un registre unique pour que chaque univers, boutique et formation reste visible et administrable.', 'One unified register so every capability, store and course remains visible and manageable.')}</p><a href="${pageHref('/')}" data-link class="button-link quiet"><span>${tr('Retour au site', 'Return to site')}</span><i>↗</i></a></aside>
      <div class="admin-console">
        <div class="admin-console__top"><div><span>${tr('APERÇU LOCAL', 'LOCAL PREVIEW')}</span><b>${tr('Configuration MIRS', 'MIRS configuration')}</b></div><small>${tr('Dernière structure : cinq univers', 'Current structure: five capabilities')}</small></div>
        <nav class="admin-tabs" aria-label="${tr('Sections d’administration', 'Administration sections')}">${Object.entries(labels).map(([key, label], index) => `<button type="button" data-admin-tab="${key}" aria-selected="${index === 0 ? 'true' : 'false'}">${label}</button>`).join('')}</nav>
        <section class="admin-panel" data-admin-panel="overview">
          <div class="admin-panel__heading"><div><span>${tr('VUE D’ENSEMBLE', 'OVERVIEW')}</span><h2>${tr('Tout le système<br>dans une même <em>lecture.</em>', 'One clear view<br>of the whole <em>system.</em>')}</h2></div><p>${tr('Le tableau ne fabrique pas de chiffres fictifs : il organise les véritables zones à connecter lorsque l’administration sécurisée sera en place.', 'This dashboard does not invent metrics: it organizes the real areas to connect when secure administration is in place.')}</p></div>
          <div class="admin-summary-grid"><article><span>05</span><b>${tr('Univers à administrer', 'Capabilities to manage')}</b><small>${tr('IT, imprimerie, Academy, création d’agence, maintenance.', 'IT, print, Academy, agency creation, maintenance.')}</small></article><article><span>02</span><b>${tr('Boutiques distinctes', 'Distinct stores')}</b><small>${tr('Catalogues, visuels, disponibilité et demandes de devis.', 'Catalogues, imagery, availability and quote requests.')}</small></article><article><span>03</span><b>${tr('Vidéos à maintenir', 'Videos to maintain')}</b><small>${tr('MIRS, imprimerie et animation digitale.', 'MIRS, print and digital animation.')}</small></article></div>
          <div class="admin-universe-list">${universeRows}</div>
        </section>
        <section class="admin-panel" data-admin-panel="universes" hidden><div class="admin-panel__heading"><div><span>${tr('REGISTRE DES UNIVERS', 'CAPABILITY REGISTER')}</span><h2>${tr('Cinq univers.<br>Une gestion <em>complète.</em>', 'Five capabilities.<br>One complete <em>management model.</em>')}</h2></div><p>${tr('Chaque univers devra regrouper sa page publique, ses offres, ses demandes, ses médias, son référencement et ses textes FR / EN.', 'Each capability should bring together its public page, offers, requests, media, SEO and FR / EN content.')}</p></div><div class="admin-universe-list admin-universe-list--expanded">${universeRows}</div></section>
        <section class="admin-panel" data-admin-panel="stores" hidden><div class="admin-panel__heading"><div><span>${tr('BOUTIQUES', 'STORES')}</span><h2>${tr('Deux catalogues<br>à garder <em>vivants.</em>', 'Two catalogues<br>to keep <em>current.</em>')}</h2></div><p>${tr('Les fiches produit, visuels, disponibilités et demandes de devis seront séparés par boutique.', 'Product records, imagery, availability and quote requests will remain separate by store.')}</p></div><div class="admin-resource-grid">${storeRows}</div></section>
        <section class="admin-panel" data-admin-panel="academy" hidden><div class="admin-panel__heading"><div><span>MIRS ACADEMY</span><h2>${tr('Des parcours<br>à administrer<br><em>dans la durée.</em>', 'Learning pathways<br>to manage<br><em>over time.</em>')}</h2></div><p>${tr('Sessions, formateurs, capacités, inscriptions et attestations devront être reliés à chaque parcours.', 'Sessions, trainers, capacity, registrations and certificates should be linked to each pathway.')}</p></div><div class="admin-course-list">${courseRows}</div></section>
        <section class="admin-panel" data-admin-panel="content" hidden><div class="admin-panel__heading"><div><span>${tr('CONTENUS & MÉDIAS', 'CONTENT & MEDIA')}</span><h2>${tr('Une présence<br>publique cohérente<br><em>en deux langues.</em>', 'A coherent public<br>presence in<br><em>two languages.</em>')}</h2></div><p>${tr('À connecter : pages FR / EN, vidéos, logo transparent, références clients, textes corporate et SEO.', 'To connect: FR / EN pages, videos, transparent logo, client references, corporate copy and SEO.')}</p></div><div class="admin-media-list"><article><span>FR / EN</span><b>${tr('Pages publiques', 'Public pages')}</b><small>${tr('Versions linguistiques à valider avant publication.', 'Language versions to validate before publication.')}</small></article><article><span>03</span><b>${tr('Vidéos d’accueil', 'Homepage videos')}</b><small>${tr('Lecteurs responsive, format natif conservé.', 'Responsive players, native aspect ratio preserved.')}</small></article><article><span>81</span><b>${tr('Références', 'References')}</b><small>${tr('Logos cadrés en contain avec une zone de sécurité.', 'Logos framed with contain and a safety area.')}</small></article></div></section>
      </div>
    </section>
  </main>`, '/admin');
}

function projects() {
  const cases = [
    [tr('Systèmes et continuité', 'Systems and continuity'), tr('Des fondations numériques qui allègent le quotidien et donnent une ligne claire aux équipes.', 'Digital foundations that reduce complexity and bring clarity to teams.'), 'future/references-enterprises.jpg', tr('INFORMATIQUE', 'IT')],
    [tr('Présence de marque', 'Brand presence'), tr('Des supports fabriqués pour une identité qui se voit, se touche et se transmet.', 'Materials produced for an identity that can be seen, touched and shared.'), 'editorial/impression-grand-format.jpg', tr('IMPRIMERIE', 'PRINT')],
    [tr('Compétences opérationnelles', 'Operational capability'), tr('Des formats d’apprentissage qui relient les outils à une pratique immédiate.', 'Learning formats that connect tools to immediate practice.'), 'editorial/formation-collaboration.jpg', 'ACADEMY'],
    [tr('Projets institutionnels', 'Institutional projects'), tr('Des projets pour les organisations où coordination, lisibilité et confiance doivent tenir ensemble.', 'Projects for organizations where coordination, clarity and trust must work together.'), 'future/references-institutions.jpg', tr('RÉFÉRENCES', 'REFERENCES')],
  ];
  return shell(`<main class="projects-page">
    <section class="projects-portal"><div>${eyebrow(tr('RÉALISATIONS / CHAMPS D’ACTION', 'PROJECTS / FIELDS OF ACTION'))}<h1>${tr('Des projets<br>conçus pour<br><em>durer.</em>', 'Projects<br>designed to<br><em>last.</em>')}</h1></div><p>${tr('Un projet MIRS est la rencontre entre un objectif, un contexte et les équipes qui devront le faire vivre.', 'A MIRS project brings together an objective, a context and the teams who will make it work.')}</p></section>
    <section class="case-list section-shell">${cases.map((item, index) => `<article class="case-entry ${index % 2 ? 'is-reversed' : ''}" data-reveal><div class="case-entry__image"><img src="${AS}${item[2]}" alt="" loading="lazy"><span>0${index + 1}</span></div><div class="case-entry__copy"><small>${item[3]}</small><h2>${item[0]}</h2><p>${item[1]}</p>${button('/contact', tr('Parler d’un projet', 'Talk about a project'), 'quiet')}</div></article>`).join('')}</section>
    <section class="reference-field section-shell"><div class="reference-head"><div>${eyebrow(tr('UNE CARTE DE CONFIANCE', 'A TRUST MAP'))}${sectionTitle(tr('Des identités<br>qui nous font<br><em>confiance.</em>', 'Organizations<br>that place<br><em>trust in us.</em>'))}</div><p>${tr('Une base concrète pour continuer à livrer des projets qui tiennent dans le temps.', 'A concrete foundation for continuing to deliver projects that last.')}</p></div>${logoBands(true)}</section>
  </main>`, '/realisations');
}

function contact() {
  return shell(`<main class="contact-page">
    <section class="contact-portal">
      <div class="contact-portal__copy">${eyebrow(tr('COMMENCER PAR LE POINT DE DÉPART', 'START WITH THE CONTEXT'))}<h1>${tr('Discutons de vos<br>objectifs et de la<br>meilleure <em>réponse.</em>', 'Let’s discuss<br>your objectives<br>and the best <em>way forward.</em>')}</h1><p>${tr('Une question, une urgence ou un projet déjà défini : partagez votre contexte. Nous vous proposerons une première orientation adaptée.', 'A question, an urgent issue or a defined project: share your context. We will provide an initial, relevant direction.')}</p><div class="contact-details"><a href="tel:+224622051321">+224 622 05 13 21</a><a href="https://wa.me/224622051321" target="_blank" rel="noreferrer">WhatsApp ↗</a><span>Conakry · Guinée</span></div></div>
      <div class="contact-map" data-tilt><div class="map-grid"></div><span class="map-pin"></span><span class="map-label">MIRS<br>CONAKRY</span></div>
    </section>
    <section class="contact-form-section section-shell">
      <div class="contact-form-section__note"><span>01</span><p>${tr('Le plus utile est souvent simple : quel objectif, pour quelle équipe, et pour quand ?', 'The most useful starting point is often simple: which objective, for which team, and by when?')}</p></div>
      <form class="contact-form" data-contact-form>
        <label>${tr('Votre nom', 'Your name')}<input required name="name" autocomplete="name" placeholder="${tr('Nom et prénom', 'Full name')}"></label>
        <label>${tr('Votre organisation', 'Your organization')}<input name="company" autocomplete="organization" placeholder="${tr('Organisation', 'Organization')}"></label>
        <label>${tr('Votre email', 'Your email')}<input required type="email" name="email" autocomplete="email" placeholder="vous@organisation.com"></label>
        <label>${tr('Votre sujet', 'Your topic')}<select name="topic"><option>${tr('Informatique', 'Information technology')}</option><option>${tr('Imprimerie', 'Print production')}</option><option>MIRS Academy</option><option>${tr('Création d’agence', 'Agency creation')}</option><option>${tr('Maintenance', 'Maintenance')}</option><option>${tr('Projet transversal', 'Cross-functional project')}</option></select></label>
        <label class="form-wide">${tr('Votre point de départ', 'Your starting point')}<textarea required name="message" rows="5" placeholder="${tr('Décrivez le projet, le besoin ou la question.', 'Describe the project, need or question.')}"></textarea></label>
        <div class="form-submit"><button type="submit" class="button-link primary"><span>${tr('Préparer le message WhatsApp', 'Prepare WhatsApp message')}</span><i>↗</i></button><p data-form-status>${tr('Nous ouvrirons WhatsApp avec votre demande préremplie.', 'We will open WhatsApp with a pre-filled request.')}</p></div>
      </form>
    </section>
  </main>`, '/contact');
}

function checkout() {
  const entries = state.cart.length
    ? state.cart.map((item, index) => `<li><span>0${index + 1}</span><b>${item}</b><button type="button" data-remove="${index}">Retirer</button></li>`).join('')
    : '<li class="checkout-empty">Votre liste est encore vide. Explorez les univers pour composer un premier brief.</li>';
  return shell(`<main class="checkout-page">
    <section class="checkout-portal">${eyebrow('VOTRE LISTE / PREMIER BRIEF')}<h1>Ce qui mérite<br>une <em>conversation.</em></h1><p>La liste ne remplace pas un devis : elle permet de commencer avec les bons repères.</p></section>
    <section class="checkout-layout section-shell"><div class="checkout-list"><h2>${state.cart.length ? 'Votre sélection' : 'Pas encore de sélection'}</h2><ol data-checkout-list>${entries}</ol></div><aside class="checkout-note"><span>PROCHAINE ÉTAPE</span><h2>Mettre cette liste dans son contexte.</h2><p>Expliquez le besoin ; MIRS revient vers vous avec une première lecture.</p>${button('/contact', 'Préparer le brief', 'primary')}</aside></section>
  </main>`, '/checkout');
}

function notFound() {
  return shell(`<main class="not-found"><div>${eyebrow('SIGNAL INTROUVABLE')}<h1>Cette page<br>n’est pas<br><em>sur la carte.</em></h1><p>Revenons à un terrain connu.</p>${button('/', 'Retour à l’accueil', 'primary')}</div></main>`, '/404');
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

function navigate(path, preserveScroll = false) {
  const target = new URL(path, location.href);
  if (target.origin !== location.origin) {
    location.href = target.href;
    return;
  }
  const targetPath = target.pathname;
  if (targetPath !== location.pathname) history.pushState({}, '', target.href);
  renderRoute(targetPath, { preserveScroll });
  if (target.hash) requestAnimationFrame(() => document.getElementById(target.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }));
}

function setupMotion(signal) {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = [...document.querySelectorAll('[data-reveal]')];
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5%' });
  revealTargets.forEach((target) => observer.observe(target));
  signal.addEventListener('abort', () => observer.disconnect(), { once: true });

  const meter = document.querySelector('[data-scroll-meter]');
  const header = document.querySelector('[data-header]');
  const depthTargets = [...document.querySelectorAll('[data-depth]')];
  let ticking = false;
  const update = () => {
    const scrollable = document.documentElement.scrollHeight - innerHeight;
    if (meter) meter.style.transform = `scaleX(${scrollable > 0 ? scrollY / scrollable : 0})`;
    header?.classList.toggle('is-scrolled', scrollY > 18);
    depthTargets.forEach((target) => {
      const amount = Number(target.dataset.depth || 0);
      target.style.transform = `translate3d(0, ${Math.round(scrollY * amount)}px, 0)`;
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
  requestUpdate();

  document.querySelectorAll('[data-tilt]').forEach((target) => {
    target.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;
      const bounds = target.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      target.style.setProperty('--tilt-x', `${(x * 4).toFixed(2)}deg`);
      target.style.setProperty('--tilt-y', `${(y * -4).toFixed(2)}deg`);
    }, { signal });
    target.addEventListener('pointerleave', () => {
      target.style.removeProperty('--tilt-x');
      target.style.removeProperty('--tilt-y');
    }, { signal });
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
      const menu = document.querySelector('[data-mobile-menu]');
      if (menu) menu.hidden = true;
      navigate(routeLink.getAttribute('href'));
      return;
    }
    const anchorLink = event.target.closest('[data-anchor]');
    if (anchorLink) {
      event.preventDefault();
      const id = anchorLink.dataset.anchor;
      const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (pageRoute() !== '/') {
        navigate(pageHref('/'), true);
        requestAnimationFrame(scroll);
      } else {
        scroll();
      }
      return;
    }
    if (event.target.closest('button[data-theme]')) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('mirs-future-theme', state.theme);
      document.documentElement.dataset.theme = state.theme;
      return;
    }
    if (event.target.closest('[data-menu]')) {
      const menu = document.querySelector('[data-mobile-menu]');
      const button = document.querySelector('[data-menu]');
      if (menu) {
        menu.hidden = !menu.hidden;
        button?.setAttribute('aria-expanded', String(!menu.hidden));
      }
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

  root.addEventListener('submit', (event) => {
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
  document.getElementById('app').innerHTML = markup;
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.lang = state.locale;
  document.title = clean === '/' ? 'MIRS — Spatial Systems' : `MIRS — ${clean.split('/').filter(Boolean).pop().replaceAll('-', ' ')}`;
  bind();
  if (!options.preserveScroll) scrollTo(0, 0);
}

addEventListener('popstate', () => renderRoute(location.pathname));
renderRoute();
