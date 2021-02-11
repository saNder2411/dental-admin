interface BackendImmutableKey {
  Id: number;
  Title: string | null;
  FirstName: string | null;
  FullName: string | null;
  CellPhone: string | null;
  Email: string | null;
  Gender: '(1) Female' | '(2) Male';
  ClientPhoto: {
    Description: string;
    Url: string | null;
    __metadata: { type: string };
  } | null;
  ID: number;
  Modified: string;
}

interface FrontendKey {
  ClientPhotoUrl: string;
  inEdit?: boolean;
  isNew?: boolean;
}

export interface QueryCustomerDataItem extends BackendImmutableKey {
  __metadata: {
    id: string;
    uri: string;
    etag: string;
    type: 'SP.Data.MetroCM102ListItem';
  };
  LookupMultiHR01teamId: { __metadata: { type: 'Collection(Edm.Int32)' }; results: number[] };
  LookupMultiHR03eventsId: { __metadata: { type: 'Collection(Edm.Int32)' }; results: number[] };
}

export interface CustomerDataItem extends BackendImmutableKey, FrontendKey {
  LookupMultiHR01teamId: { results: number[] };
  LookupMultiHR03eventsId: { results: number[] };
}

export interface MutationCustomerDataItem extends BackendImmutableKey {
  LookupMultiHR01teamId: { results: number[] };
  LookupMultiHR03eventsId: { results: number[] };
  __metadata: { type: 'SP.Data.MetroCM102ListItem' };
}
