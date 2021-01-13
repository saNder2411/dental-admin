import { createStore, applyMiddleware } from 'redux';
// Instruments
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { composeEnhancers, middleware, sagaMiddleware } from './middleware';
// Types
import { AppState } from '../_App';
import { EntitiesState } from '../_bus/Entities/EntitiesTypes';
import { UIState } from '../_bus/UI/UITypes';
import { UserState } from '../_bus/User/UserTypes';
import { SchedulerState } from '../_bus/Scheduler/SchedulerTypes';

export interface GlobalState {
  AppState: AppState;
  Entities: EntitiesState;
  UI: UIState;
  User: UserState;
  Scheduler: SchedulerState;
}

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

sagaMiddleware.run(rootSaga);
