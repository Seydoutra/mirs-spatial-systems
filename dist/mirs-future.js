const BASE_PATH = new URL('.', document.baseURI).pathname.replace(/\/$/, '');
const AS = `${BASE_PATH}/assets/`;
const pageHref = (path) => `${BASE_PATH}${path}` || '/';

function pageRoute(path = location.pathname) {
  if (!BASE_PATH) return path.replace(/\/+$/, '') || '/';
  const localPath = path === BASE_PATH ? '/' : path.startsWith(`${BASE_PATH}/`) ? path.slice(BASE_PATH.length) : path;
  return localPath.replace(/\/+$/, '') || '/';
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
};

const products = {
  tech: [
    ['Poste de travail', 'editorial/equipement-clavier.jpg', 'Configurer'],
    ['Réseau & Wi-Fi', 'editorial/maintenance-pc.jpg', 'Étudier'],
    ['Cybersécurité', 'future/informatique-team.jpg', 'Protéger'],
    ['Maintenance', 'editorial/maintenance-pc.jpg', 'Planifier'],
  ],
  print: [
    ['Tote bag', 'catalogue/tote-bag.png', 'Personnaliser'],
    ['T-shirt', 'catalogue/tshirt.png', 'Personnaliser'],
    ['Mug', 'catalogue/mug.png', 'Personnaliser'],
    ['Packaging', 'catalogue/packaging-orange.png', 'Créer'],
    ['Casquette', 'catalogue/casquette.png', 'Personnaliser'],
  ],
};

