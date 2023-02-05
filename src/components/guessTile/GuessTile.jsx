import './guessTile.css'
const GuessTile = ({letter, classes, guessNum, letterNum}) => {
    return (
        <div className={`GuessTile ${classes}`}>{letter}</div>
    );
}
 
export default GuessTile;