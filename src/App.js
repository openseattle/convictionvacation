import React from 'react';
import ReactGA from 'react-ga';


import ConvictionCalculator from './components/ConvictionCalculator';

import './App.css';
const trackingId = "UA-156075348-1";


React.useEffect(() => {
  ReactGA.initialize(trackingId);
})

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
