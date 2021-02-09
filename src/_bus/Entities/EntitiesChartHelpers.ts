import { addWeeks, weekInYear, addMonths } from '@progress/kendo-date-math';
// Types
import { DateRange } from './EntitiesChartTypes';
import { StaffDataItem } from '../_Staff/StaffTypes';
import { AppointmentDataItem } from '../_Appointments/AppointmentsTypes';
// Constants
import { WEEK_RANGE, START_PREV_WEEKS_DATE, DEFAULT_WORK_WEEK_HOURS, MONTH_RANGE, START_PREV_MONTH_DATE, Months } from '../Constants';

const getWeekPointsAndNumbers = (weekRange: number, startDate: Date): [DateRange[], number[]] => {
  let points: DateRange[] = [];
  let weekNumbers: number[] = [];

  for (let i = 0; i < weekRange; i++) {
    const start = addWeeks(startDate, i);
    const end = addWeeks(startDate, i + 1);
    const weekNumber = weekInYear(start);
    points = [...points, { start, end }];
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

const calcAppointmentsDurationSalesPerStaffMember = (staffMemberID: number, appointments: AppointmentDataItem[]) => {
  return appointments.reduce(
    (acc, appointment) => {
      if (appointment.LookupHR01teamId === staffMemberID) {
        return {
          ...acc,
          amountAppointment: acc.amountAppointment + 1,
          durationInHours: acc.durationInHours + appointment.Duration / 60 / 60,
          staffMemberSales: acc.staffMemberSales + appointment.ServiceCharge,
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
  const staffMemberWorkWeekHours = StaffWeekHours ?? DEFAULT_WORK_WEEK_HOURS;
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
  };
};
