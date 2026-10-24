---
title: Installer sur Home Assistant
description: Installez l'app Social Home dans Home Assistant en environ cinq minutes. Pas de page Apps ? Faites tourner Social Home à côté de Home Assistant et ajoutez l'intégration depuis HACS.
order: 11
---

C'est la façon que nous recommandons. Social Home tourne comme app dans
votre Home Assistant, démarre avec lui, est sauvegardé avec lui et
s'ouvre depuis la barre latérale de Home Assistant. Vous n'avez ni port
à ouvrir, ni mot de passe à définir, ni jeton à copier : l'app s'occupe
de tout.

Il vous faut Home Assistant OS ou Home Assistant Supervised — si vous
avez une page **Apps** dans **Paramètres**, c'est bon — sur une machine
64 bits (un Home Assistant Green ou Yellow, un Raspberry Pi 4 ou 5, ou
un mini-PC), avec Home Assistant **2026.3 ou plus récent**.

Pas de page **Apps** ? Vous utilisez alors Home Assistant Container ou
Core, et [la partie ci-dessous](#home-assistant-sans-apps) est pour
vous.

## 1. Ajouter l'app

Cliquez sur le bouton et confirmez dans votre Home Assistant :

[**Ajouter Social Home à Home Assistant →**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=752dab87_socialhome&repository_url=https%3A%2F%2Fgithub.com%2Fsocial-home-io%2Fha-app)

Il ajoute le dépôt d'apps de Social Home et ouvre la page de l'app.

<details class="tech">
<summary>Sous le capot</summary>

À la main : dans Home Assistant, ouvrez **Paramètres → Apps**, allez
dans la boutique d'apps, choisissez **Dépôts** dans le menu à trois
points et collez

```
https://github.com/social-home-io/ha-app
```

Deux apps apparaissent : **Social Home** (stable, pour tous les jours)
et **Social Home (Early)** (release candidates, une version en avance
sur la stable — pour les foyers qui aiment essayer en premier). Les
images sont précompilées pour `aarch64` et `amd64`.

</details>

## 2. L'installer et la démarrer

Cliquez sur **Installer**. Cela prend environ une minute. Cliquez
ensuite sur **Démarrer**.

Au premier démarrage, l'app fait de vous son admin (la personne
propriétaire de votre Home Assistant) et se présente à Home Assistant.

<details class="tech">
<summary>Sous le capot</summary>

L'onglet **Journal** montre le premier démarrage :

```
[INFO] Starting Social Home...
[INFO] Configuration written to /data/social_home.toml
[INFO] HA owner detected: alex · provisioned as admin
[INFO] Integration token written to /data/integration_token.txt
[INFO] Discovery pushed to Supervisor
```

</details>

## 3. Accepter l'intégration

L'app apporte son intégration Home Assistant avec elle — rien à
télécharger ailleurs. En quelques secondes, Home Assistant affiche une
carte **Découvert** pour Social Home dans **Paramètres → Appareils et
services**. Cliquez sur **Configurer** et confirmez. Il n'y a rien à
saisir.

C'est l'intégration qui permet aux autres foyers de joindre votre
maison à l'adresse de votre Home Assistant. Elle peut aussi partager
où se trouvent vos proches selon Home Assistant, si vous l'activez.

## 4. Ouvrir Social Home

Cliquez sur **Social Home** dans la barre latérale de Home Assistant.
C'est tout : si vous pouvez joindre votre Home Assistant, vous pouvez
joindre Social Home — dans le navigateur et dans l'app Home Assistant
Companion. Chaque personne de votre maison qui l'ouvre depuis la barre
latérale reçoit son propre compte Social Home.

Les **sauvegardes** viennent avec celles de Home Assistant : restaurez
en une et Social Home est de retour, foyers jumelés compris.

