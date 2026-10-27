---
title: Momentum
description: De courtes publications qui voyagent sur trois sauts à travers les foyers jumelés. Jusqu'à 1 000 caractères plus une image ou un clip de 15 secondes ; disparues après un jour, ou aussi longtemps que l'auteur le choisit pour ses abonnés. Les vôtres restent dans Les vôtres.
order: 24
---

**Momentum** est le pilier de diffusion de Social Home. Chaque
publication — un _moment_ — se propage à travers les foyers jumelés
_et leurs foyers jumelés_, jusqu'à trois sauts de distance. Les
réponses sont elles-mêmes des moments, liés à celui auquel elles
répondent, pour qu'un fil se lise d'un seul tenant. Tout le pilier
se trouve sous **Discussions → Momentum** dans la barre latérale,
avec trois onglets : **Moments** (tout ce qui vous est parvenu),
**Les vôtres** (tout ce que vous avez publié) et **Découvrir** (les
auteurs publics sur un GFS). Le bouton **#** filtre par hashtag,
dans toutes les langues. L'Accueil affiche une ligne « Momentum ·
3 nouveaux » quand de nouveaux moments vous attendent.

## Ce que vous pouvez publier

- Jusqu'à **1 000 caractères** de texte (l'éditeur affiche un
  compteur en direct).
- Au choix, une seule **image** _ou_ un seul **clip vidéo de
  15 secondes au maximum**. L'éditeur rejette les clips plus longs
  avant l'envoi, pour que vous ne gaspilliez pas de bande passante.
- La ligne sous la zone de rédaction dit où va le moment : « Foyers
  jumelés et les leurs, jusqu'à 3 étapes · 24 h ». Touchez ⓘ pour
  les détails.
- Les réponses se rattachent au moment auquel elles répondent. Le
  fil reste plat — une réponse à une réponse se rattache à la
  racine du fil d'origine, pour que la vue détaillée se lise de
  haut en bas, sans branches imbriquées.

<details class="tech">
<summary>Sous le capot</summary>

Une réponse porte un `parent_moment_id` ; les réponses imbriquées
sont rattachées à la racine du fil à la création.

</details>

## Conservation

- **24 heures** pour tous ceux qui ne vous suivent pas.
- **Aussi longtemps que vous le choisissez** pour vos abonnés : 1,
  3, 7 (par défaut), 14 ou 30 jours, sous **Paramètres →
  Confidentialité → Momentum → Vos abonnés gardent vos moments
  pendant**. Cela s'applique aux moments que vous publiez à partir
  de ce moment-là.
- **Vos propres moments restent.** Tout ce que vous publiez reste
  dans **Les vôtres**, avec qui le voit et jusqu'à quand, même une
  fois terminé pour tous les autres. L'admin de votre foyer peut
  fixer la place que les photos et vidéos peuvent occuper par
  personne sous **Admin → Stockage** (2 Go par défaut) ; au-delà,
  les photos et vidéos les plus anciennes partent en premier et le
  texte reste.
- **Enregistrez le moment de quelqu'un d'autre** depuis son menu ⋯
  et il reste avec vous jusqu'à ce que son auteur le supprime. Une
  suppression retire aussi les copies enregistrées : Enregistrer
  n'apparaît donc que là où une suppression peut atteindre votre
  copie, c'est-à-dire pour un moment de votre foyer, d'un foyer
  directement jumelé, ou d'un GFS qui garde les traces de
  suppression.

Suivez quelqu'un depuis sa fiche. Pour une personne d'un foyer
jumelé, vous voyez ses moments aussi longtemps qu'elle les garde, et
l'abonnement reste entre vos foyers. Pour une personne que vous ne
connaissez que par un GFS, l'abonnement passe par ce GFS, qui sait
alors que vous la suivez.

<details class="tech">
<summary>Sous le capot</summary>

La durée pour les abonnés voyage dans le champ signé `expires_at`
du moment, pour que chaque foyer destinataire la respecte ; les
valeurs sont plafonnées à 30 jours. La suppression par un auteur est
retentée pendant 30 jours, les relais ne la transmettent que si elle
a changé quelque chose, et un GFS garde les certificats de
suppression signés (sans contenu) pendant 30 jours pour les abonnés
qui se reconnectent. Les enregistrements sont un épinglage par
personne (`PUT /api/moments/{id}/save`) sur la copie que votre foyer
détient déjà ; l'auteur n'en apprend rien.

