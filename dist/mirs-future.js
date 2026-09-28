const BASE_PATH = new URL('.', document.baseURI).pathname.replace(/\/$/, '');
const AS = `${BASE_PATH}/assets/`;
const pageHref = (path) => `${BASE_PATH}${path}` || '/';

function pageRoute(path = location.pathname) {
  if (!BASE_PATH) return path.replace(/\/+$/, '') || '/';
  const withoutBase = path === BASE_PATH ? '/' : path.startsWith(`${BASE_PATH}/`) ? path.slice(BASE_PATH.length) : path;
  return withoutBase.replace(/\/+$/, '') || '/';
}

function storedCart() {
  try {
    const saved = JSON.parse(localStorage.getItem('mirs-future-cart') || '[]');
    return Array.isArray(saved) ? saved.filter((item) => typeof item === 'string').slice(0, 50) : [];
  } catch {
    // A stale or hand-edited local value must never prevent the application
    // from rendering. The next cart update will replace it with valid JSON.
    return [];
  }
}

const state = {
  theme: localStorage.getItem('mirs-future-theme') || 'dark',
  cart: storedCart(),
};

const clients = [
  'AMADEUS', 'Ecobank', 'Orange', 'IBS Group', 'Institut Français de Guinée',
  'AFENET', 'Sonoco', 'Vista Bank', 'Société Générale', 'AGL', 'Enabel',
  'Mota-Engil', 'BNIG', 'UPS', 'Lycée Français Albert Camus', 'BSIC', 'MIC',
  'TotalEnergies', 'Direction Générale des Douanes', 'Bonagui', 'Brag Guinée',
  'Sakom', 'Access', 'FIDUXIS', 'CERFI', 'SMC Négoce', 'Neemba CAT',
  'Diama Bank', 'Ingelec', 'Lanala Assurances', 'Bureau Veritas', 'CIMAF',
  'International Care Group', 'SFCI Bank', 'NSIA', 'Orange Money', 'ARPT',
  'Sogea Satom', 'Sobragui', 'ONEPP', 'Kulu', 'Coris Bank', 'FODIP',
  'Lions International', 'Diakele', 'Djedah Voyages', 'Go Africa Online',
  'Rahli Travels', 'Jess Holding', 'DJ Promo Voyages', 'Easy Link Guinée',
  'Global ITEC', 'Office Guinéen de Publicité',
];

const products = {
  tech: [
    ['PC professionnel', 'editorial/equipement-clavier.jpg', 'Équiper'],
    ['Réseau & Wi-Fi', 'editorial/maintenance-pc.jpg', 'Configurer'],
    ['Sécurité intelligente', 'future/informatique-team.jpg', 'Protéger'],
    ['Support & maintenance', 'editorial/maintenance-pc.jpg', 'Demander'],
  ],
  print: [
    ['Tote bag', 'catalogue/tote-bag.png', 'Personnaliser'],
    ['T-shirt', 'catalogue/tshirt.png', 'Personnaliser'],
    ['Mug', 'catalogue/mug.png', 'Personnaliser'],
    ['Casquette', 'catalogue/casquette.png', 'Personnaliser'],
    ['Packaging', 'catalogue/packaging-orange.png', 'Créer'],
  ],
};

const courses = [
  ['AMADEUS', 'Réservation · Voyage'],
  ['Réseaux & systèmes', 'Infrastructure · Wi-Fi'],
  ['Microsoft Office', 'Word · Excel · PowerPoint'],
  ['Marketing digital', 'Contenu · Campagnes'],
  ['Live coding', 'HTML · CSS · Projet'],
];

// The production bundle keeps the original MP4 files. The GitHub source also
// contains transport chunks so a static clone can recover a film if an MP4 is
// omitted by a host or exceeds its single-file upload allowance.
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
    'imprimerie-presentation-aaa', 'imprimerie-presentation-aab', 'imprimerie-presentation-aac',
    'imprimerie-presentation-aad', 'imprimerie-presentation-aae', 'imprimerie-presentation-aaf',
    'imprimerie-presentation-aag', 'imprimerie-presentation-aah', 'imprimerie-presentation-aai',
    'imprimerie-presentation-aaj', 'imprimerie-presentation-aak', 'imprimerie-presentation-aal',
    'imprimerie-presentation-aam', 'imprimerie-presentation-aan', 'imprimerie-presentation-aao',
    'imprimerie-presentation-aap',
  ],
};

let routeAbort = null;

const link = (href, label, className = 'f-link') =>
  `<a href="${href}" data-link class="${className}"><span>${label}</span><i aria-hidden="true">↗</i></a>`;

