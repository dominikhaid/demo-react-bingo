import React from 'react';

function BingoFields({ gameState, playerOne, fieldValues, setState }) {
  if (
    (gameState && gameState.rnd === 11) ||
    !fieldValues ||
    fieldValues.length < 1
  )
    return <></>;

  const setField = (e) => {
    //check if already selected

    if (playerOne.turns < 1) return;

    if (
      e.target.classList.contains(`p-${playerOne.id}`) ||
      fieldValues.findIndex((field) =>
        field.players.some((a) => a === e.target.id)
      ) !== -1
    )
      return console.log('already selected');

    //update fieldValues data
    let newValues = Object.assign(fieldValues);

    newValues.forEach((field) => {
      if (field.nr === Number(e.target.id.replace('f-', '')))
        field.players.push(playerOne.id);
    });

    let updatePlayer = Object.assign(playerOne);
    updatePlayer.turns -= 1;

    if (updatePlayer.turns < 1)
      setState({
        playerOne: updatePlayer,
        gameState: { state: 'run', rnd: 1 },
      });

    setState({ playerOne: updatePlayer, fieldValues: newValues });
  };

  let fields = fieldValues.map((field) => {
    let addClass =
      field.nr === 13
        ? 'joker'
        : field.bingo === true &&
          field.called === true &&
          field.players.some((e) => e === playerOne.id)
        ? `p-${playerOne.id} bingo`
        : field.bingo === true && field.called === true
        ? 'bingo'
        : field.players.some((e) => e === playerOne.id)
        ? `p-${playerOne.id}`
        : '';

    return (
      <div
        key={field.nr}
        className={addClass}
        id={`f-${field.nr}`}
        onClick={(e) => setField(e)}>
        {field.phrase}
      </div>
    );
  });

  return fields;
}

export default BingoFields;
