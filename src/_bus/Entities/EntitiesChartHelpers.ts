import { addWeeks, weekInYear, addMonths, addDays, addYears, isEqualDate } from '@progress/kendo-date-math';
// Types
import { DateRange } from './EntitiesChartTypes';
import { StaffDataItem } from '../_Staff/StaffTypes';
import { AppointmentDataItem, StatusNames } from '../_Appointments/AppointmentsTypes';
import { ParseRepeatType } from '../../_sections/Scheduler/SchedulerItems/SchedulerForm/SchedulerFormTypes';
// Constants
import { WEEK_RANGE, START_PREV_WEEKS_DATE, MONTH_RANGE, START_PREV_MONTH_DATE, Months, NEVER_END_RECURRENCE_MONTH_AMOUNT } from '../Constants';
// Helpers
import { parseRuleStrInValue } from '../../_sections/Scheduler/SchedulerItems/SchedulerForm/SchedulerFormHelpers';
// Instruments
import { RepeatTypesMapToDayRange } from '../../_sections/Scheduler/SchedulerItems/SchedulerForm/SchedulerFormInstruments';

const getWeekPointsAndNumbers = (weekRange: number, startDateWeekRange: Date): [DateRange[], number[]] => {
  let points: DateRange[] = [];
  let weekNumbers: number[] = [];

  for (let i = 0; i < weekRange; i++) {
    const start = addWeeks(startDateWeekRange, i);
    const end = addWeeks(startDateWeekRange, i + 1);
    const weekNumber = weekInYear(start);
    points = [...points, { start, end, weekNumber }];
    weekNumbers = [...weekNumbers, weekNumber];
  }

  return [points, weekNumbers];
};

export const [WeekPoints, WeekNumbers] = getWeekPointsAndNumbers(WEEK_RANGE, START_PREV_WEEKS_DATE);

const getMontPointsAndNames = (monthRange: number, startDate: Date): [DateRange[], string[]] => {
  let points: DateRange[] = [];
  let monthNames: string[] = [];

  for (let i = 0; i < monthRange; i++) {
    const start = addMonths(startDate, i);
    const end = addMonths(startDate, i + 1);
    points = [...points, { start, end }];
    monthNames = [...monthNames, Months[start.getMonth()]];
  }

  return [points, monthNames];
};

export const [MonthPoints, MonthNames] = getMontPointsAndNames(MONTH_RANGE, START_PREV_MONTH_DATE);

export const isExcludeAppointment = (status: StatusNames) =>
  status === StatusNames.Cancelled ||
  status === StatusNames.Checking ||
  status === StatusNames.Closed ||
  status === StatusNames.Unavailable ||
  status === StatusNames.Other;

export const getPercentFromFull = (part: number) => (full: number) => (part !== 0 && full !== 0 ? +((part * 100) / full).toFixed(2) : 0);

const parseRecurrenceRule = (rule: string) => {
  const [repeatType, intervalStr, countOrUntil] = rule.split(';') as [ParseRepeatType, string, string | undefined];
  const dayRange = RepeatTypesMapToDayRange[repeatType];
  const interval = +parseRuleStrInValue(intervalStr);
  const count = countOrUntil && countOrUntil.includes(`COUNT`) ? +parseRuleStrInValue(countOrUntil) : null;
  const until = countOrUntil && countOrUntil.includes(`UNTIL`) ? new Date(parseRuleStrInValue(countOrUntil)) : null;

  return { dayRange, interval, count, until };
};

const generateRecAppointments = (appointment: AppointmentDataItem) => (dayRange: number) => (interval: number) => (count: number) => {
  const recAppointments: AppointmentDataItem[] = [];
  const originalStart = appointment.Start;
  const originalEnd = appointment.End;
  const isMonthlyRecurrence = dayRange === 30;
  const isYearlyRecurrence = dayRange === 365;

  for (let i = 1; i < count; i++) {
    const countDays = i * interval * dayRange;
    const nextDayStart = addDays(originalStart, countDays);
    const nextDayEnd = addDays(originalEnd, countDays);
    const nextMonthStart = addMonths(originalStart, i * interval);
    const nextMonthEnd = addMonths(originalEnd, i * interval);
    const nextYearsStart = addYears(originalStart, i * interval);
    const nextYearsEnd = addYears(originalEnd, i * interval);
    const Start = !isMonthlyRecurrence && !isYearlyRecurrence ? nextDayStart : isMonthlyRecurrence ? nextMonthStart : nextYearsStart;
    const End = !isMonthlyRecurrence && !isYearlyRecurrence ? nextDayEnd : isMonthlyRecurrence ? nextMonthEnd : nextYearsEnd;

    const isExceptionDate = appointment.RecException ? appointment.RecException.find((exception) => isEqualDate(Start, exception)) : false;

    if (isExceptionDate) {
      continue;
    }

    const recurrenceAppointment: AppointmentDataItem = {
      ...appointment,
      Start,
      End,
      EventDate: Start.toISOString(),
      EndDate: End.toISOString(),
      MetroRRule: null,
      MetroRecException: null,
    };
    recAppointments.push(recurrenceAppointment);
  }

  return recAppointments;
};

