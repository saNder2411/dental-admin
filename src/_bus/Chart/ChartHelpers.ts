import { addWeeks, weekInYear } from '@progress/kendo-date-math';
// Types
import { WeekPoint, SeriesForChart } from './ChartTypes';
import { StaffDataItem } from '../../_bus/_Staff/StaffTypes';
import { AppointmentDataItem } from '../_Appointments/AppointmentsTypes';
import { ServiceDataItem, ContentTypes } from '../_Services/ServicesTypes';
// Constants
import { WEEK_RANGE, PREV_WEEKS } from '../Constants';
// Helpers
// import { generateColor } from '../Entities/EntitiesHelpers';

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

export const getAppointmentSalesData = (sliceAppointments: AppointmentDataItem[], servicesById: { [key: string]: ServiceDataItem }) => {
  let totalChartData: number[] = [];
  let servicesChartData: number[] = [];
  let productChartData: number[] = [];

  WeekPoints.forEach(({ start, end }) => {
    let totalSum = 0;
    let serviceSum = 0;
    let productSum = 0;

    const sliceAppointmentsInWeekPoint = sliceAppointments.filter(
      ({ Start, End }) => Start.getTime() >= start.getTime() && End.getTime() < end.getTime()
    );

    sliceAppointmentsInWeekPoint.forEach((appointment) => {
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
  // console.log(staffDataItem.FullName);
  // console.log(`12 weeks`, { amountAppointment, durationInHours, sales });
  const averageAppointmentsPerWeekPerStaffMember = +(amountAppointment / WEEK_RANGE).toFixed(2);
  const percentEmploymentPerWeekPerStaffMember = Math.round(
    ((durationInHours / WEEK_RANGE) * 100) / (staffMemberWorkWeekHours === 0 ? 100 : staffMemberWorkWeekHours)
  );
  const averageSalesPerWeekPerStaffMember = +(sales / WEEK_RANGE).toFixed(2);

  // console.log(`AverageInWeek`, {
  //   averageAppointmentsPerWeekPerStaffMember,
  //   percentEmploymentPerWeekPerStaffMember,
  //   averageSalesPerWeekPerStaffMember,
  // });

  return { averageAppointmentsPerWeekPerStaffMember, percentEmploymentPerWeekPerStaffMember, averageSalesPerWeekPerStaffMember };
};

export const getAppointmentPerStaffData = (
  sliceAppointments: AppointmentDataItem[],
  staff: StaffDataItem[]
): [string[], SeriesForChart<number[]>[]] => {
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

export const getAverageHourlyPerServiceData = (sliceAppointments: AppointmentDataItem[], services: ServiceDataItem[]) =>
  services.reduce<SeriesForChart<number>[]>((acc, service) => {
    if (service.ContentTypeId !== ContentTypes.Services) return acc;

    const name = service.OfferingCatType ?? 'null';

    let totalSales = 0;
    let totalHours = 0;
    sliceAppointments.forEach(({ LookupMultiBP01offeringsId, ServiceCharge, Duration }) => {
      if (!LookupMultiBP01offeringsId.results.includes(service.ID)) return;
      const amountServicesInAppointment = LookupMultiBP01offeringsId.results.length;
      totalSales += ServiceCharge / amountServicesInAppointment;
      totalHours += Duration / 60 / 60 / amountServicesInAppointment;
    });

    const data = totalSales === 0 ? 0 : Math.round(totalSales / totalHours);

    const prevAccValue = acc[acc.length - 1];

    if (prevAccValue && prevAccValue.name === service.OfferingCatType) {
      prevAccValue.data += data;
      return acc;
    }

    return [...acc, { name, data }];
  }, []);

export const getAverageHourlyPerAllServiceData = (
  sliceAppointments: AppointmentDataItem[],
  servicesById: { [key: string]: ServiceDataItem }
): [number, number] =>
  sliceAppointments.reduce<[number, number]>(
    (acc, { LookupMultiBP01offeringsId, ServiceCharge, Duration }) => {
      let [sales, hours] = acc;

      const amountProductSalesInAppointment = LookupMultiBP01offeringsId.results.reduce((sum, ID) => {
        const service = servicesById[ID];
        return service.ContentTypeId === ContentTypes.Product ? (sum += service.Amount) : sum;
      }, 0);
      sales += ServiceCharge - amountProductSalesInAppointment;
      hours += Duration / 60 / 60;

      return [sales, hours];
    },
    [0, 0]
  );
