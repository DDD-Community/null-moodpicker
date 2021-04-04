const PICK = "pick";
const PICK_MODE_ICON = "pick-mode.png";
const DEFAULT_ICON = "icon.png";

chrome.commands.onCommand.addListener(command => {
  if (command === PICK) {
    chrome.storage.sync.get("isPickMode", ({ isPickMode }) => {
        if (isPickMode) {
          toggleToDefault();
          return;
        }
        toggleToPickMode();
      }
    )
  }
});

const toggleToDefault = () => {
  chrome.browserAction.setIcon({ path: DEFAULT_ICON });
  chrome.storage.sync.set({ "isPickMode": false });
}

const toggleToPickMode = () => {
  chrome.browserAction.setIcon({ path: PICK_MODE_ICON });
  chrome.storage.sync.set({ "isPickMode": true });
}
