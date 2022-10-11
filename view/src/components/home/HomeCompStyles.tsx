import styled, { css, keyframes } from "styled-components";

const fetchingAnim = keyframes`
  0%{
    opacity: 0;
    transform: translateX(-100vw) scale(1);
  }
  10%{
    opacity: 1;
    transform: translateX(-100px) scale(1);
  }
  20%{
    opacity: .5;
  }
  40%{
    opacity: 1;
    transform: translateX(-40px) scale(1.2);
  }
  60%{
    opacity: .5;
  }
  70%{
    transform: translateX(0) scale(1);
  }
  100%{
    opacity: 1;
    transform: translateX(100vw) scale(1);
  }
`;

/**
 *
 * @returns Array
 */
const timeDelay = (): any[] => {
  let delay: number = 0.1;
  let childs: any[] = [];
  // from child 2 to last child
  for (let i = 4; i >= 1; i--) {
    let str: any = css`
      .circle:nth-child(${i}) {
        animation: ${fetchingAnim} 4s ${delay}s linear infinite;
      }
    `;
    childs.push(str);
    delay += 0.1;
  }
  console.log(childs);

  return childs;
};

interface IFetching{
  calcHeight:string
}

export const Fetching = styled.div<IFetching>`
  width: 100%;
  padding: 50px 0;
  min-height: ${props => `calc(100vh - ${props.calcHeight})`};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  span{
    font-size: 2rem;
    padding-bottom: 20px;
  }
 
  div{
    position: relative;
  }

  .circle {
    width: 20px;
    opacity: 0;
    opacity: 1;
    color: #232323;
    margin-right: 5px;
    transform: translateX(-100vw);
  }

  ${timeDelay()}

  .circle:last-child {
    margin-right: inherit;
  }
`;

export const User = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 20px;
  color: white;
  background-color: rgb(0, 0, 0, 0.7);
  border-radius: 50px;
  position: absolute;
  top: calc(-48px - 5px);
  margin: 5px;
  height: 48px;
  z-index: 1;
  transition: all 0.5s ease-out;

  .iconUser {
    font-size: 1.5rem;
  }

  .user_localisation {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 0.6rem;
    font-family: 'Montserrat', sans-serif;

    span:first-child {
      font-weight: bold;
    }

    span:last-child {
      font-size: 0.7rem;
      margin-top: -3px;
    }
  }
`;

const showing = keyframes`
  to{
    opacity: 1;
    transform: translateY(0);
  }
`

interface IPostCard{
  delayAnimation?:number
}

export const PostCard = styled.div<IPostCard>`
  width: 350px;
  height: 350px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  opacity: 0;
    transform: translateY(20px);
  margin: 20px;
  animation: ${showing} .5s ${props => props.delayAnimation}s ease-out forwards;
  box-shadow: 0 0 1px 1px black;
  position: relative;

  .delete{
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 2rem;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    padding: 5px;
    background-color: rgb(0,0,0,.7);
  }

  @media screen and (max-width: 380px) {
    width: 240px;
    height: 240px;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s ease-out;
  }

  &:hover img {
    transform: scale(1.2);
  }

  &:hover ${User} {
    top: 0;
  }
`;

export const PostsWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const fetching = keyframes`
    to{
        transform: rotate(360deg);
    }
`;

export const HomeMainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 56px 0;

  @media screen and (max-width: 999.5px) {
    padding: 0 0 56px 0;
  }

  .iconLoading {
    animation: ${fetching} 1s linear infinite;
  }
`;


