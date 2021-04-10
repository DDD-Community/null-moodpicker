import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Switch } from "@material-ui/core";

const Popup: React.FC = () => {
  const [isPickMode, setIsPickMode] = useState<boolean>();

  useEffect(() => {
    chrome.storage.sync.get("isPickMode", ({ isPickMode }) => {
      setIsPickMode(isPickMode);
    });
  }, []);

  chrome.runtime.onMessage.addListener(({ isPickMode }) => {
    setIsPickMode(isPickMode);
  });

  const Container = styled.div`
    width: 300px;
    display: flex;
  `;

  const togglePickMode = () => {
    chrome.runtime.sendMessage({ isPickMode: !isPickMode })
  }

  return (
    <Container>
      <h1>현재 상태 : {isPickMode ? "켜짐" : "꺼짐"}</h1>
      <Switch checked={isPickMode} onChange={togglePickMode}/>
    </Container>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Popup/>
  </React.StrictMode>,
  document.getElementById("root")
);
