import Tab = chrome.tabs.Tab;

const PICK = "pick";
const PICK_MODE_ICON = "pick-mode.png";
const DEFAULT_ICON = "icon.png";

chrome.commands.onCommand.addListener(command => {
  if (command === PICK) {
    chrome.storage.sync.get("isPickMode", ({ isPickMode }) =>
      isPickMode ? toggleTo(false) : toggleTo(true));
  }
});

const toggleTo = (isPickMode: boolean) => {
  chrome.browserAction.setIcon({ path: isPickMode ? PICK_MODE_ICON : DEFAULT_ICON });

  chrome.storage.sync.set({ isPickMode });

  chrome.tabs.query({}, (tabs: Tab[]) => {
    for (let tab of tabs) {
      chrome.tabs.sendMessage(tab.id!, { isPickMode });
    }
  });
}

chrome.tabs.onCreated.addListener(tab => {
  chrome.storage.sync.get("isPickMode", ({ isPickMode }) =>
    chrome.tabs.sendMessage(tab.id!, { isPickMode }));
});
