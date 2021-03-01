// Types
import { ChartState } from './EntitiesTypes';
import { EntitiesState, ById } from './EntitiesTypes';
import { AppointmentDataItem, StatusNames } from '../_Appointments/AppointmentsTypes';
import { ServiceDataItem, ContentTypes } from '../_Services/ServicesTypes';
import { SeriesForChart } from './EntitiesChartTypes';
import { StaffDataItem } from '../_Staff/StaffTypes';
import { DateRange } from '../Entities/EntitiesChartTypes';
// Constants
import { MONDAY_CURRENT_WEEK, START_PREV_WEEKS_DATE, WEEK_RANGE, PREV_WEEK, SeriesColors, START_PREV_MONTH_DATE } from '../Constants';
// Helpers
import { WeekPoints, calcAppointmentsDurationSalesPerWeekPerStaffMember, MonthPoints } from './EntitiesChartHelpers';

const getAppointmentSalesData = (weekPoints: DateRange[]) => (sliceAppointments: AppointmentDataItem[]) => (servicesById: ById<ServiceDataItem>) =>
  weekPoints.reduce(
    (acc, { start, end }) => {
      const sliceAppointmentsInWeekPoint = sliceAppointments.filter(({ Start, End }) => Start.getTime() >= start.getTime() && End.getTime() <= end.getTime());

      const {
        totalSum,
        serviceSum,
        productSum,
        totalAmountAppointment,
        amountNewCustomerAppointment,
        amountExistCustomerAppointment,
      } = sliceAppointmentsInWeekPoint.reduce(
        (acc, { AppointmentStatus, FirstAppointment, LookupMultiBP01offeringsId, Duration, fAllDayEvent }) => {
          if (AppointmentStatus === StatusNames.Cancelled || AppointmentStatus === StatusNames.Consultation) return acc;

          const [serviceSum, productSum] = LookupMultiBP01offeringsId.results.reduce(
            (acc, Id) => {
              let [serviceSum, productSum] = acc;
              const { Amount = 0, ContentTypeId = '', OfferingDiscount = 0 } = servicesById[Id] ?? {};
              const price = Amount - Amount * OfferingDiscount;
              ContentTypeId === ContentTypes.Services ? (serviceSum += price) : (productSum += price);
              return [serviceSum, productSum];
            },
            [0, 0]
          );

          return {
            totalSum: +(acc.totalSum + serviceSum + productSum).toFixed(2),
            serviceSum: +(acc.serviceSum + serviceSum).toFixed(2),
            productSum: +(acc.productSum + productSum).toFixed(2),
            totalAmountAppointment: acc.totalAmountAppointment + 1,
            amountNewCustomerAppointment: FirstAppointment ? acc.amountNewCustomerAppointment + 1 : acc.amountNewCustomerAppointment,
            amountExistCustomerAppointment: !FirstAppointment ? acc.amountExistCustomerAppointment + 1 : acc.amountExistCustomerAppointment,
          };
        },
        {
          totalSum: 0,
          serviceSum: 0,
          productSum: 0,
          totalAmountAppointment: 0,
          amountNewCustomerAppointment: 0,
          amountExistCustomerAppointment: 0,
        }
      );

      return {
        totalSalesForEveryWeekInWeekRange: [...acc.totalSalesForEveryWeekInWeekRange, totalSum],
        serviceSalesForEveryWeekInWeekRange: [...acc.serviceSalesForEveryWeekInWeekRange, serviceSum],
        productSalesForEveryWeekInWeekRange: [...acc.productSalesForEveryWeekInWeekRange, productSum],
        totalAmountAppointmentsForEveryWeekPerWeekRange: [...acc.totalAmountAppointmentsForEveryWeekPerWeekRange, totalAmountAppointment],
        amountNewCustomerAppointmentsForEveryWeekPerWeekRange: [...acc.amountNewCustomerAppointmentsForEveryWeekPerWeekRange, amountNewCustomerAppointment],
        amountExistCustomerAppointmentsForEveryWeekPerWeekRange: [...acc.amountExistCustomerAppointmentsForEveryWeekPerWeekRange, amountExistCustomerAppointment],
      };
    },
    {
      totalSalesForEveryWeekInWeekRange: new Array<number>(),
      serviceSalesForEveryWeekInWeekRange: new Array<number>(),
      productSalesForEveryWeekInWeekRange: new Array<number>(),
      totalAmountAppointmentsForEveryWeekPerWeekRange: new Array<number>(),
      amountNewCustomerAppointmentsForEveryWeekPerWeekRange: new Array<number>(),
      amountExistCustomerAppointmentsForEveryWeekPerWeekRange: new Array<number>(),
    }
  );

