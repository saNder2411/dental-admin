import { addWeeks, weekInYear, addMonths, addDays, addYears, isEqualDate } from '@progress/kendo-date-math';
// Types
import { DateRange } from './EntitiesChartTypes';
import { StaffDataItem } from '../_Staff/StaffTypes';
import { AppointmentDataItem, StatusNames } from '../_Appointments/AppointmentsTypes';
import { ParseRepeatType } from '../../_sections/Scheduler/SchedulerItems/SchedulerForm/SchedulerFormTypes';
// Constants
import { WEEK_RANGE, START_PREV_WEEKS_DATE, MONTH_RANGE, DEFAULT_WORK_WEEK_HOURS, START_PREV_MONTH_DATE, Months, NEVER_END_RECURRENCE_MONTH_AMOUNT } from '../Constants';
// Helpers
import { parseRuleStrInValue } from '../../_sections/Scheduler/SchedulerItems/SchedulerForm/SchedulerFormHelpers';
// Instruments
import { ParseRepeatTypes, RepeatTypesMapToDayRange } from '../../_sections/Scheduler/SchedulerItems/SchedulerForm/SchedulerFormInstruments';

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

export const transformAppointmentsDataToAppointmentsWhithRecurrningItems = (appointmentsData: AppointmentDataItem[]) => {};

