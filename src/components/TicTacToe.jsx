import { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";


const PLAYER_X = "X";   //to denote X player
const PLAYER_O = "O";   //to denote O player

const winningCombinations = [
  //Rows of winning combos
  { combo: [0, 1, 2] },
  { combo: [3, 4, 5] },
  { combo: [6, 7, 8] },

  //Columns of winning combos
  { combo: [0, 3, 6] },
  { combo: [1, 4, 7] },
  { combo: [2, 5, 8] },

  //Diagonals of winning combos
  { combo: [0, 4, 8] },
  { combo: [2, 4, 6] },
];

function checkWinner(tiles, setGameState) {
  for (const { combo } of winningCombinations) {
    const tileValue1 = tiles[combo[0]];
    const tileValue2 = tiles[combo[1]];
    const tileValue3 = tiles[combo[2]];

    if ( //test if all the values are same and null condn to check that at beginning or reset no one win
      tileValue1 !== null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      
      if (tileValue1 === PLAYER_X) {
        setGameState(GameState.playerXWins);
      } else {
        setGameState(GameState.playerOWins);
      }
      return;
    }
  }

  const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
  if (areAllTilesFilledIn) {
    setGameState(GameState.draw);
  }
}

function TicTacToe() {
  const [tiles, setTiles] = useState(Array(9).fill(null));  // ( empty or null tiles)
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);   // Set initial starting
  const [gameState, setGameState] = useState(GameState.inProgress); //multiple checks usage

  const handleTileClick = (index) => {
    if (gameState !== GameState.inProgress) {
      return;
    }

    if (tiles[index] !== null) { // to handle bug that wont change prev tiles
      return;
    }
    // main logic copy state and insert the value using player turn as set in initial to x
    const copyTiles = [...tiles];
    copyTiles[index] = playerTurn;
    setTiles(copyTiles);
    // to make another player choice
    if (playerTurn === PLAYER_X) {
      setPlayerTurn(PLAYER_O);
    } else {
      setPlayerTurn(PLAYER_X);
    }
  };

  //reset the board
  const handleReset = () => {
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));  // set tile state again to empty 9 cells
    setPlayerTurn(PLAYER_X);
    
  };

  //after every state change it will check the winning possiblity
  useEffect(() => {
    //Winner combo thing remember
    checkWinner(tiles, setGameState);
  }, [tiles]);



  return (
    <div>
      <h1>Tic Tac Toe</h1>
      {/* initailse the board with Player turn inital x
      tiles with 9 empty cell array
      and the event handle click to fill the tile with values x or O */}
      <Board
        playerTurn={playerTurn}
        tiles={tiles}
        onTileClick={handleTileClick}
       
      />
      {/* 
      To check who wins
      Now look close in beginning it wont show anything because here in progress state is set
      and in Game over i set <></> till state is progress */}
      <GameOver gameState={gameState} />

      {/* to reset the game
      simple just pass 9 empty tiles again */}
      <Reset gameState={gameState} onReset={handleReset} />
    </div>
  );
}

export default TicTacToe;