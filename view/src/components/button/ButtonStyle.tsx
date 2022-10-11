import styled, { keyframes } from "styled-components";

const loading = keyframes`
    to{
        transform: rotate(360deg);
    }
`;

interface IBtn {
  disable?: any;
}

export const Btn = styled.button<IBtn>`
  margin: 20px 0;
  padding: 10px 0;
  background-color: #000000;
  border-radius: 50px;
  border: none;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  pointer-events: ${(props) => typeof props.disable === 'object' && "none"};

  &:hover {
    background-color: #464646;
    cursor: pointer;
  }

  .icon {
    animation: ${loading} 0.5s linear infinite;
  }
`;
