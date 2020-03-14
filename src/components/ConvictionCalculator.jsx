import React from 'react';
import ReactGA from 'react-ga';
import moment from 'moment';
import { Button, Form, Grid, TextArea } from 'semantic-ui-react';

import ConvictionForm from './ConvictionForm';
import ConvictionResults from './ConvictionResults';

import FilledForms from './FilledForms';

import EligibilityTimelineCalculator from '../logic/EligibilityTimelineCalculator';
import { CalculatorInput, ConvictionInput } from '../logic/type/CalculatorInput';

const ConvictionCalculator = () => {
  const calculator = new EligibilityTimelineCalculator();
  const [hasResults, setHasResults] = React.useState(false);
  const [showForms, setShowForms] = React.useState(false);
  const calculatorInputRef = React.useRef();
  const calculatorOutputRef = React.useRef();
  const [convictions, setConvictions] = React.useState([]);
  const [clientName, setClientName] = React.useState('');
  const [clientDOB, setClientDOB] = React.useState('');
  const [notes, setNotes] = React.useState('');

  const addConvictions = (num) => {
    const newConvictions = Array.apply(null, Array(num)).map(() => (
      { id: '', name: '', classification: '', isDomesticViolence: false, date: '' }));
    setConvictions(convictions => convictions.concat(newConvictions));
  };

  React.useEffect(() => {
    addConvictions(5);
  }, []);

  const handleSubmit = () => {
    ReactGA.event({
      category: "ConvictionsForm",
      action: ("user clicked the submit button"),
    });
    const filledInConvictions = convictions.filter(conviction => {
      return (
        conviction.id && conviction.name && conviction.classification && conviction.date
      );
    });
    const convictionInputs = filledInConvictions.map(conviction => new ConvictionInput(conviction.id,
      conviction.name,
      conviction.classification === 'unclear' ? null : conviction.classification,
      conviction.isDomesticViolence,
      conviction.isDuiRelated,
      moment(conviction.date, 'YYYY-MM-DD').toISOString()));
    const calculationDate = moment().toISOString();
    const clientDOBString = moment(clientDOB, 'YYYY-MM-DD').toISOString();
    const calculatorInput = new CalculatorInput(calculationDate, clientDOBString, convictionInputs);
    calculatorInputRef.current = calculatorInput;
    const calculatorOutput = calculator.calculate(calculatorInput);
    calculatorOutputRef.current = calculatorOutput;
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
    ReactGA.event({
      category: "ConvictionsCalculator",
      action: ("user clicked the back button on the Convictions Calculator page"),
    });
    calculatorOutputRef.current = null;
    setHasResults(false);
    setShowForms(false);
  };

  const handleBackFromShowForms = () => {
    setHasResults(true);
    setShowForms(false);
  };

  const handleReset = () => {
    ReactGA.event({
      category: "ConvictionsCalculator",
      action: ("user clicked the reset button"),
    });
    
    calculatorInputRef.current = null;
    calculatorOutputRef.current = null;
    setConvictions([]);
    addConvictions(5);
    setClientName('');
    setNotes('');
    setHasResults(false);
    setShowForms(false);
  };

  const handlePrint = () => {
    ReactGA.event({
      category: "ConvictionsCalculator",
      action: ("user clicked the print button"),
    });
    window.print();
  };

  const handleShowForms = () => {
    ReactGA.event({
      category: "ShowForms",
      action: ("user clicked the show forms button"),
    });
    setShowForms(true);
    // window.print();
  };

  const onTextAreaChange = (e, { value }) => {
    ReactGA.event({
      category: "ConvictionsCalculator",
      action: ("user has changed the Notes forms"),
    });
    setNotes(value);
  };

  return (
    <React.Fragment>
      {showForms ?
        <FilledForms 
          clientName={clientName}
          calculatorOutput={calculatorOutputRef.current}
        /> :
        hasResults ?
          <ConvictionResults
            calculatorInput={calculatorInputRef.current}
            calculatorOutput={calculatorOutputRef.current}
            clientName={clientName}
            clientDOB={clientDOB}
            handleBack={handleBack}
            handleReset={handleReset}
          /> :
          <ConvictionForm
            addConvictions={addConvictions}
            convictions={convictions}
            handleChange={handleChange}
            handleDelete={handleDelete}
            clientName={clientName}
            setClientName={setClientName}
            clientDOB={clientDOB}
            setClientDOB={setClientDOB}
          />
      }

      <Grid padded stackable columns={2}>
        <Grid.Row>
          <Grid.Column width={13}>
            {showForms ? 
              '' :
              <Form>
                <Form.Field><b>Notes:</b></Form.Field>
                <TextArea
                  onChange={onTextAreaChange}
                  placeholder='Notes and comments...'
                  rows={10}
                  value={notes} />
              </Form>
            }
          </Grid.Column>
          <Grid.Column verticalAlign='middle' width={2}>
            {hasResults && <Button fluid primary onClick={handlePrint}>Print</Button>}
            {hasResults && !showForms && <span><br /><Button fluid primary onClick={handleShowForms}>Show Forms</Button></span>}
            {!hasResults && !showForms && <Button fluid primary onClick={handleSubmit}>Submit</Button>}
            {showForms && <span><br /><Button fluid primary onClick={handleBackFromShowForms}>Back</Button></span>}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <div id='notes-print-area'>
        <h5>Notes:</h5>
        {notes}
      </div>
    </React.Fragment>
  );
};

export default ConvictionCalculator;
