/* ==================================================================
   MIRS — editable content data.
   Session dates are INDICATIVE and confirmed by MIRS at registration.
   The IT store is quote-based: no prices are published, MIRS confirms
   the amount after each order request.
================================================================== */

export const SESSIONS_NOTE = {
  fr: 'Dates indicatives, confirmées par MIRS à l’inscription.',
  en: 'Indicative dates, confirmed by MIRS upon registration.',
};

export const academyCourses = [
  {
    slug: 'amadeus',
    amadeus: true,
    name: { fr: 'AMADEUS Selling Platform', en: 'AMADEUS Selling Platform' },
    short: 'AMADEUS',
    category: { fr: 'Voyage & réservation', en: 'Travel & booking' },
    categoryKey: 'travel',
    level: { fr: 'Débutant à opérationnel', en: 'Beginner to operational' },
    duration: { fr: '5 jours · 30 h', en: '5 days · 30 h' },
    format: { fr: 'Présentiel à Conakry + suivi', en: 'In person in Conakry + follow-up' },
    audience: { fr: 'Agents de voyage, agences en création, équipes de billetterie.', en: 'Travel agents, new agencies, ticketing teams.' },
    summary: { fr: 'Le parcours de référence pour travailler sur AMADEUS au quotidien, dispensé par le représentant exclusif d’AMADEUS : de la codification à l’émission du billet.', en: 'The reference pathway to work with AMADEUS every day, delivered by the exclusive AMADEUS representative: from encoding to ticket issuance.' },
    objectives: [
      { fr: 'Naviguer avec aisance dans l’environnement AMADEUS.', en: 'Navigate the AMADEUS environment with ease.' },
      { fr: 'Créer, modifier et suivre un dossier passager (PNR).', en: 'Create, modify and follow up a passenger record (PNR).' },
      { fr: 'Tarifer un itinéraire et appliquer les règles tarifaires.', en: 'Price an itinerary and apply fare rules.' },
      { fr: 'Émettre, modifier et rembourser un billet électronique.', en: 'Issue, change and refund an e-ticket.' },
    ],
    prerequisites: { fr: 'Aisance avec l’outil informatique. Aucune connaissance AMADEUS requise.', en: 'Comfortable with computers. No prior AMADEUS knowledge required.' },
    modules: [
      { title: { fr: 'Environnement & codification', en: 'Environment & encoding' }, duration: '4 h', lessons: [{ fr: 'Prise en main de l’interface', en: 'Getting started with the interface' }, { fr: 'Codes villes, aéroports et compagnies', en: 'City, airport and airline codes' }, { fr: 'Encodage et décodage', en: 'Encoding and decoding' }] },
      { title: { fr: 'Disponibilités & horaires', en: 'Availability & schedules' }, duration: '5 h', lessons: [{ fr: 'Consulter les disponibilités', en: 'Checking availability' }, { fr: 'Horaires et vols directs', en: 'Schedules and direct flights' }, { fr: 'Vendre un segment', en: 'Selling a segment' }] },
      { title: { fr: 'Dossier passager (PNR)', en: 'Passenger record (PNR)' }, duration: '6 h', lessons: [{ fr: 'Éléments obligatoires du PNR', en: 'Mandatory PNR elements' }, { fr: 'SSR, OSI et remarques', en: 'SSR, OSI and remarks' }, { fr: 'Files d’attente (queues)', en: 'Queues' }] },
      { title: { fr: 'Tarification', en: 'Pricing' }, duration: '6 h', lessons: [{ fr: 'Affichage et lecture des tarifs', en: 'Fare display and reading' }, { fr: 'Règles tarifaires', en: 'Fare rules' }, { fr: 'Cotation et TST', en: 'Pricing and TST' }] },
      { title: { fr: 'Émission & après-vente', en: 'Issuance & after-sales' }, duration: '5 h', lessons: [{ fr: 'Billet électronique et EMD', en: 'E-ticket and EMD' }, { fr: 'Modification et réémission', en: 'Changes and reissue' }, { fr: 'Annulation et remboursement', en: 'Void and refund' }] },
      { title: { fr: 'Cas pratiques & évaluation', en: 'Practical cases & assessment' }, duration: '4 h', lessons: [{ fr: 'Dossiers complets de bout en bout', en: 'End-to-end bookings' }, { fr: 'Évaluation des acquis', en: 'Skills assessment' }, { fr: 'Plan de suivi individuel', en: 'Individual follow-up plan' }] },
    ],
    sessions: [
      { date: '2026-11-16', place: 'Conakry' },
      { date: '2027-01-11', place: 'Conakry' },
      { date: '2027-02-08', place: 'Conakry' },
    ],
  },
  {
    slug: 'reseaux-systemes',
    name: { fr: 'Réseaux & systèmes', en: 'Networks & systems' },
    short: 'NET',
    category: { fr: 'Infrastructure', en: 'Infrastructure' },
    categoryKey: 'it',
    level: { fr: 'Intermédiaire', en: 'Intermediate' },
    duration: { fr: '4 jours · 24 h', en: '4 days · 24 h' },
    format: { fr: 'Présentiel + travaux pratiques', en: 'In person + hands-on labs' },
    audience: { fr: 'Techniciens, responsables informatiques, administrateurs débutants.', en: 'Technicians, IT leads, junior administrators.' },
    summary: { fr: 'Concevoir, déployer et administrer une base technique lisible : réseau, serveurs, comptes et sauvegardes.', en: 'Design, deploy and administer a clear technical foundation: network, servers, accounts and backups.' },
    objectives: [
      { fr: 'Comprendre l’adressage et la segmentation d’un réseau.', en: 'Understand network addressing and segmentation.' },
      { fr: 'Installer et sécuriser un réseau Wi-Fi professionnel.', en: 'Install and secure a professional Wi-Fi network.' },
      { fr: 'Administrer les comptes et les droits des utilisateurs.', en: 'Administer user accounts and permissions.' },
      { fr: 'Mettre en place une sauvegarde fiable.', en: 'Set up a reliable backup.' },
    ],
    prerequisites: { fr: 'Bases de l’utilisation de Windows.', en: 'Basic Windows knowledge.' },
    modules: [
      { title: { fr: 'Fondamentaux réseau', en: 'Network fundamentals' }, duration: '6 h', lessons: [{ fr: 'Modèle TCP/IP', en: 'TCP/IP model' }, { fr: 'Adressage et sous-réseaux', en: 'Addressing and subnets' }, { fr: 'VLAN et segmentation', en: 'VLANs and segmentation' }] },
      { title: { fr: 'Câblage & Wi-Fi', en: 'Cabling & Wi-Fi' }, duration: '5 h', lessons: [{ fr: 'Baie de brassage et câblage', en: 'Patch panels and cabling' }, { fr: 'Points d’accès et couverture', en: 'Access points and coverage' }, { fr: 'Sécurisation du Wi-Fi', en: 'Securing Wi-Fi' }] },
      { title: { fr: 'Serveurs & annuaire', en: 'Servers & directory' }, duration: '6 h', lessons: [{ fr: 'Windows Server', en: 'Windows Server' }, { fr: 'Active Directory et stratégies', en: 'Active Directory and policies' }, { fr: 'Partages et droits', en: 'Shares and permissions' }] },
      { title: { fr: 'Sécurité & sauvegarde', en: 'Security & backup' }, duration: '4 h', lessons: [{ fr: 'Bonnes pratiques de sécurité', en: 'Security best practices' }, { fr: 'Stratégie de sauvegarde 3-2-1', en: '3-2-1 backup strategy' }, { fr: 'Restauration testée', en: 'Tested restore' }] },
      { title: { fr: 'Supervision & dépannage', en: 'Monitoring & troubleshooting' }, duration: '3 h', lessons: [{ fr: 'Outils de diagnostic', en: 'Diagnostic tools' }, { fr: 'Méthode de dépannage', en: 'Troubleshooting method' }, { fr: 'Documentation du parc', en: 'Documenting assets' }] },
    ],
    sessions: [
      { date: '2026-11-23', place: 'Conakry' },
      { date: '2027-01-18', place: 'Conakry' },
    ],
  },
  {
    slug: 'microsoft-office',
    name: { fr: 'Microsoft Office', en: 'Microsoft Office' },
    short: 'OFFICE',
    category: { fr: 'Bureautique', en: 'Office productivity' },
    categoryKey: 'office',
    level: { fr: 'Tous niveaux', en: 'All levels' },
    duration: { fr: '3 jours · 18 h', en: '3 days · 18 h' },
    format: { fr: 'Présentiel, en groupe ou en entreprise', en: 'In person, open group or in-company' },
    audience: { fr: 'Assistants, managers, équipes administratives et commerciales.', en: 'Assistants, managers, administrative and sales teams.' },
    summary: { fr: 'Créer des habitudes de travail simples et solides avec Word, Excel, PowerPoint et les outils de collaboration.', en: 'Build simple, reliable working habits with Word, Excel, PowerPoint and collaboration tools.' },
    objectives: [
      { fr: 'Produire des documents professionnels homogènes.', en: 'Produce consistent professional documents.' },
      { fr: 'Analyser des données avec Excel.', en: 'Analyse data with Excel.' },
      { fr: 'Présenter clairement avec PowerPoint.', en: 'Present clearly with PowerPoint.' },
      { fr: 'Collaborer efficacement avec Outlook et Teams.', en: 'Collaborate efficiently with Outlook and Teams.' },
    ],
    prerequisites: { fr: 'Aucun.', en: 'None.' },
    modules: [
      { title: { fr: 'Word : documents professionnels', en: 'Word: professional documents' }, duration: '4 h', lessons: [{ fr: 'Styles et mise en page', en: 'Styles and layout' }, { fr: 'Modèles et publipostage', en: 'Templates and mail merge' }, { fr: 'Tables des matières', en: 'Tables of contents' }] },
      { title: { fr: 'Excel : calculer et analyser', en: 'Excel: calculate and analyse' }, duration: '7 h', lessons: [{ fr: 'Formules essentielles', en: 'Essential formulas' }, { fr: 'Tableaux croisés dynamiques', en: 'Pivot tables' }, { fr: 'Graphiques et mise en forme conditionnelle', en: 'Charts and conditional formatting' }] },
      { title: { fr: 'PowerPoint : présenter', en: 'PowerPoint: presenting' }, duration: '4 h', lessons: [{ fr: 'Structurer un message', en: 'Structuring a message' }, { fr: 'Masques et cohérence visuelle', en: 'Masters and visual consistency' }, { fr: 'Animer avec sobriété', en: 'Animating with restraint' }] },
      { title: { fr: 'Outlook & Teams : collaborer', en: 'Outlook & Teams: collaborating' }, duration: '3 h', lessons: [{ fr: 'Messagerie et agenda', en: 'Email and calendar' }, { fr: 'Réunions et canaux', en: 'Meetings and channels' }, { fr: 'Partage de fichiers', en: 'File sharing' }] },
    ],
    sessions: [
      { date: '2026-11-30', place: 'Conakry' },
      { date: '2027-01-25', place: 'Conakry' },
      { date: '2027-02-22', place: 'Conakry' },
    ],
  },
  {
    slug: 'marketing-digital',
    name: { fr: 'Marketing digital', en: 'Digital marketing' },
    short: 'DIGITAL',
    category: { fr: 'Visibilité', en: 'Visibility' },
    categoryKey: 'marketing',
    level: { fr: 'Débutant à intermédiaire', en: 'Beginner to intermediate' },
    duration: { fr: '3 jours · 18 h', en: '3 days · 18 h' },
    format: { fr: 'Présentiel + ateliers', en: 'In person + workshops' },
    audience: { fr: 'Entrepreneurs, chargés de communication, équipes commerciales.', en: 'Entrepreneurs, communication officers, sales teams.' },
    summary: { fr: 'Mettre l’identité et le message au bon endroit : stratégie, contenus, publicité et mesure.', en: 'Place identity and messaging where they matter: strategy, content, advertising and measurement.' },
    objectives: [
      { fr: 'Définir une stratégie de présence en ligne.', en: 'Define an online presence strategy.' },
      { fr: 'Produire un calendrier de contenus.', en: 'Produce a content calendar.' },
      { fr: 'Lancer une campagne publicitaire ciblée.', en: 'Launch a targeted ad campaign.' },
      { fr: 'Lire les indicateurs et ajuster.', en: 'Read the metrics and adjust.' },
    ],
    prerequisites: { fr: 'Utilisation courante des réseaux sociaux.', en: 'Everyday use of social media.' },
    modules: [
      { title: { fr: 'Stratégie & identité', en: 'Strategy & identity' }, duration: '4 h', lessons: [{ fr: 'Cibles et promesse', en: 'Audiences and promise' }, { fr: 'Ligne éditoriale', en: 'Editorial line' }, { fr: 'Identité visuelle cohérente', en: 'Consistent visual identity' }] },
      { title: { fr: 'Réseaux sociaux & contenus', en: 'Social media & content' }, duration: '5 h', lessons: [{ fr: 'Choisir ses plateformes', en: 'Choosing platforms' }, { fr: 'Formats qui fonctionnent', en: 'Formats that work' }, { fr: 'Calendrier de publication', en: 'Publishing calendar' }] },
      { title: { fr: 'Publicité en ligne', en: 'Online advertising' }, duration: '5 h', lessons: [{ fr: 'Objectifs de campagne', en: 'Campaign objectives' }, { fr: 'Ciblage et budgets', en: 'Targeting and budgets' }, { fr: 'Créations publicitaires', en: 'Ad creatives' }] },
      { title: { fr: 'Mesure & optimisation', en: 'Measurement & optimisation' }, duration: '4 h', lessons: [{ fr: 'Indicateurs utiles', en: 'Useful metrics' }, { fr: 'Tableau de bord simple', en: 'Simple dashboard' }, { fr: 'Itérer et améliorer', en: 'Iterate and improve' }] },
    ],
    sessions: [
      { date: '2026-12-07', place: 'Conakry' },
      { date: '2027-02-01', place: 'Conakry' },
    ],
  },
  {
    slug: 'live-coding',
    name: { fr: 'Live coding', en: 'Live coding' },
    short: 'CODE',
    category: { fr: 'Développement', en: 'Development' },
    categoryKey: 'dev',
    level: { fr: 'Débutant', en: 'Beginner' },
    duration: { fr: '5 jours · 30 h', en: '5 days · 30 h' },
    format: { fr: 'Présentiel, 100 % pratique', en: 'In person, 100% hands-on' },
    audience: { fr: 'Étudiants, reconversions, équipes qui veulent prototyper.', en: 'Students, career changers, teams who want to prototype.' },
    summary: { fr: 'Passer de l’idée à un système qui fonctionne en construisant une vraie application web, pas à pas.', en: 'Move from an idea to a working system by building a real web application, step by step.' },
    objectives: [
      { fr: 'Structurer une page web moderne.', en: 'Structure a modern web page.' },
      { fr: 'Rendre une interface interactive en JavaScript.', en: 'Make an interface interactive with JavaScript.' },
      { fr: 'Versionner son code avec Git.', en: 'Version code with Git.' },
      { fr: 'Mettre une application en ligne.', en: 'Put an application online.' },
    ],
    prerequisites: { fr: 'Aucun. Un ordinateur portable est recommandé.', en: 'None. A laptop is recommended.' },
    modules: [
      { title: { fr: 'Bases du web', en: 'Web basics' }, duration: '6 h', lessons: [{ fr: 'HTML sémantique', en: 'Semantic HTML' }, { fr: 'CSS et mise en page', en: 'CSS and layout' }, { fr: 'Responsive design', en: 'Responsive design' }] },
      { title: { fr: 'JavaScript', en: 'JavaScript' }, duration: '8 h', lessons: [{ fr: 'Variables, fonctions, événements', en: 'Variables, functions, events' }, { fr: 'Manipuler la page', en: 'Manipulating the page' }, { fr: 'Appeler une API', en: 'Calling an API' }] },
      { title: { fr: 'Construire une application', en: 'Building an application' }, duration: '8 h', lessons: [{ fr: 'Du besoin à la maquette', en: 'From need to mock-up' }, { fr: 'Développement guidé', en: 'Guided development' }, { fr: 'Tests et corrections', en: 'Testing and fixes' }] },
      { title: { fr: 'Git & mise en ligne', en: 'Git & deployment' }, duration: '8 h', lessons: [{ fr: 'Versionner avec Git', en: 'Versioning with Git' }, { fr: 'Publier en ligne', en: 'Publishing online' }, { fr: 'Présentation du projet', en: 'Project presentation' }] },
    ],
    sessions: [
      { date: '2027-01-18', place: 'Conakry' },
      { date: '2027-02-15', place: 'Conakry' },
    ],
  },
];

