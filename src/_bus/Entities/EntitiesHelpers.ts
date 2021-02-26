// Types
import { AppointmentDataItem, StatusNames } from '../_Appointments/AppointmentsTypes';
import { CustomerDataItem } from '../_Customers/CustomersTypes';
import { ServiceDataItem } from '../_Services/ServicesTypes';
import { SkillDataItem } from '../_Skills/SkillsTypes';
import { StaffDataItem } from '../_Staff/StaffTypes';
import { GenericDataItem, EntitiesKeys, EntitiesStateSlice } from './EntitiesTypes';
import { OfferIcons, ContentTypes } from '../_Services/ServicesTypes';
// Constants
import { DEFAULT_WORK_WEEK_HOURS } from '../Constants';

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

export const deleteId = (ids: number[], deletedId: number) => {
  const index = ids.lastIndexOf(deletedId);

  if (index < 0) return ids;

  return [...ids.slice(0, index), ...ids.slice(index + 1)];
};

export const updateStateSliceOnFetchDataSuccess = <T extends GenericDataItem = GenericDataItem>(
  stateSlice: EntitiesStateSlice<T>,
  data: T[]
): EntitiesStateSlice<T> => {
  const [byId, allIDs] = transformArrayDataToByIdData(data);

  return { ...stateSlice, originalData: data, processData: [...data], processById: { ...byId }, byId, allIDs };
};

export const updateStateSliceOnCreateDataItem = <T extends GenericDataItem = GenericDataItem>(
  stateSlice: EntitiesStateSlice<T>,
  dataItem: T,
  clientID: number
): EntitiesStateSlice<T> => {
  const serverID = dataItem.ID;
  const originalData = [dataItem, ...stateSlice.originalData];

  if (clientID === serverID) {
    const hasID = stateSlice.allIDs.includes(serverID);
    const processById = { ...stateSlice.processById, [dataItem.ID]: dataItem };
    const processData = hasID ? updateDataItemInArray(stateSlice.processData, dataItem) : [dataItem, ...stateSlice.processData];
    const allIDs = hasID ? stateSlice.allIDs : [dataItem.ID, ...stateSlice.allIDs];

    return { ...stateSlice, originalData, processData, processById, byId: { ...processById }, allIDs };
  }

  const { [clientID]: oldItem, ...oldProcessById } = stateSlice.processById;
  const processById = { ...oldProcessById, [dataItem.ID]: dataItem };
  const processData = [dataItem, ...deleteDataItemFromArray(stateSlice.processData, clientID)];
  const allIDs = [dataItem.ID, ...stateSlice.allIDs.filter((ID) => ID !== clientID)];

  return { ...stateSlice, originalData, processData, processById, byId: { ...processById }, allIDs };
};

export const updateStateSliceOnUpdateDataItem = <T extends GenericDataItem = GenericDataItem>(
  stateSlice: EntitiesStateSlice<T>,
  dataItem: T
): EntitiesStateSlice<T> => {
  const processById = { ...stateSlice.processById, [dataItem.ID]: dataItem };
  const processData = updateDataItemInArray(stateSlice.processData, dataItem);
  const originalData = updateDataItemInArray(stateSlice.originalData, dataItem);

  return { ...stateSlice, originalData, processData, processById, byId: { ...processById } };
};

