import React from 'react';
import { Button, Checkbox, Icon, Input, Select, Table } from 'semantic-ui-react';

import CrimeClassification from '../logic/type/CrimesClassifications';

const convictionClassificationOptions = [
  {
    key: CrimeClassification.FELONY_CLASS_B,
    value: CrimeClassification.FELONY_CLASS_B,
    text: 'Felony B'
  },
  {
    key: CrimeClassification.FELONY_CLASS_C,
    value: CrimeClassification.FELONY_CLASS_C,
    text: 'Felony C'
  },
  {
    key: CrimeClassification.MISDEMEANOR,
    value: CrimeClassification.MISDEMEANOR,
    text: 'Misdemeanor'
  },
  {
    key: CrimeClassification['GROSS MISDEMEANOR'],
    value: CrimeClassification['GROSS MISDEMEANOR'],
    text: 'Gross Misdemeanor'
  },
  {
    key: 'UNCLASSIFIED',
    value: 'unknown',
    text: 'Unknown'
  }
];

const Conviction = ({
  index,
  id,
  name,
  classification,
  isDomesticViolence,
  date,
  handleChange,
  handleDelete
}) => {
  const onChange = (e, { value }) => {
    handleChange(index, e.currentTarget.name, value);
  };

  const onSelect = (e, { value }) => {
    handleChange(index, 'classification', value);
  };

  const onChecked = (e, { checked }) => {
    handleChange(index, 'isDomesticViolence', checked);
  };

  const onDelete = () => {
    handleDelete(index);
  };

  return (
    <Table.Row>
      <Table.Cell>
        <Input placeholder='Conviction ID' name='id' value={id} onChange={onChange} />
      </Table.Cell>
      <Table.Cell>
        <Input placeholder='Conviction name' name='name' value={name} onChange={onChange} />
      </Table.Cell>
      <Table.Cell>
        <Select
          placeholder='Conviction classification'
          value={classification}
          onChange={onSelect}
          options={convictionClassificationOptions} />
      </Table.Cell>
      <Table.Cell>
        <Checkbox checked={isDomesticViolence} onChange={onChecked} />
      </Table.Cell>
      <Table.Cell>
        <Input type='date' name='date' value={date} onChange={onChange} />
      </Table.Cell>
      <Table.Cell>
        <Button icon onClick={onDelete}>
          <Icon name='close' />
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default Conviction;