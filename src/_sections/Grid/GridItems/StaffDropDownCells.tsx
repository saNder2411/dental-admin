import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DropDownList, MultiSelect, MultiSelectChangeEvent } from '@progress/kendo-react-dropdowns';
// Types
import { EditCellProps } from './GridItemsTypes';
import { StaffDataItem } from '../../../_bus/_Staff/StaffTypes';
import { EntitiesKeys } from '../../../_bus/Entities/EntitiesTypes';
// Selectors
import { selectProcessDataItemFieldValue, selectSkillsForDropDownListData } from '../../../_bus/Entities/EntitiesSelectors';
import { selectDataItemIsLoading } from '../../../_bus/UI/UISelectors';
// Helpers
import { onGridDropDownChange } from './GridItemsHelpers';

export const StaffBooleanFlagDropDownList: FC<EditCellProps<StaffDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<StaffDataItem, boolean>(dataItemID, EntitiesKeys.Staff, field));

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

export const StaffSkillsMultiSelect: FC<EditCellProps<StaffDataItem>> = ({ dataItemID, field, onChange }): JSX.Element => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<StaffDataItem, { results: number[] }>(dataItemID, EntitiesKeys.Staff, field));
  const selectDropDownListData = useMemo(selectSkillsForDropDownListData, []);
  const dataForDropdownList = useSelector(selectDropDownListData);
  const memoMultiSelectData = useMemo(() => dataForDropdownList, [dataForDropdownList]);
  const multiSelectValue = memoMultiSelectData.filter((item) => value.results.find((ID) => ID === item.value));

  const onValueChange = (evt: MultiSelectChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent: evt.syntheticEvent, value: { results: evt.target.value.map(({ value }) => value) } });

  return <MultiSelect onChange={onValueChange} value={multiSelectValue} data={memoMultiSelectData} textField="text" disabled={isDataItemLoading} />;
};
