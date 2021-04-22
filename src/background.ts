import Tab = chrome.tabs.Tab;

const PICK = "pick";
const PICK_MODE_ICON = "pick-mode.png";
const DEFAULT_ICON = "icon.png";

chrome.runtime.onMessage.addListener(({ isPickMode }) => {
  if (isPickMode !== undefined) {
    toggleTo(isPickMode);
  }
});

chrome.commands.onCommand.addListener(command => {
  if (command === PICK) {
    chrome.storage.sync.get(["isPickMode", "token"], ({ isPickMode, token }) => {
      if (!token) {
        return;
      }
      isPickMode ? toggleTo(false) : toggleTo(true);
    });
  }
});

const toggleTo = (isPickMode: boolean) => {
  chrome.browserAction.setIcon({ path: isPickMode ? PICK_MODE_ICON : DEFAULT_ICON });

  chrome.storage.sync.set({ isPickMode });

  chrome.runtime.sendMessage({ isPickMode });
  chrome.tabs.query({}, (tabs: Tab[]) => {
    for (let tab of tabs) {
      chrome.tabs.sendMessage(tab.id!, { isPickMode });
    }
  });
}
