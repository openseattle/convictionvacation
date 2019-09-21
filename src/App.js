import React from 'react';
import EligibilityTimelineCalculator from './logic/EligibilityTimelineCalculator'
import mockInput from './logic/mockdata/Input';

import './App.css';

function App() {

  let calculator = new EligibilityTimelineCalculator();
  let output = calculator.calculate(mockInput);

  console.log(output);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          King County Conviction Vacation (Coming Soon)
        </p>
      </header>
    </div>
  );
}

export default App;
