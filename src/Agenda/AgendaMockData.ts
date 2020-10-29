import { IconName } from '../_instruments';

export interface AgendaDataItem {
  id: number;
  status: IconName;
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

export const AgendaGridData: AgendaDataItem[] = [
  {
    id: 1,
    status: IconName.Pending,
    references: 'S.Pye-0635',
    start: new Date(),
    end: new Date(),
    svcStaff: 'Romanova',
    services: '02-Mens Wash+Cut+Dry S3_006',
    budget: 38.25,
    lastName: 'Pye',
    firstName: 'Stephen',
    phone: '0798302214',
    lastUpdate: new Date(),
    eventId: 635,
  },
  {
    id: 2,
    status: IconName.Booked,
    references: 'C.Wong-0499',
    start: new Date(),
    end: new Date(),
    svcStaff: 'Khan',
    services: '05-Highlights 1/2 S3_014',
    budget: 56.25,
    lastName: 'Wong',
    firstName: 'Lee',
    phone: '+189762823877',
    lastUpdate: new Date(),
    eventId: 499,
  },
  {
    id: 3,
    status: IconName.Cancelled,
    references: 'S.Pye-0500',
    start: new Date(),
    end: new Date(),
    svcStaff: 'Robinson',
    services: '04-Boy Student Wash+Cut_011',
    budget: 24,
    lastName: 'Pye',
    firstName: 'Stephen',
    phone: '0798302214',
    lastUpdate: new Date(),
    eventId: 500,
  },
  {
    id: 4,
    status: IconName.Checking,
    references: 'S.Pye-0501',
    start: new Date(),
    end: new Date(),
    svcStaff: 'Wenger',
    services: '02-Mens Wash+Cut+Dry S2_005 | 04-Boy Student Wash+Cut_011',
    budget: 58,
    lastName: 'Pye',
    firstName: 'Stephen',
    phone: '0798302214',
    lastUpdate: new Date(),
    eventId: 501,
  },
  {
    id: 5,
    status: IconName.Closed,
    references: 'S.Pye-0502',
    start: new Date(),
    end: new Date(),
    svcStaff: 'Giround',
    services: '02-Mens Wash+Cut+Dry S2_005 | 05-Highlights T-Section S3_016',
    budget: 99.25,
    lastName: 'Pye',
    firstName: 'Stephen',
    phone: '0798302214',
    lastUpdate: new Date(),
    eventId: 502,
  },
  {
    id: 6,
    status: IconName.Consultation,
    references: 'C.A.Female-0640',
    start: new Date(),
    end: new Date(),
    svcStaff: 'Wenger',
    services: '08-Balayage Natural S4_027',
    budget: 110.25,
    lastName: 'A.Female',
    firstName: 'Consultation',
    phone: '0798302214',
    lastUpdate: new Date(),
    eventId: 640,
  },
  {
    id: 7,
    status: IconName.Other,
    references: 'S.Pye-0503',
    start: new Date(),
    end: new Date(),
    svcStaff: 'Khan',
    services: '08-Balayage Natural S4_027',
    budget: 48,
    lastName: 'A.Female',
    firstName: 'Consultation',
    phone: '0798302214',
    lastUpdate: new Date(),
    eventId: 503,
  },
  {
    id: 8,
    status: IconName.Paid,
    references: 'S.Pye-0504',
    start: new Date(),
    end: new Date(),
    svcStaff: 'Robinson',
    services: '06-Ladies Blow Dry S1_021',
    budget: 15.49,
    lastName: 'A.Female',
    firstName: 'Consultation',
    phone: '0798302214',
    lastUpdate: new Date(),
    eventId: 504,
  },
  {
    id: 9,
    status: IconName.Reserved,
    references: 'S.Pye-0504',
    start: new Date(),
    end: new Date(),
    svcStaff: 'Robinson',
    services: '06-Ladies Blow Dry S1_021',
    budget: 15.49,
    lastName: 'A.Female',
    firstName: 'Consultation',
    phone: '0798302214',
    lastUpdate: new Date(),
    eventId: 505,
  },
  {
    id: 10,
    status: IconName.Unavailable,
    references: 'S.Pye-0504',
    start: new Date(),
    end: new Date(),
    svcStaff: 'Robinson',
    services: '06-Ladies Blow Dry S1_021',
    budget: 15.49,
    lastName: 'A.Female',
    firstName: 'Consultation',
    phone: '0798302214',
    lastUpdate: new Date(),
    eventId: 506,
  },
];
