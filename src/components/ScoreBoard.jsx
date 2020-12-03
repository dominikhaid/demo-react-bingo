const ScoreBoard = ({ gameState, playerOne }) => {
  return (
    <>
      <p id='score'>{gameState.lastCall}</p>
      {playerOne.turns > 0 ? (
        <p id='turns' key='truns'>{`Verbleibend: ${playerOne.turns}`}</p>
      ) : (
        <></>
      )}
    </>
  );
};

export default ScoreBoard;
