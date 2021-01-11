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
import { AppointmentDataItem } from '../../../_bus/Appointments/AppointmentsTypes';
import { StatusNames, EntitiesMap } from '../GridTypes';
// Selectors
import {
  selectProcessDataItemFieldValue,
  selectStaffLastNameByID,
  selectCustomerFullNameByID,
  selectServicesNameByID,
  selectCustomerGenderByID,
} from '../GridSelectors';
// Hooks
import { useOriginalDataItemValuesForCells } from './GridItemsHooks';
// Helpers
import { isString, isNumber } from './GridItemsHelpers';

export const AgendaReferenceCell: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID }, field }): JSX.Element => {
  const cellValue = useSelector(selectProcessDataItemFieldValue<AppointmentDataItem, string | null>(ID, EntitiesMap.Appointments, field));
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
  const cellValue = useSelector(selectProcessDataItemFieldValue<AppointmentDataItem, StatusNames | null>(ID, EntitiesMap.Appointments, field));

  const iconName = cellValue ? cellValue : StatusNames.Consultation;

  return (
    <SC.StatusIcon>
      <FontAwesomeIcon className="grid__icon" icon={IconMap[iconName as StatusNames].icon} style={IconMap[iconName as StatusNames].style} />
    </SC.StatusIcon>
  );
};

export const AgendaStatusCell: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<AppointmentDataItem, StatusNames>(ID, EntitiesMap.Appointments, field);

  return <td>{dataItemInEditValue ? <AgendaStatusDropDownList dataItemID={memoID} field={memoField} onChange={onChange} /> : cellValue}</td>;
};

export const AgendaSvcStaffCell: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<AppointmentDataItem, number>(ID, EntitiesMap.Appointments, field);

  const selectStaffLastName = useMemo(() => selectStaffLastNameByID(cellValue), [cellValue]);
  const staffLastName = useSelector(selectStaffLastName);

  const value = staffLastName ? staffLastName : '';

  return <td>{dataItemInEditValue ? <AgendaSvcStaffDropDownList dataItemID={memoID} field={memoField} onChange={onChange} /> : value}</td>;
};

export const AgendaServicesCell: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<AppointmentDataItem, { results: number[] }>(
    ID,
    EntitiesMap.Appointments,
    field
  );

  const selectServicesName = useMemo(() => selectServicesNameByID(cellValue.results), [cellValue.results]);
  const servicesName = useSelector(selectServicesName);

  return <td>{dataItemInEditValue ? <AgendaServicesMultiSelect dataItemID={memoID} field={memoField} onChange={onChange} /> : servicesName}</td>;
};

export const AgendaFullNameCell: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<AppointmentDataItem, number>(ID, EntitiesMap.Appointments, field);

  const selectCustomerFullName = useMemo(() => selectCustomerFullNameByID(cellValue), [cellValue]);
  const customerFullName = useSelector(selectCustomerFullName);

  const value = customerFullName ? customerFullName : '';

  return <td>{dataItemInEditValue ? <AgendaFullNameDropDownList dataItemID={memoID} field={memoField} onChange={onChange} /> : value}</td>;
};

export const AgendaStartDateCell: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<AppointmentDataItem, Date>(ID, EntitiesMap.Appointments, field);
  const intlService = useInternationalization();

  return (
    <td style={{ padding: '18px 12px' }}>
      {dataItemInEditValue ? (
        <AgendaStartDateInput dataItemID={memoID} field={memoField} onChange={onChange} />
      ) : (
        intlService.formatDate(cellValue, 'H:mm | dd.MM')
      )}
    </td>
  );
};

export const AgendaEndDateCell: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID }, onChange, field }): JSX.Element => {
  const memoID = useMemo(() => ID, [ID]);
  const memoField = useMemo(() => field, [field]);
  const { cellValue, dataItemInEditValue } = useOriginalDataItemValuesForCells<AppointmentDataItem, Date>(ID, EntitiesMap.Appointments, field);
  const intlService = useInternationalization();

  return (
    <td style={{ padding: '18px 12px' }}>
      {dataItemInEditValue ? (
        <AgendaEndDateInput dataItemID={memoID} field={memoField} onChange={onChange} />
      ) : (
        intlService.formatDate(cellValue, 'H:mm | dd.MM')
      )}
    </td>
  );
};

export const AgendaGenderCell: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID } }): JSX.Element => {
  const cellValue = useSelector(selectProcessDataItemFieldValue<AppointmentDataItem, number>(ID, EntitiesMap.Appointments, 'LookupCM102customersId'));
  const gender = useSelector(selectCustomerGenderByID(cellValue));

  return <td>{gender}</td>;
};

export const AgendaCurrencyCell: FC<GridCellProps<AppointmentDataItem>> = ({ dataItem: { ID }, field }): JSX.Element => {
  const { cellValue } = useOriginalDataItemValuesForCells<AppointmentDataItem, number>(ID, EntitiesMap.Appointments, field);
  const intlService = useInternationalization();
  const numValue = isNumber(cellValue) ? cellValue : 50;

  return <SC.GenericCurrencyCell isNegativeAmount={numValue < 0}>{intlService.formatNumber(numValue, 'c')}</SC.GenericCurrencyCell>;
};
