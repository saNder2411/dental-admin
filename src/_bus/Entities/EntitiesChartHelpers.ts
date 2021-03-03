import { addWeeks, weekInYear, addMonths } from '@progress/kendo-date-math';
// Types
import { DateRange } from './EntitiesChartTypes';
import { StaffDataItem } from '../_Staff/StaffTypes';
import { AppointmentDataItem, StatusNames } from '../_Appointments/AppointmentsTypes';
import { ParseRepeatType } from '../../_sections/Scheduler/SchedulerItems/SchedulerForm/SchedulerFormTypes';
// Constants
import { WEEK_RANGE, START_PREV_WEEKS_DATE, MONTH_RANGE, DEFAULT_WORK_WEEK_HOURS, START_PREV_MONTH_DATE, Months } from '../Constants';
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
      ? parseRuleStrInValue(byDayOrByMonthDayOrBySetPos)
      : lastByDayOrByMonthDayOrBySetPos && lastByDayOrByMonthDayOrBySetPos.includes(`BYSETPOS`)
      ? parseRuleStrInValue(lastByDayOrByMonthDayOrBySetPos)
      : null;

  const isNeverEnd = !count && !until;

  const repeatOptions = {
    dayRange: RepeatTypesMapToDayRange[repeatType],
    interval: +parseRuleStrInValue(interval),
    count,
    until,
    isNeverEnd,
    byDay,
    byMonthDay,
    byMonth,
    bySetPos,
    exceptions: appointment.MetroRecException,
  };

  

  console.log(`repeatType ----->`, repeatType, interval, countOrUntilOrByDayOrByMonthDayOrByMonth, byDayOrByMonthDayOrBySetPos, lastByDayOrByMonthDayOrBySetPos);
  console.log(`RepeatOptions`, repeatOptions);
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
