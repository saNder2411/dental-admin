export interface DateRange {
  start: Date;
  end: Date;
}

export interface SeriesForChart<T> {
  name: string;
  data: T;
  color?: string;
  percent?: number;
}
