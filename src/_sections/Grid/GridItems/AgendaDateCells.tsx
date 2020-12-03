import React, { FC, useMemo, useState, useRef, useEffect } from 'react';
import { Popup } from '@progress/kendo-react-popup';
import { useSelector } from 'react-redux';
import { DateTimePicker, DateTimePickerChangeEvent } from '@progress/kendo-react-dateinputs';
import { useInternationalization } from '@progress/kendo-react-intl';
import { Error } from '@progress/kendo-react-labels';
// Styled Components
import * as SC from '../GridItemsStyled/GridCellsStyled';
// Selectors
import { selectGridDataItemIsLoading } from '../GridSelectors';
import { selectAgendaMemoData } from '../../../Agenda/AgendaSelectors';
// Types
import { EditCellProps } from './GridItemsTypes';
import { AgendaDataItem, LookupEntity } from '../../../Agenda/AgendaTypes';
// Hooks
import { useMemoDataItemValuesForCells } from './GridItemsHooks';

export const AgendaStartDateInput: FC<EditCellProps<AgendaDataItem, Date>> = ({ dataItemID, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);
  const { cellValue } = useMemoDataItemValuesForCells<AgendaDataItem>(dataItemID, 'LookupHR01team');
  const LookupHR01team = cellValue as LookupEntity;
  const intlService = useInternationalization();

  const selectAgendaData = useMemo(selectAgendaMemoData, []);
  const agendaData = useSelector(selectAgendaData);

  const employeeEvents = agendaData.filter((event) => event.LookupHR01team.Id === LookupHR01team.Id);
  const scheduledAppointments = employeeEvents.filter(({ Start }) => Date.now() < Start.getTime());

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [isValid, setIsValid] = useState(true);
  const [showPopup, setShowPopup] = useState(!isValid);

  useEffect(() => {
    if (scheduledAppointments.length === 0) return;

    for (const { Start, End } of scheduledAppointments) {
      const inputStartDateInTimestamp = value.getTime();

      if (inputStartDateInTimestamp > Start.getTime() && inputStartDateInTimestamp < End.getTime()) {
        setIsValid(false);
        break;
      } else if (!isValid) {
        setShowPopup(false);
        setIsValid(true);
      }
    }
  }, [isValid, scheduledAppointments, scheduledAppointments.length, value]);

  useEffect(() => {
    if (!isValid) {
      setShowPopup(true);
    }
  }, [isValid]);

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
          {scheduledAppointments.map(({ FilterStart, FilterEnd }) => (
            <Error key={FilterStart}>
              {intlService.formatDate(new Date(FilterStart), 'dd.MM')}:{' '}
              <div className="appointment-time">
                {intlService.formatDate(new Date(FilterStart), 'H:mm')} - {intlService.formatDate(new Date(FilterEnd), 'H:mm')}
              </div>
            </Error>
          ))}
        </Popup>
      </SC.AgendaValidDatePopup>
    </>
  );
};

export const AgendaEndDateInput: FC<EditCellProps<AgendaDataItem, Date>> = ({ dataItemID, field, onChange, value }) => {
  const isDataItemLoading = useSelector(selectGridDataItemIsLoading);

  const { cellValue } = useMemoDataItemValuesForCells<AgendaDataItem>(dataItemID, 'LookupHR01team');
  const LookupHR01team = cellValue as LookupEntity;
  const intlService = useInternationalization();

  const selectAgendaData = useMemo(selectAgendaMemoData, []);
  const agendaData = useSelector(selectAgendaData);

  const employeeEvents = agendaData.filter((event) => event.LookupHR01team.Id === LookupHR01team.Id);
  const scheduledAppointments = employeeEvents.filter(({ Start }) => Date.now() < Start.getTime());

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [isValid, setIsValid] = useState(true);
  const [showPopup, setShowPopup] = useState(!isValid);

  useEffect(() => {
    if (scheduledAppointments.length === 0) return;

    for (const { Start, End } of scheduledAppointments) {
      const inputEndDateInTimestamp = value.getTime();

      if (inputEndDateInTimestamp > Start.getTime() && inputEndDateInTimestamp < End.getTime()) {
        setIsValid(false);
        break;
      } else if (!isValid) {
        setShowPopup(false);
        setIsValid(true);
      }
    }
  }, [isValid, scheduledAppointments, scheduledAppointments.length, value]);

  useEffect(() => {
    if (!isValid) {
      setShowPopup(true);
    }
  }, [isValid]);

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
          {scheduledAppointments.map(({ FilterStart, FilterEnd }) => (
            <Error key={FilterStart}>
              {intlService.formatDate(new Date(FilterStart), 'dd.MM')}:{' '}
              <div className="appointment-time">
                {intlService.formatDate(new Date(FilterStart), 'H:mm')} - {intlService.formatDate(new Date(FilterEnd), 'H:mm')}
              </div>
            </Error>
          ))}
        </Popup>
      </SC.AgendaValidDatePopup>
    </>
  );
};