const button = (href, label, extra = '') => link(href, label, `f-button ${extra}`);

function mark(text) {
  return `<span class="f-title-mask">${text.split('<br>').map((line) => `<span>${line}</span>`).join('')}</span>`;
}

function logoRail() {
  const set = clients.map((client) => `<span>${client}</span>`).join('');
  return `<div class="logo-rail" aria-label="Références MIRS"><div>${set}${set}</div></div>`;
}

function header() {
  return `<header class="f-header">
    <a href="/" data-link class="f-brand" aria-label="MIRS, accueil"><img src="${AS}mirs-logo.png" alt=""><b>MIRS</b><span>SPATIAL SYSTEMS</span></a>
    <nav class="f-nav" aria-label="Navigation principale">
      <a href="/informatique" data-link>Informatique</a>
      <a href="/imprimerie" data-link>Imprimerie</a>
      <a href="/formation" data-link>Formation</a>
      <a href="/realisations" data-link>Réalisations</a>
    </nav>
    <div class="f-actions">
      <button type="button" data-theme aria-label="Changer le thème"><span>◐</span></button>
      <button type="button" data-cart aria-label="Ouvrir le panier"><span>Panier</span><b>${state.cart.length}</b></button>
      ${button('/contact', 'Demander un devis', 'f-header-cta')}
      <button type="button" data-menu class="f-menu" aria-label="Ouvrir le menu" aria-controls="site-mobile-navigation" aria-expanded="false"><span></span><span></span></button>
    </div>
  </header>
  <aside id="site-mobile-navigation" class="f-mobile" data-mobile-menu aria-label="Menu mobile" hidden>
    ${link('/', 'Accueil')}${link('/informatique', 'Informatique')}${link('/imprimerie', 'Imprimerie')}${link('/formation', 'Formation')}${link('/realisations', 'Réalisations')}${link('/contact', 'Parler à MIRS', 'f-button')}
  </aside>`;
}

function footer() {
  return `<footer class="f-footer">
    <div><a href="/" data-link class="f-brand"><img src="${AS}mirs-logo.png" alt=""><b>MIRS</b></a><p>Technologie. Production. Compétences.</p></div>
    <div class="f-footer-links"><span>Conakry · Guinée</span><a href="tel:+224622051321">+224 622 05 13 21</a><a href="https://wa.me/224622051321">WhatsApp ↗</a></div>
    <small>© MIRS SARL · Modernité · Innovation · Réseau · Service</small>
  </footer>`;
}

function shell(content, page = '') {
  return `${header()}<main class="f-main ${page}">${content}</main>${footer()}
    <canvas class="f-trail" aria-hidden="true"></canvas>
    <div class="f-toast" data-toast role="status"></div>
    <dialog class="f-dialog" data-cart-dialog><button type="button" data-close aria-label="Fermer">×</button><p class="f-overline">VOTRE SÉLECTION</p><div data-cart-lines></div>${button('/checkout', 'Finaliser ma demande', 'f-button')}<small>Un conseiller MIRS confirme votre besoin avant toute commande.</small></dialog>`;
}

