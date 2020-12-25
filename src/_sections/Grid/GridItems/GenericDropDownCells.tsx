import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DropDownList, MultiSelect, MultiSelectChangeEvent } from '@progress/kendo-react-dropdowns';
// Types
import { EditCellDropDownListProps } from './GridItemsTypes';
import { AppointmentDataItem } from '../../../Agenda/AgendaTypes';
import { CustomerDataItem } from '../../../Customers/CustomersTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
import { ServiceDataItem } from '../../../Services/ServicesTypes';
// Selectors
import { selectGridDataItemIsLoading } from '../GridSelectors';
import { selectServicesMemoRoleSkills } from '../../../Services/ServicesSelectors';
// Helpers
import { onGridDropDownChange } from './GridItemsHelpers';

export const GenericGenderDropDownList: FC<EditCellDropDownListProps<AppointmentDataItem | CustomerDataItem, string>> = ({
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

  const onGenderChange = onGridDropDownChange<AppointmentDataItem | CustomerDataItem>(dataItemID, field, onChange);

  return (
    <DropDownList onChange={onGenderChange} value={dropDownListValue} data={dataForDropDownList} textField={field} disabled={isDataItemLoading} />
  );
};

export const GenericBooleanFlagDropDownList: FC<EditCellDropDownListProps<ServiceDataItem | TeamStaffDataItem, boolean>> = ({
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

  const onBooleanFlagChange = onGridDropDownChange<ServiceDataItem | TeamStaffDataItem>(dataItemID, field, onChange);

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

export const GenericRoleSkillsMultiSelect: FC<EditCellDropDownListProps<TeamStaffDataItem | ServiceDataItem, string[] | null>> = ({
  dataItemID,
  field,
  onChange,
  value,
}): JSX.Element => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  const selectServicesRoleSkills = useMemo(selectServicesMemoRoleSkills, []);
  const roleSkills = useSelector(selectServicesRoleSkills);
  const multiSelectData = roleSkills.map((value) => ({ text: value, value }));

  const multiSelectValue = value ? value.map((value) => ({ text: value, value })) : [];

  const onValueChange = (evt: MultiSelectChangeEvent) => {
    onChange({ dataItem: dataItemID, field, syntheticEvent: evt.syntheticEvent, value: evt.target.value.map(({ value }) => value) });
  };

  return <MultiSelect onChange={onValueChange} value={multiSelectValue} data={multiSelectData} textField="text" disabled={isDataItemLoading} />;
};
