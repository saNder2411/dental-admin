// Types
import { APIGetResAppointmentDataItem, AppointmentDataItem, AppointmentDataItemForPostPutReq } from './AgendaTypes';

export const transformAPIData = (apiResults: APIGetResAppointmentDataItem[]): AppointmentDataItem[] =>
  apiResults.map((item) => ({
    ...item,
    TeamID: item.LookupHR01team.Id,
    Start: new Date(item.EventDate),
    End: new Date(item.EndDate),
    LastUpdate: new Date().toISOString(),
    MetroRecException: item.MetroRecException ? item.MetroRecException.map((exception) => new Date(exception)) : null,
  }));

export const transformAPIDataItem = (apiResult: AppointmentDataItemForPostPutReq): AppointmentDataItem => {
  const { __metadata, LookupMultiBP01offeringsId, LookupCM102customersId, LookupHR01teamId, ...others } = apiResult;
  return {
    ...others,
    LookupMultiBP01offerings: { results: LookupMultiBP01offeringsId.results.map((Id) => ({ Id })) },
    LookupCM102customers: { Id: LookupCM102customersId },
    LookupHR01team: { Id: LookupHR01teamId },
    TeamID: LookupHR01teamId,
    Start: new Date(apiResult.EventDate),
    End: new Date(apiResult.EndDate),
    LastUpdate: new Date().toISOString(),
    MetroRecException: apiResult.MetroRecException ? apiResult.MetroRecException.map((exception) => new Date(exception)) : null,
  };
};

export const transformDataItemForAPI = ({
  LastUpdate,
  TeamID,
  Start,
  End,
  isNew,
  inEdit,
  LookupCM102customers,
  LookupHR01team,
  LookupMultiBP01offerings,
  ...others
}: AppointmentDataItem): AppointmentDataItemForPostPutReq => ({
  ...others,
  EventDate: Start.toISOString(),
  EndDate: End.toISOString(),
  FilterStart: Start.toISOString(),
  FilterEnd: End.toISOString(),
  LookupCM102customersId: LookupCM102customers.Id,
  LookupHR01teamId: LookupHR01team.Id,
  LookupMultiBP01offeringsId: { results: LookupMultiBP01offerings.results.map(({ Id }) => Id) },
  __metadata: { type: 'SP.Data.MetroHR03ListItem' },
});

export const response = {
  d: {
    __metadata: {
      id: "Web/Lists(guid'd9dccd8b-9f3d-4330-89e3-bda20bb04348')/Items(1381)",
      uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'd9dccd8b-9f3d-4330-89e3-bda20bb04348')/Items(1381)",
      etag: '"1"',
      type: 'SP.Data.MetroHR03ListItem',
    },
    FirstUniqueAncestorSecurableObject: {
      __deferred: {
        uri:
          "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'd9dccd8b-9f3d-4330-89e3-bda20bb04348')/Items(1381)/FirstUniqueAncestorSecurableObject",
      },
    },
    RoleAssignments: {
      __deferred: {
        uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'd9dccd8b-9f3d-4330-89e3-bda20bb04348')/Items(1381)/RoleAssignments",
      },
    },
    AttachmentFiles: {
      __deferred: {
        uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'd9dccd8b-9f3d-4330-89e3-bda20bb04348')/Items(1381)/AttachmentFiles",
      },
    },
    ContentType: {
      __deferred: { uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'd9dccd8b-9f3d-4330-89e3-bda20bb04348')/Items(1381)/ContentType" },
    },
    FieldValuesAsHtml: {
      __deferred: {
        uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'd9dccd8b-9f3d-4330-89e3-bda20bb04348')/Items(1381)/FieldValuesAsHtml",
      },
    },
    FieldValuesAsText: {
      __deferred: {
        uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'd9dccd8b-9f3d-4330-89e3-bda20bb04348')/Items(1381)/FieldValuesAsText",
      },
    },
    FieldValuesForEdit: {
      __deferred: {
        uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'd9dccd8b-9f3d-4330-89e3-bda20bb04348')/Items(1381)/FieldValuesForEdit",
      },
    },
    File: {
      __deferred: { uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'd9dccd8b-9f3d-4330-89e3-bda20bb04348')/Items(1381)/File" },
    },
    Folder: {
      __deferred: { uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'd9dccd8b-9f3d-4330-89e3-bda20bb04348')/Items(1381)/Folder" },
    },
    ParentList: {
      __deferred: { uri: "https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'd9dccd8b-9f3d-4330-89e3-bda20bb04348')/Items(1381)/ParentList" },
    },
    FileSystemObjectType: 0,
    Id: 1381,
    ContentTypeId: '0x010200D8DF0566AD6249728EB09EFBAF2822CB00FA7341C7DDC32544838D7911BA3A78AD',
    Title: null,
    Location: null,
    EventDate: '2020-12-24T09:00:00Z',
    EndDate: '2020-12-24T09:15:00Z',
    Description: null,
    fAllDayEvent: false,
    fRecurrence: false,
    ParticipantsPickerId: null,
    Category: null,
    FreeBusy: null,
    Overbook: null,
    Email: 'test@gmail.com',
    AppointmentStatus: '(2) Pending',
    AppointmentSource: null,
    SubmissionIdUIT: '2-Thu Dec 24 2020 11:00:00_1269',
    CalendarColTeam: null,
    CalendarColHex: null,
    TeamProfileEMail: null,
    AssignedToId: null,
    LastNameAppt: 'A.Female',
    Gender: null,
    ManagerId: null,
    Notes: null,
    TrackingComments: null,
    StatusChange: false,
    ServiceChange: false,
    StylistChange: false,
    CustomerChange: false,
    StartTimeChange: false,
    EndTimeChange: false,
    AlertsSMS: 0,
    FirstAppointment: false,
    ServiceCharge: 0,
    TimeChanges: 0,
    ExtraFees: 0,
    ServiceDiscount: 0,
    MaxDuration: 0,
    ScheduleGroupID: null,
    ScheduleRefID: null,
    OverlapLvl: '(1) Clear-No Overlap',
    FilterStart: null,
    FilterEnd: null,
    MetroRRule: null,
    MetroRecException: null,
    ComputedDuration: null,
    FirstName: 'Consultation',
    CellPhone: '+234567890',
    LookupMultiBP01offeringsId: { __metadata: { type: 'Collection(Edm.Int32)' }, results: [1] },
    LookupCM102customersId: 1269,
    LookupHR01teamId: 2,
    AlertsCalls: 0,
    ID: 1381,
    Modified: '2020-12-24T17:21:27Z',
    Created: '2020-12-24T17:21:27Z',
    AuthorId: 18,
    EditorId: 18,
    OData__UIVersionString: '1.0',
    Attachments: false,
    GUID: '07318119-4af3-40f8-8776-c68820377869',
  },
};