const courses = [
  ['AMADEUS', 'Voyage & réservation'],
  ['Réseaux & systèmes', 'Déployer et administrer'],
  ['Microsoft Office', 'Produire avec méthode'],
  ['Marketing digital', 'Créer et diffuser'],
  ['Live coding', 'Concevoir par la pratique'],
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

const link = (href, label, className = 'site-link') =>
  `<a href="${href}" data-link class="${className}"><span>${label}</span><i aria-hidden="true">↗</i></a>`;

const button = (href, label, className = '') => link(href, label, `button-link ${className}`.trim());

const anchor = (id, label, className = 'site-link') =>
  `<a href="#${id}" data-anchor="${id}" class="${className}"><span>${label}</span><i aria-hidden="true">↓</i></a>`;

const title = (content, tag = 'h2') => `<${tag} class="display-title" data-reveal>${content}</${tag}>`;

function logoCell(file) {
  return `<figure class="logo-cell"><img src="${AS}${file}" alt="" decoding="async"></figure>`;
}

function logoBands(compact = false) {
  const groups = [clientLogos.slice(0, 27), clientLogos.slice(27, 54), clientLogos.slice(54, 81)];
  return `<div class="logo-bands ${compact ? 'is-compact' : ''}" aria-label="81 organisations accompagnées par MIRS">
    ${groups.map((group, index) => `<div class="logo-lane logo-lane-${index + 1}"><div class="logo-track">${[...group, ...group].map(logoCell).join('')}</div></div>`).join('')}
  </div>`;
}

function header() {
  return `<header class="site-header">
    <a href="/" data-link class="brand" aria-label="MIRS — accueil"><img src="${AS}mirs-logo.png" alt=""><span><b>MIRS</b><small>SPATIAL SYSTEMS</small></span></a>
    <nav class="desktop-nav" aria-label="Navigation principale">
      <a href="#univers" data-anchor="univers">Univers</a>
      <a href="#references" data-anchor="references">Références</a>
      ${link('/realisations', 'Réalisations', 'nav-route')}
      ${link('/formation', 'Academy', 'nav-route')}
    </nav>
    <div class="header-actions">
      <button type="button" data-theme aria-label="Changer de thème" title="Changer de thème"><span>◐</span></button>
      <button type="button" data-cart class="cart-button" aria-label="Ouvrir le panier"><span>Projet</span><b>${state.cart.length}</b></button>
      ${button('/contact', 'Parler à MIRS', 'header-cta')}
      <button type="button" class="menu-button" data-menu aria-controls="mobile-navigation" aria-expanded="false"><span></span><span></span><span class="sr-only">Menu</span></button>
    </div>
  </header>
  <aside class="mobile-navigation" id="mobile-navigation" data-mobile-menu hidden>
    <a href="#univers" data-anchor="univers">Nos univers <i>↓</i></a>
    <a href="#references" data-anchor="references">Nos références <i>↓</i></a>
    ${link('/realisations', 'Réalisations')}
    ${link('/formation', 'MIRS Academy')}
    ${link('/contact', 'Démarrer un projet', 'button-link primary')}
  </aside>`;
}

function footer() {
  return `<footer class="site-footer">
    <div class="footer-intro"><a href="/" data-link class="brand"><img src="${AS}mirs-logo.png" alt=""><span><b>MIRS</b><small>SPATIAL SYSTEMS</small></span></a><p>Informatique, production et transmission pour les organisations qui veulent avancer.</p></div>
    <div class="footer-list"><span>Conakry · Guinée</span><a href="tel:+224622051321">+224 622 05 13 21</a><a href="https://wa.me/224622051321" target="_blank" rel="noreferrer">WhatsApp ↗</a></div>
    <div class="footer-list"><span>Parcours</span>${link('/informatique', 'Informatique')}${link('/imprimerie', 'Imprimerie')}${link('/formation', 'MIRS Academy')}</div>
    <small class="footer-mark">© MIRS SARL · Modernité · Innovation · Réseau · Service</small>
  </footer>`;
}

function shell(content, page = '') {
  return `${header()}<main class="site-main ${page}">${content}</main>${footer()}
    <div class="toast" data-toast role="status"></div>
    <dialog class="project-dialog" data-cart-dialog><button type="button" data-close aria-label="Fermer">×</button><p class="eyebrow">VOTRE PROJET</p><h2>Votre sélection.</h2><div data-cart-lines></div>${button('/checkout', 'Envoyer la demande', 'primary')}<small>Un conseiller MIRS vérifie les détails avant toute commande.</small></dialog>`;
}

function projectCard({ index, name, tag, copy, href, image, tone }) {
  return `<a href="${href}" data-link class="universe-card ${tone}" data-tilt>
    <span class="card-index">0${index}</span><img src="${AS}${image}" alt="" loading="lazy"><div class="card-shade"></div>
    <div class="universe-card-copy"><p>${tag}</p><h3>${name}</h3><span>${copy}</span><b>Explorer <i>↗</i></b></div>
  </a>`;
}

function home() {
  return shell(`
    <section class="home-hero">
      <div class="hero-grain"></div><div class="hero-grid"></div><div class="hero-orbit orbit-one"></div><div class="hero-orbit orbit-two"></div>
      <div class="hero-meta"><span>MIRS / CONAKRY</span><span>DEPUIS 2006</span><span>09° 31' N · 13° 42' W</span></div>
      <div class="hero-copy"><p class="eyebrow">DES SOLUTIONS QUI PRENNENT PLACE.</p>${title('On rend<br>le travail<br><em>possible.</em>', 'h1')}<p class="hero-intro">MIRS aide les organisations à faire circuler l’information, produire des supports qui comptent et développer les compétences qui durent.</p><div class="hero-cta">${button('/contact', 'Lancer un projet', 'primary')}${anchor('univers', 'Choisir un univers', 'button-link quiet')}</div></div>
      <div class="hero-object" aria-hidden="true"><div class="object-halo"></div><div class="object-plane plane-a"></div><div class="object-plane plane-b"></div><div class="object-plane plane-c"></div><div class="object-core"><span>M</span></div><span class="object-label">MIRS<br>OPERATING<br>FIELD</span></div>
      <div class="hero-foot"><span>INFORMATIQUE</span><i></i><span>IMPRIMERIE</span><i></i><span>ACADEMY</span><b>SCROLL ↓</b></div>
    </section>

    <section class="universe-intro" id="univers">
      <div class="section-kicker"><span>01</span><p>CHOISISSEZ VOTRE TRAJECTOIRE</p></div>
      <div class="universe-head">${title('Trois expertises.<br>Une même <em>impulsion.</em>')}<p>Chaque pôle MIRS se pense comme un atelier : clair, opérationnel et conçu pour vous faire passer à l’étape suivante.</p></div>
      <div class="universe-grid">
        ${projectCard({ index: 1, name: 'Informatique', tag: 'SYSTÈMES & INFRASTRUCTURES', copy: 'Réseaux, postes, sécurité, support.', href: '/informatique', image: 'future/informatique-team.jpg', tone: 'tech' })}
        ${projectCard({ index: 2, name: 'Imprimerie', tag: 'IMAGES & PRODUCTION', copy: 'Supports, grand format, objets, digital.', href: '/imprimerie', image: 'future/imprimerie-team.jpg', tone: 'print' })}
        ${projectCard({ index: 3, name: 'MIRS Academy', tag: 'FORMATION & PRATIQUE', copy: 'Des capacités directement actionnables.', href: '/formation', image: 'editorial/formation-collaboration.jpg', tone: 'learn' })}
      </div>
    </section>

    <section class="split-statement tech-statement">
      <div class="statement-copy"><p class="eyebrow">MIRS INFORMATIQUE / 01</p>${title('Une infrastructure<br>qui ne ralentit<br><em>personne.</em>')}<p>De la première étude au suivi quotidien, les outils sont mis en ordre autour de votre activité.</p>${button('/informatique', 'Voir l’univers informatique', 'text-button')}</div>
      <div class="system-sculpture computer-sculpture" data-build><div class="sculpture-aura"></div><i class="screen"><b>MIRS<br>READY</b></i><i class="screen-glow"></i><i class="machine-base"></i><i class="machine-chip"></i><span>BUILD / AS YOU SCROLL</span></div>
    </section>

    <section class="film-strip"><button type="button" class="film-shot" data-video="technology-flow.mp4"><img src="${AS}editorial/developpement-web.jpg" alt="Technologie MIRS" loading="lazy"><span>FILM / 01</span><i>▶</i></button><div class="film-note"><p class="eyebrow">REGARDER, PAS DEVINER.</p><h2>Un système se voit aussi en mouvement.</h2>${button('/informatique', 'Entrer dans les solutions', 'button-link quiet')}</div></section>

    <section class="print-signal">
      <div class="print-signal-top"><p class="eyebrow">MIRS IMPRIMERIE / 02</p>${title('L’idée sort<br>du cadre.<br><em>Pour de vrai.</em>')}<div>${button('/imprimerie', 'Créer un support', 'primary')}${button('/imprimerie/boutique', 'Voir la boutique', 'quiet button-link')}</div></div>
      <div class="printer-room"><div class="paper-sheet sheet-one"></div><div class="paper-sheet sheet-two"></div><div class="paper-sheet sheet-three"></div><div class="print-machine"><i></i><b></b><em>MAKE<br>IT<br>REAL</em></div><span>CMYK / MIRS / PRODUCTION</span></div>
    </section>

    <section class="reference-field" id="references">
      <div class="reference-head"><div><p class="eyebrow">81 CLIENTS. UNE RELATION DE CONFIANCE.</p>${title('Leur identité<br>dans notre<br><em>mouvement.</em>')}</div><p>Institutions, entreprises, PME et organisations : les logos qui défilent ici sont les véritables références fournies à MIRS.</p></div>
      ${logoBands()}
      <div class="reference-foot"><span>FAITES GLISSER LE CURSEUR. LES RUBANS S’ARRÊTENT.</span>${button('/realisations', 'Voir quelques réalisations', 'text-button')}</div>
    </section>

    <section class="case-grid">
      <div class="case-intro"><p class="eyebrow">DES INTERVENTIONS QUI LAISSENT UNE TRACE.</p>${title('L’action, c’est<br>notre meilleure<br><em>preuve.</em>')}<p>Trois façons de prendre le relais quand une organisation a besoin d’avancer.</p></div>
      <article class="case-card"><span>01 / CONNECTER</span><img src="${AS}editorial/maintenance-pc.jpg" alt="" loading="lazy"><h3>Remettre le système au centre du travail.</h3><a href="/informatique" data-link>Informatique ↗</a></article>
      <article class="case-card offset"><span>02 / RENDRE VISIBLE</span><img src="${AS}editorial/impression-grand-format.jpg" alt="" loading="lazy"><h3>Faire exister une marque, dans l’espace et dans la main.</h3><a href="/imprimerie" data-link>Imprimerie ↗</a></article>
      <article class="case-card"><span>03 / TRANSMETTRE</span><img src="${AS}editorial/formation-collaboration.jpg" alt="" loading="lazy"><h3>Faire de la compétence un levier immédiat.</h3><a href="/formation" data-link>Academy ↗</a></article>
    </section>

    <section class="academy-pulse">
      <div class="academy-stamp" aria-hidden="true"><span>LEARN</span><b>×</b><span>DO</span></div>
      <div><p class="eyebrow">MIRS ACADEMY / 03</p>${title('Apprendre<br>en faisant,<br><em>maintenant.</em>')}<p>Des sessions accessibles, centrées sur des situations concrètes et le plaisir d’être capable.</p>${button('/formation', 'Explorer les formations', 'primary')}</div>
      <div class="academy-list">${courses.slice(0, 4).map(([name, detail], index) => `<a href="/formation" data-link><b>0${index + 1}</b><span>${name}<small>${detail}</small></span><i>↗</i></a>`).join('')}</div>
    </section>

    <section class="final-block"><div class="final-glow"></div><p class="eyebrow">LA PROCHAINE ÉTAPE PEUT COMMENCER ICI.</p>${title('Faisons de la<br>place à votre<br><em>projet.</em>')}<div>${button('/contact', 'Parler à l’équipe MIRS', 'primary')}${button('/realisations', 'Voir le champ d’action', 'quiet button-link')}</div></section>
  `, 'home-page');
}

const units = {
  informatique: {
    eyebrow: 'MIRS INFORMATIQUE', number: '01', name: 'Tout commence par un système qui tient.',
    intro: 'Réseaux, équipements, sécurité et accompagnement : l’IT doit libérer l’énergie des équipes, pas la consommer.',
    image: 'editorial/equipement-clavier.jpg', video: 'technology-flow.mp4', shop: '/informatique/boutique', action: 'Voir les solutions',
    practice: ['Audit & architecture', 'Réseau & connectivité', 'Équipements & parc', 'Sécurité & support'],
    material: 'L’informatique est un service vivant. MIRS compose une base fiable, puis reste disponible quand votre réalité change.',
    tone: 'unit-tech',
  },
  imprimerie: {
    eyebrow: 'MIRS IMPRIMERIE', number: '02', name: 'Une identité vaut mieux quand elle devient tangible.',
    intro: 'Impression, signalétique, objets et production digitale : vos idées trouvent leur place dans la rue, dans un salon ou dans la main.',
    image: 'editorial/impression-grand-format.jpg', video: 'imprimerie-presentation.mp4', shop: '/imprimerie/boutique', action: 'Voir la boutique',
    practice: ['Conseil & création', 'Grand format', 'Éditions & supports', 'Objets de marque'],
    material: 'On regarde le fichier, le papier, le volume et le délai ensemble. La production devient une conversation, pas une boîte noire.',
    tone: 'unit-print',
  },
};

function branch(unit) {
  const data = units[unit];
  return shell(`
    <section class="unit-hero ${data.tone}"><img src="${AS}${data.image}" alt="" loading="eager"><div class="unit-veil"></div><div class="unit-hero-copy"><p class="eyebrow">${data.number} / ${data.eyebrow}</p>${title(data.name, 'h1')}<p>${data.intro}</p><div>${button('/contact', 'Parler à un expert', 'primary')}${button(data.shop, data.action, 'quiet button-link')}</div></div><div class="unit-ticker"><span>${data.eyebrow}</span><span>CONAKRY · GUINÉE</span><span>DEPUIS 2006</span></div></section>
    <section class="unit-practices"><div class="section-kicker"><span>${data.number}</span><p>LE CHAMP D’ACTION</p></div>${title('Des éléments distincts.<br>Un ensemble <em>fluide.</em>')}<div class="practice-list">${data.practice.map((item, index) => `<a href="/contact" data-link><b>0${index + 1}</b><span>${item}</span><i>↗</i></a>`).join('')}</div></section>
    <section class="unit-material ${data.tone}"><div class="unit-material-photo"><img src="${AS}${data.image}" alt="" loading="lazy"><span>${data.number} / MIRS</span></div><div><p class="eyebrow">LA BONNE QUESTION AVANT LA BONNE RÉPONSE.</p>${title(data.material)}${button('/contact', 'Décrire votre besoin', 'text-button')}</div></section>
    <section class="unit-film"><div><p class="eyebrow">UN APERÇU EN MOUVEMENT.</p>${title(unit === 'informatique' ? 'L’information<br>circule, le travail<br><em>respire.</em>' : 'L’encre, la matière,<br>l’image qui <em>prend place.</em>')}${button(data.shop, data.action, 'button-link quiet')}</div><button type="button" class="large-film" data-video="${data.video}"><img src="${AS}${data.image}" alt="" loading="lazy"><span>REGARDER LE FILM</span><i>▶</i></button></section>
    <section class="unit-actions"><div><p class="eyebrow">ON CONSTRUIT LA SUITE.</p><h2>Vous avez un point de départ.<br>On organise le reste.</h2></div>${button('/contact', 'Obtenir un devis', 'primary')}</section>
    <section class="reference-capsule"><p>ILS NOUS ONT CONFIÉ UNE PARTIE DU CHEMIN.</p>${logoBands(true)}</section>
  `, `unit-page ${data.tone}`);
}

function training() {
  return shell(`
    <section class="academy-hero"><div class="academy-lines"></div><div class="academy-hero-copy"><p class="eyebrow">MIRS ACADEMY / 03</p>${title('On apprend<br>mieux quand<br>on <em>agit.</em>', 'h1')}<p>La formation MIRS est une zone de pratique : on essaye, on comprend et on repart capable.</p>${button('/contact', 'Demander une session', 'primary')}</div><div class="academy-dial"><span>SKILL</span><b>01</b><i>PRATIQUE<br>AVANT<br>THÉORIE</i></div></section>
    <section class="course-section"><div class="section-kicker"><span>01</span><p>MODULES À EXPLORER</p></div>${title('Choisir la compétence<br>qui déplace votre <em>quotidien.</em>')}<div class="course-list">${courses.map(([name, detail], index) => `<article><span>0${index + 1}</span><h3>${name}</h3><p>${detail}</p><a href="/contact" data-link>Demander une session ↗</a></article>`).join('')}</div></section>
    <section class="academy-process"><div><p class="eyebrow">LE FORMAT MIRS</p>${title('Observer.<br>Pratiquer.<br><em>Réutiliser.</em>')}</div><div class="process-path"><article><b>01</b><h3>Un contexte</h3><p>On part du besoin et du niveau du groupe.</p></article><article><b>02</b><h3>Un atelier</h3><p>La théorie devient un geste, un outil, un projet.</p></article><article><b>03</b><h3>Une suite</h3><p>Les acquis servent dès le retour au travail.</p></article></div></section>
    <section class="final-block academy-final"><p class="eyebrow">UNE COMPÉTENCE PEUT CHANGER LA SUITE.</p>${title('Entrons dans<br>le <em>faire.</em>')}${button('/contact', 'Planifier une formation', 'primary')}</section>
  `, 'academy-page');
}

function productCard(type, [name, image, action]) {
  return `<article class="catalog-card" data-product="${name.toLowerCase()}"><div class="catalog-image"><img src="${AS}${image}" alt="${name}" loading="lazy"><span>${type === 'tech' ? 'SUR ÉTUDE' : 'PERSONNALISABLE'}</span></div><h2>${name}</h2><p>${type === 'tech' ? 'Une configuration adaptée à votre contexte.' : 'Un support à mettre aux couleurs de votre projet.'}</p><button type="button" data-add="${name}">${action} <i>+</i></button></article>`;
}

function shop(unit) {
  const type = unit === 'informatique' ? 'tech' : 'print';
  const copy = type === 'tech' ? ['Équiper le travail.', 'Postes, réseau, sécurité : sélectionnez un point de départ et recevons votre demande comme un vrai projet.'] : ['Rendre l’idée visible.', 'Choisissez votre support. MIRS vous accompagne ensuite sur les dimensions, la personnalisation et la production.'];
  return shell(`
    <section class="store-hero store-${type}"><div><p class="eyebrow">BOUTIQUE MIRS / ${type === 'tech' ? 'INFORMATIQUE' : 'IMPRIMERIE'}</p>${title(copy[0], 'h1')}<p>${copy[1]}</p></div><div class="store-token"><span>${type === 'tech' ? 'TECH' : 'PRINT'}</span><i></i><b>+<br>+</b></div></section>
    <section class="catalogue"><div class="catalogue-top"><p class="eyebrow">SÉLECTION MIRS</p><label><span class="sr-only">Rechercher un produit</span><input data-filter placeholder="Rechercher" aria-label="Rechercher un produit"></label></div><div class="catalogue-grid">${[...products[type], ...products[type]].map((product) => productCard(type, product)).join('')}</div></section>
  `, `store-page store-${type}`);
}

function projects() {
  const cases = [
    ['Architecture informatique', 'Mettre chaque équipe en capacité de travailler sans friction.', 'editorial/maintenance-pc.jpg', '/informatique'],
    ['Présence de marque', 'Déployer des supports qui font exister une identité hors écran.', 'editorial/impression-grand-format.jpg', '/imprimerie'],
    ['Transfert de compétences', 'Faire circuler les gestes qui rendent une organisation plus autonome.', 'editorial/formation-collaboration.jpg', '/formation'],
  ];
  return shell(`
    <section class="projects-hero"><p class="eyebrow">RÉALISATIONS / MIRS</p>${title('Des projets<br>faits pour<br><em>servir.</em>', 'h1')}<p>Plutôt que de faire à la place de nos clients, nous structurons ce qui leur permettra de tenir dans le temps.</p></section>
    <section class="project-cases">${cases.map(([name, copy, image, href], index) => `<article><span>0${index + 1}</span><div class="case-image"><img src="${AS}${image}" alt="" loading="lazy"></div><div><p class="eyebrow">${name.toUpperCase()}</p><h2>${copy}</h2>${button(href, 'Explorer cet univers', 'text-button')}</div></article>`).join('')}</section>
    <section class="reference-field projects-reference"><div class="reference-head"><div><p class="eyebrow">UNE CARTE DE CONFIANCE.</p>${title('81 identités<br>réunies dans<br><em>un même élan.</em>')}</div><p>Un aperçu vivant des structures qui ont choisi d’avancer avec MIRS.</p></div>${logoBands()}</section>
    <section class="final-block"><p class="eyebrow">VOTRE PROJET A SA PROPRE FORME.</p>${title('On peut la<br>faire <em>apparaître.</em>')}${button('/contact', 'Parler à MIRS', 'primary')}</section>
  `, 'projects-page');
}

function contact() {
  return shell(`
    <section class="contact-page"><div class="contact-intro"><p class="eyebrow">LE PREMIER ÉCHANGE COMPTE.</p>${title('On regarde<br>ce qu’il faut<br>faire <em>avancer.</em>', 'h1')}<p>Conakry, Guinée<br><a href="tel:+224622051321">+224 622 05 13 21</a></p><a class="whatsapp-link" href="https://wa.me/224622051321" target="_blank" rel="noreferrer">Écrire sur WhatsApp ↗</a></div><form class="contact-form" data-contact><label>Nom ou entreprise<input required name="name" placeholder="Votre nom"></label><label>Téléphone<input required name="phone" placeholder="Votre téléphone"></label><label>Votre besoin<select name="need"><option>Informatique</option><option>Imprimerie</option><option>Formation</option><option>Autre projet</option></select></label><label>Quelques lignes<textarea name="project" placeholder="Ce que vous voulez faire avancer."></textarea></label><button class="button-link primary">Envoyer la demande <i>↗</i></button><p data-form-note></p></form></section>
  `, 'contact-page');
}

function checkout() {
  const lines = state.cart.length ? state.cart.map((item) => `<li>${item}<button type="button" data-remove="${item}" aria-label="Retirer ${item}">×</button></li>`).join('') : '<li>Votre sélection est vide. Explorez l’une des boutiques MIRS.</li>';
  return shell(`
    <section class="checkout-page"><div><p class="eyebrow">VOTRE PROJET MIRS</p>${title('On organise<br>la <em>suite.</em>', 'h1')}<ul data-checkout-lines>${lines}</ul></div><form class="contact-form" data-contact><label>Nom ou entreprise<input required placeholder="Votre nom"></label><label>Téléphone<input required placeholder="Votre téléphone"></label><label>Email<input type="email" placeholder="Votre email"></label><label>Précisions<textarea placeholder="Quantité, délai, informations utiles…"></textarea></label><button class="button-link primary">Envoyer ma demande <i>↗</i></button><p data-form-note></p></form></section>
  `, 'checkout-page');
}

function renderRoute(path = location.pathname, options = {}) {
  const clean = pageRoute(path);
  const markup = clean === '/' ? home()
    : clean === '/informatique' ? branch('informatique')
      : clean === '/imprimerie' ? branch('imprimerie')
        : clean === '/formation' ? training()
          : clean === '/informatique/boutique' ? shop('informatique')
            : clean === '/imprimerie/boutique' ? shop('imprimerie')
              : clean === '/realisations' ? projects()
                : clean === '/checkout' ? checkout()
                  : contact();
  document.getElementById('app').innerHTML = markup;
  document.documentElement.dataset.theme = state.theme;
  document.title = clean === '/' ? 'MIRS — Faire avancer le travail' : `MIRS — ${clean.split('/').pop().replaceAll('-', ' ')}`;
  bind();
  if (!options.preserveScroll) scrollTo(0, 0);
}

function persistCart() {
  localStorage.setItem('mirs-future-cart', JSON.stringify(state.cart));
}

function flash(message) {
  const toast = document.querySelector('[data-toast]');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

function renderCart() {
  const box = document.querySelector('[data-cart-lines]');
  if (!box) return;
  box.innerHTML = state.cart.length ? state.cart.map((item) => `<p><span>${item}</span><button type="button" data-remove="${item}" aria-label="Retirer ${item}">×</button></p>`).join('') : '<p class="dialog-empty">Votre sélection est vide.</p>';
}

function openCart() {
  const dialog = document.querySelector('[data-cart-dialog]');
  renderCart();
  if (dialog && !dialog.open) dialog.showModal();
}

function playVideo(file) {
  const chunks = videoChunks[file];
  const dialog = document.createElement('dialog');
  dialog.className = 'film-dialog';
  dialog.innerHTML = `<button type="button" aria-label="Fermer la vidéo">×</button><video controls autoplay playsinline preload="metadata" aria-label="Vidéo MIRS"><source src="${AS}video/${file}" type="video/mp4"></video><p class="film-status">Chargement du film…</p>`;
  document.body.append(dialog);
  dialog.showModal();
  const video = dialog.querySelector('video');
  const status = dialog.querySelector('.film-status');
  let fallbackUrl = '';
  let recovered = false;
  const close = () => {
    if (fallbackUrl) URL.revokeObjectURL(fallbackUrl);
    dialog.remove();
  };
  video.addEventListener('canplay', () => status.remove(), { once: true });
  const recover = async () => {
    if (recovered || !chunks) {
      status.textContent = 'Le film est momentanément indisponible.';
      return;
    }
    recovered = true;
    status.textContent = 'Préparation du film…';
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
      status.textContent = 'Le film est momentanément indisponible.';
    }
  };
  video.addEventListener('error', recover, { once: true });
  dialog.querySelector('button').addEventListener('click', close);
  dialog.addEventListener('cancel', close);
}

function showAnchor(id) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function bind() {
  routeAbort?.abort();
  const controller = new AbortController();
  routeAbort = controller;
  const { signal } = controller;

  document.querySelectorAll('[data-link][href^="/"]').forEach((item) => item.setAttribute('href', pageHref(item.getAttribute('href'))));
  document.querySelectorAll('[data-link]').forEach((item) => item.addEventListener('click', (event) => {
    const url = new URL(item.href);
    if (url.origin !== location.origin) return;
    event.preventDefault();
    history.pushState({}, '', url.pathname);
    renderRoute(url.pathname);
  }, { signal }));

  document.querySelectorAll('[data-anchor]').forEach((item) => item.addEventListener('click', (event) => {
    event.preventDefault();
    const id = item.dataset.anchor;
    if (pageRoute() !== '/') {
      history.pushState({}, '', pageHref('/'));
      renderRoute(pageHref('/'));
      requestAnimationFrame(() => showAnchor(id));
      return;
    }
    showAnchor(id);
  }, { signal }));

  document.querySelector('[data-menu]')?.addEventListener('click', (event) => {
    const menu = document.querySelector('[data-mobile-menu]');
    if (!menu) return;
    const open = !menu.hidden;
    menu.hidden = open;
    menu.classList.toggle('is-open', !open);
    event.currentTarget.setAttribute('aria-expanded', String(!open));
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
    flash(`${item.dataset.add} a été ajouté à votre projet.`);
  }, { signal }));

  document.querySelectorAll('[data-remove]').forEach((item) => item.addEventListener('click', () => {
    const index = state.cart.indexOf(item.dataset.remove);
    if (index > -1) state.cart.splice(index, 1);
    persistCart();
    const count = document.querySelector('[data-cart] b');
    if (count) count.textContent = state.cart.length;
    renderCart();
    if (document.querySelector('[data-checkout-lines]')) renderRoute('/checkout');
  }, { signal }));

  document.querySelector('[data-filter]')?.addEventListener('input', (event) => {
    const query = event.target.value.trim().toLowerCase();
    document.querySelectorAll('[data-product]').forEach((item) => { item.hidden = !item.dataset.product.includes(query); });
  }, { signal });

  document.querySelector('[data-contact]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const note = event.currentTarget.querySelector('[data-form-note]');
    if (note) note.textContent = 'Merci. Votre demande est prête pour l’équipe MIRS.';
  }, { signal });

  initMotion(signal);
  initTilt(signal);
}

