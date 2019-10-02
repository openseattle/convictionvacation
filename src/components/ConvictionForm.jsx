import React from 'react';
import { Button, Grid, Input, Table } from 'semantic-ui-react';

import Conviction from './Conviction';

const Headers = [
  {
    text: 'Case No.',
    // width: '3'
  },
  {
    text: 'Eligible Convictions',
    // width: '4'
  },
  {
    text: 'Classifications',
    // width: '4'
  },
  {
    text: 'Last Relevant Date',
    subtext: '(Leave blank if none)',
    // width: '3'
  },
  {
    text: 'Domestic Violence',
    // width: '1'
  },
  {
    text: null,
    // width: '1'
  }
];

const ConvictionForm = ({
  addConvictions,
  convictions,
  handleChange,
  handleDelete,
  clientName,
  setClientName
}) => {
  const [convictionNum, setConvictionNum] = React.useState(1);

  const onConvictionNumChange = (e, { value }) => {
    setConvictionNum(value);
  };

  const onClientNameChange = (e, { value }) => {
    setClientName(value);
  };

  const handleAddConvictions = () => {
    addConvictions(parseInt(convictionNum));
  };

  return (
    <React.Fragment>
      <Input label='Client Name: ' /*placeholder='Client Name'*/ size='large' value={clientName} onChange={onClientNameChange} />
      <Table /*striped*/ stackable>
        <Table.Header>
          <Table.Row>
            {Headers.map(headerMetaData =>
              <Table.HeaderCell key={headerMetaData.text} width={headerMetaData.width}>
                <div>{headerMetaData.text}</div>
                {headerMetaData.subtext && <div className="subtext">{headerMetaData.subtext}</div>}
              </Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {convictions.map((conviction, i) =>
            <Conviction
              key={i}
              index={i}
              conviction={conviction}
              handleChange={handleChange}
              handleDelete={handleDelete}
            />)}
        </Table.Body>
      </Table>

      <Grid padded stackable columns={1}>
        <Grid.Row>
          <Grid.Column width={4}>
            <Input
              fluid
              min='1'
              max='100'
              type='number'
              placeholder='Number of convictions'
              value={convictionNum}
              onChange={onConvictionNumChange}
              label={<Button secondary onClick={handleAddConvictions}>Add More Convictions</Button>}
              labelPosition='right' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
};

export default ConvictionForm;