export const parseRecurrenceRule = (appointment: AppointmentDataItem) => {
  if (!appointment.MetroRRule) return;

  const [repeatType, interval, countOrUntilOrByDayOrByMonthDayOrByMonth, byDayOrByMonthDayOrBySetPos, lastByDayOrByMonthDayOrBySetPos] = appointment.MetroRRule.split(
    ';'
  ) as [ParseRepeatType, string, string | undefined, string | undefined, string | undefined];

  const dayRange = RepeatTypesMapToDayRange[repeatType];
  const intervalNum = +parseRuleStrInValue(interval);

  const count =
    countOrUntilOrByDayOrByMonthDayOrByMonth && countOrUntilOrByDayOrByMonthDayOrByMonth.includes(`COUNT`)
      ? +parseRuleStrInValue(countOrUntilOrByDayOrByMonthDayOrByMonth)
      : null;
  const until =
    countOrUntilOrByDayOrByMonthDayOrByMonth && countOrUntilOrByDayOrByMonthDayOrByMonth.includes(`UNTIL`)
      ? new Date(parseRuleStrInValue(countOrUntilOrByDayOrByMonthDayOrByMonth))
      : null;
  const byDay =
    countOrUntilOrByDayOrByMonthDayOrByMonth && countOrUntilOrByDayOrByMonthDayOrByMonth.includes(`BYDAY`)
      ? parseRuleStrInValue(countOrUntilOrByDayOrByMonthDayOrByMonth)
      : byDayOrByMonthDayOrBySetPos && byDayOrByMonthDayOrBySetPos.includes(`BYDAY`)
      ? parseRuleStrInValue(byDayOrByMonthDayOrBySetPos)
      : lastByDayOrByMonthDayOrBySetPos && lastByDayOrByMonthDayOrBySetPos.includes(`BYDAY`)
      ? parseRuleStrInValue(lastByDayOrByMonthDayOrBySetPos)
      : null;
  const byMonthDay =
    countOrUntilOrByDayOrByMonthDayOrByMonth && countOrUntilOrByDayOrByMonthDayOrByMonth.includes(`BYMONTHDAY`)
      ? +parseRuleStrInValue(countOrUntilOrByDayOrByMonthDayOrByMonth)
      : byDayOrByMonthDayOrBySetPos && byDayOrByMonthDayOrBySetPos.includes(`BYMONTHDAY`)
      ? +parseRuleStrInValue(byDayOrByMonthDayOrBySetPos)
      : repeatType === ParseRepeatTypes.Yearly && lastByDayOrByMonthDayOrBySetPos && lastByDayOrByMonthDayOrBySetPos.includes(`BYMONTHDAY`)
      ? +parseRuleStrInValue(lastByDayOrByMonthDayOrBySetPos)
      : null;
  const byMonth =
    repeatType === ParseRepeatTypes.Yearly && countOrUntilOrByDayOrByMonthDayOrByMonth && countOrUntilOrByDayOrByMonthDayOrByMonth.includes(`BYMONTH`)
      ? +parseRuleStrInValue(countOrUntilOrByDayOrByMonthDayOrByMonth)
      : repeatType === ParseRepeatTypes.Yearly && byDayOrByMonthDayOrBySetPos && byDayOrByMonthDayOrBySetPos.includes(`BYMONTH`)
      ? +parseRuleStrInValue(byDayOrByMonthDayOrBySetPos)
      : null;
  const bySetPos =
    byDayOrByMonthDayOrBySetPos && byDayOrByMonthDayOrBySetPos.includes(`BYSETPOS`)
      ? +parseRuleStrInValue(byDayOrByMonthDayOrBySetPos)
      : lastByDayOrByMonthDayOrBySetPos && lastByDayOrByMonthDayOrBySetPos.includes(`BYSETPOS`)
      ? +parseRuleStrInValue(lastByDayOrByMonthDayOrBySetPos)
      : null;

  const isNeverEnd = !count && !until;

  const repeatOptions = {
    dayRange,
    intervalNum,
    count,
    until,
    isNeverEnd,
    byDay,
    byMonthDay,
    byMonth,
    bySetPos,
    exceptions: appointment.MetroRecException,
  };

  const recurrenceAppointments: AppointmentDataItem[] = [];
  const originalStart = appointment.Start;
  const originalEnd = appointment.End;
  const isMonthlyRecurrence = dayRange === 30;
  const isYearlyRecurrence = dayRange === 365;

  if (count) {
    for (let i = 1; i < count; i++) {
      const countDays = i * intervalNum * dayRange;
      const nextDayStart = addDays(originalStart, countDays);
      const nextDayEnd = addDays(originalEnd, countDays);
      const nextMonthStart = addMonths(originalStart, i * intervalNum);
      const nextMonthEnd = addMonths(originalEnd, i * intervalNum);
      const nextYearsStart = addYears(originalStart, i * intervalNum);
      const nextYearsEnd = addYears(originalEnd, i * intervalNum);
      const Start = !isMonthlyRecurrence && !isYearlyRecurrence ? nextDayStart : isMonthlyRecurrence ? nextMonthStart : nextYearsStart;
      const End = !isMonthlyRecurrence && !isYearlyRecurrence ? nextDayEnd : isMonthlyRecurrence ? nextMonthEnd : nextYearsEnd;

      const isExceptionDate = appointment.MetroRecException ? appointment.MetroRecException.find((exception) => isEqualDate(Start, exception)) : false;

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
      recurrenceAppointments.push(recurrenceAppointment);
    }
  }

  if (until) {
    const rangeDays = (until.getTime() - appointment.Start.getTime()) / 1000 / 60 / 60 / 24;
    const countRec = rangeDays / intervalNum / dayRange;

    for (let i = 1; i < countRec; i++) {
      const countDays = i * intervalNum * dayRange;
      const nextDayStart = addDays(originalStart, countDays);
      const nextDayEnd = addDays(originalEnd, countDays);
      const nextMonthStart = addMonths(originalStart, i * intervalNum);
      const nextMonthEnd = addMonths(originalEnd, i * intervalNum);
      const nextYearsStart = addYears(originalStart, i * intervalNum);
      const nextYearsEnd = addYears(originalEnd, i * intervalNum);
      const Start = !isMonthlyRecurrence && !isYearlyRecurrence ? nextDayStart : isMonthlyRecurrence ? nextMonthStart : nextYearsStart;
      const End = !isMonthlyRecurrence && !isYearlyRecurrence ? nextDayEnd : isMonthlyRecurrence ? nextMonthEnd : nextYearsEnd;

      const recurrenceAppointment: AppointmentDataItem = {
        ...appointment,
        Start,
        End,
        EventDate: Start.toISOString(),
        EndDate: End.toISOString(),
        MetroRRule: null,
        MetroRecException: null,
      };
      recurrenceAppointments.push(recurrenceAppointment);
    }
  }

  if (isNeverEnd) {
    const until = addMonths(appointment.Start, NEVER_END_RECURRENCE_MONTH_AMOUNT);
    const rangeDays = (until.getTime() - appointment.Start.getTime()) / 1000 / 60 / 60 / 24;
    const countRec = rangeDays / intervalNum / dayRange;

    for (let i = 1; i < countRec; i++) {
      const countDays = i * intervalNum * dayRange;
      const nextDayStart = addDays(originalStart, countDays);
      const nextDayEnd = addDays(originalEnd, countDays);
      const nextMonthStart = addMonths(originalStart, i * intervalNum);
      const nextMonthEnd = addMonths(originalEnd, i * intervalNum);
      const nextYearsStart = addYears(originalStart, i * intervalNum);
      const nextYearsEnd = addYears(originalEnd, i * intervalNum);
      const Start = !isMonthlyRecurrence && !isYearlyRecurrence ? nextDayStart : isMonthlyRecurrence ? nextMonthStart : nextYearsStart;
      const End = !isMonthlyRecurrence && !isYearlyRecurrence ? nextDayEnd : isMonthlyRecurrence ? nextMonthEnd : nextYearsEnd;

      const recurrenceAppointment: AppointmentDataItem = {
        ...appointment,
        Start,
        End,
        EventDate: Start.toISOString(),
        EndDate: End.toISOString(),
        MetroRRule: null,
        MetroRecException: null,
      };
      recurrenceAppointments.push(recurrenceAppointment);
    }
  }

  console.log(`repeatType ----->`, repeatType, interval, countOrUntilOrByDayOrByMonthDayOrByMonth, byDayOrByMonthDayOrBySetPos, lastByDayOrByMonthDayOrBySetPos);
  console.log(`RepeatOptions`, repeatOptions);
  console.log(`recurrenceAppointments`, recurrenceAppointments);
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

const calcAppointmentsDurationSalesPerStaffMember = (staffMemberID: number, appointments: AppointmentDataItem[]) => {
  return appointments.reduce(
    (acc, { LookupHR01teamId, Duration, ServiceCharge, fAllDayEvent, AppointmentStatus }) => {
      if (LookupHR01teamId === staffMemberID && AppointmentStatus !== StatusNames.Cancelled && AppointmentStatus !== StatusNames.Consultation) {
        return {
          ...acc,
          amountAppointment: acc.amountAppointment + (fAllDayEvent ? 0 : 1),
          durationInHours: acc.durationInHours + (fAllDayEvent ? 0 : Duration / 60 / 60),
          staffMemberSales: acc.staffMemberSales + ServiceCharge,
        };
      }

      return acc;
    },
    { amountAppointment: 0, durationInHours: 0, staffMemberSales: 0 }
  );
};

export const calcAppointmentsDurationSalesPerWeekPerStaffMember = (
  { StaffWeekHours, ID }: StaffDataItem,
  sliceAppointmentsInWeekRange: AppointmentDataItem[],
  totalAppointmentSales: number
) => {
  const staffMemberWorkWeekHours = (StaffWeekHours ?? DEFAULT_WORK_WEEK_HOURS) * WEEK_RANGE;
  const { amountAppointment, durationInHours, staffMemberSales } = calcAppointmentsDurationSalesPerStaffMember(ID, sliceAppointmentsInWeekRange);
  const averageAppointmentsPerWeekPerStaffMember = +(amountAppointment / WEEK_RANGE).toFixed(2);
  const percentEmploymentPerWeekPerStaffMember = Math.round(((durationInHours / WEEK_RANGE) * 100) / staffMemberWorkWeekHours);
  const averageSalesPerWeekPerStaffMember = +(staffMemberSales / WEEK_RANGE).toFixed(2);
  const percentStaffMemberSaleOfTotalSales = staffMemberSales !== 0 ? Math.round((staffMemberSales * 100) / totalAppointmentSales) : 0;

  return {
    averageAppointmentsPerWeekPerStaffMember,
    percentEmploymentPerWeekPerStaffMember,
    averageSalesPerWeekPerStaffMember,
    percentStaffMemberSaleOfTotalSales,
    staffMemberSales,
    staffMemberWorkWeekHours,
    durationInHours,
  };
};
