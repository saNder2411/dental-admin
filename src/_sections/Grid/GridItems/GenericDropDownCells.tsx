import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DropDownList, MultiSelect, MultiSelectChangeEvent } from '@progress/kendo-react-dropdowns';
// Types
import { EditCellProps } from './GridItemsTypes';
import { AppointmentDataItem } from '../../../Agenda/AgendaTypes';
import { CustomerDataItem } from '../../../Customers/CustomersTypes';
import { StaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
import { ServiceDataItem } from '../../../Services/ServicesTypes';
// Selectors
import { selectDataItemIsLoading, selectProcessDataItemFieldValue, selectMemoRoleSkills } from '../GridSelectors';
// Helpers
import { onGridDropDownChange } from './GridItemsHelpers';

export const GenericGenderDropDownList: FC<EditCellProps<AppointmentDataItem | CustomerDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<AppointmentDataItem | CustomerDataItem, string>(dataItemID, field));
  const dataForDropDownList = [
    { text: '(1) Female', value: '(1) Female' },
    { text: '(2) Male', value: '(2) Male' },
  ];
  const dropDownListValue = dataForDropDownList.find((item) => item.value === value);

  const onGenderChange = onGridDropDownChange<AppointmentDataItem | CustomerDataItem>(dataItemID, field, onChange);

  return (
    <DropDownList onChange={onGenderChange} value={dropDownListValue} data={dataForDropDownList} textField="text" disabled={isDataItemLoading} />
  );
};

export const GenericBooleanFlagDropDownList: FC<EditCellProps<ServiceDataItem | StaffDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<ServiceDataItem | StaffDataItem, boolean>(dataItemID, field));

  const dataForDropDownList = [
    { text: 'yes', value: true },
    { text: 'no', value: false },
  ];
  const dropDownListValue = dataForDropDownList.find((item) => item.value === value);

  const onBooleanFlagChange = onGridDropDownChange<ServiceDataItem | StaffDataItem>(dataItemID, field, onChange);

  return (
    <DropDownList onChange={onBooleanFlagChange} value={dropDownListValue} data={dataForDropDownList} textField="text" disabled={isDataItemLoading} />
  );
};

export const GenericRoleSkillsMultiSelect: FC<EditCellProps<StaffDataItem | ServiceDataItem>> = ({ dataItemID, field, onChange }): JSX.Element => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<StaffDataItem | ServiceDataItem, string[] | null>(dataItemID, field));
  const selectRoleSkills = useMemo(selectMemoRoleSkills, []);
  const roleSkills = useSelector(selectRoleSkills);
  const multiSelectData = roleSkills.map((value) => ({ text: value, value }));

  const multiSelectValue = value ? value.map((value) => ({ text: value, value })) : [];

  const onValueChange = (evt: MultiSelectChangeEvent) => {
    onChange({ dataItem: dataItemID, field, syntheticEvent: evt.syntheticEvent, value: evt.target.value.map(({ value }) => value) });
  };

  return <MultiSelect onChange={onValueChange} value={multiSelectValue} data={multiSelectData} textField="text" disabled={isDataItemLoading} />;
};
