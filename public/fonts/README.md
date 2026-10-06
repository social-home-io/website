# Self-hosted fonts

The type stack (Fraunces · Manrope · JetBrains Mono) is served from this
directory so no request for type ever leaves social-home.io. The
`@font-face` rules live in `src/styles/base.css`; the family stacks in
`src/styles/tokens.css` are unchanged.

| File                                         | Family         | Style  | Axes                   | Subset    |
| -------------------------------------------- | -------------- | ------ | ---------------------- | --------- |
| `fraunces-latin-full-normal.woff2`           | Fraunces       | normal | opsz, wght, SOFT, WONK | latin     |
| `fraunces-latin-ext-full-normal.woff2`       | Fraunces       | normal | opsz, wght, SOFT, WONK | latin-ext |
| `fraunces-latin-full-italic.woff2`           | Fraunces       | italic | opsz, wght, SOFT, WONK | latin     |
| `fraunces-latin-ext-full-italic.woff2`       | Fraunces       | italic | opsz, wght, SOFT, WONK | latin-ext |
| `manrope-latin-wght-normal.woff2`            | Manrope        | normal | wght 200–800           | latin     |
| `manrope-latin-ext-wght-normal.woff2`        | Manrope        | normal | wght 200–800           | latin-ext |
| `jetbrains-mono-latin-wght-normal.woff2`     | JetBrains Mono | normal | wght 100–800           | latin     |
| `jetbrains-mono-latin-ext-wght-normal.woff2` | JetBrains Mono | normal | wght 100–800           | latin-ext |

Fraunces must stay the **full-axis** build: the display styles in
`tokens.css` (`--display-axes`, `--display-italic-axes`) set `SOFT`,
`WONK` and `opsz`, and a weight-only file would silently drop them.

## Source and versions

Copied verbatim from the Fontsource npm packages (which repackage the
Google Fonts builds of each family):

| Package                               | Package version | Upstream font version |
| ------------------------------------- | --------------- | --------------------- |
| `@fontsource-variable/fraunces`       | 5.3.0           | v38                   |
| `@fontsource-variable/manrope`        | 5.3.0           | v20                   |
| `@fontsource-variable/jetbrains-mono` | 5.3.0           | v24                   |

To refresh: bump the devDependency in `package.json`, re-copy the files
listed above from `node_modules/@fontsource-variable/<family>/files/`,
and update the versions here.

## Licenses

All three families are licensed under the SIL Open Font License 1.1.
The full license text, with each project's copyright line, is next to
the fonts:

- `LICENSE-fraunces.txt` — Copyright 2020 The Fraunces Project Authors
  (https://github.com/undercasetype/Fraunces)
- `LICENSE-manrope.txt` — Copyright 2019 The Manrope Project Authors
  (https://github.com/sharanda/manrope)
- `LICENSE-jetbrains-mono.txt` — Copyright 2020 The JetBrains Mono
  Project Authors (https://github.com/JetBrains/JetBrainsMono)
