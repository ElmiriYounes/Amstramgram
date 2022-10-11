import styled from "styled-components";

export const NavBarMainContainer = styled.div`
  background-color: #f7f7f7;
  border-top: 2px solid #b6b6b6;
  border-bottom: none;
  width: 100%;
  height: 56px;
  line-height: 15px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  left: 0;
  right: 0;
  padding: 0 20px;

  .iconsItems {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }

  .HomeIcon {
    grid-column: 1/3;
    cursor: pointer;
    color: #000000;

    &:hover,
    &:focus,
    &:active {
      color: #c1c1c1;
    }
  }

  .NewPostIcon {
    grid-column: 3/3;
    cursor: pointer;
  }

  .ProfileIcon {
    grid-column: 4/6;
    cursor: pointer;
    color: #000000;
    
    &:hover,
    &:focus,
    &:active {
      color: #c1c1c1;
    }
  }

  .ProfileText,
  .HomeText,
  .PostText {
    font-size: small;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
  }

  .PostText {
    display: none;
  }

  @media screen and (min-width: 1000px) {
    position: fixed;
    top: 0;
    grid-template-columns: repeat(8, 1fr);
    border-bottom: 2px solid #b6b6b6;
    border-top: none;

    .HomeIcon{
        grid-column: 1/3;
        cursor: pointer;
        color: #000000;

        &:hover, &:focus, &:active{
          color: #c1c1c1;
        }
    }
    .iconsItems {
      width: 30vw;
      justify-content: space-between;
    }

    .HomeIcon {
      grid-column: 6/7;
    }

    .ProfileIcon{
        grid-column: 4/6;
        cursor: pointer;
        color: #000000;

        &:hover, &:focus, &:active{
          color: #c1c1c1;
        }
    }
    .NewPostIcon {
      grid-column: 7/8;
      color: #000000;

      &:hover,
      &:focus,
      &:active {
        color: #c1c1c1;
      }
    }

    .ProfileIcon {
      grid-column: 8/9;
    }

    .PostText {
      display: block;
    }
  }
`;

export const NewPostIconContainer = styled.div`
  @media screen and (max-width: 999.5px) {
    width: 56px;
    height: 56px;
    background-color: #000000;
    color: white;
    border-radius: 50%;
    position: relative;
    top: -28px;
    margin: 0 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover{
        background-color: #c1c1c1;
        color: #000000;
    }
  }
`;

export const NavBarTitle = styled.h2`
  display: none;
  text-align: center;
  font-size: 2rem;
  cursor: pointer;

  @media screen and (min-width: 1000px) {
    grid-column: 1/4;
    display: block;
  }
`;
