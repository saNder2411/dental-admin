// Types
import { AgendaDataItem } from './AgendaMockData';

export const generateId = (data: AgendaDataItem[]): number => data.reduce((acc, current) => Math.max(acc, current.id), 0) + 1;

export const updateItem = (data: AgendaDataItem[], item: AgendaDataItem): AgendaDataItem[] => {
  let index = data.findIndex(({ id }) => id === item.id);
  if (index >= 0) {
    data = [...data.slice(0, index), item, ...data.slice(index + 1)];
  }
  return data;
};

export const removeItem = (data: AgendaDataItem[], item: AgendaDataItem): AgendaDataItem[] => {
  let index = data.findIndex(({ id }) => id === item.id);
  if (index >= 0) {
    data = [...data.slice(0, index), ...data.slice(index + 1)];
  }
  return data;
};