Et ensuite ? Voir [Premiers pas → Après
l'installation](/fr/docs/getting-started/#après-linstallation).

## Home Assistant sans apps

Vous utilisez Home Assistant Container ou Home Assistant Core ? Ils
n'ont pas d'apps, mais Social Home fonctionne tout aussi bien avec
eux. Vous faites tourner Social Home à côté de Home Assistant, sur la
même machine ou une autre chez vous, puis vous ajoutez l'intégration
Social Home via [HACS](https://hacs.xyz/). Comptez une vingtaine de
minutes, une seule fois.

### 1. Créer un jeton pour Social Home

Social Home a besoin de l'autorisation de parler à votre Home
Assistant. Dans Home Assistant, ouvrez votre **profil** (en bas à
gauche), allez dans l'onglet **Sécurité** et, sous **Jetons d'accès
longue durée**, cliquez sur **Créer un jeton**. Nommez-le
« Social Home » et copiez-le. Vous le collerez à l'étape suivante.

### 2. Lancer Social Home

Lancez Social Home avec [Docker](/fr/docs/install-docker/) (le plus
simple ici, puisque vous faites sans doute déjà tourner Home Assistant
avec Docker) ou avec [Python](/fr/docs/install-python/). Suivez cette
page et donnez à Social Home trois réglages de plus :

| Réglage       | Ce qu'il faut mettre                                                        |
| ------------- | --------------------------------------------------------------------------- |
| `SH_MODE`     | `ha`                                                                        |
| `SH_HA_URL`   | l'adresse de votre Home Assistant, p. ex. `http://homeassistant.local:8123` |
| `SH_HA_TOKEN` | le jeton de l'étape 1                                                       |

Vous préférez un fichier de réglages ? Les trois mêmes vont dans
`socialhome.toml` : `mode = "ha"` sous `[server]`, et `url` et `token`
sous `[homeassistant]` — voir
[le fichier de réglages](/fr/docs/install-docker/#5-affiner-avec-un-fichier-de-réglages-facultatif).
Avec Docker, ce sont trois lignes `-e` de plus (ou trois lignes sous
`environment:` dans Compose) :

```sh
docker run -d --name socialhome --restart unless-stopped \
  -p 8099:8099 -v socialhome-data:/data \
  -e SH_MODE=ha \
  -e SH_HA_URL=http://homeassistant.local:8123 \
  -e SH_HA_TOKEN=collez-votre-jeton-ici \
  ghcr.io/social-home-io/socialhome:latest
```

### 3. Choisir qui administre

Ouvrez `http://<votre-serveur>:8099` dans un navigateur. Social Home
liste les personnes de votre Home Assistant : choisissez qui devient
admin et définissez un mot de passe pour vous connecter. (Personne dans
la liste ? Ajoutez-vous d'abord dans Home Assistant, dans
**Paramètres → Personnes**.)

### 4. Ajouter l'intégration depuis HACS

[HACS](https://hacs.xyz/) est la boutique communautaire que la plupart
des utilisateurs de Home Assistant ont déjà pour les intégrations en
plus. Si vous ne l'avez pas encore, son
[guide d'installation](https://hacs.xyz/docs/use/) vous accompagne.

1. Dans Home Assistant, ouvrez **HACS**, choisissez **Dépôts
   personnalisés** dans le menu à trois points, collez
   `https://github.com/social-home-io/ha-integration` et choisissez le
   type **Intégration**.
2. Cherchez **Social Home** dans HACS, cliquez sur **Télécharger**,
   puis redémarrez Home Assistant.
3. Allez dans **Paramètres → Appareils et services → Ajouter une
   intégration** et choisissez **Social Home**.
4. Deux choses vous sont demandées : l'adresse de Social Home
   (`http://<votre-serveur>:8099`) et un jeton d'API. Créez le jeton
   dans Social Home, dans **Paramètres → Sécurité**, et collez-le.

C'est fait. Les autres foyers joignent désormais votre maison à
l'adresse de votre Home Assistant, et Social Home peut partager où se
trouvent vos proches selon Home Assistant, si vous l'activez dans les
options de l'intégration.

<details class="tech">
<summary>Sous le capot</summary>

- `SH_MODE=ha` parle à Home Assistant via son API REST, avec le jeton
  longue durée ; l'app, elle, tourne en `haos` avec le Supervisor. Sans
  l'intégration, indiquez vous-même l'adresse pour les autres foyers :
  **Paramètres → Connexions → Adresse externe**.
- L'intégration transmet à Social Home l'URL externe (ou interne) de
  Home Assistant à la configuration et à chaque changement, relaie les
  serveurs STUN/TURN de Home Assistant (ceux de Nabu Casa compris),
  fait suivre les enveloppes de fédération sur
  `/api/socialhome/inbox/{id}` sans les lire, et — quand
  **sync location** est activé dans ses options — transmet les
  positions de `person.*`, tronquées à 4 décimales.
- Sauvegardes : hors de l'app, les sauvegardes de Home Assistant
  n'incluent pas Social Home. Téléchargez une sauvegarde dans
  **Admin → Sauvegarde** et créez-y aussi un **Kit de récupération** —
  c'est le kit qui ramène l'identité de votre foyer et les foyers
  jumelés sur un nouveau matériel.

</details>
