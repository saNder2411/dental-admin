import React, { FC, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useInternationalization } from '@progress/kendo-react-intl';
import { Popup } from '@progress/kendo-react-popup';
// Components
import { AgendaSvcStaffDropDownList, AgendaStatusDropDownList, AgendaFullNameDropDownList, AgendaServicesMultiSelect } from './AgendaDropDownCells';
import { AgendaStartDateInput, AgendaEndDateInput } from './AgendaDateCells';
// Styled Components
import * as SC from '../GridItemsStyled/GridCellsStyled';
// Instruments
import { IconMap } from '../../../_instruments';
// Types
import { GridCellProps } from './GridItemsTypes';
import { AppointmentDataItem, StatusNames } from '../../../Agenda/AgendaTypes';
// Selectors
import { selectGridDataItemMemoValueForCell } from '../GridSelectors';
import { selectServicesMemoData } from '../../../Services/ServicesSelectors';
import { selectTeamStaffMemoData } from '../../../TeamStaff/TeamStaffSelectors';
import { selectCustomersMemoData } from '../../../Customers/CustomersSelectors';
// Hooks
import { useMemoDataItemValuesForCells } from './GridItemsHooks';
// Helpers
import { isString } from './GridItemsHelpers';

export const AgendaReferenceCell: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID }, field }): JSX.Element => {
  const { cellValue } = useMemoDataItemValuesForCells<AppointmentDataItem>(ID, field);
  const anchorRef = useRef<HTMLTableDataCellElement | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const strValue = isString(cellValue) ? cellValue : '';

  return (
    <SC.ReferenceCell ref={anchorRef} id="td-p" onClick={() => setShowPopup((prevState) => !prevState)}>
      {strValue}
      <Popup
        show={showPopup}
        anchor={anchorRef.current as HTMLTableDataCellElement}
        style={{ width: anchorRef.current?.offsetWidth }}
        popupClass="popup-content">
        <p>Details reference</p>
        {strValue}
      </Popup>
    </SC.ReferenceCell>
  );
};

export const AgendaStatusIcon: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID }, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const selectDataItemValue = useMemo(() => selectGridDataItemMemoValueForCell<AppointmentDataItem>(memoID, memoField), [memoField, memoID]);
  const cellValue = useSelector(selectDataItemValue);

  const iconName = cellValue ? cellValue : StatusNames.Consultation;

  return (
    <SC.StatusIcon>
      <FontAwesomeIcon className="grid__icon" icon={IconMap[iconName as StatusNames].icon} style={IconMap[iconName as StatusNames].style} />
    </SC.StatusIcon>
  );
};

export const AgendaStatusCell: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells<AppointmentDataItem>(ID, field);

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

export const AgendaSvcStaffCell: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells<AppointmentDataItem>(ID, field);
  const LookupHR01teamId = cellValue as number;

  const selectTeamStaffData = useMemo(selectTeamStaffMemoData, []);
  const teamStaffData = useSelector(selectTeamStaffData);

  const currentEmployee = teamStaffData.find(({ Id }) => Id === LookupHR01teamId);
  const value = currentEmployee ? currentEmployee.Title : '';

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

export const AgendaServicesCell: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells<AppointmentDataItem>(ID, field);
  const LookupMultiBP01offeringsId = cellValue as { results: number[] };

  const selectServicesData = useMemo(selectServicesMemoData, []);
  const servicesData = useSelector(selectServicesData);
  const currentServices = servicesData.filter(({ Id }) => LookupMultiBP01offeringsId.results.find((serviceID) => serviceID === Id));
  console.log(`currentServices`, currentServices);
  const value = currentServices.map(({ OfferingsName_Edit }) => OfferingsName_Edit ?? '').join(' | ');

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

export const AgendaFullNameCell: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells<AppointmentDataItem>(ID, field);
  const LookupCM102customersId = cellValue as number;

  const selectCustomersData = useMemo(selectCustomersMemoData, []);
  const customersData = useSelector(selectCustomersData);
  const currentCustomer = customersData.find(({ Id }) => Id === LookupCM102customersId);
  const value = currentCustomer ? currentCustomer.FullName : '';

  return (
    <td>
      {dataItemInEditValue ? (
        <AgendaFullNameDropDownList dataItemID={memoID} field={memoField} onChange={onChange} domainData={customersData} value={value} />
      ) : (
        value
      )}
    </td>
  );
};

export const AgendaStartDateCell: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells<AppointmentDataItem>(ID, field);
  const intlService = useInternationalization();
  const value = cellValue as Date;

  return (
    <td style={{ padding: '18px 12px' }}>
      {dataItemInEditValue ? (
        <AgendaStartDateInput dataItemID={memoID} field={memoField} onChange={onChange} value={value} />
      ) : (
        intlService.formatDate(value, 'H:mm | dd.MM')
      )}
    </td>
  );
};

export const AgendaEndDateCell: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const { memoID, memoField, cellValue, dataItemInEditValue } = useMemoDataItemValuesForCells<AppointmentDataItem>(ID, field);
  const intlService = useInternationalization();
  const value = cellValue as Date;

  return (
    <td>
      {dataItemInEditValue ? (
        <AgendaEndDateInput dataItemID={memoID} field={memoField} onChange={onChange} value={value} />
      ) : (
        intlService.formatDate(value, 'H:mm | dd.MM')
      )}
    </td>
  );
};
