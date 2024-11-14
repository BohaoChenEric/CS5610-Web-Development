import React from 'react';

const Cell = ({ cell, onClick, onContextMenu }) => {
  const getCellContent = () => {
    if (!cell.isRevealed) {
      return cell.isFlagged ? '🚩' : '';
    }
    if (cell.isMine) {
      return '💣';
    }
    return cell.neighborMines || '';
  };

  const getCellClass = () => {
    let className = 'cell ';
    if (!cell.isRevealed) {
      className += 'cell-hidden';
    } else if (cell.isMine) {
      className += 'cell-mine';
    } else {
      className += 'cell-revealed';
      if (cell.neighborMines > 0) {
        className += ` num-${cell.neighborMines}`;
      }
    }
    return className;
  };

  return (
    <div
      className={getCellClass()}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {getCellContent()}
    </div>
  );
};

export default Cell;