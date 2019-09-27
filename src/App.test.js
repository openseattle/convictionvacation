import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

import { shallow } from 'enzyme'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('First React component test with Enzyme', () => {
  it('renders without crashing', () => {
     shallow(<App />);
   });
});