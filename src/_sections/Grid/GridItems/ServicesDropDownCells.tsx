import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MultiSelect, MultiSelectChangeEvent } from '@progress/kendo-react-dropdowns';
// Types
import { EditCellProps } from './GridItemsTypes';
import { ServiceDataItem } from '../../../Services/ServicesTypes';
// Selectors
import { selectProcessDataItemFieldValue, selectDataItemIsLoading, selectServicesCategory } from '../GridSelectors';

export const ServicesCategoryMultiSelect: FC<EditCellProps<ServiceDataItem>> = ({ dataItemID, field, onChange }): JSX.Element => {
  const value = useSelector(selectProcessDataItemFieldValue<ServiceDataItem, string>(dataItemID, field));
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const selectServicesCategories = useMemo(selectServicesCategory, []);
  const categories = useSelector(selectServicesCategories);
  const multiSelectData = Array.from(new Set(categories)).map((value) => ({ text: value, value }));

  const multiSelectValue = value ? value.split(' | ').map((value) => ({ text: value, value })) : [];

  const onValueChange = (evt: MultiSelectChangeEvent) =>
    onChange({
      dataItem: dataItemID,
      field,
      syntheticEvent: evt.syntheticEvent,
      value: evt.target.value.map(({ value }) => value ?? '').join(' | '),
    });

  return <MultiSelect onChange={onValueChange} value={multiSelectValue} data={multiSelectData} textField="text" disabled={isDataItemLoading} />;
};
