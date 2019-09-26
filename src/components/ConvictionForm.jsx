import React from 'react';
import { Button, Table, Input, Label } from 'semantic-ui-react';

import Conviction from './Conviction';

const Headers = [
  {
    text: 'Case No.',
    // width: '2'
  },
  {
    text: 'Conviction Name',
    // width: '4'
  },
  {
    text: 'Classification',
    // width: '3'
  },
  {
    text: 'Last Relevant Date',
    // width: '3'
  },
  {
    text: 'Domestic Violence',
    // width: '3'
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
      <div className="client-name">
        <Label>Client Name</Label>
        <Input placeholder='' name='id' value="" onChange="onChange" />
      </div>
      <Table>
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