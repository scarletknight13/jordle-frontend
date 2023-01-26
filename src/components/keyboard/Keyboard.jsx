import './keyboard.css'
import Key from '../key/Key'
const Keyboard = ({word, handleKeyPicked}) => {

    console.log(typeof setSeen);
    const keys = [];
    for(let i = 0; i < 26; ++i){
        keys.push(String.fromCharCode('A'.charCodeAt() + i));
    }
    const mappedKeys = keys.map((key, idx) => <Key key={`key-${idx}`} handleKeyPicked={handleKeyPicked} word={word} letter={key}></Key>)
    const topKeys = mappedKeys.slice(0, 10);
    const middleKeys = mappedKeys.slice(10, 19);
    const bottomKeys = [<Key key={`key-57`} handleKeyPicked={handleKeyPicked} word={word} letter={'Back'}></Key>, ...mappedKeys.slice(19, 26), <Key key={`key-58`} handleKeyPicked={handleKeyPicked} word={word} letter={'Enter'}></Key>];
    return (
        <div className="Keyboard">
            <div className="keyboard-top-row keyboard-row">{topKeys}</div>
            <div className="keyboard-middle-row keyboard-row">{middleKeys}</div>
            <div className="keyboard-bottom-row keyboard-row">{bottomKeys}</div>
        </div>
    );
}
 
export default Keyboard;