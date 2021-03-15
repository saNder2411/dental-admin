// Types
import { ChartState } from './EntitiesTypes';
import { EntitiesState, ById } from './EntitiesTypes';
import { AppointmentDataItem, StatusNames } from '../_Appointments/AppointmentsTypes';
import { ServiceDataItem, ContentTypes } from '../_Services/ServicesTypes';
import { SeriesForChart } from './EntitiesChartTypes';
import { StaffDataItem } from '../_Staff/StaffTypes';
import { DateRange } from '../Entities/EntitiesChartTypes';
// Constants
import { MONDAY_CURRENT_WEEK, SeriesColors, MONTH_RANGE, WeeksRange, MonthsRange, PrevWeekRange } from '../Constants';
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
        amountCustomerAppointment,
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
            amountNewCustomerAppointment: FirstAppointment && !fAllDayEvent ? acc.amountNewCustomerAppointment + 1 : acc.amountNewCustomerAppointment,
            amountCustomerAppointment: !FirstAppointment && !fAllDayEvent ? acc.amountCustomerAppointment + 1 : acc.amountCustomerAppointment,
          };
        },
        {
          totalSum: 0,
          serviceSum: 0,
          productSum: 0,
          totalAmountAppointment: 0,
          totalProductUnits: 0,
          amountNewCustomerAppointment: 0,
          amountCustomerAppointment: 0,
        }
      );

      return {
        totalSalesForEveryWeekInWeekRange: [...acc.totalSalesForEveryWeekInWeekRange, totalSum],
        serviceSalesForEveryWeekInWeekRange: [...acc.serviceSalesForEveryWeekInWeekRange, serviceSum],
        productSalesForEveryWeekInWeekRange: [...acc.productSalesForEveryWeekInWeekRange, productSum],
        totalAmountAppointmentsForEveryWeekInWeekRange: [...acc.totalAmountAppointmentsForEveryWeekInWeekRange, totalAmountAppointment],
        totalAmountProductUnitsForEveryWeekInWeekRange: [...acc.totalAmountProductUnitsForEveryWeekInWeekRange, totalProductUnits],
        amountNewCustomerAppointmentsForEveryWeekInWeekRange: [...acc.amountNewCustomerAppointmentsForEveryWeekInWeekRange, amountNewCustomerAppointment],
        amountCustomerAppointmentsForEveryWeekInWeekRange: [...acc.amountCustomerAppointmentsForEveryWeekInWeekRange, amountCustomerAppointment],
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
      (acc, { ServiceCharge, AppointmentStatus, fAllDayEvent }) => {
        if (isExcludeAppointment(AppointmentStatus)) return acc;

        return {
          totalSum: fAllDayEvent ? acc.totalSum : acc.totalSum + ServiceCharge,
          totalAmountAppointment: fAllDayEvent ? acc.totalAmountAppointment : acc.totalAmountAppointment + 1,
        };
      },
      {
        totalSum: 0,
        totalAmountAppointment: 0,
      }
    );
    const data = totalSum > 0 ? +(totalSum / totalAmountAppointment).toFixed(2) : 0;

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
          const nextHours = service.ContentTypeId === ContentTypes.Services ? prevHours + (service.MinutesDuration ?? 0) / 60 : prevHours;
          return [nextSales, nextHours];
        },
        [0, 0]
      );

      switch (service.ContentTypeId) {
        case ContentTypes.Services:
          const prevServiceCategory = acc.serviceCategories[acc.serviceCategories.length - 1];

          if (prevServiceCategory && prevServiceCategory === name) {
            acc.serviceCategoryData[acc.serviceCategoryData.length - 1].totalSales += totalSales;
            acc.serviceCategoryData[acc.serviceCategoryData.length - 1].totalHours += totalHours;
            acc.serviceTotalSales += totalSales;
            acc.serviceTotalHours += totalHours;
            return acc;
          }

          return {
            ...acc,
            serviceCategories: [...acc.serviceCategories, name],
            serviceCategoryData: [...acc.serviceCategoryData, { name, totalSales, totalHours }],
            serviceTotalSales: acc.serviceTotalSales + totalSales,
            serviceTotalHours: acc.serviceTotalHours + totalHours,
          };
        case ContentTypes.Product:
          const prevProductCategory = acc.productCategories[acc.productCategories.length - 1];

          if (prevProductCategory && prevProductCategory === name) {
            acc.productCategoryData[acc.productCategoryData.length - 1].totalSales = +totalSales;
            return acc;
          }

          return {
            ...acc,
            productCategories: [...acc.productCategories, name],
            productCategoryData: [...acc.productCategoryData, { name, totalSales }],
          };

        default:
          return {
            ...acc,
            otherCategories: [...acc.otherCategories, name],
            otherCategoryData: [...acc.otherCategoryData, { name, totalSales }],
          };
      }
    },
    {
      serviceCategories: new Array<string>(),
      productCategories: new Array<string>(),
      otherCategories: new Array<string>(),
      serviceCategoryData: new Array<{ name: string; totalSales: number; totalHours: number }>(),
      productCategoryData: new Array<{ name: string; totalSales: number }>(),
      otherCategoryData: new Array<{ name: string; totalSales: number }>(),
      serviceTotalSales: 0,
      serviceTotalHours: 0,
    }
  );

