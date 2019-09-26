import React from 'react';
import { Button, List, Table } from 'semantic-ui-react';

const Headers = [
  {
    text: 'Convictions',
    width: '3'
  },
  {
    text: 'Eligible',
    width: '3'
  },
  {
    text: 'Reasons',
    width: '10'
  }
];

const ConvictionResults = ({
  results,
  handleBack,
  handleReset
}) => {
  const convictions = results.convictions.map(({ id, vacatable, reasons }) => {
    const messages = vacatable ?
      reasons.vacatableReasons :
      vacatable === null ? reasons.errors : reasons.notVacatableReasons;
    return (
      {
        id: id,
        vacatable: vacatable ? 'Yes' : 'No',
        reasons: messages
      }
    );
  });
  return (
    <React.Fragment>
      <Table striped>
        <Table.Header>
          <Table.Row>
            {Headers.map(headerMetaData =>
              <Table.HeaderCell key={headerMetaData.text} width={headerMetaData.width}>
                {headerMetaData.text}
              </Table.HeaderCell>)}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {convictions.map(({ id, vacatable, reasons }) =>
            <Table.Row key={id}>
              <Table.Cell>
                {id}
              </Table.Cell>
              <Table.Cell>
                {vacatable}
              </Table.Cell>
              <Table.Cell>
                <List bulleted>
                  {reasons.map(reason => <List.Item key={reason}>{reason}</List.Item>)}
                </List>
              </Table.Cell>
            </Table.Row>)}
        </Table.Body>
      </Table>
      <Button secondary onClick={handleBack}>Back</Button>
      <Button primary onClick={handleReset}>Reset</Button>
    </React.Fragment>
  );
};

export default ConvictionResults;