</details>

## Fédération — le relais à 3 sauts

```
            saut=1              saut=2              saut=3
   A ───►   B ───►              C ───►              D
   auteur    foyer jumelé        foyer jumelé de B    foyer jumelé de C
                                 (saute A)            (saute A et B)
```

Votre foyer envoie le moment à chaque foyer avec lequel il est
jumelé. Chacun d'eux en garde une copie, la montre à ses propres
membres et la transmet à _ses_ foyers jumelés — en sautant ceux
qui l'ont déjà — jusqu'à ce qu'il ait parcouru trois sauts. Un
moment qui arrive deux fois par deux chemins est simplement
reconnu et conservé une seule fois. Qui le reçoit peut toujours
vérifier qu'il vient bien de l'auteur d'origine, même quand il est
arrivé par un ami d'un ami.

<details class="tech">
<summary>Sous le capot</summary>

Le foyer de l'auteur diffuse le moment à chaque foyer jumelé avec
`hop_count = 1`. Chaque foyer destinataire :

1. **Enregistre** la ligne (UPSERT par `moment_id`, de sorte qu'une
   livraison en double par deux chemins de relais est sans effet).
2. **Republie** l'événement sur le bus pour que la couche temps
   réel pousse une trame WebSocket `moment.created` aux lecteurs
   locaux.
3. **Rediffuse** la même enveloppe à _ses propres_ foyers jumelés —
   en incrémentant `hop_count` et en sautant à la fois l'origine et
   l'expéditeur immédiat.
4. **S'arrête** quand `hop_count` dépasserait `MOMENT_MAX_HOPS`
   (3).

L'enveloppe porte un champ `origin_instance_id` qui fixe
l'expéditeur d'origine à travers les sauts, pour que le foyer
destinataire puisse vérifier l'autorité même quand l'enveloppe est
arrivée d'un relayeur plutôt que de la maison de l'auteur.

</details>

## Jusqu'où vous voulez voir

Trois sauts, c'est le plafond au niveau du réseau ; vous pouvez le
réduire par compte. **Paramètres → Confidentialité → Momentum →
Afficher les moments jusqu'à** permet de choisir entre **1 étape**
(seulement vos foyers jumelés), **2 étapes** (leurs foyers jumelés
aussi) et **3 étapes** (par défaut — tous les moments qui vous
parviennent). Ce réglage ne change que
ce que _vous_ voyez ; votre foyer relaie toujours les trois sauts
complets, pour que le reste du maillage reste intact.

## Comptes protégés

Un compte protégé, en général celui d'un enfant, ne voit que les
moments de son propre foyer et des foyers directement jumelés, le
même cercle que celui qu'atteignent ses propres moments et
réponses. Il n'a pas d'onglet Découvrir et ne peut pas publier en
public. Voir [Sécurité familiale](/fr/docs/family-safety/).

## Transmettre sans conserver

Quand un moment entrant arrive et que personne dans votre foyer ne
peut le voir — disons que tout le monde a réduit le nombre de sauts
à 1, ou que tous bloquent l'auteur — votre foyer saute entièrement
la copie locale et le transmet simplement au saut suivant. Pur
passage : aucune écriture sur disque, aucun travail de
conservation, aucune surface dans l'interface. Le maillage reste
entier pour tous les autres ; votre foyer ne garde simplement pas
de copie de quelque chose que personne n'a demandé.

## Foyers bannis + signalements ouverts

Deux filtres supplémentaires s'ajoutent au relais :

- **Foyers bannis.** Les admins peuvent bannir un foyer entier ;
  ses moments sont rejetés à l'arrivée et jamais relayés plus
  loin. Chaque foyer tient sa propre liste — les bannissements ne
  se fédèrent pas.
- **Signalements de contenu ouverts.** Tant qu'un signalement est
  ouvert contre un moment ou son auteur, votre foyer ne le diffuse
  pas aux autres. Résoudre ou rejeter le signalement rétablit le
  relais. L'auteur voit toujours son propre moment localement —
  les autres foyers ne le reçoivent qu'après l'intervention d'un
  modérateur.

<details class="tech">
<summary>Sous le capot</summary>

Les bannissements sont des identifiants d'instance listés sous
**Paramètres → Fédération → Instances bannies** ; les moments
entrants correspondants sont rejetés au niveau du pipeline §24.11.
Les signalements sont des lignes `content_reports` ; la rétention
du relais est levée une fois la ligne résolue ou rejetée via
`/api/admin/reports`.

