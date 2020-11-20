// Types
import { APIAgendaDataItem, AgendaDataItem } from './AgendaTypes';

export const transformData = (apiResults: APIAgendaDataItem[]): AgendaDataItem[] =>
  apiResults.map((item) => ({
    ...item,
    FullName: `${item.FirstName} ${item.LastNameAppt}`,
    LastUpdate: new Date().toISOString(),
    LookupMultiServices: item.LookupMultiBP01offerings.results.map(({ Id }) => Id),
  }));

export const transformDataItem = (apiResult: APIAgendaDataItem): AgendaDataItem => ({
  ...apiResult,
  FullName: `${apiResult.FirstName} ${apiResult.LastNameAppt}`,
  LastUpdate: new Date().toISOString(),
  LookupMultiServices: apiResult.LookupMultiBP01offerings.results.map(({ Id }) => Id),
});

export const transformDataItemForAPI = ({ LookupMultiServices, LastUpdate, FullName, ...others }: AgendaDataItem): APIAgendaDataItem => ({
  ...others,
  FirstName: FullName.split(' ')[0],
  LastNameAppt: FullName.split(' ')[1],
});
