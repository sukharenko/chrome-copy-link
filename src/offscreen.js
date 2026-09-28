// Clipboard writer + theme watcher. The offscreen document is never focused,
// so navigator.clipboard is unavailable here and execCommand('copy') is used.
const buffer = document.getElementById('buffer');

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.target !== 'offscreen' || msg.type !== 'copy') return;
  buffer.value = msg.text;
  buffer.select();
  const ok = document.execCommand('copy');
  buffer.value = '';
  sendResponse(ok);
});

const dark = matchMedia('(prefers-color-scheme: dark)');
const report = () => chrome.runtime.sendMessage({ target: 'background', type: 'theme', dark: dark.matches });
dark.addEventListener('change', report);
report();
