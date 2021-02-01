// Types
import { ChartState } from './EntitiesTypes';
import { EntitiesKeys, EntitiesState } from './EntitiesTypes';
import { AppointmentDataItem, StatusNames } from '../_Appointments/AppointmentsTypes';
import { ServiceDataItem, ContentTypes } from '../_Services/ServicesTypes';
import { SeriesForChart } from './EntitiesChartTypes';
import { StaffDataItem } from '../_Staff/StaffTypes';
// Constants
import { MONDAY_CURRENT_WEEK, WEEK_RANGE } from '../Constants';
// Helpers
import { calcStaffMemberWorkWeekHours, WeekPoints, calcAppointmentsDurationSalesPerWeekPerStaffMember } from './EntitiesChartHelpers';

const getAppointmentSalesData = (sliceAppointments: AppointmentDataItem[], servicesById: { [key: string]: ServiceDataItem }) =>
  WeekPoints.reduce<{
    totalSalesForEveryWeekInWeekRange: number[];
    serviceSalesForEveryWeekInWeekRange: number[];
    productSalesForEveryWeekInWeekRange: number[];
  }>(
    (acc, { start, end }) => {
      const { totalSalesForEveryWeekInWeekRange, serviceSalesForEveryWeekInWeekRange, productSalesForEveryWeekInWeekRange } = acc;

      const sliceAppointmentsInWeekPoint = sliceAppointments.filter(
        ({ Start, End }) => Start.getTime() >= start.getTime() && End.getTime() < end.getTime()
      );

      const { totalSum, serviceSum, productSum } = sliceAppointmentsInWeekPoint.reduce(
        (acc, appointment) => {
          const { ServiceCharge, LookupMultiBP01offeringsId } = appointment;
          const [serviceSum, productSum] = LookupMultiBP01offeringsId.results.reduce(
            (acc, Id) => {
              let [serviceSum, productSum] = acc;
              const { Amount = 0, ContentTypeId = '' } = servicesById[Id] ?? {};
              ContentTypeId === ContentTypes.Services ? (serviceSum += Amount) : (productSum += Amount);
              return [serviceSum, productSum];
            },
            [0, 0]
          );
          // console.log(`week`, ServiceCharge, serviceSum, productSum, appointment);

          return {
            totalSum: serviceSum + productSum > 0 ? acc.totalSum + ServiceCharge : acc.totalSum,
            serviceSum: acc.serviceSum + serviceSum,
            productSum: acc.productSum + productSum,
          };
        },
        { totalSum: 0, serviceSum: 0, productSum: 0 }
      );

      return {
        totalSalesForEveryWeekInWeekRange: [...totalSalesForEveryWeekInWeekRange, totalSum],
        serviceSalesForEveryWeekInWeekRange: [...serviceSalesForEveryWeekInWeekRange, serviceSum],
        productSalesForEveryWeekInWeekRange: [...productSalesForEveryWeekInWeekRange, productSum],
      };
    },
    { totalSalesForEveryWeekInWeekRange: [], serviceSalesForEveryWeekInWeekRange: [], productSalesForEveryWeekInWeekRange: [] }
  );

const getAppointmentPerStaffData = (
  sliceAppointments: AppointmentDataItem[],
  staff: StaffDataItem[]
): [string[], SeriesForChart<number[]>[], number] => {
  const { categories, amountsAppointment, percentsEmployment, sales, totalStaffWorkHoursInWeekRange } = staff.reduce<{
    categories: string[];
    amountsAppointment: number[];
    percentsEmployment: number[];
    sales: number[];
    totalStaffWorkHoursInWeekRange: number;
  }>(
    (acc, staffMember) => {
      const {
        averageAppointmentsPerWeekPerStaffMember,
        percentEmploymentPerWeekPerStaffMember,
        averageSalesPerWeekPerStaffMember,
      } = calcAppointmentsDurationSalesPerWeekPerStaffMember(staffMember, sliceAppointments);

      return {
        categories: [...acc.categories, `${staffMember.FirstName[0]}.${staffMember.Title[0]}`],
        amountsAppointment: [...acc.amountsAppointment, averageAppointmentsPerWeekPerStaffMember],
        percentsEmployment: [...acc.percentsEmployment, percentEmploymentPerWeekPerStaffMember],
        sales: [...acc.sales, averageSalesPerWeekPerStaffMember],
        totalStaffWorkHoursInWeekRange: acc.totalStaffWorkHoursInWeekRange + calcStaffMemberWorkWeekHours(staffMember) * WEEK_RANGE,
      };
    },
    { categories: [], amountsAppointment: [], percentsEmployment: [], sales: [], totalStaffWorkHoursInWeekRange: 0 }
  );

  const series = [
    { name: 'Amount Appointment', data: amountsAppointment },
    { name: 'Percent Employment', data: percentsEmployment },
    { name: 'Sales', data: sales },
  ];

  return [categories, series, totalStaffWorkHoursInWeekRange];
};

