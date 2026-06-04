---
title: Run a relay yourself
description: Stand up a Global Federation Server (GFS) on a VPS in about 15 minutes. Docker Compose + Cloudflare, that's it.
order: 60
---

A Global Federation Server is a small Python relay that helps
households discover each other for **global spaces**, and that
brokers public-highlight share links — see
[Highlights → public sharing](/docs/highlights/#sharing-publicly-via-a-global-server)
for the author-facing flow. In both jobs the relay only carries
metadata: it never sees a message, never caches a highlight frame.
Hosting your own relay means your community decides who can join,
and there's no single party at the centre.

## What you need

- A VPS with a public IP (Hetzner, Scaleway, DigitalOcean,
  Mythic Beasts — any will do).
- A domain name. A subdomain is fine — `gfs.example.com`.
- A Cloudflare account on the free plan, used as a TLS
  terminator and DDoS shield.
- Docker installed on the VPS.

About 15 minutes start to finish.

## 1. Point your domain at the server

In Cloudflare DNS, add an **A record**:

| Type | Name  | IPv4 address     | Proxy status |
| ---- | ----- | ---------------- | ------------ |
| A    | `gfs` | `YOUR.SERVER.IP` | 🟠 Proxied   |

> The orange-cloud "Proxied" status means Cloudflare handles
> HTTPS for you — no certificates to install, no renewals to
> manage. Your server only needs to speak HTTP internally.

Then in **Cloudflare → SSL/TLS → Overview**, set the
encryption mode to **Full**.

## 2. Create the project directory

SSH into your VPS:

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
    volumes:
      - ./data:/data
    ports:
      - "80:8124"
    environment:
      - SOCIAL_HOME_GFS_DATA=/data
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8124/health"]
      interval: 30s
      timeout: 5s
      retries: 3
```

## 4. Initialise the config

```bash
docker run --rm -v $(pwd)/data:/data \
  ghcr.io/social-home-io/gfs:latest --init

docker run --rm -it -v $(pwd)/data:/data \
  ghcr.io/social-home-io/gfs:latest --set-password
```

Open `data/global_server.toml` and set your domain:

```toml
[server]
base_url = "https://gfs.example.com"
```

## 5. Open the firewall

On the VPS:

```bash
sudo ufw allow 80/tcp        # Cloudflare proxy → GFS
```

Port `8124` does **not** need to be open — it's internal to the
Docker network.

## 6. Start the relay

```bash
docker compose up -d
```

Verify it answers from your laptop:

```sh
curl https://gfs.example.com/health
# → {"status":"ok","version":"…"}
```

## 7. Connect from Social Home

In Social Home → **Settings → Connections → Global Spaces →
Add relay**:

- URL: `https://gfs.example.com`
- Click **Pair**

Done.

## Updating

```bash
cd ~/gfs
docker compose pull
docker compose up -d
```

The container is stateless except for `./data`; backups are a
plain `tar -czf data.tgz ./data`.

## The project relay

If you don't want to run your own, the project hosts one public
relay at [`gfs.social-home.io`](/servers/) — one QR scan and
you're paired. Pointing your space at a relay you trust is the
entire point of having choices, though, so running your own is
encouraged for any community of more than a handful of
households.