export const getAppointmentValue = (sliceAppointments: AppointmentDataItem[]) =>
  MonthPoints.reduce((acc, { start, end }) => {
    const sliceAppointmentsInMonthPoint = sliceAppointments.filter(({ Start, End }) => Start.getTime() >= start.getTime() && End.getTime() < end.getTime());
    const { totalSum, totalAmountAppointment } = sliceAppointmentsInMonthPoint.reduce(
      (acc, { ServiceCharge, AppointmentStatus }) => ({
        totalSum: AppointmentStatus === StatusNames.Paid || AppointmentStatus === StatusNames.Booked ? acc.totalSum + ServiceCharge : acc.totalSum,
        totalAmountAppointment: acc.totalAmountAppointment + 1,
      }),
      {
        totalSum: 0,
        totalAmountAppointment: 0,
      }
    );
    const data = totalSum > 0 ? Math.round(totalSum / totalAmountAppointment) : 0;

    return [...acc, data];
  }, new Array<number>());

const getStaffCalcData = (sliceAppointments: AppointmentDataItem[], staff: StaffDataItem[], totalAppointmentSales: number) =>
  staff.reduce(
    (acc, staffMember) => {
      const {
        averageAppointmentsPerWeekPerStaffMember,
        percentEmploymentPerWeekPerStaffMember,
        averageSalesPerWeekPerStaffMember,
        percentStaffMemberSaleOfTotalSales,
        staffMemberWorkWeekHours,
        durationInHours,
      } = calcAppointmentsDurationSalesPerWeekPerStaffMember(staffMember, sliceAppointments, totalAppointmentSales);

      return {
        staffCategories: [...acc.staffCategories, `${staffMember.FirstName[0]}.${staffMember.Title[0]}`],
        appointmentPerStaffPerWeekSeries: [...acc.appointmentPerStaffPerWeekSeries, averageAppointmentsPerWeekPerStaffMember],
        percentsEmploymentPerWeekSeries: [...acc.percentsEmploymentPerWeekSeries, percentEmploymentPerWeekPerStaffMember],
        salesPerStaffPerWeekData: [
          ...acc.salesPerStaffPerWeekData,
          { name: staffMember.FullName, data: averageSalesPerWeekPerStaffMember, percent: percentStaffMemberSaleOfTotalSales },
        ],
        totalStaffWorkHoursInWeekRange: acc.totalStaffWorkHoursInWeekRange + staffMemberWorkWeekHours,
        totalAppointmentHours: +(acc.totalAppointmentHours + durationInHours).toFixed(2),
      };
    },
    {
      staffCategories: new Array<string>(),
      appointmentPerStaffPerWeekSeries: new Array<number>(),
      percentsEmploymentPerWeekSeries: new Array<number>(),
      salesPerStaffPerWeekData: new Array<SeriesForChart<number>>(),
      totalStaffWorkHoursInWeekRange: 0,
      totalAppointmentHours: 0,
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
          const nextHours = service.ContentTypeId === ContentTypes.Services ? prevHours + (service.MinutesDuration ?? 0) / 60 : 0;
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
            salesPerServicePerWeekSeries: [...acc.salesPerServicePerWeekSeries, { name, data: salesServiceOrProductPerWeekRange, color: SeriesColors[5] }],
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
            salesPerProductPerWeekSeries: [...acc.salesPerProductPerWeekSeries, { name, data: salesServiceOrProductPerWeekRange, color: SeriesColors[6] }],
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
      salesPerOtherServicePerWeekSeries: { name: 'Other', data: 0, color: SeriesColors[9] },
    }
  );

