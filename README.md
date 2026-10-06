# MIRS — composition unifiée

Site multipage statique en français : accueil, informatique, imprimerie, Academy,
réalisations, deux boutiques, contact et demande de devis.

## Direction

Une identité marine, bleu électrique et vert lumineux. L’accueil articule un grand
manifeste typographique et une photographie de collaboration, puis trois chapitres
métiers. L’informatique privilégie l’équipement, l’imprimerie la matière et la couleur,
l’Academy l’apprentissage collectif. Les images et références proviennent du dépôt
MIRS existant ; aucun témoignage, prix ou résultat client n’a été ajouté.

Références examinées :

| Référence | Adaptation dans MIRS |
| --- | --- |
| Ecoriz | Navigation flottante et présentation photographique immersive |
| TBD Studio | Hiérarchie éditoriale, numérotation et séparation nette des chapitres |
| Aeline | Continuité entre pages et présentation progressive des expertises |
| Upmind | Photographies dominantes et association du récit aux métiers |
| Learnico | Organisation lisible des modules Academy |
| Flite | Présentation du produit et découverte des détails par étapes |

Il s’agit d’une interprétation originale des interfaces publiques. Le code source
privé des références n’est pas disponible ; aucun de leurs médias ou composants
propriétaires n’a été copié.

## Refonte « MIRS Nova » (octobre 2026)

Refonte futuriste de toute l’interface publique, en gardant l’essence MIRS : bleu
électrique `#0000FE`, cyan `#00CCFF` et blanc, le logo aux deux mains, les cinq univers,
les 81 références réelles, les films, l’Academy, les boutiques et le brief WhatsApp.
Tous les styles (site et administration) vivent dans `dist/mirs-nova.css`.

Inspirations (Ecoriz, TBD Studio, Startify), réinterprétées sans copier de code ni de média :

| Référence | Adaptation dans MIRS Nova |
| --- | --- |
| Ecoriz | Navigation flottante en pilule de verre, grand média arrondi qui s’ouvre au défilement, chiffres clés |
| TBD Studio | Titres révélés mot à mot, liste de services avec image qui suit le curseur, cartes de méthode empilées, grand logotype en pied de page |
| Startify | Badge « système actif », grille de fond masquée, halos lumineux, bento des univers avec bordure lumineuse au survol |

Effets : préchargeur (une fois par session), rideau entre les pages, champ de particules
réactif au curseur, aurores animées, curseur annulaire avec libellés, boutons magnétiques,
texte qui s’allume au défilement, compteurs, texte « scramble » au survol, films en défilement
horizontal épinglé avec aperçu au survol, rubans inclinés selon la vitesse de défilement,
cartes 3D, radar, orbite des formations, carte de Conakry avec horloge GMT, 404 « glitch ».
Tout est désactivé ou simplifié avec `prefers-reduced-motion` ; le curseur personnalisé
n’apparaît qu’avec une souris. Posters des films : `dist/assets/mirs-media/posters/`.

## Version 2 — e-learning, e-commerce, AMADEUS, maintenance (octobre 2026)

- **AMADEUS** : MIRS mis en avant comme représentant exclusif (bandeau d’accueil, lien
  « AMADEUS · Exclusif » dans la navigation, page `/amadeus`, mentions Academy et pied de page).
- **MIRS Academy** (`/formation`) : catalogue e-learning filtrable, calendrier des sessions,
  pages programme `/formation/<parcours>` avec modules et leçons détaillés, et inscription
  à une session dans une fenêtre dédiée, transmise sur WhatsApp. Les dates sont **indicatives**
  et confirmées par MIRS à l’inscription.
- **Boutique informatique** (`/informatique/boutique`) : catalogue avec recherche et filtres,
  fiches produit `/informatique/boutique/<produit>` (options, quantité), panier avec quantités
  et checkout `/checkout` (coordonnées, mode de remise, confirmation avec référence).
  Les prix sont **sur devis** : aucun montant publié, aucun paiement en ligne.
- **Maintenance** (`/maintenance`) : bouton d’intervention d’urgence (alerte prioritaire
  sur WhatsApp + appel direct), liste de premiers réflexes, demande d’intervention et
  configurateur de contrat de maintenance.
- **Références** : mur de logos en grille, chaque logo entier et lisible.
- **Administration** (`/admin`) refaite : dashboard, urgences, commandes, inscriptions,
  toutes les demandes (filtres, recherche, export CSV), formations et sessions (ajout de
  sessions, publication), catalogue (visibilité des produits), contenus, médias, paramètres.

Données modifiables : `dist/mirs-data.js` (parcours, modules, sessions, produits).
Les demandes sont enregistrées dans le navigateur qui les envoie et transmises à MIRS sur
WhatsApp ; l’admin les voit donc sur le même appareil. Un vrai partage entre appareils
nécessitera une base de données.

## Mouvement et accessibilité

Entrées de page, révélations au défilement, profondeur légère des photographies,
progression des chapitres et rubans de références. Les effets de profondeur sont
retirés sur petit écran ; le réglage `prefers-reduced-motion` désactive les animations.
Navigation au clavier, lien d’accès au contenu, menu mobile, boutons et formulaires
avec libellés accessibles. Polices et styles partagés dans toutes les pages.

## Demandes

Le panier conserve une sélection locale. Les formulaires préparent un lien WhatsApp
avec les coordonnées saisies et la sélection. Le visiteur ouvre ensuite WhatsApp,
vérifie le message et choisit de l’envoyer. Aucun succès d’envoi n’est simulé et aucun
paiement n’est effectué. Les deux films restent chargés à la demande.

## Publication

Le dossier publié est `dist/`. Le workflow GitHub Pages reconstruit les films depuis
leurs fragments puis publie les fichiers. Le chemin de base GitHub Pages et les
liens profonds sont pris en charge par `index.html` et `404.html`.

Pour une prévisualisation statique :

```sh
python3 -m http.server 4174 --directory dist
```

Sur un serveur local sans réécriture, ouvrir l’accueil puis utiliser la navigation.
