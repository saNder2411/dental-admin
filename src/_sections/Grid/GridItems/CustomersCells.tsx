import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
// Components
import { CustomersSvcStaffDropDownList, CustomersLastAppointmentsMultiSelect } from './CustomersDropDownCells';
import { CustomersMobilePhoneInput } from './CustomersInputCells';
// Types
import { GridCellProps } from './GridItemsTypes';
import { CustomerDataItem } from '../../../Customers/CustomersTypes';
// Selectors
import { selectStaffLastNameByID, selectStaffLastNamesByID } from '../GridSelectors';
// Hooks
import { useOriginalDataItemValuesForCells } from './GridItemsHooks';
// Helpers
import { isString } from './GridItemsHelpers';

export const CustomersSvcStaffCell: FC<GridCellProps<CustomerDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<CustomerDataItem, number>(ID, field);

  const selectStaffLastName = useMemo(() => selectStaffLastNameByID(cellValue), [cellValue]);
  const staffLastName = useSelector(selectStaffLastName);

  const value = staffLastName ? staffLastName : '';

  return <td>{dataItemInEditValue ? <CustomersSvcStaffDropDownList dataItemID={memoID} field={memoField} onChange={onChange} /> : value}</td>;
};

export const CustomersLastAppointmentsCell: FC<GridCellProps<CustomerDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<CustomerDataItem, { results: number[] }>(ID, field);

  const selectStaffLastNames = useMemo(() => selectStaffLastNamesByID(cellValue.results), [cellValue.results]);
  const staffLastNames = useSelector(selectStaffLastNames);

  return (
    <td>
      {dataItemInEditValue ? <CustomersLastAppointmentsMultiSelect dataItemID={memoID} field={memoField} onChange={onChange} /> : staffLastNames}
    </td>
  );
};

export const CustomersMobilePhoneCell: FC<GridCellProps<CustomerDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<CustomerDataItem, string>(ID, field);
  const strValue = isString(cellValue) ? cellValue : '';

  return <td>{dataItemInEditValue ? <CustomersMobilePhoneInput dataItemID={memoID} field={memoField} onChange={onChange} /> : strValue}</td>;
};
