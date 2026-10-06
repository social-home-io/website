---
title: Momentum
description: Des publications éphémères qui se propagent sur trois sauts à travers la fédération. Jusqu'à 1 000 caractères plus une image ou un clip de 15 secondes ; disparues après un jour, ou une semaine pour les personnes que vous suivez.
order: 24
---

**Momentum** est le pilier de diffusion de Social Home. Chaque
publication — un _moment_ — se propage à travers les foyers jumelés
_et leurs foyers jumelés_, jusqu'à trois sauts de distance. Les
réponses sont elles-mêmes des moments, liés à celui auquel elles
répondent, pour qu'un fil se lise d'un seul tenant. Tout le pilier
se trouve sous **Discussions → Momentum** dans la barre latérale ;
le tableau de bord **Explorer → Archive des moments** regroupe
chaque moment reçu par jour, dans la fenêtre de conservation.

## Ce que vous pouvez publier

- Jusqu'à **1 000 caractères** de texte (l'éditeur affiche un
  compteur en direct).
- Au choix, une seule **image** _ou_ un seul **clip vidéo de
  15 secondes au maximum**. L'éditeur rejette les clips plus longs
  avant l'envoi, pour que vous ne gaspilliez pas de bande passante.
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

- **24 heures** par défaut pour les moments de personnes que vous
  ne suivez pas.
- **7 jours** pour les moments de toute personne de votre liste
  d'abonnements.
- Le planificateur de conservation horaire supprime chaque ligne
  au-delà du plafond absolu de 7 jours ; la fenêtre visible est
  calculée par lecteur au moment de l'affichage. Vous pouvez
  suivre / ne plus suivre depuis le menu ⋯ de n'importe quel
  moment, ou depuis **Paramètres → Confidentialité → Abonnements**.

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
réduire par compte. **Paramètres → Confidentialité → Visibilité
Momentum** permet de choisir entre **1 saut** (seulement vos foyers
jumelés), **2 sauts** (leurs foyers jumelés aussi) et **3 sauts**
(par défaut — toute la portée du relais). Ce réglage ne change que
ce que _vous_ voyez ; votre foyer relaie toujours les trois sauts
complets, pour que le reste du maillage reste intact.

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
— le relais qui aide les foyers à se trouver. Activez-le dans
**Paramètres → Confidentialité → Momentum public**, choisissez un
GFS, et vos moments se propagent à tous ceux qui vous y suivent. Ce
que le GFS sait de vous est exactement ce que vous avez réglé dans
**Paramètres → Profil** : nom affiché, bio, avatar. Mettez-les à
jour et la copie du GFS se rafraîchit à l'enregistrement — une
seule identité, pas de variante par pilier.

### Découvrir et suivre

- **Dans votre Social Home.** **Discussions → Momentum → Découvrir**
  liste chaque auteur public sur chaque GFS avec lequel vous êtes
  jumelé. Recherchez par nom, identifiant ou bio ; un clic pour
  suivre. Leur prochain moment arrive dans votre boîte de réception
  à côté des moments des foyers jumelés — signalé par une puce
  « via {gfs} ».
- **Depuis le web ouvert.** Chaque GFS héberge une page publique
  sur `/users` (l'annuaire) et `/users/<id>` (page par auteur avec
  avatar, bio, nombre d'abonnés et un lien profond qui ouvre le
  parcours d'abonnement sur votre Social Home). Pratique pour
  partager votre profil Momentum avec des gens qui ne sont pas
  encore sur Social Home.

Les cartes de l'annuaire utilisent les mêmes avatar + bio + nom
affiché que voient les foyers jumelés — il n'y a pas de « persona
publique » à part à entretenir.

## Limite de fréquence

Un moment **de premier niveau** par auteur toutes les
**15 minutes**. Les réponses et les réactions en sont exemptées —
un échange dans un fil ne devrait pas s'arrêter net en attendant le
minuteur.

<details class="tech">
<summary>Sous le capot</summary>

La fenêtre de 15 minutes est appliquée au niveau de la couche de
service ; l'API renvoie un code d'erreur 429 `MOMENT_RATE_LIMIT`
quand elle se déclenche.

</details>

## Réactions

Choisissez dans une rangée rapide d'emoji sur la page de détail, ou
tapez sur une réaction existante pour définir / changer la vôtre.
Les réactions ne remontent qu'au foyer de l'auteur, et le compteur
sur son écran se met à jour en direct.

<details class="tech">
<summary>Sous le capot</summary>

Les réactions empruntent un canal de retour unicast vers le foyer
de l'auteur ; la mise à jour arrive sous forme de trame WebSocket
`moment.reaction_changed` dans la session de l'auteur.

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
| `GET`                     | `/api/moments/archive`             | Liste complète de la fenêtre de conservation pour le tableau de bord calendaire.               |
| `GET`                     | `/api/moments/{id}`                | Détail avec réponses + réactions.                                                              |
| `DELETE`                  | `/api/moments/{id}`                | Suppression par l'auteur ou un admin.                                                          |
| `PUT` / `DELETE`          | `/api/moments/{id}/reaction`       | Définit / efface votre propre emoji.                                                           |
| `POST`                    | `/api/moments/{id}/report`         | Dépose une ligne `content_reports`.                                                            |
| `GET` / `POST` / `DELETE` | `/api/moments/follows[/{user_id}]` | Gère votre liste d'abonnements.                                                                |

L'interrupteur de foyer `feat_momentum` dans **Paramètres →
Fonctionnalités du foyer** désactive chaque point d'accès
ci-dessus avec une réponse 403 `FEATURE_DISABLED` quand les admins
veulent laisser le pilier éteint.

</details>
