---
title: "Un nouveau GFS : tous les membres égaux, et le GFS en apprend moins"
description: "De vrais foyers nous ont montré où le GFS pouvait mieux faire, alors nous avons repensé son fonctionnement. Chaque foyer reçoit sa propre boîte aux lettres anonyme, chaque membre atteint tous les autres, publier est toujours anonyme, les admins peuvent faire vivre un espace sans le propriétaire, et vous pouvez demander à rejoindre un espace global sans jumelage. Dans Social Home 2026.11.19."
date: 2026-11-20
author: L'équipe Social Home
image: /blog/2026-11-gfs/cover.webp
imageAlt: "Une illustration d'un GFS sous la forme d'une armoire verte de petites boîtes aux lettres sans nom, seulement des marques brouillées. En dessous, cinq foyers envoient des enveloppes scellées le long de chemins en pointillés vers quelques-unes des boîtes aux lettres, et un foyer tient deux tickets"
order: 50
---

Le [GFS (Global Federation Server)](/fr/docs/glossary/#gfs) est le
relais qui aide les foyers à se trouver. Il transporte aussi un
[espace](/fr/docs/glossary/#espace) vers les foyers avec qui vous
n'êtes pas jumelé : les abonnés d'un espace global, et les membres qui
ont rejoint avec un **Lien GFS**.

Ces dernières semaines, de nombreux foyers ont utilisé le GFS au
quotidien : des espaces de famille avec les grands-parents dans une
autre ville, des clubs de plusieurs dizaines de membres, des espaces
globaux avec des abonnés un peu partout. Nous en avons tiré trois
leçons :

- **Chaque membre doit être l'égal des autres**, quelle que soit la
  façon dont son foyer atteint l'espace. Rejoindre avec un Lien GFS
  doit vous donner le même espace qu'un jumelage avec l'hôte.
- **Un espace ne doit pas attendre son propriétaire.** Quand la maison
  du propriétaire se met à jour ou est hors ligne, les membres doivent
  quand même se joindre, et les admins doivent quand même pouvoir
  faire vivre l'espace.
- **Le GFS doit en apprendre le moins possible.** Ni ce qui est publié,
  ni qui l'a publié. Idéalement, pas même à quel foyer il livre.

Nous avons donc repris la question depuis le début et redéfini le
fonctionnement d'un GFS. Le résultat est dans **Social Home
2026.11.19**. Vos publications sont toujours scellées de votre maison à
la leur, et le GFS ne peut toujours pas en lire une seule.

## Chaque foyer reçoit une boîte aux lettres anonyme

Quand votre foyer participe à un espace via un GFS, il reçoit une
**boîte aux lettres anonyme** sur ce GFS. L'hôte et tous les autres
membres y déposent des messages scellés, et votre maison vient les
chercher. Le GFS ne connaît une boîte aux lettres que par un numéro
d'apparence aléatoire. Il ne sait pas à quel foyer elle appartient, à
quels espaces elle sert, ni ce que disent les messages.

Pour ouvrir une boîte aux lettres, votre maison dépense un **ticket**.
Elle en récupère un petit lot chaque jour, et ils sont conçus pour que
le GFS ne puisse pas savoir quel foyer en a dépensé un. Cela garde un
GFS très sollicité équitable, sans que le GFS apprenne qui se cache
derrière chaque boîte aux lettres.

Vous n'avez rien à faire pour cela. Il n'y a aucun réglage, et rien
dans l'app ne s'appelle boîte aux lettres. Ça marche, tout simplement.

<details class="tech">
<summary>Sous le capot</summary>

Une boîte aux lettres par foyer et par GFS, partagée par tous ses
espaces sur ce GFS. Les clés sont dérivées d'une racine de boîte aux
lettres de 32 octets avec HKDF-SHA256 : une clé X25519 vers laquelle
sceller et une clé Ed25519 pour la réclamer. L'identifiant de la boîte
aux lettres est `base32(SHA-256("sh-mbx-v1" ‖ sign_pk))`.
L'identifiant de l'espace n'entre pas dans la dérivation, et deux GFS
voient des boîtes aux lettres sans rapport entre elles. Votre foyer
annonce sa boîte aux lettres sur une **carte de membre** signée avec sa
clé d'identité : un hôte peut donc omettre une carte, mais jamais en
falsifier une. Un foyer n'accepte les messages de boîte aux lettres
que des membres dont il détient la carte.

L'enregistrement (`POST /gfs/mailbox/register`) est anonyme, avec
preuve de possession. La connexion de réclamation (`/gfs/mailbox/ws`)
est distincte de la connexion propre au foyer. Le GFS stocke
l'identifiant de la boîte aux lettres, sa clé épinglée et deux
horodatages arrondis au jour. Il ne stocke ni identifiant de foyer, ni
adresse, ni espace. Les tickets sont des jetons Privacy Pass
(RFC 9576–9578, RSA-2048 aveugle, RFC 9474), au plus 50 par foyer et
par jour, avec une clé d'émetteur par période de 30 jours. Un ticket
cache son foyer parmi tous les foyers qui ont récupéré des tickets sous
la même clé.

</details>

## Chaque membre atteint chaque membre

Avec une boîte aux lettres pour chaque foyer, les membres ne passent
plus par l'hôte pour se joindre :

- **Les publications arrivent pendant que l'hôte est hors ligne.**
  Chaque membre livre directement aux autres, y compris dans les
  espaces privés.
- **Les photos et les longues pages arrivent en un seul morceau.** Les
  foyers derrière un GFS reçoivent les mêmes photos et les mêmes
  longues pages que les foyers jumelés.
- **Un seul envoi, quel que soit le nombre de membres.** Un événement
  de calendrier pour 200 foyers derrière le même GFS part une fois, pas
  200 fois.
- **Les trous se comblent tout seuls.** Si l'hôte ne répond pas, votre
  maison s'adresse plutôt au foyer d'un admin ou d'un modérateur. Une
  photo plus ancienne que vous n'avez jamais reçue est récupérée quand
  vous l'ouvrez. Un nouveau membre reçoit tout de suite les 30 derniers
  jours.
- **Les réactions apparaissent dans chaque foyer.** Vous pouvez laisser
  jusqu'à cinq réactions sur une publication, et tout le monde voit les
  mêmes.

<details class="tech">
<summary>Sous le capot</summary>

Une mise à jour d'espace destinée à de nombreuses boîtes aux lettres
est scellée une seule fois avec une nouvelle clé AES-256-GCM, et cette
clé est enveloppée pour chaque destinataire avec X25519 + HKDF
(`POST /gfs/envelope/multi`, jusqu'à 500 destinataires). Pour 200
foyers, cela fait un envoi de 51 KB au lieu de 1,13 MB. Les éléments
qui dépassent l'enveloppe d'environ 191 KiB voyagent sous forme de
trames binaires complétées à 64/128/256/516 KiB, et les photos partent
en morceaux complets de 512 KiB.

Réparation : si l'hôte reste silencieux pendant 120 s lors d'une
synchronisation, le membre demande à un seul assistant (le foyer d'un
admin ou d'un modérateur). Une photo manquante est d'abord demandée à
l'hôte, puis à un assistant au bout de 60 s ; chaque fichier est
vérifié par rapport à son empreinte. La liste des membres est réparée
par condensat (`rd1-sha256`) au lieu d'être renvoyée à intervalles
réguliers. Un membre dont la maison n'est pas connectée au GFS est
atteint via l'hôte : c'est le seul cas qui nécessite encore que l'hôte
soit en ligne.

</details>

## Publier est toujours anonyme

Quand un membre publie via le GFS, le GFS ne peut pas savoir de quel
foyer vient la publication, ni même quels foyers ont le droit d'écrire.
C'est ainsi que fonctionne chaque espace, sans rien à configurer.

<details class="tech">
<summary>Sous le capot</summary>

Chaque membre publie avec `POST /gfs/member-publish-anon`, autorisé
par une clé d'écriture partagée par époque de clé. Le type extérieur
est toujours `space_item`, complété à 1/4/16/64/128 KiB à l'intérieur
de l'AEAD. Le certificat de rédacteur du membre ne voyage qu'à
l'intérieur du texte chiffré, où les foyers destinataires le
vérifient. Les rédacteurs s'abonnent dans le même lot mélangé que les
abonnés.

</details>

## Les admins peuvent faire vivre l'espace

Les propriétaires d'un espace peuvent désormais activer **Autoriser
les administrateurs à agir pour moi**. Vos admins d'autres foyers
peuvent alors modérer, inviter et publier pendant que votre maison est
hors ligne, y compris les admins qui n'atteignent l'espace que via un
GFS. C'est désactivé par défaut.

Avant que vous nommiez un foyer admin, l'app affiche son **ID du
foyer**. Demandez-leur de vous lire le leur depuis leur page
**Connexions**, pour savoir que ce sont bien eux. Si vous retirez un
admin, sa clé cesse de fonctionner sur chaque GFS où l'espace a été
référencé.

<details class="tech">
<summary>Sous le capot</summary>

Avec l'interrupteur activé, la graine de signature Ed25519 de l'espace
est remise au foyer de chaque admin, scellée pour ce foyer. Vu du GFS,
un admin ressemble à n'importe quel autre rédacteur : le GFS peut
apprendre qu'un espace a des admins délégués, pas quel foyer ils sont.
Retirer un admin fait tourner la clé de l'espace sur chaque GFS, y
compris les GFS dont le référencement a été retiré, et le changement
est confirmé et renvoyé jusqu'à ce que chaque GFS l'ait reçu. Chaque
référencement est signé pour un seul GFS, si bien qu'un GFS ne peut pas
le rejouer auprès d'un autre.

</details>

## Demander à rejoindre un espace global sans jumelage

Vous voyez sur votre GFS un espace global qui vous plaît ? Vous pouvez
désormais demander à le rejoindre tout de suite, sans vous jumeler
d'abord avec son hôte. Le propriétaire voit votre demande marquée
**Via le GFS · non vérifié**, parce que le nom que vous envoyez est
celui que vous avez tapé, pas quelque chose que quelqu'un a vérifié.
Si les demandes s'accumulent, le propriétaire peut toutes les refuser
d'un coup.

## Les abonnés sont des membres qui lisent

Un abonné est désormais simplement un membre avec un rôle en lecture
seule. Les abonnés reçoivent les mêmes publications de la même façon,
et le propriétaire décide avec deux interrupteurs si les abonnés
peuvent commenter ou laisser des réactions. Voter aux sondages reste
réservé aux membres ; les abonnés voient les résultats.

## Ce que le GFS voit encore

Nous préférons vous le dire franchement :

- **Quelles boîtes aux lettres reçoivent une mise à jour d'espace.**
  Quand un membre envoie une même mise à jour à de nombreuses boîtes
  aux lettres en une fois, le GFS voit cette liste de boîtes aux
  lettres, mais pas l'espace, les foyers ni le contenu.
- **Qui suit un espace global.** Les abonnés s'abonnent à l'espace sur
  le GFS, et les rédacteurs se cachent parmi eux.
- **Quels foyers participent à un espace privé** que le propriétaire a
  relié au GFS. Jamais le nom, la clé ni les publications de l'espace.
- **Les adresses réseau.** Un GFS qui journaliserait les adresses
  pourrait relier une boîte aux lettres au foyer qui se connecte depuis
  la même adresse. Le GFS de Social Home ne journalise pas les
  adresses. Si vous [faites tourner un GFS vous-même](/fr/docs/running-a-gfs/),
  gardez-le ainsi.

## Essayez-le

Tout ce qui est décrit ici est dans **Social Home 2026.11.19**. Mettez
à jour votre maison, et le nouveau GFS fait le reste. Envie des
détails ? Lisez [Espaces globaux](/fr/docs/global-spaces/) et
[Modèle de confidentialité](/fr/docs/privacy/).
