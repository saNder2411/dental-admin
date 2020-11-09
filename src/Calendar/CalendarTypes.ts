import { StatusNames } from '../Agenda/AgendaTypes';

export interface CalendarDataItem {
  staff: string;
  start: Date;
  end: Date;
  orderID: number;
  refID: string;
  status: StatusNames;
  dentalStatus: StatusNames;
  mobilePhone: string;
  email: string;
  notes: string;
  description: string;
  employeeID: number;
  teamID: number;
  customer: string;
  firstName: string;
  lastName: string;
  isAllDay: boolean;
  repeat: string;
  recurrenceId?: undefined | number;
  recurrenceRule?: null | string;
}
