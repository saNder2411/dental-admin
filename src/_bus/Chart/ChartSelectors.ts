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

export const selectTotalAppointmentHours = ({ Chart }: RootState) => Chart.appointmentsDataForChart.totalAppointmentHours;

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
