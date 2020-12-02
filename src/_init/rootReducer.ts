import { combineReducers } from 'redux';
// Reducers
import { reducer as AppState } from '../_App';
import { reducer as GridState } from '../_sections/Grid';
import { reducer as SchedulerState } from '../_sections/Scheduler/SchedulerReducer';
import { reducer as AgendaState } from '../Agenda';
import { reducer as CustomersState } from '../Customers';
import { reducer as ServicesState } from '../Services';
import { reducer as TeamStaffState } from '../TeamStaff';

export const rootReducer = combineReducers({
  AppState,
  GridState,
  SchedulerState,
  AgendaState,
  CustomersState,
  ServicesState,
  TeamStaffState,
});
