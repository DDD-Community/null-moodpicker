import React from "react";
import styled from "styled-components";
import GlobalFonts from "../fonts/fonts";
import { COOL_GRAY_500, GRAY_100, GRAY_500, GRAY_900 } from "../common/style";
// @ts-ignore
import GoogleLogin from "../images/Google-Login.png";
// @ts-ignore
import Moodof from "../images/Moodof.png";

const Container = styled.div`
  width: 320px;
  height: 160px;
  padding: 0;
  margin: 0;
`;

const Header = styled.header`
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${GRAY_100};
`;

const Title = styled.h1`
  font-family: "Butler", serif;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  padding-left: 16px;
  line-height: 19px;
  color: ${GRAY_900}
`;

const SubTitle = styled.h2`
  font-family: "Roboto", serif;
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  padding-left: 6px;
  letter-spacing: -0.02em;
  color: ${GRAY_500};
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

const LoginButtonDescription = styled.h1`
  font-family: "Roboto", serif;
  font-size: 14px;
  line-height: 16px;
  font-weight: normal;
  font-style: normal;
  letter-spacing: -0.02em;
  color: ${COOL_GRAY_500};
`;

const MoodofButtonDescription = styled.h1`
  font-family: "Roboto", serif;
  font-size: 14px;
  line-height: 16px;
  font-weight: normal;
  font-style: normal;
  letter-spacing: -0.02em;
  color: #FFFFFF;
`;

const LoginPage: React.FC = () => {
  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    chrome.tabs.create({
      url: "https://moodof.tk/oauth2/authorize/google?redirect_uri=chrome-extension://bonajmloeaegfmnganheianffheaonom/redirect_uri.html",
      active: true
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
      <Header>
        <GlobalFonts/>
        <Title>moodpicker</Title>
        <SubTitle>for moodof</SubTitle>
      </Header>
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
