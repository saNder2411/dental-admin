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
  AppointmentStatus: StatusNames;
  EventDate: string;
  EndDate: string;
  Description: string | null;
  Duration: number;
  ServiceCharge: number;
  Notes: null | string;
  fAllDayEvent: null | boolean;
  MetroRRule: null | string;
  MetroRecException: null | Date[];
  RecurrenceID: null | number;
  FirstAppointment: boolean;
  ID: number;
  Modified: string;
  LookupCM102customersId: number | null;
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
  __metadata: { type: 'SP.Data.MetroHR03ListItem' };
  fRecurrence: null | boolean;
  LookupMultiBP01offeringsId: { results: number[] };
}
