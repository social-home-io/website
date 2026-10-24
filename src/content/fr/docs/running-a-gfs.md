---
title: Héberger un relais vous-même
description: Mettez en place un Global Federation Server (GFS) sur un VPS en 15 minutes environ. Docker Compose + Cloudflare, c'est tout.
order: 60
---

Un relais, c'est ce qui permet à des foyers qui ne se sont jamais
jumelés de se trouver — un espace public de parents, par exemple,
ou un panneau de quartier que n'importe qui peut suivre.
N'importe qui peut en héberger un, et cette page vous guide en
15 minutes environ.

Le [GFS (Global Federation Server – le serveur de fédération
global)](/fr/docs/glossary/#gfs) — le relais qui aide les foyers
à se trouver — a trois rôles. C'est un annuaire, pour que les
foyers puissent trouver les espaces globaux dont le propriétaire
l'a choisi. Il transporte les
publications scellées vers des foyers qui ne sont pas jumelés
entre eux — les abonnés d'un espace global, les membres qui ont
rejoint avec un Lien GFS, les espaces privés dont le propriétaire
a activé le GFS, et les foyers jumelés qui ont activé la solution
de repli GFS — pour qu'un espace continue de vivre pendant que son
hôte dort. Et il sert d'intermédiaire pour les liens publics vers un
Highlight — voir
[Highlights → partager publiquement](/fr/docs/highlights/#partager-publiquement-via-un-serveur-global)
pour le parcours côté auteur. Dans chacun de ces rôles, il ne
manipule que des enveloppes : il ne lit jamais un message, ne
stocke jamais une image de Highlight et ne sert jamais la page
qu'ouvre un lien public. Héberger votre propre
relais, c'est laisser votre communauté décider qui peut la
rejoindre, sans aucune partie unique au centre.

## Ce qu'il vous faut

- Un VPS avec une IP publique — n'importe quel fournisseur fera
  l'affaire.
- Un nom de domaine. Un sous-domaine suffit — `gfs.example.com`.
- Un compte Cloudflare sur l'offre gratuite, utilisé pour
  terminer le TLS et comme bouclier anti-DDoS.
- Docker installé sur le VPS.

Environ 15 minutes du début à la fin.

## 1. Faites pointer votre domaine vers le serveur

Dans le DNS Cloudflare, ajoutez un **enregistrement A** :

| Type | Nom   | Adresse IPv4     | Statut du proxy |
| ---- | ----- | ---------------- | --------------- |
| A    | `gfs` | `YOUR.SERVER.IP` | 🟠 Proxied      |

> Le statut « Proxied » (nuage orange) signifie que Cloudflare
> gère le HTTPS pour vous — aucun certificat à installer, aucun
> renouvellement à gérer. Votre serveur n'a besoin de parler que
> du HTTP en interne.

Puis, dans **Cloudflare → SSL/TLS → Overview**, réglez le mode de
chiffrement sur **Flexible** — le relais lui-même écoute en HTTP
simple derrière le proxy. Si vous préférez terminer le TLS
vous-même sur le serveur (Caddy devant le conteneur, par
exemple), choisissez plutôt **Full (strict)**.

## 2. Créez le répertoire du projet

Connectez-vous à votre VPS en SSH :

```bash
mkdir -p ~/gfs/data
cd ~/gfs
```

## 3. `docker-compose.yml`

```yaml
services:
  gfs:
    image: ghcr.io/social-home-io/gfs:latest
    container_name: gfs
    restart: unless-stopped
    command: ["socialhome-global-server", "--config", "/var/lib/sh-gfs/global_server.toml"]
    volumes:
      - ./data:/var/lib/sh-gfs
    ports:
      - "80:8765"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8765/healthz"]
      interval: 30s
      timeout: 5s
      retries: 3
```

## 4. Initialisez la configuration

```bash
docker run --rm -v "$PWD/data:/var/lib/sh-gfs" \
  ghcr.io/social-home-io/gfs:latest \
  socialhome-global-server --init --config /var/lib/sh-gfs/global_server.toml

docker run --rm -it -v "$PWD/data:/var/lib/sh-gfs" \
  ghcr.io/social-home-io/gfs:latest \
  socialhome-global-server --set-password --config /var/lib/sh-gfs/global_server.toml
```

`--init` écrit une configuration neuve ; `--set-password` définit
le mot de passe du portail d'administration, que vous trouverez
sur `https://gfs.example.com/admin` une fois le relais lancé.

Ouvrez `data/global_server.toml` et renseignez votre domaine :

```toml
[server]
base_url = "https://gfs.example.com"
```

<details class="tech">
<summary>Sous le capot</summary>

Chaque option de `global_server.toml` peut aussi être définie par
une variable d'environnement préfixée `GFS_` — pratique si vous
préférez garder le fichier compose autonome :

| Variable          | Clé de configuration   | Par défaut        |
| ----------------- | ---------------------- | ----------------- |
| `GFS_HOST`        | `[server] host`        | `0.0.0.0`         |
| `GFS_PORT`        | `[server] port`        | `8765`            |
| `GFS_BASE_URL`    | `[server] base_url`    | —                 |
| `GFS_DATA_DIR`    | répertoire des données | `/var/lib/sh-gfs` |
| `GFS_OPEN_SIGNUP` | `open_signup`          | `false`           |

Pour une même clé, la variable d'environnement l'emporte sur le
fichier.

</details>

## Valeurs par défaut

Dès l'installation, un relais neuf est prudent là où il faut.
Les foyers qui se jumellent avec lui sont acceptés
automatiquement (`auto_accept_clients`), pour que les gens
puissent se connecter sans que vous ayez à cliquer. Les espaces
publiés sur votre relais, en revanche, attendent votre
approbation dans le portail d'administration
(`auto_accept_spaces = false`) — votre annuaire ne liste que ce
que vous avez examiné. L'inscription ouverte est désactivée, donc
personne ne peut créer de compte sur le relais lui-même tant que
vous ne l'activez pas.

## 5. Ouvrez le pare-feu

Sur le VPS :

```bash
sudo ufw allow 80/tcp        # proxy Cloudflare → GFS
```

Le port 8765 n'a **pas** besoin d'être ouvert — il est interne au
réseau Docker.

## 6. Démarrez le relais

```bash
docker compose up -d
```

Vérifiez qu'il répond depuis votre ordinateur portable :

```sh
curl https://gfs.example.com/healthz
# → {"status":"ok","version":"…"}
```

## 7. Connectez-vous depuis Social Home

Dans Social Home → **Paramètres → Connexions → Global Federation
Servers → Ajouter un GFS** :

- URL : `https://gfs.example.com`
- Cliquez sur **Jumeler**

Terminé. Si votre relais distribue des jetons de jumelage (depuis
le portail d'administration, par exemple), chaque jeton est à
usage unique et valable 10 minutes.

## Ce que verra votre relais

Héberger un relais ne vous ouvre pas une fenêtre sur l'espace de
qui que ce soit. Les publications arrivent scellées et complétées
à taille fixe ; vous apprenez à quel espace appartient une
enveloppe et quand elle est arrivée, mais pas quel foyer l'a
publiée. En mode strict, vous ne pouvez même pas savoir quels
foyers ont le droit d'écrire. Pour le tableau
complet, y compris ce que le relais peut encore observer
(horodatage, tailles, adresses IP), lisez le
[modèle de sécurité](/fr/docs/security/).

## Vos pages publiques

Les personnes qui ne sont pas sur Social Home atteignent votre relais
par des liens : la page d'un espace global (`/spaces/…`), un lien
d'invitation GFS (`/join/…`) et un profil Momentum (`/moments/…`).
Votre relais ne dessine pas ces pages lui-même. Il les confie à la
[visionneuse Social Home](/fr/docs/glossary/#visionneuse) sur
`viewer.social-home.io`, qui lit ce dont elle a besoin auprès de
votre relais et l'affiche dans la langue du visiteur. Les liens
publics de highlights et de moments s'ouvrent dans la même
visionneuse.

C'est une protection pour les personnes qui utilisent votre relais —
et pour vous. Vous ne pouvez pas lire un highlight partagé via votre
relais, et vous ne pourriez pas modifier la page qui l'ouvre, même
si quelqu'un vous le demandait. Les applications de messagerie
reçoivent toujours un aperçu avec le nom et la photo de l'espace ou
de la personne : votre relais leur répond avec une petite page sans
scripts.

Il n'y a rien à configurer. Si vous préférez ne pas dépendre de la
visionneuse du projet, hébergez vous-même les fichiers publiés de la
visionneuse et faites pointer le réglage ci-dessous vers eux. Ou
videz-le, et votre relais dessine de nouveau ses pages lui-même.
C'est moins sûr : pour les liens de highlight, votre relais redevient
responsable de la page qui lit la clé.

<details class="tech">
<summary>Sous le capot</summary>

- Réglage : `[server] public_viewer_base_url` /
  `GFS_PUBLIC_VIEWER_BASE_URL`, par défaut
  `https://viewer.social-home.io`. Les foyers ont le leur :
  `[highlights] public_viewer_base_url` /
  `SH_HIGHLIGHTS_PUBLIC_VIEWER_BASE_URL`. Seul `https://` est
  utilisé ; tout le reste revient en arrière avec un avertissement
  dans le journal.
- Le passage n'est pas une redirection ouverte : la cible est le
  réglage, la version de visionneuse versionnée et votre propre
  `base_url` ; seul un identifiant dans l'alphabet de la visionneuse
  est transmis, dans le fragment.
- La visionneuse lit `GET /gfs/pages/spaces/{id}`,
  `POST /gfs/pages/invite` (jeton dans le corps) et
  `GET /gfs/pages/people/{user}` : anonymes, CORS sans identifiants,
  dans la limite de fréquence des pages de 30 / min / IP.
- Pour les highlights publics, `GET /gfs/highlights/ice-servers`
  fournit à chaque réponse un identifiant TURN fraîchement créé quand
  `[webrtc] turn_url` et `turn_secret` sont définis (valable
  `turn_ttl_seconds`, 600 par défaut) — jamais un identifiant fixe.
  Limitez aussi le débit sur le serveur TURN lui-même.

</details>

## Mettre à jour

```bash
cd ~/gfs
docker compose pull
docker compose up -d
```

Le conteneur est sans état, à l'exception de `./data` ; une
sauvegarde est un simple `tar -czf data.tgz ./data`.

## Le relais du projet

Si vous ne voulez pas héberger le vôtre, le projet gère un relais
public à l'adresse [`gfs.social-home.io`](/fr/servers/) — un scan
de code QR et vous êtes jumelé. Pointer votre espace vers un
relais de confiance est pourtant tout l'intérêt d'avoir le choix,
alors héberger le vôtre est encouragé pour toute communauté de
plus d'une poignée de foyers.
