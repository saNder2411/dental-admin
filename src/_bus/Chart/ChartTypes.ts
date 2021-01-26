// Types
import { AppointmentDataItem } from '../_Appointments/AppointmentsTypes';

export interface WeekPoint {
  start: Date;
  end: Date;
}

export interface SeriesForChart<T> {
  name: string;
  data: T;
  color?: string;
}

export interface AppointmentsDataForChartState {
  sliceAppointmentsInLastWeekRange: AppointmentDataItem[];
  totalAppointmentHours: number;
  totalAppointmentSales: number;
  activeCustomersIDs: number[];
  appointmentReservations: number;
  appointmentBookings: number;
  appointmentAttended: number;
  paymentCompleted: number;
}
