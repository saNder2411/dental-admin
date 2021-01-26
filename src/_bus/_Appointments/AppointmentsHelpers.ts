// Types
import { QueryAppointmentDataItem, AppointmentDataItem, MutationAppointmentDataItem } from './AppointmentsTypes';

export const transformAPIData = (apiResults: QueryAppointmentDataItem[]): AppointmentDataItem[] =>
  apiResults.map(({ LookupMultiBP01offeringsId, __metadata, ...dataItem }) => ({
    ...dataItem,
    TeamID: dataItem.LookupHR01teamId,
    Start: new Date(dataItem.EventDate),
    End: new Date(dataItem.EndDate),
    MetroRecException: dataItem.MetroRecException ? dataItem.MetroRecException.map((exception) => new Date(exception)) : null,
    LookupMultiBP01offeringsId: { results: LookupMultiBP01offeringsId.results },
  }));

export const transformAPIDataItem = ({ __metadata, LookupMultiBP01offeringsId, ...dataItem }: QueryAppointmentDataItem): AppointmentDataItem => ({
  ...dataItem,
  TeamID: dataItem.LookupHR01teamId,
  Start: new Date(dataItem.EventDate),
  End: new Date(dataItem.EndDate),
  MetroRecException: dataItem.MetroRecException ? dataItem.MetroRecException.map((exception) => new Date(exception)) : null,
  LookupMultiBP01offeringsId: { results: LookupMultiBP01offeringsId.results },
});

export const transformDataItemForAPI = ({ TeamID, Start, End, isNew, inEdit, ...dataItem }: AppointmentDataItem): MutationAppointmentDataItem => ({
  ...dataItem,
  EventDate: Start.toISOString(),
  EndDate: End.toISOString(),
  FilterStart: Start.toISOString(),
  FilterEnd: End.toISOString(),
  __metadata: { type: 'SP.Data.MetroHR03ListItem' },
});
