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
  CalendarColHex: string;
  StaffWeekHours: number | null;
  ID: number;
}

interface FrontendKey {
  TeamProfilePhotoUrl: string;
  inEdit?: boolean;
  isNew?: boolean;
}

export type QueryStaffDataItem = BackendImmutableKey & {
  __metadata: {
    id: string;
    uri: string;
    etag: string;
    type: 'SP.Data.MetroHR01ListItem';
  };
  LookupMultiHR02SkillsId: { __metadata: { type: 'Collection(Edm.Int32)' }; results: number[] };
};

export type StaffDataItem = BackendImmutableKey &
  FrontendKey & {
    LookupMultiHR02SkillsId: { results: number[] };
  };

export type MutationStaffDataItem = BackendImmutableKey & {
  __metadata: { type: 'SP.Data.MetroHR01ListItem' };
  LookupMultiHR02SkillsId: { results: number[] };
};
