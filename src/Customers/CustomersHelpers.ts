// Types
import { APIGetResCustomerDataItem, CustomerDataItem } from './CustomersTypes';

export const transformData = (apiResults: APIGetResCustomerDataItem[]): CustomerDataItem[] =>
  apiResults.map((item) => ({ ...item, ClientPhotoUrl: item.ClientPhoto?.Url ?? '' }));

export const transformDataItem = (apiResult: APIGetResCustomerDataItem): CustomerDataItem => ({
  ...apiResult,
  ClientPhotoUrl: apiResult.ClientPhoto?.Url ?? '',
});

export const transformDataItemForAPI = ({ ClientPhoto, ClientPhotoUrl, ID, ...others }: CustomerDataItem): APIGetResCustomerDataItem => ({
  ...others,
  ID,
  Id: ID,
  ClientPhoto: ClientPhoto
    ? { ...ClientPhoto, Url: ClientPhotoUrl }
    : {
        Description: ClientPhotoUrl,
        Url: ClientPhotoUrl,
        __metadata: { type: 'SP.FieldUrlValue' },
      },
  FullName: `${others.FirstName} ${others.Title}`,
});
