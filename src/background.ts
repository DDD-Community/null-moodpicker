import Tab = chrome.tabs.Tab;

const PICK = "pick";
const PICK_MODE_ICON = "pick-mode.png";
const DEFAULT_ICON = "icon.png";

chrome.commands.onCommand.addListener(command => {
  if (command === PICK) {
    chrome.storage.sync.get("isPickMode", ({ isPickMode }) => {
        if (isPickMode) {
          toggleTo(false);
          return;
        }
        toggleTo(true);
      }
    );
  }
});

const toggleTo = (isPickMode: boolean) => {
  chrome.browserAction.setIcon({ path: isPickMode ? PICK_MODE_ICON : DEFAULT_ICON });

  chrome.storage.sync.set({ isPickMode });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs: Tab[]) => {
    chrome.tabs.sendMessage(tabs[0].id!, { isPickMode });
  });
}