function home() {
  return shell(`
    <section class="f-hero">
      <div class="f-grid-field"></div><div class="f-orbit f-orbit-one"></div><div class="f-orbit f-orbit-two"></div>
      <div class="f-hero-copy"><p class="f-overline">MIRS SARL · CONAKRY · DEPUIS 2006</p><h1 data-reveal>${mark('LE FUTUR<br>SE CONSTRUIT<br>EN MOUVEMENT.')}</h1><p class="f-lede">Des systèmes qui équipent. Des images qui marquent. Des compétences qui durent.</p><div class="f-cta-row">${button('/contact', 'Lancer un projet', 'f-primary')}${button('/informatique', 'Explorer MIRS', 'f-quiet')}</div><div class="f-hero-choices"><span>CHOISIR UN ÉLAN</span>${link('/informatique', 'Équiper mon organisation')}${link('/imprimerie', 'Produire mes supports')}${link('/formation', 'Monter en compétences')}</div></div>
      <div class="f-hero-rig" data-parallax><div class="rig-ring ring-a"></div><div class="rig-ring ring-b"></div><div class="rig-panel panel-a"><i></i><b>MIRS / 01</b></div><div class="rig-panel panel-b"><span>20</span><small>ANS<br>D’ÉLAN</small></div><div class="rig-core"><em></em><span>+</span></div><div class="rig-satellite sat-a"></div><div class="rig-satellite sat-b"></div><p>SCROLL<br>TO EXPLORE ↓</p></div>
    </section>

    <section class="f-intent" data-inview><div class="f-section-heading"><p class="f-overline">01 · CHOISISSEZ UNE DIRECTION</p><h2 data-reveal>${mark('TROIS SYSTÈMES.<br>UN MÊME ÉLAN.')}</h2></div><div class="f-intent-grid">
      <a href="/informatique" data-link class="f-intent-card f-tech"><img src="${AS}future/informatique-team.jpg" alt="Équipe MIRS Informatique" loading="lazy"><div><small>01 / INFORMATIQUE</small><h3>CONNECTER.<br>PROTÉGER.</h3><span>Réseaux · Sécurité · Support</span><b>Explorer ↗</b></div></a>
      <a href="/imprimerie" data-link class="f-intent-card f-print"><img src="${AS}future/imprimerie-team.jpg" alt="Équipe MIRS Imprimerie" loading="lazy"><div><small>02 / IMPRIMERIE</small><h3>IMAGINER.<br>PRODUIRE.</h3><span>Impression · Digital · Objets</span><b>Explorer ↗</b></div></a>
      <a href="/formation" data-link class="f-intent-card f-learn"><img src="${AS}editorial/formation-collaboration.jpg" alt="Formation MIRS" loading="lazy"><div><small>03 / FORMATION</small><h3>APPRENDRE.<br>AGIR.</h3><span>AMADEUS · Office · Coding</span><b>Explorer ↗</b></div></a>
    </div></section>

    <section class="f-system f-system-tech" data-system>
      <div class="f-system-copy"><p class="f-overline">02 · MIRS INFORMATIQUE</p><h2 data-reveal>${mark('L’INFRASTRUCTURE<br>PREND FORME.')}</h2><p>Un geste. Un signal. Un système qui avance.</p><div class="f-mini-actions">${button('/informatique', 'Voir les solutions', 'f-primary')}${button('/informatique/boutique', 'Voir la boutique', 'f-quiet')}</div></div>
      <div class="f-computer-stage" data-build><div class="cpu-glow"></div><i class="pc-screen"><span>MIRS<br>ONLINE</span></i><i class="pc-hinge"></i><i class="pc-base"></i><i class="pc-chip"></i><i class="pc-beam"></i><small>ASSEMBLY / SCROLL</small></div>
    </section>

    <section class="f-media-split" data-inview><button type="button" class="f-film-card" data-video="technology-flow.mp4"><img src="${AS}editorial/developpement-web.jpg" alt="Technologie MIRS" loading="lazy"><span>FILM 01 · INFORMATIQUE</span><i>▶</i></button><div><p class="f-overline">VOIR LA TECHNOLOGIE</p><h2 data-reveal>${mark('LE SIGNAL<br>DEVIENT ACTION.')}</h2>${button('/informatique', 'Entrer dans l’univers IT', 'f-quiet')}</div></section>

    <section class="f-system f-system-print" data-system>
      <div class="f-system-copy"><p class="f-overline">03 · MIRS IMPRIMERIE</p><h2 data-reveal>${mark('L’IDÉE<br>PREND MATIÈRE.')}</h2><p>Du fichier au support. Du support à l’impact.</p><div class="f-mini-actions">${button('/imprimerie', 'Voir les solutions', 'f-primary')}${button('/imprimerie/boutique', 'Personnaliser un produit', 'f-quiet')}</div></div>
      <div class="f-printer-stage" data-print><div class="printer-aura"></div><i class="print-top"></i><i class="print-body"><b></b></i><i class="print-paper"><span>MIRS<br>MAKE<br>VISIBLE</span></i><i class="print-ink"></i><small>PRODUCTION / SCROLL</small></div>
    </section>

    <section class="f-media-split f-media-reverse" data-inview><div><p class="f-overline">VOIR LA PRODUCTION</p><h2 data-reveal>${mark('LE SUPPORT<br>DEVIENT SIGNAL.')}</h2>${button('/imprimerie', 'Entrer dans l’univers Print', 'f-quiet')}</div><button type="button" class="f-film-card" data-video="imprimerie-presentation.mp4"><img src="${AS}editorial/impression-grand-format.jpg" alt="Production MIRS" loading="lazy"><span>FILM 02 · IMPRIMERIE</span><i>▶</i></button></section>

    <section class="f-shop" data-inview><div class="f-shop-head"><p class="f-overline">04 · BOUTIQUE MIRS</p><h2 data-reveal>${mark('CHOISIR.<br>CONFIGURER.<br>AVANCER.')}</h2><div class="f-shop-switch"><button type="button" class="is-active" data-product-tab="tech">INFORMATIQUE</button><button type="button" data-product-tab="print">IMPRIMERIE</button></div></div><div class="f-product-rail" data-products="tech">${productRail('tech')}</div><div class="f-product-rail is-hidden" data-products="print">${productRail('print', true)}</div></section>

    <section class="f-proofs" data-inview><div><p class="f-overline">05 · ILS NOUS FONT CONFIANCE</p><h2 data-reveal>${mark('DES PROJETS<br>QUI COMPTENT.')}</h2><p>Institutions, entreprises et organisations accompagnées par MIRS.</p>${button('/realisations', 'Voir les réalisations', 'f-quiet')}</div><div class="f-logo-panels"><img src="${AS}future/references-institutions.jpg" alt="Logos des institutions clientes MIRS" loading="lazy"><img src="${AS}future/references-enterprises.jpg" alt="Logos des entreprises clientes MIRS" loading="lazy"></div></section>
    ${logoRail()}

    <section class="f-voices" data-inview><div class="f-voice-top"><p class="f-overline">06 · RETOURS DE TERRAIN</p><h2 data-reveal>${mark('CE QUE NOS<br>PARTENAIRES<br>VALORISENT.')}</h2></div><div class="f-voice-track" data-voices>
      <article class="is-current"><q>Professionnalisme, expertise et réactivité.</q><p>— Synthèse des retours partenaires MIRS</p><span>EXIGENCE</span></article>
      <article><q>Des réponses adaptées à chaque contexte.</q><p>— Synthèse des retours partenaires MIRS</p><span>PROXIMITÉ</span></article>
      <article><q>Un accompagnement qui reste présent après le déploiement.</q><p>— Synthèse des retours partenaires MIRS</p><span>CONTINUITÉ</span></article>
    </div><div class="f-voice-nav"><button type="button" data-voice="prev" aria-label="Témoignage précédent">←</button><span data-voice-count>01 / 03</span><button type="button" data-voice="next" aria-label="Témoignage suivant">→</button></div></section>

    <section class="f-course-band" data-inview><img src="${AS}editorial/formation-collaboration.jpg" alt="Centre de formation MIRS" loading="lazy"><div><p class="f-overline">07 · CENTRE DE FORMATION</p><h2 data-reveal>${mark('DES COMPÉTENCES<br>QUI AVANCENT.')}</h2><div>${courses.slice(0, 4).map(([name, detail]) => `<a href="/formation" data-link><b>${name}</b><span>${detail}</span><i>↗</i></a>`).join('')}</div>${button('/formation', 'Voir les formations', 'f-primary')}</div></section>

    <section class="f-final"><div class="f-final-orb"></div><p class="f-overline">UN PROJET À METTRE EN MOUVEMENT ?</p><h2 data-reveal>${mark('FAISONS-LE<br>EXISTER.')}</h2><div>${button('/contact', 'Parler à MIRS', 'f-primary')}${button('/imprimerie/boutique', 'Explorer la boutique', 'f-quiet')}</div></section>
  `, 'f-home');
}

