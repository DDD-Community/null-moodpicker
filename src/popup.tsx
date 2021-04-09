import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Popup: React.FC = () => {
  const [isPickMode, setIsPickMode] = useState<boolean>();

  useEffect(() => {
    chrome.storage.sync.get("isPickMode", ({ isPickMode }) => {
      setIsPickMode(isPickMode);
    });
  }, []);

  return (
    <>
      <h1>현재 상태 : {isPickMode ? "켜짐" : "꺼짐"}</h1>
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Popup/>
  </React.StrictMode>,
  document.getElementById("root")
);
