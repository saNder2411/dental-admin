// Types
import { APICustomersDataItem, CustomersDataItem } from './CustomersTypes';

export const transformData = (apiResults: APICustomersDataItem[]): CustomersDataItem[] =>
  apiResults.map((item) => ({ ...item, ClientPhotoUrl: item.ClientPhoto?.Url ?? '' }));

export const transformDataItem = (apiResult: APICustomersDataItem): CustomersDataItem => ({
  ...apiResult,
  ClientPhotoUrl: apiResult.ClientPhoto?.Url ?? '',
});

export const transformDataItemForAPI = ({ ClientPhoto, ClientPhotoUrl, ID, __metadata, ...others }: CustomersDataItem): APICustomersDataItem => {
  const startID = __metadata.id.lastIndexOf(`(`) + 1;
  const newID = `${__metadata.id.slice(0, startID)}${ID})`;
  return {
    ...others,
    ID,
    Id: ID,
    id: ID,
    ClientPhoto: ClientPhoto
      ? { ...ClientPhoto, Url: ClientPhotoUrl }
      : {
          Description: ClientPhotoUrl,
          Url: ClientPhotoUrl,
          __metadata: { type: 'SP.FieldUrlValue' },
        },
    FullName: `${others.FirstName} ${others.Title}`,
    __metadata: { ...__metadata, id: newID },
  };
};
