import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DropDownList, MultiSelect, MultiSelectChangeEvent } from '@progress/kendo-react-dropdowns';
// Types
import { GridCellProps, CustomersDropDownListProps } from './GridComponentsTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
// Selectors
import { selectGridDataItemIsLoading } from '../GridSelectors';
import { selectTeamStaffMemoData } from '../../../TeamStaff/TeamStaffSelectors';
// Helpers
import { onGridDropDownChange, transformTeamStaffDataToMultiSelectData } from './GridComponentsHelpers';

export const CustomersSvcStaffDropDownList: FC<GridCellProps<CustomersDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);
  const teamStaffData = useSelector(selectTeamStaffData);

  const staffNameList = teamStaffData.map(({ FullName }) => FullName.split(' ').slice(-1)[0]);
  const dataForDropdownList = staffNameList.map((lastName) => ({ [field]: lastName, value: lastName }));
  const value = dataItem[field] as string;
  const dropDownListValue = dataForDropdownList.find((item) => item.value === value);
  const onSvcStaffChange = onGridDropDownChange<CustomersDataItem>(dataItem, field, onChange);

  return (
    <DropDownList onChange={onSvcStaffChange} value={dropDownListValue} data={dataForDropdownList} textField={field} disabled={isDataItemLoading} />
  );
};

export const CustomersLastAppointmentsMultiSelect: FC<CustomersDropDownListProps<TeamStaffDataItem[], TeamStaffDataItem>> = ({
  dataItem,
  field,
  onChange,
  value,
  domainData,
}): JSX.Element => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  const multiSelectData = domainData ? transformTeamStaffDataToMultiSelectData(domainData) : [];
  const dropDownListValue = transformTeamStaffDataToMultiSelectData(value);

  const onAppointmentChange = (evt: MultiSelectChangeEvent) => {
    onChange({
      dataItem,
      field,
      syntheticEvent: evt.syntheticEvent,
      value: { results: evt.target.value.map(({ value }) => value) },
    });
  };
  return (
    <MultiSelect onChange={onAppointmentChange} value={dropDownListValue} data={multiSelectData} textField="text" disabled={isDataItemLoading} />
  );
};
