import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Components
import { AgendaSvcStaffDropDownList, AgendaStatusDropDownList, AgendaFullNameDropDownList, AgendaServicesMultiSelect } from './AgendaDropDownCells';
// Styled Components
import * as SC from '../GridStyledComponents/GridCellsStyled';
// Instruments
import { IconMap } from '../../../_instruments';
// Types
import { GridCellProps } from './GridComponentsTypes';
import { AgendaDataItem, StatusNames, LookupEntity } from '../../../Agenda/AgendaTypes';
// Selectors
import { selectGridMemoDataItem, selectGridDataItemMemoValueForCell } from '../GridSelectors';
import { selectServicesMemoData } from '../../../Services/ServicesSelectors';
import { selectTeamStaffMemoData } from '../../../TeamStaff/TeamStaffSelectors';
import { selectCustomersMemoData } from '../../../Customers/CustomersSelectors';
// Hooks
import { useMemoDataItemValuesForCells } from './GridComponentsHooks';

export const AgendaStatusIcon: FC<GridCellProps<AgendaDataItem>> = ({ dataItem: { ID }, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const selectDataItemValue = useMemo(() => selectGridDataItemMemoValueForCell<AgendaDataItem>(memoID, memoField), [memoField, memoID]);
  const cellValue = useSelector(selectDataItemValue);

  const iconName = cellValue ? cellValue : StatusNames.Consultation;

  return (
    <SC.StatusIcon>
      <FontAwesomeIcon className="grid__icon" icon={IconMap[iconName as StatusNames].icon} style={IconMap[iconName as StatusNames].style} />
    </SC.StatusIcon>
  );
};

export const AgendaStatusCell: FC<GridCellProps<AgendaDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells<AgendaDataItem>(ID, field);
  // const memoID = useMemo(() => ID, [ID]);
  // const memoField = useMemo(() => field, [field]);

  // const selectCellValue = useMemo(() => selectGridDataItemMemoValueForCell<AgendaDataItem>(memoID, memoField), [memoField, memoID]);
  // const selectDataItemInEditValue = useMemo(() => selectGridDataItemMemoValueForCell<AgendaDataItem>(memoID, `inEdit`), [memoID]);

  // const cellValue = useSelector(selectCellValue);
  // const dataItemInEditValue = useSelector(selectDataItemInEditValue);

  return (
    <td>
      {dataItemInEditValue ? (
        <AgendaStatusDropDownList dataItemID={memoID} field={memoField} onChange={onChange} value={cellValue as StatusNames} />
      ) : (
        cellValue
      )}
    </td>
  );
};

export const AgendaSvcStaffCell: FC<GridCellProps<AgendaDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);

  const selectCellValue = useMemo(() => selectGridDataItemMemoValueForCell<AgendaDataItem>(memoID, memoField), [memoField, memoID]);
  const selectDataItemInEditValue = useMemo(() => selectGridDataItemMemoValueForCell<AgendaDataItem>(memoID, `inEdit`), [memoID]);

  const cellValue = useSelector(selectCellValue) as LookupEntity;
  const dataItemInEditValue = useSelector(selectDataItemInEditValue) as boolean;

  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);
  const teamStaffData = useSelector(selectTeamStaffData);

  const currentEmployee = teamStaffData.find(({ Id }) => Id === cellValue.Id);
  const value = currentEmployee ? currentEmployee.FullName.split(' ').slice(-1)[0] : '';

  return (
    <td>
      {dataItemInEditValue ? (
        <AgendaSvcStaffDropDownList dataItemID={memoID} field={memoField} onChange={onChange} domainData={teamStaffData} value={value} />
      ) : (
        value
      )}
    </td>
  );
};

export const AgendaServicesCell: FC<GridCellProps<AgendaDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);

  const selectCellValue = useMemo(() => selectGridDataItemMemoValueForCell<AgendaDataItem>(memoID, memoField), [memoField, memoID]);
  const selectDataItemInEditValue = useMemo(() => selectGridDataItemMemoValueForCell<AgendaDataItem>(memoID, `inEdit`), [memoID]);

  const cellValue = useSelector(selectCellValue) as { results: LookupEntity[] };
  const dataItemInEditValue = useSelector(selectDataItemInEditValue) as boolean;

  const selectServicesData = useMemo(selectServicesMemoData, []);
  const servicesData = useSelector(selectServicesData);
  const currentServices = servicesData.filter(({ Id }) => cellValue.results.find((item) => item.Id === Id));
  const value = currentServices.map(({ OfferingsName_Edit }) => OfferingsName_Edit).join(' | ');

  return (
    <td>
      {dataItemInEditValue ? (
        <AgendaServicesMultiSelect dataItemID={memoID} field={memoField} onChange={onChange} value={currentServices} domainData={servicesData} />
      ) : (
        value
      )}
    </td>
  );
};

export const AgendaFullNameCell: FC<GridCellProps<AgendaDataItem>> = (props): JSX.Element => {
  const selectDataItem = useMemo(() => selectGridMemoDataItem<AgendaDataItem>(props.dataItem.ID), [props.dataItem.ID]);
  const dataItem = useSelector(selectDataItem);

  const selectCustomersData = useMemo(selectCustomersMemoData, []);
  const customersData = useSelector(selectCustomersData);
  const currentCustomer = customersData.find(({ Id }) => Id === dataItem.LookupCM102customers.Id);
  const value = currentCustomer ? currentCustomer.FullName : '';

  return <td>{dataItem.inEdit ? <AgendaFullNameDropDownList {...props} domainData={customersData} value={value} /> : value}</td>;
};
