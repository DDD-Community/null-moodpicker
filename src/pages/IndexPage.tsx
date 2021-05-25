import React, { useEffect, useState } from "react";
import MoodofHeader from "../components/MoodofHeader";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atoms/atom";
import { COLOR } from "../common/style";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { Switch, SwitchClassKey, SwitchProps } from "@material-ui/core";
import { get } from "../common/api";
// @ts-ignore
import Arrow from "../images/Arrow.svg";
import { BASE_URL } from "../common/common";

const Container = styled.div`
  width: 320px;
  height: 440px;
  padding: 0;
  margin: 0;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 0 0 0;

  height: 384px;
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), #FFFFFF;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;

  margin-left: 16px;
  width: 288px;
  height: 61px;

  order: 0;

  border-bottom: 1px solid ${COLOR.GRAY["200"]};
  border-radius: 2px;
`;

const PickerActivationContainer = styled.div`
  display: block;
  height: 24px;
  width: 288px;
`;

const PickerActivation = styled.span`
  font-family: "Noto Sans KR", serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;

  letter-spacing: -0.01em;

  margin-right: 8px;
  white-space: nowrap;

  color: ${COLOR.COOL_GRAY["100"]};
`;

const PickerCommand = styled.span`
  font-family: "Noto Sans KR", serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 22px;

  white-space: nowrap;
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
      float: "right",
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
  font-family: "Noto Sans KR", serif;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;

  display: flex;
  align-items: center;
  order: 2;

  color: ${COLOR.GRAY["500"]};
  margin-top: 4px;
`;

const EmptyImageContainer = styled.div`
  width: 288px;
  height: 202px;
  margin-left: 16px;
  margin-top: 3px;
  margin-bottom: 16px;
  background: ${COLOR.GRAY["50"]};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyImageDescription = styled.p`
  font-family: "Noto Sans KR", serif;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;

  color: ${COLOR.GRAY["500"]};
`;

const SaveImagesContainer = styled.div`
  width: 320px;
  height: 278px;
  padding: 8px 16px 0 16px;
  flex-wrap: wrap;
  overflow: scroll;
  display: flex;
`;

const SavedImage = styled.p`
  font-family: "Noto Sans KR", serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  margin: 16px 0 8px 16px;
  color: ${COLOR.OVERLAY_DARK["40"]};
`;

const ImageContainer = styled.div`
  width: 140px;
  height: 105px;
  margin-right: 8px;
  margin-bottom: 8px;

  :hover span {
    display: inline;
  }
`;

const PickedImage = styled.img`
  width: 140px;
  height: 105px;
  object-fit: cover;
`;

const ImageSize = styled.span`
  display: none;
  position: relative;
  top: -19px;
  left: 0;
  color: rgba(255, 255, 255, 0.8);
  padding: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 10px;
  line-height: 14px;
`;

const ProfileContainer = styled.div`
  display: flex;
  width: 320px;
  height: 60px;

  border-top: 1px solid ${COLOR.GRAY["200"]};

  transition: background-color 150ms linear;

  &:hover {
    background-color: ${COLOR.GRAY["100"]};
  }
`;

const ProfileImage = styled.img`
  margin-left: 16px;
  margin-top: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  margin-top: 11px;
  justify-content: flex-start;
`;

const Nickname = styled.p`
  font-family: "Noto Sans KR", serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${COLOR.COOL_GRAY["100"]};
  margin: 0;
`;

const Email = styled.p`
  font-family: "Noto Sans KR", serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: ${COLOR.GRAY["500"]};
  margin: -3px 0 12px 0;
`;

const ArrowIconContainer = styled.div`
  display: flex;
  padding-right: 21.5px;
  margin-left: auto;
  align-items: center;
`;

const ArrowIcon = styled.img`
  width: 100%;
