interface BackendImmutableKey {
  Id: number;
  Title: string;
  FirstName: string;
  FullName: string;
  TeamProfilePhoto: {
    __metadata: { type: string };
    Description: string;
    Url: string | null;
  } | null;
  ShowOnline: boolean;
  Email: string | null;
  CellPhone: string | null;
  JobTitle: string;
  Department: null | string;
  CalendarColHex: string;
  ID: number;

  RoleSkills?: null | string[];
  Gender?: null | '(2) Male' | '(1) Female';
}

interface FrontendKey {
  TeamProfilePhotoUrl: string;
  inEdit?: boolean;
  isNew?: boolean;
}

export interface QueryTeamStaffDataItem extends BackendImmutableKey {
  __metadata: {
    id: string;
    uri: string;
    etag: string;
    type: 'SP.Data.MetroHR01ListItem';
  };
}

export interface StaffDataItem extends BackendImmutableKey, FrontendKey {}

export interface MutationTeamStaffDataItem extends BackendImmutableKey {
  __metadata: { type: 'SP.Data.MetroHR01ListItem' };
}
