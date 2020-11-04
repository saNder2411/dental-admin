import { GridItemChangeEvent } from '@progress/kendo-react-grid';
// Types
import { AgendaDataItem, StatusNames } from '../../Agenda';

export const generateId = (data: AgendaDataItem[]): number => data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1;

export const updateDataAfterAddItemToEdit = (data: AgendaDataItem[], editItemID: number): AgendaDataItem[] => {
  return [...data.map((item) => (item.id === editItemID ? { ...item, inEdit: true } : item))];
};

export const updateDataAfterEditItem = (data: AgendaDataItem[], dataItem: AgendaDataItem): AgendaDataItem[] => {
  const updatedItem = { ...dataItem, inEdit: false };
  const index = data.findIndex(({ id }) => id === dataItem.id);

  if (index < 0) return data;

  return [...data.slice(0, index), updatedItem, ...data.slice(index + 1)];
};

export const updateDataAfterRemoveItem = (data: AgendaDataItem[], removeItemID: number): AgendaDataItem[] => {
  const index = data.findIndex(({ id }) => id === removeItemID);

  if (index < 0) return data;

  return [...data.slice(0, index), ...data.slice(index + 1)];
};

export const updateDataAfterCancelEdit = (data: AgendaDataItem[], originData: AgendaDataItem[], editItemID: number): AgendaDataItem[] => {
  const originalItem = originData.find(({ id }) => id === editItemID);

  return originalItem ? [...data.map((item) => (item.id === originalItem.id ? originalItem : item))] : [...data];
};

export const updateDataOnChangeItem = (data: AgendaDataItem[], { dataItem, field, value, syntheticEvent }: GridItemChangeEvent): AgendaDataItem[] => {
  syntheticEvent.persist();
  return [...data.map((item) => (item.id === dataItem.id ? { ...item, [field as string]: value } : item))];
};

export const updateDataOnAddNewItemToChange = (data: AgendaDataItem[]): AgendaDataItem[] => {
  const newDataItem = {
    id: -1,
    status: StatusNames.Consultation,
    references: '',
    start: new Date(),
    end: new Date(),
    svcStaff: '',
    services: '',
    budget: 0,
    lastName: '',
    firstName: '',
    phone: '',
    lastUpdate: new Date(),
    eventId: Math.random() * 100,
    inEdit: true,
  };

  return [newDataItem, ...data];
};

export const updateDataAfterEditNewItem = (data: AgendaDataItem[], dataItem: AgendaDataItem): AgendaDataItem[] => {
  const newItem = { ...dataItem, inEdit: false, id:  generateId(data)};
  const index = data.findIndex(({ id }) => id === dataItem.id);

  if (index < 0) return data;

  return [...data.slice(0, index), newItem, ...data.slice(index + 1)];
};