</details>

## Passer en public via un Global Federation Server

Trois sauts couvrent les foyers jumelés, mais le réseau plus large
passe par le [GFS (Global Federation Server)](/fr/docs/glossary/#gfs)
— le relais qui aide les foyers à se trouver. Inscrivez-vous dans
**Paramètres → Confidentialité → Partage public** (aussi accessible
depuis **Les vôtres** et la zone de rédaction) et choisissez un GFS.
Le public reste **désactivé** pour chaque moment tant que vous
n'activez pas « Aussi public sur … » dans la zone de rédaction ; le
bouton indique alors **Publier publiquement**. Si vous préférez que
chaque nouveau moment soit public, activez **Rendre publics les
nouveaux moments** à cet endroit. Le public se choisit en écrivant,
pas après. Une réponse ne peut être publique que si le moment auquel
elle répond l'est. Les moments publics se propagent à tous ceux qui
vous suivent sur ce GFS. Ce que le GFS sait de vous est exactement ce que vous avez réglé dans
**Paramètres → Profil** : nom affiché, bio, avatar. Mettez-les à
jour et la copie du GFS se rafraîchit à l'enregistrement — une
seule identité, pas de variante par pilier.

### Découvrir et suivre

- **Dans votre Social Home.** L'onglet **Découvrir** de Momentum
  liste chaque auteur public sur chaque GFS avec lequel vous êtes
  jumelé. Recherchez par nom, identifiant ou bio ; un clic pour
  suivre. Leur prochain moment arrive dans votre boîte de réception
  à côté des moments des foyers jumelés — signalé par une puce
  « via {gfs} ».
- **Depuis le web ouvert.** Chaque GFS liste ses auteurs publics
  sur `/moments`, et chaque auteur a une page de profil sur
  `/moments/<id>` avec sa photo, sa bio et un bouton **Suivre**. Le
  profil s'ouvre dans la
  [visionneuse Social Home](/fr/docs/glossary/#visionneuse), une page
  qu'aucun GFS ne sert. Pratique pour partager votre profil Momentum
  avec des gens qui ne sont pas encore sur Social Home. Le profil
  montre qui vous êtes, pas ce que vous avez publié.

Les cartes de l'annuaire utilisent les mêmes avatar + bio + nom
affiché que voient les foyers jumelés — il n'y a pas de « persona
publique » à part à entretenir.

### Partager un seul moment

Pour montrer un seul moment public à quelqu'un qui n'a pas Social
Home, ouvrez-le et touchez **Copier le lien de partage**. Le lien
ouvre ce moment précis — et rien d'autre de ce que vous avez publié —
dans la visionneuse Social Home, jusqu'à la fin du moment. Cela
fonctionne même quand votre maison est hors ligne : le GFS garde une
copie scellée qu'il ne peut pas ouvrir lui-même, et la clé est la
partie du lien après le `#`, que les navigateurs n'envoient jamais à
un serveur. Un lien de partage ne peut être repris qu'en supprimant
le moment : partagez-le comme une clé.

<details class="tech">
<summary>Sous le capot</summary>

Le lien est
`viewer.social-home.io/v/<hash>/#g=<GFS>&a=<author>&m=<moment>&b=<share copy>&k=<item key>`.
`k` est la clé d'élément du moment, jamais une clé de génération ou
d'étape. La copie de partage (texte, horaires, nom affiché,
descripteur du média) est scellée sous cette clé, complétée à 4 Ko et
envoyée au GFS seulement quand vous demandez un lien. La visionneuse
la récupère, avec le fichier, de façon anonyme, vérifie chaque adresse
SHA-256 et les ouvre avec WebCrypto. La maison de l'auteur n'est
jamais contactée.

</details>

## Limite de fréquence

Un moment **de premier niveau** par auteur toutes les
**15 minutes**. La zone de rédaction vous prévient avant que vous
écriviez : « Vous pourrez publier votre prochain moment à 13:24 ».
Vous pouvez écrire en attendant ; le bouton indique « Publier à
13:24 » jusque-là. Les réponses et les réactions en sont exemptées —
un échange dans un fil ne devrait pas s'arrêter net en attendant le
minuteur.

<details class="tech">
<summary>Sous le capot</summary>

La fenêtre de 15 minutes est appliquée au niveau de la couche de
service ; l'API renvoie un code d'erreur 429 `MOMENT_RATE_LIMIT`
quand elle se déclenche.

</details>

## Réactions

Choisissez dans une rangée rapide d'emoji, ou touchez à nouveau
votre réaction pour la retirer. Les réactions ne vont qu'au foyer de
l'auteur, y compris pour les auteurs à deux ou trois sauts et ceux
que vous suivez via un GFS. En chemin, elles sont scellées pour le
foyer de l'auteur : les foyers et le GFS qui les transmettent ne
peuvent voir ni qui a réagi, ni avec quel emoji.

Seul le foyer de l'auteur connaît le total, il renvoie donc les
compteurs quelques fois tant que le moment est récent, et seulement
quand ils ont changé. Jamais qui a réagi. Tant que les premiers
totaux ne sont pas arrivés, vous ne voyez que votre propre réaction,
et votre nouvelle réaction rejoint le compteur à la prochaine mise à
jour de l'auteur.

<details class="tech">
<summary>Sous le capot</summary>

- Une réaction lointaine est signée par votre foyer (Ed25519),
  complétée à 1 Ko et scellée pour la clé d'encapsulation du foyer
  de l'auteur (X25519). Sur le maillage, elle remonte le chemin du
  moment grâce à des jetons de retour sans état (AES-256-GCM, HKDF
  depuis le secret de routage de chaque relais). Un moment garde
  jusqu'à 3 chemins de retour par des voisins différents ; chaque
  réaction en emprunte 2.
- Via un GFS, elle va uniquement au foyer de l'auteur, si vous y
  suivez l'auteur.
- Les totaux couvrent les 8 emoji les plus utilisés plus le total
  général, signés par le foyer de l'auteur, à 10 minutes, 6 heures
  et 3 jours après la publication sur le maillage, et à 10 minutes,
  3 heures et 24 heures via le GFS (scellés et complétés à
  640 octets dans ce cas).
- Dans la session de l'auteur, la mise à jour arrive sous forme de
  trame WebSocket `moment.reaction_changed`.

</details>

## Bloquer + signaler

- **Bloquer.** La même action `Bloquer` qui masque les Highlights
  masque aussi chaque moment de cet auteur. Gérez les blocages dans
  **Paramètres → Confidentialité → Comptes bloqués**.
- **Signaler.** ⋯ → **Signaler** sur la page de détail dépose un
  signalement dans la file de modération de l'admin du foyer — la
  même qui traite les publications, commentaires, highlights et
  utilisateurs — pour que l'admin trie tout depuis un seul endroit.

<details class="tech">
<summary>Sous le capot</summary>

Les signalements sont des lignes de la file unifiée
`content_reports` ; les admins les listent sur
`/api/admin/reports?status=pending`.

</details>

## API

<details class="tech">
<summary>Sous le capot</summary>

| Méthode                   | Chemin                             | Rôle                                                                                           |
| ------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------- |
| `GET`                     | `/api/moments`                     | Liste les moments visibles par l'appelant (tient compte des blocages et des abonnements).      |
| `POST`                    | `/api/moments`                     | Crée un moment. Corps : `{content, media_url?, media_type?, duration_ms?, parent_moment_id?}`. |
| `GET`                     | `/api/moments/archive`             | Vos propres moments et ceux que vous avez enregistrés (Les vôtres).                            |
| `GET`                     | `/api/moments/{id}`                | Détail avec réponses + réactions.                                                              |
| `DELETE`                  | `/api/moments/{id}`                | Suppression par l'auteur ou un admin.                                                          |
| `PUT` / `DELETE`          | `/api/moments/{id}/reaction`       | Définit / efface votre propre emoji.                                                           |
| `POST`                    | `/api/moments/{id}/report`         | Dépose une ligne `content_reports`.                                                            |
| `PUT` / `DELETE`          | `/api/moments/{id}/save`           | Enregistre / retire le moment de quelqu'un d'autre.                                            |
| `GET` / `POST` / `DELETE` | `/api/moments/follows[/{user_id}]` | Gère votre liste d'abonnements.                                                                |

L'interrupteur de foyer `feat_momentum` dans **Paramètres →
Fonctionnalités du foyer** désactive chaque point d'accès
ci-dessus avec une réponse 403 `FEATURE_DISABLED` quand les admins
veulent laisser le pilier éteint.

</details>
