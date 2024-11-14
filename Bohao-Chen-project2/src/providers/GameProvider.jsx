import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {

  const [gameState, setGameState] = useState({
    board: [],      
    gameOver: false,
    won: false     
  });

  // Start a new game
  const initializeBoard = (difficulty) => {
    // Set difficulty
    let rows, cols, mines;
    if (difficulty === 'medium') {
      rows = 16;
      cols = 16;
      mines = 40;
    } else if (difficulty === 'hard') {
      rows = 16;
      cols = 30;
      mines = 99;
    } else { 
      rows = 8;
      cols = 8;
      mines = 10;
    }

    // Create empty board
    const board = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push({
          isMine: false,     
          isRevealed: false, 
          neighborMines: 0  
        });
      }
      board.push(row);
    }

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      if (!board[row][col].isMine) {
        board[row][col].isMine = true;
        minesPlaced++;
      }
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!board[i][j].isMine) {
          let count = 0;
          // Check all 8 neighbors
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              const ni = i + di;
              const nj = j + dj;
              // If neighbor exists and has mine, count it
              if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && board[ni][nj].isMine) {
                count++;
              }
            }
          }
          board[i][j].neighborMines = count;
        }
      }
    }

    // Update game state
    setGameState({
      board: board,
      gameOver: false,
      won: false
    });
  };

  // Handle cell clicks
  const handleCellClick = (row, col) => {
    if (gameState.gameOver || gameState.board[row][col].isRevealed) return;

    // Create copy of board
    const newBoard = JSON.parse(JSON.stringify(gameState.board));
    newBoard[row][col].isRevealed = true;

    // Check if mine was clicked
    if (newBoard[row][col].isMine) {
      setGameState({
        ...gameState,
        board: newBoard,
        gameOver: true,
        won: false
      });
      return;
    }

    // Continue game
    setGameState({
      ...gameState,
      board: newBoard
    });
  };

  return (
    <GameContext.Provider value={{ gameState, initializeBoard, handleCellClick }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;