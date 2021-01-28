// Types
import { SkillDataItem, QuerySkillDataItem } from './SkillsTypes';

export const transformAPIData = (apiResults: QuerySkillDataItem[]): SkillDataItem[] => apiResults.map(({ __metadata, ...dataItem }) => dataItem);


