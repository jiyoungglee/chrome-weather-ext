chrome.action.onClicked.addListener(function (tab) {
    chrome.windows.getAll({ populate: true }, function (windows) {
      let popupWindow = null;
  
      // Check if the popup window is already open
      for (let i = 0; i < windows.length; i++) {
        const window = windows[i];
        if (window.type === 'popup' && window.tabs.length > 0 && window.tabs[0].url === chrome.runtime.getURL('popup.html')) {
          popupWindow = window;
          break;
        }
      }
  
      if (popupWindow) {
        // Focus the existing popup window
        chrome.windows.update(popupWindow.id, { focused: true });
      } else {
        // Create a new popup window
        chrome.windows.create({
          url: chrome.runtime.getURL('popup.html'),
          type: 'popup',
          width: 400,
          height: 600
        });
      }
    });
  });