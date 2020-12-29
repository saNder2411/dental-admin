import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MultiSelect, MultiSelectChangeEvent } from '@progress/kendo-react-dropdowns';
// Types
import { EditCellDropDownListProps } from './GridItemsTypes';
import { ServiceDataItem } from '../../../Services/ServicesTypes';
// Selectors
import { selectGridDataItemIsLoading } from '../GridSelectors';
import { selectServicesMemoCategories } from '../../../Services/ServicesSelectors';

export const ServicesCategoryMultiSelect: FC<EditCellDropDownListProps<ServiceDataItem, string>> = ({
  dataItemID,
  field,
  onChange,
  value,
}): JSX.Element => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  const selectServicesCategories = useMemo(selectServicesMemoCategories, []);
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
