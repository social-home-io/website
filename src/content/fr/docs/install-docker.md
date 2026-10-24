---
title: Installer avec Docker
description: Faites tourner Social Home dans un conteneur Docker sur un serveur domestique ou un NAS — avec Home Assistant à côté, ou tout seul.
order: 12
---

Si vous avez un serveur domestique ou un NAS avec Docker, Social Home y
tourne dans un seul conteneur. Il fonctionne seul, avec ses propres
comptes et mots de passe, ou avec un Home Assistant qui tourne sans
apps.

Vous utilisez Home Assistant OS ? La
[Home Assistant App](/fr/docs/install-home-assistant/) est plus simple
— un clic, rien à entretenir.

## Ce qu'il vous faut

- Docker (avec Compose, si vous voulez) sur une machine 64 bits —
  `amd64` ou `arm64`, donc un Raspberry Pi 4 ou 5 convient aussi.
- De la place pour les données de Social Home. Les exemples ci-dessous
  les gardent dans un volume Docker nommé `socialhome-data` ; c'est là
  que vivent les publications, photos et clés de votre foyer.

## 1. Démarrer le conteneur

Avec Docker Compose, enregistrez ceci sous `docker-compose.yml` :

```yaml
services:
  socialhome:
    image: ghcr.io/social-home-io/socialhome:latest
    container_name: socialhome
    restart: unless-stopped
    ports:
      - "8099:8099"
    volumes:
      - socialhome-data:/data

volumes:
  socialhome-data:
```

et démarrez-le :

```sh
docker compose up -d
```

Ou avec Docker seul :

```sh
docker run -d --name socialhome --restart unless-stopped \
  -p 8099:8099 -v socialhome-data:/data \
  ghcr.io/social-home-io/socialhome:latest
```

Vous utilisez Home Assistant Container ou Core ? Ajoutez avant le
démarrage les trois réglages Home Assistant de
[Home Assistant sans apps](/fr/docs/install-home-assistant/#home-assistant-sans-apps),
puis continuez là-bas.

## 2. Créer votre compte admin

Ouvrez `http://<votre-serveur>:8099` dans un navigateur. La première
visite ouvre **Configurer Social Home** : choisissez un nom
d'utilisateur et un mot de passe. Vous êtes admin, et c'est de là que
vous faites venir le reste de votre foyer.

## 3. Être joignable par les autres foyers

Pour vous jumeler directement avec un foyer, le vôtre a besoin d'une
adresse qu'il peut joindre — par exemple `https://social.example.com`
via le reverse proxy que vous utilisez déjà chez vous pour autre chose.
Indiquez-la dans **Paramètres → Connexions → Adresse externe**.

Pas d'adresse à vous ? Aucun souci : vous pouvez vous jumeler via un
[GFS (Global Federation Server)](/fr/docs/glossary/#gfs), le relais qui
aide les foyers à se trouver. Vos publications restent scellées en
chemin.

## 4. Garder une sauvegarde

Vos données vivent dans le volume `socialhome-data`. De temps en temps,
ouvrez **Admin → Sauvegarde** : téléchargez une sauvegarde et créez un
**Kit de récupération**. Le kit est un fichier scellé, protégé par une
phrase de passe que vous choisissez. Il ramène votre foyer et ses
foyers jumelés sur un nouveau matériel si un disque lâche un jour.
Créez-en un nouveau après chaque nouveau jumelage.

## Mettre à jour

```sh
docker compose pull
docker compose up -d
```

`latest` suit les versions stables. Pour rester sur une version
connue, utilisez plutôt son tag, par exemple
`ghcr.io/social-home-io/socialhome:2026.10.24`.

<details class="tech">
<summary>Sous le capot</summary>

- Image `ghcr.io/social-home-io/socialhome`, multi-arch
  (`linux/amd64`, `linux/arm64`). Tags : `YYYY.M.D[.N]` (figé),
  `YYYY.M` et `YYYY` (glissants), `latest` (version stable actuelle).
- Tourne avec un utilisateur non root (uid 10001), avec
  `SH_DATA_DIR=/data` et `SH_MODE=standalone` (comptes locaux, mots de
  passe hachés avec scrypt). Mettez `SH_MODE=ha` plus `SH_HA_URL` et
  `SH_HA_TOKEN` pour utiliser Home Assistant à la place.
- Le port `8099` sert l'interface web, l'API et le WebSocket. Le port
  `8100` est le tableau de bord du foyer pour la tablette murale, éteint
  tant qu'un admin ne l'active pas ; ne le publiez que si vous
  l'utilisez, et seulement sur votre réseau domestique.
- Chaque réglage de `socialhome.toml` a une variable d'environnement
  `SH_*`, prioritaire sur le fichier ; faites pointer `SH_CONFIG` vers un
  fichier pour en utiliser un. Le fichier d'exemple est
  [`socialhome.toml.example`](https://github.com/social-home-io/socialhome/blob/main/socialhome.toml.example).
- Un bind mount au lieu du volume ? Rendez le dossier accessible en
  écriture pour l'uid 10001 (`sudo chown 10001:10001 ./data`).
- Healthcheck : `GET /healthz`.

</details>
