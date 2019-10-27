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
    key: CrimeClassification.MARIJUANA_MISDEMEANOR,
    value: CrimeClassification.MARIJUANA_MISDEMEANOR,
    text: 'Marijuana Misdemeanor'
  },
  {
    key: CrimeClassification['GROSS MISDEMEANOR'],
    value: CrimeClassification['GROSS MISDEMEANOR'],
    text: 'Gross Misdemeanor'
  },
  {
    key: 'UNCLASSIFIED',
    value: 'unclear',
    text: 'Unclear'
  }
];

const Conviction = ({
  index,
  conviction,
  handleChange,
  handleDelete
}) => {
  const [showLabel, setShowLabel] = React.useState(window.matchMedia('(max-width:767px)').matches);

  const onChange = (e, { value }) => {
    handleChange(index, e.currentTarget.name, value);
  };

  const onSelect = (e, { value }) => {
    handleChange(index, 'classification', value);
  };

  const onChecked = (e, { checked }) => {
    handleChange(index, 'isDomesticViolence', checked);
  };

  const onDuiChecked = (e, { checked }) => {
    handleChange(index, 'isDuiRelated', checked);
  };

  const onDelete = () => {
    handleDelete(index);
  };

  const checkboxLabel = showLabel  ? 'Domestic Violence' : '';
  const checkboxDuiLabel = showLabel  ? 'DUI Related' : '';

  const dateLabel = showLabel ? 'Last Relevant Date (Leave blank if none)'  : '';
  React.useEffect(() => {
    const onResize = () => {
      setShowLabel(window.matchMedia('(max-width:767px)').matches);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <Table.Row>
      <Table.Cell>
        <Input fluid placeholder='Case No.' name='id' value={conviction.id} onChange={onChange} />
      </Table.Cell>
      <Table.Cell>
        <Input fluid placeholder='Conviction name' name='name' value={conviction.name} onChange={onChange} />
      </Table.Cell>
      <Table.Cell>
        <Select
          fluid
          placeholder='Conviction classification'
          value={conviction.classification}
          onChange={onSelect}
          options={convictionClassificationOptions} />
      </Table.Cell>
      <Table.Cell>
        <label>
          {dateLabel}
          <Input fluid type='date' name='date' value={conviction.date} onChange={onChange} />
        </label>
      </Table.Cell>
      <Table.Cell>
        <Checkbox label={checkboxLabel} checked={conviction.isDomesticViolence} onChange={onChecked} />
      </Table.Cell>
      <Table.Cell>
        <Checkbox label={checkboxDuiLabel} checked={conviction.isDuiRelated} onChange={onDuiChecked} />
      </Table.Cell>
      <Table.Cell>
        <Button fluid icon onClick={onDelete}>
          <Icon name='close' />
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default Conviction;
