---
title: Sécurité familiale
description: Des comptes protégés pour les enfants — espaces et apps à limite d'âge, messages privés gardés près de la maison, et un aperçu discret en lecture seule pour les tuteurs.
order: 28
---

Social Home est conçu pour les foyers, et les foyers comptent des
enfants. La **sécurité familiale** permet à un admin du foyer de
donner à un enfant un compte avec des garde-fous raisonnables
intégrés — sans transformer la maison en système de surveillance.

## Comptes protégés

Un admin du foyer peut marquer un membre comme **mineur protégé**,
définir son **âge déclaré** et lui assigner un ou plusieurs
**tuteurs**. Cet âge déclaré façonne ensuite discrètement ce que
le compte peut atteindre :

- **Espaces à limite d'âge** — un mineur protégé ne peut pas
  rejoindre un espace dont l'âge minimum est supérieur à son âge
  déclaré. La limite est appliquée partout où un membre entre, y
  compris à travers les foyers jumelés, et elle voyage avec
  l'espace quand il se fédère — un espace distant ne peut donc pas
  la contourner.
- **Apps à limite d'âge** — les apps qu'un admin a placées
  derrière une limite d'âge ne s'ouvrent pas pour un compte trop
  jeune.
- **Les messages privés restent près de la maison** — les messages
  privés d'un mineur protégé sont limités aux foyers avec lesquels
  vous êtes directement jumelés, pas à la fédération élargie.
- **Aucune surface publique** — un compte protégé est refusé
  d'emblée dans le Bazar (la place de marché), les espaces publics,
  les moments publics, les liens publics de highlights et les
  jetons d'API. Il n'existe aucun réglage pour assouplir cela.

## La vue tuteur

Un tuteur dispose d'un aperçu en **lecture seule** des personnes et
des lieux du monde de son enfant — les espaces où il est, à qui il
parle, ses contacts en messages privés, et les personnes qu'il a
bloquées. C'est une fenêtre pour qu'un parent reste au courant, pas
un jeu de télécommandes, et elle n'atteint jamais le contenu des
messages.

## Les limites d'âge sont aussi un réglage d'espace

N'importe quel espace — pas seulement ceux pensés pour les enfants
— peut fixer un **âge minimum** (13, 16 ou 18 ans — ou aucun) et un
public cible. Les admins le règlent une fois, et l'âge minimum est
vérifié sur chaque chemin qui fait entrer un membre : adhésion
locale, adhésion depuis un foyer jumelé, et adhésion via un Lien
GFS. Aucun chemin ne saute la vérification. Voir
[Espaces globaux](/fr/docs/global-spaces/) pour savoir comment un
relais transporte une politique d'âge dans un annuaire public.

<details class="tech">
<summary>Sous le capot</summary>

`min_age ∈ {0, 13, 16, 18}` fait partie des réglages signés de
l'espace et est évalué par le même code d'entrée pour les
adhésions locales, les adhésions fédérées depuis des foyers
jumelés et les adhésions par Lien GFS. Les comptes protégés
(`protected_minor = true`) sont refusés au niveau de la couche de
service pour le Bazar, les espaces de portée publique, Momentum
public, les liens publics de highlights et les jetons d'API
personnels, quel que soit l'âge déclaré.

</details>
