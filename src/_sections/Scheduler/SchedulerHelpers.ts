import { FieldRenderProps } from '@progress/kendo-react-form';
import { SchedulerDataChangeEvent } from '@progress/kendo-react-scheduler';
import { v4 as uuidV4 } from 'uuid';
import { guid } from '@progress/kendo-react-common';
// Types
import { SchedulerDataItem } from './SchedulerTypes';
import { StatusNames } from '../../Agenda';

export const ordersModelFields = {
  id: 'ID',
  title: 'Title',
  description: 'Description',
  start: 'Start',
  end: 'End',
  isAllDay: 'fAllDayEvent',
  Title: 'Title',
  CellPhone: 'CellPhone',
  email: 'Email',
  notes: 'Description',
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

export const updateDataAfterRemoveItem = (data: SchedulerDataItem[], removeItemID: number): SchedulerDataItem[] => {
  const index = data.findIndex(({ ID }) => ID === removeItemID);

  if (index < 0) return data;

  return [...data.slice(0, index), ...data.slice(index + 1)];
};

export const updateDataOnChangeItem = (data: SchedulerDataItem[], { created, updated, deleted }: SchedulerDataChangeEvent): SchedulerDataItem[] => {
  return (
    data
      // Filter the deleted items
      .filter((item) => deleted.find((current) => current.id === item.ID) === undefined)
      // Find and replace the updated items
      .map((item) => updated.find((current) => current.id === item.ID) || item)
      // Add the newly created items and assign an `id`.
      .concat(created.map((item) => ({ ...item, ID: guid() })))
  );
};

export const updateDataOnAddNewItemToChange = (
  data: SchedulerDataItem[],
  { Start, End, TeamID }: { Start: Date; End: Date; TeamID: number }
): [number, SchedulerDataItem[]] => {
  const ID = generateId(data);
  const guid = uuidV4();
  const metadataId = `Web/Lists(guid'${guid}')/Items(${ID})`;
  const metadataUri = `https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'${guid}')/Items(${ID})`;

  return [
    ID,
    [
      {
        AppointmentSource: null,
        AppointmentStatus: StatusNames.Consultation,
        CellPhone: null,
        Description: ``,
        Duration: 60,
        Email: null,
        EndDate: End.toISOString(),
        EventDate: Start.toISOString(),
        EventType: 0,
        FilterEnd: End.toISOString(),
        FilterStart: Start.toISOString(),
        FirstName: ``,
        Gender: '(1) Female',
        ID,
        Id: ID,
        LastNameAppt: ``,
        LookupCM102customers: {
          Id: 1,
          __metadata: {
            id: guid,
            type: 'SP.Data.MetroBP02ListItem',
          },
        },
        LookupHR01team: {
          Id: TeamID,
          __metadata: {
            id: guid,
            type: 'SP.Data.MetroHR01ListItem',
          },
        },
        LookupMultiBP01offerings: { results: [] },
        MasterSeriesItemID: null,
        MetroRRule: null,
        MetroRecException: null,
        Notes: null,
        RecurrenceID: null,
        ServiceCharge: 40,
        SubmissionIdUIT: null,
        Title: ``,
        TrackingComments: null,
        fAllDayEvent: null,
        id: ID,
        __metadata: {
          id: metadataId,
          uri: metadataUri,
          etag: `"2"`,
          type: `SP.Data.MetroHR03ListItem`,
        },
        TeamID,
        Start,
        End,
        LastUpdate: new Date().toISOString(),
        inEdit: true,
        isNew: true,
      },
      ...data,
    ],
  ];
};
