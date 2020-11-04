import { GridItemChangeEvent } from '@progress/kendo-react-grid';
// Types
import { AgendaDataItem } from '../../Agenda';

export const generateId = (data: AgendaDataItem[]): number => data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1;

export const updateDataAfterAddItemToEdit = (data: AgendaDataItem[], editItemID: number): AgendaDataItem[] => {
  return [...data.map((item) => (item.id === editItemID ? { ...item, inEdit: true } : item))];
};

export const updateDataAfterEditItem = (data: AgendaDataItem[], item: AgendaDataItem): AgendaDataItem[] => {
  const updatedItem = { ...item, inEdit: false };
  const index = data.findIndex(({ id }) => id === item.id);

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
