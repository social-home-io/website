---
title: Install on Home Assistant
description: Install the Social Home app on Home Assistant in about five minutes. No apps page? Run Social Home next to Home Assistant and add the integration from HACS.
order: 11
---

This is the way we recommend. Social Home runs as an app inside your
Home Assistant, starts with it, is backed up with it, and opens from
the Home Assistant sidebar. You don't need to open a port, set up a
password or copy a token: the app does all of that for you.

You need Home Assistant OS or Home Assistant Supervised — if you have
an **Apps** page under **Settings**, you're set — on a 64-bit machine
(a Home Assistant Green or Yellow, a Raspberry Pi 4 or 5, or a mini
PC), running Home Assistant **2026.3 or newer**.

No **Apps** page? Then you run Home Assistant Container or Core, and
[the section below](#home-assistant-without-apps) is for you.

## 1. Add the app

Click the button and confirm in your Home Assistant:

[**Add Social Home to Home Assistant →**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=752dab87_socialhome&repository_url=https%3A%2F%2Fgithub.com%2Fsocial-home-io%2Fha-app)

It adds the Social Home app repository and opens the app's page.

<details class="tech">
<summary>Under the hood</summary>

To add it by hand: in Home Assistant open **Settings → Apps**, go to
the app store, choose **Repositories** in the three-dot menu and paste

```
https://github.com/social-home-io/ha-app
```

Two apps appear: **Social Home** (stable, for everyday use) and
**Social Home (Early)** (release candidates, one cut ahead of stable,
for households that like to try things first). Images are prebuilt
for `aarch64` and `amd64`.

</details>

## 2. Install and start it

Click **Install**. It takes about a minute. Then click **Start**.

On its first start the app makes you its admin (the owner of your
Home Assistant), and introduces itself to Home Assistant.

<details class="tech">
<summary>Under the hood</summary>

The **Log** tab shows the first start:

```
[INFO] Starting Social Home...
[INFO] Configuration written to /data/social_home.toml
[INFO] HA owner detected: alex · provisioned as admin
[INFO] Integration token written to /data/integration_token.txt
[INFO] Discovery pushed to Supervisor
```

</details>

## 3. Say yes to the integration

The app brings its Home Assistant integration along — nothing to
download from anywhere else. Within a few seconds Home Assistant shows
a **Discovered** card for Social Home under **Settings → Devices &
services**. Click **Configure** and confirm. There's nothing to type.

The integration is what lets other households reach your home through
your Home Assistant's address. It can also share where your people
are from Home Assistant, if you switch that on.

## 4. Open Social Home

Click **Social Home** in the Home Assistant sidebar. That's it: if you
can reach your Home Assistant, you can reach Social Home — in the
browser and in the Home Assistant Companion app.
Everyone in your home who opens it from the sidebar gets their own
Social Home account.

**Backups** come with your Home Assistant backups: restore one and
Social Home is back, paired households included.

What next? See [Getting started → After you
install](/docs/getting-started/#after-you-install).

## Home Assistant without apps

Running Home Assistant Container or Home Assistant Core? Those don't
have apps, but Social Home works with them all the same. You run
Social Home next to Home Assistant, on the same machine or another one
at home, and then add the Social Home integration through
[HACS](https://hacs.xyz/). It takes about twenty minutes, and you only
do it once.

### 1. Make a token for Social Home

Social Home needs permission to talk to your Home Assistant. In Home
Assistant, open your **profile** (bottom left), go to the **Security**
tab, and under **Long-lived access tokens** click **Create token**.
Name it "Social Home" and copy it. You'll paste it in the next step.

### 2. Run Social Home

Run Social Home with [Docker](/docs/install-docker/) (the easiest
here, since you likely run Home Assistant with Docker already) or
with [Python](/docs/install-python/). Follow that page, and give
Social Home three extra settings:

| Setting       | What to put in                                                             |
| ------------- | -------------------------------------------------------------------------- |
| `SH_MODE`     | `ha`                                                                       |
| `SH_HA_URL`   | the address of your Home Assistant, e.g. `http://homeassistant.local:8123` |
| `SH_HA_TOKEN` | the token from step 1                                                      |

For Docker, that's three more `-e` lines (or three lines under
`environment:` in Compose):

```sh
docker run -d --name socialhome --restart unless-stopped \
  -p 8099:8099 -v socialhome-data:/data \
  -e SH_MODE=ha \
  -e SH_HA_URL=http://homeassistant.local:8123 \
  -e SH_HA_TOKEN=paste-your-token-here \
  ghcr.io/social-home-io/socialhome:latest
```

### 3. Pick who's in charge

Open `http://<your-server>:8099` in a browser. Social Home lists the
people from your Home Assistant: pick who becomes the admin and choose
a password for signing in. (No people listed? Add yourself in Home
Assistant under **Settings → People** first.)

### 4. Add the integration from HACS

[HACS](https://hacs.xyz/) is the community store most Home Assistant
users already have for extra integrations. If you don't have it yet,
its [setup guide](https://hacs.xyz/docs/use/) walks you through it.

1. In Home Assistant, open **HACS**, choose **Custom repositories** in
   the three-dot menu, paste
   `https://github.com/social-home-io/ha-integration` and pick the type
   **Integration**.
2. Find **Social Home** in HACS, click **Download**, then restart Home
   Assistant.
3. Go to **Settings → Devices & services → Add integration** and pick
   **Social Home**.
4. It asks for two things: the address of Social Home
   (`http://<your-server>:8099`) and an API token. Make the token in
   Social Home under **Settings → Security**, and paste it.

Done. Other households can now reach your home through your Home
Assistant's address, and Social Home can share where your people are
from Home Assistant, if you switch that on in the integration's
options.

<details class="tech">
<summary>Under the hood</summary>

- `SH_MODE=ha` uses Home Assistant over its REST API with the
  long-lived token; the app runs as `haos` with the Supervisor
  instead. Without the integration, set the address other households
  use yourself: **Settings → Connections → External address**.
- The integration pushes Home Assistant's external URL (or internal
  URL) to Social Home on setup and on every change, forwards Home
  Assistant's STUN/TURN servers (Nabu Casa's included), relays
  federation envelopes at `/api/socialhome/inbox/{id}` without reading
  them, and — when **sync location** is on in its options — forwards
  `person.*` positions, truncated to 4 decimals.
- Backups: outside the app, Home Assistant's backups don't include
  Social Home. Download a backup in **Admin → Backup**, and make a
  **Recovery Kit** there too — the Kit is what brings your household's
  identity and paired households back on new hardware.

</details>
