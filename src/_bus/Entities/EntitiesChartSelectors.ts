import { createSelector } from 'reselect';
// Types
import { RootState } from '../../_init';

export const getActiveCustomersIDs = ({ Entities }: RootState) => Entities.chartData.activeCustomersIDs;

const getAppointmentReservations = ({ Entities }: RootState) => Entities.chartData.appointmentReservations;

const getAppointmentBookings = ({ Entities }: RootState) => Entities.chartData.appointmentBookings;

const getAppointmentAttended = ({ Entities }: RootState) => Entities.chartData.appointmentAttended;

const getPaymentCompleted = ({ Entities }: RootState) => Entities.chartData.paymentCompleted;

export const selectTotalSalesForEveryWeekInWeekRange = ({ Entities }: RootState) => Entities.chartData.totalSalesForEveryWeekInWeekRange;

export const selectServiceSalesForEveryWeekInWeekRange = ({ Entities }: RootState) => Entities.chartData.serviceSalesForEveryWeekInWeekRange;

export const selectProductSalesForEveryWeekInWeekRange = ({ Entities }: RootState) => Entities.chartData.productSalesForEveryWeekInWeekRange;

export const selectCategoriesAppointmentPerStaff = ({ Entities }: RootState) => Entities.chartData.appointmentPerStaffCategories;

export const selectSeriesAppointmentPerStaff = ({ Entities }: RootState) => Entities.chartData.appointmentPerStaffSeries;

export const selectTotalAppointmentHours = ({ Entities }: RootState) => Entities.chartData.totalAppointmentHours;

export const selectTotalAppointmentSales = ({ Entities }: RootState) => Entities.chartData.totalAppointmentSales;

export const selectAmountActiveCustomers = ({ Entities }: RootState) => Entities.chartData.activeCustomersIDs.length;

export const selectTotalStaffWorkHoursInWeekRange = ({ Entities }: RootState) => Entities.chartData.totalStaffWorkHoursInWeekRange;

export const selectAverageHourlyPerService = ({ Entities }: RootState) => Entities.chartData.averageHourlyPerService;

export const selectTotalServiceSales = ({ Entities }: RootState) => Entities.chartData.totalServiceSales;

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
