import { FieldRenderProps } from '@progress/kendo-react-form';
// Types
import { SchedulerDataItem, ViewType, InitDataForNewDataItem } from './SchedulerTypes';
import { StatusNames } from '../Grid/GridTypes';
import { KendoDataItem } from './SchedulerItems/SchedulerItemTypes';

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

export const generateId = (data: SchedulerDataItem[]): number => data.reduce((acc, current) => Math.max(acc, current.ID), 0) + 1;

export const updateNewDataItemOnAddNewItemToChange = (
  data: SchedulerDataItem[],
  { Start, End, TeamID }: InitDataForNewDataItem
): SchedulerDataItem => {
  const ID = generateId(data);

  return {
    Id: ID,
    Title: ``,
    EventDate: Start.toISOString(),
    EndDate: End.toISOString(),
    Duration: 60,
    Description: ``,
    fAllDayEvent: null,
    RecurrenceID: null,
    Email: null,
    AppointmentStatus: StatusNames.Consultation,
    LastNameAppt: ``,
    Gender: '(1) Female',
    Notes: null,
    ServiceCharge: 40,
    FilterStart: Start.toISOString(),
    FilterEnd: End.toISOString(),
    MetroRRule: null,
    MetroRecException: null,
    FirstName: ``,
    CellPhone: null,
    LookupCM102customersId: 1270,
    LookupHR01teamId: TeamID,
    LookupMultiBP01offeringsId: { results: [] },
    ID,
    Modified: new Date().toISOString(),

    TeamID,
    Start,
    End,
    inEdit: true,
    isNew: true,
  };
};

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

export const getNewDataItemWithUpdateException = (dataItem: KendoDataItem, exception: Date): SchedulerDataItem => {
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
