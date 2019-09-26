import React from 'react';
import { Button, Table } from 'semantic-ui-react';

import Conviction from './Conviction';

const Headers = [
  {
    text: 'ID',
    width: '3'
  },
  {
    text: 'Conviction Name',
    width: '4'
  },
  {
    text: 'Classification',
    width: '3'
  },
  {
    text: 'Is Domestic Violence Related?',
    width: '3'
  },
  {
    text: 'Date',
    width: '3'
  }
];

const ConvictionForm = ({
  convictions,
  handleChange,
  handleDelete,
  handleSubmit,
  addConvictions
}) => {
  return (
    <React.Fragment>
      <Table striped>
        <Table.Header>
          <Table.Row>
            {Headers.map(headerMetaData =>
              <Table.HeaderCell key={headerMetaData.text} width={headerMetaData.width}>
                {headerMetaData.text}
              </Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {convictions.map((conviction, i) =>
            <Conviction
              key={i}
              index={i}
              id={conviction.id}
              name={conviction.name}
              classification={conviction.classification}
              isDomesticViolence={conviction.isDomesticViolence}
              date={conviction.date}
              handleChange={handleChange}
              handleDelete={handleDelete}
            />)}
        </Table.Body>
      </Table>
      <Button secondary onClick={addConvictions}>Add Five Convictions</Button>
      <Button primary onClick={handleSubmit}>Submit</Button>
    </React.Fragment>
  );
};

export default ConvictionForm;