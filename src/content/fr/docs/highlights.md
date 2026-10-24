---
title: Highlights
description: Une photo ou un court clip qui disparaît. Les Highlights vous permettent de partager un moment avec les foyers jumelés sans laisser d'archive dans le centre de données de quelqu'un d'autre.
order: 22
---

Un **highlight** est le pendant léger et éphémère du fil du foyer.
Vous déposez une photo ou une courte vidéo, ajoutez une légende
facultative, et il atterrit dans la boîte de réception _Highlights_
de chaque foyer jumelé. Il expire de lui-même — 30 jours par
défaut, ou la durée de conservation que vous avez choisie — et est
ensuite purgé du disque, sur votre serveur.

Les Highlights se trouvent sous **Discussions → Highlights** dans
la barre latérale.

## Comment ça marche

- **Un highlight par auteur et par jour.** Un highlight est un
  petit album de _frames_ ; chaque publication au cours de la même
  journée ajoute une frame au highlight du jour plutôt que d'en
  créer un nouveau. Nouveau jour → nouvelle ligne de highlight.
- **Public.** Vous choisissez parmi trois options au moment de
  publier :
  - **Tous les foyers jumelés** — chaque foyer jumelé confirmé.
  - **Certains foyers** — les foyers que vous choisissez.
  - **Certaines personnes** — des personnes précises dans ces
    foyers.
- **Conservation.** 30 jours par défaut, réglable par auteur de
  1 à 90 jours dans **Paramètres → Confidentialité**. Le
  planificateur de conservation purge les lignes expirées toutes
  les heures.
- **Réponses et réactions.** Tapez sur une frame pour réagir avec
  un emoji ; balayez vers le haut ou tapez sur la puce ✉ pour
  répondre par message privé avec un instantané de la frame joint,
  pour que la conversation garde son sens même après l'expiration
  de la frame d'origine.
- **Archive.** **Explorer → Archive des Highlights** est une grille
  calendaire de tous les highlights encore dans leur fenêtre de
  conservation — les vôtres et ceux de chaque foyer jumelé. Les
  jours avec des highlights sont cliquables ; tapez sur une date
  pour voir qui a publié ce jour-là.

## Confidentialité

- Les frames de highlight sont scellées de votre maison à celle de
  l'autre foyer, exactement comme les messages privés. Rien sur le
  chemin ne peut les ouvrir.
- Les frames sont signées par votre foyer ; un foyer destinataire
  rejette les contrefaçons avant même qu'elles n'atteignent sa base
  de données.
- La liste de blocage personnelle (**Paramètres → Confidentialité →
  Comptes bloqués**) masque chaque highlight d'un auteur bloqué sur
  toutes les surfaces — boîte de réception, archive et les anneaux
  en haut de la page — sans laisser fuiter un signal « vous avez
  été bloqué ».

## Partager publiquement via un serveur global

