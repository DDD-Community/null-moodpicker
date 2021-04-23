import React, { useEffect } from "react";
import styled from "styled-components";
import { COLOR } from "../common/style";
// @ts-ignore
import GoogleLogin from "../images/Google-Login.png";
// @ts-ignore
import Moodof from "../images/Moodof.png";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atoms/atom";
import MoodofHeader from "../components/MoodofHeader";

const Container = styled.div`
  width: 320px;
  height: 160px;
  padding: 0;
  margin: 0;
`;

const ButtonContainer = styled.div`
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  width: 240px;
  height: 40px;
  margin-top: 16px;
  margin-left: 40px;
  margin-right: 40px;
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 2px;
  padding: 0;
`;

const MoodofButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  width: 240px;
  height: 40px;
  margin-top: 8px;
  margin-left: 40px;
  margin-right: 40px;
  background: #121619;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 2px;
  padding: 0;
`;

const ButtonIcon = styled.img`
  width: 18px;
  height: 18px;
  padding: 11px 0 11px 16px;
  margin-right: 24px;
`;

const LoginButtonDescription = styled.p`
  font-family: "Roboto", serif;
  font-size: 14px;
  line-height: 16px;
  font-weight: normal;
  font-style: normal;
  letter-spacing: -0.02em;
  color: ${COLOR.COOL_GRAY["100"]};
`;

const MoodofButtonDescription = styled.p`
  font-family: "Roboto", serif;
  font-size: 14px;
  line-height: 16px;
  font-weight: normal;
  font-style: normal;
  letter-spacing: -0.02em;
  color: #FFFFFF;
`;

const LoginPage: React.FC = () => {
  const setIsLogin = useSetRecoilState(loginState);

  useEffect(() => {
    chrome.storage.sync.get("token", ({ token }) => {
      setIsLogin(!!token);
    });

    const handleMessage = ({ isLogin }: { isLogin: boolean }) => {
      isLogin !== undefined ? setIsLogin(isLogin) : null;
    }

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => chrome.runtime.onMessage.removeListener(handleMessage);
  }, []);

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    chrome.windows.create({
      type: "popup",
      url: "https://moodof.tk/oauth2/authorize/google?redirect_uri=chrome-extension://bonajmloeaegfmnganheianffheaonom/redirect_uri.html",
      focused: true,
      width: 480,
      height: 640,
      top: Math.round(screen.availHeight / 2 - 320),
      left: Math.round(screen.availWidth / 2 - 240),
    });
  }

  const handleMoodof = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    chrome.tabs.create({
      url: "https://moodof.tk/",
      active: true
    });
  }

  return (
    <Container>
      <MoodofHeader/>
      <ButtonContainer>
        <LoginButton onClick={handleLogin}>
          <ButtonIcon src={GoogleLogin}/>
          <LoginButtonDescription>Google 계정으로 로그인</LoginButtonDescription>
        </LoginButton>
        <MoodofButton onClick={handleMoodof}>
          <ButtonIcon src={Moodof}/>
          <MoodofButtonDescription>무드오브 페이지 바로가기</MoodofButtonDescription>
        </MoodofButton>
      </ButtonContainer>
    </Container>
  );
}

export default LoginPage;
