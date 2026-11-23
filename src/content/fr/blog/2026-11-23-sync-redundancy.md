---
title: "Un espace qui tient bon : plus de GFS, et chaque membre peut vous mettre à jour"
description: "Les espaces s'appuient désormais sur chaque foyer et chaque GFS qu'ils utilisent. Les publications atteignent les membres sur n'importe quel GFS de l'espace, votre foyer passe à un autre GFS quand l'un est en panne, et vous pouvez voir si vous avez tout d'un espace et rattraper ce qui manque auprès de n'importe quel membre pendant que l'hôte est hors ligne. Dans Social Home 2026.11.23."
date: 2026-11-23
author: L'équipe Social Home
image: /blog/2026-11-sync/cover.webp
imageAlt: "Une illustration de cinq foyers reliés entre eux et à deux GFS. L'un des GFS est grisé et barré d'une croix, et une flèche en pointillés mène de lui à l'autre GFS. Le foyer hôte, au centre, est estompé avec une lune à côté, tandis que des enveloppes scellées continuent de circuler entre les autres foyers, dont trois portent une coche verte"
order: 50
---

Social Home n'a pas de centre. Chaque foyer garde chez lui sa propre
copie des [espaces](/fr/docs/glossary/#espace) auxquels il participe.
Le [GFS (Global Federation Server)](/fr/docs/glossary/#gfs) transporte
les publications scellées vers les foyers avec qui vous n'êtes pas
jumelé, et un espace peut en utiliser plusieurs.

Les deux dernières versions s'appuient là-dessus. Un espace utilise
désormais **chaque** GFS choisi par son propriétaire, pas un seul, et
ses membres se mettent à jour les uns les autres. Quand un GFS est en
panne, quand la maison de l'hôte se met à jour, ou quand votre propre
maison est restée éteinte tout le week-end, l'espace continue et vous
pouvez voir que vous avez tout.

## Un espace sur plusieurs GFS

Le propriétaire d'un [espace global](/fr/docs/global-spaces/) peut le
référencer sur huit GFS au maximum, par exemple le GFS du projet et un
qu'un membre fait tourner chez lui. Vos publications vont directement
aux membres présents sur **n'importe lequel** de ces GFS, y compris
ceux auxquels votre foyer ne s'est jamais connecté. Cela fait un envoi
par GFS, quel que soit le nombre de membres qui y attendent.

Ainsi, un membre qui n'utilise que le deuxième GFS reçoit votre
publication aussi vite que tout le monde, et l'hôte n'a pas à la
relayer.

<details class="tech">
<summary>Sous le capot</summary>

La boîte aux lettres d'un membre peut se trouver sur n'importe quel GFS
de la liste `gfs_servers` signée par le propriétaire. Deux membres ou
plus sur un même GFS reçoivent un seul envoi
`POST /gfs/envelope/multi` ; un membre seul reçoit
`POST /gfs/envelope`. Votre propre connexion à un GFS est utilisée en
premier. Pour un GFS référencé auquel vous ne vous êtes jamais
connecté, votre maison utilise une session sans cookie attachée à
l'adresse référencée, après que le GFS a prouvé qu'il détient la clé
signée par le propriétaire. Un GFS absent de la liste signée ne reçoit
aucune requête.

L'hôte transporte quand même une publication quand aucun GFS référencé
ne le peut : le GFS n'est pas dans la liste, il ne propose pas de
boîtes aux lettres, il a échoué trois fois de suite, ou l'élément est
trop volumineux pour cette route. Pour 200 membres sur trois GFS, une
publication représente 3 envois.

</details>

## Quand un GFS est en panne, votre foyer passe à un autre

Votre foyer reçoit les publications d'un espace dans une boîte aux
lettres anonyme sur un GFS. Si ce GFS reste en panne environ dix
minutes, et que votre foyer est connecté à un autre GFS de l'espace,
votre maison ouvre une boîte aux lettres là-bas et prévient les autres
membres. Leurs publications vont alors dans la nouvelle boîte aux
lettres.

Votre foyer ne fait pas d'allers-retours. Quand le premier GFS revient,
votre foyer reste où il est, et ne passe à un autre GFS que si le deuxième
tombe en panne à son tour. Si c'est votre propre connexion internet qui
est coupée, rien ne bouge.

<details class="tech">
<summary>Sous le capot</summary>

La vérification suit le délai de reconnexion de la boîte aux lettres
elle-même, sans minuterie supplémentaire : le passage a lieu 10 à
18 minutes après le début d'une panne, et uniquement vers un GFS qui
répond à ce moment-là. Le GFS en échec est marqué _demoted_ et classé
en dernier dès lors. Votre fiche de membre pour chaque espace concerné
reçoit une révision plus récente et part chez l'hôte, qui la transmet
avec sa prochaine mise à jour de la liste des membres ; environ 0,7 Ko
par espace. Le choix survit à un redémarrage.

</details>

## L'espace vous dit quel GFS vous manque

Pour passer à un autre GFS, votre foyer doit y être connecté. Un espace
indique donc, dans son fil, quand il est sur un GFS auquel votre foyer
n'est pas connecté : « Cet espace est aussi sur _nom du GFS_.
Connectez-vous pour une connexion plus stable. » Un admin du foyer
voit un bouton **Se connecter** qui ouvre le bon GFS, et les autres
sont invités à en demander un.

Pour les admins qui agissent pour le propriétaire (avec **Autoriser
les administrateurs à agir pour moi** activé), chaque GFS de l'espace
compte. Les admins de leur foyer reçoivent aussi une notification dans
**Attend votre décision** jusqu'à ce que leur foyer soit connecté à
tous.

## Tout est là ?

Les réglages d'un espace ont désormais une section **Tout est là ?**
Elle vous le dit en une phrase :

- **Tout est là**, avec le moment de la dernière vérification.
- **Récupération des nouveautés…** pendant l'arrivée de nouvelles
  publications.
- **Impossible de joindre le foyer hôte pour le moment**, avec jusqu'où
  vous êtes à jour. Ce que vous publiez partira dès que la connexion
  sera rétablie.
- **Des publications manquent peut-être**, seulement après deux
  vérifications de suite qui n'ont pas tout apporté. Votre maison
  réessaie toutes les 30 minutes, et **Vérifier maintenant** le
  demande tout de suite.

Quand des publications manquent peut-être, l'espace reçoit un ⚠ dans
votre liste d'espaces. Vos propres publications qui attendent encore
de partir affichent **Pas encore envoyé**. Un espace hébergé par votre
foyer n'affiche jamais d'avertissement : par définition, il a tout.

<details class="tech">
<summary>Sous le capot</summary>

Chaque résultat de synchronisation est enregistré par espace et
transformé en état sur `GET /api/spaces/{id}` et dans la trame
`space.sync_state`. **Vérifier maintenant** est ouvert à chaque membre
(pas aux abonnés), trois fois par heure et par espace. Les admins ont
une vue **Détails** avec la comparaison des pages : à quelle page vous
correspondez, combien de parties diffèrent et qui l'a signée.

</details>

## Rattraper auprès de n'importe quel membre

La maison de l'hôte, ou un admin qui agit pour le propriétaire, signe
de temps en temps un court résumé de tout ce que contient l'espace, et
l'envoie à tous les membres. Votre maison compare sa propre copie avec
ce résumé. S'il manque quelque chose, elle peut le récupérer auprès de
**n'importe quel** autre foyer membre, pas seulement de l'hôte.

Votre maison ne garde que ce que le résumé signé garantit. Un membre
qui envoie autre chose, ou quelque chose de modifié, ne fait rien
passer au-delà de votre maison. Un membre peut donc vous aider à
rattraper ce qui manque, mais ne peut rien glisser en douce.

Ainsi, après un week-end d'absence, vous rattrapez tout même si l'hôte
est hors ligne à votre retour. N'importe quel membre qui était là peut
vous mettre à jour.

<details class="tech">
<summary>Sous le capot</summary>

Le résumé est une **page de synchronisation** : 256 empreintes de
compartiments sur chaque ligne de l'espace, et un en-tête (`space_id`,
époque, signataire, numéro de séquence, nombre de lignes, empreinte
racine) signé avec la clé d'autorité de l'espace
(`page_suite: sha256-b256-c1`). Le propriétaire et les admins qui
détiennent la clé de signature de l'espace en scellent une au plus
toutes les 15 minutes après un changement, et l'envoient au plus une
fois par heure et par espace, scellée avec la clé de contenu de
l'espace : directement aux membres jumelés, et aux membres derrière un
GFS avec un envoi par GFS. Un espace calme n'envoie rien.

Un membre compare ses propres empreintes de compartiments avec la page
la plus récente. Pour les compartiments qui diffèrent, il interroge
n'importe quel foyer membre (`SPACE_SYNC_BEGIN` avec `buckets`), trois
au plus par tour et un à la fois. Une ligne n'est appliquée que si son
empreinte figure dans une liste de compartiment dont l'empreinte
correspond à la page signée. Un membre garde environ 9 Ko par espace.
Dans un espace très actif avec 200 foyers membres, les pages ajoutent
environ 7 % aux envois du signataire.

</details>

## Au total

Mis bout à bout, un espace repose sur de nombreux appuis :

- **La maison de chaque membre** contient tout l'espace et peut mettre
  les autres à jour.
- **Chaque GFS référencé** transporte les publications, et les foyers
  passent de l'un à l'autre quand l'un tombe en panne.
- **Les admins** peuvent faire vivre l'espace pendant l'absence du
  propriétaire, si le propriétaire le leur permet.

Vous n'avez rien à configurer. Si vous gérez un espace global très
actif, référencez-le sur deux GFS, par exemple le nôtre et un que vous
[faites tourner vous-même](/fr/docs/running-a-gfs/), et connectez
votre foyer aux deux. Social Home fait le reste.

## Ce que cela coûte, franchement

- **Un GFS auquel vous ne vous êtes jamais connecté vous voit livrer.**
  Quand votre publication va à des membres sur un GFS référencé auquel
  votre foyer ne s'est jamais connecté, ce GFS voit votre adresse
  internet, l'heure, la taille et les boîtes aux lettres auxquelles va
  la publication. Il ne voit jamais quel foyer vous êtes, ni ce que
  vous avez écrit.
- **Un membre connecté à aucun des GFS de l'espace** est quand même
  atteint par l'hôte : ce membre attend donc l'hôte.
- **Un membre peut vous faire vérifier une seconde fois.** Un membre
  qui envoie des données erronées peut faire afficher à votre espace
  « Des publications manquent peut-être ». Il ne peut jamais faire
  passer une publication manquante pour présente.
- **Si une publication est supprimée pendant l'absence de l'hôte,**
  votre espace risque de ne pas afficher « Tout est là » avant le
  retour de l'hôte.

## Essayez-le

La publication vers chaque GFS d'un espace et le passage à un autre
GFS sont arrivés dans **Social Home 2026.11.21**. **Tout est là ?** et
le rattrapage auprès de n'importe quel membre sont dans **Social Home
2026.11.23**. Mettez à jour votre maison, et vérifiez que votre foyer
est connecté à chaque GFS qu'utilisent vos espaces. Plus de détails
dans [Espaces globaux](/fr/docs/global-spaces/).
