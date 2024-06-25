chrome.storage.local.get(['isRunning', 'buttonClass'], (result) => {
  if (result.isRunning && result.buttonClass) {
    clickAndRefresh(result.buttonClass);
  }
});

function clickAndRefresh(buttonClass) {
  const buttons = document.querySelectorAll(`.${buttonClass}`);
  buttons.forEach(button => button.click());

  if (buttons.length > 0) {
    setTimeout(() => location.reload(), 2000); // Reload after 2 seconds
  } else {
    chrome.storage.local.get(['isRunning'], (result) => {
      if (result.isRunning) {
        setTimeout(() => location.reload(), 2000); // Reload after 2 seconds
      }
    });
  }
}
