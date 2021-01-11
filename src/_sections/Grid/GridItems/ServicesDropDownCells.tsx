import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MultiSelect, MultiSelectChangeEvent, DropDownList } from '@progress/kendo-react-dropdowns';
// Types
import { EditCellProps } from './GridItemsTypes';
import { ServiceDataItem } from '../../../_bus/Services/ServicesTypes';
import { EntitiesMap } from '../GridTypes';
// Selectors
import { selectProcessDataItemFieldValue, selectDataItemIsLoading, selectServicesCategory, selectMemoRoleSkills } from '../GridSelectors';
// Helpers
import { onGridDropDownChange } from './GridItemsHelpers';

export const ServicesCategoryMultiSelect: FC<EditCellProps<ServiceDataItem>> = ({ dataItemID, field, onChange }): JSX.Element => {
  const value = useSelector(selectProcessDataItemFieldValue<ServiceDataItem, string>(dataItemID, EntitiesMap.Services, field));
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
  const value = useSelector(selectProcessDataItemFieldValue<ServiceDataItem, boolean>(dataItemID, EntitiesMap.Services, field));

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

export const ServicesRoleSkillsMultiSelect: FC<EditCellProps<ServiceDataItem>> = ({ dataItemID, field, onChange }): JSX.Element => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<ServiceDataItem, string[] | null>(dataItemID, EntitiesMap.Services, field));
  const selectRoleSkills = useMemo(selectMemoRoleSkills, []);
  const roleSkills = useSelector(selectRoleSkills);
  const multiSelectData = roleSkills.map((value) => ({ text: value, value }));

  const multiSelectValue = value ? value.map((value) => ({ text: value, value })) : [];

  const onValueChange = (evt: MultiSelectChangeEvent) => {
    onChange({ dataItem: dataItemID, field, syntheticEvent: evt.syntheticEvent, value: evt.target.value.map(({ value }) => value) });
  };

  return <MultiSelect onChange={onValueChange} value={multiSelectValue} data={multiSelectData} textField="text" disabled={isDataItemLoading} />;
};
