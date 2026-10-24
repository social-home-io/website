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

## 5. Fine-tune with a settings file (optional)

Most households never need this: everyday settings live in the web
UI. A settings file, `socialhome.toml`, is for the few things Social
Home reads when it starts — for example the TURN server your calls
use behind strict networks, a storage limit, your own GFS for the
first-run "Connect to the GFS" step, or the Home Assistant connection
instead of environment variables.

1. Next to your `docker-compose.yml`, download the example file. Every
   setting in it is commented out and explained:

   ```sh
   curl -o socialhome.toml https://raw.githubusercontent.com/social-home-io/socialhome/main/socialhome.toml.example
   ```

2. Remove the `#` in front of the lines you want and set your values,
   for example:

   ```toml
   [storage]
   max_storage_bytes = 21474836480   # 20 GB

   [webrtc]
   turn_url = "turn:turn.example.com:3478"
   turn_secret = "the-shared-secret-of-your-turn-server"
   ```

3. Hand the file to the container and tell Social Home where it is —
   two more lines in `docker-compose.yml`:

   ```yaml
   services:
     socialhome:
       # … as above …
       environment:
         SH_CONFIG: /config/socialhome.toml
       volumes:
         - socialhome-data:/data
         - ./socialhome.toml:/config/socialhome.toml:ro
   ```

4. Restart: `docker compose up -d`. Social Home reads the file only
   when it starts, so restart after every change.

Two things to know. An environment variable always wins over the file,
so a setting you also give with `-e` or under `environment:` ignores
the file. And if the file has a typo Social Home can't read, it starts
with its defaults instead — after editing, check that your change took
effect.

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
- Settings are layered: `SH_*` environment variables, then the TOML
  file at `SH_CONFIG` (default `~/.config/socialhome/socialhome.toml`,
  which in the container is `/home/hsuser/.config/…`, outside the data
  volume — hence the mount), then built-in defaults. A file that is
  missing or fails to parse is skipped as a whole. The image sets
  `SH_DATA_DIR` and `SH_MODE`, so `[storage] data_dir` and
  `[server] mode` in the file have no effect in Docker.
- Keys: `[server]`, `[storage]`, `[federation]` map to the setting
  name; `[webrtc]`, `[gfs]`, `[highlights]` keys get the section as a
  prefix (`[gfs] default_url` = `SH_GFS_DEFAULT_URL`);
  `[homeassistant] url` / `token` = `SH_HA_URL` / `SH_HA_TOKEN`. The
  reference is
  [`socialhome.toml.example`](https://github.com/social-home-io/socialhome/blob/main/socialhome.toml.example).
- The file must be readable by uid 10001. If it holds a Home Assistant
  token, keep it out of reach of other users on the host:
  `sudo chgrp 10001 socialhome.toml && chmod 640 socialhome.toml`.
- Using a bind mount instead of the volume? Make the folder writable
  for uid 10001 (`sudo chown 10001:10001 ./data`).
- Healthcheck: `GET /healthz`.

</details>
