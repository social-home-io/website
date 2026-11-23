---
title: Comment ça marche
description: Une visite en langage simple de ce que fait Social Home, de ce qui reste sur votre serveur et de la façon dont les foyers se connectent — sans aucun jargon de protocole.
order: 20
---

Social Home donne à votre maison le système d'exploitation du
foyer que votre téléphone n'a jamais réussi à être : calendriers
partagés, liste de courses en direct, photos, notes vocales,
présence et discussions — le tout sur du matériel que vous
possédez déjà. Il permet aussi à votre foyer de se connecter à
d'autres foyers, comme vous ajouteriez un ami sur n'importe quel
autre réseau, sauf que les données de personne ne passent par une
entreprise au milieu.

Cette page passe en revue ce que vous pouvez concrètement en
faire. Pas d'acronymes dans le texte principal ; le détail
technique se trouve dans les blocs « Sous le capot », et les mots
sont expliqués dans
[Les mots que nous utilisons](/fr/docs/glossary/).

## Que puis-je en faire ?

Restez en contact avec les personnes qui comptent — sans confier
vos données à qui que ce soit d'autre. Voici ce que Social Home
vous permet de faire, vous et votre foyer :

- **📸 Partagez une photo du dîner** sur le fil de votre foyer.
  Votre partenaire la voit instantanément sur son téléphone, vos
  colocataires peuvent réagir et commenter — sans qu'elle passe
  par le moindre service cloud.
- **🗓 Voyez le calendrier de tout le monde au même endroit.**
  Votre calendrier personnel, l'emploi du temps de votre
  colocataire et le calendrier partagé « Maison » se superposent
  dans une seule vue codée par couleur. Les événements restent
  sur votre serveur.
- **🛒 Lancez « Je suis au supermarché — il faut quelque chose ? »**
  La liste de courses de votre foyer est en direct. Quelqu'un
  ajoute du lait, vous le voyez avant d'arriver à la caisse.
  Demandez à votre assistant vocal de l'ajouter à la voix.
- **🔔 Sachez qui est à la maison** sans demander. Un discret
  indicateur de présence montre qui est là en ce moment — pas de
  suivi de position, pas d'historique, juste l'instant présent.
- **✅ Répartissez les corvées au lieu de harceler.** Des listes
  de tâches avec responsables, échéances et un badge « en
  retard ». Percer l'étagère ce week-end ; recycler le vieux
  frigo aujourd'hui ; tout le monde voit qui s'occupe de quoi.
- **📒 Gardez le manuel de la maison au même endroit.** Les
  Pages sont des entrées de wiki en Markdown qui vivent dans un
  espace — comment purger les radiateurs, où noter les relevés de
  compteur, les consignes pour la baby-sitter. Elles se
  synchronisent sur tous les appareils du foyer.
- **📝 Des Stickies pour ce qui ne mérite pas une
  page.** Des notes colorées, modifiables d'un tap, épinglées sur
  le canevas d'un espace — l'aimant de frigo moderne. Les
  carottes dans le bac du bas ; des idées de cadeau
  d'anniversaire ; la liste de courses pour réparer la sonnette.
- **💬 Écrivez à votre famille à l'autre bout du monde** — scellé
  de votre maison à la leur, sans cloud entre les deux. Pas de
  numéro de téléphone. Pas de compte chez un service tiers.
- **📞 Appelez sans inconnu au milieu** — appels audio et vidéo,
  en tête-à-tête ou en groupe, directement depuis vos messages
  privés et vos discussions de groupe. L'audio et la vidéo
  circulent directement entre les participants ; si une connexion
  directe est impossible, un relais fait transiter le flux, mais
  ne voit jamais que des médias chiffrés.
- **🏘 Construisez votre propre communauté, à votre façon** —
  créez un espace pour n'importe quel groupe : votre rue, votre
  immeuble, votre équipe de sport ou votre club de bricolage.
  Organisez un barbecue de quartier, animez un club de lecture —
  dans un lieu privé qu'aucune grande entreprise tech ne peut
  lire, monétiser ou fermer. Chacun garde son propre serveur.
