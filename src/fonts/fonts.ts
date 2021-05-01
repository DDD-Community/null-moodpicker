import { createGlobalStyle } from "styled-components";
// @ts-ignore
import Butler from "./Butler.woff2";
// @ts-ignore
import NotoSansKRThin from "./NotoSansKR-Thin.otf";
// @ts-ignore
import NotoSansKRLight from "./NotoSansKR-Light.otf";
// @ts-ignore
import NotoSansKRRegular from "./NotoSansKR-Regular.otf";
// @ts-ignore
import NotoSansKRMedium from "./NotoSansKR-Medium.otf";
// @ts-ignore
import NotoSansKRBold from "./NotoSansKR-Bold.otf";
// @ts-ignore
import NotoSansKRBlack from "./NotoSansKR-Black.otf";


export default createGlobalStyle`
  @font-face {
    font-family: "Butler";
    font-style: normal;
    font-weight: 400;
    src: url(${Butler}) format('woff2');
  }

  @font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKRThin}) format('truetype');
    font-weight: 100;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKRLight}) format('truetype');
    font-weight: 300;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKRRegular}) format('truetype');
    font-weight: 400;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKRMedium}) format('truetype');
    font-weight: 500;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKRBold}) format('truetype');
    font-weight: 700;
  }

  @font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKRBlack}) format('truetype');
    font-weight: 900;
  }
`;