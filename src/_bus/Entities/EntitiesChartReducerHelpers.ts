// Types
import { ChartState } from './EntitiesTypes';
import { EntitiesState, ById } from './EntitiesTypes';
import { AppointmentDataItem, StatusNames } from '../_Appointments/AppointmentsTypes';
import { ServiceDataItem, ContentTypes } from '../_Services/ServicesTypes';
import { SeriesForChart } from './EntitiesChartTypes';
import { StaffDataItem } from '../_Staff/StaffTypes';
import { DateRange } from '../Entities/EntitiesChartTypes';
// Constants
import { MONDAY_CURRENT_WEEK, START_PREV_WEEKS_DATE, PREV_WEEK, SeriesColors, START_PREV_MONTH_DATE, MONTH_RANGE } from '../Constants';
// Helpers
import { WeekPoints, calcAppointmentsDurationSalesPerWeekPerStaffMember, MonthPoints, getRecurrenceAppointments, isExcludeAppointment } from './EntitiesChartHelpers';

const getAppointmentSalesData = (weekPoints: DateRange[]) => (sliceAppointments: AppointmentDataItem[]) => (servicesById: ById<ServiceDataItem>) =>
  weekPoints.reduce(
    (acc, { start, end }) => {
      const sliceAppointmentsInWeekPoint = sliceAppointments.filter(({ Start, End }) => Start.getTime() >= start.getTime() && End.getTime() <= end.getTime());

      const {
        totalSum,
        serviceSum,
        productSum,
        totalAmountAppointment,
        totalProductUnits,
        amountNewCustomerAppointment,
        amountExistCustomerAppointment,
      } = sliceAppointmentsInWeekPoint.reduce(
        (acc, { AppointmentStatus, FirstAppointment, LookupMultiBP01offeringsId, fAllDayEvent }) => {
          if (isExcludeAppointment(AppointmentStatus)) return acc;

          const { serviceSum, productSum, productUnitsCount } = LookupMultiBP01offeringsId.results.reduce(
            ({ serviceSum, productSum, productUnitsCount }, Id) => {
              const { Amount = 0, ContentTypeId = ContentTypes.Default, OfferingDiscount = 0 } = servicesById[Id] ?? {};

              const price = Amount - Amount * OfferingDiscount;

              ContentTypeId === ContentTypes.Services && (serviceSum += price);
              ContentTypeId === ContentTypes.Product && (productSum += price) && productUnitsCount++;

              return { serviceSum, productSum, productUnitsCount };
            },
            { serviceSum: 0, productSum: 0, productUnitsCount: 0 }
          );

          return {
            totalSum: +(acc.totalSum + serviceSum + productSum).toFixed(2),
            serviceSum: +(acc.serviceSum + serviceSum).toFixed(2),
            productSum: +(acc.productSum + productSum).toFixed(2),
            totalAmountAppointment: fAllDayEvent ? acc.totalAmountAppointment : acc.totalAmountAppointment + 1,
            totalProductUnits: acc.totalProductUnits + productUnitsCount,
            amountNewCustomerAppointment: FirstAppointment ? acc.amountNewCustomerAppointment + 1 : acc.amountNewCustomerAppointment,
            amountExistCustomerAppointment: !FirstAppointment ? acc.amountExistCustomerAppointment + 1 : acc.amountExistCustomerAppointment,
          };
        },
        {
          totalSum: 0,
          serviceSum: 0,
          productSum: 0,
          totalAmountAppointment: 0,
          totalProductUnits: 0,
          amountNewCustomerAppointment: 0,
          amountExistCustomerAppointment: 0,
        }
      );

      return {
        totalSalesForEveryWeekInWeekRange: [...acc.totalSalesForEveryWeekInWeekRange, totalSum],
        serviceSalesForEveryWeekInWeekRange: [...acc.serviceSalesForEveryWeekInWeekRange, serviceSum],
        productSalesForEveryWeekInWeekRange: [...acc.productSalesForEveryWeekInWeekRange, productSum],
        totalAmountAppointmentsForEveryWeekInWeekRange: [...acc.totalAmountAppointmentsForEveryWeekInWeekRange, totalAmountAppointment],
        totalAmountProductUnitsForEveryWeekInWeekRange: [...acc.totalAmountProductUnitsForEveryWeekInWeekRange, totalProductUnits],
        amountNewCustomerAppointmentsForEveryWeekInWeekRange: [...acc.amountNewCustomerAppointmentsForEveryWeekInWeekRange, amountNewCustomerAppointment],
        amountCustomerAppointmentsForEveryWeekInWeekRange: [...acc.amountCustomerAppointmentsForEveryWeekInWeekRange, amountExistCustomerAppointment],
      };
    },
    {
      totalSalesForEveryWeekInWeekRange: new Array<number>(),
      serviceSalesForEveryWeekInWeekRange: new Array<number>(),
      productSalesForEveryWeekInWeekRange: new Array<number>(),
      totalAmountAppointmentsForEveryWeekInWeekRange: new Array<number>(),
      totalAmountProductUnitsForEveryWeekInWeekRange: new Array<number>(),
      amountNewCustomerAppointmentsForEveryWeekInWeekRange: new Array<number>(),
      amountCustomerAppointmentsForEveryWeekInWeekRange: new Array<number>(),
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
        staffMemberWorkWeekHoursInWeekRange,
        staffMemberAppointmentDurationInHours,
      } = calcAppointmentsDurationSalesPerWeekPerStaffMember(staffMember, sliceAppointments, totalAppointmentSales);

      return {
        staffCategories: [...acc.staffCategories, `${staffMember.FirstName[0]}.${staffMember.Title[0]}`],
        amountAppointmentsPerStaffPerWeekSeries: [...acc.amountAppointmentsPerStaffPerWeekSeries, averageAppointmentsPerWeekPerStaffMember],
        percentsEmploymentPerStaffPerWeekSeries: [...acc.percentsEmploymentPerStaffPerWeekSeries, percentEmploymentPerWeekPerStaffMember],
        salesPerStaffPerWeekData: [
          ...acc.salesPerStaffPerWeekData,
          { name: staffMember.FullName, data: averageSalesPerWeekPerStaffMember, percent: percentStaffMemberSaleOfTotalSales },
        ],
        totalStaffWorkHoursInWeekRange: acc.totalStaffWorkHoursInWeekRange + staffMemberWorkWeekHoursInWeekRange,
        totalAppointmentHours: +(acc.totalAppointmentHours + staffMemberAppointmentDurationInHours).toFixed(2),
      };
    },
    {
      staffCategories: new Array<string>(),
      amountAppointmentsPerStaffPerWeekSeries: new Array<number>(),
      percentsEmploymentPerStaffPerWeekSeries: new Array<number>(),
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
          const price = service.Amount - service.Amount * service.OfferingDiscount;
          const totalSalesInAppointment = price * servicesOrProductInAppointment.length;

          const nextSales = prevSales + totalSalesInAppointment;
          const nextHours = service.ContentTypeId === ContentTypes.Services ? prevHours + (service.MinutesDuration ?? 0) / 60 : 0;
          return [nextSales, nextHours];
        },
        [0, 0]
      );

      const salesServiceOrProductPerWeekRange = totalSales === 0 ? 0 : +(totalSales / MONTH_RANGE).toFixed(2);

      switch (service.ContentTypeId) {
        case ContentTypes.Services:
          const data = totalSales === 0 ? 0 : +(totalSales / totalHours).toFixed(2);
          const prevServiceCategory = acc.serviceCategories[acc.serviceCategories.length - 1];

          if (prevServiceCategory && prevServiceCategory === name) {
            const prevServiceData = acc.salesPerServicePerMonthSeries[acc.salesPerServicePerMonthSeries.length - 1].data;
            const prevAverageHourlyData = acc.averageHourlyPerService[acc.averageHourlyPerService.length - 1].data;

            acc.salesPerServicePerMonthSeries[acc.salesPerServicePerMonthSeries.length - 1].data = +(prevServiceData + salesServiceOrProductPerWeekRange).toFixed(2);
            acc.averageHourlyPerService[acc.averageHourlyPerService.length - 1].data = +(prevAverageHourlyData + data).toFixed(2);
            acc.serviceTotalSales = acc.serviceTotalSales + totalSales;
            acc.serviceTotalHours = acc.serviceTotalHours + totalHours;
            return acc;
          }

          return {
            ...acc,
            serviceCategories: [...acc.serviceCategories, name],
            salesPerServicePerMonthSeries: [...acc.salesPerServicePerMonthSeries, { name, data: salesServiceOrProductPerWeekRange, color: SeriesColors[5] }],
            averageHourlyPerService: [...acc.averageHourlyPerService, { name, data }],
            serviceTotalSales: acc.serviceTotalSales + totalSales,
            serviceTotalHours: acc.serviceTotalHours + totalHours,
          };
        case ContentTypes.Product:
          const prevProductCategory = acc.productCategories[acc.productCategories.length - 1];

          if (prevProductCategory && prevProductCategory === name) {
            const prevProductData = acc.salesPerProductPerMonthSeries[acc.salesPerProductPerMonthSeries.length - 1].data;
            acc.salesPerProductPerMonthSeries[acc.salesPerProductPerMonthSeries.length - 1].data = +(prevProductData + salesServiceOrProductPerWeekRange).toFixed();
            return acc;
          }

          return {
            ...acc,
            productCategories: [...acc.productCategories, name],
            salesPerProductPerMonthSeries: [...acc.salesPerProductPerMonthSeries, { name, data: salesServiceOrProductPerWeekRange, color: SeriesColors[6] }],
          };

        default:
          return {
            ...acc,
            salesPerOtherServicePerMonthSeries: {
              ...acc.salesPerOtherServicePerMonthSeries,
              data: acc.salesPerOtherServicePerMonthSeries.data + salesServiceOrProductPerWeekRange,
            },
          };
      }
    },
    {
      serviceCategories: new Array<string>(),
      productCategories: new Array<string>(),
      salesPerServicePerMonthSeries: new Array<SeriesForChart<number>>(),
      salesPerProductPerMonthSeries: new Array<SeriesForChart<number>>(),
      salesPerOtherServicePerMonthSeries: { name: 'Other', data: 0, color: SeriesColors[9] },
      averageHourlyPerService: new Array<SeriesForChart<number>>(),
      serviceTotalSales: 0,
      serviceTotalHours: 0,
    }
  );

