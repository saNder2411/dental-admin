import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
// Components
import { CustomersSvcStaffDropDownList, CustomersLastAppointmentsMultiSelect } from './CustomersDropDownCells';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';
// Selectors
import { selectTeamStaffMemoData } from '../../../TeamStaff/TeamStaffSelectors';

export const CustomersSvcStaffCell: FC<GridCellProps<CustomersDataItem>> = (props): JSX.Element => {
  const { dataItem, field } = props;
  const value = dataItem[field];

  return <td>{dataItem.inEdit ? <CustomersSvcStaffDropDownList {...props} /> : value}</td>;
};

export const CustomersLastAppointmentsCell: FC<GridCellProps<CustomersDataItem>> = (props): JSX.Element => {
  const { dataItem } = props;
  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);
  const teamStaffData = useSelector(selectTeamStaffData);

  const currentAppointment = teamStaffData.filter(({ Id }) => dataItem.LookupMultiHR01team.results.find((item) => item.Id === Id));
  const value = currentAppointment.map(({ Title }) => Title).join(' | ');

  return (
    <td>{dataItem.inEdit ? <CustomersLastAppointmentsMultiSelect {...props} value={currentAppointment} domainData={teamStaffData} /> : value}</td>
  );
};
