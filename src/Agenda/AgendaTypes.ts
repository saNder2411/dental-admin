export enum StatusNames {
  Consultation = 'Consultation',
  Pending = 'Pending',
  Reserved = 'Reserved',
  Booked = 'Booked',
  Paid = 'Paid',
  Checking = 'Checking',
  Cancelled = 'Cancelled',
  Closed = 'Closed',
  Unavailable = 'Unavailable',
  Other = 'Other',
  Tooth = 'Tooth',
}

export interface AgendaDataItem {
  ID: number;
  status: StatusNames;
  references: string;
  start: number;
  end: number;
  svcStaff: string;
  services: string;
  totalPrice: number;
  lastName: string;
  firstName: string;
  fullName: string;
  phone: string;
  lastUpdate: Date;
  eventId: number;
  inEdit?: boolean;
  customerGender: 'Female' | 'Male';
  isNew?: boolean;
}

export type AgendaDataItemKeys = keyof AgendaDataItem;

export type AgendaDataItemValues = AgendaDataItem[AgendaDataItemKeys];

export interface AgDataItem {
  __metadata: {
    id: string;
    uri: string;
    etag: string;
    type: string;
  };
  Id: number;
  Title: string;
  FirstName: string;
  FullName: string;
  TeamProfilePhoto: {
    __metadata: { type: string };
    Description: string;
    Url: string;
  };
  ShowOnline: boolean;
  Email: string;
  CellPhone: string;
  JobTitle: string;
  Department: null | string;
  ProfilesStatus: string;
  WorkingWeekDays: null | string;
  CalendarColour: string;
  CalendarColHex: string;
  ID: number;
}

export interface AgendaState {
  data: AgendaDataItem[];
}
