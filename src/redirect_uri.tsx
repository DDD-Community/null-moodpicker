import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { getQueryVariable } from "./common/common";

const RedirectUri: React.FC = () => {
  useEffect(() => {
    const token = getQueryVariable(window.location.search.substring(1), "token");
    chrome.storage.sync.set({ token }, () => {
      chrome.runtime.sendMessage({ isLogin: true });
      window.close();
    });
  }, [])

  return (<></>);
}

ReactDOM.render(
  <React.StrictMode>
    <RedirectUri/>
  </React.StrictMode>,
  document.getElementById("root")
);
