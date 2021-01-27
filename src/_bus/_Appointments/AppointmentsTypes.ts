export enum StatusNames {
  Consultation = '(1) Consultation',
  Pending = '(2) Pending',
  Reserved = '(3) Reserved',
  Booked = '(4) Booked',
  Paid = '(5) Paid',
  Checking = '(6) Checking',
  Cancelled = '(7) Cancelled',
  Closed = '(8) Closed',
  Unavailable = '(9) Unavailable',
  Other = '(10) Other',
  Tooth = '(11) Tooth',
}

interface BackendImmutableKey {
  Id: number;
  Title: string;
  EventDate: string;
  EndDate: string;
  Duration: number;
  Description: string;
  fAllDayEvent: null | boolean;
  AppointmentStatus: StatusNames;
  AppointmentSource: string | null;
  Notes: null | string;
  ServiceCharge: number;
  ExtraFees: number;
  ServiceDiscount: number;
  FilterStart: string;
  FilterEnd: string;
  MetroRRule: null | string;
  MetroRecException: null | Date[];
  RecurrenceID: null | number;
  LastNameAppt: string | null;
  Email: string | null;
  Gender: null | '(1) Female' | '(2) Male';
  FirstName: string | null;
  CellPhone: string | null;
  ID: number;
  Modified: string;
  LookupCM102customersId: number;
  LookupHR01teamId: number | null;
}

interface FrontendKey {
  TeamID: number;
  Start: Date;
  End: Date;
  inEdit?: boolean;
  isNew?: boolean;
}

export interface QueryAppointmentDataItem extends BackendImmutableKey {
  __metadata: {
    id: string;
    uri: string;
    etag: string;
    type: 'SP.Data.MetroHR03ListItem';
  };
  LookupMultiBP01offeringsId: { __metadata: { type: 'Collection(Edm.Int32)' }; results: number[] };
}

export interface AppointmentDataItem extends BackendImmutableKey, FrontendKey {
  LookupHR01teamId: number;
  LookupMultiBP01offeringsId: { results: number[] };
}

export interface MutationAppointmentDataItem extends BackendImmutableKey {
  LookupMultiBP01offeringsId: { results: number[] };
  __metadata: { type: 'SP.Data.MetroHR03ListItem' };
}