function productRail(type, doubled = false) {
  const list = doubled ? [...products[type], ...products[type]] : products[type];
  return list.map(([name, image, action]) => `<article><img src="${AS}${image}" alt="${name}" loading="lazy"><div><small>${type === 'tech' ? 'SYSTÈME MIRS' : 'PERSONNALISABLE'}</small><h3>${name}</h3><button type="button" data-add="${name}">${action} <i>↗</i></button></div></article>`).join('');
}

function addReferenceAtlas() {
  document.querySelectorAll('.f-logo-panels').forEach((panel) => {
    panel.insertAdjacentHTML('beforeend', `<img src="${AS}future/references-extended.jpg" alt="Autres organisations accompagnées par MIRS" loading="lazy">`);
  });
}

function branch(unit) {
  const tech = unit === 'informatique';
  const data = tech ? {
    label: 'MIRS INFORMATIQUE',
    title: 'LE SYSTÈME<br>QUI VOUS<br>FAIT AVANCER.',
    image: 'editorial/equipement-clavier.jpg',
    film: 'technology-flow.mp4',
    list: ['Réseaux', 'Sécurité', 'Maintenance', 'Solutions métiers'],
    shop: '/informatique/boutique',
  } : {
    label: 'MIRS IMPRIMERIE',
    title: 'L’IMAGE<br>QUI RESTE<br>EN MOUVEMENT.',
    image: 'editorial/impression-grand-format.jpg',
    film: 'imprimerie-presentation.mp4',
    list: ['Impression', 'Grand format', 'Objets', 'Digital'],
    shop: '/imprimerie/boutique',
  };
  const stage = tech ? `<div class="f-computer-stage f-branch-scene" data-build><div class="cpu-glow"></div><i class="pc-screen"><span>MIRS<br>ONLINE</span></i><i class="pc-hinge"></i><i class="pc-base"></i><i class="pc-chip"></i><i class="pc-beam"></i></div>` : `<div class="f-printer-stage f-branch-scene" data-print><div class="printer-aura"></div><i class="print-top"></i><i class="print-body"><b></b></i><i class="print-paper"><span>MIRS<br>MAKE<br>VISIBLE</span></i><i class="print-ink"></i></div>`;
  return shell(`<section class="f-branch-hero"><img src="${AS}${data.image}" alt="${data.label}" loading="eager"><div class="f-branch-shade"></div><div class="f-branch-copy"><p class="f-overline">${data.label}</p><h1 data-reveal>${mark(data.title)}</h1><div class="f-cta-row">${button('/contact', 'Parler à un expert', 'f-primary')}${button(data.shop, tech ? 'Voir la boutique' : 'Personnaliser', 'f-quiet')}</div></div><span class="f-hero-index">0${tech ? '1' : '2'} / MIRS</span></section>
    <section class="f-branch-plot"><div><p class="f-overline">SCROLL / EXPLORE</p><h2 data-reveal>${mark(tech ? 'ASSEMBLER<br>LA PERFORMANCE.' : 'FAIRE SORTIR<br>L’IMPACT.')}</h2><p>${tech ? 'Réseau, sécurité, outils : chaque pièce a une fonction.' : 'Création, production, support : chaque détail se voit.'}</p>${button('/contact', 'Obtenir un devis', 'f-primary')}</div>${stage}</section>
    <section class="f-service-pills"><p class="f-overline">VOTRE UNIVERS</p><div>${data.list.map((item, index) => `<a href="/contact" data-link><b>0${index + 1}</b><span>${item}</span><i>↗</i></a>`).join('')}</div></section>
    <section class="f-full-film"><button type="button" data-video="${data.film}"><img src="${AS}${data.image}" alt="Film ${data.label}" loading="lazy"><span>PLAY FILM</span><i>▶</i></button><div><p class="f-overline">MIRS EN MOUVEMENT</p><h2 data-reveal>${mark(tech ? 'VOIR PLUS<br>CLAIR.' : 'DONNER VIE<br>À L’IDÉE.')}</h2>${button(data.shop, tech ? 'Explorer la boutique' : 'Créer un support', 'f-quiet')}</div></section>
    <section class="f-final f-final-short"><p class="f-overline">ON FAIT LE PREMIER MOUVEMENT ?</p><h2 data-reveal>${mark('VOTRE PROJET.<br>NOTRE ÉLAN.')}</h2>${button('/contact', 'Démarrer maintenant', 'f-primary')}</section>`, `f-${unit}`);
}

