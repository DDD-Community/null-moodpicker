import { createGlobalStyle } from "styled-components";
// @ts-ignore
import Butler from "./Butler.woff2";
// @ts-ignore
import Roboto300 from "./roboto-v27-latin-300.woff2";
// @ts-ignore
import Roboto from "./roboto-v27-latin-regular.woff2";
// @ts-ignore
import Roboto500 from "./roboto-v27-latin-500.woff2";

export default createGlobalStyle`
  @font-face {
    font-family: "Butler";
    font-style: normal;
    font-weight: 400;
    src: local('Butler'), url(${Butler}) format('woff2');
  }

  @font-face {
    font-family: 'Roboto300';
    font-style: normal;
    font-weight: 300;
    src: local('Roboto-300'), url(${Roboto300}) format('woff2');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    src: local('Roboto'), url(${Roboto}) format('woff2');
  }

  @font-face {
    font-family: 'Roboto500';
    font-style: normal;
    font-weight: 300;
    src: local('Roboto-500'), url(${Roboto500}) format('woff2');
  }
`;