/* IT store — quote-based catalogue.
   `image` shows a product photo (path under assets/), `fit` is 'studio'
   (white background), 'contain' (cut-out) or 'cover'. Without `image`,
   the `icon` line illustration is used. */
export const storeCategories = [
  { key: 'postes', label: { fr: 'Postes de travail', en: 'Workstations' } },
  { key: 'peripheriques', label: { fr: 'Périphériques', en: 'Peripherals' } },
  { key: 'reseau', label: { fr: 'Réseau', en: 'Networking' } },
  { key: 'serveurs', label: { fr: 'Serveurs & stockage', en: 'Servers & storage' } },
  { key: 'securite', label: { fr: 'Sécurité', en: 'Security' } },
  { key: 'energie', label: { fr: 'Énergie', en: 'Power' } },
  { key: 'services', label: { fr: 'Services', en: 'Services' } },
];

export const storeProducts = [
  { id: 'macbook-pro-14-m5-pro', featured: true, image: 'store/macbook-pro-14.webp', fit: 'studio', icon: 'laptop', category: 'postes', name: { fr: 'MacBook Pro 14" — puce Apple M5 Pro', en: 'MacBook Pro 14" — Apple M5 Pro chip' }, detail: { fr: 'MacBook Pro (14 pouces) avec puce Apple M5 Pro, conçu pour Apple Intelligence : CPU 15 cœurs, GPU 16 cœurs, 24 Go de mémoire, SSD 1 To.', en: 'MacBook Pro Laptop (14-inch) with Apple M5 Pro chip, built for Apple Intelligence: 15-core CPU, 16-core GPU, 24GB memory, 1TB SSD storage.' }, option: { label: { fr: 'Configuration', en: 'Configuration' }, values: ['M5 Pro · CPU 15 cœurs · GPU 16 cœurs · 24 Go · SSD 1 To'] }, specs: [[{ fr: 'Puce', en: 'Chip' }, 'Apple M5 Pro'], [{ fr: 'Processeur', en: 'CPU' }, { fr: '15 cœurs', en: '15-core' }], [{ fr: 'Graphismes', en: 'GPU' }, { fr: '16 cœurs', en: '16-core' }], [{ fr: 'Mémoire', en: 'Memory' }, '24 Go'], [{ fr: 'Stockage', en: 'Storage' }, 'SSD 1 To'], [{ fr: 'Écran', en: 'Display' }, { fr: '14 pouces', en: '14-inch' }], [{ fr: 'Intelligence', en: 'Intelligence' }, { fr: 'Conçu pour Apple Intelligence', en: 'Built for Apple Intelligence' }]] },
  { id: 'serveur-rack', featured: true, image: 'store/serveur-rack.webp', fit: 'studio', icon: 'server', category: 'serveurs', name: { fr: 'Serveur informatique', en: 'Business server' }, detail: { fr: 'Serveur rack ou tour pour héberger vos applications, fichiers et sauvegardes, installé et configuré par MIRS.', en: 'Rack or tower server to host your applications, files and backups, installed and configured by MIRS.' }, option: { label: { fr: 'Format', en: 'Form factor' }, values: ['Rack 1U', 'Rack 2U', 'Tour', 'Baie complète'] }, specs: [[{ fr: 'Processeurs', en: 'Processors' }, { fr: 'Intel Xeon ou AMD EPYC selon configuration', en: 'Intel Xeon or AMD EPYC depending on configuration' }], [{ fr: 'Mémoire', en: 'Memory' }, { fr: 'RAM ECC évolutive', en: 'Scalable ECC RAM' }], [{ fr: 'Disques', en: 'Drives' }, { fr: 'Remplaçables à chaud, RAID', en: 'Hot-swap, RAID' }], [{ fr: 'Mise en service', en: 'Setup' }, { fr: 'Installation en baie, système et sauvegardes', en: 'Rack mounting, OS and backups' }]] },
  { id: 'camera-dome-ip', featured: true, image: 'store/camera-dome-ip.webp', fit: 'studio', icon: 'camera', category: 'securite', name: { fr: 'Caméra de surveillance dôme IP', en: 'IP dome security camera' }, detail: { fr: 'Caméra dôme réseau discrète pour surveiller bureaux, accueils et entrepôts, avec accès à distance.', en: 'Discreet network dome camera for offices, receptions and warehouses, with remote access.' }, option: { label: { fr: 'Usage', en: 'Use' }, values: ['Intérieur', 'Extérieur (antivandale)'] }, specs: [[{ fr: 'Type', en: 'Type' }, { fr: 'Dôme IP', en: 'IP dome' }], [{ fr: 'Alimentation', en: 'Power' }, 'PoE'], [{ fr: 'Enregistrement', en: 'Recording' }, { fr: 'Enregistreur réseau (NVR)', en: 'Network video recorder (NVR)' }], [{ fr: 'Installation', en: 'Installation' }, { fr: 'Pose, câblage et paramétrage', en: 'Mounting, cabling and set-up' }]] },
  { id: 'portable-pro', icon: 'laptop', category: 'postes', name: { fr: 'Ordinateur portable professionnel', en: 'Professional laptop' }, detail: { fr: 'Un portable fiable pour le bureau et le terrain, configuré et prêt à l’emploi.', en: 'A reliable laptop for office and field work, configured and ready to use.' }, option: { label: { fr: 'Configuration', en: 'Configuration' }, values: ['Core i5 · 8 Go · SSD 256 Go', 'Core i5 · 16 Go · SSD 512 Go', 'Core i7 · 16 Go · SSD 512 Go', 'Core i7 · 32 Go · SSD 1 To'] }, specs: [[{ fr: 'Système', en: 'System' }, 'Windows 11 Pro'], [{ fr: 'Écran', en: 'Display' }, '14" à 15,6" Full HD'], [{ fr: 'Mise en service', en: 'Setup' }, { fr: 'Comptes, logiciels et sécurité configurés', en: 'Accounts, software and security configured' }]] },
  { id: 'poste-fixe', icon: 'desktop', category: 'postes', name: { fr: 'Poste de travail fixe', en: 'Desktop workstation' }, detail: { fr: 'Tour ou mini-PC pour les postes administratifs et les usages intensifs.', en: 'Tower or mini-PC for administrative desks and intensive use.' }, option: { label: { fr: 'Format', en: 'Form factor' }, values: ['Mini-PC', 'Tour bureautique', 'Tour performance'] }, specs: [[{ fr: 'Système', en: 'System' }, 'Windows 11 Pro'], [{ fr: 'Stockage', en: 'Storage' }, 'SSD 256 Go à 1 To'], [{ fr: 'Options', en: 'Options' }, { fr: 'Écran, clavier et souris assortis', en: 'Matching screen, keyboard and mouse' }]] },
  { id: 'pc-tout-en-un', icon: 'aio', category: 'postes', name: { fr: 'Ordinateur tout-en-un', en: 'All-in-one computer' }, detail: { fr: 'Écran et unité centrale réunis : idéal pour l’accueil, les guichets et les bureaux partagés.', en: 'Screen and computer in one: ideal for receptions, counters and shared desks.' }, option: { label: { fr: 'Écran', en: 'Screen' }, values: ['24"', '27"'] }, specs: [[{ fr: 'Système', en: 'System' }, 'Windows 11 Pro'], [{ fr: 'Encombrement', en: 'Footprint' }, { fr: 'Un seul câble d’alimentation', en: 'Single power cable' }], [{ fr: 'Options', en: 'Options' }, { fr: 'Webcam et haut-parleurs intégrés', en: 'Built-in webcam and speakers' }]] },
  { id: 'tablette-pro', icon: 'tablet', category: 'postes', name: { fr: 'Tablette professionnelle', en: 'Professional tablet' }, detail: { fr: 'Pour les équipes mobiles, la prise de commande et les présentations clients.', en: 'For mobile teams, order taking and client presentations.' }, option: { label: { fr: 'Taille', en: 'Size' }, values: ['10 à 11"', '12 à 13"'] }, specs: [[{ fr: 'Connectivité', en: 'Connectivity' }, 'Wi-Fi · 4G/5G selon modèle'], [{ fr: 'Accessoires', en: 'Accessories' }, { fr: 'Coque, clavier et stylet en option', en: 'Case, keyboard and stylus as options' }]] },
  { id: 'upgrade-ssd', icon: 'chip', category: 'postes', name: { fr: 'Mise à niveau SSD & mémoire', en: 'SSD & memory upgrade' }, detail: { fr: 'Redonner de la vitesse aux postes existants.', en: 'Give existing workstations a new lease of speed.' }, option: { label: { fr: 'Mise à niveau', en: 'Upgrade' }, values: ['SSD 256 Go', 'SSD 512 Go', 'SSD 1 To', 'Mémoire +8 Go'] }, specs: [[{ fr: 'Inclus', en: 'Included' }, { fr: 'Migration des données', en: 'Data migration' }]] },
  { id: 'ecran', icon: 'monitor', category: 'peripheriques', name: { fr: 'Écran professionnel', en: 'Professional monitor' }, detail: { fr: 'Un affichage confortable pour travailler longtemps sans fatigue.', en: 'Comfortable display for long working sessions.' }, option: { label: { fr: 'Taille', en: 'Size' }, values: ['22"', '24"', '27"'] }, specs: [[{ fr: 'Résolution', en: 'Resolution' }, 'Full HD à QHD'], [{ fr: 'Connectique', en: 'Ports' }, 'HDMI · DisplayPort'], [{ fr: 'Ergonomie', en: 'Ergonomics' }, { fr: 'Pied réglable selon modèle', en: 'Adjustable stand depending on model' }]] },
  { id: 'imprimante', icon: 'printer', category: 'peripheriques', name: { fr: 'Imprimante multifonction', en: 'Multifunction printer' }, detail: { fr: 'Impression, copie et numérisation partagées sur le réseau.', en: 'Network-shared printing, copying and scanning.' }, option: { label: { fr: 'Type', en: 'Type' }, values: ['Laser monochrome', 'Laser couleur', 'Jet d’encre à réservoirs'] }, specs: [[{ fr: 'Fonctions', en: 'Functions' }, { fr: 'Impression · copie · scan', en: 'Print · copy · scan' }], [{ fr: 'Connexion', en: 'Connection' }, 'USB · Ethernet · Wi-Fi'], [{ fr: 'Installation', en: 'Installation' }, { fr: 'Partage sur tous les postes', en: 'Shared to every workstation' }]] },
  { id: 'scanner', icon: 'scanner', category: 'peripheriques', name: { fr: 'Scanner de documents', en: 'Document scanner' }, detail: { fr: 'Numériser rapidement factures, dossiers et pièces d’identité, recto verso.', en: 'Quickly scan invoices, files and IDs, double-sided.' }, option: { label: { fr: 'Type', en: 'Type' }, values: ['À plat', 'Chargeur automatique', 'Portable'] }, specs: [[{ fr: 'Sortie', en: 'Output' }, 'PDF · PDF searchable · JPEG'], [{ fr: 'Usage', en: 'Use' }, { fr: 'Archivage et dématérialisation', en: 'Archiving and paperless workflows' }]] },
  { id: 'videoprojecteur', icon: 'projector', category: 'peripheriques', name: { fr: 'Vidéoprojecteur', en: 'Video projector' }, detail: { fr: 'Pour les salles de réunion, de formation et les événements.', en: 'For meeting rooms, training rooms and events.' }, option: { label: { fr: 'Usage', en: 'Use' }, values: ['Salle de réunion', 'Salle de formation', 'Courte focale'] }, specs: [[{ fr: 'Connectique', en: 'Ports' }, 'HDMI · sans fil selon modèle'], [{ fr: 'Installation', en: 'Installation' }, { fr: 'Fixation plafond et écran en option', en: 'Ceiling mount and screen as options' }]] },
  { id: 'station-accueil', icon: 'dock', category: 'peripheriques', name: { fr: 'Station d’accueil USB-C', en: 'USB-C docking station' }, detail: { fr: 'Un seul câble pour brancher écrans, réseau, clavier et charge.', en: 'One cable to connect screens, network, keyboard and charging.' }, option: { label: { fr: 'Écrans', en: 'Displays' }, values: ['1 écran', '2 écrans', '3 écrans'] }, specs: [[{ fr: 'Ports', en: 'Ports' }, 'HDMI · DisplayPort · USB · Ethernet'], [{ fr: 'Charge', en: 'Charging' }, 'USB-C Power Delivery']] },
  { id: 'kit-clavier', icon: 'keyboard', category: 'peripheriques', name: { fr: 'Kit clavier & souris', en: 'Keyboard & mouse kit' }, detail: { fr: 'Des accessoires robustes pour équiper rapidement une équipe.', en: 'Robust accessories to equip a team quickly.' }, option: { label: { fr: 'Connexion', en: 'Connection' }, values: ['Filaire', 'Sans fil'] }, specs: [[{ fr: 'Disposition', en: 'Layout' }, 'AZERTY'], [{ fr: 'Usage', en: 'Use' }, { fr: 'Bureau, accueil, formation', en: 'Office, reception, training' }]] },
  { id: 'casque-micro', icon: 'headset', category: 'peripheriques', name: { fr: 'Casque micro professionnel', en: 'Professional headset' }, detail: { fr: 'Pour les appels, la visioconférence et les centres de contact.', en: 'For calls, video conferencing and contact centres.' }, option: { label: { fr: 'Modèle', en: 'Model' }, values: ['Mono filaire', 'Stéréo filaire', 'Sans fil Bluetooth'] }, specs: [[{ fr: 'Micro', en: 'Microphone' }, { fr: 'Réduction de bruit', en: 'Noise cancelling' }], [{ fr: 'Compatibilité', en: 'Compatibility' }, 'Teams · Zoom · Meet']] },
  { id: 'kit-visio', icon: 'webcam', category: 'peripheriques', name: { fr: 'Kit de visioconférence', en: 'Video conferencing kit' }, detail: { fr: 'Caméra, micro et haut-parleur pour des réunions à distance claires.', en: 'Camera, microphone and speaker for clear remote meetings.' }, option: { label: { fr: 'Salle', en: 'Room' }, values: ['Bureau individuel', 'Petite salle', 'Grande salle'] }, specs: [[{ fr: 'Vidéo', en: 'Video' }, 'Full HD à 4K'], [{ fr: 'Installation', en: 'Installation' }, { fr: 'Configuration de la salle incluse', en: 'Room set-up included' }]] },
  { id: 'wifi-pro', icon: 'router', category: 'reseau', name: { fr: 'Routeur & Wi-Fi professionnel', en: 'Router & professional Wi-Fi' }, detail: { fr: 'Une couverture stable et sécurisée pour toute l’organisation.', en: 'Stable, secure coverage across the organization.' }, option: { label: { fr: 'Surface', en: 'Area' }, values: ['Petit bureau', 'Étage complet', 'Multi-sites'] }, specs: [[{ fr: 'Norme', en: 'Standard' }, 'Wi-Fi 6'], [{ fr: 'Sécurité', en: 'Security' }, { fr: 'Réseau invités séparé', en: 'Separate guest network' }], [{ fr: 'Étude', en: 'Survey' }, { fr: 'Repérage de couverture inclus', en: 'Coverage survey included' }]] },
  { id: 'switch', icon: 'switch', category: 'reseau', name: { fr: 'Switch réseau administrable', en: 'Managed network switch' }, detail: { fr: 'Le cœur du réseau filaire, segmenté et supervisé.', en: 'The core of the wired network, segmented and monitored.' }, option: { label: { fr: 'Ports', en: 'Ports' }, values: ['8 ports', '24 ports', '48 ports', '24 ports PoE'] }, specs: [[{ fr: 'Débit', en: 'Speed' }, 'Gigabit'], [{ fr: 'Fonctions', en: 'Features' }, 'VLAN · QoS'], [{ fr: 'Montage', en: 'Mounting' }, { fr: 'Bureau ou baie 19"', en: 'Desk or 19" rack' }]] },
  { id: 'armoire-reseau', icon: 'rack', category: 'reseau', name: { fr: 'Armoire réseau 19"', en: '19" network cabinet' }, detail: { fr: 'Ranger et protéger switchs, serveurs et brassage dans une baie ventilée.', en: 'House and protect switches, servers and patching in a ventilated cabinet.' }, option: { label: { fr: 'Hauteur', en: 'Height' }, values: ['Murale 9U', 'Murale 12U', 'Sur pied 22U', 'Sur pied 42U'] }, specs: [[{ fr: 'Équipement', en: 'Fittings' }, { fr: 'Porte vitrée, ventilation, multiprise', en: 'Glass door, ventilation, power strip' }], [{ fr: 'Installation', en: 'Installation' }, { fr: 'Pose et rangement du câblage', en: 'Mounting and cable management' }]] },
  { id: 'cablage', icon: 'cable', category: 'reseau', name: { fr: 'Câblage & baie de brassage', en: 'Cabling & patch rack' }, detail: { fr: 'Un câblage propre, étiqueté et documenté.', en: 'Clean, labelled and documented cabling.' }, option: { label: { fr: 'Projet', en: 'Project' }, values: ['Jusqu’à 10 prises', '10 à 30 prises', 'Plus de 30 prises'] }, specs: [[{ fr: 'Catégorie', en: 'Category' }, 'Cat 6'], [{ fr: 'Livrable', en: 'Deliverable' }, { fr: 'Plan et étiquetage', en: 'Plan and labelling' }]] },
  { id: 'nas', icon: 'server', category: 'serveurs', name: { fr: 'Stockage réseau NAS & sauvegarde', en: 'NAS storage & backup' }, detail: { fr: 'Centraliser les fichiers et sauvegarder automatiquement.', en: 'Centralize files and back them up automatically.' }, option: { label: { fr: 'Capacité', en: 'Capacity' }, values: ['2 To', '4 To', '8 To', '16 To'] }, specs: [[{ fr: 'Protection', en: 'Protection' }, 'RAID'], [{ fr: 'Sauvegarde', en: 'Backup' }, { fr: 'Planifiée et testée', en: 'Scheduled and tested' }]] },
  { id: 'disque-externe', icon: 'drive', category: 'serveurs', name: { fr: 'Disque dur externe', en: 'External hard drive' }, detail: { fr: 'Sauvegarder et transporter les données en toute sécurité.', en: 'Back up and carry data safely.' }, option: { label: { fr: 'Capacité', en: 'Capacity' }, values: ['1 To', '2 To', '4 To', 'SSD 1 To'] }, specs: [[{ fr: 'Connexion', en: 'Connection' }, 'USB 3 · USB-C'], [{ fr: 'Option', en: 'Option' }, { fr: 'Chiffrement matériel', en: 'Hardware encryption' }]] },
  { id: 'videosurveillance', icon: 'camera', category: 'securite', name: { fr: 'Kit vidéosurveillance IP', en: 'IP video surveillance kit' }, detail: { fr: 'Caméras, enregistreur et accès à distance sécurisé.', en: 'Cameras, recorder and secure remote access.' }, option: { label: { fr: 'Caméras', en: 'Cameras' }, values: ['4 caméras', '8 caméras', '16 caméras'] }, specs: [[{ fr: 'Résolution', en: 'Resolution' }, '1080p à 4K'], [{ fr: 'Vision', en: 'Vision' }, { fr: 'Nocturne infrarouge', en: 'Infrared night vision' }], [{ fr: 'Accès', en: 'Access' }, { fr: 'Application mobile', en: 'Mobile app' }]] },
  { id: 'pare-feu', icon: 'firewall', category: 'securite', name: { fr: 'Pare-feu réseau', en: 'Network firewall' }, detail: { fr: 'Filtrer le trafic, sécuriser l’accès internet et relier les sites distants.', en: 'Filter traffic, secure internet access and connect remote sites.' }, option: { label: { fr: 'Taille', en: 'Size' }, values: ['Jusqu’à 25 utilisateurs', 'Jusqu’à 100 utilisateurs', 'Multi-sites'] }, specs: [[{ fr: 'Fonctions', en: 'Features' }, 'Filtrage · VPN · contrôle web'], [{ fr: 'Suivi', en: 'Follow-up' }, { fr: 'Mises à jour et règles gérées', en: 'Managed updates and rules' }]] },
  { id: 'antivirus', icon: 'shield', category: 'securite', name: { fr: 'Protection antivirus des postes', en: 'Endpoint antivirus protection' }, detail: { fr: 'Licences installées, configurées et suivies par MIRS.', en: 'Licences installed, configured and monitored by MIRS.' }, option: { label: { fr: 'Nombre de postes', en: 'Endpoints' }, values: ['1 à 5 postes', '6 à 25 postes', '26 à 100 postes'] }, specs: [[{ fr: 'Durée', en: 'Term' }, { fr: 'Abonnement annuel', en: 'Annual subscription' }], [{ fr: 'Console', en: 'Console' }, { fr: 'Gestion centralisée selon offre', en: 'Central management depending on plan' }]] },
  { id: 'onduleur', icon: 'battery', category: 'energie', name: { fr: 'Onduleur (UPS)', en: 'Uninterruptible power supply (UPS)' }, detail: { fr: 'Protéger les équipements des coupures et variations de tension.', en: 'Protect equipment from outages and voltage swings.' }, option: { label: { fr: 'Puissance', en: 'Capacity' }, values: ['650 VA', '1 500 VA', '3 kVA'] }, specs: [[{ fr: 'Technologie', en: 'Technology' }, 'Line-interactive · On-line'], [{ fr: 'Usage', en: 'Use' }, { fr: 'Postes, serveurs, réseau', en: 'Workstations, servers, network' }]] },
  { id: 'installation', icon: 'tools', category: 'services', name: { fr: 'Installation & configuration sur site', en: 'On-site installation & setup' }, detail: { fr: 'Un technicien MIRS installe et configure vos équipements.', en: 'A MIRS technician installs and configures your equipment.' }, option: { label: { fr: 'Volume', en: 'Volume' }, values: ['1 à 5 équipements', '6 à 20 équipements', 'Projet complet'] }, specs: [[{ fr: 'Lieu', en: 'Location' }, 'Conakry'], [{ fr: 'Livrable', en: 'Deliverable' }, { fr: 'Fiche de configuration', en: 'Configuration sheet' }]] },
];