const getAverageHourlyPerServiceData = (sliceAppointments: AppointmentDataItem[], services: ServiceDataItem[]) =>
  services.reduce<SeriesForChart<number>[]>((acc, service) => {
    if (service.ContentTypeId !== ContentTypes.Services) return acc;

    const name = service.OfferingCatType ?? 'null';

    const [totalSales, totalHours] = sliceAppointments.reduce(
      (acc, { LookupMultiBP01offeringsId, ServiceCharge, Duration }) => {
        if (!LookupMultiBP01offeringsId.results.includes(service.ID)) return acc;
        const [prevSales, prevHours] = acc;

        const amountServicesInAppointment = LookupMultiBP01offeringsId.results.length;
        const totalSales = prevSales + ServiceCharge / amountServicesInAppointment;
        const totalHours = prevHours + Duration / 60 / 60 / amountServicesInAppointment;
        return [totalSales, totalHours];
      },
      [0, 0]
    );

    const data = totalSales === 0 ? 0 : Math.round(totalSales / totalHours);

    const prevAccValue = acc[acc.length - 1];

    if (prevAccValue && prevAccValue.name === service.OfferingCatType) {
      prevAccValue.data += data;
      return acc;
    }

    return [...acc, { name, data }];
  }, []);

export const updateChartDataOnFinallyAppointmentsRequest = (state: EntitiesState, entityName: EntitiesKeys): ChartState => {
  if (entityName !== EntitiesKeys.Appointments) return state.chartData;

  const appointmentsInLastWeekRange = state.appointments.originalData.filter(({ End }) => End.getTime() <= MONDAY_CURRENT_WEEK.getTime());

  const {
    appointmentReservations,
    appointmentBookings,
    appointmentAttended,
    paymentCompleted,
    totalAppointmentHours,
    totalAppointmentSales,
    totalServiceSales,
    activeCustomersSet,
  } = state.appointments.originalData.reduce(
    (acc, { AppointmentStatus, Start, Duration, ServiceCharge, LookupCM102customersId, LookupMultiBP01offeringsId }) => {
      const isFuture = Start.getTime() >= MONDAY_CURRENT_WEEK.getTime();

      if (isFuture) {
        AppointmentStatus === StatusNames.Reserved && acc.appointmentReservations++;
        AppointmentStatus === StatusNames.Booked && acc.appointmentBookings++;
      }

      if (!isFuture) {
        AppointmentStatus === StatusNames.Booked && acc.appointmentAttended++;
        acc.totalAppointmentHours += Duration / 60 / 60;
        acc.totalAppointmentSales += ServiceCharge;
        acc.activeCustomersSet.add(LookupCM102customersId);
        const amountProductSalesInAppointment = LookupMultiBP01offeringsId.results.reduce((sum, ID) => {
          const service = state.services.byId[ID];
          return service.ContentTypeId === ContentTypes.Product ? (sum += service.Amount) : sum;
        }, 0);
        acc.totalServiceSales += ServiceCharge - amountProductSalesInAppointment;
      }

      AppointmentStatus === StatusNames.Paid && acc.paymentCompleted++;

      return acc;
    },
    {
      appointmentReservations: 0,
      appointmentBookings: 0,
      appointmentAttended: 0,
      paymentCompleted: 0,
      totalAppointmentHours: 0,
      totalAppointmentSales: 0,
      totalServiceSales: 0,
      activeCustomersSet: new Set<number>(),
    }
  );

  const { totalSalesForEveryWeekInWeekRange, serviceSalesForEveryWeekInWeekRange, productSalesForEveryWeekInWeekRange } = getAppointmentSalesData(
    appointmentsInLastWeekRange,
    state.services.byId
  );

  const [appointmentPerStaffCategories, appointmentPerStaffSeries, totalStaffWorkHoursInWeekRange] = getAppointmentPerStaffData(
    appointmentsInLastWeekRange,
    state.staff.originalData
  );

  const averageHourlyPerService = getAverageHourlyPerServiceData(appointmentsInLastWeekRange, state.services.originalData);

  return {
    totalAppointmentHours,
    totalAppointmentSales,
    activeCustomersIDs: Array.from(activeCustomersSet),
    appointmentReservations,
    appointmentBookings,
    appointmentAttended,
    paymentCompleted,
    totalStaffWorkHoursInWeekRange,
    totalSalesForEveryWeekInWeekRange,
    serviceSalesForEveryWeekInWeekRange,
    productSalesForEveryWeekInWeekRange,
    appointmentPerStaffCategories,
    appointmentPerStaffSeries,
    averageHourlyPerService,
    totalServiceSales,
  };
};
