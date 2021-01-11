import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@progress/kendo-react-inputs';
// Selectors
import { selectDataItemIsLoading, selectProcessDataItemFieldValue } from '../GridSelectors';
// Types
import { InputChangeEvent, EditCellProps } from './GridItemsTypes';
import { ServiceDataItem } from '../../../_bus/Services/ServicesTypes';

export const ServicesIconInput: FC<EditCellProps<ServiceDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<ServiceDataItem, string>(dataItemID, field));

  const onIconChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <Input value={value} onChange={onIconChange} disabled={isDataItemLoading} />;
};
