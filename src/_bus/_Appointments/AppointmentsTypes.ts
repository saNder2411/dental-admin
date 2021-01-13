// Types
import { StatusNames } from '../Entities/EntitiesTypes';

interface BackendImmutableKey {
  Id: number;
  Title: string;
  EventDate: string;
  EndDate: string;
  Duration: number;
  Description: string;
  fAllDayEvent: null | boolean;
  AppointmentStatus: StatusNames;
  Notes: null | string;
  ServiceCharge: number;
  FilterStart: string;
  FilterEnd: string;
  MetroRRule: null | string;
  MetroRecException: null | Date[];
  RecurrenceID: null | number;
  LastNameAppt: string;
  Email: string | null;
  Gender: null | '(1) Female' | '(2) Male';
  FirstName: string;
  CellPhone: string | null;
  ID: number;
  Modified: string;
  LookupCM102customersId: number;
  LookupHR01teamId: number;
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
  LookupMultiBP01offeringsId: { results: number[] };
}

export interface MutationAppointmentDataItem extends BackendImmutableKey {
  LookupMultiBP01offeringsId: { results: number[] };
  __metadata: { type: 'SP.Data.MetroHR03ListItem' };
}
