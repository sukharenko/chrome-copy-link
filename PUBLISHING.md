# Publishing to the Chrome Web Store

1. Register in the [Developer Dashboard](https://chrome.google.com/webstore/devconsole) (one-time $5 fee).
2. Run `./tools/package.sh` and upload `dist/copy-link-<version>.zip`.
3. Fill in the fields below. For new releases, bump `version` in `src/manifest.json`.

Graphics: screenshots `store/screenshot-light.png` and `store/screenshot-dark.png`,
small promo tile `store/promo-tile.png`, store icon `src/icons/icon-128.png`.

Links:
- Homepage URL: https://github.com/sukharenko/chrome-copy-link
- Support URL: https://github.com/sukharenko/chrome-copy-link/issues
- Privacy policy: https://github.com/sukharenko/chrome-copy-link/blob/main/PRIVACY.md

## Store listing

**Name:** Copy Link

**Summary (≤132):** One click copies the current tab's URL to the clipboard. No tracking, no permissions to read your pages.

**Description:**

> Click the toolbar button — the current page's link is in your clipboard. That's it.
>
> • One click, no popup, no menus
> • A short ✓ confirms the copy
> • Toolbar icon follows Chrome's light / dark theme
> • Works on every tab, including chrome:// pages
> • No telemetry, no analytics, no network requests, no storage
> • No access to page content — only the URL of the tab you click on
>
> Tip: assign a keyboard shortcut at chrome://extensions/shortcuts.

**Category:** Productivity (Tools)

## Privacy practices

**Single purpose:** Copy the URL of the current tab to the clipboard when the user clicks the toolbar button.

**Permission justifications:**

- `activeTab` — read the URL of the tab the user clicked the button on; no other tabs or page content are accessed.
- `clipboardWrite` — write that URL to the clipboard.
- `offscreen` — Manifest V3 service workers cannot access the clipboard or `matchMedia`; a hidden offscreen document performs the clipboard write and detects light/dark theme to choose the toolbar icon.

**Remote code:** No, I am not using remote code.

**Data usage:** leave every data type unchecked. Check all three certifications
(no selling of user data, no use unrelated to the single purpose, no use for creditworthiness or lending).
