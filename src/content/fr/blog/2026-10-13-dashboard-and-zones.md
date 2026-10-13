---
title: "Un tableau pour le mur de la cuisine, et une carte qui connaît vos lieux"
description: Le tableau de bord du foyer affiche la journée, le chat du foyer et qui est où sur une tablette murale, avec une vue en images pour les enfants et un verrou de confidentialité pour les invités. Les zones donnent à votre foyer ses propres lieux, synchronisés depuis Home Assistant si vous le souhaitez. Le tout dans Social Home 2026.10.13.
date: 2026-10-13
author: L'équipe Social Home
image: /blog/2026-10-dashboard/overview.png
imageAlt: Vue d'ensemble sur la tablette murale à 16:32 avec un bandeau Message pour tout le monde d'Anna, le prochain événement Natation à 17:00, les derniers messages du foyer et une frise de la journée pour chaque membre de la famille
order: 50
---

Lundi, seize heures trente. Anna quitte le travail et passe prendre
un gâteau pour mamie. Le cours de musique de Mia a changé de salle
(salle 12), la natation de Leo commence à dix-sept heures, et il faut
encore retrouver le sac de piscine. Personne n'a envie de déverrouiller
un téléphone pour savoir tout ça.

Social Home a donc désormais un **tableau de bord du foyer** : un
tableau calme pour une tablette fixée au mur de la cuisine ou de
l'entrée. Il montre la journée d'un coup d'œil, les messages qui
comptent maintenant et, nouveauté de la semaine, une carte de qui est
où. Derrière la carte, il y a les **zones** : les lieux que votre foyer
connaît par leur nom. La maison, l'école, le travail, chez mamie.

_Tous les écrans ci-dessous montrent un foyer d'exemple : Anna, Pascal,
Mia (11 ans) et Leo (6 ans), un après-midi de semaine à Zurich._

## Tout le foyer d'un coup d'œil

La **Vue d'ensemble** est le tableau que vous voyez en passant : une
grande horloge et la date, ce qui vient **Ensuite** (le soir, la
première chose de **Demain**), qui est à la maison et qui est dehors,
et pour chaque personne une ligne de la journée avec un repère
« maintenant ». Les cours viennent de
l'[emploi du temps](/fr/blog/2026-10-01-timetables/) de chaque enfant,
et les changements du jour sont écrits en clair : annulé, déplacé dans
une autre salle ou ajouté. Les tâches, la liste de courses et les notes
complètent le tout. Sur un téléphone ou une tablette accrochée en
portrait, le même tableau devient une seule colonne.

Le tableau se met à jour tout seul toutes les 30 secondes. Si le Wi-Fi
tombe, il garde le dernier contenu, grise ce qui pourrait être périmé
et se rétablit de lui-même.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/overview.png"><img src="/blog/2026-10-dashboard/overview.png" alt="Vue d'ensemble sur la tablette murale à 16:32 avec un bandeau Message pour tout le monde d'Anna, qui quitte le travail et passe prendre un gâteau pour mamie, un bouton C'est noté, le prochain événement Natation à 17:00, les derniers messages et une frise de la journée pour Anna, Leo, Mia et Pascal" width="1280" height="800" loading="lazy"></a><figcaption><b>Vue d'ensemble</b>Seize heures, avec le message d'Anna pour tout le monde épinglé en haut.</figcaption></figure>
</div>

## Des messages qui arrivent jusqu'au mur

Coincé dans les bouchons ? Écrivez « Commencez vos devoirs, je suis là
dans 20 minutes » dans le chat du foyer sur votre téléphone, et il
s'affiche sur le tableau de la cuisine. C'est **désactivé par défaut** :
le tableau de bord n'affiche jamais le chat, sauf si un administrateur
active **Afficher les messages du foyer**.

