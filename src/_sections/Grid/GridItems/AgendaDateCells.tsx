import React, { FC, useRef } from 'react';
import { Popup } from '@progress/kendo-react-popup';
import { useSelector } from 'react-redux';
import { DateTimePicker, DateTimePickerChangeEvent } from '@progress/kendo-react-dateinputs';
import { useInternationalization } from '@progress/kendo-react-intl';
import { Error } from '@progress/kendo-react-labels';
// Styled Components
import * as SC from '../GridItemsStyled/GridCellsStyled';
// Selectors
import { selectDataItemIsLoading, selectProcessDataItemFieldValue } from '../../../_bus/Selectors';
// Types
import { EditCellProps } from './GridItemsTypes';
import { AppointmentDataItem } from '../../../_bus/Appointments/AppointmentsTypes';
import { EntitiesMap } from '../../../_bus/Types';
// Hooks
import { useStartDateEventValidation, useEndDateEventValidation } from '../GridHooks';

export const AgendaStartDateInput: FC<EditCellProps<AppointmentDataItem>> = ({ dataItemID, field, onChange }) => {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<AppointmentDataItem, Date>(dataItemID, EntitiesMap.Appointments, field));
  const LookupHR01teamId = useSelector(
    selectProcessDataItemFieldValue<AppointmentDataItem, number>(dataItemID, EntitiesMap.Appointments, 'LookupHR01teamId')
  );
  const intlService = useInternationalization();
  const { isValid, showPopup, setShowPopup, actualAppointments } = useStartDateEventValidation(value, LookupHR01teamId);

  const onDateChange = ({ syntheticEvent, target: { value } }: DateTimePickerChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value: value });

  return (
    <>
      <DateTimePicker value={value} valid={isValid} onChange={onDateChange} min={new Date()} disabled={isDataItemLoading} />
      <SC.AgendaValidDatePopup ref={anchorRef} onClick={() => setShowPopup((prevState) => !prevState)}>
        <div className="popupControl">Show reserved time!</div>
        <Popup
          show={showPopup}
          anchor={anchorRef.current as HTMLDivElement}
          style={{ width: anchorRef.current?.offsetWidth }}
          popupClass="validate-date-popup">
          <Error>Reserved time!</Error>
          {actualAppointments.map(({ Start, End, ID }) => (
            <Error key={ID}>
              {intlService.formatDate(Start, 'dd.MM')}:{' '}
              <div className="appointment-time">
                {intlService.formatDate(Start, 'H:mm')} - {intlService.formatDate(End, 'H:mm')}
              </div>
            </Error>
          ))}
        </Popup>
      </SC.AgendaValidDatePopup>
    </>
  );
};

export const AgendaEndDateInput: FC<EditCellProps<AppointmentDataItem>> = ({ dataItemID, field, onChange }) => {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<AppointmentDataItem, Date>(dataItemID, EntitiesMap.Appointments, field));
  const LookupHR01teamId = useSelector(
    selectProcessDataItemFieldValue<AppointmentDataItem, number>(dataItemID, EntitiesMap.Appointments, 'LookupHR01teamId')
  );
  const intlService = useInternationalization();
  const { isValid, showPopup, setShowPopup, actualAppointments } = useEndDateEventValidation(value, LookupHR01teamId);

  const onDateChange = ({ syntheticEvent, target: { value } }: DateTimePickerChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value: value });

  return (
    <>
      <DateTimePicker value={value} valid={isValid} onChange={onDateChange} min={new Date()} disabled={isDataItemLoading} />
      <SC.AgendaValidDatePopup ref={anchorRef} onClick={() => setShowPopup((prevState) => !prevState)}>
        <div className="popupControl">Show reserved time!</div>
        <Popup
          show={showPopup}
          anchor={anchorRef.current as HTMLDivElement}
          style={{ width: anchorRef.current?.offsetWidth }}
          popupClass="validate-date-popup">
          <Error>Reserved time!</Error>
          {actualAppointments.map(({ Start, End, ID }) => (
            <Error key={ID}>
              {intlService.formatDate(Start, 'dd.MM')}:{' '}
              <div className="appointment-time">
                {intlService.formatDate(Start, 'H:mm')} - {intlService.formatDate(End, 'H:mm')}
              </div>
            </Error>
          ))}
        </Popup>
      </SC.AgendaValidDatePopup>
    </>
  );
};