function training() {
  return shell(`<section class="f-training-hero"><div><p class="f-overline">CENTRE DE FORMATION MIRS</p><h1 data-reveal>${mark('APPRENDRE.<br>PRATIQUER.<br>RÉUSSIR.')}</h1><p>Des modules concrets. Des compétences visibles.</p>${button('/contact', 'Demander une inscription', 'f-primary')}</div><div class="f-learning-orbit"><i></i><i></i><i></i><strong>LEARN<br>01</strong></div></section><section class="f-course-grid">${courses.map(([name, detail], index) => `<article><small>0${index + 1}</small><h2>${name}</h2><p>${detail}</p><a href="/contact" data-link>Demander une session ↗</a></article>`).join('')}</section><section class="f-course-band f-course-band-small"><img src="${AS}editorial/formation-collaboration.jpg" alt="Formation professionnelle MIRS" loading="lazy"><div><p class="f-overline">FORMAT MIRS</p><h2 data-reveal>${mark('LE SAVOIR<br>DEVIENT PRATIQUE.')}</h2><div class="f-format-tags"><span>PRÉSENTIEL</span><span>ATELIERS</span><span>PROJET</span></div>${button('/contact', 'Voir les prochaines sessions', 'f-primary')}</div></section>`, 'f-training');
}

function shop(unit) {
  const tech = unit === 'informatique';
  const type = tech ? 'tech' : 'print';
  const title = tech ? 'ÉQUIPEZ<br>VOTRE<br>ÉLAN.' : 'RENDEZ<br>VOTRE MARQUE<br>VISIBLE.';
  return shell(`<section class="f-store-hero"><div><p class="f-overline">BOUTIQUE MIRS ${unit.toUpperCase()}</p><h1 data-reveal>${mark(title)}</h1><p>${tech ? 'Conseil. Équipement. Installation.' : 'Choix du support. Personnalisation. Production.'}</p></div><div class="f-store-object"><i></i><i></i><i></i><b>${tech ? 'TECH' : 'PRINT'}</b></div></section><section class="f-store-grid"><div class="f-store-toolbar"><p class="f-overline">SÉLECTION MIRS</p><input data-filter placeholder="Rechercher un produit" aria-label="Rechercher un produit"></div><div class="f-catalogue-grid">${[...products[type], ...products[type]].map(([name, image, action]) => `<article data-product="${name.toLowerCase()}"><img src="${AS}${image}" alt="${name}" loading="lazy"><small>${tech ? 'SUR DEVIS' : 'CONFIGURABLE'}</small><h2>${name}</h2><button type="button" data-add="${name}">${action} ↗</button></article>`).join('')}</div></section>`, 'f-store');
}

