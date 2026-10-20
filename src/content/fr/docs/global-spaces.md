---
title: Espaces globaux
description: Quand vous avez besoin d'un GFS et quand vous n'en avez pas besoin — les quatre sortes d'espaces, comment le propriétaire choisit les GFS qui référencent un espace global, et ce qu'un GFS peut voir ou non.
order: 40
---

La plupart des espaces dans Social Home sont partagés entre des
foyers que vous connaissez déjà : la famille, les voisins avec
qui vous êtes jumelé. Mais certaines communautés sont ouvertes
par nature : une place de marché de quartier, un club de course à
l'échelle de la ville, un club de lecture d'œuvres du domaine
public. Pour celles-là, Social Home propose des **espaces
globaux**, et un petit relais, le GFS (Global Federation Server –
le serveur de fédération global), qui aide des foyers qui ne se
sont jamais rencontrés à se trouver. (Un mot nouveau ? Voir
[GFS](/fr/docs/glossary/#gfs) dans le glossaire.)

## Ai-je besoin d'un GFS ?

**Pas pour les gens que vous connaissez.** Une fois que vous êtes
jumelé avec un foyer, tout ce que vous partagez avec lui va
directement de votre maison à la sienne, ou à travers le maillage
des foyers que vous connaissez tous les deux. Les espaces privés,
foyer et publics fonctionnent tous sans GFS.

Vous avez besoin d'un GFS quand vous voulez joindre des foyers
avec qui vous **n'êtes pas** jumelé :

- **Un espace global** que des inconnus peuvent trouver, suivre
  ou rejoindre.
- **Suivre ou rejoindre** l'espace global de quelqu'un d'autre.
- **Un Lien GFS**, une invitation qui fonctionne sans jumelage
  préalable.
- **Un espace privé** dont les membres ne peuvent pas tous se
  joindre directement. Le propriétaire peut activer le GFS pour
  cet espace.
- **Un filet de sécurité** pour un foyer jumelé, utilisé
  seulement quand le chemin direct échoue. Il est désactivé tant
  que vous ne l'activez pas.

## Quatre sortes d'espaces

Chaque sorte va un peu plus loin que la précédente :

| Sorte      | Qui peut le trouver                                                 | Un GFS le voit-il ?                                          |
| ---------- | ------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Privé**  | Seulement les personnes que vous invitez                            | Non, sauf si le propriétaire active le GFS et choisit lequel |
| **Foyer**  | Tout votre foyer, automatiquement                                   | Jamais                                                       |
| **Public** | Les foyers avec qui vous êtes jumelé, dans **Découvrir**            | Jamais                                                       |
| **Global** | Toute personne qui utilise l'un des GFS choisis par le propriétaire | Seulement les GFS choisis par le propriétaire                |

Un espace **public** reste dans votre propre cercle : vos foyers
jumelés peuvent le trouver et demander à le rejoindre, et il ne
touche jamais un GFS. Pour référencer un espace sur un GFS, vous
le rendez **global**, et le propriétaire choisit les GFS qui le
référencent. Le reste de cette page traite des espaces globaux.

## Les grandes décisions se votent

Deux actions ont trop de conséquences pour qu'une seule personne
les fasse seule : **dissoudre un espace** et **changer sa
portée** — dans un sens comme dans l'autre, plus large ou plus
restreinte. Quand un espace a plus d'un administrateur, chacune
de ces actions devient une _proposition_ au lieu de s'appliquer
immédiatement.

- N'importe quel administrateur peut ouvrir la proposition ; les
  autres votent oui ou non.
- Elle s'exécute dès que **plus de la moitié** des
  administrateurs l'approuvent — le propriétaire compte comme un
  administrateur, comme tout le monde.
- Un seul _non_ l'annule. L'attente aussi : une proposition
  expire au bout de sept jours si elle n'atteint jamais la
  majorité.

Un espace avec un seul administrateur agit toujours
immédiatement — une majorité à un. Mais dès qu'un second
administrateur arrive, plus personne ne peut dissoudre l'espace
ou changer qui le voit tout seul. Les administrateurs des foyers
jumelés votent aussi ; l'hôte compte les voix de tout le monde et
seul le résultat approuvé est diffusé.

Une fois qu'un espace est global, **le choix des GFS qui le
référencent revient au propriétaire seul**, sans vote. Le
propriétaire peut ajouter ou retirer un GFS à tout moment dans les
réglages de l'espace.

## Qui fait quoi dans un espace

Chaque espace a un propriétaire, et le propriétaire peut
distribuer des rôles. Du plus au moins de pouvoir :
**propriétaire**, **administrateur**, **modérateur**, **membre**,
**abonné**. Un abonné lit mais ne publie pas.

Chaque fonction d'un espace — publier, le calendrier, la place de
marché — peut être **ouverte** à tous les membres, **modérée**
(la contribution d'un membre attend dans une file jusqu'à ce
qu'un modérateur ou un administrateur l'approuve), ou **réservée
aux administrateurs**. Les éléments en attente que personne ne
regarde expirent au bout de sept jours.

## Ce que fait le GFS pour un espace global

Un GFS est un relais auquel n'importe quel foyer peut se
connecter. Pour un espace global, il a deux rôles :

1. **C'est un annuaire.** Le propriétaire choisit les GFS qui
   référencent l'espace, jusqu'à huit. Chacun affiche son nom, qui
   l'héberge, comment le rejoindre et, si l'espace en a une, une
   épingle sur la carte arrondie à environ 11 m. Toute personne
   qui utilise l'un de ces GFS peut le trouver sous **Découvrir ›
   Global**.
2. **Il transporte les publications vers les personnes avec qui
   vous n'êtes pas jumelé.** C'est-à-dire les **abonnés**, des
   foyers qui suivent la lecture sans rejoindre l'espace
   (seulement si le propriétaire autorise les abonnés ; c'est
   désactivé par défaut), et les **membres qui ont rejoint avec
   un Lien GFS**. Les membres avec qui vous êtes jumelé reçoivent
   toujours chaque publication directement ou par le maillage.

**Chaque GFS référencé reçoit chaque publication.** Un membre
envoie chaque publication à tous les GFS choisis par le
propriétaire, y compris ceux auxquels son propre foyer ne s'est
jamais connecté. Ainsi, un abonné qui n'utilise que le GFS B voit
quand même ce qu'un membre a publié en étant connecté au GFS A,
même quand l'hôte est hors ligne. Un GFS auquel un membre ne
s'est jamais connecté ne voit que l'adresse internet de ce membre
et le moment où il a publié, jamais de quel foyer il s'agit.

Le relais ne voit jamais le _contenu_ de vos publications. Chaque
publication est scellée en sortant de votre maison et n'est
ouverte que dans la maison de chaque destinataire. L'enveloppe
est complétée à l'une de quelques tailles fixes, si bien que le
relais ne peut même pas distinguer un message court d'un message
long. Il ne stocke aucun contenu : si un foyer est hors ligne, il
garde ses enveloppes scellées pendant un jour, puis les laisse
partir.

> Voyez le relais comme le bureau de poste d'une communauté
> ouverte. Le bureau de poste voit qu'un colis scellé est parti
> pour le club de lecture, et à peu près combien il pesait, mais
> seuls les membres ont les clés pour l'ouvrir.

<details class="tech">
<summary>Sous le capot</summary>

Seul un espace global peut être référencé sur un GFS ; publier un
espace public répond `409 TIER_CHANGE_REQUIRED`. Le choix du
propriétaire (au plus 8) parvient aux membres sous forme d'une
liste signée par le propriétaire (`spaces.gfs_servers`), dans le
`space_meta` chiffré ; un co-administrateur peut la relayer mais
pas la modifier. Quitter la portée globale ou dissoudre l'espace
le retire seulement des GFS qui le référencent. Les espaces
publics parviennent aux foyers jumelés sous forme d'instantané
`SPACE_DIRECTORY_SYNC`, jamais via un GFS. Les membres détiennent
la clé d'écriture de groupe et envoient chaque élément
anonymement à chaque GFS référencé (`member-publish-anon`), sur
une session sans cookie épinglée à l'adresse listée, après que le
GFS a prouvé qu'il détient la clé listée. Les destinataires
dédoublonnent par identifiant d'élément. Les enveloppes sont en
AES-256-GCM, signées avec Ed25519. Tranches de padding : 1 / 4 /
16 / 64 / 128 KiB (publication par un membre), plus 191 KiB pour
le relais d'enveloppes. Les destinataires hors ligne sont mis en
file d'attente 24 h, au plus 2000 enveloppes ou 64 MiB par
destinataire. Tous les détails sur la page
[modèle de sécurité](/fr/docs/security/#ce-que-voit-un-relais).

</details>

## De confiance ou strict

Le propriétaire choisit aussi comment les membres publient via le
GFS.

- **De confiance** (par défaut) : les membres publient
  anonymement, si bien que le GFS ne peut pas savoir quel foyer a
  publié.
- **Strict** : en plus, le GFS ne peut même pas savoir quels
  foyers ont le droit d'écrire. Membres et abonnés se ressemblent
  à ses yeux.

<details class="tech">
<summary>Sous le capot</summary>

Les deux modes remettent à chaque rédacteur la clé d'écriture de
groupe propre à chaque époque, si bien que chaque élément part
anonymement vers chaque GFS référencé. Le relais de l'hôte est
anonyme (`{space_id, event_type, payload}` sur une session sans
cookie). En mode strict, les rédacteurs s'abonnent dans le même
lot mélangé que les abonnés. Dans les deux modes, le GFS voit
toujours l'IP source, l'horodatage, la tranche de taille et
l'ensemble des abonnés, et un GFS ne peut plus bannir par foyer un
rédacteur anonyme (les limites par IP restent ; le propriétaire
révoque un rédacteur en faisant tourner la clé).

</details>

## Comment trouver et rejoindre un espace

1. Le propriétaire rend un espace **global** et choisit les GFS
   qui le référencent. Chacun reçoit le nom, la description,
   l'image de couverture, la politique d'âge et la couleur
   d'accent : de quoi le référencer, mais **aucun contenu de
   message**. Un espace peut aussi être global sans être encore
   référencé nulle part, tant que le propriétaire n'a pas choisi
   de GFS.
2. Toute personne qui utilise l'un de ces GFS peut le trouver
   sous **Découvrir › Global** et demander à le rejoindre, ou
   s'y abonner si le propriétaire autorise les abonnés.
3. Que l'adhésion soit accordée dépend du **mode d'adhésion** de
   l'espace : **Ouvert** (n'importe qui peut rejoindre tout de
   suite), **Sur demande** (un administrateur dit oui) ou **Sur
   invitation uniquement**. Les liens d'invitation fonctionnent
   en parallèle dans tous les cas.
4. Une fois membre, les publications vont de votre maison à la
   maison de chaque autre membre : directement ou par le maillage
   pour les foyers avec qui vous êtes jumelé, via les GFS
   référencés pour tous les autres.

## Deux sortes de liens d'invitation

- Un **Lien GFS** fonctionne pour tout le monde. La personne qui
  l'ouvre n'a pas besoin d'être jumelée avec vous — le GFS fait
  les présentations. Traitez-le comme une clé : quiconque le
  possède peut entrer.
- Un **Lien local** ne fonctionne que pour les foyers auxquels
  vous êtes déjà connecté, et ne touche jamais un GFS.
  Utilisez-le pour l'espace familial ou les trois voisins que
  vous connaissez déjà.

## Le chiffrement est toujours actif

Chaque publication dans chaque espace — public, global ou privé —
est **toujours** scellée en transit. Il n'y a pas d'interrupteur
« chiffré / non chiffré » dans Social Home, et aucun repli vers
un envoi en clair : si un espace ne peut pas sceller, il n'envoie
pas.

Concrètement, cela signifie :

- Le relais ne peut pas lire vos messages, vos photos ni vos
  notes vocales — même si l'opérateur le voulait. Il ne voit que
  l'enveloppe scellée.
- Un nouveau membre qui arrive plus tard ne reçoit que les
  messages publiés après son arrivée. L'historique antérieur
  n'est pas partagé rétroactivement — chaque membre gère ses
  propres sauvegardes localement.
- À chaque changement dans la liste des membres, l'espace reçoit
  une nouvelle clé. Quelqu'un qui est parti ne peut rien lire de
  ce qui a été publié après son départ.

## Que se passe-t-il si un GFS est en panne ?

Les membres avec qui vous êtes jumelé ne remarquent rien : leurs
publications ne sont jamais passées par le GFS. Si l'espace est
référencé sur plus d'un GFS, les abonnés des autres ne remarquent
rien non plus. Seuls les foyers qui dépendent du GFS en panne
doivent patienter. Rien n'est perdu en silence : votre foyer
réessaie (après quelques secondes, puis une demi-minute, puis
quelques minutes, puis toutes les dix) et le GFS, une fois revenu,
garde encore jusqu'à une journée d'enveloppes scellées pour les
foyers qui étaient hors ligne. Votre copie locale est enregistrée
chez vous dès que vous appuyez sur Envoyer.

C'est la meilleure raison de référencer un espace global très
actif sur deux GFS, par exemple celui du projet et un que vous
hébergez vous-même.

<details class="tech">
<summary>Sous le capot</summary>

Délais de nouvelle tentative : 5 s, 30 s, 2 min, 10 min. File
d'attente côté GFS pour les destinataires hors ligne : 24 h,
2000 enveloppes / 64 MiB par destinataire.

</details>

## Se connecter à un relais prêt à l'emploi

Le projet Social Home gère un relais public à l'adresse
**[`gfs.social-home.io`](/fr/servers/)**, avec la politique de
limite d'âge appliquée. Un scan de code QR et vous êtes connecté.

Ou [hébergez le vôtre](/fr/docs/running-a-gfs/) sur n'importe
quel VPS en 15 minutes — utile pour une communauté privée, un
relais propre à un foyer, ou comme seconde connexion pour la
résilience.

## Héberger un relais

Un relais est un petit serveur Python (open source sous licence
MPL 2.0). Vous pouvez en héberger un pour votre quartier, votre
ville ou une communauté particulière. Voir
[Héberger un relais vous-même](/fr/docs/running-a-gfs/) pour un
guide Docker Compose + Cloudflare.

## Côte à côte

| Comportement             | Privé / foyer / public                               | Global                                                                                               |
| ------------------------ | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Qui peut le trouver      | personnes invitées / votre foyer / foyers jumelés    | toute personne qui utilise l'un des GFS choisis par le propriétaire                                  |
| Adhésion                 | invitation, appartenance au foyer ou mode d'adhésion | ouvert / sur demande / sur invitation uniquement, plus les liens d'invitation                        |
| Trajet des publications  | directement ou par le maillage                       | pareil pour les membres jumelés ; via chaque GFS référencé pour les autres                           |
| Ce que voit un GFS       | rien (sauf si un espace privé l'active)              | des données de routage et une enveloppe scellée et complétée, jamais le contenu                      |
| Chiffrement              | **toujours actif**                                   | **toujours actif**                                                                                   |
| Où vivent les messages   | chez chaque membre                                   | chez chaque membre (un GFS ne stocke jamais de contenu)                                              |
| Si un GFS est hors ligne | s. o.                                                | les autres GFS référencés continuent ; les publications réessaient                                   |
| Peut être désactivé      | oui, par vote des administrateurs                    | retirer un GFS à tout moment (propriétaire), ou quitter la portée globale (vote des administrateurs) |

## Confidentialité dans les espaces globaux

Un espace global reste cloisonné du reste de votre foyer. Une
information publiée dans un espace ne déborde jamais dans un
autre, ni dans vos espaces privés, et un GFS n'apprend quelque chose
que sur les espaces globaux qu'il référence. Ce que
le relais peut voir ou non est détaillé sur les pages
[modèle de confidentialité](/fr/docs/privacy/) et
[modèle de sécurité](/fr/docs/security/).
