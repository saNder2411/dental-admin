// Types
import { RoleTeamSkillDataItem, QueryRoleTeamSkillDataItem } from './RoleTeamSkillsTypes';

export const transformAPIData = (apiResults: QueryRoleTeamSkillDataItem[]): RoleTeamSkillDataItem[] => apiResults.map(({ __metadata, ...dataItem }) => dataItem);


