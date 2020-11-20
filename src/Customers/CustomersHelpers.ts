// Types
import { APICustomersDataItem, CustomersDataItem } from './CustomersTypes';

export const transformData = (apiResults: APICustomersDataItem[]): CustomersDataItem[] =>
  apiResults.map((item) => ({ ...item, ClientPhotoUrl: item.ClientPhoto?.Url ?? '', LookupMultiAppointments: item.LookupMultiHR01team.results }));

export const transformDataItem = (apiResult: APICustomersDataItem): CustomersDataItem => ({
  ...apiResult,
  ClientPhotoUrl: apiResult.ClientPhoto?.Url ?? '',
  LookupMultiAppointments: apiResult.LookupMultiHR01team.results,
});

export const transformDataItemForAPI = ({
  ClientPhoto,
  ClientPhotoUrl,
  LookupMultiHR01team,
  LookupMultiAppointments,
  ...others
}: CustomersDataItem): APICustomersDataItem => ({
  ...others,
  ClientPhoto: ClientPhoto
    ? { ...ClientPhoto, Url: ClientPhotoUrl }
    : {
        Description: '',
        Url: ClientPhotoUrl,
        __metadata: { type: '' },
      },
  LookupMultiHR01team: { results: LookupMultiAppointments },
  FullName: `${others.FirstName} ${others.Title}`,
});
