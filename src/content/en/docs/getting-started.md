---
title: Getting started
description: Install the Social Home add-on, finish the one-click integration prompt, and you're done. About five minutes including coffee.
order: 10
---

Social Home installs as a Home Assistant add-on, so you need a
Home Assistant with the Supervisor — that's **Home Assistant OS**
or **Home Assistant Supervised**, on an aarch64 (Raspberry Pi,
Home Assistant Green/Yellow) or amd64 machine, running Home
Assistant **2026.3 or newer**. If you run the Container or Core
flavour instead, you can run Social Home as a
[standalone Docker container](https://github.com/social-home-io/socialhome#docker)
(it exposes ports 8099 and 8124) and add the integration by hand.

## 1. Add the add-on repository

Click the
[one-click "Add to Home Assistant" button](https://my.home-assistant.io/redirect/supervisor_addon/?addon=752dab87_socialhome&repository_url=https%3A%2F%2Fgithub.com%2Fsocial-home-io%2Fha-app)
— it adds the repository and opens the add-on page for you.

Prefer to do it by hand? In Home Assistant, open **Settings →
Add-ons → Add-on Store**. Click the three-dot menu in the
top-right and choose **Repositories**. Paste this URL:

```
https://github.com/social-home-io/ha-app
```

Two new add-ons appear: **Social Home** (stable, recommended)
and **Social Home (Early)** (release candidates, one cut ahead
of stable — for households that like to try things first).

## 2. Install **Social Home**

Click **Install**. The images are prebuilt, so this takes about
a minute. Then click **Start** and open the **Log** tab to
confirm the bootstrap succeeded:

```
[INFO] Starting Social Home...
[INFO] Configuration written to /data/social_home.toml
[INFO] HA owner detected: alex · provisioned as admin
[INFO] Integration token written to /data/integration_token.txt
[INFO] Discovery pushed to Supervisor
```

## 3. Add the integration

The add-on ships the Home Assistant integration inside it and
copies it into `custom_components` on boot — nothing to download,
nothing to install from anywhere else. Within seconds Home
Assistant shows a discovery card under **Settings → Devices &
services**. Click **Configure** on the Social Home card. There's
nothing to type — the add-on already provisioned an admin and
minted a token.

## 4. Open the web UI

Click the **Social Home** entry in the HA sidebar (the icon is a
little house with a chat notch). The page opens through Home
Assistant Ingress on port 8099, so there is nothing to
port-forward and nothing to expose — if you can reach your Home
Assistant, you can reach Social Home. The first request
provisions you as a regular member; the admin user the add-on
created on first boot is yours by default.

## What's next

- Pair another household: **Settings → Connections → Pair a
  household** in the web UI. See
  [Households, federated](/docs/federation/) for the QR-scan
  flow.
- Set an external URL so other households can reach you. HA
  pushes whatever you put in **Settings → Network → External
  URL** (or your Nabu Casa Remote UI) to Social Home
  automatically — no manual step.
- If you have a microphone-enabled HA voice setup, try
  _"Hey HA, add olive oil to the shopping list."_
