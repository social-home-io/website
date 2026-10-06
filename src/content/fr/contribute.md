---
title: Contribuer
description: Que vous écriviez du code, traduisiez des textes, fassiez du design ou parliez simplement de Social Home à d'autres foyers — voici comment aider.
order: 95
---

Social Home est un petit projet porté par quelques bénévoles.
Chaque coup de pouce compte. Il n'y a aucun accord de licence de
contribution à signer, aucune entité commerciale derrière, et
personne qui cherche à transformer les contributions en futur
abonnement payant.

## Si vous écrivez du code

Les dépôts sont petits et bien documentés :

- **Serveur principal** —
  [`social-home-io/socialhome`](https://github.com/social-home-io/socialhome).
  Python 3.14, aiohttp, SQLite, frontend Preact.
- **Intégration HA** —
  [`social-home-io/ha-integration`](https://github.com/social-home-io/ha-integration).
  Intégration personnalisée ; tests via
  `pytest-homeassistant-custom-component`.
- **Bibliothèque cliente** —
  [`social-home-io/socialhome-client`](https://github.com/social-home-io/socialhome-client).
  Client HTTP/WS purement asynchrone, sans dépendance à HA.
- **Module complémentaire HA** —
  [`social-home-io/ha-app`](https://github.com/social-home-io/ha-app).
  Deux canaux (stable + Early), bashio + tempio.
- **Site web** — ce dépôt, sur
  [`social-home-io/website`](https://github.com/social-home-io/website).

Lisez les fichiers `CLAUDE.md` / `AGENTS.md` à la racine de chaque
dépôt avant d'ouvrir une PR — ils expliquent les conventions
(CalVer, MPL 2.0, pas d'imports en ligne, etc.) qui gardent la base
de code cohérente.

## Si vous traduisez

Les textes non anglais de ce site et des apps sont censés être
générés automatiquement par Azure Translator à chaque exécution de
la CI — le script de traduction est prévu, mais pas encore dans le
dépôt. Dans tous les cas, le résultat ne sera pas parfait : si vous
lisez une langue nativement et qu'une formulation sonne faux,
ouvrez une PR sur la source **anglaise**. Nous n'acceptons pas les
modifications manuelles des fichiers traduits, car la prochaine
exécution de la CI les écraserait.

Si vous souhaitez prendre en charge une langue (relire + ajuster
la source pour qu'elle se traduise mieux), ouvrez une issue avec
l'étiquette `i18n` et nous vous ajouterons comme mainteneur pour
cette langue.

## Si vous faites du design

Tout ce qui est visuel — illustrations, affinements du logo, jeux
d'illustrations, gabarits de cartes pour les réseaux sociaux,
l'image OG — vaut de l'or. Ouvrez une PR brouillon avec le fichier
(SVG de préférence, sous licence MPL 2.0) et nous itérerons à
partir de là.

## Si vous gérez un foyer

La chose la plus utile que vous puissiez faire, c'est **l'installer
et nous dire ce qui vous a semblé confus**. Les 100 premiers foyers
qui essaient Social Home façonnent l'année de travail à venir bien
plus qu'une réécriture de la spécification.

## Ce dont le projet n'a _pas_ besoin

- **D'argent.** Pas de lien de don, pas de Patreon, pas d'Open
  Collective — le projet est porté par des gens qui l'utilisent,
  pas par une entreprise qui doit se nourrir. Si les coûts
  d'hébergement devenaient un jour un vrai problème, nous le
  dirions haut et fort d'abord.
- **D'issues « Pouvez-vous ajouter X ? »** sans description du
  problème que vous résolvez. Un cas d'usage vaut mieux qu'une
  demande de fonctionnalité.
- **De promesses de contribution.** Une pull request qui
  fonctionne, même petite, vaut plus qu'une feuille de route.

## Pour finir

Social Home est fait pour les gens qui pensent que leurs photos de
famille, leurs messages et leur calendrier ne devraient pas être
le produit de quelqu'un d'autre. Si cela vous parle, vous en faites
déjà partie.
