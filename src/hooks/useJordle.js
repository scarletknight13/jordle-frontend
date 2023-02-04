import {useEffect, useState} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const useJordle = () =>{

    const [gameWord, setGameWord] = useState('');
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([{word: '', states: []}, {word: '', states: []}, {word: '', states: []}, {word: '', states: []}, {word: '', states: []}, {word: '', states: []}])
    const [turn, setTurn] = useState(0);
    const [gameState, setGameState] = useState('active');
    const [errorMessages, setErrorMessages] = useState(null);
    const [resetComplete, setResetComplete] = useState(false);
    const [record, setRecord] = useState(undefined);


    useEffect(() => {
        const getRecordFromLocalStorage = async () =>{
            const data = localStorage.getItem('jordleRecord');
            console.log('this happened');
            if(!data){
                setRecord({totalGames: 0, wins : 0});
            }
            else{
                setRecord(await JSON.parse(data));
            }
        }
        getRecordFromLocalStorage();
    }, [])


    useEffect(() => {
        if(record !== undefined){
            console.log(record)
            localStorage.setItem('jordleRecord', JSON.stringify(record));
        }
    }, [record])

    
    useEffect(() => {

        if(gameState !== 'active'){
            if(gameState === 'Won'){
                console.log('I won', record);
                setRecord({totalGames: record.totalGames + 1, wins : record.wins + 1})
            }
            else{
                console.log('I lost');
                setRecord({totalGames: record.totalGames + 1, wins : record.wins})
            }
        }
        const fecthWord = async () => {
            console.log('here');
            try{
                const data = await axios.get('https://jordle-api.onrender.com/getWord');
                // console.log(data.data.word);
                setGameWord(data.data.word.toUpperCase());
            }
            catch(e){
                console.log(e);
            }
        }
        fecthWord();

    }, [gameState])
    

    const restartGame = (newGameState) => {
        window.location.reload(false);
    }

    const handleGameOver = async () => {
        // setTurn(0);
        // setCurrentGuess('');
        // setGuesses([{word: '', states: []}, {word: '', states: []}, {word: '', states: []}, {word: '', states: []}, {word: '', states: []}, {word: '', states: []}]);
        setResetComplete(true);
    } 

    const handleKeyPicked = ({key}) => {

        if (gameWord && gameState === 'active'){
            console.log(currentGuess)
            //if key letter is picked add to currentGuess
            if( /^[A-Za-z]{1,1}$/.test(key) && currentGuess.length < 5){
                key = key.toUpperCase()
                setCurrentGuess(currentGuess + key);
                return 
            }
    
            //handle backspace (delete letter)
            if(key === 'Backspace'){
                setCurrentGuess(currentGuess.slice(0, -1))
                return 
            }
    
            // if enter is pressed add currentGuess to guesses
            if (key === 'Enter' && currentGuess.length === 5){
                console.log(turn)
                if(turn < 6)
                    enterGuess();
            }
        }
    }

    useEffect(() => {
        if(currentGuess === '' && gameState !== 'active'){
            if(turn === 0 && guesses[0].word === ''){
                setResetComplete(true);
                console.log('happens here')
            }
        }
        if(turn < 6){
            const newGuesses = [...guesses];
            newGuesses[turn] = {...newGuesses[turn], word: currentGuess};
            console.log(newGuesses);
            setGuesses(newGuesses);
        }
    }, [currentGuess])

    useEffect(() => {
        if(turn === 0){
            if(currentGuess === '' && guesses[0].word === ''){
                setResetComplete(true);
                console.log('happens here')
            }
        }
        if(turn === 6 && gameState === 'active'){
            setErrorMessages('You lose, try again');
            setGameState('Lost');
            handleGameOver();
        }

    }, [turn])

    useEffect(() => {
        if(guesses[0].word === ''){
            if(currentGuess === '' && turn === 0){
                setResetComplete(true);
                console.log('happens here');
            }
        }
    }, [guesses])
    const validateWord = async () => {
        try{
            const data = await axios.get(`https://jordle-api.onrender.com/isAWord/${currentGuess}`);
            console.log(data);
            if(data.data.result === false){
                setErrorMessages(data.data.message);
            }
            return data.data.result;       
        }
        catch(e){
            setErrorMessages(e.message);
            console.log(e);
        }
        return false;
    }
    const enterGuess = async () => {
        
        const response = await validateWord();
        if (response === false){
            return;
        }
        const newGuesses = [...guesses];
        const newGuessIdx = {word: guesses[turn].word, states: []}
        const newStates = [];
        console.log(gameWord, newGuessIdx.word)
        for (let i = 0; i < newGuessIdx.word.length; i++) {

            if(gameWord[i] === newGuessIdx.word[i]) {
                newStates.push('right');
            }
            else if(gameWord.charCodeAt(i) > newGuessIdx.word.charCodeAt(i)) {
                newStates.push('too-low');
            }
            else{
                newStates.push('too-high');
            }
        }

        newGuessIdx['states'] = newStates;
        newGuesses[turn] = newGuessIdx;
        console.log(newGuesses);
        setGuesses(newGuesses);
        setCurrentGuess('')
        if (newStates.find(state => state !== 'right') === undefined){
            setGameState('Won');
            handleGameOver();
        }
        setTurn(turn + 1);
    }
    
    return {guesses, currentGuess, handleKeyPicked, gameWord, gameState, errorMessages, restartGame, resetComplete, record}
}
export default useJordle;