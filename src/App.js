import React from 'react';
import ReactGA from 'react-ga';


import ConvictionCalculator from './components/ConvictionCalculator';

import './App.css';
const trackingId = "UA-156075348-1";

function App() {
  React.useEffect(() => {
    ReactGA.initialize(trackingId);
  })
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
