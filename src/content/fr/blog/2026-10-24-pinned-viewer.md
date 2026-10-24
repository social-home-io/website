---
title: "Des liens de partage que le GFS ne peut pas ouvrir"
description: Les liens publics de highlights, les liens de partage de moments, la page d'un espace global, les liens d'invitation et les profils Momentum s'ouvrent désormais dans la visionneuse Social Home, une page qu'aucun GFS ne sert. Les personnes qui gèrent un GFS ne peuvent ni lire ce que vous partagez, ni modifier la page que voient vos proches. Depuis Social Home 2026.10.22.
date: 2026-10-24
author: L'équipe Social Home
order: 50
---

La plupart de ce que vous faites dans Social Home reste entre foyers :
scellé chez vous, ouvert chez eux. Mais parfois, vous voulez joindre
quelqu'un qui n'est pas du tout sur Social Home. Peut-être grand-père,
qui ne lit que ses e-mails, ou l'amie rencontrée en vacances, ou les
parents de l'école que vous voulez inviter dans l'espace de la
classe. Ils ouvrent votre lien dans un navigateur ordinaire.

Jusqu'ici, cette page venait du
[GFS (Global Federation Server)](/fr/docs/glossary/#gfs), le relais qui
aide les foyers à se trouver. Depuis **Social Home 2026.10.22**, elle
vient de la **visionneuse Social Home** sur `viewer.social-home.io`,
une page qu'aucun GFS ne sert. Ce seul changement signifie que les
personnes qui gèrent un GFS ne peuvent pas lire ce que vous partagez,
ni modifier la page que voient vos proches.

## La serrure et le serrurier

Un lien public de highlight est scellé de votre maison jusqu'au
navigateur de vos proches. La clé qui l'ouvre se trouve dans la partie
du lien après le `#`. Les navigateurs n'envoient jamais cette partie à
un serveur : le GFS qui aide à établir le lien ne la voit donc jamais.

Mais une clé ne protège que si vous faites confiance aux mains qui la
tiennent. La page qui ouvre le highlight est le code qui lit la clé.
Si le GFS servait cette page, il pourrait aussi servir une page
légèrement différente qui copie la clé, sans que personne ne s'en
aperçoive. Le chiffrement ne vaut que ce que vaut la page qui ouvre.

La page vient donc maintenant d'ailleurs. Votre foyer crée des liens
qui pointent vers la visionneuse, et la visionneuse ne parle au GFS
que pour établir la connexion. Le GFS présente toujours votre maison
et le navigateur de vos proches l'un à l'autre, et il fait toujours
passer des octets scellés quand une connexion directe est impossible.
Il n'exécute jamais le code qui tient la clé.

| Qui                           | Ce qu'il obtient                                                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Qui gère le GFS               | qu'un lien a été ouvert, depuis quelle adresse et quand, plus des octets scellés. Jamais la clé, jamais la page elle-même |
| L'hébergeur de la visionneuse | que quelqu'un a chargé la visionneuse. Pas quel lien, pas quel GFS, pas ce qu'il contenait                                |
| Qui a le lien                 | ce seul highlight ou moment, jusqu'à sa fin (un lien de highlight s'arrête aussi dès que vous le supprimez)               |
| Qui ne l'a pas                | rien                                                                                                                      |

## Chaque version figée

La visionneuse est un petit ensemble de fichiers statiques. Son rôle
est d'être ennuyeuse et facile à vérifier :

- **Chaque version a sa propre adresse.** Un lien désigne la version
  exacte de la visionneuse pour laquelle il a été créé. Les fichiers
  derrière cette adresse ne changent jamais : un lien créé aujourd'hui
  ouvrira la même page l'an prochain.
- **Le script est verrouillé par son empreinte.** La page indique au
  navigateur exactement quel script exécuter. Si un seul octet diffère,
  le navigateur refuse de l'exécuter.
