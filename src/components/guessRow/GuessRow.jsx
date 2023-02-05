import GuessTile from "../guessTile/GuessTile";
import './guessRow.css'
const GuessRow = ({guess, classes, guessNum}) => {

    // console.log(classes)
    return (
        <div className="GuessRow" >
            {Array(5).fill(0).map((z, idx) => <GuessTile classes={classes[idx] !== undefined ? classes[idx] : ' '} letter={guess[idx] ? guess[idx] : ' '} key={`guess-tile-${guessNum}-${idx}`}/> )}
            {/* <GuessTile classes={classes[0] !== undefined ? classes[0] : ' '} letter={guess[0] ? guess[0] : ' '}/>
            <GuessTile classes={classes[1] !== undefined ? classes[1] : ' '} letter={guess[1] ? guess[1] : ' '}/>
            <GuessTile classes={classes[2] !== undefined ? classes[2] : ' '} letter={guess[2] ? guess[2] : ' '}/>
            <GuessTile classes={classes[3] !== undefined ? classes[3] : ' '} letter={guess[3] ? guess[3] : ' '}/>
            <GuessTile classes={classes[4] !== undefined ? classes[4] : ' '} letter={guess[4] ? guess[4] : ' '}/> */}
        </div>
    );
}
 
export default GuessRow;