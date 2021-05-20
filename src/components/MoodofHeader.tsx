import React from "react";
import styled from "styled-components";
import { COLOR } from "../common/style";

const Header = styled.header`
  height: 40px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${COLOR.GRAY["100"]};
`;

const Title = styled.span`
  font-family: "Butler", serif;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  margin-left: 16px;
  margin-top: 12px;
  line-height: 19px;
  color: ${COLOR.GRAY["900"]}
`;

const SubTitle = styled.span`
  font-family: "Noto Sans KR", serif;
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  margin-left: 6px;
  margin-top: 13px;
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
