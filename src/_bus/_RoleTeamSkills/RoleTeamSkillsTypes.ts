interface BackendImmutableKey {
  Id: number;
  ID: number;
  Title: string;
}

interface FrontendKey {
  inEdit?: boolean;
  isNew?: boolean;
}

export interface QueryRoleTeamSkillDataItem extends BackendImmutableKey {
  __metadata: {
    id: string;
    uri: string;
    etag: string;
    type: 'SP.Data.MetroHR02_x005f_SkillsListItem';
  };
}

export interface RoleTeamSkillDataItem extends BackendImmutableKey, FrontendKey {}
