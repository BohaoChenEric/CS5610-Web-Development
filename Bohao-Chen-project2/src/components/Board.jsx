import React from 'react';
import Cell from './Cell';

const Board = ({ board, onCellClick, onCellRightClick }) => {
  return (
    <div 
      className="game-board"
      style={{
        gridTemplateColumns: `repeat(${board[0].length}, 1fr)`
      }}
    >
      {board.map((row, i) =>
        row.map((cell, j) => (
          <Cell
            key={`${i}-${j}`}
            cell={cell}
            onClick={() => onCellClick(i, j)}
            onContextMenu={(e) => onCellRightClick(e, i, j)}
          />
        ))
      )}
    </div>
  );
};

export default Board;