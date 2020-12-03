import { PLAYER_ONE_START } from '../lib/Constants';

const GameOver = ({ playerOne, setState }) => {
  setTimeout(() => {
    document.getElementById('score').classList.add('fadeIn');
  }, 50);

  return (
    <>
      <p id='score'>{`Yout got ${playerOne.bingos} Bingos!`}</p>
      <p>
        <a
          id='play-button'
          href='/'
          onClick={(e) => {
            e.preventDefault();
            setState({
              fieldValues: false,
              playerOne: Object.create(PLAYER_ONE_START),
              gameState: { state: 'new', rnd: 1 },
              bingo: { state: false, bingoFields: [] },
            });
          }}>
          Play Again!
        </a>
      </p>
    </>
  );
};

export default GameOver;