Une fois activé, la Vue d'ensemble montre les trois messages les plus
récents des six dernières heures, et l'onglet **Messages** le chat du
foyer de la dernière journée. Touchez un message et la tablette le lit
à voix haute, pratique pour les enfants qui ne savent pas encore lire.
Écrivez **@here** et il devient un bandeau pour tout le monde ; écrivez
**@leo** et un point apparaît sur le visage de Leo, le message
l'attendant en haut de sa page. **C'est noté** le retire sur toutes les
tablettes et ajoute un ✅ au message dans le chat, pour que l'auteur
sache qu'il a été vu. Un son doux retentit une fois pour une nouvelle
mention, jamais la nuit.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/messages-tab.png"><img src="/blog/2026-10-dashboard/messages-tab.png" alt="Onglet Messages avec le bandeau @here en haut et les messages du foyer du jour de Pascal, Mia, Anna et Leo, du plus récent au plus ancien, avec les heures et une étiquette NOUVEAU sur le dernier" width="1280" height="800" loading="lazy"></a><figcaption><b>Messages</b>Le chat du foyer de la dernière journée au même endroit, lu à voix haute d'un toucher.</figcaption></figure>
<figure class="phone"><a href="/blog/2026-10-dashboard/mention-phone.png"><img src="/blog/2026-10-dashboard/mention-phone.png" alt="Page de Mia sur un téléphone avec une carte Message pour toi d'Anna qui lui rappelle son livre de piano, un bouton C'est noté, puis Maintenant Musique en salle 12 et Ensuite Piano" width="390" height="844" loading="lazy"></a><figcaption><b>Message pour toi</b>Une @mention attend en haut de la page de la personne concernée.</figcaption></figure>
</div>

<details class="tech">
<summary>Sous le capot</summary>

