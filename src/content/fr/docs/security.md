---
title: Modèle de sécurité
description: Ce qui est scellé, ce qui est signé, ce que le relais peut encore voir — et ce que nous n'avons pas encore résolu.
order: 55
---

Cette page est le jumeau en langage simple des
[principes](https://github.com/social-home-io/socialhome/blob/main/docs/principles.md)
du projet : chaque garantie ci-dessous est d'abord écrite pour la
personne qui gère le foyer, puis — dans les blocs « Sous le capot »
— pour la personne qui veut la vérifier dans le code. Si un mot est
nouveau, il est dans [Les mots que nous
utilisons](/fr/docs/glossary/).

## Une seule règle, énoncée honnêtement

Rien ne quitte votre foyer en clair. La liste de courses, la
discussion du club de lecture, la photo du dîner, le rendez-vous
chez le dentiste — tout est scellé avant de quitter votre maison et
n'est ouvert que dans la maison à laquelle c'était destiné.

La règle concerne le réseau et chaque machine entre les deux : le
relais, le réseau, et les serveurs d'autres membres qui font passer
une publication.

<details class="tech">
<summary>Sous le capot</summary>

Le chiffrement est de serveur à serveur : le serveur de votre foyer
scelle, le serveur du foyer destinataire ouvre. Il n'y a pas de clé
par appareil et aucune prétention de secret d'appareil à appareil.

</details>

## Contre qui cela vous protège

| Quelqu'un qui…                                   | …obtient                                                                                                                |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| fait tourner le GFS que vous utilisez            | des enveloppes scellées, des données de routage et des horaires — jamais un mot de contenu                              |
| observe le réseau                                | du trafic scellé et rembourré entre des adresses connues                                                                |
| a été retiré d'un espace                         | rien de ce qui a été publié après son départ — l'espace a reçu une nouvelle clé                                         |
| trouve un lien d'invitation égaré                | l'entrée dans l'espace, si c'était un Lien GFS — traitez-les comme des clés ; un Lien local ne sert à rien à un inconnu |
| a les droits root sur le serveur de votre maison | tout — c'est votre serveur ; protégez-le comme le reste de votre réseau domestique                                      |
| est admin d'un espace où vous êtes               | tout ce qui est dans cet espace, comme n'importe quel membre — les admins ne sont pas une porte dérobée                 |

Les deux dernières lignes sont les lignes honnêtes : Social Home
protège votre foyer de l'extérieur, pas de lui-même.

## Chiffré de maison à maison

Chaque message, publication et événement de calendrier est scellé
dans une enveloppe chez vous et signé, pour que le foyer
destinataire puisse vérifier que cela vient bien de vous et que
personne ne l'a modifié en chemin. Les messages privés fonctionnent
de la même façon : scellés de votre maison à la leur.

<details class="tech">
<summary>Sous le capot</summary>

- Enveloppes : AES-256-GCM. Signatures : Ed25519 sur l'enveloppe.
- Le seul texte en clair sur le réseau : `event_type`,
  `from_instance`, `to_instance`, `space_id`, `epoch`.

</details>

## En cas de doute, rien ne part

Fail-closed : il n'y a pas d'interrupteur « chiffré / non chiffré »
et aucun repli vers un envoi en clair. Si un espace ne peut pas
être scellé, le message reste à la maison. Une enveloppe avec une
mauvaise signature, ou qui arrive beaucoup trop tard, est rejetée —
sans exception, sans mode « faisons quand même confiance à
celle-ci ».

<details class="tech">
<summary>Sous le capot</summary>

- Aucun repli en clair ; aucun mode d'instance de confiance.
- Fenêtre d'horodatage ±300 s ; cache anti-rejeu 24 h.
- Tout échec de signature rejette l'enveloppe avant toute analyse
  plus poussée.

</details>

## Clés et rotation

Votre foyer reçoit sa propre clé d'identité la première fois qu'il
démarre. Quand vous vous jumelez avec un autre foyer, vous convenez
tous deux d'un secret partagé via un QR code ou un code court
dicté, pour que personne ne puisse se glisser entre vous.

Chaque espace a sa propre clé, et cette clé change à chaque fois
que les membres changent. Quand quelqu'un quitte le club de
lecture, le club reçoit une nouvelle clé ; cette personne ne peut
rien lire de ce qui est publié ensuite. Quand un admin est retiré,
la clé qui signe les décisions des admins change aussi.

Les clés sur votre disque sont enveloppées sous une clé maîtresse.
Si vous avez installé le module complémentaire, elles voyagent
avec votre sauvegarde Home Assistant habituelle ; sur une
installation autonome, vous téléchargez un kit de récupération
(Recovery Kit) et le gardez en lieu sûr.

<details class="tech">
<summary>Sous le capot</summary>

- Identité : Ed25519. Signatures hybrides Ed25519 + ML-DSA-65 en
  option (nécessite liboqs).
- Jumelage : X25519 + HKDF-SHA256, authentifié par le code dicté.
- Contenu des espaces : clé AES-256-GCM par époque, renouvelée à
  chaque changement de membres. Clé d'autorité renouvelée à la
  révocation d'un admin.
- Au repos : clés enveloppées sous une KEK (clé de chiffrement de
  clés). Recovery Kit `.shrk` = scrypt + AES-256-GCM, pour les
  installations autonomes ; la sauvegarde Home Assistant couvre les
  installations en module complémentaire.
- Résiduel : l'échange de clés est uniquement X25519 — pas encore
  post-quantique. Les signatures hybrides ne rendent pas l'échange
  de clés post-quantique.

</details>

## Ce que voit un relais

Le GFS (Global Federation Server) — le relais qui aide les foyers à
se trouver — transporte les publications d'un espace global vers
les foyers avec qui vous n'êtes pas jumelé : les abonnés, et les
membres qui ont rejoint avec un Lien GFS. Les foyers jumelés les
reçoivent directement ou par le maillage. Il transporte des
enveloppes scellées, rembourrées à quelques tailles fixes, et les
distribue. Il ne
stocke aucun contenu : si un foyer est hors ligne, il garde les
enveloppes scellées pendant une journée, puis les abandonne. Voir
[GFS](/fr/docs/glossary/#gfs) dans le glossaire.

| Mode                         | Ce que le relais apprend                                                                             |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Confiance** (par défaut)   | quel foyer a publié dans quel espace listé, à quelle époque de clé, et quand                         |
| **Strict** (sur activation)  | que _quelqu'un_ dans l'espace a publié — l'expéditeur est anonyme parmi les rédacteurs de l'espace   |
| **Espace privé, GFS activé** | quels foyers appartiennent au canal — jamais le nom, l'identifiant, la clé ou le contenu de l'espace |

Dans tous les modes, le relais voit encore l'adresse IP de
l'expéditeur, les horaires, la classe de taille et quels foyers
reçoivent les publications d'un espace. Une simple synchronisation
des membres ne dit rien au GFS.

<details class="tech">
<summary>Sous le capot</summary>

- Métadonnées de routage uniquement : `space_id`, `event_type`,
  classe de taille, horaires, ensemble des abonnés, IP source.
- Quand le foyer hôte relaie une publication, la requête ne nomme
  aucun foyer : `{space_id, event_type, payload}` sur une session
  sans cookie, et seulement vers un GFS qui a prouvé
  `anonymous_publish` — sinon rien n'est envoyé.
- Quand un membre publie pour lui-même (pour que l'hôte n'ait pas
  besoin d'être en ligne), le mode de confiance signe la requête
  avec la clé de ce foyer ; le mode strict la signe à la place avec
  une clé d'écriture partagée par époque, de sorte que le GFS ne
  peut pas dire quel membre a publié.
- Espaces privés : `private_gfs` désactivé par défaut ; une fois
  activé, un identifiant de canal opaque de 128 bits.
- Classes de rembourrage : 1 / 4 / 16 / 64 / 128 KiB pour les
  publications de membres, plus une classe de 191 KiB pour le
  relais d'enveloppes.
- Destinataires hors ligne : mis en file 24 h, au plus
  2000 enveloppes ou 64 MiB par destinataire. Votre foyer réessaie
  avec un délai croissant : 5 s, 30 s, 2 min, 10 min.

</details>

## Maillage et appels

Si deux foyers membres ne peuvent pas se joindre directement, une
publication peut passer par les serveurs d'autres membres. Chaque
saut est scellé pour le destinataire final, de sorte que les
serveurs intermédiaires la transportent mais ne peuvent pas
l'ouvrir.

Les appels audio et vidéo passent directement entre les
participants. Quand une connexion directe est impossible, un
serveur TURN — un relais réservé aux appels — fait passer le flux,
et il ne voit jamais que des médias chiffrés.

<details class="tech">
<summary>Sous le capot</summary>

- Transfert `SPACE_ROUTED` : trois sauts au maximum, scellé pour
  une clé X25519 éphémère du destinataire.
- Appels : WebRTC avec DTLS-SRTP entre les participants ; un repli
  TURN ne relaie que du texte chiffré.

</details>

## Apps

Les apps du catalogue tournent dans une boîte scellée à l'intérieur
de Social Home. Une app ne peut pas téléphoner à la maison, ne peut
rien charger depuis Internet, et ne peut pas être remplacée par une
autre version dans votre dos. Les apps voyagent directement entre
les foyers ; le GFS n'intervient pas.

<details class="tech">
<summary>Sous le capot</summary>

- Bundles épinglés par sha256 ; 1 MiB maximum.
- Iframe isolée (`allow-scripts` uniquement) avec
  `connect-src 'none'`.
- Distribuées en pair à pair entre foyers jumelés.

</details>

## Les petits détails

- Un espace épinglé sur la carte du GFS a sa position arrondie à
  environ 11 m — la rue, pas la porte d'entrée.
- Les publications ne peuvent pas charger d'images depuis d'autres
  sites web, donc personne ne peut planter un pixel de suivi dans
  votre fil.
- Les aperçus de liens sont récupérés uniquement par le foyer de
  l'auteur, jamais par chaque lecteur. Un admin du foyer peut les
  désactiver.
- Les notifications push ne portent que le titre ; le contenu
  attend que vous ouvriez l'app.
- Les comptes protégés pour les mineurs sont refusés d'emblée dans
  le Bazar, les espaces publics, les moments publics, les liens
  publics de highlights et les jetons d'API — voir
  [Sécurité familiale](/fr/docs/family-safety/).

<details class="tech">
<summary>Sous le capot</summary>

- GPS tronqué à 4 décimales (~11 m).
- La CSP `img-src 'self' data: blob:` bloque les images externes
  dans le contenu des utilisateurs.
- Aperçus de liens : récupérés par le foyer de l'auteur, protégés
  contre les SSRF, désactivables par un admin.
- Les réponses de l'API et des WebSockets sont réduites à ce dont
  la vue a besoin.
- `min_age` est vérifié sur chaque chemin qui fait entrer un
  membre.

</details>

## Comment nous nous assurons que cela reste vrai

Chaque règle de cette page est couverte par des tests, et ces tests
s'exécutent avant chaque version. Si l'un d'eux échoue, la version
ne sort pas — il n'y a pas de « on corrigera la prochaine fois ».
Les changements au code sensible pour la sécurité reçoivent une
seconde relecture, délibérément adverse, et chaque changement à un
principe reçoit une signature datée dans le fichier des principes,
avec ce qu'il laisse non résolu écrit juste à côté.

Ce que nous n'avons pas encore : l'analyse automatisée des
dépendances tierces. C'est sur la liste, pas dans le pipeline.

<details class="tech">
<summary>Sous le capot</summary>

- 68 fichiers de tests du protocole étiquetés `security` ; ils
  bloquent une version indépendamment des chiffres de couverture.
- CI : pytest avec 90 % de couverture des branches, les tests de
  sécurité en étape séparée, ruff, mypy, eslint, tsc, vitest.
- Les signatures vivent dans
  [`docs/principles.md`](https://github.com/social-home-io/socialhome/blob/main/docs/principles.md).
- Pas encore de CodeQL, de bandit ni d'analyse des dépendances.

</details>

## Risques résiduels connus

Ce qui est vrai aujourd'hui et que vous devriez savoir avant de
nous confier la discussion de groupe :

- En mode de confiance, le relais apprend quel foyer a publié dans
  quel espace, et quand.
- Dans tous les modes, le relais voit votre adresse IP, les
  horaires et la classe de taille de chaque enveloppe, et quels
  foyers reçoivent les publications d'un espace.
- L'échange de clés n'est pas encore post-quantique ; seules les
  signatures ont une variante post-quantique en option.
- Il n'y a pas encore d'analyse automatisée des dépendances.

## Signaler un problème

Si vous trouvez une faille, merci de nous le dire en privé plutôt
que dans une issue publique : ouvrez un rapport sous
[GitHub Security Advisories](https://github.com/social-home-io/socialhome/security)
dans le dépôt `social-home-io/socialhome`.
