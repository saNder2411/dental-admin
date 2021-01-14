// Types
import { GenericDataItem, EntitiesKeys, EntitiesMap, StatusNames, InitDataForNewAppointmentDataItem, EntitiesStateSlice } from './EntitiesTypes';
import { AppointmentDataItem } from '../_Appointments/AppointmentsTypes';
import { OfferIcons } from '../_Services/ServicesTypes';

export const generateId = (allIDs: number[]) => Math.max(...allIDs) + 1;

export const generateColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const transformArrayDataToByIdData = <T extends GenericDataItem = GenericDataItem>(data: T[]): [{ [key: string]: T }, number[]] => {
  const allIDs: number[] = [];
  const byIdData = data.reduce((acc: { [key: string]: T }, item) => {
    acc[item.ID] = item;
    allIDs.push(item.ID);
    return acc;
  }, {});
  return [byIdData, allIDs];
};

export const updateDataItemInArray = <T extends GenericDataItem = GenericDataItem>(data: T[], dataItem: T): T[] => {
  const index = data.findIndex(({ ID }) => ID === dataItem.ID);

  if (index < 0) return data;

  return [...data.slice(0, index), dataItem, ...data.slice(index + 1)];
};

export const deleteDataItemFromArray = <T extends GenericDataItem = GenericDataItem>(data: T[], deleteItemID: number): T[] => {
  const index = data.findIndex(({ ID }) => ID === deleteItemID);

  if (index < 0) return data;

  return [...data.slice(0, index), ...data.slice(index + 1)];
};

export const updateStateSliceOnFetchDataSuccess = <T extends GenericDataItem = GenericDataItem>(
  stateSlice: EntitiesStateSlice<T>,
  data: T[]
): EntitiesStateSlice<T> => {
  const [byId, allIDs] = transformArrayDataToByIdData(data);

  return { ...stateSlice, originalData: data, processById: { ...byId }, byId, allIDs };
};

export const updateStateSliceOnCreateDataItem = <T extends GenericDataItem = GenericDataItem>(
  stateSlice: EntitiesStateSlice<T>,
  dataItem: T
): EntitiesStateSlice<T> => {
  const processById = { ...stateSlice.processById, [dataItem.ID]: dataItem };
  const originalData = stateSlice.originalData.find(({ ID }) => ID === dataItem.ID)
    ? updateDataItemInArray(stateSlice.originalData, dataItem)
    : [dataItem, ...stateSlice.originalData];

  return { ...stateSlice, originalData, processById, byId: { ...processById }, newDataItem: null };
};

export const updateStateSliceOnUpdateDataItem = <T extends GenericDataItem = GenericDataItem>(
  stateSlice: EntitiesStateSlice<T>,
  dataItem: T
): EntitiesStateSlice<T> => {
  const processById = { ...stateSlice.processById, [dataItem.ID]: dataItem };
  const originalData = updateDataItemInArray(stateSlice.originalData, dataItem);

  return { ...stateSlice, originalData, processById, byId: { ...processById } };
};

export const updateStateSliceOnDeleteDataItem = <T extends GenericDataItem = GenericDataItem>(
  stateSlice: EntitiesStateSlice<T>,
  deleteDataItemID: number
): EntitiesStateSlice<T> => {
  const originalData = deleteDataItemFromArray(stateSlice.originalData, deleteDataItemID);
  const { [deleteDataItemID]: deletedItem, ...processById } = stateSlice.processById;
  const allIDs = stateSlice.allIDs.filter((ID) => ID !== deleteDataItemID);

  return { ...stateSlice, originalData, processById, byId: { ...processById }, allIDs };
};

// Edit in Grid
export const updateStateSliceOnAddDataItemToEditInGrid = <T extends GenericDataItem = GenericDataItem>(
  stateSlice: EntitiesStateSlice<T>,
  dataItemID: number
): EntitiesStateSlice<T> => {
  const inEditDataItem = { ...stateSlice.processById[dataItemID], inEdit: true };
  const processById = { ...stateSlice.processById, [dataItemID]: inEditDataItem };

  return { ...stateSlice, processById, byId: { ...processById } };
};

export const updateStateSliceOnCancelEditInGrid = <T extends GenericDataItem = GenericDataItem>(
  stateSlice: EntitiesStateSlice<T>,
  dataItemID: number
): EntitiesStateSlice<T> => {
  const { inEdit, ...originalDataItem } = stateSlice.byId[dataItemID];
  const processById = { ...stateSlice.processById, [dataItemID]: originalDataItem };

  return { ...stateSlice, processById, byId: { ...processById } };
};

export const updateStateSliceOnChangeDataItemInGrid = <T extends GenericDataItem = GenericDataItem>(
  stateSlice: EntitiesStateSlice<T>,
  changeData: { dataItemID: number; field: string; value: any }
): EntitiesStateSlice<T> => {
  const processItem = stateSlice.processById[changeData.dataItemID];
  const processById = { ...stateSlice.processById, [changeData.dataItemID]: { ...processItem, [changeData.field]: changeData.value } };

  return { ...stateSlice, processById };
};

export const updateStateSliceOnAddNewItemToEditInGrid = <T extends GenericDataItem = GenericDataItem>(
  stateSlice: EntitiesStateSlice<T>,
  entityName: EntitiesKeys
): EntitiesStateSlice<T> => {
  const newDataItem = getNewDataItem(stateSlice.allIDs, entityName) as T;
  const originalData = [newDataItem, ...stateSlice.originalData];
  const processById = { ...stateSlice.processById, [newDataItem.ID]: newDataItem };
  const allIDs = [newDataItem.ID, ...stateSlice.allIDs];

  return { ...stateSlice, originalData, processById, byId: { ...processById }, allIDs };
};

// Scheduler Edit
export const updateStateSliceOnAddNewItemToEditInScheduler = (
  stateSlice: EntitiesStateSlice<AppointmentDataItem>,
  initDataForNewDataItem: InitDataForNewAppointmentDataItem
): EntitiesStateSlice<AppointmentDataItem> => {
  const newDataItem = getNewAppointmentDataItemForScheduler(stateSlice.allIDs, initDataForNewDataItem);
  const processById = { ...stateSlice.processById, [newDataItem.ID]: newDataItem };
  const allIDs = [newDataItem.ID, ...stateSlice.allIDs];

  return { ...stateSlice, processById, byId: { ...processById }, allIDs, newDataItem };
};

export const updateStateSliceOnDiscardAddNewItemInScheduler = (
  stateSlice: EntitiesStateSlice<AppointmentDataItem>,
  deleteDataItemID: number
): EntitiesStateSlice<AppointmentDataItem> => {
  const { [deleteDataItemID]: deletedItem, ...processById } = stateSlice.processById;
  const allIDs = stateSlice.allIDs.filter((ID) => ID !== deleteDataItemID);

  return { ...stateSlice, processById, byId: { ...processById }, allIDs, newDataItem: null };
};

export const getNewDataItem = (allIDs: number[], entityName: EntitiesKeys): GenericDataItem => {
  const ID = generateId(allIDs);

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
        CalendarColHex: generateColor(),
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

export const getNewAppointmentDataItemForScheduler = (
  allIDs: number[],
  { Start, End, TeamID }: InitDataForNewAppointmentDataItem
): AppointmentDataItem => {
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
