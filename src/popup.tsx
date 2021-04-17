import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Switch } from "@material-ui/core";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const Popup: React.FC = () => {
  const [isPickMode, setIsPickMode] = useState<boolean>();
  const [token, setToken] = useState<String>();

  useEffect(() => {
    chrome.storage.sync.get(["isPickMode", "token"], ({ isPickMode, token }) => {
      setIsPickMode(isPickMode);
      setToken(token);
    });
  }, []);

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    chrome.tabs.create({
      url: "https://moodof.tk/oauth2/authorize/google?redirect_uri=chrome-extension://bonajmloeaegfmnganheianffheaonom/redirect_uri.html",
      active: false
    });
  }

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    chrome.storage.sync.remove("token", () => setToken(""));
  }

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
      {token ? <Button onClick={handleLogout}>로그아웃</Button> : <Button onClick={handleLogin}>로그인</Button>}
    </Container>
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
