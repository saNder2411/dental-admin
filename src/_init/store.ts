import { createStore, applyMiddleware, compose } from 'redux';
// Instruments
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { composeEnhancers, middleware, sagaMiddleware } from './middleware';
// Types
import { AppState } from '../App';
import { GridState } from '../_sections/Grid';
import { AgendaState } from '../Agenda';
import { CustomersState } from '../Customers';
import { ServicesState } from '../Services';
import { TeamStaffState } from '../TeamStaff';

export interface GlobalState {
  AppState: AppState;
  GridState: GridState;
  AgendaState: AgendaState;
  CustomersState: CustomersState;
  ServicesState: ServicesState;
  TeamStaffState: TeamStaffState;
}

export const store = createStore(rootReducer, composeEnhancers(compose(applyMiddleware(...middleware))));

sagaMiddleware.run(rootSaga);
