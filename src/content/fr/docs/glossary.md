---
title: Les mots que nous utilisons
description: La douzaine de mots qui reviennent partout dans Social Home — foyer, espace, portée, hôte, GFS, jumelage et les autres — chacun expliqué en un paragraphe.
order: 5
---

Social Home s'efforce d'utiliser les mêmes mots dans l'app, dans
cette documentation et dans le code. Cette page en est la courte
liste. Si une page de la documentation emploie un terme que vous ne
reconnaissez pas, il est presque certainement ici — et le détail
technique de chaque page se trouve dans un bloc repliable « Sous le
capot » que vous pouvez ignorer ou ouvrir à votre guise.

## Foyer

Un foyer, c'est une maison qui fait tourner Social Home — un
serveur, généralement installé comme module complémentaire Home
Assistant — et les personnes qui vivent derrière — vous, votre
partenaire, les enfants, le colocataire. Tout ce qu'un foyer fait
(la liste de courses, le calendrier, les photos, la discussion) est
stocké sur ce seul serveur. Quand cette documentation dit « votre
foyer », elle désigne votre serveur et toutes les personnes qui y
ont un compte.

<details class="tech">
<summary>Sous le capot</summary>

Le code et la spécification du protocole appellent un foyer une
_instance_. Les deux champs d'adressage lisibles sur chaque
enveloppe, `from_instance` et `to_instance`, sont des identifiants
de foyer.

</details>

## Jumelage

Le jumelage est la façon dont deux foyers font connaissance : vous
scannez un QR code (ou vous dictez un code court au téléphone), et
à partir de là votre maison et la leur peuvent échanger des messages
privés et partager des espaces. Le jumelage se fait une fois par
paire de foyers, et chaque côté peut le retirer plus tard sous
**Paramètres → Connexions**.

<details class="tech">
<summary>Sous le capot</summary>

Le jumelage est un accord de clé X25519 avec dérivation de clé
HKDF-SHA256 ; le code dicté protège l'échange contre un
détournement. L'identité à long terme de chaque foyer est une clé
de signature Ed25519.

</details>

## Espace

Un espace est un salon partagé pour n'importe quel groupe de
personnes, réparties sur autant de foyers que l'on veut : la
famille, l'immeuble, le club de lecture. Un espace a un fil, une
discussion et un calendrier, et ses membres décident ensemble de
qui d'autre peut entrer.

## Portée

La portée d'un espace définit qui peut le trouver et qui peut y
publier. Il y en a quatre, chacune touchant un public plus large
que la précédente :

- **Privé** — seulement les personnes que vous invitez.
- **Foyer** — tout votre propre foyer.
- **Public** — vos foyers [jumelés](#jumelage) peuvent le trouver
  sous Parcourir les espaces. Il reste dans votre propre cercle.
- **Global** — listé sur chaque [GFS](#gfs) auquel votre maison
  est connectée, pour que n'importe qui sur ce GFS puisse le
  trouver.

Seuls les espaces globaux sont listés sur un GFS. Un espace public
l'est aussi si un admin le publie à la main sur un GFS, et un
espace privé peut utiliser le GFS si son propriétaire l'active
(désactivé par défaut). Les foyers avec qui vous êtes jumelé
reçoivent les publications d'un espace directement ou par le
maillage, quelle que soit sa portée. Changer la portée d'un espace
est une décision qui revient à tous ses admins — voir
[Espaces globaux](/fr/docs/global-spaces/#les-grandes-décisions-se-votent).

## Hôte

Chaque espace a un foyer hôte : celui qui l'a créé et qui compte les
votes des admins. L'hôte n'est pas un intermédiaire — les membres
publient directement les uns vers les autres — mais c'est là que
vit la liste des membres.

## GFS

Un GFS est un **Global Federation Server** (serveur de fédération
global) — le relais qui aide les foyers à se trouver quand ils ne
se connaissent pas encore. Il liste les espaces globaux, et
transporte leurs publications scellées vers les foyers avec qui
vous n'êtes pas jumelé : les abonnés, et les membres qui ont
rejoint avec un Lien GFS. Le projet Social Home en
fait tourner un ; chacun peut
[faire tourner le sien](/fr/docs/running-a-gfs/). Un GFS voit des
enveloppes scellées et des informations de routage, jamais le
contenu d'une publication. Ce qu'il peut et ne peut pas voir est
détaillé sur la page du
[modèle de sécurité](/fr/docs/security/#ce-que-voit-un-relais).

## Lien GFS et Lien local

Les deux sont des liens d'invitation vers un espace. Un **Lien
GFS** fonctionne pour tout le monde — la personne qui l'ouvre n'a
pas besoin d'être jumelée avec vous, parce que le GFS fait les
présentations. Un **Lien local** ne fonctionne que pour les foyers
auxquels vous êtes déjà connecté, et ne touche jamais un GFS.

## Abonné

Un abonné est quelqu'un qui lit un espace sans en être membre. Les
abonnés voient ce que l'espace publie, mais ils ne publient pas, et
ils n'ont pas de voix au chapitre. Les rôles s'échelonnent ainsi :
propriétaire → admin → modérateur → membre → abonné.

## Rotation des clés (époque)

Chaque espace a une clé qui scelle ses publications. Chaque fois
que les membres changent — quelqu'un arrive, quelqu'un part,
quelqu'un est retiré — l'espace reçoit une nouvelle clé et entame
une nouvelle _époque_. Quelqu'un qui est parti ne peut rien lire de
ce qui a été publié après son départ.

<details class="tech">
<summary>Sous le capot</summary>

Le contenu d'un espace est scellé avec une clé AES-256-GCM par
époque ; le numéro d'époque est l'un des rares champs lisibles
d'une enveloppe, pour qu'un membre sache quelle clé utiliser. La
clé d'autorité de l'espace tourne séparément chaque fois qu'un
admin est révoqué.

</details>

## Enveloppe scellée

Une enveloppe scellée, c'est ce qui voyage réellement entre les
foyers. La publication, la photo ou l'événement de calendrier
qu'elle contient est chiffré avant de quitter votre maison et n'est
déchiffré que dans la maison destinataire ; l'extérieur de
l'enveloppe porte juste de quoi la livrer. Rien ne quitte jamais un
foyer sans être scellé — si un espace ne peut pas sceller, il
n'envoie pas.

<details class="tech">
<summary>Sous le capot</summary>

Les enveloppes sont en AES-256-GCM, signées en Ed25519. Les seuls
champs lisibles sont `event_type`, `from_instance`, `to_instance`,
`space_id` et `epoch`.

</details>

## Maillage

Quand deux foyers membres ne peuvent pas se joindre directement,
une publication peut passer par les serveurs d'autres membres pour
arriver à destination. Chaque saut est scellé pour le destinataire
final, de sorte que les foyers intermédiaires transportent
l'enveloppe mais ne peuvent pas l'ouvrir.

<details class="tech">
<summary>Sous le capot</summary>

Transfert `SPACE_ROUTED`, trois sauts au maximum, scellé pour une
clé X25519 éphémère du destinataire.

</details>

## Relais et TURN

Un relais est n'importe quel serveur qui fait passer des enveloppes
scellées entre foyers sans pouvoir les lire ; dans Social Home,
c'est le GFS. Un serveur **TURN** est un autre type de relais,
utilisé uniquement pour les appels audio et vidéo, et seulement
quand une connexion directe entre les deux téléphones est
impossible. Il laisse passer le média chiffré et ne voit rien
d'autre.
