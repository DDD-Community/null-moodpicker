import React from "react";
import styled from "styled-components";
import { COLOR } from "../common/style";

const Header = styled.header`
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${COLOR.GRAY["100"]};
`;

const Title = styled.p`
  font-family: "Butler", serif;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  padding-left: 16px;
  line-height: 19px;
  color: ${COLOR.GRAY["900"]}
`;

const SubTitle = styled.p`
  font-family: "Noto Sans KR", serif;
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  padding-left: 6px;
  letter-spacing: -0.02em;
  color: ${COLOR.GRAY["500"]};
`;

const MoodofHeader: React.FC = () => {
  return (
    <Header>
      <Title>moodpicker</Title>
      <SubTitle>for moodof</SubTitle>
    </Header>);
}

export default MoodofHeader;
