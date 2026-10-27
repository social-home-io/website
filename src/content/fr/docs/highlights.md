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
la barre latérale, avec deux onglets. **Aujourd'hui** montre votre
propre highlight (combien d'images, vu par combien de personnes, et
à qui il s'adresse), puis une ligne par personne, réparties entre
**Nouveau** et **Vus**, chacune avec à qui elle s'adressait et,
vers la fin, quand elle se termine. **Archives** liste les
highlights plus anciens jour par jour, avec un sélecteur de mois et
**Seulement les miens**. Les anneaux des personnes qui ont quelque
chose de nouveau se trouvent sur l'**Accueil**, dans une carte qui
se masque quand il n'y a rien de nouveau.

## Comment ça marche

- **Un highlight par auteur et par jour.** Un highlight est un
  petit album de _frames_ ; chaque publication au cours de la même
  journée ajoute une frame au highlight du jour plutôt que d'en
  créer un nouveau. Nouveau jour → nouvelle ligne de highlight.
- **Un seul public pour la journée.** La première image du jour
  fixe qui voit tout le highlight, en partant de votre choix par
  défaut dans **Paramètres → Confidentialité → Highlights** :
  - **Tous les foyers jumelés** — chaque foyer jumelé confirmé.
  - **Votre foyer uniquement.**
  - **Choisir des foyers ou des personnes…** — les foyers ou les
    personnes précises que vous choisissez.

  Quand vous ajoutez des images plus tard, la zone de rédaction
  montre à qui elles vont. **Modifier pour toute la journée…**
  restreint ou élargit toutes les images d'un coup, et vous dit
  d'abord qui gagnera le highlight et qui le perdra. Les personnes
  qui l'ont déjà regardé gardent ce qu'elles ont vu. Si le
  highlight a un lien public, vous pouvez le supprimer dans la même
  étape.

- **Conservation.** 30 jours par défaut, réglable par auteur de
  1 à 90 jours dans **Paramètres → Confidentialité**. Le
  planificateur de conservation purge les lignes expirées toutes
  les heures.
- **Regarder.** La visionneuse a des boutons pause, menu et
  fermer ; Espace ou K met en pause et les flèches passent d'une
  frame à l'autre. Les vidéos démarrent sans le son. À la fin, elle
  passe à la personne suivante qui a quelque chose de nouveau.
- **Réponses et réactions.** Réagissez avec un emoji sous la
  frame ; votre réaction reste marquée, et la toucher à nouveau la
  retire. L'auteur est prévenu. **Répondre en privé à …** envoie la
  frame dans votre discussion avec l'auteur, pour que la
  conversation garde son sens même après l'expiration de la frame.
- **Pour l'auteur.** Le menu ⋯ supprime une frame ou tout le
  highlight du jour, le partage dans le fil ou un espace, ou crée un
  lien public.

## Confidentialité

- Les frames de highlight sont scellées de votre maison à celle de
  l'autre foyer, exactement comme les messages privés. Rien sur le
  chemin ne peut les ouvrir.
- Les frames sont signées par votre foyer ; un foyer destinataire
  rejette les contrefaçons avant même qu'elles n'atteignent sa base
  de données.
- Les personnes qui regardent un highlight ne voient qu'une courte
  étiquette indiquant à qui il s'adressait (« Personnes choisies »,
  « Foyer uniquement »), jamais la liste, et chaque foyer ne reçoit
  que sa propre partie du public.
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
de lecture retrouvent le chemin du foyer de l'auteur pour que « vu par » compte juste. Élargir le public du
jour envoie les frames du jour une seule fois à chaque foyer
ajouté.

<details class="tech">
<summary>Sous le capot</summary>

Les Highlights utilisent le pipeline entrant §24.11 partagé avec
les messages privés et le contenu des espaces : enveloppes signées,
protégées par cache anti-rejeu, champs de routage en clair et
chaque champ de contenu chiffré. Les réactions et les accusés de
lecture empruntent un canal de retour unicast vers le foyer de
l'auteur. Élargir le public du jour envoie au maximum 30 frames,
une seule fois, à chaque foyer nouvellement ajouté ; le restreindre
fait supprimer le highlight par le foyer qui en sort. Les
changements de public sont limités à 6 par heure et par auteur.

</details>
