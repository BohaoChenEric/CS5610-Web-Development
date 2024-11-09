import React from 'react';

const Cell = ({ isOn, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-24 h-24 border border-gray-300 transition-colors duration-200 ${
        isOn ? 'bg-black' : 'bg-white'
      }`}
      aria-label={isOn ? 'Turn cell off' : 'Turn cell on'}
    />
  );
};

export default Cell;