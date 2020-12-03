import React from 'react';
import Nav from './Nav.jsx';
import Bingo from './Bingo';
import BingFields from './BingoFields';
import {
  PHRASES,
  ALWAYS_ON,
  HOR_FIELDS,
  VERT_FIELDS,
  DIA_FIELDS,
} from '../lib/Constants';

const Game = ({ fieldValues, playerOne, gameState, bingo, setState }) => {
  //Game
  const newGame = () => {
    const board = [];

    //create fields
    PHRASES.forEach((p, nr) => {
      board.push({
        nr: nr + 1,
        phrase: p,
        bingo: false,
        called: false,
        players: [],
      });
    });

    //randomize fields
    board.sort((a, b) => 0.5 - Math.random());
    board.forEach((e, ind) => (e.nr = ind + 1));
    board[12].phrase = ALWAYS_ON;
    board[12].called = true;
    board[12].players = [playerOne.id];
    board[12].bingo = true;

    //update fields values
    setState({ fieldValues: board, gameState: { state: 'pre', rnd: 1 } });
  };

  const newRound = () => {
    let fieldsCopy = Object.assign(fieldValues);
    //setBingoFields in rnd 1
    if (gameState.rnd === 1) {
      function vert() {
        let col = [
          VERT_FIELDS[Math.round(Math.random() * (VERT_FIELDS.length - 1))],
        ];

        if (fieldsCopy.some((e) => e === col)) return vert();

        col.push(col[0] + 5);
        col.push(col[1] + 5);
        col.push(col[2] + 5);
        col.push(col[3] + 5);

        fieldsCopy.forEach((x) => {
          if (col.some((e) => e === x.nr)) x.bingo = true;
        });
      }

      function hori() {
        let row = [
          HOR_FIELDS[Math.round(Math.random() * (HOR_FIELDS.length - 1))],
        ];

        if (fieldsCopy.some((e) => e === row)) return hori();

        row.push(row[0] + 1);
        row.push(row[1] + 1);
        row.push(row[2] + 1);
        row.push(row[3] + 1);

        fieldsCopy.forEach((field) => {
          if (row.some((e) => e === field.nr)) field.bingo = true;
        });
      }

      function dia() {
        let row =
          DIA_FIELDS[Math.round(Math.random() * (DIA_FIELDS.length - 1))];

        if (fieldsCopy.some((e) => e === row)) return dia();

        fieldsCopy.forEach((field) => {
          if (row.some((e) => e === field.nr)) field.bingo = true;
        });
      }

      const Bingos = [dia, hori, vert];
      Bingos[Math.round(Math.random() * (Bingos.length - 1))]();
      Bingos[Math.round(Math.random() * (Bingos.length - 1))]();
      updateState();
    }

    //call new field each round
    if (gameState.rnd > 1 && gameState.rnd <= 10)
      setTimeout(() => updateState(), 1200);

    function updateState() {
      let bingoFields = fieldsCopy.filter(
        (field) => field.bingo && !field.called
      );

      let newCall =
        bingoFields[Math.round(Math.random() * (bingoFields.length - 1))];

      if (newCall)
        document.getElementById(`f-${newCall.nr}`).classList.add('bingo');
      if (newCall) newCall.called = true;

      //check for bingos in last round
      //if (gameState.rnd >= 10)
      HOR_FIELDS.forEach((e, ind) => {
        if (
          bingo.bingoFields.length > 0 &&
          bingo.bingoFields.some((b) => b === e)
        )
          return false;
        let one =
          fieldValues[e - 1].bingo &&
          fieldValues[e - 1].called &&
          fieldValues[e - 1].players.some((p) => p === playerOne.id);
        let two =
          fieldValues[e].bingo &&
          fieldValues[e].called &&
          fieldValues[e].players.some((p) => p === playerOne.id);
        let three =
          fieldValues[e + 1].bingo &&
          fieldValues[e + 1].called &&
          fieldValues[e + 1].players.some((p) => p === playerOne.id);
        let four =
          fieldValues[e + 2].bingo &&
          fieldValues[e + 2].called &&
          fieldValues[e + 2].players.some((p) => p === playerOne.id);
        let five =
          fieldValues[e + 3].bingo &&
          fieldValues[e + 3].called &&
          fieldValues[e + 3].players.some((p) => p === playerOne.id);

        if (one && two && three && four && five) {
          let copyBingo = Object.create(bingo);
          let copyPlayerOne = Object.create(playerOne);
          copyPlayerOne.bingos = copyPlayerOne.bingos + 1;
          copyBingo.bingoFields.push(e);
          copyBingo.state = true;
          setState({ playerOne: copyPlayerOne, bingo: copyBingo });
          return;
        }
      });

      // if (gameState.rnd >= 10)
      VERT_FIELDS.forEach((e, ind) => {
        if (
          bingo.bingoFields.length > 0 &&
          bingo.bingoFields.some((b) => b === e)
        )
          return false;
        let one =
          fieldValues[e - 1].bingo &&
          fieldValues[e - 1].called &&
          fieldValues[e - 1].players.some((p) => p === playerOne.id);
        let two =
          fieldValues[e - 1 + 5].bingo &&
          fieldValues[e - 1 + 5].called &&
          fieldValues[e - 1 + 5].players.some((p) => p === playerOne.id);
        let three =
          fieldValues[e - 1 + 10].bingo &&
          fieldValues[e - 1 + 10].called &&
          fieldValues[e - 1 + 10].players.some((p) => p === playerOne.id);
        let four =
          fieldValues[e - 1 + 15].bingo &&
          fieldValues[e - 1 + 15].called &&
          fieldValues[e - 1 + 15].players.some((p) => p === playerOne.id);
        let five =
          fieldValues[e - 1 + 20].bingo &&
          fieldValues[e - 1 + 20].called &&
          fieldValues[e - 1 + 20].players.some((p) => p === playerOne.id);

        if (one && two && three && four && five) {
          let copyBingo = Object.create(bingo);
          let copyPlayerOne = Object.create(playerOne);
          copyPlayerOne.bingos = copyPlayerOne.bingos + 1;
          copyBingo.bingoFields.push(e);
          copyBingo.state = true;
          setState({ playerOne: copyPlayerOne, bingo: copyBingo });
          return;
        }
      });

      //if (gameState.rnd >= 10)
      DIA_FIELDS.forEach((e, ind) => {
        if (
          bingo.bingoFields.length > 0 &&
          bingo.bingoFields.some((b) => b === e)
        )
          return false;
        let one =
          fieldValues[e[0] - 1].bingo &&
          fieldValues[e[0] - 1].called &&
          fieldValues[e[0] - 1].players.some((p) => p === playerOne.id);
        let two =
          fieldValues[e[1] - 1].bingo &&
          fieldValues[e[1] - 1].called &&
          fieldValues[e[1] - 1].players.some((p) => p === playerOne.id);
        let three =
          fieldValues[e[2] - 1].bingo &&
          fieldValues[e[2] - 1].called &&
          fieldValues[e[2] - 1].players.some((p) => p === playerOne.id);
        let four =
          fieldValues[e[3] - 1].bingo &&
          fieldValues[e[3] - 1].called &&
          fieldValues[e[3] - 1].players.some((p) => p === playerOne.id);
        let five =
          fieldValues[e[4] - 1].bingo &&
          fieldValues[e[4] - 1].called &&
          fieldValues[e[4] - 1].players.some((p) => p === playerOne.id);

        if (one && two && three && four && five) {
          let copyBingo = Object.create(bingo);
          let copyPlayerOne = Object.create(playerOne);
          copyPlayerOne.bingos = copyPlayerOne.bingos + 1;
          copyBingo.bingoFields.push(e);
          copyBingo.state = true;
          setState({ playerOne: copyPlayerOne, bingo: copyBingo });
          return;
        }
      });

      if (gameState.rnd <= 10)
        setState({
          gameState: {
            state: 'run',
            rnd: gameState.rnd + 1,
            lastCall: newCall ? newCall.phrase : '',
          },
        });

      if (gameState.rnd >= 10)
        setState({ gameState: { state: 'over', rnd: 11 } });
    }
  };

  //render board
  const renderBoard = () => {
    return (
      <>
        <Nav gameState={gameState} playerOne={playerOne} setState={setState} />
        <BingFields
          gameState={gameState}
          playerOne={playerOne}
          fieldValues={fieldValues}
          setState={setState}
        />
        <Bingo key='bingo' bingo={bingo} setState={setState} />
      </>
    );
  };

  //Set or reset Bingo Field
  if (gameState && gameState.state === 'new') newGame();

  //Update between rounds
  if (gameState && gameState.state === 'run' && gameState.rnd <= 10) newRound();

  //Render Board
  if (gameState && gameState.state && gameState.state !== 'new')
    return renderBoard();

  return <></>;
};

export default Game;
