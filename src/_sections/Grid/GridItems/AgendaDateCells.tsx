import React, { FC, useMemo, useState, useRef, useEffect } from 'react';
import { Popup } from '@progress/kendo-react-popup';
import { useSelector, useDispatch } from 'react-redux';
import { DateTimePicker, DateTimePickerChangeEvent } from '@progress/kendo-react-dateinputs';
import { useInternationalization } from '@progress/kendo-react-intl';
import { Error } from '@progress/kendo-react-labels';
// Styled Components
import * as SC from '../GridItemsStyled/GridCellsStyled';
// Selectors
import { selectDataItemIsLoading, selectProcessDataItemFieldValue, selectMemoOriginalAppointmentsData } from '../GridSelectors';
// Types
import { EditCellProps } from './GridItemsTypes';
import { AppointmentDataItem } from '../../../Agenda/AgendaTypes';
// Actions

export const AgendaStartDateInput: FC<EditCellProps<AppointmentDataItem>> = ({ dataItemID, field, onChange }) => {
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<AppointmentDataItem, Date>(dataItemID, field));
  const LookupHR01teamId = useSelector(selectProcessDataItemFieldValue<AppointmentDataItem, number>(dataItemID, 'LookupHR01teamId'));
  const intlService = useInternationalization();
  // const isValidStartDateEvent = useSelector(selectIsValidStartDateEvent);
  const dispatch = useDispatch();

  const selectAppointmentData = useMemo(selectMemoOriginalAppointmentsData, []);
  const appointments = useSelector(selectAppointmentData);

  const employeeEvents = appointments.filter((appointment) => appointment.LookupHR01teamId === LookupHR01teamId);
  const scheduledAppointments = employeeEvents.filter(({ Start }) => Date.now() < Start.getTime());

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (scheduledAppointments.length === 0) return;

    // for (const { Start, End } of scheduledAppointments) {
    //   const inputStartDateInTimestamp = value.getTime();

    //   if (inputStartDateInTimestamp > Start.getTime() && inputStartDateInTimestamp < End.getTime()) {
    //     // AgendaEditCellsActions.validateStartDateEvent(dispatch, false);
    //     break;
    //   } else if (!isValidStartDateEvent) {
    //     setShowPopup(false);
    //     AgendaEditCellsActions.validateStartDateEvent(dispatch, true);
    //   }
    // }
  }, [dispatch, scheduledAppointments, scheduledAppointments.length]);

  useEffect(() => {
    // if (!isValidStartDateEvent) {
    //   setShowPopup(true);
    // }
    // return () => {
    //   AgendaEditCellsActions.validateStartDateEvent(dispatch, true);
    // };
  }, [dispatch]);

  const onDateChange = ({ syntheticEvent, target: { value } }: DateTimePickerChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value: value });

  return (
    <>
      <DateTimePicker value={value} valid={true} onChange={onDateChange} min={new Date()} disabled={isDataItemLoading} />
      <SC.AgendaValidDatePopup ref={anchorRef} onClick={() => setShowPopup((prevState) => !prevState)}>
        <div className="popupControl">Show reserved time!</div>
        <Popup
          show={showPopup}
          anchor={anchorRef.current as HTMLDivElement}
          style={{ width: anchorRef.current?.offsetWidth }}
          popupClass="validate-date-popup">
          <Error>Reserved time!</Error>
          {scheduledAppointments.map(({ Start, End, ID }) => (
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
  const isDataItemLoading = useSelector(selectDataItemIsLoading);
  const value = useSelector(selectProcessDataItemFieldValue<AppointmentDataItem, Date>(dataItemID, field));
  const LookupHR01teamId = useSelector(selectProcessDataItemFieldValue<AppointmentDataItem, number>(dataItemID, 'LookupHR01teamId'));

  const intlService = useInternationalization();

  // const isValidEndDateEvent = useSelector(selectIsValidEndDateEvent);
  // const dispatch = useDispatch();

  const selectAppointmentData = useMemo(selectMemoOriginalAppointmentsData, []);
  const appointments = useSelector(selectAppointmentData);

  const employeeEvents = appointments.filter((appointment) => appointment.LookupHR01teamId === LookupHR01teamId);
  const scheduledAppointments = employeeEvents.filter(({ Start }) => Date.now() < Start.getTime());

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  // useEffect(() => {
  //   if (scheduledAppointments.length === 0) return;

  //   for (const { Start, End } of scheduledAppointments) {
  //     const inputEndDateInTimestamp = value.getTime();

  //     if (inputEndDateInTimestamp > Start.getTime() && inputEndDateInTimestamp < End.getTime()) {
  //       AgendaEditCellsActions.validateEndDateEvent(dispatch, false);
  //       break;
  //     } else if (!isValidEndDateEvent) {
  //       setShowPopup(false);
  //       AgendaEditCellsActions.validateEndDateEvent(dispatch, true);
  //     }
  //   }
  // }, [dispatch, isValidEndDateEvent, scheduledAppointments, scheduledAppointments.length]);

  // useEffect(() => {
  //   if (!isValidEndDateEvent) {
  //     setShowPopup(true);
  //   }

  //   return () => {
  //     AgendaEditCellsActions.validateEndDateEvent(dispatch, true);
  //   };
  // }, [dispatch, isValidEndDateEvent]);

  const onDateChange = ({ syntheticEvent, target: { value } }: DateTimePickerChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value: value });

  return (
    <>
      <DateTimePicker value={value} valid={true} onChange={onDateChange} min={new Date()} disabled={isDataItemLoading} />
      <SC.AgendaValidDatePopup ref={anchorRef} onClick={() => setShowPopup((prevState) => !prevState)}>
        <div className="popupControl">Show reserved time!</div>
        <Popup
          show={showPopup}
          anchor={anchorRef.current as HTMLDivElement}
          style={{ width: anchorRef.current?.offsetWidth }}
          popupClass="validate-date-popup">
          <Error>Reserved time!</Error>
          {scheduledAppointments.map(({ Start, End, ID }) => (
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
