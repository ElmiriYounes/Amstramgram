import styled, { createGlobalStyle, css } from "styled-components";
import Montserrat from "./fonts/Montserrat/Montserrat-Regular.ttf";


const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "Montserrat";
  font-display: swap;
  src: url(${Montserrat}) format("truetype");
}

  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    letter-spacing: 1px;
    font-size: 18px;
  }
  
  html{
    overflow-x: hidden;
  }

  html,body{
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
  

  h1, h2, h3, button{
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
  }

  p{
    font-family: 'Montserrat', sans-serif;
  }
`;

export default GlobalStyle;
