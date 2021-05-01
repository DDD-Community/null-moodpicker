import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { getQueryVariable } from "./common/common";

const RedirectUri: React.FC = () => {
  useEffect(() => {
    chrome.storage.local.clear();
    chrome.storage.sync.clear(() => {
      const token = getQueryVariable(window.location.search.substring(1), "token");
      chrome.storage.sync.set({ token }, () => {
        chrome.runtime.sendMessage({ isLogin: true });
      });
    });
  }, []);
  return (<></>);
}

ReactDOM.render(
  <React.StrictMode>
    <RedirectUri/>
  </React.StrictMode>,
  document.getElementById("root")
);