export const updateChartDataOnFinallyAppointmentsRequest = (state: EntitiesState): ChartState => {
  const appointmentsWithRecItems = state.appointments.originalData.flatMap((appointment) => [appointment, ...getRecurrenceAppointments(appointment)]);
  console.log(`appointmentsWithRecItems`, appointmentsWithRecItems);
  const appointmentsInLastWeeksRange = appointmentsWithRecItems.filter(({ Start, End }) => Start.getTime() in WeeksRange && End.getTime() in WeeksRange);
  const appointmentsInLastMonthsRange = appointmentsWithRecItems.filter(({ Start, End }) => Start.getTime() in MonthsRange && End.getTime() in MonthsRange);

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
      const isPrevWeek = Start.getTime() in PrevWeekRange && End.getTime() in PrevWeekRange;

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
        (AppointmentStatus === StatusNames.Booked ||
          AppointmentStatus === StatusNames.Reserved ||
          AppointmentStatus === StatusNames.Paid ||
          AppointmentStatus === StatusNames.Cancelled) &&
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
    serviceCategoryData,
    productCategoryData,
    otherCategoryData,
    serviceTotalSales,
    serviceTotalHours,
  } = getServiceProductCalcData(appointmentsInLastMonthsRange, state.services.originalData);
  console.log(`serviceCategoryData`, serviceCategoryData);
  console.log(`productCategoryData`, productCategoryData);
  console.log(`totalStaffWorkHoursInWeekRange`, totalStaffWorkHoursInWeekRange);
  console.log(`totalAppointmentHours`, totalAppointmentHours);

  const averageHourlyRateAllServices = serviceTotalSales !== 0 ? +(serviceTotalSales / serviceTotalHours).toFixed(2) : 0;
  const salesPerServicePerMonthSeries = serviceCategoryData.map(({ name, totalSales }) => ({
    name,
    data: +(totalSales / MONTH_RANGE).toFixed(2),
    color: SeriesColors[5],
  }));
  const salesPerProductPerMonthSeries = productCategoryData.map(({ name, totalSales }) => ({
    name,
    data: +(totalSales / MONTH_RANGE).toFixed(2),
    color: SeriesColors[6],
  }));
  const salesPerOtherServicePerMonthSeries = otherCategoryData.map(({ name, totalSales }) => ({
    name,
    data: +(totalSales / MONTH_RANGE).toFixed(2),
    color: SeriesColors[9],
  }));
  const averageHourlyPerService = serviceCategoryData.map(({ name, totalSales, totalHours }) => ({
    name,
    data: totalSales > 0 ? +(totalSales / totalHours).toFixed(2) : 0,
  }));

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

    canceledAppointment,
    amountAppointmentPerNextWeekRangeAndLastWeek,

    salesPerStaffPerWeekData,

    appointmentValue,

    totalAppointmentSales,
    totalServiceSales,
  };
};
