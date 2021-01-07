import { createStore, applyMiddleware } from 'redux';
// Instruments
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { composeEnhancers, middleware, sagaMiddleware } from './middleware';
// Types
import { AppState } from '../_App';
import { GridState } from '../_sections/Grid';
import { SchedulerState } from '../_sections/Scheduler/SchedulerTypes';

export interface GlobalState {
  AppState: AppState;
  GridState: GridState;
  SchedulerState: SchedulerState;
}

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);
