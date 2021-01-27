// Types
import { ChartState } from './EntitiesTypes';
import { EntitiesKeys, StatusNames, EntitiesState } from './EntitiesTypes';
import { AppointmentDataItem } from '../_Appointments/AppointmentsTypes';
import { ServiceDataItem, ContentTypes } from '../_Services/ServicesTypes';
import { SeriesForChart } from './EntitiesChartTypes';
import { StaffDataItem } from '../_Staff/StaffTypes';
// Constants
import { MONDAY_CURRENT_WEEK, WEEK_RANGE } from '../Constants';
// Helpers
import { calcStaffMemberWorkWeekHours, WeekPoints, calcAppointmentsDurationSalesPerWeekPerStaffMember } from './EntitiesChartHelpers';

const getAppointmentSalesData = (sliceAppointments: AppointmentDataItem[], servicesById: { [key: string]: ServiceDataItem }) => {
  let totalSalesForEveryWeekInWeekRange: number[] = [];
  let serviceSalesForEveryWeekInWeekRange: number[] = [];
  let productSalesForEveryWeekInWeekRange: number[] = [];

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

    totalSalesForEveryWeekInWeekRange = [...totalSalesForEveryWeekInWeekRange, totalSum];
    serviceSalesForEveryWeekInWeekRange = [...serviceSalesForEveryWeekInWeekRange, serviceSum];
    productSalesForEveryWeekInWeekRange = [...productSalesForEveryWeekInWeekRange, productSum];
  });

  return { totalSalesForEveryWeekInWeekRange, serviceSalesForEveryWeekInWeekRange, productSalesForEveryWeekInWeekRange };
};

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

export const getAverageHourlyPerAllServiceData = (
  sliceAppointments: AppointmentDataItem[],
  servicesById: { [key: string]: ServiceDataItem }
): [number, number] =>
  sliceAppointments.reduce<[number, number]>(
    (acc, { LookupMultiBP01offeringsId, ServiceCharge, Duration }) => {
      const [prevSales, prevHours] = acc;
      const amountProductSalesInAppointment = LookupMultiBP01offeringsId.results.reduce((sum, ID) => {
        const service = servicesById[ID];
        return service.ContentTypeId === ContentTypes.Product ? (sum += service.Amount) : sum;
      }, 0);
      const sales = prevSales + (ServiceCharge - amountProductSalesInAppointment);
      const hours = prevHours + Duration / 60 / 60;

      return [sales, hours];
    },
    [0, 0]
  );

export const updateChartDataOnFinallyAppointmentsRequest = (state: EntitiesState, entityName: EntitiesKeys): ChartState => {
  if (entityName !== EntitiesKeys.Appointments) return state.chartData;

  const appointmentsInLastWeekRange = state.appointments.originalData.filter(({ End }) => End.getTime() <= MONDAY_CURRENT_WEEK.getTime());
  const appointmentsInNextWeekRange = state.appointments.originalData.filter(({ Start }) => Start.getTime() >= MONDAY_CURRENT_WEEK.getTime());

  const [totalAppointmentHours, totalAppointmentSales, activeCustomersSet] = appointmentsInLastWeekRange.reduce(
    (acc, { Duration, ServiceCharge, LookupCM102customersId }) => {
      const [prevHours, prevSales, activeCustomers] = acc;
      const currentHours = prevHours + Duration / 60 / 60;
      const currentSales = prevSales + ServiceCharge;
      activeCustomers.add(LookupCM102customersId);

      return [currentHours, currentSales, activeCustomers];
    },
    [0, 0, new Set<number>()]
  );

  const [appointmentReservations, appointmentBookings, appointmentAttended, paymentCompleted] = appointmentsInNextWeekRange.reduce(
    (acc, { AppointmentStatus }) => {
      const [prevAppointmentReservations, prevAppointmentBookings, prevAppointmentAttended, prevPaymentCompleted] = acc;
      const currentAppointmentReservations =
        AppointmentStatus === StatusNames.Reserved ? prevAppointmentReservations + 1 : prevAppointmentReservations;
      const currentAppointmentBookings = AppointmentStatus === StatusNames.Booked ? prevAppointmentBookings + 1 : prevAppointmentBookings;
      const currentAppointmentAttended = AppointmentStatus === StatusNames.Paid ? prevAppointmentAttended + 1 : prevAppointmentAttended;
      const currentPaymentCompleted = AppointmentStatus === StatusNames.Paid ? prevPaymentCompleted + 1 : prevPaymentCompleted;

      return [currentAppointmentReservations, currentAppointmentBookings, currentAppointmentAttended, currentPaymentCompleted];
    },
    [0, 0, 0, 0]
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

  const [totalServiceSales, totalServiceHours] = getAverageHourlyPerAllServiceData(appointmentsInLastWeekRange, state.services.byId);

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
    totalServiceHours,
  };
};