function projects() {
  const projects = [['Infrastructures qui tiennent le rythme', 'editorial/maintenance-pc.jpg'], ['Supports qui créent de la présence', 'editorial/impression-grand-format.jpg'], ['Compétences qui rendent autonome', 'editorial/formation-collaboration.jpg']];
  return shell(`<section class="f-project-hero"><p class="f-overline">RÉALISATIONS MIRS</p><h1 data-reveal>${mark('DES PROJETS.<br>DU MOUVEMENT.')}</h1>${logoRail()}</section><section class="f-project-list">${projects.map(([title, image], index) => `<article><span>0${index + 1}</span><img src="${AS}${image}" alt="${title}" loading="lazy"><div><h2>${title}</h2>${button('/contact', 'Imaginer le vôtre', 'f-quiet')}</div></article>`).join('')}</section><section class="f-proofs f-proofs-tight"><div><p class="f-overline">RÉFÉRENCES OFFICIELLES</p><h2 data-reveal>${mark('LA CONFIANCE<br>SE VOIT.')}</h2></div><div class="f-logo-panels"><img src="${AS}future/references-institutions.jpg" alt="Institutions clientes MIRS" loading="lazy"><img src="${AS}future/references-enterprises.jpg" alt="Entreprises clientes MIRS" loading="lazy"></div></section>`, 'f-projects');
}

function contact() {
  return shell(`<section class="f-contact"><div><p class="f-overline">PARLONS DE VOTRE PROJET</p><h1 data-reveal>${mark('ON PASSE<br>À L’ACTION ?')}</h1><p>Conakry, Guinée<br><a href="tel:+224622051321">+224 622 05 13 21</a></p><a class="f-whatsapp" href="https://wa.me/224622051321">WhatsApp ↗</a></div><form data-contact><label>Nom ou entreprise<input required placeholder="Votre nom"></label><label>Téléphone<input required placeholder="Votre téléphone"></label><label>Besoin<select><option>Informatique</option><option>Imprimerie</option><option>Formation</option><option>Autre projet</option></select></label><label>Votre projet<textarea placeholder="Quelques mots suffisent."></textarea></label><button class="f-button f-primary">Envoyer ma demande <i>↗</i></button><p data-form-note></p></form></section>`, 'f-contact-page');
}

function checkout() {
  const lines = state.cart.length ? state.cart.map((item) => `<li>${item}<button type="button" data-remove="${item}" aria-label="Retirer ${item}">×</button></li>`).join('') : '<li>Votre sélection est vide. Explorez la boutique MIRS.</li>';
  return shell(`<section class="f-checkout"><div><p class="f-overline">VOTRE PROJET MIRS</p><h1 data-reveal>${mark('LA SUITE<br>COMMENCE ICI.')}</h1><ul data-checkout-lines>${lines}</ul></div><form data-contact><label>Nom ou entreprise<input required placeholder="Votre nom"></label><label>Téléphone<input required placeholder="Votre téléphone"></label><label>Adresse email<input type="email" placeholder="Votre email"></label><label>Précisions<textarea placeholder="Quantité, délais, détails…"></textarea></label><button class="f-button f-primary">Envoyer ma demande <i>↗</i></button><p data-form-note></p></form></section>`, 'f-checkout-page');
}

function route(path = location.pathname) {
  const clean = pageRoute(path);
  const page = clean === '/' ? home()
    : clean === '/informatique' ? branch('informatique')
      : clean === '/imprimerie' ? branch('imprimerie')
        : clean === '/formation' ? training()
          : clean === '/informatique/boutique' ? shop('informatique')
            : clean === '/imprimerie/boutique' ? shop('imprimerie')
              : clean === '/realisations' ? projects()
                : clean === '/checkout' ? checkout()
                  : contact();
  document.getElementById('app').innerHTML = page;
  addReferenceAtlas();
  document.documentElement.dataset.theme = state.theme;
  document.title = clean === '/' ? 'MIRS — Spatial Systems' : `MIRS — ${clean.split('/').pop().replaceAll('-', ' ')}`;
  bind();
  scrollTo(0, 0);
}

