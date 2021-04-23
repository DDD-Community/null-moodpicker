import React from "react";
import LoginPage from "./pages/LoginPage";
import ReactDOM from "react-dom";
import { RecoilRoot, useRecoilValue } from "recoil";
import { loginState } from "./atoms/atom";
import IndexPage from "./pages/IndexPage";
import GlobalFonts from "./fonts/fonts";

const Popup: React.FC = () => {
  const isLogin = useRecoilValue(loginState);

  return (
    <>
      <GlobalFonts/>
      {isLogin ? <IndexPage/> : <LoginPage/>}
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Popup/>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
