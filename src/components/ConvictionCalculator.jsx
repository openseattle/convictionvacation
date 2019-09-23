import React from 'react';
import moment from 'moment';

import ConvictionForm from './ConvictionForm';
import ConvictionResults from './ConvictionResults';

import EligibilityTimelineCalculator from '../logic/EligibilityTimelineCalculator';
import { CalculatorInput, ConvictionInput } from '../logic/type/CalculatorInput';

//import mockOutput from '../logic/mockdata/Output';

const ConvictionCalculator = () => {
  const calculator = new EligibilityTimelineCalculator();
  const [hasResults, setHasResults] = React.useState(false);
  const results = React.useRef();
  const [convictions, setConvictions] = React.useState([]);

  const addConvictions = () => {
    const newConvictions = Array.apply(null, Array(5)).map(() => (
      { id: '', name: '', classification: '', isDomesticViolence: false, date: '' }));
    setConvictions(convictions => convictions.concat(newConvictions));
  };

  const handleSubmit = () => {
    const filledInConvictions = convictions.filter(conviction => {
      return (
        conviction.id && conviction.name && conviction.classification && conviction.date
      );
    });
    const convictionInputs = filledInConvictions.map(conviction => new ConvictionInput(conviction.id,
      conviction.name,
      conviction.classification,
      conviction.isDomesticViolence,
      moment(conviction.date, 'YYYY-MM-DD').toISOString()));
    const calculationDate = moment().toISOString();
    const calculatorInput = new CalculatorInput(calculationDate, convictionInputs);
    const calculatorOutput = calculator.calculate(calculatorInput);
    //console.log('filled in', filledInConvictions);
    //console.log('calc in', calculatorInput);
    //console.log('calc out', calculatorOutput);
    results.current = calculatorOutput;
    //results.current = mockOutput;
    setHasResults(true);
  };

  const handleChange = (index, key, value) => {
    setConvictions(convictions => {
      const newConvs = [...convictions];
      newConvs[index][key] = value;
      return newConvs;
    });
  };

  const handleDelete = (index) => {
    setConvictions(convictions => {
      const newConvs = [...convictions];
      newConvs.splice(index, 1);
      return newConvs;
    });
  };

  const handleBack = () => {
    results.current = [];
    setHasResults(false);
  };

  const handleReset = () => {
    results.current = [];
    setConvictions([]);
    setHasResults(false);
  };

  return (
    <React.Fragment>
      {hasResults ? 
        <ConvictionResults results={results.current}
          handleBack={handleBack}
          handleReset={handleReset} /> :
        <ConvictionForm
          convictions={convictions}
          handleChange={handleChange}
          handleDelete={handleDelete}
          handleSubmit={handleSubmit}
          addConvictions={addConvictions} />}
    </React.Fragment>
  );
};

export default ConvictionCalculator;