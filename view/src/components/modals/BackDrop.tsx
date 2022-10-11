import React, { FC } from 'react'
import { BackDropComp } from './BackDropStyles';

interface BackDropProps{
  onClick?: () => void;
}

const BackDrop:FC<BackDropProps> = (props) => {
  return (
    <BackDropComp onClick={props.onClick}/>
  )
}

export default BackDrop