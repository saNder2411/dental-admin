import { FieldRenderProps } from '@progress/kendo-react-form';
// Types
import { ViewType } from '../../_bus/Scheduler/SchedulerTypes';
import { AppointmentDataItem } from '../../_bus/_Appointments/AppointmentsTypes';
import { KendoDataItem } from './SchedulerItems/SchedulerItemTypes';
// Helpers
import {} from '../';

export const customModelFields = {
  id: 'ID',
  title: 'Title',
  description: 'Description',
  start: 'Start',
  end: 'End',
  isAllDay: 'fAllDayEvent',
  recurrenceRule: 'MetroRRule',
  recurrenceId: 'RecurrenceID',
  recurrenceExceptions: 'MetroRecException',
};

export const getFormInputOptionalProps = ({ touched, validationMessage, showValidationMessage, hint, id, showHint, label }: FieldRenderProps) => ({
  showValidationMessage: touched && validationMessage,
  showHint: !showValidationMessage && hint,
  hintId: showHint ? `${id}_hint` : '',
  errorId: showValidationMessage ? `${id}_error` : '',
  labelId: label ? `${id}_label` : '',
});

export const getInitDataForNewDataItem = (selectedDate: Date, selectedView: ViewType, TeamID: number) => {
  switch (selectedView) {
    case 'month':
      return {
        Start: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 0),
        End: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1, 0),
        TeamID,
      };
    default:
      return {
        Start: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 10),
        End: new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 11),
        TeamID,
      };
  }
};

export const getNewDataItemWithUpdateException = (dataItem: KendoDataItem, exception: Date): AppointmentDataItem => {
  const MetroRecException = dataItem.MetroRecException ? [...dataItem.MetroRecException, exception] : [exception];
  const { occurrenceId, originalStart, EventDate, EndDate, ...others } = dataItem;
  return {
    ...others,
    EventDate,
    EndDate,
    Start: new Date(EventDate),
    End: new Date(EndDate),
    MetroRecException,
    RecurrenceID: null,
  };
};
