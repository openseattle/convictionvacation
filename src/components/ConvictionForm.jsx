import React from 'react';
import { Button, Table, Input, Label, TextArea } from 'semantic-ui-react';

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
    text: 'Classifications',
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
        <Input placeholder='' name='id' /*value="" onChange="onChange"*/ />
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
      <div className="add-more-button-container">
        <Button secondary onClick={addConvictions}>Add More</Button>
      </div>
      <div className="text-area-and-submit-button-container">
        <TextArea></TextArea>
        <Button primary onClick={handleSubmit}>Submit</Button>
      </div>
    </React.Fragment>
  );
};

export default ConvictionForm;