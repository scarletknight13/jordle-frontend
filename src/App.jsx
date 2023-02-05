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
  const {guesses, currentGuess, handleKeyPicked, gameWord, gameState, errorMessages, restartGame, turn, resetComplete, record} = useJordle();
  // console.log(guesses)
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
          {guesses.map((g, idx) => <GuessRow key={`guess-row-${idx}`} guess={guesses[idx].word} classes={guesses[idx].states} guessNum={idx}/>) }
        </div>
        <Keyboard handleKeyPicked={handleKeyPicked}/>
        <ToastContainer data-testid='toast-container'/>
        <MainPopup record={record} modalVisible={modalVisible} setModalVisible={setModalVisible} resetComplete={resetComplete} gameState={gameState} restartGame={restartGame}/>
        <TutorialModal tutorialVisible={tutorialVisible} setTutorialVisible={setTutorialVisible} />
    </div>
  );
}

export default App;
