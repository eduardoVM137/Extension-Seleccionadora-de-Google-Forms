document.getElementById('fillForm').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
      return;
    }

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['content.js']
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
      } else {
        console.log('Script injected successfully.', results);
      }
    });
  });
});