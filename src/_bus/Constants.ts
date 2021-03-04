import { addWeeks, addMonths, firstDayOfMonth, addDays, addYears } from '@progress/kendo-date-math';
// Types
import { StatusNames } from './_Appointments/AppointmentsTypes';
import { CustomerDataItem } from './_Customers/CustomersTypes';

const NOW = new Date(new Date().setHours(4, 0, 0));
export const MONDAY_CURRENT_WEEK = addDays(NOW, -(NOW.getDay() - 1));
export const WEEK_RANGE = 12;
export const MONTH_RANGE = 3;
export const START_PREV_MONTH_DATE = addMonths(firstDayOfMonth(NOW), -MONTH_RANGE);
export const START_PREV_WEEKS_DATE = addWeeks(MONDAY_CURRENT_WEEK, -WEEK_RANGE);
export const END_NEXT_WEEKS_DATE = addWeeks(MONDAY_CURRENT_WEEK, WEEK_RANGE);
export const PREV_WEEK = addWeeks(MONDAY_CURRENT_WEEK, -1);
export const DEFAULT_WORK_WEEK_HOURS = 40;
export const LAST_12_MONTHS_DATE = addYears(MONDAY_CURRENT_WEEK, -1);
export const NEVER_END_RECURRENCE_MONTH_AMOUNT = 36;

export const statusNameList = Object.values(StatusNames);

export const SeriesColors = [
  `#dc6a60`,
  `#eed15d`,
  `#7fc94b`,
  `#4cabbb`,
  `#3f6fd9`,
  `#9e4daf`,
  `LightSalmon`,
  `PeachPuff`,
  `Fuchsia`,
  `Aqua`,
  `RoyalBlue`,
  `Plum`,
];

export const Months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];

export const getDefaultConsultationCustomer = (Id: number): CustomerDataItem => ({
  Id,
  Title: 'Consultation',
  FirstName: `Female`,
  FullName: 'Female Consultation',
  CellPhone: '',
  Email: '',
  Gender: '(1) Female' as const,
  ClientPhoto: null,
  ID: Id,
  Modified: new Date().toISOString(),
  LookupMultiHR01teamId: { results: [] },
  LookupMultiHR03eventsId: { results: [] },

  ClientPhotoUrl: '',
});
