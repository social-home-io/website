---
title: Install with Docker
description: Run Social Home as a Docker container on a home server or NAS — with Home Assistant next to it, or on its own.
order: 12
---

If you have a home server or a NAS that runs Docker, Social Home runs
there as a single container. It works on its own, with its own
accounts and passwords, or together with a Home Assistant that runs
without apps.

Using Home Assistant OS? The [Home Assistant app](/docs/install-home-assistant/)
is easier — one click, nothing to maintain.

## What you need

- Docker (with Compose, if you like) on a 64-bit machine — `amd64`
  or `arm64`, so a Raspberry Pi 4 or 5 works too.
- Room for Social Home's data. The examples below keep it in a Docker
  volume called `socialhome-data`; your household's posts, photos and
  keys live there.

## 1. Start the container

With Docker Compose, save this as `docker-compose.yml`:

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

and start it:

```sh
docker compose up -d
```

Or with plain Docker:

```sh
docker run -d --name socialhome --restart unless-stopped \
  -p 8099:8099 -v socialhome-data:/data \
  ghcr.io/social-home-io/socialhome:latest
```

Running Home Assistant Container or Core? Add the three Home Assistant
settings from [Home Assistant without apps](/docs/install-home-assistant/#home-assistant-without-apps)
before you start it, then continue there.

## 2. Create your admin account

Open `http://<your-server>:8099` in a browser. The first visit opens
**Set up Social Home**: pick a username and a password for yourself.
You're the admin, and you invite the rest of your household from
there.

## 3. Let other households reach you

To pair with a household directly, yours needs an address they can
reach — for example `https://social.example.com` through the reverse
proxy you already use for other things at home. Enter it in
**Settings → Connections → External address**.

No address of your own? That's fine: you can pair through a
[GFS (Global Federation Server)](/docs/glossary/#gfs), the relay that
helps households find each other. Your posts stay sealed on the way.

## 4. Keep a backup

Your data lives in the `socialhome-data` volume. Once in a while, open
**Admin → Backup**: download a backup, and make a **Recovery Kit**.
The Kit is a sealed file, protected by a passphrase you choose, that
brings your household and its paired households back on new hardware
if a disk ever dies. Make a new one after you pair with someone new.

## Updating

```sh
docker compose pull
docker compose up -d
```

`latest` follows the stable releases. To stay on a known version, use
its tag instead, for example `ghcr.io/social-home-io/socialhome:2026.10.24`.

<details class="tech">
<summary>Under the hood</summary>

- Image `ghcr.io/social-home-io/socialhome`, multi-arch
  (`linux/amd64`, `linux/arm64`). Tags: `YYYY.M.D[.N]` (pinned),
  `YYYY.M` and `YYYY` (rolling), `latest` (current stable).
- Runs as a non-root user (uid 10001) with `SH_DATA_DIR=/data` and
  `SH_MODE=standalone` (local accounts, scrypt password hashes). Set
  `SH_MODE=ha` plus `SH_HA_URL` and `SH_HA_TOKEN` to use Home Assistant
  instead.
- Port `8099` is the web UI, API and WebSocket. Port `8100` is the
  household wall-tablet dashboard, which stays off until an admin
  turns it on; publish it only if you use it, and only on your home
  network.
- Every setting in `socialhome.toml` has an `SH_*` environment
  variable, which wins over the file; point `SH_CONFIG` at a file to
  use one. The example file is
  [`socialhome.toml.example`](https://github.com/social-home-io/socialhome/blob/main/socialhome.toml.example).
- Using a bind mount instead of the volume? Make the folder writable
  for uid 10001 (`sudo chown 10001:10001 ./data`).
- Healthcheck: `GET /healthz`.

</details>
