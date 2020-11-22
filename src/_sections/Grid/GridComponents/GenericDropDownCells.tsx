import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { DropDownList } from '@progress/kendo-react-dropdowns';
// Types
import { GenericDropDownListProps } from './GridComponentsTypes';
import { AgendaDataItem } from '../../../Agenda/AgendaTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';
// Selectors
import { selectGridDataItemIsLoading } from '../GridSelectors';
// Helpers
import { onGridDropDownChange } from './GridComponentsHelpers';

export const GenericGenderDropDownList: FC<GenericDropDownListProps<string, AgendaDataItem | CustomersDataItem>> = ({
  dataItem,
  field,
  onChange,
  value,
}) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  const dataForDropDownList = [
    { [field]: '(1) Female', value: '(1) Female' },
    { [field]: '(2) Male', value: '(2) Male' },
  ];
  const dropDownListValue = dataForDropDownList.find((item) => item.value === value);

  const onGenderChange = onGridDropDownChange<AgendaDataItem | CustomersDataItem>(dataItem, field, onChange);

  return (
    <DropDownList onChange={onGenderChange} value={dropDownListValue} data={dataForDropDownList} textField={field} disabled={isDataItemLoading} />
  );
};
