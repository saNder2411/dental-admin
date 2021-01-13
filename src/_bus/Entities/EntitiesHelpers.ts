// Types
import { GenericDataItem, EntitiesKeys, EntitiesMap, StatusNames, InitDataForNewAppointmentDataItem } from './EntitiesTypes';
import { AppointmentDataItem } from '../_Appointments/AppointmentsTypes';
import { OfferIcons } from '../_Services/ServicesTypes';

export const transformArrayDataToByIdData = <T extends GenericDataItem = GenericDataItem>(data: T[]): [{ [key: string]: T }, number[]] => {
  const allIDs: number[] = [];
  const byIdData = data.reduce((acc: { [key: string]: T }, item) => {
    acc[item.ID] = item;
    allIDs.push(item.ID);
    return acc;
  }, {});
  return [byIdData, allIDs];
};

export const generateId = (allIDs: number[]) => Math.max(...allIDs) + 1;

export const generateColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const updateDataAfterEditItem = <T extends GenericDataItem = GenericDataItem>(data: T[], dataItem: T): T[] => {
  const index = data.findIndex(({ ID }) => ID === dataItem.ID);

  if (index < 0) return data;

  return [...data.slice(0, index), dataItem, ...data.slice(index + 1)];
};

export const updateStateOnCreateDataItem = <T extends GenericDataItem = GenericDataItem>(processData: { [key: string]: T }, dataItem: T): T[] => {
  const newProcessData = { ...processData, [dataItem.ID]: dataItem };
  const newOriginalData = Object.values(newProcessData);
  newOriginalData.sort((a: any, b: any) => b.ID - a.ID);

  return newOriginalData as T[];
};

export const updateDataAfterRemoveItem = <T extends GenericDataItem = GenericDataItem>(data: T[], removeItemID: number): T[] => {
  const index = data.findIndex(({ ID }) => ID === removeItemID);

  if (index < 0) return data;

  return [...data.slice(0, index), ...data.slice(index + 1)];
};

export const getNewDataItem = (allIDs: number[], entityName: EntitiesKeys): GenericDataItem => {
  const ID = generateId(allIDs);
  const color = generateColor();

  switch (entityName) {
    case EntitiesMap.Appointments:
      return {
        Id: ID,
        Title: ``,
        EventDate: new Date().toISOString(),
        EndDate: new Date().toISOString(),
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
        FilterStart: new Date().toISOString(),
        FilterEnd: new Date().toISOString(),
        MetroRRule: null,
        MetroRecException: null,
        FirstName: ``,
        CellPhone: null,
        LookupCM102customersId: -1,
        LookupHR01teamId: 1,
        LookupMultiBP01offeringsId: { results: [] },
        ID,
        Modified: new Date().toISOString(),

        TeamID: 1,
        Start: new Date(),
        End: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours() + 1),
        inEdit: true,
        isNew: true,
      };
    case EntitiesMap.Customers:
      return {
        LookupMultiHR01teamId: { results: [] },
        Id: ID,
        Title: '',
        FirstName: ``,
        FullName: '',
        CellPhone: '',
        Email: '',
        Gender: '(1) Female',
        ClientPhoto: {
          Description: '',
          Url: '',
          __metadata: { type: 'SP.FieldUrlValue' },
        },
        ID,
        Modified: new Date().toISOString(),
        Created: new Date().toISOString(),

        SvcStaff: 1,
        Upcoming: new Date().toISOString(),
        ClientPhotoUrl: '',
        inEdit: true,
        isNew: true,
      };

    case EntitiesMap.Services:
      return {
        Id: ID,
        Title: '',
        OfferingsName_Edit: '',
        ShowOnline: false,
        ConsultReq: false,
        MinutesDuration: 60,
        Amount: 50,
        OfferingCatType: '',
        OfferingDiscount: 0,
        ID,
        OfferingIconName: OfferIcons.Tooth,
        RoleSkills: [],
        inEdit: true,
        isNew: true,
      };
    case EntitiesMap.Staff:
      return {
        Id: ID,
        Title: '',
        FirstName: '',
        FullName: '',
        TeamProfilePhoto: {
          __metadata: { type: 'SP.FieldUrlValue' },
          Description: '',
          Url: '',
        },
        ShowOnline: false,
        Email: '',
        CellPhone: '',
        JobTitle: '',
        Department: null,
        CalendarColHex: color,
        ID,

        RoleSkills: [],
        Gender: '(1) Female' as const,
        TeamProfilePhotoUrl: '',
        inEdit: true,
        isNew: true,
      };
    default:
      throw new Error(`Grid Data Name not correct`);
  }
};

export const getNewAppointmentDataItemForScheduler = (allIDs: number[], { Start, End, TeamID }: InitDataForNewAppointmentDataItem): AppointmentDataItem => {
  const ID = generateId(allIDs);

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
