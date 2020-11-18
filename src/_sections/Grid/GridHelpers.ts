import { GridItemChangeEvent } from '@progress/kendo-react-grid';
// Types
import { StatusNames } from '../../Agenda';
import { GridDataItem, GridDataName } from './GridTypes';
import { OfferIcons } from '../../Services';

export const generateId = (data: GridDataItem[]): number => data.reduce((acc, current) => Math.max(acc, current.ID), 0) + 1;

export const updateDataAfterAddItemToEdit = (data: GridDataItem[], editItemID: number): GridDataItem[] => {
  return [...data.map((item) => (item.ID === editItemID ? { ...item, inEdit: true } : item))];
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

export const updateDataAfterCancelEdit = (data: GridDataItem[], originData: GridDataItem[], editItemID: number): GridDataItem[] => {
  const originalItem = originData.find(({ ID }) => ID === editItemID);

  return originalItem ? [...data.map((item) => (item.ID === originalItem.ID ? originalItem : item))] : data;
};

export const updateDataOnChangeItem = (data: GridDataItem[], { dataItem, field, value, syntheticEvent }: GridItemChangeEvent): GridDataItem[] => {
  syntheticEvent.persist();
  return [...data.map((item) => (item.ID === dataItem.ID ? { ...item, [field as string]: value } : item))];
};

export const updateDataOnAddNewItemToChange = (data: GridDataItem[], dataName: GridDataName): GridDataItem[] => {
  switch (dataName) {
    case GridDataName.Agenda:
      return [
        {
          ID: generateId(data),
          status: StatusNames.Consultation,
          references: '',
          start: Date.now(),
          end: Date.now(),
          svcStaff: '',
          services: '',
          totalPrice: 0,
          lastName: '',
          firstName: '',
          fullName: '',
          phone: '',
          lastUpdate: new Date(),
          eventId: Math.random() * 100,
          customerGender: 'Female' as const,
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
            __metadata: { type: '' },
          },
          ClientPhotoUrl: '',
          Created: new Date().toISOString(),
          Email: '',
          FirstName: ``,
          FullName: '',
          Gender: '(1) Female',
          HomePhone: ``,
          ID: generateId(data),
          Id: generateId(data),
          LookupMultiHR01team: { results: [] },
          LookupMultiAppointments: [],
          Modified: new Date().toISOString(),
          SvcStaff: '',
          Title: '',
          TrackingComments: null,
          WorkPhone: null,
          id: generateId(data),
          __metadata: {
            id: '',
            uri: '',
            etag: '',
            type: '',
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
          ID: generateId(data),
          Id: generateId(data),
          id: generateId(data),
          MinutesDuration: 60,
          OfferingCatType: '',
          OfferingDiscount: 0,
          OfferingsName_Edit: '',
          OfferIconName: OfferIcons.Tooth,
          RoleSkills: '',
          SalesTaxRate: 0,
          ShowOnline: false,
          Title: '',
          __metadata: {
            etag: '',
            id: '',
            type: '',
            uri: '',
          },
          inEdit: true,
          isNew: true,
        },
        ...data,
      ];

    case GridDataName.TeamStaff:
      return [
        {
          CalendarColHex: '',
          CalendarColour: '',
          CellPhone: '',
          Department: null,
          Email: '',
          FirstName: '',
          FullName: '',
          ID: generateId(data),
          Id: generateId(data),
          JobTitle: '',
          ProfilesStatus: '',
          RoleSkills: '',
          ShowOnline: false,
          TeamProfilePhoto: {
            Description: '',
            Url: '',
            __metadata: {
              type: '',
            },
          },
          TeamProfilePhotoUrl: '',
          Title: '',
          WorkingWeekDays: null,
          id: generateId(data),
          __metadata: {
            etag: '',
            id: '',
            type: '',
            uri: '',
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

  if ('status' in dataItem) {
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
