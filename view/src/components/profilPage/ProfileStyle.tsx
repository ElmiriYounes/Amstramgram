import styled from "styled-components";

export const MyPostsContainer = styled.div``;

export const ProfilContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #e7dddd;

  button {
    margin: 50px;
  }

  button:nth-child(1) {
    border-radius: 30px;
    width: 180px;
    background-color: #e7dddd;
    color: #000;
  }
  button:nth-child(2) {
    border-radius: 30px;
    width: 180px;
    color: #fff;

    @media screen and (max-width: 559px) {
      margin-top: unset;
    }
  }
`;

export const ProfilDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  grid-row: 2;

  h2 {
    padding: 20px 0;
  }

  p {
    padding-top: 20px;
  }
`;

export const ProfilImg = styled.div`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  outline-offset: 3px;
  outline: 5px solid #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  .avatar {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button{
    position: absolute;
    color: black;
    background-color: unset;
  }
`;

export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: min-content;
  margin: 20px auto;
  position: relative;

  .iconEdit{
    position: absolute;
    top: -30px;
    right: -20px;
  }
`;

export const ModalDelete = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 400px;
  width: 100%;
  align-items: center;
  background-color: white;
  padding: 20px;

  .close{
    cursor: pointer;
  }
`;

export const ModalDeleteWrap = styled.div`
background-color: rgb(0,0,0,.7);
z-index: 9999;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  padding: 50px 20px;
`;

export const ProfilMainContainer = styled.div`
  /* display: grid; */
  /* grid-template-rows: repeat(2, 1fr); */
  width: 100vw;
  padding: 50px 0;
`;

export const Container = styled.div`
  padding-top: 50px;
`;
