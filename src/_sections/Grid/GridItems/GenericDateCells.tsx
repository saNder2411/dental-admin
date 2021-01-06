import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { DateTimePicker, DateTimePickerChangeEvent } from '@progress/kendo-react-dateinputs';
// Selectors
import { selectDataItemIsLoading, selectProcessDataItemFieldValue } from '../GridSelectors';
// Types
import { EditCellProps } from './GridItemsTypes';
import { AppointmentDataItem } from '../../../Agenda/AgendaTypes';
import { CustomerDataItem } from '../../../Customers/CustomersTypes';

export const GenericDateInput: FC<EditCellProps<AppointmentDataItem | CustomerDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<AppointmentDataItem | CustomerDataItem, string>(dataItemID, field));

  const onDateChange = ({ syntheticEvent, target: { value } }: DateTimePickerChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value: value?.toISOString() });

  return <DateTimePicker value={new Date(value)} onChange={onDateChange} disabled={isDataItemLoading} />;
};
