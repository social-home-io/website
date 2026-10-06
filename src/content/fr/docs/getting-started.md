---
title: Premiers pas
description: Installez le module complémentaire Social Home, validez l'invite d'intégration en un clic, et c'est fini. Cinq minutes environ, café compris.
order: 10
---

Social Home s'installe comme module complémentaire Home Assistant ;
il vous faut donc un Home Assistant avec le Supervisor — c'est-à-dire
**Home Assistant OS** ou **Home Assistant Supervised**, sur une
machine aarch64 (Raspberry Pi, Home Assistant Green/Yellow) ou
amd64, avec Home Assistant **2026.3 ou plus récent**. Si vous
utilisez plutôt la version Container ou Core, vous pouvez faire
tourner Social Home comme
[conteneur Docker autonome](https://github.com/social-home-io/socialhome#docker)
(il expose les ports 8099 et 8124) et ajouter l'intégration à la
main.

## 1. Ajouter le dépôt de modules complémentaires

Cliquez sur le
[bouton « Ajouter à Home Assistant » en un clic](https://my.home-assistant.io/redirect/supervisor_addon/?addon=752dab87_socialhome&repository_url=https%3A%2F%2Fgithub.com%2Fsocial-home-io%2Fha-app)
— il ajoute le dépôt et ouvre la page du module complémentaire pour
vous.

Vous préférez le faire à la main ? Dans Home Assistant, ouvrez
**Paramètres → Modules complémentaires → Boutique des modules
complémentaires**. Cliquez sur le menu à trois points en haut à
droite et choisissez **Dépôts**. Collez cette URL :

```
https://github.com/social-home-io/ha-app
```

Deux nouveaux modules complémentaires apparaissent : **Social
Home** (stable, recommandé) et **Social Home (Early)** (versions
candidates, une version en avance sur la stable — pour les foyers
qui aiment essayer en premier).

## 2. Installer **Social Home**

Cliquez sur **Installer**. Les images sont préconstruites, cela
prend donc environ une minute. Cliquez ensuite sur **Démarrer** et
ouvrez l'onglet **Journal** pour confirmer que l'amorçage a réussi :

```
[INFO] Starting Social Home...
[INFO] Configuration written to /data/social_home.toml
[INFO] HA owner detected: alex · provisioned as admin
[INFO] Integration token written to /data/integration_token.txt
[INFO] Discovery pushed to Supervisor
```

## 3. Ajouter l'intégration

Le module complémentaire embarque l'intégration Home Assistant et
la copie dans `custom_components` au démarrage — rien à
télécharger, rien à installer d'ailleurs. En quelques secondes,
Home Assistant affiche une carte de découverte sous **Paramètres →
Appareils et services**. Cliquez sur **Configurer** sur la carte
Social Home. Il n'y a rien à saisir — le module complémentaire a
déjà créé un admin et généré un jeton.

## 4. Ouvrir l'interface web

Cliquez sur l'entrée **Social Home** dans la barre latérale de HA
(l'icône est une petite maison avec une bulle de discussion). La
page s'ouvre via Home Assistant Ingress sur le port 8099 ; il n'y a
donc aucun port à rediriger et rien à exposer — si vous pouvez
joindre votre Home Assistant, vous pouvez joindre Social Home. La
première requête vous enregistre comme membre ordinaire ;
l'utilisateur admin créé par le module complémentaire au premier
démarrage est le vôtre par défaut.

## Et ensuite

- Jumelez un autre foyer : **Paramètres → Connexions → Jumeler un
  foyer** dans l'interface web. Voir
  [Des foyers fédérés](/fr/docs/federation/) pour le parcours par
  scan de QR code.
- Définissez une URL externe pour que les autres foyers puissent
  vous joindre. HA transmet automatiquement à Social Home ce que
  vous mettez dans **Paramètres → Réseau → URL externe** (ou votre
  interface distante Nabu Casa) — aucune étape manuelle.
- Si vous avez une configuration vocale HA avec micro, essayez
  _« Hey HA, ajoute de l'huile d'olive à la liste de courses. »_
