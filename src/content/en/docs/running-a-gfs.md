---
title: Run a relay yourself
description: Stand up a Global Federation Server (GFS) on a VPS in about 15 minutes. Docker Compose + Cloudflare, that's it.
order: 60
---

A relay is what lets households that have never paired find each
other — a public parenting space, say, or a neighbourhood board
that anyone can follow. Anyone can run one, and this page walks
you through it in about 15 minutes.

The [GFS (Global Federation Server)](/docs/glossary/#gfs) — the
relay that helps households find each other — has three jobs. It
is a directory, so households can find public and global spaces.
It carries sealed posts for public and global spaces (and for
private spaces whose owner switched the GFS on), so a space keeps
flowing while its host is asleep. And it brokers public highlight
links — see
[Highlights → sharing publicly](/docs/highlights/#sharing-publicly-via-a-global-server)
for the author-facing flow. In every job it only ever handles
envelopes: it never reads a message, never stores a highlight
frame. Hosting your own relay means your community decides who
can join, and there's no single party at the centre.

## What you need

- A VPS with a public IP — any provider will do.
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
encryption mode to **Flexible** — the relay itself listens on
plain HTTP behind the proxy. If you'd rather terminate TLS on
the server yourself (Caddy in front of the container, say), use
**Full (strict)** instead.

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

## 4. Initialise the config

```bash
docker run --rm -v "$PWD/data:/var/lib/sh-gfs" \
  ghcr.io/social-home-io/gfs:latest \
  socialhome-global-server --init --config /var/lib/sh-gfs/global_server.toml

docker run --rm -it -v "$PWD/data:/var/lib/sh-gfs" \
  ghcr.io/social-home-io/gfs:latest \
  socialhome-global-server --set-password --config /var/lib/sh-gfs/global_server.toml
```

`--init` writes a fresh config; `--set-password` sets the
password for the admin portal, which you'll find at
`https://gfs.example.com/admin` once the relay is up.

Open `data/global_server.toml` and set your domain:

```toml
[server]
base_url = "https://gfs.example.com"
```

<details class="tech">
<summary>Under the hood</summary>

Every option in `global_server.toml` can also be set as an
environment variable prefixed `GFS_` — handy if you'd rather keep
the compose file self-contained:

| Variable          | Config key          | Default           |
| ----------------- | ------------------- | ----------------- |
| `GFS_HOST`        | `[server] host`     | `0.0.0.0`         |
| `GFS_PORT`        | `[server] port`     | `8765`            |
| `GFS_BASE_URL`    | `[server] base_url` | —                 |
| `GFS_DATA_DIR`    | data directory      | `/var/lib/sh-gfs` |
| `GFS_OPEN_SIGNUP` | `open_signup`       | `false`           |

An environment variable wins over the file for the same key.

</details>

## Defaults

Out of the box a fresh relay is cautious in the right places.
Households that pair with it are accepted automatically
(`auto_accept_clients`), so people can connect without you
clicking anything. Spaces published to your relay, on the other
hand, wait for your approval in the admin portal
(`auto_accept_spaces = false`) — your directory only lists what
you've looked at. Open sign-up is off, so nobody can create an
account on the relay itself unless you turn it on.

## 5. Open the firewall

On the VPS:

```bash
sudo ufw allow 80/tcp        # Cloudflare proxy → GFS
```

Port 8765 does **not** need to be open — it's internal to the
Docker network.

## 6. Start the relay

```bash
docker compose up -d
```

Verify it answers from your laptop:

```sh
curl https://gfs.example.com/healthz
# → {"status":"ok","version":"…"}
```

## 7. Connect from Social Home

In Social Home → **Settings → Connections → Global Federation
Servers → Add GFS**:

- URL: `https://gfs.example.com`
- Click **Pair**

Done. If your relay hands out pairing tokens (for example from
the admin portal), each token is single-use and valid for 10
minutes.

## What your relay will see

Running a relay doesn't give you a window into anyone's space.
Posts arrive sealed and padded; you learn which space an
envelope belongs to and when it arrived, and — in a space's
default "trusted" mode — which household published it. In strict
mode you don't even learn that. For the full picture, including
what the relay can still observe (timing, sizes, IP addresses),
read the [security model](/docs/security/).

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
