export interface DateRange {
  start: Date;
  end: Date;
  weekNumber?: number;
}

export interface SeriesForChart<T> {
  name: string;
  data: T;
  color?: string;
  percent?: number;
}
