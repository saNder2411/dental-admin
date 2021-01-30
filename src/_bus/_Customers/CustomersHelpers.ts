// Types
import { QueryCustomerDataItem, CustomerDataItem, MutationCustomerDataItem } from './CustomersTypes';

export const transformAPIData = (apiResults: QueryCustomerDataItem[]): CustomerDataItem[] =>
  apiResults.map(({ __metadata, LookupMultiHR01teamId, LookupMultiHR03eventsId, ...dataItem }) => ({
    ...dataItem,
    ClientPhotoUrl: dataItem.ClientPhoto?.Url ?? '',
    LookupMultiHR01teamId: { results: LookupMultiHR01teamId.results },
    LookupMultiHR03eventsId: { results: LookupMultiHR03eventsId.results },
  }));

export const transformAPIDataItem = ({
  __metadata,
  LookupMultiHR01teamId,
  LookupMultiHR03eventsId,
  ...dataItem
}: QueryCustomerDataItem): CustomerDataItem => ({
  ...dataItem,
  ClientPhotoUrl: dataItem.ClientPhoto?.Url ?? '',
  LookupMultiHR01teamId: { results: LookupMultiHR01teamId.results },
  LookupMultiHR03eventsId: { results: LookupMultiHR03eventsId.results },
});

export const transformDataItemForAPI = ({ ClientPhoto, ClientPhotoUrl, inEdit, isNew, ...dataItem }: CustomerDataItem): MutationCustomerDataItem => ({
  ...dataItem,
  ClientPhoto: ClientPhoto
    ? { ...ClientPhoto, Url: ClientPhotoUrl }
    : {
        Description: ClientPhotoUrl,
        Url: ClientPhotoUrl,
        __metadata: { type: 'SP.FieldUrlValue' },
      },
  FullName: `${dataItem.FirstName} ${dataItem.Title}`,
  __metadata: { type: 'SP.Data.MetroCM102ListItem' },
});
