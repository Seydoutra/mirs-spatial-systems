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
