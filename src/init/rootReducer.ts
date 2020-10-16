import { combineReducers } from 'redux';
// Reducers
import { reducer as AppState } from '../App/AppReducer';

export const rootReducer = combineReducers({
  AppState,
});
