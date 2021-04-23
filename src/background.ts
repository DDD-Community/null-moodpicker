import Tab = chrome.tabs.Tab;

const PICK = "pick";
const PICK_MODE_ICON = "pick-mode.png";
const DEFAULT_ICON = "icon.png";

chrome.storage.sync.get(["token", "isPickMode"], ({ token, isPickMode }) => {
  toggleTo(!!isPickMode);
  if (token) {
    chrome.contextMenus.create({
      "id": "logout",
      "title": "무드피커에서 로그아웃",
      "contexts": ["browser_action"],
      "onclick": () => {
        chrome.storage.sync.remove("token", () => {
          chrome.runtime.sendMessage({ isPickMode: false, isLogin: false });
          chrome.contextMenus.remove("logout");
          toggleTo(false);
        });
      }
    });
  }
})

chrome.runtime.onMessage.addListener(({ isPickMode, isLogin }) => {
  if (isLogin === true) {
    chrome.contextMenus.create({
      "id": "logout",
      "title": "무드피커에서 로그아웃",
      "contexts": ["browser_action"],
      "onclick": () => {
        chrome.storage.sync.remove("token", () => {
          chrome.runtime.sendMessage({ isPickMode: false, isLogin: false });
          chrome.contextMenus.remove("logout");
          toggleTo(false);
        });
      }
    });
  }
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
