import { combineReducers } from 'redux';
// Reducers
import { reducer as AppState } from '../_App';
import { reducer as GridState } from '../_bus/Reducer';

export const rootReducer = combineReducers({
  AppState,
  GridState,
});