export const updateStateSliceOnDeleteDataItem = <T extends GenericDataItem = GenericDataItem>(
  stateSlice: EntitiesStateSlice<T>,
  deleteDataItemID: number
): EntitiesStateSlice<T> => {
  const originalData = deleteDataItemFromArray(stateSlice.originalData, deleteDataItemID);
  const processData = deleteDataItemFromArray(stateSlice.processData, deleteDataItemID);
  const { [deleteDataItemID]: deletedItem, ...processById } = stateSlice.processById;
  const allIDs = stateSlice.allIDs.filter((ID) => ID !== deleteDataItemID);

  return { ...stateSlice, originalData, processData, processById, byId: { ...processById }, allIDs };
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

export const updateStateSliceOnAddNewItemToEditInGrid = (stateSlice: EntitiesStateSlice, entityName: EntitiesKeys): EntitiesStateSlice => {
  const newDataItem = getDefaultNewDataItem(generateId(stateSlice.allIDs))(entityName);
  const processData = [newDataItem, ...stateSlice.processData];
  const processById = { ...stateSlice.processById, [newDataItem.ID]: newDataItem };
  const allIDs = [newDataItem.ID, ...stateSlice.allIDs];

  return { ...stateSlice, processData, processById, byId: { ...processById }, allIDs };
};

export const getNewDataItem = (ID: number) => (entityName: EntitiesKeys): NewItem[EntitiesKeys] => {
  switch (entityName) {
    case EntitiesKeys.Appointments:
      return {
        Id: ID,
        Title: ``,
        AppointmentStatus: StatusNames.Consultation,
        EventDate: new Date().toISOString(),
        EndDate: new Date().toISOString(),
        Description: null,
        Duration: 3600,
        Notes: '',
        ServiceCharge: 0,
        fAllDayEvent: null,
        RecurrenceID: null,
        MetroRRule: null,
        MetroRecException: null,
        FirstAppointment: false,
        // FirstName: ``,
        // LastNameAppt: ``,
        // CellPhone: null,
        // Email: null,
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
    case EntitiesKeys.Customers:
      return {
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
        LookupMultiHR01teamId: { results: [] },
        LookupMultiHR03eventsId: { results: [] },

        ClientPhotoUrl: '',
        inEdit: true,
        isNew: true,
      };

    case EntitiesKeys.Services:
      return {
        Id: ID,
        OfferingsName_Edit: '',
        ShowOnline: false,
        ConsultReq: false,
        MinutesDuration: 60,
        Amount: 50,
        OfferingCatType: '',
        OfferingDiscount: 0,
        ContentTypeId: ContentTypes.Services,
        ID,
        ImageThumbnail: {
          Description: '',
          Url: '',
          __metadata: { type: 'SP.FieldUrlValue' },
        },
        LookupMultiHR02SkillsId: { results: [] },

        ImageThumbnailUrl: OfferIcons.Tooth,
        inEdit: true,
        isNew: true,
      };
    case EntitiesKeys.Staff:
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
        CalendarColHex: generateColor(),
        StaffWeekHours: DEFAULT_WORK_WEEK_HOURS,
        LookupMultiHR02SkillsId: { results: [] },
        ID,

        TeamProfilePhotoUrl: '',
        inEdit: true,
        isNew: true,
      };
    case EntitiesKeys.Skills:
      return {
        Id: ID,
        ID,
        Title: '',
      };

    default:
      throw new Error(`Grid Data Name not correct`);
  }
};

interface NewItem {
  [EntitiesKeys.Appointments]: AppointmentDataItem;
  [EntitiesKeys.Services]: ServiceDataItem;
  [EntitiesKeys.Staff]: StaffDataItem;
  [EntitiesKeys.Customers]: CustomerDataItem;
  [EntitiesKeys.Skills]: SkillDataItem;
}

const getDefaultNewDataItem = (ID: number) => (entityName: EntitiesKeys): NewItem[EntitiesKeys] =>
  ({
    [EntitiesKeys.Appointments]: {
      Id: ID,
      Title: ``,
      AppointmentStatus: StatusNames.Consultation,
      EventDate: new Date().toISOString(),
      EndDate: new Date().toISOString(),
      Description: null,
      Duration: 3600,
      Notes: '',
      ServiceCharge: 0,
      fAllDayEvent: null,
      RecurrenceID: null,
      MetroRRule: null,
      MetroRecException: null,
      FirstAppointment: false,
      // FirstName: ``,
      // LastNameAppt: ``,
      // Email: null,
      // CellPhone: null,
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
    },
    [EntitiesKeys.Customers]: {
      Id: ID,
      Title: '',
      FirstName: ``,
      FullName: '',
      CellPhone: '',
      Email: '',
      Gender: '(1) Female' as const,
      ClientPhoto: {
        Description: '',
        Url: '',
        __metadata: { type: 'SP.FieldUrlValue' },
      },
      ID,
      Modified: new Date().toISOString(),
      LookupMultiHR01teamId: { results: [] },
      LookupMultiHR03eventsId: { results: [] },

      ClientPhotoUrl: '',
      inEdit: true,
      isNew: true,
    },
    [EntitiesKeys.Services]: {
      Id: ID,
      OfferingsName_Edit: '',
      ShowOnline: false,
      ConsultReq: false,
      MinutesDuration: 60,
      Amount: 50,
      OfferingCatType: '',
      OfferingDiscount: 0,
      ContentTypeId: ContentTypes.Services,
      ID,
      ImageThumbnail: {
        Description: '',
        Url: '',
        __metadata: { type: 'SP.FieldUrlValue' },
      },
      LookupMultiHR02SkillsId: { results: [] },

      ImageThumbnailUrl: OfferIcons.Tooth,
      inEdit: true,
      isNew: true,
    },
    [EntitiesKeys.Staff]: {
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
      CalendarColHex: generateColor(),
      StaffWeekHours: DEFAULT_WORK_WEEK_HOURS,
      LookupMultiHR02SkillsId: { results: [] },
      ID,

      TeamProfilePhotoUrl: '',
      inEdit: true,
      isNew: true,
    },
    [EntitiesKeys.Skills]: {
      Id: ID,
      ID,
      Title: '',
    },
  }[entityName]);
