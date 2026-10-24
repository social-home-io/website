---
title: Installer avec Python
description: Installez Social Home depuis PyPI et lancez-le avec Python — pour l'essayer sur votre ordinateur portable, ou sur un serveur que vous gérez vous-même.
order: 13
---

Social Home est un programme Python : vous pouvez donc l'installer
comme tel. C'est pratique pour l'essayer sur votre ordinateur portable,
ou pour le faire tourner sur un serveur que vous gérez déjà. Pour une
maison où tout doit simplement marcher, la
[Home Assistant App](/fr/docs/install-home-assistant/) ou
[Docker](/fr/docs/install-docker/) demandent moins d'entretien.

## Ce qu'il vous faut

- **Python 3.14** ou plus récent. Vérifiez avec `python3 --version`.
- Linux 64 bits (x86 ou ARM, comme un Raspberry Pi 4 ou 5), ou un Mac
  avec puce Apple.

## 1. Installer

Donnez à Social Home un dossier à lui et installez-le dedans, pour
qu'il ne gêne rien d'autre sur la machine :

```sh
python3.14 -m venv ~/socialhome
~/socialhome/bin/pip install socialhome
```

## 2. Le lancer

```sh
~/socialhome/bin/python -m socialhome
```

Social Home répond maintenant sur le port 8099. Laissez le terminal
ouvert, ou faites-le tourner comme service (voir « Sous le capot »).

## 3. Créer votre compte admin

Ouvrez `http://localhost:8099` (ou `http://<votre-serveur>:8099`) dans
un navigateur. La première visite ouvre **Configurer Social Home** :
choisissez un nom d'utilisateur et un mot de passe. Vous êtes admin, et
c'est de là que vous faites venir le reste de votre foyer.

Vous utilisez Home Assistant Container ou Core à côté ? Définissez
avant le premier lancement les trois réglages Home Assistant de
[Home Assistant sans apps](/fr/docs/install-home-assistant/#home-assistant-sans-apps),
puis continuez là-bas.

## 4. Être joignable par les autres foyers et garder une sauvegarde

Les deux fonctionnent comme avec Docker : une **Adresse externe** dans
**Paramètres → Connexions** si des foyers doivent vous joindre
directement (ou vous vous jumelez via un GFS), et une sauvegarde plus
un **Kit de récupération** dans **Admin → Sauvegarde**. Voir
[Installer avec Docker](/fr/docs/install-docker/#3-être-joignable-par-les-autres-foyers).

## Affiner avec un fichier de réglages (facultatif)

Les réglages de tous les jours se trouvent dans l'interface web. Pour
les quelques éléments que Social Home lit au démarrage — un serveur
TURN pour les appels, une limite de stockage, votre propre GFS, la
connexion à Home Assistant — il existe un fichier de réglages. Copiez
le fichier d'exemple, où chaque réglage est commenté et expliqué, là
où Social Home le cherche :

```sh
mkdir -p ~/.config/socialhome
curl -o ~/.config/socialhome/socialhome.toml https://raw.githubusercontent.com/social-home-io/socialhome/main/socialhome.toml.example
```

Retirez le `#` devant les lignes voulues, mettez vos valeurs et
redémarrez Social Home. Une variable d'environnement l'emporte
toujours sur le fichier, et un fichier contenant une faute est ignoré
en entier — vérifiez donc que votre changement a été pris en compte.
Plus de détails dans
[Installer avec Docker](/fr/docs/install-docker/#5-affiner-avec-un-fichier-de-réglages-facultatif).

## Mettre à jour

```sh
~/socialhome/bin/pip install --upgrade socialhome
```

Puis redémarrez Social Home.

<details class="tech">
<summary>Sous le capot</summary>

- Paquet [`socialhome`](https://pypi.org/project/socialhome/) sur PyPI ;
  versions en CalVer, une par version publiée. Ses dépendances directes
  sont figées exactement ; pour l'ensemble entièrement verrouillé,
  installez depuis le dépôt avec `uv sync --locked`.
- Les données vont dans `~/.local/share/socialhome` (`SH_DATA_DIR`), le
  fichier de configuration est `~/.config/socialhome/socialhome.toml`
  (`SH_CONFIG`). Chaque réglage a une variable d'environnement `SH_*`,
  prioritaire sur le fichier ; voir
  [`socialhome.toml.example`](https://github.com/social-home-io/socialhome/blob/main/socialhome.toml.example).
- Le mode par défaut est `standalone` (comptes locaux). Écoute sur
  `0.0.0.0:8099` (`SH_LISTEN_HOST`, `SH_LISTEN_PORT`).
- Pour qu'il continue de tourner, une unité systemd minimale :

  ```ini
  [Unit]
  Description=Social Home
  After=network-online.target

  [Service]
  User=socialhome
  ExecStart=/home/socialhome/socialhome/bin/python -m socialhome
  Restart=on-failure

  [Install]
  WantedBy=multi-user.target
  ```

</details>
