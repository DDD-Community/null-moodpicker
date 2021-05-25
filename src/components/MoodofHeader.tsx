import React from "react";
import styled from "styled-components";
import { COLOR } from "../common/style";
// @ts-ignore
import Logo from "../images/Logo.svg";

const Header = styled.header`
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 16px;
  border-bottom: 1px solid ${COLOR.GRAY["100"]};
`;

const MoodofHeader: React.FC = () => {
  return (
    <Header>
      <img src={Logo} alt={"logo"}/>
    </Header>);
}

export default MoodofHeader;
