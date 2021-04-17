import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const RedirectUri: React.FC = () => {
  useEffect(() => {
    const token = getQueryVariable("token");
    chrome.storage.sync.set({ token }, () => {
      chrome.runtime.sendMessage({ isLogin: true });
      window.close();
    });
  }, [])

  const getQueryVariable = (variable: string) => {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    console.log('Query variable %s not found', variable);
  }

  return (<></>);
}

ReactDOM.render(
  <React.StrictMode>
    <RedirectUri/>
  </React.StrictMode>,
  document.getElementById("root")
);