- **Construite deux fois, par deux dépôts différents.** La version de
  Social Home construit la visionneuse et enregistre son empreinte. Le
  dépôt séparé
  [`social-home-io/viewer`](https://github.com/social-home-io/viewer)
  la reconstruit à partir de la même version et ne la publie que si les
  deux constructions sont identiques.
- **Les versions ne sont qu'ajoutées.** Les anciennes versions ne sont
  jamais réécrites ni supprimées : chaque lien créé par une version
  précédente continue de s'ouvrir.
- **Tout le monde peut vérifier.** Récupérez les fichiers, comparez leur
  empreinte à celle de la version, reconstruisez depuis le tag. Vous
  n'avez pas à nous croire sur parole.

## Une seule visionneuse pour tout l'extérieur

Les highlights n'étaient que le début. Tout ce qu'un inconnu ouvre
depuis un GFS s'ouvre désormais dans la même visionneuse :

- **Liens publics de highlights.** Dans la visionneuse de highlight,
  touchez **Créer un lien public**, choisissez un GFS et partagez le
  lien. La page montre qui l'a partagé (nom, photo et bio, scellés comme
  les images) et diffuse le highlight directement depuis votre maison.
  Voir
  [Highlights](/fr/docs/highlights/#partager-publiquement-via-un-serveur-global).
- **Liens de partage de moments.** Sur un moment public, **Copier le
  lien de partage** crée un lien qui ouvre ce seul moment et rien
  d'autre de ce que vous avez publié. Cela fonctionne même quand votre
  maison est hors ligne, car le GFS garde une copie scellée qu'il ne
  peut pas ouvrir lui-même. Voir
  [Momentum](/fr/docs/momentum/#partager-un-seul-moment).
- **La page d'un espace global, les liens d'invitation et les
  profils.** La page d'un espace sur un GFS, un lien d'invitation GFS
  et le profil Momentum d'une personne passent la main à la
  visionneuse, qui affiche le texte « À propos » de l'espace, le code
  d'invitation et le QR code, ou le profil avec un bouton Suivre.

La visionneuse parle anglais, allemand, néerlandais, français et
espagnol, selon la langue du navigateur de vos proches, et les pages
suivent leur réglage clair ou sombre. Partagé dans une application de
messagerie, un lien d'espace ou de profil affiche toujours un aperçu
avec le nom et la photo. Le GFS répond à l'application avec une petite
page d'aperçu sans scripts.

## Ce que cela ne résout pas

Nous préférons que vous entendiez les limites de notre bouche :

- **Vous faites confiance à l'hébergeur de la visionneuse.** La
  visionneuse est publiée sur GitHub Pages sous l'organisation
  `social-home-io`. Les empreintes rendent une page remplacée
  détectable, mais seulement si quelqu'un vérifie.
- **Le lien est la clé.** Toute personne à qui il est transféré peut
  l'ouvrir. Il reste aussi dans l'historique du navigateur de vos
  proches, comme n'importe quel lien qu'ils ouvrent.
- **Un lien de moment ne peut pas être repris**, sauf en supprimant le
  moment. Un lien de highlight, si : supprimez-le, ou laissez le
  highlight expirer.
- **Le GFS voit toujours le trafic.** Il sait quand un lien est ouvert
  et depuis quelle adresse. Il ne sait pas ce qu'il contient.

La liste complète se trouve sur la page
[Modèle de sécurité](/fr/docs/security/#liens-publics).

## Votre propre GFS

Il n'y a rien à faire. Un GFS confie par défaut ses pages publiques à
la visionneuse du projet. Si vous préférez ne pas en dépendre, vous
pouvez héberger vous-même les fichiers publiés de la visionneuse et y
faire pointer votre GFS et vos foyers, ou désactiver le passage de
relais. Votre GFS dessine alors de nouveau ses pages lui-même. C'est
moins sûr pour les liens de highlight, car votre GFS sert alors la page
qui lit la clé. Voir
[Héberger votre propre relais](/fr/docs/running-a-gfs/#vos-pages-publiques).

<details class="tech">
<summary>Sous le capot</summary>

- Lien de highlight :
  `https://viewer.social-home.io/v/<hash>/#g=<GFS>&i=<home>&h=<highlight>&t=<token>&k=<secret>`.
  Tout ce qui suit `#` reste dans le navigateur. `k` est dérivé avec
  HKDF-SHA256 de la graine d'identité de l'auteur et du jeton ; le GFS
  ne le voit jamais.
- Le flux est scellé pour chaque affichage : la visionneuse envoie une
  clé P-256 éphémère, et la maison de l'auteur dérive du résultat ECDH,
  salé avec `k`, une clé AES-256-GCM. Le GFS voit le jeton et la clé de
  la visionneuse, sur le chemin direct comme sur le repli par relais,
  mais jamais `k`.
- `<hash>` correspond aux 16 premiers caractères hexadécimaux du sha384
  de la page, qui porte le hash SRI du script et les styles par hash.
  CSP stricte dans une balise `<meta>`, `no-referrer`, chaque requête
  avec `credentials: 'omit'` et `redirect: 'error'`.
- Le manifeste `socialhome/pinned_viewer.json` est versionné dans le
  dépôt principal ; la CI construit la visionneuse deux fois et échoue
  au moindre octet différent. Le dépôt de la visionneuse la
  reconstruit, vérifie l'`integrity` et ajoute `v/<hash>/` à
  `gh-pages`, qu'une règle (ruleset) maintient en ajout seul.
- La visionneuse a son propre domaine, `viewer.social-home.io`, plutôt
  qu'une origine `github.io` partagée, pour qu'aucun autre site de
  l'organisation ne puisse y enregistrer un service worker.
- Pages publiques du GFS : `/spaces/{id}`, `/join/{token}` et
  `/moments/{user}` répondent par une page de passage inerte (balises
  d'aperçu, une redirection vers la visionneuse, `default-src 'none'`).
  La visionneuse lit `/gfs/pages/*` en cross-origin sans identifiants
  et affiche le texte « À propos » à partir d'un petit sous-ensemble de
  Markdown, jamais comme du HTML.
- Les identifiants TURN de la visionneuse sont créés à chaque réponse
  (API REST TURN, 10 minutes par défaut), jamais fixes.

</details>
