import { addWeeks, weekInYear } from '@progress/kendo-date-math';
// Types
import { WeekPoint, AppointmentPerStaffSeries } from './ChartTypes';
import { StaffDataItem } from '../../_bus/_Staff/StaffTypes';
import { AppointmentDataItem } from '../../_bus/_Appointments/AppointmentsTypes';
import { ServiceDataItem, ContentTypes } from '../../_bus/_Services/ServicesTypes';
// Constants
import { WEEK_RANGE, PREV_WEEKS } from '../../_bus/Constants';

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

export const getAppointmentSalesDataForChart = (appointments: AppointmentDataItem[], servicesById: { [key: string]: ServiceDataItem }) => {
  let totalChartData: number[] = [];
  let servicesChartData: number[] = [];
  let productChartData: number[] = [];

  WeekPoints.forEach(({ start, end }) => {
    let totalSum = 0;
    let serviceSum = 0;
    let productSum = 0;

    const sliceAppointments = appointments.filter(({ Start, End }) => Start.getTime() >= start.getTime() && End.getTime() < end.getTime());

    sliceAppointments.forEach((appointment) => {
      totalSum += appointment.ServiceCharge;
      appointment.LookupMultiBP01offeringsId.results.forEach((Id) => {
        const { Amount = 0, ContentTypeId = '' } = servicesById[Id] ?? {};
        ContentTypeId === ContentTypes.Services ? (serviceSum += Amount) : (productSum += Amount);
      });
    });

    totalChartData = [...totalChartData, totalSum];
    servicesChartData = [...servicesChartData, serviceSum];
    productChartData = [...productChartData, productSum];
  });

  return { totalChartData, servicesChartData, productChartData };
};

const calcStaffWorkDayHours = (startWorkDay: string | null, endWorkDay: string | null) => {
  if (!startWorkDay || !endWorkDay) return 0;
  const now = new Date();
  const year = now.getFullYear();
  const swapMonth = now.getMonth() + 1;
  const month = swapMonth < 10 ? `0${swapMonth}` : swapMonth;
  const date = now.getDate();

  const delta = Date.parse(`${year}-${month}-${date}T${endWorkDay}`) - Date.parse(`${year}-${month}-${date}T${startWorkDay}`);

  return delta / 1000 / 60 / 60;
};

export const calcStaffMemberWorkWeekHours = (staffDataItem: StaffDataItem | undefined) => {
  if (!staffDataItem) return 0;

  let weekHours = 0;
  for (let i = 1; i <= 7; i++) {
    weekHours += calcStaffWorkDayHours(
      staffDataItem[`WorkingDayStart0${i}` as keyof StaffDataItem] as string,
      staffDataItem[`WorkingDayEnd0${i}` as keyof StaffDataItem] as string
    );
  }

  return weekHours;
};

// ChartAppointmentsPerStaff

export const calcAppointmentsDurationSalesPerStaffMember = (staffMemberID: number, appointments: AppointmentDataItem[]) => {
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
  const staffMemberWorkWeekHours = calcStaffMemberWorkWeekHours(staffDataItem);
  const { amountAppointment, durationInHours, sales } = calcAppointmentsDurationSalesPerStaffMember(staffDataItem.ID, sliceAppointmentsInWeekRange);
  console.log(staffDataItem.FullName);
  console.log(`12 weeks`, { amountAppointment, durationInHours, sales });
  const averageAppointmentsPerWeekPerStaffMember = +(amountAppointment / WEEK_RANGE).toFixed(2);
  const percentEmploymentPerWeekPerStaffMember = Math.round(
    ((durationInHours / WEEK_RANGE) * 100) / (staffMemberWorkWeekHours === 0 ? 100 : staffMemberWorkWeekHours)
  );
  const averageSalesPerWeekPerStaffMember = +(sales / WEEK_RANGE).toFixed(2);

  console.log(`AverageInWeek`, {
    averageAppointmentsPerWeekPerStaffMember,
    percentEmploymentPerWeekPerStaffMember,
    averageSalesPerWeekPerStaffMember,
  });

  return { averageAppointmentsPerWeekPerStaffMember, percentEmploymentPerWeekPerStaffMember, averageSalesPerWeekPerStaffMember };
};

export const getAppointmentPerStaffDataForChart = (
  sliceAppointments: AppointmentDataItem[],
  staff: StaffDataItem[]
): [string[], AppointmentPerStaffSeries[]] => {
  let categories: string[] = [];
  let amountsAppointment: number[] = [];
  let percentsEmployment: number[] = [];
  let sales: number[] = [];

  staff.forEach((staffMember) => {
    const {
      averageAppointmentsPerWeekPerStaffMember,
      percentEmploymentPerWeekPerStaffMember,
      averageSalesPerWeekPerStaffMember,
    } = calcAppointmentsDurationSalesPerWeekPerStaffMember(staffMember, sliceAppointments);
    categories = [...categories, `${staffMember.FirstName[0]}.${staffMember.Title[0]}`];
    amountsAppointment = [...amountsAppointment, averageAppointmentsPerWeekPerStaffMember];
    percentsEmployment = [...percentsEmployment, percentEmploymentPerWeekPerStaffMember];
    sales = [...sales, averageSalesPerWeekPerStaffMember];
  });

  const series = [
    { name: 'Amount Appointment', data: amountsAppointment },
    { name: 'Percent Employment', data: percentsEmployment },
    { name: 'Sales', data: sales },
  ];

  return [categories, series];
};
