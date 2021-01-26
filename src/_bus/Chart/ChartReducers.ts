import { combineReducers } from 'redux';
// Types
import { AppointmentsDataForChartState } from './ChartTypes';
import { ActionTypes, Actions } from '../Entities/EntitiesTypes';
// Helpers
import { updateAppointmentsDataForChart, updateTotalStaffWorkHoursInWeekRange } from './ChartReducersHelpers';

const initAppointmentsDataForChart = {
  sliceAppointmentsInLastWeekRange: [],
  totalAppointmentHours: 0,
  totalAppointmentSales: 0,
  activeCustomersIDs: [],
  appointmentReservations: 0,
  appointmentBookings: 0,
  appointmentAttended: 0,
  paymentCompleted: 0,
};

const appointmentsDataForChartReducer = (
  state: AppointmentsDataForChartState = initAppointmentsDataForChart,
  action: Actions
): AppointmentsDataForChartState => {
  switch (action.type) {
    case ActionTypes.FETCH_DATA_SUCCESS:
      return updateAppointmentsDataForChart(state, action.entityName, action.data);
    default:
      return state;
  }
};

const totalStaffWorkHoursInWeekRangeReducer = (state: number = 0, action: Actions): number => {
  switch (action.type) {
    case ActionTypes.FETCH_DATA_SUCCESS:
      return updateTotalStaffWorkHoursInWeekRange(state, action.entityName, action.data);
    default:
      return state;
  }
};

export const ChartReducer = combineReducers({
  appointmentsDataForChart: appointmentsDataForChartReducer,
  totalStaffWorkHoursInWeekRange: totalStaffWorkHoursInWeekRangeReducer,
});
