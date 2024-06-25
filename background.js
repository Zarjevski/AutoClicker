chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ isRunning: false });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'stopClicking') {
    chrome.storage.local.set({ isRunning: false });
    sendResponse({ status: 'stopped' });
  }
});
