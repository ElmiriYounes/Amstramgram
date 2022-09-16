import styled, { createGlobalStyle, css } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    letter-spacing: 1px;
    font-size: 20px;
  }
  
  html{
    overflow-x: hidden;
  }

  body{
    width: 100%;
    height: 100%;
  }

  li{
    list-style: none;
  }

  a{
    text-decoration: none;
    color: unset;
  }

  p{
    line-height: 30px;
  }
`;

export default GlobalStyle;
