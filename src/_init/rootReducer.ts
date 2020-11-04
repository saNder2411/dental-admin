import { combineReducers } from 'redux';
// Reducers
import { reducer as AppState } from '../App/AppReducer';
import { reducer as GridState } from '../_components/Grid';

export const rootReducer = combineReducers({
  AppState,
  GridState,
});
