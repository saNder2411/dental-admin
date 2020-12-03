import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DropDownList, MultiSelect, MultiSelectChangeEvent } from '@progress/kendo-react-dropdowns';
// Types
import { EditCellDropDownListProps } from './GridItemsTypes';
import { AgendaDataItem } from '../../../Agenda/AgendaTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
import { ServicesDataItem } from '../../../Services/ServicesTypes';
// Selectors
import { selectGridDataItemIsLoading } from '../GridSelectors';
import { selectServicesMemoRoleSkills } from '../../../Services/ServicesSelectors';
// Helpers
import { onGridDropDownChange } from './GridItemsHelpers';

export const GenericGenderDropDownList: FC<EditCellDropDownListProps<AgendaDataItem | CustomersDataItem, string>> = ({
  dataItemID,
  field,
  onChange,
  value,
}) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  const dataForDropDownList = [
    { [field]: '(1) Female', value: '(1) Female' },
    { [field]: '(2) Male', value: '(2) Male' },
  ];
  const dropDownListValue = dataForDropDownList.find((item) => item.value === value);

  const onGenderChange = onGridDropDownChange<AgendaDataItem | CustomersDataItem>(dataItemID, field, onChange);

  return (
    <DropDownList onChange={onGenderChange} value={dropDownListValue} data={dataForDropDownList} textField={field} disabled={isDataItemLoading} />
  );
};

export const GenericBooleanFlagDropDownList: FC<EditCellDropDownListProps<ServicesDataItem | TeamStaffDataItem, boolean>> = ({
  dataItemID,
  field,
  onChange,
  value,
}) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);

  const dataForDropDownList = [
    { [field]: 'yes', value: true },
    { [field]: 'no', value: false },
  ];
  const dropDownListValue = dataForDropDownList.find((item) => item.value === value);

  const onBooleanFlagChange = onGridDropDownChange<ServicesDataItem | TeamStaffDataItem>(dataItemID, field, onChange);

  return (
    <DropDownList
      onChange={onBooleanFlagChange}
      value={dropDownListValue}
      data={dataForDropDownList}
      textField={field}
      disabled={isDataItemLoading}
    />
  );
};

export const GenericRoleSkillsMultiSelect: FC<EditCellDropDownListProps<TeamStaffDataItem | ServicesDataItem, string[]>> = ({
  dataItemID,
  field,
  onChange,
  value,
}): JSX.Element => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  const selectServicesRoleSkills = useMemo(selectServicesMemoRoleSkills, []);
  const roleSkills = useSelector(selectServicesRoleSkills);
  const multiSelectData = roleSkills.map((value) => ({ text: value, value }));

  const dropDownListValue = value.map((value) => ({ text: value, value }));

  const onServicesChange = (evt: MultiSelectChangeEvent) => {
    onChange({ dataItem: dataItemID, field, syntheticEvent: evt.syntheticEvent, value: evt.target.value.map(({ value }) => value) });
  };

  return <MultiSelect onChange={onServicesChange} value={dropDownListValue} data={multiSelectData} textField="text" disabled={isDataItemLoading} />;
};