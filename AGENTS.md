# AGENTS.md: saf0o-companion

This is the browser extension that connects dapps to the saf0o desktop wallet over an authenticated local socket. It is a
fork of the upstream companion, rebranded the same way as the desktop. Desktop repo: `saf0o` (see its AGENTS.md).

## Layout

- `src/`: extension source.
  - `index.js`: background.
  - `inject.js`, `provider.js`, `legacy-provider.js`: the page provider.
  - `auth-protocol.js`, `authenticated-socket.js`, `credential-store.js`: pairing and auth.
  - `settings.html` and `settings/`: the popup.
  - `manifest.json`: the Chromium manifest.
- `scripts/`: build, verify and packaging scripts. `browser-manifests.mjs` derives the Firefox manifest from the Chromium one.
- `test/`: `node --test` suites. `test/fixtures/saf0o-companion-auth-v3.json` is byte-identical to the desktop's
  `test/fixtures/peerAuth/v3-transcript.json`.

## Toolchain

- npm, Node 24.18.1. `package.json` pins npm 11.12. A newer npm fails `npm ci` on engine-strict, so add
  `--engine-strict=false`.
- Dependency changes need the owner's approval and a scan of each package before install.
- Use the local binaries (`node_modules/.bin/{eslint,prettier,webpack}`), not npx.

## Commands

| What                             | Command                                                              |
| -------------------------------- | -------------------------------------------------------------------- |
| Unit tests                       | `node --test` (all of `test/`)                                       |
| Lint, format, unit               | `npm test`                                                           |
| Chromium build to `dist/`        | `npm run build`. It runs `brand:verify` first.                       |
| Firefox build to `dist-firefox/` | `npm run build:firefox`                                              |
| Installable Firefox add-on       | `npm run package:firefox:xpi` writes `artifacts/saf0o-companion.xpi` |

The build runs offline.

## Quirks

- **Extension ids:**
  - The Chromium id is pinned through the manifest `key`. The private key stays outside the repo, in
    `~/.config/saf0o-companion/`. The desktop lists the resulting id in `main/api/extensionIds.ts`.
  - `browser-manifests.mjs` strips `key` for Firefox. The Firefox gecko id is set under `browser_specific_settings` in
    `src/manifest.json`.
  - Firefox extension ids differ per install, so pairing is the trust step. Pairing persists for permanent installs.
    Temporary add-ons lose their storage, and with it the pairing.
- **Unsigned Firefox installs:** install the `.xpi` in Firefox Developer Edition or Nightly with
  `xpinstall.signatures.required=false`. Store publishing (AMO, Chrome Web Store) is not set up for the fork. The Chrome
  Web Store may reject a manifest `key` on upload.
- **Protocol strings:** auth domains carry the brand. Change them in lockstep with the desktop, then regenerate the shared
  fixture and copy it to the other repo.
- **Character encoding:** every HTML page must declare `<meta charset="utf-8">`. Without it Firefox decodes as
  windows-1252 and shows "â€™" for "’". `test/html-charset.test.js` enforces this.
- **Brand assets:** `scripts/verify-brand-assets.mjs` compares sorted file inventories. Renamed assets must keep the lists
  sorted.
- **Rebrand:** `scripts/rebrand-saf0o.mjs` is synced with the desktop copy. On an upstream rebase, follow the desktop
  `PATCHES.md` procedure: drop the generated commit, rebase, re-run the script.

## Conventions

- One topic per commit, subject prefix `saf0o: `. Each commit carries a test that encodes why.
- Push only `main`, and only with the owner's approval.
- Local builds for the owner replace the previous one in place: the `.xpi` goes to
  `%USERPROFILE%\Saf0o\saf0o-companion.xpi`, next to the desktop app.
  Keep an old build only when asked.
