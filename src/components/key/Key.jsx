import React from 'react'
import { useState } from 'react'
import './key.css'
const Key = ({word, letter, handleKeyPicked}) => {
  const handleClick = (e) =>{
    let keyVal = e.target.innerText;
    if(keyVal === 'Back'){
      keyVal = 'Backspace';
    }
    handleKeyPicked({key: keyVal})
  }
  return (
    <button className={`Key key-${letter.toUpperCase()}`} onClick={(e) => handleClick(e)}>{letter}</button>
  )
}

export default Key