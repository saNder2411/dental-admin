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
  id: number;
  status: StatusNames;
  references: string;
  start: Date;
  end: Date;
  svcStaff: string;
  services: string;
  budget: number;
  lastName: string;
  firstName: string;
  phone: string;
  lastUpdate: Date;
  eventId: number;
  inEdit?: boolean;
}