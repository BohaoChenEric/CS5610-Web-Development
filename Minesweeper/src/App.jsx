import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GameProvider from './providers/GameProvider';
import Game from './pages/Game';

function App() {
  return (
    <Router>
      <GameProvider>
        <div>
          <nav style={{ margin: '20px' }}>
            <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
            <Link to="/rules">How to Play</Link>
          </nav>
          <Routes>
            <Route path="/" element={
              <div style={{ textAlign: 'center', margin: '20px' }}>
                <h1>Minesweeper</h1>
                <h1>Made by</h1>
                <h1>Bohao Chen</h1>
                <div style={{ margin: '20px' }}>
                  <Link to="/game/easy" style={{ margin: '10px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', textDecoration: 'none' }}>
                    Easy
                  </Link>
                  <Link to="/game/medium" style={{ margin: '10px', padding: '10px', backgroundColor: '#FFC107', color: 'white', textDecoration: 'none' }}>
                    Medium
                  </Link>
                  <Link to="/game/hard" style={{ margin: '10px', padding: '10px', backgroundColor: '#F44336', color: 'white', textDecoration: 'none' }}>
                    Hard
                  </Link>
                </div>
              </div>
            } />
            <Route path="/game/:difficulty" element={<Game />} />
            <Route path="/rules" element={
              <div style={{ padding: '20px' }}>
                <h2>This game is very hard, if you don't like it, cloes it.</h2>
                <ul>
                  <li>Click on squares</li>
                  <li>The numbers shows how many mines are next to the square</li>
                  <li>Avoid clicking on mines!</li>
                  <li>Find all safe squares to win</li>
                </ul>
              </div>
            } />
          </Routes>
        </div>
      </GameProvider>
    </Router>
  );
}

export default App;