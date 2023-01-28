import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css"; 
import "primeicons/primeicons.css";   
import React from 'react'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useEffect, useState } from "react";
import './tutorialModal.css'


const TutorialModal = ({tutorialVisible, setTutorialVisible}) => {
  return (
    <Dialog className="TutorialModal" visible={tutorialVisible} onHide={() => setTutorialVisible(false)}
        header="How To Play"
        style={{width: '45vw', height: '85vh'}}
        contentStyle={{display: 'flex', textAlign: "center", flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}
        >
        <p className="tutorial-paragraph">Guess the word in 6 tries</p>
        <p className="tutorial-paragraph">Every word must be a valid 5 letter word.</p>
        <p className="tutorial-paragraph">The color of the tiles will change to show how close your guess was to the word.</p>
        <div className="example-container">
          <p className="tutorial-paragraph">Examples</p>
          <ul className="example-word">
            <li className="example-letter blue-example-letter">W</li>
            <li className="example-letter">E</li>
            <li className="example-letter">A</li>
            <li className="example-letter">R</li>
            <li className="example-letter">Y</li>
          </ul>
          <p className="tutorial-paragraph"> The blue background means the letter in the cooresponding positon is closer to Z.</p>
          <ul className="example-word">
            <li className="example-letter">P</li>
            <li className="example-letter" style={{backgroundColor : 'red'}}>I</li>
            <li className="example-letter">L</li>
            <li className="example-letter">L</li>
            <li className="example-letter">S</li>
          </ul>
          <p className="tutorial-paragraph"> The red background means the letter in the cooresponding positon is closer to A.</p>
          <ul className="example-word">
            <li className="example-letter">V</li>
            <li className="example-letter">A</li>
            <li className="example-letter" style={{backgroundColor : 'green'}}>G</li>
            <li className="example-letter">U</li>
            <li className="example-letter">E</li>
          </ul>
          <p className="tutorial-paragraph"> The green background means you guessed the letter in the cooresponding position correctly.</p>
        </div>
       
    </Dialog> 
  )
}

export default TutorialModal