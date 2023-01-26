import { useEffect, useState } from 'react';
import './App.css';
import GuessRow from './components/guessRow/GuessRow';
import Keyboard from './components/keyboard/Keyboard';
import useJordle from './hooks/useJordle';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainPopup from './components/mainPopup/MainPopup';
import Header from './components/header/Header';
import TutorialModal from './components/howToPlayPopup/TutorialModal';

function App() {
  const {guesses, currentGuess, handleKeyPicked, gameWord, gameState, errorMessages, updateGameState, turn, resetComplete, record} = useJordle();
  console.log(guesses)
  const [modalVisible, setModalVisible] = useState(false);
  const [tutorialVisible, setTutorialVisible] = useState(false);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(()=>{
    window.addEventListener('keyup', handleKeyPicked);
    return () => window.removeEventListener('keyup', handleKeyPicked);

  }, [handleKeyPicked])


  useEffect(() =>{
    if(errorMessages){
      toast.error(errorMessages);
    }
  }, [errorMessages])

  return (
    <div className="App">
        <Header setModalVisible={setModalVisible} setTutorialVisible={setTutorialVisible}/>
        <div className="gameboard">
          <h1>{currentGuess} - {guesses[0].word}</h1>
          {guesses.map((g, idx) => <GuessRow guess={guesses[idx].word} classes={guesses[idx].states}/>) }
          <Keyboard handleKeyPicked={handleKeyPicked}/>
          <ToastContainer data-testid='toast-container'/>
        </div>
        <MainPopup record={record} modalVisible={modalVisible} setModalVisible={setModalVisible} resetComplete={resetComplete} gameState={gameState} updateGameState={updateGameState}/>
        <TutorialModal tutorialVisible={tutorialVisible} setTutorialVisible={setTutorialVisible} />
    </div>
  );
}

export default App;