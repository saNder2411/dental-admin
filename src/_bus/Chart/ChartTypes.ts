// Types
import { AppointmentDataItem } from '../_Appointments/AppointmentsTypes';

export interface WeekPoint {
  start: Date;
  end: Date;
}

export interface AppointmentPerStaffSeries {
  name: string;
  data: number[];
}

export interface AppointmentsDataForChartState {
  sliceAppointmentsInLastWeekRange: AppointmentDataItem[];
  totalAppointmentHours: number;
}
