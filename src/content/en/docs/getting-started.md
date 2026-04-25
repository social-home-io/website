---
title: Getting started
description: Install the Social Home add-on, finish the one-click integration prompt, and you're done. About five minutes including coffee.
order: 10
---

You need Home Assistant running on hardware where the Supervisor
is enabled — that means HA OS, HA Supervised, or the HA Container
flavour with the `hassio` add-on. The Container distribution
without Supervisor cannot install add-ons; for those installs
you can run Social Home as a [standalone Docker
container](https://github.com/social-home-io/socialhome#docker)
and add the integration manually.

## 1. Add the add-on repository

In Home Assistant, open **Settings → Add-ons → Add-on Store**.
Click the three-dot menu in the top-right and choose
**Repositories**. Paste this URL:

```
https://github.com/social-home-io/ha-app
```

Two new add-ons appear: **Social Home** (the stable channel,
recommended) and **Social Home (Dev)** (for testing — formats
can change between commits).

> Prefer to skip the manual paste? Click the
> [one-click "Add to Home Assistant"
> button](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2Fsocial-home-io%2Fha-app)
> instead.

## 2. Install **Social Home**

Click **Install**, wait for the build to finish (a few minutes —
multi-arch images), then click **Start**. Open the **Log** tab
to confirm the bootstrap succeeded:

```
[INFO] Starting Social Home...
[INFO] Configuration written to /data/social_home.toml
[INFO] HA owner detected: pascal · provisioned as admin
[INFO] Integration token written to /data/integration_token.txt
[INFO] Discovery pushed to Supervisor
```

## 3. Add the integration

Within seconds Home Assistant shows a discovery card under
**Settings → Devices & services**. Click **Configure** on the
Social Home card. There's nothing to type — the add-on already
provisioned an admin and minted a token.

## 4. Open the web UI

Click the **Social Home** entry in the HA sidebar (the icon is a
little house with a chat notch — see the [logo
glossary](/docs/protocol/)). The first request through HA Ingress
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
