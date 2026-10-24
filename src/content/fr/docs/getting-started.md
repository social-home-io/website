---
title: Premiers pas
description: Le plus simple est de faire tourner Social Home comme app dans Home Assistant — un clic, environ cinq minutes. Docker et Python fonctionnent aussi.
order: 10
---

Social Home tourne chez vous, sur un ordinateur que vous avez déjà. La
façon la plus simple — et celle que nous recommandons — est l'**app
Social Home pour Home Assistant**. Si vous utilisez Home Assistant OS
(sur un Home Assistant Green ou Yellow, un Raspberry Pi ou un mini-PC)
ou Home Assistant Supervised, c'est un clic et environ cinq minutes,
café compris.

[**Ajouter Social Home à Home Assistant →**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=752dab87_socialhome&repository_url=https%3A%2F%2Fgithub.com%2Fsocial-home-io%2Fha-app)

Le bouton ouvre votre Home Assistant, ajoute l'app et vous montre le
bouton **Installer**. L'app s'occupe de tout : votre compte et la
connexion à Home Assistant. Il n'y a rien à saisir et aucun port à
ouvrir. Le [guide pas à pas](/fr/docs/install-home-assistant/) vous
accompagne et montre à quoi vous attendre.

## Autres façons d'installer

Pas de Home Assistant OS ? Social Home tourne aussi ailleurs. Le fil,
l'agenda, les espaces et le jumelage fonctionnent partout de la même
façon ; ce qui change, c'est ce que vous configurez à la main.
Quelques extras viennent de Home Assistant — la voix, les
notifications via l'app Home Assistant Companion, et les lieux et
personnes qui suivent votre Home Assistant — il faut donc Home
Assistant à côté de Social Home pour en profiter.

| Comment                                                                               | Idéal pour                                                               | Effort             |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------ |
| [Home Assistant App](/fr/docs/install-home-assistant/)                                | Home Assistant OS — **recommandé**                                       | un clic            |
| [Home Assistant sans apps](/fr/docs/install-home-assistant/#home-assistant-sans-apps) | Home Assistant Container ou Core, plus l'intégration depuis HACS         | environ 20 minutes |
| [Conteneur Docker](/fr/docs/install-docker/)                                          | un serveur domestique ou un NAS avec Docker, avec ou sans Home Assistant | environ 15 minutes |
| [Python](/fr/docs/install-python/)                                                    | essayer sur votre ordinateur portable, ou un serveur que vous gérez      | environ 15 minutes |

Vous hésitez ? Si votre Home Assistant a une page **Apps** dans
**Paramètres**, choisissez l'app.

## Après l'installation

- **Faites venir votre foyer.** Chaque personne de votre maison a son
  propre compte. Avec la Home Assistant App, quiconque ouvre Social
  Home depuis la barre latérale de Home Assistant en reçoit un
  automatiquement.
- **Jumeler un autre foyer :** **Paramètres → Connexions → Jumeler un
  foyer**. Voir [Des foyers fédérés](/fr/docs/federation/) pour la
  démarche avec le QR code.
- Avec un assistant vocal dans Home Assistant, essayez
  _« Hey HA, ajoute de l'huile d'olive à la liste de courses. »_
