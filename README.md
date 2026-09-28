# Copy Link

A Chrome extension that does exactly one thing: click the toolbar icon and the current tab's URL is copied to the clipboard.

- No telemetry, no network requests, no storage, no host permissions.
- The toolbar icon switches between light and dark variants to match Chrome's theme.
- A ✓ badge flashes on the button for a second (or `!` if copying failed).
- Assign a keyboard shortcut at `chrome://extensions/shortcuts`.

## Install locally

1. Open `chrome://extensions` and enable **Developer mode**.
2. Click **Load unpacked** and select the `src/` folder.

## Build for the Chrome Web Store

```sh
./tools/package.sh
```

Regenerate icons with `python3 tools/make_icons.py` (requires Pillow).

Store listing copy and permission justifications are in [PUBLISHING.md](PUBLISHING.md).

## How it works

- `background.js` handles the click and reads `tab.url` (available through `activeTab`).
- `offscreen.html/js` is an offscreen document that writes to the clipboard via `execCommand('copy')`
  (service workers have no clipboard access) and watches `prefers-color-scheme` to swap the icon.
  Works on any tab, including `chrome://` pages.

## License

[MIT](LICENSE)
