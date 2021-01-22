export interface WeekPoint {
  start: Date;
  end: Date;
}

export interface ChartItemProps {
  className?: string;
}

export interface AppointmentPerStaffSeries {
  name: string;
  data: number[];
}
