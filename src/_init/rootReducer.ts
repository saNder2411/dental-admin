import { combineReducers } from 'redux';
// Reducers
import { reducer as AppState } from '../_App';
import { reducer as GridState } from '../_bus/Reducer';
import { UIReducer as UI } from '../_bus/UI/UIReducers';
import { UserReducer as User } from '../_bus/User/UserReducers';
import { SchedulerReducer as Scheduler } from '../_bus/Scheduler/SchedulerReducers';

export const rootReducer = combineReducers({
  AppState,
  GridState,
  UI,
  User,
  Scheduler,
});
