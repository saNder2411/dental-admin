// Types
import { ServiceDataItem, QueryServiceDataItem, MutationServiceDataItem } from './ServicesTypes';

export const transformAPIData = (apiResults: QueryServiceDataItem[]): ServiceDataItem[] => apiResults.map(({ __metadata, ...dataItem }) => dataItem);

export const transformAPIDataItem = ({ __metadata, ...dataItem }: QueryServiceDataItem): ServiceDataItem => dataItem;

export const transformDataItemForAPI = ({ inEdit, isNew, RoleSkills, ...dataItem }: ServiceDataItem): MutationServiceDataItem => ({
  ...dataItem,
  __metadata: { type: 'SP.Data.MetroBP02ListItem' },
});

