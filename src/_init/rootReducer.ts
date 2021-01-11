import { combineReducers } from 'redux';
// Reducers
import { reducer as AppState } from '../_App';
import { reducer as GridState } from '../_sections/Grid';
// import { reducer as SchedulerState } from '../_sections/Scheduler/SchedulerReducer';

export const rootReducer = combineReducers({
  AppState,
  GridState,
  // SchedulerState,
});