Parfois, vous voulez envoyer un highlight à quelqu'un qui n'est pas
sur Social Home — un ami sur Twitter, un parent qui ne consulte que
ses e-mails. Depuis la visionneuse de highlight, l'auteur peut
taper sur **Créer un lien public** et choisir un
[GFS (Global Federation Server)](/fr/docs/glossary/#gfs) jumelé —
le relais qui aide les foyers à se trouver. Vous obtenez un lien vers
la [visionneuse Social Home](/fr/docs/glossary/#visionneuse), du type

```
https://viewer.social-home.io/v/0123456789abcdef/#g=…&i=…&h=…&t=…&k=…
```

Toute personne qui a ce lien peut ouvrir le highlight dans un
navigateur. La page montre qui l'a partagé — votre nom, votre photo
et votre bio — puis les images. Les images voyagent directement de
votre maison au navigateur du visiteur ; le GFS se contente de les
présenter l'un à l'autre. Si ce chemin direct ne peut pas s'établir
(un réseau de bureau strict, par exemple), le GFS fait passer les
images — mais seulement tant que votre maison est en ligne, et il
n'en stocke aucune.

Sur les deux chemins, le highlight est scellé de votre maison
jusqu'au navigateur du visiteur. La clé est la partie du lien après
le `#`, que les navigateurs n'envoient jamais à un serveur : le GFS
ne peut donc pas ouvrir le highlight, même s'il aide à le livrer. Et
la page qui lit la clé n'est pas servie par le GFS : elle vient de la
visionneuse Social Home, un ensemble fixe de fichiers dont chaque
version peut être vérifiée. Qui gère le GFS ne peut ni lire votre
highlight ni modifier la page que voit votre visiteur.

La durée de conservation que vous avez fixée pour le highlight
s'applique aussi au lien public : quand le highlight aurait été
supprimé pour les foyers jumelés, le lien cesse de fonctionner.

Vous pouvez créer plusieurs liens par highlight (un par plateforme,
par exemple) et supprimer chacun séparément. L'auteur peut aussi
retirer tous les liens d'un coup avec **Supprimer tous les liens
publics de ce highlight** si un lien vous échappe.

C'est le seul endroit de Social Home où un highlight est lisible
volontairement sans identité de foyer, et c'est un choix par
highlight — rien ne quitte votre maison tant que vous n'avez pas
créé de lien. Traitez le lien comme une clé : quiconque le possède
peut regarder.

<details class="tech">
<summary>Sous le capot</summary>

- Le GFS négocie une poignée de main WebRTC entre la maison de
  l'auteur et le navigateur du visiteur ; les octets du highlight
  passent ensuite par cette connexion directe. Si WebRTC échoue, le
  GFS se rabat sur un relais HTTP qui transmet les images depuis la
  maison de l'auteur tant qu'elle est joignable. Aucun octet de
  highlight n'est écrit sur le disque du GFS, sur aucun des deux
  chemins.
- Scellement : la visionneuse envoie une clé P-256 éphémère (`vk`)
  avec son offre ; la maison de l'auteur scelle chaque image en
  AES-256-GCM sous `HKDF-SHA256(ECDH, salt = k)`. `k` est dérivé de la
  graine d'identité de l'auteur et du jeton, et ne vit que dans le
  fragment.
- `v/<hash>/` dans le lien désigne une seule version de la
  visionneuse, adressée par son contenu ; son script est épinglé par
  SRI, sa CSP est stricte, et les versions ne sont qu'ajoutées,
  publiées par
  [`social-home-io/viewer`](https://github.com/social-home-io/viewer).
  Le GFS répond aux routes de signalisation anonymes de la
  visionneuse avec CORS, jamais avec des identifiants.
- Les jetons sont propres à chaque highlight et à chaque lien, et
  révocables un par un ou tous à la fois. Un échec affiche toujours
  « Ce n'est pas disponible pour le moment », que le lien soit
  révoqué, expiré ou que l'auteur soit hors ligne.

</details>

## Signalement

Si un highlight enfreint les normes de la communauté — spam,
harcèlement, contenu inapproprié, désinformation — ouvrez le menu
⋯ de la visionneuse et choisissez **Signaler**. Le signalement
arrive dans la file de modération de l'admin du foyer — la même qui
traite les publications, les commentaires et les signalements
Momentum — pour que l'admin le trie.

<details class="tech">
<summary>Sous le capot</summary>

Les signalements sont des lignes de la table unifiée
`content_reports` ; les admins les listent sur
`/api/admin/reports?status=pending`.

</details>

## Fédération

Les Highlights voyagent entre foyers de la même manière que les
messages privés et le contenu des espaces : scellés, signés et
vérifiés contre le rejeu à l'arrivée. Les réactions et les accusés
de lecture retrouvent le chemin du foyer de l'auteur pour que la
puce sur la frame compte juste.

<details class="tech">
<summary>Sous le capot</summary>

Les Highlights utilisent le pipeline entrant §24.11 partagé avec
les messages privés et le contenu des espaces : enveloppes signées,
protégées par cache anti-rejeu, champs de routage en clair et
chaque champ de contenu chiffré. Les réactions et les accusés de
lecture empruntent un canal de retour unicast vers le foyer de
l'auteur.

</details>
