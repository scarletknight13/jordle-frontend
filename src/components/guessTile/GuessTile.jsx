import './guessTile.css'
const GuessTile = ({letter, classes}) => {
    return (
        <div className={`GuessTile ${classes}`}>{letter}</div>
    );
}
 
export default GuessTile;