const OFFSCREEN_URL = 'offscreen.html';
let creating = null;

async function ensureOffscreen() {
  const contexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [chrome.runtime.getURL(OFFSCREEN_URL)],
  });
  if (contexts.length) return;
  creating ??= chrome.offscreen
    .createDocument({
      url: OFFSCREEN_URL,
      reasons: ['CLIPBOARD', 'MATCH_MEDIA'],
      justification: 'Write the tab URL to the clipboard and follow the light/dark theme for the toolbar icon.',
    })
    .finally(() => (creating = null));
  await creating;
}

function setThemeIcon(dark) {
  const theme = dark ? 'dark' : 'light';
  chrome.action.setIcon({
    path: { 16: `icons/${theme}-16.png`, 32: `icons/${theme}-32.png` },
  });
}

let badgeTimer;
function flashBadge(ok) {
  clearTimeout(badgeTimer);
  chrome.action.setBadgeBackgroundColor({ color: ok ? '#1e8e3e' : '#d93025' });
  chrome.action.setBadgeText({ text: ok ? '✓' : '!' });
  badgeTimer = setTimeout(() => chrome.action.setBadgeText({ text: '' }), 1200);
}

chrome.action.onClicked.addListener(async (tab) => {
  const url = tab.url || tab.pendingUrl;
  let ok = false;
  if (url) {
    try {
      await ensureOffscreen();
      ok = await chrome.runtime.sendMessage({ target: 'offscreen', type: 'copy', text: url });
    } catch {}
  }
  flashBadge(ok === true);
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg?.target === 'background' && msg.type === 'theme') setThemeIcon(msg.dark);
});

chrome.runtime.onStartup.addListener(ensureOffscreen);
chrome.runtime.onInstalled.addListener(ensureOffscreen);
