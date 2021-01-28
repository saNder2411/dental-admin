import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@progress/kendo-react-inputs';
// Selectors
import { selectProcessDataItemFieldValue } from '../../../_bus/Entities/EntitiesSelectors';
import { selectDataItemIsLoading } from '../../../_bus/UI/UISelectors';
// Types
import { InputChangeEvent, EditCellProps } from './GridItemsTypes';
import { ServiceDataItem } from '../../../_bus/_Services/ServicesTypes';
import { EntitiesKeys } from '../../../_bus/Entities/EntitiesTypes';

export const ServicesIconInput: FC<EditCellProps<ServiceDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<ServiceDataItem, string>(dataItemID, EntitiesKeys.Services, field));

  const onIconChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) => onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <Input value={value ?? ''} onChange={onIconChange} disabled={isDataItemLoading} />;
};

export const ServicesReferenceInput: FC<EditCellProps<ServiceDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<ServiceDataItem, string>(dataItemID, EntitiesKeys.Services, field));

  const onReferenceChange = ({ syntheticEvent, target: { value } }: InputChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value });

  return <Input value={value} onChange={onReferenceChange} disabled={isDataItemLoading} />;
};
