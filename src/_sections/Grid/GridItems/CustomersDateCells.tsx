import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { DateTimePicker, DateTimePickerChangeEvent } from '@progress/kendo-react-dateinputs';
// Selectors
import { selectProcessDataItemFieldValue } from '../../../_bus/Selectors';
import { selectDataItemIsLoading } from '../../../_bus/UI/UISelectors';
// Types
import { EditCellProps } from './GridItemsTypes';
import { CustomerDataItem } from '../../../_bus/_Customers/CustomersTypes';
import { EntitiesMap } from '../../../_bus/Types';

export const CustomersDateInput: FC<EditCellProps<CustomerDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<CustomerDataItem, string>(dataItemID, EntitiesMap.Customers, field));

  const onDateChange = ({ syntheticEvent, target: { value } }: DateTimePickerChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value: value?.toISOString() });

  return <DateTimePicker value={new Date(value)} onChange={onDateChange} disabled={isDataItemLoading} />;
};
