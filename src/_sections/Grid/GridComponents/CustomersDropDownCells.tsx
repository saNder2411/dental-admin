import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DropDownList, MultiSelect, MultiSelectChangeEvent } from '@progress/kendo-react-dropdowns';
// Components
import { Loader } from '../../../_components';
// Types
import { GridCellProps, CustomersDropDownListProps } from './GridComponentsTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';
import { TeamStaffDataItem } from '../../../TeamStaff/TeamStaffTypes';
// Selectors
import { selectGridDataItemIsLoading } from '../GridSelectors';
// Helpers
import { onGridDropDownChange, transformTeamStaffDataToMultiSelectData } from './GridComponentsHelpers';
// Hooks
import { useTeamStaffStateForDomain } from '../../../TeamStaff/TeamStaffHooks';
import { useFetchDataForDomain } from '../GridHooks';

export const CustomersSvcStaffDropDownList: FC<GridCellProps<CustomersDataItem>> = ({ dataItem, field, onChange }): JSX.Element => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  const { teamStaffData, teamStaffIsDataLoading, TeamStaffActions } = useTeamStaffStateForDomain();
  const dispatch = useDispatch();
  useFetchDataForDomain(teamStaffData.length, TeamStaffActions, dispatch);

  const staffNameList = teamStaffData.map(({ FullName }) => FullName.split(' ').slice(-1)[0]);
  const dataForDropdownList = staffNameList.map((lastName) => ({ [field]: lastName, value: lastName }));
  const value = dataItem[field] as string;
  const dropDownListValue = dataForDropdownList.find((item) => item.value === value);
  const onSvcStaffChange = onGridDropDownChange<CustomersDataItem>(dataItem, field, onChange);

  return (
    <>
      {teamStaffIsDataLoading ? (
        <Loader className="d-flex justify-content-center align-items-center" isLoading={teamStaffIsDataLoading} themeColor="tertiary" size="small" />
      ) : (
        <DropDownList
          onChange={onSvcStaffChange}
          value={dropDownListValue}
          data={dataForDropdownList}
          textField={field}
          disabled={isDataItemLoading}
        />
      )}
    </>
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
