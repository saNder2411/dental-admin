import { createStore, applyMiddleware } from 'redux';
// Instruments
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { composeEnhancers, middleware, sagaMiddleware } from './middleware';
// Types
import { AppState } from '../_App';
import { GridState } from '../_bus/Types';
import { UIState } from '../_bus/UI/UITypes';
import { UserState } from '../_bus/User/UserTypes';
import { SchedulerState } from '../_bus/Scheduler/SchedulerTypes';

export interface GlobalState {
  AppState: AppState;
  GridState: GridState;
  UI: UIState;
  User: UserState;
  Scheduler: SchedulerState;
}

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);
