import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { DropDownList } from '@progress/kendo-react-dropdowns';
// Components
import { CellDecoratorWithDataItemLoadingState } from './CellDecoratorWithDataItemLoadingState';
import { Loader } from '../../../_components';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';
// Helpers
import { onGridDropDownChange } from './GridComponentsHelpers';
// Hooks
import { useTeamStaffStateForDomain } from '../../../TeamStaff/TeamStaffHooks';
import { useFetchDataForDomain } from '../GridHooks';

export const CellDecoratorWithFetchingData: FC<GridCellProps<CustomersDataItem>> = ({
  dataItem,
  field,
  onChange,
}): JSX.Element => {
  const { teamStaffData, teamStaffIsDataLoading, TeamStaffActions } = useTeamStaffStateForDomain();
  const dispatch = useDispatch();
  useFetchDataForDomain(teamStaffData.length, TeamStaffActions, dispatch);

  const staffNameList = teamStaffData.map(({ FullName }) => FullName.split(' ').slice(-1)[0]);
  const dataForDropdownList = staffNameList.map((lastName) => ({ [field]: lastName, value: lastName }));
  const value = dataItem[field] as string;
  const dropDownListValue = dataForDropdownList.find((item) => item.value === value);
  const onSvcStaffChange = onGridDropDownChange<CustomersDataItem>(dataItem, field, onChange);

  return (
    <CellDecoratorWithDataItemLoadingState>
      {teamStaffIsDataLoading ? (
        <Loader className="d-flex justify-content-center align-items-center" isLoading={teamStaffIsDataLoading} themeColor="tertiary" size="small" />
      ) : (
        <DropDownList onChange={onSvcStaffChange} value={dropDownListValue} data={dataForDropdownList} textField={field} />
      )}
    </CellDecoratorWithDataItemLoadingState>
  );
};
