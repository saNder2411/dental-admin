// Types
import { APIAgendaDataItem, AgendaDataItem } from './AgendaTypes';

export const transformData = (apiResults: APIAgendaDataItem[]): AgendaDataItem[] =>
  apiResults.map((item) => ({
    ...item,
    TeamID: item.LookupHR01team.Id,
    Start: new Date(item.EventDate),
    End: new Date(item.EndDate),
    LastUpdate: new Date().toISOString(),
  }));

export const transformDataItem = (apiResult: APIAgendaDataItem): AgendaDataItem => ({
  ...apiResult,
  TeamID: apiResult.LookupHR01team.Id,
  Start: new Date(apiResult.EventDate),
  End: new Date(apiResult.EndDate),
  LastUpdate: new Date().toISOString(),
});

export const transformDataItemForAPI = ({ LastUpdate, TeamID, Start, End, isNew, inEdit, ...others }: AgendaDataItem): APIAgendaDataItem => ({
  ...others,
  EventDate: Start.toISOString(),
  EndDate: End.toISOString(),
});
