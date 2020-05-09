import React from 'react';

import ConvictionCalculator from './components/ConvictionCalculator';

import './App.css';

import ReactGA from 'react-ga';

function App() {
  React.useEffect(() => {
    if(process.env.NODE_ENV === 'production' && process.env.REACT_APP_TRACKING_ID){
      ReactGA.initialize(process.env.REACT_APP_TRACKING_ID);
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
    else{
      console.warn("Google Analytics is not running")
    }
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
