import { GridItemChangeEvent } from '@progress/kendo-react-grid';
import { v4 as uuidV4 } from 'uuid';
// Types
import { StatusNames } from '../../Agenda';
import { GridDataItem, GridDataName } from './GridTypes';
import { OfferIcons } from '../../Services';

export const generateId = (data: GridDataItem[]): number => data.reduce((acc, current) => Math.max(acc, current.ID), 0) + 1;

export const generateColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const updateDataAfterAddItemToEdit = (data: GridDataItem[], editItemID: number): GridDataItem[] => {
  return data.map((item) => (item.ID === editItemID ? { ...item, inEdit: true } : item));
};

export const updateDataAfterEditItem = (data: GridDataItem[], dataItem: GridDataItem): GridDataItem[] => {
  const updatedItem = { ...dataItem, inEdit: false, isNew: false };
  const index = data.findIndex(({ ID }) => ID === dataItem.ID);

  if (index < 0) return data;

  return [...data.slice(0, index), updatedItem, ...data.slice(index + 1)];
};

export const updateDataAfterRemoveItem = (data: GridDataItem[], removeItemID: number): GridDataItem[] => {
  const index = data.findIndex(({ ID }) => ID === removeItemID);

  if (index < 0) return data;

  return [...data.slice(0, index), ...data.slice(index + 1)];
};

export const updateDataAfterCancelEdit = (data: GridDataItem[], originalData: GridDataItem[], editItemID: number): GridDataItem[] => {
  const originalItem = originalData.find(({ ID }) => ID === editItemID);

  return originalItem ? data.map((item) => (item.ID === originalItem.ID ? originalItem : item)) : data;
};

export const updateDataOnChangeItem = (data: GridDataItem[], { dataItem, field, value, syntheticEvent }: GridItemChangeEvent): GridDataItem[] => {
  syntheticEvent.persist();
  return data.map((item) => (item.ID === dataItem ? { ...item, [field as string]: value } : item));
};

export const updateDataOnAddNewItemToChange = (data: GridDataItem[], dataName: GridDataName): GridDataItem[] => {
  const ID = generateId(data);
  const guid = uuidV4();
  const metadataId = `Web/Lists(guid'${guid}')/Items(${ID})`;
  const metadataUri = `https://sa-toniguy01.metroapps.online/_api/Web/Lists(guid'${guid}')/Items(${ID})`;
  const color = generateColor();

  switch (dataName) {
    case GridDataName.Agenda:
      return [
        {
          LookupCM102customers: { Id: -1 },
          LookupHR01team: { Id: 1 },
          LookupMultiBP01offerings: { results: [] },
          Id: ID,
          Title: ``,
          EventDate: new Date().toISOString(),
          EndDate: new Date().toISOString(),
          Duration: 60,
          Description: ``,
          fAllDayEvent: null,
          MasterSeriesItemID: null,
          RecurrenceID: null,
          EventType: 0,
          Email: null,
          AppointmentStatus: StatusNames.Consultation,
          // AppointmentSource: null,
          // SubmissionIdUIT: null,
          LastNameAppt: ``,
          Gender: '(1) Female',
          Notes: null,
          // TrackingComments: null,
          ServiceCharge: 40,
          FilterStart: new Date().toISOString(),
          FilterEnd: new Date().toISOString(),
          MetroRRule: null,
          MetroRecException: null,
          FirstName: ``,
          CellPhone: null,
          ID,
          Modified: new Date().toISOString(),

          TeamID: 1,
          Start: new Date(),
          End: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours() + 1),
          LastUpdate: new Date().toISOString(),
          inEdit: true,
          isNew: true,
        },
        ...data,
      ];
    case GridDataName.Customers:
      return [
        {
          __metadata: {
            id: metadataId,
            uri: metadataUri,
            etag: '""',
            type: 'SP.Data.MetroCM102ListItem',
          },
          LookupMultiHR01team: { results: [] },
          Id: ID,
          Title: '',
          FirstName: ``,
          FullName: '',
          CellPhone: '',
          Email: '',
          Gender: '(1) Female',
          AgeGroup: null,
          TrackingComments: null,
          WorkPhone: null,
          HomePhone: ``,
          ClientPhoto: {
            Description: '',
            Url: '',
            __metadata: { type: 'SP.FieldUrlValue' },
          },
          ID,
          Modified: new Date().toISOString(),
          Created: new Date().toISOString(),

          SvcStaff: '',
          id: ID,
          Upcoming: new Date().toISOString(),
          ClientPhotoUrl: '',
          inEdit: true,
          isNew: true,
        },
        ...data,
      ];

    case GridDataName.Services:
      return [
        {
          __metadata: {
            id: metadataId,
            uri: metadataUri,
            etag: '""',
            type: 'SP.Data.MetroBP02ListItem',
          },
          Id: ID,
          Title: '',
          OfferingsName_Edit: '',
          ShowOnline: false,
          ConsultReq: false,
          MinutesDuration: 60,
          Amount: 50,
          AmountTotal: '',
          SalesTaxRate: 0,
          AmountSalesTaxLocal: '',
          OfferingCatType: '',
          OfferingDiscount: 0,
          ID,

          id: ID,
          OfferingIconName: OfferIcons.Tooth,
          RoleSkills: [],
          inEdit: true,
          isNew: true,
        },
        ...data,
      ];

    case GridDataName.TeamStaff:
      return [
        {
          __metadata: {
            id: metadataId,
            uri: metadataUri,
            etag: '""',
            type: 'SP.Data.MetroHR01ListItem',
          },
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
          ProfilesStatus: '',
          WorkingWeekDays: null,
          CalendarColour: color,
          CalendarColHex: color,
          ID,

          RoleSkills: [],
          Gender: '(1) Female' as const,
          id: ID,
          TeamProfilePhotoUrl: '',
          inEdit: true,
          isNew: true,
        },
        ...data,
      ];

    default:
      return data;
  }
};

export const updateDataAfterEditNewItem = (data: GridDataItem[], dataItem: GridDataItem): GridDataItem[] => {
  const newItem = { ...dataItem, inEdit: false, isNew: false };
  const index = data.findIndex(({ ID }) => ID === dataItem.ID);

  if (index < 0) return data;

  return [...data.slice(0, index), newItem, ...data.slice(index + 1)];
};

const UniqueEntityKeys = {
  Appointments: 'AppointmentStatus',
  Services: 'OfferingsName_Edit',
  Customers: 'LookupMultiHR01team',
  TeamStaff: 'JobTitle',
};

export const setTitleForAddNewItemSectionAndDataName = (dataItem: GridDataItem): { titleForAddNewItemSection: string; dataName: GridDataName } => {
  if (!dataItem) return { titleForAddNewItemSection: '', dataName: GridDataName.Default };

  if (UniqueEntityKeys.Appointments in dataItem) {
    return { titleForAddNewItemSection: 'New Appointment', dataName: GridDataName.Agenda };
  } else if (UniqueEntityKeys.Services in dataItem) {
    return { titleForAddNewItemSection: 'New Service', dataName: GridDataName.Services };
  } else if (UniqueEntityKeys.Customers in dataItem) {
    return { titleForAddNewItemSection: 'New Customer', dataName: GridDataName.Customers };
  } else if (UniqueEntityKeys.TeamStaff in dataItem) {
    return { titleForAddNewItemSection: 'New Staff', dataName: GridDataName.TeamStaff };
  }
  return { titleForAddNewItemSection: '', dataName: GridDataName.Default };
};
