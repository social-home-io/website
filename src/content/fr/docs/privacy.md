---
title: Modèle de confidentialité
description: Ce que Social Home conserve, ce qui voyage, et ce que personne — nous compris — ne peut jamais voir.
order: 50
---

Social Home repose sur une règle simple : **le foyer garde tout**.
Il n'y a pas de compte cloud, pas de mesure d'audience, pas de
journalisation distante, pas d'équipe growth. Le site que vous
lisez en ce moment est du HTML statique servi par GitHub Pages —
sans mesure d'audience, sans cookies, sans requêtes vers des tiers ;
même les polices sont servies depuis le même endroit.

Cette page liste chaque donnée que Social Home touche et exactement
où elle va. La page du [modèle de sécurité](/fr/docs/security/)
explique comment fonctionne le scellement et ce qu'il ne peut pas
faire ; les mots employés ici sont dans [Les mots que nous
utilisons](/fr/docs/glossary/).

## Ce qui est stocké où

| Donnée                                             | Stockée à la maison ?     | Quitte votre serveur ?                                                                        |
| -------------------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------- |
| Messages, publications, photos                     | oui                       | seulement vers les foyers de l'espace, scellés                                                |
| Messages privés                                    | oui                       | scellés vers le serveur de l'autre foyer                                                      |
| Liste de courses                                   | oui                       | seulement entre les appareils de votre foyer                                                  |
| Événements de calendrier                           | oui                       | seulement vers les foyers qui partagent le calendrier                                         |
| Transcriptions vocales                             | oui (le texte)            | comme les publications                                                                        |
| Avatars + noms affichés                            | oui                       | oui — vers les foyers jumelés (c'est ainsi qu'ils vous reconnaissent)                         |
| Clé publique (identité)                            | oui                       | oui — c'est littéralement le but du jumelage                                                  |
| URL externe                                        | oui                       | oui — vers les foyers jumelés quand elle change                                               |
| Votre compte Home Assistant (e-mail, mot de passe) | **jamais lu**             | jamais                                                                                        |
| GPS / historique de position                       | **jamais** par défaut     | seulement la zone actuelle, seulement si vous l'activez ; épingles de carte arrondies à ~11 m |
| Journaux                                           | restent sur votre serveur | jamais                                                                                        |

## Ce que voit le relais global

Le GFS (Global Federation Server) — le relais qui aide les foyers à
se trouver — transporte les publications des espaces publics et
globaux sous forme d'enveloppes scellées. Ce qu'il apprend sur vous
dépend de la configuration de l'espace (voir
[GFS](/fr/docs/glossary/#gfs) dans le glossaire) :

- **Confiance** (par défaut) : quel foyer a publié dans quel espace
  listé, et quand.
- **Strict** (activé par espace) : seulement que _quelqu'un_ dans
  l'espace a publié. L'expéditeur est anonyme parmi les rédacteurs
  de l'espace.
- **Un espace privé avec l'interrupteur GFS activé** (désactivé par
  défaut) : quels foyers appartiennent au canal — jamais le nom,
  l'identifiant, la clé ou le contenu de l'espace.

Il ne voit **jamais** :

- Le contenu d'un message, d'une publication, d'un événement de
  calendrier, d'une photo ou d'une note vocale.
- Quoi que ce soit d'un espace privé avec l'interrupteur GFS
  désactivé, ou d'un espace du foyer.
- La liste de courses, le calendrier, la présence ou les journaux
  de votre foyer.

Il voit votre adresse IP, les horaires et la taille approximative
de chaque enveloppe, et quels foyers reçoivent les publications
d'un espace.

Aucun relais n'intervient du tout si vous n'avez ni espace public
ou global, ni moment public, ni lien public de highlight, ni espace
privé avec l'interrupteur GFS activé. Votre foyer ne parle alors
qu'aux foyers avec lesquels vous êtes jumelé, directement.

<details class="tech">
<summary>Sous le capot</summary>

Métadonnées de routage uniquement : `space_id`, `event_type`,
classe de taille (1 / 4 / 16 / 64 / 128 KiB, plus 191 KiB pour le
relais d'enveloppes), horaires, ensemble des abonnés, IP source.
Une publication relayée par le foyer hôte est sans identité,
`{space_id, event_type, payload}` sur une session sans cookie ; un
membre qui publie pour lui-même signe avec la clé du foyer en mode
de confiance et avec une clé d'écriture partagée par époque en
mode strict. Un espace privé avec `private_gfs` activé utilise un
identifiant de canal opaque de 128 bits. Les destinataires hors
ligne sont mis en file 24 h (2000 enveloppes / 64 MiB par
destinataire) ; aucun contenu n'est conservé au-delà.

</details>

## Chiffrement

Chaque message qui quitte votre serveur est chiffré — toujours,
sans interrupteur à oublier. Chaque publication est scellée dans
une enveloppe et signée, pour que seuls les foyers de l'espace
puissent l'ouvrir et que même un relais malveillant ne puisse pas
en lire un mot. Les messages privés sont scellés de votre maison à
la leur. Il n'y a pas d'interrupteur « chiffré / non chiffré » et
aucun repli en clair : si un espace ne peut pas sceller, il
n'envoie pas.

La règle est simple : rien ne quitte la maison sans être scellé, et
rien de ce qu'un relais touche n'est jamais lisible.

<details class="tech">
<summary>Sous le capot</summary>

Enveloppes AES-256-GCM, signatures Ed25519. Les seuls champs
lisibles d'une enveloppe sont `event_type`, `from_instance`,
`to_instance`, `space_id` et `epoch`. Tous les détails sur la page
du [modèle de sécurité](/fr/docs/security/).

</details>

## Ce que Social Home n'a pas

- Un compte sur un cloud Social Home (il n'y en a pas).
- Une copie de vos données ailleurs. Si vous avez installé le
  module complémentaire, Social Home fait partie de votre
  sauvegarde Home Assistant habituelle ; sur une installation
  autonome, téléchargez un kit de récupération (Recovery Kit) et
  gardez-le en lieu sûr.
- De la télémétrie, de la mesure d'audience, des rapports de
  plantage ou des tests A/B.
- Une surface publicitaire.
- Une équipe growth qui cherche à monétiser votre soirée.

<details class="tech">
<summary>Sous le capot</summary>

Les clés au repos sont enveloppées sous une KEK. Le Recovery Kit
est un fichier `.shrk` scellé avec scrypt + AES-256-GCM.

</details>

## Ce que vous contrôlez

- **Qui est dans un espace** (Paramètres → Espaces — invitez ou
  retirez des membres ; chaque changement de membres donne une
  nouvelle clé à l'espace, de sorte qu'une personne retirée ne peut
  rien lire de ce qui est publié ensuite).
- **Le partage de présence** (Paramètres → Confidentialité — sur
  activation, par membre du foyer, désactivable à tout moment).
- **Le jumelage** (Paramètres → Connexions — retirez un foyer et
  sa copie de vos messages cesse d'être de confiance).
- **Quel relais, s'il y en a un** (Paramètres → Connexions — le
  GFS est facultatif et vous choisissez lequel).
- **Les sauvegardes** — votre responsabilité, comme tout le reste
  chez vous.

## Signaler un problème

Les problèmes de sécurité se signalent dans
[`social-home-io/socialhome`](https://github.com/social-home-io/socialhome/security)
sur GitHub. Merci de les signaler en privé via le lien GitHub
Security Advisories plutôt que dans une issue publique.
