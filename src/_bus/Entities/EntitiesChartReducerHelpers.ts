// Types
import { ChartState } from './EntitiesTypes';
import { EntitiesState } from './EntitiesTypes';
import { AppointmentDataItem, StatusNames } from '../_Appointments/AppointmentsTypes';
import { ServiceDataItem, ContentTypes } from '../_Services/ServicesTypes';
import { SeriesForChart } from './EntitiesChartTypes';
import { StaffDataItem } from '../_Staff/StaffTypes';
// Constants
import { MONDAY_CURRENT_WEEK, START_PREV_WEEKS_DATE, WEEK_RANGE, PREV_WEEK, SeriesColors } from '../Constants';
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
          if (appointment.AppointmentStatus === StatusNames.Cancelled || appointment.AppointmentStatus === StatusNames.Consultation) return acc;

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

const getStaffCalcData = (sliceAppointments: AppointmentDataItem[], staff: StaffDataItem[], totalAppointmentSales: number) =>
  staff.reduce(
    (acc, staffMember) => {
      const {
        averageAppointmentsPerWeekPerStaffMember,
        percentEmploymentPerWeekPerStaffMember,
        averageSalesPerWeekPerStaffMember,
        percentStaffMemberSaleOfTotalSales,
        staffMemberWorkWeekHours,
      } = calcAppointmentsDurationSalesPerWeekPerStaffMember(staffMember, sliceAppointments, totalAppointmentSales);

      return {
        staffCategories: [...acc.staffCategories, `${staffMember.FirstName[0]}.${staffMember.Title[0]}`],
        appointmentPerStaffPerWeekSeries: [...acc.appointmentPerStaffPerWeekSeries, averageAppointmentsPerWeekPerStaffMember],
        percentsEmploymentPerWeekSeries: [...acc.percentsEmploymentPerWeekSeries, percentEmploymentPerWeekPerStaffMember],
        salesPerStaffPerWeekData: [
          ...acc.salesPerStaffPerWeekData,
          { name: staffMember.FullName, data: averageSalesPerWeekPerStaffMember, percent: percentStaffMemberSaleOfTotalSales },
        ],
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

const getServiceProductCalcData = (sliceAppointments: AppointmentDataItem[], services: ServiceDataItem[]) =>
  services.reduce(
    (acc, service) => {
      const name = service.OfferingCatType?.slice(5) ?? 'Other';

      const [totalSales, totalHours] = sliceAppointments.reduce(
        (acc, { LookupMultiBP01offeringsId }) => {
          const servicesOrProductInAppointment = LookupMultiBP01offeringsId.results.filter((id) => id === service.ID);

          if (servicesOrProductInAppointment.length === 0) return acc;

          const [prevSales, prevHours] = acc;

          const nextSales = prevSales + (service.Amount - service.Amount * service.OfferingDiscount) * servicesOrProductInAppointment.length;
          const nextHours = service.ContentTypeId === ContentTypes.Services ? prevHours + service.MinutesDuration / 60 : 0;
          return [nextSales, nextHours];
        },
        [0, 0]
      );

      const salesServiceOrProductPerWeekRange = totalSales === 0 ? 0 : Math.round(totalSales / WEEK_RANGE);

      switch (service.ContentTypeId) {
        case ContentTypes.Services:
          const data = totalSales === 0 ? 0 : Math.round(totalSales / totalHours);
          const prevServiceCategory = acc.serviceCategories[acc.serviceCategories.length - 1];

          if (prevServiceCategory && prevServiceCategory === name) {
            acc.averageHourlyPerService[acc.averageHourlyPerService.length - 1].data += data;
            acc.salesPerServicePerWeekSeries[acc.salesPerServicePerWeekSeries.length - 1].data += salesServiceOrProductPerWeekRange;
            return acc;
          }

          return {
            ...acc,
            averageHourlyPerService: [...acc.averageHourlyPerService, { name, data }],
            serviceCategories: [...acc.serviceCategories, name],
            salesPerServicePerWeekSeries: [
              ...acc.salesPerServicePerWeekSeries,
              { name, data: salesServiceOrProductPerWeekRange + 20, color: SeriesColors[5] },
            ],
          };
        case ContentTypes.Product:
          const prevProductCategory = acc.productCategories[acc.productCategories.length - 1];

          if (prevProductCategory && prevProductCategory === name) {
            acc.salesPerProductPerWeekSeries[acc.salesPerProductPerWeekSeries.length - 1].data += salesServiceOrProductPerWeekRange;
            return acc;
          }

          return {
            ...acc,
            productCategories: [...acc.productCategories, name],
            salesPerProductPerWeekSeries: [
              ...acc.salesPerProductPerWeekSeries,
              { name, data: salesServiceOrProductPerWeekRange + 40, color: SeriesColors[6] },
            ],
          };

        default:
          return {
            ...acc,
            salesPerOtherServicePerWeekSeries: {
              ...acc.salesPerOtherServicePerWeekSeries,
              data: acc.salesPerOtherServicePerWeekSeries.data + salesServiceOrProductPerWeekRange,
            },
          };
      }
    },
    {
      averageHourlyPerService: new Array<SeriesForChart<number>>(),
      serviceCategories: new Array<string>(),
      productCategories: new Array<string>(),
      salesPerServicePerWeekSeries: new Array<SeriesForChart<number>>(),
      salesPerProductPerWeekSeries: new Array<SeriesForChart<number>>(),
      salesPerOtherServicePerWeekSeries: { name: 'Other', data: 90, color: SeriesColors[9] },
    }
  );

export const updateChartDataOnFinallyAppointmentsRequest = (state: EntitiesState): ChartState => {
  const appointmentsInLastWeeksRange = state.appointments.originalData.filter(
    ({ Start, End }) => Start.getTime() >= START_PREV_WEEKS_DATE.getTime() && End.getTime() <= MONDAY_CURRENT_WEEK.getTime()
  );

  const {
    appointmentReservations,
    appointmentBookings,
    appointmentAttended,
    paymentCompleted,
    canceledAppointment,
    amountAppointmentPerNextWeekRangeAndLastWeek,
    totalAppointmentHours,
    totalAppointmentSales,
    totalAppointmentSalesPerLast12Months,
    totalServiceSales,
    activeCustomersSet,
  } = state.appointments.originalData.reduce(
    (acc, { AppointmentStatus, Start, End, Duration, ServiceCharge, LookupCM102customersId, LookupMultiBP01offeringsId }) => {
      const isFuture = Start.getTime() >= MONDAY_CURRENT_WEEK.getTime();
      const isPrevWeek = Start.getTime() >= PREV_WEEK.getTime() && End.getTime() < MONDAY_CURRENT_WEEK.getTime();
      const inLastWeeksRange = Start.getTime() >= START_PREV_WEEKS_DATE.getTime() && End.getTime() < MONDAY_CURRENT_WEEK.getTime();

      if (isFuture) {
        AppointmentStatus === StatusNames.Reserved && acc.appointmentReservations++;
        AppointmentStatus === StatusNames.Booked && acc.appointmentBookings++;
      }

      if (inLastWeeksRange) {
        acc.totalAppointmentHours += Duration / 60 / 60;
        acc.totalAppointmentSales += ServiceCharge;
        const amountProductSalesInAppointment = LookupMultiBP01offeringsId.results.reduce((sum, ID) => {
          const service = state.services.byId[ID];
          return service.ContentTypeId === ContentTypes.Product ? (sum += service.Amount) : sum;
        }, 0);
        acc.totalServiceSales += ServiceCharge - amountProductSalesInAppointment;
      }

      if (!isFuture && AppointmentStatus !== StatusNames.Cancelled) {
        acc.totalAppointmentSalesPerLast12Months += ServiceCharge;
        acc.activeCustomersSet.add(LookupCM102customersId);
      }

      if (isPrevWeek) {
        AppointmentStatus === StatusNames.Booked && acc.appointmentAttended++;
        AppointmentStatus === StatusNames.Paid && acc.paymentCompleted++;
      }

      if (isPrevWeek || isFuture) {
        (AppointmentStatus === StatusNames.Booked || AppointmentStatus === StatusNames.Reserved || AppointmentStatus === StatusNames.Paid) &&
          acc.amountAppointmentPerNextWeekRangeAndLastWeek++;
        AppointmentStatus === StatusNames.Cancelled && acc.canceledAppointment++;
      }

      return acc;
    },
    {
      appointmentReservations: 0,
      appointmentBookings: 0,
      appointmentAttended: 0,
      paymentCompleted: 0,
      canceledAppointment: 0,
      amountAppointmentPerNextWeekRangeAndLastWeek: 0,
      totalAppointmentHours: 0,
      totalAppointmentSales: 0,
      totalAppointmentSalesPerLast12Months: 0,
      totalServiceSales: 0,
      activeCustomersSet: new Set<number>(),
    }
  );

  const { totalSalesForEveryWeekInWeekRange, serviceSalesForEveryWeekInWeekRange, productSalesForEveryWeekInWeekRange } = getAppointmentSalesData(
    appointmentsInLastWeeksRange,
    state.services.byId
  );

  const {
    staffCategories,
    appointmentPerStaffPerWeekSeries,
    percentsEmploymentPerWeekSeries,
    salesPerStaffPerWeekData,
    totalStaffWorkHoursInWeekRange,
  } = getStaffCalcData(appointmentsInLastWeeksRange, state.staff.originalData, totalAppointmentSales);

  const {
    averageHourlyPerService,
    serviceCategories,
    productCategories,
    salesPerServicePerWeekSeries,
    salesPerProductPerWeekSeries,
    salesPerOtherServicePerWeekSeries,
  } = getServiceProductCalcData(appointmentsInLastWeeksRange, state.services.originalData);

  return {
    totalAppointmentHours,
    totalAppointmentSales,
    totalAppointmentSalesPerLast12Months,
    activeCustomersIDs: Array.from(activeCustomersSet),
    appointmentReservations,
    appointmentBookings,
    appointmentAttended,
    paymentCompleted,
    canceledAppointment,
    amountAppointmentPerNextWeekRangeAndLastWeek,
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
    productCategories,
    salesPerServicePerWeekSeries,
    salesPerProductPerWeekSeries,
    salesPerOtherServicePerWeekSeries,
  };
};