export const updateChartDataOnFinallyAppointmentsRequest = (state: EntitiesState): ChartState => {
  const appointmentsInLastWeeksRange = state.appointments.originalData.filter(
    ({ Start, End }) => Start.getTime() >= START_PREV_WEEKS_DATE.getTime() && End.getTime() <= MONDAY_CURRENT_WEEK.getTime()
  );
  const appointmentsInLastMonthsRange = state.appointments.originalData.filter(
    ({ Start, End }) => Start.getTime() >= START_PREV_MONTH_DATE.getTime() && End.getTime() <= MONDAY_CURRENT_WEEK.getTime()
  );

  const {
    appointmentReservations,
    appointmentBookings,
    appointmentAttended,
    paymentCompleted,
    canceledAppointment,
    amountAppointmentPerNextWeekRangeAndLastWeek,
    totalAppointmentSalesPerLast12Months,
    activeCustomersSet,
  } = state.appointments.originalData.reduce(
    (acc, { AppointmentStatus, Start, End, ServiceCharge, LookupCM102customersId }) => {
      const isFuture = Start.getTime() >= MONDAY_CURRENT_WEEK.getTime();
      const isPrevWeek = Start.getTime() >= PREV_WEEK.getTime() && End.getTime() < MONDAY_CURRENT_WEEK.getTime();

      if (isFuture) {
        AppointmentStatus === StatusNames.Reserved && acc.appointmentReservations++;
        AppointmentStatus === StatusNames.Booked && acc.appointmentBookings++;
      }

      if (!isFuture && AppointmentStatus !== StatusNames.Cancelled && AppointmentStatus !== StatusNames.Consultation) {
        acc.totalAppointmentSalesPerLast12Months += ServiceCharge;
        LookupCM102customersId && acc.activeCustomersSet.add(LookupCM102customersId);
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
      totalAppointmentSalesPerLast12Months: 0,
      activeCustomersSet: new Set<number>(),
    }
  );

  const {
    totalSalesForEveryWeekInWeekRange,
    serviceSalesForEveryWeekInWeekRange,
    productSalesForEveryWeekInWeekRange,
    totalAmountAppointmentsForEveryWeekPerWeekRange,
    amountNewCustomerAppointmentsForEveryWeekPerWeekRange,
    amountExistCustomerAppointmentsForEveryWeekPerWeekRange,
  } = getAppointmentSalesData(WeekPoints)(appointmentsInLastWeeksRange)(state.services.byId);

  const totalAppointmentSales = totalSalesForEveryWeekInWeekRange.reduce((sum, item) => (sum += item), 0);
  const totalServiceSales = serviceSalesForEveryWeekInWeekRange.reduce((sum, item) => (sum += item), 0);

  const {
    staffCategories,
    appointmentPerStaffPerWeekSeries,
    percentsEmploymentPerWeekSeries,
    salesPerStaffPerWeekData,
    totalStaffWorkHoursInWeekRange,
    totalAppointmentHours,
  } = getStaffCalcData(appointmentsInLastWeeksRange, state.staff.originalData, totalAppointmentSales);

  const {
    averageHourlyPerService,
    serviceCategories,
    productCategories,
    salesPerServicePerWeekSeries,
    salesPerProductPerWeekSeries,
    salesPerOtherServicePerWeekSeries,
  } = getServiceProductCalcData(appointmentsInLastWeeksRange, state.services.originalData);

  const appointmentValue = getAppointmentValue(appointmentsInLastMonthsRange);

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
    totalAmountAppointmentsForEveryWeekPerWeekRange,
    amountNewCustomerAppointmentsForEveryWeekPerWeekRange,
    amountExistCustomerAppointmentsForEveryWeekPerWeekRange,
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
    appointmentValue,
  };
};
