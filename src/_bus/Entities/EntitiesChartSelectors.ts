import { createSelector } from 'reselect';
// Types
import { RootState } from '../../_init';

export const getActiveCustomersIDs = ({ Entities }: RootState) => Entities.chartData.activeCustomersIDs;

const getAppointmentReservations = ({ Entities }: RootState) => Entities.chartData.appointmentReservations;

const getAppointmentBookings = ({ Entities }: RootState) => Entities.chartData.appointmentBookings;

const getAppointmentAttended = ({ Entities }: RootState) => Entities.chartData.appointmentAttended;

const getPaymentCompleted = ({ Entities }: RootState) => Entities.chartData.paymentCompleted;

const getAmountsAppointmentsPerStaffPerWeekSeries = ({ Entities }: RootState) => Entities.chartData.amountAppointmentsPerStaffPerWeekSeries;

const getPercentsEmploymentPerStaffPerWeekSeries = ({ Entities }: RootState) => Entities.chartData.percentsEmploymentPerStaffPerWeekSeries;

export const selectTotalSalesForEveryWeekInWeekRange = ({ Entities }: RootState) => Entities.chartData.totalSalesForEveryWeekInWeekRange;

export const selectServiceSalesForEveryWeekInWeekRange = ({ Entities }: RootState) => Entities.chartData.serviceSalesForEveryWeekInWeekRange;

export const selectProductSalesForEveryWeekInWeekRange = ({ Entities }: RootState) => Entities.chartData.productSalesForEveryWeekInWeekRange;

export const selectTotalAmountAppointmentsForEveryWeekPerWeekRange = ({ Entities }: RootState) => Entities.chartData.totalAmountAppointmentsForEveryWeekInWeekRange;

export const selectTotalProductUnitsForEveryWeekPerWeekRange = ({ Entities }: RootState) => Entities.chartData.totalAmountProductUnitsForEveryWeekInWeekRange;

export const selectAmountNewCustomerAppointmentsForEveryWeekPerWeekRange = ({ Entities }: RootState) =>
  Entities.chartData.amountNewCustomerAppointmentsForEveryWeekInWeekRange;

export const selectAmountExistCustomerAppointmentsForEveryWeekPerWeekRange = ({ Entities }: RootState) =>
  Entities.chartData.amountCustomerAppointmentsForEveryWeekInWeekRange;

export const selectStaffCategories = ({ Entities }: RootState) => Entities.chartData.staffCategories;

export const selectTotalAppointmentHours = ({ Entities }: RootState) => Entities.chartData.totalAppointmentHours;

export const selectTotalAppointmentSalesPerLast12Months = ({ Entities }: RootState) => Entities.chartData.totalAppointmentSalesPerLast12Months;

export const selectAmountActiveCustomers = ({ Entities }: RootState) => Entities.chartData.activeCustomersIDs.length;

export const selectTotalStaffWorkHoursInWeekRange = ({ Entities }: RootState) => Entities.chartData.totalStaffWorkHoursInWeekRange;

export const selectAverageHourlyPerService = ({ Entities }: RootState) => Entities.chartData.averageHourlyPerService;

export const selectTotalServiceSales = ({ Entities }: RootState) => Entities.chartData.totalServiceSales;

export const selectSalesPerStaffPerWeekData = ({ Entities }: RootState) => Entities.chartData.salesPerStaffPerWeekData;

export const selectServiceCategories = ({ Entities }: RootState) => Entities.chartData.serviceCategories;

export const selectProductCategories = ({ Entities }: RootState) => Entities.chartData.productCategories;

export const selectSalesPerServicePerMonthSeries = ({ Entities }: RootState) => Entities.chartData.salesPerServicePerMonthSeries;

export const selectSalesPerProductPerMonthSeries = ({ Entities }: RootState) => Entities.chartData.salesPerProductPerMonthSeries;

export const selectSalesPerOtherServicePerMonthSeries = ({ Entities }: RootState) => Entities.chartData.salesPerOtherServicePerMonthSeries;

export const selectCanceledAppointment = ({ Entities }: RootState) => Entities.chartData.canceledAppointment;

export const selectAppointmentValue = ({ Entities }: RootState) => Entities.chartData.appointmentValue;

export const selectAmountAppointmentPerNextWeekRangeAndLastWeek = ({ Entities }: RootState) => Entities.chartData.amountAppointmentPerNextWeekRangeAndLastWeek;

export const selectSeriesStaffStatistic = () =>
  createSelector(getAmountsAppointmentsPerStaffPerWeekSeries, getPercentsEmploymentPerStaffPerWeekSeries, (amountsAppointmentSeries, percentsEmploymentSeries) => [
    { name: 'Appointments', data: amountsAppointmentSeries },
    { name: 'Utilization %', data: percentsEmploymentSeries },
  ]);

export const selectAppointmentFunnel = () =>
  createSelector(
    getAppointmentReservations,
    getAppointmentBookings,
    getAppointmentAttended,
    getPaymentCompleted,
    (appointmentReservations, appointmentBookings, appointmentAttended, paymentCompleted) => [
      {
        stat: 'Appointment Reservations',
        data: appointmentReservations === 0 ? 0.44 : appointmentReservations,
        color: '#166f99',
      },
      {
        stat: 'Appointment Bookings',
        data: appointmentBookings === 0 ? 0.4 : appointmentBookings,
        color: '#2185b4',
      },
      {
        stat: 'Appointment Attended',
        data: appointmentAttended === 0 ? 0.34 : appointmentAttended,
        color: '#319fd2',
      },
      {
        stat: 'Payment Completed',
        data: paymentCompleted === 0 ? 0.3 : paymentCompleted,
        color: '#3eaee2',
      },
    ]
  );
