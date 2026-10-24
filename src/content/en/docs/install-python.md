---
title: Install with Python
description: Install Social Home from PyPI and run it with Python — to try it on your laptop, or on a server you look after yourself.
order: 13
---

Social Home is a Python program, so you can install it like one. That's
handy for trying it out on your laptop, or for running it on a server
you already look after. For a home that should just work, the
[Home Assistant app](/docs/install-home-assistant/) or
[Docker](/docs/install-docker/) is less to look after.

## What you need

- **Python 3.14** or newer. Check with `python3 --version`.
- 64-bit Linux (x86 or ARM, like a Raspberry Pi 4 or 5), or a Mac with
  Apple silicon.

## 1. Install

Make a folder of its own for Social Home and install it there, so it
stays out of the way of everything else on the machine:

```sh
python3.14 -m venv ~/socialhome
~/socialhome/bin/pip install socialhome
```

## 2. Start it

```sh
~/socialhome/bin/python -m socialhome
```

Social Home now answers on port 8099. Leave the terminal open, or run
it as a service (see "Under the hood").

## 3. Create your admin account

Open `http://localhost:8099` (or `http://<your-server>:8099`) in a
browser. The first visit opens **Set up Social Home**: pick a username
and a password for yourself. You're the admin, and you invite the rest
of your household from there.

Using Home Assistant Container or Core next to it? Set the three Home
Assistant settings from
[Home Assistant without apps](/docs/install-home-assistant/#home-assistant-without-apps)
before the first start, then continue there.

## 4. Let other households reach you, and keep a backup

Both work the same as with Docker: an **External address** under
**Settings → Connections** if you want households to reach you
directly (or pair through a GFS), and a backup plus a **Recovery Kit**
from **Admin → Backup**. See
[Install with Docker](/docs/install-docker/#3-let-other-households-reach-you).

## Fine-tune with a settings file (optional)

Everyday settings live in the web UI. For the few things Social Home
reads when it starts — a TURN server for calls, a storage limit, your
own GFS, the Home Assistant connection — there is a settings file.
Copy the example, where every setting is commented out and explained,
to the place Social Home looks for it:

```sh
mkdir -p ~/.config/socialhome
curl -o ~/.config/socialhome/socialhome.toml https://raw.githubusercontent.com/social-home-io/socialhome/main/socialhome.toml.example
```

Remove the `#` in front of the lines you want, set your values and
restart Social Home. An environment variable always wins over the
file, and a file with a typo is skipped as a whole, so check that your
change took effect. More in
[Install with Docker](/docs/install-docker/#5-fine-tune-with-a-settings-file-optional).

## Updating

```sh
~/socialhome/bin/pip install --upgrade socialhome
```

Then restart Social Home.

<details class="tech">
<summary>Under the hood</summary>

- Package [`socialhome`](https://pypi.org/project/socialhome/) on
  PyPI; versions are CalVer, one per release. Its direct dependencies
  are pinned exactly; for the fully locked set, install from the
  repository with `uv sync --locked`.
- Data goes to `~/.local/share/socialhome` (`SH_DATA_DIR`), the config
  file is `~/.config/socialhome/socialhome.toml` (`SH_CONFIG`). Every
  setting has an `SH_*` environment variable, which wins over the file;
  see [`socialhome.toml.example`](https://github.com/social-home-io/socialhome/blob/main/socialhome.toml.example).
- Mode defaults to `standalone` (local accounts). Listens on
  `0.0.0.0:8099` (`SH_LISTEN_HOST`, `SH_LISTEN_PORT`).
- To keep it running, a minimal systemd unit:

  ```ini
  [Unit]
  Description=Social Home
  After=network-online.target

  [Service]
  User=socialhome
  ExecStart=/home/socialhome/socialhome/bin/python -m socialhome
  Restart=on-failure

  [Install]
  WantedBy=multi-user.target
  ```

</details>
