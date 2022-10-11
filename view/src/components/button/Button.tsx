import React from 'react'
import { FC } from 'react';
import { Btn } from './ButtonStyle';

interface BtnProps{
    text: any;
    onClick?: () => void;
}

const Button:FC<BtnProps> = (props) => {
  
  return (
    <Btn onClick={props.onClick} disable={props.text}>{props.text}</Btn>
  )
}

export default Button