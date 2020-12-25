import React, { FC, useMemo, useState, useRef, useEffect } from 'react';
import { Popup } from '@progress/kendo-react-popup';
import { useSelector, useDispatch } from 'react-redux';
import { DateTimePicker, DateTimePickerChangeEvent } from '@progress/kendo-react-dateinputs';
import { useInternationalization } from '@progress/kendo-react-intl';
import { Error } from '@progress/kendo-react-labels';
// Styled Components
import * as SC from '../GridItemsStyled/GridCellsStyled';
// Selectors
import { selectGridDataItemIsLoading } from '../GridSelectors';
import { selectAgendaMemoData, selectIsValidStartDateEvent, selectIsValidEndDateEvent } from '../../../Agenda/AgendaSelectors';
// Types
import { EditCellProps } from './GridItemsTypes';
import { AppointmentDataItem, LookupEntity } from '../../../Agenda/AgendaTypes';
// Hooks
import { useMemoDataItemValuesForCells } from './GridItemsHooks';
// Actions
import { AgendaEditCellsActions } from '../../../Agenda/AgendaActions';

export const AgendaStartDateInput: FC<EditCellProps<AppointmentDataItem, Date>> = ({ dataItemID, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);

  const { cellValue } = useMemoDataItemValuesForCells<AppointmentDataItem>(dataItemID, 'LookupHR01team');
  const LookupHR01team = cellValue as LookupEntity;

  const intlService = useInternationalization();

  const isValidStartDateEvent = useSelector(selectIsValidStartDateEvent);
  const dispatch = useDispatch();

  const selectAgendaData = useMemo(selectAgendaMemoData, []);
  const agendaData = useSelector(selectAgendaData);

  const employeeEvents = agendaData.filter((event) => event.LookupHR01team.Id === LookupHR01team.Id);
  const scheduledAppointments = employeeEvents.filter(({ Start }) => Date.now() < Start.getTime());

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [showPopup, setShowPopup] = useState(!isValidStartDateEvent);

  useEffect(() => {
    if (scheduledAppointments.length === 0) return;

    for (const { Start, End } of scheduledAppointments) {
      const inputStartDateInTimestamp = value.getTime();

      if (inputStartDateInTimestamp > Start.getTime() && inputStartDateInTimestamp < End.getTime()) {
        AgendaEditCellsActions.validateStartDateEvent(dispatch, false);
        break;
      } else if (!isValidStartDateEvent) {
        setShowPopup(false);
        AgendaEditCellsActions.validateStartDateEvent(dispatch, true);
      }
    }
  }, [dispatch, isValidStartDateEvent, scheduledAppointments, scheduledAppointments.length, value]);

  useEffect(() => {
    if (!isValidStartDateEvent) {
      setShowPopup(true);
    }

    return () => {
      AgendaEditCellsActions.validateStartDateEvent(dispatch, true);
    };
  }, [dispatch, isValidStartDateEvent]);

  const onDateChange = ({ syntheticEvent, target: { value } }: DateTimePickerChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value: value });

  return (
    <>
      <DateTimePicker value={value} valid={isValidStartDateEvent} onChange={onDateChange} min={new Date()} disabled={isDataItemLoading} />
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

export const AgendaEndDateInput: FC<EditCellProps<AppointmentDataItem, Date>> = ({ dataItemID, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);

  const { cellValue } = useMemoDataItemValuesForCells<AppointmentDataItem>(dataItemID, 'LookupHR01team');
  const LookupHR01team = cellValue as LookupEntity;

  const intlService = useInternationalization();

  const isValidEndDateEvent = useSelector(selectIsValidEndDateEvent);
  const dispatch = useDispatch();

  const selectAgendaData = useMemo(selectAgendaMemoData, []);
  const agendaData = useSelector(selectAgendaData);

  const employeeEvents = agendaData.filter((event) => event.LookupHR01team.Id === LookupHR01team.Id);
  const scheduledAppointments = employeeEvents.filter(({ Start }) => Date.now() < Start.getTime());

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [showPopup, setShowPopup] = useState(!isValidEndDateEvent);

  useEffect(() => {
    if (scheduledAppointments.length === 0) return;

    for (const { Start, End } of scheduledAppointments) {
      const inputEndDateInTimestamp = value.getTime();

      if (inputEndDateInTimestamp > Start.getTime() && inputEndDateInTimestamp < End.getTime()) {
        AgendaEditCellsActions.validateEndDateEvent(dispatch, false);
        break;
      } else if (!isValidEndDateEvent) {
        setShowPopup(false);
        AgendaEditCellsActions.validateEndDateEvent(dispatch, true);
      }
    }
  }, [dispatch, isValidEndDateEvent, scheduledAppointments, scheduledAppointments.length, value]);

  useEffect(() => {
    if (!isValidEndDateEvent) {
      setShowPopup(true);
    }

    return () => {
      AgendaEditCellsActions.validateEndDateEvent(dispatch, true);
    };
  }, [dispatch, isValidEndDateEvent]);

  const onDateChange = ({ syntheticEvent, target: { value } }: DateTimePickerChangeEvent) =>
    onChange({ dataItem: dataItemID, field, syntheticEvent, value: value });

  return (
    <>
      <DateTimePicker value={value} valid={isValidEndDateEvent} onChange={onDateChange} min={new Date()} disabled={isDataItemLoading} />
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
