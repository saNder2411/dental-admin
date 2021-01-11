import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DropDownList, MultiSelect, MultiSelectChangeEvent } from '@progress/kendo-react-dropdowns';
// Types
import { EditCellProps } from './GridItemsTypes';
import { StaffDataItem } from '../../../_bus/Staff/StaffTypes';
import { EntitiesMap } from '../GridTypes';
// Selectors
import { selectDataItemIsLoading, selectProcessDataItemFieldValue, selectMemoRoleSkills } from '../GridSelectors';
// Helpers
import { onGridDropDownChange } from './GridItemsHelpers';

export const StaffBooleanFlagDropDownList: FC<EditCellProps<StaffDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<StaffDataItem, boolean>(dataItemID, EntitiesMap.Staff, field));

  const dataForDropDownList = [
    { text: 'yes', value: true },
    { text: 'no', value: false },
  ];
  const dropDownListValue = dataForDropDownList.find((item) => item.value === value);

  const onBooleanFlagChange = onGridDropDownChange<StaffDataItem>(dataItemID, field, onChange);

  return (
    <DropDownList onChange={onBooleanFlagChange} value={dropDownListValue} data={dataForDropDownList} textField="text" disabled={isDataItemLoading} />
  );
};

export const StaffRoleSkillsMultiSelect: FC<EditCellProps<StaffDataItem>> = ({ dataItemID, field, onChange }): JSX.Element => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<StaffDataItem, string[] | null>(dataItemID, EntitiesMap.Staff, field));
  const selectRoleSkills = useMemo(selectMemoRoleSkills, []);
  const roleSkills = useSelector(selectRoleSkills);
  const multiSelectData = roleSkills.map((value) => ({ text: value, value }));

  const multiSelectValue = value ? value.map((value) => ({ text: value, value })) : [];

  const onValueChange = (evt: MultiSelectChangeEvent) => {
    onChange({ dataItem: dataItemID, field, syntheticEvent: evt.syntheticEvent, value: evt.target.value.map(({ value }) => value) });
  };

  return <MultiSelect onChange={onValueChange} value={multiSelectValue} data={multiSelectData} textField="text" disabled={isDataItemLoading} />;
};
