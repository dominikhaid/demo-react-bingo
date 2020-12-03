import ScoreBoard from './ScoreBoard';
import GameOver from './ GameOver';

const Nav = ({ gameState, playerOne, setState }) => {
  return (
    <nav id='nav'>
      {gameState.rnd !== 11 ? (
        <ScoreBoard gameState={gameState} playerOne={playerOne} />
      ) : (
        <></>
      )}
      {gameState.rnd === 11 ? (
        <GameOver playerOne={playerOne} setState={setState} />
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Nav;
