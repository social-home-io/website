---
title: Des foyers fédérés
description: Comment deux maisons se jumellent, ce qui circule entre elles et ce qui reste sur place.
order: 30
---

Quand deux foyers se jumellent, leurs maisons apprennent
l'identité cryptographique l'une de l'autre et stockent la clé
publique localement. Après cette unique poignée de main, chaque
message échangé porte une signature que votre maison peut
vérifier — pas de compte central, pas d'authentification tierce.

## Le parcours de jumelage

1. **Ouvrez un lien de jumelage.** Dans Social Home →
   **Paramètres → Connexions → Jumeler un foyer**. Vous verrez un
   code QR et un court code de vérification.
2. **Scannez depuis l'autre foyer.** Il ouvre le même écran chez
   lui, clique sur **Scanner** et pointe un téléphone vers le code
   QR. Les deux côtés lisent ensuite le code de vérification à
   voix haute et confirment qu'il correspond — c'est cette
   vérification hors bande qui empêche un attaquant de
   s'intercaler au milieu.
3. **Terminé.** Les deux foyers échangent clés publiques, noms,
   avatars et l'URL joignable de l'extérieur que chacun annonce
   pour lui-même. À partir de là, les messages circulent
   directement entre vous, scellés de votre maison à la leur.

## Ce qui circule

| Champ                                         | Partagé avec les foyers jumelés ?                                |
| --------------------------------------------- | ---------------------------------------------------------------- |
| Nom d'affichage                               | oui                                                              |
| Avatar                                        | oui                                                              |
| Espaces partagés actuellement                 | seulement les espaces que vous avez tous les deux rejoints       |
| Clé publique (identité)                       | oui — c'est tout l'intérêt                                       |
| URL externe                                   | oui, pour qu'ils puissent vous joindre quand vous déménagez      |
| E-mail / mot de passe                         | **jamais** — Social Home n'en a même pas                         |
| GPS / historique de position                  | **jamais** — seulement la zone actuelle, sur demande, par espace |
| Messages des espaces que vous ne partagez pas | jamais visibles                                                  |

## Que se passe-t-il quand une adresse change

Si l'URL externe de votre foyer change — vous changez de domaine,
vous perdez Nabu Casa Remote UI, ou votre IP tourne — Social Home
communique automatiquement la nouvelle adresse à chaque foyer
jumelé. Leur maison vérifie que l'annonce vient bien de vous, met
à jour l'URL stockée, et la connexion reste vivante. Pas de
nouveau jumelage à la main.

<details class="tech">
<summary>Sous le capot</summary>

L'annonce est un événement `URL_UPDATED` signé. Le foyer
destinataire vérifie la signature Ed25519 par rapport à la clé
publique stockée lors du jumelage avant de remplacer l'URL.

</details>

## Révoquer un jumelage

Si vous voulez vous déconnecter d'un autre foyer, ouvrez
**Paramètres → Connexions** et cliquez sur **Retirer**. Les deux
côtés perdent leur copie de l'identité de l'autre ; les messages
déjà livrés restent là où ils sont (la base de données SQLite
locale) — la fédération ne va que vers l'avant.

## À travers internet

Le jumelage fonctionne sur l'internet ouvert — la fédération va
d'une maison à l'autre, pas seulement sur le réseau local. Pour
être joignable depuis l'extérieur de votre réseau, il vous faut
l'un des éléments suivants :

- **Nabu Casa Remote UI** (le plus simple), ou
- Une **URL externe** (définie dans les paramètres réseau de Home
  Assistant si vous utilisez le module complémentaire) + une
  redirection de port / un proxy inverse, ou
- Un **serveur TURN** pour le repli WebRTC quand aucun des deux
  côtés ne peut être joint directement.

<details class="tech">
<summary>Sous le capot</summary>

Si vous avez installé le module complémentaire, l'intégration
Home Assistant pousse automatiquement vers Social Home l'URL que
Home Assistant signale comme externe. Si Nabu Casa est actif,
l'URL Nabu Casa l'emporte ; sinon, l'`external_url` défini par
l'administrateur est utilisé.

</details>

## Voir vos foyers

La page **Connexions** dessine aussi une carte : une épingle par
foyer jumelé, avec la distance et la direction de chacun. Elle
est là pour rendre la fédération tangible — pour voir que « la
maison de ma sœur » est un lieu réel, 40 km au nord-est, qui
parle directement à la vôtre. Un petit glyphe indique si vous
êtes connectés directement (WebRTC) ou via le repli HTTPS ; c'est
purement diagnostique — tout fonctionne pareil dans les deux cas.
La carte ne montre la position approximative d'un foyer que s'il
a choisi de la partager lors du jumelage, et toute coordonnée est
floutée à environ 11 mètres avant d'être stockée ou envoyée.
