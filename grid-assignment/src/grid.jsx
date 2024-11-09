import React, { useState } from 'react';
import Cell from './cell';

const Grid = () => {
  const [cells, setCells] = useState(Array(4).fill(false));
  
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="text-xl font-semibold text-gray-800">
        Active Cells: {cells.filter(Boolean).length}
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {cells.map((isOn, index) => (
          <Cell
            key={index}
            isOn={isOn}
            onClick={() => setCells(prev => prev.map((cell, i) => 
              i === index ? !cell : cell
            ))}
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;