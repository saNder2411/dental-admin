import { createSelector } from 'reselect';
// Types
import { RootState } from '../../_init';
// Selectors
import { getServicesByIdData, selectOriginalStaffData } from '../Entities/EntitiesSelectors';
// Helpers
import { getAppointmentSalesDataForChart, getAppointmentPerStaffDataForChart } from './ChartHelpers';

const getSliceAppointmentsInLastWeekRange = ({ Chart }: RootState) => Chart.appointmentsDataForChart.sliceAppointmentsInLastWeekRange;

export const selectTotalAppointmentHours = ({ Chart }: RootState) => Chart.appointmentsDataForChart.totalAppointmentHours;

export const selectTotalStaffWorkHoursInWeekRange = ({ Chart }: RootState) => Chart.totalStaffWorkHoursInWeekRange;

export const selectAppointmentsSalesChartData = () =>
  createSelector(getSliceAppointmentsInLastWeekRange, getServicesByIdData, (sliceAppointments, servicesById) =>
    getAppointmentSalesDataForChart(sliceAppointments, servicesById)
  );

export const selectAppointmentPerStaffChartData = () =>
  createSelector(getSliceAppointmentsInLastWeekRange, selectOriginalStaffData, (sliceAppointments, staff) =>
    getAppointmentPerStaffDataForChart(sliceAppointments, staff)
  );
