---
title: Getting started
description: The easiest way to run Social Home is the Social Home app on Home Assistant — one click, about five minutes. Docker and Python work too.
order: 10
---

Social Home runs in your home, on a computer you already have. The
easiest way — and the one we recommend — is the **Social Home app
for Home Assistant**. If you use Home Assistant OS (on a Home
Assistant Green or Yellow, a Raspberry Pi, or a mini PC) or Home
Assistant Supervised, it is one
click and about five minutes, coffee included.

[**Add Social Home to Home Assistant →**](https://my.home-assistant.io/redirect/supervisor_addon/?addon=752dab87_socialhome&repository_url=https%3A%2F%2Fgithub.com%2Fsocial-home-io%2Fha-app)

The button opens your Home Assistant, adds the app and shows you the
**Install** button. The app sets everything up for you: your account
and the connection to Home Assistant. There is nothing to type and no
port to open. The [step-by-step guide](/docs/install-home-assistant/)
walks you through it and shows what to expect.

## Other ways to install

Not on Home Assistant OS? Social Home runs elsewhere too. Feed,
calendar, spaces and pairing work the same everywhere; what changes is
how much you set up by hand. A few extras come from Home Assistant —
voice, notifications through the Home Assistant Companion app, and
places and people that follow your Home Assistant — so they need it
next to Social Home.

| How                                                                                      | Good for                                                              | Effort           |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ---------------- |
| [Home Assistant app](/docs/install-home-assistant/)                                      | Home Assistant OS — **recommended**                                   | one click        |
| [Home Assistant without apps](/docs/install-home-assistant/#home-assistant-without-apps) | Home Assistant Container or Core, plus the integration from HACS      | about 20 minutes |
| [Docker container](/docs/install-docker/)                                                | a home server or NAS that runs Docker, with or without Home Assistant | about 15 minutes |
| [Python](/docs/install-python/)                                                          | trying it out on your laptop, or a server you run yourself            | about 15 minutes |

Not sure? If your Home Assistant has an **Apps** page under
**Settings**, pick the app.

## After you install

- **Bring in your household.** Everyone in your home gets their own
  account. With the Home Assistant app, whoever opens Social Home from
  the Home Assistant sidebar gets one automatically.
- **Pair another household:** **Settings → Connections → Pair a
  household**. See [Households, federated](/docs/federation/) for the
  QR-scan flow.
- With a Home Assistant voice assistant, try
  _"Hey HA, add olive oil to the shopping list."_
