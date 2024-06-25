let isRunning = false;

document.getElementById('clickButton').addEventListener('click', () => {
  const buttonClass = document.getElementById('classInput').value;
  const statusElement = document.getElementById('status');
  
  if (buttonClass) {
    isRunning = true;
    chrome.storage.local.set({ isRunning, buttonClass });
    statusElement.textContent = 'Started clicking buttons.';
    executeClick(buttonClass);
  } else {
    statusElement.textContent = 'Please enter a class name.';
  }
});

document.getElementById('stopButton').addEventListener('click', () => {
  isRunning = false;
  chrome.storage.local.set({ isRunning });
  document.getElementById('status').textContent = 'Stopped.';
  chrome.runtime.sendMessage({ action: 'stopClicking' });
});

function executeClick(buttonClass) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: clickButtons,
      args: [buttonClass]
    }, (results) => {
      if (chrome.runtime.lastError) {
        document.getElementById('status').textContent = `Error: ${chrome.runtime.lastError.message}`;
      } else {
        document.getElementById('status').textContent = `${results[0].result.clickedCount} buttons clicked.`;
        setTimeout(() => refreshPage(), 10000); // Refresh after 2 seconds
      }
    });
  });
}

function clickButtons(buttonClass) {
  const buttons = document.querySelectorAll(`.${buttonClass}`);
  buttons.forEach(button => button.click());
  return { clickedCount: buttons.length };
}

function refreshPage() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.reload(tabs[0].id);
  });
}