function persistCart() {
  localStorage.setItem('mirs-future-cart', JSON.stringify(state.cart));
}

function flash(message) {
  const toast = document.querySelector('[data-toast]');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  setTimeout(() => toast.classList.remove('is-visible'), 2200);
}

function renderCart() {
  const box = document.querySelector('[data-cart-lines]');
  if (!box) return;
  box.innerHTML = state.cart.length ? state.cart.map((item) => `<p><span>${item}</span><button type="button" data-remove="${item}" aria-label="Retirer ${item}">×</button></p>`).join('') : '<p class="f-empty">Votre sélection est vide.</p>';
}

function openCart() {
  const dialog = document.querySelector('[data-cart-dialog]');
  renderCart();
  if (dialog && !dialog.open) dialog.showModal();
}

function playVideo(file) {
  const chunks = videoChunks[file];
  const dialog = document.createElement('dialog');
  dialog.className = 'f-film-dialog';
  dialog.innerHTML = `<button type="button" aria-label="Fermer la vidéo">×</button><video controls autoplay playsinline preload="metadata" aria-label="Vidéo MIRS"><source src="${AS}video/${file}" type="video/mp4"></video><p class="f-film-load">Chargement du film…</p>`;
  document.body.append(dialog);
  dialog.showModal();
  const video = dialog.querySelector('video');
  const loading = dialog.querySelector('.f-film-load');
  let fallbackUrl = '';
  let recovered = false;
  const close = () => {
    if (fallbackUrl) URL.revokeObjectURL(fallbackUrl);
    dialog.remove();
  };
  video.addEventListener('canplay', () => loading.remove(), { once: true });
  const recover = async () => {
    if (recovered || !chunks) {
      loading.textContent = 'La vidéo est momentanément indisponible.';
      return;
    }
    recovered = true;
    loading.textContent = 'Préparation du film…';
    try {
      const pieces = await Promise.all(chunks.map(async (part) => {
        const response = await fetch(`${AS}video-chunks/${part}`);
        if (!response.ok) throw new Error('missing video chunk');
        return response.arrayBuffer();
      }));
      fallbackUrl = URL.createObjectURL(new Blob(pieces, { type: 'video/mp4' }));
      video.src = fallbackUrl;
      video.load();
      video.play().catch(() => {});
    } catch {
      loading.textContent = 'La vidéo est momentanément indisponible.';
    }
  };
  video.addEventListener('error', recover, { once: true });
  dialog.querySelector('button').addEventListener('click', close);
  dialog.addEventListener('cancel', close);
}

