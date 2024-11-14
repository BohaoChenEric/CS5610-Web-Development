import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GameContext } from '../providers/GameProvider';

const Game = () => {
  // Get difficulty from URL
  const { difficulty } = useParams();
  
  // Get game functions and state from context
  const { gameState, initializeBoard, handleCellClick } = useContext(GameContext);

  // Start new game when difficulty changes
  useEffect(() => {
    initializeBoard(difficulty);
  }, [difficulty]);

  // Set cell size based on difficulty
  const getCellSize = () => {
    if (difficulty === 'medium') return 25;
    if (difficulty === 'hard') return 20;
    return 30; // easy
  };

  const cellSize = getCellSize();

  // Show loading while board initializes
  if (!gameState.board.length) {
    return <div>Loading...</div>;
  }

  // Calculate board width
  const containerWidth = gameState.board[0].length * cellSize + (gameState.board[0].length - 1);

  return (
    <div style={{ padding: '20px' }}>
      <h2>!!!GOOD LUCK!!!</h2>
      
      {gameState.gameOver && (
        <div style={{ marginBottom: '20px' }}>
          <h3>{gameState.won ? 'You Won!' : 'Game Over!'}</h3>
          <button 
            onClick={() => initializeBoard(difficulty)}
            style={{ padding: '8px 16px', marginBottom: '10px' }}
          >
            New Game
          </button>
        </div>
      )}

      <div style={{ width: 'fit-content', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gameState.board[0].length}, ${cellSize}px)`,
          gap: '1px',
          backgroundColor: '#999',
          padding: '1px',
          width: `${containerWidth}px`,
        }}>
          {gameState.board.map((row, i) =>
            row.map((cell, j) => (
              <button
                key={`${i}-${j}`}
                onClick={() => handleCellClick(i, j)}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  padding: 0,
                  backgroundColor: cell.isRevealed 
                    ? (cell.isMine ? 'red' : 'white')
                    : '#ddd',
                  border: '1px solid #999',
                  cursor: !cell.isRevealed && !gameState.gameOver ? 'pointer' : 'default',
                  fontSize: `${cellSize * 0.6}px`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {cell.isRevealed ? (cell.isMine ? '💣' : (cell.neighborMines || '')) : ''}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;