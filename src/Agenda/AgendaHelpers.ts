// Types
import { APIAgendaDataItem, AgendaDataItem } from './AgendaTypes';

export const transformData = (apiResults: APIAgendaDataItem[]): AgendaDataItem[] =>
  apiResults.map((item) => ({
    ...item,
    LastUpdate: new Date().toISOString(),
  }));

export const transformDataItem = (apiResult: APIAgendaDataItem): AgendaDataItem => ({
  ...apiResult,
  LastUpdate: new Date().toISOString(),
});

export const transformDataItemForAPI = ({ LastUpdate, ...others }: AgendaDataItem): APIAgendaDataItem => ({ ...others });
