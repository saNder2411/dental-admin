// Types
import { StatusNames } from '../../../../_bus/_Appointments/AppointmentsTypes';

export const StatusDropDownListData = Object.values(StatusNames);

export const RepeatTypes = {
  Never: null,
  Daily: 'FREQ=DAILY' as const,
  Weekly: 'FREQ=WEEKLY' as const,
  Monthly: 'FREQ=MONTHLY' as const,
  Yearly: 'FREQ=YEARLY' as const,
};

export const RepeatDropDownListData = Object.entries(RepeatTypes).map(([text, value]) => ({ text, value }));

export const EndRepeatTypes = {
  Never: 'INTERVAL' as const,
  After: 'COUNT' as const,
  On: 'UNTIL' as const,
};

export const EndRepeatRadioGroupData = Object.entries(EndRepeatTypes).map(([label, value]) => ({ label, value }));

export const WeekdayTypes = {
  Mon: 'MO' as const,
  Tue: 'TU' as const,
  Wed: 'WE' as const,
  Thu: 'TH' as const,
  Fri: 'FR' as const,
  Sat: 'SA' as const,
  Sun: 'SU' as const,
};

export const WeekdayButtonGroupData = Object.entries(WeekdayTypes).map(([label, value]) => ({ label, value, isSelected: false }));

export const MonthlyTypes = {
  Day: 'BYMONTHDAY' as const,
  Week: 'BYDAY' as const,
};

export const RepeatOnMonthlyRadioGroupData = Object.entries(MonthlyTypes).map(([label, value]) => ({ label, value }));

export const WeekNumberTypes = {
  First: 1 as const,
  Second: 2 as const,
  Third: 3 as const,
  Fourth: 4 as const,
  Last: -1 as const,
};

export const WeekNumberDropDownListData = Object.entries(WeekNumberTypes).map(([text, value]) => ({ text, value }));

export const MonthlyDayTypes = {
  Day: 'SU,MO,TU,WE,TH,FR,SA' as const,
  Weekday: 'MO,TU,WE,TH,FR' as const,
  'Weekend Day': 'SU,SA' as const,
  Sunday: 'SU' as const,
  Monday: 'MO' as const,
  Tuesday: 'TU' as const,
  Wednesday: 'WE' as const,
  Thursday: 'TH' as const,
  Friday: 'FR' as const,
  Saturday: 'SA' as const,
};

export const MonthlyDayTypeDropDownListData = Object.entries(MonthlyDayTypes).map(([text, value]) => ({ text, value }));

export const YearlyTypes = {
  Day: 'BYMONTHDAY' as const,
  Week: 'BYDAY' as const,
};

export const RepeatOnYearlyRadioGroupData = Object.entries(MonthlyTypes).map(([, value]) => ({ label: '', value }));

export const MonthNameTypes = {
  January: 1 as const,
  February: 2 as const,
  March: 3 as const,
  April: 4 as const,
  May: 5 as const,
  June: 6 as const,
  July: 7 as const,
  August: 8 as const,
  September: 9 as const,
  October: 10 as const,
  November: 11 as const,
  December: 12 as const,
};

export const YearlyMonthTypeDropDownListData = Object.entries(MonthNameTypes).map(([text, value]) => ({ text, value }));

export const GendersRadioGroupData = [
  { label: 'Male', value: '(2) Male' },
  { label: 'Female', value: '(1) Female' },
];
