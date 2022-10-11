import styled from "styled-components";

export const NewPostTitle = styled.h2`
  padding: 20px 0;
  text-align: center;
  font-size: 2rem;
`;

interface NewPostInputProps {
  haveError?: boolean;
}

export const NewPostInput = styled.input<NewPostInputProps>`
  margin-top: 20px;
  padding: 5px;
  background-color: #f7f7f7;
  border: ${(props) =>
    props.haveError ? "1px solid #d65e5e" : "1px solid #acacac"};

  &:focus {
    outline: 2px solid #72ccff;
  }
`;

export const NewPostInputLabel = styled.label<NewPostInputProps>`
  margin-top: 20px;
  padding: 5px;
  background-color: #f7f7f7;
  border: ${(props) =>
    props.haveError ? "1px solid #d65e5e" : "1px solid #acacac"};
  cursor: pointer;

  position: relative;
  width: 100%;
  height: 0;
  padding: 50% 0;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    user-select: none;
  }

  &:focus,
  &:hover {
    outline: 2px solid #72ccff;
  }

  input {
    display: none;
  }
`;

export const NewPostForm = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

export const NewPostBox = styled.div`
  width: 100%;
  background-color: aliceblue;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  &:nth-child(2) {
    margin-top: 20px;
  }
`;

export const NewPostBoxContainer = styled.div`
  @media screen and (max-width: 380px) {
    width: 90%;
  }

  @media screen and (min-width: 381px) and (max-width: 600px) {
    width: 75%;
  }

  @media screen and (min-width: 601px) and (max-width: 800px) {
    width: 60%;
  }

  @media screen and (min-width: 801px) and (max-width: 1000px) {
    width: 50%;
  }

  @media screen and (min-width: 1001px) and (max-width: 1600px) {
    width: 30%;
  }

  @media screen and (min-width: 1601px) {
    width: 20%;
  }
`;

export const NewPostMainContainer = styled.div`
  background-color: #f7f7f7;
  min-height: 100vh;
  width: 100vw;
  display: grid;
  align-items: center;
  justify-items: center;
  
  @media screen and (min-width: 1000px) {
      padding: calc(56px + 50px) 0 50px 0;
  }

  @media screen and (max-width: 999.5px) {
    padding: 50px 0 calc(56px + 50px) 0;
  }
`;

interface IError {
  success?: string;
}

export const NewPostErrorDiv = styled.div<IError>`
  font-size: 70%;
  text-align: center;
  color: ${(props) => (props.success === "" ? "#d65e5e" : "green")};
  margin-top: 20px;
`;
