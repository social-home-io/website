---
title: Calendrier et RSVP
description: Une seule vue superposée pour les calendriers personnels, de couple et du foyer. Les invités répondent oui / non / peut-être — y compris entre foyers jumelés quand un événement est partagé avec un espace distant.
order: 25
---

Le calendrier est la surface de coordination centrale d'un
foyer. Les calendriers personnels, un calendrier **Maison**
partagé et les calendriers propres à chaque espace se superposent
dans une seule vue codée par couleur, sous **À la maison →
Calendrier**. On peut ajouter des événements depuis
l'application, à la voix, ou en important un fichier `.ics`
déposé dans le composeur.

## Réponses (RSVP)

Chaque événement porte une liste d'invités. Chaque invité peut
répondre **Oui**, **Non** ou **Peut-être** — et changer d'avis à
tout moment jusqu'au début de l'événement. La vue détaillée
résume les décomptes en haut (`✓ 3 · ✗ 1 · ? 2`) et liste chaque
invité avec son état actuel et la date de son dernier changement.

Visibilité par défaut :

- Événements **personnels** — les réponses ne sont visibles que
  par la personne qui invite et l'invité.
- Événements **du foyer** — les réponses sont visibles par tous
  les membres du foyer.
- Événements **d'espace** — les réponses sont visibles par tous
  les membres de l'espace, y compris les foyers distants jumelés.

## Capacité et listes d'attente

Donnez une **capacité** à un événement et « Oui » cesse d'être
immédiat : cela devient une **demande** que le créateur de
l'événement (ou un administrateur de l'espace) approuve, et une
fois les places pleines, les « oui » suivants rejoignent une
**liste d'attente**. Quand quelqu'un se désiste, la personne la
plus ancienne de la liste d'attente est promue automatiquement.
« Peut-être » ne compte jamais dans la capacité, et reste donc un
honnête « j'essaierai ». Laissez la capacité vide et l'événement
est ouvert à tous, comme avant.

## Fédération

Quand un événement est partagé avec un espace dont les membres
vivent dans des foyers jumelés, chaque réponse voyage vers ces
foyers de la même façon scellée que tout le reste. Qui a été
invité, ce qu'ils ont répondu et toute note qu'ils ont tapée se
trouvent dans la partie scellée ; seul l'identifiant de
l'événement est lisible à l'extérieur, pour pouvoir l'acheminer.

Un administrateur d'espace qui retire un membre révoque aussi sa
réponse en silence — l'événement est reflété dans chaque foyer
jumelé, donc la puce de décompte se met à jour partout en
quelques secondes.

<details class="tech">
<summary>Sous le capot</summary>

Les RSVP se fédèrent via le pipeline entrant standard du §24.11.
L'identifiant de l'événement est en clair sur l'enveloppe (donnée
de routage) ; la liste des invités, la réponse et toute note en
texte libre voyagent dans la charge utile chiffrée.

</details>

## Rappels

Les événements portent un rappel optionnel — _15 minutes avant_,
_1 heure avant_, _1 jour avant_. Le rappel passe par le service
de notifications : une ligne dans l'application, une notification
push (si l'utilisateur a activé le push) et un événement auquel
vos automatisations domestiques peuvent réagir — faire sonner une
enceinte, tamiser les lumières, ou tout ce que le foyer a câblé.

<details class="tech">
<summary>Sous le capot</summary>

Le point d'accroche pour les automatisations est un événement sur
le bus d'événements de Home Assistant, émis via l'intégration
livrée avec le module complémentaire ; n'importe quelle
automatisation peut se déclencher dessus.

</details>

## Importer des événements existants

Déposez un fichier `.ics` sur le composeur, collez l'URL d'un
flux de calendrier public, ou téléversez une capture d'écran
d'une invitation papier — l'extracteur IA (s'il est configuré)
tirera le titre, le début, la fin, le lieu et la description de
l'image. Les événements importés arrivent en **brouillon**
jusqu'à votre confirmation ; rien ne se fédère tant que vous
n'appuyez pas sur Enregistrer.

## Confidentialité

- Tout ce qui se trouve dans un événement est scellé quand il
  voyage vers un autre foyer.
- Le lieu d'un événement de type _lieu_ est flouté à environ
  11 mètres avant même d'être stocké ou transmis.
- Les calendriers personnels ne se fédèrent jamais. Seules les
  vues superposées du foyer et des espaces franchissent les
  frontières du foyer.

<details class="tech">
<summary>Sous le capot</summary>

Les champs de la charge utile du calendrier sont chiffrés dans
l'enveloppe de fédération (§25.8.21). Les coordonnées GPS sont
tronquées à quatre décimales (≈ 11 m) avant stockage ou
transmission (règle GPS du §25).

</details>

## API

<details class="tech">
<summary>Sous le capot</summary>

| Méthode                    | Chemin                                | Rôle                                                                          |
| -------------------------- | ------------------------------------- | ----------------------------------------------------------------------------- |
| `GET`                      | `/api/calendar`                       | Calendrier du foyer, avec les vues personnelles mélangées.                    |
| `POST`                     | `/api/calendar/events`                | Créer un événement dans le calendrier du foyer.                               |
| `GET` / `PATCH` / `DELETE` | `/api/calendar/events/{id}`           | Lire / modifier / supprimer un événement.                                     |
| `PUT`                      | `/api/calendar/events/{id}/rsvps`     | Définir votre réponse. Corps : `{response: "yes" \| "no" \| "maybe", note?}`. |
| `GET`                      | `/api/calendar/events/{id}/rsvps`     | Lister l'état actuel de chaque invité.                                        |
| `POST`                     | `/api/calendar/events/{id}/reminders` | Configurer la fenêtre de rappel.                                              |
| `GET`                      | `/api/calendar/events/{id}.ics`       | Télécharger un seul événement sous forme de fichier iCalendar.                |
| `POST`                     | `/api/calendar/import/ics`            | Importer un fichier `.ics` ou l'URL d'un flux.                                |
| `POST`                     | `/api/calendar/import/image`          | OCR + extraction IA d'un événement depuis une capture d'écran.                |

Les calendriers propres à un espace utilisent la forme parallèle
`/api/spaces/{id}/calendar/*`, afin qu'un espace puisse héberger
sa propre série d'événements sans se mélanger à la vue superposée
du foyer.

</details>
