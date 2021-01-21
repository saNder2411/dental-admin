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
  WorkingDayStart01: string | null;
  WorkingDayEnd01: string | null;
  WorkingDayStart02: string | null;
  WorkingDayEnd02: string | null;
  WorkingDayStart03: string | null;
  WorkingDayEnd03: string | null;
  WorkingDayStart04: string | null;
  WorkingDayEnd04: string | null;
  WorkingDayStart05: string | null;
  WorkingDayEnd05: string | null;
  WorkingDayStart06: string | null;
  WorkingDayEnd06: string | null;
  WorkingDayStart07: string | null;
  WorkingDayEnd07: string | null;
  ID: number;

  RoleSkills?: null | string[];
  Gender?: null | '(2) Male' | '(1) Female';
}

interface FrontendKey {
  TeamProfilePhotoUrl: string;
  inEdit?: boolean;
  isNew?: boolean;
}

export interface QueryStaffDataItem extends BackendImmutableKey {
  __metadata: {
    id: string;
    uri: string;
    etag: string;
    type: 'SP.Data.MetroHR01ListItem';
  };
}

export interface StaffDataItem extends BackendImmutableKey, FrontendKey {}

export interface MutationStaffDataItem extends BackendImmutableKey {
  __metadata: { type: 'SP.Data.MetroHR01ListItem' };
}
