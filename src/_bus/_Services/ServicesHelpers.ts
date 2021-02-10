// Types
import { ServiceDataItem, QueryServiceDataItem, MutationServiceDataItem } from './ServicesTypes';

export const transformAPIData = (apiResults: QueryServiceDataItem[]): ServiceDataItem[] =>
  apiResults.map(({ __metadata, LookupMultiHR02SkillsId, ...dataItem }) => ({
    ...dataItem,
    ImageThumbnailUrl: dataItem.ImageThumbnail?.Url ?? '',
    LookupMultiHR02SkillsId: { results: LookupMultiHR02SkillsId.results },
  }));

export const transformAPIDataItem = ({ __metadata, LookupMultiHR02SkillsId, ...dataItem }: QueryServiceDataItem): ServiceDataItem => ({
  ...dataItem,
  ImageThumbnailUrl: dataItem.ImageThumbnail?.Url ?? '',
  LookupMultiHR02SkillsId: { results: LookupMultiHR02SkillsId.results },
});

export const transformDataItemForAPI = ({
  inEdit,
  isNew,
  ImageThumbnail,
  ImageThumbnailUrl,
  ...dataItem
}: ServiceDataItem): MutationServiceDataItem => ({
  ...dataItem,
  ImageThumbnail: ImageThumbnail
    ? { ...ImageThumbnail, Url: ImageThumbnailUrl }
    : { Description: ImageThumbnailUrl, Url: ImageThumbnailUrl, __metadata: { type: 'SP.FieldUrlValue' } },
  __metadata: { type: 'SP.Data.MetroBP02ListItem' },
});
