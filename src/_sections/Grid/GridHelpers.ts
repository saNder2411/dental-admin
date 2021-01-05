import { GridItemChangeEvent } from '@progress/kendo-react-grid';
// Types
import { StatusNames } from '../../Agenda';
import { GridDataItem, GridDataName } from './GridTypes';
import { OfferIcons } from '../../Services';

export const transformArrayDataToByIdData = <T extends GridDataItem = GridDataItem>(data: T[]): [{ [key: string]: T }, number[]] => {
  const allIDs: number[] = [];
  const byIdData = data.reduce((acc: { [key: string]: T }, item) => {
    acc[item.ID] = item;
    allIDs.push(item.ID);
    return acc;
  }, {});
  return [byIdData, allIDs];
};

export const generateId = (data: GridDataItem[]): number => data.reduce((acc, current) => Math.max(acc, current.ID), 0) + 1;

export const generateColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const updateDataAfterAddItemToEdit = (data: GridDataItem[], editItemID: number): GridDataItem[] => {
  return data.map((item) => (item.ID === editItemID ? { ...item, inEdit: true } : item));
};

export const updateDataAfterEditItem = <T extends GridDataItem = GridDataItem>(data: T[], dataItem: T): T[] => {
  // Delete isNew and inEdit field after change reducer
  const updatedItem = { ...dataItem, inEdit: false, isNew: false };
  const index = data.findIndex(({ ID }) => ID === dataItem.ID);

  if (index < 0) return data;

  return [...data.slice(0, index), updatedItem, ...data.slice(index + 1)];
};

export const updateDataAfterEditNewItem = <T extends GridDataItem = GridDataItem>(data: T[], dataItem: T): T[] => {
  // Delete isNew and inEdit field after change reducer
  const newItem = { ...dataItem, inEdit: false, isNew: false };
  const index = data.findIndex(({ ID }) => ID === dataItem.ID);

  if (index < 0) return data;

  return [...data.slice(0, index), newItem, ...data.slice(index + 1)];
};

export const updateDataAfterRemoveItem = <T extends GridDataItem = GridDataItem>(data: T[], removeItemID: number): T[] => {
  const index = data.findIndex(({ ID }) => ID === removeItemID);

  if (index < 0) return data;

  return [...data.slice(0, index), ...data.slice(index + 1)];
};

export const updateDataAfterCancelEdit = (data: GridDataItem[], originalData: GridDataItem[], editItemID: number): GridDataItem[] => {
  const originalItem = originalData.find(({ ID }) => ID === editItemID);

  return originalItem ? data.map((item) => (item.ID === originalItem.ID ? { ...originalItem, inEdit: false } : item)) : data;
};

export const updateDataOnChangeItem = (data: GridDataItem[], { dataItem, field, value, syntheticEvent }: GridItemChangeEvent): GridDataItem[] => {
  syntheticEvent.persist();
  return data.map((item) => (item.ID === dataItem ? { ...item, [field as string]: value } : item));
};

export const getNewDataItem = (data: GridDataItem[], dataName: GridDataName): GridDataItem => {
  const ID = generateId(data);
  const color = generateColor();

  switch (dataName) {
    case GridDataName.Appointments:
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
    case GridDataName.Customers:
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

        SvcStaff: '',
        Upcoming: new Date().toISOString(),
        ClientPhotoUrl: '',
        inEdit: true,
        isNew: true,
      };

    case GridDataName.Services:
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
    case GridDataName.Staff:
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

const UniqueEntityKeys = {
  Appointments: 'AppointmentStatus',
  Services: 'OfferingsName_Edit',
  Customers: 'LookupMultiHR01teamId',
  TeamStaff: 'JobTitle',
};

export const setTitleForAddNewItemSectionAndDataName = (dataItem: GridDataItem): { labelForAddNewItemBtn: string; dataName: GridDataName } => {
  if (!dataItem) return { labelForAddNewItemBtn: '', dataName: GridDataName.Default };

  if (UniqueEntityKeys.Appointments in dataItem) {
    return { labelForAddNewItemBtn: 'New Appointment', dataName: GridDataName.Appointments };
  } else if (UniqueEntityKeys.Services in dataItem) {
    return { labelForAddNewItemBtn: 'New Service', dataName: GridDataName.Services };
  } else if (UniqueEntityKeys.Customers in dataItem) {
    return { labelForAddNewItemBtn: 'New Customer', dataName: GridDataName.Customers };
  } else if (UniqueEntityKeys.TeamStaff in dataItem) {
    return { labelForAddNewItemBtn: 'New Staff', dataName: GridDataName.Staff };
  }
  return { labelForAddNewItemBtn: '', dataName: GridDataName.Default };
};
