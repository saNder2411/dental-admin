import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useInternationalization } from '@progress/kendo-react-intl';
// Components
import { CustomersSvcStaffDropDownList, CustomersGenderDropDownList } from './CustomersDropDownCells';
import { CustomersTextInput, CustomersMobilePhoneInput, CustomersAvatarInput } from './CustomersInputCells';
import { CustomersDateInput } from './CustomersDateCells';
// Styled Components
import * as SC from '../GridItemsStyled/GridCellsStyled';
// Types
import { GridCellProps } from './GridItemsTypes';
import { CustomerDataItem } from '../../../_bus/_Customers/CustomersTypes';
import { EntitiesKeys } from '../../../_bus/Entities/EntitiesTypes';
// Selectors
import {
  selectStaffLastNamesByID,
  selectProcessDataItemFieldValue,
  selectStaffMembersByLastAppointments,
  selectUpcomingAppointments,
} from '../../../_bus/Entities/EntitiesSelectors';
// Hooks
import { useOriginalDataItemValuesForCells } from './GridItemsHooks';
// Helpers
import { isString, isNumber } from './GridItemsHelpers';
// Images
import MalePhotoPlaceholder from '../../../_assets/customers/male_placeholder.jpg';
import FemalePhotoPlaceholder from '../../../_assets/customers/female_placeholder.jpg';

export const CustomersTextCell: FC<GridCellProps<CustomerDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<CustomerDataItem, string | number>(ID, EntitiesKeys.Customers, field);

  const strValue = isString(cellValue) ? cellValue : '';
  const numValue = isNumber(cellValue) ? cellValue : '';
  const resultValue = strValue ? strValue : numValue;

  return <td>{dataItemInEditValue ? <CustomersTextInput dataItemID={ID} field={field} onChange={onChange} /> : resultValue}</td>;
};

export const CustomersSvcStaffCell: FC<GridCellProps<CustomerDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<CustomerDataItem, { results: number[] }>(
    ID,
    EntitiesKeys.Customers,
    field
  );

  const selectStaffLastNames = useMemo(() => selectStaffLastNamesByID(cellValue.results), [cellValue]);
  const staffLastName = useSelector(selectStaffLastNames);

  return <td>{dataItemInEditValue ? <CustomersSvcStaffDropDownList dataItemID={ID} field={field} onChange={onChange} /> : staffLastName}</td>;
};

export const CustomersLastAppointmentsCell: FC<GridCellProps<CustomerDataItem>> = ({ dataItem: { ID }, field }): JSX.Element => {
  const { cellValue } = useOriginalDataItemValuesForCells<CustomerDataItem, { results: number[] }>(ID, EntitiesKeys.Customers, field);

  const selectStaffLastNames = useMemo(() => selectStaffMembersByLastAppointments(cellValue.results), [cellValue.results]);
  const staffLastNames = useSelector(selectStaffLastNames);

  return <td>{staffLastNames}</td>;
};

export const CustomersUpcomingCell: FC<GridCellProps<CustomerDataItem>> = ({ dataItem: { ID }, field }): JSX.Element => {
  const intlService = useInternationalization();
  const { cellValue } = useOriginalDataItemValuesForCells<CustomerDataItem, { results: number[] }>(ID, EntitiesKeys.Customers, field);
  const selectUpcoming = useMemo(() => selectUpcomingAppointments(cellValue.results), [cellValue.results]);
  const upcomingAppointments = useSelector(selectUpcoming);

  return <td>{upcomingAppointments.map((date) => intlService.formatDate(date, 'H:mm - dd/MM')).join(' | ')}</td>;
};

export const CustomersMobilePhoneCell: FC<GridCellProps<CustomerDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<CustomerDataItem, string>(ID, EntitiesKeys.Customers, field);
  const strValue = isString(cellValue) ? cellValue : '';

  return <td>{dataItemInEditValue ? <CustomersMobilePhoneInput dataItemID={ID} field={field} onChange={onChange} /> : strValue}</td>;
};

export const CustomersAvatarCell: FC<GridCellProps<CustomerDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<CustomerDataItem, string>(ID, EntitiesKeys.Customers, field);
  const Gender = useSelector(selectProcessDataItemFieldValue<CustomerDataItem, string>(ID, EntitiesKeys.Customers, 'Gender'));
  const strValue = isString(cellValue) ? cellValue : '';
  const placeholderImageUrl = Gender === '(2) Male' ? MalePhotoPlaceholder : FemalePhotoPlaceholder;
  const imageUrl =
    strValue.includes('png') || strValue.includes('jpg') || strValue.includes('jpeg') || strValue.includes('images') ? strValue : placeholderImageUrl;

  return dataItemInEditValue ? (
    <td>
      <CustomersAvatarInput dataItemID={ID} field={field} onChange={onChange} />
    </td>
  ) : (
    <SC.PhotoCell imageUrl={imageUrl}>
      <div className="Grid__avatar" />
    </SC.PhotoCell>
  );
};

export const CustomersDateCell: FC<GridCellProps<CustomerDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<CustomerDataItem, string>(ID, EntitiesKeys.Customers, field);
  const intlService = useInternationalization();
  const value = cellValue ? new Date(cellValue) : new Date();

  return (
    <td>
      {dataItemInEditValue ? <CustomersDateInput dataItemID={ID} field={field} onChange={onChange} /> : intlService.formatDate(value, 'H:mm | dd.MM')}
    </td>
  );
};

export const CustomersDateCellNoEditable: FC<GridCellProps<CustomerDataItem>> = ({ dataItem: { ID }, field }): JSX.Element => {
  const { cellValue } = useOriginalDataItemValuesForCells<CustomerDataItem, string>(ID, EntitiesKeys.Customers, field);
  const intlService = useInternationalization();
  const value = new Date(cellValue as string);

  return <td>{intlService.formatDate(value, 'H:mm | dd.MM')}</td>;
};

export const CustomersGenderCell: FC<GridCellProps<CustomerDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<CustomerDataItem, string>(ID, EntitiesKeys.Customers, field);
  const value = cellValue ? cellValue : '(1) Female';

  return <td>{dataItemInEditValue ? <CustomersGenderDropDownList dataItemID={ID} field={field} onChange={onChange} /> : value}</td>;
};
