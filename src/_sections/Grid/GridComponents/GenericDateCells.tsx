import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { DateTimePicker, DateTimePickerChangeEvent } from '@progress/kendo-react-dateinputs';
// Selectors
import { selectGridDataItemIsLoading } from '../GridSelectors';
// Types
import { GenericInputProps } from './GridComponentsTypes';
import { AgendaDataItem } from '../../../Agenda/AgendaTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';

export const GenericDateInput: FC<GenericInputProps<Date, AgendaDataItem | CustomersDataItem>> = ({ dataItem, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);

  const onDateChange = ({ syntheticEvent, target: { value } }: DateTimePickerChangeEvent) =>
    onChange && onChange({ dataItem, field, syntheticEvent, value: value?.toISOString() });

  return <DateTimePicker value={value} onChange={onDateChange} disabled={isDataItemLoading} />;
};
