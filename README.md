# MIRS Spatial Systems

La version statique et immersive du site MIRS SARL : informatique, imprimerie,
formation, réalisations et demande de devis.

## Déploiement

Le répertoire de publication est `dist/`. Il contient une règle Netlify dans
`_redirects` afin que les parcours de la mini-application restent accessibles
directement.

## Principes de cette version

- Navigation centrée sur trois actions : équiper, produire et apprendre.
- Les deux films MIRS sont ouverts à la demande, sans téléchargement vidéo au
  chargement de la page.
- Les scènes d'ordinateur et d'imprimante sont dessinées en CSS et progressent
  avec le défilement, sans dépendance 3D lourde.
- Le mode clair/sombre, le panier de demande et les références clients sont
  disponibles sur tout le site.

Pour une prévisualisation locale :

```sh
python3 -m http.server 4174 --directory dist
```
