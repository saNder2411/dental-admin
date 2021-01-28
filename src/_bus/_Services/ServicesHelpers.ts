// Types
import { ServiceDataItem, QueryServiceDataItem, MutationServiceDataItem } from './ServicesTypes';

export const transformAPIData = (apiResults: QueryServiceDataItem[]): ServiceDataItem[] =>
  apiResults.map(({ __metadata, LookupMultiHR02SkillsId, ...dataItem }) => ({
    ...dataItem,
    LookupMultiHR02SkillsId: { results: LookupMultiHR02SkillsId.results },
  }));

export const transformAPIDataItem = ({ __metadata, LookupMultiHR02SkillsId, ...dataItem }: QueryServiceDataItem): ServiceDataItem => ({
  ...dataItem,
  LookupMultiHR02SkillsId: { results: LookupMultiHR02SkillsId.results },
});

export const transformDataItemForAPI = ({ inEdit, isNew, ...dataItem }: ServiceDataItem): MutationServiceDataItem => ({
  ...dataItem,
  __metadata: { type: 'SP.Data.MetroBP02ListItem' },
});
