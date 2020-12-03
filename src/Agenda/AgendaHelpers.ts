// Types
import { APIAgendaDataItem, AgendaDataItem } from './AgendaTypes';

export const transformData = (apiResults: APIAgendaDataItem[]): AgendaDataItem[] =>
  apiResults.map((item) => ({
    ...item,
    TeamID: item.LookupHR01team.Id,
    Start: new Date(item.FilterStart),
    End: new Date(item.FilterEnd),
    LastUpdate: new Date().toISOString(),
  }));

export const transformDataItem = (apiResult: APIAgendaDataItem): AgendaDataItem => ({
  ...apiResult,
  TeamID: apiResult.LookupHR01team.Id,
  Start: new Date(apiResult.FilterStart),
  End: new Date(apiResult.FilterEnd),
  LastUpdate: new Date().toISOString(),
});

export const transformDataItemForAPI = ({ LastUpdate, TeamID, Start, End, isNew, inEdit, ...others }: AgendaDataItem): APIAgendaDataItem => ({
  ...others,
  FilterStart: Start.toISOString(),
  FilterEnd: End.toISOString(),
});
