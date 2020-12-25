import { FieldRenderProps } from '@progress/kendo-react-form';
// import { v4 as uuidV4 } from 'uuid';
// Types
import { SchedulerDataItem, ViewType, InitDataForNewDataItem } from './SchedulerTypes';
import { StatusNames } from '../../Agenda';
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
    LookupCM102customers: { Id: 1269 },
    LookupHR01team: { Id: TeamID },
    LookupMultiBP01offerings: { results: [] },
    Id: ID,
    Title: ``,
    EventDate: Start.toISOString(),
    EndDate: End.toISOString(),
    Duration: 60,
    Description: ``,
    fAllDayEvent: null,
    MasterSeriesItemID: null,
    RecurrenceID: null,
    EventType: 0,
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
    ID,
    Modified: new Date().toISOString(),

    TeamID,
    Start,
    End,
    LastUpdate: new Date().toISOString(),
    inEdit: true,
    isNew: true,
  };
};

export const extractGuidFromString = (metadataID: string) => {
  const startGuid = metadataID.indexOf(`'`) + 1;
  const endGuid = metadataID.lastIndexOf(`'`);

  return metadataID.slice(startGuid, endGuid);
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
