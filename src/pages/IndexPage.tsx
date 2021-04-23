import React, { useEffect, useState } from "react";
import MoodofHeader from "../components/MoodofHeader";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atoms/atom";
import { COLOR } from "../common/style";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { Switch, SwitchClassKey, SwitchProps } from "@material-ui/core";

const Container = styled.div`
  width: 320px;
  height: 480px;
  padding: 0;
  margin: 0;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 0;

  height: 440px;
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #FFFFFF;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;

  width: 320px;
  height: 94px;

  order: 0;

  border-bottom: 1px solid ${COLOR.GRAY["200"]};
  box-sizing: border-box;
  border-radius: 2px;
`

const StatusContainer = styled.div`
  display: flex;
  height: 18px;
  order: 0;
`;

const CurrentStatus = styled.p`
  margin-left: 16px;

  font-family: "NotoSans500", serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;

  display: flex;
  align-items: center;

  color: ${COLOR.OVERLAY_DARK["40"]};
`;

const PickerActivationContainer = styled.div`
  display: flex;
  flex-direction: row;
  order: 1;
  margin-top: 4px;
  height: 32px;
`;

const PickerActivation = styled.p`
  margin: 4px 0 0 16px;

  font-family: "NotoSans300", serif;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 22px;

  display: flex;
  align-items: center;
  letter-spacing: -0.01em;

  color: ${COLOR.COOL_GRAY["100"]};
`;

const PickerToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
`;

const PickerCommand = styled.p`
  font-family: "Roboto", serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 22px;

  display: flex;
  align-items: center;

  margin: 6px 80px 0 8px;

  color: ${COLOR.GRAY["500"]};
`;

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const PickSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 40,
      height: 24,
      padding: 0,
      margin: theme.spacing(1),
      marginLeft: 16,
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 22,
      height: 22,
    },
    track: {
      borderRadius: 26 / 2,
      backgroundColor: `${COLOR.GRAY["300"]}`,
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }),
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const PickerActivationDescription = styled.p`
  font-family: "NotoSans", serif;
  font-size: 12px;
  line-height: 18px;

  display: flex;
  align-items: center;
  order: 2;

  color: ${COLOR.GRAY["500"]};
  margin-left: 16px;
  margin-top: 2px;
`;

const ImageContainer = styled.div`
  height: 300px;
`;

const IndexPage: React.FC = () => {
  const setIsLogin = useSetRecoilState(loginState);
  const [isPickMode, setIsPickMode] = useState(false);

  useEffect(() => {
    const handleMessages = ({ isPickMode, isLogin }: { isPickMode: boolean, isLogin: boolean }) => {
      isPickMode !== undefined ? setIsPickMode(isPickMode) : null;
      isLogin !== undefined ? setIsLogin(isLogin) : null;
    };

    chrome.runtime.onMessage.addListener(handleMessages);

    chrome.storage.sync.get(["isPickMode", "token"], ({ isPickMode, token }) => {
      setIsPickMode(isPickMode);
      token ? setIsLogin(true) : setIsLogin(false);
      chrome.runtime.sendMessage({ isPickMode });
    });

    return () => chrome.runtime.onMessage.removeListener(handleMessages);
  }, []);

  const togglePickMode = () => {
    chrome.runtime.sendMessage({ isPickMode: !isPickMode })
    setIsPickMode(prevState => !prevState);
  }

  return (
    <Container>
      <MoodofHeader/>
      <MainContainer>
        <ActionContainer>
          <StatusContainer>
            <CurrentStatus>현재상태</CurrentStatus>
          </StatusContainer>
          <PickerActivationContainer>
            <PickerActivation>피커 활성화</PickerActivation>
            <PickerToggleContainer>
              <PickerCommand>Cmd + Shift + S</PickerCommand>
              <PickSwitch checked={isPickMode} onClick={togglePickMode}/>
            </PickerToggleContainer>
          </PickerActivationContainer>
          <PickerActivationDescription>피커 활성화로 이미지를 클릭하여 저장하세요.</PickerActivationDescription>
        </ActionContainer>
      </MainContainer>
    </Container>
  );
}

export default IndexPage;