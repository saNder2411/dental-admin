import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@progress/kendo-react-inputs';
// Selectors
import { selectGridDataItemIsLoading } from '../GridSelectors';
// Types
import { InputChangeEvent, EditCellProps } from './GridItemsTypes';
import { ServicesDataItem } from '../../../Services/ServicesTypes';

export const ServicesIconInput: FC<EditCellProps<ServicesDataItem, string>> = ({ dataItemID, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);

  const onIconChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <Input value={value} onChange={onIconChange} disabled={isDataItemLoading} />;
};
