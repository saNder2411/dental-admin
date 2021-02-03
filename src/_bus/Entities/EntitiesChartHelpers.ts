import { addWeeks, weekInYear } from '@progress/kendo-date-math';
// Types
import { WeekPoint } from './EntitiesChartTypes';
import { StaffDataItem } from '../_Staff/StaffTypes';
import { AppointmentDataItem } from '../_Appointments/AppointmentsTypes';
// Constants
import { WEEK_RANGE, PREV_WEEKS, DEFAULT_WORK_WEEK_HOURS } from '../Constants';

const getWeekPointsAndNumbers = (weekRange: number, startDate: Date): [WeekPoint[], number[]] => {
  let points: WeekPoint[] = [];
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

export const [WeekPoints, WeekNumbers] = getWeekPointsAndNumbers(WEEK_RANGE, PREV_WEEKS);

// const calcStaffWorkDayHours = (startWorkDay: string | null, endWorkDay: string | null) => {
//   if (!startWorkDay || !endWorkDay) return 0;
//   const now = new Date();
//   const year = now.getFullYear();
//   const swapMonth = now.getMonth() + 1;
//   const month = swapMonth < 10 ? `0${swapMonth}` : swapMonth;
//   const swapDate = now.getDate();
//   const date = swapDate < 10 ? `0${swapDate}` : swapDate;
//   const parseStartDayDate = Date.parse(`${year}-${month}-${date}T${startWorkDay}`);
//   const parseEndDayDate = Date.parse(`${year}-${month}-${date}T${endWorkDay}`);

//   const workHours = (parseEndDayDate - parseStartDayDate) / 1000 / 60 / 60;

//   return workHours;
// };

// export const calcStaffMemberWorkWeekHours = (staffDataItem: StaffDataItem | undefined) => {
//   if (!staffDataItem) return 0;

//   let weekHours = 0;
//   for (let i = 1; i <= 7; i++) {
//     weekHours += calcStaffWorkDayHours(
//       staffDataItem[`WorkingDayStart0${i}` as keyof StaffDataItem] as string,
//       staffDataItem[`WorkingDayEnd0${i}` as keyof StaffDataItem] as string
//     );
//   }

//   return weekHours;
// };

const calcAppointmentsDurationSalesPerStaffMember = (staffMemberID: number, appointments: AppointmentDataItem[]) => {
  return appointments.reduce<{ amountAppointment: number; durationInHours: number; sales: number }>(
    (acc, appointment) => {
      if (appointment.LookupHR01teamId === staffMemberID) {
        return {
          ...acc,
          amountAppointment: acc.amountAppointment + 1,
          durationInHours: acc.durationInHours + appointment.Duration / 60 / 60,
          sales: acc.sales + appointment.ServiceCharge,
        };
      }

      return acc;
    },
    { amountAppointment: 0, durationInHours: 0, sales: 0 }
  );
};

export const calcAppointmentsDurationSalesPerWeekPerStaffMember = (
  staffDataItem: StaffDataItem,
  sliceAppointmentsInWeekRange: AppointmentDataItem[]
) => {
  const staffMemberWorkWeekHours = staffDataItem.StaffWeekHours ?? DEFAULT_WORK_WEEK_HOURS;
  const { amountAppointment, durationInHours, sales } = calcAppointmentsDurationSalesPerStaffMember(staffDataItem.ID, sliceAppointmentsInWeekRange);
  const averageAppointmentsPerWeekPerStaffMember = +(amountAppointment / WEEK_RANGE).toFixed(2);
  const percentEmploymentPerWeekPerStaffMember = Math.round(((durationInHours / WEEK_RANGE) * 100) / staffMemberWorkWeekHours);
  const averageSalesPerWeekPerStaffMember = +(sales / WEEK_RANGE).toFixed(2);

  return {
    averageAppointmentsPerWeekPerStaffMember,
    percentEmploymentPerWeekPerStaffMember,
    averageSalesPerWeekPerStaffMember,
    staffMemberWorkWeekHours,
  };
};
