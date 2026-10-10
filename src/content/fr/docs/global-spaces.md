---
title: Espaces globaux
description: Des pièces pour les foyers qui ne se connaissent pas encore — les quatre sortes d'espaces, le relais qui transporte les espaces globaux (un relais de confiance, ou le vôtre) et ce qu'il peut voir ou non.
order: 40
---

La plupart des espaces dans Social Home sont partagés entre des
foyers que vous connaissez déjà : la famille, les voisins avec
qui vous êtes jumelé. Mais certaines communautés sont ouvertes
par nature : une place de marché de quartier, un club de course à
l'échelle de la ville, un club de lecture d'œuvres du domaine
public. Pour celles-là, Social Home propose des **espaces
globaux**, et un petit relais, le GFS (Global Federation Server –
le serveur de fédération global), qui aide des foyers qui ne se
sont jamais rencontrés à se trouver. (Un mot nouveau ? Voir
[GFS](/fr/docs/glossary/#gfs) dans le glossaire.)

## Quatre sortes d'espaces

Chaque sorte va un peu plus loin que la précédente :

| Sorte      | Qui peut le trouver                                      | Le GFS le voit-il ?                                           |
| ---------- | -------------------------------------------------------- | -------------------------------------------------------------- |
| **Privé**  | Seulement les personnes que vous invitez                 | Non, sauf si le propriétaire active le GFS pour cet espace     |
| **Foyer**  | Tout votre foyer, automatiquement                        | Non                                                            |
| **Public** | Vos foyers jumelés, sous **Parcourir les espaces**       | Non, sauf si un administrateur le publie à la main sur un GFS  |
| **Global** | Toute personne dont la maison est connectée au même GFS  | **Oui**, il est listé sur chaque GFS que vous utilisez         |

Une règle simplifie tout le reste : **les foyers avec qui vous
êtes jumelé n'ont pas besoin du GFS.** Les publications leur
parviennent directement, ou à travers le maillage des foyers que
vous connaissez tous les deux, quelle que soit la sorte d'espace.
Le GFS n'intervient que pour les foyers avec qui vous _n'êtes
pas_ jumelé (ou comme solution de repli, si vous l'avez activée
pour une connexion et que le chemin direct est coupé).

Un espace **public** reste donc dans votre propre cercle : c'est
un espace que vos foyers jumelés peuvent trouver et demander à
rejoindre, pas un espace que le monde entier peut voir. Un espace
**global** est celui destiné aux inconnus. Le reste de cette page
traite des espaces globaux.

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

1. **C'est un annuaire.** Il liste les espaces globaux qui y sont
   publiés, qui les héberge, comment les rejoindre et, si
   l'espace en a une, une épingle sur la carte arrondie à environ
   11 m. Toute personne connectée à ce GFS peut les trouver sous
   **Parcourir les espaces**.
2. **Il transporte les publications vers les personnes avec qui
   vous n'êtes pas jumelé.** C'est-à-dire les **abonnés**, des
   foyers qui suivent la lecture sans rejoindre l'espace
   (seulement si le propriétaire autorise les abonnés ; c'est
   désactivé par défaut), et les **membres qui ont rejoint avec
   un Lien GFS**. Les membres avec qui vous êtes jumelé reçoivent
   toujours chaque publication directement ou par le maillage.

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

`PUBLIC_SPACE_TIERS = {public, global}` : seules ces deux
portées peuvent relayer du contenu vers un GFS. Un espace global
est publié sur chaque GFS auquel le foyer est connecté dès qu'il
devient global, et retiré de tous dès qu'il cesse de l'être. Un
espace public parvient aux foyers jumelés sous forme d'instantané
`SPACE_DIRECTORY_SYNC` (nom, description, emoji, nombre de
membres, mode d'adhésion), jamais via un GFS ; il n'atteint un
GFS que par le bouton de publication manuelle, et en est retiré
s'il devient privé ou foyer. Les abonnés nécessitent
`allow_subscribers` activé (désactivé par défaut). Les membres
reçoivent toujours les publications par la diffusion ordinaire
aux membres, directe ou par maillage, indépendamment du GFS. Les
enveloppes sont en AES-256-GCM, signées avec Ed25519. Tranches de
padding : 1 / 4 / 16 / 64 / 128 KiB (publication par un membre),
plus 191 KiB pour le relais d'enveloppes. Les destinataires hors
ligne sont mis en file d'attente 24 h, au plus 2000 enveloppes ou
64 MiB par destinataire. Tous les détails sur la page
[modèle de sécurité](/fr/docs/security/#ce-que-voit-un-relais).

</details>

## De confiance ou strict

Pour les publications qui passent bien par le GFS, un espace
fonctionne par défaut en mode **de confiance** (trusted) : le relais apprend quel foyer a publié dans quel
espace, et quand — mais jamais quoi. Pour les communautés où même
cela est de trop, le propriétaire de l'espace peut passer en mode
**strict** : les publications partent sans aucun expéditeur, et
le relais sait seulement que _quelqu'un_ dans l'espace a publié.

<details class="tech">
<summary>Sous le capot</summary>

Deux chemins mènent au GFS. Quand le foyer hôte relaie une
publication, la requête est anonyme — `{space_id, event_type,
payload}` sur une session sans cookie — et n'est envoyée qu'à un
GFS qui a prouvé sa prise en charge d'`anonymous_publish`. Quand
un membre publie pour lui-même, le mode de confiance signe la
requête avec la clé de ce foyer (le GFS apprend donc qui a
publié) ; le mode strict la signe avec une clé d'écriture
partagée, propre à chaque époque et dérivée de la graine de
l'espace, si bien que le GFS ne peut pas distinguer les membres.
Une simple synchronisation des membres ne dit rien au GFS. Dans
les deux modes, le GFS voit toujours l'IP source, l'horodatage,
la tranche de taille et l'ensemble des abonnés.

</details>

## Comment trouver et rejoindre un espace

1. Un foyer rend un espace **global**. Sa maison publie le nom,
   la description, l'image de couverture, la politique d'âge et
   la couleur d'accent sur chaque GFS auquel elle est connectée :
   de quoi le lister, mais **aucun contenu de message**.
2. Toute personne dont la maison est connectée à ce même GFS peut
   le trouver sous **Parcourir les espaces** et demander à le
   rejoindre, ou s'y abonner si le propriétaire autorise les
   abonnés.
3. Que l'adhésion soit accordée dépend du **mode d'adhésion** de
   l'espace : **Ouvert** (n'importe qui peut rejoindre tout de
   suite), **Sur demande** (un administrateur dit oui) ou **Sur
   invitation uniquement**. Les liens d'invitation fonctionnent
   en parallèle dans tous les cas.
4. Une fois membre, les publications vont de votre maison à la
   maison de chaque autre membre : directement ou par le maillage
   pour les foyers avec qui vous êtes jumelé, via le GFS pour les
   abonnés et les membres qui ont rejoint avec un Lien GFS.

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

## Que se passe-t-il si le relais est en panne ?

Les membres avec qui vous êtes jumelé ne remarquent rien : leurs
publications ne sont jamais passées par le GFS. Les abonnés et
les membres qui ont rejoint avec un Lien GFS doivent patienter.
Rien n'est perdu en silence : votre foyer réessaie (après
quelques secondes, puis une demi-minute, puis quelques minutes,
puis toutes les dix) et le relais, une fois revenu, garde encore
jusqu'à une journée d'enveloppes scellées pour les foyers qui
étaient hors ligne. Votre copie locale est enregistrée chez vous
dès que vous appuyez sur Envoyer.

Si votre espace a beaucoup d'abonnés, connecter votre foyer à un
second relais (ou héberger le vôtre) est le remède. Un espace
global est publié sur chaque relais auquel vous êtes connecté, et
les publications destinées aux abonnés partent par chacun d'eux.

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

| Comportement                | Privé / foyer / public                                | Global                                                                            |
| --------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------- |
| Qui peut le trouver         | personnes invitées / votre foyer / foyers jumelés     | toute personne connectée au même GFS                                              |
| Adhésion                    | invitation, appartenance au foyer ou mode d'adhésion  | ouvert / sur demande / sur invitation uniquement, plus les liens d'invitation     |
| Trajet des publications     | directement ou par le maillage                        | pareil pour les membres jumelés ; via le GFS pour les autres                     |
| Ce que voit le relais       | rien (pas de relais, sauf s'il est activé)            | des données de routage et une enveloppe scellée et complétée, jamais le contenu   |
| Chiffrement                 | **toujours actif**                                    | **toujours actif**                                                                |
| Où vivent les messages      | chez chaque membre                                    | chez chaque membre (le relais ne stocke jamais de contenu)                        |
| Si le relais est hors ligne | s. o.                                                 | les abonnés attendent ; les publications réessaient, le relais garde une journée |
| Peut être désactivé         | oui, par vote des administrateurs                     | oui : le rendre non global par vote des administrateurs, et le relais oublie     |

## Confidentialité dans les espaces globaux

Un espace global reste cloisonné du reste de votre foyer. Une
information publiée dans un espace ne déborde jamais dans un
autre, ni dans vos espaces privés, et le relais n'apprend quelque
chose que sur les espaces globaux auxquels vous participez. Ce que
le relais peut voir ou non est détaillé sur les pages
[modèle de confidentialité](/fr/docs/privacy/) et
[modèle de sécurité](/fr/docs/security/).
