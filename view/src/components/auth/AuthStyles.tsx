import styled from "styled-components";

export const AuthPageText = styled.p`
    padding: 20px;
    text-align: center;

    a{
        color: #005688;;
    }
`;

export const AuthTitle = styled.h2`
    padding: 20px 0;
    text-align: center;
    font-size: 2rem;
`;

interface AuthInputProps{
    haveError?: boolean
    disable?: boolean
}

export const AuthInput = styled.input<AuthInputProps>`
    margin-top: 20px;
    padding: 5px;
    background-color:#f7f7f7;
    border: ${props => props.haveError ? '1px solid #d65e5e' : '1px solid #acacac'};
    pointer-events: ${props => props.disable && 'none'};

    &:focus{
        outline: 2px solid #72ccff;
    }
`;

export const AuthForm = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 20px;
`;

export const AuthBox = styled.div`
    width: 100%;
    background-color: aliceblue;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    &:nth-child(2){
        margin-top: 20px;
    }
`;

export const AuthBoxContainer = styled.div`
    

    @media screen and (max-width: 380px){
        width: 90%;
    }

    @media screen and (min-width: 381px) and (max-width: 768px){
        width: 75%;
    }

`;

export const AuthMainContainer = styled.div`
    background-color: #F7F7F7;
    width: 100vw;
    min-height: 100vh;
    display: grid;
    align-items: center;
    justify-items: center;
`;


interface IErrorDiv{
    success?:boolean
}

export const AuthErrorDiv = styled.div<IErrorDiv>`
    font-size: 70%;
    text-align: center;
    color: ${props => props.success ? "green" : "red"};
    margin-top: 20px;
`;
