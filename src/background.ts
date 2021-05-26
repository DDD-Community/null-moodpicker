import Tab = chrome.tabs.Tab;

const PICK = "pick";
const PICK_MODE_ICON = "pickerIcon-active.png";
const NO_LOGIN_ICON = "pickerIcon-inactive.png";
const DEFAULT_ICON = "pickerIcon-default.png";

chrome.storage.sync.get(["token", "isPickMode"], ({ token, isPickMode }) => {
  toggleTo(!!isPickMode, !!token);
  if (token) {
    createContextMenu();
  }
});

let windowId: number;

chrome.runtime.onMessage.addListener(({ isPickMode, isLogin, isLoginFinished, redirectWindowId }) => {
  if (isLogin === true) {
    createContextMenu();
  }
  if (redirectWindowId !== undefined) {
    windowId = redirectWindowId;
  }
  if (isLoginFinished === true) {
    chrome.windows.remove(windowId);
  }
  if (isLogin !== undefined) {
    toggleTo(false, isLogin);
    return;
  }
  if (isPickMode !== undefined) {
    toggleTo(isPickMode, true);
    return;
  }
});

const createContextMenu = () => {
  chrome.contextMenus.create({
    "id": "logout",
    "title": "무드피커에서 로그아웃",
    "contexts": ["browser_action"],
    "onclick": () => {
      chrome.storage.local.clear();
      chrome.storage.sync.clear();
      chrome.runtime.sendMessage({ isPickMode: false, isLogin: false });
      chrome.contextMenus.remove("logout");
      toggleTo(false, false);
    }
  });
}

chrome.commands.onCommand.addListener(command => {
  if (command === PICK) {
    chrome.storage.sync.get(["isPickMode", "token"], ({ isPickMode, token }) => {
      if (!token) {
        return;
      }
      isPickMode ? toggleTo(false, true) : toggleTo(true, true);
    });
  }
});

const toggleTo = (isPickMode: boolean, isLogin: boolean) => {
  chrome.browserAction.setIcon({ path: isLogin ? isPickMode ? PICK_MODE_ICON : DEFAULT_ICON : NO_LOGIN_ICON });

  chrome.storage.sync.set({ isPickMode });

  chrome.runtime.sendMessage({ isPickMode });
  chrome.tabs.query({}, (tabs: Tab[]) => {
    for (let tab of tabs) {
      chrome.tabs.sendMessage(tab.id!, { isPickMode });
    }
  });
}
