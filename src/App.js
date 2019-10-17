import React from 'react';

import ConvictionCalculator from './components/ConvictionCalculator';

import './App.css';

function App() {
  return (
    <div>
      <header className="App-header">
        <p>
          King County Conviction Vacation
        </p>
      </header>
      <ConvictionCalculator />
    </div>
  );
}

export default App;