- **🔨 Tenez une place de marché** — proposez ce que vous voulez
  donner ou vendre à des gens que vous connaissez déjà. Pas
  d'inconnus, pas de frais de plateforme.
- **🎙 Transcrivez une note vocale** depuis un micro de la maison
  et publiez-la sur le fil — pratique quand vous avez les mains
  prises.

<details class="tech">
<summary>Sous le capot</summary>

Les appels utilisent WebRTC avec DTLS-SRTP entre les
participants ; un repli TURN ne relaie que du texte chiffré. Les
messages privés sont chiffrés de serveur à serveur (enveloppes
AES-256-GCM, signatures Ed25519).

</details>

## Vos données restent les vôtres

Tout ce que Social Home sait vit chez vous, sur votre propre
serveur. Les photos, les messages, la liste de courses, les
entrées du calendrier — tout tient dans une petite base de
données sur votre machine. Pas de compte cloud, pas d'analytique,
pas de réseau publicitaire, pas de journal distant qui écoute ce
que dit votre foyer. Si votre connexion internet tombe, les
fonctions du foyer continuent de marcher sur votre réseau local ;
la seule chose qui s'interrompt, c'est la messagerie _en dehors_
de la maison.

<details class="tech">
<summary>Sous le capot</summary>

Si vous utilisez la Home Assistant App, il fait partie de
votre sauvegarde Home Assistant habituelle ; les installations Docker et Python reçoivent un kit de récupération (`.shrk`, scrypt +
AES-256-GCM) pour les clés.

</details>

## Se connecter à d'autres foyers

Vous connectez deux maisons en scannant un code QR — dans
l'application, cela s'appelle le **jumelage**. Ensuite, les deux
serveurs se connaissent et peuvent faire circuler entre eux des
messages privés et des espaces partagés. Le code QR contient une
clé publique — comme une carte d'identité numérique — qui permet
à l'autre partie de vérifier que c'est toujours vous, même si
votre adresse change plus tard.

Ce que vous partagez avec un foyer jumelé : votre nom
d'affichage, votre avatar et les espaces que vous rejoignez
ensemble.

Ce que vous ne partagez jamais : mots de passe, e-mails,
historique de position, ni rien de ce qui vit dans un espace que
vous n'avez pas tous les deux rejoint.

<details class="tech">
<summary>Sous le capot</summary>

Chaque foyer génère une clé d'identité Ed25519 au premier
démarrage. Le jumelage repose sur X25519 + HKDF-SHA256,
authentifié par le code QR ou un court code lu à voix haute. La
signature de chaque enveloppe entrante est vérifiée par rapport
au jumelage ; une mauvaise signature est rejetée, et il n'existe
aucun mode « instance de confiance » pour contourner cela.

</details>

## Les espaces — des pièces partagées pour n'importe quel groupe

Un espace, c'est un fil, une discussion et un calendrier partagés
pour n'importe quel groupe de personnes, réparties sur autant de
foyers que vous voulez. Par exemple :

- **Famille** — les personnes de votre maison, plus les parents
  et les frères et sœurs dans leur propre maison.
- **Eichenstrasse 3–17** — votre immeuble. Chacun fait tourner
  son propre serveur ; l'espace est le panneau d'affichage commun.
- **Club de lecture**, **groupe d'escalade**, **atelier de
  makers** — les groupes récurrents qui existent déjà dans votre
  vie, mais sur aucune plateforme digne de confiance.

