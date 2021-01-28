import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MultiSelect, MultiSelectChangeEvent, DropDownList } from '@progress/kendo-react-dropdowns';
// Types
import { EditCellProps } from './GridItemsTypes';
import { ServiceDataItem } from '../../../_bus/_Services/ServicesTypes';
import { EntitiesKeys } from '../../../_bus/Entities/EntitiesTypes';
// Selectors
import { selectProcessDataItemFieldValue, selectServicesCategory, selectSkillsForDropDownListData } from '../../../_bus/Entities/EntitiesSelectors';
import { selectDataItemIsLoading } from '../../../_bus/UI/UISelectors';
// Helpers
import { onGridDropDownChange } from './GridItemsHelpers';

export const ServicesCategoryMultiSelect: FC<EditCellProps<ServiceDataItem>> = ({ dataItemID, field, onChange }): JSX.Element => {
  const value = useSelector(selectProcessDataItemFieldValue<ServiceDataItem, string>(dataItemID, EntitiesKeys.Services, field));
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

export const ServicesBooleanFlagDropDownList: FC<EditCellProps<ServiceDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<ServiceDataItem, boolean>(dataItemID, EntitiesKeys.Services, field));

  const dataForDropDownList = [
    { text: 'yes', value: true },
    { text: 'no', value: false },
  ];
  const dropDownListValue = dataForDropDownList.find((item) => item.value === value);

  const onBooleanFlagChange = onGridDropDownChange<ServiceDataItem>(dataItemID, field, onChange);

  return (
    <DropDownList onChange={onBooleanFlagChange} value={dropDownListValue} data={dataForDropDownList} textField="text" disabled={isDataItemLoading} />
  );
};

export const ServicesSkillsMultiSelect: FC<EditCellProps<ServiceDataItem>> = ({ dataItemID, field, onChange }): JSX.Element => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<ServiceDataItem, { results: number[] }>(dataItemID, EntitiesKeys.Services, field));
  const selectDropDownListData = useMemo(selectSkillsForDropDownListData, []);
  const dataForDropdownList = useSelector(selectDropDownListData);
  const memoMultiSelectData = useMemo(() => dataForDropdownList, [dataForDropdownList]);
  const multiSelectValue = memoMultiSelectData.filter((item) => value.results.find((ID) => ID === item.value));

  const onValueChange = (evt: MultiSelectChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent: evt.syntheticEvent, value: { results: evt.target.value.map(({ value }) => value) } });

  return <MultiSelect onChange={onValueChange} value={multiSelectValue} data={memoMultiSelectData} textField="text" disabled={isDataItemLoading} />;
};
