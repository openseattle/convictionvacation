import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import ConvictionCalculator from './components/ConvictionCalculator';
import FillableForm from './components/FormPage';

import './App.css';


import ReactGA from 'react-ga';
import FilledForms from './components/FilledForms';
const trackingId = "UA-156075348-1";

const BetaWarning = () => {
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
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize(trackingId);
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  })
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/fillable-form">
            <FilledForms />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// refactor: move to components
function Home() {
  return (
    <div>
      <BetaWarning/>
      <header className="App-header">
        <p>
          King County Conviction Vacation
        </p>
      </header>
      <ConvictionCalculator />
      <footer>
        <ul>
          <li><Link to="/fillable-form">FillableForm</Link></li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
