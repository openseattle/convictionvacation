import React from 'react';
import { Button, Grid, List, Table } from 'semantic-ui-react';

const Headers = [
  {
    text: 'Case No.',
    width: '3'
  },
  {
    text: 'Eligible Convictions',
    width: '3'
  },
  {
    text: 'Eligibility',
    width: '3'
  },
  {
    text: 'Reasons',
    width: '7'
  }
];

const ConvictionResults = ({
  calculatorInput,
  calculatorOutput,
  clientName,
  handleBack,
  handleReset
}) => {
  const convictions = calculatorOutput.convictions.map(({ id, vacatable, reasons }, i) => {
    const messages = vacatable ?
      reasons.vacatableReasons :
      vacatable === null ? reasons.errors : reasons.notVacatableReasons;
    return (
      {
        id: id,
        crime: calculatorInput.convictions[i].crime,
        vacatable: vacatable,
        reasons: messages
      }
    );
  });

  return (
    <React.Fragment>
      <h2>{`Report for ${clientName}`}</h2>
      <Table striped stackable>
        <Table.Header>
          <Table.Row>
            {Headers.map(headerMetaData =>
              <Table.HeaderCell key={headerMetaData.text} width={headerMetaData.width}>
                {headerMetaData.text}
              </Table.HeaderCell>)}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {convictions.map(({ id, crime, vacatable, reasons }) =>
            <Table.Row key={id}>
              <Table.Cell>
                <b className='results-table-header'>{`${Headers[0].text}: `}</b>
                {id}
              </Table.Cell>
              <Table.Cell>
                <b className='results-table-header'>{`${Headers[1].text.slice(0, -1)}: `}</b>
                {crime}
              </Table.Cell>
              <Table.Cell>
                <b className='results-table-header'>{`${Headers[2].text}: `}</b>
                <b style={{ color: vacatable ? 'green' : 'red' }}>
                  {vacatable ? 'Yes' : 'No'}
                </b>
              </Table.Cell>
              <Table.Cell>
                <b className='results-table-header'>{`${Headers[3].text}: `}</b>
                <List bulleted>
                  {reasons.map(reason => <List.Item key={reason}>{reason}</List.Item>)}
                </List>
              </Table.Cell>
            </Table.Row>)}
        </Table.Body>
      </Table>

      <Grid padded stackable columns={2}>
        <Grid.Row>
          <Grid.Column width={2}>
            <Button fluid secondary onClick={handleBack}>Back</Button>
          </Grid.Column>
          <Grid.Column width={2}>
            <Button fluid primary onClick={handleReset}>Reset</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
};

export default ConvictionResults;