import styled from "styled-components";

export const ModalTitle = styled.h2`
    padding: 20px 0;
    text-align: center;
    font-size: 2rem;
`;

interface ModalInputProps{
    haveError?: boolean
    disable?: boolean
}

export const ModalInput = styled.input<ModalInputProps>`
    margin-top: 20px;
    padding: 5px;
    background-color:#f7f7f7;
    border: ${props => props.haveError ? '1px solid #d65e5e' : '1px solid #acacac'};
    pointer-events: ${props => props.disable && 'none'};

    &:focus{
        outline: 2px solid #72ccff;
    }
`;

export const ModalForm = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px;
`;

export const ModalBox = styled.div`
    background-color: aliceblue;
    z-index: 10;
    position: fixed;
    margin: auto;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    &:nth-child(2){
        margin-top: 20px;
    }

    @media screen and (max-width: 380px){
        width: 90%;
    }

    @media screen and (min-width: 381px) and (max-width: 768px){
        width: 75%;
    }
`;

interface IErrorDiv{
    success?:boolean
}

export const ModalErrorDiv = styled.div<IErrorDiv>`
    font-size: 70%;
    text-align: center;
    color: ${props => props.success ? "green" : "red"};
    margin-top: 20px;
`;

export const ModalCancelBtn = styled.div`
    background-color: black;
    color: white;
    height: 33px;
    width: 33px;
    padding: 5px;
    border: 2px solid white;
    border-radius: 50%;
    position: absolute;
    top: -16.5px;
    right: -16.5px;

    &:hover {
    background-color: #464646;
    cursor: pointer;
  }
`;
