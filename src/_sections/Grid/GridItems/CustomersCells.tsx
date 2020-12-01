import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
// Components
import { CustomersSvcStaffDropDownList, CustomersLastAppointmentsMultiSelect } from './CustomersDropDownCells';
// Types
import { GridCellProps } from './GridItemsTypes';
import { CustomersDataItem } from '../../../Customers/CustomersTypes';
import { LookupEntity } from '../../../Agenda/AgendaTypes';
// Selectors
import { selectTeamStaffMemoData } from '../../../TeamStaff/TeamStaffSelectors';
// Hooks
import { useMemoDataItemValuesForCells } from './GridItemsHooks';

export const CustomersSvcStaffCell: FC<GridCellProps<CustomersDataItem>> = (props): JSX.Element => {
  const { dataItem, field } = props;
  const value = dataItem[field];

  return <td>{dataItem.inEdit ? <CustomersSvcStaffDropDownList {...props} /> : value}</td>;
};

export const CustomersLastAppointmentsCell: FC<GridCellProps<CustomersDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells<CustomersDataItem>(ID, field);
  const LookupMultiHR01team = cellValue as { results: LookupEntity[] };
  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);
  const teamStaffData = useSelector(selectTeamStaffData);

  const currentAppointment = teamStaffData.filter(({ Id }) => LookupMultiHR01team.results.find((item) => item.Id === Id));
  const value = currentAppointment.map(({ Title }) => Title).join(' | ');

  return (
    <td>
      {dataItemInEditValue ? (
        <CustomersLastAppointmentsMultiSelect
          dataItemID={memoID}
          field={memoField}
          onChange={onChange}
          value={currentAppointment}
          domainData={teamStaffData}
        />
      ) : (
        value
      )}
    </td>
  );
};
