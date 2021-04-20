import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button, Switch } from "@material-ui/core";
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
  display: flex;
`;

const Popup: React.FC = () => {
  const [isPickMode, setIsPickMode] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const handleMessages = ({ isPickMode, isLogin }: { isPickMode: boolean, isLogin: boolean }) => {
      isPickMode !== undefined ? setIsPickMode(isPickMode) : null;
      isLogin !== undefined ? setIsLogin(isLogin) : null;
    };

    chrome.runtime.onMessage.addListener(handleMessages);

    chrome.storage.sync.get(["isPickMode", "token"], ({ isPickMode, token }) => {
      setIsPickMode(isPickMode);
      token ? setIsLogin(true) : setIsLogin(false);
    });

    return () => chrome.runtime.onMessage.removeListener(handleMessages);
  }, []);

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    // TODO to popup
    chrome.tabs.create({
      url: "https://moodof.tk/oauth2/authorize/google?redirect_uri=chrome-extension://bonajmloeaegfmnganheianffheaonom/redirect_uri.html",
      active: true
    });
  }

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    chrome.storage.sync.remove("token", () => setIsLogin(false));
  }

  const togglePickMode = () => {
    chrome.runtime.sendMessage({ isPickMode: !isPickMode })
    setIsPickMode(prevState => !prevState);
  }

  return (
    <Container>
      <h1>현재 상태 : {isPickMode ? "켜짐" : "꺼짐"}</h1>
      {isLogin ? <Button onClick={handleLogout}>로그아웃</Button> : <Button onClick={handleLogin}>로그인</Button>}
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
