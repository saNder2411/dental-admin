// Types
import { QueryAppointmentDataItem, AppointmentDataItem, MutationAppointmentDataItem } from './AppointmentsTypes';

export const transformAPIData = (apiResults: QueryAppointmentDataItem[]): AppointmentDataItem[] =>
  apiResults.map(({ __metadata, LookupHR01teamId, LookupMultiBP01offeringsId, ...dataItem }) => ({
    ...dataItem,
    TeamID: LookupHR01teamId ? LookupHR01teamId : 1,
    Start: new Date(dataItem.EventDate),
    End: new Date(dataItem.EndDate),
    MetroRecException: dataItem.MetroRecException ? dataItem.MetroRecException.map((exception) => new Date(exception)) : null,
    LookupHR01teamId: LookupHR01teamId ? LookupHR01teamId : 1,
    LookupMultiBP01offeringsId: { results: LookupMultiBP01offeringsId.results },
  }));

export const transformAPIDataItem = ({
  __metadata,
  LookupHR01teamId,
  LookupMultiBP01offeringsId,
  ...dataItem
}: QueryAppointmentDataItem): AppointmentDataItem => ({
  ...dataItem,
  TeamID: LookupHR01teamId ? LookupHR01teamId : 1,
  Start: new Date(dataItem.EventDate),
  End: new Date(dataItem.EndDate),
  MetroRecException: dataItem.MetroRecException ? dataItem.MetroRecException.map((exception) => new Date(exception)) : null,
  LookupHR01teamId: LookupHR01teamId ? LookupHR01teamId : 1,
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
