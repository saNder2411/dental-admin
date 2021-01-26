import { createSelector } from 'reselect';
// Types
import { RootState } from '../../_init';
// Selectors
import { getServicesByIdData, selectOriginalStaffData, selectOriginalServicesData } from '../Entities/EntitiesSelectors';
// Helpers
import {
  getAppointmentSalesData,
  getAppointmentPerStaffData,
  getAverageHourlyPerServiceData,
  getAverageHourlyPerAllServiceData,
} from './ChartHelpers';

const getSliceAppointmentsInLastWeekRange = ({ Chart }: RootState) => Chart.appointmentsDataForChart.sliceAppointmentsInLastWeekRange;

export const getActiveCustomersIDs = ({ Chart }: RootState) => Chart.appointmentsDataForChart.activeCustomersIDs;

const getAppointmentReservations = ({ Chart }: RootState) => Chart.appointmentsDataForChart.appointmentReservations;

const getAppointmentBookings = ({ Chart }: RootState) => Chart.appointmentsDataForChart.appointmentBookings;

const getAppointmentAttended = ({ Chart }: RootState) => Chart.appointmentsDataForChart.appointmentAttended;

const getPaymentCompleted = ({ Chart }: RootState) => Chart.appointmentsDataForChart.paymentCompleted;

export const selectTotalAppointmentHours = ({ Chart }: RootState) => Chart.appointmentsDataForChart.totalAppointmentHours;

export const selectTotalAppointmentSales = ({ Chart }: RootState) => Chart.appointmentsDataForChart.totalAppointmentSales;

export const selectAmountActiveCustomers = ({ Chart }: RootState) => Chart.appointmentsDataForChart.activeCustomersIDs.length;

export const selectTotalStaffWorkHoursInWeekRange = ({ Chart }: RootState) => Chart.totalStaffWorkHoursInWeekRange;

export const selectAppointmentsSalesChartData = () =>
  createSelector(getSliceAppointmentsInLastWeekRange, getServicesByIdData, (sliceAppointments, servicesById) =>
    getAppointmentSalesData(sliceAppointments, servicesById)
  );

export const selectAppointmentPerStaffChartData = () =>
  createSelector(getSliceAppointmentsInLastWeekRange, selectOriginalStaffData, (sliceAppointments, staff) =>
    getAppointmentPerStaffData(sliceAppointments, staff)
  );

export const selectAverageHourlyPerServiceChartData = () =>
  createSelector(getSliceAppointmentsInLastWeekRange, selectOriginalServicesData, (sliceAppointments, services) =>
    getAverageHourlyPerServiceData(sliceAppointments, services)
  );

export const selectAverageHourlyPerAllServiceChartData = () =>
  createSelector(getSliceAppointmentsInLastWeekRange, getServicesByIdData, (sliceAppointments, servicesById) =>
    getAverageHourlyPerAllServiceData(sliceAppointments, servicesById)
  );

export const selectAppointmentFunnelChartData = () =>
  createSelector(
    getAppointmentReservations,
    getAppointmentBookings,
    getAppointmentAttended,
    getPaymentCompleted,
    (appointmentReservations, appointmentBookings, appointmentAttended, paymentCompleted) => [
      {
        stat: 'Appointment Reservations',
        data: 4,
        color: '#166f99',
      },
      {
        stat: 'Appointment Bookings',
        data: 3,
        color: '#2185b4',
      },
      {
        stat: 'Appointment Attended',
        data: 2,
        color: '#319fd2',
      },
      {
        stat: 'Payment Completed',
        data: 1,
        color: '#3eaee2',
      },
    ]
  );