`;

type User = {
  nickname: string,
  email: string,
  profileUrl: string
}

const IndexPage: React.FC = () => {
  const setIsLogin = useSetRecoilState(loginState);
  const [isPickMode, setIsPickMode] = useState(false);
  const [images, setImages] = useState<Array<{
    src: string;
    width: number;
    height: number;
  }>>([])
  const [user, setUser] = useState<User>({
    email: "moodof.net",
    nickname: "moodof",
    profileUrl: "https://img.icons8.com/cotton/2x/gender-neutral-user--v2.png"
  });
  const [pickerCommand, setPickerCommand] = useState<string>("");

  useEffect(() => {
    setPickerCommand(getPickerCommand());
    const handleMessages = ({ isPickMode, isLogin }: { isPickMode: boolean, isLogin: boolean }) => {
      isPickMode !== undefined ? setIsPickMode(isPickMode) : null;
      isLogin !== undefined ? setIsLogin(isLogin) : null;
    };

    chrome.runtime.onMessage.addListener(handleMessages);

    chrome.storage.sync.get(["isPickMode", "token"], async ({ isPickMode, token }) => {
      isPickMode ? setIsPickMode(isPickMode) : setIsPickMode(false);
      token ? setIsLogin(true) : setIsLogin(false);
      chrome.runtime.sendMessage({ isPickMode });
      try {
        const { data } = await get("/api/me", token);
        setUser(data);
      } catch (e) {
        console.log(e);
        setIsLogin(false);
        chrome.storage.sync.remove("token");
      }
    });

    chrome.storage.local.get("images", ({ images }) => {
        if (!!images) {
          setImages(images.reverse());
          return;
        }
        setImages([]);
      }
    );
    return () => chrome.runtime.onMessage.removeListener(handleMessages);
  }, []);

  const getPickerCommand = () => {
    const os = window.navigator.platform.toLocaleLowerCase();
    if (os.includes("mac")) {
      return "Cmd + Shift + S";
    }
    if (os.includes("win")) {
      return "Ctrl + Shift + S";
    }
    return "Cmd + Shift + S";
  }

  const togglePickMode = () => {
    chrome.runtime.sendMessage({ isPickMode: !isPickMode })
    setIsPickMode(prevState => !prevState);
  }

  const handleProfile = () => {
    chrome.tabs.create({ url: BASE_URL })
  }

  return (
    <Container>
      <MoodofHeader/>
      <MainContainer>
        <ActionContainer>
          <PickerActivationContainer>
            <PickerActivation>피커 활성화</PickerActivation>
            <PickerCommand>{pickerCommand}</PickerCommand>
            <PickSwitch checked={isPickMode} onClick={togglePickMode}/>
          </PickerActivationContainer>
          <PickerActivationDescription>피커 활성화로 이미지를 클릭하여 저장하세요.</PickerActivationDescription>
        </ActionContainer>
        <SavedImage>저장된 이미지</SavedImage>
        {!images || images.length === 0 ?
          <EmptyImageContainer>
            <EmptyImageDescription>최근 저장된 20개의 이미지가 표시됩니다.</EmptyImageDescription>
          </EmptyImageContainer> :
          <SaveImagesContainer>
            {images.map((image, index) =>
              <ImageContainer key={image.src + image.height}>
                <PickedImage key={image.src} src={image.src}/>
                <ImageSize key={image.src + image.width}>{image.width} x {image.height}</ImageSize>
              </ImageContainer>
            )}
          </SaveImagesContainer>}
        <ProfileContainer onClick={handleProfile}>
          <ProfileImage src={user.profileUrl}/>
          <ProfileInfoContainer>
            <Nickname>{user.nickname}</Nickname>
            <Email>{user.email}</Email>
          </ProfileInfoContainer>
          <ArrowIconContainer>
            <ArrowIcon src={Arrow}/>
          </ArrowIconContainer>
        </ProfileContainer>
      </MainContainer>
    </Container>
  );
}

export default IndexPage;