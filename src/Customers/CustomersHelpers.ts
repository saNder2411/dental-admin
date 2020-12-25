// Types
import { APIGetResCustomerDataItem, CustomerDataItem, CustomerDataItemForCrtUpdActions, APIPostPutResCustomerDataItem } from './CustomersTypes';

export const transformAPIData = (apiResults: APIGetResCustomerDataItem[]): CustomerDataItem[] =>
  apiResults.map((item) => ({ ...item, ClientPhotoUrl: item.ClientPhoto?.Url ?? '' }));

export const transformAPIDataItem = ({ LookupMultiHR01teamId, others }: APIPostPutResCustomerDataItem): CustomerDataItem => ({
  ...others,
  ClientPhotoUrl: others.ClientPhoto?.Url ?? '',
  LookupMultiHR01team: { results: LookupMultiHR01teamId.results.map((Id) => ({ Id })) },
});

export const transformDataItemForAPI = ({
  ClientPhoto,
  ClientPhotoUrl,
  LookupMultiHR01team,
  SvcStaff,
  Upcoming,
  ...others
}: CustomerDataItem): CustomerDataItemForCrtUpdActions => ({
  ...others,
  ClientPhoto: ClientPhoto
    ? { ...ClientPhoto, Url: ClientPhotoUrl }
    : {
        Description: ClientPhotoUrl,
        Url: ClientPhotoUrl,
        __metadata: { type: 'SP.FieldUrlValue' },
      },
  FullName: `${others.FirstName} ${others.Title}`,
  LookupMultiHR01teamId: { results: LookupMultiHR01team.results.map(({ Id }) => Id) },
  __metadata: { type: 'SP.Data.MetroCM102ListItem' },
});
