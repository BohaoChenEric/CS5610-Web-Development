import React from 'react';

const GameStatus = ({ gameState, onReset, minesLeft }) => {
  return (
    <div className="mb-6 text-center">
      <div className="flex justify-between items-center mb-4 max-w-md mx-auto">
        <div className="text-xl font-bold">
          Mines Left: {minesLeft}
        </div>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Reset Game
        </button>
      </div>
      {gameState.gameOver && (
        <div className={`text-2xl font-bold ${gameState.won ? 'text-green-600' : 'text-red-600'}`}>
          {gameState.won ? 'Congratulations! You Won!' : 'Game Over! You Lost!'}
        </div>
      )}
    </div>
  );
};

export default GameStatus;