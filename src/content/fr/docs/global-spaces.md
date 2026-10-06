---
title: Espaces globaux
description: Des pièces pour les foyers qui ne se connaissent pas encore — espaces publics et globaux, le relais qui les transporte (un relais de confiance, ou le vôtre) et ce qu'il peut voir ou non.
order: 40
---

La plupart des espaces dans Social Home sont privés — réservés
aux foyers invités. Mais certaines communautés sont ouvertes par
nature : une place de marché de quartier, un club de course à
l'échelle de la ville, un club de lecture d'œuvres du domaine
public. Pour celles-là, Social Home propose des espaces
**publics** et **globaux**, et un petit relais — le GFS (Global
Federation Server – le serveur de fédération global) — qui aide
les foyers à se trouver. (Un mot nouveau ? Voir
[GFS](/fr/docs/glossary/#gfs) dans le glossaire.)

## Quatre sortes d'espaces

Avant de vous tourner vers un relais, il vaut la peine de
connaître tout l'éventail. Social Home a quatre portées d'espace,
chacune pour un public un peu plus large :

| Portée     | Visible par                                                                     | Utilise un relais (GFS) ?        |
| ---------- | ------------------------------------------------------------------------------- | -------------------------------- |
| **Privé**  | Les membres que vous invitez explicitement                                      | Optionnel (désactivé par défaut) |
| **Foyer**  | Les membres de votre propre foyer                                               | Non                              |
| **Public** | Affiché sur la carte du GFS — toute personne connectée à ce GFS peut le trouver | **Oui**                          |
| **Global** | Publié dans le monde entier via votre GFS                                       | **Oui**                          |

Les espaces privés et du foyer voyagent directement entre les
foyers concernés. Le propriétaire d'un espace privé peut activer
le GFS pour celui-ci — utile quand les membres ne peuvent pas se
joindre directement — mais il est désactivé tant que vous ne
l'activez pas.

Les espaces publics et globaux passent tous deux par le GFS. Un
espace **public** reçoit une épingle sur la carte du GFS auquel
vous êtes connecté, avec sa position arrondie à environ 11 m,
pour que toute personne sur ce GFS puisse le trouver. Un espace
**global** est publié dans le monde entier via votre GFS. Le
reste de cette page traite de ces deux-là.

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

## Ce qu'est un espace global

Un espace public ou global vit sur un GFS auquel n'importe quel
foyer peut se connecter. Le relais a deux rôles :

1. **C'est une carte et un annuaire.** Il liste les espaces qui y
   ont été publiés, qui les héberge et comment les rejoindre.
2. **C'est le centre de tri des publications.** Une fois membre,
   chaque publication que vous écrivez passe par le relais, qui
   la distribue à tous les autres foyers de cet espace.

Le relais ne voit jamais le _contenu_ de vos publications. Chaque
publication est scellée en sortant de votre maison et n'est
ouverte que dans la maison de chaque membre, à l'arrivée.
L'enveloppe est complétée à l'une de quelques tailles fixes, si
bien que le relais ne peut même pas distinguer un message court
d'un message long. Il ne stocke aucun contenu : si un membre est
hors ligne, il garde ses enveloppes scellées pendant un jour,
puis les laisse partir.

> Voyez le relais comme le bureau de poste d'une communauté
> ouverte. Le bureau de poste voit qu'un colis scellé est parti
> pour le club de lecture, et à peu près combien il pesait — mais
> seuls les membres ont les clés pour l'ouvrir.

<details class="tech">
<summary>Sous le capot</summary>

Les enveloppes sont en AES-256-GCM, signées avec Ed25519 ; les
seuls champs lisibles sont `event_type`, `from_instance`,
`to_instance`, `space_id` et `epoch`. Tranches de padding :
1 / 4 / 16 / 64 / 128 KiB (publication par un membre), plus
191 KiB pour le relais d'enveloppes. Les destinataires hors ligne
sont mis en file d'attente 24 h, au plus 2000 enveloppes ou
64 MiB par destinataire. Tous les détails sur la page
[modèle de sécurité](/fr/docs/security/#ce-que-voit-un-relais).

</details>

## De confiance ou strict

Par défaut, un espace fonctionne en mode **de confiance**
(trusted) : le relais apprend quel foyer a publié dans quel
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

## Comment fonctionnent la découverte et la publication

1. Un foyer crée un espace et le **publie** sur un relais. Le
   relais reçoit le nom de l'espace, sa description, son image de
   couverture, sa politique d'âge, sa couleur d'accent — de quoi
   le placer sur la carte — mais **aucun contenu de message**.
2. Toute personne dont la maison est connectée à ce même relais
   peut parcourir la carte, trouver l'espace et demander à le
   rejoindre.
3. Que l'adhésion soit accordée dépend du **mode d'adhésion** de
   l'espace, choisi par l'hôte : **Ouvert** (n'importe qui peut
   rejoindre tout de suite) ou **Sur demande** (le foyer hôte
   examine et approuve). Les liens d'invitation fonctionnent en
   parallèle dans les deux cas.
4. Une fois membre, les publications de l'espace circulent
   ainsi : `votre maison → relais → la maison de chaque autre
membre`. Le relais est sur le chemin de chaque message et de
   chaque réaction ; il ne s'efface pas après les présentations.

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

Le relais est le centre de tri des espaces publics et globaux ;
tant qu'il est en panne, les publications vers ces espaces
attendent. Rien n'est perdu en silence : votre foyer réessaie —
après quelques secondes, puis une demi-minute, puis quelques
minutes, puis toutes les dix — et le relais, une fois revenu,
garde encore jusqu'à une journée d'enveloppes scellées pour les
membres qui étaient hors ligne. Votre copie locale est
enregistrée chez vous dès que vous appuyez sur Envoyer.

En pratique, cela compte quand :

- Votre relais subit une panne. Les membres qui se parlent _entre
  eux_ dans l'espace ne verront pas les nouvelles publications
  avant son retour.
- Vous dépendez d'un seul relais géré par le projet. Connecter
  votre foyer à un second relais (ou héberger le vôtre) est le
  remède.

Connecter votre espace à **plusieurs relais** est pris en charge
et encouragé pour la résilience. Les publications partent via
chaque relais que vous avez connecté.

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

## Ce qui change par rapport aux autres portées

| Comportement                | Privé / foyer                                | Public / global                                                                                  |
| --------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Visible par                 | membres invités / du foyer uniquement        | sur la carte du relais ; toute personne qui y est connectée peut le trouver                      |
| Adhésion                    | invitation ou appartenance au foyer          | ouvert / sur demande / lien d'invitation — l'hôte choisit pour chaque espace                     |
| Trajet des publications     | direct, de foyer à foyer                     | via le relais vers chaque membre, à chaque fois                                                  |
| Ce que voit le relais       | rien (pas de relais, sauf si vous l'activez) | des données de routage et une enveloppe scellée et complétée — jamais le contenu                 |
| Chiffrement                 | **toujours actif**                           | **toujours actif**                                                                               |
| Où vivent les messages      | chez chaque membre                           | chez chaque membre (le relais ne stocke jamais de contenu)                                       |
| Si le relais est hors ligne | s. o.                                        | les publications attendent et réessaient ; le relais garde une journée d'enveloppes à son retour |
| Visible par les pairs       | membres uniquement                           | membres uniquement — ne fuite jamais vers votre graphe de foyers jumelés                         |
| Peut être désactivé         | oui, par vote des administrateurs            | oui — dépublication par vote des administrateurs ; le relais oublie                              |

## Confidentialité dans les espaces globaux

Les espaces publics et globaux restent cloisonnés du reste de
votre fédération. Ils n'apparaissent pas à vos foyers jumelés,
ils ne sont inclus dans aucune synchronisation au niveau du
foyer, et une information publiée dans un espace ne déborde
jamais dans un autre (ni dans vos espaces privés). L'espace est
une portée délibérée : les membres uniquement, sur le relais que
vous avez choisi. Ce que le relais peut voir ou non est détaillé
sur les pages [modèle de confidentialité](/fr/docs/privacy/) et
[modèle de sécurité](/fr/docs/security/).