C'est vous qui décidez qui voit un espace. C'est vous qui décidez
quels foyers sont invités. Chaque espace a un foyer hôte — celui
qui l'a créé et qui tient la liste des membres — mais les membres
publient directement les uns vers les autres, et les grandes
décisions (qui peut le voir, s'il existe encore) sont prises par
tous ses administrateurs ensemble. Si le propriétaire l'autorise,
les administrateurs d'autres foyers peuvent aussi agir pendant que
l'hôte est hors ligne.

## Espaces publics et globaux

Certains espaces sont privés, réservés aux foyers invités. Un
espace _public_ est un espace que vos foyers jumelés peuvent
trouver et demander à rejoindre ; il reste dans votre propre
cercle. Un espace _global_ — une place de marché publique, une
communauté autour d'un loisir, le panneau d'affichage de votre
quartier — s'adresse aussi aux inconnus : le propriétaire choisit
un ou plusieurs relais légers, des GFS (Global Federation Server –
serveur de fédération global), qui le référencent pour que des
foyers qui ne se connaissent pas puissent le trouver (voir
[GFS](/fr/docs/glossary/#gfs)).

Les foyers jumelés reçoivent toujours les publications d'un
espace directement ou par le maillage. Le relais ne transporte
les publications que vers les foyers avec qui vous n'êtes pas
jumelé — les abonnés, les membres qui ont rejoint avec un Lien
GFS, et les foyers qui ont demandé à rejoindre l'espace par son
intermédiaire — sous forme d'enveloppes scellées et complétées à
taille fixe, chacune dans la boîte aux lettres anonyme de ce foyer.
Chaque GFS référencé reçoit chaque publication. Il ne
peut pas en lire un mot, et les membres publient anonymement.
Plus de détails dans
[Espaces globaux](/fr/docs/global-spaces/).

<details class="tech">
<summary>Sous le capot</summary>

Seul un espace global est référencé sur un GFS, et seulement sur
les GFS de sa liste `gfs_servers` signée par le propriétaire (au
plus 8). Les espaces publics parviennent aux foyers jumelés sous
forme d'instantané `SPACE_DIRECTORY_SYNC` et ne touchent jamais un
GFS. Les membres publient anonymement sur chaque GFS référencé. Le GFS ne
voit que des
métadonnées de routage (`space_id`, `event_type`, tranche de
taille, horodatage, ensemble des abonnés, IP source) ; les
publications sont toujours anonymes, signées avec une clé
d'écriture partagée par époque. Les foyers atteints via un GFS ont
une boîte aux lettres anonyme par GFS. Les enveloppes scellées
attendent jusqu'à 24 h ; les photos chiffrées sont mises en cache
jusqu'à 3 jours (réglage de l'exploitant, au plus 7). Rien d'autre
n'est stocké.

</details>

## Conçu pour tenir bon

Social Home n'a pas de centre. Chaque foyer est son propre serveur,
à la maison, et garde une copie complète des espaces auxquels il
participe. Les foyers avec qui vous êtes jumelé se parlent
directement. Les GFS transportent les publications scellées vers les
foyers avec qui vous n'êtes pas jumelé, et un espace peut en utiliser
jusqu'à huit. Il n'y a donc aucune machine dont la panne ferait tomber
le réseau, et aucun endroit unique où tout pourrait être lu.

<figure class="map">
  <img src="/docs/how-it-works/network-map-fr.webp" alt="Une carte du monde avec des foyers répartis en Europe, dans les Amériques, en Afrique, en Asie et en Australie. Des lignes vertes continues relient directement les foyers jumelés. Des lignes en pointillés mènent d'autres foyers à trois GFS, un dans le nord de l'Europe, un en Amérique du Nord et un en Asie du Sud-Est. Le GFS asiatique est grisé et barré d'une croix, et des flèches rouges en tirets montrent ses foyers qui passent au GFS européen. Un foyer en Grèce est estompé, avec une lune : l'hôte est hors ligne, et les autres foyers continuent." width="1600" height="890" loading="lazy">
  <figcaption>Les foyers jumelés se parlent directement. Les GFS transportent les publications scellées vers les autres. Quand un GFS ou un hôte est absent, les autres continuent.</figcaption>
</figure>

Ce qui se passe quand quelque chose tombe en panne :

- **Votre connexion internet est coupée.** Votre foyer continue de
  fonctionner sur le réseau de votre maison : calendrier, listes,
  discussion à la maison. Ce que vous publiez pour d'autres foyers
  attend chez vous et part dès votre retour en ligne.
- **Un autre foyer est hors ligne.** Personne d'autre ne le remarque.
  À son retour, il rattrape ce qui manque auprès de n'importe quel
  membre de chaque espace, pas seulement de l'hôte.
- **L'hôte d'un espace est hors ligne.** Les membres continuent de
  publier les uns pour les autres. N'importe quel membre peut
  compléter ce qu'un autre a manqué, et si le propriétaire
  l'autorise, les admins d'autres foyers peuvent continuer à gérer
  l'espace.
- **Un GFS tombe en panne.** Les foyers jumelés ne remarquent rien.
  Les espaces référencés sur plusieurs GFS continuent par les autres,
  et après une dizaine de minutes, les foyers passent à un autre GFS
  auquel ils sont connectés. Les publications scellées attendent
  jusqu'à un jour les foyers qui étaient absents.
- **L'exploitant d'un GFS n'est pas digne de confiance.** Il ne peut
  ni lire une publication, ni savoir qui l'a écrite, ni en falsifier
  ou en modifier une : chaque publication est signée par le foyer qui
  l'a écrite et vérifiée à l'arrivée. Votre identité et vos
  publications vivent chez vous ; vous vous connectez donc à un autre
  GFS et vous continuez.
- **Le projet Social Home disparaît.** Votre maison continue de
  fonctionner. Le GFS est open source, tout le monde peut en faire
  tourner un, et les foyers peuvent se connecter à n'importe quel GFS
  qui les accepte.

<details class="tech">
<summary>Sous le capot</summary>

Chaque foyer stocke ses espaces dans sa propre base de données et
signe ce qu'il envoie avec sa clé d'identité Ed25519 ; les actions
d'administration d'un espace sont signées avec la clé d'autorité de
l'espace. Les publications sont scellées en AES-256-GCM avec une clé
propre à l'espace, renouvelée dès que quelqu'un part. La livraison
réessaie avec un délai croissant (5 s, 30 s, 2 min, 10 min) et le GFS
garde les enveloppes scellées en file d'attente pendant 24 h. Les
membres rattrapent leur retard en se comparant à une **page de
synchronisation** signée (256 empreintes de compartiments sur les
lignes de l'espace) et n'acceptent les lignes d'un membre que si la
page les garantit. La boîte aux lettres d'un foyer passe à un autre
GFS référencé quand la sienne reste en panne 10 minutes. Risques
résiduels : un GFS voit les adresses internet, les horaires et les
tailles ; un membre qu'aucun GFS de l'espace n'atteint est atteint
par l'hôte ; les liens publics vers un highlight s'ouvrent dans une
visionneuse hébergée sur GitHub Pages. La liste complète se trouve
sur la page [Modèle de sécurité](/fr/docs/security/).

</details>

## En quoi c'est différent des autres réseaux décentralisés

Dans beaucoup de réseaux décentralisés, la décentralisation s'arrête
au serveur. Quelqu'un fait tourner un serveur, des gens y créent un
compte, et les serveurs se parlent entre eux. Le réseau est ainsi
réparti sur de nombreux serveurs, mais chaque personne dépend
toujours de l'un d'eux : s'il tombe en panne, ses utilisateurs sont
hors ligne ; si son exploitant le ferme, leurs comptes et leur
historique disparaissent avec lui ; et l'exploitant peut lire ce qui
y est stocké, sauf si l'app le scelle pour ses destinataires.

Social Home pousse la décentralisation un cran plus loin, jusqu'à
chaque foyer. Le serveur, c'est votre maison. Votre compte, vos clés
et votre copie de chaque espace y vivent, et nulle part ailleurs. Les
relais entre les foyers, les GFS, sont des aides, pas des maisons :
ils ne détiennent rien qu'ils puissent lire, ne peuvent pas parler en
votre nom, et peuvent être remplacés.

|                                 | Fédération par serveurs                                   | Social Home                                                           |
| ------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------- |
| Où vit votre compte             | sur le serveur de quelqu'un d'autre                       | dans votre maison                                                     |
| Qui peut lire ce qui est stocké | l'exploitant du serveur, sauf si c'est scellé             | votre foyer, et les membres d'un espace pour cet espace               |
| Si un serveur tombe en panne    | tous ceux qui y ont un compte sont hors ligne             | seul ce foyer-là l'est ; les autres continuent                        |
| Si un exploitant arrête         | les comptes et l'historique disparaissent avec lui        | un GFS ne détenait rien qu'il puisse lire ; connectez-vous à un autre |
| Changer de serveur              | déplacer votre compte, si les deux serveurs le permettent | se connecter à un autre GFS ; votre maison reste où elle est          |

Le compromis est assumé : votre maison doit être allumée pour que les
autres puissent la joindre directement, et un foyer éteint pendant un
moment rattrape ce qui manque à son retour. C'est à cela que sert la
Home Assistant App : elle fait tourner Social Home sur une machine qui
reste allumée de toute façon.

## Liens publics vers un Highlight

Le même genre de relais a aussi un second rôle : transmettre un
seul highlight à des personnes hors de Social Home. Quand vous
publiez un lien de highlight, votre foyer crée un lien vers la
[visionneuse Social Home](/fr/docs/glossary/#visionneuse) — une page
qu'aucun relais ne sert — que tout le monde peut ouvrir dans un
navigateur. Les octets du highlight vont directement de votre maison
au navigateur du visiteur, scellés pour que seul ce navigateur puisse
les ouvrir. Si ce chemin direct ne peut pas s'établir, le relais fait
passer les images scellées seulement tant que vous êtes en ligne, et
n'en stocke aucune. Voir
[Highlights](/fr/docs/highlights/#partager-publiquement-via-un-serveur-global)
pour le parcours côté auteur.

<details class="tech">
<summary>Sous le capot</summary>

WebRTC en direct de la maison de l'auteur vers le navigateur ; relais
HTTP en repli seulement tant que l'auteur est en ligne. Chaque image
est scellée pour la clé éphémère de la visionneuse et le secret du
lien dans le fragment de l'URL. Aucun octet de highlight n'est stocké
sur le GFS, et le GFS ne sert aucun code de la visionneuse.

</details>

## Le chiffrement, toujours actif

Chaque message qui quitte votre serveur est scellé dans une
enveloppe que seuls les foyers destinataires peuvent ouvrir —
toujours, sans interrupteur pour le désactiver et sans repli en
clair. Même le relais ne peut pas voir à l'intérieur. Imaginez
une enveloppe dont seules les personnes sur la liste des invités
ont la clé — la poste l'achemine, mais ne l'ouvre jamais. La page
[modèle de sécurité](/fr/docs/security/) dit exactement ce que
cela couvre et ne couvre pas.

## La confidentialité en un coup d'œil

- ✅ Chaque message chiffré sur le réseau — toujours actif, sans
  possibilité de désactiver
- ✅ Pas de pub, pas de pistage, pas d'analytique
- ✅ Le GPS est activé sur demande, appareil par appareil
- ✅ Votre serveur, vos règles
- ✅ Open source sous licence MPL 2.0

## Comment fonctionnent les connexions (pour les curieux)

Chaque maison qui fait tourner Social Home génère une identité
cryptographique unique au premier démarrage — l'équivalent d'une
carte d'identité numérique. Quand deux foyers se jumellent, ils
échangent ces identités et vérifient la signature de l'autre à
chaque message qui arrive. Après cette poignée de main unique,
les deux serveurs peuvent se parler directement : un message que
vous envoyez à votre sœur apparaît chez elle à la seconde même,
sans relais au milieu.

Si l'adresse d'un foyer change (vous déménagez, votre IP tourne
ou vous passez à un nom de domaine), la nouvelle adresse est
annoncée automatiquement à tous ses foyers jumelés — la maison de
votre sœur prend note du changement et garde la connexion
vivante.

## Héberger un relais d'espaces globaux

Si vous voulez héberger un relais de découverte pour une
communauté, c'est un petit serveur Python qui tourne sur un VPS —
voir [héberger un relais vous-même](/fr/docs/running-a-gfs/).
Open source, sous licence MPL 2.0, sans frais.