/* Print store — quote-based catalogue (same structure as the IT store). */
const PRINT_RUNS = { label: { fr: 'Tirage', en: 'Print run' }, values: ['100 ex.', '250 ex.', '500 ex.', '1 000 ex.', '2 500 ex.'] };
const TEXTILE_RUNS = { label: { fr: 'Série', en: 'Batch' }, values: ['10 pièces', '25 pièces', '50 pièces', '100 pièces', '250 pièces'] };

export const printCategories = [
  { key: 'textile', label: { fr: 'Textile', en: 'Textile' } },
  { key: 'objets', label: { fr: 'Objets publicitaires', en: 'Promotional items' } },
  { key: 'imprimes', label: { fr: 'Imprimés', en: 'Printed matter' } },
  { key: 'grand-format', label: { fr: 'Grand format', en: 'Large format' } },
  { key: 'packaging', label: { fr: 'Packaging & papeterie', en: 'Packaging & stationery' } },
];

export const printProducts = [
  { id: 'polo-personnalise', featured: true, image: 'mirs-media/nimba-polo-transparent.png', fit: 'contain', icon: 'flyer', category: 'textile', name: { fr: 'Polo personnalisé', en: 'Custom polo shirt' }, detail: { fr: 'Polos brodés ou imprimés aux couleurs de votre marque, produits par notre atelier.', en: 'Polo shirts embroidered or printed in your brand colours, made by our workshop.' }, option: TEXTILE_RUNS, specs: [[{ fr: 'Marquage', en: 'Branding' }, { fr: 'Broderie ou impression, front et dos', en: 'Embroidery or print, front and back' }], [{ fr: 'Tailles', en: 'Sizes' }, 'S à XXL'], [{ fr: 'BAT', en: 'Proof' }, { fr: 'Validation avant production', en: 'Approved before production' }]] },
  { id: 'casquette-personnalisee', featured: true, image: 'mirs-media/sonapi-cap-transparent.png', fit: 'contain', icon: 'flyer', category: 'textile', name: { fr: 'Casquette personnalisée', en: 'Custom cap' }, detail: { fr: 'Une série personnalisée pour vos équipes et événements.', en: 'A personalized series for teams and events.' }, option: TEXTILE_RUNS, specs: [[{ fr: 'Marquage', en: 'Branding' }, { fr: 'Broderie de marque', en: 'Brand embroidery' }], [{ fr: 'Réglage', en: 'Fit' }, { fr: 'Fermeture ajustable', en: 'Adjustable strap' }]] },
  { id: 't-shirt', image: 'catalogue/tshirt.png', fit: 'cover', icon: 'flyer', category: 'textile', name: { fr: 'T-shirt personnalisé', en: 'Custom T-shirt' }, detail: { fr: 'T-shirts imprimés pour événements, campagnes et équipes terrain.', en: 'Printed T-shirts for events, campaigns and field teams.' }, option: TEXTILE_RUNS, specs: [[{ fr: 'Impression', en: 'Print' }, { fr: 'Sérigraphie ou transfert', en: 'Screen print or transfer' }], [{ fr: 'Coloris', en: 'Colours' }, { fr: 'Au choix selon stock', en: 'Selection depending on stock' }]] },
  { id: 'tote-bag', image: 'catalogue/tote-bag.png', fit: 'cover', icon: 'flyer', category: 'objets', name: { fr: 'Tote bag', en: 'Tote bag' }, detail: { fr: 'Support utile, personnalisable et durable.', en: 'A useful, customizable and durable medium.' }, option: TEXTILE_RUNS, specs: [[{ fr: 'Matière', en: 'Material' }, { fr: 'Coton ou toile', en: 'Cotton or canvas' }], [{ fr: 'Marquage', en: 'Branding' }, { fr: 'Une ou deux faces', en: 'One or two sides' }]] },
  { id: 'mug-personnalise', image: 'catalogue/mug.png', fit: 'cover', icon: 'flyer', category: 'objets', name: { fr: 'Mug personnalisé', en: 'Custom mug' }, detail: { fr: 'Des mugs à votre image pour les bureaux, cadeaux et événements.', en: 'Branded mugs for offices, gifts and events.' }, option: { label: { fr: 'Série', en: 'Batch' }, values: ['12 pièces', '24 pièces', '50 pièces', '100 pièces'] }, specs: [[{ fr: 'Impression', en: 'Print' }, { fr: 'Sublimation couleur', en: 'Full-colour sublimation' }], [{ fr: 'Contenance', en: 'Capacity' }, '330 ml']] },
  { id: 'autocollants', icon: 'sticker', category: 'objets', name: { fr: 'Autocollants & étiquettes', en: 'Stickers & labels' }, detail: { fr: 'Stickers, étiquettes produits et adhésifs découpés à la forme.', en: 'Stickers, product labels and die-cut adhesives.' }, option: PRINT_RUNS, specs: [[{ fr: 'Découpe', en: 'Cut' }, { fr: 'Ronde, carrée ou à la forme', en: 'Round, square or custom shape' }], [{ fr: 'Finition', en: 'Finish' }, { fr: 'Brillante ou mate', en: 'Gloss or matte' }]] },
  { id: 'cartes-de-visite', icon: 'card', category: 'imprimes', name: { fr: 'Cartes de visite', en: 'Business cards' }, detail: { fr: 'La première impression de votre marque, sur papier épais et finitions soignées.', en: 'Your brand’s first impression, on thick paper with careful finishes.' }, option: PRINT_RUNS, specs: [[{ fr: 'Format', en: 'Size' }, '85 × 55 mm'], [{ fr: 'Papier', en: 'Paper' }, '350 g'], [{ fr: 'Finitions', en: 'Finishes' }, { fr: 'Pelliculage mat ou brillant', en: 'Matte or gloss lamination' }]] },
  { id: 'flyers', icon: 'flyer', category: 'imprimes', name: { fr: 'Flyers', en: 'Flyers' }, detail: { fr: 'Pour annoncer une offre, un lancement ou un événement.', en: 'To announce an offer, a launch or an event.' }, option: { label: { fr: 'Format', en: 'Size' }, values: ['A6', 'A5', 'A4', 'DL'] }, specs: [[{ fr: 'Impression', en: 'Print' }, { fr: 'Recto ou recto verso', en: 'Single or double-sided' }], [{ fr: 'Papier', en: 'Paper' }, '135 à 170 g']] },
  { id: 'brochures', icon: 'brochure', category: 'imprimes', name: { fr: 'Brochures & dépliants', en: 'Brochures & leaflets' }, detail: { fr: 'Présenter votre offre en détail : catalogue, plaquette ou dépliant.', en: 'Present your offer in detail: catalogue, presentation or leaflet.' }, option: { label: { fr: 'Type', en: 'Type' }, values: ['Dépliant 3 volets', 'Plaquette 4 pages', 'Brochure 8 à 32 pages'] }, specs: [[{ fr: 'Reliure', en: 'Binding' }, { fr: 'Pliage ou piqûre', en: 'Folded or stapled' }], [{ fr: 'Conception', en: 'Design' }, { fr: 'Mise en page possible', en: 'Layout available' }]] },
  { id: 'calendriers', icon: 'calendar', category: 'imprimes', name: { fr: 'Calendriers', en: 'Calendars' }, detail: { fr: 'Calendriers muraux ou de bureau, présents toute l’année chez vos clients.', en: 'Wall or desk calendars, present all year at your clients’ offices.' }, option: { label: { fr: 'Modèle', en: 'Model' }, values: ['Mural', 'De bureau', 'Bancaire'] }, specs: [[{ fr: 'Personnalisation', en: 'Customization' }, { fr: 'Photos et identité de marque', en: 'Photos and brand identity' }]] },
  { id: 'roll-up', icon: 'rollup', category: 'grand-format', name: { fr: 'Roll-up', en: 'Roll-up banner' }, detail: { fr: 'Une présence visible en salon, à l’accueil et en événement, montée en une minute.', en: 'A visible presence at fairs, receptions and events, set up in a minute.' }, option: { label: { fr: 'Format', en: 'Size' }, values: ['80 × 200 cm', '85 × 200 cm', '100 × 200 cm'] }, specs: [[{ fr: 'Inclus', en: 'Included' }, { fr: 'Structure et housse de transport', en: 'Stand and carry bag' }]] },
  { id: 'bache-banderole', icon: 'banner', category: 'grand-format', name: { fr: 'Bâche & banderole', en: 'Banner & tarpaulin' }, detail: { fr: 'Grand format extérieur pour façades, chantiers et événements.', en: 'Outdoor large format for façades, sites and events.' }, option: { label: { fr: 'Surface', en: 'Area' }, values: ['Jusqu’à 2 m²', '2 à 6 m²', 'Plus de 6 m²'] }, specs: [[{ fr: 'Finition', en: 'Finish' }, { fr: 'Œillets et ourlets', en: 'Eyelets and hems' }], [{ fr: 'Usage', en: 'Use' }, { fr: 'Intérieur et extérieur', en: 'Indoor and outdoor' }]] },
  { id: 'signaletique', image: 'editorial/impression-grand-format.jpg', fit: 'cover', icon: 'banner', category: 'grand-format', name: { fr: 'Signalétique', en: 'Signage' }, detail: { fr: 'Grand format, habillage et visibilité.', en: 'Large format, wayfinding and visibility.' }, option: { label: { fr: 'Projet', en: 'Project' }, values: ['Panneau', 'Habillage vitrine', 'Signalétique complète'] }, specs: [[{ fr: 'Supports', en: 'Media' }, { fr: 'Dibond, PVC, vinyle, plexiglas', en: 'Dibond, PVC, vinyl, acrylic' }], [{ fr: 'Pose', en: 'Fitting' }, { fr: 'Installation sur site possible', en: 'On-site installation available' }]] },
  { id: 'packaging', image: 'catalogue/packaging-orange.png', fit: 'cover', icon: 'brochure', category: 'packaging', name: { fr: 'Packaging', en: 'Packaging' }, detail: { fr: 'Une présence qui commence avant l’ouverture.', en: 'A brand experience that begins before opening.' }, option: PRINT_RUNS, specs: [[{ fr: 'Formats', en: 'Formats' }, { fr: 'Boîtes, étuis, sachets', en: 'Boxes, sleeves, bags' }], [{ fr: 'BAT', en: 'Proof' }, { fr: 'Maquette validée avant production', en: 'Mock-up approved before production' }]] },
  { id: 'papeterie', icon: 'letterhead', category: 'packaging', name: { fr: 'Papier en-tête & enveloppes', en: 'Letterhead & envelopes' }, detail: { fr: 'Une correspondance professionnelle cohérente avec votre identité.', en: 'Professional correspondence consistent with your identity.' }, option: PRINT_RUNS, specs: [[{ fr: 'Formats', en: 'Formats' }, 'A4 · DL · C5 · C4'], [{ fr: 'Papier', en: 'Paper' }, '90 à 120 g']] },
];