export const updateChartDataOnFinallyAppointmentsRequest = (state: EntitiesState): ChartState => {
  const appointmentsWithRecItems = state.appointments.originalData.flatMap((appointment) => [appointment, ...getRecurrenceAppointments(appointment)]);
  console.log(`appointmentsWithRecItems`, appointmentsWithRecItems);
  const appointmentsInLastWeeksRange = appointmentsWithRecItems.filter(
    ({ Start, End }) => Start.getTime() >= START_PREV_WEEKS_DATE.getTime() && End.getTime() <= MONDAY_CURRENT_WEEK.getTime()
  );
  const appointmentsInLastMonthsRange = appointmentsWithRecItems.filter(
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
  } = appointmentsWithRecItems.reduce(
    (acc, { AppointmentStatus, Start, End, ServiceCharge, LookupCM102customersId }) => {
      const isFuture = Start.getTime() >= MONDAY_CURRENT_WEEK.getTime();
      const isPrevWeek = Start.getTime() >= PREV_WEEK.getTime() && End.getTime() < MONDAY_CURRENT_WEEK.getTime();

      if (isFuture) {
        AppointmentStatus === StatusNames.Reserved && acc.appointmentReservations++;
        AppointmentStatus === StatusNames.Booked && acc.appointmentBookings++;
      }

      if (!isFuture && !isExcludeAppointment(AppointmentStatus)) {
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
    totalAmountAppointmentsForEveryWeekInWeekRange,
    totalAmountProductUnitsForEveryWeekInWeekRange,
    amountNewCustomerAppointmentsForEveryWeekInWeekRange,
    amountCustomerAppointmentsForEveryWeekInWeekRange,
  } = getAppointmentSalesData(WeekPoints)(appointmentsInLastWeeksRange)(state.services.byId);

  const totalAppointmentSales = totalSalesForEveryWeekInWeekRange.reduce((sum, item) => (sum += item), 0);
  const totalServiceSales = serviceSalesForEveryWeekInWeekRange.reduce((sum, item) => (sum += item), 0);

  const {
    staffCategories,
    amountAppointmentsPerStaffPerWeekSeries,
    percentsEmploymentPerStaffPerWeekSeries,
    salesPerStaffPerWeekData,
    totalStaffWorkHoursInWeekRange,
    totalAppointmentHours,
  } = getStaffCalcData(appointmentsInLastWeeksRange, state.staff.originalData, totalAppointmentSales);

  const {
    serviceCategories,
    productCategories,
    salesPerServicePerMonthSeries,
    salesPerProductPerMonthSeries,
    salesPerOtherServicePerMonthSeries,
    averageHourlyPerService,
    serviceTotalSales,
    serviceTotalHours,
  } = getServiceProductCalcData(appointmentsInLastMonthsRange, state.services.originalData);

  const averageHourlyRateAllServices = serviceTotalSales !== 0 ? +(serviceTotalSales / serviceTotalHours).toFixed(2) : 0;

  const appointmentValue = getAppointmentValue(appointmentsInLastMonthsRange);

  return {
    totalSalesForEveryWeekInWeekRange,
    serviceSalesForEveryWeekInWeekRange,
    productSalesForEveryWeekInWeekRange,
    totalAmountAppointmentsForEveryWeekInWeekRange,
    totalAmountProductUnitsForEveryWeekInWeekRange,
    amountNewCustomerAppointmentsForEveryWeekInWeekRange,
    amountCustomerAppointmentsForEveryWeekInWeekRange,

    totalAppointmentHours,
    totalStaffWorkHoursInWeekRange,

    staffCategories,
    amountAppointmentsPerStaffPerWeekSeries,
    percentsEmploymentPerStaffPerWeekSeries,

    serviceCategories,
    productCategories,
    salesPerServicePerMonthSeries,
    salesPerProductPerMonthSeries,
    salesPerOtherServicePerMonthSeries,

    averageHourlyPerService,
    averageHourlyRateAllServices,

    totalAppointmentSalesPerLast12Months,
    activeCustomersIDs: Array.from(activeCustomersSet),

    appointmentReservations,
    appointmentBookings,
    appointmentAttended,
    paymentCompleted,

    totalAppointmentSales,
    canceledAppointment,
    amountAppointmentPerNextWeekRangeAndLastWeek,
    salesPerStaffPerWeekData,
    totalServiceSales,
    appointmentValue,
  };
};
