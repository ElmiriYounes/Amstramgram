import styled, { keyframes } from "styled-components";

const loading = keyframes`
    to{
        transform: rotate(360deg);
    }
`;

export const ModalDelete = styled.div`
  background-color: rgb(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  top: 0;
  position: fixed;
  z-index: 10;

  .icon {
    animation: ${loading} 0.5s linear infinite;
  }
  
  & > div {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    text-align: center;

    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;

      & > button{
        padding: 5px 10px;
        background-color: black;
        color: white;
        border: none;
        border-radius: 20px;
      }

      & > button:hover{
        background-color: #1f1f1f;
        cursor: pointer;
      }

      & > button:first-child{
        margin-right: 20px;
      }
    }
  }
`;

export const AvatarWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;

  & > button {
    width: 100%;
    position: relative;
  }

  & > input {
    position: absolute;
    opacity: 1;
    cursor: pointer;
    z-index: -1;
  }
`;

export const EditProfileTitle = styled.h2`
  padding: 20px 0;
  text-align: center;
  font-size: 2rem;
`;

export const EditProfileEditContainer = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
`;

export const EditProfileEditBtn = styled.div`
  margin-top: 20px;
  background-color: black;
  color: white;
  height: 33px;
  width: 33px;
  border-radius: 25%;
  padding: 7px;
  justify-self: center;

  &:hover {
    background-color: #464646;
    cursor: pointer;
  }
`;

interface EditProfileInputProps {
  haveError?: boolean;
  disable?: boolean;
}

export const EditProfileInput = styled.input<EditProfileInputProps>`
  margin-top: 20px;
  padding: 5px;
  background-color: #f7f7f7;
  border: ${(props) => props.haveError ? "1px solid #d65e5e" : "1px solid #acacac"};
  pointer-events: ${(props) => props.disable && "none"};

  &:focus {
    outline: 2px solid #72ccff;
  }
`;

export const EditProfileForm = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;

  .msg {
    text-align: center;
    padding: 0.6rem;
    color: green;
  }
`;

export const EditProfileBox = styled.div`
  width: 100%;
  background-color: aliceblue;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  &:nth-child(2) {
    margin-top: 20px;
  }
`;

export const EditProfileBoxContainer = styled.div`
  @media screen and (max-width: 380px) {
    width: 90%;
  }

  @media screen and (min-width: 381px) and (max-width: 768px) {
    width: 75%;
  }
`;

export const EditProfileMainContainer = styled.div`
  background-color: #f7f7f7;
  width: 100vw;
  min-height: 100vh;
  display: grid;
  align-items: center;
  justify-items: center;
`;

interface IErrorDiv {
  success?: boolean;
}

export const EditProfileErrorDiv = styled.div<IErrorDiv>`
  font-size: 70%;
  text-align: center;
  color: ${(props) => (props.success ? "green" : "red")};
  margin-top: 20px;
`;
