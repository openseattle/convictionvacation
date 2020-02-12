import React from 'react';

import ConvictionCalculator from './components/ConvictionCalculator';

import './App.css';


import ReactGA from 'react-ga';
const trackingId = "UA-156075348-1";

const BetaWarning = () => {
    console.log('REACT_APP_ENV', process.env.REACT_APP_ENV)
    if (process.env.REACT_APP_ENV === 'beta') {
        return (<div className="App-beta-warning">
            <p>
                You're in beta mode
            </p>
        </div>)
    }
    return null
}

function App() {
  React.useEffect(() => {
    if(process.env.NODE_ENV === 'production'){
      ReactGA.initialize(trackingId);
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  })
  return (
    <div>
      <BetaWarning/>
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
