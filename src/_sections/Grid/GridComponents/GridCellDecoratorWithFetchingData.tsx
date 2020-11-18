import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { DropDownList } from '@progress/kendo-react-dropdowns';
// Components
import { GridCellDecoratorWithDataItemLoadingState } from './GridCellDecoratorWithDataItemLoadingState';
import { Loader } from '../../../_components';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { AgendaDataItem } from '../../../Agenda/AgendaTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';
// Helpers
import { onGridDropDownChange } from './GridComponentsHelpers';
// Hooks
import { useTeamStaffStateForDomain } from '../../../TeamStaff/TeamStaffHooks';
import { useFetchDataForDomain } from '../GridHooks';

export const GridCellDecoratorWithFetchingData: FC<GridCellProps<AgendaDataItem | CustomersDataItem>> = ({
  dataItem,
  field,
  onChange,
}): JSX.Element => {
  const { teamStaffData, teamStaffIsDataLoading, TeamStaffActions } = useTeamStaffStateForDomain();
  const dispatch = useDispatch();
  useFetchDataForDomain(teamStaffData.length, TeamStaffActions, dispatch);

  const staffNameList = teamStaffData.map(({ FullName }) => FullName.split(' ').slice(-1)[0]);
  const dataForDropdownList = staffNameList.map((lastName) => ({ [field]: lastName, value: lastName }));
  const value = dataItem[field] as any;
  const dropDownListValue = dataForDropdownList.find((item) => item.value === value);
  const onSvcStaffChange = onGridDropDownChange<AgendaDataItem | CustomersDataItem>(dataItem, field, onChange);

  return (
    <GridCellDecoratorWithDataItemLoadingState>
      {teamStaffIsDataLoading ? (
        <Loader className="d-flex justify-content-center align-items-center" isLoading={teamStaffIsDataLoading} themeColor="tertiary" size="small" />
      ) : (
        <DropDownList onChange={onSvcStaffChange} value={dropDownListValue} data={dataForDropdownList} textField={field} />
      )}
    </GridCellDecoratorWithDataItemLoadingState>
  );
};