function initMotion(signal) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-seen');
      observer.unobserve(entry.target);
    }
  }), { threshold: .12 });
  document.querySelectorAll('[data-reveal], .universe-card, .case-card, .catalog-card, .course-list article, .practice-list a, .process-path article').forEach((item) => observer.observe(item));
  signal.addEventListener('abort', () => observer.disconnect(), { once: true });
  if (reduced || innerWidth < 760) return;

  const builds = [...document.querySelectorAll('[data-build]')];
  let queued = false;
  const update = () => {
    builds.forEach((item) => {
      const box = item.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (innerHeight - box.top) / (innerHeight + box.height * .3)));
      item.style.setProperty('--build', progress.toFixed(3));
    });
    queued = false;
  };
  const onScroll = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  };
  addEventListener('scroll', onScroll, { passive: true, signal });
  update();
}

function initTilt(signal) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(pointer:fine)').matches) return;
  document.querySelectorAll('[data-tilt]').forEach((item) => {
    item.addEventListener('pointermove', (event) => {
      const rect = item.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      item.style.setProperty('--tilt-x', `${x * 4}deg`);
      item.style.setProperty('--tilt-y', `${y * -4}deg`);
    }, { signal });
    item.addEventListener('pointerleave', () => {
      item.style.removeProperty('--tilt-x');
      item.style.removeProperty('--tilt-y');
    }, { signal });
  });
}

addEventListener('popstate', () => renderRoute(location.pathname));
renderRoute();
