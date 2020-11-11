import { GridItemChangeEvent } from '@progress/kendo-react-grid';
// Types
import { StatusNames } from '../../Agenda';
import { GridDataItem, GridDataName } from './GridTypes';
import { OfferIcons } from '../../Services';

export const generateId = (data: GridDataItem[]): number => data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1;

export const updateDataAfterAddItemToEdit = (data: GridDataItem[], editItemID: number): GridDataItem[] => {
  return [...data.map((item) => (item.id === editItemID ? { ...item, inEdit: true } : item))];
};

export const updateDataAfterEditItem = (data: GridDataItem[], dataItem: GridDataItem): GridDataItem[] => {
  const updatedItem = { ...dataItem, inEdit: false, isNew: false };
  const index = data.findIndex(({ id }) => id === dataItem.id);

  if (index < 0) return data;

  return [...data.slice(0, index), updatedItem, ...data.slice(index + 1)];
};

export const updateDataAfterRemoveItem = (data: GridDataItem[], removeItemID: number): GridDataItem[] => {
  const index = data.findIndex(({ id }) => id === removeItemID);

  if (index < 0) return data;

  return [...data.slice(0, index), ...data.slice(index + 1)];
};

export const updateDataAfterCancelEdit = (data: GridDataItem[], originData: GridDataItem[], editItemID: number): GridDataItem[] => {
  const originalItem = originData.find(({ id }) => id === editItemID);

  return originalItem ? [...data.map((item) => (item.id === originalItem.id ? originalItem : item))] : data;
};

export const updateDataOnChangeItem = (data: GridDataItem[], { dataItem, field, value, syntheticEvent }: GridItemChangeEvent): GridDataItem[] => {
  syntheticEvent.persist();
  return [...data.map((item) => (item.id === dataItem.id ? { ...item, [field as string]: value } : item))];
};

export const updateDataOnAddNewItemToChange = (data: GridDataItem[], dataName: GridDataName): GridDataItem[] => {
  switch (dataName) {
    case GridDataName.Agenda:
      return [
        {
          id: generateId(data),
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
          id: generateId(data),
          teamID: '',
          lastName: '',
          firstName: '',
          gender: 'Female' as const,
          svcStaff: '',
          upcoming: '',
          email: '',
          mobilePhone: '',
          lastUpdate: new Date(),
          photo: '',
          inEdit: true,
          isNew: true,
        },
        ...data,
      ];

    case GridDataName.Services:
      return [
        {
          id: generateId(data),
          offerID: generateId(data),
          offerIconName: OfferIcons.Tooth,
          references: '',
          detailsReference: '',
          category: '',
          duration: 0,
          isShowOnline: false,
          isConsultation: false,
          price: 50,
          discount: 0,
          inEdit: true,
          isNew: true,
        },
        ...data,
      ];

    case GridDataName.TeamStaff:
      return [
        {
          id: generateId(data),
          teamID: generateId(data),
          photo: '',
          firstName: '',
          lastName: '',
          fullName: '',
          jobTitle: '',
          isShowOnline: false,
          mobilePhone: '',
          email: '',
          gender: 'Female' as const,
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
  const newItem = { ...dataItem, inEdit: false, isNew: false, id: generateId(data) };
  const index = data.findIndex(({ id }) => id === dataItem.id);

  if (index < 0) return data;

  return [...data.slice(0, index), newItem, ...data.slice(index + 1)];
};

export const setTitleForAddNewItemSectionAndDataName = (dataItem: GridDataItem): { titleForAddNewItemSection: string; dataName: GridDataName } => {
  if (!dataItem) return { titleForAddNewItemSection: '', dataName: GridDataName.Default };

  if ('status' in dataItem) {
    return { titleForAddNewItemSection: 'New Appointment', dataName: GridDataName.Agenda };
  } else if ('offerID' in dataItem) {
    return { titleForAddNewItemSection: 'New Service', dataName: GridDataName.Services };
  } else if ('upcoming' in dataItem) {
    return { titleForAddNewItemSection: 'New Customer', dataName: GridDataName.Customers };
  } else if ('isShowOnline' in dataItem) {
    return { titleForAddNewItemSection: 'New Staff', dataName: GridDataName.TeamStaff };
  }
  return { titleForAddNewItemSection: '', dataName: GridDataName.Default };
};