export const getRecurrenceAppointments = (appointment: AppointmentDataItem): AppointmentDataItem[] => {
  if (!appointment.MetroRRule) return [];
  const { dayRange, interval, count, until } = parseRecurrenceRule(appointment.MetroRRule);

  if (count) {
    const res = generateRecAppointments(appointment)(dayRange)(interval)(count);
    console.log(`res`, res);
    return res;
  }

  if (until) {
    const rangeDays = (until.getTime() - appointment.Start.getTime()) / 1000 / 60 / 60 / 24;
    const countRec = rangeDays / interval / dayRange;

    const res = generateRecAppointments(appointment)(dayRange)(interval)(countRec);
    console.log(`res`, res);
    return res;
  }

  const neverEndUntil = addMonths(appointment.Start, NEVER_END_RECURRENCE_MONTH_AMOUNT);
  const rangeDays = (neverEndUntil.getTime() - appointment.Start.getTime()) / 1000 / 60 / 60 / 24;
  const countRec = rangeDays / interval / dayRange;

  const res = generateRecAppointments(appointment)(dayRange)(interval)(countRec);
  console.log(`res`, res);
  return res;
};

const calcAppointmentsDurationSalesPerStaffMember = (staffMemberID: number, appointments: AppointmentDataItem[]) => {
  return appointments.reduce(
    (acc, { LookupHR01teamId, Duration, ServiceCharge, fAllDayEvent, AppointmentStatus }) => {
      if (LookupHR01teamId === staffMemberID && !isExcludeAppointment(AppointmentStatus)) {
        return {
          amountAppointment: acc.amountAppointment + (fAllDayEvent ? 0 : 1),
          staffMemberAppointmentDurationInHours: acc.staffMemberAppointmentDurationInHours + (fAllDayEvent ? 0 : Duration / 60 / 60),
          staffMemberSales: acc.staffMemberSales + ServiceCharge,
        };
      }

      return acc;
    },
    { amountAppointment: 0, staffMemberAppointmentDurationInHours: 0, staffMemberSales: 0 }
  );
};

export const calcAppointmentsDurationSalesPerWeekPerStaffMember = (
  { StaffWeekHours, ID }: StaffDataItem,
  sliceAppointmentsInWeekRange: AppointmentDataItem[],
  totalAppointmentSales: number
) => {
  const staffMemberWorkWeekHoursInWeekRange = (StaffWeekHours ?? 0) * WEEK_RANGE;
  const { amountAppointment, staffMemberAppointmentDurationInHours, staffMemberSales } = calcAppointmentsDurationSalesPerStaffMember(ID, sliceAppointmentsInWeekRange);
  const averageAppointmentsPerWeekPerStaffMember = +(amountAppointment / WEEK_RANGE).toFixed(2);
  const percentEmploymentPerWeekPerStaffMember = getPercentFromFull(staffMemberAppointmentDurationInHours / WEEK_RANGE)(StaffWeekHours ?? 0);
  const averageSalesPerWeekPerStaffMember = +(staffMemberSales / WEEK_RANGE).toFixed(2);
  const percentStaffMemberSaleOfTotalSales = getPercentFromFull(staffMemberSales)(totalAppointmentSales);

  return {
    averageAppointmentsPerWeekPerStaffMember,
    percentEmploymentPerWeekPerStaffMember,
    averageSalesPerWeekPerStaffMember,
    percentStaffMemberSaleOfTotalSales,
    staffMemberSales,
    staffMemberWorkWeekHoursInWeekRange,
    staffMemberAppointmentDurationInHours,
  };
};
