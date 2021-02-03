// Types
import { ChartState } from './EntitiesTypes';
import { EntitiesState } from './EntitiesTypes';
import { AppointmentDataItem, StatusNames } from '../_Appointments/AppointmentsTypes';
import { ServiceDataItem, ContentTypes } from '../_Services/ServicesTypes';
import { SeriesForChart } from './EntitiesChartTypes';
import { StaffDataItem } from '../_Staff/StaffTypes';
// Constants
import { MONDAY_CURRENT_WEEK, WEEK_RANGE, PREV_WEEK } from '../Constants';
// Helpers
import { WeekPoints, calcAppointmentsDurationSalesPerWeekPerStaffMember } from './EntitiesChartHelpers';

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

const getAppointmentPerStaffData = (sliceAppointments: AppointmentDataItem[], staff: StaffDataItem[]) =>
  staff.reduce(
    (acc, staffMember) => {
      const {
        averageAppointmentsPerWeekPerStaffMember,
        percentEmploymentPerWeekPerStaffMember,
        averageSalesPerWeekPerStaffMember,
        staffMemberWorkWeekHours,
      } = calcAppointmentsDurationSalesPerWeekPerStaffMember(staffMember, sliceAppointments);

      return {
        staffCategories: [...acc.staffCategories, `${staffMember.FirstName[0]}.${staffMember.Title[0]}`],
        appointmentPerStaffPerWeekSeries: [...acc.appointmentPerStaffPerWeekSeries, averageAppointmentsPerWeekPerStaffMember],
        percentsEmploymentPerWeekSeries: [...acc.percentsEmploymentPerWeekSeries, percentEmploymentPerWeekPerStaffMember],
        salesPerStaffPerWeekData: [...acc.salesPerStaffPerWeekData, { name: staffMember.FullName, data: averageSalesPerWeekPerStaffMember }],
        totalStaffWorkHoursInWeekRange: acc.totalStaffWorkHoursInWeekRange + staffMemberWorkWeekHours * WEEK_RANGE,
      };
    },
    {
      staffCategories: new Array<string>(),
      appointmentPerStaffPerWeekSeries: new Array<number>(),
      percentsEmploymentPerWeekSeries: new Array<number>(),
      salesPerStaffPerWeekData: new Array<SeriesForChart<number>>(),
      totalStaffWorkHoursInWeekRange: 0,
    }
  );

const getAverageHourlyPerServiceData = (sliceAppointments: AppointmentDataItem[], services: ServiceDataItem[]) =>
  services.reduce(
    (acc, service) => {
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
      const salesServicePerWeekRange = totalSales === 0 ? 0 : Math.round(totalSales / WEEK_RANGE);

      const prevAverageHourlyPerServiceItem = acc.averageHourlyPerService[acc.averageHourlyPerService.length - 1];

      if (prevAverageHourlyPerServiceItem && prevAverageHourlyPerServiceItem.name === service.OfferingCatType) {
        prevAverageHourlyPerServiceItem.data += data;
        acc.salesPerServicePerWeekSeries[acc.salesPerServicePerWeekSeries.length - 1] += salesServicePerWeekRange;
        return acc;
      }

      return {
        averageHourlyPerService: [...acc.averageHourlyPerService, { name, data }],
        serviceCategories: [...acc.serviceCategories, name.slice(5)],
        salesPerServicePerWeekSeries: [...acc.salesPerServicePerWeekSeries, salesServicePerWeekRange],
      };
    },
    {
      averageHourlyPerService: new Array<SeriesForChart<number>>(),
      serviceCategories: new Array<string>(),
      salesPerServicePerWeekSeries: new Array<number>(),
    }
  );

export const updateChartDataOnFinallyAppointmentsRequest = (state: EntitiesState): ChartState => {
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
    (acc, { AppointmentStatus, Start, End, Duration, ServiceCharge, LookupCM102customersId, LookupMultiBP01offeringsId }) => {
      const isFuture = Start.getTime() >= MONDAY_CURRENT_WEEK.getTime();
      const isPrevWeek = Start.getTime() >= PREV_WEEK.getTime() && End.getTime() < MONDAY_CURRENT_WEEK.getTime();

      if (isFuture) {
        AppointmentStatus === StatusNames.Reserved && acc.appointmentReservations++;
        AppointmentStatus === StatusNames.Booked && acc.appointmentBookings++;
      }

      if (!isFuture) {
        acc.totalAppointmentHours += Duration / 60 / 60;
        acc.totalAppointmentSales += ServiceCharge;
        acc.activeCustomersSet.add(LookupCM102customersId);
        const amountProductSalesInAppointment = LookupMultiBP01offeringsId.results.reduce((sum, ID) => {
          const service = state.services.byId[ID];
          return service.ContentTypeId === ContentTypes.Product ? (sum += service.Amount) : sum;
        }, 0);
        acc.totalServiceSales += ServiceCharge - amountProductSalesInAppointment;
      }

      if (isPrevWeek) {
        AppointmentStatus === StatusNames.Booked && acc.appointmentAttended++;
        AppointmentStatus === StatusNames.Paid && acc.paymentCompleted++;
      }

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

  const {
    staffCategories,
    appointmentPerStaffPerWeekSeries,
    percentsEmploymentPerWeekSeries,
    salesPerStaffPerWeekData,
    totalStaffWorkHoursInWeekRange,
  } = getAppointmentPerStaffData(appointmentsInLastWeekRange, state.staff.originalData);

  const { averageHourlyPerService, serviceCategories, salesPerServicePerWeekSeries } = getAverageHourlyPerServiceData(
    appointmentsInLastWeekRange,
    state.services.originalData
  );

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
    staffCategories,
    appointmentPerStaffPerWeekSeries,
    percentsEmploymentPerWeekSeries,
    salesPerStaffPerWeekData,
    averageHourlyPerService,
    totalServiceSales,
    serviceCategories,
    salesPerServicePerWeekSeries,
  };
};
