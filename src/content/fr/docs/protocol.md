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
faire. Pas d'acronymes dans le texte principal ; le détail
technique se trouve dans les blocs « Sous le capot », et les mots
sont expliqués dans
[Les mots que nous utilisons](/fr/docs/glossary/).

## Que puis-je en faire ?

Restez en contact avec les personnes qui comptent — sans confier
vos données à qui que ce soit d'autre. Voici ce que Social Home
vous permet de faire, vous et votre foyer :

- **📸 Partagez une photo du dîner** sur le fil de votre foyer.
  Votre partenaire la voit instantanément sur son téléphone, vos
  colocataires peuvent réagir et commenter — sans qu'elle passe
  par le moindre service cloud.
- **🗓 Voyez le calendrier de tout le monde au même endroit.**
  Votre calendrier personnel, l'emploi du temps de votre
  colocataire et le calendrier partagé « Maison » se superposent
  dans une seule vue codée par couleur. Les événements restent
  sur votre serveur.
- **🛒 Lancez « Je suis au supermarché — il faut quelque chose ? »**
  La liste de courses de votre foyer est en direct. Quelqu'un
  ajoute du lait, vous le voyez avant d'arriver à la caisse.
  Demandez à votre assistant vocal de l'ajouter à la voix.
- **🔔 Sachez qui est à la maison** sans demander. Un discret
  indicateur de présence montre qui est là en ce moment — pas de
  suivi de position, pas d'historique, juste l'instant présent.
- **✅ Répartissez les corvées au lieu de harceler.** Des listes
  de tâches avec responsables, échéances et un badge « en
  retard ». Percer l'étagère ce week-end ; recycler le vieux
  frigo aujourd'hui ; tout le monde voit qui s'occupe de quoi.
- **📒 Gardez le manuel de la maison au même endroit.** Les
  Pages sont des entrées de wiki en Markdown qui vivent dans un
  espace — comment purger les radiateurs, où noter les relevés de
  compteur, les consignes pour la baby-sitter. Elles se
  synchronisent sur tous les appareils du foyer.
- **📝 Des Post-it (Stickies) pour ce qui ne mérite pas une
  page.** Des notes colorées, modifiables d'un tap, épinglées sur
  le canevas d'un espace — l'aimant de frigo moderne. Les
  carottes dans le bac du bas ; des idées de cadeau
  d'anniversaire ; la liste de courses pour réparer la sonnette.
- **💬 Écrivez à votre famille à l'autre bout du monde** — scellé
  de votre maison à la leur, sans cloud entre les deux. Pas de
  numéro de téléphone. Pas de compte chez un service tiers.
- **📞 Appelez sans inconnu au milieu** — appels audio et vidéo,
  en tête-à-tête ou en groupe, directement depuis vos messages
  privés et vos discussions de groupe. L'audio et la vidéo
  circulent directement entre les participants ; si une connexion
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
participants ; un repli TURN ne relaie que du texte chiffré. Les
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
fonctions du foyer continuent de marcher sur votre réseau local ;
la seule chose qui s'interrompt, c'est la messagerie _en dehors_
de la maison.

<details class="tech">
<summary>Sous le capot</summary>

Si vous avez installé le module complémentaire, il fait partie de
votre sauvegarde Home Assistant habituelle ; les installations
autonomes reçoivent un kit de récupération (`.shrk`, scrypt +
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
au jumelage ; une mauvaise signature est rejetée, et il n'existe
aucun mode « instance de confiance » pour contourner cela.

</details>

## Les espaces — des pièces partagées pour n'importe quel groupe

Un espace, c'est un fil, une discussion et un calendrier partagés
pour n'importe quel groupe de personnes, réparties sur autant de
foyers que vous voulez. Par exemple :

- **Famille** — les personnes de votre maison, plus les parents
  et les frères et sœurs dans leur propre maison.
- **Eichenstrasse 3–17** — votre immeuble. Chacun fait tourner
  son propre serveur ; l'espace est le panneau d'affichage commun.
- **Club de lecture**, **groupe d'escalade**, **atelier de
  makers** — les groupes récurrents qui existent déjà dans votre
  vie, mais sur aucune plateforme digne de confiance.

C'est vous qui décidez qui voit un espace. C'est vous qui décidez
quels foyers sont invités. Chaque espace a un foyer hôte — celui
qui l'a créé et qui tient la liste des membres — mais les membres
publient directement les uns vers les autres, et les grandes
décisions (qui peut le voir, s'il existe encore) sont prises par
tous ses administrateurs ensemble.

## Espaces publics et globaux

Certains espaces sont privés, réservés aux foyers invités. Un
espace _public_ est un espace que vos foyers jumelés peuvent
trouver et demander à rejoindre ; il reste dans votre propre
cercle. Un espace _global_ — une place de marché publique, une
communauté autour d'un loisir, le panneau d'affichage de votre
quartier — s'adresse aussi aux inconnus : un relais léger, le GFS
(Global Federation Server – le serveur de fédération global), le
liste pour que des foyers qui ne se connaissent pas puissent le
trouver (voir [GFS](/fr/docs/glossary/#gfs)).

Les foyers jumelés reçoivent toujours les publications d'un
espace directement ou par le maillage. Le relais ne transporte
les publications que vers les foyers avec qui vous n'êtes pas
jumelé — les abonnés, et les membres qui ont rejoint avec un Lien
GFS — sous forme d'enveloppes scellées et complétées à taille
fixe. Il ne peut pas en lire un mot. Par défaut, il sait quel foyer a publié
et quand ; un espace peut passer en mode strict, où il ne sait
même plus qui. Plus de détails dans
[Espaces globaux](/fr/docs/global-spaces/).

<details class="tech">
<summary>Sous le capot</summary>

`PUBLIC_SPACE_TIERS = {public, global}` : seules ces portées
peuvent relayer vers un GFS. Un espace global est publié
automatiquement sur chaque GFS connecté ; un espace public
seulement quand un administrateur le publie à la main. Les
espaces publics parviennent aux foyers jumelés sous forme
d'instantané `SPACE_DIRECTORY_SYNC`, jamais via un GFS. Le GFS ne
voit que des
métadonnées de routage (`space_id`, `event_type`, tranche de
taille, horodatage, ensemble des abonnés, IP source) ; le mode
strict rend les publications anonymes. Les membres hors ligne
sont mis en file d'attente 24 h ; rien d'autre n'est stocké.

</details>

## Liens publics vers un Highlight

Ce même type de relais a aussi un second rôle : transmettre un
seul Highlight à des personnes extérieures à Social Home. Quand
vous publiez un lien vers un Highlight, le relais crée une URL
que n'importe qui peut ouvrir dans un navigateur — mais les
octets du Highlight circulent directement de votre maison vers le
navigateur du visiteur. Si ce chemin direct ne peut pas être
établi, le relais fait transiter les images uniquement pendant
que vous êtes en ligne, et n'en stocke aucune. Voir
[Highlights](/fr/docs/highlights/#partager-publiquement-via-un-serveur-global)
pour le parcours côté auteur.

<details class="tech">
<summary>Sous le capot</summary>

WebRTC direct du serveur de l'auteur vers le navigateur ; passage
HTTP en repli, uniquement tant que l'auteur est en ligne. Aucun
octet de Highlight ou de moment n'est stocké sur le GFS.

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