Le tableau de bord ne fait que lire le chat : il ne le crée jamais et
ne déplace jamais le marqueur de lecture de quiconque. Les notices
système, les épingles de position, les messages supprimés et ceux des
personnes masquées sont écartés, et les blocages posés par un parent
sont respectés (si la vérification échoue, aucun message ne s'affiche).
La lecture à voix haute n'utilise que des voix qui tournent sur la
tablette elle-même (`localService === true`) ; une tablette sans voix
de ce type n'affiche pas de 🔊, le texte n'est donc jamais envoyé à une
voix dans le cloud. « C'est noté » est la seule écriture du tableau de
bord : une réaction ✅ dans `message_reactions`, revérifiée par le
serveur et limitée à 30 toutes les 5 minutes par tablette.

</details>

## Une page pour chacun, et des images pour les enfants

Touchez un visage pour voir la journée de cette personne : maintenant
et ensuite, événements, tâches, demain, et l'emploi du temps avec ce
qui est annulé et ce qui a été déplacé.

Les enfants qui ne savent pas encore lire ont à la place une **vue en
images** : une grande horloge à aiguilles avec un secteur coloré qui
rétrécit jusqu'à la prochaine activité, **MAINTENANT** et **ENSUITE** en
grandes images, la journée découpée en matin, après-midi, soir et nuit,
et les tâches en tuiles à cocher. De petites légendes permettent à un
adulte de suivre. La vue en images est activée par défaut pour les
comptes enfants protégés, et un administrateur peut la régler pour
chaque personne.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/person-school.png"><img src="/blog/2026-10-dashboard/person-school.png" alt="Page de Mia, défilée jusqu'à École aujourd'hui : anglais et maths, sport barré et marqué annulé, sciences, arts plastiques, et musique marquée modifiée et désormais en salle 12, à côté de ses projets du soir et de ses tâches" width="1280" height="800" loading="lazy"></a><figcaption><b>La journée d'école de Mia</b>Ce qui est annulé et ce qui a bougé, toujours écrit, jamais par la couleur seule.</figcaption></figure>
<figure class="desk"><a href="/blog/2026-10-dashboard/picture-view.png"><img src="/blog/2026-10-dashboard/picture-view.png" alt="Page en images de Leo avec une horloge à aiguilles, une tuile de message de Pascal avec une grande coche, la paire Maintenant temps libre et Ensuite natation, des visages de messages avec de courtes légendes et sa journée en tuiles pour le matin, l'après-midi et le soir" width="1280" height="800" loading="lazy"></a><figcaption><b>Vue en images</b>Leo ne sait pas encore lire, alors sa page parle en images et avec un cadran.</figcaption></figure>
</div>

## La nuit, et quand vous avez des invités

La nuit, le tableau s'assombrit et ne montre plus qu'une horloge et la
première chose du lendemain. Quand des invités, une baby-sitter ou
l'aide ménagère sont là, un toucher sur 🔒 verrouille la tablette sur
un écran sans rien de personnel : le nom du foyer, l'heure et la date.
Un code PIN de 4 à 6 chiffres la déverrouille, et cinq essais erronés
déconnectent la tablette.

Certaines choses n'arrivent jamais au mur, verrou ou pas : les messages
privés, les notifications, les sondages et le lieu des événements. Les
personnes qu'un administrateur masque du tableau de bord n'y
apparaissent nulle part.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/night.png"><img src="/blog/2026-10-dashboard/night.png" alt="Vue de nuit sur un écran noir affichant 22:32, lundi 12 octobre, et Demain 08:00 École avec le visage de Leo, ainsi qu'une indication pour toucher l'écran et afficher le tableau de bord" width="1280" height="800" loading="lazy"></a><figcaption><b>La nuit</b>Une horloge et la première chose du lendemain.</figcaption></figure>
<figure class="desk"><a href="/blog/2026-10-dashboard/lock.png"><img src="/blog/2026-10-dashboard/lock.png" alt="Écran verrouillé n'affichant que le nom du foyer, l'heure 16:32, la date et un bouton PIN" width="1280" height="800" loading="lazy"></a><figcaption><b>Verrou de confidentialité</b>Seulement le nom du foyer et l'heure.</figcaption></figure>
</div>

## La mise en place

Tout se trouve sous **Admin › Tableau de bord**, dans l'ordre où vous
en avez besoin : définir un mot de passe du foyer, activer le tableau
de bord, puis connecter la tablette en scannant un code QR à usage
unique, pour que personne n'ait à taper sur la tablette. La même page
règle le code PIN, la plage de nuit, la langue, les personnes affichées
et qui a la vue en images. **Déconnecter toutes les tablettes** est à
un bouton de distance.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/admin-qr.png"><img src="/blog/2026-10-dashboard/admin-qr.png" alt="Réglages du tableau de bord dans l'app Social Home avec l'adresse de la tablette, un code QR de connexion valable dix minutes, un bouton Nouveau lien de connexion et le port" width="1280" height="720" loading="lazy"></a><figcaption><b>Connecter une tablette</b>Scannez le code QR ; il sert une fois et pendant dix minutes.</figcaption></figure>
</div>

<details class="tech">
<summary>Sous le capot</summary>

Le tableau de bord est une application web distincte, rendue côté
serveur, sur son propre port (`8100` par défaut), prévue pour votre
réseau domestique. Elle n'accepte ni la connexion de l'app ni les
en-têtes ingress de Home Assistant. Avec le module complémentaire Home
Assistant, activez le port sous **Paramètres › Apps › Social Home ›
Réseau**. Le mot de passe du foyer est haché avec scrypt ; les
tablettes reçoivent un cookie signé (12 heures, ou un an avec « Garder
cette tablette connectée »), et déconnecter toutes les tablettes
révoque tous les cookies d'un coup. Le jeton QR sert une fois, pendant
10 minutes, et n'est stocké que sous forme de hachage SHA-256. Les
connexions sont limitées, `Host` est vérifié par rapport à une liste
autorisée, et les pages appliquent une CSP stricte sans aucune requête
vers des tiers.

</details>

## Les zones : les lieux que votre foyer connaît

Une zone est un lieu nommé avec un rayon : la maison, l'école, le
travail, chez mamie. Quand quelqu'un s'y trouve, le foyer le voit à cet
endroit par son nom, sur la carte et dans la liste des membres, plutôt
que comme un point dans une rue.

Les administrateurs les gèrent sous **Admin › Zones**. **Maison** vient
toujours en premier et ne peut pas être supprimée ; pour la déplacer,
marquez une autre zone comme Maison. Chaque zone peut porter un emoji,
choisi parmi une douzaine de lieux prédéfinis ou n'importe quel autre
emoji, et les listes sont triées de A à Z. Quand un téléphone partage
une position sans nommer de zone, Social Home déduit la zone lui-même.

**Les noms de vos zones ne quittent jamais votre maison.** Ils ne sont
envoyés ni aux foyers jumelés ni à aucun espace.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/admin-zones.png"><img src="/blog/2026-10-dashboard/admin-zones.png" alt="Onglet Admin Zones avec le titre Zones du foyer, 4 zones utilisées sur 50, un bouton Ajouter une zone et des cartes pour Home (marquée Maison), Gran's, School et Work avec leur emoji, leur rayon et leurs coordonnées, à côté d'une carte de Zurich avec les quatre cercles de zone" width="1280" height="820" loading="lazy"></a><figcaption><b>Admin › Zones</b>La maison en premier, chaque lieu avec son emoji.</figcaption></figure>
<figure class="desk"><a href="/blog/2026-10-dashboard/zone-icon.png"><img src="/blog/2026-10-dashboard/zone-icon.png" alt="Fenêtre Modifier la zone avec le nom Home, une rangée d'icônes de lieux avec la maison sélectionnée, les options Aucune icône et Autre emoji, une rangée de couleurs et un curseur de rayon à 150 m" width="1280" height="720" loading="lazy"></a><figcaption><b>Modifier une zone</b>Lieux prédéfinis, aucune icône, ou n'importe quel autre emoji.</figcaption></figure>
</div>

**Vous avez déjà des zones dans Home Assistant ?** Si vous avez
installé Social Home via Home Assistant, il peut les reprendre :
activez **Synchroniser les zones depuis Home Assistant**, et ses zones
apparaissent dans la liste, marquées _Depuis Home Assistant_ et tenues
à jour. Vous les modifiez dans Home Assistant ; les zones que vous
ajoutez dans Social Home restent les vôtres. Désactiver la
synchronisation demande d'abord confirmation, puis ne retire que les
zones synchronisées. Et si Home Assistant redémarre ou est injoignable,
rien n'est supprimé.

Les espaces ont leurs propres zones depuis un moment ; elles reçoivent
maintenant les mêmes icônes emoji.

<details class="tech">
<summary>Sous le capot</summary>

Les zones du foyer vivent dans une table purement locale,
`household_zones`, qui n'est jamais fédérée : jusqu'à 50 zones, un
rayon de 25 m à 50 km et au plus une zone Maison. Un test de protocole
vérifie qu'un nom de zone du foyer n'apparaît jamais dans la diffusion
fédérée, dans les trames WebSocket d'un espace ni dans
`GET /api/spaces/{id}/presence`. Un point GPS partagé n'est rapproché
d'une zone que si l'app n'a nommé aucune zone, si bien que Home
Assistant reste l'autorité sur qui est dans quelle zone.

La synchronisation lit `zone.*` depuis `GET /api/states` de Home
Assistant, au démarrage puis toutes les 5 minutes : les zones passives
sont ignorées, `zone.home` devient Maison, et les icônes `mdi:`
deviennent des emoji. Une réponse sans `zone.home` signifie que Home
Assistant est encore en train de démarrer, ce passage est donc ignoré.
Les icônes des zones d'espace voyagent dans un champ `icon` facultatif ;
les foyers plus anciens l'ignorent simplement.

</details>

## Une carte qui se lit comme une liste

La carte de l'app a été refaite, dans le style de la nouvelle carte de
Home Assistant. Les personnes sont des marqueurs photo encadrés de leur
propre couleur. Tous ceux qui sont dans la même zone partagent une
bulle sur la zone, avec jusqu'à trois visages et un « +N » ; les bulles
proches fusionnent quand vous dézoomez. Chaque zone affiche son emoji
en son centre.

À côté de la carte, un panneau **Personnes** et **Zones** le dit en
mots : choisissez une personne pour zoomer sur elle et voir sa zone et
sa dernière mise à jour, ou choisissez une zone pour voir qui s'y
trouve maintenant. Sur un téléphone, le panneau est une feuille que
vous tirez vers le haut. Social Home ne garde aucun historique de
position. Il sait seulement où se trouve quelqu'un maintenant.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/presence-map.png"><img src="/blog/2026-10-dashboard/presence-map.png" alt="Page Présence avec une carte de Zurich : des bulles pour Mia à l'école, Leo et Pascal ensemble dans la bulle Maison et Anna seule, des épingles de zone pour Gran's et Work, et un panneau Personnes et Zones indiquant la zone et la dernière mise à jour de chacun" width="1280" height="720" loading="lazy"></a><figcaption><b>Présence</b>La carte et une liste des personnes côte à côte.</figcaption></figure>
<figure class="phone"><a href="/blog/2026-10-dashboard/presence-phone.png"><img src="/blog/2026-10-dashboard/presence-phone.png" alt="Page Présence sur un téléphone avec la carte centrée sur la bulle de Mia à l'épingle de l'école et une feuille en bas avec ses détails : Où École, Dernière mise à jour il y a 27 min, Activité hors ligne" width="390" height="844" loading="lazy"></a><figcaption><b>Sur un téléphone</b>Touchez Mia pour voir où elle est et quand elle a été mise à jour.</figcaption></figure>
</div>

Les mêmes marqueurs servent sur la carte d'un espace. Dans un espace
qui ne partage que les zones, les membres apparaissent au centre d'une
zone définie par l'espace, jamais à leur position réelle.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/space-zone-only.png"><img src="/blog/2026-10-dashboard/space-zone-only.png" alt="Onglet Carte d'un espace avec un bandeau indiquant que seul le nom de la zone est partagé, jamais votre position exacte, des bulles de membres au centre des zones Home et School avec une pastille +2, et la liste des zones et des membres en dessous" width="1280" height="720" loading="lazy"></a><figcaption><b>Carte d'un espace, zones seulement</b>Des visages sur la zone, jamais une position.</figcaption></figure>
</div>

## Qui est où, au mur

Tout cela se retrouve sur le tableau de la cuisine : un onglet
**Carte** à côté de Vue d'ensemble, Messages et Notes. Les visages se
rassemblent dans la bulle de leur zone, et une liste **Qui est où** sur
le côté se lit d'un coup d'œil : « Leo, Maison, il y a 36 min ».
Touchez une personne et la carte zoome en indiquant de quand date sa
position ; **Afficher tout le monde** ou une minute sans toucher
ramène toute la famille.

L'onglet n'apparaît que si quelqu'un du foyer a partagé une position
dans la dernière journée. Une position de plus d'une heure s'estompe et
indique « vu pour la dernière fois » ; au bout d'une journée, la
personne disparaît. Sous le verrou de confidentialité et la nuit, la
carte est masquée comme tout le reste.

<div class="shots">
<figure class="desk"><a href="/blog/2026-10-dashboard/wall-map.png"><img src="/blog/2026-10-dashboard/wall-map.png" alt="Onglet Carte sur la tablette murale à 16:11 sur un plan de Zurich, avec des bulles photo pour Mia au-dessus de la zone École, Leo et Pascal ensemble au-dessus de Maison et Anna seule entre Maison et Travail, des épingles de zone pour Gran's et Work, et une liste Qui est où à droite" width="1280" height="800" loading="lazy"></a><figcaption><b>L'onglet Carte</b>Leo et Pascal partagent la bulle Maison, Mia est à l'école, Anna est en route.</figcaption></figure>
<figure class="desk"><a href="/blog/2026-10-dashboard/wall-map-callout.png"><img src="/blog/2026-10-dashboard/wall-map-callout.png" alt="Onglet Carte zoomé sur la zone École, avec la photo de Mia au-dessus de l'épingle de l'école, une bulle Mia, École, il y a 27 min, un bouton Afficher tout le monde et la ligne de Mia mise en évidence dans la liste Qui est où" width="1280" height="800" loading="lazy"></a><figcaption><b>Un toucher sur Mia</b>La carte zoome sur l'école et indique de quand date sa position.</figcaption></figure>
<figure class="phone"><a href="/blog/2026-10-dashboard/wall-map-phone.png"><img src="/blog/2026-10-dashboard/wall-map-phone.png" alt="Onglet Carte sur un téléphone avec une bulle combinée montrant les visages de Leo, Pascal et Mia plus +1, légendée Maison, École, Absent, au-dessus de la carte avec les épingles de zone, et une liste Qui est où sur deux colonnes en dessous" width="390" height="844" loading="lazy"></a><figcaption><b>Sur un téléphone</b>Les lieux sont plus proches, alors leurs bulles se rejoignent.</figcaption></figure>
</div>

<details class="tech">
<summary>Sous le capot</summary>

La carte murale affiche des positions arrondies à environ 11 m (4
décimales), comme l'app, et uniquement sur le tableau de bord du foyer
lui-même. Les tuiles de carte passent par votre propre serveur, sur
`/tiles/{z}/{x}/{y}`, la tablette ne fait donc aucune requête vers
l'extérieur. Les tuiles exigent une session du tableau de bord (401
sans, 423 quand il est verrouillé) et sont servies en `private,
no-cache`, pour qu'une tablette verrouillée ne puisse pas afficher de
tuiles en cache. Aucune bibliothèque cartographique ne tourne sur la
tablette : un petit script place la grille de tuiles et retente les
tuiles en échec avec un délai croissant, de 30 s à 10 minutes.

</details>

## La suite : le tableau de bord sur ESPHome

Une tablette n'est pas le seul écran qui trouve sa place au mur. Nous
travaillons maintenant à une version **ESPHome** du tableau de bord,
pour que le tableau du foyer puisse aussi tourner sur un appareil
ESPHome.

## L'essayer

Le tableau de bord du foyer et les zones sont dans **Social Home
2026.10.13**. Activez le tableau de bord sous **Admin › Tableau de
bord**, créez vos lieux sous **Admin › Zones**, et raccrochez cette
vieille tablette au mur.
