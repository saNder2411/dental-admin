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
          AppointmentSource: null,
          AppointmentStatus: StatusNames.Consultation,
          CellPhone: ``,
          Description: ``,
          Duration: 60,
          Email: ``,
          EndDate: new Date().toISOString(),
          EventDate: new Date().toISOString(),
          EventType: 0,
          FilterEnd: new Date().toISOString(),
          FilterStart: new Date().toISOString(),
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
            Id: 1,
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
          TeamID: 1,
          Start: new Date(),
          End: new Date(),
          LastUpdate: ``,
          inEdit: true,
          isNew: true,
        },
        ...data,
      ];
    case GridDataName.Customers:
      return [
        {
          AgeGroup: null,
          CellPhone: '',
          ClientPhoto: {
            Description: '',
            Url: '',
            __metadata: { type: 'SP.FieldUrlValue' },
          },
          ClientPhotoUrl: '',
          Created: new Date().toISOString(),
          Email: '',
          FirstName: ``,
          FullName: '',
          Gender: '(1) Female',
          HomePhone: ``,
          ID,
          Id: ID,
          LookupMultiHR01team: { results: [] },
          Modified: new Date().toISOString(),
          SvcStaff: '',
          Title: '',
          TrackingComments: null,
          WorkPhone: null,
          id: ID,
          __metadata: {
            id: metadataId,
            uri: metadataUri,
            etag: '""',
            type: 'SP.Data.MetroCM102ListItem',
          },
          Upcoming: new Date().toISOString(),
          inEdit: true,
          isNew: true,
        },
        ...data,
      ];

    case GridDataName.Services:
      return [
        {
          Amount: 50,
          AmountSalesTaxLocal: '',
          AmountTotal: '',
          ConsultReq: false,
          ID,
          Id: ID,
          id: ID,
          MinutesDuration: 60,
          OfferingCatType: '',
          OfferingDiscount: 0,
          OfferingsName_Edit: '',
          OfferingIconName: OfferIcons.Tooth,
          RoleSkills: [],
          SalesTaxRate: 0,
          ShowOnline: false,
          Title: '',
          __metadata: {
            id: metadataId,
            uri: metadataUri,
            etag: '""',
            type: 'SP.Data.MetroBP02ListItem',
          },
          inEdit: true,
          isNew: true,
        },
        ...data,
      ];

    case GridDataName.TeamStaff:
      return [
        {
          CalendarColHex: color,
          CalendarColour: color,
          CellPhone: '',
          Department: null,
          Email: '',
          FirstName: '',
          FullName: '',
          ID,
          Id: ID,
          JobTitle: '',
          ProfilesStatus: '',
          RoleSkills: [],
          ShowOnline: false,
          TeamProfilePhoto: {
            Description: '',
            Url: '',
            __metadata: {
              type: 'SP.FieldUrlValue',
            },
          },
          TeamProfilePhotoUrl: '',
          Title: '',
          WorkingWeekDays: null,
          id: ID,
          __metadata: {
            id: metadataId,
            uri: metadataUri,
            etag: '""',
            type: 'SP.Data.MetroHR01ListItem',
          },
          Gender: '(1) Female' as const,
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

export const setTitleForAddNewItemSectionAndDataName = (dataItem: GridDataItem): { titleForAddNewItemSection: string; dataName: GridDataName } => {
  if (!dataItem) return { titleForAddNewItemSection: '', dataName: GridDataName.Default };

  if ('AppointmentStatus' in dataItem) {
    return { titleForAddNewItemSection: 'New Appointment', dataName: GridDataName.Agenda };
  } else if ('OfferingCatType' in dataItem) {
    return { titleForAddNewItemSection: 'New Service', dataName: GridDataName.Services };
  } else if ('Upcoming' in dataItem) {
    return { titleForAddNewItemSection: 'New Customer', dataName: GridDataName.Customers };
  } else if ('JobTitle' in dataItem) {
    return { titleForAddNewItemSection: 'New Staff', dataName: GridDataName.TeamStaff };
  }
  return { titleForAddNewItemSection: '', dataName: GridDataName.Default };
};
