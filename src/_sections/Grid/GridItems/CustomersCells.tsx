import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
// Components
import { CustomersSvcStaffDropDownList, CustomersLastAppointmentsMultiSelect } from './CustomersDropDownCells';
import { CustomersMobilePhoneInput } from './CustomersInputCells';
// Types
import { GridCellProps } from './GridItemsTypes';
import { CustomerDataItem } from '../../../Customers/CustomersTypes';
// Selectors
import { selectTeamStaffMemoData } from '../../../TeamStaff/TeamStaffSelectors';
// Hooks
import { useMemoDataItemValuesForCells } from './GridItemsHooks';
// Helpers
import { isString } from './GridItemsHelpers';

export const CustomersSvcStaffCell: FC<GridCellProps<CustomerDataItem>> = (props): JSX.Element => {
  const { dataItem, field } = props;
  const value = dataItem[field] as string | null | undefined;

  return <td>{dataItem.inEdit ? <CustomersSvcStaffDropDownList {...props} /> : value}</td>;
};

export const CustomersLastAppointmentsCell: FC<GridCellProps<CustomerDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells<CustomerDataItem>(ID, field);
  const LookupMultiHR01teamId = cellValue as { results: number[] };
  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);
  const teamStaffData = useSelector(selectTeamStaffData);

  const currentAppointment = teamStaffData.filter(({ Id }) => LookupMultiHR01teamId.results.find((item) => item === Id));
  const value = currentAppointment.map(({ Title }) => Title ?? '').join(' | ');

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

export const CustomersMobilePhoneCell: FC<GridCellProps<CustomerDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells(ID, field);
  const strValue = isString(cellValue) ? cellValue : '';

  return (
    <td>
      {dataItemInEditValue ? <CustomersMobilePhoneInput dataItemID={memoID} field={memoField} onChange={onChange} value={strValue} /> : strValue}
    </td>
  );
};
