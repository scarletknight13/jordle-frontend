import './mainPopup.css'
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css"; 
import "primeicons/primeicons.css";   
import React from 'react'
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useEffect, useState } from "react";

const MainPopup = ({gameState, resetComplete, record, updateGameState, modalVisible, setModalVisible}) => {

  useEffect(() =>{
    if(gameState !== 'active'){
      setModalVisible(true);
    }
  }, [gameState])
  return (
      <Dialog className="MainPopup" visible={modalVisible} onHide={() => setModalVisible(false)}
          header="Jordle"
          style={{width: '50vw', height: '50vh', backgroundColor: 'gray'}}
          contentStyle={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}
          headerClassName='dialog-header'
          >
          <div className="record-container">
            <p>{record && record.totalGames ? `Played: ${record.totalGames}` : 'Games Played: -'}</p>
            <p>{record && record.wins ? `Wins: ${record.wins}` : 'Wins: -'}</p>
            <p>{record && record.wins && record.totalGames && record.totalGames !== 0 ? `Win %: ${Math.round(record.wins / record.totalGames * 100)}%` : '`Win Percentage: -'}</p>
          </div>
          {gameState !== 'active' ? <p>{gameState === 'Won' ? "Congrats on the Win" : 'Sorry, try again'}</p> : ''}
          <button className="play-again-btn" disabled={!resetComplete} onClick={() => updateGameState('active')}>Play Again</button>
      </Dialog> 
  )
}

export default MainPopup