function bind() {
  routeAbort?.abort();
  const controller = new AbortController();
  routeAbort = controller;
  const { signal } = controller;

  document.querySelectorAll('[data-link][href^="/"]').forEach((item) => item.setAttribute('href', pageHref(item.getAttribute('href'))));

  document.querySelectorAll('[data-link]').forEach((item) => item.addEventListener('click', (event) => {
    const href = item.getAttribute('href') || '';
    if (href.startsWith('#')) {
      event.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const url = new URL(item.href);
    if (url.origin === location.origin) {
      event.preventDefault();
      history.pushState({}, '', url.pathname);
      route(url.pathname);
    }
  }, { signal }));

  document.querySelector('[data-menu]')?.addEventListener('click', (event) => {
    const menu = document.querySelector('[data-mobile-menu]');
    if (!menu) return;
    const open = menu.classList.toggle('is-open');
    menu.hidden = !open;
    event.currentTarget.setAttribute('aria-expanded', String(open));
  }, { signal });
  document.querySelector('[data-theme]')?.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('mirs-future-theme', state.theme);
    document.documentElement.dataset.theme = state.theme;
  }, { signal });
  document.querySelector('[data-cart]')?.addEventListener('click', openCart, { signal });
  document.querySelector('[data-close]')?.addEventListener('click', () => document.querySelector('[data-cart-dialog]')?.close(), { signal });
  document.querySelectorAll('[data-video]').forEach((item) => item.addEventListener('click', () => playVideo(item.dataset.video), { signal }));

  document.querySelectorAll('[data-add]').forEach((item) => item.addEventListener('click', () => {
    state.cart.push(item.dataset.add);
    persistCart();
    const count = document.querySelector('[data-cart] b');
    if (count) count.textContent = state.cart.length;
    flash(`${item.dataset.add} ajouté à votre projet.`);
  }, { signal }));

  document.querySelectorAll('[data-remove]').forEach((item) => item.addEventListener('click', () => {
    const index = state.cart.indexOf(item.dataset.remove);
    if (index > -1) state.cart.splice(index, 1);
    persistCart();
    const count = document.querySelector('[data-cart] b');
    if (count) count.textContent = state.cart.length;
    renderCart();
    const checkout = document.querySelector('[data-checkout-lines]');
    if (checkout) route('/checkout');
  }, { signal }));

  document.querySelectorAll('[data-product-tab]').forEach((buttonItem) => buttonItem.addEventListener('click', () => {
    document.querySelectorAll('[data-product-tab]').forEach((item) => item.classList.toggle('is-active', item === buttonItem));
    document.querySelectorAll('[data-products]').forEach((item) => item.classList.toggle('is-hidden', item.dataset.products !== buttonItem.dataset.productTab));
  }, { signal }));

  document.querySelector('[data-filter]')?.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    document.querySelectorAll('[data-product]').forEach((item) => { item.hidden = !item.dataset.product.includes(query); });
  }, { signal });

  document.querySelectorAll('[data-voice]').forEach((buttonItem) => buttonItem.addEventListener('click', () => {
    const slides = [...document.querySelectorAll('[data-voices] article')];
    const active = slides.findIndex((item) => item.classList.contains('is-current'));
    const next = buttonItem.dataset.voice === 'next' ? (active + 1) % slides.length : (active - 1 + slides.length) % slides.length;
    slides.forEach((item, index) => item.classList.toggle('is-current', index === next));
    const counter = document.querySelector('[data-voice-count]');
    if (counter) counter.textContent = `${String(next + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  }, { signal }));

  document.querySelector('[data-contact]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const note = event.currentTarget.querySelector('[data-form-note]');
    if (note) note.textContent = 'Merci. Votre demande est prête pour l’équipe MIRS.';
  }, { signal });

  initMotion(signal);
  initTrail(signal);
}

function initMotion(signal) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-seen');
      observer.unobserve(entry.target);
    }
  }), { threshold: .12 });
  document.querySelectorAll('[data-inview], [data-reveal], .f-system, .f-proofs, .f-voices, .f-course-band').forEach((item) => observer.observe(item));
  signal.addEventListener('abort', () => observer.disconnect(), { once: true });
  if (reduced || innerWidth < 760) return;

  const parallax = [...document.querySelectorAll('[data-parallax]')];
  const stages = [...document.querySelectorAll('[data-build], [data-print]')];
  let ticking = false;
  const update = () => {
    parallax.forEach((item) => {
      const box = item.getBoundingClientRect();
      const value = Math.max(-1, Math.min(1, (innerHeight / 2 - (box.top + box.height / 2)) / innerHeight));
      item.style.setProperty('--parallax-y', `${value * 16}px`);
      item.style.setProperty('--parallax-r', `${value * -2.5}deg`);
    });
    stages.forEach((item) => {
      const box = item.parentElement.getBoundingClientRect();
      const value = Math.max(0, Math.min(1, (innerHeight - box.top) / (innerHeight + box.height)));
      item.style.setProperty('--progress', value.toFixed(3));
    });
    ticking = false;
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', onScroll, { passive: true, signal });
  update();
}

function initTrail(signal) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(pointer:fine)').matches) return;
  const canvas = document.querySelector('.f-trail');
  if (!canvas) return;
  const context = canvas.getContext('2d');
  const points = [];
  let width = 0;
  let height = 0;
  let frame = 0;
  const resize = () => {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = innerWidth; height = innerHeight;
    canvas.width = width * ratio; canvas.height = height * ratio;
    canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };
  const move = (event) => {
    points.push({ x: event.clientX, y: event.clientY, life: 1 });
    if (points.length > 24) points.shift();
  };
  const draw = () => {
    context.clearRect(0, 0, width, height);
    for (let index = 1; index < points.length; index += 1) {
      const previous = points[index - 1]; const point = points[index];
      point.life -= .035;
      if (point.life <= 0) continue;
      context.beginPath();
      context.moveTo(previous.x, previous.y); context.lineTo(point.x, point.y);
      context.strokeStyle = `rgba(0, 213, 246, ${point.life * .58})`;
      context.lineWidth = Math.max(1, point.life * 4);
      context.stroke();
    }
    while (points.length && points[0].life <= 0) points.shift();
    frame = requestAnimationFrame(draw);
  };
  resize();
  frame = requestAnimationFrame(draw);
  addEventListener('resize', resize, { signal });
  addEventListener('pointermove', move, { passive: true, signal });
  signal.addEventListener('abort', () => {
    cancelAnimationFrame(frame);
    context.clearRect(0, 0, width, height);
  }, { once: true });
}

addEventListener('popstate', () => route());
route();
